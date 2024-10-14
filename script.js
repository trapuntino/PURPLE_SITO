console.log("Script is running!");

const projects = {
    1: { title: "Project 1", content: "Details about Project 1..." },
    2: { title: "Project 2", content: "Details about Project 2..." },
};

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
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Toggle active class on buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projects = {
        1: { title: "Project 1", content: "Details about Project 1..." },
        2: { title: "Project 2", content: "Details about Project 2..." },
        // Add more projects as needed
    };

    let zIndex = 1000; // Initial z-index for windows

    document.querySelectorAll(".open-project").forEach(button => {
        button.addEventListener("click", () => {
            const projectId = button.getAttribute("data-project");
            const projectData = projects[projectId];
            if (projectData) {
                createProjectWindow(projectData.title, projectData.content);
            }
        });
    });

    function createProjectWindow(title, content) {
        console.log("Creating project window for:", title); // Debugging message
    
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("project-window");
        windowDiv.style.zIndex = zIndex++;
    
        windowDiv.innerHTML = `
            <div class="window-header">
                <span>${title}</span>
                <button class="close-window">&times;</button>
            </div>
            <div class="window-content">
                <p>${content}</p>
            </div>
        `;
    
        document.body.appendChild(windowDiv);
        console.log("Project window created:", windowDiv); // Debugging message
    
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

document.querySelectorAll(".open-project").forEach(button => {
    button.addEventListener("click", () => {
        console.log("Button clicked"); // Debugging message
        const projectId = button.getAttribute("data-project");
        const projectData = projects[projectId];
        if (projectData) {
            createProjectWindow(projectData.title, projectData.content);
        } else {
            console.error("Project data not found for ID:", projectId);
        }
    });
});

