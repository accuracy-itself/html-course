let hiddenItems = [];
let favouriteItems = [];
let comparisonItems = [];
var filtration = document.querySelector(".filtration__radio-filters");
var filterHidden = document.getElementById("showhidden");

function toggleItemFilter(itemId, className, filterArray) {
  const tile = document.getElementById(itemId);
  if (tile.classList.contains(className)) {
    tile.classList.remove(className);
    const index = filterArray.indexOf(itemId);
    if (index > -1) {
      filterArray.splice(index, 1);
    }
    if (
      document.querySelector(
        ".filtration__radio-filter.filtration__radio-filter_selected"
      ).dataset.filter == className
    ) {
      tile.classList.add("filter-hidden");
    }
  } else {
    tile.classList.add(className);
    filterArray.push(itemId);
  }
}

function clickIcon(target, className, array) {
  const itemId = target.closest(".catalog-item").id;
  toggleItemFilter(itemId, className, array);
  target.closest(".catalog-item__icons__icon").classList.toggle("icon-active");
}

function changeHidden(checked) {
  document.querySelectorAll(".catalog-item").forEach((item) => {
    if (
      checked &&
      hiddenItems.includes(item.id) &&
      item.classList.contains("hidden")
    ) {
      item.classList.remove("hidden");
    } else if (!checked && item.classList.contains("transparent")) {
      item.classList.add("hidden");
    }
  });
}

function filterItem(filter, item) {
  switch (filter) {
    case "all":
      item.classList.remove("filter-hidden");
      break;

    case "favourite":
      if (item.classList.contains("favourite")) {
        item.classList.remove("filter-hidden");
      } else {
        item.classList.add("filter-hidden");
      }
      break;

    case "comparison":
      if (item.classList.contains("comparison")) {
        item.classList.remove("filter-hidden");
      } else {
        item.classList.add("filter-hidden");
      }
      break;
  }
}

function clickFilter(e) {
  var _target = e.target;
  if (
    _target.classList.contains("filtration__radio-filter") &&
    !_target.classList.contains("filtration__radio-filter_selected")
  ) {
    document
      .querySelectorAll(".filtration__radio-filter")
      .forEach(function (filter) {
        if (filter.dataset.filter === _target.dataset.filter) {
          filter.classList.add("filtration__radio-filter_selected");
        } else {
          filter.classList.remove("filtration__radio-filter_selected");
        }
      });

    document.querySelectorAll(".catalog-item").forEach(function (item) {
      filterItem(_target.dataset.filter, item);
    });
  }
}

function loadContent() {
  hiddenItems = JSON.parse(localStorage.getItem("hiddenItems")) || [];
  favouriteItems = JSON.parse(localStorage.getItem("favouriteItems")) || [];
  comparisonItems = JSON.parse(localStorage.getItem("comparisonItems")) || [];
  updateTiles(hiddenItems, "transparent", ".catalog-item__icons__icon.show-hide");
  updateTiles(favouriteItems, "favourite", ".catalog-item__icons__icon.favourites");
  updateTiles(comparisonItems, "comparison", ".catalog-item__icons__icon.comparison");
}

function updateTiles(array, itemClassName, iconClassName) {
  array.forEach(function (itemId) {
    var item = document.getElementById(itemId);
    item.classList.add(itemClassName);
    item.querySelector(iconClassName).classList.add("icon-active");  
  });
}

document
  .querySelectorAll(".catalog-item__icons__icon.show-hide")
  .forEach((icon) => {
    icon.addEventListener("click", function () {
      clickIcon(this, "transparent", hiddenItems);
    });
  });

document
  .querySelectorAll(".catalog-item__icons__icon.favourites")
  .forEach((icon) => {
    icon.addEventListener("click", function () {
      clickIcon(this, "favourite", favouriteItems);
    });
  });

document
  .querySelectorAll(".catalog-item__icons__icon.comparison")
  .forEach((icon) => {
    icon.addEventListener("click", function () {
      clickIcon(this, "comparison", comparisonItems);
    });
  });

document.getElementById("showhidden").addEventListener("change", function () {
  changeHidden(this.checked);
});

filtration.addEventListener("click", function (e) {
  clickFilter(e);
});

document.addEventListener("DOMContentLoaded", loadContent);

window.onbeforeunload = function() {
  localStorage.setItem('hiddenItems', JSON.stringify(hiddenItems));
  localStorage.setItem('favouriteItems', JSON.stringify(favouriteItems));
  localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
};
