/* ==========================================================================
   SCRIPT.JS - MATERIALITY CONSULTING 2.0
   Lógica Vanilla JS (Optimizado < 20KB)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ECO MODE / DARK THEME TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial theme
    htmlElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = htmlElement.getAttribute('data-theme');
            let newTheme = 'light';
            
            if (theme === 'light') {
                newTheme = 'dark';
            }
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Visual feedback animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'translateY(-1px)';
            }, 150);
        });
    }

    // 2. MOBILE NAVIGATION MENU
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. SCROLL ACTIVE LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for sticky header
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*=${sectionId}]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);

    // 4. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Submit Button loading animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API Request (Sustainable/Serverless Friendly)
            setTimeout(() => {
                // Success feedback
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                console.log('Eco-Submission Received:', { name, email, message });
                contactForm.reset();
            }, 1200);
        });
    }

    // 5. ANIMATING STAT NUMBERS (Intersection Observer)
    const statNum = document.getElementById('statNum');
    
    if (statNum) {
        let animated = false;
        
        const countUp = (element, targetValue) => {
            let current = 0;
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / targetValue));
            
            const timer = setInterval(() => {
                current += 1;
                element.textContent = `${current}+`;
                if (current >= targetValue) {
                    element.textContent = `${targetValue}+`;
                    clearInterval(timer);
                }
            }, stepTime);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    countUp(statNum, 30);
                    animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statNum);
    }

    // 6. ECO-CONSCIOUS EXTERNAL LINK PREFETCHING (PRE-WARM ONLY ON HOVER/INTENT)
    function prewarmConnection(e) {
        const link = e.currentTarget;
        const href = link.href;
        if (href && href.startsWith('http')) {
            const urlObj = new URL(href);
            const domain = urlObj.origin;
            
            if (!document.querySelector(`link[href="${domain}"]`)) {
                const linkPrefetch = document.createElement('link');
                linkPrefetch.rel = 'preconnect';
                linkPrefetch.href = domain;
                document.head.appendChild(linkPrefetch);
                console.log(`Preconnecting to ${domain} on intent`);
            }
        }
    }

    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('mouseenter', prewarmConnection);
        link.addEventListener('focusin', prewarmConnection);
    });

    // 7. RESOURCE DYNAMIC HYDRATION, SEARCH AND FILTERING
    const resourcesGrid = document.getElementById('resourcesGrid');
    const resourceSearch = document.getElementById('resourceSearch');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (resourcesGrid) {
        let resourcesData = [];
        let currentFilter = 'all';
        let searchQuery = '';
        const ITEMS_PER_PAGE = 4;
        let displayedCount = ITEMS_PER_PAGE;
        
        const createResourceCardHTML = (item) => {
            const formatInfo = {
                read: {
                    borderClass: 'card-read',
                    badgeClass: 'badge-edu',
                    badgeText: 'Read',
                    linkText: 'Read Resource',
                    svgPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                },
                watch: {
                    borderClass: 'card-watch',
                    badgeClass: 'badge-tool',
                    badgeText: 'Watch',
                    linkText: 'Play Video',
                    svgPath: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                },
                listen: {
                    borderClass: 'card-listen',
                    badgeClass: 'badge-pol',
                    badgeText: 'Listen',
                    linkText: 'Listen Podcast',
                    svgPath: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                }
            };
            
            const format = formatInfo[item.format] || formatInfo.read;
            const cleanDate = item.last_checked ? new Date(item.last_checked).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}) : 'May 2026';
            
            return `
                <article class="resource-card ${format.borderClass}" data-cat="${item.format}">
                    <div class="resource-header">
                        <div class="format-indicator">
                            <svg class="format-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${format.svgPath}" />
                            </svg>
                            <span class="resource-badge ${format.badgeClass}">${format.badgeText}</span>
                        </div>
                        ${item.verified ? `<span class="verified-label" title="Verified active resource"><span class="check-icon">✓</span> Verified</span>` : ''}
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="resource-footer">
                        <a href="${item.url}" target="_blank" class="resource-link" aria-label="Open ${item.title} in new window" rel="noopener">
                            ${format.linkText} <span class="ext-icon">🔗</span>
                        </a>
                        <time datetime="${item.last_checked || '2026-05-30'}" class="update-time">Updated: ${cleanDate}</time>
                    </div>
                </article>
            `;
        };
        
        const filterAndRender = () => {
            const filtered = resourcesData.filter(item => {
                const matchesCategory = currentFilter === 'all' || item.format === currentFilter;
                const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                      item.description.toLowerCase().includes(searchQuery);
                return matchesCategory && matchesSearch;
            });
            
            if (filtered.length === 0) {
                resourcesGrid.innerHTML = `
                    <div class="no-results text-center" style="grid-column: 1 / -1; padding: 40px 0;">
                        <span class="badge" style="background: rgba(229,90,43,0.1); color: var(--color-primary-dark);">No matches</span>
                        <p>No resources found matching "${searchQuery}" in this format.</p>
                    </div>
                `;
                return;
            }
            
            const slice = filtered.slice(0, displayedCount);
            let cardsHTML = slice.map(createResourceCardHTML).join('');
            
            // If there are more items, append a premium Load More button that spans the columns
            if (displayedCount < filtered.length) {
                cardsHTML += `
                    <div class="load-more-container text-center" style="grid-column: 1 / -1; padding: 30px 0;">
                        <button class="btn btn-secondary" id="btnLoadMore" style="padding: 12px 30px; font-size: 0.95rem; font-weight: 600;">
                            Load More Resources
                        </button>
                    </div>
                `;
            }
            
            resourcesGrid.innerHTML = cardsHTML;
            
            // Re-bind preconnect to new links
            const newLinks = resourcesGrid.querySelectorAll('a[target="_blank"]');
            newLinks.forEach(link => {
                link.addEventListener('mouseenter', prewarmConnection);
                link.addEventListener('focusin', prewarmConnection);
            });
            
            // Bind Load More button click
            const btnLoadMore = document.getElementById('btnLoadMore');
            if (btnLoadMore) {
                btnLoadMore.addEventListener('click', () => {
                    displayedCount += ITEMS_PER_PAGE;
                    filterAndRender();
                });
            }
        };
        
        const renderMobileAccordions = () => {
            const mobileAccordionHub = document.getElementById('mobileAccordionHub');
            if (!mobileAccordionHub) return;
            
            const categories = {
                read: { title: 'Read (Reports & Standards)', items: [] },
                watch: { title: 'Watch (Videos & Lectures)', items: [] },
                listen: { title: 'Listen (Podcasts & Audio)', items: [] }
            };
            
            const formatIcons = {
                read: `<svg class="category-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style="display:inline-block; vertical-align:middle; margin-right:8px; position:relative; top:-1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
                watch: `<svg class="category-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style="display:inline-block; vertical-align:middle; margin-right:8px; position:relative; top:-1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
                listen: `<svg class="category-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style="display:inline-block; vertical-align:middle; margin-right:8px; position:relative; top:-1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>`
            };
            
            resourcesData.forEach(item => {
                if (categories[item.format]) {
                    categories[item.format].items.push(item);
                }
            });
            
            let accordionHTML = '';
            
            Object.keys(categories).forEach((key) => {
                const cat = categories[key];
                const count = cat.items.length;
                const lastCheckedDate = cat.items.length > 0 ? cat.items[0].last_checked || '2026-05-30' : '2026-05-30';
                
                accordionHTML += `
                    <div class="accordion-item">
                        <button class="accordion-header" data-target="accordion-content-${key}">
                            <span>${formatIcons[key]} ${cat.title} <span class="badge">${count} resources</span></span>
                            <span class="accordion-toggle">▼</span>
                        </button>
                        <div class="accordion-content" id="accordion-content-${key}">
                            <div class="accordion-body">
                                ${cat.items.map(item => `
                                    <div class="resource-item" onclick="window.open('${item.url}', '_blank')">
                                        <div class="resource-item-icon-wrap">
                                            ${formatIcons[key]}
                                        </div>
                                        <div class="resource-item-text">
                                            <div class="resource-item-title">${item.title}</div>
                                            <div class="resource-item-desc">${item.description}</div>
                                            <div class="resource-item-meta">
                                                <span class="verified-badge">✓ Verified</span> • 
                                                <span>Audited: ${lastCheckedDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            mobileAccordionHub.innerHTML = accordionHTML;
            
            // Bind accordion toggling
            const headers = mobileAccordionHub.querySelectorAll('.accordion-header');
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const targetId = header.getAttribute('data-target');
                    const content = document.getElementById(targetId);
                    
                    const allContents = mobileAccordionHub.querySelectorAll('.accordion-content');
                    const allHeaders = mobileAccordionHub.querySelectorAll('.accordion-header');
                    
                    allContents.forEach(c => {
                        if (c.id !== targetId) {
                            c.classList.remove('open');
                            c.style.maxHeight = null;
                        }
                    });
                    
                    allHeaders.forEach(h => {
                        if (h !== header) {
                            h.classList.remove('active');
                        }
                    });
                    
                    header.classList.toggle('active');
                    content.classList.toggle('open');
                    
                    if (content.classList.contains('open')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    } else {
                        content.style.maxHeight = null;
                    }
                });
            });
        };
        
        // Inlined resources list to serve as local/CORS/offline fallback
        const fallbackResources = [
            {
                "title": "UN Sustainable Development Goals",
                "url": "https://sdgs.un.org/",
                "description": "Global framework of 17 interconnected goals addressing climate change, circular resources, and social inequities to guide corporate policies.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "read"
            },
            {
                "title": "Ellen MacArthur Foundation",
                "url": "https://ellenmacarthurfoundation.org/",
                "description": "Leading global advocate for the circular economy, offering research, design guidelines, and circular transition framework resources.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "read"
            },
            {
                "title": "World Resources Institute (WRI)",
                "url": "https://www.wri.org/",
                "description": "Global research organization providing datasets, greenhouse gas calculators, and reports mapping environmental policy and economic well-being.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "read"
            },
            {
                "title": "IFRS - SASB Standards",
                "url": "https://www.sasb.org/",
                "description": "Industry-specific sustainability disclosure standards outlining the specific subset of environmental issues material to corporate valuation.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "read"
            },
            {
                "title": "B Corp Certification Guidelines",
                "url": "https://bcorporation.net/",
                "description": "Framework defining the verified social and environmental performance standards, transparency metrics, and legal duty changes for business audits.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "read"
            },
            {
                "title": "TED Talk: The Investment Logic for Sustainability",
                "url": "https://www.youtube.com/watch?v=rpOwTspdwkI&t=402s",
                "description": "Chris McKnett makes the financial business case for sustainability, demonstrating why institutional investors must look at ESG data.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "watch"
            },
            {
                "title": "TED Institute: The Dark Side of Storytelling",
                "url": "https://www.youtube.com/watch?v=3SUIiF-ifIM&t=29s",
                "description": "Suzanne Duncan challenges standard narrative-based ESG reporting, highlighting why objective, financial metrics are vital.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "watch"
            },
            {
                "title": "Mark Carney: Breaking the Tragedy of the Horizon",
                "url": "https://www.youtube.com/watch?v=V5c-eqNxeSQ",
                "description": "Historic address by the former Governor of the Bank of England on systemic climate change liability, transition paths, and finance.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "watch"
            },
            {
                "title": "SASB: Markets Make the World Go Round",
                "url": "https://www.youtube.com/watch?v=RM23v6Fax80",
                "description": "Animated educational breakdown illustrating how financial capital markets act as powerful drivers for sustainability accounting standards.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "watch"
            },
            {
                "title": "GreenBiz 350 Podcast",
                "url": "https://www.greenbiz.com/350",
                "description": "Weekly leading corporate sustainability broadcast checking news, supply chain circularity, and environmental regulations.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "listen"
            },
            {
                "title": "Bloomberg Surveillance",
                "url": "https://www.bloomberg.com/podcasts/surveillance",
                "description": "Global economic surveillance analysis, providing interviews with directors about ESG integrations, green bonds, and SEC rulings.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "listen"
            },
            {
                "title": "PRI Podcasts (Libsyn Channel)",
                "url": "http://pripodcasts.libsyn.com/",
                "description": "Conversations with institutional allocators on the actual integration of ESG factors into diverse equity and debt portfolios.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "listen"
            },
            {
                "title": "BBC Radio: Costing the Earth",
                "url": "http://www.bbc.co.uk/programmes/b006r4wn/episodes/downloads",
                "description": "BBC environmental audio show evaluating world resources boundaries, policy loopholes, and carbon footprints audit schemes.",
                "verified": true,
                "last_checked": "2026-05-30",
                "format": "listen"
            }
        ];

        // Fetch JSON resources database
        fetch('../assets/data/external-sources.json')
            .then(res => {
                if (!res.ok) throw new Error('HTTP failure loading resources data');
                return res.json();
            })
            .then(data => {
                resourcesData = data;
                filterAndRender();
                renderMobileAccordions();
            })
            .catch(err => {
                console.warn('CORS or fetch error, resolving to local database fallback:', err);
                // Hydrate using inlined data so file:// local users can view resource items perfectly
                resourcesData = fallbackResources;
                filterAndRender();
                renderMobileAccordions();
            });
            
        // Search Input listener
        if (resourceSearch) {
            resourceSearch.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                displayedCount = ITEMS_PER_PAGE; // Reset list pagination
                filterAndRender();
            });
        }
        
        // Tab Buttons listeners
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-category') || 'all';
                displayedCount = ITEMS_PER_PAGE; // Reset list pagination
                filterAndRender();
            });
        });
    }
});
