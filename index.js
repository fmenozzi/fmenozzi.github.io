let routes = {
    "/about": function() {
        console.log("ABOUT");
    },

    "/projects": function() {
        console.log("PROJECTS");
    },

    "/blog": function() {
        console.log("BLOG");
    },
};

Router(routes).init();
