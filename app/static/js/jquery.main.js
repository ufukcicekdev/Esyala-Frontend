function initPreLoader() {
    jQuery("#pre-loader").delay(1200).fadeOut();
  }
  function initNavOpener() {
    jQuery(".side-close , .side-opener , .mt-side-over").click(function () {
      return (
        jQuery("body").toggleClass("side-col-active"),
        jQuery(".side-opener").toggleClass("active"),
        jQuery(".mt-side-over").toggleClass("active"),
        !1
      );
    }),
      jQuery(".mobile-toggle").click(function () {
        return (
          jQuery("body").toggleClass("mobile-active"),
          jQuery(".mobile-toggle").toggleClass("active"),
          !1
        );
      }),
      jQuery(".cart-opener1, .mt-mdropover").click(function () {
        return jQuery(this).parent().toggleClass("open"), !1;
      }),
      jQuery(".search-close, .icon-magnifier, .fa-search").click(function () {
        return jQuery("body").toggleClass("search-active"), !1;
      }),
      jQuery(".drop-link , #nav > ul > li.drop > a").click(function () {
        return jQuery(this).next().toggleClass("open"), !1;
      }),
      jQuery(".mt-subopener").click(function () {
        return jQuery(this).parent().next().toggleClass("open"), !1;
      });
  }
  function initSlickSlider() {
    jQuery(".banner-slider").slick({
      dots: !0,
      arrows: !1,
      infinite: !0,
      adaptiveHeight: !0,
    }),
      jQuery(".tabs-slider").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 599, settings: { slidesToShow: 2 } },
          { breakpoint: 479, settings: { slidesToShow: 1 } },
        ],
      }),
      jQuery(".tabs-sliderlg").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 599, settings: { slidesToShow: 2 } },
          { breakpoint: 479, settings: { slidesToShow: 1 } },
        ],
      }),
      jQuery(".bestseller-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 767, settings: { slidesToShow: 2 } },
          { breakpoint: 479, settings: { slidesToShow: 1 } },
        ],
      }),
      jQuery(".patner-slider").slick({
        autoplay: !0,
        slidesToShow: 6,
        slidesToScroll: 1,
        adaptiveHeight: !0,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 991, settings: { slidesToShow: 2 } },
          { breakpoint: 479, settings: { slidesToShow: 1 } },
        ],
      }),
      jQuery(".work-slider").slick({
        dots: !0,
        arrows: !0,
        slidesToShow: 1,
        centerMode: !0,
        centerPadding: "18%",
        responsive: [
          {
            breakpoint: 1840,
            settings: {
              arrows: !1,
              centerMode: !0,
              centerPadding: "10%",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1380,
            settings: {
              arrows: !1,
              centerMode: !0,
              centerPadding: "5%",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: !1,
              centerMode: !0,
              centerPadding: "20%",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              dots: !1,
              arrows: !1,
              centerMode: !0,
              centerPadding: "20%",
              slidesToShow: 1,
            },
          },
        ],
      }),
      jQuery(".centerslider-1").slick({
        dots: !0,
        arrows: !1,
        infinite: !0,
        slidesToShow: 1,
        centerMode: !0,
        slidesToScroll: 1,
        adaptiveHeight: !0,
        centerPadding: "18.5%",
        responsive: [{ breakpoint: 1200, settings: { centerPadding: "4%" } }],
      }),
      jQuery(".product-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        fade: !0,
        centerPadding: "0",
        asNavFor: ".pagg-slider",
      }),
      jQuery(".pagg-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: "0",
        asNavFor: ".product-slider",
        focusOnSelect: !0,
        responsive: [{ breakpoint: 1024, settings: { slidesToShow: 3 } }],
      });
  }
  function initLightbox() {
    jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
      helpers: { overlay: { css: { background: "rgba(0, 0, 0, 0.65)" } } },
      afterLoad: function (e, i) {
        0 === e.href.indexOf("#") &&
          jQuery(e.href)
            .find("a.close")
            .off("click.fb")
            .on("click.fb", function (e) {
              e.preventDefault(), jQuery.fancybox.close();
            });
      },
      padding: 0,
    }),
      jQuery("#newsletter-hiddenlink").fancybox().trigger("click");
  }
  function initbackTop() {
    var e = jQuery("#back-top");
    jQuery(window).on("scroll", function () {
      jQuery(this).scrollTop() > 100
        ? e.addClass("active")
        : e.removeClass("active");
    }),
      e.on("click", function (e) {
        jQuery("html, body").animate({ scrollTop: 0 }, 500);
      });
  }
  function initTabs() {
    jQuery("ul.producttabs").tabset({ tabLinks: "a", defaultTab: !1 }),
      jQuery("ul.mt-tabs").tabset({ tabLinks: "a", defaultTab: !1 });
  }
  function initStickyHeader() {
    var e = jQuery(window),
      i = "sticky";
    jQuery("#mt-header").each(function () {
      var t = jQuery(this),
        s = t.offset().top || 400,
        o = !0;
      function n() {
        e.scrollTop() > s
          ? o && ((o = !1), t.addClass(i))
          : o || ((o = !0), t.removeClass(i)),
          ResponsiveHelper.addRange({
            "..767": {
              on: function () {
                t.removeClass(i);
              },
            },
          });
      }
      jQuery(this).css("height", jQuery(this).innerHeight()),
        n(),
        e.on("scroll resize orientationchange", n);
    });
  }
  jQuery(function () {
    "use strict";
    initPreLoader(),
      initTabs(),
      initbackTop(),
      initLightbox(),
      initNavOpener(),
      initSlickSlider(),
      initStickyHeader(),
      new WOW().init();
  }),
    jQuery(window).on("load", function () {
      "use strict";
      initPreLoader();
    }),
    (ResponsiveHelper = (function (e) {
      var i,
        t = [],
        s = e(window),
        o = !1;
      function n() {
        var o = s.width();
        o !== i &&
          ((i = o),
          e.each(t, function (i, t) {
            e.each(t.data, function (e, i) {
              i.currentActive &&
                !a(i.range[0], i.range[1]) &&
                ((i.currentActive = !1),
                "function" == typeof i.disableCallback && i.disableCallback());
            }),
              e.each(t.data, function (e, i) {
                !i.currentActive &&
                  a(i.range[0], i.range[1]) &&
                  ((i.currentActive = !0),
                  "function" == typeof i.enableCallback && i.enableCallback());
              });
          }));
      }
      function a(e, t) {
        var s,
          n,
          a,
          r = "";
        return (
          e > 0 && (r += "(min-width: " + e + "px)"),
          t < 1 / 0 && (r += (r ? " and " : "") + "(max-width: " + t + "px)"),
          (s = r),
          (n = e),
          (a = t),
          window.matchMedia && o
            ? matchMedia(s).matches
            : window.styleMedia
            ? styleMedia.matchMedium(s)
            : window.media
            ? media.matchMedium(s)
            : i >= n && i <= a
        );
      }
      return (
        window.matchMedia &&
          (window.Window && window.matchMedia === Window.prototype.matchMedia
            ? (o = !0)
            : window.matchMedia.toString().indexOf("native") > -1 && (o = !0)),
        s.bind("load resize orientationchange", n),
        {
          addRange: function (s) {
            var o = { data: {} };
            e.each(s, function (e, i) {
              var t, s, n, a;
              o.data[e] = {
                range:
                  ((n = parseInt((s = (t = e).split(".."))[0], 10) || -1 / 0),
                  [n, (a = parseInt(s[1], 10) || 1 / 0)].sort(function (e, i) {
                    return e - i;
                  })),
                enableCallback: i.on,
                disableCallback: i.off,
              };
            }),
              t.push(o),
              (i = null),
              n();
          },
        }
      );
    })(jQuery));