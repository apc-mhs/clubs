//Fetch Data
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRV-lE8e4EztqGaDDJQKAy12Qgm4UcXJbtH0KI4Rkmygg7uiJiMzn-Jm_1sH2C0mkLL6PYyQmTb1mKL/pub?output=csv';
let data = null;
Papa.parse(url, {
   header:true,
	download: true,
	complete: loadInfo
});

function loadInfo(results){
   data = results.data;

   let placeholder = document.querySelector("#grid");
   let out = "";

   $.each(data, function(i, club){

      let name = club.Club.replace("$", "'");
      out += `<div class="card" data-category="`;
      if(club.Main_tags){
         const tagsList = club.Main_tags.split(", ");
         for(let tag of tagsList){
            out+= `${tag}`;
         }
      }
      
      out+= `" onclick = "showInfo('${club.Club}')">`;
      
      out += `
         <div class="card_title">${name}</div>`
      if(club.Icon){
         out+= `<div class="card_icon"> <img src=${club.Icon}></div>`
      }
      else{
         out += `<div class="card_icon"> <img src=https://fccps.schoology.com/sites/all/themes/schoology_theme/images/group-default.svg?0></div>`
      }
      out+=`<div class="tag_container">`;
      
      if(club.Main_tags){
         const tagsList = club.Main_tags.split(", ");
         for(let tag of tagsList){
            out += `<div class="card_tag">${tag}</div>`;
         }
      }
      
      out+= `</div></div>`;
   });
   placeholder.innerHTML = out;
};

//Tag Filtering

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

function showInfo(values){
  
  var modal = document.getElementById("popup");
  var overlay = document.getElementById("overlay");
  var sponsor = document.getElementById("sponsor-info");
  var location = document.getElementById("location-info");
  var date = document.getElementById("date-info");
  var schoology = document.getElementById("schoology-info");
  var name = document.getElementById("club-name");
  
  var found = findClubInfo(values);
  
  sponsor.innerHTML = "Sponsor: "+ found[0].Sponsor;
  location.innerHTML = "Room: " + found[0].Location;
  date.innerHTML = "Meeting date: " + found[0].Meeting_date;
  //Set Schoology link
  var link = schoology.querySelector("a");
  link.getAttribute("href");
  link.setAttribute("href", found[0].Link);
  link.textContent = "Schoology";
  name.innerHTML = found[0].Club.replace("$", "'");
  
  modal.style.display = "block";
  overlay.style.display = "block";
}

function findClubInfo(name){
  return data.filter(
    function(data){
      return data.Club == name;
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