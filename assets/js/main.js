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

const photoGrid = document.getElementById("photo-grid");

if (photoGrid) {
  photoGalleryImages.forEach(({ src, caption }) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = src;
    img.alt = caption;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    photoGrid.appendChild(figure);
  });
}

document.querySelectorAll('form[action*="formspree.io"]').forEach((form) => {
  const status = form.querySelector(".form-status");
  const fields = form.querySelector(".fields");
  const actions = form.querySelector(".actions");
  const submitButton = form.querySelector('input[type="submit"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (status) {
      status.textContent = "";
      status.classList.remove("success", "error");
      status.hidden = true;
    }
    if (submitButton) submitButton.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          if (fields) fields.style.display = "none";
          if (actions) actions.style.display = "none";
          if (status) {
            status.textContent = "Message sent";
            status.classList.add("success");
            status.hidden = false;
          }
        } else {
          if (status) {
            status.textContent =
              "Something went wrong. Please try again or email me directly.";
            status.classList.add("error");
            status.hidden = false;
          }
        }
      })
      .catch(() => {
        if (status) {
          status.textContent =
            "Something went wrong. Please try again or email me directly.";
          status.classList.add("error");
          status.hidden = false;
        }
      })
      .finally(() => {
        if (submitButton) submitButton.disabled = false;
      });
  });
});
