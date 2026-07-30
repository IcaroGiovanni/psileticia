/**
 * Leticia Garcia - Premium Website
 * Pure Vanilla JavaScript Application Logic
 */

// Configuration
const WHATSAPP_NUMBER = "5535984123819"; // WhatsApp comercial exibido no site

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  initLoader();
  initHeaderScroll();
  initMobileMenu();
  initScrollActiveLinks();
  initScrollReveal();
  initTestimonialsCarousel();
  initFAQAccordion();
  initRippleEffect();
  initStickyButtons();
  initConveniosEffects();
});

/* ==========================================================================
   1. PAGE LOADER
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;
  
  window.addEventListener("load", () => {
    // Smooth fade out
    setTimeout(() => {
      loader.classList.add("fade-out");
      // Remove from DOM layout after transition
      loader.addEventListener("transitionend", () => {
        loader.style.display = "none";
      });
    }, 400); // Small delay to guarantee visual render
  });
}

/* ==========================================================================
   2. SITE HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Trigger once initially in case of refresh down page
  handleScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const body = document.body;

  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    toggleBtn.classList.toggle("active");
    mobileNav.classList.toggle("active");
    mobileNav.setAttribute("aria-hidden", isExpanded);
    
    // Prevent body scrolling behind menu
    body.classList.toggle("menu-open", !isExpanded);
    if (!isExpanded) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  };

  toggleBtn.addEventListener("click", toggleMenu);

  // Close menu on link clicks
  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      toggleMenu(); // Close menu
      
      if (targetSection) {
        // Wait minor delay for menu close animation
        setTimeout(() => {
          const headerOffset = 70;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 300);
      }
    });
  });
}

/* ==========================================================================
   4. ACTIVE LINK SPY ON SCROLL
   ========================================================================== */
function initScrollActiveLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  const options = {
    root: null,
    rootMargin: "-25% 0px -70% 0px", // Triggers when section occupies middle of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  // Add click scrolling to desktop links to respect header offset
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-fade, .reveal-left, .reveal-right");
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px", // Trigger slightly before element enters view
    threshold: 0.1 // 10% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonialsCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");
  const container = document.querySelector(".carousel-container");
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let autoPlayTimer = null;
  const slideInterval = 6000; // 6 seconds

  const updateCarousel = (index) => {
    // Handle bounds
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Update active slide class
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentSlide);
    });

    // Update active dot class
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  };

  const nextSlide = () => {
    updateCarousel(currentSlide + 1);
  };

  const prevSlide = () => {
    updateCarousel(currentSlide - 1);
  };

  // Start Autoplay
  const startAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, slideInterval);
  };

  // Stop Autoplay
  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  // Listeners
  if (nextBtn) nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoPlay(); // Reset timer
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoPlay(); // Reset timer
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.getAttribute("data-slide"));
      updateCarousel(targetIndex);
      startAutoPlay(); // Reset timer
    });
  });

  // Pause on hover
  if (container) {
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);
  }

  // Initialize
  startAutoPlay();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // Close all other accordions first (Single-expand feature)
      document.querySelectorAll(".accordion-header").forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute("aria-expanded", "false");
          const otherContent = otherHeader.nextElementSibling;
          otherContent.style.maxHeight = null;
          otherContent.setAttribute("aria-hidden", "true");
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        header.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
        content.setAttribute("aria-hidden", "true");
      } else {
        header.setAttribute("aria-expanded", "true");
        // Dynamically compute the scrollHeight to transition max-height smoothly
        content.style.maxHeight = content.scrollHeight + "px";
        content.setAttribute("aria-hidden", "false");
      }
    });
  });
}

/* ==========================================================================
   8. BUTTON RIPPLE EFFECT
   ========================================================================== */
function initRippleEffect() {
  const rippleButtons = document.querySelectorAll(".btn-ripple");

  rippleButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      // Calculate coordinates relative to button
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Append and animate
      btn.appendChild(ripple);

      // Clean up DOM after animation completes
      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    });
  });
}

/* ==========================================================================
   9. STICKY / FLOATING BUTTONS (BACK TO TOP)
   ========================================================================== */
function initStickyButtons() {
  const backToTopBtn = document.getElementById("back-to-top");
  
  if (!backToTopBtn) return;

  const checkScroll = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  };

  window.addEventListener("scroll", checkScroll);
  // Initial check
  checkScroll();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   10. SCHEDULING SYSTEM (MODAL WIZARD)
   ========================================================================== */
