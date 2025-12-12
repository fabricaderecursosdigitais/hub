// Blog functionality
let currentFilter = 'todas';
let postsData = [];

// Load posts from localStorage or fallback to blog-data.js
function loadBlogPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        postsData = JSON.parse(savedPosts);
        console.log('✅ Posts carregados do localStorage:', postsData.length, 'posts');
    } else if (typeof blogPosts !== 'undefined') {
        postsData = blogPosts;
        // Salvar no localStorage na primeira vez
        localStorage.setItem('blogPosts', JSON.stringify(postsData));
        console.log('✅ Posts inicializados do blog-data.js:', postsData.length, 'posts');
    }
    return postsData;
}

// Category color mapping
const categoryColors = {
    'academia-digital': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        hover: 'hover:bg-blue-200'
    },
    'design-grafico': {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        hover: 'hover:bg-purple-200'
    },
    'audiovisual': {
        bg: 'bg-red-100',
        text: 'text-red-700',
        hover: 'hover:bg-red-200'
    },
    'analise-dados': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        hover: 'hover:bg-green-200'
    }
};

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Create post card HTML
function createPostCard(post) {
    const colors = categoryColors[post.category];
    
    return `
        <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" onclick="openPost(${post.id})">
            <div class="relative h-48 overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold">
                        ${post.categoryLabel}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span>${formatDate(post.date)}</span>
                    <span>•</span>
                    <span>${post.readTime} de leitura</span>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900 line-clamp-2">${post.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${post.excerpt}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            ${post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-900">${post.author}</p>
                            <p class="text-xs text-gray-600">${post.authorRole}</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </article>
    `;
}

// Create featured post HTML
function createFeaturedPost(post) {
    const colors = categoryColors[post.category];
    
    return `
        <div class="max-w-7xl mx-auto px-6">
            <div class="bg-white rounded-3xl overflow-hidden shadow-2xl">
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="relative h-96 md:h-auto">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                        <div class="absolute top-6 left-6">
                            <span class="px-4 py-2 ${colors.bg} ${colors.text} rounded-full font-semibold">
                                ⭐ Destaque
                            </span>
                        </div>
                    </div>
                    <div class="p-8 md:p-12 flex flex-col justify-center">
                        <div class="mb-4">
                            <span class="px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold">
                                ${post.categoryLabel}
                            </span>
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">${post.title}</h2>
                        <p class="text-lg text-gray-600 mb-6">${post.excerpt}</p>
                        <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
                            <span>${formatDate(post.date)}</span>
                            <span>•</span>
                            <span>${post.readTime} de leitura</span>
                        </div>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                                ${post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p class="font-semibold text-gray-900">${post.author}</p>
                                <p class="text-sm text-gray-600">${post.authorRole}</p>
                            </div>
                        </div>
                        <button onclick="openPost(${post.id})" class="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all font-semibold inline-flex items-center gap-2 w-fit">
                            Ler artigo completo
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render posts
function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const featuredSection = document.getElementById('featuredPost');
    const emptyState = document.getElementById('emptyState');
    
    // Filter posts
    let filteredPosts = currentFilter === 'todas' 
        ? loadBlogPosts() 
        : loadBlogPosts().filter(post => post.category === currentFilter);
    
    // Show/hide empty state
    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        featuredSection.innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }
    
    // Render featured post (only if filter is 'todas')
    if (currentFilter === 'todas') {
        const featuredPost = filteredPosts.find(post => post.featured);
        if (featuredPost) {
            featuredSection.innerHTML = createFeaturedPost(featuredPost);
            // Remove featured post from grid
            filteredPosts = filteredPosts.filter(post => !post.featured);
        }
    } else {
        featuredSection.innerHTML = '';
    }
    
    // Render posts grid
    postsGrid.innerHTML = filteredPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(post => createPostCard(post))
        .join('');
}

// Filter posts
function filterPosts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    renderPosts();
}

// Open post in modal or new page
function openPost(postId) {
    const post = loadBlogPosts().find(p => p.id === postId);
    if (!post) return;
    
    // Store post in localStorage and open post page
    localStorage.setItem('currentPost', JSON.stringify(post));
    window.location.href = 'post.html';
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            alert(`Obrigado por se inscrever! Você receberá nossas novidades em ${email}`);
            this.reset();
        });
    }
    
    // Set current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Initial render
    renderPosts();
});