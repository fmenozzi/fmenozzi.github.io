$(function() {
    let routes = {
        "/": function() {
            $("#home").show();
            $("#about").hide();
            $("#projects").hide();

            $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");

            $(".sidebar-links a").removeClass("sidebar-active");
            $(".sidebar-links a[href='#/']").addClass("sidebar-active");
        },

        "/about": function() {
            $("#home").hide();
            $("#about").show();
            $("#projects").hide();

            $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");

            $(".sidebar-links a").removeClass("sidebar-active");
            $(".sidebar-links a[href='#/about']").addClass("sidebar-active");
        },

        "/projects": function() {
            $("#home").hide();
            $("#about").hide();
            $("#projects").show();

            $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");

            $(".sidebar-links a").removeClass("sidebar-active");
            $(".sidebar-links a[href='#/projects']").addClass("sidebar-active");
        },
    };

    Router(routes).init("#/");

    $("#navbar-button").click(function() {
        $("#sidebar, #mobile-navbar-bogus-buffer").toggleClass("sidebar-visible");
    });

    $("#mobile-navbar-bogus-buffer").click(function() {
        $("#sidebar, #mobile-navbar-bogus-buffer").removeClass("sidebar-visible");
    })
});
