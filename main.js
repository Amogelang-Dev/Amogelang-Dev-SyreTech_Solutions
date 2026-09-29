import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const projectsContainer = document.getElementById('projects-list');

// Fallback seed projects if Firestore database is newly created
const defaultProjects = [
  {
    title: "Pennywise Financial Tracker",
    category: "Mobile App",
    tech: ["Kotlin", "SQLite", "Firebase", "MPAndroidChart"],
    description: "Personal finance and budgeting Android application with offline caching and visual spending analytics."
  },
  {
    title: "Chabis Hotness E-Commerce",
    category: "Web Application",
    tech: ["PHP", "MySQL", "HTML5", "CSS3"],
    description: "Custom web platform and order portal for gourmet hot sauce products."
  },
  {
    title: "FamSync",
    category: "Mobile App",
    tech: ["Kotlin", "Android Studio", "Firebase"],
    description: "Family communication and task synchronization platform."
  },
  {
    title: "Contract Claims Automation",
    category: "Web Application",
    tech: ["C#", "ASP.NET Core MVC", "SQL Server"],
    description: "Academic contract monthly claim tracking and automated review system."
  }
];

async function loadProjects() {
  if (!projectsContainer) return;

  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    let html = '';

    if (querySnapshot.empty) {
      // Display default portfolio items
      defaultProjects.forEach(project => {
        html += renderCard(project);
      });
    } else {
      querySnapshot.forEach((doc) => {
        const project = doc.data();
        html += renderCard(project);
      });
    }

    projectsContainer.innerHTML = html;
  } catch (error) {
    console.error("Firestore fetch error, displaying fallback items:", error);
    let html = '';
    defaultProjects.forEach(project => {
      html += renderCard(project);
    });
    projectsContainer.innerHTML = html;
  }
}

function renderCard(project) {
  const techArray = Array.isArray(project.tech) 
    ? project.tech 
    : (project.tech ? project.tech.split(',') : []);

  const tags = techArray.map(t => `<span class="tag">${t.trim()}</span>`).join('');

  return `
    <div class="card">
      <span style="font-size:0.75rem; color:var(--accent-purple); font-weight:bold; text-transform:uppercase;">${project.category || 'Software Project'}</span>
      <h3 style="margin-top:0.3rem;">${project.title}</h3>
      <p>${project.description}</p>
      <div class="tag-list">
        ${tags}
      </div>
    </div>
  `;
}

loadProjects();