const fs = require('fs');
const path = require('path');

const generatorContent = fs.readFileSync(path.join(__dirname, 'generate_movies.cjs'), 'utf8');

// Extract MOVIES_DATABASE
const match = generatorContent.match(/const MOVIES_DATABASE = (\[[\s\S]*?\]);\s*function generateHtmlContent/);
if (!match) {
  console.error('Could not extract MOVIES_DATABASE');
  process.exit(1);
}

const moviesData = eval(match[1]);

// Transform to DEFAULT_MEDIA with full server configurations
const defaultMedia = moviesData.map((m, idx) => {
  const isAvatar = m.id === 'avatar-2-el-sentido-del-agua';
  const imdb = m.imdbId || 'tt1630029';
  
  const servers = [];
  if (isAvatar) {
    servers.push(
      { id: 'dood-avatar2-d000d', name: 'Doodstream (Espejo 1)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://d000d.com/e/ykm9tsifkch1', provider: 'Doodstream' },
      { id: 'dood-avatar2-playmogo', name: 'Doodstream Playmogo', quality: '1080p FHD', lang: 'Español Latino', url: 'https://playmogo.com/e/ykm9tsifkch1', provider: 'Doodstream' },
      { id: 'dood-avatar2-do0od', name: 'Doodstream (Espejo 2)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://do0od.com/e/ykm9tsifkch1', provider: 'Doodstream' },
      { id: 'dood-avatar2-ds2play', name: 'Doodstream (Espejo 3)', quality: '1080p FHD', lang: 'Español Latino', url: 'https://ds2play.com/e/ykm9tsifkch1', provider: 'Doodstream' }
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
    { id: `tape-${m.id}`, name: 'Streamtape MP4', quality: '1080p FHD', lang: 'Español Latino', url: `https://streamtape.com/e/${imdb}`, provider: 'Streamtape' }
  );

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
    isFeatured: idx === 0 || idx === 1,
    isTrending: idx < 12
  };
});

