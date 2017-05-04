$(function() {
    let routes = {
        "/about": function() {
            $("#about").show();
            $("#projects").hide();
            $("#blog").hide();

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/about']").addClass("sidebar-active");
        },

        "/projects": function() {
            $("#about").hide();
            $("#projects").show();
            $("#blog").hide();

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/projects']").addClass("sidebar-active");
        },

        "/blog": function() {
            $("#about").hide();
            $("#projects").hide();
            $("#blog").show();

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/blog']").addClass("sidebar-active");
        },
    };

    Router(routes).init("/about");
});
