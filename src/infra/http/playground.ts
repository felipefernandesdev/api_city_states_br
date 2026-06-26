export const swaggerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Cidades & Estados - Playground</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    header { background: #2563eb; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    header h1 { font-size: 1.5rem; }
    header p { opacity: 0.9; margin-top: 5px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .endpoint { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .endpoint h3 { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .method { background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
    .method.get { background: #22c55e; }
    .path { font-family: monospace; color: #2563eb; }
    .endpoint p { color: #666; font-size: 0.9rem; margin-bottom: 15px; }
    .params { background: #f8fafc; padding: 10px; border-radius: 4px; margin-bottom: 15px; font-size: 0.85rem; }
    .params code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; }
    .try-it { display: flex; gap: 10px; margin-bottom: 10px; }
    .try-it input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-family: monospace; }
    .try-it button { background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 500; }
    .try-it button:hover { background: #1d4ed8; }
    .try-it button:disabled { background: #94a3b8; cursor: not-allowed; }
    .response { background: #1e293b; color: #22c55e; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 0.8rem; white-space: pre-wrap; max-height: 300px; overflow-y: auto; display: none; }
    .response.error { color: #ef4444; }
    .loading { color: #94a3b8; }
    footer { text-align: center; padding: 20px; color: #666; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>API Cidades & Estados</h1>
      <p>Playground interativo para testar os endpoints</p>
    </header>

    <div class="grid">
      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/estados</span></h3>
        <p>Lista todos os 27 estados brasileiros</p>
        <div class="params">
          Query: <code>pagina</code> (default: 1), <code>limite</code> (default: 27)
        </div>
        <div class="try-it">
          <input type="text" id="input-estados" value="/estados" placeholder="/estados">
          <button onclick="tryEndpoint('input-estados', 'response-estados')">Testar</button>
        </div>
        <pre class="response" id="response-estados"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/estados/:uf</span></h3>
        <p>Busca estado pela UF (sigla)</p>
        <div class="params">
          Exemplos: <code>SP</code>, <code>RJ</code>, <code>MG</code>
        </div>
        <div class="try-it">
          <input type="text" id="input-uf" value="/estados/SP" placeholder="/estados/UF">
          <button onclick="tryEndpoint('input-uf', 'response-uf')">Testar</button>
        </div>
        <pre class="response" id="response-uf"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/estado/nome/:nome</span></h3>
        <p>Busca estado por nome (busca parcial)</p>
        <div class="params">
          Exemplos: <code>São Paulo</code>, <code>rio</code>, <code>minas</code>
        </div>
        <div class="try-it">
          <input type="text" id="input-nome-estado" value="/estado/nome/São Paulo" placeholder="/estado/nome/NOME">
          <button onclick="tryEndpoint('input-nome-estado', 'response-nome-estado')">Testar</button>
        </div>
        <pre class="response" id="response-nome-estado"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/estados/:uf/cidades</span></h3>
        <p>Lista todas as cidades de um estado</p>
        <div class="params">
          Query: <code>pagina</code>, <code>limite</code>
        </div>
        <div class="try-it">
          <input type="text" id="input-cidades-uf" value="/estados/AC/cidades" placeholder="/estados/UF/cidades">
          <button onclick="tryEndpoint('input-cidades-uf', 'response-cidades-uf')">Testar</button>
        </div>
        <pre class="response" id="response-cidades-uf"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/cidades/:nome</span></h3>
        <p>Busca cidades por nome em todos os estados</p>
        <div class="params">
          Exemplos: <code>Rio</code>, <code>São Paulo</code>, <code>Fortaleza</code>
        </div>
        <div class="try-it">
          <input type="text" id="input-cidade-nome" value="/cidades/Rio" placeholder="/cidades/NOME">
          <button onclick="tryEndpoint('input-cidade-nome', 'response-cidade-nome')">Testar</button>
        </div>
        <pre class="response" id="response-cidade-nome"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/estados/contagem</span></h3>
        <p>Retorna total de cidades por estado (ordenado)</p>
        <div class="try-it">
          <input type="text" id="input-contagem" value="/estados/contagem" placeholder="/estados/contagem">
          <button onclick="tryEndpoint('input-contagem', 'response-contagem')">Testar</button>
        </div>
        <pre class="response" id="response-contagem"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/cidades/busca/avancada</span></h3>
        <p>Busca avançada com filtros</p>
        <div class="params">
          Query: <code>nome</code>, <code>estado</code> (UF), <code>pagina</code>, <code>limite</code>
        </div>
        <div class="try-it">
          <input type="text" id="input-busca" value="/cidades/busca/avancada?nome=Rio&estado=SP" placeholder="/cidades/busca/avancada?nome=X&estado=UF">
          <button onclick="tryEndpoint('input-busca', 'response-busca')">Testar</button>
        </div>
        <pre class="response" id="response-busca"></pre>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span> <span class="path">/health</span></h3>
        <p>Health check da API</p>
        <div class="try-it">
          <input type="text" id="input-health" value="/health" placeholder="/health">
          <button onclick="tryEndpoint('input-health', 'response-health')">Testar</button>
        </div>
        <pre class="response" id="response-health"></pre>
      </div>
    </div>

    <footer>
      API Cidades & Estados v1.1.0 | Dados: IBGE DTB 2024 | 5.595 municípios
    </footer>
  </div>

  <script>
    async function tryEndpoint(inputId, responseId) {
      const input = document.getElementById(inputId);
      const response = document.getElementById(responseId);
      const btn = input.parentElement.querySelector('button');
      
      btn.disabled = true;
      btn.textContent = 'Carregando...';
      response.style.display = 'block';
      response.className = 'response loading';
      response.textContent = 'Carregando...';
      
      try {
        const res = await fetch(input.value);
        const data = await res.json();
        
        response.className = res.ok ? 'response' : 'response error';
        response.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        response.className = 'response error';
        response.textContent = 'Erro: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Testar';
      }
    }

    document.querySelectorAll('.try-it input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          input.parentElement.querySelector('button').click();
        }
      });
    });
  </script>
</body>
</html>`;
