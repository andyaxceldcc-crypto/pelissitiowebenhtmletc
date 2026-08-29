```js
/**
 * andyaxceldominguezccorau TV 🇵🇪
 * Core Streaming & Social Hub Engine
 * Catálogo externo: catalogo.json
 */

function getPosterFallback(title, genre, year) {
  const palettes = [
    ['#09090b', '#1e1b4b', '#3b82f6'],
    ['#09090b', '#450a0a', '#ef4444'],
    ['#09090b', '#3f2c06', '#eab308'],
    ['#09090b', '#064e3b', '#10b981'],
    ['#09090b', '#3b0764', '#a855f7']
  ];

  const hash = (title || 'pelicula')
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const c = palettes[hash % palettes.length];

  const cleanTitle = (title || 'Película')
    .replace(/["'<>]/g, '');

  const cleanGenre = (genre || '4K UHD')
    .replace(/["'<>]/g, '');

  const cleanYear = (year || '2025').toString();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100%" height="100%">
    <defs>
      <linearGradient id="g${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c[0]}"/>
        <stop offset="60%" stop-color="${c[1]}"/>
        <stop offset="100%" stop-color="${c[2]}"/>
      </linearGradient>
    </defs>

    <rect width="400" height="600" fill="url(#g${hash})"/>

    <circle
      cx="200"
      cy="220"
      r="90"
      fill="${c[2]}"
      opacity="0.25"
    />

    <g transform="translate(160, 180) scale(1.6)">
      <polygon
        points="5 3 19 12 5 21 5 3"
        fill="${c[2]}"
        fill-opacity="0.9"
      />
    </g>

    <rect
      x="24"
      y="24"
      width="130"
      height="30"
      rx="8"
      fill="#eab308"
    />

    <text
      x="89"
      y="44"
      fill="#000000"
      font-size="12"
      font-family="system-ui, sans-serif"
      font-weight="900"
      text-anchor="middle"
    >🇵🇪 PERÚ 4K</text>

    <text
      x="200"
      y="380"
      fill="#ffffff"
      font-size="22"
      font-family="system-ui, sans-serif"
      font-weight="bold"
      text-anchor="middle"
    >${cleanTitle.substring(0, 24)}</text>

    <text
      x="200"
      y="415"
      fill="#facc15"
      font-size="14"
      font-family="system-ui, sans-serif"
      font-weight="600"
      text-anchor="middle"
    >${cleanGenre} • ${cleanYear}</text>

    <rect
      x="50"
      y="470"
      width="300"
      height="44"
      rx="12"
      fill="#18181b"
      stroke="#3f3f46"
      stroke-width="1.5"
    />

    <text
      x="200"
      y="498"
      fill="#e4e4e7"
      font-size="13"
      font-family="system-ui, sans-serif"
      font-weight="bold"
      text-anchor="middle"
    >andyaxceldominguezccorau TV</text>
  </svg>`;

  return 'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(svg);
}

window.getPosterFallback = getPosterFallback;


class AndyStreamApp {

