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
        1: { title: "Befest_2023", url: "projects/befest_2023.html" },
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

    document.addEventListener('DOMContentLoaded', function () {
        const purpletvLink = document.getElementById('purpletv-link');
        const mobileURL = 'media-mobile.html'; // URL of the mobile-specific page
        const desktopURL = 'media.html';       // URL of the desktop page
    
        function updateLink() {
            if (window.innerWidth <= 768) { // Adjust screen width as needed for "mobile"
                purpletvLink.href = mobileURL;
            } else {
                purpletvLink.href = desktopURL;
            }
        }
    
        // Run on page load
        updateLink();
    
        // Run on window resize to handle screen size changes
        window.addEventListener('resize', updateLink);
    });
    

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


// RANDOM CARD PICKER
document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");
    const pickRandomCardButton = document.getElementById("pickRandomCard");
    const randomCardDisplay = document.getElementById("randomCardDisplay");
    const randomCardImage = document.getElementById("randomCardImage");
    const randomCardTitle = document.getElementById("randomCardTitle");
    const randomCardDescription = document.getElementById("randomCardDescription");

    // Define a function to handle card clicks (for both small and large cards)
    function handleCardClick(projectId, projectUrl) {
        if (window.innerWidth <= 768) {
            // Redirect to the project page on mobile devices
            window.location.href = projectUrl;
        } else {
            // Open the project in a draggable window on larger screens
            createProjectWindow(`Project ${projectId}`, projectUrl, window.innerWidth / 2, window.innerHeight / 2);
        }
    }

    // Add click functionality to small cards
    projectCards.forEach(card => {
        const projectId = card.getAttribute("data-project");
        const projectUrl = `project${projectId}.html`; // Assuming each project has its own HTML file

        card.addEventListener("click", () => {
            handleCardClick(projectId, projectUrl);
        });
    });

    // Add functionality to pick a random card and display it
    pickRandomCardButton.addEventListener("click", () => {
        if (projectCards.length > 0) {
            // Pick a random card
            const randomIndex = Math.floor(Math.random() * projectCards.length);
            const randomCard = projectCards[randomIndex];
            const projectId = randomCard.getAttribute("data-project");
            const projectUrl = `project${projectId}.html`; // Assuming each project has its own HTML file

            // Update the random card display container with the selected card's data
            randomCardImage.src = randomCard.querySelector(".card-img-top").src;
            randomCardTitle.textContent = `Project ${projectId}`;
            randomCardDescription.textContent = `Description of Project ${projectId}`;

            // Add click functionality to the large display card
            randomCardDisplay.onclick = () => handleCardClick(projectId, projectUrl);

            // Show the display container
            randomCardDisplay.classList.remove("d-none");
        }
    });

    
});

document.addEventListener('DOMContentLoaded', () => {
    const watchNowBtn = document.getElementById('watch-now-btn');

    function updateLink() {
        if (window.innerWidth <= 768) { // Adjust this value for your mobile breakpoint
            watchNowBtn.href = 'media-mobile.html';
        } else {
            watchNowBtn.href = 'media.html';
        }
    }

    // Run the function on page load
    updateLink();

    // Run the function on window resize to handle resizing the browser
    window.addEventListener('resize', updateLink);
});

