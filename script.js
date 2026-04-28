const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    serviceCards.forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });
});

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('inquiryForm');
const msg = document.getElementById('formMsg');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 80);
});

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

function setFieldError(input, message) {
  input.classList.toggle('invalid', !!message);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');

  let hint = input.parentElement.querySelector('.field-error');
  if (message) {
    if (!hint) {
      hint = document.createElement('span');
      hint.className = 'field-error';
      input.parentElement.appendChild(hint);
    }
    hint.textContent = message;
  } else if (hint) {
    hint.remove();
  }
}

function validateField(input) {
  const value = input.value.trim();
  if (input.type === 'email') {
    if (!value) return 'E-naslov je obvezen.';
    if (!EMAIL_RE.test(value)) return 'Vnesite veljaven e-naslov.';
    return '';
  }
  if (input.hasAttribute('required')) {
    return value ? '' : 'To polje je obvezno.';
  }
  return '';
}

function clearFieldErrors() {
  form.querySelectorAll('[aria-invalid="true"]').forEach(el => {
    el.classList.remove('invalid');
    el.setAttribute('aria-invalid', 'false');
  });
  form.querySelectorAll('.field-error').forEach(el => el.remove());
}

function setFormMessage(text, type = '') {
  msg.textContent = text;
  msg.className = `form-msg${type ? ` form-msg--${type}` : ''}`;
}

form?.querySelectorAll('input[required], textarea[required]').forEach(input => {
  input.addEventListener('blur', () => {
    setFieldError(input, validateField(input));
  });

  input.addEventListener('input', () => {
    if (input.classList.contains('invalid') && !validateField(input)) {
      setFieldError(input, '');
    }
  });
});

form?.addEventListener('submit', async function (e) {
  e.preventDefault();
  setFormMessage('');
  clearFieldErrors();

  // honeypot for bots
  if (form.elements['_trap']?.value) return;

  const emailInput = form.elements['email'];
  const titleInput = form.elements['title'];
  const descInput = form.elements['description'];

  let hasError = false;
  [emailInput, titleInput, descInput].forEach(input => {
    const error = validateField(input);
    if (error) { setFieldError(input, error); hasError = true; }
  });

  if (hasError) {
    form.querySelector('.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Pošiljanje...';

  try {
    const response = await fetch('https://arbopro-contact-form.andraz-furlan.workers.dev', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        phone: form.elements['phone'].value.trim(),
        subject: titleInput.value.trim(),
        description: descInput.value.trim(),
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Napaka pri pošiljanju.');
    }

    form.reset();
    clearFieldErrors();
    setFormMessage('Vaše povpraševanje je bilo uspešno poslano!', 'ok');
  } catch (err) {
    console.error('Inquiry send failed:', err);
    setFormMessage(err.message || 'Napaka pri pošiljanju. Prosimo, poskusite znova.', 'err');
  } finally {
    button.disabled = false;
    button.textContent = 'Pošlji povpraševanje';
  }
});
