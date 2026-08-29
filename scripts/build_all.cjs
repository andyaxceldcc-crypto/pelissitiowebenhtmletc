const fs = require('fs');
const path = require('path');

// Extract MOVIES_DATABASE from generate_movies.cjs
const generatorContent = fs.readFileSync(path.join(__dirname, 'generate_movies.cjs'), 'utf8');
const match = generatorContent.match(/const MOVIES_DATABASE = (\[[\s\S]*?\]);\s*function generateHtmlContent/);
if (!match) {
  console.error('Could not extract MOVIES_DATABASE');
  process.exit(1);
}

const moviesData = eval(match[1]);

// Transform to DEFAULT_MEDIA
const defaultMedia = moviesData.map((m, idx) => {
  const isAvatar = m.id === 'avatar-2-el-sentido-del-agua';
  const imdb = m.imdbId || 'tt1630029';
  
  const servers = [];
  if (isAvatar) {
    servers.push(
      { id: 'dood-avatar2-playmogo', name: 'Doodstream (Playmogo)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://playmogo.com/e/ykm9tsifkch1', provider: 'Doodstream' },
      { id: 'dood-avatar2-d000d', name: 'Doodstream (Espejo 1)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://d000d.com/e/ykm9tsifkch1', provider: 'Doodstream' },
      { id: 'dood-avatar2-do0od', name: 'Doodstream (Espejo 2)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://do0od.com/e/ykm9tsifkch1', provider: 'Doodstream' }
    );
  } else {
    servers.push(
      { id: `dood-${m.id}`, name: 'Doodstream Playmogo', quality: '1080p FHD', lang: 'Español Latino', url: `https://playmogo.com/e/${imdb}`, provider: 'Doodstream' }
    );
  }

  servers.push(
    { id: `vidsrc-${m.id}`, name: 'Servidor 4K VIP', quality: '4K UHD', lang: 'Latino / Dual', url: `https://vidsrc.to/embed/movie/${imdb}`, provider: 'Vidsrc' },
    { id: `wish-${m.id}`, name: 'StreamWish Directo', quality: '1080p FHD', lang: 'Español Latino', url: `https://streamwish.to/e/${imdb}`, provider: 'StreamWish' },
    { id: `filemoon-${m.id}`, name: 'FileMoon 4K', quality: '1080p FHD', lang: 'Español Latino', url: `https://filemoon.sx/e/${imdb}`, provider: 'FileMoon' },
    { id: `tape-${m.id}`, name: 'Streamtape MP4', quality: '1080p FHD', lang: 'Español Latino', url: `https://streamtape.com/e/${imdb}`, provider: 'Streamtape' },
    { id: `vdohide-${m.id}`, name: 'VdoHide Fast', quality: '1080p FHD', lang: 'Español Latino', url: `https://vdohide.com/e/${imdb}`, provider: 'VdoHide' }
  );

  // Baseline simulated stats based on movie popularity
  const baseViews = 1200 + (moviesData.length - idx) * 380 + (idx === 0 ? 8500 : 0);
  const baseLikes = Math.floor(baseViews * 0.18);

  return {
    id: m.id,
    title: m.title,
    originalTitle: m.originalTitle,
    type: m.duration.includes('Temp') ? (m.genres.includes('Anime') ? 'anime' : 'tv') : 'movie',
    isAnime: m.genres.includes('Anime'),
    poster: m.poster,
    backdrop: m.backdrop,
    year: m.year,
    rating: m.rating,
    quality: m.quality,
    duration: m.duration,
    genres: m.genres,
    overview: m.overview,
    director: m.director,
    cast: m.cast,
    platform: m.platform,
    htmlPage: m.htmlPage,
    keywords: m.keywords,
    servers: servers,
    baseViews: baseViews,
    baseLikes: baseLikes,
    isFeatured: idx === 1 || idx === 0,
    isTrending: idx < 14
  };
});

