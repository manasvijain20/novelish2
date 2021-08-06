var div = ""

function home() {
   window.location.href = "index.html";
}

function submit_button(){
   document.getElementById("email_box").style.display = "none";  
}
function email(){
   var new_div = document.createElement("div");
               var email_div = ` <div class="form">
               <form action="https://formspree.io/f/xeqvrrla" method="POST">
               <div class="row">
                 <div class="col-md-6 form-group">
                   <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                     data-rule="minlen:4" data-msg="Please enter at least 4 characters">
                 </div>
                 <div class="col-md-6 form-group mt-3 mt-md-0">
                   <input type="email" class="form-control" name="email" id="email" placeholder="Your Email"
                     data-rule="email" data-msg="Please enter a valid email">
                 </div>
               </div>
               <div class="form-group mt-3">
                 <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
               </div>
               <div class="form-group mt-3">
                 <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
               </div>
               <div class="my-3">
       
                 <div class="error-message"></div>
               </div>
               <div class="text-center">
               <button onclick="submit_button()" type="submit" style='margin-bottom:20px; color:#52006A; background-color:thistle;'class="btn">Send Message</button>
               </div>
             </form>
           </div>
               </div> `;
               new_div.innerHTML = email_div;
               document.getElementById("email_box").appendChild(new_div);
}


function submit() {
   console.log("entered");
   let username = document.getElementById("username").value;
   let authorName = document.getElementById("author_name").value;
   let bookName = document.getElementById("book_name").value;
   bookName = bookName.toString().toUpperCase();
   let review = document.getElementById("user_review").value;
   firebase.database().ref('BookReviews/' + username + '/' + bookName).set({
      authorName: authorName,
      review: review,
   });
   console.log("exited");
   var brRef = firebase.database().ref("BookReviewsdemo");
   brRef.push({
      username: username,
      author: authorName,
      bookname: bookName,
      review: review
   });
   swal({
      title: "Success",
      text: "Your review was submitted",
      icon: "success",
      button: "OK",
   });
   document.getElementById("book_name").value = ""
   document.getElementById("author_name").value = ""
   document.getElementById("user_review").value = ""
}

