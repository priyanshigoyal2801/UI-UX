document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Booking form helpers
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const startDate = bookingForm.querySelector('#start-date');
    const endDate = bookingForm.querySelector('#end-date');
    const today = new Date();
    const isoToday = today.toISOString().split('T')[0];
    if (startDate) startDate.min = isoToday;
    if (endDate) endDate.min = isoToday;

    if (startDate && endDate) {
      startDate.addEventListener('change', () => {
        endDate.min = startDate.value || isoToday;
        if (endDate.value && endDate.value < endDate.min) {
          endDate.value = endDate.min;
        }
      });
    }

    bookingForm.addEventListener('submit', (e) => {
      // rudimentary validation
      const required = bookingForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach((el) => {
        if (!el.value) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        alert('Please fill all required fields.');
      } else {
        alert('Thank you! Your booking request has been submitted.');
      }
    });
  }
});


