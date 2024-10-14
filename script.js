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
        // Add more projects with unique URLs as needed
    };

    // Array of hex color codes
    const headerColors = ["#F20089", "#D900B8", "#BC00DD", "#A100F2", "#0AF004"];

    let zIndex = 1050; // Starting z-index for project windows

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const projectId = card.getAttribute("data-project");
            const projectData = projects[projectId];
            
            // Check if the screen width is mobile-sized
            if (window.innerWidth <= 768) {
                // Redirect to the same project page for mobile devices
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
        windowDiv.style.zIndex = zIndex++; // Increment z-index for each new window
        windowDiv.style.left = `${clickX}px`;
        windowDiv.style.top = `${clickY}px`;

        // Use an iframe to load the project URL within the window
        windowDiv.innerHTML = `
            <div class="window-header card-header d-flex justify-content-between align-items-center">
                <span>${title}</span>
                <button class="btn-close close-window" aria-label="Close"></button>
            </div>
            <iframe src="${url}" class="window-content card-body" style="width: 100%; height: 100%; border: none;"></iframe>
        `;

        document.body.appendChild(windowDiv);

        // Select a random color from the headerColors array
        const randomColor = headerColors[Math.floor(Math.random() * headerColors.length)];
        
        // Apply the random color to the window header
        const headerElement = windowDiv.querySelector(".window-header");
        headerElement.style.backgroundColor = randomColor;
        headerElement.style.color = "#ffffff"; // Set text color to white for better contrast

        // Close button functionality
        windowDiv.querySelector(".close-window").addEventListener("click", () => {
            document.body.removeChild(windowDiv);
        });

        makeDraggable(windowDiv);
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

console.log("Random color array:", headerColors);
console.log("Selected random color:", randomColor);