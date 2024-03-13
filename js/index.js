//////////////////////////////////////// Javascript Disabled
document.querySelector("body").classList.remove("no-js");

//////////////////////////////////////// Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//////////////////////////////////////// Nav items with Lenis scrollTo
function initLenisLinks() {
  let lenisLinks = document.querySelectorAll("a[lenis-link]");
  lenisLinks.forEach((link) => {
    if (link.getAttribute("lenis-link")) {
      linkSection = "#" + link.getAttribute("lenis-link");
      link.addEventListener("click", function () {
        setTimeout(() => {
          lenis.scrollTo(linkSection);
        }, "50");
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", initLenisLinks);

//////////////////////////////////////// GSAP

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    once: true,
    start: "top 100%",
  });

  gsap.defaults({
    ease: "power4",
  });

  function hide(elem) {
    gsap.set(elem, { visibility: "hidden" });
  }

  function pauseTweens(elem) {
    let tweensArr = gsap.getTweensOf(elem);
    for (let i = 0; i < tweensArr.length; i++) {
      tweensArr[i].pause();
    }
  }

  let mm = gsap.matchMedia(),
    breakPointTablet = 991,
    breakPointMobileLandscape = 767,
    breakPointMobile = 479;

  //////////////////// Mobile menu
  const mobileMenu = document.querySelector(".mobile-menu");
  let mobileMenuBtns = document.querySelectorAll(".mobile-menu-btn");
  let closeMenuTriggers = document.querySelectorAll(
    ".mobile-menu-overlay, .mobile-menu .close-btn, .mobile-menu a"
  );
  const openMobileMenu = gsap.timeline({ paused: true });

  openMobileMenu
    .to(".mobile-menu", {
      display: "block",
    })
    .from(
      ".mobile-menu-wrapper",
      {
        xPercent: 100,
        duration: 0.3,
      },
      0
    )
    .to(
      ".mobile-menu__header",
      {
        autoAlpha: 1,
        duration: 0.2,
      },
      ">-0.2"
    )
    .fromTo(
      ".mobile-menu .nav-menu > .nav-item",
      {
        opacity: 0,
        yPercent: -50,
      },
      {
        visibility: "inherit",
        opacity: 1,
        yPercent: 0,
        stagger: 0.03,
        duration: 0.1,
      },
      ">-0.2"
    );

  if (mobileMenuBtns) {
    mobileMenuBtns.forEach((menuBtn) => {
      //////////////////// Open/close menu
      menuBtn.addEventListener("click", function () {
        //openMobileMenu.tweenTo(0.75, { ease: Power2.easeIn });
        mobileMenu.classList.add("menu-open");
        lenis.stop();
        document.querySelector("html").classList.add("menu-open");
        openMobileMenu.play();
      });

      if (closeMenuTriggers) {
        closeMenuTriggers.forEach((elem) =>
          elem.addEventListener("click", function () {
            lenis.start();
            document.querySelector("html").classList.remove("menu-open");
            openMobileMenu.tweenTo(0, { duration: 0.25, ease: Power2.easeOut });
          })
        );
      }

      //////////////////// Mobile menu button hover
      let menuLines = [...menuBtn.querySelectorAll(".mobile-menu-btn__line")];

      const hoverMenuBtn = gsap.timeline({
        paused: true,
      });

      hoverMenuBtn
        .to(
          menuLines,
          {
            marginLeft: 32,
            duration: 0.2,
            stagger: 0.1,
          },
          0
        )
        .to(
          menuLines,
          {
            marginLeft: 0,
            duration: 0.2,
            stagger: 0.1,
          },
          0.2
        );

      menuBtn.addEventListener("mouseenter", function () {
        hoverMenuBtn.progress(0);
        hoverMenuBtn.play();
      });
      menuBtn.addEventListener("mouseleave", function () {
        hoverMenuBtn.reverse();
      });
    });
  }

  //////////////////// Header sticky
  let headerSticky = document.querySelector(".header-sticky");

  if (headerSticky) {
    const showHeaderSticky = gsap.to(headerSticky, {
      y: 0,
      paused: true,
      duration: 0.1,
    });

    ScrollTrigger.create({
      trigger: "body",
      once: false,
      start: "250 top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (self.direction === -1 && self.progress !== 0) {
          headerSticky.classList.remove("hide");
          showHeaderSticky.play();
        } else {
          headerSticky.classList.add("hide");
          showHeaderSticky.reverse();
        }
      },
    });
  }

  //////////////////////////////////////// Split-Type
  function splitText(elem) {
    const split = new SplitType(elem, {
      split: "words",
      tagName: "span",
    });

    split.words.forEach((words) => {
      $(words).wrapInner("<span></span>");
    });
  }

  let splitTextTargets = document.querySelectorAll(
    '[data-gsap="text-clip-reveal"], .home-hero-h1'
  );

  if (splitTextTargets) {
    splitTextTargets.forEach((text) => {
      splitText(text);
    });
  }
  /* 
  //////////////////////////////////////// Text Clip Reveal
  let textClipRevealTargets = document.querySelectorAll(
    '[data-gsap="text-clip-reveal"]'
  );

  if(textClipRevealTargets && splitText) {
    textClipRevealTargets.forEach((text) => textClipReveal(text));

    function textClipReveal(elem) {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => {
          gsap.set(elem, { autoAlpha: 1 });
  
          let words = elem.querySelectorAll(".word span");
          words.forEach((word) => {
            gsap.fromTo(
              word,
              {
                visibility: "inherit",
                opacity: 1,
                yPercent: 101,
              },
              {
                duration: 1.5,
                stagger: 0.2,
                yPercent: 0,
              }
            );
          });
        },
      });
    }
  } */
  

  //////////////////// Fade reveal
  function fadeReveal(elem) {
    gsap.to(elem, {
      duration: 1,
      autoAlpha: 1,
    });
  }

  let fadeRevealTargets = document.querySelectorAll(
    '[data-gsap="fade-reveal"]'
  );
  if (fadeRevealTargets) {
    ScrollTrigger.batch(fadeRevealTargets, {
      once: true,
      onEnter: (batch) => {
        fadeReveal(batch);
      },
    });
  }

  function fadeUpReveal(elem) {
    gsap.fromTo(
      elem,
      {
        y: 100,
      },
      {
        duration: 1,
        autoAlpha: 1,
        y: 0,
      }
    );
  }

  let fadeUpRevealTargets = document.querySelectorAll(
    '[data-gsap="fade-up-reveal"]'
  );
  if (fadeUpRevealTargets) {
    ScrollTrigger.batch(fadeUpRevealTargets, {
      once: true,
      onEnter: (batch) => {
        fadeUpReveal(batch);
      },
    });
  }

  function fadeDownReveal(elem) {
    gsap.fromTo(
      elem,
      {
        y: -100,
      },
      {
        duration: 1,
        autoAlpha: 1,
        y: 0,
      }
    );
  }

  let fadeDownRevealTargets = document.querySelectorAll(
    '[data-gsap="fade-down-reveal"]'
  );
  if (fadeDownRevealTargets) {
    ScrollTrigger.batch(fadeDownRevealTargets, {
      once: true,
      onEnter: (batch) => {
        fadeDownReveal(batch);
      },
    });
  }

  //////////////////// Divider
  function dividerReveal(elem) {
    gsap.fromTo(
      elem,
      {
        visibility: "inherit",
        width: "0%",
      },
      {
        delay: 0.2,
        duration: 1,
        width: "100%",
      }
    );
  }

  let dividerRevealTargets = document.querySelectorAll(".divider");
  if (dividerRevealTargets) {
    ScrollTrigger.batch(dividerRevealTargets, {
      once: true,
      onEnter: (batch) => {
        dividerReveal(batch);
      },
    });
  }

  //////////////////// Icons reveal
  function iconsReveal(elem) {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
      },
      {
        visibility: "inherit",
        opacity: 1,
        duration: 1.75,
        stagger: 0.05,
        x: 0,
      }
    );
  }

  let iconsRevealTargets = document.querySelectorAll(
    '[data-gsap="icons-horizontal"]'
  );
  if (iconsRevealTargets) {
    iconsRevealTargets.forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => {
          iconsReveal(elem.children);
        },
      });
    });
  }

  //////////////////// Footer nav reveal
  function horizontalNavReveal(elem) {
    gsap.fromTo(
      elem,
      {
        x: "-24",
      },
      {
        delay: 0.25,
        duration: 0.3,
        stagger: 0.1,
        autoAlpha: 1,
        x: 0,
      }
    );
  }

  let horizontalNavRevealTargets = document.querySelectorAll(
    '[data-gsap="footer-nav"]'
  );
  if (horizontalNavRevealTargets) {
    horizontalNavRevealTargets.forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => {
          let navItems = elem.querySelectorAll("a");
          horizontalNavReveal(navItems);
        },
      });
    });
  }

  //////////////////////////////////////// Img parallax
  let imgParallax;

  //////////////////////////////////////// Media queries
  mm.add(
    {
      isDesktop: `(min-width: ${breakPointTablet + 1}px)`,
      isTablet: `(max-width: ${breakPointTablet}px)`,
      isLandscape: `(max-width: ${breakPointMobileLandscape}px)`,
      isMobile: `(max-width: ${breakPointMobile}px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      let { isDesktop, isTablet, isLandscape, isMobile, reduceMotion } =
        context.conditions;

      //////////////////// Mask reveal
      function maskReveal(elem) {
        gsap.fromTo(
          elem,
          {
            visibility: "inherit",
            clipPath: "inset(-100% 100% -100% -100%)",
          },
          {
            clipPath: "inset(-100% 0% -100% -100%)",
            onComplete: function () {
              gsap.set(this.targets(), { clearProps: "clipPath" });
            },
          }
        );
      }

      let maskRevealTargets = document.querySelectorAll(
        '[data-gsap="mask-reveal"]'
      );
      if (maskRevealTargets && isDesktop) {
        ScrollTrigger.batch(maskRevealTargets, {
          once: true,
          onEnter: (batch) => {
            maskReveal(batch);
          },
        });
      }

      //////////////////// Card group reveal
      function cardGroupReveal(elem) {
        gsap.fromTo(
          elem,
          {
            x: isLandscape ? 0 : "-24",
            yPercent: isLandscape ? 30 : 0,
          },
          {
            duration: 1,
            stagger: isLandscape ? 0 : 0.3,
            autoAlpha: 1,
            x: 0,
            yPercent: 0,
          }
        );
      }

      let cardGroupRevealTargets = document.querySelectorAll(
        '[data-gsap="card-group"]'
      );
      if (cardGroupRevealTargets) {
        ScrollTrigger.batch(cardGroupRevealTargets, {
          once: true,
          onEnter: (batch) => {
            cardGroupReveal(batch);
          },
        });
      }

      //////////////////// Menu reveal
      const headerTransparent = document.querySelector(".header-transparent");
      if (headerTransparent) {
        if (isDesktop) {
          gsap.to(headerTransparent, {
            autoAlpha: 1,
            delay: 0.75,
            scrollTrigger: {
              trigger: headerTransparent,
            },
          });
        } else {
          gsap.set(headerTransparent, { autoAlpha: 1, duration: 0 });
        }
      }

      //////////////////// Hero reveal
      let homeHero = document.querySelector(".home-hero");
      if (homeHero) {
        const homeHeroTL = gsap.timeline({ paused: true });

        const homeHeroH1 = document.querySelector(".home-hero-h1");
        const homeHeroP = document.querySelector(".home-hero-p");
        const homeHeroMark = document.querySelector(".home-hero-bg__mark");
        const homeHeroGlow = document.querySelector(".home-radial-glow");
        const homeHeroForm = document.querySelector(".home-hero .start-form");

        hide(homeHeroH1);
        homeHeroP ? hide(homeHeroP) : null;
        hide(homeHeroMark);
        hide(homeHeroGlow);
        hide(homeHeroForm);

        //homeHeroTL.call(textClipReveal, [homeHeroH1], 0.25);
        homeHeroP ? homeHeroTL.call(fadeReveal, [homeHeroP], 0.75) : null;
        homeHeroTL
          .call(isDesktop ? maskReveal : fadeReveal, [homeHeroForm], 0.25)
          .fromTo(
            homeHeroMark,
            {
              visibility: "inherit",
              opacity: 0,
            },
            {
              opacity: 0.04,
              duration: 2.5,
            }
          )
          .fromTo(
            homeHeroGlow,
            {
              visibility: "inherit",
              opacity: 0,
            },
            {
              opacity: 0.5,
              duration: 2.5,
              onComplete: function () {
                gsap.fromTo(
                  homeHeroGlow,
                  {
                    opacity: 0.5,
                  },
                  {
                    ease: "none",
                    opacity: 0,
                    overwrite: "auto",
                    scrollTrigger: {
                      trigger: homeHeroGlow,
                      once: false,
                      scrub: true,
                      start: "clamp(50% 100%)",
                      end: "+=100%",
                    },
                  }
                );
              },
            },
            "<"
          );

        homeHeroTL.play();
      }

      //////////////////// Video clipping
      let videoClipTargets = document.querySelectorAll(
        '[data-gsap="scroll-inset-clip"]'
      );
      if (videoClipTargets) {
        if (isDesktop) {
          videoClipTargets.forEach((elem) => {
            gsap.fromTo(
              elem,
              {
                visibility: "inherit",
                duration: 0,
                clipPath: "inset(0% 20% round 12px)",
              },
              {
                ease: "none",
                duration: 0.5,
                clipPath: "inset(0% 0% round 24px)",
                scrollTrigger: {
                  trigger: elem,
                  scrub: true,
                  once: false,
                  end: "+=60%",
                },
              }
            );
          });
        }
      }

      //////////////////// Follow cursor
      if (isDesktop) {
        let playCursorSection = document.querySelectorAll(
          ".video-bg__lightbox.cursor-follow"
        );
        if (playCursorSection) {
          playCursorSection.forEach((section) => {
            const playCursor = section.querySelectorAll(
              ".cursor-follow .video-bg__play"
            );

            section.addEventListener("mousemove", onMove);
            section.addEventListener("mouseleave", onLeave);

            function onMove(e) {
              const { left, top, width, height } =
                section.getBoundingClientRect();

              const halfW = width / 2;
              const halfH = height / 2;
              const mouseX = e.x - left;
              const mouseY = e.y - top;

              const x = gsap.utils.interpolate(-halfW, halfW, mouseX / width);
              const y = gsap.utils.interpolate(-halfH, halfH, mouseY / height);

              gsap.to(playCursor, {
                x: x,
                y: y,
                duration: 0.5,
                overwrite: true,
              });
            }

            function onLeave(e) {
              gsap.to(playCursor, {
                x: 0,
                y: 0,
                duration: 0.6,
                overwrite: true,
              });
            }
          });
        }
      }

      //////////////////// Email sign up mask reveal
      let signupForm = document.querySelector(".form-signup__wrapper");
      if (signupForm) {
        function formMaskReveal(elem) {
          let tl = gsap.timeline();
          tl.set(".form-signup__wrapper", { display: "flex" });
          tl.fromTo(
            elem,
            {
              visibility: "inherit",
              clipPath: "inset(0% 100% 0% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
            }
          );
        }

        // Select the node that will be observed for mutations
        const formSuccessNodes = document.querySelectorAll(
          ".form-signup__success"
        );
        const formErrorNodes = document.querySelectorAll(".form-signup__error");

        // Options for the observer (which mutations to observe)
        const mutationConfig = { attributes: true, attributeFilter: ["style"] };

        // Callback function to execute when mutations are observed
        const mutationCallback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.attributeName === "style") {
              var displayValue = mutation.target.style.display;
              // mutation.target.style.clipPath = "inset(0% 0% 0% 0%)";
              observer.disconnect();
              formMaskReveal(mutation.target);
            }
          }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(mutationCallback);

        // Start observing the target node for configured mutations
        formSuccessNodes.forEach((e) => {
          observer.observe(e, mutationConfig);
        });
        formErrorNodes.forEach((e) => observer.observe(e, mutationConfig));
      }
    }
  );

  //////////////////// Refresh all ScrollTrigger instances
  ScrollTrigger.refresh();
}

window.addEventListener("DOMContentLoaded", initAnimations);

//////////////////////////////////////// First select option disabled
$("option:first-child").attr("disabled", "");

//////////////////////////////////////// Change select color after selection
$("select").on("change", function () {
  $(this).css("color", "var(--neutral-700)");
});

//////////////////////////////////////// Rotate select chevron on click
$("select").on("click", function () {
  if ($(this).parent().hasClass("select-open")) {
    $(this).parent().removeClass("select-open");
  } else {
    $(".select-wrapper").removeClass("select-open");
    $(this).parent().addClass("select-open");
  }
});

$(document).on("click", function (event) {
  if (!$(event.target).parent().hasClass("select-open")) {
    $(".select-wrapper").removeClass("select-open");
  }
});

//////////////////////////////////////// Textarea size
$("#af-description").attr("rows", "5");

//////////////////////////////////////// Current year (Copyright text)
const systemDate = new Date(); // Current date
let currentYearText = document.querySelector(".current-year"); // Select class
currentYearText.innerHTML = systemDate.getFullYear(); // Apply current date (only year) into select class

//////////////////////////////////////// Custom forms
function initCustomForms() {
  document
    .querySelectorAll("button.btn-submit")
    .forEach((button) => button.setAttribute("type", "submit"));

  const emailPattern = new RegExp(
    /^[^.](?!.*(\.)\1{1})[\w.!#$%&'*+\/=?^`{|}~-]+@[\w.-]+\.[a-z]{2,6}\b$/
  );
  const urlPattern = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+~#?&\/=]*)/
  );
  const phonePattern = new RegExp(
    /^(([(+]{1,2}\d{1,4}[)]?)[-.\s]?)?([(](\d{1,4})[)][-.\s]?)?((\d{1,12})[-.\s]?)+$/
  );

  class CustomForm {
    constructor(formElement) {
      this.formElement = formElement;
      this.requiredFields = this.formElement.querySelectorAll(
        '[custom-form-data*="required-field"], [custom-form-data*="required-group"]'
      );
      this.submitButton = this.formElement.querySelector('[type="submit"]');
      this.submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.submitForm();
      });

      this.requiredFields.forEach((field) => {
        if (field.getAttribute("custom-form-data") === "required-group") {
          field.querySelectorAll("input").forEach((input) => {
            input.addEventListener("change", (event) => {
              this.validationCheck([field]);
            });
          });
        } else {
          field.addEventListener("change", (event) => {
            this.validationCheck([field]);
          });
        }
      });

      this.initAttributes(this.requiredFields);
      this.formErrors = false;
    }

    initAttributes(elements) {
      elements.forEach((element) => {
        let label = element.parentElement.querySelector("label");

        if (label) label.removeAttribute("for");
      });
    }

    submitForm() {
      this.validationCheck(this.requiredFields);
      if (!this.formErrors) {
        //this.formElement.submit();
        return window.alert("This is a test form.");
      }
    }

    fieldError(fieldName, error) {
      let errorMessage = document.querySelector(`[error-for="${fieldName}"]`);
      let errorMessageText = errorMessage.querySelector("p");
      errorMessageText.innerText = error;
      errorMessage.classList.add("error-triggered");
      this.formErrors = true;
    }

    cleanErrors(elements) {
      this.formErrors = false;

      elements.forEach((field) => {
        let fieldName = field.getAttribute("name");
        if (field.getAttribute("custom-form-data") === "required-group") {
          fieldName = field.getAttribute("group-name");
        }
        let errorMessage = document.querySelector(`[error-for="${fieldName}"]`);
        errorMessage.classList.remove("error-triggered");
      });
    }

    validationCheck(elements) {
      this.cleanErrors(elements);

      elements.forEach((field) => {
        let fieldName = field.getAttribute("name");

        if (field.maxLength) {
          field.removeAttribute("maxlength");
        }

        if (field.tagName === "INPUT") {
          if (field.value === "") {
            this.fieldError(fieldName, "Please fill out this field.");
          } else if (
            field.type === "email" &&
            !emailPattern.test(field.value)
          ) {
            this.fieldError(fieldName, "Please enter a valid email.");
          } else if (
            field.getAttribute("custom-form-data").includes("phone") &&
            !phonePattern.test(field.value)
          ) {
            this.fieldError(fieldName, "Please enter a valid phone number.");
          } else if (
            field.getAttribute("custom-form-data").includes("url") &&
            !urlPattern.test(field.value)
          ) {
            this.fieldError(fieldName, "Please enter a valid website.");
          } else if (field.type === "text" && field.value.length > 256) {
            this.fieldError(
              fieldName,
              "This field has a maximum length of 256 characters."
            );
          } else if (
            field.getAttribute("custom-form-data").includes("acceptance") &&
            !field.checked
          ) {
            this.fieldError(
              fieldName,
              "Please accept the terms before submitting the form."
            );
          }
        }

        if (field.tagName === "TEXTAREA") {
          if (field.value === "") {
            this.fieldError(fieldName, "Please fill out this field.");
          } else if (field.value.length > 500) {
            this.fieldError(
              fieldName,
              "This field has a maximum length of 500 characters."
            );
          }
        }

        if (field.tagName === "SELECT") {
          if (field.value === "") {
            this.fieldError(fieldName, "Please fill out this field.");
          }
        }

        if (field.classList.contains("radio-group")) {
          let radioInputs = field.querySelectorAll("input");
          let notChecked = true;
          let radioGroupName = radioInputs[0].getAttribute("name");

          radioInputs.forEach((radio) => {
            if (radio.checked) notChecked = false;
          });

          if (notChecked) {
            this.fieldError(radioGroupName, "Please select an option.");
          }
        }
      });
    }
  }

  class MultistepForm extends CustomForm {
    constructor(formElement) {
      super(formElement);

      this.formSteps = [...this.formElement.querySelectorAll(".form-step")];
      this.formStepsWrapper = this.formElement.querySelector(
        ".form-steps-wrapper"
      );
      this.backButtons = this.formElement.querySelectorAll(".form-step-back");
      this.nextButtons = this.formElement.querySelectorAll(".form-step-next");
      this.stepButtons = this.formElement.querySelectorAll(".step-item");
      this.stepDividers = this.formElement.querySelectorAll(".step-divider");
      this.currentIndex = 0;
      this.formStepsWrapperWidth = null;
      this.stepHeight = null;
      this.resizeObserver = { observe: () => {}, disconnect: () => {} };

      //Init steps
      this.resizeSteps();
      this.formSteps.forEach((elem, index) => {
        if (index === 0) {
          return;
        }

        gsap.set(elem, { opacity: 0, position: "absolute" });
      });

      //Steps height resizeObserver
      function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
      }

      // If supported, create a resize observer for the container element
      if (window.ResizeObserver !== undefined) {
        new ResizeObserver(
          debounce((entries) => {
            entries.forEach((entry) => {
              let width;
              const { contentRect } = entry;
              width = Math.floor(contentRect.width);
              // Only proceed if 1) `formStepsWrapperWidth` has been set (this avoids
              // calling the resizeSteps method when the resize observer is triggered on the
              // initial render) and 2) if the width of the container element has
              // changed.
              if (
                this.formStepsWrapperWidth &&
                this.formStepsWrapperWidth !== width
              ) {
                this.resizeSteps();
              }
              // Store the width of the `contentRect`
              this.formStepsWrapperWidth = width;
            });
          }),
          100
        ).observe(this.formStepsWrapper);
      }

      //Step nav timeline
      this.stepColorsTL = gsap.timeline({ paused: true });
      this.stepButtons.forEach((step, stepIndex) => {
        let stepBG = step.querySelector(".step-bg");
        let stepNumber = step.querySelector(".step-number");
        let stepLabel = "step-" + stepIndex;

        if (stepIndex > 0) {
          let dividerSVG =
            this.stepDividers[stepIndex - 1].querySelector(
              ".step-divider-fill"
            );
          let colorDivider = gsap.to(dividerSVG, {
            duration: 0.2,
            width: "100%",
          });
          this.stepColorsTL.add(colorDivider);
        }

        let colorItem = gsap.to(stepBG, {
          duration: 0.2,
          backgroundColor: "var(--primary-500)",
        });
        let colorNumber = gsap.to(stepNumber, {
          duration: 0.2,
          color: "#FFFFFF",
        });
        this.stepColorsTL.add([colorItem, colorNumber]);

        this.stepColorsTL.add(stepLabel);
      });

      //Event listeners
      this.backButtons.forEach((btn) => {
        btn.addEventListener("click", this.stepBack.bind(this));
      });

      this.nextButtons.forEach((btn) => {
        btn.addEventListener("click", this.stepForward.bind(this));
      });

      this.stepButtons.forEach((btn, index) => {
        btn.addEventListener(
          "click",
          function () {
            if (this.currentIndex === index) {
              return;
            }

            if (this.currentIndex < index) {
              this.validationCheck(this.getStepRequiredFields());
            }

            if (!this.formErrors) {
              this.formStepTransition(this.currentIndex, index);
              this.formSteps[this.currentIndex].classList.remove("active-step");
              this.currentIndex = index;
              this.formSteps[this.currentIndex].classList.add("active-step");
            }

            this.resizeSteps();
            this.backToFormTop();
          }.bind(this)
        );
      });
    }

    submitForm() {
      this.validationCheck(this.getStepRequiredFields());
      if (!this.formErrors) {
        //this.formElement.submit();
        return window.alert("This is a test form.");
      }

      this.resizeSteps();
      this.backToFormTop();
    }

    cleanErrors(elements) {
      return super.cleanErrors(elements);
    }

    validationCheck(elements) {
      return super.validationCheck(elements);
    }

    resizeSteps() {
      this.stepHeight =
        this.formSteps[this.currentIndex].getBoundingClientRect().height;

      this.formStepsWrapper.style.height = this.stepHeight + "px";
    }

    getStepRequiredFields() {
      return this.formSteps[this.currentIndex].querySelectorAll(
        '[custom-form-data*="required-field"], [custom-form-data*="required-group"]'
      );
    }

    formStepTransition(prevIndex, nextIndex) {
      let stepTransition = gsap.timeline();

      stepTransition
        .to(this.formSteps[prevIndex], {
          opacity: 0,
          duration: 0.2,
        })
        .to(this.formSteps[nextIndex], {
          opacity: 1,
          duration: 0.2,
        });

      let prevLabel = "step-" + prevIndex;
      let nextLabel = "step-" + nextIndex;
      this.stepColorsTL.tweenFromTo(prevLabel, nextLabel, {
        ease: prevLabel < nextLabel ? Power4.easeIn : Power4.easeOut,
        duration: 0.5,
      });
    }

    // Scroll to top on step change
    backToFormTop() {
      lenis.scrollTo(this.formElement.offsetTop, {
        offset: -24,
      });
    }

    stepBack() {
      if (this.currentIndex === 0) {
        return;
      }

      this.formStepTransition(this.currentIndex, this.currentIndex - 1);
      this.formSteps[this.currentIndex].classList.remove("active-step");
      this.currentIndex--;
      this.formSteps[this.currentIndex].classList.add("active-step");
      this.stepColorsTL.tweenTo("step-" + this.currentIndex, {
        ease: Power4.easeOut,
      });
      this.resizeSteps();
      this.backToFormTop();
    }

    stepForward() {
      if (this.currentIndex === this.formSteps.length - 1) {
        return;
      }

      this.validationCheck(this.getStepRequiredFields());

      if (!this.formErrors) {
        this.formStepTransition(this.currentIndex, this.currentIndex + 1);
        this.formSteps[this.currentIndex].classList.remove("active-step");
        this.currentIndex++;
        this.stepColorsTL.tweenTo("step-" + this.currentIndex, {
          ease: Power4.easeIn,
        });
        this.formSteps[this.currentIndex].classList.add("active-step");
      }

      this.resizeSteps();
      this.backToFormTop();
    }
  }

  const formElements = document.querySelectorAll("form");
  formElements.forEach((form) => {
    if (form.classList.contains("multistep")) {
      new MultistepForm(form);
    } else {
      new CustomForm(form);
    }
  });
}

window.addEventListener("DOMContentLoaded", initCustomForms);
