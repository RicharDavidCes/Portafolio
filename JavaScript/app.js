// Data Local de Proyectos
const projectsData = [
    {
        id: 1,
        title: "Recopilado de Información UCV",
        description: "Plataforma web interactiva para buscar material de estudio por semestres académicos y materias.",
        media: [
            { type: "image", url: "assets/img/recopilado-ucv-1.png" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },
    {
        id: 2,
        title: "Cafetín Central",
        description: "Aplicación web completa para la gestión de menú digital, caja registradora y panel administrativo.",
        media: [
            { type: "image", url: "assets/img/cafetin-1.png" },
            { type: "image", url: "assets/img/cafetin-2.png" } // Segunda imagen para el slider del modal
        ],
        technologies: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        id: 3,
        title: "MascaTinder",
        description: "Plataforma de conexión social orientada a mascotas con interfaz en modo oscuro interactiva.",
        media: [
            { type: "image", url: "assets/img/mascatinder-1.png" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },    
    {
        id: 4,
        title: "Campus Virtual - Dashboard Administrativo",
        description: "Módulo de administración CRUD con filtros dinámicos en tiempo real y tablas optimizadas.",
        media: [
            { type: "image", url: "assets/img/admin-system.png" }
        ],
        technologies: ["PHP", "MVC", "JavaScript","HTML5", "CSS3", "MySQL", "MySQLi", "PhpMyAdmin", "Ajax", "jQuery", "XAMPP"]
    }
];

// Configuración de Paginación
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Referencias al DOM
const projectsContainer = document.getElementById("projects-container");
const paginationContainer = document.getElementById("pagination-container");

// Renderizar Proyectos según la página actual
function renderProjects(page) {
    projectsContainer.innerHTML = "";
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = projectsData.slice(startIndex, endIndex);

    currentProjects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        
        const firstMedia = project.media[0];
        const mediaHtml = firstMedia.type === "image" 
            ? `<img src="${firstMedia.url}" alt="${project.title}" class="project-thumb">`
            : `<video src="${firstMedia.url}" class="project-thumb" muted></video>`;

        card.innerHTML = `
            ${mediaHtml}
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 80)}...</p>
                <div>
                    ${project.technologies.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join("")}
                </div>
            </div>
        `;

        card.addEventListener("click", () => openModal(project));
        projectsContainer.appendChild(card);
    });

    renderPagination();
}

// Renderizar Paginación
function renderPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");
        btn.innerText = i;
        btn.addEventListener("click", () => {
            currentPage = i;
            renderProjects(currentPage);
        });
        paginationContainer.appendChild(btn);
    }
}

// Lógica del Modal / Visor de Proyecto
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close-modal");
const mediaViewer = document.getElementById("media-viewer");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const mediaCounter = document.getElementById("media-counter");
const prevBtn = document.getElementById("prev-media");
const nextBtn = document.getElementById("next-media");

let currentMediaIndex = 0;
let currentProjectMedia = [];

function openModal(project) {
    currentProjectMedia = project.media;
    currentMediaIndex = 0;

    modalTitle.innerText = project.title;
    modalDescription.innerText = project.description;
    modalTech.innerHTML = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join("");

    updateMediaDisplay();
    modal.style.display = "flex";
}

function updateMediaDisplay() {
    const item = currentProjectMedia[currentMediaIndex];
    if (item.type === "image") {
        mediaViewer.innerHTML = `<img src="${item.url}" alt="Project Media">`;
    } else {
        mediaViewer.innerHTML = `<video src="${item.url}" controls autoplay></video>`;
    }
    mediaCounter.innerText = `${currentMediaIndex + 1} / ${currentProjectMedia.length}`;
}

prevBtn.addEventListener("click", () => {
    if (currentMediaIndex > 0) {
        currentMediaIndex--;
        updateMediaDisplay();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentMediaIndex < currentProjectMedia.length - 1) {
        currentMediaIndex++;
        updateMediaDisplay();
    }
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// Switch Dark/Light Mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }    
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    renderProjects(currentPage);
});