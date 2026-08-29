const fs = require('fs');
const path = require('path');

const MOVIES_DATABASE = [
  {
    id: 'avatar-2-el-sentido-del-agua',
    title: 'Avatar: El Sentido del Agua',
    originalTitle: 'Avatar: The Way of Water',
    year: 2022,
    rating: 8.8,
    quality: '4K UHD',
    duration: '3h 12m',
    genres: ['Ciencia Ficción', 'Aventura', 'Acción', 'Fantasía'],
    overview: 'Ambientada más de una década después de los acontecimientos de la primera película, Avatar: The Way of Water empieza contando la historia de la familia Sully, los problemas que los persiguen y las batallas que libran en los océanos de Pandora.',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver', 'Kate Winslet'],
    platform: 'Disney+',
    htmlPage: 'avatar-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8sMmAmwh2xRURq6949qPt09x3Me.jpg',
    imdbId: 'tt1630029',
    doodId: 'ykm9tsifkch1',
    keywords: 'avatar 2, el sentido del agua, the way of water, james cameron, pandora, na vi, jake sully, neytiri, doodstream'
  },
  {
    id: 'la-guerra-del-planeta-de-los-simios',
    title: 'La Guerra del Planeta de los Simios',
    originalTitle: 'War for the Planet of the Apes',
    year: 2017,
    rating: 8.7,
    quality: '4K UHD',
    duration: '2h 20m',
    genres: ['Acción', 'Ciencia Ficción', 'Drama', 'Aventura'],
    overview: 'César y sus simios son forzados a encarar un conflicto mortal contra un ejército de humanos liderados por un implacable coronel.',
    director: 'Matt Reeves',
    cast: ['Andy Serkis', 'Woody Harrelson', 'Steve Zahn', 'Karin Konoval'],
    platform: 'Disney+',
    htmlPage: 'la-guerra-del-planeta-de-los-simios.html',
    poster: 'https://image.tmdb.org/t/p/w500/3vYh80gR4V8pP8m2F19X1c8Bq0E.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ulMscezy9YX0bhknvJbZoUgQxO5.jpg',
    imdbId: 'tt3498820',
    keywords: 'planeta de los simios, war for the planet of the apes, cesar, simios, primates, matt reeves'
  },
  {
    id: 'the-batman-2022',
    title: 'The Batman',
    originalTitle: 'The Batman',
    year: 2022,
    rating: 8.5,
    quality: '4K UHD',
    duration: '2h 56m',
    genres: ['Acción', 'Crimen', 'Drama', 'Misterio'],
    overview: 'En su segundo año luchando contra el crimen, Batman explora la corrupción existente en Gotham City y el vínculo de la misma con su propia familia.',
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Colin Farrell'],
    platform: 'HBO Max',
    htmlPage: 'the-batman.html',
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYz9G660E.jpg',
    imdbId: 'tt1877830',
    keywords: 'the batman, bruce wayne, robert pattinson, acertijo, gotham, dc comics'
  },
  {
    id: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    originalTitle: 'Deadpool & Wolverine',
    year: 2024,
    rating: 8.4,
    quality: '4K UHD',
    duration: '2h 08m',
    genres: ['Acción', 'Comedia', 'Ciencia Ficción'],
    overview: 'Wolverine se recupera de sus heridas cuando se cruza con el bocazas de Deadpool para salvar su universo.',
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin'],
    platform: 'Disney+',
    htmlPage: 'deadpool-wolverine.html',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB128QIki.jpg',
    imdbId: 'tt6263850',
    keywords: 'deadpool wolverine, ryan reynolds, hugh jackman, marvel, mcu, comedia'
  },
  {
    id: 'dune-part-two',
    title: 'Duna: Parte Dos',
    originalTitle: 'Dune: Part Two',
    year: 2024,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 46m',
    genres: ['Ciencia Ficción', 'Aventura', 'Acción', 'Drama'],
    overview: 'Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    platform: 'HBO Max',
    htmlPage: 'duna-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/8b8RnxudHu0xRvc6Usc5Aq94ppq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg',
    imdbId: 'tt15239678',
    keywords: 'dune 2, duna parte dos, timothee chalamet, zendaya, arrakis, gusano de arena'
  },
  {
    id: 'oppenheimer-2023',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    year: 2023,
    rating: 8.9,
    quality: '4K UHD',
    duration: '3h 00m',
    genres: ['Drama', 'Historia', 'Biografía'],
    overview: 'La historia del físico estadounidense J. Robert Oppenheimer, al frente del Laboratorio de Los Álamos durante el Proyecto Manhattan.',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    platform: 'Amazon Prime',
    htmlPage: 'oppenheimer.html',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    imdbId: 'tt15398776',
    keywords: 'oppenheimer, christopher nolan, cillian murphy, bomba atomica, los alamos, oscar'
  },
  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    originalTitle: 'Spider-Man: No Way Home',
    year: 2021,
    rating: 8.7,
    quality: '4K UHD',
    duration: '2h 28m',
    genres: ['Acción', 'Aventura', 'Ciencia Ficción'],
    overview: 'Con la identidad de Spider-Man ahora revelada, Peter recurre al Doctor Strange. Pero un hechizo sale mal y libera a los villanos más poderosos del multiverso.',
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Tobey Maguire', 'Andrew Garfield'],
    platform: 'Disney+ / Sony',
    htmlPage: 'spider-man-no-way-home.html',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
    imdbId: 'tt10872600',
    keywords: 'spider man no way home, hombre arana, multiverso, tom holland, tobey maguire, andrew garfield'
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    originalTitle: 'Avengers: Endgame',
    year: 2019,
    rating: 8.9,
    quality: '4K UHD',
    duration: '3h 01m',
    genres: ['Acción', 'Ciencia Ficción', 'Aventura'],
    overview: 'Tras los devastadores eventos de Infinity War, los Vengadores restantes se reúnen una vez más para deshacer las acciones de Thanos y restaurar el orden en el universo.',
    director: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth', 'Scarlett Johansson'],
    platform: 'Disney+',
    htmlPage: 'avengers-endgame.html',
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    imdbId: 'tt4154796',
    keywords: 'avengers endgame, vengadores, iron man, capitan america, thanos, marvel'
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    year: 2014,
    rating: 9.0,
    quality: '4K UHD',
    duration: '2h 49m',
    genres: ['Ciencia Ficción', 'Aventura', 'Drama'],
    overview: 'Un grupo de científicos y exploradores espaciales viajan a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    platform: 'HBO Max',
    htmlPage: 'interstellar.html',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    imdbId: 'tt0816692',
    keywords: 'interstellar, interestelar, agujero negro, gargantua, nolan, espacio'
  },
  {
    id: 'john-wick-4',
    title: 'John Wick 4',
    originalTitle: 'John Wick: Chapter 4',
    year: 2023,
    rating: 8.6,
    quality: '4K UHD',
    duration: '2h 49m',
    genres: ['Acción', 'Crimen', 'Suspenso'],
    overview: 'John Wick descubre una forma de derrotar a la Alta Mesa. Pero antes de poder ganar su libertad, debe enfrentarse a un nuevo enemigo.',
    director: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
    platform: 'Amazon Prime',
    htmlPage: 'john-wick-4.html',
    poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/h8gHn0OzRogL0GayvVWYMfKMKZz.jpg',
    imdbId: 'tt10366206',
    keywords: 'john wick 4, keanu reeves, alta mesa, baba yaga, accion'
  },
  {
    id: 'super-mario-bros-la-pelicula',
    title: 'Super Mario Bros: La Película',
    originalTitle: 'The Super Mario Bros. Movie',
    year: 2023,
    rating: 8.2,
    quality: '4K UHD',
    duration: '1h 32m',
    genres: ['Animación', 'Aventura', 'Comedia', 'Fantasía'],
    overview: 'Dos fontaneros de Brooklyn, Mario y su hermano Luigi, se ven transportados a través de una tubería misteriosa a un nuevo mundo mágico.',
    director: 'Aaron Horvath, Michael Jelenic',
    cast: ['Chris Pratt', 'Anya Taylor-Joy', 'Jack Black', 'Charlie Day'],
    platform: 'Universal / Netflix',
    htmlPage: 'super-mario-bros.html',
    poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05h6q9RI2JVR.jpg',
    imdbId: 'tt6718170',
    keywords: 'super mario bros, mario, luigi, bowser, peach, nintendo, jack black'
  },
  {
    id: 'barbie-2023',
    title: 'Barbie',
    originalTitle: 'Barbie',
    year: 2023,
    rating: 8.1,
    quality: '4K UHD',
    duration: '1h 54m',
    genres: ['Comedia', 'Aventura', 'Fantasía'],
    overview: 'Vivir en Barbieland es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial o seas un Ken.',
    director: 'Greta Gerwig',
    cast: ['Margot Robbie', 'Ryan Gosling', 'America Ferrera', 'Simu Liu'],
    platform: 'HBO Max',
    htmlPage: 'barbie.html',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
    imdbId: 'tt1517268',
    keywords: 'barbie, margot robbie, ryan gosling, ken, greta gerwig'
  },
  {
    id: 'joker-2-folie-a-deux',
    title: 'Joker: Folie à Deux',
    originalTitle: 'Joker: Folie à Deux',
    year: 2024,
    rating: 8.0,
    quality: '4K UHD',
    duration: '2h 18m',
    genres: ['Drama', 'Crimen', 'Musical', 'Suspenso'],
    overview: 'Arthur Fleck está recluido en Arkham esperando juicio por sus crímenes como Joker. Mientras lidia con su doble identidad, conoce al amor de su vida.',
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Lady Gaga', 'Brendan Gleeson', 'Zazie Beetz'],
    platform: 'HBO Max',
    htmlPage: 'joker-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/aciP8Km0waTLG2HGikm97apgLro.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uGmYq0N9fICQI29TVTViiWms77.jpg',
    imdbId: 'tt11315808',
    keywords: 'joker 2, folie a deux, joaquin phoenix, lady gaga, harley quinn, dc'
  },
  {
    id: 'gladiador-2',
    title: 'Gladiador 2',
    originalTitle: 'Gladiator II',
    year: 2024,
    rating: 8.5,
    quality: '4K UHD',
    duration: '2h 28m',
    genres: ['Acción', 'Aventura', 'Drama', 'Historia'],
    overview: 'Años después de presenciar la muerte del venerado héroe Máximo a manos de su tío, Lucio debe entrar en el Coliseo tras ser conquistado su hogar.',
    director: 'Ridley Scott',
    cast: ['Paul Mescal', 'Pedro Pascal', 'Denzel Washington', 'Connie Nielsen'],
    platform: 'Paramount+',
    htmlPage: 'gladiador-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/euYIWhBvdaEvWvtIoZYDuBA2fZB.jpg',
    imdbId: 'tt9660502',
    keywords: 'gladiador 2, gladiator ii, ridley scott, pedro pascal, coliseo, roma'
  },
  {
    id: 'fast-and-furious-x',
    title: 'Rápidos y Furiosos 10',
    originalTitle: 'Fast X',
    year: 2023,
    rating: 8.0,
    quality: '4K UHD',
    duration: '2h 21m',
    genres: ['Acción', 'Aventura', 'Crimen'],
    overview: 'A lo largo de muchas misiones y contra probabilidades imposibles, Dom Toretto y su familia han sido más astutos que todos los enemigos en su camino.',
    director: 'Louis Leterrier',
    cast: ['Vin Diesel', 'Michelle Rodriguez', 'Jason Momoa', 'Tyrese Gibson'],
    platform: 'Universal',
    htmlPage: 'rapidos-y-furiosos-10.html',
    poster: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51fOX0bZzg.jpg',
    imdbId: 'tt5433140',
    keywords: 'fast x, rapidos y furiosos 10, vin diesel, jason momoa, toretto, carreras'
  },
  {
    id: 'el-padrino',
    title: 'El Padrino',
    originalTitle: 'The Godfather',
    year: 1972,
    rating: 9.2,
    quality: '4K Remastered',
    duration: '2h 55m',
    genres: ['Crimen', 'Drama'],
    overview: 'El envejecido patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.',
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall'],
    platform: 'Paramount+',
    htmlPage: 'el-padrino.html',
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    imdbId: 'tt0068646',
    keywords: 'el padrino, the godfather, marlon brando, al pacino, mafia, corleone'
  },
  {
    id: 'matrix',
    title: 'Matrix',
    originalTitle: 'The Matrix',
    year: 1999,
    rating: 8.9,
    quality: '4K UHD',
    duration: '2h 16m',
    genres: ['Ciencia Ficción', 'Acción'],
    overview: 'Un hacker informático aprende de misteriosos rebeldes sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.',
    director: 'Lana Wachowski, Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    platform: 'HBO Max',
    htmlPage: 'matrix.html',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ncEIB2zcvEAvnUjGzO4qJv2aG2C.jpg',
    imdbId: 'tt0133093',
    keywords: 'matrix, neo, keanu reeves, morfeo, ciberpunk, pastilla roja'
  },
  {
    id: 'inception-el-origen',
    title: 'El Origen (Inception)',
    originalTitle: 'Inception',
    year: 2010,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 28m',
    genres: ['Acción', 'Aventura', 'Ciencia Ficción'],
    overview: 'A un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños se le da la tarea inversa de plantar una idea.',
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    platform: 'HBO Max',
    htmlPage: 'inception.html',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    imdbId: 'tt1375666',
    keywords: 'inception, el origen, leonardo dicaprio, suenos, christopher nolan'
  },
  {
    id: 'titanic-1997',
    title: 'Titanic',
    originalTitle: 'Titanic',
    year: 1997,
    rating: 8.9,
    quality: '4K HDR',
    duration: '3h 14m',
    genres: ['Drama', 'Romance'],
    overview: 'Una aristócrata de diecisiete años se enamora de un artista pobre y de buen corazón a bordo del lujoso e desafortunado R.M.S. Titanic.',
    director: 'James Cameron',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane', 'Kathy Bates'],
    platform: 'Disney+',
    htmlPage: 'titanic.html',
    poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6VmFqZwAbdukElTvvi2io5GXG9x.jpg',
    imdbId: 'tt0120338',
    keywords: 'titanic, james cameron, leonardo dicaprio, kate winslet, barco, iceberg'
  },
  {
    id: 'coco-disney-pixar',
    title: 'Coco',
    originalTitle: 'Coco',
    year: 2017,
    rating: 8.7,
    quality: '4K UHD',
    duration: '1h 45m',
    genres: ['Animación', 'Aventura', 'Familia', 'Fantasía'],
    overview: 'El aspirante a músico Miguel, enfrentado a la prohibición ancestral de la música en su familia, ingresa a la Tierra de los Muertos para encontrar a su tatarabuelo.',
    director: 'Lee Unkrich, Adrian Molina',
    cast: ['Anthony Gonzalez', 'Gael García Bernal', 'Benjamin Bratt', 'Alanna Ubach'],
    platform: 'Disney+',
    htmlPage: 'coco.html',
    poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtY40Yb.jpg',
    imdbId: 'tt2380307',
    keywords: 'coco, pixar, dia de muertos, miguel, hector, mama coco, mexico'
  },
  {
    id: 'shrek-2',
    title: 'Shrek 2',
    originalTitle: 'Shrek 2',
    year: 2004,
    rating: 8.8,
    quality: '4K UHD',
    duration: '1h 33m',
    genres: ['Animación', 'Aventura', 'Comedia', 'Fantasía'],
    overview: 'Shrek y Fiona viajan al Reino de Muy Muy Lejano para celebrar su matrimonio, pero el Rey y el Hada Madrina tienen otros planes.',
    director: 'Andrew Adamson, Kelly Asbury',
    cast: ['Mike Myers', 'Eddie Murphy', 'Cameron Diaz', 'Antonio Banderas'],
    platform: 'DreamWorks / Netflix',
    htmlPage: 'shrek-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/2yYP0PQjG8zVqturhCcEG24ZX6Z.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9bTnbb6y9sR6k0w45l11wL7203K.jpg',
    imdbId: 'tt0298148',
    keywords: 'shrek 2, fiona, burro, gato con botas, muy muy lejano, dreamworks'
  },
  {
    id: 'fight-club-el-club-de-la-pelea',
    title: 'El Club de la Pelea',
    originalTitle: 'Fight Club',
    year: 1999,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 19m',
    genres: ['Drama'],
    overview: 'Un oficinista insomne y un fabricante de jabón desmotivado forman un club de lucha clandestino que evoluciona hacia algo mucho mayor.',
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Meat Loaf'],
    platform: 'Star+',
    htmlPage: 'fight-club.html',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    imdbId: 'tt0137523',
    keywords: 'fight club, el club de la pelea, brad pitt, tyler durden, david fincher'
  },
  {
    id: 'jurassic-park-1993',
    title: 'Parque Jurásico',
    originalTitle: 'Jurassic Park',
    year: 1993,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 07m',
    genres: ['Aventura', 'Ciencia Ficción', 'Suspenso'],
    overview: 'Un parque temático de dinosaurios clonados sufre una falla catastrófica de seguridad que libera a las criaturas más temidas del planeta.',
    director: 'Steven Spielberg',
    cast: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum', 'Richard Attenborough'],
    platform: 'Universal',
    htmlPage: 'jurassic-park.html',
    poster: 'https://image.tmdb.org/t/p/w500/b1xCNnyrPebIc7VGipVIYxER09A.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/jBIMAT83q78plGzP4aymCjqAuv1.jpg',
    imdbId: 'tt0107290',
    keywords: 'jurassic park, parque jurasico, dinosaurios, t-rex, spielberg'
  },
  {
    id: 'el-senor-de-los-anillos-el-retorno-del-rey',
    title: 'El Señor de los Anillos: El Retorno del Rey',
    originalTitle: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    rating: 9.0,
    quality: '4K UHD Extended',
    duration: '3h 21m',
    genres: ['Acción', 'Aventura', 'Drama', 'Fantasía'],
    overview: 'Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para llamar su atención de Frodo y Sam mientras se acercan al Monte del Destino con el Anillo Único.',
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen', 'Orlando Bloom'],
    platform: 'HBO Max',
    htmlPage: 'el-senor-de-los-anillos-retorno-del-rey.html',
    poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/lXhgCODAbBXL5buk9yEmTphonPt.jpg',
    imdbId: 'tt0167260',
    keywords: 'el senor de los anillos, the lord of the rings, frodo, aragorn, sauron, peter jackson'
  },
  {
    id: 'gladiator-2000',
    title: 'Gladiador (2000)',
    originalTitle: 'Gladiator',
    year: 2000,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 35m',
    genres: ['Acción', 'Aventura', 'Drama'],
    overview: 'Un antiguo general romano se propone vengarse del emperador corrupto que asesinó a su familia y lo envió a la esclavitud.',
    director: 'Ridley Scott',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen', 'Oliver Reed'],
    platform: 'Paramount+',
    htmlPage: 'gladiador-1.html',
    poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ArWkuWPbt55t5KaENcy8W70LO5v.jpg',
    imdbId: 'tt0172495',
    keywords: 'gladiador, maximo decimo meridio, russell crowe, joaquin phoenix, coliseo'
  },
  {
    id: 'batman-el-caballero-de-la-noche',
    title: 'Batman: El Caballero de la Noche',
    originalTitle: 'The Dark Knight',
    year: 2008,
    rating: 9.1,
    quality: '4K UHD',
    duration: '2h 32m',
    genres: ['Acción', 'Crimen', 'Drama'],
    overview: 'Cuando la amenaza conocida como el Joker causa estragos y caos en Gotham, Batman debe aceptar una de las mayores pruebas psicológicas y físicas para luchar contra la injusticia.',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    platform: 'HBO Max',
    htmlPage: 'the-dark-knight.html',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
    imdbId: 'tt0468569',
    keywords: 'the dark knight, el caballero de la noche, heath ledger, joker, christian bale, nolan'
  },
  {
    id: 'harry-potter-y-las-reliquias-de-la-muerte-parte-2',
    title: 'Harry Potter y las Reliquias de la Muerte 2',
    originalTitle: 'Harry Potter and the Deathly Hallows: Part 2',
    year: 2011,
    rating: 8.8,
    quality: '4K UHD',
    duration: '2h 10m',
    genres: ['Aventura', 'Familia', 'Fantasía'],
    overview: 'Harry, Ron y Hermione buscan los Horrocruxes restantes de Voldemort en su esfuerzo por destruir al Señor Oscuro mientras la batalla final hace estragos en Hogwarts.',
    director: 'David Yates',
    cast: ['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint', 'Ralph Fiennes'],
    platform: 'HBO Max',
    htmlPage: 'harry-potter-reliquias-de-la-muerte-2.html',
    poster: 'https://image.tmdb.org/t/p/w500/da22MRR6A66iz6Ueb04d5IebGtt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/n5A7br2035F20pvhngf5u49n94N.jpg',
    imdbId: 'tt1201607',
    keywords: 'harry potter, reliquias de la muerte, hogwarts, voldemort, daniel radcliffe'
  },
  {
    id: 'pulp-fiction-tiempos-violentos',
    title: 'Tiempos Violentos (Pulp Fiction)',
    originalTitle: 'Pulp Fiction',
    year: 1994,
    rating: 8.9,
    quality: '4K UHD',
    duration: '2h 34m',
    genres: ['Crimen', 'Drama'],
    overview: 'Las vidas de dos sicarios de la mafia, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.',
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    platform: 'Paramount+',
    htmlPage: 'pulp-fiction.html',
    poster: 'https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    imdbId: 'tt0110912',
    keywords: 'pulp fiction, tiempos violentos, quentin tarantino, john travolta, samuel l jackson'
  },
  {
    id: 'volver-al-futuro',
    title: 'Volver al Futuro',
    originalTitle: 'Back to the Future',
    year: 1985,
    rating: 8.8,
    quality: '4K UHD',
    duration: '1h 56m',
    genres: ['Aventura', 'Comedia', 'Ciencia Ficción'],
    overview: 'Marty McFly es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo inventado por su amigo el científico Doc Brown.',
    director: 'Robert Zemeckis',
    cast: ['Michael J. Fox', 'Christopher Lloyd', 'Lea Thompson', 'Crispin Glover'],
    platform: 'Universal',
    htmlPage: 'volver-al-futuro.html',
    poster: 'https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1tlA1FSE73nO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/58D4t08H5N1yH9d747v2oZ1N7Xf.jpg',
    imdbId: 'tt0088763',
    keywords: 'volver al futuro, back to the future, delorean, marty mcfly, doc brown'
  },
  {
    id: 'cyberpunk-edgerunners',
    title: 'Cyberpunk: Edgerunners',
    originalTitle: 'Cyberpunk: Edgerunners',
    year: 2022,
    rating: 8.9,
    quality: '4K UHD',
    duration: '1 Temporada (10 eps)',
    genres: ['Anime', 'Ciencia Ficción', 'Acción', 'Ciberpunk'],
    overview: 'En una distopía plagada de corrupción e implantes cibernéticos, un talentoso pero impulsivo chico de la calle se esfuerza por convertirse en un edgerunner.',
    director: 'Hiroyuki Imaishi',
    cast: ['KENN', 'Aoi Yuki', 'Hiroki Touchi', 'Michiko Kaiden'],
    platform: 'Netflix',
    htmlPage: 'cyberpunk-edgerunners.html',
    poster: 'https://image.tmdb.org/t/p/w500/7JkW8fV7N1i78n2328y8319x301.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7W6aLq2M0pA2QY4fN87Q8Y0k9pA.jpg',
    imdbId: 'tt12590266',
    keywords: 'cyberpunk edgerunners, david martinez, lucy, rebecca, night city, trigger'
  },
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    originalTitle: 'Breaking Bad',
    year: 2013,
    rating: 9.5,
    quality: '4K UHD',
    duration: '5 Temporadas (62 eps)',
    genres: ['Crimen', 'Drama', 'Suspenso'],
    overview: 'Un profesor de química de secundaria diagnosticado con cáncer de pulmón inoperable recurre a la fabricación y venta de metanfetamina para asegurar el futuro de su familia.',
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Giancarlo Esposito'],
    platform: 'Netflix',
    htmlPage: 'breaking-bad.html',
    poster: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    imdbId: 'tt0903747',
    keywords: 'breaking bad, walter white, heisenberg, jesse pinkman, gus fring, albuquerque'
  },
  {
    id: 'the-last-of-us',
    title: 'The Last of Us',
    originalTitle: 'The Last of Us',
    year: 2023,
    rating: 9.0,
    quality: '4K UHD',
    duration: '1 Temporada (9 eps)',
    genres: ['Drama', 'Aventura', 'Acción', 'Terror'],
    overview: 'Veinte años después de que la civilización moderna fuera destruida, Joel es contratado para sacar a Ellie, una niña de 14 años, de una opresiva zona de cuarentena.',
    director: 'Craig Mazin, Neil Druckmann',
    cast: ['Pedro Pascal', 'Bella Ramsey', 'Gabriel Luna', 'Anna Torv'],
    platform: 'HBO Max',
    htmlPage: 'the-last-of-us.html',
    poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrne.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    imdbId: 'tt3581920',
    keywords: 'the last of us, joel, ellie, pedro pascal, cordyceps, hbo max'
  },
  {
    id: 'arcane-league-of-legends',
    title: 'Arcane: League of Legends',
    originalTitle: 'Arcane',
    year: 2024,
    rating: 9.2,
    quality: '4K UHD',
    duration: '2 Temporadas (18 eps)',
    genres: ['Anime', 'Animación', 'Ciencia Ficción', 'Acción', 'Fantasía'],
    overview: 'En medio del conflicto entre las ciudades gemelas de Piltover y Zaun, dos hermanas luchan en lados opuestos de una guerra entre tecnologías mágicas.',
    director: 'Pascal Charrue, Arnaud Delord',
    cast: ['Hailee Steinfeld', 'Ella Purnell', 'Katie Leung', 'Kevin Alejandro'],
    platform: 'Netflix / Riot Games',
    htmlPage: 'arcane.html',
    poster: 'https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3975R6bWc.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg',
    imdbId: 'tt11126994',
    keywords: 'arcane, jinx, vi, piltover, zaun, league of legends, riot games'
  }
];

