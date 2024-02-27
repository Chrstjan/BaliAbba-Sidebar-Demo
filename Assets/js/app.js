//GLOBALS
const hamburgerBtn = document.getElementById("hamburger");
const mainNavElement = document.getElementById("main-list");
const cardsContainer = document.getElementById("cards-container");

hamburgerBtn.addEventListener("click", () => {
  mainNavElement.classList.toggle("show-sidebar");
});

let navigationArray = [];
let allProducts = null;

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
  //console.log(categoryData);

  let allCategories = categoryData;

  let eletronics = [];
  let cosmetics = [];
  let decor = [];
  let clothes = [];
  let accessories = [];
  let vehicles = [];
  let misc = [];

  allCategories.forEach((category) => {
    switch (category) {
      case "smartphones":
      case "laptops": {
        eletronics.push(category);
        break;
      }

      case "fragrances":
      case "skincare": {
        cosmetics.push(category);
        break;
      }

      case "home-decoration":
      case "furniture":
      case "lighting": {
        decor.push(category);
        break;
      }

      case "tops":
      case "womens-dresses":
      case "womens-shoes":
      case "mens-shirts":
      case "mens-shoes": {
        clothes.push(category);
        break;
      }

      case "mens-watches":
      case "womens-watches":
      case "womens-bags":
      case "womens-jewellery":
      case "sunglasses": {
        accessories.push(category);
        break;
      }

      case "automotive":
      case "motorcycle": {
        vehicles.push(category);
        break;
      }

      default: {
        misc.push(category);
        break;
      }
    }
  });
  //console.log(eletronics);

  navigationArray = [
    {
      supCategory: "Eletronics",
      subCategories: eletronics,
    },
    {
      supCategory: "Cosmetics",
      subCategories: cosmetics,
    },
    {
      supCategory: "Decor",
      subCategories: decor,
    },
    {
      supCategory: "Clothes",
      subCategories: clothes,
    },
    {
      supCategory: "Accessories",
      subCategories: accessories,
    },
    {
      supCategory: "Vehicles",
      subCategories: vehicles,
    },
    {
      supCategory: "Misc",
      subCategories: misc,
    },
  ];

  buildSidebar(navigationArray);
}

function recivedProductData(productData) {
  //console.log(productData);
  allProducts = productData.products;

  //buildProductCard(allProducts);
}

function navCallback(clickedCategory) {
  //console.log(clickedCategory);

  let clickedSubCategoryArray = [];
  navigationArray.forEach((subCategory) => {
    if (subCategory.subCategories == clickedCategory) {
      clickedSubCategoryArray.push(subCategory);
    }
  });
  //console.log(clickedSubCategoryArray);
  buildCategoryCard(clickedSubCategoryArray);
}

function categoryCallback(clickedSubCategory) {
  //console.log(clickedSubCategory);
  let clickedProductCategory = [];
  allProducts.forEach((product) => {
    if (product.category == clickedSubCategory) {
      clickedProductCategory.push(product);
      // console.log(product);
    }
  });
  buildProductCard(clickedProductCategory);
}

//View Code
function buildSidebar(navigationData) {
  //console.log(navigationData);
  navigationData.forEach((supCategory) => {
    let sidebarCategories = `
    <li class="sup-category">
        <button class="sidebar-category" onclick="navCallback('${supCategory.subCategories}')">${supCategory.supCategory}</button>
    </li>`;

    mainNavElement.innerHTML += sidebarCategories;
  });
}

function buildCategoryCard(subCategories) {
  clearContainer();

  //console.log(subCategories);

  subCategories.forEach((supCategory) => {
    let supCategoryDiv = document.createElement("div");
    supCategoryDiv.classList.add("sup-container");
    supCategoryDiv.innerHTML = `<h2 class="sup-category">${supCategory.supCategory}</h2>`;
    cardsContainer.appendChild(supCategoryDiv);

    supCategory.subCategories.forEach((subCategory) => {
      let categoryCard = `<div class="sub-container"><button onclick="categoryCallback('${subCategory}')">${subCategory}</button></div>`;
      supCategoryDiv.innerHTML += categoryCard;
    });
  });
}

function buildProductCard(products) {
  clearContainer();
  console.log(products);

  products.forEach((product) => {
    let productCard = `
      <figure>
        <header><h2>${product.title}</h2></header>
        <img src="${product.thumbnail}" alt="${product.title}"/>
        <figcaption>
          <span>
            <span>
              <p>${product.rating}</p>
              <p>&starf;</p>
            </span>
          </span>
          <span>
            <h4>${product.price} $</h4>
            <button>Add to cart</button>
          </span>
          <h3>${product.description}</h3>
          <footer>
            <h5>${product.stock} in stock</h5>
          </footer>
        </figcaption>
      </figure>
  `;

    cardsContainer.innerHTML += productCard;
  });
}

function clearContainer() {
  cardsContainer.innerHTML = "";
}