  constructor() {
    this.mediaList = [];
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


  /*
   * ============================================================
   * CATÁLOGO
   * ============================================================
   */

  async loadCatalog() {
    try {
      const response = await fetch('./catalogo.json', {
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const catalog = await response.json();

      if (!Array.isArray(catalog)) {
        throw new Error(
          'catalogo.json debe contener un array JSON'
        );
      }

      this.mediaList = catalog
        .filter(item =>
          item &&
          item.id &&
          item.title
        )
        .map(item => ({
          ...item,

          originalTitle: item.originalTitle || item.title,

          type: item.type || 'movie',

          isAnime:
            Boolean(item.isAnime) ||
            item.type === 'anime',

          poster: item.poster || '',

          backdrop:
            item.backdrop ||
            item.poster ||
            '',

          year:
            Number(item.year) ||
            new Date().getFullYear(),

          rating:
            Number(item.rating) || 0,

          quality:
            item.quality || '1080p FHD',

          duration:
            item.duration || '',

          genres:
            Array.isArray(item.genres)
              ? item.genres
              : [],

          overview:
            item.overview || '',

          director:
            item.director || '',

          cast:
            Array.isArray(item.cast)
              ? item.cast
              : [],

          keywords:
            typeof item.keywords === 'string'
              ? item.keywords
              : '',

          htmlPage:
            item.htmlPage || '',

          servers:
            Array.isArray(item.servers)
              ? item.servers
              : [],

          isFeatured:
            Boolean(item.isFeatured),

          isTrending:
            Boolean(item.isTrending)
        }));

      console.log(
        `🎬 Catálogo cargado: ${this.mediaList.length} títulos`
      );

    } catch (error) {
      console.error(
        '❌ Error cargando catalogo.json:',
        error
      );

      this.mediaList = [];

      this.showToast(
        'No se pudo cargar catalogo.json'
      );
    }
  }


  /*
   * ============================================================
   * ADMIN
   * ============================================================
   */

  isAdmin() {
    return sessionStorage.getItem(
      'andy_tv_admin_auth'
    ) === 'true';
  }


  setAdmin(status) {
    if (status) {
      sessionStorage.setItem(
        'andy_tv_admin_auth',
        'true'
      );
    } else {
      sessionStorage.removeItem(
        'andy_tv_admin_auth'
      );
    }

    this.updateAdminUI();
  }


  updateAdminUI() {
    const adminStatusBadges =
      document.querySelectorAll(
        '.admin-status-indicator'
      );

    const isAdmin = this.isAdmin();

    adminStatusBadges.forEach(el => {
      el.classList.toggle(
        'hidden',
        !isAdmin
      );
    });

    const lockIcons =
      document.querySelectorAll(
        '.admin-lock-icon'
      );

    lockIcons.forEach(icon => {
      icon.setAttribute(
        'data-lucide',
        isAdmin ? 'unlock' : 'lock'
      );
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }


  requireAdmin(onSuccessAction) {
    if (this.isAdmin()) {
      if (typeof onSuccessAction === 'function') {
        onSuccessAction();
      }

      return true;
    }

    this.pendingAdminAction =
      onSuccessAction;

    this.openAdminLoginModal();

    return false;
  }


  openAdminLoginModal() {
    const modal =
      document.getElementById(
        'admin-login-modal'
      );

    if (!modal) return;

    modal.classList.remove('hidden');

    const userInput =
      document.getElementById(
        'admin-user-input'
      );

    const passInput =
      document.getElementById(
        'admin-pass-input'
      );

    const errorMsg =
      document.getElementById(
        'admin-login-error'
      );

    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';

    if (errorMsg) {
      errorMsg.classList.add('hidden');
    }

    setTimeout(() => {
      if (userInput) {
        userInput.focus();
      }
    }, 100);
  }


  closeAdminLoginModal() {
    const modal =
      document.getElementById(
        'admin-login-modal'
      );

    if (modal) {
      modal.classList.add('hidden');
    }

    this.pendingAdminAction = null;
  }


  /*
   * IMPORTANTE:
   * Coloca aquí tu comprobación de credenciales actual.
   * No guardes una contraseña real directamente en app.js
   * si el proyecto se publica.
   */

  attemptAdminLogin(user, pass) {
    const cleanUser =
      (user || '')
        .trim()
        .toLowerCase();

    const cleanPass =
      (pass || '').trim();

    const errorMsg =
      document.getElementById(
        'admin-login-error'
      );

    /*
     * Reemplaza esta condición por tu sistema
     * de autenticación actual.
     */
    const validLogin =
      cleanUser === 'andy' &&
      cleanPass === 'TU_CONTRASENA_AQUI';

    if (validLogin) {

      this.setAdmin(true);

      if (errorMsg) {
        errorMsg.classList.add('hidden');
      }

      const action =
        this.pendingAdminAction;

      this.pendingAdminAction = null;

      this.closeAdminLoginModal();

      this.showToast(
        '¡Bienvenido Administrador!'
      );

      if (typeof action === 'function') {
        action();
      }

      return true;

    } else {

      if (errorMsg) {
        errorMsg.textContent =
          'Usuario o contraseña incorrectos.';

        errorMsg.classList.remove(
          'hidden'
        );
      }

      this.showToast(
        'Credenciales incorrectas'
      );

      return false;
    }
  }


  logoutAdmin() {
    this.setAdmin(false);
    this.closeCreatorModal();

    this.showToast(
      'Sesión de Administrador cerrada'
    );
  }


  /*
   * ============================================================
   * FAVORITOS
   * ============================================================
   */

  loadFavorites() {
    try {
      const saved =
        localStorage.getItem(
          'andy_tv_favs_v3'
        );

      return saved
        ? JSON.parse(saved)
        : [];

    } catch (e) {
      return [];
    }
  }


  saveFavorites() {
    try {
      localStorage.setItem(
        'andy_tv_favs_v3',
        JSON.stringify(this.favorites)
      );
    } catch (e) {}
  }


  isFavorite(id) {
    return this.favorites.includes(id);
  }


  toggleFavorite(id) {
    if (this.isFavorite(id)) {

      this.favorites =
        this.favorites.filter(
          favId => favId !== id
        );

      this.showToast(
        'Eliminado de Mi Lista'
      );

    } else {

      this.favorites.push(id);

      this.showToast(
        'Guardado en Mi Lista 🇵🇪'
      );
    }

    this.saveFavorites();
    this.render();
  }


  /*
   * ============================================================
   * INICIALIZACIÓN
   * ============================================================
   */

  async init() {

    await this.loadCatalog();

    this.activeHero =
      this.mediaList.find(
        m => m.isFeatured
      ) ||
      this.mediaList[0] ||
      null;

    this.setupNavigation();
    this.setupSearch();
    this.setupCustomMovieForm();
    this.setupShortcuts();
    this.updateAdminUI();

    this.render();
  }


  /*
   * ============================================================
   * NAVEGACIÓN
   * ============================================================
   */

  setupNavigation() {

    const navButtons =
      document.querySelectorAll(
        '[data-tab]'
      );

    navButtons.forEach(btn => {

      btn.addEventListener(
        'click',
        () => {

          const tab =
            btn.getAttribute(
              'data-tab'
            );

          this.switchTab(tab);
        }
      );
    });
  }


  switchTab(tabName) {

    this.currentTab = tabName;

    document.querySelectorAll(
      '[data-tab]'
    ).forEach(btn => {

      const isCurrent =
        btn.getAttribute(
          'data-tab'
        ) === tabName;

      if (isCurrent) {

        btn.classList.add(
          'bg-[#eab308]',
          'text-black',
          'shadow-lg',
          'shadow-yellow-500/20'
        );

        btn.classList.remove(
          'text-zinc-400',
          'text-zinc-500',
          'hover:text-white',
          'hover:bg-zinc-800/60'
        );

      } else {

        btn.classList.remove(
          'bg-[#eab308]',
          'text-black',
          'shadow-lg',
          'shadow-yellow-500/20'
        );

        btn.classList.add(
          'text-zinc-400',
          'hover:text-white',
          'hover:bg-zinc-800/60'
        );
      }
    });

    document.querySelectorAll(
      '.tab-view'
    ).forEach(view => {
      view.classList.add('hidden');
    });

    const targetView =
      document.getElementById(
        `view-${tabName}`
      );

    if (targetView) {
      targetView.classList.remove(
        'hidden'
      );
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.render();
  }


  /*
   * ============================================================
   * ATAJOS
   * ============================================================
   */

  setupShortcuts() {

    window.addEventListener(
      'keydown',
      e => {

        if (
          (e.metaKey || e.ctrlKey) &&
          e.key.toLowerCase() === 'k'
        ) {
          e.preventDefault();
          this.openSearch();
        }

        if (e.key === 'Escape') {
          this.closeModals();
        }
      }
    );
  }


  /*
   * ============================================================
   * BUSCADOR
   * ============================================================
   */

  setupSearch() {

    const searchInput =
      document.getElementById(
        'search-modal-input'
      );

    if (searchInput) {

      searchInput.addEventListener(
        'input',
        e => {
          this.renderSearchResults(
            e.target.value
          );
        }
      );
    }

    const filterBtns =
      document.querySelectorAll(
        '[data-search-filter]'
      );

    filterBtns.forEach(btn => {

      btn.addEventListener(
        'click',
        () => {

          filterBtns.forEach(b => {

            b.classList.remove(
              'bg-yellow-400',
              'text-black',
              'font-bold'
            );

            b.classList.add(
              'bg-zinc-800/80',
              'text-zinc-400'
            );
          });

          btn.classList.add(
            'bg-yellow-400',
            'text-black',
            'font-bold'
          );

          btn.classList.remove(
            'bg-zinc-800/80',
            'text-zinc-400'
          );

          this.searchFilter =
            btn.getAttribute(
              'data-search-filter'
            ) || 'all';

          this.renderSearchResults(
            searchInput
              ? searchInput.value
              : ''
          );
        }
      );
    });
  }


  openSearch() {

    const modal =
      document.getElementById(
        'search-modal'
      );

    if (!modal) return;

    modal.classList.remove('hidden');

    const input =
      document.getElementById(
        'search-modal-input'
      );

    if (input) {
      input.value = '';
      input.focus();
    }

    this.renderSearchResults('');
  }


  closeSearch() {

    const modal =
      document.getElementById(
        'search-modal'
      );

    if (modal) {
      modal.classList.add('hidden');
    }
  }


  renderSearchResults(query) {

    const container =
      document.getElementById(
        'search-results-grid'
      );

    const headerTitle =
      document.getElementById(
        'search-header-title'
      );

    if (!container) return;

    const trimmed =
      String(query || '')
        .toLowerCase()
        .trim();

    let filtered =
      [...this.mediaList];


    if (this.searchFilter === 'movie') {

      filtered =
        filtered.filter(
          m => m.type === 'movie'
        );

    } else if (
      this.searchFilter === 'tv'
    ) {

      filtered =
        filtered.filter(
          m => m.type === 'tv'
        );

    } else if (
      this.searchFilter === 'anime'
    ) {

      filtered =
        filtered.filter(
          m =>
            m.isAnime ||
            m.type === 'anime'
        );

    } else if (
      this.searchFilter === 'html'
    ) {

      filtered =
        filtered.filter(
          m => Boolean(m.htmlPage)
        );
    }


    if (trimmed) {

      filtered =
        filtered.filter(item => {

          const values = [

            item.id,

            item.title,

            item.originalTitle,

            item.director,

            item.keywords,

            item.htmlPage,

            String(item.year || ''),

            ...(Array.isArray(item.cast)
              ? item.cast
              : []),

            ...(Array.isArray(item.genres)
              ? item.genres
              : [])
          ];

          return values.some(value =>
            String(value || '')
              .toLowerCase()
              .includes(trimmed)
          );
        });
    }


    if (headerTitle) {

      headerTitle.innerHTML =
        trimmed

          ? `Resultados para <span class="text-yellow-400">"${this.escapeHtml(query)}"</span> (${filtered.length} encontrados)`

          : `Catálogo Disponible en andyaxceldominguezccorau TV 🇵🇪 <span class="text-yellow-400 font-extrabold">(${filtered.length} títulos)</span>`;
    }


    container.innerHTML = '';


    if (filtered.length === 0) {

      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-zinc-500">
          <p class="text-base font-semibold">
            No se encontraron resultados para "${this.escapeHtml(query)}"
          </p>

          <p class="text-xs text-zinc-600 mt-1">
            Prueba con título, actor, año, género o ID.
          </p>
        </div>
      `;

      return;
    }


    filtered.forEach(item => {

      const itemEl =
        document.createElement('div');

      itemEl.className =
        'flex items-center justify-between p-3 rounded-2xl bg-[#141419] hover:bg-[#1c1c24] border border-zinc-800/80 hover:border-yellow-400/50 cursor-pointer transition-all duration-200 group';


      const title =
        this.escapeHtml(
          item.title || 'Sin título'
        );

      const poster =
        this.escapeHtml(
          item.poster || ''
        );

      const genre =
        Array.isArray(item.genres) &&
        item.genres.length
          ? item.genres[0]
          : '4K';


      itemEl.innerHTML = `
        <div class="flex items-center space-x-3.5 min-w-0 flex-1">

          <div class="w-14 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 relative border border-zinc-800">

            <img
              src="${poster}"
              alt="${title}"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />

          </div>

          <div class="flex-1 min-w-0 pr-2">

            <div class="flex items-center space-x-2">

              <span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-yellow-400 font-mono font-bold">
                #${this.escapeHtml(item.id)}
              </span>

              <span class="text-[10px] text-zinc-400">
                ${this.escapeHtml(item.year)}
              </span>

            </div>

            <h3 class="text-sm font-bold text-zinc-100 group-hover:text-yellow-400 truncate mt-0.5">
              ${title}
            </h3>

            <p class="text-xs text-zinc-400 mt-0.5 truncate">
              ★ ${Number(item.rating || 0).toFixed(1)}
              • ${(item.genres || []).slice(0, 2).map(this.escapeHtml).join(', ')}
              • ${this.escapeHtml(item.quality || '4K')}
            </p>

          </div>
        </div>

        <div class="flex items-center space-x-2 flex-shrink-0">

          ${
            item.htmlPage
              ? `
                <a
                  href="${this.escapeHtml(item.htmlPage)}"
                  class="p-2 rounded-xl bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 transition-colors border border-zinc-700 text-xs font-semibold flex items-center space-x-1"
                  title="Abrir página HTML individual"
                >
                  <span class="text-[11px] font-bold">
                    .HTML
                  </span>
                </a>
              `
              : ''
          }

          <button
            class="p-2.5 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-bold transition-all shadow-md flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 fill-black"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>

        </div>
      `;


      const img =
        itemEl.querySelector('img');

      if (img) {

        img.onerror = () => {

          img.onerror = null;

          img.src =
            getPosterFallback(
              item.title,
              genre,
              item.year
            );
        };
      }


      itemEl.onclick = e => {

        if (
          e.target.closest('a')
        ) {
          return;
        }

        this.closeSearch();
        this.playMedia(item);
      };


      container.appendChild(itemEl);
    });
  }


  /*
   * ============================================================
   * UTILIDADES
   * ============================================================
   */

  escapeHtml(value) {

    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  /*
   * ============================================================
   * TOAST
   * ============================================================
   */

  showToast(message) {

    let toast =
      document.getElementById(
        'app-toast'
      );

    if (!toast) {

      toast =
        document.createElement('div');

      toast.id = 'app-toast';

      toast.className =
        'fixed bottom-6 right-6 z-50 bg-yellow-400 text-black px-4 py-2.5 rounded-2xl font-bold text-xs shadow-2xl flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0';

      document.body.appendChild(toast);
    }


    toast.innerHTML = `
      <span>🇵🇪</span>
      <span>${this.escapeHtml(message)}</span>
    `;


    toast.classList.remove(
      'translate-y-2',
      'opacity-0'
    );

    toast.classList.add(
      'translate-y-0',
      'opacity-100'
    );


    setTimeout(() => {

      toast.classList.remove(
        'translate-y-0',
        'opacity-100'
      );

      toast.classList.add(
        'translate-y-2',
        'opacity-0'
      );

    }, 3000);
  }


  /*
   * ============================================================
   * FORMULARIO ADMIN
   * ============================================================
   */

  setupCustomMovieForm() {

    const form =
      document.getElementById(
        'add-movie-form'
      );

    const downloadBtn =
      document.getElementById(
        'download-html-btn'
      );


    if (form) {

      form.addEventListener(
        'submit',
        e => {

          e.preventDefault();

          this.requireAdmin(() => {
            this.executeAddMovie();
          });
        }
      );
    }


    if (downloadBtn) {

      downloadBtn.addEventListener(
        'click',
        () => {

          this.requireAdmin(() => {
            this.executeDownloadFormHtml();
          });
        }
      );
    }
  }


  executeAddMovie() {

    const title =
      document.getElementById(
        'form-title'
      )?.value.trim();

    if (!title) {
      this.showToast(
        'Ingrese un título'
      );
      return;
    }


    const originalTitle =
      document.getElementById(
        'form-orig-title'
      )?.value.trim() ||
      title;


    const year =
      parseInt(
        document.getElementById(
          'form-year'
        )?.value ||
        new Date().getFullYear(),
        10
      );


    const quality =
      document.getElementById(
        'form-quality'
      )?.value ||
      '1080p FHD';


    const lang =
      document.getElementById(
        'form-lang'
      )?.value ||
      'Español Latino';


    const provider =
      document.getElementById(
        'form-provider'
      )?.value ||
      'StreamWish';


    const url =
      document.getElementById(
        'form-url'
      )?.value.trim() ||
      '';


    const poster =
      document.getElementById(
        'form-poster'
      )?.value.trim() ||
      '';


    const backdrop =
      document.getElementById(
        'form-backdrop'
      )?.value.trim() ||
      poster;


    const category =
      document.getElementById(
        'form-category'
      )?.value ||
      'movie';


    const genres =
      (
        document.getElementById(
          'form-genres'
        )?.value ||
        'Estreno, Acción'
      )
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);


    const overview =
      document.getElementById(
        'form-overview'
      )?.value.trim() ||
      'Película agregada por el administrador.';


    const director =
      document.getElementById(
        'form-director'
      )?.value.trim() ||
      '';


    const cast =
      (
        document.getElementById(
          'form-cast'
        )?.value ||
        ''
      )
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);


    const slug =
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(
          /[\u0300-\u036f]/g,
          ''
        )
        .replace(
          /[^a-z0-9]+/g,
          '-'
        )
        .replace(
          /(^-|-$)/g,
          ''
        );


    const id =
      `custom-${slug}-${Date.now()
        .toString()
        .slice(-4)}`;


    const htmlPage =
      `${slug}.html`;


    const newMedia = {

      id,

      title,

      originalTitle,

      type: category,

      isAnime:
        category === 'anime',

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

      platform:
        'andyaxceldominguezccorau TV',

      htmlPage,

      keywords:
        `${slug}, ${title}, latino, 4k, andy`,

      servers: url
        ? [
            {
              id: `srv-1-${id}`,
              name: `${provider} Principal`,
              quality,
              lang,
              url,
              provider
            }
          ]
        : [],

      isFeatured: false,

      isTrending: true
    };


    this.mediaList.unshift(
      newMedia
    );


    this.render();

    this.closeCreatorModal();

    this.showToast(
      `"${title}" agregada al catálogo`
    );

    this.playMedia(
      newMedia
    );
  }


  executeDownloadFormHtml() {

    const title =
      document.getElementById(
        'form-title'
      )?.value.trim() ||
      'mi-pelicula';


    const url =
      document.getElementById(
        'form-url'
      )?.value.trim() ||
      '';


    const slug =
      title
        .toLowerCase()
        .normalize('NFD')
        .replace(
          /[\u0300-\u036f]/g,
          ''
        )
        .replace(
          /[^a-z0-9]+/g,
          '-'
        )
        .replace(
          /(^-|-$)/g,
          ''
        );


    const content = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${this.escapeHtml(title)}</title>
</head>

<body style="margin:0;background:#000;height:100vh;overflow:hidden">

<iframe
src="${this.escapeHtml(url)}"
style="width:100%;height:100%;border:0"
allowfullscreen>
</iframe>

</body>
</html>`;


    const blob =
      new Blob(
        [content],
        { type: 'text/html' }
      );


    const objectUrl =
      URL.createObjectURL(blob);


    const a =
      document.createElement('a');

    a.href = objectUrl;

    a.download =
      `${slug}.html`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(
      objectUrl
    );


    this.showToast(
      `Archivo ${slug}.html descargado`
    );
  }


  executeDownloadMediaHtml(item) {

    const streamUrl =
      item.servers?.[0]?.url ||
      '';


    const content = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${this.escapeHtml(item.title)} - andyaxceldominguezccorau TV 🇵🇪</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a0d;
  color: #fff;
  font-family: system-ui,-apple-system,sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #141418;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #27272a;
}

.brand {
  font-weight: 800;
  font-size: 15px;
  color: #eab308;
}

.video-box {
  flex: 1;
  width: 100%;
  background: #000;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
</head>

<body>

<header>
  <div class="brand">
    andyaxceldominguezccorau TV 🇵🇪
  </div>

  <div>
    ${this.escapeHtml(item.title)}
    (${this.escapeHtml(item.year)})
  </div>
</header>

<div class="video-box">

<iframe
src="${this.escapeHtml(streamUrl)}"
allowfullscreen
allow="autoplay; fullscreen; encrypted-media">
</iframe>

</div>

</body>
</html>`;


    const blob =
      new Blob(
        [content],
        { type: 'text/html' }
      );


    const objectUrl =
      URL.createObjectURL(blob);


    const a =
      document.createElement('a');

    a.href = objectUrl;

    a.download =
      item.htmlPage ||
      `${item.id}.html`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(
      objectUrl
    );


    this.showToast(
      `Archivo descargado`
    );
  }


  /*
   * ============================================================
   * HERO
   * ============================================================
   */

  shuffleHero() {

    const featured =
      this.mediaList.filter(
        m =>
          m.isTrending ||
          m.isFeatured
      );


    if (!featured.length) {
      return;
    }


    this.heroIndex =
      (this.heroIndex + 1) %
      featured.length;


    this.activeHero =
      featured[this.heroIndex];


    this.renderHero();
  }


  renderHero() {

    const item =
      this.activeHero;

    if (!item) return;


    const heroImg =
      document.getElementById(
        'hero-img'
      );


    const heroTitle =
      document.getElementById(
        'hero-title'
      );


    const heroType =
      document.getElementById(
        'hero-type-badge'
      );


    const heroFavBtn =
      document.getElementById(
        'hero-fav-btn'
      );


    if (heroImg) {

      heroImg.src =
        item.backdrop ||
        item.poster ||
        getPosterFallback(
          item.title,
          item.genres?.[0],
          item.year
        );


      heroImg.onerror = () => {

        heroImg.onerror = null;

        heroImg.src =
          getPosterFallback(
            item.title,
            item.genres?.[0],
            item.year
          );
      };
    }


    if (heroTitle) {
      heroTitle.textContent =
        item.title;
    }


    if (heroType) {

      heroType.textContent =
        item.type === 'movie'
          ? 'MOVIE 4K'
          : item.type === 'anime'
            ? 'ANIME 4K'
            : 'TV SHOW 4K';
    }


    if (heroFavBtn) {

      const isFav =
        this.isFavorite(item.id);

      heroFavBtn.className =
        `p-2 rounded-xl transition-all cursor-pointer ${
          isFav
            ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20'
            : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200'
        }`;

      heroFavBtn.onclick =
        () => this.toggleFavorite(
          item.id
        );
    }


    const heroWatchBtn =
      document.getElementById(
        'hero-watch-btn'
      );

    if (heroWatchBtn) {

      heroWatchBtn.onclick =
        () => this.playMedia(item);
    }


    const heroDetailsBtn =
      document.getElementById(
        'hero-details-btn'
      );

    if (heroDetailsBtn) {

      heroDetailsBtn.onclick =
        () => this.openDetails(item);
    }


    const heroShuffleBtn =
      document.getElementById(
        'hero-shuffle-btn'
      );

    if (heroShuffleBtn) {

      heroShuffleBtn.onclick =
        () => this.shuffleHero();
    }
  }


  /*
   * ============================================================
   * REPRODUCTOR
   * ============================================================
   */

  playMedia(item) {

    this.currentPlaying = item;


    const modal =
      document.getElementById(
        'video-player-modal'
      );

    if (!modal) return;


    modal.classList.remove(
      'hidden'
    );


    const backdropImg =
      document.getElementById(
        'player-modal-backdrop-bg'
      );


    if (backdropImg) {

      backdropImg.src =
        item.backdrop ||
        item.poster ||
        getPosterFallback(
          item.title,
          item.genres?.[0],
          item.year
        );


      backdropImg.onerror =
        () => {

          backdropImg.onerror = null;

          backdropImg.src =
            item.poster ||
            getPosterFallback(
              item.title,
              item.genres?.[0],
              item.year
            );
        };
    }


    const titleEl =
      document.getElementById(
        'player-movie-title'
      );


    const metaEl =
      document.getElementById(
        'player-movie-meta'
      );


    const downloadLink =
      document.getElementById(
        'player-download-html-link'
      );


    const singlePageLink =
      document.getElementById(
        'player-single-page-link'
      );


    if (titleEl) {
      titleEl.textContent =
        item.title;
    }


    if (metaEl) {

      metaEl.textContent =
        `${item.year} • ${
          item.quality || '4K'
        } • ${
          item.duration || ''
        } • Español Latino 🇵🇪`;
    }


    if (singlePageLink) {

      if (item.htmlPage) {

        singlePageLink.href =
          item.htmlPage;

        singlePageLink.classList.remove(
          'hidden'
        );

      } else {

        singlePageLink.classList.add(
          'hidden'
        );
      }
    }


    if (downloadLink) {

      downloadLink.onclick =
        () => {

          this.requireAdmin(() => {
            this.executeDownloadMediaHtml(
              item
            );
          });
        };
    }


    this.renderServerButtons(
      item
    );


    if (
      Array.isArray(item.servers) &&
      item.servers.length
    ) {

      this.switchServer(
        item.servers[0]
      );

    } else {

      this.showToast(
        'No hay servidores disponibles'
      );
    }
  }


  renderServerButtons(item) {

    const container =
      document.getElementById(
        'player-servers-container'
      );

    if (!container) return;


    container.innerHTML = '';


    const servers =
      Array.isArray(item.servers)
        ? item.servers
        : [];


    servers.forEach(
      (server, index) => {

        const btn =
          document.createElement(
            'button'
          );


        btn.className =
          index === 0

            ? 'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 cursor-pointer bg-yellow-400 text-black border-yellow-400 shadow-md'

            : 'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 cursor-pointer bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700/60';


        btn.innerHTML = `
          <span>⚡</span>
          <span class="truncate">
            ${this.escapeHtml(server.name || 'Servidor')}
          </span>
        `;


        btn.onclick = () => {

          container
            .querySelectorAll('button')
            .forEach(b => {

              b.className =
                'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700/60 cursor-pointer flex items-center justify-center space-x-1.5';
            });


          btn.className =
            'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border bg-yellow-400 text-black border-yellow-400 shadow-md cursor-pointer flex items-center justify-center space-x-1.5';


          this.switchServer(
            server
          );
        };


        container.appendChild(btn);
      }
    );
  }


  switchServer(server) {

    this.currentServer =
      server;


    const videoContainer =
      document.getElementById(
        'player-screen-wrapper'
      );


    if (!videoContainer) return;


    const movieArt =
      this.currentPlaying?.backdrop ||
      this.currentPlaying?.poster ||
      getPosterFallback(
        this.currentPlaying?.title,
        this.currentPlaying?.genres?.[0],
        this.currentPlaying?.year
      );


    videoContainer.innerHTML = `

      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">

        <img
          src="${this.escapeHtml(movieArt)}"
          class="w-full h-full object-cover blur-md opacity-45 scale-105"
          alt="Fondo Película"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70"></div>

        <div class="absolute inset-0 flex items-center justify-center">

          <div class="text-center space-y-2 opacity-70">

            <div class="w-12 h-12 mx-auto rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shadow-lg">
              <span class="text-xl font-black text-yellow-400">🇵🇪</span>
            </div>

            <p class="text-xs font-bold text-zinc-300">
              Cargando ${this.escapeHtml(
                this.currentPlaying?.title ||
                'Transmisión'
              )}...
            </p>

          </div>

        </div>

      </div>
    `;


    const url =
      server?.url || '';


    if (!url) {

      this.showToast(
        'Servidor sin URL'
      );

      return;
    }


    const lowerUrl =
      url.toLowerCase();


    if (
      lowerUrl.includes('.m3u8') ||
      lowerUrl.includes('.mp4')
    ) {

      const video =
        document.createElement(
          'video'
        );

      video.className =
        'relative z-10 w-full h-full object-contain';

      video.controls = true;
      video.autoplay = true;

      videoContainer.appendChild(
        video
      );


      if (
        lowerUrl.includes('.m3u8') &&
        window.Hls &&
        window.Hls.isSupported()
      ) {

        if (this.hlsInstance) {
          this.hlsInstance.destroy();
        }


        this.hlsInstance =
          new window.Hls();


        this.hlsInstance.loadSource(
          url
        );


        this.hlsInstance.attachMedia(
          video
        );


        this.hlsInstance.on(
          window.Hls.Events.MANIFEST_PARSED,
          () => {
            video.play().catch(
              () => {}
            );
          }
        );


      } else {

        video.src = url;

        video.play().catch(
          () => {}
        );
      }


    } else {

      const iframe =
        document.createElement(
          'iframe'
        );


      iframe.className =
        'relative z-10 w-full h-full border-0';


      iframe.referrerPolicy =
        'no-referrer';


      iframe.src = url;


      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';


      iframe.allowFullscreen =
        true;


      videoContainer.appendChild(
        iframe
      );


      const extBtn =
        document.getElementById(
          'player-external-btn'
        );


      if (extBtn) {
        extBtn.href = url;
      }
    }
  }


  closePlayer() {

    const modal =
      document.getElementById(
        'video-player-modal'
      );


    if (modal) {
      modal.classList.add(
        'hidden'
      );
    }


    if (this.hlsInstance) {

      this.hlsInstance.destroy();

      this.hlsInstance = null;
    }


    const videoContainer =
      document.getElementById(
        'player-screen-wrapper'
      );


    if (videoContainer) {
      videoContainer.innerHTML = '';
    }


    this.currentPlaying = null;
    this.currentServer = null;
  }


  /*
   * ============================================================
   * DETALLES
   * ============================================================
   */

  openDetails(item) {

    const modal =
      document.getElementById(
        'media-detail-modal'
      );


    if (!modal) return;


    modal.classList.remove(
      'hidden'
    );


    const backdrop =
      document.getElementById(
        'detail-backdrop'
      );


    const title =
      document.getElementById(
        'detail-title'
      );


    const meta =
      document.getElementById(
        'detail-meta'
      );


    const rating =
      document.getElementById(
        'detail-rating'
      );


    const quality =
      document.getElementById(
        'detail-quality'
      );


    const overview =
      document.getElementById(
        'detail-overview'
      );


    const director =
      document.getElementById(
        'detail-director'
      );


    const cast =
      document.getElementById(
        'detail-cast'
      );


    const watchBtn =
      document.getElementById(
        'detail-watch-btn'
      );


    const htmlLink =
      document.getElementById(
        'detail-html-link'
      );


    const favBtn =
      document.getElementById(
        'detail-fav-btn'
      );


    if (backdrop) {

      backdrop.src =
        item.backdrop ||
        item.poster ||
        getPosterFallback(
          item.title,
          item.genres?.[0],
          item.year
        );


      backdrop.onerror = () => {

        backdrop.onerror = null;

        backdrop.src =
          item.poster ||
          getPosterFallback(
            item.title,
            item.genres?.[0],
            item.year
          );
      };
    }


    if (title) {
      title.textContent =
        item.title;
    }


    if (meta) {

      meta.textContent =
        `${item.year} • ${
          item.duration || ''
        } • ${
          (item.genres || []).join(', ')
        }`;
    }


    if (rating) {

      rating.textContent =
        Number(
          item.rating || 0
        ).toFixed(1);
    }


    if (quality) {

      quality.textContent =
        item.quality ||
        '4K UHD';
    }


    if (overview) {

      overview.textContent =
        item.overview ||
        '';
    }


    if (director) {

      director.textContent =
        item.director ||
        'Desconocido';
    }


    if (cast) {

      cast.textContent =
        (item.cast || []).join(', ');
    }


    if (watchBtn) {

      watchBtn.onclick =
        () => {

          this.closeDetails();
          this.playMedia(item);
        };
    }


    if (htmlLink) {

      if (item.htmlPage) {

        htmlLink.href =
          item.htmlPage;

        htmlLink.classList.remove(
          'hidden'
        );

      } else {

        htmlLink.classList.add(
          'hidden'
        );
      }
    }


    if (favBtn) {

      const isFav =
        this.isFavorite(
          item.id
        );


      favBtn.textContent =
        isFav
          ? 'En Mi Lista ✓'
          : 'Guardar';


      favBtn.onclick =
        () => {

          this.toggleFavorite(
            item.id
          );


          const nowFav =
            this.isFavorite(
              item.id
            );


          favBtn.textContent =
            nowFav
              ? 'En Mi Lista ✓'
              : 'Guardar';
        };
    }
  }


  closeDetails() {

    const modal =
      document.getElementById(
        'media-detail-modal'
      );


    if (modal) {
      modal.classList.add(
        'hidden'
      );
    }
  }


  /*
   * ============================================================
   * TARJETAS
   * ============================================================
   */

  renderRow(containerId, items) {

    const container =
      document.getElementById(
        containerId
      );


    if (!container) return;


    container.innerHTML = '';


    items.forEach(item => {

      const card =
        document.createElement('div');


      card.className =
        'flex-shrink-0 w-32 sm:w-36 md:w-44 cursor-pointer group/card flex flex-col card-hover-effect';


      const genre =
        item.genres?.[0] ||
        '4K';


      card.innerHTML = `

        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md group-hover/card:border-yellow-400/50 group-hover/card:shadow-xl group-hover/card:shadow-yellow-500/10 transition-all">

          <img
            src="${this.escapeHtml(item.poster || '')}"
            alt="${this.escapeHtml(item.title)}"
            loading="lazy"
            class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />

          <div class="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400 border border-yellow-400/30">
            ${Number(item.rating || 0).toFixed(1)}
          </div>

          <div class="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            ${this.escapeHtml(item.quality || '4K')}
          </div>

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">

            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform">

              <svg
                class="w-4 h-4 fill-black ml-0.5"
                viewBox="0 0 24 24"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>

            </div>

          </div>

        </div>

        <div class="mt-2 px-0.5">

          <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate group-hover/card:text-yellow-400 transition-colors">
            ${this.escapeHtml(item.title)}
          </h3>

          <p class="text-[11px] text-zinc-400 truncate mt-0.5 flex items-center space-x-1">

            <span class="text-yellow-400/80">
              🇵🇪
            </span>

            <span>
              ${this.escapeHtml(item.year)}
              •
              ${this.escapeHtml(genre)}
            </span>

          </p>

        </div>
      `;


      const img =
        card.querySelector('img');


      if (img) {

        img.onerror = () => {

          img.onerror = null;

          img.src =
            getPosterFallback(
              item.title,
              genre,
              item.year
            );
        };
      }


      card.onclick =
        () => this.playMedia(item);


      container.appendChild(card);
    });
  }


  renderGrid(containerId, items) {

    const container =
      document.getElementById(
        containerId
      );


    if (!container) return;


    container.innerHTML = '';


    items.forEach(item => {

      const card =
        document.createElement('div');


      card.className =
        'cursor-pointer group flex flex-col card-hover-effect';


      const genre =
        item.genres?.[0] ||
        '4K';


      card.innerHTML = `

        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg group-hover:border-yellow-400/50 transition-all">

          <img
            src="${this.escapeHtml(item.poster || '')}"
            alt="${this.escapeHtml(item.title)}"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div class="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400">
            ${Number(item.rating || 0).toFixed(1)}
          </div>

          <div class="absolute top-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            ${this.escapeHtml(item.quality || '4K')}
          </div>

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg">

              <svg
                class="w-4 h-4 fill-black ml-0.5"
                viewBox="0 0 24 24"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>

            </div>

          </div>

        </div>

        <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate mt-2 group-hover:text-yellow-400">
          ${this.escapeHtml(item.title)}
        </h3>

        <p class="text-[11px] text-zinc-400 truncate flex items-center space-x-1">

          <span>🇵🇪</span>

          <span>
            ${this.escapeHtml(item.year)}
            •
            ${this.escapeHtml(genre)}
          </span>

        </p>
      `;


      const img =
        card.querySelector('img');


      if (img) {

        img.onerror = () => {

          img.onerror = null;

          img.src =
            getPosterFallback(
              item.title,
              genre,
              item.year
            );
        };
      }


      card.onclick =
        () => this.playMedia(item);


      container.appendChild(card);
    });
  }


  /*
   * ============================================================
   * RENDER GENERAL
   * ============================================================
   */

  render() {

    this.renderHero();


    const favBadge =
      document.getElementById(
        'fav-count-badge'
      );


    if (favBadge) {

      if (this.favorites.length > 0) {

        favBadge.textContent =
          this.favorites.length;

        favBadge.classList.remove(
          'hidden'
        );

      } else {

        favBadge.classList.add(
          'hidden'
        );
      }
    }


    const movies =
      this.mediaList.filter(
        m => m.type === 'movie'
      );


    const series =
      this.mediaList.filter(
        m => m.type === 'tv'
      );


    const anime =
      this.mediaList.filter(
        m =>
          m.isAnime ||
          m.type === 'anime'
      );


    const trending =
      this.mediaList.filter(
        m => m.isTrending
      );


    const favItems =
      this.mediaList.filter(
        m =>
          this.favorites.includes(
            m.id
          )
      );


    this.renderRow(
      'row-latest-movies',
      movies
    );


    this.renderRow(
      'row-latest-tv',
      series
    );


    this.renderRow(
      'row-latest-anime',
      anime
    );


    this.renderRow(
      'row-trending',
      trending
    );


    this.renderGrid(
      'grid-explore',
      this.mediaList
    );


    this.renderGrid(
      'grid-movies',
      movies
    );


    this.renderGrid(
      'grid-tv',
      series
    );


    this.renderGrid(
      'grid-anime',
      anime
    );


    this.renderGrid(
      'grid-trending',
      trending
    );


    this.renderGrid(
      'grid-favorites',
      favItems
    );


    const emptyFavs =
      document.getElementById(
        'fav-empty-state'
      );


    if (emptyFavs) {

      if (favItems.length === 0) {

        emptyFavs.classList.remove(
          'hidden'
        );

      } else {

        emptyFavs.classList.add(
          'hidden'
        );
      }
    }


    if (window.lucide) {
      window.lucide.createIcons();
    }
  }


  /*
   * ============================================================
   * MODALES
   * ============================================================
   */

  openCreatorModal() {

    this.requireAdmin(() => {

      const modal =
        document.getElementById(
          'creator-modal'
        );


      if (modal) {
        modal.classList.remove(
          'hidden'
        );
      }
    });
  }


  closeCreatorModal() {

    const modal =
      document.getElementById(
        'creator-modal'
      );


    if (modal) {
      modal.classList.add(
        'hidden'
      );
    }
  }


  closeModals() {

    this.closeSearch();
    this.closePlayer();
    this.closeDetails();
    this.closeCreatorModal();
    this.closeAdminLoginModal();
  }


  copyToClipboard(
    text,
    alertMsg = 'Copiado al portapapeles!'
  ) {

    if (navigator.clipboard) {

      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showToast(
            alertMsg
          );
        })
        .catch(() => {
          this.fallbackCopy(
            text,
            alertMsg
          );
        });

    } else {

      this.fallbackCopy(
        text,
        alertMsg
      );
    }
  }


  fallbackCopy(
    text,
    alertMsg
  ) {

    const textArea =
      document.createElement(
        'textarea'
      );


    textArea.value = text;

    document.body.appendChild(
      textArea
    );

    textArea.select();


    try {

      document.execCommand(
        'copy'
      );

      this.showToast(
        alertMsg
      );

    } catch (e) {}


    document.body.removeChild(
      textArea
    );
  }
}


/*
 * ============================================================
 * STARTUP
 * ============================================================
 */

function startAndyApp() {

  if (!window.app) {
    window.app =
      new AndyStreamApp();
  }
}


if (
  document.readyState ===
  'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    startAndyApp
  );

} else {

  startAndyApp();
}
```
