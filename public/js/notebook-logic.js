new Vue({
    el: "#vueContainer",
    data: {
        notebookName: "",
        notebookVideos: [],
        notebookEvents: [],
        notebookCourses: [],
        notebookJobs: [],
        notebookArticles: []
    },

    created: function() {
        this.getNotebookContents();
    },

    methods: {
        getNotebookContents: function() {
            var self = this;
            $.ajax({
                type:"GET",
                url:"/render-notebook-contents/" + window.location.pathname.split("/")[2]
            }).then(function(response) {
                self.notebookName = response.name;
                self.notebookCourses = response.course;
                self.notebookEvents = response.event;
                self.notebookJobs = response.job;
                self.notebookVideos = response.video;
                self.notebookArticles = response.article;
            });
        },
        deleteCourse: function(course) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-course/" + course._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteVideo: function(video) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-video/" + video._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteEvent: function(event) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-event/" + event._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteJob: function(job) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-job/" + job._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        },
        deleteArticle: function(article) {
            var self = this;
            $.ajax({
                type: "DELETE",
                url: "/delete-article/" + article._id
            }).then(function(response) {
                self.getNotebookContents();
            });
        }
    }
});

