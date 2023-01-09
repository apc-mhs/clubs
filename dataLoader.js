fetch("clubs.json")
.then(function(response){
   return response.json();
})
.then(function(clubs){
   let placeholder = document.querySelector("#grid");
   let out = "";
   for(let club of clubs){
      //<div class="card_image"> <img src=${club.icon} /></div>
      out += `<div class="card" data-category="`;
      if(club.maintags){
         const tagsList = club.maintags.split(", ");
         for(let tag of tagsList){
            out+= `${tag}`;
         }
      }
      out+= `" onclick = "showInfo()">`;
      out += `
         <div class="card_title">${club.club}</div>
         <div class="card_icon"> <img src=${club.icon}></div>
         <div class="tag_container">
      `;
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