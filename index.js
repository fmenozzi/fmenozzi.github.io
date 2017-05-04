$(function() {
    let routes = {
        "/about": function() {
            alert("About");
        },

        "/projects": function() {
            alert("Projects");
        },

        "/blog": function() {
            alert("Blog");
        },
    };

    Router(routes).init();
});
