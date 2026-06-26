export const swaggerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Cidades & Estados - Playground</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0f172a; --surface: #1e293b; --border: #334155; --text: #f1f5f9; --muted: #94a3b8; --primary: #3b82f6; --success: #22c55e; --error: #ef4444; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); }
    .header { background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 32px; }
    .header h1 { font-size: 1.75rem; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin-top: 8px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 16px; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
    .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .badge { background: var(--success); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 600; }
    .path { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-weight: 500; }
    .desc { color: var(--muted); font-size: 0.85rem; margin-bottom: 16px; }
    .row { display: flex; gap: 8px; }
    .row input { flex: 1; background: #0d1117; border: 1px solid var(--border); color: var(--text); padding: 10px 12px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; }
    .row input:focus { outline: none; border-color: var(--primary); }
    .btn { background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn:hover { background: #2563eb; }
    .btn:disabled { background: #475569; cursor: not-allowed; }
    .result { margin-top: 12px; display: none; }
    .result.show { display: block; }
    .result pre { background: #0d1117; border: 1px solid var(--border); border-radius: 8px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; white-space: pre-wrap; max-height: 250px; overflow-y: auto; }
    .result.ok pre { color: var(--success); border-color: rgba(34,197,94,0.3); }
    .result.err pre { color: var(--error); border-color: rgba(239,68,68,0.3); }
    .status { font-size: 0.75rem; font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
    .status.ok { color: var(--success); }
    .status.err { color: var(--error); }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    .footer { text-align: center; padding: 24px; color: var(--muted); font-size: 0.85rem; border-top: 1px solid var(--border); margin-top: 32px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>API Cidades & Estados</h1>
    <p>Teste os endpoints interativamente</p>
  </div>
  <div class="container">
    <div class="grid">
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/estados</span></div>
        <p class="desc">Lista todos os 27 estados</p>
        <div class="row">
          <input id="i1" value="/estados">
          <button class="btn" onclick="go('i1','r1')">Testar</button>
        </div>
        <div class="result" id="r1"><div class="status" id="s1"></div><pre id="p1"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/estados/:uf</span></div>
        <p class="desc">Busca estado por UF</p>
        <div class="row">
          <input id="i2" value="/estados/SP">
          <button class="btn" onclick="go('i2','r2')">Testar</button>
        </div>
        <div class="result" id="r2"><div class="status" id="s2"></div><pre id="p2"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/estado/nome/:nome</span></div>
        <p class="desc">Busca estado por nome</p>
        <div class="row">
          <input id="i3" value="/estado/nome/São Paulo">
          <button class="btn" onclick="go('i3','r3')">Testar</button>
        </div>
        <div class="result" id="r3"><div class="status" id="s3"></div><pre id="p3"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/estados/:uf/cidades</span></div>
        <p class="desc">Cidades de um estado</p>
        <div class="row">
          <input id="i4" value="/estados/AC/cidades">
          <button class="btn" onclick="go('i4','r4')">Testar</button>
        </div>
        <div class="result" id="r4"><div class="status" id="s4"></div><pre id="p4"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/cidades/:nome</span></div>
        <p class="desc">Busca cidade por nome</p>
        <div class="row">
          <input id="i5" value="/cidades/Rio">
          <button class="btn" onclick="go('i5','r5')">Testar</button>
        </div>
        <div class="result" id="r5"><div class="status" id="s5"></div><pre id="p5"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/estados/contagem</span></div>
        <p class="desc">Total de cidades por estado</p>
        <div class="row">
          <input id="i6" value="/estados/contagem">
          <button class="btn" onclick="go('i6','r6')">Testar</button>
        </div>
        <div class="result" id="r6"><div class="status" id="s6"></div><pre id="p6"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/cidades/busca/avancada</span></div>
        <p class="desc">Busca com filtros (nome, estado)</p>
        <div class="row">
          <input id="i7" value="/cidades/busca/avancada?nome=Rio&estado=SP">
          <button class="btn" onclick="go('i7','r7')">Testar</button>
        </div>
        <div class="result" id="r7"><div class="status" id="s7"></div><pre id="p7"></pre></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="badge">GET</span><span class="path">/health</span></div>
        <p class="desc">Health check</p>
        <div class="row">
          <input id="i8" value="/health">
          <button class="btn" onclick="go('i8','r8')">Testar</button>
        </div>
        <div class="result" id="r8"><div class="status" id="s8"></div><pre id="p8"></pre></div>
      </div>
    </div>
  </div>
  <div class="footer">
    API Cidades & Estados v1.1.0 | 27 estados | 5.595 municípios | IBGE DTB 2024
  </div>
  <script>
    function go(inputId, resultId) {
      var inp = document.getElementById(inputId);
      var res = document.getElementById(resultId);
      var s = document.getElementById('s' + resultId.slice(1));
      var p = document.getElementById('p' + resultId.slice(1));
      var path = inp.value;
      
      res.className = 'result show';
      s.className = 'status';
      s.innerHTML = '<span class="dot"></span> Carregando...';
      p.textContent = '';
      
      fetch(path).then(function(r) {
        return r.json().then(function(d) {
          var ok = r.status >= 200 && r.status < 300;
          s.className = 'status ' + (ok ? 'ok' : 'err');
          s.innerHTML = '<span class="dot"></span> ' + r.status + (ok ? ' OK' : ' Erro');
          p.textContent = JSON.stringify(d, null, 2);
        });
      }).catch(function(e) {
        s.className = 'status err';
        s.innerHTML = '<span class="dot"></span> Erro';
        p.textContent = e.message;
      });
    }
  </script>
</body>
</html>`;
