document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // try to read a mailto: link from the contact section (if present)
  const mailtoLink = document.querySelector('#contact a[href^="mailto:"]');
  const defaultEmail = mailtoLink ? mailtoLink.getAttribute('href').replace(/^mailto:/i, '').trim() : 'YOUR_EMAIL_HERE';

  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || 'N/A';
      const email = fd.get('email') || 'N/A';
      const msg = fd.get('message') || '';
      const subject = encodeURIComponent('Message from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      const mailto = `mailto:${encodeURIComponent(defaultEmail)}?subject=${subject}&body=${body}`;
      if (formMsg) formMsg.textContent = 'Opening your email client...';
      window.location.href = mailto;
      setTimeout(() => {
        if (formMsg) formMsg.textContent = 'If your email client did not open, use the "Send email" button.';
      }, 1200);
    });
  }
});
