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

  // PDF viewer controls (works for same-origin PDF file embedded in iframe)
  const cvFrame = document.getElementById('cvFrame');
  const zoomIn = document.getElementById('pdfZoomIn');
  const zoomOut = document.getElementById('pdfZoomOut');
  const zoomReset = document.getElementById('pdfZoomReset');
  const fitBtn = document.getElementById('pdfFit');

  if (cvFrame && zoomIn && zoomOut && zoomReset && fitBtn) {
    let scale = 1;
    const min = 0.5, max = 3, step = 0.1;
    const container = cvFrame.parentElement; // .pdf-container

    // apply CSS-based zoom by scaling iframe and adjusting its width so scroll works naturally
    function applyScale() {
      cvFrame.style.transformOrigin = 'top left';
      cvFrame.style.transform = `scale(${scale})`;
      // adjust iframe width so scaled content fits container width and horizontal scroll is avoided
      cvFrame.style.width = (100 / scale) + '%';
      // update label/button state
      if (zoomReset) zoomReset.textContent = Math.round(scale * 100) + '%';
      if (zoomOut) zoomOut.disabled = scale <= min;
      if (zoomIn) zoomIn.disabled = scale >= max;
    }

    zoomIn.addEventListener('click', () => {
      scale = Math.min(max, +(scale + step).toFixed(2));
      applyScale();
    });

    zoomOut.addEventListener('click', () => {
      scale = Math.max(min, +(scale - step).toFixed(2));
      applyScale();
    });

    zoomReset.addEventListener('click', () => {
      scale = 1;
      applyScale();
    });

    fitBtn.addEventListener('click', () => {
      scale = 1;
      applyScale();
      
      if (container) {
        container.scrollTop = 0;
        container.scrollLeft = 0;
      }
    });

   
    applyScale();

    
    container.addEventListener('wheel', (ev) => {
      if (ev.ctrlKey) {
        ev.preventDefault();
        if (ev.deltaY < 0) {
          scale = Math.min(max, +(scale + step).toFixed(2));
        } else {
          scale = Math.max(min, +(scale - step).toFixed(2));
        }
        applyScale();
      }
    }, { passive: false });
  }
});
