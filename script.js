document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.rel = "noopener noreferrer";
  link.target = "_blank";
});
