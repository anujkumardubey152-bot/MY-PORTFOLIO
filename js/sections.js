
/* =========================================
   PORTFOLIO SECTIONS
   Reads content from data.js
========================================= */

// ABOUT SECTION
function renderAbout() {
  const container = document.getElementById("about-content");

  container.innerHTML = `
    <div class="about-layout">
      <div>
        <h2 class="about-heading">
          Turning <span>data</span><br>
          into intelligence.
        </h2>

        <p class="about-description">
          ${portfolioData.about}
        </p>
      </div>

      <div class="about-details">
        <div class="detail-item">
          <span class="detail-label">NAME</span>
          <span class="detail-value">${portfolioData.name}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">EDUCATION</span>
          <span class="detail-value">
            ${portfolioData.education.degree}
          </span>
        </div>

        <div class="detail-item">
          <span class="detail-label">INSTITUTE</span>
          <span class="detail-value">
            ${portfolioData.education.college}
          </span>
        </div>

        <div class="detail-item">
          <span class="detail-label">LOCATION</span>
          <span class="detail-value">
            ${portfolioData.location}
          </span>
        </div>

        <div class="detail-item">
          <span class="detail-label">CGPA</span>
          <span class="detail-value">
            ${portfolioData.education.cgpa}
          </span>
        </div>
      </div>
    </div>
  `;
}


// EXPERIENCE SECTION
function renderExperience() {
  const container = document.getElementById("experience-content");

  container.innerHTML = `
    <div class="timeline">
      ${portfolioData.experience.map((item) => `
        <article class="timeline-item">
          <div class="timeline-date">${item.duration}</div>
          <h3>${item.role}</h3>
          <div class="timeline-company">${item.organization}</div>
          <p>${item.description}</p>
        </article>
      `).join("")}
    </div>
  `;
}


// PROJECTS SECTION

function renderProjects() {
  const container = document.getElementById("projects-content");

  container.innerHTML = `
    <div class="projects-grid">
      ${portfolioData.projects.map((project, index) => `
        <a
          href="${project.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card project-link"
          aria-label="Open ${project.name} live demo"
        >
          <span class="project-number">
            0${index + 1} /
          </span>

          <div class="project-category">
            ${project.category}
          </div>

          <h3>${project.name}</h3>

          <p>${project.description}</p>

          <div class="project-tech">
            ${project.technologies.map((tech) => `
              <span>${tech}</span>
            `).join("")}
          </div>

          <div class="project-open">
            EXPLORE LIVE PROJECT <span>↗</span>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}



// SKILLS SECTION
function renderSkills() {
  const container = document.getElementById("skills-content");

  const skillCategories = {
    "Programming": portfolioData.skills.programming,
    "AI & Machine Learning": portfolioData.skills.aiMl,
    "Generative AI": portfolioData.skills.generativeAi,
    "Data Science": portfolioData.skills.data,
    "Backend Development": portfolioData.skills.backend,
    "Tools & Fundamentals": [
      ...portfolioData.skills.tools,
      ...portfolioData.skills.fundamentals
    ]
  };

  container.innerHTML = `
    <div class="skills-grid">
      ${Object.entries(skillCategories).map(([category, skills]) => `
        <article class="skill-group">
          <h3>${category}</h3>

          <div class="skill-tags">
            ${skills.map((skill) => `
              <span class="skill-tag">${skill}</span>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}


// CERTIFICATIONS SECTION
function renderCertifications() {
  const container = document.getElementById("certifications-content");

  container.innerHTML = `
    <div class="certification-list">
      ${portfolioData.certifications.map((certification, index) => `
        <div class="certification-item">
          <span class="project-number">0${index + 1} / </span>
          ${certification}
        </div>
      `).join("")}
    </div>
  `;
}

// ASK ANUJ SECTION

function renderAssistant() {
  const container = document.getElementById("assistant-content");

  container.innerHTML = `
    <div class="assistant-panel">
      <div class="project-category">
        AI-POWERED PORTFOLIO ASSISTANT
      </div>

      <h3>Curious about my work?</h3>

      <p>
        Meet ASK ANUJ — ask me about my skills,
        projects, education and experience.
      </p>

      <div class="assistant-status">
        <span class="status-dot"></span>
        GEMINI AI — ONLINE
      </div>

      <div class="assistant-input-area">
        <input
          id="ask-anuj-input"
          type="text"
          placeholder="Ask me anything about my work..."
          maxlength="1000"
        />

        <button id="ask-anuj-button" type="button">
          ASK ↗
        </button>
      </div>

      <div
        id="ask-anuj-response"
        class="assistant-response"
        aria-live="polite"
      ></div>

      <p class="assistant-note">
        Powered by Google Gemini AI.
      </p>
    </div>
  `;

  const input = document.getElementById("ask-anuj-input");
  const button = document.getElementById("ask-anuj-button");
  const output = document.getElementById("ask-anuj-response");

  async function sendMessage() {
    const message = input.value.trim();

    if (!message) {
      output.textContent = "Please enter a question.";
      return;
    }

    input.disabled = true;
    button.disabled = true;
    button.textContent = "THINKING...";
    output.textContent = "Anuj's AI assistant is thinking...";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      output.textContent = data.answer;

    } catch (error) {
      output.textContent = error.message ||
        "Unable to connect. Please try again.";
    } finally {
      input.disabled = false;
      button.disabled = false;
      button.textContent = "ASK ↗";
      input.focus();
    }
  }

  button.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}


// RENDER ALL SECTIONS
function renderPortfolioSections() {renderAssistant();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderCertifications();
}

renderPortfolioSections();
