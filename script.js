/*
=================================================================
Portfolio Website - Main JavaScript
=================================================================
*/

// ===== DOM Elements =====
const preloader = document.querySelector('.preloader');
const cursorFollower = document.querySelector('.cursor-follower');
const header = document.querySelector('header');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-pane');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const backToTopButton = document.getElementById('back-to-top');
const themeSwitcher = document.querySelector('.theme-switcher');
const progressBars = document.querySelectorAll('.progress-bar');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contact-form');
const typewriterElement = document.getElementById('typewriter');

// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                animateOnLoad();
            }, 500);
        } else {
            animateOnLoad(); // fallback
        }
    }, 1500);
});

// ===== Cursor Follower =====
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Add a slight delay for smoother effect
    setTimeout(() => {
        cursorFollower.style.left = `${clientX}px`;
        cursorFollower.style.top = `${clientY}px`;
    }, 80);
});

document.addEventListener('mousedown', () => {
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.background = 'rgba(245, 0, 87, 0.2)';
});

document.addEventListener('mouseup', () => {
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.background = 'rgba(108, 99, 255, 0.2)';
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon, .social-link');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '5rem';
        cursorFollower.style.height = '5rem';
        cursorFollower.style.background = 'rgba(245, 0, 87, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '3rem';
        cursorFollower.style.height = '3rem';
        cursorFollower.style.background = 'rgba(108, 99, 255, 0.2)';
    });
});

// ===== Sticky Header =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to Top Button Visibility
    if (window.scrollY > 500) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
    
    // Check which section is in view for active nav links
    updateActiveNavLink();
    
    // Animate elements when scrolled into view
    animateOnScroll();
});

// ===== Mobile Menu Toggle =====
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.toggle('active');
    });
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Reset hamburger bars
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        }
    });
});

// ===== Smooth Scrolling for Navigation Links =====
document.getElementById('scroll-down').addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const offset = header.offsetHeight;
        const top = aboutSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }
});

// ===== Update Active Navigation Link =====
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - header.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Back to Top Button =====
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Theme Switcher =====
themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.documentElement.setAttribute(
        'data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    
    // Toggle theme icon
    const icon = themeSwitcher.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Store theme preference in local storage
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    
    // Set the correct icon
    const icon = themeSwitcher.querySelector('i');
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ===== Skills Tab Functionality =====
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        targetContent.classList.add('active');
        
        // Animate progress bars in active tab
        if (targetContent.classList.contains('active')) {
            const progressBars = targetContent.querySelectorAll('.progress-bar');
            animateProgressBars(progressBars);
        }
    });
});

// ===== Project Filtering =====
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Contact Form Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For this example, we'll just show a success message
        
        // Create a success notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>Thanks for your message, ${name}! I'll get back to you soon.</p>
            </div>
        `;
        
        // Add notification to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('active');
        }, 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Typewriter Effect =====
function typewriterEffect() {
    const textArray = [
     "Java Developer",
    "Spring Boot Specialist",
    "ReactJS Enthusiast",
    "Problem Solver",
    "Web Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Add a character
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // If word is complete, start deleting after a pause
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        } 
        // If deletion is complete, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type(); // Start the typing effect
}

// ===== Animate Progress Bars =====
function animateProgressBars(bars) {
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-percent');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 200);
    });
}

// ===== Animate Elements on Load =====
function animateOnLoad() {
    // Hero section animations
    document.querySelector('.text-content').classList.add('animated');
    document.querySelector('.hero-image').classList.add('animated');
    
    // Animate initial progress bars if they're visible
    const activeTab = document.querySelector('.tab-pane.active');
    if (activeTab) {
        const visibleBars = activeTab.querySelectorAll('.progress-bar');
        animateProgressBars(visibleBars);
    }
}

// ===== Animate Elements on Scroll =====
function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animated');
            
            // Animate progress bars in skills section when scrolled into view
            if (section.id === 'skills') {
                const activeTab = document.querySelector('.tab-pane.active');
                if (activeTab) {
                    const visibleBars = activeTab.querySelectorAll('.progress-bar');
                    animateProgressBars(visibleBars);
                }
            }
        }
    });
}

// ===== Add notification css styles =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        background-color: var(--card-bg);
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: var(--box-shadow);
        transform: translateY(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .notification.active {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    
    .notification-content i {
        font-size: 2.4rem;
        color: #4CAF50;
    }
    
    .notification-content p {
        font-size: 1.6rem;
        color: var(--text-color);
    }
    
    /* Mobile Menu Styles */
    @media screen and (max-width: 768px) {
        .hamburger-menu {
            display: flex;
        }
        
        .hamburger-menu.active .bar:nth-child(1) {
            transform: translateY(10px) rotate(45deg);
        }
        
        .hamburger-menu.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-menu.active .bar:nth-child(3) {
            transform: translateY(-10px) rotate(-45deg);
        }
        
        .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background-color: var(--card-bg);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: 0.5s ease;
            z-index: 5;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-links li {
            margin: 2rem 0;
        }
    }
    
    /* Animations for sections */
    .text-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease;
    }
    
    .text-content.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-image {
        opacity: 0;
        transform: translateX(30px);
        transition: all 1s ease 0.3s;
    }
    
    .hero-image.animated {
        opacity: 1;
        transform: translateX(0);
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease;
    }
    
    section.animated {
        opacity: 1;
        transform: translateY(0);
    }
    .hero-content .text-content,
.hero-content .hero-image {
    opacity: 1 !important;
    transform: none !important;
}
`;
document.head.appendChild(notificationStyles);

// ===== Initialize Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typewriter effect
    typewriterEffect();
    
    // Initial active link update
    updateActiveNavLink();
    
    // Apply animations to hero section
    document.querySelector('.text-content').style.opacity = '0';
    document.querySelector('.hero-image').style.opacity = '0';
});

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(tab => tab.classList.remove('active'));

      button.classList.add('active');
      const target = document.getElementById(button.dataset.target);
      target.classList.add('active');

      const bars = target.querySelectorAll('.progress-bar');
      animateBars(bars);
    });
  });

  // Initial load
  const activePane = document.querySelector('.tab-pane.active');
  const initialBars = activePane.querySelectorAll('.progress-bar');
  animateBars(initialBars);

  function animateBars(bars) {
    bars.forEach(bar => {
      const percent = bar.dataset.percent;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = percent;
      }, 100);
    });
  }
});