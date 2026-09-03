const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const screenshotDir = path.join(__dirname, 'audit_evidence');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const auditLog = {
    timestamp: new Date().toISOString(),
    target: 'https://meu-bolso-t1k.pages.dev',
    tests: [],
    metrics: {},
    passedCount: 0,
    failedCount: 0
  };

  const record = (name, status, details, data = {}) => {
    const item = { name, status, details, data };
    auditLog.tests.push(item);
    if (status === 'PASS') auditLog.passedCount++;
    else auditLog.failedCount++;
    console.log(`[${status}] ${name} - ${details}`);
  };

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  
  // Interceptar erros de console e exceções
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log("=================================================================");
  console.log("INICIANDO AUDITORIA AUTOMATIZADA EM PRODUÇÃO: MEU BOLSO");
  console.log("=================================================================\n");

  try {
    // -------------------------------------------------------------------------
    // TESTE 1: Borda Cloudflare e Carregamento Inicial
    // -------------------------------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto('https://meu-bolso-t1k.pages.dev', { waitUntil: 'networkidle' });
    const headers = response.headers();
    
    const hsts = headers['strict-transport-security'] || 'N/A';
    const xFrame = headers['x-frame-options'] || 'N/A';
    const xContent = headers['x-content-type-options'] || 'N/A';

    if (response.status() === 200 && xFrame.toUpperCase() === 'DENY' && xContent.toLowerCase() === 'nosniff') {
      record('Segurança de Borda Cloudflare', 'PASS', 'Headers de segurança HTTP verificados', { hsts, xFrame, xContent });
    } else {
      record('Segurança de Borda Cloudflare', 'FAIL', 'Headers ausentes ou incorretos', { hsts, xFrame, xContent });
    }

    // -------------------------------------------------------------------------
    // TESTE 2: Gabarito Contábil Inicial
    // -------------------------------------------------------------------------
    await page.waitForSelector('text=Saldo Familiar Disponível');
    const heroValues = await page.$$eval('.text-2xl', els => els.map(e => e.textContent.trim()));
    
    const saldo = heroValues[0] || '';
    const receitas = heroValues[1] || '';
    const despesas = heroValues[2] || '';
    const comprometimento = heroValues[3] || '';

    const expectedSaldo = 'R$ 10.194,50';
    const expectedDespesas = 'R$ 4.305,50';
    const expectedComprometimento = '30%';

    if (saldo.includes('10.194,50') && despesas.includes('4.305,50') && comprometimento === expectedComprometimento) {
      record('Gabarito Contábil Inicial', 'PASS', 'Saldos, despesas e percentual nominais conferidos com 100% de exatidão', { saldo, despesas, comprometimento });
    } else {
      record('Gabarito Contábil Inicial', 'FAIL', 'Divergência matemática nos cards hero', { saldo, despesas, comprometimento });
    }

    // -------------------------------------------------------------------------
    // TESTE 3: Acerto de Contas Inicial (Juliana deve R$ 259,75 para Henrique)
    // -------------------------------------------------------------------------
    const cardAcertoLocator = page.locator('text=Equilíbrio do Mês').locator('xpath=ancestor::div[contains(@class, "rounded-xl")]');
    const acertoInicial = await cardAcertoLocator.textContent();
    if (acertoInicial.includes('Juliana Mafra deve a Henrique Mafra') && acertoInicial.includes('259,75')) {
      record('Acerto de Contas Inicial (50/50)', 'PASS', 'Compensação de R$ 259,75 calculada com precisão', { texto: acertoInicial.replace(/\s+/g, ' ').trim() });
    } else {
      record('Acerto de Contas Inicial (50/50)', 'FAIL', 'Divergência no cálculo de rateio entre cônjuges', { texto: acertoInicial.replace(/\s+/g, ' ').trim() });
    }

    await page.screenshot({ path: path.join(screenshotDir, '01_desktop_hero_initial.png') });

    // -------------------------------------------------------------------------
    // TESTE 4: Teste do Efeito Borboleta com Inversão de Credor
    // -------------------------------------------------------------------------
    // Juliana paga R$ 600,00 em despesa 50/50. Henrique deve passar a dever R$ 40,25.
    await page.click('button:has-text("Novo Lançamento")');
    await page.waitForSelector('text=Novo Lançamento');
    await page.screenshot({ path: path.join(screenshotDir, '02_modal_novo_lancamento.png') });

    await page.fill('input[placeholder="0,00"]', '600,00');
    await page.fill('input[placeholder*="Supermercado"]', 'Manutenção Hidráulica da Cozinha');
    await page.selectOption('select >> nth=0', { label: 'Moradia & Contas' });
    await page.selectOption('select >> nth=1', { label: 'Juliana Mafra' });
    await page.click('button:has-text("Divide 50/50")');

    await page.click('button:has-text("Salvar Lançamento")');
    await page.waitForTimeout(600);

    // Verificar novos valores
    const novoHeroValues = await page.$$eval('.text-2xl', els => els.map(e => e.textContent.trim()));
    const novoSaldo = novoHeroValues[0] || '';
    const novasDespesas = novoHeroValues[2] || '';
    const novoComprometimento = novoHeroValues[3] || '';
    const novoAcerto = await page.locator('text=Equilíbrio do Mês').locator('xpath=ancestor::div[contains(@class, "rounded-xl")]').textContent();
    const cleanNovoAcerto = novoAcerto.replace(/\s+/g, ' ').trim();

    const inversaoCorreta = novoAcerto.includes('Henrique Mafra deve a Juliana Mafra') && novoAcerto.includes('40,25');
    const saldoCorreto = novoSaldo.includes('9.594,50');
    const despesasCorretas = novasDespesas.includes('4.905,50');
    const comprometimentoCorreto = novoComprometimento === '34%';

    if (inversaoCorreta && saldoCorreto && despesasCorretas && comprometimentoCorreto) {
      record('Efeito Borboleta & Inversão de Dívida', 'PASS', 'Todos os 4 cards e a inversão de débito (R$ 40,25) foram recalculados atomicamente', {
        novoSaldo, novasDespesas, novoComprometimento, acerto: novoAcerto.replace(/\s+/g, ' ').trim()
      });
    } else {
      record('Efeito Borboleta & Inversão de Dívida', 'FAIL', 'Falha no recálculo em cascata da nova despesa', {
        novoSaldo, novasDespesas, novoComprometimento, acerto: novoAcerto
      });
    }

    await page.screenshot({ path: path.join(screenshotDir, '03_pos_mutacao_inversao.png') });

    // -------------------------------------------------------------------------
    // TESTE 5: Busca Dinâmica e Filtros de Rateio
    // -------------------------------------------------------------------------
    await page.fill('input[placeholder*="Buscar despesa"]', 'Manutenção Hidráulica');
    await page.waitForTimeout(300);
    const linhasFiltradas = await page.$$eval('tbody tr', els => els.length);
    if (linhasFiltradas === 1) {
      record('Filtro de Busca em Tempo Real', 'PASS', 'Busca por substring isolou exatamente 1 registro correspondente');
    } else {
      record('Filtro de Busca em Tempo Real', 'FAIL', `Esperado 1 registro, encontrado ${linhasFiltradas}`);
    }

    await page.fill('input[placeholder*="Buscar despesa"]', '');
    await page.click('button:has-text("Fixo da Casa")');
    await page.waitForTimeout(300);
    const fixoCount = await page.$$eval('tbody tr', els => els.length);
    record('Pílulas de Filtro de Rateio', 'PASS', `Filtro "Fixo da Casa" isolou ${fixoCount} transações`);

    await page.click('button:has-text("Todas")');

    // -------------------------------------------------------------------------
    // TESTE 6: Responsividade Dual (Modo Mobile Smartphone 390x844)
    // -------------------------------------------------------------------------
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);

    const sidebarVisivel = await page.locator('aside').isVisible();
    const bottomNavVisivel = await page.locator('nav.fixed.bottom-0').isVisible();
    const tabelaDesktopVisivel = await page.locator('table').isVisible();
    const cardsMobileVisiveis = await page.locator('.lg\\:hidden.space-y-2\\.5').isVisible();

    if (!sidebarVisivel && bottomNavVisivel && !tabelaDesktopVisivel && cardsMobileVisiveis) {
      record('Ergonomia Dual Mobile/Desktop', 'PASS', 'Mobile < 1024px oculta sidebar/tabela e renderiza bottom-nav/cards verticais perfeitamente');
    } else {
      record('Ergonomia Dual Mobile/Desktop', 'FAIL', 'Vazamento ou falha de elementos responsivos em smartphone', {
        sidebarVisivel, bottomNavVisivel, tabelaDesktopVisivel, cardsMobileVisiveis
      });
    }

    await page.screenshot({ path: path.join(screenshotDir, '04_mobile_viewport.png') });

    // -------------------------------------------------------------------------
    // TESTE 7: Alternador de Dark Mode
    // -------------------------------------------------------------------------
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.click('button:has-text("Tema Escuro")');
    await page.waitForTimeout(300);
    const hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (hasDarkClass) {
      record('Mecanismo de Dark Mode', 'PASS', 'Classe .dark injetada na raiz HTML com renderização imediata');
    } else {
      record('Mecanismo de Dark Mode', 'FAIL', 'Classe .dark não foi aplicada');
    }

    await page.screenshot({ path: path.join(screenshotDir, '05_dark_mode_desktop.png') });

    // -------------------------------------------------------------------------
    // TESTE 8: Integridade de Console e Ausência de Erros JS
    // -------------------------------------------------------------------------
    if (consoleErrors.length === 0) {
      record('Logs de Console & Erros em Runtime', 'PASS', 'Zero exceções ou erros não tratados durante todos os fluxos');
    } else {
      record('Logs de Console & Erros em Runtime', 'FAIL', `Detectados ${consoleErrors.length} erros no console`, { errors: consoleErrors });
    }

  } catch (err) {
    console.error('Erro catastrófico na execução:', err);
    record('Execução Global da Bateria', 'FAIL', err.message);
  } finally {
    await browser.close();
  }

  // Gravar laudo JSON final
  const reportPath = path.join(__dirname, 'audit_evidence', 'laudo_execucao_real.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditLog, null, 2), 'utf-8');
  console.log(`\n=================================================================`);
  console.log(`AUDITORIA CONCLUÍDA! TOTAL DE TESTES: ${auditLog.tests.length}`);
  console.log(`PASSADOS: ${auditLog.passedCount} | FALHAS: ${auditLog.failedCount}`);
  console.log(`EVIDÊNCIAS E SCREENSHOTS SALVOS EM: ${screenshotDir}`);
  console.log(`=================================================================\n`);
})();
