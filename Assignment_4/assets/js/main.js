// Advanced JavaScript for Saturnalia'25
document.addEventListener('DOMContentLoaded', function () {
  // Update year in footer
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Active nav link highlighter
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith(path)) {
      a.classList.add('active');
    }
  });

  // Video player functionality
  const video = document.getElementById('eventVideo');
  const playButton = document.querySelector('.play-button');
  
  if (video && playButton) {
    playButton.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playButton.style.display = 'none';
      } else {
        video.pause();
        playButton.style.display = 'flex';
      }
    });

    video.addEventListener('play', function() {
      playButton.style.display = 'none';
    });

    video.addEventListener('pause', function() {
      playButton.style.display = 'flex';
    });
  }

  // Gallery filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .tile');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter gallery items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe cards and sections for animation
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });

  // Form validation and enhancement
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Add floating label effect
      if (input.type !== 'submit' && input.type !== 'button') {
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          if (!this.value) {
            this.parentElement.classList.remove('focused');
          }
        });
      }
    });

    // Form submission handling
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--danger)';
          field.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
        } else {
          field.style.borderColor = 'var(--border-medium)';
          field.style.boxShadow = 'none';
        }
      });

      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <div style="background: rgba(0, 230, 118, 0.1); border: 1px solid var(--success); color: var(--success); padding: 1rem; border-radius: var(--radius); margin-top: 1rem; text-align: center;">
            ✅ Form submitted successfully!
          </div>
        `;
        form.appendChild(successMessage);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          successMessage.remove();
        }, 3000);
      }
    });
  });

  // Audio player enhancement
  const audioPlayer = document.getElementById('welcomeAudio');
  if (audioPlayer) {
    audioPlayer.addEventListener('play', function() {
      console.log('Welcome message started playing');
    });
    
    audioPlayer.addEventListener('ended', function() {
      console.log('Welcome message finished playing');
    });
  }

  // Mobile menu toggle (for future enhancement)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      // Handle scroll-based animations or effects
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    }, 10);
  });

  console.log('Saturnalia\'25 website loaded successfully! 🚀');
});

// Utility functions
function playVideo() {
  const video = document.getElementById('eventVideo');
  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-grid .tile');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  
  // Filter items
  items.forEach(item => {
    const itemCategory = item.dataset.category;
    const shouldShow = category === 'all' || itemCategory === category;
    item.style.display = shouldShow ? 'block' : 'none';
  });
}


