/**
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

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100%" height="100%">
    <defs>
      <linearGradient id="g${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c[0]}"/>
        <stop offset="60%" stop-color="${c[1]}"/>
        <stop offset="100%" stop-color="${c[2]}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#g${hash})"/>
    <circle cx="200" cy="220" r="90" fill="${c[2]}" opacity="0.25"/>
    <g transform="translate(160, 180) scale(1.6)">
      <polygon points="5 3 19 12 5 21 5 3" fill="${c[2]}" fill-opacity="0.9"/>
    </g>
    <rect x="24" y="24" width="130" height="30" rx="8" fill="#eab308" />
    <text x="89" y="44" fill="#000000" font-size="12" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle">🇵🇪 PERÚ 4K</text>
    <text x="200" y="380" fill="#ffffff" font-size="22" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">${cleanTitle.substring(0, 24)}</text>
    <text x="200" y="415" fill="#facc15" font-size="14" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">${cleanGenre} • ${cleanYear}</text>
    <rect x="50" y="470" width="300" height="44" rx="12" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    <text x="200" y="498" fill="#e4e4e7" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">andyaxceldominguezccorau TV</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

window.getPosterFallback = getPosterFallback;

const DEFAULT_MEDIA = [
  {
    "id": "avatar-2-el-sentido-del-agua",
    "title": "Avatar: El Sentido del Agua",
    "originalTitle": "Avatar: The Way of Water",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/8sMmAmwh2xRURq6949qPt09x3Me.jpg",
    "year": 2022,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "3h 12m",
    "genres": [
      "Ciencia Ficción",
      "Aventura",
      "Acción",
      "Fantasía"
    ],
    "overview": "Ambientada más de una década después de los acontecimientos de la primera película, Avatar: The Way of Water empieza contando la historia de la familia Sully, los problemas que los persiguen y las batallas que libran en los océanos de Pandora.",
    "director": "James Cameron",
    "cast": [
      "Sam Worthington",
      "Zoe Saldaña",
      "Sigourney Weaver",
      "Kate Winslet"
    ],
    "platform": "Disney+",
    "htmlPage": "avatar-2.html",
    "keywords": "avatar 2, el sentido del agua, the way of water, james cameron, pandora, na vi, jake sully, neytiri, doodstream",
    "servers": [
      {
        "id": "dood-avatar2-playmogo",
        "name": "Doodstream (Playmogo)",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/ykm9tsifkch1",
        "provider": "Doodstream"
      },
      {
        "id": "dood-avatar2-d000d",
        "name": "Doodstream (Espejo 1)",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://d000d.com/e/ykm9tsifkch1",
        "provider": "Doodstream"
      },
      {
        "id": "dood-avatar2-do0od",
        "name": "Doodstream (Espejo 2)",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://do0od.com/e/ykm9tsifkch1",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-avatar-2-el-sentido-del-agua",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt1630029",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-avatar-2-el-sentido-del-agua",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt1630029",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-avatar-2-el-sentido-del-agua",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt1630029",
        "provider": "FileMoon"
      },
      {
        "id": "tape-avatar-2-el-sentido-del-agua",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt1630029",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-avatar-2-el-sentido-del-agua",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt1630029",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": true,
    "isTrending": true
  },
  {
    "id": "la-guerra-del-planeta-de-los-simios",
    "title": "La Guerra del Planeta de los Simios",
    "originalTitle": "War for the Planet of the Apes",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/3vYh80gR4V8pP8m2F19X1c8Bq0E.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/ulMscezy9YX0bhknvJbZoUgQxO5.jpg",
    "year": 2017,
    "rating": 8.7,
    "quality": "4K UHD",
    "duration": "2h 20m",
    "genres": [
      "Acción",
      "Ciencia Ficción",
      "Drama",
      "Aventura"
    ],
    "overview": "César y sus simios son forzados a encarar un conflicto mortal contra un ejército de humanos liderados por un implacable coronel.",
    "director": "Matt Reeves",
    "cast": [
      "Andy Serkis",
      "Woody Harrelson",
      "Steve Zahn",
      "Karin Konoval"
    ],
    "platform": "Disney+",
    "htmlPage": "la-guerra-del-planeta-de-los-simios.html",
    "keywords": "planeta de los simios, war for the planet of the apes, cesar, simios, primates, matt reeves",
    "servers": [
      {
        "id": "dood-la-guerra-del-planeta-de-los-simios",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt3498820",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-la-guerra-del-planeta-de-los-simios",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt3498820",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-la-guerra-del-planeta-de-los-simios",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt3498820",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-la-guerra-del-planeta-de-los-simios",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt3498820",
        "provider": "FileMoon"
      },
      {
        "id": "tape-la-guerra-del-planeta-de-los-simios",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt3498820",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-la-guerra-del-planeta-de-los-simios",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt3498820",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": true,
    "isTrending": true
  },
  {
    "id": "the-batman-2022",
    "title": "The Batman",
    "originalTitle": "The Batman",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYz9G660E.jpg",
    "year": 2022,
    "rating": 8.5,
    "quality": "4K UHD",
    "duration": "2h 56m",
    "genres": [
      "Acción",
      "Crimen",
      "Drama",
      "Misterio"
    ],
    "overview": "En su segundo año luchando contra el crimen, Batman explora la corrupción existente en Gotham City y el vínculo de la misma con su propia familia.",
    "director": "Matt Reeves",
    "cast": [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Paul Dano",
      "Colin Farrell"
    ],
    "platform": "HBO Max",
    "htmlPage": "the-batman.html",
    "keywords": "the batman, bruce wayne, robert pattinson, acertijo, gotham, dc comics",
    "servers": [
      {
        "id": "dood-the-batman-2022",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt1877830",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-the-batman-2022",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt1877830",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-the-batman-2022",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt1877830",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-the-batman-2022",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt1877830",
        "provider": "FileMoon"
      },
      {
        "id": "tape-the-batman-2022",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt1877830",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-the-batman-2022",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt1877830",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "deadpool-wolverine",
    "title": "Deadpool & Wolverine",
    "originalTitle": "Deadpool & Wolverine",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB128QIki.jpg",
    "year": 2024,
    "rating": 8.4,
    "quality": "4K UHD",
    "duration": "2h 08m",
    "genres": [
      "Acción",
      "Comedia",
      "Ciencia Ficción"
    ],
    "overview": "Wolverine se recupera de sus heridas cuando se cruza con el bocazas de Deadpool para salvar su universo.",
    "director": "Shawn Levy",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin"
    ],
    "platform": "Disney+",
    "htmlPage": "deadpool-wolverine.html",
    "keywords": "deadpool wolverine, ryan reynolds, hugh jackman, marvel, mcu, comedia",
    "servers": [
      {
        "id": "dood-deadpool-wolverine",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt6263850",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-deadpool-wolverine",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt6263850",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-deadpool-wolverine",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt6263850",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-deadpool-wolverine",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt6263850",
        "provider": "FileMoon"
      },
      {
        "id": "tape-deadpool-wolverine",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt6263850",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-deadpool-wolverine",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt6263850",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "dune-part-two",
    "title": "Duna: Parte Dos",
    "originalTitle": "Dune: Part Two",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/8b8RnxudHu0xRvc6Usc5Aq94ppq.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg",
    "year": 2024,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 46m",
    "genres": [
      "Ciencia Ficción",
      "Aventura",
      "Acción",
      "Drama"
    ],
    "overview": "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.",
    "director": "Denis Villeneuve",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem"
    ],
    "platform": "HBO Max",
    "htmlPage": "duna-2.html",
    "keywords": "dune 2, duna parte dos, timothee chalamet, zendaya, arrakis, gusano de arena",
    "servers": [
      {
        "id": "dood-dune-part-two",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt15239678",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-dune-part-two",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt15239678",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-dune-part-two",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt15239678",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-dune-part-two",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt15239678",
        "provider": "FileMoon"
      },
      {
        "id": "tape-dune-part-two",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt15239678",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-dune-part-two",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt15239678",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "oppenheimer-2023",
    "title": "Oppenheimer",
    "originalTitle": "Oppenheimer",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    "year": 2023,
    "rating": 8.9,
    "quality": "4K UHD",
    "duration": "3h 00m",
    "genres": [
      "Drama",
      "Historia",
      "Biografía"
    ],
    "overview": "La historia del físico estadounidense J. Robert Oppenheimer, al frente del Laboratorio de Los Álamos durante el Proyecto Manhattan.",
    "director": "Christopher Nolan",
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr."
    ],
    "platform": "Amazon Prime",
    "htmlPage": "oppenheimer.html",
    "keywords": "oppenheimer, christopher nolan, cillian murphy, bomba atomica, los alamos, oscar",
    "servers": [
      {
        "id": "dood-oppenheimer-2023",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt15398776",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-oppenheimer-2023",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt15398776",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-oppenheimer-2023",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt15398776",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-oppenheimer-2023",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt15398776",
        "provider": "FileMoon"
      },
      {
        "id": "tape-oppenheimer-2023",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt15398776",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-oppenheimer-2023",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt15398776",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "spider-man-no-way-home",
    "title": "Spider-Man: No Way Home",
    "originalTitle": "Spider-Man: No Way Home",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    "year": 2021,
    "rating": 8.7,
    "quality": "4K UHD",
    "duration": "2h 28m",
    "genres": [
      "Acción",
      "Aventura",
      "Ciencia Ficción"
    ],
    "overview": "Con la identidad de Spider-Man ahora revelada, Peter recurre al Doctor Strange. Pero un hechizo sale mal y libera a los villanos más poderosos del multiverso.",
    "director": "Jon Watts",
    "cast": [
      "Tom Holland",
      "Zendaya",
      "Benedict Cumberbatch",
      "Tobey Maguire",
      "Andrew Garfield"
    ],
    "platform": "Disney+ / Sony",
    "htmlPage": "spider-man-no-way-home.html",
    "keywords": "spider man no way home, hombre arana, multiverso, tom holland, tobey maguire, andrew garfield",
    "servers": [
      {
        "id": "dood-spider-man-no-way-home",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt10872600",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-spider-man-no-way-home",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt10872600",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-spider-man-no-way-home",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt10872600",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-spider-man-no-way-home",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt10872600",
        "provider": "FileMoon"
      },
      {
        "id": "tape-spider-man-no-way-home",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt10872600",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-spider-man-no-way-home",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt10872600",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "avengers-endgame",
    "title": "Avengers: Endgame",
    "originalTitle": "Avengers: Endgame",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    "year": 2019,
    "rating": 8.9,
    "quality": "4K UHD",
    "duration": "3h 01m",
    "genres": [
      "Acción",
      "Ciencia Ficción",
      "Aventura"
    ],
    "overview": "Tras los devastadores eventos de Infinity War, los Vengadores restantes se reúnen una vez más para deshacer las acciones de Thanos y restaurar el orden en el universo.",
    "director": "Anthony Russo, Joe Russo",
    "cast": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
      "Scarlett Johansson"
    ],
    "platform": "Disney+",
    "htmlPage": "avengers-endgame.html",
    "keywords": "avengers endgame, vengadores, iron man, capitan america, thanos, marvel",
    "servers": [
      {
        "id": "dood-avengers-endgame",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt4154796",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-avengers-endgame",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt4154796",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-avengers-endgame",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt4154796",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-avengers-endgame",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt4154796",
        "provider": "FileMoon"
      },
      {
        "id": "tape-avengers-endgame",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt4154796",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-avengers-endgame",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt4154796",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "interstellar",
    "title": "Interstellar",
    "originalTitle": "Interstellar",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    "year": 2014,
    "rating": 9,
    "quality": "4K UHD",
    "duration": "2h 49m",
    "genres": [
      "Ciencia Ficción",
      "Aventura",
      "Drama"
    ],
    "overview": "Un grupo de científicos y exploradores espaciales viajan a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.",
    "director": "Christopher Nolan",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine"
    ],
    "platform": "HBO Max",
    "htmlPage": "interstellar.html",
    "keywords": "interstellar, interestelar, agujero negro, gargantua, nolan, espacio",
    "servers": [
      {
        "id": "dood-interstellar",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0816692",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-interstellar",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0816692",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-interstellar",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0816692",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-interstellar",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0816692",
        "provider": "FileMoon"
      },
      {
        "id": "tape-interstellar",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0816692",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-interstellar",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0816692",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "john-wick-4",
    "title": "John Wick 4",
    "originalTitle": "John Wick: Chapter 4",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/h8gHn0OzRogL0GayvVWYMfKMKZz.jpg",
    "year": 2023,
    "rating": 8.6,
    "quality": "4K UHD",
    "duration": "2h 49m",
    "genres": [
      "Acción",
      "Crimen",
      "Suspenso"
    ],
    "overview": "John Wick descubre una forma de derrotar a la Alta Mesa. Pero antes de poder ganar su libertad, debe enfrentarse a un nuevo enemigo.",
    "director": "Chad Stahelski",
    "cast": [
      "Keanu Reeves",
      "Donnie Yen",
      "Bill Skarsgård",
      "Laurence Fishburne"
    ],
    "platform": "Amazon Prime",
    "htmlPage": "john-wick-4.html",
    "keywords": "john wick 4, keanu reeves, alta mesa, baba yaga, accion",
    "servers": [
      {
        "id": "dood-john-wick-4",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt10366206",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-john-wick-4",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt10366206",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-john-wick-4",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt10366206",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-john-wick-4",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt10366206",
        "provider": "FileMoon"
      },
      {
        "id": "tape-john-wick-4",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt10366206",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-john-wick-4",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt10366206",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "super-mario-bros-la-pelicula",
    "title": "Super Mario Bros: La Película",
    "originalTitle": "The Super Mario Bros. Movie",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05h6q9RI2JVR.jpg",
    "year": 2023,
    "rating": 8.2,
    "quality": "4K UHD",
    "duration": "1h 32m",
    "genres": [
      "Animación",
      "Aventura",
      "Comedia",
      "Fantasía"
    ],
    "overview": "Dos fontaneros de Brooklyn, Mario y su hermano Luigi, se ven transportados a través de una tubería misteriosa a un nuevo mundo mágico.",
    "director": "Aaron Horvath, Michael Jelenic",
    "cast": [
      "Chris Pratt",
      "Anya Taylor-Joy",
      "Jack Black",
      "Charlie Day"
    ],
    "platform": "Universal / Netflix",
    "htmlPage": "super-mario-bros.html",
    "keywords": "super mario bros, mario, luigi, bowser, peach, nintendo, jack black",
    "servers": [
      {
        "id": "dood-super-mario-bros-la-pelicula",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt6718170",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-super-mario-bros-la-pelicula",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt6718170",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-super-mario-bros-la-pelicula",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt6718170",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-super-mario-bros-la-pelicula",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt6718170",
        "provider": "FileMoon"
      },
      {
        "id": "tape-super-mario-bros-la-pelicula",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt6718170",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-super-mario-bros-la-pelicula",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt6718170",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "barbie-2023",
    "title": "Barbie",
    "originalTitle": "Barbie",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    "year": 2023,
    "rating": 8.1,
    "quality": "4K UHD",
    "duration": "1h 54m",
    "genres": [
      "Comedia",
      "Aventura",
      "Fantasía"
    ],
    "overview": "Vivir en Barbieland es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial o seas un Ken.",
    "director": "Greta Gerwig",
    "cast": [
      "Margot Robbie",
      "Ryan Gosling",
      "America Ferrera",
      "Simu Liu"
    ],
    "platform": "HBO Max",
    "htmlPage": "barbie.html",
    "keywords": "barbie, margot robbie, ryan gosling, ken, greta gerwig",
    "servers": [
      {
        "id": "dood-barbie-2023",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt1517268",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-barbie-2023",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt1517268",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-barbie-2023",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt1517268",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-barbie-2023",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt1517268",
        "provider": "FileMoon"
      },
      {
        "id": "tape-barbie-2023",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt1517268",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-barbie-2023",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt1517268",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "joker-2-folie-a-deux",
    "title": "Joker: Folie à Deux",
    "originalTitle": "Joker: Folie à Deux",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/aciP8Km0waTLG2HGikm97apgLro.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/uGmYq0N9fICQI29TVTViiWms77.jpg",
    "year": 2024,
    "rating": 8,
    "quality": "4K UHD",
    "duration": "2h 18m",
    "genres": [
      "Drama",
      "Crimen",
      "Musical",
      "Suspenso"
    ],
    "overview": "Arthur Fleck está recluido en Arkham esperando juicio por sus crímenes como Joker. Mientras lidia con su doble identidad, conoce al amor de su vida.",
    "director": "Todd Phillips",
    "cast": [
      "Joaquin Phoenix",
      "Lady Gaga",
      "Brendan Gleeson",
      "Zazie Beetz"
    ],
    "platform": "HBO Max",
    "htmlPage": "joker-2.html",
    "keywords": "joker 2, folie a deux, joaquin phoenix, lady gaga, harley quinn, dc",
    "servers": [
      {
        "id": "dood-joker-2-folie-a-deux",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt11315808",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-joker-2-folie-a-deux",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt11315808",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-joker-2-folie-a-deux",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt11315808",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-joker-2-folie-a-deux",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt11315808",
        "provider": "FileMoon"
      },
      {
        "id": "tape-joker-2-folie-a-deux",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt11315808",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-joker-2-folie-a-deux",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt11315808",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "gladiador-2",
    "title": "Gladiador 2",
    "originalTitle": "Gladiator II",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/euYIWhBvdaEvWvtIoZYDuBA2fZB.jpg",
    "year": 2024,
    "rating": 8.5,
    "quality": "4K UHD",
    "duration": "2h 28m",
    "genres": [
      "Acción",
      "Aventura",
      "Drama",
      "Historia"
    ],
    "overview": "Años después de presenciar la muerte del venerado héroe Máximo a manos de su tío, Lucio debe entrar en el Coliseo tras ser conquistado su hogar.",
    "director": "Ridley Scott",
    "cast": [
      "Paul Mescal",
      "Pedro Pascal",
      "Denzel Washington",
      "Connie Nielsen"
    ],
    "platform": "Paramount+",
    "htmlPage": "gladiador-2.html",
    "keywords": "gladiador 2, gladiator ii, ridley scott, pedro pascal, coliseo, roma",
    "servers": [
      {
        "id": "dood-gladiador-2",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt9660502",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-gladiador-2",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt9660502",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-gladiador-2",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt9660502",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-gladiador-2",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt9660502",
        "provider": "FileMoon"
      },
      {
        "id": "tape-gladiador-2",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt9660502",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-gladiador-2",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt9660502",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": true
  },
  {
    "id": "fast-and-furious-x",
    "title": "Rápidos y Furiosos 10",
    "originalTitle": "Fast X",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51fOX0bZzg.jpg",
    "year": 2023,
    "rating": 8,
    "quality": "4K UHD",
    "duration": "2h 21m",
    "genres": [
      "Acción",
      "Aventura",
      "Crimen"
    ],
    "overview": "A lo largo de muchas misiones y contra probabilidades imposibles, Dom Toretto y su familia han sido más astutos que todos los enemigos en su camino.",
    "director": "Louis Leterrier",
    "cast": [
      "Vin Diesel",
      "Michelle Rodriguez",
      "Jason Momoa",
      "Tyrese Gibson"
    ],
    "platform": "Universal",
    "htmlPage": "rapidos-y-furiosos-10.html",
    "keywords": "fast x, rapidos y furiosos 10, vin diesel, jason momoa, toretto, carreras",
    "servers": [
      {
        "id": "dood-fast-and-furious-x",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt5433140",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-fast-and-furious-x",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt5433140",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-fast-and-furious-x",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt5433140",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-fast-and-furious-x",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt5433140",
        "provider": "FileMoon"
      },
      {
        "id": "tape-fast-and-furious-x",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt5433140",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-fast-and-furious-x",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt5433140",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "el-padrino",
    "title": "El Padrino",
    "originalTitle": "The Godfather",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    "year": 1972,
    "rating": 9.2,
    "quality": "4K Remastered",
    "duration": "2h 55m",
    "genres": [
      "Crimen",
      "Drama"
    ],
    "overview": "El envejecido patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.",
    "director": "Francis Ford Coppola",
    "cast": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan",
      "Robert Duvall"
    ],
    "platform": "Paramount+",
    "htmlPage": "el-padrino.html",
    "keywords": "el padrino, the godfather, marlon brando, al pacino, mafia, corleone",
    "servers": [
      {
        "id": "dood-el-padrino",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0068646",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-el-padrino",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0068646",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-el-padrino",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0068646",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-el-padrino",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0068646",
        "provider": "FileMoon"
      },
      {
        "id": "tape-el-padrino",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0068646",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-el-padrino",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0068646",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "matrix",
    "title": "Matrix",
    "originalTitle": "The Matrix",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/ncEIB2zcvEAvnUjGzO4qJv2aG2C.jpg",
    "year": 1999,
    "rating": 8.9,
    "quality": "4K UHD",
    "duration": "2h 16m",
    "genres": [
      "Ciencia Ficción",
      "Acción"
    ],
    "overview": "Un hacker informático aprende de misteriosos rebeldes sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.",
    "director": "Lana Wachowski, Lilly Wachowski",
    "cast": [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving"
    ],
    "platform": "HBO Max",
    "htmlPage": "matrix.html",
    "keywords": "matrix, neo, keanu reeves, morfeo, ciberpunk, pastilla roja",
    "servers": [
      {
        "id": "dood-matrix",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0133093",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-matrix",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0133093",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-matrix",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0133093",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-matrix",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0133093",
        "provider": "FileMoon"
      },
      {
        "id": "tape-matrix",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0133093",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-matrix",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0133093",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "inception-el-origen",
    "title": "El Origen (Inception)",
    "originalTitle": "Inception",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "year": 2010,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 28m",
    "genres": [
      "Acción",
      "Aventura",
      "Ciencia Ficción"
    ],
    "overview": "A un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños se le da la tarea inversa de plantar una idea.",
    "director": "Christopher Nolan",
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy"
    ],
    "platform": "HBO Max",
    "htmlPage": "inception.html",
    "keywords": "inception, el origen, leonardo dicaprio, suenos, christopher nolan",
    "servers": [
      {
        "id": "dood-inception-el-origen",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt1375666",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-inception-el-origen",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt1375666",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-inception-el-origen",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt1375666",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-inception-el-origen",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt1375666",
        "provider": "FileMoon"
      },
      {
        "id": "tape-inception-el-origen",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt1375666",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-inception-el-origen",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt1375666",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "titanic-1997",
    "title": "Titanic",
    "originalTitle": "Titanic",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/6VmFqZwAbdukElTvvi2io5GXG9x.jpg",
    "year": 1997,
    "rating": 8.9,
    "quality": "4K HDR",
    "duration": "3h 14m",
    "genres": [
      "Drama",
      "Romance"
    ],
    "overview": "Una aristócrata de diecisiete años se enamora de un artista pobre y de buen corazón a bordo del lujoso e desafortunado R.M.S. Titanic.",
    "director": "James Cameron",
    "cast": [
      "Leonardo DiCaprio",
      "Kate Winslet",
      "Billy Zane",
      "Kathy Bates"
    ],
    "platform": "Disney+",
    "htmlPage": "titanic.html",
    "keywords": "titanic, james cameron, leonardo dicaprio, kate winslet, barco, iceberg",
    "servers": [
      {
        "id": "dood-titanic-1997",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0120338",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-titanic-1997",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0120338",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-titanic-1997",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0120338",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-titanic-1997",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0120338",
        "provider": "FileMoon"
      },
      {
        "id": "tape-titanic-1997",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0120338",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-titanic-1997",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0120338",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "coco-disney-pixar",
    "title": "Coco",
    "originalTitle": "Coco",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
    "year": 2017,
    "rating": 8.7,
    "quality": "4K UHD",
    "duration": "1h 45m",
    "genres": [
      "Animación",
      "Aventura",
      "Familia",
      "Fantasía"
    ],
    "overview": "El aspirante a músico Miguel, enfrentado a la prohibición ancestral de la música en su familia, ingresa a la Tierra de los Muertos para encontrar a su tatarabuelo.",
    "director": "Lee Unkrich, Adrian Molina",
    "cast": [
      "Anthony Gonzalez",
      "Gael García Bernal",
      "Benjamin Bratt",
      "Alanna Ubach"
    ],
    "platform": "Disney+",
    "htmlPage": "coco.html",
    "keywords": "coco, pixar, dia de muertos, miguel, hector, mama coco, mexico",
    "servers": [
      {
        "id": "dood-coco-disney-pixar",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt2380307",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-coco-disney-pixar",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt2380307",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-coco-disney-pixar",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt2380307",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-coco-disney-pixar",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt2380307",
        "provider": "FileMoon"
      },
      {
        "id": "tape-coco-disney-pixar",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt2380307",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-coco-disney-pixar",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt2380307",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "shrek-2",
    "title": "Shrek 2",
    "originalTitle": "Shrek 2",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/2yYP0PQjG8zVqturhCcEG24ZX6Z.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/9bTnbb6y9sR6k0w45l11wL7203K.jpg",
    "year": 2004,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "1h 33m",
    "genres": [
      "Animación",
      "Aventura",
      "Comedia",
      "Fantasía"
    ],
    "overview": "Shrek y Fiona viajan al Reino de Muy Muy Lejano para celebrar su matrimonio, pero el Rey y el Hada Madrina tienen otros planes.",
    "director": "Andrew Adamson, Kelly Asbury",
    "cast": [
      "Mike Myers",
      "Eddie Murphy",
      "Cameron Diaz",
      "Antonio Banderas"
    ],
    "platform": "DreamWorks / Netflix",
    "htmlPage": "shrek-2.html",
    "keywords": "shrek 2, fiona, burro, gato con botas, muy muy lejano, dreamworks",
    "servers": [
      {
        "id": "dood-shrek-2",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0298148",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-shrek-2",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0298148",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-shrek-2",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0298148",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-shrek-2",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0298148",
        "provider": "FileMoon"
      },
      {
        "id": "tape-shrek-2",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0298148",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-shrek-2",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0298148",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "fight-club-el-club-de-la-pelea",
    "title": "El Club de la Pelea",
    "originalTitle": "Fight Club",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    "year": 1999,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 19m",
    "genres": [
      "Drama"
    ],
    "overview": "Un oficinista insomne y un fabricante de jabón desmotivado forman un club de lucha clandestino que evoluciona hacia algo mucho mayor.",
    "director": "David Fincher",
    "cast": [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter",
      "Meat Loaf"
    ],
    "platform": "Star+",
    "htmlPage": "fight-club.html",
    "keywords": "fight club, el club de la pelea, brad pitt, tyler durden, david fincher",
    "servers": [
      {
        "id": "dood-fight-club-el-club-de-la-pelea",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0137523",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-fight-club-el-club-de-la-pelea",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0137523",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-fight-club-el-club-de-la-pelea",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0137523",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-fight-club-el-club-de-la-pelea",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0137523",
        "provider": "FileMoon"
      },
      {
        "id": "tape-fight-club-el-club-de-la-pelea",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0137523",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-fight-club-el-club-de-la-pelea",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0137523",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "jurassic-park-1993",
    "title": "Parque Jurásico",
    "originalTitle": "Jurassic Park",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/b1xCNnyrPebIc7VGipVIYxER09A.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/jBIMAT83q78plGzP4aymCjqAuv1.jpg",
    "year": 1993,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 07m",
    "genres": [
      "Aventura",
      "Ciencia Ficción",
      "Suspenso"
    ],
    "overview": "Un parque temático de dinosaurios clonados sufre una falla catastrófica de seguridad que libera a las criaturas más temidas del planeta.",
    "director": "Steven Spielberg",
    "cast": [
      "Sam Neill",
      "Laura Dern",
      "Jeff Goldblum",
      "Richard Attenborough"
    ],
    "platform": "Universal",
    "htmlPage": "jurassic-park.html",
    "keywords": "jurassic park, parque jurasico, dinosaurios, t-rex, spielberg",
    "servers": [
      {
        "id": "dood-jurassic-park-1993",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0107290",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-jurassic-park-1993",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0107290",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-jurassic-park-1993",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0107290",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-jurassic-park-1993",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0107290",
        "provider": "FileMoon"
      },
      {
        "id": "tape-jurassic-park-1993",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0107290",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-jurassic-park-1993",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0107290",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "el-senor-de-los-anillos-el-retorno-del-rey",
    "title": "El Señor de los Anillos: El Retorno del Rey",
    "originalTitle": "The Lord of the Rings: The Return of the King",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTphonPt.jpg",
    "year": 2003,
    "rating": 9,
    "quality": "4K UHD Extended",
    "duration": "3h 21m",
    "genres": [
      "Acción",
      "Aventura",
      "Drama",
      "Fantasía"
    ],
    "overview": "Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para llamar su atención de Frodo y Sam mientras se acercan al Monte del Destino con el Anillo Único.",
    "director": "Peter Jackson",
    "cast": [
      "Elijah Wood",
      "Viggo Mortensen",
      "Ian McKellen",
      "Orlando Bloom"
    ],
    "platform": "HBO Max",
    "htmlPage": "el-senor-de-los-anillos-retorno-del-rey.html",
    "keywords": "el senor de los anillos, the lord of the rings, frodo, aragorn, sauron, peter jackson",
    "servers": [
      {
        "id": "dood-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0167260",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0167260",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0167260",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0167260",
        "provider": "FileMoon"
      },
      {
        "id": "tape-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0167260",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-el-senor-de-los-anillos-el-retorno-del-rey",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0167260",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "gladiator-2000",
    "title": "Gladiador (2000)",
    "originalTitle": "Gladiator",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/ArWkuWPbt55t5KaENcy8W70LO5v.jpg",
    "year": 2000,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 35m",
    "genres": [
      "Acción",
      "Aventura",
      "Drama"
    ],
    "overview": "Un antiguo general romano se propone vengarse del emperador corrupto que asesinó a su familia y lo envió a la esclavitud.",
    "director": "Ridley Scott",
    "cast": [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen",
      "Oliver Reed"
    ],
    "platform": "Paramount+",
    "htmlPage": "gladiador-1.html",
    "keywords": "gladiador, maximo decimo meridio, russell crowe, joaquin phoenix, coliseo",
    "servers": [
      {
        "id": "dood-gladiator-2000",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0172495",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-gladiator-2000",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0172495",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-gladiator-2000",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0172495",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-gladiator-2000",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0172495",
        "provider": "FileMoon"
      },
      {
        "id": "tape-gladiator-2000",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0172495",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-gladiator-2000",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0172495",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "batman-el-caballero-de-la-noche",
    "title": "Batman: El Caballero de la Noche",
    "originalTitle": "The Dark Knight",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    "year": 2008,
    "rating": 9.1,
    "quality": "4K UHD",
    "duration": "2h 32m",
    "genres": [
      "Acción",
      "Crimen",
      "Drama"
    ],
    "overview": "Cuando la amenaza conocida como el Joker causa estragos y caos en Gotham, Batman debe aceptar una de las mayores pruebas psicológicas y físicas para luchar contra la injusticia.",
    "director": "Christopher Nolan",
    "cast": [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine"
    ],
    "platform": "HBO Max",
    "htmlPage": "the-dark-knight.html",
    "keywords": "the dark knight, el caballero de la noche, heath ledger, joker, christian bale, nolan",
    "servers": [
      {
        "id": "dood-batman-el-caballero-de-la-noche",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0468569",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-batman-el-caballero-de-la-noche",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0468569",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-batman-el-caballero-de-la-noche",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0468569",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-batman-el-caballero-de-la-noche",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0468569",
        "provider": "FileMoon"
      },
      {
        "id": "tape-batman-el-caballero-de-la-noche",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0468569",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-batman-el-caballero-de-la-noche",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0468569",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "harry-potter-y-las-reliquias-de-la-muerte-parte-2",
    "title": "Harry Potter y las Reliquias de la Muerte 2",
    "originalTitle": "Harry Potter and the Deathly Hallows: Part 2",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/da22MRR6A66iz6Ueb04d5IebGtt.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/n5A7br2035F20pvhngf5u49n94N.jpg",
    "year": 2011,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "2h 10m",
    "genres": [
      "Aventura",
      "Familia",
      "Fantasía"
    ],
    "overview": "Harry, Ron y Hermione buscan los Horrocruxes restantes de Voldemort en su esfuerzo por destruir al Señor Oscuro mientras la batalla final hace estragos en Hogwarts.",
    "director": "David Yates",
    "cast": [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint",
      "Ralph Fiennes"
    ],
    "platform": "HBO Max",
    "htmlPage": "harry-potter-reliquias-de-la-muerte-2.html",
    "keywords": "harry potter, reliquias de la muerte, hogwarts, voldemort, daniel radcliffe",
    "servers": [
      {
        "id": "dood-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt1201607",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt1201607",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt1201607",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt1201607",
        "provider": "FileMoon"
      },
      {
        "id": "tape-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt1201607",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-harry-potter-y-las-reliquias-de-la-muerte-parte-2",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt1201607",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "pulp-fiction-tiempos-violentos",
    "title": "Tiempos Violentos (Pulp Fiction)",
    "originalTitle": "Pulp Fiction",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "year": 1994,
    "rating": 8.9,
    "quality": "4K UHD",
    "duration": "2h 34m",
    "genres": [
      "Crimen",
      "Drama"
    ],
    "overview": "Las vidas de dos sicarios de la mafia, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.",
    "director": "Quentin Tarantino",
    "cast": [
      "John Travolta",
      "Uma Thurman",
      "Samuel L. Jackson",
      "Bruce Willis"
    ],
    "platform": "Paramount+",
    "htmlPage": "pulp-fiction.html",
    "keywords": "pulp fiction, tiempos violentos, quentin tarantino, john travolta, samuel l jackson",
    "servers": [
      {
        "id": "dood-pulp-fiction-tiempos-violentos",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0110912",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-pulp-fiction-tiempos-violentos",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0110912",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-pulp-fiction-tiempos-violentos",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0110912",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-pulp-fiction-tiempos-violentos",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0110912",
        "provider": "FileMoon"
      },
      {
        "id": "tape-pulp-fiction-tiempos-violentos",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0110912",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-pulp-fiction-tiempos-violentos",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0110912",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "volver-al-futuro",
    "title": "Volver al Futuro",
    "originalTitle": "Back to the Future",
    "type": "movie",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1tlA1FSE73nO.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/58D4t08H5N1yH9d747v2oZ1N7Xf.jpg",
    "year": 1985,
    "rating": 8.8,
    "quality": "4K UHD",
    "duration": "1h 56m",
    "genres": [
      "Aventura",
      "Comedia",
      "Ciencia Ficción"
    ],
    "overview": "Marty McFly es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo inventado por su amigo el científico Doc Brown.",
    "director": "Robert Zemeckis",
    "cast": [
      "Michael J. Fox",
      "Christopher Lloyd",
      "Lea Thompson",
      "Crispin Glover"
    ],
    "platform": "Universal",
    "htmlPage": "volver-al-futuro.html",
    "keywords": "volver al futuro, back to the future, delorean, marty mcfly, doc brown",
    "servers": [
      {
        "id": "dood-volver-al-futuro",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0088763",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-volver-al-futuro",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0088763",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-volver-al-futuro",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0088763",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-volver-al-futuro",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0088763",
        "provider": "FileMoon"
      },
      {
        "id": "tape-volver-al-futuro",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0088763",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-volver-al-futuro",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0088763",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "cyberpunk-edgerunners",
    "title": "Cyberpunk: Edgerunners",
    "originalTitle": "Cyberpunk: Edgerunners",
    "type": "anime",
    "isAnime": true,
    "poster": "https://image.tmdb.org/t/p/w500/7JkW8fV7N1i78n2328y8319x301.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/7W6aLq2M0pA2QY4fN87Q8Y0k9pA.jpg",
    "year": 2022,
    "rating": 8.9,
    "quality": "4K UHD",
    "duration": "1 Temporada (10 eps)",
    "genres": [
      "Anime",
      "Ciencia Ficción",
      "Acción",
      "Ciberpunk"
    ],
    "overview": "En una distopía plagada de corrupción e implantes cibernéticos, un talentoso pero impulsivo chico de la calle se esfuerza por convertirse en un edgerunner.",
    "director": "Hiroyuki Imaishi",
    "cast": [
      "KENN",
      "Aoi Yuki",
      "Hiroki Touchi",
      "Michiko Kaiden"
    ],
    "platform": "Netflix",
    "htmlPage": "cyberpunk-edgerunners.html",
    "keywords": "cyberpunk edgerunners, david martinez, lucy, rebecca, night city, trigger",
    "servers": [
      {
        "id": "dood-cyberpunk-edgerunners",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt12590266",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-cyberpunk-edgerunners",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt12590266",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-cyberpunk-edgerunners",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt12590266",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-cyberpunk-edgerunners",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt12590266",
        "provider": "FileMoon"
      },
      {
        "id": "tape-cyberpunk-edgerunners",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt12590266",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-cyberpunk-edgerunners",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt12590266",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "breaking-bad",
    "title": "Breaking Bad",
    "originalTitle": "Breaking Bad",
    "type": "tv",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    "year": 2013,
    "rating": 9.5,
    "quality": "4K UHD",
    "duration": "5 Temporadas (62 eps)",
    "genres": [
      "Crimen",
      "Drama",
      "Suspenso"
    ],
    "overview": "Un profesor de química de secundaria diagnosticado con cáncer de pulmón inoperable recurre a la fabricación y venta de metanfetamina para asegurar el futuro de su familia.",
    "director": "Vince Gilligan",
    "cast": [
      "Bryan Cranston",
      "Aaron Paul",
      "Anna Gunn",
      "Giancarlo Esposito"
    ],
    "platform": "Netflix",
    "htmlPage": "breaking-bad.html",
    "keywords": "breaking bad, walter white, heisenberg, jesse pinkman, gus fring, albuquerque",
    "servers": [
      {
        "id": "dood-breaking-bad",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt0903747",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-breaking-bad",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt0903747",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-breaking-bad",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt0903747",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-breaking-bad",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt0903747",
        "provider": "FileMoon"
      },
      {
        "id": "tape-breaking-bad",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt0903747",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-breaking-bad",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt0903747",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "the-last-of-us",
    "title": "The Last of Us",
    "originalTitle": "The Last of Us",
    "type": "tv",
    "isAnime": false,
    "poster": "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrne.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    "year": 2023,
    "rating": 9,
    "quality": "4K UHD",
    "duration": "1 Temporada (9 eps)",
    "genres": [
      "Drama",
      "Aventura",
      "Acción",
      "Terror"
    ],
    "overview": "Veinte años después de que la civilización moderna fuera destruida, Joel es contratado para sacar a Ellie, una niña de 14 años, de una opresiva zona de cuarentena.",
    "director": "Craig Mazin, Neil Druckmann",
    "cast": [
      "Pedro Pascal",
      "Bella Ramsey",
      "Gabriel Luna",
      "Anna Torv"
    ],
    "platform": "HBO Max",
    "htmlPage": "the-last-of-us.html",
    "keywords": "the last of us, joel, ellie, pedro pascal, cordyceps, hbo max",
    "servers": [
      {
        "id": "dood-the-last-of-us",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt3581920",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-the-last-of-us",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt3581920",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-the-last-of-us",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt3581920",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-the-last-of-us",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt3581920",
        "provider": "FileMoon"
      },
      {
        "id": "tape-the-last-of-us",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt3581920",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-the-last-of-us",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt3581920",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  },
  {
    "id": "arcane-league-of-legends",
    "title": "Arcane: League of Legends",
    "originalTitle": "Arcane",
    "type": "anime",
    "isAnime": true,
    "poster": "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3975R6bWc.jpg",
    "backdrop": "https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
    "year": 2024,
    "rating": 9.2,
    "quality": "4K UHD",
    "duration": "2 Temporadas (18 eps)",
    "genres": [
      "Anime",
      "Animación",
      "Ciencia Ficción",
      "Acción",
      "Fantasía"
    ],
    "overview": "En medio del conflicto entre las ciudades gemelas de Piltover y Zaun, dos hermanas luchan en lados opuestos de una guerra entre tecnologías mágicas.",
    "director": "Pascal Charrue, Arnaud Delord",
    "cast": [
      "Hailee Steinfeld",
      "Ella Purnell",
      "Katie Leung",
      "Kevin Alejandro"
    ],
    "platform": "Netflix / Riot Games",
    "htmlPage": "arcane.html",
    "keywords": "arcane, jinx, vi, piltover, zaun, league of legends, riot games",
    "servers": [
      {
        "id": "dood-arcane-league-of-legends",
        "name": "Doodstream Playmogo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://playmogo.com/e/tt11126994",
        "provider": "Doodstream"
      },
      {
        "id": "vidsrc-arcane-league-of-legends",
        "name": "Servidor 4K VIP",
        "quality": "4K UHD",
        "lang": "Latino / Dual",
        "url": "https://vidsrc.to/embed/movie/tt11126994",
        "provider": "Vidsrc"
      },
      {
        "id": "wish-arcane-league-of-legends",
        "name": "StreamWish Directo",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamwish.to/e/tt11126994",
        "provider": "StreamWish"
      },
      {
        "id": "filemoon-arcane-league-of-legends",
        "name": "FileMoon 4K",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://filemoon.sx/e/tt11126994",
        "provider": "FileMoon"
      },
      {
        "id": "tape-arcane-league-of-legends",
        "name": "Streamtape MP4",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://streamtape.com/e/tt11126994",
        "provider": "Streamtape"
      },
      {
        "id": "vdohide-arcane-league-of-legends",
        "name": "VdoHide Fast",
        "quality": "1080p FHD",
        "lang": "Español Latino",
        "url": "https://vdohide.com/e/tt11126994",
        "provider": "VdoHide"
      }
    ],
    "isFeatured": false,
    "isTrending": false
  }
];

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

    const targetView = document.getElementById(`view-${tabName}`);
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

    toast.innerHTML = `<span>🇵🇪</span><span>${message}</span>`;
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
    const id = `custom-${slug}-${Date.now().toString().slice(-4)}`;
    const htmlPage = `${slug}.html`;

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
      keywords: `${slug}, ${title}, latino, 4k, andy`,
      servers: [
        { id: `srv-1-${id}`, name: `${provider} Principal`, quality, lang, url, provider },
        { id: `srv-2-${id}`, name: 'Doodstream Backup', quality: '1080p', lang: 'Latino', url, provider: 'Doodstream' }
      ],
      isFeatured: false,
      isTrending: true
    };

    this.mediaList.unshift(newMedia);
    this.saveMediaList();
    this.render();
    this.closeCreatorModal();
    this.showToast(`¡"${title}" agregada por Administrador Andy!`);
    this.playMedia(newMedia);
  }

  executeDownloadFormHtml() {
    const title = document.getElementById('form-title').value.trim() || 'mi-pelicula';
    const url = document.getElementById('form-url').value.trim() || 'https://playmogo.com/e/ykm9tsifkch1';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const content = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title} - andyaxceldominguezccorau TV 🇵🇪</title></head><body style="margin:0;background:#000;height:100vh;overflow:hidden;"><iframe src="${url}" style="width:100%;height:100%;border:0;" allowfullscreen></iframe></body></html>`;
    
    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast(`Archivo ${slug}.html descargado por Admin Andy 🇵🇪`);
  }

  executeDownloadMediaHtml(item) {
    const streamUrl = (item.servers && item.servers[0]?.url) ? item.servers[0].url : 'https://playmogo.com/e/ykm9tsifkch1';
    const content = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${item.title} - andyaxceldominguezccorau TV 🇵🇪</title>
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
    <div style="font-size:13px;color:#a1a1aa;">${item.title} (${item.year})</div>
  </header>
  <div class="video-box">
    <iframe src="${streamUrl}" allowfullscreen allow="autoplay; fullscreen; encrypted-media"></iframe>
  </div>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const fileName = item.htmlPage || (item.id + '.html');
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast(`Archivo ${fileName} descargado por Admin Andy 🇵🇪`);
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
    if (metaEl) metaEl.textContent = `${item.year} • ${item.quality} • ${item.duration} • Español Latino 🇵🇪`;

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
      btn.className = `px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 cursor-pointer ${
        index === 0 
          ? 'bg-yellow-400 text-black border-yellow-400 shadow-md' 
          : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border-zinc-700/60'
      }`;
      btn.innerHTML = `
        <span>⚡</span>
        <span class="truncate">${server.name}</span>
      `;

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

    videoContainer.innerHTML = `
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img src="${movieArt}" class="w-full h-full object-cover blur-md opacity-45 scale-105" alt="Fondo Película" onerror="this.style.display='none'" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center space-y-2 opacity-70">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shadow-lg">
              <span class="text-xl font-black text-yellow-400">🇵🇪</span>
            </div>
            <p class="text-xs font-bold text-zinc-300">Cargando ${this.currentPlaying?.title || 'Transmisión'}...</p>
          </div>
        </div>
      </div>
    `;
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
    if (meta) meta.textContent = `${item.year} • ${item.duration} • ${item.genres.join(', ')}`;
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
      heroFavBtn.className = `p-2 rounded-xl transition-all cursor-pointer ${
        isFav ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20' : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200'
      }`;
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
      
      const safeTitle = item.title.replace(/'/g, "\'");
      const genre = item.genres[0] || '4K';

      card.innerHTML = `
        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md group-hover/card:border-yellow-400/50 group-hover/card:shadow-xl group-hover/card:shadow-yellow-500/10 transition-all">
          <img 
            src="${item.poster}" 
            alt="${item.title}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src=getPosterFallback('${safeTitle}', '${genre}', '${item.year}');"
            class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
          />
          <div class="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400 border border-yellow-400/30">
            ${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            ${item.quality}
          </div>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform">
              <svg class="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="mt-2 px-0.5">
          <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate group-hover/card:text-yellow-400 transition-colors">
            ${item.title}
          </h3>
          <p class="text-[11px] text-zinc-400 truncate mt-0.5 flex items-center space-x-1">
            <span class="text-yellow-400/80">🇵🇪</span>
            <span>${item.year} • ${item.genres[0] || '4K'}</span>
          </p>
        </div>
      `;

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
      
      const safeTitle = item.title.replace(/'/g, "\'");
      const genre = item.genres[0] || '4K';

      card.innerHTML = `
        <div class="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg group-hover:border-yellow-400/50 transition-all">
          <img 
            src="${item.poster}" 
            alt="${item.title}" 
            loading="lazy" 
            onerror="this.onerror=null; this.src=getPosterFallback('${safeTitle}', '${genre}', '${item.year}');"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div class="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-extrabold text-yellow-400">
            ${item.rating.toFixed(1)}
          </div>
          <div class="absolute top-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-300">
            ${item.quality}
          </div>
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg">
              <svg class="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <h3 class="text-xs sm:text-sm font-semibold text-zinc-200 truncate mt-2 group-hover:text-yellow-400">
          ${item.title}
        </h3>
        <p class="text-[11px] text-zinc-400 truncate flex items-center space-x-1">
          <span>🇵🇪</span>
          <span>${item.year} • ${item.genres[0] || '4K'}</span>
        </p>
      `;

      card.onclick = () => this.playMedia(item);
      container.appendChild(card);
    });
  }

renderSearchResults(query) {
  const container = document.getElementById('search-results-grid');
  const headerTitle = document.getElementById('search-header-title');

  if (!container) return;

  const trimmed = String(query || '').toLowerCase().trim();

  let filtered = [...this.mediaList];

  // FILTROS
  if (this.searchFilter === 'movie') {
    filtered = filtered.filter(m => m.type === 'movie');

  } else if (this.searchFilter === 'tv') {
    filtered = filtered.filter(m => m.type === 'tv');

  } else if (this.searchFilter === 'anime') {
    filtered = filtered.filter(
      m => m.isAnime || m.type === 'anime'
    );

  } else if (this.searchFilter === 'html') {
    filtered = filtered.filter(
      m => Boolean(m.htmlPage)
    );
  }

  // BUSQUEDA EN TODOS LOS JSON
  if (trimmed) {

    const searchTerms = trimmed
      .replace(/^#/, '')
      .split(/\s+/)
      .filter(Boolean);

    filtered = filtered.filter(item => {

      const searchableText = [
        item.id,
        item.title,
        item.originalTitle,
        item.director,
        item.cast,
        item.keywords,
        item.genres,
        item.htmlPage,
        item.year,
        item.type,
        item.quality,
        item.duration,
        item.platform,
        item.provider
      ]
        .flat(Infinity)
        .filter(value => value !== null && value !== undefined)
        .join(' ')
        .toLowerCase();

      return searchTerms.every(term =>
        searchableText.includes(term)
      );
    });
  }

  // TITULO
  if (headerTitle) {
    headerTitle.innerHTML = trimmed
      ? `Resultados para <span class="text-yellow-400">"${query}"</span> (${filtered.length} encontrados)`
      : `Catálogo Disponible <span class="text-yellow-400 font-extrabold">(${filtered.length} títulos)</span>`;
  }

  container.innerHTML = '';

  // SIN RESULTADOS
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-zinc-500">
        <p class="text-base font-semibold">
          No se encontraron resultados para "${query}"
        </p>

        <p class="text-xs text-zinc-600 mt-1">
          Prueba con título, actor, género, año o ID como #avatar-2
        </p>
      </div>
    `;

    return;
  }

  // RESULTADOS
  filtered.forEach(item => {

    const itemEl = document.createElement('div');

    itemEl.className =
      'flex items-center justify-between p-3 rounded-2xl bg-[#141419] hover:bg-[#1c1c24] border border-zinc-800/80 hover:border-yellow-400/50 cursor-pointer transition-all duration-200 group';

    const title = String(item.title || 'Sin título');

    const genre =
      Array.isArray(item.genres)
        ? item.genres[0] || '4K'
        : '4K';

    itemEl.innerHTML = `
      <div class="flex items-center space-x-3.5 min-w-0 flex-1">

        <div class="w-14 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 relative border border-zinc-800">

          <img
            src="${item.poster || ''}"
            alt="${title}"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onerror="this.onerror=null; this.src=getPosterFallback('${title.replace(/'/g, "\\'")}', '${genre}', '${item.year || ''}');"
          />

        </div>

        <div class="flex-1 min-w-0 pr-2">

          <div class="flex items-center space-x-2">

            <span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-yellow-400 font-mono font-bold">
              #${item.id || ''}
            </span>

            <span class="text-[10px] text-zinc-400">
              ${item.year || ''}
            </span>

          </div>

          <h3 class="text-sm font-bold text-zinc-100 group-hover:text-yellow-400 truncate mt-0.5">
            ${title}
          </h3>

          <p class="text-xs text-zinc-400 mt-0.5 truncate">
            ★ ${Number(item.rating || 0).toFixed(1)}
            • ${
              Array.isArray(item.genres)
                ? item.genres.slice(0, 2).join(', ')
                : ''
            }
            • ${item.quality || ''}
          </p>

        </div>

      </div>

      <div class="flex items-center space-x-2 flex-shrink-0">

        ${
          item.htmlPage
            ? `
              <a
                href="${item.htmlPage}"
                class="p-2 rounded-xl bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 transition-colors border border-zinc-700 text-xs font-semibold"
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

    itemEl.onclick = (e) => {

      if (e.target.closest('a')) {
        return;
      }

      this.closeSearch();
      this.playMedia(item);

    };

    container.appendChild(itemEl);
  });
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
