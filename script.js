// Mobile Navigation
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Skills scrolling functionality
const skillsScroll = document.getElementById("skills-scroll")
const scrollLeftBtn = document.getElementById("scroll-left")
const scrollRightBtn = document.getElementById("scroll-right")

let currentScroll = 0
const scrollAmount = 300

// Auto-scroll skills section
let autoScrollInterval

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const maxScroll = skillsScroll.scrollWidth - skillsScroll.clientWidth

    if (currentScroll >= maxScroll) {
      currentScroll = 0
    } else {
      currentScroll += scrollAmount
    }

    skillsScroll.style.transform = `translateX(-${currentScroll}px)`
  }, 3000)
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval)
}

// Manual scroll controls
scrollLeftBtn.addEventListener("click", () => {
  stopAutoScroll()
  currentScroll = Math.max(0, currentScroll - scrollAmount)
  skillsScroll.style.transform = `translateX(-${currentScroll}px)`
  setTimeout(startAutoScroll, 5000)
})

scrollRightBtn.addEventListener("click", () => {
  stopAutoScroll()
  const maxScroll = skillsScroll.scrollWidth - skillsScroll.clientWidth
  currentScroll = Math.min(maxScroll, currentScroll + scrollAmount)
  skillsScroll.style.transform = `translateX(-${currentScroll}px)`
  setTimeout(startAutoScroll, 5000)
})

// Start auto-scroll when page loads
window.addEventListener("load", () => {
  startAutoScroll()
})

// Pause auto-scroll when hovering over skills section
const skillsSection = document.getElementById("skills")
skillsSection.addEventListener("mouseenter", stopAutoScroll)
skillsSection.addEventListener("mouseleave", startAutoScroll)

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-item, .project-card, .stat-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = contactForm.querySelector('input[type="text"]').value
  const email = contactForm.querySelector('input[type="email"]').value
  const subject = contactForm.querySelectorAll('input[type="text"]')[1].value
  const message = contactForm.querySelector("textarea").value

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 80)
  }, 1000)
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll(".section-title, .section-subtitle")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.5 },
)

revealElements.forEach((el) => {
  revealObserver.observe(el)
})

// Add CSS for reveal animation
const style = document.createElement("style")
style.textContent = `
    .section-title, .section-subtitle {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .section-title.revealed, .section-subtitle.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)
