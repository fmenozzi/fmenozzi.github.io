$(function() {
    let routes = {
        "/about": function() {
            $("#about").show();
            $("#projects").hide();

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/about']").addClass("sidebar-active");
        },

        "/projects": function() {
            $("#about").hide();
            $("#projects").show();

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/projects']").addClass("sidebar-active");
        },
    };

    Router(routes).init("/about");
});
