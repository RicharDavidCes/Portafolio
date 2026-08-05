// Data Local de Proyectos
const projectsData = [
    {
        id: 1,
        title: "Recopilado de Información UCV",
        url: "Vistas/recopilado-ucv.html",
        description: "Plataforma web interactiva para buscar material de estudio por semestres académicos y materias.",
        media: [
            { type: "image", url: "Imagenes/recopilado1.webp" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },
    {
        id: 2,
        title: "Campus Virtual - Dashboard Administrativo",
        url: "Vistas/campus-virtual.html",
        description: "Módulo de administración CRUD con filtros dinámicos en tiempo real. Para manejo academico a nivel secundario",
        media: [
            { type: "image", url: "Imagenes/campus-virtual1.webp" }
        ],
        technologies: ["PHP", "MVC", "JavaScript", "HTML5", "CSS3", "MySQL", "MySQLi", "PhpMyAdmin", "Ajax", "jQuery", "XAMPP"]
    },
    {
        id: 3,
        title: "Cafetín Central",
        url: "Vistas/cafetin-central.html",
        description: "Aplicación web completa para la gestión de menú digital, caja registradora y panel administrativo.",
        media: [
            { type: "image", url: "Imagenes/cafetin1.webp" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        id: 4,
        title: "MascaTinder",
        url: "Vistas/mascatinder.html",
        description: "Plataforma de conexión social orientada a un canal de Whatsapp de estudiantes de la UCV.",
        media: [
            { type: "image", url: "Imagenes/mascatinder1.webp" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
    },
    {
        id: 5,
        title: "Portafolio DevOdoru",
        url: "Vistas/Portafolio-DevOdoru.html",
        description: "plataforma web desarrollada a la medida para exhibir proyectos de desarrollo de videojuegos independientes.",
        media: [
            { type: "image", url: "Imagenes/devodoru1.webp" }
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
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