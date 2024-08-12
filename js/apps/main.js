gsap.registerPlugin(ScrollTrigger);
(function (win, $) {
  let animation = new AnimateCustom();
  let tlMenu;
  let smoothScroll;
  let inputTl = gsap
    .timeline({
      paused: true,
      reversed: true,
    })
    .to(".js-subscribe-label", {
      fontSize: 14,
      yPercent: -100,
      duration: 1.2,
      autoRound: false,
      ease: animation.customEase(0.65, 0, 0.35, 1),
    });
  let loadingTL = gsap
    .timeline({
      paused: true,
      reversed: true,
      onStart: function () {
        smoothScroll.scrollTo(0);
      },
      onComplete: function () {
        smoothScroll.unlock();
      },
    })
    .fromTo(
      ".js-wrap-texture", {
        opacity: 1,
      }, {
        opacity: 0.18,
        duration: 1.2,
        ease: animation.customEase(0.65, 0, 0.35, 1),
      }
    )
    .fromTo(
      ".js-texture-text", {
        opacity: 1,
      }, {
        opacity: 0,
        duration: 1.2,
        ease: animation.customEase(0.65, 0, 0.35, 1),
      },
      ">-1"
    )
    .fromTo(
      ".js-spot-image", {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.2,
        ease: animation.customEase(0.65, 0, 0.35, 1),
      },
      ">-0.4"
    )
    .fromTo(
      ".js-spot-right", {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1.2,
        ease: animation.customEase(0.65, 0, 0.35, 1),
      },
      ">-0.4"
    );

  function createTL() {
    return gsap
      .timeline({
        paused: true,
        reversed: true,
        overwrite: true
      })
      .to(
        ".js-wrap-texture",

        {
          opacity: 1,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        }
      )
      .to(
        ".js-texture-text",

        {
          opacity: 1,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-1"
      )
      .to(
        ".gnb",

        {
          opacity: 1,
          pointerEvents: "initial",
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        }
      )
      .to(
        ".js-icon-hamburger",

        {
          width: "0%",
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-1.2"
      )

      .to(
        ".js-icon-close",

        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-1.2"
      )
      .to(
        ".js-wrap-texture",

        {
          opacity: 0.18,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-0.4"
      )
      .to(
        ".js-texture-text",

        {
          opacity: 0,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-1"
      )
      .to(
        ".js-gnb-link",

        {
          transform: "translateY(0%)",
          stagger: 0.2,
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        },
        ">-1"
      );
  }
  $(win).ready(function () {
    let allSections = gsap.utils.toArray(".js-section");
    let aboutTitleSplit = $(".js-about-title").text().split("");
    let brandsTitleSplit = $(".js-brands-title").text().split("");
    let scheduleTitleSplit = $(".js-schedule-title").text().split("");
    let subscribeTitleSplit = $(".js-subscribe-subtitle").text().split("");
    let subscribeLabelSplit = $(".js-subscribe-label").text().split("");

    $(".js-subscribe-input").on({
      focus: function (e) {
        inputTl.play();
      },
      focusout: function (e) {
        if (!e.currentTarget.value) {
          inputTl.reverse();
        }
      },
    });

    $(".js-about-title").html(
      aboutTitleSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" class="about__title-item js-about-title-item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-brands-title").html(
      brandsTitleSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" class="brands__title-item js-brands-title-item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-subscribe-label").html(
      subscribeLabelSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" class="item js-subscribe-label-item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-schedule-title").html(
      scheduleTitleSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" class="schedule__title-item js-schedule-title-item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-subscribe-subtitle").html(
      subscribeTitleSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" class="subscribe__title-item js-subscribe-title-item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    let allItemAboutTitle = $(".js-about-title-item").toArray();
    let allItemBrandsTitle = $(".js-brands-title-item").toArray();
    let allItemScheduleTitle = $(".js-schedule-title-item").toArray();
    let allItemSubscribeTitle = $(".js-subscribe-title-item").toArray();
    let allItemSubscribeLabel = $(".subscribe").find(".item").toArray();
    let allRandomIndex = [];
    if (allRandomIndex <= allItemSubscribeLabel.length) {
      for (let i = 0; i < allItemSubscribeLabel.length; i++) {
        let random = Math.random() * allItemSubscribeLabel.length;
        allRandomIndex.push(random);
      }
    }
    let allCards = [...$(".js-featured-card").toArray(), ...$(".js-blogs-card").toArray()];
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      const cardHeight = $(card).innerHeight();
      const cardWidth = $(card).innerWidth();
      animation.useMousePosition({
        target: "#" + $(card).attr("id"),
        onUpdate: (x, y) => {
          let xAnimate = -(x - cardWidth / 2) / 14;

          let yAnimate = -(y - cardHeight / 2) / 14;
          let cursorPercentX = (x / cardWidth) * 100;
          let cursorPercentY = (y / cardHeight) * 100;

          $(card).css({
            // transform:
            //   'rotateY(' + xAnimate + 'deg) rotateX(' + -yAnimate + 'deg)',
            "background-position": cursorPercentX * 0.4 + "% " + cursorPercentY * 0.8 + "%",
          });
          $(card)
            .find(".js-card-img")
            .css({
              transform: "rotateY(" + -xAnimate + "deg) rotateX(" + yAnimate + "deg)",
            });
        },
        onLeave: () => {
          return [cardHeight / 2, cardWidth / 2];
        },
        defaultY: cardHeight / 2,
        defaultX: cardWidth / 2,

        duration: 1.2,
        ease: animation.defaultEasing.easeOutElastic,
      });
    }
    allSections.forEach((section, i) => {
      if ($(section).find(".js-section-cloud").length > 0) {
        gsap.to($(section).find(".js-section-cloud"), {
          x: "0%",
          scrollTrigger: {
            trigger: section,
            start: "+=60% top+=100",
            end: "+=20%",
            toggleActions: "restart none none reverse",
          },
          duration: 1.2,
          ease: animation.customEase(0.65, 0, 0.35, 1),
        });
      }
    });

    let textTL = gsap.timeline({
      paused: true,
      reversed: true
    }).fromTo(
      ".js-charactor-text", {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 1.2,
        ease: animation.customEase(0.65, 0, 0.35, 1),
      }
    );

    smoothScroll = animation.useSmoothScroll({
      duration: 1,
      ease: animation.defaultEasing.Power3.easeOut,
      hideScrollBar: true,
      onScrolling: function (current) {
        let currentProgress = (current / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 360;

        $(".js-header-circle").css({
          transform: "rotate(" + currentProgress + "deg)",
        });

        if (current >= $(".js-section-subscribe").offset().top && current <= $(".js-section-subscribe").offset().top + $(".js-section-subscribe").innerHeight()) {
          let subscribeProgress = (current - $(".js-section-subscribe").offset().top) / $(".js-section-subscribe").innerHeight();
          $(".js-subscribe-cloud").css({
            transform: "translateY(" + -subscribeProgress * 400 + "px) ",
          });
          let contentTransform = "translateY(" + subscribeProgress * 250 + "px) ";
          if (subscribeProgress >= 0.7) {
            let minus = 0.7 * $(".js-section-subscribe").innerHeight();

            let progress = (current - $(".js-section-subscribe").offset().top - minus) / ($(".js-section-subscribe").innerHeight() - minus);

            for (let i = 0; i < allItemSubscribeLabel.length; i++) {
              const item = allItemSubscribeLabel[i];
              $(item).css({
                transform: "translateY(" + -(progress * 12 * allRandomIndex[i]) + "px) ",
                // opacity: 1 - subscribeProgress * allRandomIndex[i],
              });
            }
            $(".js-subscribe-content").css({
              transform: contentTransform + "scale(" + (1 - progress * 0.06) + ")",
            });

            $(".js-subscribe-layer").css({
              opacity: progress,
            });
          } else {
            $(".js-subscribe-content").css({
              transform: contentTransform,
            });
            for (let i = 0; i < allItemSubscribeLabel.length; i++) {
              const item = allItemSubscribeLabel[i];
              $(item).removeAttr("style");
            }
          }

          for (let i = 0; i < allItemSubscribeTitle.length; i++) {
            const item = allItemSubscribeTitle[i];
            $(item).css({
              transform: "translateY(" + -(subscribeProgress * 20 * (allItemSubscribeTitle.length - i)) + "px) ",
            });
          }
        } else if (current < $(".js-subscribe-subtitle").offset().top) {
          $(".js-subscribe-layer").removeAttr("style");
          $(".js-subscribe-content").removeAttr("style");
          $(".js-subscribe-cloud").removeAttr("style");

          for (let i = 0; i < allItemSubscribeTitle.length; i++) {
            const item = allItemSubscribeTitle[i];
            $(item).removeAttr("style");
          }
        }

        if (current >= $(".js-section-schedule").offset().top && current <= $(".js-section-schedule").offset().top + $(".js-section-schedule").innerHeight()) {
          let scheduleProgress = (current - $(".js-section-schedule").offset().top) / $(".js-section-schedule").innerHeight();

          let contentTransform = "translateY(" + scheduleProgress * 250 + "px) ";

          $(".js-schedule-subtitle").css({
            opacity: 1 - scheduleProgress,
            transform: "translateY(" + scheduleProgress * 300 + "px) ",
          });
          let charactorTransform = "translateY(" + scheduleProgress * 500 + "px) rotateY(-180deg)";

          if (scheduleProgress >= 0.7) {
            let minus = 0.7 * $(".js-section-schedule").innerHeight();
            let progress = (current - $(".js-section-schedule").offset().top - minus) / ($(".js-section-schedule").innerHeight() - minus);

            $(".js-schedule-layer").css({
              opacity: progress,
            });

            $(".js-schedule-content").css({
              transform: contentTransform + "scale(" + (1 - progress * 0.06) + ")",
            });
            $(".js-schedule-charactor").css({
              transform: charactorTransform + "scale(" + (1 - progress * 0.1) + ")",
            });
          } else {
            $(".js-schedule-content").css({
              transform: contentTransform,
            });
            $(".js-schedule-charactor").css({
              transform: charactorTransform,
            });
          }

          for (let i = 0; i < allItemScheduleTitle.length; i++) {
            const item = allItemScheduleTitle[i];
            $(item).css({
              transform: "translateY(" + -(scheduleProgress * 20 * (allItemScheduleTitle.length - i)) + "px) ",
            });
          }
          // for (let i = 0; i < allStarSchedule.length; i++) {
          //   const star = allStarSchedule[i];
          //   let index = i + 1;
          //   console.log($(star).css('top'));
          //   $(star).css({
          //     top:
          //       parseInt($(star).css('top')) +
          //       scheduleProgress * index * 10 * index,
          //   });
          // }
        } else if (current < $(".js-section-schedule").offset().top) {
          $(".js-schedule-subtitle").removeAttr("style");
          $(".js-schedule-layer").removeAttr("style");
          $(".js-schedule-content").removeAttr("style");
          $(".js-schedule-charactor").removeAttr("style");
          for (let i = 0; i < allItemScheduleTitle.length; i++) {
            const item = allItemScheduleTitle[i];
            $(item).removeAttr("style");
          }
        }

        if (current >= $(".js-section-brands").offset().top && current <= $(".js-section-brands").offset().top + $(".js-section-brands").innerHeight()) {
          let brandsProgress = (current - $(".js-section-brands").offset().top) / $(".js-section-brands").innerHeight();

          let contentTransform = "translateY(" + brandsProgress * 350 + "px) ";

          if (brandsProgress >= 0.7) {
            let minus = 0.7 * $(".js-section-brands").innerHeight();
            let progress = (current - $(".js-section-brands").offset().top - minus) / ($(".js-section-brands").innerHeight() - minus);

            $(".js-brands-layer").css({
              opacity: progress,
            });

            $(".js-brands-list").css({
              transform: contentTransform + "scale(" + (1 - progress * 0.06) + ")",
            });
          } else {
            $(".js-brands-list").css({
              transform: contentTransform,
            });
          }

          for (let i = 0; i < allItemBrandsTitle.length; i++) {
            const item = allItemBrandsTitle[i];
            $(item).css({
              transform: "translateY(" + -(brandsProgress * 20 * (i + 1)) + "px) ",
            });
          }
        } else if (current < $(".js-section-brands").offset().top) {
          $(".js-brands-layer").removeAttr("style");
          $(".js-brands-list").removeAttr("style");
          for (let i = 0; i < allItemBrandsTitle.length; i++) {
            const item = allItemBrandsTitle[i];
            $(item).removeAttr("style");
          }
        }

        if (current >= $(".js-section-about").offset().top && current <= $(".js-section-about").offset().top + $(".js-section-about").innerHeight()) {
          let aboutProgress = (current - $(".js-section-about").offset().top) / $(".js-section-about").innerHeight();

          $(".js-about-left").css({
            transform: "translateY(" + -(aboutProgress * 100) + "%)",
          });
          $(".js-about-right").css({
            transform: "translateY(" + aboutProgress * 580 + "px) scale(0.6)",
          });
          let middleTransform = "translateY(" + aboutProgress * 350 + "px) ";

          if (aboutProgress >= 0.7) {
            let minus = 0.7 * $(".js-section-about").innerHeight();
            let progress = (current - $(".js-section-about").offset().top - minus) / ($(".js-section-about").innerHeight() - minus);

            $(".js-about-layer").css({
              opacity: progress,
            });

            $(".js-about-middle").css({
              transform: middleTransform + "scale(" + (1 - progress * 0.06) + ")",
            });
          } else {
            $(".js-about-middle").css({
              transform: middleTransform,
            });
          }

          for (let i = 0; i < allItemAboutTitle.length; i++) {
            const item = allItemAboutTitle[i];
            $(item).css({
              transform: "translateY(" + -(aboutProgress * 20 * (i + 1)) + "px) ",
            });
          }
        } else if (current < $(".js-section-brands").offset().top) {
          $(".js-about-left").removeAttr("style");
          $(".js-about-right").removeAttr("style");
          $(".js-about-layer").removeAttr("style");
          $(".js-about-middle").removeAttr("style");
          for (let i = 0; i < allItemAboutTitle.length; i++) {
            const item = allItemAboutTitle[i];
            $(item).removeAttr("style");
          }
        }

        if (current >= $(".js-section-spot").offset().top && current <= $(".js-section-spot").offset().top + $(".js-section-spot").innerHeight()) {
          let spotProgress = (current / $(".js-section-spot").innerHeight()) * 100;

          $(".js-spot-charactor").css({
            transform: "translateY(" + spotProgress + "%)",
          });

          if (spotProgress <= 10) {
            if (textTL.reversed()) {
              textTL.play();
            }
          } else {
            if (!textTL.reversed()) {
              textTL.reverse();
            }
          }
        }
      },
    });
    smoothScroll.lock();
    tlMenu = createTL();
    let textSplit = $(".js-logo-circle").text().split("");
    let spotTextSplit = $(".js-charactor-text").text().split("");
    let textWidth = textSplit.length;
    $(".js-charactor-text").html(
      spotTextSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true"  style="transform: rotate( ' + (i - 2) * 10 + 'deg)" class="item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-logo-circle").html(
      textSplit
      .map(function (char, i) {
        let text = '<span aria-hidden="true" style="transform:  rotate( ' + i * ((2 * Math.PI) / textWidth) * 55 + 'deg)" class="item">' + char + "</span>";

        return text;
      })
      .join("")
    );
    $(".js-gnb-link").on("click", function (e) {
      let desination = $(e.currentTarget).attr("aria-controls");
      let currentSection = $("#" + desination);
      if (currentSection.length > 0) {
        smoothScroll.scrollTo(currentSection.offset().top, true);
      }
    });
  });
  $(win).on("load", function () {
    setTimeout(() => {
      if (loadingTL.reversed()) {
        loadingTL.play();
      }
    }, 1200);

    $(win).on("resize", function () {
      if (tlMenu) {
        if (win.innerWidth <= 1366) {
          tlMenu.revert();
          tlMenu.kill();
          tlMenu = createTL();
        } else {
          tlMenu.revert();
          tlMenu.kill();
          tlMenu = null;
        }
      } else {
        if (win.innerWidth <= 1366) {
          tlMenu = createTL();
        }
      }
      $(".js-header-btn").attr("aria-expanded", false);
      smoothScroll.unlock();
    });

    $(".js-header-btn").on("click", function (e) {
      if (tlMenu.reversed()) {
        $(e.currentTarget).attr("aria-expanded", true);
        smoothScroll.lock();
        tlMenu.play();
      } else {
        $(e.currentTarget).attr("aria-expanded", false);
        smoothScroll.unlock();
        tlMenu.reverse();
      }
    });
  });
})(window, window.jQuery);
