// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const enquirySelect = document.getElementById('enquiry');
    const subjectInput = document.getElementById('subject');
    
    // Hero Slideshow Functionality
    initHeroSlideshow();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Contact form event listeners
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (enquirySelect) {
        enquirySelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const subjects = {
                'general': 'General Inquiry',
                'admission': 'Admission Inquiry',
                'academic': 'Academic Information',
                'financial': 'Financial Information',
                'technical': 'Technical Support',
                'other': 'Other'
            };
            
            if (subjectInput && subjects[selectedValue]) {
                subjectInput.value = subjects[selectedValue];
            }
        });
    }
    
    // Gallery Animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add animation to program cards
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add hover effect to faculty items
    const facultyItems = document.querySelectorAll('.faculty-item');
    facultyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Mobile Menu Toggle Function
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Add click event to hamburger
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Hero Slideshow Functions
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const slideInfos = document.querySelectorAll('.slide-info-content');
    
    if (slides.length === 0) return; // Exit if no slides found
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-advance slides
    const slideInterval = setInterval(() => {
        nextSlide();
    }, 6000); // Change slide every 6 seconds
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            // Restart interval
            setTimeout(() => {
                setInterval(() => {
                    nextSlide();
                }, 6000);
            }, 6000);
        });
    });
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        slideInfos.forEach(info => info.classList.remove('active'));
        
        // Pause all videos first
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        });
        
        // Add active class to current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        slideInfos[index].classList.add('active');
        
        // Play video in active slide if it exists
        const activeSlide = slides[index];
        const activeVideo = activeSlide.querySelector('video');
        const videoHint = activeSlide.querySelector('.video-play-hint');
        
        if (activeVideo) {
            // Use setTimeout to ensure the slide is fully active
            setTimeout(() => {
                const playPromise = activeVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Video started playing successfully
                        if (videoHint) {
                            videoHint.classList.remove('show');
                        }
                    }).catch(error => {
                        console.log('Video autoplay prevented:', error);
                        // Show hint on mobile when autoplay fails
                        if (videoHint && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            videoHint.classList.add('show');
                        }
                    });
                }
            }, 100);
        }
        
        currentSlide = index;
    }
    
    // Initialize video handling
    slides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        if (video) {
            // Set video properties for better mobile support
            video.muted = true;
            video.playsInline = true;
            video.loop = true;
            
            // Pause all videos initially
            video.pause();
            
            // Add loading event listener
            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0;
            });
            
            // Handle video errors
            video.addEventListener('error', (e) => {
                console.log('Video error:', e);
            });
        }
    });
    
    // Handle first slide video - need user interaction on mobile
    const firstSlide = slides[0];
    const firstVideo = firstSlide.querySelector('video');
    
    // Add click handler to enable video playback on mobile
    document.addEventListener('click', function enableVideoPlayback() {
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            const videoHint = slide.querySelector('.video-play-hint');
            
            if (video && slide.classList.contains('active')) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Video started playing successfully
                        if (videoHint) {
                            videoHint.classList.remove('show');
                        }
                    }).catch(error => {
                        console.log('Video autoplay prevented:', error);
                    });
                }
            }
        });
        // Remove this listener after first click
        document.removeEventListener('click', enableVideoPlayback);
    }, { once: true });
}

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get the submit button and add loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    const formData = new FormData(event.target);
    const formDisplay = document.getElementById('formDisplay');
    
    // Get form values using the new field names
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const enquiry = formData.get('enquiry');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message || !enquiry) {
        alert('Please fill in all required fields.');
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        return;
    }
    
    // Simulate form processing delay
    setTimeout(() => {
        // Display personalized thank you message
        if (formDisplay) {
            formDisplay.innerHTML = `
                <h3>Thank you ${firstName}, your message will be delivered!</h3>
                <p>We have received your inquiry and will respond within 24-48 hours during business days.</p>
                <p>For urgent matters, please call us directly at <strong>02014143228</strong> or WhatsApp <strong>0815 331 8702</strong>.</p>
                <p><em>Thank you for your interest in Lead City University!</em></p>
            `;
            
            // Show the form display with animation
            formDisplay.style.display = 'block';
            formDisplay.style.opacity = '0';
            formDisplay.style.transform = 'translateY(20px)';
            
            // Animate the appearance
            setTimeout(() => {
                formDisplay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                formDisplay.style.opacity = '1';
                formDisplay.style.transform = 'translateY(0)';
            }, 100);
            
            // Scroll to display
            setTimeout(() => {
                formDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
            
            // Reset form
            event.target.reset();
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Hide the success message after 10 seconds
            setTimeout(() => {
                formDisplay.style.opacity = '0';
                formDisplay.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    formDisplay.style.display = 'none';
                }, 500);
            }, 10000);
        }
    }, 1500); // 1.5 second delay to simulate processing
}

