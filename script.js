console.log("Script is running!");



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


document.addEventListener("DOMContentLoaded", () => {
    const projects = {
        1: { title: "Project 1", url: "projects/template.html" },
        2: { title: "Project 2", url: "projects/template2.html" },
        // Add more projects as needed
    };

    let zIndex = 1000;

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const projectId = card.getAttribute("data-project");
            const projectData = projects[projectId];
            
            // Check if the screen width is mobile-sized
            if (window.innerWidth <= 768) {
                // Redirect to the project page for mobile devices
                window.location.href = projectData.url;
            } else {
                // Otherwise, open the project in a draggable window
                createProjectWindow(projectData.title, projectData.url, e.clientX, e.clientY);
            }
        });
    });

    function createProjectWindow(title, url, clickX, clickY) {
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("project-window", "card", "shadow-lg");
        windowDiv.style.zIndex = zIndex++;
        windowDiv.style.left = `${clickX}px`;
        windowDiv.style.top = `${clickY}px`;
        
        windowDiv.innerHTML = `
            <div class="window-header card-header d-flex justify-content-between align-items-center">
                <span>${title}</span>
                <button class="btn-close close-window" aria-label="Close"></button>
            </div>
            <iframe src="${url}" class="window-content card-body" style="width: 100%; height: 100%; border: none;"></iframe>
            <div class="resize-handle top-left"></div>
            <div class="resize-handle top-right"></div>
            <div class="resize-handle bottom-left"></div>
            <div class="resize-handle bottom-right"></div>
            <div class="resize-handle top"></div>
            <div class="resize-handle bottom"></div>
            <div class="resize-handle left"></div>
            <div class="resize-handle right"></div>
        `;

        document.body.appendChild(windowDiv);

        // Close button functionality
        windowDiv.querySelector(".close-window").addEventListener("click", () => {
            document.body.removeChild(windowDiv);
        });

        makeDraggable(windowDiv);
        makeResizable(windowDiv);
    }

    function makeDraggable(element) {
        const header = element.querySelector(".window-header");
        let offsetX, offsetY;

        header.addEventListener("mousedown", (e) => {
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            function mouseMoveHandler(e) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", mouseMoveHandler);
            }, { once: true });
        });
    }

    
});
