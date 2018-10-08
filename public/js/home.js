var userId;
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
            
            $.ajax({
                type:"POST",
                url:"/add-new-user",
                data: this.newUserObject
            }).then(function(response){
                sessionStorage.usernameText = response.username;
                sessionStorage.userId = response.id;
            }); 
        },
        returningUser: function() {

            if (this.returningUserObject.email.length > 0 && this.returningUserObject.password.length > 0) {
                $.ajax({
                    type:"POST",
                    url:"/returning-user",
                    data: this.returningUserObject
                }).then(function(response){
                    sessionStorage.usernameText = response[0].username;
                    sessionStorage.userId = response[0]._id;
                    console.log( sessionStorage.usernameText, sessionStorage.userId);
                }); 
            } else {
                alert("Please fill in all fields");
            }
        }
    }
});

var index = new Vue({
  el: "#vueContainer",
  data: {
    selectedCategory: "Events",
    categories: ["Events", "Jobs", "Courses", "Videos"],
    seen: true,
    notebookResults: [],
    udemyResults: [],
    youtubeResults: [],
    jobResults: [],
    eventResults: [],
    udemyLinks: [],
    searchInput: "",
    inputValue: "",
    activeDetails: {},
    newNotebookName: "",
    targets: [
        {
            category: "Notebooks",
            image: "../images/icon-home.png",
            clicked: false
        },
        {
            category: "Events",
            image: "../images/icon-events.png",
            clicked: false
        },
        {
            category: "Courses",
            image: "../images/icon-courses.png",
            clicked: false
        },
        {
            category: "Jobs",
            image: "../images/icon-jobs.png",
            clicked: false
        },
        {
            category: "Videos",
            image: "../images/icon-videos.png",
            clicked: false
        },
        {
            category: "Articles",
            image: "../images/icon-articles.png",
            clicked: false
        }
    ]
  },
  methods: {
    handleSearch: function() {
     var self = this;
      $.ajax({
        type: "GET",
        url: self.searchURL
      }).then(function(response) {
        console.log(JSON.parse(response));
        self[self.resultKey] = JSON.parse(response);
      });
    },
    resetResults: function() {
        this.udemyResults = [];
        this.youtubeResults = [];
        this.jobResults = [];
        this.eventResults = [];
        this.activeDetails = {};
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
    },
    renderNotebookList: function() {
        var self = this;
        $.ajax({
            type:"GET",
            url:"/render-notebooks/" + sessionStorage.userId
        }).then(function(response) {
            console.log(response);
            self[self.resultKey] = response;
            console.log(self.notebookResults);
        });
    },
    addNotebook: function() {
        console.log("addNotebook called");
        $.ajax({
            type:"POST",
            url:"/add-notebook/" + sessionStorage.userId,
            data: {name: this.newNotebookName}
        }).then(function(response){
            console.log("RESPONSE FROM BACKEND: ", response);
        }); 
    }
  },
  computed: {
      resultKey: function() {
        if (this.activeDetails.category === "Events") {
            return "eventResults";
        } 
        else if (this.activeDetails.category === "Jobs") {
            return "jobResults";
        } 
        else if (this.activeDetails.category === "Courses") {
            return "udemyResults";
        }
        else if (this.activeDetails.category === "Videos") {
            return "youtubeResults";
        }
        else if (this.activeDetails.category === "Notebooks") {
            return "notebookResults";
        }
      },
      searchURL: function() {
        if (this.activeDetails.category === "Events") {
            return "/meetup/" + this.searchInput;
        } 
        else if (this.activeDetails.category === "Jobs") {
            console.log("Find Jobs");
        } 
        else if (this.activeDetails.category === "Courses") {
            return "/udemy/" + this.searchInput;
        }
        else if (this.activeDetails.category === "Videos") {
            return "/youtube/" + this.searchInput;
        }
      }
  },
  watch: {
    notebookResults() {
      renderNotebookList()
    }
  }
});

