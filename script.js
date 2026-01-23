
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let sliders = document.querySelector('.sliders');
let lists = document.querySelector('.sliders .list');
let seeMoreButton = document.querySelectorAll('.seeMore-btn');
let backButton = document.getElementById('back');

nextButton.onclick = function() {
    showSlider('next');
}

prevButton.onclick = function() {
    showSlider('prev');
}

let unAcceptclick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    sliders.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.sliders .list .item');
    if(type === 'next') {
        lists.appendChild(items[0]);
        sliders.classList.add('next');
    }else{
        lists.prepend(items[items.length-1]);
        sliders.classList.add('prev');
    }
    clearTimeout(unAcceptclick);
    unAcceptclick = setTimeout(()=> {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButton.forEach((button)=> {
    button.onclick = function () {
        sliders.classList.remove('next', 'prev');
        sliders.classList.add('showDetail');
        stopAutoSlide();
    }
});

backButton.onclick = function () {
    sliders.classList.remove('showDetail');
    startAutoSlide();
}

let autoSlide;

const startAutoSlide = () => {
    if (autoSlide) return;
    autoSlide = setInterval(() => {
        showSlider('next');
    }, 5000);
}

const stopAutoSlide = () => {
    clearInterval(autoSlide);
    autoSlide = null;
}
startAutoSlide();

[nextButton, prevButton].forEach(button => {
    button.addEventListener('click', () => {
        stopAutoSlide();
        setTimeout(() => {
            if(!autoSlide) startAutoSlide();
        },6000);
    });
});

sliders.addEventListener('mouseenter', stopAutoSlide);
sliders.addEventListener('mouseleave', startAutoSlide);
