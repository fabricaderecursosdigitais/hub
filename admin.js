// Admin Panel Functionality
let posts = [];

// Category labels
const categoryLabels = {
    'academia-digital': 'Academia Digital',
    'design-grafico': 'Design Gráfico',
    'audiovisual': 'Audiovisual',
    'analise-dados': 'Análise de Dados'
};

// Category colors
const categoryColors = {
    'academia-digital': 'bg-blue-100 text-blue-700',
    'design-grafico': 'bg-purple-100 text-purple-700',
    'audiovisual': 'bg-red-100 text-red-700',
    'analise-dados': 'bg-green-100 text-green-700'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    updateStats();
    renderPosts();
    
    // Set today's date as default
    document.getElementById('postDate').valueAsDate = new Date();
    
    // Form submit
    document.getElementById('createPostForm').addEventListener('submit', handleSubmit);
});

// Load posts from blog-data.js or localStorage
function loadPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    } else if (typeof blogPosts !== 'undefined') {
        posts = [...blogPosts];
        savePosts();
    }
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    updateBlogDataFile();
}

// Update stats
function updateStats() {
    document.getElementById('totalPosts').textContent = posts.length;
    document.getElementById('featuredCount').textContent = posts.filter(p => p.featured).length;
    
    if (posts.length > 0) {
        // Use updatedAt if available, otherwise use date
        const lastDate = new Date(Math.max(...posts.map(p => new Date(p.updatedAt || p.date))));
        document.getElementById('lastUpdate').textContent = lastDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
}

// Render posts list
function renderPosts() {
    const container = document.getElementById('postsList');
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <p class="text-xl">Nenhum post publicado ainda</p>
            </div>
        `;
        return;
    }
    
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sortedPosts.map(post => `
        <div class="admin-card border border-gray-200 rounded-xl p-6 flex items-start gap-6 bg-white">
            <img src="${post.image}" alt="${post.title}" class="w-32 h-32 object-cover rounded-lg flex-shrink-0">
            
            <div class="flex-1">
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-3 py-1 ${categoryColors[post.category]} rounded-full text-sm font-semibold">
                                ${post.categoryLabel}
                            </span>
                            ${post.featured ? '<span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">⭐ Destaque</span>' : ''}
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">${post.title}</h3>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="editPost(${post.id})" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button onclick="deletePost(${post.id})" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Excluir">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <p class="text-gray-600 mb-3">${post.excerpt}</p>
                
                <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 ${new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    <span>👤 ${post.author}</span>
                    <span>⏱️ ${post.readTime}</span>
                    <span class="text-xs text-gray-400">ID: ${post.id}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle form visibility
function toggleForm() {
    const form = document.getElementById('postForm');
    const btn = document.getElementById('toggleFormBtn');
    
    if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
        btn.textContent = '❌ Fechar Formulário';
        form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        form.classList.add('hidden');
        btn.textContent = '➕ Criar Novo Post';
        cancelForm();
    }
}

// Cancel form
function cancelForm() {
    document.getElementById('createPostForm').reset();
    document.getElementById('postId').value = '';
    document.getElementById('postForm').classList.add('hidden');
    document.getElementById('toggleFormBtn').textContent = '➕ Criar Novo Post';
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();
    
    const postId = document.getElementById('postId').value;
    const isEdit = postId !== '';
    
    // Get tags and convert to array
    const tagsInput = document.getElementById('postTags').value;
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    const formData = {
        id: isEdit ? parseInt(postId) : getNextId(),
        title: document.getElementById('postTitle').value,
        slug: createSlug(document.getElementById('postTitle').value),
        category: document.getElementById('postCategory').value,
        categoryLabel: categoryLabels[document.getElementById('postCategory').value],
        excerpt: document.getElementById('postExcerpt').value,
        content: document.getElementById('postContent').value,
        author: document.getElementById('postAuthor').value,
        authorRole: document.getElementById('postAuthorRole').value,
        date: document.getElementById('postDate').value,
        readTime: document.getElementById('postReadTime').value,
        image: document.getElementById('postImage').value,
        featured: document.getElementById('postFeatured').checked,
        tags: tags,
        updatedAt: new Date().toISOString() // Adiciona timestamp de atualização
    };
    
    if (isEdit) {
        // Update existing post
        const index = posts.findIndex(p => p.id === parseInt(postId));
        if (index !== -1) {
            // Mantém a data de criação original se existir
            if (posts[index].createdAt) {
                formData.createdAt = posts[index].createdAt;
            }
            posts[index] = formData;
            
            // Show success message with link to blog
            const confirmGo = confirm('✅ Post atualizado com sucesso!\n\n🌐 Deseja visualizar no blog agora?');
            if (confirmGo) {
                window.open('blog.html', '_blank');
            }
        }
    } else {
        // Create new post
        formData.createdAt = new Date().toISOString(); // Adiciona timestamp de criação
        posts.push(formData);
        
        // Show success message with link to blog
        const confirmGo = confirm('✅ Post criado com sucesso!\n\n🌐 Deseja visualizar no blog agora?');
        if (confirmGo) {
            window.open('blog.html', '_blank');
        }
    }
    
    savePosts();
    updateStats();
    renderPosts();
    cancelForm();
}

// Get next available ID
function getNextId() {
    if (posts.length === 0) return 1;
    return Math.max(...posts.map(p => p.id)) + 1;
}

// Edit post
function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    // Show form
    document.getElementById('postForm').classList.remove('hidden');
    document.getElementById('toggleFormBtn').textContent = '❌ Fechar Formulário';
    
    // Fill form
    document.getElementById('postId').value = post.id;
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postExcerpt').value = post.excerpt;
    document.getElementById('postContent').value = post.content;
    document.getElementById('postAuthor').value = post.author;
    document.getElementById('postAuthorRole').value = post.authorRole;
    document.getElementById('postDate').value = post.date;
    document.getElementById('postReadTime').value = post.readTime;
    document.getElementById('postImage').value = post.image;
    document.getElementById('postFeatured').checked = post.featured || false;
    document.getElementById('postTags').value = (post.tags && post.tags.length > 0) ? post.tags.join(', ') : '';
    
    // Scroll to form
    document.getElementById('postForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Delete post
function deletePost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    const confirmDelete = confirm(`❌ Tem certeza que deseja excluir o post:\n\n"${post.title}"?\n\nEsta ação não pode ser desfeita.`);
    
    if (confirmDelete) {
        posts = posts.filter(p => p.id !== id);
        savePosts();
        updateStats();
        renderPosts();
        alert('✅ Post excluído com sucesso!');
    }
}

// Export data to copy to blog-data.js
function exportData() {
    const jsCode = `// Blog Posts Data
const blogPosts = ${JSON.stringify(posts, null, 4)};`;
    
    // Create a download
    const blob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Arquivo blog-data.js exportado!\n\n📝 Substitua o arquivo blog-data.js atual por este novo arquivo.');
}

// Update blog-data.js content (visual helper)
function updateBlogDataFile() {
    // This function shows what should be in blog-data.js
    console.log('%c📝 Atualize seu arquivo blog-data.js com:', 'background: #2563eb; color: white; padding: 8px; font-weight: bold;');
    console.log(`const blogPosts = ${JSON.stringify(posts, null, 2)};`);
}

// ========== EDITOR FORMATTING FUNCTIONS ==========

// Insert formatted text
function insertFormat(tag, placeholder) {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const formatted = `<${tag}>${textToInsert}</${tag}>\n`;
    
    textarea.value = textarea.value.substring(0, start) + formatted + textarea.value.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + tag.length + 2, start + tag.length + 2 + textToInsert.length);
}

// Insert list
function insertList(type) {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    
    const listHTML = `<${type}>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</${type}>\n`;
    
    textarea.value = textarea.value.substring(0, start) + listHTML + textarea.value.substring(start);
    textarea.focus();
}

// Insert link
function insertLink() {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const url = prompt('Digite a URL do link:', 'https://');
    if (!url) return;
    
    const linkText = selectedText || prompt('Digite o texto do link:', 'Clique aqui');
    if (!linkText) return;
    
    const linkHTML = `<a href="${url}" target="_blank" class="text-blue-600 hover:underline font-semibold">${linkText}</a>`;
    
    textarea.value = textarea.value.substring(0, start) + linkHTML + textarea.value.substring(end);
    textarea.focus();
}

// Insert image
function insertImage() {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    
    const imageUrl = prompt('Digite a URL da imagem:', 'https://');
    if (!imageUrl) return;
    
    const altText = prompt('Digite o texto alternativo (alt):', 'Descrição da imagem');
    
    const imageHTML = `<img src="${imageUrl}" alt="${altText}" class="w-full rounded-2xl my-6 shadow-lg" />\n`;
    
    textarea.value = textarea.value.substring(0, start) + imageHTML + textarea.value.substring(start);
    textarea.focus();
}

// Insert button
function insertButton() {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    
    const buttonText = prompt('Digite o texto do botão:', 'Clique aqui');
    if (!buttonText) return;
    
    const buttonUrl = prompt('Digite a URL do botão:', 'https://');
    if (!buttonUrl) return;
    
    const buttonHTML = `<a href="${buttonUrl}" target="_blank" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all my-4">${buttonText}</a>\n`;
    
    textarea.value = textarea.value.substring(0, start) + buttonHTML + textarea.value.substring(start);
    textarea.focus();
}

// Insert quote
function insertQuote() {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    const quoteText = selectedText || prompt('Digite a citação:', 'Texto da citação aqui');
    if (!quoteText) return;
    
    const quoteHTML = `<blockquote class="border-l-4 border-blue-600 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg italic text-gray-700">
    <p>${quoteText}</p>
</blockquote>\n`;
    
    textarea.value = textarea.value.substring(0, start) + quoteHTML + textarea.value.substring(end);
    textarea.focus();
}

// Insert divider
function insertDivider() {
    const textarea = document.getElementById('postContent');
    const start = textarea.selectionStart;
    
    const dividerHTML = `<hr class="my-8 border-gray-300" />\n`;
    
    textarea.value = textarea.value.substring(0, start) + dividerHTML + textarea.value.substring(start);
    textarea.focus();
}

// Create slug from title
function createSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}