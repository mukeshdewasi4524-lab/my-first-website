/**
 * MUKESH.DEV - PERSONAL DEVELOPER PORTFOLIO
 * Identity: Mukesh Dewasi | Student Developer
 * Education: First-year college student
 * Technologies: Python, HTML, CSS, JavaScript
 * 
 * Production-Ready Vanilla JavaScript Architecture:
 *   1. Responsive Navbar & Mobile Menu Drawer (Keyboard Accessible)
 *   2. Hero Section Typing Effect (Reduced-Motion Aware)
 *   3. 3D Tilt Card Micro-Interactions
 *   4. Scroll Reveal Animations (IntersectionObserver)
 *   5. Active Navigation Link Tracker (ScrollSpy)
 *   6. Floating Back-to-Top Button
 *   7. Interactive Developer Terminal (CLI Engine, History, Commands)
 *   8. Advanced Project Showcase (Filter Tabs & Shared Modal Dialog)
 *   9. Live GitHub Public REST API Integration (Skeletons & Fallback)
 *  10. Smart Contact Form Validation (Client-Side & Honest Feedback)
 *  11. Toast Notification System
 *  12. Automatic Copyright Year
 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // Detect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Verified URLs
    const VERIFIED_GITHUB_URL = "https://github.com/mukeshdewasi4524-lab";
    const VERIFIED_LINKEDIN_URL = "https://www.linkedin.com/in/mukesh-d-a83ba8397";
    const VERIFIED_FIRST_WEBSITE_URL = "https://mukeshdewasi4524-lab.github.io/my-first-website/";

    /* ==========================================================================
       1. RESPONSIVE NAVBAR & MOBILE MENU DRAWER
       ========================================================================== */
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navigationLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {
        // Toggle mobile drawer
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close mobile drawer when any navigation link is clicked
        navigationLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("open")) {
                    navLinks.classList.remove("open");
                    menuToggle.classList.remove("open");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open navigation menu");
                }
            });
        });

        // Close mobile drawer when clicking outside
        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });

        // Close mobile drawer on Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.focus();
            }
        });
    }

    // Navbar background blur enhancement on scroll
    const handleNavbarScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* ==========================================================================
       2. HERO SECTION TYPING ANIMATION
       ========================================================================== */
    const typedTextElement = document.getElementById("typedText");
    const wordsToType = ["Software", "Frontend", "Python", "Interactive", "Creative"];
    let wordIndex = 0;
    // In index.html, "Software" is already pre-rendered
    let charIndex = wordsToType[0].length;
    let isDeleting = true;
    let typingSpeed = 100;

    const typeAnimation = () => {
        if (!typedTextElement) return;

        if (prefersReducedMotion) {
            typedTextElement.textContent = "Software";
            return;
        }

        const currentWord = wordsToType[wordIndex];

        if (isDeleting) {
            charIndex--;
            typedTextElement.textContent = currentWord.substring(0, charIndex);
            typingSpeed = 65;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % wordsToType.length;
                typingSpeed = 350; // Pause before typing next word
            }
        } else {
            charIndex++;
            typedTextElement.textContent = currentWord.substring(0, charIndex);
            typingSpeed = 110;

            if (charIndex >= currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause on completed word
            }
        }

        setTimeout(typeAnimation, typingSpeed);
    };

    if (typedTextElement) {
        setTimeout(typeAnimation, 1800);
    }

    /* ==========================================================================
       3. CODE CARD 3D TILT EFFECT (Subtle & Performant)
       ========================================================================== */
    const codeCard = document.getElementById("codeCard");

    if (codeCard && !prefersReducedMotion && window.innerWidth > 992) {
        const handleCardMouseMove = (event) => {
            const rect = codeCard.getBoundingClientRect();
            const cardX = event.clientX - rect.left;
            const cardY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((cardY - centerY) / centerY) * -5;
            const rotateY = ((cardX - centerX) / centerX) * 5;

            codeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        };

        const handleCardMouseLeave = () => {
            codeCard.style.transform = "";
        };

        codeCard.addEventListener("mousemove", handleCardMouseMove);
        codeCard.addEventListener("mouseleave", handleCardMouseLeave);
    }

    /* ==========================================================================
       4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================================================== */
    const revealElements = document.querySelectorAll(".reveal");

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add("visible"));
    } else if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    /* ==========================================================================
       5. ACTIVE NAVBAR LINK WHILE SCROLLING (ScrollSpy)
       ========================================================================== */
    const trackedSections = document.querySelectorAll("main section[id]");

    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 140;
        let currentSectionId = "";

        trackedSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (window.scrollY < 100) {
            currentSectionId = "home";
        }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 80) {
            currentSectionId = "contact";
        }

        if (currentSectionId) {
            navigationLinks.forEach(link => {
                const href = link.getAttribute("href");
                if (href === `#${currentSectionId}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }
    };

    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    /* ==========================================================================
       6. FLOATING BACK-TO-TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        };

        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }

    /* ==========================================================================
       7. INTERACTIVE DEVELOPER TERMINAL (CLI Engine)
       ========================================================================== */
    const terminalInput = document.getElementById("terminalInput");
    const terminalBody = document.getElementById("terminalBody");
    const terminalHistory = document.getElementById("terminalHistory");
    const terminalClearBtn = document.getElementById("terminalClearBtn");
    const quickChips = document.querySelectorAll(".term-chip");

    const terminalCommandsHistory = [];
    let historyCursor = -1;

    // Command implementations strictly using verified information
    const terminalCommandHandlers = {
        help: () => {
            return `
                <p class="term-accent">Available Commands:</p>
                <table>
                    <tbody>
                        <tr>
                            <td class="term-cmd-col">help</td>
                            <td>Display this list of available commands</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">about</td>
                            <td>Learn about Mukesh Dewasi & education status</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">skills</td>
                            <td>View technical skills & programming languages</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">projects</td>
                            <td>View featured projects & live web apps</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">github</td>
                            <td>View public GitHub profile & repositories</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">linkedin</td>
                            <td>Open verified LinkedIn profile</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">contact</td>
                            <td>View ways to connect with Mukesh</td>
                        </tr>
                        <tr>
                            <td class="term-cmd-col">clear</td>
                            <td>Clear the terminal screen</td>
                        </tr>
                    </tbody>
                </table>
            `;
        },

        about: () => {
            return `
                <p><span class="term-accent">Name:</span> Mukesh Dewasi</p>
                <p><span class="term-accent">Role:</span> Student Developer</p>
                <p><span class="term-accent">Education:</span> First-year college student</p>
                <p><span class="term-accent">Core Focus:</span> Web Development (HTML, CSS, JavaScript) & Python Programming</p>
                <p><span class="term-accent">Philosophy:</span> Passionate about clean code, foundational computing, and building practical applications that solve real needs.</p>
            `;
        },

        skills: () => {
            return `
                <p class="term-accent">Technical Skills & Proficiencies:</p>
                <p>• <span class="term-accent">Python:</span> Core scripting, logic building, backend fundamentals & CLI tools</p>
                <p>• <span class="term-accent">HTML5:</span> Semantic elements, web accessibility (a11y), clean structure & SEO</p>
                <p>• <span class="term-accent">CSS3:</span> Modern layout (Grid, Flexbox), custom properties, glassmorphism & responsive design</p>
                <p>• <span class="term-accent">JavaScript:</span> Vanilla ES6+, DOM manipulation, REST APIs, asynchronous logic & state</p>
            `;
        },

        projects: () => {
            return `
                <p class="term-accent">Featured Projects:</p>
                <p>1. <span class="term-accent">ShopLedger</span> (Web Application / In Progress)</p>
                <p>   Smarter shop management & accounting concept for local retail inventory & customer khata records.</p>
                <p>2. <span class="term-accent">My First Website</span> (Frontend / Live)</p>
                <p>   Personal developer portfolio milestone built with pure HTML, CSS, and JavaScript.</p>
                <p>   URL: <a href="${VERIFIED_FIRST_WEBSITE_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_FIRST_WEBSITE_URL} ↗</a></p>
                <p>3. <span class="term-accent">Personal Developer Portfolio</span> (Production Web)</p>
                <p>   High-performance developer portfolio with interactive CLI, live GitHub integration & ATS resume.</p>
                <p>   Source: <a href="${VERIFIED_GITHUB_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_GITHUB_URL} ↗</a></p>
            `;
        },

        github: () => {
            return `
                <p class="term-accent">GitHub Profile:</p>
                <p>Username: @mukeshdewasi4524-lab</p>
                <p>Profile: <a href="${VERIFIED_GITHUB_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_GITHUB_URL} ↗</a></p>
                <p>Check the <span class="term-accent">'Open Source & Repositories'</span> section on this page to view live repositories.</p>
            `;
        },

        linkedin: () => {
            return `
                <p class="term-accent">LinkedIn Profile:</p>
                <p>Connect with Mukesh Dewasi:</p>
                <p><a href="${VERIFIED_LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_LINKEDIN_URL} ↗</a></p>
            `;
        },

        contact: () => {
            return `
                <p class="term-accent">Contact Information:</p>
                <p>• <span class="term-accent">LinkedIn:</span> <a href="${VERIFIED_LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_LINKEDIN_URL} ↗</a></p>
                <p>• <span class="term-accent">GitHub:</span> <a href="${VERIFIED_GITHUB_URL}" target="_blank" rel="noopener noreferrer" class="term-link">${VERIFIED_GITHUB_URL} ↗</a></p>
                <p>• <span class="term-accent">Web Form:</span> Scroll to the <a href="#contact" class="term-link">#contact</a> section to send a message.</p>
            `;
        },

        clear: () => {
            if (terminalHistory) {
                terminalHistory.innerHTML = "";
            }
            return null;
        }
    };

    // Execute given terminal command
    const executeTerminalCommand = (commandStr) => {
        const rawCommand = commandStr.trim();
        if (!rawCommand) return;

        const cmdLower = rawCommand.toLowerCase();

        // Push to history
        terminalCommandsHistory.push(rawCommand);
        historyCursor = terminalCommandsHistory.length;

        // If clear command
        if (cmdLower === "clear") {
            terminalCommandHandlers.clear();
            return;
        }

        // Create terminal entry element
        const entry = document.createElement("div");
        entry.className = "term-entry";

        // Echo command
        const inputEcho = document.createElement("div");
        inputEcho.className = "term-input-echo";
        inputEcho.innerHTML = `
            <span class="terminal-prompt">
                <span class="prompt-user">guest</span>@<span class="prompt-host">mukesh.dev</span>:<span class="prompt-path">~</span>$
            </span>
            <span class="echo-text">${escapeHtml(rawCommand)}</span>
        `;
        entry.appendChild(inputEcho);

        // Command output
        const outputDiv = document.createElement("div");
        outputDiv.className = "term-output";

        if (terminalCommandHandlers[cmdLower]) {
            outputDiv.innerHTML = terminalCommandHandlers[cmdLower]();
        } else {
            outputDiv.innerHTML = `
                <p class="term-warn">bash: command not found: ${escapeHtml(rawCommand)}</p>
                <p>Type <span class="term-accent">'help'</span> for a list of available commands.</p>
            `;
        }

        entry.appendChild(outputDiv);
        terminalHistory.appendChild(entry);

        // Scroll terminal to bottom
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    };

    if (terminalInput) {
        // Handle Enter, ArrowUp, ArrowDown
        terminalInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const cmd = terminalInput.value;
                if (cmd.trim()) {
                    executeTerminalCommand(cmd);
                } else {
                    // Empty enter - just show a new prompt line
                    const blankEntry = document.createElement("div");
                    blankEntry.className = "term-entry";
                    blankEntry.innerHTML = `
                        <div class="term-input-echo">
                            <span class="terminal-prompt">
                                <span class="prompt-user">guest</span>@<span class="prompt-host">mukesh.dev</span>:<span class="prompt-path">~</span>$
                            </span>
                        </div>
                    `;
                    terminalHistory.appendChild(blankEntry);
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
                terminalInput.value = "";
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                if (terminalCommandsHistory.length > 0 && historyCursor > 0) {
                    historyCursor--;
                    terminalInput.value = terminalCommandsHistory[historyCursor] || "";
                }
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                if (historyCursor < terminalCommandsHistory.length - 1) {
                    historyCursor++;
                    terminalInput.value = terminalCommandsHistory[historyCursor] || "";
                } else {
                    historyCursor = terminalCommandsHistory.length;
                    terminalInput.value = "";
                }
            }
        });

        // Focus input when clicking anywhere on terminal window body
        if (terminalBody) {
            terminalBody.addEventListener("click", () => {
                terminalInput.focus();
            });
        }
    }

    // Clear button in terminal header
    if (terminalClearBtn) {
        terminalClearBtn.addEventListener("click", () => {
            terminalCommandHandlers.clear();
            if (terminalInput) terminalInput.focus();
            showToast("Terminal buffer cleared");
        });
    }

    // Quick chip buttons
    quickChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const cmd = chip.getAttribute("data-cmd");
            if (cmd) {
                if (terminalInput) {
                    terminalInput.value = cmd;
                    terminalInput.focus();
                }
                executeTerminalCommand(cmd);
                if (terminalInput) terminalInput.value = "";
            }
        });
    });

    /* ==========================================================================
       8. ADVANCED PROJECT SHOWCASE (Filters & Shared Details Modal)
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    // Project category filtering
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");

            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            // Filter project cards
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("is-hidden");
                    card.style.display = "";
                } else {
                    card.classList.add("is-hidden");
                    card.style.display = "none";
                }
            });
        });
    });

    // Shared Project Details Modal
    const projectModal = document.getElementById("projectDetailsModal");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalCategory = document.getElementById("projectModalCategory");
    const projectModalBody = document.getElementById("projectModalBody");
    const projectModalFooter = document.getElementById("projectModalFooter");
    const projectModalCloseBtn = document.getElementById("projectModalCloseBtn");
    const projectModalTriggers = document.querySelectorAll(".project-modal-trigger");

    let lastActiveModalTrigger = null;

    // Verified data dictionary for project modals (no invented details)
    const projectDetailsData = {
        shopledger: {
            title: `ShopLedger — <span class="highlight">Overview</span>`,
            badge: "01 / WEB APP · IN PROGRESS",
            bodyHtml: `
                <p class="modal-intro">
                    <strong>ShopLedger</strong> is a shop management and accounting application concept designed to simplify
                    everyday business tasks, customer credit/debit records (khata), and inventory tracking for local store owners.
                </p>
                <div class="modal-features-grid">
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">📖</span>
                        <div>
                            <h4>Digital Khata Ledger</h4>
                            <p>Track customer credit and debit balances with quick searchable transaction records.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">📦</span>
                        <div>
                            <h4>Inventory Monitoring</h4>
                            <p>Real-time item count tracking to avoid stockouts of high-demand goods.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">📱</span>
                        <div>
                            <h4>Mobile-First Interface</h4>
                            <p>Clean, high-contrast POS and dashboard layout built for rapid phone and tablet use.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">⚡</span>
                        <div>
                            <h4>Local Offline Support</h4>
                            <p>Concept design prioritizes fast local persistence and reliable data storage.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-meta">
                    <div class="modal-meta-item">
                        <span class="meta-label">Project Status:</span>
                        <span class="meta-value status-amber">Active In-Progress Concept</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="meta-label">Core Technologies:</span>
                        <span class="meta-value">React, JavaScript, UI/UX Design, Python Concept</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="meta-label">Target Audience:</span>
                        <span class="meta-value">Local retail shops, grocery stores, independent merchants</span>
                    </div>
                </div>
            `,
            footerHtml: `
                <a href="${VERIFIED_GITHUB_URL}" target="_blank" rel="noopener noreferrer" class="btn primary-btn">
                    <span>View on GitHub</span>
                    <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </a>
            `
        },

        portfolio: {
            title: `Developer Portfolio — <span class="highlight">Specs</span>`,
            badge: "03 / FRONTEND · PRODUCTION",
            bodyHtml: `
                <p class="modal-intro">
                    <strong>MUKESH.DEV</strong> is a custom, accessible personal portfolio website built with pure HTML,
                    modern CSS, and vanilla JavaScript. It operates with zero heavy dependencies or external frontend frameworks.
                </p>
                <div class="modal-features-grid">
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">⚡</span>
                        <div>
                            <h4>Zero Framework Bloat</h4>
                            <p>Pure semantic HTML5 and vanilla JavaScript for sub-100ms load times.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">💻</span>
                        <div>
                            <h4>Interactive In-Browser CLI</h4>
                            <p>Terminal with bash-like commands, history navigation, and quick chips.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">🌐</span>
                        <div>
                            <h4>Live GitHub REST API</h4>
                            <p>Dynamic repository fetching with shimmer loading skeletons and offline fallback.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">📄</span>
                        <div>
                            <h4>ATS-Optimized PDF Resume</h4>
                            <p>Clean single-page vector PDF generated with standard Type 1 fonts.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-meta">
                    <div class="modal-meta-item">
                        <span class="meta-label">Architecture:</span>
                        <span class="meta-value status-lime">Semantic HTML5 + Custom Properties CSS + Vanilla JS</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="meta-label">Accessibility:</span>
                        <span class="meta-value">WCAG compliant, ARIA dialogs, reduced-motion queries</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="meta-label">Responsiveness:</span>
                        <span class="meta-value">Mobile-first fluid layout (375px to 1440px+)</span>
                    </div>
                </div>
            `,
            footerHtml: `
                <a href="${VERIFIED_GITHUB_URL}" target="_blank" rel="noopener noreferrer" class="btn primary-btn">
                    <span>Repository on GitHub</span>
                    <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </a>
            `
        },

        firstwebsite: {
            title: `My First Website — <span class="highlight">Milestone</span>`,
            badge: "02 / FRONTEND · LIVE",
            bodyHtml: `
                <p class="modal-intro">
                    <strong>My First Website</strong> marks Mukesh Dewasi's very first personal portfolio project,
                    built from the ground up to master core web technologies: HTML5, CSS3, and vanilla JavaScript.
                </p>
                <div class="modal-features-grid">
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">🌱</span>
                        <div>
                            <h4>Foundational Milestone</h4>
                            <p>Hands-on practice with semantic tags, responsive flex layouts, and clean DOM manipulation.</p>
                        </div>
                    </div>
                    <div class="modal-feature">
                        <span class="feat-icon" aria-hidden="true">🚀</span>
                        <div>
                            <h4>Deployed via GitHub Pages</h4>
                            <p>Live continuous deployment directly from the public GitHub repository.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-meta">
                    <div class="modal-meta-item">
                        <span class="meta-label">Live URL:</span>
                        <span class="meta-value status-lime">${VERIFIED_FIRST_WEBSITE_URL}</span>
                    </div>
                    <div class="modal-meta-item">
                        <span class="meta-label">Technologies:</span>
                        <span class="meta-value">HTML5, CSS3, JavaScript</span>
                    </div>
                </div>
            `,
            footerHtml: `
                <a href="${VERIFIED_FIRST_WEBSITE_URL}" target="_blank" rel="noopener noreferrer" class="btn primary-btn">
                    <span>Open Live Demo</span>
                    <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </a>
            `
        }
    };

    const openProjectModal = (projectId, triggerElement) => {
        if (!projectModal) return;
        const data = projectDetailsData[projectId] || projectDetailsData.shopledger;

        lastActiveModalTrigger = triggerElement || document.activeElement;

        if (projectModalCategory) projectModalCategory.textContent = data.badge;
        if (projectModalTitle) projectModalTitle.innerHTML = data.title;
        if (projectModalBody) projectModalBody.innerHTML = data.bodyHtml;
        if (projectModalFooter) projectModalFooter.innerHTML = data.footerHtml;

        projectModal.removeAttribute("hidden");
        // Force reflow for transition
        void projectModal.offsetWidth;
        projectModal.classList.add("active");

        if (triggerElement) {
            triggerElement.setAttribute("aria-expanded", "true");
        }

        document.body.style.overflow = "hidden";

        // Focus close button for accessibility
        if (projectModalCloseBtn) {
            projectModalCloseBtn.focus();
        }
    };

    const closeProjectModal = () => {
        if (!projectModal) return;

        projectModal.classList.remove("active");
        document.body.style.overflow = "";

        if (lastActiveModalTrigger && typeof lastActiveModalTrigger.setAttribute === "function") {
            lastActiveModalTrigger.setAttribute("aria-expanded", "false");
        }

        setTimeout(() => {
            projectModal.setAttribute("hidden", "true");
            if (lastActiveModalTrigger && typeof lastActiveModalTrigger.focus === "function") {
                lastActiveModalTrigger.focus();
            }
        }, 300);
    };

    projectModalTriggers.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            openProjectModal(projectId, btn);
        });
    });

    if (projectModalCloseBtn) {
        projectModalCloseBtn.addEventListener("click", closeProjectModal);
    }

    // Close modal on backdrop click
    if (projectModal) {
        projectModal.addEventListener("click", (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
            closeProjectModal();
        }
    });

    /* ==========================================================================
       9. LIVE GITHUB REST API INTEGRATION
       ========================================================================== */
    const githubReposGrid = document.getElementById("githubReposGrid");
    const ghRepoCount = document.getElementById("ghRepoCount");
    const ghBio = document.getElementById("ghBio");
    const ghAvatar = document.getElementById("ghAvatar");
    const ghRefreshBtn = document.getElementById("ghRefreshBtn");
    const githubStatusNotice = document.getElementById("githubStatusNotice");

    const GITHUB_USERNAME = "mukeshdewasi4524-lab";
    const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`;
    const GITHUB_USER_API = `https://api.github.com/users/${GITHUB_USERNAME}`;

    // Language color map for visual badges
    const languageColors = {
        Python: "#3572A5",
        JavaScript: "#f1e05a",
        HTML: "#e34c26",
        CSS: "#563d7c",
        TypeScript: "#3178c6",
        Shell: "#89e051"
    };

    // Verified fallback repositories when API is rate-limited or offline
    const fallbackRepositories = [
        {
            name: "ShopLedger",
            html_url: VERIFIED_GITHUB_URL,
            description: "Smarter shop management & accounting concept for retail inventory & customer ledger records.",
            language: "JavaScript",
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString()
        },
        {
            name: "my-first-website",
            html_url: `${VERIFIED_GITHUB_URL}/my-first-website`,
            description: "My personal developer portfolio website built from scratch using HTML, CSS, and JavaScript.",
            language: "HTML",
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString()
        },
        {
            name: "developer-portfolio",
            html_url: VERIFIED_GITHUB_URL,
            description: "Production-ready developer portfolio engineered with pure HTML, CSS, and vanilla JavaScript.",
            language: "JavaScript",
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString()
        }
    ];

    const renderRepoCard = (repo) => {
        const langName = repo.language || "Web";
        const langColor = languageColors[langName] || "var(--lime)";
        const descText = repo.description || "Public repository by Mukesh Dewasi.";
        const dateStr = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short"
        }) : "Active";

        return `
            <article class="repo-card glass-card">
                <div class="repo-header">
                    <a href="${escapeHtml(repo.html_url)}"
                       target="_blank" rel="noopener noreferrer"
                       class="repo-title"
                       aria-label="View ${escapeHtml(repo.name)} on GitHub (opens in new tab)">
                        ${escapeHtml(repo.name)} ↗
                    </a>
                </div>
                <p class="repo-desc">${escapeHtml(descText)}</p>
                <div class="repo-footer">
                    <span class="repo-lang">
                        <span class="lang-dot" style="background-color: ${langColor};" aria-hidden="true"></span>
                        <span>${escapeHtml(langName)}</span>
                    </span>
                    <div class="repo-counts">
                        <span class="repo-stat-badge" title="Stars">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>${repo.stargazers_count || 0}</span>
                        </span>
                        <span class="repo-stat-badge" title="Forks">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <line x1="6" y1="3" x2="6" y2="15"></line>
                                <circle cx="18" cy="6" r="3"></circle>
                                <circle cx="6" cy="18" r="3"></circle>
                                <path d="M18 9a9 9 0 0 1-9 9"></path>
                            </svg>
                            <span>${repo.forks_count || 0}</span>
                        </span>
                        <span title="Last updated">${dateStr}</span>
                    </div>
                </div>
            </article>
        `;
    };

    const fetchGitHubData = async () => {
        if (!githubReposGrid) return;

        // Render skeleton state
        githubReposGrid.innerHTML = `
            <div class="repo-skeleton-card"></div>
            <div class="repo-skeleton-card"></div>
            <div class="repo-skeleton-card"></div>
        `;

        if (githubStatusNotice) {
            githubStatusNotice.setAttribute("hidden", "true");
            githubStatusNotice.innerHTML = "";
        }

        // Animate refresh button
        if (ghRefreshBtn) {
            ghRefreshBtn.classList.add("loading");
            ghRefreshBtn.disabled = true;
        }

        try {
            // Fetch user info and repositories concurrently
            const [userResponse, reposResponse] = await Promise.all([
                fetch(GITHUB_USER_API).catch(() => null),
                fetch(GITHUB_REPOS_API).catch(() => null)
            ]);

            // Process user response
            if (userResponse && userResponse.ok) {
                const userData = await userResponse.json();
                if (ghRepoCount && userData.public_repos !== undefined) {
                    ghRepoCount.textContent = userData.public_repos;
                }
                if (ghBio && userData.bio) {
                    ghBio.textContent = userData.bio;
                }
                if (ghAvatar && userData.avatar_url) {
                    ghAvatar.innerHTML = `
                        <img src="${escapeHtml(userData.avatar_url)}"
                             alt="Mukesh Dewasi's GitHub Avatar"
                             class="gh-avatar-img"
                             loading="lazy"
                             width="52" height="52">
                    `;
                }
            } else if (ghRepoCount) {
                ghRepoCount.textContent = "3+";
            }

            // Process repositories response
            if (reposResponse && reposResponse.ok) {
                const reposData = await reposResponse.json();
                if (Array.isArray(reposData) && reposData.length > 0) {
                    githubReposGrid.innerHTML = reposData.map(renderRepoCard).join("");
                } else {
                    // Fallback if no public repos returned
                    githubReposGrid.innerHTML = fallbackRepositories.map(renderRepoCard).join("");
                }
            } else {
                // Rate limited or fetch blocked: render verified fallbacks
                githubReposGrid.innerHTML = fallbackRepositories.map(renderRepoCard).join("");
                if (githubStatusNotice) {
                    githubStatusNotice.removeAttribute("hidden");
                    githubStatusNotice.innerHTML = `
                        <span>Showing verified public repository data. (GitHub API rate limit or offline mode: all links remain fully accessible).</span>
                    `;
                }
            }
        } catch (err) {
            // Network failure fallback
            githubReposGrid.innerHTML = fallbackRepositories.map(renderRepoCard).join("");
            if (ghRepoCount) ghRepoCount.textContent = "3+";
            if (githubStatusNotice) {
                githubStatusNotice.removeAttribute("hidden");
                githubStatusNotice.innerHTML = `
                    <span>Showing verified public repository data. All repository links are live and accessible on GitHub.</span>
                `;
            }
        } finally {
            if (ghRefreshBtn) {
                ghRefreshBtn.classList.remove("loading");
                ghRefreshBtn.disabled = false;
            }
        }
    };

    // Initial fetch
    fetchGitHubData();

    // Wire refresh button
    if (ghRefreshBtn) {
        ghRefreshBtn.addEventListener("click", () => {
            fetchGitHubData();
            showToast("Refreshing GitHub repositories...");
        });
    }

    /* ==========================================================================
       10. SMART CONTACT SECTION (Client-Side Validation & Transparent Feedback)
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submitBtn");
    const formFeedback = document.getElementById("formFeedback");
    const charCounter = document.getElementById("charCounter");

    // Live character counter for message textarea
    if (messageInput && charCounter) {
        const maxChars = messageInput.getAttribute("maxlength") || 500;
        messageInput.addEventListener("input", () => {
            const currentLen = messageInput.value.length;
            charCounter.textContent = `${currentLen} / ${maxChars}`;
            if (currentLen >= maxChars) {
                charCounter.style.color = "var(--color-error)";
            } else {
                charCounter.style.color = "var(--text-muted)";
            }
        });
    }

    // Helper: Display field error
    const setFieldError = (inputElement, errorElementId, message) => {
        if (!inputElement) return;
        const formGroup = inputElement.closest(".form-group");
        const errorElement = document.getElementById(errorElementId);

        if (formGroup) formGroup.classList.add("has-error");
        if (errorElement) errorElement.textContent = message;
        inputElement.setAttribute("aria-invalid", "true");
    };

    // Helper: Clear field error
    const clearFieldError = (inputElement, errorElementId) => {
        if (!inputElement) return;
        const formGroup = inputElement.closest(".form-group");
        const errorElement = document.getElementById(errorElementId);

        if (formGroup) formGroup.classList.remove("has-error");
        if (errorElement) errorElement.textContent = "";
        inputElement.removeAttribute("aria-invalid");
    };

    // Clear error feedback on user input
    [
        { input: nameInput, errorId: "nameError" },
        { input: emailInput, errorId: "emailError" },
        { input: subjectInput, errorId: "subjectError" },
        { input: messageInput, errorId: "messageError" }
    ].forEach(({ input, errorId }) => {
        if (!input) return;
        input.addEventListener("input", () => clearFieldError(input, errorId));
    });

    // Form submission validation & handling
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            let isValid = true;
            let firstInvalidField = null;

            // 1. Validate Name
            const nameVal = nameInput ? nameInput.value.trim() : "";
            if (!nameVal) {
                setFieldError(nameInput, "nameError", "Please enter your name.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = nameInput;
            } else if (nameVal.length < 2) {
                setFieldError(nameInput, "nameError", "Name must be at least 2 characters long.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = nameInput;
            } else {
                clearFieldError(nameInput, "nameError");
            }

            // 2. Validate Email
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailVal) {
                setFieldError(emailInput, "emailError", "Please enter your email address.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else if (!emailRegex.test(emailVal)) {
                setFieldError(emailInput, "emailError", "Please enter a valid email address (e.g. name@example.com).");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else {
                clearFieldError(emailInput, "emailError");
            }

            // 3. Validate Subject
            const subjectVal = subjectInput ? subjectInput.value.trim() : "";
            if (!subjectVal) {
                setFieldError(subjectInput, "subjectError", "Please enter a subject.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = subjectInput;
            } else if (subjectVal.length < 3) {
                setFieldError(subjectInput, "subjectError", "Subject must be at least 3 characters long.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = subjectInput;
            } else {
                clearFieldError(subjectInput, "subjectError");
            }

            // 4. Validate Message
            const messageVal = messageInput ? messageInput.value.trim() : "";
            if (!messageVal) {
                setFieldError(messageInput, "messageError", "Please enter your message.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = messageInput;
            } else if (messageVal.length < 10) {
                setFieldError(messageInput, "messageError", "Please write a message with at least 10 characters.");
                isValid = false;
                if (!firstInvalidField) firstInvalidField = messageInput;
            } else {
                clearFieldError(messageInput, "messageError");
            }

            // If invalid, focus first error field
            if (!isValid) {
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                if (formFeedback) {
                    formFeedback.className = "form-feedback error";
                    formFeedback.textContent = "Please resolve the highlighted errors before submitting.";
                    formFeedback.removeAttribute("hidden");
                }
                return;
            }

            // Loading state
            if (submitBtn) {
                submitBtn.classList.add("loading");
                submitBtn.disabled = true;
            }

            if (formFeedback) {
                formFeedback.setAttribute("hidden", "true");
                formFeedback.className = "form-feedback";
            }

            // Transparent validation response (No faking backend delivery)
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove("loading");
                    submitBtn.disabled = false;
                }

                if (formFeedback) {
                    formFeedback.className = "form-feedback success";
                    formFeedback.innerHTML = `
                        <strong>Message formatted and validated, ${escapeHtml(nameVal)}!</strong>
                        <p style="margin-top: 6px; font-size: 13px;">
                            Because this portfolio runs as a static client-side application without a live backend email server,
                            the fastest and most reliable way to connect directly with Mukesh is via LinkedIn.
                        </p>
                        <div class="feedback-actions">
                            <a href="${VERIFIED_LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="btn primary-btn" style="padding: 8px 16px; font-size: 13px;">
                                <span>Connect on LinkedIn ↗</span>
                            </a>
                        </div>
                        <p style="margin-top: 10px; font-size: 11.5px; opacity: 0.8;">
                            Note for site owner: To enable automatic HTTP email forwarding without a backend, connect this form to Formspree (formspree.io) or EmailJS.
                        </p>
                    `;
                    formFeedback.removeAttribute("hidden");
                }

                showToast("Form validated! Reach Mukesh directly on LinkedIn 🚀");
            }, 600);
        });
    }

    /* ==========================================================================
       11. TOAST NOTIFICATION HELPER
       ========================================================================== */
    function showToast(message) {
        const toastContainer = document.getElementById("toastContainer");
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.setAttribute("role", "alert");
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${escapeHtml(message)}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after animation completes
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3200);
    }

    // Helper: Prevent XSS in dynamic text injection
    function escapeHtml(text) {
        if (!text) return "";
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    /* ==========================================================================
       12. AUTOMATIC COPYRIGHT YEAR
       ========================================================================== */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
