document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('.reel-video');

    // Intersection Observer to auto-play/pause videos in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.8 });

    videos.forEach(video => observer.observe(video));
});
