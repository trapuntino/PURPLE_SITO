// Declare global audio state at the top level for global access
let globalAudioEnabled = false; // Track global audio state

document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('.reel-video');

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
});

// Toggle global audio for all videos
function toggleGlobalAudio() {
    globalAudioEnabled = !globalAudioEnabled; // Toggle the global audio state
    document.querySelectorAll('.reel-video').forEach(video => {
        video.muted = !globalAudioEnabled; // Set each video's muted state
    });
}
