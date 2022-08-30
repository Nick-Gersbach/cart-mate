//UI Variables
const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("new-task");
const gorceryList = document.getElementById("grocery-list");
const filter = document.getElementById("filter");
const clearBtn = document.getElementById("clear-tasks");

//Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event for local storage
  document.addEventListener("DOMContentLoaded", renderItemsFromLocalStorage);

  //Add Grocery Event
  groceryForm.addEventListener("submit", addGrocery);

  //Remove Item Event
  gorceryList.addEventListener("click", removeItem);

  //Clear All Event
  clearBtn.addEventListener("click", clearAll);

  //Filter Items
  filter.addEventListener("keyup", filterItems);
}

//Render Tasks From Local Storage
function renderItemsFromLocalStorage() {
  let items;

  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach(function (item) {
    //Create an li element with js and insert it into the ul groceryList
    const li = document.createElement("li");
    //Add a css class to the li element with JS for styling purposes
    li.className = "grocery-item";
    //Create Text Node and Append to li. This will add the text that you type into the add grocery input and render it into the li that you created to add to the ul
    li.appendChild(document.createTextNode(item));

    //create a div container for the icons
    const linkContainer = document.createElement("div");
    //Add class to div
    linkContainer.className = "link-container";
    //append to li
    li.appendChild(linkContainer);

    //Link 1 for the check mark

    const link1 = document.createElement("a");
    //Add Class to the link you created with js
    link1.className = "check-icon";
    //Add icon HTML
    link1.innerHTML = '<i class="fa-solid fa-check"></i>';
    //Append icon to li
    linkContainer.appendChild(link1);

    //Link 2 for the x

    //Create Link Element for the Font Awesome Buttons
    const link = document.createElement("a");
    //Add Class to the link you created with js
    link.className = "delete-icon";
    //Add icon HTML
    link.innerHTML = '</i><i class="fa-solid fa-xmark"></i>';
    //Append icon to li
    linkContainer.appendChild(link);

    //Append the li to the ul
    gorceryList.appendChild(li);
  });
}

//Add Item
function addGrocery(e) {
  if (groceryInput.value === "") {
    alert("Please Add a Grocery");
  }

  //Create an li element with js and insert it into the ul groceryList
  const li = document.createElement("li");
  //Add a css class to the li element with JS for styling purposes
  li.className = "grocery-item";
  //Create Text Node and Append to li. This will add the text that you type into the add grocery input and render it into the li that you created to add to the ul
  li.appendChild(document.createTextNode(groceryInput.value));

  //create a div container for the icons
  const linkContainer = document.createElement("div");
  //Add class to div
  linkContainer.className = "link-container";
  //append to li
  li.appendChild(linkContainer);

  //Link 1 for the check mark

  const link1 = document.createElement("a");
  //Add Class to the link you created with js
  link1.className = "check-icon";
  //Add icon HTML
  link1.innerHTML = '<i class="fa-solid fa-check"></i>';
  //Append icon to li
  linkContainer.appendChild(link1);

  //Link 2 for the x

  //Create Link Element for the Font Awesome Buttons
  const link = document.createElement("a");
  //Add Class to the link you created with js
  link.className = "delete-icon";
  //Add icon HTML
  link.innerHTML = '</i><i class="fa-solid fa-xmark"></i>';
  //Append icon to li
  linkContainer.appendChild(link);

  //Append the li to the ul
  gorceryList.appendChild(li);

  //Store in Local Storage
  storeItemInLocalStorage(groceryInput.value);

  //clear input
  if (groceryInput.value === "") {
    li.style.display = "none";
    link.style.display = "none";
  } else {
    groceryInput.value = "";
  }

  e.preventDefault();
}

//Store Task
function storeItemInLocalStorage(item) {
  let items;

  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));
}

//Remove Item/Cross Out Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-icon")) {
    if (confirm("Are you sure?")) {
      //Remove Item from UI
      e.target.parentElement.parentElement.parentElement.remove();

      //Remove Item from Local Storage as well
      removeItemFromLocalStorage(
        e.target.parentElement.parentElement.parentElement
      );
    }
  } else if (e.target.parentElement.classList.contains("check-icon")) {
    e.target.parentElement.parentElement.parentElement.style.textDecoration =
      "line-through";
  }
}

//Remove Items from local storage when deleted in UI
function removeItemFromLocalStorage(groceyItem) {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach(function (item, index) {
    if (groceyItem.textContent === item) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

//Clear All
function clearAll() {
  if (confirm("Are you sure?")) {
    gorceryList.innerHTML = "";
  }

  //Clear From LS
  clearAllItemsFromLocalStorage();
}

function clearAllItemsFromLocalStorage() {
  localStorage.clear();
}

//Filter Items
function filterItems(e) {
  const filterInputText = e.target.value.toLowerCase();

  document.querySelectorAll(".grocery-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterInputText) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
