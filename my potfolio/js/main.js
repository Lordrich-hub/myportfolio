// Main JavaScript for Lord's Jackrich Portfolio Website

// DOM Elements
const loader = document.querySelector('.loading-screen');
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollDown = document.querySelector('.scroll-down');
const sections = document.querySelectorAll('section');
const backToTop = document.querySelector('.back-to-top');
const skillBars = document.querySelectorAll('.skill-percent');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const contactForm = document.querySelector('.contact-form');

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Start the animation of skill bars when page loads
    animateSkillBars();
    // Initialize the typing effect
    initTypingEffect();
    // Initialize particles
    initParticles();
  }, 1500);
});

// Sticky Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Show/hide back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Animate skill bars when in viewport
  if (isInViewport(document.querySelector('.skill-bars'))) {
    animateSkillBars();
  }

  // Active section in navigation
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Back to top button
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Typing effect
function initTypingEffect() {
  const typedElement = document.querySelector('.typed-text');
  if (!typedElement) return;

  const phrases = ["Software Developer", "UI/UX Designer", "Web Developer", "Tech Enthusiast"];
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const current = phrases[currentPhrase];
    
    if (isDeleting) {
      // Remove characters
      typedElement.textContent = current.substring(0, currentChar - 1);
      currentChar--;
      typeSpeed = 50;
    } else {
      // Add characters
      typedElement.textContent = current.substring(0, currentChar + 1);
      currentChar++;
      typeSpeed = 100;
    }

    // If finished typing
    if (!isDeleting && currentChar === current.length) {
      isDeleting = true;
      typeSpeed = 1000; // Pause at end of phrase
    } 
    // If finished deleting
    else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing
  type();
}

// Animate skill bars
function animateSkillBars() {
  skillBars.forEach(skill => {
    const targetWidth = skill.getAttribute('data-width');
    skill.style.width = targetWidth;
  });
}

// Portfolio filter
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Add fade-out effect for smooth transition
    portfolioItems.forEach(item => {
      item.classList.add('fade-out');
    });
    
    setTimeout(() => {
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.classList.remove('fade-out');
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    }, 300);
  });
});

// Testimonial slider
let currentSlide = 0;

function showSlide(index) {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  currentSlide = index;
}

if (prevButton && nextButton) {
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  });
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Initialize first slide
if (testimonialSlides.length > 0) {
  showSlide(0);
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('[name="name"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const message = this.querySelector('[name="message"]').value.trim();
    
    // Simple form validation
    if (name === '' || email === '' || message === '') {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      alert('Message sent successfully!');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      this.reset();
    }, 2000);
  });
}

// Check if element is in viewport
function isInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Initialize particles for the hero section
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles', 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/demo/particles.json', function() {
      console.log('particles.js loaded - fallback to predefined settings');
    });
    
    // Fallback configuration
    particlesJS('particles', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#00e5ff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 4,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#00e5ff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// 3D hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const midCardWidth = rect.width / 2;
    const midCardHeight = rect.height / 2;
    
    const angleY = -(x - midCardWidth) * 0.01;
    const angleX = (y - midCardHeight) * 0.01;
    
    this.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
    this.style.transition = 'transform 0.5s ease';
  });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterSuccess = document.querySelector('.newsletter-success');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('.newsletter-input').value.trim();
    
    if (email === '') {
      alert('Please enter your email address');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.btn-newsletter');
    submitButton.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      newsletterSuccess.style.display = 'block';
      submitButton.disabled = false;
      this.reset();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        newsletterSuccess.style.display = 'none';
      }, 3000);
    }, 1500);
  });
}