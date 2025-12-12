export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
        <div className="text-center">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-blue-600">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          
          <h1 className="text-3xl mb-4 text-gray-900">
            Site HTML Puro Disponível
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            O site foi criado em <strong>HTML puro com JavaScript</strong> e está pronto para ser usado no GitHub Pages ou localmente sem necessidade de instalação.
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6 text-left">
            <h2 className="text-lg mb-3 text-gray-900">
              📄 Arquivo principal:
            </h2>
            <code className="block bg-white px-4 py-3 rounded-lg text-blue-600 border border-blue-200">
              index.html
            </code>
          </div>
          
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-left">
            <h2 className="text-lg mb-3 text-gray-900">
              🚀 Como usar:
            </h2>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              <li>Baixe o arquivo <strong>index.html</strong></li>
              <li>Abra diretamente no navegador (duplo clique)</li>
              <li>Ou faça upload no GitHub Pages</li>
              <li>Não precisa instalar nada!</li>
            </ol>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            ✅ HTML5 + CSS (Tailwind CDN) + JavaScript Vanilla
          </p>
        </div>
      </div>
    </div>
  );
}