// Smooth scrolling for navigation links
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

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's a hash link (for future use)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add form validation feedback
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '#4db6ac';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4db6ac';
        });
    });
    
    // Submit button loading effect is now handled in handleFormSubmit function
    
    // Add anniversary celebration effect
    const anniversaryBanner = document.querySelector('.anniversary-banner');
    if (anniversaryBanner) {
        setInterval(() => {
            anniversaryBanner.style.transform = 'scale(1.02)';
            setTimeout(() => {
                anniversaryBanner.style.transform = 'scale(1)';
            }, 500);
        }, 5000);
    }
});

// Add animation for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add interactive effects for program cards and faculty items
document.addEventListener('DOMContentLoaded', function() {
    const programCards = document.querySelectorAll('.program-card');
    const facultyItems = document.querySelectorAll('.faculty-item');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f8ff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'white';
        });
    });
    
    facultyItems.forEach(item => {
        item.addEventListener('click', function() {
            alert('Learn more about the ' + this.textContent + ' faculty by contacting us!');
        });
    });
});

// Add special effects for 20th anniversary
document.addEventListener('DOMContentLoaded', function() {
    const anniversaryElements = document.querySelectorAll('.anniversary-banner, .anniversary-highlight');
    
    anniversaryElements.forEach(element => {
        element.style.transition = 'transform 0.3s ease';
        
        // Add subtle animation every 10 seconds
        setInterval(() => {
            element.style.transform = 'scale(1.01)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
        }, 10000);
    });
});

// Enhanced form handling with better user experience
document.addEventListener('DOMContentLoaded', function() {
    const enquirySelect = document.getElementById('enquiryType');
    
    if (enquirySelect) {
        enquirySelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const subjectField = document.getElementById('subject');
            
            // Auto-populate subject based on enquiry type
            if (selectedValue && subjectField) {
                switch(selectedValue) {
                    case 'undergraduate':
                        subjectField.value = 'Undergraduate Admission Enquiry';
                        break;
                    case 'postgraduate':
                        subjectField.value = 'Postgraduate Admission Enquiry';
                        break;
                    case 'sandwich':
                        subjectField.value = 'Sandwich Programme Enquiry';
                        break;
                    case 'short-courses':
                        subjectField.value = 'Short Courses Enquiry';
                        break;
                    case 'transcripts':
                        subjectField.value = 'Transcript/Result Verification Request';
                        break;
                    default:
                        subjectField.value = 'General Enquiry';
                }
            }
        });
    }
});

// Hero Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const slideInfos = document.querySelectorAll('.slide-info-content');
    
    if (slides.length === 0) return; // Exit if no slides found
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-advance slides
    const slideInterval = setInterval(() => {
        nextSlide();
    }, 6000); // Change slide every 6 seconds
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            // Restart interval
            setTimeout(() => {
                setInterval(() => {
                    nextSlide();
                }, 6000);
            }, 6000);
        });
    });
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function goToSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        slideInfos.forEach(info => info.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        slideInfos[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Pause video when not active
    slides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        if (video) {
            if (index === 0) {
                // First slide is active, pause video initially
                video.pause();
            }
            
            // Add event listeners to play/pause video based on slide visibility
            slide.addEventListener('transitionend', () => {
                if (slide.classList.contains('active')) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });
    
    // Start the first video if it exists and is active
    setTimeout(() => {
        const firstSlide = slides[0];
        const firstVideo = firstSlide.querySelector('video');
        if (firstVideo && firstSlide.classList.contains('active')) {
            firstVideo.play();
        }
    }, 1000);
});

// Smooth scrolling for navigation links
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

// Add animation to program cards
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
});

// Add hover effect to faculty items
const facultyItems = document.querySelectorAll('.faculty-item');
facultyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Mobile Menu Toggle Function
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
} 