'use strict'

// create global variables
var productStorage = [];
var randomProducts = [];
var clickCounter = 0;
var maxClickCount = 25;
var oldRandomArray = [];
var PRODUCT_DATA = 'productData';

function getRandomProductIndex() {
  return Math.floor(Math.random() * (productStorage.length));
}

function select3ProductsAndRender() {
  console.log('old random array', oldRandomArray[0], oldRandomArray[1], oldRandomArray[2]);
  randomProducts = [];

  while (randomProducts.length < 3) {
    var nextRandomValue = getRandomProductIndex();
    if (!randomProducts.includes(nextRandomValue) && !oldRandomArray.includes(nextRandomValue)) {
      randomProducts.push(nextRandomValue);
    }
  }
  console.log('new random products ', randomProducts);

  // populate the old random array with the new random values
  oldRandomArray[0] = randomProducts[0];
  oldRandomArray[1] = randomProducts[1];
  oldRandomArray[2] = randomProducts[2];

  console.log('old array created', oldRandomArray[0], oldRandomArray[1], oldRandomArray[2]);

  // create placeholders for pictures and count times property shown
  var placeholder0 = document.getElementById('placeholder-0');
  var placeholder1 = document.getElementById('placeholder-1');
  var placeholder2 = document.getElementById('placeholder-2');

  productStorage[randomProducts[0]].render(placeholder0);
  productStorage[randomProducts[0]].timesProductShown++;
  productStorage[randomProducts[1]].render(placeholder1);
  productStorage[randomProducts[1]].timesProductShown;
  productStorage[randomProducts[2]].render(placeholder2);
  productStorage[randomProducts[2]].timesProductShown;
}


// create constructor Object 
var Products = function (productName, productImage) {
  this.productName = productName
  this.productImage = productImage
  this.timesProductClicked = [];
  this.timesProductShown = [];

  this.markClick = function () {
    this.timesProductClicked++;
  }
  this.render = function (domReference) {
    domReference.src = this.productImage;
  }
  this.loadData = function (data) {
    this.timesProductClicked = data.timesProductClicked;
    this.timesProductShown = data.timesProductShown;
    this.productName = data.productName;
    this.productImage = data.productImage;
  }
  // productStorage.push(this);
}

// create function to save object data to localStorage
if (localStorage.getItem(PRODUCT_DATA) === null) {

  var bagProduct = new Products('bag', './images/bag.jpg');
  var bananaProduct = new Products('banana', './images/banana.jpg');
  var bathroomProduct = new Products('bathroom', './images/bathroom.jpg');
  var bootsProduct = new Products('boots', './images/boots.jpg');
  var breakfastProduct = new Products('breakfast', './images/breakfast.jpg');
  var bubblegumProduct = new Products('bubblegum', './images/bubblegum.jpg');
  var chairProduct = new Products('chair', './images/chair.jpg');
  var cthulhuProduct = new Products('cthulhu', './images/cthulhu.jpg');
  var dogDuckProduct = new Products('dog-duck', './images/dog-duck.jpg');
  var dragonProduct = new Products('dragon', './images/dragon.jpg');
  var penProduct = new Products('pen', './images/pen.jpg');
  var petSweepProduct = new Products('pet-sweep', './images/pet-sweep.jpg');
  var scissorsProduct = new Products('scissors', './images/scissors.jpg');
  var sharkProduct = new Products('shark', './images/shark.jpg');
  var sweepProduct = new Products('sweep', './images/sweep.png');
  var tauntaunProduct = new Products('tauntaun', './images/tauntaun.jpg');
  var unicornProduct = new Products('unicorn', './images/unicorn.jpg');
  var usbProduct = new Products('usb', './images/usb.gif');
  var waterCanProduct = new Products('water-can', './images/water-can.jpg');
  var wineGlassProduct = new Products('wine-glass', './images/wine-glass.jpg');

  productStorage.push(bagProduct);
  productStorage.push(bananaProduct);
  productStorage.push(bathroomProduct);
  productStorage.push(bootsProduct);
  productStorage.push(breakfastProduct);
  productStorage.push(bubblegumProduct);
  productStorage.push(chairProduct);
  productStorage.push(cthulhuProduct);
  productStorage.push(dogDuckProduct);
  productStorage.push(dragonProduct);
  productStorage.push(penProduct);
  productStorage.push(petSweepProduct);
  productStorage.push(scissorsProduct);
  productStorage.push(sharkProduct);
  productStorage.push(sweepProduct);
  productStorage.push(tauntaunProduct);
  productStorage.push(unicornProduct);
  productStorage.push(usbProduct);
  productStorage.push(waterCanProduct);
  productStorage.push(wineGlassProduct);
} 
else {
  var jsonData = localStorage.getItem(PRODUCT_DATA);
  var data = JSON.parse(jsonData);
  for(var i = 0; i < data.length; i++) {
    var newProduct = new Products('','');

    newProduct.loadData(data[i]);
    productStorage.push(newProduct);
  }
}

function clickManager(event) {
  clickCounter++;
  if (clickCounter <= maxClickCount) {

    var productIndex;
    if (event.target.id === 'placeholder-0') {
      productIndex = 0;
    } else if (event.target.id === 'placeholder-1') {
      productIndex = 1;
    } else {
      productIndex = 2;
    }
    var clickedProduct = productStorage[randomProducts[productIndex]];
    clickedProduct.markClick();

    select3ProductsAndRender();
  } else {
    saveProductDataToLocalStorage();
    renderChartResults();
    renderNarrativeResults();
  }
  function saveProductDataToLocalStorage() {
    var jsonData = JSON.stringify(productStorage);
    localStorage.setItem(PRODUCT_DATA, jsonData);
  }
  
}


select3ProductsAndRender();
var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);


// render chart showing number of clicks, and views if possible
function renderChartResults() {

  var productNameArray = [];
  var productClicksArray = [];
  var productViewsArray = [];

  for (var i = 0; i < productStorage.length; i++) {
    productNameArray.push(productStorage[i].productName);
    productClicksArray.push(productStorage[i].timesProductClicked);
    productViewsArray.push(productStorage[i].timesProductShown);
  }
  // console.log(productNameArray);
  console.log(productClicksArray);

  // add chart
  var context = document.getElementById('productChart').getContext('2d');
  var productChart = new Chart(context, {
    type: 'horizontalBar',
    data: {
      labels: productNameArray,
      datasets: [
        {
          label: 'Product Clicks',
          data: productClicksArray,
          barPercentage: .9,
          // barThickness: 20,
          backgroundColor: 'rgb(255,99,132)',
          borderColor: 'rgb(255,99,132)',
        },
        {
          label: 'Product Views',
          data: productViewsArray,
        }
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          },
        ],
      }
    },
  });
  // }
}



// render the results of number of clicks and views in text
function renderNarrativeResults() {
  placeholder0.removeEventListener('click', clickManager);
  placeholder1.removeEventListener('click', clickManager);
  placeholder2.removeEventListener('click', clickManager);

  var finalResultsList = document.getElementById('final-results');
  var ulElement = document.createElement('ul');

  for (var i = 0; i <= productStorage.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = productStorage[i].productName + ' had ' + productStorage[i].timesProductClicked + ' votes and was shown ' + productStorage[i].timesProductShown + ' times.';
    finalResultsList.append(liElement);
  }
}
