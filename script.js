document.addEventListener('DOMContentLoaded', () => {
    // Interaction for table rows
    const tableRows = document.querySelectorAll('#data-table tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const ref = this.getAttribute('data-ref');
            if (ref) { // Check if the ref attribute exists to ignore rows without it (like the header)
                updateSlider(ref); // Update the interactive slider based on the clicked row's ref
                showInteractiveSlider(); // Show the first (interactive) slider and hide the automatic slider
            }
        });
    });

    // Initialize the automatic slider
    initializeAutoSlider();
    // Hide the first slider initially
    document.getElementById('slider-container').style.display = 'none';
});

function updateSlider(ref) {
    const sliderContainer = document.getElementById('slider-container');
    sliderContainer.innerHTML = ''; // Clear current slider content

    // Data should be accessible here, ensure it's declared at a scope accessible by this function
    const data = {
        '1': {text: 'يسر شركة ابو سعدى للتعهدات عن اعلانها اطلاق منصتها الخاصة بنشر<br> الخطط التسويقية و الترويجية لمنصات التواصل الاجتماعي', img: 'assets/post 5.jpg'},
        '2': {text: 'يسر شركة ابو سعدى للتعهدات عن اعلانها اطلاق منصتها الخاصة', img: 'assets/post 5.jpg'},
        // Add more data as needed
    };

    const itemData = data[ref];
    if (itemData) {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';
        sliderItem.innerHTML = `<p>${itemData.text}</p><img src="${itemData.img}" alt="">`;
        sliderContainer.appendChild(sliderItem);
    }
}

function showInteractiveSlider() {
    // Hide the automatic slider
    document.getElementById('auto-slider-container').style.display = 'none';
    // Show the first (interactive) slider
    document.getElementById('slider-container').style.display = 'block';
}

let autoSliderInterval; // Global variable to hold the interval

function initializeAutoSlider() {
    const data = [
        {text: 'Post 1', img: 'assets/post 5.jpg'},
        {text: 'Post 2', img: 'assets/post 5.jpg'},
        // Add more items as needed
    ];

    let currentIndex = 0;

    const sliderContainer = document.getElementById('auto-slider-container');
    const updateAutoSlider = () => {
        sliderContainer.innerHTML = `<div class="slider-arrow left" id="auto-slider-left">&#10094;</div>` +
                                    `<div class="slider-item"><p>${data[currentIndex].text}</p><img src="${data[currentIndex].img}" alt=""></div>` +
                                    `<div class="slider-arrow right" id="auto-slider-right">&#10095;</div>`;

        document.getElementById('auto-slider-left').onclick = () => changeSlide(-1);
        document.getElementById('auto-slider-right').onclick = () => changeSlide(1);
    };

    const changeSlide = (direction) => {
        currentIndex = (currentIndex + direction + data.length) % data.length;
        updateAutoSlider();
        restartAutoSlider(); // Restart automatic cycling
    };

    const startAutoSlider = () => {
        if (autoSliderInterval) clearInterval(autoSliderInterval);
        autoSliderInterval = setInterval(() => changeSlide(1), 3000);
    };

    const restartAutoSlider = () => {
        clearInterval(autoSliderInterval);
        startAutoSlider();
    };

    updateAutoSlider(); // Initialize the slider with the first item
    startAutoSlider(); // Start automatic cycling
}
