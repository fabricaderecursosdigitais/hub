// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load featured blog posts from localStorage
function loadFeaturedPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    let posts = [];
    
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
        console.log('✅ Posts carregados do localStorage para index.html:', posts.length, 'posts');
    } else if (typeof blogPosts !== 'undefined') {
        posts = blogPosts;
        console.log('✅ Posts carregados do blog-data.js para index.html:', posts.length, 'posts');
    }
    
    // Sort all posts by date (most recent first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Get featured post (if any)
    const featuredPost = sortedPosts.find(post => post.featured);
    
    let displayPosts = [];
    
    if (featuredPost) {
        // 1 featured post + 2 latest posts (excluding the featured one)
        displayPosts.push(featuredPost);
        const latestPosts = sortedPosts
            .filter(post => post.slug !== featuredPost.slug)
            .slice(0, 2);
        displayPosts = displayPosts.concat(latestPosts);
        console.log('✅ Exibindo: 1 post em destaque + 2 últimos posts');
    } else {
        // Just get the 3 most recent posts
        displayPosts = sortedPosts.slice(0, 3);
        console.log('✅ Exibindo: 3 últimos posts');
    }
    
    return displayPosts;
}

// Category colors mapping
const categoryColorsIndex = {
    'academia-digital': 'bg-blue-600',
    'design-grafico': 'bg-purple-600',
    'audiovisual': 'bg-red-600',
    'analise-dados': 'bg-green-600'
};

// Render featured posts in the index page
function renderFeaturedPosts() {
    const container = document.getElementById('latestPosts');
    if (!container) return;
    
    const featuredPosts = loadFeaturedPosts();
    
    if (featuredPosts.length === 0) {
        console.log('ℹ️ Nenhum post em destaque encontrado');
        return; // Keep the hardcoded projects if no featured posts
    }
    
    container.innerHTML = featuredPosts.map(post => `
        <div class="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden">
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                    <span class="${categoryColorsIndex[post.category] || 'bg-blue-600'} text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${post.categoryLabel}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900">${post.title}</h3>
                <p class="text-gray-600 mb-4 leading-relaxed">${post.excerpt}</p>
                
                ${post.tags && post.tags.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${post.tags.slice(0, 3).map(tag => `
                            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${tag}</span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <a href="post.html?slug=${post.slug}" class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-semibold cursor-pointer bg-transparent border-none">
                    Ver mais
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Posts em destaque renderizados:', featuredPosts.length);
}

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                area: document.getElementById('area').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Reset form
            this.reset();
        });
    }
});

// Smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
});

// Render featured posts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedPosts();
});

// Scroll to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});