function generateHtmlContent(movie) {
  const isAvatar = movie.id === 'avatar-2-el-sentido-del-agua';
  const defaultEmbed = isAvatar 
    ? 'https://playmogo.com/e/ykm9tsifkch1' 
    : `https://playmogo.com/e/${movie.imdbId || 'tt1630029'}`;

  return `<!DOCTYPE html>
<html lang="es" class="dark h-full bg-[#0e0e11] text-zinc-100 antialiased selection:bg-yellow-400 selection:text-black">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${movie.title} (${movie.year}) en Español Latino 4K UHD | andyaxceldominguezccorau TV 🇵🇪</title>
  <meta name="description" content="Ver ${movie.title} en Español Latino Online y Descargar Gratis en 4K UHD y 1080p con multi-servidor en andyaxceldominguezccorau TV Perú.">
  <meta name="keywords" content="${movie.keywords}, ${movie.title}, andyaxceldominguezccorau, peliculas peru, streaming gratis">
  <meta name="author" content="Andy Axcel Dominguez Ccorau">
  <meta name="robots" content="index, follow">

  <meta property="og:title" content="${movie.title} (${movie.year}) 4K UHD | andyaxceldominguezccorau TV 🇵🇪">
  <meta property="og:description" content="${movie.overview}">
  <meta property="og:image" content="${movie.poster}">
  <meta property="og:type" content="video.movie">

  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .heading-brand { font-family: 'Cinzel', serif; }
    .server-btn.active {
      background-color: #facc15;
      color: #000;
      font-weight: 800;
      border-color: #facc15;
      box-shadow: 0 10px 25px -5px rgba(234, 179, 8, 0.3);
    }
  </style>

  <script>
    function getPosterFallback(title, genre, year) {
      const colors = [
        ['#09090b', '#1e1b4b', '#3b82f6'],
        ['#09090b', '#450a0a', '#ef4444'],
        ['#09090b', '#3f2c06', '#eab308'],
        ['#09090b', '#064e3b', '#10b981'],
        ['#09090b', '#3b0764', '#a855f7']
      ];
      const hash = (title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const c = colors[hash % colors.length];
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
        <circle cx="200" cy="220" r="80" fill="\${c[2]}" opacity="0.2"/>
        <g transform="translate(160, 180) scale(1.6)" fill="none" stroke="\${c[2]}" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3" fill="\${c[2]}" fill-opacity="0.8"/>
        </g>
        <rect x="20" y="20" width="120" height="28" rx="6" fill="#eab308" />
        <text x="80" y="38" fill="#000" font-size="12" font-family="sans-serif" font-weight="900" text-anchor="middle">🇵🇪 PERÚ 4K</text>
        <text x="200" y="380" fill="#ffffff" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle">\${cleanTitle.substring(0, 24)}</text>
        <text x="200" y="415" fill="#facc15" font-size="14" font-family="sans-serif" font-weight="600" text-anchor="middle">\${cleanGenre} • \${cleanYear}</text>
        <rect x="60" y="470" width="280" height="42" rx="10" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
        <text x="200" y="497" fill="#e4e4e7" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">andyaxceldominguezccorau TV</text>
      </svg>\`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
  </script>
</head>
<body class="min-h-full flex flex-col bg-[#0e0e11] text-zinc-100 relative">

  <!-- ATMOSPHERIC MOVIE BACKDROP BACKGROUND -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <img src="${movie.backdrop}" class="w-full h-full object-cover blur-3xl scale-115 opacity-40" alt="Fondo Película" onerror="this.src='${movie.poster}';">
    <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-[#0e0e11]/85 to-[#0e0e11]"></div>
  </div>

  <!-- HEADER -->
  <header class="h-20 border-b border-zinc-800/80 bg-[#121217]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <a href="index.html" class="flex items-center space-x-3 group">
        <div class="w-11 h-11 rounded-2xl bg-[#141418] border border-yellow-400/40 p-1 shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
          <img src="https://scontent.fjau4-1.fna.fbcdn.net/v/t39.30808-6/729979233_122253465908263951_4502764980248591946_n.png?stp=dst-png&cstp=mx1080x1920&ctp=s1080x1920&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JHmo84kqR9cQ7kNvwGrmakr&_nc_oc=AdpO9vI8vq9CXbPnABKPL7sTzZhXDvJ-HZRtnlY0XswYIVUYFAwLpffJ37TfvqA0DzU&_nc_zt=23&_nc_ht=scontent.fjau4-1.fna&_nc_gid=jnMRRD5Hy6trLmL9V1aWFw&_nc_ss=7b2a8&oh=00_AQL_JJmApUjn24VFsReoaIK1vn_iI0q2ILNfHYMp5xQW5A&oe=6A98E8BD" class="w-full h-full object-cover rounded-xl" alt="Andy TV Logo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23eab308\'><polygon points=\'5 3 19 12 5 21 5 3\'/></svg>'" />
        </div>
        <div>
          <span class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-yellow-400 transition-colors">
            andyaxceldominguezccorau <span class="text-yellow-400">TV</span>
          </span>
          <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Cine & Streaming Oficial Perú</p>
        </div>
      </a>
    </div>

    <div class="flex items-center space-x-3">
      <a href="index.html" class="px-4 py-2 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700/60 flex items-center space-x-2 transition-all">
        <i data-lucide="arrow-left" class="w-4 h-4 text-yellow-400"></i>
        <span>Volver al Catálogo</span>
      </a>
      <a href="https://www.tiktok.com/@andyaxceldcc" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-black text-[#ff0050] border border-zinc-700 hover:border-[#ff0050] transition-all shadow" title="TikTok Oficial">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
      </a>
      <a href="https://www.youtube.com/@andyaxceldcc" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-all shadow-md shadow-red-600/20" title="YouTube Oficial">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
  </header>

  <!-- MOVIE HERO & PLAYER SECTION -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8 relative z-10">
    
    <!-- Breadcrumb & Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
      <div class="space-y-1">
        <div class="flex items-center space-x-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
          <span>🇵🇪 Películas Perú</span>
          <span>•</span>
          <span>${movie.genres[0] || 'Estreno'}</span>
          <span>•</span>
          <span class="text-emerald-400">Audio Español Latino 4K</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">${movie.title} (${movie.year})</h1>
        <p class="text-xs sm:text-sm text-zinc-400 font-medium">Título original: <span class="italic text-zinc-300">${movie.originalTitle}</span></p>
      </div>

      <div class="flex items-center space-x-2.5 flex-wrap">
        <span class="px-3 py-1.5 rounded-full bg-yellow-400 text-black font-extrabold text-xs">
          ⭐ ${movie.rating.toFixed(1)} IMDB
        </span>
        <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-200 font-bold text-xs border border-zinc-700">
          ${movie.quality}
        </span>
        <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-200 font-bold text-xs border border-zinc-700">
          ${movie.duration}
        </span>
        <!-- Vistas Badge -->
        <span class="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/30 flex items-center space-x-1.5">
          <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-400"></i>
          <span id="page-views-count">-- vistas</span>
        </span>
        <!-- Likes Button -->
        <button id="page-like-btn" onclick="togglePageLike('${movie.id}')" class="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 font-bold text-xs border border-zinc-700 transition-all flex items-center space-x-1.5 cursor-pointer">
          <i data-lucide="heart" id="page-like-icon" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span id="page-likes-count">-- likes</span>
        </button>
      </div>
    </div>

    <!-- CINEMATIC VIDEO PLAYER -->
    <div class="rounded-3xl overflow-hidden bg-[#141418]/90 backdrop-blur-md border border-zinc-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      <!-- Player Header Bar -->
      <div class="px-4 py-3 bg-[#16161d]/95 border-b border-zinc-800 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span class="text-xs font-bold text-zinc-200">Reproductor Multi-Servidor 4K • <span id="active-server-name" class="text-yellow-400">Doodstream (Playmogo)</span></span>
        </div>
        <div class="flex items-center space-x-2 text-xs font-semibold text-zinc-400">
          <span>andyaxceldominguezccorau TV 🇵🇪</span>
        </div>
      </div>

      <!-- Video Screen Frame with Movie Backdrop Image -->
      <div class="relative aspect-video w-full bg-zinc-950 overflow-hidden">
        <!-- Movie Background Image Behind Player Frame -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img src="${movie.backdrop}" class="w-full h-full object-cover blur-md opacity-45 scale-105" alt="Movie Backdrop Frame" onerror="this.src='${movie.poster}';"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70"></div>
        </div>

        <iframe 
          id="main-video-frame" 
          src="${defaultEmbed}" 
          class="relative z-10 w-full h-full border-0" 
          referrerpolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
          allowfullscreen>
        </iframe>
      </div>

      <!-- Server Selector Controls -->
      <div class="p-4 sm:p-6 bg-[#121217] border-t border-zinc-800/80 space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-xs font-extrabold uppercase text-zinc-400 tracking-wider flex items-center space-x-2">
            <i data-lucide="server" class="w-4 h-4 text-yellow-400"></i>
            <span>Seleccionar Servidor de Reproducción:</span>
          </h3>
          <span class="text-[11px] text-zinc-400">Si un servidor tarda o muestra anuncios, cambia a otro de la lista.</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          <button onclick="changeServer('https://playmogo.com/e/${isAvatar ? 'ykm9tsifkch1' : movie.imdbId}', 'Doodstream (Playmogo)', this)" class="server-btn active px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            ⚡ Doodstream 1080p
          </button>
          <button onclick="changeServer('https://vidsrc.to/embed/movie/${movie.imdbId}', 'Servidor 4K VIP', this)" class="server-btn px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            🚀 4K UHD VIP
          </button>
          <button onclick="changeServer('https://streamwish.to/e/${movie.imdbId}', 'StreamWish Directo', this)" class="server-btn px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            🔥 StreamWish
          </button>
          <button onclick="changeServer('https://filemoon.sx/e/${movie.imdbId}', 'FileMoon Fast', this)" class="server-btn px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            🌙 FileMoon
          </button>
          <button onclick="changeServer('https://streamtape.com/e/${movie.imdbId}', 'Streamtape MP4', this)" class="server-btn px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            🎬 Streamtape
          </button>
          <button onclick="changeServer('https://vdohide.com/e/${movie.imdbId}', 'VdoHide Backup', this)" class="server-btn px-3 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800/90 text-xs font-bold transition-all text-center">
            🛡️ VdoHide
          </button>
        </div>
      </div>
    </div>

    <!-- MOVIE METADATA & CAST -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Poster Card -->
      <div class="flex flex-col items-center">
        <div class="w-full max-w-[280px] aspect-[2/3] rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl relative group bg-zinc-900">
          <img src="${movie.poster}" alt="${movie.title}" onerror="this.onerror=null; this.src=getPosterFallback('${movie.title}', '${movie.genres[0]}', '${movie.year}');" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black text-yellow-400 border border-yellow-400/40">
            ${movie.quality}
          </div>
        </div>
      </div>

      <!-- Description & Cast -->
      <div class="md:col-span-2 space-y-6">
        <div class="space-y-2">
          <h2 class="text-lg font-extrabold text-white flex items-center space-x-2">
            <i data-lucide="film" class="w-5 h-5 text-yellow-400"></i>
            <span>Sinopsis Oficial</span>
          </h2>
          <p class="text-zinc-300 text-sm leading-relaxed">${movie.overview}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div>
            <span class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Director:</span>
            <p class="text-sm font-semibold text-white mt-0.5">${movie.director}</p>
          </div>
          <div>
            <span class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Plataforma de Origen:</span>
            <p class="text-sm font-semibold text-white mt-0.5">${movie.platform}</p>
          </div>
          <div class="sm:col-span-2">
            <span class="text-xs font-bold text-zinc-400 uppercase tracking-wider">Reparto Principal:</span>
            <p class="text-sm font-semibold text-zinc-200 mt-0.5">${movie.cast.join(', ')}</p>
          </div>
        </div>

        <!-- Social Share Banner -->
        <div class="p-5 rounded-2xl bg-[#141418] border border-zinc-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 class="text-xs font-extrabold text-white">¿Te gustó ${movie.title}?</h4>
            <p class="text-[11px] text-zinc-400">Sigue a Andy Axcel Dominguez Ccorau en sus redes sociales oficiales:</p>
          </div>
          <div class="flex items-center space-x-2">
            <a href="https://www.tiktok.com/@andyaxceldcc" target="_blank" class="p-2 rounded-xl bg-zinc-800 hover:bg-[#ff0050] text-zinc-300 hover:text-white transition-colors" title="TikTok @andyaxceldcc">
              <i data-lucide="video" class="w-4 h-4"></i>
            </a>
            <a href="https://www.youtube.com/@andyaxceldcc" target="_blank" class="p-2 rounded-xl bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white transition-colors" title="YouTube @andyaxceldcc">
              <i data-lucide="youtube" class="w-4 h-4"></i>
            </a>
            <a href="https://www.facebook.com/andyaxceldominguezccorau" target="_blank" class="p-2 rounded-xl bg-zinc-800 hover:bg-blue-600 text-zinc-300 hover:text-white transition-colors" title="Facebook">
              <i data-lucide="facebook" class="w-4 h-4"></i>
            </a>
            <a href="https://www.instagram.com/andyaxceldcc" target="_blank" class="p-2 rounded-xl bg-zinc-800 hover:bg-pink-600 text-zinc-300 hover:text-white transition-colors" title="Instagram @andyaxceldcc">
              <i data-lucide="instagram" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="mt-12 border-t border-zinc-800 bg-[#0a0a0d] py-8 text-center text-xs text-zinc-400">
    <div class="max-w-7xl mx-auto px-4 space-y-3">
      <div class="flex items-center justify-center space-x-2">
        <span class="font-extrabold text-zinc-200">andyaxceldominguezccorau TV</span>
        <span>•</span>
        <span class="text-red-500 font-bold">🇵🇪 PERÚ</span>
      </div>
      <p class="text-[11px] text-zinc-400">Desarrollado y Gestionado por <strong>Andy Axcel Dominguez Ccorau</strong>. Todos los derechos reservados.</p>
    </div>
  </footer>

  <script>
    function changeServer(url, name, btn) {
      const frame = document.getElementById('main-video-frame');
      const label = document.getElementById('active-server-name');
      if (frame) frame.src = url;
      if (label) label.textContent = name;

      document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    }

    // Engagement Tracker: Vistas y Likes con LocalStorage
    const MOVIE_ID = '${movie.id}';
    const BASE_VIEWS = ${1200 + (moviesData.findIndex(x => x.id === movie.id) >= 0 ? (moviesData.length - moviesData.findIndex(x => x.id === movie.id)) * 380 : 2500) + (movie.id === 'avatar-2-el-sentido-del-agua' ? 8500 : 0)};
    const BASE_LIKES = Math.floor(BASE_VIEWS * 0.18);

    function initEngagement() {
      try {
        const stats = JSON.parse(localStorage.getItem('andy_tv_engagement_v1') || '{}');
        if (!stats[MOVIE_ID]) {
          stats[MOVIE_ID] = { views: BASE_VIEWS, likes: BASE_LIKES, userLiked: false };
        }
        // Increment views automatically upon loading the movie page
        stats[MOVIE_ID].views = (stats[MOVIE_ID].views || BASE_VIEWS) + 1;
        localStorage.setItem('andy_tv_engagement_v1', JSON.stringify(stats));

        renderEngagementUI(stats[MOVIE_ID]);
      } catch (e) {
        renderEngagementUI({ views: BASE_VIEWS + 1, likes: BASE_LIKES, userLiked: false });
      }
    }

    function renderEngagementUI(itemStat) {
      const viewsEl = document.getElementById('page-views-count');
      const likesEl = document.getElementById('page-likes-count');
      const likeBtn = document.getElementById('page-like-btn');
      const likeIcon = document.getElementById('page-like-icon');

      if (viewsEl) viewsEl.textContent = (itemStat.views || BASE_VIEWS).toLocaleString() + ' vistas';
      if (likesEl) likesEl.textContent = (itemStat.likes || BASE_LIKES).toLocaleString() + ' likes';

      if (likeBtn && likeIcon) {
        if (itemStat.userLiked) {
          likeBtn.className = 'px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/40 transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-rose-500/10';
          likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-rose-500 fill-rose-500');
        } else {
          likeBtn.className = 'px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-400 font-bold text-xs border border-zinc-700 transition-all flex items-center space-x-1.5 cursor-pointer';
          likeIcon.setAttribute('class', 'w-3.5 h-3.5 text-zinc-400');
        }
      }
    }

    function togglePageLike(movieId) {
      try {
        const stats = JSON.parse(localStorage.getItem('andy_tv_engagement_v1') || '{}');
        if (!stats[movieId]) {
          stats[movieId] = { views: BASE_VIEWS, likes: BASE_LIKES, userLiked: false };
        }

        if (stats[movieId].userLiked) {
          stats[movieId].likes = Math.max(0, (stats[movieId].likes || BASE_LIKES) - 1);
          stats[movieId].userLiked = false;
        } else {
          stats[movieId].likes = (stats[movieId].likes || BASE_LIKES) + 1;
          stats[movieId].userLiked = true;
        }

        localStorage.setItem('andy_tv_engagement_v1', JSON.stringify(stats));
        renderEngagementUI(stats[movieId]);
      } catch (e) {}
    }

    // Initialize Lucide Icons & Stats
    if (window.lucide) {
      window.lucide.createIcons();
    }
    initEngagement();
  </script>
</body>
</html>`;
}

console.log('Generating movie HTML files with TMDB artworks and rich icons...');
MOVIES_DATABASE.forEach(movie => {
  const filePath = path.join(__dirname, '..', movie.htmlPage);
  fs.writeFileSync(filePath, generateHtmlContent(movie), 'utf8');
  console.log(`Generated: ${movie.htmlPage} [ID: ${movie.id}]`);
});

// GENERATE SITEMAP.XML AUTOMATICALLY
function generateSitemap(movies) {
  const baseUrl = 'https://andyaxceldominguezccorautv.com';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;
  
  // Home Page
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Each Movie / Serie Page
  movies.forEach(m => {
    if (!m.htmlPage) return;
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/${m.htmlPage}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

const sitemapContent = generateSitemap(MOVIES_DATABASE);
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemapContent, 'utf8');
console.log('Generated sitemap.xml with all movies and index.html!');

// GENERATE ROBOTS.TXT
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://andyaxceldominguezccorautv.com/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'), robotsTxt, 'utf8');
console.log('Generated robots.txt linking to sitemap.xml!');

console.log(`Successfully generated ${MOVIES_DATABASE.length} movie pages with high-definition posters!`);
