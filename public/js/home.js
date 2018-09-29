var index = new Vue({
  el: "#vueContainer",
  data: {
    selectedCategory: "Events",
    categories: ["Events", "Jobs", "Courses", "Videos"],
    searchInput: ""
  },
  methods: {
    handleSearch: function() {
     var self = this;
      $.ajax({
        type: "GET",
        url: self.searchURL
      }).then(function(response) {
        //   self.searchInput = "";
        console.log(JSON.parse(response));
      });
    }
  },
  computed: {
      searchURL: function() {
        if (this.selectedCategory === "Courses") {
            return "/udemy/" + this.searchInput;
        }
        else if (this.selectedCategory === "Videos") {
            return "/youtube/" + this.searchInput;
        }
        else if (this.selectedCategory === "Events") {
            console.log("Find Events");
        } 
        else if (this.selectedCategory === "Jobs") {
            console.log("Find Jobs");
        } 
      }
  }
});

// var selectSearch = function() {
//     console.log("selectSearch called");
//     var category = document.getElementById("selectSearch").value;
//     var query = event.target.value;
//     if(category == "events"){
//        console.log("Searching Events");
//     } else if (category == "jobs"){
//         console.log("Searching Jobs");
//      } else if (category == "courses"){
//         console.log("Searching Courses");
//         udemySearch();
//      } else if (category == "videos"){
//         console.log("Searching Videos");
//      }
// };

// var category = document.getElementById("selectSearch").value;
// console.log(category);
// var query = "";

// var udemy = new Vue({
//     el: "vueContainer",
//     data: {
//         query: ""
//     },
//     methods: {
//         logSearch: function(event) {
//             query = event.target.value;
//         },

//     }
// });

// console.log(query);
// var udemy = new Vue({
//     el: "#vueContainer",
//     data: {
//         text: query,
//         field: category
//     },
//     methods: {
//         logSearch: function(event) {
//             query = event.target.value;
//         },
//         queryUdemy: function() {
//             event.preventDefault();
//             console.log("queryUdemy called");
//             var udemyQuery = this.query;
//             console.log(udemyQuery);
//             $.ajax({
//                 type: "GET",
//                 url: "/udemy/" + udemyQuery
//             }).then(function(response){
//                 console.log(JSON.parse(response));
//             });
//         },
//         clearForm: function() {
//             document.getElementById("searchForm").reset();
//         }
//     }
// });

// var udemy = new Vue({
//     el: "#udemySearch",
//     data: {
//         query: ""
//     },
//     methods: {
//         logSearch: function(event) {
//             this.query = event.target.value;
//         },
//         queryUdemy: function() {
//             event.preventDefault();
//             console.log("queryUdemy called");
//             var youTubeQuery = this.query;
//             console.log(youTubeQuery);
//             $.ajax({
//                 type: "GET",
//                 url: "/udemy/" + youTubeQuery
//             }).then(function(response){
//                 console.log(JSON.parse(response));
//             });
//         },
//         clearForm: function() {
//             document.getElementById("udemyForm").reset();
//         }
//     }
// });

// var youTube = new Vue({
//     el: "#youTubeSearch",
//     data: {
//         query: ""
//     },
//     methods: {
//         logSearch: function(event) {
//             this.query = event.target.value;
//         },
//         queryYouTube: function() {
//             event.preventDefault();
//             console.log("queryYouTube called");
//             var youTubeQuery = this.query;
//             console.log(youTubeQuery);
//             $.ajax({
//                 type: "GET",
//                 url: "/youtube/" + youTubeQuery
//             }).then(function(response){
//                 console.log(JSON.parse(response));
//             });
//         },
//         clearForm: function() {
//             document.getElementById("youTubeForm").reset();
//         }
//     }
// });
