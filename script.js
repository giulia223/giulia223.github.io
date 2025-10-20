document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || 'N/A';
      const email = fd.get('email') || 'N/A';
      const msg = fd.get('message') || '';
      const subject = encodeURIComponent('Mesaj de la ' + name);
      const body = encodeURIComponent(`Nume: ${name}\nEmail: ${email}\n\n${msg}`);
      const mailto = `mailto:YOUR_EMAIL_HERE?subject=${subject}&body=${body}`;
      if (formMsg) formMsg.textContent = 'Se deschide aplicația de email...';
      window.location.href = mailto;
      setTimeout(() => {
        if (formMsg) formMsg.textContent = 'Dacă nu s-a deschis clientul de email, folosește butonul „Trimite email”.';
      }, 1200);
    });
  }
});