function getData() {
   document.getElementById("div_img").style.display = "none"
   // var ref = firebase.database().ref("BookReviews");

   //  ref.on("value", function(snapshot) {
   //     console.log(snapshot.val());
   //  }, function (error) {
   //     console.log("Error: " + error.code);
   //  });

   var searchRef = firebase.database().ref("BookReviewsdemo");

   searchRef.orderByValue().on("value",
      function (data) {

         data.forEach(function (data) {
            console.log("Key" + data.key + " value is " + data.val());
            let tempobj = data.val();
            console.log(tempobj.bookname);
            let search_text = document.getElementById("search_book").value;
            search_text = search_text.toString().toUpperCase();
            if (search_text == tempobj.bookname) {
               console.log(tempobj.review);
               var new_div = document.createElement("div");
               var review_display_div = `<br><div style=" margin-top: 15px; margin-left:100px; margin-right:100px; border-radius: 25px;
          padding-top:10px ;padding-right:25px ;padding-left:25px; padding-bottom:27px;
           background-color:#600173;" id="review_div">  
          <br>
          <i style="color:thistle;" class="fas fa-book fa-3x"></i>
           <label style="font-size: 28px; font-weight:bold; margin-top: 1px; color:thistle; id="bookname_label">${tempobj.bookname} </label>
         <hr>
         <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
       width="34" height="30"
       viewBox="0 0 172 172"
       style=" fill:#ffffff;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#d8bfd8"><path d="M120.4,17.2l-17.2,17.2l34.4,34.4l17.2,-17.2zM92.13646,45.90026c-2.79714,-0.0817 -5.63013,0.85848 -7.88333,2.81068l-0.0112,-0.0224c-6.06587,6.06587 -15.44192,8.64479 -26.90859,8.64479c-9.40267,0 -15.63381,5.79022 -18.91328,16.74089c-9.82693,32.8348 -17.48613,56.22564 -20.08906,64.30964l0.03359,0.0112c-0.72813,1.4964 -1.16458,3.16095 -1.16458,4.93828c0,1.02053 0.17899,1.98786 0.42552,2.93386l45.86667,-45.86667c-0.24653,-0.946 -0.42552,-1.91332 -0.42552,-2.93386c0,-6.33533 5.13133,-11.46667 11.46667,-11.46667c3.1648,0 6.03182,1.28391 8.10729,3.35938c2.07547,2.07547 3.35938,4.94249 3.35938,8.10729c0,6.33533 -5.13133,11.46667 -11.46667,11.46667c-1.02053,0 -1.98786,-0.17899 -2.93386,-0.42552l-45.86667,45.86667c0.946,0.24653 1.91332,0.42552 2.93385,0.42552c1.77733,0 3.44188,-0.43099 4.93828,-1.15339l0.0112,0.02239c8.084,-2.60293 31.47483,-10.25093 64.30963,-20.07786c10.95067,-3.2852 16.74089,-9.52181 16.74089,-18.92448c0,-11.46667 2.57892,-20.84272 8.64479,-26.90859l-0.02239,-0.0112c3.9044,-4.5064 3.7677,-11.31044 -0.51511,-15.5875l-11.46667,-11.46667l-11.46667,-11.46667c-2.14139,-2.1414 -4.90702,-3.24408 -7.70417,-3.32578z"></path></g></g></svg>
         <label style="font-size: 20px; font-weight:lighter; color:thistle;" id="authorname_label"> ${tempobj.author} </label>
        <br> 
      <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#d8bfd8"><path d="M51.6,22.93333c-6.6908,0 -15.30979,1.51091 -22.61979,2.97865c-7.31,1.462 -13.16875,2.92266 -13.16875,2.92266c-2.55707,0.6364 -4.34479,2.93376 -4.34479,5.56536v7.32344c-3.41707,1.98947 -5.73333,5.63963 -5.73333,9.87656v86c0,6.33533 5.13133,11.46667 11.46667,11.46667h54.22031c1.83467,-1.4448 3.90619,-2.69306 6.13646,-3.65052c5.33773,-2.28187 10.19467,-3.4641 15.73307,-3.7737l-3.98646,-9.23828c-2.0124,-0.45867 -21.99405,-6.27083 -37.70339,-6.27083c-12.6248,0 -26.3504,3.78919 -28.66667,4.32239v-91.45338c2.20733,-0.52747 3.68259,-0.92459 8.28646,-1.84766c7.02333,-1.40467 15.60434,-2.75469 20.38021,-2.75469c4.77587,0 13.35688,1.35002 20.38021,2.75469c4.60387,0.92307 6.07912,1.32019 8.28646,1.84766v36.63958c2.5628,-2.3392 5.63524,-4.11734 9.10391,-4.98307c0.774,-0.1892 1.57156,-0.19368 2.36276,-0.29114v-31.36537c2.20733,-0.52747 3.68259,-0.93032 8.28646,-1.84766c7.02334,-1.4104 15.60434,-2.75469 20.38021,-2.75469c4.77587,0 13.35688,1.35002 20.38021,2.75469c4.60959,0.92307 6.07912,1.32592 8.28646,1.84766v53.89557c0.76827,0.1548 1.53331,0.31336 2.28438,0.55989c0.90587,-0.54467 1.86853,-1.02573 2.88906,-1.45573c2.2704,-0.95747 4.6732,-1.44453 7.14427,-1.44453c1.67986,0 3.31709,0.24761 4.88229,0.67187v-39.62942c0,-4.23693 -2.31627,-7.8871 -5.73333,-9.87656v-7.32344c0,-2.6316 -1.78772,-4.92323 -4.34479,-5.56536c0,0 -5.85876,-1.46066 -13.16876,-2.92266c-7.30999,-1.462 -15.92899,-2.97865 -22.61979,-2.97865c-6.6908,0 -15.30979,1.51091 -22.61979,2.97865c-6.54174,1.3072 -10.71954,2.34538 -11.78021,2.60912c-1.06067,-0.26373 -5.23848,-1.30192 -11.78021,-2.60912c-7.31,-1.46773 -15.92899,-2.97865 -22.61979,-2.97865zM93.83854,81.54323c-0.57012,0.02492 -1.14067,0.10446 -1.71329,0.24636c-5.83653,1.45053 -8.75946,7.65292 -6.49479,12.94479l25.39687,59.1362c-13.5364,-0.90013 -19.38888,-2.01079 -28.95781,2.08281c-4.35733,1.86333 -8.77809,6.04929 -6.67396,10.96276l0.79505,1.85886l23.44844,3.225h72.36094v-56.22474l-4.04245,-9.43984c-1.5136,-3.5432 -5.71174,-5.2589 -9.26067,-3.7625c-1.66841,0.69947 -2.77136,1.57461 -3.49376,2.47474c-1.19826,1.50213 -3.43426,1.6271 -5.01667,0.5263c-2.09266,-1.45627 -5.00932,-2.38265 -8.66718,-0.81745c-2.17867,0.93453 -3.59543,2.2816 -4.51276,3.59454c-1.1352,1.62826 -3.40094,1.75297 -4.97187,0.5375c-2.17867,-1.68561 -5.45231,-2.88781 -9.79818,-1.03021c-2.63733,1.12947 -4.17798,2.78971 -5.08385,4.40078c-0.77973,1.38173 -2.75111,1.34429 -3.38177,-0.11198l-10.52604,-24.40026c-1.6254,-3.79762 -5.41541,-6.37806 -9.40624,-6.20365z"></path></g></g></svg>
        <label id="review_by_user" style="font-size: 17px; font-weight: lighter;padding-left:10px; margin-top: 10px; color: thistle;" > ${tempobj.review} </label>
        <br>
        <i style="color:thistle;" class="fas fa-at"></i>
        <label style=" font-size:15px; color: thistle; margin-top: 10px;
         font-size:15px ; id="username_label">${tempobj.username}</label> 
         <input style = "float:right;" type="image" src="filled2.png" onclick="this.src='filled.png'">
        <br>
          </div> `;
               new_div.innerHTML = review_display_div;
               document.getElementById("main").appendChild(new_div);
            }
         });
      });
}


