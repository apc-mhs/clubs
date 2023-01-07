fetch("clubs.json")
.then(function(response){
   return response.json();
})
.then(function(clubs){
   let placeholder = document.querySelector("#grid");
   let out = "";
   for(let club of clubs){
      out += `
        <div class="card 1" data-category="Arts" onclick = "showInfo()">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /></div>
            <div class="card_title title-white">
                <p>${club.club}</p>
            </div>
            <div class="card_icon"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
        </div>
      `;
   }
 
   placeholder.innerHTML = out;
});