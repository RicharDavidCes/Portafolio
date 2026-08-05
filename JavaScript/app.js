// app.js

// Data Local de Proyectos
const projectsData = [
  {
    id: 1,
    key: "p1",
    url: "Vistas/recopilado-ucv.html",
    media: [{ type: "image", url: "Imagenes/recopilado1.webp" }],
    technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
  },
  {
    id: 2,
    key: "p2",
    url: "Vistas/campus-virtual.html",
    media: [{ type: "image", url: "Imagenes/campus-virtual1.webp" }],
    technologies: ["PHP", "MVC", "JavaScript", "HTML5", "CSS3", "MySQL", "MySQLi", "PhpMyAdmin", "Ajax", "jQuery", "XAMPP"]
  },
  {
    id: 3,
    key: "p3",
    url: "Vistas/cafetin-central.html",
    media: [{ type: "image", url: "Imagenes/cafetin1.webp" }],
    technologies: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    id: 4,
    key: "p4",
    url: "Vistas/mascatinder.html",
    media: [{ type: "image", url: "Imagenes/mascatinder1.webp" }],
    technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
  },
  {
    id: 5,
    key: "p5",
    url: "Vistas/Portafolio-DevOdoru.html",
    media: [{ type: "image", url: "Imagenes/devodoru1.webp" }],
    technologies: ["HTML5", "CSS3", "JavaScript", "Supabase"]
  }
];

// Configuración de Paginación
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Referencias al DOM (pueden ser null en subpáginas)
const projectsContainer = document.getElementById("projects-container");
const paginationContainer = document.getElementById("pagination-container");

// Renderizar Proyectos según la página actual e idioma
function renderProjects(page) {
  if (!projectsContainer) return;
  
  projectsContainer.innerHTML = "";
  
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  currentProjects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    
    const title = i18next.t(`projects_data.${project.key}.title`);
    const description = i18next.t(`projects_data.${project.key}.description`);

    const firstMedia = project.media[0];
    const mediaHtml = firstMedia.type === "image" 
      ? `<img src="${firstMedia.url}" alt="${title}" class="project-thumb">`
      : `<video src="${firstMedia.url}" class="project-thumb" muted></video>`;

    card.innerHTML = `
      ${mediaHtml}
      <div class="project-info">
        <h3>${title}</h3>
        <p>${description.substring(0, 80)}...</p>
        <div>
          ${project.technologies.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = project.url;
    });

    projectsContainer.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  if (!paginationContainer) return;
  
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

// Función global para actualizar elementos con [data-i18n]
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');

    if (key.startsWith('[html]')) {
      const actualKey = key.replace('[html]', '');
      element.innerHTML = i18next.t(actualKey);
    } else {
      element.innerHTML = i18next.t(key); // Usar innerHTML por si trae etiquetas en el JSON
    }
  });

  document.documentElement.lang = i18next.language ? i18next.language.slice(0, 2) : 'es';
}

function updateLanguageButton() {
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    const currentLang = i18next.language ? i18next.language.slice(0, 2) : 'es';
    langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
  }
}

// Inicialización de i18next
document.addEventListener('DOMContentLoaded', () => {
  // Ajustar la ruta relativa según el nivel del HTML actual
  const isSubfolder = window.location.pathname.includes('/Vistas/');
  const localesPath = isSubfolder 
    ? '../locales/{{lng}}/translation.json' 
    : './locales/{{lng}}/translation.json';

  i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      fallbackLng: 'es',
      supportedLngs: ['es', 'en'],
      backend: {
        loadPath: localesPath
      },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage', 'cookie'],
        lookupLocalStorage: 'i18nextLng' // Clave uniforme en localStorage
      }
    }, function(err, t) {
      if (err) return console.error('Error inicializando i18n:', err);
      
      updateContent();
      renderProjects(currentPage);
      updateLanguageButton();
    });

  const langBtn = document.getElementById('language-switcher');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const currentLang = i18next.language ? i18next.language.slice(0, 2) : 'es';
      const nextLang = currentLang === 'es' ? 'en' : 'es';

      i18next.changeLanguage(nextLang, () => {
        updateContent();
        renderProjects(currentPage);
        updateLanguageButton();
      });
    });
  }
});