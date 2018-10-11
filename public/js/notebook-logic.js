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
                console.log("Retrieving notebook contents");
                self.notebookName = response.name;
                self.notebookCourses = response.course;
                self.notebookEvents = response.event;
                self.notebookJobs = response.job;
                self.notebookVideos = response.video;
                self.notebookArticles = response.article;
                console.log(self.notebookVideos);
            });
        },
        renderNotebookContents: function() {
            var self = this;
            console.log("Rendering notebook contents");
        }
    }
});

