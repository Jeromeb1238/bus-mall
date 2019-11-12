'use strict'

// create global variables
var productStorage = [];
var randomProducts = [];
var clickCounter = 0;
var maxClickCounter = 5;

function getRandomProductIndex() {
  return Math.floor(Math.random() * (productStorage.length));
}

function select3ProductsAndRender() {
  randomProducts = [];

  while (randomProducts.length < 3) {
    var nextRandomValue = getRandomProductIndex();
    if (!randomProducts.includes(nextRandomValue)) {
      randomProducts.push(nextRandomValue);
      // console.log('random products ' + randomProducts);
    }
  }
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


// create Product Object
var Products = function (productName, productImage) {
  this.productName = productName
  this.productImage = productImage
  this.timesProductClicked = [];
  this.timesProductShown = [];

  this.markClick = function () {
    this.timesProductClicked++;
  }
  this.render = function (domReference) {
    domReference.src = productImage;
  }
  productStorage.push(this);
}
// Instantiate all of the products
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

function clickManager(event) {
  clickCounter++;
  if (clickCounter <= maxClickCounter) {
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
    renderResults();
  }
}

select3ProductsAndRender();
var placeholder0 = document.getElementById('placeholder-0');
var placeholder1 = document.getElementById('placeholder-1');
var placeholder2 = document.getElementById('placeholder-2');

placeholder0.addEventListener('click', clickManager);
placeholder1.addEventListener('click', clickManager);
placeholder2.addEventListener('click', clickManager);


function renderResults() {
  // placeholder0.removeEventListener('click', clickManager);
  // placeholder1.removeEventListener('click', clickManager);
  // placeholder2.removeEventListener('click', clickManager); 

  var finalResultsList = document.getElementById('final-results');
  var ulElement = document.createElement('ul');

  for (var i = 0; i <= productStorage.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = productStorage[i].productName + ' had ' + productStorage[i].timesProductClicked + ' votes and was shown ' + productStorage[i].timesProductShown + ' times.';
    finalResultsList.append(liElement);
  }
}
