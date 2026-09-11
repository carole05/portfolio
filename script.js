const burger = document.querySelector(".burger"),
  menu = document.querySelector(".menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menu.setAttribute("aria-hidden", String(!open));
  burger.setAttribute("aria-expanded", String(open));
}
burger.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open")),
);
document
  .querySelectorAll(".menu a")
  .forEach((a) => a.addEventListener("click", () => setMenu(false)));

const cards = [...document.querySelectorAll(".card")];
document.querySelectorAll(".tab").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((c) =>
      c.classList.toggle("hidden", f !== "all" && c.dataset.cat !== f),
    );
  }),
);

const modal = document.querySelector(".project-modal"),
  modalTitle = modal.querySelector("h2"),
  modalMeta = modal.querySelector(".project-meta"),
  modalText = modal.querySelector(".project-text"),
  modalFlow = modal.querySelector(".project-flow");
function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
}
cards.forEach((c) =>
  c.querySelector(".card-open").addEventListener("click", () => {
    modalTitle.textContent = c.dataset.title;
    modalMeta.textContent = c.dataset.meta;
    modalText.textContent = c.dataset.text;
    modalFlow.innerHTML = "";
    c.dataset.images.split(",").forEach((src, i) => {
      const b = document.createElement("button");
      b.className = "project-shot";
      b.type = "button";
      const img = new Image();
      img.src = src;
      img.alt = `${c.dataset.title} – Ansicht ${i + 1}`;
      b.appendChild(img);
      modalFlow.appendChild(b);
    });
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    modal.scrollTop = 0;
  }),
);
modal.querySelector(".modal-close").addEventListener("click", closeProject);

const faqItems = [...document.querySelectorAll(".faq-item")];
faqItems.forEach((item) => {
  const q = item.querySelector(".faq-question");
  q.addEventListener("click", () => {
    const next = !item.classList.contains("open");
    item.classList.toggle("open", next);
    q.setAttribute("aria-expanded", String(next));
  });
});

const lightbox = document.querySelector(".lightbox"),
  lbImg = lightbox.querySelector("img");
let lbItems = [],
  current = 0;
function uniqueImageItems(root) {
  const seen = new Set();
  return [...root.querySelectorAll(".gallery-img, .project-shot")].filter(
    (b) => {
      const img = b.querySelector("img");
      if (!img) return false;
      const key = img.getAttribute("src");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    },
  );
}
function showLightboxFrom(button) {
  const root = button.classList.contains("project-shot")
    ? modal
    : document.querySelector(".photo");
  lbItems = uniqueImageItems(root);
  const clickedSrc = button.querySelector("img")?.getAttribute("src");
  current = Math.max(
    0,
    lbItems.findIndex(
      (b) => b.querySelector("img")?.getAttribute("src") === clickedSrc,
    ),
  );
  showCurrent();
}
function showCurrent() {
  if (!lbItems.length) return;
  current = (current + lbItems.length) % lbItems.length;
  const img = lbItems[current].querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lock");
  if (modal.classList.contains("open")) document.body.classList.add("lock");
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".gallery-img,.project-shot");
  if (btn) showLightboxFrom(btn);
});
lightbox
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => {
  current--;
  showCurrent();
});
lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
  current++;
  showCurrent();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (lightbox.classList.contains("open")) closeLightbox();
    else if (modal.classList.contains("open")) closeProject();
    else setMenu(false);
  }
  if (lightbox.classList.contains("open") && e.key === "ArrowRight") {
    current++;
    showCurrent();
  }
  if (lightbox.classList.contains("open") && e.key === "ArrowLeft") {
    current--;
    showCurrent();
  }
});