// BUILD APP.JS
const appJsCode = `/**
 * andyaxceldominguezccorau TV 🇵🇪 - Core Streaming & Social Hub Engine
 * Author: Andy Axcel Dominguez Ccorau
 * High-Definition Posters & Dynamic SVG Fallbacks
 */

function getPosterFallback(title, genre, year) {
  const palettes = [
    ['#09090b', '#1e1b4b', '#3b82f6'],
    ['#09090b', '#450a0a', '#ef4444'],
    ['#09090b', '#3f2c06', '#eab308'],
    ['#09090b', '#064e3b', '#10b981'],
    ['#09090b', '#3b0764', '#a855f7']
  ];
  const hash = (title || 'pelicula').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const c = palettes[hash % palettes.length];
  const cleanTitle = (title || 'Película').replace(/["'<>]/g, '');
  const cleanGenre = (genre || '4K UHD').replace(/["'<>]/g, '');
  const cleanYear = (year || '2025').toString();

  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100%" height="100%">
    <defs>
      <linearGradient id="g\${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="\${c[0]}"/>
        <stop offset="60%" stop-color="\${c[1]}"/>
        <stop offset="100%" stop-color="\${c[2]}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#g\${hash})"/>
    <circle cx="200" cy="220" r="90" fill="\${c[2]}" opacity="0.25"/>
    <g transform="translate(160, 180) scale(1.6)">
      <polygon points="5 3 19 12 5 21 5 3" fill="\${c[2]}" fill-opacity="0.9"/>
    </g>
    <rect x="24" y="24" width="130" height="30" rx="8" fill="#eab308" />
    <text x="89" y="44" fill="#000000" font-size="12" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle">🇵🇪 PERÚ 4K</text>
    <text x="200" y="380" fill="#ffffff" font-size="22" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">\${cleanTitle.substring(0, 24)}</text>
    <text x="200" y="415" fill="#facc15" font-size="14" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">\${cleanGenre} • \${cleanYear}</text>
    <rect x="50" y="470" width="300" height="44" rx="12" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    <text x="200" y="498" fill="#e4e4e7" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">andyaxceldominguezccorau TV</text>
  </svg>\`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

window.getPosterFallback = getPosterFallback;

const DEFAULT_MEDIA = ${JSON.stringify(defaultMedia, null, 2)};

class AndyStreamApp {
  constructor() {
    this.mediaList = this.loadMediaList();
    this.favorites = this.loadFavorites();
    this.currentTab = 'home';
    this.heroIndex = 0;
    this.activeHero = null;
    this.currentPlaying = null;
    this.currentServer = null;
    this.hlsInstance = null;
    this.searchFilter = 'all';
    this.pendingAdminAction = null;

    this.init();
  }

  isAdmin() {
    return sessionStorage.getItem('andy_tv_admin_auth') === 'true';
  }

  setAdmin(status) {
    if (status) {
      sessionStorage.setItem('andy_tv_admin_auth', 'true');
    } else {
      sessionStorage.removeItem('andy_tv_admin_auth');
    }
    this.updateAdminUI();
  }

  updateAdminUI() {
    const adminStatusBadges = document.querySelectorAll('.admin-status-indicator');
    const isAdmin = this.isAdmin();

    adminStatusBadges.forEach(el => {
      if (isAdmin) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    const lockIcons = document.querySelectorAll('.admin-lock-icon');
    lockIcons.forEach(icon => {
      if (isAdmin) {
        icon.setAttribute('data-lucide', 'unlock');
      } else {
        icon.setAttribute('data-lucide', 'lock');
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  requireAdmin(onSuccessAction) {
    if (this.isAdmin()) {
      if (typeof onSuccessAction === 'function') onSuccessAction();
      return true;
    }
    this.pendingAdminAction = onSuccessAction;
    this.openAdminLoginModal();
    return false;
  }

  openAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
      modal.classList.remove('hidden');
      const userInput = document.getElementById('admin-user-input');
      const passInput = document.getElementById('admin-pass-input');
      const errorMsg = document.getElementById('admin-login-error');
      if (userInput) userInput.value = '';
      if (passInput) passInput.value = '';
      if (errorMsg) errorMsg.classList.add('hidden');
      setTimeout(() => { if (userInput) userInput.focus(); }, 100);
    }
  }

  closeAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.add('hidden');
    this.pendingAdminAction = null;
  }

  attemptAdminLogin(user, pass) {
    const cleanUser = (user || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();
    const errorMsg = document.getElementById('admin-login-error');

    if (cleanUser === 'andy' && cleanPass === '60083981') {
      this.setAdmin(true);
      if (errorMsg) errorMsg.classList.add('hidden');
      this.closeAdminLoginModal();
      this.showToast('¡Bienvenido Administrador Andy Axcel 🇵🇪!');
      
      if (typeof this.pendingAdminAction === 'function') {
        const action = this.pendingAdminAction;
        this.pendingAdminAction = null;
        action();
      }
      return true;
    } else {
      if (errorMsg) {
        errorMsg.textContent = 'Acceso Denegado: Usuario o Contraseña incorrectos. Solo el Administrador Andy tiene autorización.';
        errorMsg.classList.remove('hidden');
      }
      this.showToast('Credenciales incorrectas');
      return false;
    }
  }

  logoutAdmin() {
    this.setAdmin(false);
    this.closeCreatorModal();
    this.showToast('Sesión de Administrador cerrada');
  }

  loadMediaList() {
    try {
      const saved = localStorage.getItem('andy_tv_media_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        const customItems = parsed.filter(p => p && p.id && p.id.startsWith('custom-'));
        return [...DEFAULT_MEDIA, ...customItems];
      }
    } catch (e) {}
    return [...DEFAULT_MEDIA];
  }

  saveMediaList() {
    try {
      const customOnly = this.mediaList.filter(item => item.id.startsWith('custom-'));
      localStorage.setItem('andy_tv_media_v6', JSON.stringify(customOnly));
    } catch (e) {}
  }

  loadEngagement() {
    try {
      const saved = localStorage.getItem('andy_tv_engagement_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveEngagement(data) {
    try {
      localStorage.setItem('andy_tv_engagement_v1', JSON.stringify(data));
    } catch (e) {}
  }

  getItemEngagement(id, baseViews = 2500, baseLikes = 450) {
    const engagement = this.loadEngagement();
    if (!engagement[id]) {
      engagement[id] = { views: baseViews, likes: baseLikes, userLiked: false };
      this.saveEngagement(engagement);
    }
    return engagement[id];
  }

  recordView(id, baseViews = 2500, baseLikes = 450) {
    const engagement = this.loadEngagement();
    if (!engagement[id]) {
      engagement[id] = { views: baseViews, likes: baseLikes, userLiked: false };
    }
    engagement[id].views = (engagement[id].views || baseViews) + 1;
    this.saveEngagement(engagement);
    return engagement[id];
  }

  toggleLike(id, baseViews = 2500, baseLikes = 450) {
    const engagement = this.loadEngagement();
    if (!engagement[id]) {
      engagement[id] = { views: baseViews, likes: baseLikes, userLiked: false };
    }
    if (engagement[id].userLiked) {
      engagement[id].likes = Math.max(0, (engagement[id].likes || baseLikes) - 1);
      engagement[id].userLiked = false;
      this.showToast('Me gusta eliminado');
    } else {
      engagement[id].likes = (engagement[id].likes || baseLikes) + 1;
      engagement[id].userLiked = true;
      this.showToast('¡Te gustó esta película! 🇵🇪');
    }
    this.saveEngagement(engagement);
    this.updatePlayerEngagementUI(id);
    this.render();
    return engagement[id];
  }

  toggleCurrentPlayingLike() {
    if (this.currentPlaying) {
      this.toggleLike(this.currentPlaying.id, this.currentPlaying.baseViews, this.currentPlaying.baseLikes);
    }
  }

  updatePlayerEngagementUI(id) {
    const stats = this.getItemEngagement(id);
    const viewsEl = document.getElementById('player-modal-views-count');
    const likesEl = document.getElementById('player-modal-likes-count');
    const likeBtn = document.getElementById('player-modal-like-btn');
    const likeIcon = document.getElementById('player-modal-like-icon');

    if (viewsEl) viewsEl.textContent = `${(stats.views || 0).toLocaleString()} vistas`;
    if (likesEl) likesEl.textContent = `${(stats.likes || 0).toLocaleString()} likes`;

    if (likeBtn && likeIcon) {
      if (stats.userLiked) {
        likeBtn.className = 'px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-rose-500/10';
        likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-rose-500 fill-rose-500');
      } else {
        likeBtn.className = 'px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 border border-zinc-700/80 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer';
        likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-zinc-400');
      }
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('andy_tv_favs_v3');
      return saved ? JSON.parse(saved) : ['avatar-2-el-sentido-del-agua', 'la-guerra-del-planeta-de-los-simios', 'the-batman-2022'];
    } catch (e) {
      return ['avatar-2-el-sentido-del-agua'];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('andy_tv_favs_v3', JSON.stringify(this.favorites));
    } catch (e) {}
  }

  init() {
    this.activeHero = this.mediaList.find(m => m.isFeatured) || this.mediaList[0];
    this.setupNavigation();
    this.setupSearch();
    this.setupCustomMovieForm();
    this.setupShortcuts();
    this.updateAdminUI();
    this.render();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('[data-tab]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    
    document.querySelectorAll('[data-tab]').forEach(btn => {
      const isCurrent = btn.getAttribute('data-tab') === tabName;
      if (isCurrent) {
        btn.classList.add('bg-[#eab308]', 'text-black', 'shadow-lg', 'shadow-yellow-500/20');
        btn.classList.remove('text-zinc-400', 'text-zinc-500', 'hover:text-white', 'hover:bg-zinc-800/60');
      } else {
        btn.classList.remove('bg-[#eab308]', 'text-black', 'shadow-lg', 'shadow-yellow-500/20');
        btn.classList.add('text-zinc-400', 'hover:text-white', 'hover:bg-zinc-800/60');
      }
    });

    document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));

    const targetView = document.getElementById(\`view-\${tabName}\`);
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.render();
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('search-modal-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderSearchResults(e.target.value);
      });
    }

    const filterBtns = document.querySelectorAll('[data-search-filter]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-yellow-400', 'text-black', 'font-bold');
          b.classList.add('bg-zinc-800/80', 'text-zinc-400');
        });
        btn.classList.add('bg-yellow-400', 'text-black', 'font-bold');
        btn.classList.remove('bg-zinc-800/80', 'text-zinc-400');
        this.searchFilter = btn.getAttribute('data-search-filter') || 'all';
        this.renderSearchResults(searchInput ? searchInput.value : '');
      });
    });
  }

  openSearch() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('hidden');
      const input = document.getElementById('search-modal-input');
      if (input) {
        input.value = '';
        input.focus();
        this.renderSearchResults('');
      }
    }
  }

  closeSearch() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.add('hidden');
  }

  openCreatorModal() {
    this.requireAdmin(() => {
      const modal = document.getElementById('creator-modal');
      if (modal) modal.classList.remove('hidden');
    });
  }

  closeCreatorModal() {
    const modal = document.getElementById('creator-modal');
    if (modal) modal.classList.add('hidden');
  }

  closeModals() {
    this.closeSearch();
    this.closePlayer();
    this.closeDetails();
    this.closeCreatorModal();
    this.closeAdminLoginModal();
  }

  copyToClipboard(text, alertMsg = 'Copiado al portapapeles!') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(alertMsg);
      }).catch(() => {
        this.fallbackCopy(text, alertMsg);
      });
    } else {
      this.fallbackCopy(text, alertMsg);
    }
  }

  fallbackCopy(text, alertMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(alertMsg);
    } catch (e) {}
    document.body.removeChild(textArea);
  }

  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-yellow-400 text-black px-4 py-2.5 rounded-2xl font-bold text-xs shadow-2xl flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0';
      document.body.appendChild(toast);
    }

    toast.innerHTML = \`<span>🇵🇪</span><span>\${message}</span>\`;
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-2', 'opacity-0');
    }, 3000);
  }

  setupCustomMovieForm() {
    const form = document.getElementById('add-movie-form');
    const downloadBtn = document.getElementById('download-html-btn');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.requireAdmin(() => {
          this.executeAddMovie();
        });
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.requireAdmin(() => {
          this.executeDownloadFormHtml();
        });
      });
    }
  }

  executeAddMovie() {
    const title = document.getElementById('form-title').value.trim();
    const originalTitle = document.getElementById('form-orig-title')?.value.trim() || title;
    const year = parseInt(document.getElementById('form-year')?.value || new Date().getFullYear(), 10);
    const quality = document.getElementById('form-quality')?.value || '1080p FHD';
    const lang = document.getElementById('form-lang')?.value || 'Español Latino';
    const provider = document.getElementById('form-provider')?.value || 'StreamWish';
    const url = document.getElementById('form-url').value.trim();
    const poster = document.getElementById('form-poster')?.value.trim() || 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';
    const backdrop = document.getElementById('form-backdrop')?.value.trim() || poster;
    const category = document.getElementById('form-category')?.value || 'movie';
    const genres = (document.getElementById('form-genres')?.value || 'Estreno, Acción').split(',').map(s => s.trim()).filter(Boolean);
    const overview = document.getElementById('form-overview')?.value.trim() || 'Película agregada por el Administrador Andy Axcel Dominguez Ccorau TV.';
    const director = document.getElementById('form-director')?.value.trim() || 'Andy Axcel Dominguez Ccorau';
    const cast = (document.getElementById('form-cast')?.value || 'Elenco Principal').split(',').map(s => s.trim()).filter(Boolean);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = \`custom-\${slug}-\${Date.now().toString().slice(-4)}\`;
    const htmlPage = \`\${slug}.html\`;

    const newMedia = {
      id,
      title,
      originalTitle,
      type: category,
      isAnime: category === 'anime',
      poster,
      backdrop,
      year,
      rating: 9.0,
      quality,
      duration: '2h 00m',
      genres,
      overview,
      director,
      cast,
      platform: 'andyaxceldominguezccorau TV',
      htmlPage,
      keywords: \`\${slug}, \${title}, latino, 4k, andy\`,
      servers: [
        { id: \`srv-1-\${id}\`, name: \`\${provider} Principal\`, quality, lang, url, provider },
        { id: \`srv-2-\${id}\`, name: 'Doodstream Backup', quality: '1080p', lang: 'Latino', url, provider: 'Doodstream' }
      ],
      isFeatured: false,
      isTrending: true
    };

    this.mediaList.unshift(newMedia);
    this.saveMediaList();
    this.render();
    this.closeCreatorModal();
    this.showToast(\`¡"\${title}" agregada por Administrador Andy!\`);
    this.playMedia(newMedia);
  }

  executeDownloadFormHtml() {
    const title = document.getElementById('form-title').value.trim() || 'mi-pelicula';
    const url = document.getElementById('form-url').value.trim() || 'https://playmogo.com/e/ykm9tsifkch1';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const content = \`<!DOCTYPE html><html><head><meta charset="utf-8"/><title>\${title} - andyaxceldominguezccorau TV 🇵🇪</title></head><body style="margin:0;background:#000;height:100vh;overflow:hidden;"><iframe src="\${url}" style="width:100%;height:100%;border:0;" allowfullscreen></iframe></body></html>\`;
    
    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = \`\${slug}.html\`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast(\`Archivo \${slug}.html descargado por Admin Andy 🇵🇪\`);
  }

  executeDownloadMediaHtml(item) {
    const streamUrl = (item.servers && item.servers[0]?.url) ? item.servers[0].url : 'https://playmogo.com/e/ykm9tsifkch1';
    const content = \`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>\${item.title} - andyaxceldominguezccorau TV 🇵🇪</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#0a0a0d; color:#fff; font-family:system-ui,-apple-system,sans-serif; height:100vh; display:flex; flex-direction:column; }
    header { background:#141418; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #27272a; }
    .brand { font-weight:800; font-size:15px; color:#eab308; }
    .badge { background:rgba(220,38,38,0.2); color:#f87171; border:1px solid rgba(239,68,68,0.4); padding:2px 8px; border-radius:9999px; font-size:11px; font-weight:bold; }
    .video-box { flex:1; width:100%; background:#000; }
    iframe { width:100%; height:100%; border:none; }
  </style>
</head>
<body>
  <header>
    <div class="brand">andyaxceldominguezccorau TV <span class="badge">🇵🇪 PERÚ</span></div>
    <div style="font-size:13px;color:#a1a1aa;">\${item.title} (\${item.year})</div>
  </header>
  <div class="video-box">
    <iframe src="\${streamUrl}" allowfullscreen allow="autoplay; fullscreen; encrypted-media"></iframe>
  </div>
</body>
</html>\`;

    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const fileName = item.htmlPage || (item.id + '.html');
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast(\`Archivo \${fileName} descargado por Admin Andy 🇵🇪\`);
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }

  toggleFavorite(id) {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter(favId => favId !== id);
      this.showToast('Eliminado de Mi Lista');
    } else {
      this.favorites.push(id);
      this.showToast('Guardado en Mi Lista 🇵🇪');
    }
    this.saveFavorites();
    this.render();
  }

  shuffleHero() {
    const featured = this.mediaList.filter(m => m.isTrending || m.isFeatured);
    this.heroIndex = (this.heroIndex + 1) % featured.length;
    this.activeHero = featured[this.heroIndex];
    this.renderHero();
  }

  playMedia(item) {
    this.currentPlaying = item;
    const modal = document.getElementById('video-player-modal');
    if (!modal) return;

    // Record dynamic view count in local state
    this.recordView(item.id, item.baseViews, item.baseLikes);
    this.updatePlayerEngagementUI(item.id);

    modal.classList.remove('hidden');

    const backdropImg = document.getElementById('player-modal-backdrop-bg');
    if (backdropImg) {
      const bgUrl = item.backdrop || item.poster || 'https://image.tmdb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';
      backdropImg.src = bgUrl;
      backdropImg.onerror = () => {
        backdropImg.src = item.poster || 'https://image.tmdb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';
      };
    }

    const titleEl = document.getElementById('player-movie-title');
    const metaEl = document.getElementById('player-movie-meta');
    const downloadLink = document.getElementById('player-download-html-link');
    const singlePageLink = document.getElementById('player-single-page-link');

    if (titleEl) titleEl.textContent = item.title;
    if (metaEl) metaEl.textContent = \`\${item.year} • \${item.quality} • \${item.duration} • Español Latino 🇵🇪\`;

    if (singlePageLink) {
      if (item.htmlPage) {
        singlePageLink.href = item.htmlPage;
        singlePageLink.classList.remove('hidden');
      } else {
        singlePageLink.classList.add('hidden');
      }
    }

    if (downloadLink) {
      downloadLink.onclick = () => {
        this.requireAdmin(() => {
          this.executeDownloadMediaHtml(item);
        });
      };
    }

    this.renderServerButtons(item);
    if (item.servers && item.servers.length > 0) {
      this.switchServer(item.servers[0]);
    }
  }

  renderServerButtons(item) {
    const container = document.getElementById('player-servers-container');
    if (!container) return;

    container.innerHTML = '';
    item.servers.forEach((server, index) => {
      const btn = document.createElement('button');
      btn.className = \`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 cursor-pointer \${
        index === 0 
          ? 'bg-yellow-400 text-black border-yellow-400 shadow-md' 
          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700/60'
      }\`;
      btn.innerHTML = \`
        <span>⚡</span>
        <span class="truncate">\${server.name}</span>
      \`;

      btn.onclick = () => {
        container.querySelectorAll('button').forEach(b => {
          b.className = 'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700/60 cursor-pointer flex items-center justify-center space-x-1.5';
        });
        btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border bg-yellow-400 text-black border-yellow-400 shadow-md cursor-pointer flex items-center justify-center space-x-1.5';
        this.switchServer(server);
      };

      container.appendChild(btn);
    });
  }

  switchServer(server) {
    this.currentServer = server;
    const videoContainer = document.getElementById('player-screen-wrapper');
    if (!videoContainer) return;

    const movieArt = this.currentPlaying?.backdrop || this.currentPlaying?.poster || 'https://image.tmdb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg';

    videoContainer.innerHTML = \`
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img src="\${movieArt}" class="w-full h-full object-cover blur-md opacity-45 scale-105" alt="Fondo Película" onerror="this.style.display='none'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center space-y-2 opacity-70">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shadow-lg">
              <span class="text-xl font-black text-yellow-400">🇵🇪</span>
            </div>
            <p class="text-xs font-bold text-zinc-300">Cargando \${this.currentPlaying?.title || 'Transmisión'}...</p>
          </div>
        </div>
      </div>
    \`;
    const url = server.url;

    if (url.endsWith('.m3u8') || url.endsWith('.mp4')) {
      const video = document.createElement('video');
      video.className = 'relative z-10 w-full h-full object-contain';
      video.controls = true;
      video.autoplay = true;
      videoContainer.appendChild(video);

      if (url.endsWith('.m3u8') && window.Hls && window.Hls.isSupported()) {
        if (this.hlsInstance) this.hlsInstance.destroy();
        this.hlsInstance = new window.Hls();
        this.hlsInstance.loadSource(url);
        this.hlsInstance.attachMedia(video);
        this.hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else {
        video.src = url;
        video.play().catch(() => {});
      }
    } else {
      const iframe = document.createElement('iframe');
      iframe.className = 'relative z-10 w-full h-full border-0';
      iframe.referrerPolicy = 'no-referrer';
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      iframe.src = url;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
      iframe.allowFullscreen = true;
      videoContainer.appendChild(iframe);

      const extBtn = document.getElementById('player-external-btn');
      if (extBtn) {
        extBtn.href = url;
      }
    }
  }

  closePlayer() {
    const modal = document.getElementById('video-player-modal');
    if (modal) modal.classList.add('hidden');
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    const videoContainer = document.getElementById('player-screen-wrapper');
    if (videoContainer) videoContainer.innerHTML = '';
  }

  openDetails(item) {
    const modal = document.getElementById('media-detail-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    const backdrop = document.getElementById('detail-backdrop');
    const title = document.getElementById('detail-title');
    const meta = document.getElementById('detail-meta');
    const rating = document.getElementById('detail-rating');
    const quality = document.getElementById('detail-quality');
    const overview = document.getElementById('detail-overview');
    const director = document.getElementById('detail-director');
    const cast = document.getElementById('detail-cast');
    const watchBtn = document.getElementById('detail-watch-btn');
    const htmlLink = document.getElementById('detail-html-link');
    const favBtn = document.getElementById('detail-fav-btn');

    if (backdrop) {
      backdrop.src = item.backdrop || item.poster;
      backdrop.onerror = () => { backdrop.src = getPosterFallback(item.title, item.genres[0], item.year); };
    }
    if (title) title.textContent = item.title;
    if (meta) meta.textContent = \`\${item.year} • \${item.duration} • \${item.genres.join(', ')}\`;
    if (rating) rating.textContent = item.rating.toFixed(1);
    if (quality) quality.textContent = item.quality;
    if (overview) overview.textContent = item.overview;
    if (director) director.textContent = item.director;
    if (cast) cast.textContent = item.cast.join(', ');

    if (watchBtn) {
      watchBtn.onclick = () => {
        this.closeDetails();
        this.playMedia(item);
      };
    }

    if (htmlLink) {
      if (item.htmlPage) {
        htmlLink.href = item.htmlPage;
        htmlLink.classList.remove('hidden');
      } else {
        htmlLink.classList.add('hidden');
      }
    }

    if (favBtn) {
      const isFav = this.isFavorite(item.id);
      favBtn.textContent = isFav ? 'En Mi Lista ✓' : 'Guardar';
      favBtn.onclick = () => {
        this.toggleFavorite(item.id);
        const nowFav = this.isFavorite(item.id);
        favBtn.textContent = nowFav ? 'En Mi Lista ✓' : 'Guardar';
      };
    }

    const viewsText = document.getElementById('detail-views-text');
    const likesText = document.getElementById('detail-likes-text');
    const likeBtn = document.getElementById('detail-like-btn');
    const likeIcon = document.getElementById('detail-like-icon');

    const updateDetailEngagement = () => {
      const stats = this.getItemEngagement(item.id, item.baseViews, item.baseLikes);
      if (viewsText) viewsText.textContent = `${(stats.views || 0).toLocaleString()} vistas`;
      if (likesText) likesText.textContent = `${(stats.likes || 0).toLocaleString()} likes`;
      if (likeBtn && likeIcon) {
        if (stats.userLiked) {
          likeBtn.className = 'px-3 py-2 rounded-xl bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/40 flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg shadow-rose-500/10';
          likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-rose-500 fill-rose-500');
        } else {
          likeBtn.className = 'px-3 py-2 rounded-xl bg-zinc-800 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 text-xs font-bold border border-zinc-700 flex items-center space-x-1.5 transition-all cursor-pointer';
          likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-zinc-400');
        }
      }
    };

    updateDetailEngagement();

    if (likeBtn) {
      likeBtn.onclick = () => {
        this.toggleLike(item.id, item.baseViews, item.baseLikes);
        updateDetailEngagement();
      };
    }
  }

  closeDetails() {
    const modal = document.getElementById('media-detail-modal');
    if (modal) modal.classList.add('hidden');
  }

  renderHero() {
    const item = this.activeHero;
    if (!item) return;

    const heroImg = document.getElementById('hero-img');
    const heroTitle = document.getElementById('hero-title');
    const heroType = document.getElementById('hero-type-badge');
    const heroFavBtn = document.getElementById('hero-fav-btn');

    if (heroImg) {
      heroImg.src = item.backdrop || item.poster;
      heroImg.onerror = () => { heroImg.src = getPosterFallback(item.title, item.genres[0], item.year); };
    }
    if (heroTitle) heroTitle.textContent = item.title;
    if (heroType) heroType.textContent = item.type === 'movie' ? 'MOVIE 4K' : (item.type === 'anime' ? 'ANIME 4K' : 'TV SHOW 4K');

    if (heroFavBtn) {
      const isFav = this.isFavorite(item.id);
      heroFavBtn.className = \`p-2 rounded-xl transition-all cursor-pointer \${
        isFav ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20' : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200'
      }\`;
    }

    const heroWatchBtn = document.getElementById('hero-watch-btn');
    if (heroWatchBtn) heroWatchBtn.onclick = () => this.playMedia(item);

    const heroDetailsBtn = document.getElementById('hero-details-btn');
    if (heroDetailsBtn) heroDetailsBtn.onclick = () => this.openDetails(item);

    if (heroFavBtn) heroFavBtn.onclick = () => this.toggleFavorite(item.id);

    const heroShuffleBtn = document.getElementById('hero-shuffle-btn');
    if (heroShuffleBtn) heroShuffleBtn.onclick = () => this.shuffleHero();
  }

  renderRow(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'flex-shrink-0 w-32 sm:w-36 md:w-44 cursor-pointer group/card flex flex-col card-hover-effect';
      
      const safeTitle = item.title.replace(/'/g, "\\'");
      const genre = item.genres[0] || '4K';
      const stats = this.getItemEngagement(item.id, item.baseViews, item.baseLikes);

      card.innerHTML = \`
        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md group-hover/card:border-yellow-400/50 group-hover/card:shadow-xl group-hover/card:shadow-yellow-500/10 transition-all">
          <img 
            src="\${item.poster}" 
            alt="\${item.title}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src=getPosterFallback('\${safeTitle}', '\${genre}', '\${item.year}');"
            class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
          />
          <div class="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400 border border-yellow-400/30">
            \${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            \${item.quality}
          </div>
          <!-- Views and Likes pill on card -->
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span class="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-semibold text-zinc-300 flex items-center space-x-1">
              <span>👁️</span>
              <span>\${(stats.views || 0) > 999 ? ((stats.views/1000).toFixed(1) + 'k') : (stats.views || 0)}</span>
            </span>
            <span class="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-semibold \${stats.userLiked ? 'text-rose-400' : 'text-zinc-300'} flex items-center space-x-1">
              <span>❤️</span>
              <span>\${(stats.likes || 0) > 999 ? ((stats.likes/1000).toFixed(1) + 'k') : (stats.likes || 0)}</span>
            </span>
          </div>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform">
              <svg class="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="mt-2 px-0.5">
          <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate group-hover/card:text-yellow-400 transition-colors">
            \${item.title}
          </h3>
          <p class="text-[11px] text-zinc-400 truncate mt-0.5 flex items-center space-x-1">
            <span class="text-yellow-400/80">🇵🇪</span>
            <span>\${item.year} • \${item.genres[0] || '4K'}</span>
          </p>
        </div>
      \`;

      card.onclick = () => this.playMedia(item);
      container.appendChild(card);
    });
  }

  renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cursor-pointer group flex flex-col card-hover-effect';
      
      const safeTitle = item.title.replace(/'/g, "\\'");
      const genre = item.genres[0] || '4K';
      const stats = this.getItemEngagement(item.id, item.baseViews, item.baseLikes);

      card.innerHTML = \`
        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg group-hover:border-yellow-400/50 transition-all">
          <img 
            src="\${item.poster}" 
            alt="\${item.title}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src=getPosterFallback('\${safeTitle}', '\${genre}', '\${item.year}');"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div class="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400">
            \${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            \${item.quality}
          </div>
          <!-- Views and Likes badge on grid cards -->
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span class="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-semibold text-zinc-300 flex items-center space-x-1">
              <span>👁️</span>
              <span>\${(stats.views || 0) > 999 ? ((stats.views/1000).toFixed(1) + 'k') : (stats.views || 0)}</span>
            </span>
            <span class="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-semibold \${stats.userLiked ? 'text-rose-400' : 'text-zinc-300'} flex items-center space-x-1">
              <span>❤️</span>
              <span>\${(stats.likes || 0) > 999 ? ((stats.likes/1000).toFixed(1) + 'k') : (stats.likes || 0)}</span>
            </span>
          </div>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate mt-2 group-hover:text-yellow-400">
          \${item.title}
        </h3>
        <p class="text-[11px] text-zinc-400 truncate flex items-center space-x-1">
          <span>🇵🇪</span>
          <span>\${item.year} • \${item.genres[0] || '4K'}</span>
        </p>
      \`;

      card.onclick = () => this.playMedia(item);
      container.appendChild(card);
    });
  }

  renderSearchResults(query) {
    const container = document.getElementById('search-results-grid');
    const headerTitle = document.getElementById('search-header-title');
    if (!container) return;

    const trimmed = query.toLowerCase().trim();
    
    let filtered = this.mediaList;
    if (this.searchFilter === 'movie') {
      filtered = filtered.filter(m => m.type === 'movie');
    } else if (this.searchFilter === 'tv') {
      filtered = filtered.filter(m => m.type === 'tv');
    } else if (this.searchFilter === 'anime') {
      filtered = filtered.filter(m => m.isAnime || m.type === 'anime');
    } else if (this.searchFilter === 'html') {
      filtered = filtered.filter(m => Boolean(m.htmlPage));
    }

    if (trimmed) {
      filtered = filtered.filter(item => 
        (item.id && item.id.toLowerCase().includes(trimmed)) ||
        (item.title && item.title.toLowerCase().includes(trimmed)) ||
        (item.originalTitle && item.originalTitle.toLowerCase().includes(trimmed)) ||
        (item.director && item.director.toLowerCase().includes(trimmed)) ||
        (item.cast && item.cast.some(c => c.toLowerCase().includes(trimmed))) ||
        (item.keywords && item.keywords.toLowerCase().includes(trimmed)) ||
        (item.genres && item.genres.some(g => g.toLowerCase().includes(trimmed))) ||
        (item.htmlPage && item.htmlPage.toLowerCase().includes(trimmed))
      );
    }

    if (headerTitle) {
      headerTitle.innerHTML = trimmed
        ? \`Resultados para <span class="text-yellow-400">"\${query}"</span> (\${filtered.length} encontrados)\`
        : \`Catálogo Disponible en andyaxceldominguezccorau TV 🇵🇪 <span class="text-yellow-400 font-extrabold">(\${filtered.length} títulos)</span>\`;
    }

    container.innerHTML = '';
    
    if (filtered.length === 0) {
      container.innerHTML = \`
        <div class="col-span-full py-12 text-center text-zinc-500">
          <p class="text-base font-semibold">No se encontraron resultados para "\${query}"</p>
          <p class="text-xs text-zinc-600 mt-1">Prueba con palabras clave, título, actor, año o ID (#avatar-2)</p>
        </div>
      \`;
      return;
    }

    filtered.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'flex items-center justify-between p-3 rounded-2xl bg-[#141419] hover:bg-[#1c1c24] border border-zinc-800/80 hover:border-yellow-400/50 cursor-pointer transition-all duration-200 group';
      
      const safeTitle = item.title.replace(/'/g, "\\'");
      const genre = item.genres[0] || '4K';

      itemEl.innerHTML = \`
        <div class="flex items-center space-x-3.5 min-w-0 flex-1">
          <div class="w-14 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 relative border border-zinc-800">
            <img 
              src="\${item.poster}" 
              alt="\${item.title}" 
              onerror="this.onerror=null; this.src=getPosterFallback('\${safeTitle}', '\${genre}', '\${item.year}');"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
          </div>
          <div class="flex-1 min-w-0 pr-2">
            <div class="flex items-center space-x-2">
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-yellow-400 font-mono font-bold">#\${item.id}</span>
              <span class="text-[10px] text-zinc-400">\${item.year}</span>
            </div>
            <h3 class="text-sm font-bold text-zinc-100 group-hover:text-yellow-400 truncate mt-0.5">
              \${item.title}
            </h3>
            <p class="text-xs text-zinc-400 mt-0.5 truncate">
              ★ \${item.rating.toFixed(1)} • \${item.genres.slice(0, 2).join(', ')} • \${item.quality}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2 flex-shrink-0">
          \${item.htmlPage ? \`
            <a href="\${item.htmlPage}" class="p-2 rounded-xl bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 transition-colors border border-zinc-700 text-xs font-semibold flex items-center space-x-1" title="Abrir página HTML individual">
              <span class="text-[11px] font-bold">.HTML</span>
            </a>
          \` : ''}
          <button class="p-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-bold transition-all shadow-md flex items-center justify-center">
            <svg class="w-4 h-4 fill-black" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
        </div>
      \`;

      itemEl.onclick = (e) => {
        if (e.target.closest('a')) return;
        this.closeSearch();
        this.playMedia(item);
      };

      container.appendChild(itemEl);
    });
  }

  render() {
    this.renderHero();

    const favBadge = document.getElementById('fav-count-badge');
    if (favBadge) {
      if (this.favorites.length > 0) {
        favBadge.textContent = this.favorites.length;
        favBadge.classList.remove('hidden');
      } else {
        favBadge.classList.add('hidden');
      }
    }

    const movies = this.mediaList.filter(m => m.type === 'movie');
    const series = this.mediaList.filter(m => m.type === 'tv');
    const anime = this.mediaList.filter(m => m.isAnime || m.type === 'anime');
    const trending = this.mediaList.filter(m => m.isTrending);
    const favItems = this.mediaList.filter(m => this.favorites.includes(m.id));

    this.renderRow('row-latest-movies', movies);
    this.renderRow('row-latest-tv', series);
    this.renderRow('row-latest-anime', anime);
    this.renderRow('row-trending', trending);

    this.renderGrid('grid-explore', this.mediaList);
    this.renderGrid('grid-movies', movies);
    this.renderGrid('grid-tv', series);
    this.renderGrid('grid-anime', anime);
    this.renderGrid('grid-trending', trending);
    this.renderGrid('grid-favorites', favItems);

    const emptyFavs = document.getElementById('fav-empty-state');
    if (emptyFavs) {
      if (favItems.length === 0) {
        emptyFavs.classList.remove('hidden');
      } else {
        emptyFavs.classList.add('hidden');
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Global Startup Instance
function startAndyApp() {
  if (!window.app) {
    window.app = new AndyStreamApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAndyApp);
} else {
  startAndyApp();
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'app.js'), appJsCode, 'utf8');
console.log('Built src/app.js successfully with andyaxceldominguezccorau TV Peru 🇵🇪');
