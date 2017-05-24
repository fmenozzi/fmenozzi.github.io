$(function() {
    let routes = {
        "/about": function() {
            $("#about").show();
            $("#projects").hide();

            $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/about']").addClass("sidebar-active");
        },

        "/projects": function() {
            $("#about").hide();
            $("#projects").show();

            $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");

            $(".sidebar-links a").removeClass("sidebar-active");
            $("[href='#/projects']").addClass("sidebar-active");
        },
    };

    Router(routes).init("/about");

    $("#navbar-button").click(function() {
        $("#sidebar, #mobile-navbar-bogus-buffer").toggleClass("sidebar-visible");
    });

    $("#mobile-navbar-bogus-buffer").click(function() {
        $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");
    })
});
