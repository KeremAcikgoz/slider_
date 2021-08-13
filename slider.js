const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.button--right');
const prevButton = document.querySelector('.button--left');

const imagesNav = document.querySelector('.slider-nav');
const kleinImages = Array.from(imagesNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

var colorArray = ["#fffdd0","#F0FFF0","green","#cf9fff","#FF1493","#7CFC00","#0000FF", "#cc0000"];

const setBackgroundColor = (targetIndex) => {
    document.querySelector('.mobile-container').style.backgroundColor = colorArray[targetIndex];
}

const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const goToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateKleinImg = (currentKleinImage, targetImage) => {
    currentKleinImage.classList.remove('current-slide');
    targetImage.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex===0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if(targetIndex === slides.length-1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    const currentKleinImage = imagesNav.querySelector('.current-slide');
    const prevKleinImage = currentKleinImage.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    goToSlide(track, currentSlide, prevSlide);
    updateKleinImg(currentKleinImage, prevKleinImage);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
    setBackgroundColor(prevIndex);

});

nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentKleinImage = imagesNav.querySelector('.current-slide');
    const nextKleinImage = currentKleinImage.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    goToSlide(track, currentSlide, nextSlide);
    updateKleinImg(currentKleinImage, nextKleinImage);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
    setBackgroundColor(nextIndex);

});

imagesNav.addEventListener('click', e => {
    //neye tıkladık?
    const targetKleinImage = e.target.closest('img');

    if(!targetKleinImage) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentKleinImage = imagesNav.querySelector('.current-slide');

    const targetIndex = kleinImages.findIndex(img => img===targetKleinImage);

    const targetSlide = slides[targetIndex];

    goToSlide(track, currentSlide, targetSlide);
    updateKleinImg(currentKleinImage, targetKleinImage);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);
    setBackgroundColor(targetIndex);
});









