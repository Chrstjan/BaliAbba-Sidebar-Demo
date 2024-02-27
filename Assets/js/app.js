//GLOBALS
const hamburgerBtn = document.getElementById("hamburger");
const mainNavElement = document.getElementById("main-list");

hamburgerBtn.addEventListener("click", () => {
  mainNavElement.classList.toggle("show-sidebar");
});

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

  let navigationArray = [
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
  console.log(productData);
}

function navCallback(clickedCategory) {
  console.log(clickedCategory);
}

//View Code
function buildSidebar(navigationData) {
  //console.log(navigationData);
  navigationData.forEach((supCategory) => {
    let sidebarCategories = `
    <li class="sup-category">
        <button class="sidebar-category" onclick="navCallback('${supCategory.supCategory}')">${supCategory.supCategory}</button>
    </li>`;

    mainNavElement.innerHTML += sidebarCategories;
  });
}
