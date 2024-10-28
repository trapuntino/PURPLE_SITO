// Loader
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingVideo = document.getElementById('loading-video');

    // Hide loading screen and show main content after video ends
    loadingVideo.addEventListener('ended', () => {
        loadingScreen.style.display = 'none';  // Hide loading screen
        mainContent.style.display = 'block';  // Show main content
    });
});

// Variables for dragging functionality
let isDragging = false;
let startX;
let scrollLeft;
const carouselContainer = document.querySelector('.carousel-container');
const carouselRow = document.querySelector('.carousel-row');

// Mouse down event to start dragging
carouselContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carouselContainer.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
    carouselContainer.style.cursor = 'grabbing';
});

// Mouse up and mouse leave event to stop dragging
carouselContainer.addEventListener('mouseup', () => {
    isDragging = false;
    carouselContainer.style.cursor = 'grab';
});

carouselContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    carouselContainer.style.cursor = 'grab';
});

// Mouse move event to handle dragging
carouselContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed here
    carouselContainer.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile support
carouselContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carouselContainer.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
});

carouselContainer.addEventListener('touchend', () => {
    isDragging = false;
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselContainer.scrollLeft = scrollLeft - walk;
});


// Open Detail Card
function openDetailCard(videoSrc, thumbnailSrc, title, description) {
    const detailCard = document.getElementById('detail-card');
    document.getElementById('detail-thumbnail').src = thumbnailSrc;
    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-description').textContent = description;

    // Save video source for the play button
    detailCard.dataset.videoSrc = videoSrc;

    detailCard.style.display = 'flex';
}

// Close Detail Card
function closeDetailCard() {
    const detailCard = document.getElementById('detail-card');
    detailCard.style.display = 'none';
}

// Open Full-Screen Video Modal to Play Video
function playVideo() {
    const detailCard = document.getElementById('detail-card');
    const videoSrc = detailCard.dataset.videoSrc;
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');

    modalVideo.src = videoSrc;
    videoModal.style.display = 'flex';

    // Close the detail card
    closeDetailCard();
}

// Close Video Modal
function closeVideoModal() {
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');

    modalVideo.pause();
    modalVideo.currentTime = 0;
    videoModal.style.display = 'none';
    modalVideo.src = ''; // Clear the source to stop playback
}
