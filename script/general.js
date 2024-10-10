import "iconify-icon";
import MicroModal from "micromodal";
import Alpine from "alpinejs";
import mask from "@alpinejs/mask";
import collapse from "@alpinejs/collapse";
import Splide from "@splidejs/splide";

window.Alpine = Alpine;
Alpine.plugin(mask);
Alpine.plugin(collapse);
Alpine.start();

MicroModal.init({
  openTrigger: "data-t4-modal-open",
  closeTrigger: "data-t4-modal-close",
  openClass: "-open",
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
});

if (document.querySelector(".t4-mobile-nav")) {
  let mobileNav = document.querySelector(".t4-mobile-nav");
  let mobileNavCloseElems = mobileNav.querySelectorAll("[close-mobile-nav]");
  let mobileNavOpenElems = document.querySelectorAll("[open-mobile-nav]");
  let mobileNavMenuhHasChildElems = mobileNav.querySelectorAll(
    ".mobile-menu .-has-child"
  );
  mobileNavCloseElems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileNav.classList.remove("-open");
      document.body.classList.remove("-open-mobile-nav");
    });
  });
  mobileNavOpenElems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileNav.classList.toggle("-open");
      document.body.classList.toggle("-open-mobile-nav");
    });
  });
  mobileNavMenuhHasChildElems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.classList.toggle("-open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(
    ".login-register .otp-input__item"
  );
  const otpHidden = document.querySelector(".login-register #otp-hidden");

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      let value = event.target.value;
      value = value.replace(/[^\d۰-۹]/g, "");

      if (value.length === 1) {
        input.value = toEnglishDigits(value);
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      } else {
        input.value = "";
      }

      updateHiddenInput();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && event.target.value === "" && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (event) => {
      event.preventDefault();
    });
  });

  function updateHiddenInput() {
    const otpValue = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");
    otpHidden.value = otpValue;
  }

  function toEnglishDigits(str) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(
      /[۰-۹]/g,
      (w) => englishDigits[persianDigits.indexOf(w)]
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".hero__img-box")) {
    document.addEventListener("mousemove", function (e) {
      const x = e.clientX;
      const y = e.clientY;

      document.querySelector(
        ".hero__img-box .-ts"
      ).style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
      document.querySelector(
        ".hero__img-box .-te"
      ).style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
      document.querySelector(
        ".hero__img-box .-be"
      ).style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
      document.querySelector(
        ".hero__img-box .-bs"
      ).style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
    });
  }

  if (document.querySelector(".categories .splide")) {
    let categoriesCarousel = new Splide(".categories .splide", {
      perPage: 5,
      perMove: 1,
      gap: "1.5rem",
      direction: document.dir == "rtl" ? "rtl" : "ltr",
      arrows: false,
      breakpoints: {
        992: {
          perPage: 4,
        },
        768: {
          perPage: 3,
        },
        576: {
          perPage: 2,
        },
      },
    });
    categoriesCarousel.on("overflow", function (isOverflow) {
      categoriesCarousel.options = {
        drag: isOverflow,
        pagination: isOverflow,
      };
    });
    categoriesCarousel.mount();
  }

  if (document.querySelector(".testimonial .splide")) {
    new Splide(".testimonial .splide", {
      arrows: false,
      direction: "rtl",
      perPage: 1,
    }).mount();
  }

  if (document.querySelector(".product-carousel")) {
    let productCarousel = new Splide(".product-carousel", {
      perPage: 4,
      perMove: 1,
      gap: "1.5rem",
      direction: document.dir == "rtl" ? "rtl" : "ltr",
      breakpoints: {
        992: {
          perPage: 3,
        },
        768: {
          perPage: 2,
        },
        576: {
          perPage: 1,
        },
      },
    });
    productCarousel.on("overflow", function (isOverflow) {
      productCarousel.options = {
        drag: isOverflow,
        pagination: isOverflow,
        arrows: isOverflow,
      };
    });
    productCarousel.mount();
  }

  if (document.querySelector(".blog-carousel")) {
    let blogCarousel = new Splide(".blog-carousel", {
      perPage: 3,
      perMove: 1,
      gap: "1.5rem",
      direction: document.dir == "rtl" ? "rtl" : "ltr",
      breakpoints: {
        992: {
          perPage: 2,
        },
        576: {
          perPage: 1,
        },
      },
    });
    blogCarousel.on("overflow", function (isOverflow) {
      blogCarousel.options = {
        drag: isOverflow,
        pagination: isOverflow,
        arrows: isOverflow,
      };
    });
    blogCarousel.mount();
  }
});
