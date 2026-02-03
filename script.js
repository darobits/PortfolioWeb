document.addEventListener("DOMContentLoaded", () => {

    // Ajusta --header-h con la altura real del header (por si cambia en mobile)
const header = document.querySelector('.navbar');
const setHeaderH = () => {
  if (!header) return;
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
};
window.addEventListener('load', setHeaderH);
window.addEventListener('resize', setHeaderH);
setHeaderH();



  // Habilita animaciones sólo si hay JS
  document.documentElement.classList.add('js');

  // utils
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Año dinámico
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =======================
  // Progress bar de scroll
  // =======================
  const progressBar = $("#progressBar");
  const onScroll = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const doc = document.documentElement;
    const docHeight = doc.scrollHeight - doc.clientHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  // =======================
  // THEME (oscuro / claro)
  // =======================
  const html = document.documentElement;
  const themeBtn = $("#themeToggle");
  const setThemeIcon = () => {
    const dark = html.getAttribute("data-theme") === "dark";
    if (themeBtn) {
      themeBtn.innerHTML = dark
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
    }
  };
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) html.setAttribute("data-theme", savedTheme);
  } catch {}
  setThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch {}
      setThemeIcon();
    });
  }

  // =======================
  // Fade-in al scroll
  // =======================
  const fadeEls = $$(".fade-in");
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold:0.15 });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // =======================
  // I18N (ES por defecto / EN al toggle)
  // =======================
  const langToggleBtn = $("#langToggle"); // <- nombre distinto

  const I18N = {
    es: {
      "nav.home": "Inicio",
      "nav.skills": "Skills",
      "nav.experience": "Experiencia",
      "nav.courses": "Cursos",
      "nav.projects": "Proyectos",
      "nav.contact": "Contacto",

      "hero.hi": 'Hola, soy <span class="accent">Darío Villar</span>',
      "hero.lead":
        "Analista de Procesos (GCBA) y Desarrollador Web Full-Stack. Optimización de procesos, análisis de datos y desarrollo de sistemas con foco en impacto real.",
      "hero.qc1": "+ Power BI",
      "hero.qc2": "+ Spring Boot",
      "hero.qc3": "+ Node.js",
      "hero.qc4": "+ SQL",
      "hero.scroll": "Deslizá",

      "skills.title": "Skills / Habilidades",

      "exp.title": "Experiencia",
      "exp.job1.title": "Implementador / Analista — GCBA",
      "exp.job1.meta": "Jun 2023 — Presente · Ministerio de Salud · Jefatura de Gabinete",
      "exp.job1.li1": "Monitoreo de agendas y KPIs (oferta/otorgamiento, sobreturnos, horas netas/semanales).",
      "exp.job1.li2": "Dashboards ejecutivos (Power BI / Looker Studio) y automatizaciones en Excel/Sheets.",
      "exp.job1.li3": "Optimización de procesos y soporte operativo a efectores.",

      "courses.title": "Certificaciones y Cursos",
      "courses.c1": "<strong>Desarrollo Web Full Stack — Node.js</strong> · GCBA · Talento Tech",
      "courses.c2": "<strong>Backend en Java — Spring Boot</strong> · GCBA · Talento Tech",
      "courses.c3": "<strong>Power BI y Visualización de Datos</strong> · ISC",
      "courses.c4": "<strong>Contabilidad y Finanzas Básicas</strong> · UTN",
      "courses.c5": "<strong>Scrum · Kanban · Office Avanzado</strong>",

      "projects.title": "Proyectos",
      "projects.p1": "E-commerce saludable. API Java Spring Boot + MySQL; frontend responsive con Bootstrap/JS.",
      "projects.p2": "Sistema .NET MVC con registro, roles, turnos, pagos y reportes.",
      "projects.p3.title": "Monitoreo de Turnos",
      "projects.p3": "Dashboards de oferta/otorgamiento, horas netas/semanales y performance por efector.",

      "contact.title": "Contacto",
      "contact.name_label": "Nombre",
      "contact.mail_label": "Email",
      "contact.msg_label": "Mensaje",
      "contact.send": "Enviar",

      "footer.copyName": "Darío Villar — Analista de Sistemas",

      "_ph.name": "Tu nombre completo",
      "_ph.email": "tu@email.com",
      "_ph.message": "Contame brevemente en qué puedo ayudar..."
    },
    en: {
      "nav.home": "Home",
      "nav.skills": "Skills",
      "nav.experience": "Experience",
      "nav.courses": "Courses",
      "nav.projects": "Projects",
      "nav.contact": "Contact",

      "hero.hi": 'Hi, I’m <span class="accent">Darío Villar</span>',
      "hero.lead":
        "Process Analyst (GCBA) and Full-Stack Web Developer. I optimize processes, analyze data and build systems with real-world impact.",
      "hero.qc1": "+ Power BI",
      "hero.qc2": "+ Spring Boot",
      "hero.qc3": "+ Node.js",
      "hero.qc4": "+ SQL",
      "hero.scroll": "Scroll",

      "skills.title": "Skills",

      "exp.title": "Experience",
      "exp.job1.title": "Implementation / Analyst — GCBA",
      "exp.job1.meta": "Jun 2023 — Present · Ministry of Health · Cabinet",
      "exp.job1.li1": "Scheduling and KPI monitoring (supply/appointments, overbooking, weekly net hours).",
      "exp.job1.li2": "Executive dashboards (Power BI / Looker Studio) and automations in Excel/Sheets.",
      "exp.job1.li3": "Process optimization and operational support for healthcare providers.",

      "courses.title": "Certifications & Courses",
      "courses.c1": "<strong>Full-Stack Web Development — Node.js</strong> · GCBA · Talento Tech",
      "courses.c2": "<strong>Java Backend — Spring Boot</strong> · GCBA · Talento Tech",
      "courses.c3": "<strong>Power BI & Data Visualization</strong> · ISC",
      "courses.c4": "<strong>Basic Accounting & Finance</strong> · UTN",
      "courses.c5": "<strong>Scrum · Kanban · Advanced Office</strong>",

      "projects.title": "Projects",
      "projects.p1": "Healthy e-commerce. Java Spring Boot API + MySQL; responsive frontend with Bootstrap/JS.",
      "projects.p2": ".NET MVC system with sign-up, roles, bookings, payments and reports.",
      "projects.p3.title": "Appointment Monitoring",
      "projects.p3": "Dashboards for supply/appointments, weekly net hours and facility performance.",

      "contact.title": "Contact",
      "contact.name_label": "Name",
      "contact.mail_label": "Email",
      "contact.msg_label": "Message",
      "contact.send": "Send",

      "footer.copyName": "Darío Villar — Systems Analyst",

      "_ph.name": "Your full name",
      "_ph.email": "you@email.com",
      "_ph.message": "Tell me briefly how I can help..."
    }
  };

  // Cache de ES original
  const ORIG_TEXTS = new Map();
  const dataNodes = $$("[data-i18n]");
  dataNodes.forEach((el) => {
    if (el.tagName === "SPAN" && el.closest("label")) {
      ORIG_TEXTS.set(el, el.textContent);
    } else {
      ORIG_TEXTS.set(el, el.innerHTML);
    }
  });
  const ph = {
    name: $("#name")?.placeholder || "",
    email: $("#email")?.placeholder || "",
    message: $("#message")?.placeholder || ""
  };

  function applyI18n(lang) {
    if (lang === "es") {
      dataNodes.forEach((el) => {
        const orig = ORIG_TEXTS.get(el);
        if (orig == null) return;
        if (el.tagName === "SPAN" && el.closest("label")) el.textContent = orig;
        else el.innerHTML = orig;
      });
      if ($("#name")) $("#name").placeholder = ph.name;
      if ($("#email")) $("#email").placeholder = ph.email;
      if ($("#message")) $("#message").placeholder = ph.message;
    } else {
      const dict = I18N.en;
      dataNodes.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (!key || dict[key] === undefined) return;
        if (el.tagName === "SPAN" && el.closest("label")) {
          el.textContent = String(dict[key]).replace(/<[^>]*>/g, "");
        } else {
          el.innerHTML = dict[key];
        }
      });
      if ($("#name")) $("#name").placeholder = I18N.en["_ph.name"];
      if ($("#email")) $("#email").placeholder = I18N.en["_ph.email"];
      if ($("#message")) $("#message").placeholder = I18N.en["_ph.message"];
    }
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es");
  }

  // ES por defecto; si hay EN guardado, aplicarlo
  let currentLang = "es";
  try {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "en") { currentLang = "en"; applyI18n("en"); }
  } catch {}

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      applyI18n(currentLang);
      try { localStorage.setItem("lang", currentLang); } catch {}
    });
  }

  // =======================
  // Toast
  // =======================
  const toast = (msg) => {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2500);
  };

  // =======================
  // EmailJS (Contact + AutoReply)
  // =======================
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const status = form.querySelector(".form-status");
      const btn = form.querySelector('button[type="submit"]');
      if (status) status.textContent = "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = currentLang === "en" ? "Sending..." : "Enviando...";
      }

      const data = Object.fromEntries(new FormData(form).entries());
      if (data.company) { // honeypot
        if (btn) {
          btn.disabled = false;
          btn.textContent = I18N[currentLang]["contact.send"];
        }
        return;
      }

      const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
      const SERVICE_ID = "service_hxpak42";
      const PUBLIC_KEY = "17i5HZl9LitZnEaxO";

      try {
        // 1) A vos (Contact Us)
        const mainPayload = {
          service_id: SERVICE_ID,
          template_id: "template_60z2orh",
          user_id: PUBLIC_KEY,
          template_params: {
            from_name: data.name,
            reply_to: data.email,
            message: data.message
          }
        };
        const sendMain = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mainPayload)
        });
        if (!sendMain.ok) throw new Error(await sendMain.text());

        // 2) Auto-reply al remitente
        const autoPayload = {
          service_id: SERVICE_ID,
          template_id: "template_9gvvp2m",
          user_id: PUBLIC_KEY,
          template_params: {
            from_name: data.name,
            reply_to: data.email,
            message: data.message
          }
        };
        const sendAuto = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(autoPayload)
        });
        if (!sendAuto.ok) throw new Error(await sendAuto.text());

        toast(currentLang === "en"
          ? "✅ Message sent. A confirmation was emailed."
          : "✅ ¡Mensaje enviado! Envié confirmación al remitente."
        );
        form.reset();
        if (status) status.textContent = "";
      } catch (err) {
        console.error("EmailJS error:", err);
        if (status) {
          status.textContent = currentLang === "en"
            ? "We couldn’t send your message. Please try again."
            : "No se pudo enviar. Probá nuevamente.";
        }
        toast(currentLang === "en" ? "⚠️ Send failed." : "⚠️ No se pudo enviar.");
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = I18N[currentLang]["contact.send"];
        }
      }
    });
  }
});

// Scroll-hint: ocultar cuando salgo del hero
const hint = document.querySelector('.scroll-hint');
const hero = document.getElementById('inicio');
if (hint && hero) {
  const toggleHint = () => {
    const bottom = hero.getBoundingClientRect().bottom;
    // si el borde inferior del hero ya subió, oculto el hint
    if (bottom <= 10) hint.classList.add('hide');
    else hint.classList.remove('hide');
  };
  document.addEventListener('scroll', toggleHint, { passive: true });
  toggleHint();
}

// === BOTÓN VOLVER ARRIBA ===
const backBtn = document.getElementById("backToTop");
if (backBtn) {
  // mostrar/ocultar al hacer scroll
  const toggleBackBtn = () => {
    if (window.scrollY > 250) backBtn.classList.add("show");
    else backBtn.classList.remove("show");
  };
  document.addEventListener("scroll", toggleBackBtn, { passive: true });
  toggleBackBtn();

  // scroll suave hacia arriba
  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
