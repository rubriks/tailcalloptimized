var main = main || {}

main.initializeTables = function () {
    $(".content > div > table").addClass("table table-condensed table-bordered table-hover table-responsive");    
}

main.followLink = function () {
    document.location = $(this).attr('src');
}

main.initializeContentImages = function () {
    $(".content img").click(main.followLink);
}

$(document).ready(function () {
    main.initializeTables();
    main.initializeContentImages();
});
