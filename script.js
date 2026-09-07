(function () {
    const galleryContainer = document.querySelector('.masonry-gallery');
    if (!galleryContainer) return;

    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.id = 'lightbox';
        overlay.className = 'lightbox';
        overlay.innerHTML = `
            <span class="close">&times;</span>
            <img class="lightbox-content" id="lightbox-img" alt="">
            <a class="prev" id="prev">&#10094;</a>
            <a class="next" id="next">&#10095;</a>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    const lightbox = document.getElementById('lightbox') || createLightbox();
    const lightboxImage = document.getElementById('lightbox-img') || lightbox.querySelector('.lightbox-content');
    const closeButton = lightbox.querySelector('.close');
    const prevButton = lightbox.querySelector('.prev');
    const nextButton = lightbox.querySelector('.next');

    let images = [];
    let currentIndex = 0;

    function getImages() {
        return Array.from(document.querySelectorAll('.masonry-gallery img')).filter((img) => {
            return img.id !== 'lightbox-img' && !img.closest('.lightbox') && img.getAttribute('src');
        });
    }

    function openLightbox(index) {
        images = getImages();
        if (!images.length) return;

        currentIndex = (index + images.length) % images.length;
        const image = images[currentIndex];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showNext() {
        openLightbox(currentIndex + 1);
    }

    function showPrev() {
        openLightbox(currentIndex - 1);
    }

    function attachLightboxListeners() {
        images = getImages();
        if (!images.length) return;

        images.forEach((image, index) => {
            const trigger = image.closest('a') || image;
            trigger.style.cursor = 'zoom-in';
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                openLightbox(index);
            });
        });
    }

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target === closeButton) {
            closeLightbox();
        }
    });

    prevButton.addEventListener('click', (event) => {
        event.stopPropagation();
        showPrev();
    });

    nextButton.addEventListener('click', (event) => {
        event.stopPropagation();
        showNext();
    });

    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display !== 'flex') return;

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowRight') {
            showNext();
        } else if (event.key === 'ArrowLeft') {
            showPrev();
        }
    });

    attachLightboxListeners();
    window.addEventListener('load', attachLightboxListeners);
})();

