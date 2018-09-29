var index = new Vue({
  el: "#vueContainer",
  data: {
    selectedCategory: "Events",
    categories: ["Events", "Jobs", "Courses", "Videos"],
    udemyResults: [],
    youtubeResults: [],
    jobResults: [],
    eventResults: [],
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
        self.resetResults();
        self[self.resultKey] = JSON.parse(response);
      });
    },
    resetResults: function() {
        this.udemyResults = [];
        this.youtubeResults = [];
        this.jobResults = [];
        this.eventResults = [];
    }
  },
  computed: {
      resultKey: function() {
        if (this.selectedCategory === "Events") {
            return "eventResults";
        } 
        else if (this.selectedCategory === "Jobs") {
            return "jobResults";
        } 
        else if (this.selectedCategory === "Courses") {
            return "udemyResults";
        }
        else if (this.selectedCategory === "Videos") {
            return "youtubeResults";
        }
      },
      searchURL: function() {
        if (this.selectedCategory === "Events") {
            console.log("Find Events");
        } 
        else if (this.selectedCategory === "Jobs") {
            console.log("Find Jobs");
        } 
        else if (this.selectedCategory === "Courses") {
            return "/udemy/" + this.searchInput;
        }
        else if (this.selectedCategory === "Videos") {
            return "/youtube/" + this.searchInput;
        }
      },
      renderResults: function() {
        if (this.selectedCategory === "Events") {
            console.log("Render Events");
        } 
        else if (this.selectedCategory === "Jobs") {
            console.log("Render Jobs");
        } 
        else if (this.selectedCategory === "Courses") {
            console.log("Render Courses"); 
            for (i = 0; i < response.length; i++) {
                course = response.result[i];
                console.log(course.title);
            }  
        }
        else if (this.selectedCategory === "Videos") {
            console.log("Render Videos");
        }
      }
  }
});

