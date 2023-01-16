var $filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function() {
  
  var selectedFilters = {};

  $filterCheckboxes.filter(':checked').each(function() {
    this.parentElement.children[1].style.backgroundColor = "grey";
    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }
    selectedFilters[this.name].push(this.value);
  });
  $filterCheckboxes.filter(':not(:checked)').each(function(){
    this.parentElement.children[1].style.backgroundColor = "white";
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.card');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
        currentFilterValues = $(this).data('category').split(' ');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.card').hide().filter($filteredResults).show();
}

$filterCheckboxes.on('change', filterFunc); 

//Club Info Popup

var showInfo = function(values){
  
  var modal = document.getElementById("popup");
  var overlay = document.getElementById("overlay");
  var description = document.getElementById("club-description");
  
  var found = findClubInfo(values);
  description.innerHTML=found[0].description;
  
  modal.style.display = "block";
  overlay.style.display = "block";
}

var data = null;
fetch("clubs.json")
  .then((response)=> response.json())
  .then((json)=>data=json);

function findClubInfo(name){
  return data.filter(
    function(data){
      return data.club == name;
    }
  )
}

window.onclick = function(event) {
  
  var modal = document.getElementById("popup");
  var overlay = document.getElementById("overlay");
  if (event.target == overlay) {
    overlay.style.display = "none";
    modal.style.display = "none";
  }
  
}