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
  var sponsor = document.getElementById("sponsor-info");
  var location = document.getElementById("location-info");
  var date = document.getElementById("date-info");
  var tags = document.getElementById("tag-info");
  var name = document.getElementById("club-name");
  
  var found = findClubInfo(values);
  if(found[0].description){
    description.innerHTML=found[0].description;
  }
  else{
    description.innerHTML="More information to be added...";
  }
  
  sponsor.innerHTML = "Sponsor: "+ found[0].sponsor;
  location.innerHTML = "Room: " + found[0].location;
  date.innerHTML = "Meeting date: " + found[0].meetingDate;
  name.innerHTML = found[0].club.replace("$", "'");
  
  let out = "";
  if(found[0].maintags){
    const tagsList = found[0].maintags.split(", ");
    for(let tag of tagsList){
       out+= `
          <label class="tag">
              <span class="tag-content">${tag}</span>
          </label><br>
        `;
    }
  }
  if(found[0].subtags){
    const tagsList = found[0].subtags.split(", ");
    for(let tag of tagsList){
       out+= `
          <label class="tag">
              <span class="tag-content">${tag}</span>
          </label><br>
        `;
    }
  }
  tags.innerHTML = out;
  
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