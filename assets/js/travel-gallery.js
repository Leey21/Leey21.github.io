(function () {
  var galleries = Array.prototype.slice.call(document.querySelectorAll(".travel-orbit"));
  var lightbox = document.querySelector(".travel-lightbox");
  if (!galleries.length || !lightbox) return;

  var image = lightbox.querySelector(".travel-lightbox-image");
  var closeButton = lightbox.querySelector(".travel-lightbox-close");
  var prevButton = lightbox.querySelector(".travel-lightbox-prev");
  var nextButton = lightbox.querySelector(".travel-lightbox-next");
  var photos = [];
  var currentIndex = 0;

  function showPhoto(index) {
    if (!photos.length) return;
    currentIndex = (index + photos.length) % photos.length;
    image.src = photos[currentIndex].getAttribute("data-src");
    image.alt = photos[currentIndex].querySelector("img").alt || "Selected travel photo";
  }

  function openLightbox(galleryPhotos, index) {
    photos = galleryPhotos;
    showPhoto(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("travel-lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("travel-lightbox-open");
    image.src = "";
  }

  galleries.forEach(function (gallery) {
    var galleryPhotos = Array.prototype.slice.call(gallery.querySelectorAll(".travel-orbit-photo"));
    galleryPhotos.forEach(function (photo, index) {
      photo.addEventListener("click", function () {
        openLightbox(galleryPhotos, index);
      });
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", function () { showPhoto(currentIndex - 1); });
  nextButton.addEventListener("click", function () { showPhoto(currentIndex + 1); });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
  });
})();
