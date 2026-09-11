/* =========================================================
   PORTFOLIO
   ========================================================= */

/* =========================================================
   BURGER MENU
   ========================================================= */

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

function setMenu(open) {
  if (!burger || !menu) return;

  menu.classList.toggle("open", open);
  menu.setAttribute("aria-hidden", String(!open));
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("lock", open);
}

if (burger && menu) {
  burger.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenu(false);
    });
  });
}

/* =========================================================
   PROJECT FILTER
   ========================================================= */

const cards = [...document.querySelectorAll(".card")];
const tabs = [...document.querySelectorAll(".tab")];

tabs.forEach((button) => {
  button.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const hidden = filter !== "all" && card.dataset.cat !== filter;

      card.classList.toggle("hidden", hidden);
    });
  });
});

/* =========================================================
   FAQ
   ========================================================= */

const faqItems = [...document.querySelectorAll(".faq-item")];

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector(".faq-question");

      otherItem.classList.remove("open");

      if (otherButton) {
        otherButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

/* =========================================================
   HOME PHOTOGRAPHY LIGHTBOX
   ========================================================= */

const homeLightbox = document.querySelector(".lightbox");

const homeLightboxImage = homeLightbox?.querySelector("img");

const homeLightboxClose = homeLightbox?.querySelector(".lightbox-close");

const homeLightboxPrev = homeLightbox?.querySelector(".lightbox-prev");

const homeLightboxNext = homeLightbox?.querySelector(".lightbox-next");

const galleryItems = [...document.querySelectorAll(".gallery-img")];

let currentGalleryImage = 0;

function showGalleryImage(index) {
  if (!homeLightbox || !homeLightboxImage || !galleryItems.length) {
    return;
  }

  currentGalleryImage = (index + galleryItems.length) % galleryItems.length;

  const button = galleryItems[currentGalleryImage];

  const image = button.querySelector("img");

  if (!image) return;

  homeLightboxImage.src = image.src;
  homeLightboxImage.alt = image.alt;

  homeLightbox.classList.add("open");

  homeLightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lock");
}

function closeGalleryLightbox() {
  if (!homeLightbox) return;

  homeLightbox.classList.remove("open");

  homeLightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lock");
}

galleryItems.forEach((button, index) => {
  button.addEventListener("click", () => {
    showGalleryImage(index);
  });
});

if (homeLightboxClose) {
  homeLightboxClose.addEventListener("click", closeGalleryLightbox);
}

if (homeLightboxPrev) {
  homeLightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();

    showGalleryImage(currentGalleryImage - 1);
  });
}

if (homeLightboxNext) {
  homeLightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();

    showGalleryImage(currentGalleryImage + 1);
  });
}

if (homeLightbox) {
  homeLightbox.addEventListener("click", (event) => {
    if (event.target === homeLightbox) {
      closeGalleryLightbox();
    }
  });
}

/* =========================================================
   PROJECT PAGE LIGHTBOX
   ========================================================= */

const projectLightbox = document.querySelector(".project-lightbox");

const projectLightboxImage = document.querySelector(".project-lightbox-image");

const projectLightboxClose = document.querySelector(".project-lightbox-close");

const projectLightboxPrev = document.querySelector(".project-lightbox-prev");

const projectLightboxNext = document.querySelector(".project-lightbox-next");

const projectLightboxButtons = [
  ...document.querySelectorAll("[data-project-lightbox]"),
];

let projectLightboxCurrent = 0;

function showProjectLightboxImage() {
  if (!projectLightboxImage || !projectLightboxButtons.length) {
    return;
  }

  const button = projectLightboxButtons[projectLightboxCurrent];

  const image = button.querySelector("img");

  projectLightboxImage.src = button.dataset.projectLightbox;

  projectLightboxImage.alt = image?.alt || "";
}

function openProjectLightbox(index) {
  if (!projectLightbox) return;

  projectLightboxCurrent = index;

  showProjectLightboxImage();

  projectLightbox.classList.add("is-open");

  projectLightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("project-lightbox-open");
}

function closeProjectLightbox() {
  if (!projectLightbox) return;

  projectLightbox.classList.remove("is-open");

  projectLightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("project-lightbox-open");
}

projectLightboxButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    openProjectLightbox(index);
  });
});

if (projectLightboxClose) {
  projectLightboxClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closeProjectLightbox();
  });
}

if (projectLightboxPrev) {
  projectLightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();

    projectLightboxCurrent--;

    if (projectLightboxCurrent < 0) {
      projectLightboxCurrent = projectLightboxButtons.length - 1;
    }

    showProjectLightboxImage();
  });
}

if (projectLightboxNext) {
  projectLightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();

    projectLightboxCurrent++;

    if (projectLightboxCurrent >= projectLightboxButtons.length) {
      projectLightboxCurrent = 0;
    }

    showProjectLightboxImage();
  });
}

if (projectLightbox) {
  projectLightbox.addEventListener("click", (event) => {
    if (event.target === projectLightbox) {
      closeProjectLightbox();
    }
  });
}

/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (projectLightbox?.classList.contains("is-open")) {
    if (event.key === "Escape") {
      closeProjectLightbox();
    }

    if (event.key === "ArrowLeft") {
      projectLightboxCurrent--;

      if (projectLightboxCurrent < 0) {
        projectLightboxCurrent = projectLightboxButtons.length - 1;
      }

      showProjectLightboxImage();
    }

    if (event.key === "ArrowRight") {
      projectLightboxCurrent++;

      if (projectLightboxCurrent >= projectLightboxButtons.length) {
        projectLightboxCurrent = 0;
      }

      showProjectLightboxImage();
    }

    return;
  }

  if (homeLightbox?.classList.contains("open")) {
    if (event.key === "Escape") {
      closeGalleryLightbox();
    }

    if (event.key === "ArrowLeft") {
      showGalleryImage(currentGalleryImage - 1);
    }

    if (event.key === "ArrowRight") {
      showGalleryImage(currentGalleryImage + 1);
    }

    return;
  }

  if (event.key === "Escape") {
    setMenu(false);
  }
});
