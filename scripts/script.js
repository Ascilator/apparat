const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active ");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// jQuery

$(function () {
  // Intro animation

  // Slick slider
  $(".item-img").slick({
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  });
});

// write after function

const doAfter = (el, func, dur) => {
  const timer = parseInt(window.getComputedStyle(el).transitionDuration);
  console.log("start");
  return new Promise((resolve) => {
    setTimeout(function () {
      func();
      console.log("end");
      resolve({ el, dur });
    }, timer * 1000 + dur);
  });
  //
};

const textAnimation = () => {
  document.querySelector(".intro-logo").classList.add("_active");
  const init = document.querySelector(".intro-logo");

  doAfter(
    init,
    () => {
      document.querySelector(".text_animation_slide").classList.add("_active");
    },
    1000
  ).then(({ el, dur }) => {
    return doAfter(
      el,
      () => {
        document.querySelector(".text_animation_fade").classList.add("_active");
      },
      1000 + dur
    );
  });
};

const offset = (el) => {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.scrollX || document.documentElement.scrollLeft,
    scrollTop = document.documentElement.scrollTop;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
};

const animationOnScroll = () => {
  const elements = document.querySelectorAll("._anim_on_scroll");
  if (!elements.length) return;

  const animElements = () => {
    elements.forEach((elem, index) => {
      const animHeight = elem.offsetHeight;
      const animOffset = offset(elem).top;
      const animStart = 2;

      let animItemPoint = window.innerHeight - animHeight / animStart;
      if (animHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        animOffset - scrollY - 0.8 * window.innerHeight <
        0
        // screenY < animOffset + animHeight
      ) {
        elem.classList.add("_active");
      } else {
        // elem.classList.remove("_active");
      }
    });
  };

  window.addEventListener("scroll", () => {
    animElements();
  });
};

const changeBackground = () => {
  const trigger = document.querySelector(".section-goods");
  const trigger2 = document.querySelector(".hugong-brand");
  const back = document.querySelector(".backgraound");

  window.addEventListener("scroll", () => {
    if (
      offset(trigger).top - scrollY - window.innerHeight / 2 < 0 &&
      offset(trigger2).top - scrollY - window.innerHeight / 2 > 0
    ) {
      back.classList.add("_active");
    } else {
      back.classList.remove("_active");
    }
  });
};

const music = () => {
  let isPlaying = false;
  const audio = document.querySelector(".sound").querySelector("audio");
  audio.src = "./img/mus.mp3";
  audio.load();

  document.querySelector(".sound").addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    document.querySelector(".sound").classList.toggle("_active");
    isPlaying = !isPlaying;
  });
};

changeBackground();
animationOnScroll();
music();

const videoAnimation = () => {
  const videoContainer = document.querySelector(".video");
  const video = document.querySelector(".video").querySelector("video");
  const imagesContainer = document.querySelector(".section_intro__img");

  video.src = "./img/video.mp4";
  video.load();
  video.play();
  video.addEventListener("loadedmetadata", function () {
    videoContainer.classList.add("_active");
  });

  video.addEventListener("ended", function () {
    videoContainer.classList.add("_ended");
    setTimeout(function () {
      imagesContainer.classList.add("_active_2");
    }, 500);
    setTimeout(function () {
      imagesContainer.classList.add("_active");
    }, 1300);
    setTimeout(function () {
      videoContainer.classList.add("_ended_2");
    }, 2600);
    setTimeout(function () {
      imagesContainer.classList.add("_ended");

      textAnimation();
    }, 3600);
  });
};

videoAnimation();
