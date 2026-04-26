const yearEl = document.querySelector("#currentYear");
const emailBtn = document.querySelector("#copyEmailBtn");
const hamburgerCopyBtn = document.querySelector("#hamburgerCopyEmailBtn");
const hamburger = document.getElementById('hamburger');
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const closeHamburger = document.getElementById('closeHamburger');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (emailBtn) {
  emailBtn.addEventListener("click", () => {
    const email = "mushtaq93808@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      emailBtn.textContent = "Copied!";
      setTimeout(() => {
        emailBtn.textContent = "Copy email";
      }, 1500);
    });
  });
}

if (hamburgerCopyBtn) {
  hamburgerCopyBtn.addEventListener("click", () => {
    const email = "mushtaq93808@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      hamburgerCopyBtn.textContent = "Copied!";
      setTimeout(() => {
        hamburgerCopyBtn.textContent = "Copy email";
      }, 1500);
    });
  });
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (window.innerWidth > 640) {
      hamburgerMenu.classList.toggle('active');
    } else {
      navLinks.classList.toggle('active');
    }
  });
}

if (closeHamburger) {
  closeHamburger.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
  });
}

// Active nav link on scroll
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Special handling for project.html
  if (window.location.pathname.includes('project.html')) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'project.html') {
        link.classList.add('active');
      }
    });
    return;
  }

  // Special handling for contact.html
  if (window.location.pathname.includes('contact.html')) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'index.html#contact') {
        link.classList.add('active');
      }
    });
    return;
  }

  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    const hash = href.includes('#') ? href.split('#')[1] : '';
    
    if (hash === currentSectionId) {
      link.classList.add('active');
    }
  });
}

// Set active nav link when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Update active nav link on scroll
window.addEventListener('scroll', setActiveNavLink);

// Update active nav link when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    const href = this.getAttribute('href');
    const targetSection = document.querySelector(href);
    
    if (targetSection) {
      setTimeout(setActiveNavLink, 10);
    }
  });
});

// Skills Tabs Functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      let activeContent = document.getElementById(tabName);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Set first tab as active on page load
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add('active');
    if (tabContents.length > 0) {
      tabContents[0].classList.add('active');
    }
  }
}

// Progress Bar Animation
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  let animated = false;

  function animateProgressBars() {
    if (animated) return;
    
    const aboutSection = document.getElementById('about');
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if about section is in viewport
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
      progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target') + '%';
        bar.style.width = targetWidth;
        bar.classList.add('animated');
      });
      animated = true;
    }
  }

  // Check on scroll and initial load
  window.addEventListener('scroll', animateProgressBars);
  animateProgressBars(); // Check on page load
}

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.fullName || !data.email || !data.message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual API call)
    showFormMessage('Sending message...', '');
    
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, always show success
      // In real implementation, handle actual form submission
      showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon! 🎉', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 2000);
  });
  
  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Section Scroll Animations
function initSectionAnimations() {
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
    // Check if already in view on load
    if (isElementInViewport(section)) {
      section.classList.add('animate');
    }
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initProgressBars();
  initContactForm();
  initSectionAnimations();
});
