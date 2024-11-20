let currentIndex = 0;
const images = [
    '../Images/Robotic_machine.jpg',
    '../Images/Robotic_machine_2.jpg',
    '../Images/software_2.jpg',
    '../Images/software.jpg',
];

function changeImage(direction) {
    const imgElement = document.getElementById('gallery-image');
    imgElement.classList.add('fade-out');

    setTimeout(() => {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        imgElement.src = images[currentIndex];
        imgElement.classList.remove('fade-out');
        updateProgressDots();
    }, 500); 
}

function updateProgressDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function generateDots() {
    const dotsContainer = document.querySelector('.progress-dots');
    dotsContainer.innerHTML = '';

    images.forEach(() => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateDots();
    updateProgressDots();
    setInterval(() => changeImage(1), 5000);
});
