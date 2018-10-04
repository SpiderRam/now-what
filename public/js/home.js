

var index = new Vue({
  el: "#vueContainer",
  data: {
    selectedCategory: "Events",
    categories: ["Events", "Jobs", "Courses", "Videos"],
    seen: true,
    udemyResults: [],
    youtubeResults: [],
    jobResults: [],
    eventResults: [],
    udemyLinks: [],
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
    },
    modalToggle: function() {
        $("#login-modal").modal("toggle");
    },
    saveCourse: function(course) {
        console.log(course);
        $.post("/udemy", course).then(function(res){
            console.log(res);
        });
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
            return "/meetup/" + this.searchInput;
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
      }
  }
});

