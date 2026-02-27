/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch?
  if (browser.mobile) $body.addClass("is-touch");

  // Forms.
  var $form = $("form");

  // Auto-resizi!g textareas.
  $form.find("textarea").each(function () {
    var $this = $(this),
      $wrapper = $('<div class="textarea-wrapper"></div>'),
      $submits = $this.find('input[type="submit"]');

    $this
      .wrap($wrapper)
      .attr("rows", 1)
      .css("overflow", "hidden")
      .css("resize", "none")
      .on("keydown", function (event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();

          $(this).blur();
        }
      })
      .on("blur focus", function () {
        $this.val($.trim($this.val()));
      })
      .on("input blur focus --init", function () {
        $wrapper.css("height", $this.height());

        $this
          .css("height", "auto")
          .css("height", $this.prop("scrollHeight") + "px");
      })
      .on("keyup", function (event) {
        if (event.keyCode == 9) $this.select();
      })
      .triggerHandler("--init");

    // Fix.
    if (browser.name == "ie" || browser.mobile)
      $this.css("max-height", "10em").css("overflow-y", "auto");
  });

  // Menu.
  var $menu = $("#menu");

  $menu.wrapInner('<div class="inner"></div>');

  $menu._locked = false;

  $menu._lock = function () {
    if ($menu._locked) return false;

    $menu._locked = true;

    window.setTimeout(function () {
      $menu._locked = false;
    }, 350);

    return true;
  };

  $menu._show = function () {
    if ($menu._lock()) $body.addClass("is-menu-visible");
  };

  $menu._hide = function () {
    if ($menu._lock()) $body.removeClass("is-menu-visible");
  };

  $menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass("is-menu-visible");
  };

  $menu
    .appendTo($body)
    .on("click", function (event) {
      event.stopPropagation();
    })
    .on("click", "a", function (event) {
      var href = $(this).attr("href");

      event.preventDefault();
      event.stopPropagation();

      // Hide.
      $menu._hide();

      // Redirect.
      if (href == "#menu") return;

      window.setTimeout(function () {
        window.location.href = href;
      }, 350);
    })
    .append('<a class="close" href="#menu">Close</a>');

  $body
    .on("click", 'a[href="#menu"]', function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Toggle.
      $menu._toggle();
    })
    .on("click", function (event) {
      // Hide.
      $menu._hide();
    })
    .on("keydown", function (event) {
      // Hide on escape.
      if (event.keyCode == 27) $menu._hide();
    });
})(jQuery);

const images = [
  {
    src: "../images/photos/photo2.jpg",
    caption:
      "Glass lake between Glacier National Park and Yellowstone National Park. 2021",
  },
  {
    src: "../images/photos/photo4.jpg",
    caption: "Watering hole at Yellowstone National Park. 2021",
  },
  {
    src: "../images/photos/photo5.jpg",
    caption: "Yellowstone National Park. 2021",
  },
  {
    src: "../images/photos/photo6.jpg",
    caption: "Rocky Mountain National Park. 2021",
  },
  {
    src: "../images/photos/photo7.jpg",
    caption: "Rocky Mountain National Park. 2021",
  },
  {
    src: "../images/photos/photo3.jpg",
    caption: "Zebra Slot Canyons. 2021",
  },
  {
    src: "../images/photos/photo9.jpg",
    caption: "Road to Canyonlands National Park. 2021",
  },
  {
    src: "../images/photos/photo8.jpg",
    caption: "Bryce Canyon National Park Overview. 2021",
  },
  {
    src: "../images/photos/photo10.jpg",
    caption: "Bryce Canyon National Park. 2021",
  },
  {
    src: "../images/photos/photo11.jpg",
    caption: "Bryce Canyon National Park. 2021",
  },
  {
    src: "../images/photos/photo12.jpg",
    caption: "Top of Angel's Landing. 2021",
  },
  {
    src: "../images/photos/photo13.jpg",
    caption: "El Capitan, Yosemite National Park. 2021",
  },
  {
    src: "../images/photos/photo14.jpg",
    caption: "The First Sight of Kilimanjaro. 2023",
  },
  { src: "../images/photos/photo15.jpg", caption: "The Barranco Wall. 2023" },
  { src: "../images/photos/photo16.jpg", caption: "Campsite 3. 2023" },
  { src: "../images/photos/photo17.jpg", caption: "The Final Descent. 2024" },
];

let currentIndex = 0;

const imageElement = document.getElementById("slideshow-image");
const captionElement = document.getElementById("slideshow-caption");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function updateSlideshow() {
  imageElement.src = images[currentIndex].src;
  captionElement.textContent = images[currentIndex].caption;
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlideshow();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlideshow();
});

// Initialize slideshow
updateSlideshow();
