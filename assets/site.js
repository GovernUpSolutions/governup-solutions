document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.click(); toggle.focus();
  }
});
const form = document.querySelector('#gu-contact-form');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  button.disabled = true;
  status.textContent = 'Sending your inquiry…';
  try {
    const response = await fetch('/api/contact', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...Object.fromEntries(new FormData(form)), source: 'governupsolutions.com/corporate'})
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error('Delivery failed');
    status.textContent = 'Your inquiry has been sent. Thank you for contacting GovernUp.';
    form.reset();
  } catch {
    status.textContent = 'Your inquiry could not be sent. Please try again or email hello@governupsolutions.com. Your message remains in the form.';
  } finally { button.disabled = false; }
});
// Keep incoming links from the previous single-page website useful.
if (location.pathname === '/' && location.hash === '#contact') location.replace('/contact');
