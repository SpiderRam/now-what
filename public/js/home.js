var udemy = new Vue({
    el: "#udemySearch",
    data: {
        query: ""
    },
    methods: {
        logSearch: function(event) {
            this.query = event.target.value;
        },
        queryUdemy: function() {
            event.preventDefault();
            console.log("queryUdemy called");
            var udemyQuery = this.query;
            console.log(udemyQuery);
            $.ajax({
                type: "GET",
                url: "/udemy/" + udemyQuery
            }).then(function(response){
                console.log(JSON.parse(response));  
            });
        },
        clearForm: function() {
            document.getElementById("udemyForm").reset();
        }
    }
});
