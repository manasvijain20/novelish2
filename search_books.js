function home(){
  window.location.href = "index.html";
}
function search_books(){
   var tab = "";
   fetch(
     "https://www.googleapis.com/books/v1/volumes?q=" +
       document.getElementById("search_book").value
   )
     .then(function (res) {
       return res.json();
     })
     .then(function (result) {
      document.getElementById("centre_img").style.display = "none";
     console.log(result);
       items = result.items;
       for (i of items) {
        //  console.log(i);
         // START OF CONTENT DESIGN       
         var new_div = document.createElement("div");
         var rating = i.volumeInfo.averageRating;
         var summary = i.volumeInfo.description;
         if (summary == undefined){
            summary = "Can't find Summary";
         }
         console.log(rating);
         if(rating == undefined){
           rating = "Not rated";
         }
        //  TO DO - summary check
          var book_display_div = `<div class="card stretched-link" style=" margin-bottom:25px; width:63%; background-color: #600173; padding: 25px; border-radius: 25px; box-shadow: 10px 10px 5px #52006A; margin-left: 240px;">
          <img class="card-img-top" style="border-radius:25px; margin-bottom:10px" src="${i.volumeInfo.imageLinks.thumbnail}" alt="Card image">
          <label style="font-family: 'Cinzel', serif; font-size: 27px; color: thistle; padding-left:15px;" class="title"><b>${i.volumeInfo.title} </b></label> 
          <br>
          <div style="border:1px solid thistle; border-radius:20px; padding:10px">
          <i style="color:thistle;" class="fas fa-pen-nib"></i>
          <label class="author" style=" margin-top:4px ;font-size: 19px; color: thistle"> Author : <i>${i.volumeInfo.authors[0]}</i> </label>
          <br>
          <i  style="color:thistle;" class="fas fa-star"></i>
          <label class="rating" style="font-size: 18px; color: thistle;"> Rating : <i>${rating}</i> </label>
         <br>
         <i style="color:thistle;" class="fas fa-copy"></i>
         <label class="page_count" style=" font-size: 17px; color: thistle;"> Page Count : <i>${i.volumeInfo.pageCount}</i> </label>
         <br>
         <i style="color:thistle;" class="fas fa-newspaper"></i>
         <label  style="color: thistle;"> Summary :</label>
         <br>
         <label class="description" style="color: thistle;"> ${summary} </label>
       <br>
         <input style = "float:right;" type="image" src="filled2.png" onclick="this.src='filled.png'">
        <br>
         </div>
         </div> `;
         new_div.innerHTML = book_display_div;
          document.getElementById("main").appendChild(new_div);
       }
   
     //END OF CONTENT DESIGN
     }),
     function (error) {
       console.log(error);
     };
 }