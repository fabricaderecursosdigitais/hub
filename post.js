// Post page functionality

// Load posts from localStorage or fallback to blog-data.js
function loadBlogPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        return JSON.parse(savedPosts);
    } else if (typeof blogPosts !== 'undefined') {
        // Salvar no localStorage na primeira vez
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        return blogPosts;
    }
    return [];
}

// Category color mapping
const categoryColors = {
    'academia-digital': {
        bg: 'bg-blue-100',
        text: 'text-blue-700'
    },
    'design-grafico': {
        bg: 'bg-purple-100',
        text: 'text-purple-700'
    },
    'audiovisual': {
        bg: 'bg-red-100',
        text: 'text-red-700'
    },
    'analise-dados': {
        bg: 'bg-green-100',
        text: 'text-green-700'
    }
};

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Render post
function renderPost() {
    // Get post from localStorage
    const postData = localStorage.getItem('currentPost');
    if (!postData) {
        window.location.href = 'blog.html';
        return;
    }
    
    const post = JSON.parse(postData);
    console.log('📝 Post carregado:', post); // Debug
    const colors = categoryColors[post.category];
    
    // Update page title
    document.title = `${post.title} - Blog de Inovação Educacional`;
    
    // Render header
    document.getElementById('postHeader').innerHTML = `
        <div class="mb-4">
            <span class="px-4 py-2 ${colors.bg} ${colors.text} rounded-full font-semibold">
                ${post.categoryLabel}
            </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900">${post.title}</h1>
        <div class="flex flex-wrap items-center gap-4 text-gray-600">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                    ${post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p class="font-semibold text-gray-900">${post.author}</p>
                    <p class="text-sm">${post.authorRole}</p>
                </div>
            </div>
            <span>•</span>
            <span>${formatDate(post.date)}</span>
            <span>•</span>
            <span>${post.readTime} de leitura</span>
        </div>
    `;
    
    // Render image
    document.getElementById('postImage').innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="w-full h-96 object-cover">
    `;
    
    // Render content
    document.getElementById('postContent').innerHTML = post.content;
    
    // Render tags
    document.getElementById('postTags').innerHTML = `
        <h3 class="font-semibold text-gray-900 mb-3">Tags:</h3>
        <div class="flex flex-wrap gap-2">
            ${post.tags.map(tag => `
                <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    #${tag}
                </span>
            `).join('')}
        </div>
    `;
    
    // Render author info
    document.getElementById('authorInfo').innerHTML = `
        <div class="flex items-start gap-4">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
                ${post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">${post.author}</h3>
                <p class="text-blue-600 mb-2">${post.authorRole}</p>
                <p class="text-gray-700">
                    Especialista em ${post.categoryLabel.toLowerCase()}, ${post.author.split(' ')[0]} tem mais de 10 anos de experiência 
                    no Hospital Albert Einstein desenvolvendo soluções inovadoras para educação médica.
                </p>
            </div>
        </div>
    `;
    
    // Render related posts
    renderRelatedPosts(post);
}

// Render related posts
function renderRelatedPosts(currentPost) {
    const relatedPosts = loadBlogPosts()
        .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
        .slice(0, 3);
    
    const relatedPostsHtml = relatedPosts.map(post => {
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
                    <h3 class="text-xl font-bold mb-3 text-gray-900 line-clamp-2">${post.title}</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">${post.excerpt}</p>
                    <div class="flex items-center gap-3 text-sm text-gray-600">
                        <span>${formatDate(post.date)}</span>
                        <span>•</span>
                        <span>${post.readTime}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    document.getElementById('relatedPosts').innerHTML = relatedPostsHtml || '<p class="text-gray-600 col-span-3">Nenhum post relacionado encontrado.</p>';
}

// Open another post
function openPost(postId) {
    const post = loadBlogPosts().find(p => p.id === postId);
    if (!post) return;
    
    localStorage.setItem('currentPost', JSON.stringify(post));
    window.location.reload();
}

// Share functions
function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnTwitter() {
    const postData = localStorage.getItem('currentPost');
    const post = JSON.parse(postData);
    const url = window.location.href;
    const text = `${post.title} - Blog de Inovação Educacional`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copiado para a área de transferência!');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Render post
    renderPost();
});