
const movies = [
    {
        id: 1,
        title: "Interestelar",
        type: "Filme",
        year: 2014,
        genre: "Ficção científica",
        rating: "8.7",
        duration: "2h 49min",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "Uma equipe de exploradores viaja além desta galáxia para descobrir se a humanidade tem um futuro entre as estrelas."
    },
    {
        id: 2,
        title: "Batman: O Cavaleiro das Trevas",
        type: "Filme",
        year: 2008,
        genre: "Ação",
        rating: "9.0",
        duration: "2h 32min",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "Batman enfrenta um criminoso imprevisível que ameaça mergulhar Gotham City no caos."
    },
    {
        id: 3,
        title: "Stranger Things",
        type: "Série",
        year: 2016,
        genre: "Ficção científica",
        rating: "8.6",
        duration: "Série",
        poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        description: "O desaparecimento de um garoto revela segredos sobrenaturais em uma pequena cidade."
    },
    {
        id: 4,
        title: "A Origem",
        type: "Filme",
        year: 2010,
        genre: "Ficção científica",
        rating: "8.8",
        duration: "2h 28min",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        description: "Um especialista em invadir sonhos recebe uma missão que pode mudar sua vida."
    },
    {
        id: 5,
        title: "Divertida Mente",
        type: "Filme",
        year: 2015,
        genre: "Animação",
        rating: "8.1",
        duration: "1h 35min",
        poster: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
        description: "As emoções de uma garota precisam aprender a trabalhar juntas durante uma grande mudança."
    },
    {
        id: 6,
        title: "Breaking Bad",
        type: "Série",
        year: 2008,
        genre: "Drama",
        rating: "9.5",
        duration: "Série",
        poster: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        description: "Um professor de química toma decisões extremas após receber uma notícia que transforma sua vida."
    },
    {
        id: 7,
        title: "Gladiador",
        type: "Filme",
        year: 2000,
        genre: "Ação",
        rating: "8.5",
        duration: "2h 35min",
        poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        description: "Um general romano luta para sobreviver e buscar justiça dentro da arena."
    },
    {
        id: 8,
        title: "The Last of Us",
        type: "Série",
        year: 2023,
        genre: "Drama",
        rating: "8.7",
        duration: "Série",
        poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        description: "Em um mundo devastado, duas pessoas atravessam territórios perigosos em busca de esperança."
    },
    {
        id: 9,
        title: "Homem-Aranha: Através do Aranhaverso",
        type: "Filme",
        year: 2023,
        genre: "Animação",
        rating: "8.6",
        duration: "2h 20min",
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        description: "Miles Morales encontra outras versões do herói em uma aventura por diferentes universos."
    },
    {
        id: 10,
        title: "Duna",
        type: "Filme",
        year: 2021,
        genre: "Ficção científica",
        rating: "8.0",
        duration: "2h 35min",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "Um jovem herdeiro chega a um planeta desértico que guarda um recurso essencial para o universo."
    }
];

const movieGrid = document.getElementById("movie-grid");
const favoriteGrid = document.getElementById("favorite-grid");
const searchInput = document.getElementById("search");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");
const favoriteEmpty = document.getElementById("favorite-empty");

const dialog = document.getElementById("details-dialog");
const closeDialog = document.getElementById("close-dialog");

let activeFilter = "Todos";
let searchTerm = "";
let favorites = loadFavorites();

function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem("streamflix-favorites"));
        return Array.isArray(saved) ? saved.filter(Number.isFinite) : [];
    } catch {
        return [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem("streamflix-favorites", JSON.stringify(favorites));
    } catch {
        console.warn("Não foi possível salvar os favoritos neste navegador.");
    }
}

function createCard(movie) {
    const isFavorite = favorites.includes(movie.id);

    return `
        <article class="movie-card">
            <div class="poster-wrap">
                <img
                    class="poster"
                    src="${movie.poster}"
                    alt="Pôster de ${movie.title}"
                    loading="lazy"
                >
                <span class="card-type">${movie.type}</span>

                <button
                    class="favorite-button ${isFavorite ? "selected" : ""}"
                    data-favorite="${movie.id}"
                    aria-label="${isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}: ${movie.title}"
                    aria-pressed="${isFavorite}"
                    title="${isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
                >${isFavorite ? "♥" : "♡"}</button>
            </div>

            <div class="card-info">
                <h3 title="${movie.title}">${movie.title}</h3>

                <div class="card-meta">
                    <span>${movie.year}</span>
                    <span class="rating">★ ${movie.rating}</span>
                </div>

                <button class="details-button" data-details="${movie.id}">
                    Ver detalhes
                </button>
            </div>
        </article>
    `;
}

function renderCatalog() {
    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title
            .toLocaleLowerCase("pt-BR")
            .includes(searchTerm.toLocaleLowerCase("pt-BR"));

        const matchesFilter =
            activeFilter === "Todos" ||
            movie.type === activeFilter ||
            movie.genre === activeFilter;

        return matchesSearch && matchesFilter;
    });

    movieGrid.innerHTML = filteredMovies.map(createCard).join("");
    resultCount.textContent = `${filteredMovies.length} títulos`;

    emptyMessage.hidden = filteredMovies.length > 0;
}

function renderFavorites() {
    const favoriteMovies = movies.filter(movie =>
        favorites.includes(movie.id)
    );

    favoriteGrid.innerHTML = favoriteMovies.map(createCard).join("");
    favoriteEmpty.hidden = favoriteMovies.length > 0;
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
    } else {
        favorites.push(id);
    }

    saveFavorites();
    renderCatalog();
    renderFavorites();
}

function openDetails(id) {
    const movie = movies.find(item => item.id === id);

    if (!movie) return;

    document.getElementById("detail-image").src = movie.poster;
    document.getElementById("detail-image").alt = `Pôster de ${movie.title}`;
    document.getElementById("detail-title").textContent = movie.title;
    document.getElementById("detail-type").textContent = movie.type.toUpperCase();
    document.getElementById("detail-meta").textContent =
        `${movie.year}  •  ${movie.genre}  •  ★ ${movie.rating}  •  ${movie.duration}`;
    document.getElementById("detail-description").textContent = movie.description;

    const trailerLink = document.getElementById("trailer-link");
    trailerLink.href =
        `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer oficial")}`;

    dialog.showModal();
}

document.addEventListener("click", event => {
    const favoriteButton = event.target.closest("[data-favorite]");
    const detailsButton = event.target.closest("[data-details]");
    const filterButton = event.target.closest("[data-filter]");

    if (favoriteButton) {
        toggleFavorite(Number(favoriteButton.dataset.favorite));
        return;
    }

    if (detailsButton) {
        openDetails(Number(detailsButton.dataset.details));
        return;
    }

    if (filterButton) {
        activeFilter = filterButton.dataset.filter;

        document.querySelectorAll(".filter").forEach(button => {
            const selected = button.dataset.filter === activeFilter;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        renderCatalog();
    }
});

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    renderCatalog();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", event => {
    if (event.target === dialog) {
        dialog.close();
    }
});

renderCatalog();
renderFavorites();
