$(function() {
    let routes = {
        "/about": function() {
            $("#about").show();
            $("#projects").hide();
            $("#blog").hide();
        },

        "/projects": function() {
            $("#about").hide();
            $("#projects").show();
            $("#blog").hide();
        },

        "/blog": function() {
            $("#about").hide();
            $("#projects").hide();
            $("#blog").show();
        },
    };

    Router(routes).init("/about");
});
