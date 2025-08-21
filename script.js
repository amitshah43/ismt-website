document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const hamburgerLines = mobileMenuBtn.querySelectorAll(".hamburger-line")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    // Animate hamburger lines
    if (mobileMenu.classList.contains("active")) {
      hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      hamburgerLines[1].style.opacity = "0"
      hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      hamburgerLines[0].style.transform = "none"
      hamburgerLines[1].style.opacity = "1"
      hamburgerLines[2].style.transform = "none"
    }
  })

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll(".nav-mobile a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      hamburgerLines[0].style.transform = "none"
      hamburgerLines[1].style.opacity = "1"
      hamburgerLines[2].style.transform = "none"
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
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
  const animatedElements = document.querySelectorAll(".program-card, .hero-content > *")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Header background on scroll
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
  })

  // Add click handlers for buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
      ripple.style.transform = "scale(0)"
      ripple.style.animation = "ripple 0.6s linear"
      ripple.style.pointerEvents = "none"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
})