function initBookingModal() {
  // Modal Triggers
  const openModalBtns = [
    document.getElementById("cta-header"),
    document.getElementById("cta-mobile"),
    document.getElementById("cta-hero-schedule")
  ];
  const closeModalBtn = document.getElementById("close-modal");
  const modalOverlay = document.getElementById("booking-modal");
  
  if (!modalOverlay) return;

  // Step Wizard sections
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
    document.getElementById("step-4")
  ];
  
  // Progress indicators
  const progressIndicator = document.getElementById("progress-indicator");
  const stepLabels = document.querySelectorAll(".progress-steps-label .step-label");

  // Navigation Buttons
  const btnNext1 = document.getElementById("btn-next-step-1");
  const btnPrev2 = document.getElementById("btn-prev-step-2");
  const btnNext2 = document.getElementById("btn-next-step-2");
  const btnPrev3 = document.getElementById("btn-prev-step-3");
  const btnNext3 = document.getElementById("btn-next-step-3");
  const btnPrev4 = document.getElementById("btn-prev-step-4");
  const btnConfirm = document.getElementById("btn-confirm-booking");

  // State Variables
  let currentStep = 1;
  let selectedDate = null;
  let selectedTime = null;
  let patientName = "";
  let patientPhone = "";
  let patientGoal = "";
  let patientNotes = "";

  // Calendar References
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const calendarDaysContainer = document.getElementById("calendar-days");
  const calendarTitle = document.getElementById("calendar-month-year");
  
  // Calendar View Tracker
  let calendarTrackerDate = new Date();
  const todayDate = new Date();

  // Time Slots
  const timeSlots = document.querySelectorAll(".time-slot");
  const selectedDatePreview = document.getElementById("selected-date-preview");

  // Form Fields
  const form = document.getElementById("booking-form");
  const nameInput = document.getElementById("patient-name");
  const phoneInput = document.getElementById("patient-phone");
  const goalInput = document.getElementById("patient-goal");
  const notesInput = document.getElementById("patient-notes");

  // Summary Elements
  const summaryName = document.getElementById("summary-name");
  const summaryPhone = document.getElementById("summary-phone");
  const summaryDate = document.getElementById("summary-date");
  const summaryTime = document.getElementById("summary-time");
  const summaryGoal = document.getElementById("summary-goal");

  // Modal Open/Close handlers
  const openModal = () => {
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent body scroll
    
    // Reset wizard to Step 1 on open
    resetBookingState();
    goToStep(1);
    renderCalendar();
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scrolling
  };

  openModalBtns.forEach(btn => {
    if (btn) btn.addEventListener("click", openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  
  // Close on Backdrop Click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Esc key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  /* Wizard Navigation Lógicas */
  const goToStep = (stepNumber) => {
    currentStep = stepNumber;

    // Show/hide sections
    steps.forEach((step, idx) => {
      step.classList.toggle("active", idx === (stepNumber - 1));
    });

    // Update Progress Bar fill width
    // Step 1 -> 25%, Step 2 -> 50%, Step 3 -> 75%, Step 4 -> 100%
    const progressWidth = stepNumber * 25;
    progressIndicator.style.width = `${progressWidth}%`;

    // Update Labels Active class
    stepLabels.forEach((label, idx) => {
      label.classList.toggle("active", idx === (stepNumber - 1));
    });

    // Step-specific initializations
    if (stepNumber === 2) {
      // Format selected date for preview
      if (selectedDate) {
        selectedDatePreview.textContent = formatDateBR(selectedDate);
      }
    } else if (stepNumber === 4) {
      // Load summary fields
      summaryName.textContent = patientName;
      summaryPhone.textContent = patientPhone;
      summaryDate.textContent = formatDateBR(selectedDate);
      summaryTime.textContent = selectedTime;
      summaryGoal.textContent = patientGoal;
    }
  };

  // Navigation button binds
  if (btnNext1) btnNext1.addEventListener("click", () => { if (selectedDate) goToStep(2); });
  if (btnPrev2) btnPrev2.addEventListener("click", () => { goToStep(1); });
  if (btnNext2) btnNext2.addEventListener("click", () => { if (selectedTime) goToStep(3); });
  if (btnPrev3) btnPrev3.addEventListener("click", () => { goToStep(2); });
  if (btnNext3) btnNext3.addEventListener("click", () => {
    if (validateFormStep3()) {
      patientName = nameInput.value.trim();
      patientPhone = phoneInput.value.trim();
      patientGoal = goalInput.options[goalInput.selectedIndex].text;
      patientNotes = notesInput.value.trim();
      goToStep(4);
    }
  });
  if (btnPrev4) btnPrev4.addEventListener("click", () => { goToStep(3); });

  // Submit and open WhatsApp
  if (btnConfirm) btnConfirm.addEventListener("click", () => {
    const formattedDate = formatDateBR(selectedDate);
    
    // Compose whatsapp message
    let messageText = `Olá, Leticia Garcia!\n`;
    messageText += `Gostaria de verificar a disponibilidade para uma consulta.\n\n`;
    messageText += `Meu nome é: ${patientName}\n`;
    messageText += `Dia escolhido: \n${formattedDate}\n\n`;
    messageText += `Horário: \n${selectedTime}\n\n`;
    messageText += `Objetivo: \n${patientGoal}\n`;
    
    if (patientNotes) {
      messageText += `\nObservação:\n${patientNotes}\n`;
    }
    
    messageText += `\nFico no aguardo.`;

    // Encode text
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open link in new tab
    window.open(whatsappUrl, "_blank");
    closeModal();
  });

  /* STEP 1: CALENDAR COMPONENT */
  const renderCalendar = () => {
    calendarDaysContainer.innerHTML = "";
    
    const year = calendarTrackerDate.getFullYear();
    const month = calendarTrackerDate.getMonth();
    
    // Set Title: e.g. "Julho 2026" in Portuguese
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    // Days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Starting weekday (0 = Sun, 1 = Mon...)
    const startWeekday = new Date(year, month, 1).getDay();

    // Disable prev month nav if we are looking at the current month
    const isCurrentMonth = year === todayDate.getFullYear() && month === todayDate.getMonth();
    prevMonthBtn.disabled = isCurrentMonth;
    prevMonthBtn.style.opacity = isCurrentMonth ? "0.3" : "1";
    prevMonthBtn.style.pointerEvents = isCurrentMonth ? "none" : "auto";

    // Add empty placeholders for starting alignment
    for (let i = 0; i < startWeekday; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("calendar-day", "empty");
      calendarDaysContainer.appendChild(emptyDiv);
    }

    // Add actual days
    for (let day = 1; day <= totalDays; day++) {
      const dayBtn = document.createElement("button");
      dayBtn.type = "button";
      dayBtn.classList.add("calendar-day");
      dayBtn.textContent = day;

      const dateObj = new Date(year, month, day);
      const weekday = dateObj.getDay();

      // Check validation:
      // 1. Past days
      // Zero out time details to compare only dates
      const compareToday = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
      const compareDate = new Date(year, month, day);

      const isPastDay = compareDate < compareToday;
      
      // 2. Weekends: Saturday (6) and Sunday (0) are closed
      const isWeekend = weekday === 0 || weekday === 6;

      if (isPastDay || isWeekend) {
        dayBtn.classList.add("blocked");
        dayBtn.setAttribute("disabled", "true");
      } else {
        // Today outline
        if (compareDate.getTime() === compareToday.getTime()) {
          dayBtn.classList.add("today");
        }
        
        // Selected highlight
        if (selectedDate && 
            selectedDate.getDate() === day && 
            selectedDate.getMonth() === month && 
            selectedDate.getFullYear() === year) {
          dayBtn.classList.add("selected");
        }

        // Add Click Listener
        dayBtn.addEventListener("click", () => {
          // Clear previous selection
          const prevSelected = calendarDaysContainer.querySelector(".calendar-day.selected");
          if (prevSelected) prevSelected.classList.remove("selected");

          dayBtn.classList.add("selected");
          selectedDate = new Date(year, month, day);
          
          // Enable continue button
          btnNext1.classList.remove("disabled");
          btnNext1.removeAttribute("disabled");
        });
      }

      calendarDaysContainer.appendChild(dayBtn);
    }
  };

  // Nav Month handlers
  prevMonthBtn.addEventListener("click", () => {
    calendarTrackerDate.setMonth(calendarTrackerDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    calendarTrackerDate.setMonth(calendarTrackerDate.getMonth() + 1);
    renderCalendar();
  });

  /* STEP 2: TIME SLOTS SELECTION */
  timeSlots.forEach(slot => {
    slot.addEventListener("click", () => {
      // Clear previous slot selection
      timeSlots.forEach(s => s.classList.remove("selected"));
      
      slot.classList.add("selected");
      selectedTime = slot.getAttribute("data-time");
      
      // Enable step 2 continue button
      btnNext2.classList.remove("disabled");
      btnNext2.removeAttribute("disabled");
    });
  });

  /* STEP 3: FORM VALIDATIONS */
  const validateFormStep3 = () => {
    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    const groupName = nameInput.closest(".form-group");
    if (nameVal.length < 3) {
      groupName.classList.add("has-error");
      isValid = false;
    } else {
      groupName.classList.remove("has-error");
    }

    // Validate Phone (At least 10 numbers)
    const phoneVal = phoneInput.value.replace(/\D/g, "");
    const groupPhone = phoneInput.closest(".form-group");
    if (phoneVal.length < 10) {
      groupPhone.classList.add("has-error");
      isValid = false;
    } else {
      groupPhone.classList.remove("has-error");
    }

    // Validate Goal
    const goalVal = goalInput.value;
    const groupGoal = goalInput.closest(".form-group");
    if (!goalVal) {
      groupGoal.classList.add("has-error");
      isValid = false;
    } else {
      groupGoal.classList.remove("has-error");
    }

    return isValid;
  };

  // Attach input checking event listeners for direct UI responses
  const checkInputs = () => {
    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.replace(/\D/g, "");
    const goalVal = goalInput.value;

    const allValid = nameVal.length >= 3 && phoneVal.length >= 10 && goalVal !== "";
    
    if (allValid) {
      btnNext3.classList.remove("disabled");
      btnNext3.removeAttribute("disabled");
    } else {
      btnNext3.classList.add("disabled");
      btnNext3.setAttribute("disabled", "true");
    }
  };

  // Auto-formatting mask for phone inputs
  const maskPhone = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    
    // Max size
    if (input.length > 11) {
      input = input.substring(0, 11);
    }
    
    let formatted = "";
    if (input.length > 0) {
      formatted = "(" + input.substring(0, 2);
    }
    if (input.length > 2) {
      formatted += ") " + input.substring(2, 7);
    }
    if (input.length > 7) {
      formatted += "-" + input.substring(7, 11);
    }
    
    e.target.value = formatted;
  };

  nameInput.addEventListener("input", checkInputs);
  phoneInput.addEventListener("input", (e) => {
    maskPhone(e);
    checkInputs(e);
  });
  goalInput.addEventListener("change", checkInputs);

  /* Reset Functions */
  const resetBookingState = () => {
    selectedDate = null;
    selectedTime = null;
    patientName = "";
    patientPhone = "";
    patientGoal = "";
    patientNotes = "";
    
    // Clear selections in UI
    const prevSelectedDay = calendarDaysContainer.querySelector(".calendar-day.selected");
    if (prevSelectedDay) prevSelectedDay.classList.remove("selected");
    
    timeSlots.forEach(s => s.classList.remove("selected"));
    form.reset();
    
    // Disable buttons until selections are remade
    btnNext1.classList.add("disabled");
    btnNext1.setAttribute("disabled", "true");
    
    btnNext2.classList.add("disabled");
    btnNext2.setAttribute("disabled", "true");

    btnNext3.classList.add("disabled");
    btnNext3.setAttribute("disabled", "true");

    // Remove errors
    document.querySelectorAll(".form-group").forEach(group => {
      group.classList.remove("has-error");
    });

    calendarTrackerDate = new Date(); // Reset to today month view
  };

  /* Auxiliary Helpers */
  const formatDateBR = (dateObj) => {
    if (!dateObj) return "";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
}

/* ==========================================================================
   11. CONVÊNIOS INTERACTIVE EFFECTS & ACTIONS
   ========================================================================== */
function initConveniosEffects() {
  const convenioCards = document.querySelectorAll(".convenio-card");
  const convenioBtns = document.querySelectorAll(".btn-convenio");

  if (convenioCards.length === 0) return;

  // 3D Parallax Tilt Effect on Mouse Move
  convenioCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation degs
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    });
  });

  // Action Buttons: Click opens WhatsApp with specific convênio pre-selected
  convenioBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const planName = btn.getAttribute("data-plan") || "Convênio de Saúde";
      
      const msg = `Olá, Leticia Garcia! Gostaria de agendar uma consulta pelo meu convênio ${planName}.`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      
      window.open(url, "_blank");
    });
  });
}
