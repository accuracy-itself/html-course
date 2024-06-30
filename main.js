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
      document.querySelector(".filtration__radio-filter.filter-selected")
        .dataset.filter == className
    ) {
      tile.classList.add("filter-hidden");
    }
  } else {
    tile.classList.add(className);
    if (!filterHidden.checked) {
      tile.classList.add("hidden");
    }
    filterArray.push(itemId);
  }
}

function addIconListener(icon, className) {
  icon.addEventListener("click", function () {
    const itemId = this.closest(".catalog-item").id;
    toggleItemFilter(itemId, className, hiddenItems);
    this.closest(".catalog-item__icons__icon").classList.toggle(
      "icon-active"
    );
  });
}

document
  .querySelectorAll(".catalog-item__icons__icon.show-hide i")
  .forEach((icon) => {
    addIconListener(icon, "transparent");
  });

document
  .querySelectorAll(".catalog-item__icons__icon.favourites i")
  .forEach((icon) => {
    addIconListener(icon, "favourite");
  });

document
  .querySelectorAll(".catalog-item__icons__icon.comparison i")
  .forEach((icon) => {
    addIconListener(icon, "comparison");
  });

document.getElementById("showhidden").addEventListener("change", function () {
  document.querySelectorAll(".catalog-item").forEach((item) => {
    if (
      this.checked &&
      hiddenItems.includes(item.id) &&
      item.classList.contains("hidden")
    ) {
      item.classList.remove("hidden");
    } else if (!this.checked && item.classList.contains("transparent")) {
      item.classList.add("hidden");
      hiddenItems.push(item.id);
    }
  });
});

filtration.addEventListener("click", function (e) {
  var _target = e.target;
  if (
    _target.classList.contains("filtration__radio-filter") &&
    !_target.classList.contains("filter-selected")
  ) {
    document
      .querySelectorAll(".filtration__radio-filter")
      .forEach(function (filter) {
        if (filter.dataset.filter === _target.dataset.filter) {
          filter.classList.add("filter-selected");
        } else {
          filter.classList.remove("filter-selected");
        }
      });

    document.querySelectorAll(".catalog-item").forEach(function (item) {
      switch (_target.dataset.filter) {
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
    });
  }
});
