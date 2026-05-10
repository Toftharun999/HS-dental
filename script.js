// Modal handling
const modal = document.getElementById('bookingModal');
const openBtns = document.querySelectorAll('#openBookingBtn, #heroBookingBtn');
const closeBtn = document.querySelector('.close-modal');

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Appointment form submission (demo - saves to localStorage)
const form = document.getElementById('appointmentForm');
const statusMsg = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const appointment = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        location: formData.get('location'),
        date: formData.get('date'),
        time: formData.get('time'),
        timestamp: new Date().toISOString()
    };
    // Save to localStorage (mock database for demo)
    let bookings = JSON.parse(localStorage.getItem('appointments')) || [];
    bookings.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(bookings));
    statusMsg.innerHTML = '✅ Appointment booked! We will call you shortly.';
    statusMsg.style.color = 'green';
    form.reset();
    setTimeout(() => {
        modal.style.display = 'none';
        statusMsg.innerHTML = '';
    }, 2000);
});

// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        }
    });
});
