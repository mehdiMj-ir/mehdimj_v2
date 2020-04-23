/*-------------------------------------------------------------------------*/
/* Menu
/*-------------------------------------------------------------------------*/
$('.navbar .navbar-nav').niceScroll(); // Scrollbar

$('[navbar-trigger]').on('click', function() {
	var isOpen = (parseInt($('[navigation]').css('right')) != 0) ? false : true;
	(isOpen) ? close_menu() : open_menu();
});

window.onclick = function(event)
{
	var isOpen    = (parseInt($('[navigation]').css('right')) != 0) ? false : true;
	var isVisible = $('[navbar-trigger]').is(':visible');

	if(isOpen && isVisible)
		close_menu();
}

function close_menu()
{
	var nav   = $('[navigation]');
	var page  = $('[page-content]');
	var value = parseInt(nav.css('width'));

	nav.animate({'right': -value}, 100, function() { });
	// page.animate({'margin-right': 0}, 100, function() { });
}

function open_menu()
{
	var nav   = $('[navigation]');
	var page  = $('[page-content]');
	var value = parseInt(nav.css('width'));

	nav.animate({'right': 0}, 100, function() { });
	// page.animate({'margin-right': value}, 100, function() { });
}

/*-------------------------------------------------------------------------*/
/* wordpress read feed!
/*-------------------------------------------------------------------------*/
var jqxhr = $.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    type: 'GET',
    data: {'rss_url': 'https://astateofcode.ir/?call_custom_simple_rss=1&csrp_thumbnail_size=100000000x100000000'},
    dataType: 'json',
    crossDomain: true,
    contentType: 'Charset: UTF-8;'
});

jqxhr.done(function(data, textStatus, xhr) {
    var html = '';

    $.each(data.items, function(key, item)
    {
        article = '<article id="post-' + key + '" class="blog-grid-item post post-' + key + '" style="background-image:url(' + item.enclosure.link + ')">'
                    //+ '<h3 class="post-title">' + item.title + '</h3>'
                    //+ '<author class="post-author">' + item.author + '</author>'
                    //+ '<time class="post-time" datetime="' + item.pubDate + '">' + item.pubDate + '</time>'
                    + '<a class="post-link" href="' + item.link + '">ادامه مطلب</a>'
                + '</article>';

        html = html + article;
    });

	$('[blog] [blog-overlay]').fadeOut('slow', function() {
		$('[blog] [blog-container]').html(html).fadeIn('slow');
		$(this).remove();
	});
});

jqxhr.fail(function(xhr, textStatus) {});

jqxhr.always(function() {});

/*-------------------------------------------------------------------------*/
/* Smooth Scroll!
/*-------------------------------------------------------------------------*/
// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