const appJsTemplate = `/**
 * andyaxceldcc TV - Streaming 4K Platform Engine
 * Pure Vanilla JavaScript with 33+ Indexed Movie HTML Pages
 */

// Global Indexed Media Database
const DEFAULT_MEDIA = ${JSON.stringify(defaultMedia, null, 2)};

// App State Management
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

    this.init();
  }

  loadMediaList() {
    try {
      const saved = localStorage.getItem('andy_tv_media_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        const customItems = parsed.filter(p => p && p.id && p.id.startsWith('custom-'));
        return [...DEFAULT_MEDIA, ...customItems];
      }
    } catch (e) {}
    return DEFAULT_MEDIA;
  }

  saveMediaList() {
    try {
      const customOnly = this.mediaList.filter(item => item.id.startsWith('custom-'));
      localStorage.setItem('andy_tv_media_v3', JSON.stringify(customOnly));
    } catch (e) {}
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('andy_tv_favs');
      return saved ? JSON.parse(saved) : ['avatar-2-el-sentido-del-agua', 'la-guerra-del-planeta-de-los-simios', 'the-batman-2022'];
    } catch (e) {
      return ['avatar-2-el-sentido-del-agua'];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('andy_tv_favs', JSON.stringify(this.favorites));
    } catch (e) {}
  }

  init() {
    this.activeHero = this.mediaList.find(m => m.isFeatured) || this.mediaList[0];
    this.setupNavigation();
    this.setupSearch();
    this.setupCustomMovieForm();
    this.setupShortcuts();
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

    this.render();
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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

  closeModals() {
    this.closeSearch();
    this.closePlayer();
    this.closeDetails();
  }

  setupCustomMovieForm() {
    const form = document.getElementById('add-movie-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('form-title').value.trim();
        const url = document.getElementById('form-url').value.trim();
        const poster = document.getElementById('form-poster').value.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
        const serverName = document.getElementById('form-server-name').value.trim() || 'Servidor Personalizado';
        const quality = document.getElementById('form-quality').value || '1080p FHD';
        const lang = document.getElementById('form-lang').value || 'Español Latino';
        const genres = document.getElementById('form-genres').value.split(',').map(s => s.trim()).filter(Boolean);

        if (!title || !url) {
          alert('Por favor completa el título y la URL del video.');
          return;
        }

        const newMovie = {
          id: \`custom-\${Date.now()}\`,
          title,
          originalTitle: title,
          type: 'movie',
          poster,
          backdrop: poster,
          year: new Date().getFullYear(),
          rating: 9.0,
          quality,
          duration: 'Directo',
          genres: genres.length ? genres : ['Estreno', 'Acción'],
          overview: 'Película o servidor añadido manualmente por el usuario.',
          director: 'Personalizado',
          cast: ['Usuario'],
          platform: 'Servidor Propio',
          htmlPage: 'avatar-2.html',
          servers: [
            {
              id: \`srv-\${Date.now()}\`,
              name: serverName,
              quality,
              lang,
              url,
              provider: 'Directo'
            }
          ],
          isTrending: true
        };

        this.mediaList.unshift(newMovie);
        this.saveMediaList();
        this.switchTab('home');
        this.playMedia(newMovie);
        form.reset();
      });
    }
  }

  shuffleHero() {
    const featuredList = this.mediaList.filter(m => m.backdrop);
    if (featuredList.length === 0) return;
    this.heroIndex = (this.heroIndex + 1) % featuredList.length;
    this.activeHero = featuredList[this.heroIndex];
    this.renderHero();
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }

  toggleFavorite(id) {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter(favId => favId !== id);
    } else {
      this.favorites.push(id);
    }
    this.saveFavorites();
    this.render();
  }

  playMedia(item, serverIndex = 0) {
    this.currentPlaying = item;
    this.currentServer = item.servers && item.servers[serverIndex] ? item.servers[serverIndex] : null;

    const modal = document.getElementById('player-modal');
    const titleEl = document.getElementById('player-title');
    const subtitleEl = document.getElementById('player-subtitle');
    const serverListEl = document.getElementById('player-server-list');
    const dedicatedLinkEl = document.getElementById('player-dedicated-page-btn');

    if (modal) modal.classList.remove('hidden');
    if (titleEl) titleEl.textContent = item.title;
    if (subtitleEl) subtitleEl.textContent = \`\${item.year} • \${item.quality} • \${item.genres.join(', ')}\`;

    if (dedicatedLinkEl) {
      if (item.htmlPage) {
        dedicatedLinkEl.href = item.htmlPage;
        dedicatedLinkEl.classList.remove('hidden');
      } else {
        dedicatedLinkEl.classList.add('hidden');
      }
    }

    if (serverListEl && item.servers) {
      serverListEl.innerHTML = '';
      item.servers.forEach((srv, idx) => {
        const btn = document.createElement('button');
        const isActive = idx === serverIndex;
        btn.className = \`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer \${
          isActive
            ? 'bg-yellow-400 text-black border-yellow-400 shadow-md font-bold'
            : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
        }\`;
        btn.innerHTML = \`
          <span class="truncate mr-2">\${srv.name}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded \${isActive ? 'bg-black/30 text-black' : 'bg-zinc-900 text-zinc-400'}">\${srv.quality}</span>
        \`;
        btn.onclick = () => {
          this.playMedia(item, idx);
        };
        serverListEl.appendChild(btn);
      });
    }

    if (this.currentServer) {
      this.loadVideoSource(this.currentServer.url);
    }
  }

  loadVideoSource(url) {
    const videoContainer = document.getElementById('player-video-container');
    if (!videoContainer) return;

    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }

    videoContainer.innerHTML = '';

    const isMp4 = url.includes('.mp4') || (this.currentServer && this.currentServer.type === 'mp4');
    const isHls = url.includes('.m3u8') || (this.currentServer && this.currentServer.type === 'hls');

    if (isMp4 || isHls) {
      const video = document.createElement('video');
      video.className = 'w-full h-full object-contain';
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;

      videoContainer.appendChild(video);

      if (isHls && window.Hls && Hls.isSupported()) {
        this.hlsInstance = new Hls();
        this.hlsInstance.loadSource(url);
        this.hlsInstance.attachMedia(video);
        this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else {
        video.src = url;
        video.play().catch(() => {});
      }
    } else {
      const iframe = document.createElement('iframe');
      iframe.className = 'w-full h-full border-0';
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
    const modal = document.getElementById('player-modal');
    if (modal) modal.classList.add('hidden');
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    const videoContainer = document.getElementById('player-video-container');
    if (videoContainer) videoContainer.innerHTML = '';
  }

  openDetails(item) {
    const modal = document.getElementById('media-detail-modal');
    if (!modal) return;

    modal.classList.remove('hidden');

    const poster = document.getElementById('detail-poster');
    const backdrop = document.getElementById('detail-backdrop');
    const title = document.getElementById('detail-title');
    const info = document.getElementById('detail-info');
    const overview = document.getElementById('detail-overview');
    const genres = document.getElementById('detail-genres');
    const playBtn = document.getElementById('detail-play-btn');
    const dedicatedBtn = document.getElementById('detail-html-page-btn');

    if (poster) poster.src = item.poster;
    if (backdrop) backdrop.src = item.backdrop || item.poster;
    if (title) title.textContent = item.title;
    if (info) info.textContent = \`\${item.year} • \${item.duration} • ★ \${item.rating.toFixed(1)}/10 • \${item.platform}\`;
    if (overview) overview.textContent = item.overview;

    if (genres) {
      genres.innerHTML = item.genres.map(g => \`<span class="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-medium border border-zinc-700/50">\${g}</span>\`).join('');
    }

    if (playBtn) {
      playBtn.onclick = () => {
        this.closeDetails();
        this.playMedia(item);
      };
    }

    if (dedicatedBtn) {
      if (item.htmlPage) {
        dedicatedBtn.href = item.htmlPage;
        dedicatedBtn.classList.remove('hidden');
      } else {
        dedicatedBtn.classList.add('hidden');
      }
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

    if (heroImg) heroImg.src = item.backdrop || item.poster;
    if (heroTitle) heroTitle.textContent = item.title;
    if (heroType) heroType.textContent = item.type === 'movie' ? 'PELÍCULA 4K' : (item.type === 'anime' ? 'ANIME 4K' : 'SERIE 4K');

    if (heroFavBtn) {
      const isFav = this.isFavorite(item.id);
      heroFavBtn.className = \`p-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer \${
        isFav ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40' : 'bg-zinc-800/70 text-zinc-300 hover:text-white border-zinc-700/50 hover:bg-zinc-700'
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
      card.className = 'flex-shrink-0 w-32 sm:w-36 md:w-40 cursor-pointer group/card flex flex-col card-hover-effect';
      
      card.innerHTML = \`
        <div class="relative aspect-[2/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md group-hover/card:border-yellow-400/50 group-hover/card:shadow-xl group-hover/card:shadow-yellow-500/10 transition-all">
          <img src="\${item.poster}" alt="\${item.title}" loading="lazy" class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
          <div class="absolute top-2 left-2 bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-400 border border-yellow-400/30">
            \${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            \${item.quality}
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
          <p class="text-[11px] text-zinc-500 truncate mt-0.5">
            \${item.year} • \${item.genres[0] || 'HD'}
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
      
      card.innerHTML = \`
        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg group-hover:border-yellow-400/50 transition-all">
          <img src="\${item.poster}" alt="\${item.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-400">
            \${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            \${item.quality}
          </div>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate mt-2 group-hover:text-yellow-400">
          \${item.title}
        </h3>
        <p class="text-[11px] text-zinc-500 truncate">\${item.year} • \${item.genres[0] || '4K'}</p>
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
    const filtered = trimmed
      ? this.mediaList.filter(item => 
          (item.id && item.id.toLowerCase().includes(trimmed)) ||
          (item.title && item.title.toLowerCase().includes(trimmed)) ||
          (item.originalTitle && item.originalTitle.toLowerCase().includes(trimmed)) ||
          (item.director && item.director.toLowerCase().includes(trimmed)) ||
          (item.cast && item.cast.some(c => c.toLowerCase().includes(trimmed))) ||
          (item.keywords && item.keywords.toLowerCase().includes(trimmed)) ||
          (item.genres && item.genres.some(g => g.toLowerCase().includes(trimmed))) ||
          (item.platform && item.platform.toLowerCase().includes(trimmed))
        )
      : this.mediaList;

    if (headerTitle) {
      headerTitle.innerHTML = trimmed
        ? \`Resultados para <span class="text-yellow-400">"\${query}"</span> (\${filtered.length} encontrados)\`
        : \`Catálogo Indexado Completo <span class="text-yellow-400 font-extrabold">(\${this.mediaList.length} títulos)</span>\`;
    }

    container.innerHTML = '';
    
    if (filtered.length === 0) {
      container.innerHTML = \`
        <div class="col-span-full py-12 text-center text-zinc-500">
          <p class="text-base font-semibold">No se encontraron resultados para "\${query}"</p>
          <p class="text-xs text-zinc-600 mt-1">Prueba buscando por título, ID, actor, año o director</p>
        </div>
      \`;
      return;
    }

    filtered.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'flex items-center justify-between p-3 rounded-2xl bg-[#121216]/90 hover:bg-[#1c1c22] border border-zinc-800/80 hover:border-yellow-400/50 cursor-pointer transition-all duration-200 group';
      
      itemEl.innerHTML = \`
        <div class="flex items-center space-x-3.5 min-w-0 flex-1">
          <div class="w-14 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 relative border border-zinc-800">
            <img src="\${item.poster}" alt="\${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
              ★ \${item.rating.toFixed(1)} • \${item.genres.slice(0, 2).join(', ')} • \${item.platform}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2 flex-shrink-0">
          \${item.htmlPage ? \`
            <a href="\${item.htmlPage}" class="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-zinc-700 text-xs font-semibold flex items-center space-x-1" title="Abrir página HTML dedicada">
              <span class="hidden sm:inline">HTML</span>
              <svg class="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          \` : ''}
          <button class="p-2 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-bold transition-all shadow-md flex items-center justify-center">
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

    this.renderGrid('grid-movies', movies);
    this.renderGrid('grid-series', series);
    this.renderGrid('grid-anime', anime);
    this.renderGrid('grid-trending', trending);
    this.renderGrid('grid-favorites', favItems);

    const emptyFavs = document.getElementById('empty-favorites');
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

// Global Startup
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AndyStreamApp();
});
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'app.js'), appJsTemplate, 'utf8');
console.log('Successfully updated src/app.js with all indexed movies!');
