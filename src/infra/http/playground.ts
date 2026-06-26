export const swaggerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Cidades & Estados - Playground</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0f172a;
      --surface: #1e293b;
      --surface-hover: #334155;
      --border: #334155;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --success: #22c55e;
      --error: #ef4444;
      --code-bg: #0d1117;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body { 
      font-family: 'Inter', sans-serif; 
      background: var(--bg); 
      color: var(--text);
      min-height: 100vh;
    }

    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      padding: 32px;
      border-bottom: 1px solid var(--border);
    }

    .header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .header p {
      color: rgba(255,255,255,0.8);
      font-size: 0.95rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    .endpoints {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 16px;
    }

    .endpoint {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      transition: border-color 0.2s;
    }

    .endpoint:hover {
      border-color: var(--primary);
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .method {
      background: var(--success);
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .endpoint-path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: var(--primary);
      font-weight: 500;
    }

    .endpoint-desc {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .endpoint-params {
      background: var(--code-bg);
      padding: 10px 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .endpoint-params code {
      background: var(--surface-hover);
      color: var(--text);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
    }

    .input-group {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .input-group input {
      flex: 1;
      background: var(--code-bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 10px 14px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .input-group input:focus {
      border-color: var(--primary);
    }

    .input-group input::placeholder {
      color: var(--text-muted);
    }

    .btn-test {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn-test:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }

    .btn-test:active {
      transform: translateY(0);
    }

    .btn-test:disabled {
      background: var(--surface-hover);
      color: var(--text-muted);
      cursor: not-allowed;
      transform: none;
    }

    .response {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: break-all;
      max-height: 300px;
      overflow-y: auto;
      display: none;
      line-height: 1.6;
    }

    .response.visible {
      display: block;
    }

    .response.success {
      color: var(--success);
      border-color: rgba(34, 197, 94, 0.3);
    }

    .response.error {
      color: var(--error);
      border-color: rgba(239, 68, 68, 0.3);
    }

    .response.loading {
      color: var(--text-muted);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .status-badge.success {
      background: rgba(34, 197, 94, 0.15);
      color: var(--success);
    }

    .status-badge.error {
      background: rgba(239, 68, 68, 0.15);
      color: var(--error);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .footer {
      text-align: center;
      padding: 32px;
      color: var(--text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }

    .footer a {
      color: var(--primary);
      text-decoration: none;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 12px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stat-value {
      color: var(--text);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .endpoints {
        grid-template-columns: 1fr;
      }
      
      .header {
        padding: 24px 16px;
      }
      
      .container {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>API Cidades & Estados</h1>
    <p>Playground interativo para testar os endpoints da API</p>
  </div>

  <div class="container">
    <div class="endpoints">

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/estados</span>
        </div>
        <p class="endpoint-desc">Lista todos os 27 estados brasileiros</p>
        <div class="endpoint-params">
          Query: <code>pagina</code> <code>limite</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-estados" value="/estados">
          <button class="btn-test" onclick="tryEndpoint('input-estados', 'response-estados')">Testar</button>
        </div>
        <div id="response-estados" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/estados/:uf</span>
        </div>
        <p class="endpoint-desc">Busca estado pela UF (sigla)</p>
        <div class="endpoint-params">
          Exemplos: <code>SP</code> <code>RJ</code> <code>MG</code> <code>AC</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-uf" value="/estados/SP">
          <button class="btn-test" onclick="tryEndpoint('input-uf', 'response-uf')">Testar</button>
        </div>
        <div id="response-uf" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/estado/nome/:nome</span>
        </div>
        <p class="endpoint-desc">Busca estado por nome (busca parcial)</p>
        <div class="endpoint-params">
          Exemplos: <code>São Paulo</code> <code>rio</code> <code>minas</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-nome-estado" value="/estado/nome/São Paulo">
          <button class="btn-test" onclick="tryEndpoint('input-nome-estado', 'response-nome-estado')">Testar</button>
        </div>
        <div id="response-nome-estado" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/estados/:uf/cidades</span>
        </div>
        <p class="endpoint-desc">Lista todas as cidades de um estado</p>
        <div class="endpoint-params">
          Query: <code>pagina</code> <code>limite</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-cidades-uf" value="/estados/AC/cidades">
          <button class="btn-test" onclick="tryEndpoint('input-cidades-uf', 'response-cidades-uf')">Testar</button>
        </div>
        <div id="response-cidades-uf" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/cidades/:nome</span>
        </div>
        <p class="endpoint-desc">Busca cidades por nome em todos os estados</p>
        <div class="endpoint-params">
          Exemplos: <code>Rio</code> <code>São Paulo</code> <code>Fortaleza</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-cidade-nome" value="/cidades/Rio">
          <button class="btn-test" onclick="tryEndpoint('input-cidade-nome', 'response-cidade-nome')">Testar</button>
        </div>
        <div id="response-cidade-nome" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/estados/contagem</span>
        </div>
        <p class="endpoint-desc">Retorna total de cidades por estado (ordenado)</p>
        <div class="input-group">
          <input type="text" id="input-contagem" value="/estados/contagem">
          <button class="btn-test" onclick="tryEndpoint('input-contagem', 'response-contagem')">Testar</button>
        </div>
        <div id="response-contagem" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/cidades/busca/avancada</span>
        </div>
        <p class="endpoint-desc">Busca avançada com filtros</p>
        <div class="endpoint-params">
          Query: <code>nome</code> <code>estado</code> (UF) <code>pagina</code> <code>limite</code>
        </div>
        <div class="input-group">
          <input type="text" id="input-busca" value="/cidades/busca/avancada?nome=Rio&estado=SP">
          <button class="btn-test" onclick="tryEndpoint('input-busca', 'response-busca')">Testar</button>
        </div>
        <div id="response-busca" class="response"></div>
      </div>

      <div class="endpoint">
        <div class="endpoint-header">
          <span class="method">GET</span>
          <span class="endpoint-path">/health</span>
        </div>
        <p class="endpoint-desc">Health check da API</p>
        <div class="input-group">
          <input type="text" id="input-health" value="/health">
          <button class="btn-test" onclick="tryEndpoint('input-health', 'response-health')">Testar</button>
        </div>
        <div id="response-health" class="response"></div>
      </div>

    </div>
  </div>

  <div class="footer">
    <p>API Cidades & Estados v1.1.0</p>
    <div class="stats">
      <div class="stat">
        <span class="stat-value">27</span> estados
      </div>
      <div class="stat">
        <span class="stat-value">5.595</span> municípios
      </div>
      <div class="stat">
        Fonte: <span class="stat-value">IBGE DTB 2024</span>
      </div>
    </div>
  </div>

  <script>
    const BASE_URL = window.location.origin;

    async function tryEndpoint(inputId, responseId) {
      const input = document.getElementById(inputId);
      const responseEl = document.getElementById(responseId);
      const btn = input.parentElement.querySelector('.btn-test');
      const path = input.value.trim();
      
      if (!path) {
        responseEl.className = 'response visible error';
        responseEl.textContent = 'Digite um endpoint válido';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Carregando...';
      responseEl.className = 'response visible loading';
      responseEl.innerHTML = '<span class="status-badge loading"><span class="status-dot"></span> Requisitando...</span>';
      
      try {
        const url = BASE_URL + path;
        const res = await fetch(url);
        const data = await res.json();
        
        const statusClass = res.ok ? 'success' : 'error';
        const statusText = res.ok ? res.status + ' OK' : res.status + ' ' + res.statusText;
        
        responseEl.className = 'response visible ' + statusClass;
        responseEl.innerHTML = '<span class="status-badge ' + statusClass + '"><span class="status-dot"></span> ' + statusText + '</span>\\n' + JSON.stringify(data, null, 2);
      } catch (err) {
        responseEl.className = 'response visible error';
        responseEl.innerHTML = '<span class="status-badge error"><span class="status-dot"></span> Erro de conexão</span>\\n' + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Testar';
      }
    }

    document.querySelectorAll('.input-group input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          input.parentElement.querySelector('.btn-test').click();
        }
      });
    });
  </script>
</body>
</html>`;
