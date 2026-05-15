const projectImages = document.querySelectorAll(".modal-image");

projectImages.forEach((image) => {

  image.addEventListener("click", () => {

    const overlay = document.createElement("div");

    overlay.classList.add("fullscreen-image");

    overlay.innerHTML = `
      <img src="${image.src}" alt="${image.alt}">
    `;

    document.body.appendChild(overlay);

    document.body.style.overflow = "hidden";

    overlay.addEventListener("click", () => {

      overlay.remove();

      document.body.style.overflow = "";
    });
  });
});