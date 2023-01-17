fetch("clubs.json")
.then(function(response){
   return response.json();
})
.then(function(clubs){
   let placeholder = document.querySelector("#grid");
   let out = "";
   for(let club of clubs){
      //<div class="card_image"> <img src=${club.icon} /></div>
      let name = club.club.replace("$", "'");
      out += `<div class="card" data-category="`;
      if(club.maintags){
         const tagsList = club.maintags.split(", ");
         for(let tag of tagsList){
            out+= `${tag}`;
         }
      }
      //console.log(club);
      
      out+= `" onclick = "showInfo('${club.club}')">`;
      
      out += `
         <div class="card_title">${name}</div>`
      if(club.icon){
         out+= `<div class="card_icon"> <img src=${club.icon}></div>`
      }
      else{
         out += `<div class="card_icon"> <img src=https://fccps.schoology.com/sites/all/themes/schoology_theme/images/group-default.svg?0></div>`
      }
      out+=`<div class="tag_container">`;
      
      if(club.subtags){
         const tagsList = club.subtags.split(", ");
         for(let tag of tagsList){
            out += `<div class="card_tag">${tag}</div>`;
         }
      }
      
      out+= `</div></div>`;

   }
 
   placeholder.innerHTML = out;
});