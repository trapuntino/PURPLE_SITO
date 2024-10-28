document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('.reel-video');
    let globalAudioEnabled = false; // Track audio state globally

    // Intersection Observer to auto-play/pause videos in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play();
                video.muted = !globalAudioEnabled; // Mute or unmute based on global audio state
            } else {
                video.pause();
                video.muted = true; // Always mute when out of view
            }
        });
    }, { threshold: 0.8 });

    // Observe each video
    videos.forEach(video => observer.observe(video));

    // Toggle audio globally when any video is clicked
    document.addEventListener('click', () => {
        globalAudioEnabled = !globalAudioEnabled;
        videos.forEach(video => {
            video.muted = !globalAudioEnabled; // Apply the global mute state
        });
    });
});
