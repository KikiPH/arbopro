const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.getElementById('inquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = this.email.value.trim();
  const title = this.title.value.trim();
  const desc  = this.description.value.trim();
  if (!email || !title || !desc) return;

  const body = `Povpraševanje od: ${email}\n\n${desc}`;
  window.location.href =
    `mailto:info@arbopro.si` +
    `?subject=${encodeURIComponent(title)}` +
    `&body=${encodeURIComponent(body)}`;
});
