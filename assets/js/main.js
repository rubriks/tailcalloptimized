// init
$(document).ready(function () {
    // match all images in posts with title
    var images = $('.post img[title]');

    images.each(function (index, value) {
        var image = $(value);
        image.after('<figcaption>' + image.attr('title') + '</figcaption>');
    });
});

