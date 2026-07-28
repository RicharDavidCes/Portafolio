// Data Local de Proyectos
const projectsData = [
    {
        id: 1,
        title: "Recopilado de Información UCV",
        url: "Vistas/recopilado-ucv.html",
        description: "Plataforma web interactiva para buscar material de estudio por semestres académicos y materias.",
        media: [
            { type: "image", url: "Imagenes/recopilado1.png" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },
    {
        id: 2,
        title: "Cafetín Central",
        url: "Vista/cafetin-central.html",
        description: "Aplicación web completa para la gestión de menú digital, caja registradora y panel administrativo.",
        media: [
            { type: "image", url: "assets/img/cafetin-1.png" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        id: 3,
        title: "MascaTinder",
        url: "Vista/mascatinder.html",
        description: "Plataforma de conexión social orientada a mascotas con interfaz en modo oscuro interactiva.",
        media: [
            { type: "image", url: "assets/img/mascatinder-1.png" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },    
    {
        id: 4,
        title: "Campus Virtual - Dashboard Administrativo",
        url: "Vista/campus-virtual.html",
        description: "Módulo de administración CRUD con filtros dinámicos en tiempo real y tablas optimizadas.",
        media: [
            { type: "image", url: "assets/img/admin-system.png" }
        ],
        technologies: ["PHP", "MVC", "JavaScript", "HTML5", "CSS3", "MySQL", "MySQLi", "PhpMyAdmin", "Ajax", "jQuery", "XAMPP"]
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

        // Redirección directa a la vista HTML correspondiente
        card.addEventListener("click", () => {
            window.location.href = project.url;
        });

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