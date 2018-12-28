"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var productBox = 1;
var refreshProductsObject = "";

document.addEventListener("DOMContentLoaded", function () {

  // AJAX
  var url = "http://tomaszgrzyb.eu/projects/shop_page/_assets/scripts/products.json";

  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function () {
    if (request.status === 200) {
      var products = JSON.parse(request.responseText);
      refreshProductsObject = products;
      updateElements(products);
    }
  };

  request.send(null);

  // SHOW_PRODUCTS
  var productsCounter = document.getElementById("productsCounter");

  for (var i = 0; i < productsCounter.value - productBox; i++) {
    createElements();
  }

  productsCounter.addEventListener("change", function (e) {
    removeElements();
    for (var _i = 0; _i < e.target.value - productBox; _i++) {
      createElements();
    }
    updateElements(refreshProductsObject);
  }, false);
}, false);

// CREATE_ELEMENTS
function createElements() {

  var products = document.querySelector(".products");
  var productBox = document.querySelector(".productBox");
  var codeHTML = productBox.innerHTML;

  // CREATE_NEW_ELEMENT
  var productBoxNew = document.createElement("section");
  productBoxNew.classList.add("productBox");
  productBoxNew.innerHTML = codeHTML;

  products.appendChild(productBoxNew);
}

// REMOVE_ELEMENTS
function removeElements() {
  var products = document.querySelector(".products");
  var productBox = document.querySelectorAll(".productBox");
  productBox = [].concat(_toConsumableArray(productBox));
  productBox.forEach(function (items, index) {
    if (index > 0) {
      products.removeChild(items);
    }
  });
}

// UPDATE_ELEMENTS
function updateElements(products) {

  var product = document.querySelectorAll(".products .product");
  var productTitle = document.querySelectorAll(".products .product .title");
  var price = document.querySelectorAll(".products .product .price");
  var oldPrice = document.querySelectorAll(".products .product .oldPrice");
  var company = document.querySelectorAll(".products .product .company");

  product = [].concat(_toConsumableArray(product));
  productTitle = [].concat(_toConsumableArray(productTitle));
  price = [].concat(_toConsumableArray(price));
  oldPrice = [].concat(_toConsumableArray(oldPrice));
  company = [].concat(_toConsumableArray(company));

  // PRODUCT
  product.forEach(function (items, index) {

    if (index < products.count) {

      items.removeChild(items.firstChild);

      var urlNameImage = products.list[index].main_image;
      var urlImage = "https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_" + urlNameImage + ".jpg";

      var image = new Image();
      image.src = urlImage;

      items.prepend(image);
    } else {

      items.removeChild(items.firstChild);

      var _image = new Image();
      _image.src = "http://tomaszgrzyb.eu/projects/shop_page/_assets/img/empty_banner.png";

      items.prepend(_image);
    }
  });

  // PRODUCT_TITLE
  productTitle.forEach(function (items, index) {

    if (index < products.count) {
      items.innerHTML = products.list[index].name;
    } else {
      items.innerHTML = "Twoja reklama";
    }
  });

  // PRICE
  price.forEach(function (items, index) {

    if (index < products.count) {
      items.innerHTML = products.list[index].price.gross.base;
    } else {
      items.innerHTML = "50 zł/msc.";
    }
  });

  // OLD_PRICE
  oldPrice.forEach(function (items, index) {

    if (index < products.count) {
      items.innerHTML = products.list[index].price.gross.promo;
    } else {
      items.innerHTML = "150 zł/msc.";
    }
  });

  // COMPANY
  company.forEach(function (items, index) {

    if (index < products.count) {
      items.innerHTML = products.list[index].producer.name;
    } else {
      items.innerHTML = "Promocja!";
    }
  });
}