class StreamWhereApi {
    constructor() {
        this.tmdbBase = "https://api.themoviedb.org/3";
        this.tmdbKey = import.meta.env.VITE_TMDB_KEY;

        this.watchBase = "https://api.watchmode.com/v1";
        this.watchKey = import.meta.env.VITE_WATCHMODE_KEY;

        this.imageBase = "https://image.tmdb.org/t/p/w500";

        // Cache RAM
        this.cacheItems = new Map();
        this.cachePlatforms = new Map();

        // Cache géneros
        this.genreMap = {};
        this.genresLoaded = false;

        // Cache localStorage
        this.localKeyItems = "sw_items_cache";
        this.localKeyPlatforms = "sw_platforms_cache";

        this.localKeyPopularMovies = "sw_popular_movies";
        this.localKeyPopularSeries = "sw_popular_series";

        this._loadLocalCache();
    }

    // Cache local
    _loadLocalCache() {
        const items = JSON.parse(localStorage.getItem(this.localKeyItems) || "{}");
        const platforms = JSON.parse(localStorage.getItem(this.localKeyPlatforms) || "{}");

        Object.entries(items).forEach(([k, v]) => this.cacheItems.set(k, v));
        Object.entries(platforms).forEach(([k, v]) => this.cachePlatforms.set(k, v));
    }

    _saveLocalCache() {
        const itemsObj = Object.fromEntries(this.cacheItems);
        const platObj = Object.fromEntries(this.cachePlatforms);

        localStorage.setItem(this.localKeyItems, JSON.stringify(itemsObj));
        localStorage.setItem(this.localKeyPlatforms, JSON.stringify(platObj));
    }

    // Generos
    async _loadGenres() {
        if (this.genresLoaded) return; // Evitar llamadas repetidas

        const movieRes = await fetch(
            `${this.tmdbBase}/genre/movie/list?api_key=${this.tmdbKey}&language=es-MX`
        );
        const tvRes = await fetch(
            `${this.tmdbBase}/genre/tv/list?api_key=${this.tmdbKey}&language=es-MX`
        );

        const movieData = await movieRes.json();
        const tvData = await tvRes.json();

        [...movieData.genres, ...tvData.genres].forEach((g) => {
            this.genreMap[g.id] = g.name;
        });

        this.genresLoaded = true;
    }


    // Informacion de la pelicula si no esta en cache
    async _getFullTvData(id) {
        const res = await fetch(
            `${this.tmdbBase}/tv/${id}?api_key=${this.tmdbKey}&language=es-MX`
        );
        return res.json();
    }


    // Watchmode plataforma
    async _getPlatforms(tmdbId, type) {
        const key = `${type}-${tmdbId}`;

        // Si ya está en cache no llamamos a api
        if (this.cachePlatforms.has(key)) {
            return this.cachePlatforms.get(key);
        }

        // Si no está llama a la api 1 llamada 
        try {
            const res = await fetch(
                `${this.watchBase}/title/${type}-${tmdbId}/sources/?apiKey=${this.watchKey}`
            );
            const data = await res.json();

            const platforms = [...new Set(
                data.filter(p => p.type === "sub").map(p => p.name)
            )];

            const finalList = platforms.length > 0 ? platforms : ["No disponible"];

            this.cachePlatforms.set(key, finalList);
            this._saveLocalCache();

            return finalList;
        } catch {
            return ["Desconocido"];
        }
    }

    //  Se junta todo: tmdb + generos + watchmode + cache 
    async getItem(raw) {
        const key = `${raw.media_type}-${raw.id}`;

        // Si ya está cacheado  regresar
        if (this.cacheItems.has(key)) {
            return this.cacheItems.get(key);
        }

        await this._loadGenres();

        const platforms = await this._getPlatforms(raw.id, raw.media_type);

        const genreNames = (raw.genre_ids || []).map(
            id => this.genreMap[id] || "Desconocido"
        );

        let releaseYear = "";
        let endYear = "Presente";

        if (raw.media_type === "movie") {
            // Películas no necesitan llamada adicional
            releaseYear = (raw.release_date || "").slice(0, 4);
        } else {
            // Series
            // Si no vienen fechas entonces pedimos los detalles
            let first = raw.first_air_date;
            let last = raw.last_air_date;
            let status = raw.status; // casi nunca viene en raw

            if (!first || !status) {
                // Solo aquí llamamos al detalle
                const full = await this._getFullTvData(raw.id);
                first = full.first_air_date;
                last = full.last_air_date;
                status = full.status;
            }

            releaseYear = (first || "").slice(0, 4);
            if (status === "Ended") {
                endYear = (last || "").slice(0, 4);
            } else if (status === "Canceled") {
                endYear = (last || "").slice(0, 4) || "Cancelada";
            } else {
                endYear = "Presente";
            }
        }
        const item = {
            id: key,
            title: raw.title || raw.name,
            image: raw.poster_path
                ? `${this.imageBase}${raw.poster_path}`
                : "/no-image.jpg",
            genres: genreNames,
            platform: platforms.join(", "),
            type: raw.media_type === "movie" ? "movies" : "series",
            releaseYear,
            endYear,
            description: raw.overview || "Sin descripción disponible."
        };

        // Guardar en cache RAM + localStorage
        this.cacheItems.set(key, item);
        this._saveLocalCache();

        return item;
    }


    // Peliculas
    async getPopularMovies() {
        const saved = localStorage.getItem(this.localKeyPopularMovies);
        if (saved) return JSON.parse(saved);

        const res = await fetch(
            `${this.tmdbBase}/movie/popular?api_key=${this.tmdbKey}&language=es-MX`
        );
        const data = await res.json();

        // Usar Promise.all para hacer las llamadas en paralelo
        const fullData = await Promise.all(
            data.results.map(i => this.getItem({ ...i, media_type: "movie" }))
        );

        localStorage.setItem(this.localKeyPopularMovies, JSON.stringify(fullData));

        return fullData;
    }

    // Series
    async getPopularSeries() {
        const saved = localStorage.getItem(this.localKeyPopularSeries);
        if (saved) return JSON.parse(saved);

        const res = await fetch(
            `${this.tmdbBase}/tv/popular?api_key=${this.tmdbKey}&language=es-MX`
        );
        const data = await res.json();

        // Usar Promise.all para hacer las llamadas en paralelo
        const fullData = await Promise.all(
            data.results.map(i => this.getItem({ ...i, media_type: "tv" }))
        );

        localStorage.setItem(this.localKeyPopularSeries, JSON.stringify(fullData));

        return fullData;
    }


    // Buscar
    async search(query) {
        await this._loadGenres();

        const res = await fetch(
            `${this.tmdbBase}/search/multi?api_key=${this.tmdbKey}&query=${query}&language=es-MX`
        );
        const data = await res.json();

        const filtered = data.results.filter(
            i => i.media_type === "movie" || i.media_type === "tv"
        );

        return Promise.all(filtered.map(i => this.getItem(i)));
    }
}

export default new StreamWhereApi();
