fetch("clubs.json")
.then(function(response){
   return response.json();
})
.then(function(clubs){
   let placeholder = document.querySelector("#grid");
   let out = "";
   for(let club of clubs){
      //<div class="card_image"> <img src=${club.icon} /></div>
      out += `
        <div class="card 1" data-category="Arts" onclick = "showInfo()">
            
            <div class="card_title title-white"><p>${club.club}</p></div>
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