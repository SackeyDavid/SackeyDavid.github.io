document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.rel = "noopener noreferrer";
  link.target = "_blank";
});

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// Handle contact form submit — opens mailto with pre-filled fields
function handleContactForm(event) {
  event.preventDefault();
  const name    = document.getElementById('contact-name')?.value.trim() || '';
  const email   = document.getElementById('contact-email')?.value.trim() || '';
  const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Enquiry';
  const message = document.getElementById('contact-message')?.value.trim() || '';
  const body    = `From: ${name} <${email}>\n\n${message}`;
  window.location.href = `mailto:kofiahendev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

