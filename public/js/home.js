var userEmail;
var usernameText;

var modal = new Vue({
    el: "#login-modal",
    data: {
        newUserObject: {
            email: "",
            username: "",
            password: ""
        },
        returningUserObject: {
            email: "",
            password: ""
        }
    },
    methods: {
        addNewUser: function() {
            console.log("addNewUser called");
            console.log(this.newUserObject);

            $.ajax({
                type:"POST",
                url:"/add-new-user",
                data: this.newUserObject
            }).then(function(response){
                sessionStorage.usernameText = response.username;
                sessionStorage.userEmail = response.email;
            }); 
        },
        returningUser: function() {
            console.log("returningUser called");
            console.log(this.returningUserObject);
        },
        addNotebook: function() {
            console.log("addNotebook called");
            $.ajax({
                type:"POST",
                url:"/add-notebook" + user.username,
            }).then(function(response){
                console.log("RESPONSE FROM BACKEND: ", response);
            }); 
        }
    }
});

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
    searchInput: "",
    targets: [
        {
            category: "Home",
            image: "../images/icon-home.png"
        },
        {
            category: "Events",
            image: "../images/icon-events.png"
        },
        {
            category: "Courses",
            image: "../images/icon-courses.png"
        },
        {
            category: "Jobs",
            image: "../images/icon-jobs.png"
        },
        {
            category: "Videos",
            image: "../images/icon-videos.png"
        },
        {
            category: "Articles",
            image: "../images/icon-articles.png"
        },
    ]
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
    },
    getEvents: function() {
        console.log("Getting events...");
        $.ajax({
            type: "GET",
            url: "/meetup"
          }).then(function(response) {
            console.log(response);
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

