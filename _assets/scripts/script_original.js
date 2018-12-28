
let productBox = 1;
let refreshProductsObject = "";


document.addEventListener("DOMContentLoaded", () => {

  // AJAX
  const url = "http://tomaszgrzyb.eu/projects/shop_page/_assets/scripts/products.json";

  const request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function () {
    if (request.status === 200) {
      const products = JSON.parse(request.responseText);
      refreshProductsObject = products;
      updateElements(products);
    }
  };

  request.send(null);


  // SHOW_PRODUCTS
  const productsCounter = document.getElementById("productsCounter");

  for (let i = 0; i < (productsCounter.value - productBox); i++) {
    createElements();
  }

  productsCounter.addEventListener("change", (e) => {
    removeElements();
    for (let i = 0; i < (e.target.value - productBox); i++) {
      createElements();
    }
    updateElements(refreshProductsObject);
  }, false);

}, false);


// CREATE_ELEMENTS
function createElements() {

  const products = document.querySelector(".products");
  const productBox = document.querySelector(".productBox");
  const codeHTML = productBox.innerHTML;

  // CREATE_NEW_ELEMENT
  const productBoxNew = document.createElement("section");
  productBoxNew.classList.add("productBox");
  productBoxNew.innerHTML = codeHTML;

  products.appendChild(productBoxNew);

}


// REMOVE_ELEMENTS
function removeElements() {
  const products = document.querySelector(".products");
  let productBox = document.querySelectorAll(".productBox");
  productBox = [...productBox];
  productBox.forEach((items, index) => {
    if (index > 0) {
      products.removeChild(items);
    }
  });
}


// UPDATE_ELEMENTS
function updateElements(products) {

  let product = document.querySelectorAll(".products .product");
  let productTitle = document.querySelectorAll(".products .product .title");
  let price = document.querySelectorAll(".products .product .price");
  let oldPrice = document.querySelectorAll(".products .product .oldPrice");
  let company = document.querySelectorAll(".products .product .company");

  product = [...product];
  productTitle = [...productTitle];
  price = [...price];
  oldPrice = [...oldPrice];
  company = [...company];


  // PRODUCT
  product.forEach((items, index) => {

    if (index < products.count) {

      items.removeChild(items.firstChild);

      const urlNameImage = products.list[index].main_image;
      const urlImage = `https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${urlNameImage}.jpg`;

      const image = new Image();
      image.src = urlImage;

      items.prepend(image);

    } else {

      items.removeChild(items.firstChild);

      const image = new Image();
      image.src = `http://tomaszgrzyb.eu/projects/shop_page/_assets/img/empty_banner.png`;

      items.prepend(image);

    }

  });


  // PRODUCT_TITLE
  productTitle.forEach((items, index) => {

    if (index < products.count) {
      items.innerHTML = products.list[index].name;
    } else {
      items.innerHTML = "Twoja reklama";
    }

  });


  // PRICE
  price.forEach((items, index) => {

    if (index < products.count) {
      items.innerHTML = products.list[index].price.gross.base;
    } else {
      items.innerHTML = "50 zł/msc.";
    }

  });


  // OLD_PRICE
  oldPrice.forEach((items, index) => {

    if (index < products.count) {
      items.innerHTML = products.list[index].price.gross.promo;
    } else {
      items.innerHTML = "150 zł/msc.";
    }

  });


  // COMPANY
  company.forEach((items, index) => {

    if (index < products.count) {
      items.innerHTML = products.list[index].producer.name;
    } else {
      items.innerHTML = "Promocja!";
    }

  });


}