// function search_books(){
//    var tab = "";
//    fetch(
//      "https://www.googleapis.com/books/v1/volumes?q=" +
//        document.getElementById("search_book").value
//    )
//      .then(function (res) {
//        return res.json();
//      })
//      .then(function (result) {
//      console.log(result);
//        items = result.items;
//        for (i of items) {
//          console.log(i);
//          START OF CONTENT DESIGN       
//          var new_div = document.createElement("div");
//          var review_display_div = `<br><div style="margin-left:100px; margin-right:100px; border-radius: 25px;
//           padding-top:10px ;padding-right:25px ;padding-left:25px; padding-bottom:27px;
//            background-color:#600173;" id="review_div">  
//           <br>
//            <label style=" font-size: 28px; font-weight:bold; margin-top: 1px; color:thistle; padding-left: 10px;" id="bookname_label">${i.volumeInfo.title} </label>
//          <br>
//          <label style="font-size: 19px; font-weight:lighter;color:thistle; padding-left: 10px;" id="authorname_label"> ${i.volumeInfo.authors} </label>
//         <br> 
//         <label id="review_by_user" style="font-size: 17px; font-weight: lighter;padding-left:10px; margin-top: 10px; color: thistle;" > ${tempobj.review} </label>
//         <br>
//         <label style=" font-size:15px; color: thistle; margin-top: -20px;
//         padding: 5px; font-size:15px ;padding-left: 10px;" id="username_label" >${tempobj.username}</label> 
//           </div> `;
//          new_div.innerHTML = review_display_div;
//          document.getElementById("main").appendChild(new_div);
//        }

//      //END OF CONTENT DESIGN
//      }),
//      function (error) {
//        console.log(error);
//      };
//  }