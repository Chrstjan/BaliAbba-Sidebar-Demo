//GLOBALS
const hamburgerBtn = document.getElementById("hamburger");
const mainNavElement = document.getElementById("main-list");

//Calling functions
getCategoryData();
getProductData();

//Model Code
function getCategoryData() {
  fetch("https://dummyjson.com/products/categories?limit=0")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network was not okay");
      }
      return response.json();
    })
    .then((json) => {
      recivedCategoryData(json);
    })
    .catch((error) => {
      console.log("error fetching category data:", error);
    });
}

function getProductData() {
  fetch("https://dummyjson.com/products?limit=0")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      recivedProductData(json);
    })
    .catch((error) => {
      console.log("Error fetching product data:", error);
    });
}

//Controller Code
function recivedCategoryData(categoryData) {
  console.log(categoryData);
}

function recivedProductData(productData) {
  console.log(productData);
}
