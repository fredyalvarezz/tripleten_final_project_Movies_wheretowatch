class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Obtener token del localStorage
  _getToken() {
    return localStorage.getItem("jwt");
  }

  
  _handleResponse(res) {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json();
  }


  _getHeaders() {
  const token = this._getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}


  // Obtener usuario actual
  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  // Registrar usuario
  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    }).then(this._handleResponse);
  }

  // Login
  login({ email, password }) {
    return fetch(`${this._baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    }).then(this._handleResponse);
  }

  // Actualizar datos de usuario
  updateUser({ name, email, password, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, email, password, avatar })
    }).then(this._handleResponse);
  }

  // Obtener watchlist
  getWatchlist() {
    return fetch(`${this._baseUrl}/watchlist`, {
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

updateWatchlistItem(id, status) {
  return fetch(`${this._baseUrl}/watchlist/${id}`, {
    method: "PATCH",
    headers: this._getHeaders(), 
    body: JSON.stringify({ status })
  })
  .then(this._handleResponse);
}


  // Eliminar item de watchlist
  deleteFromWatchlist(id) {
  return fetch(`${this._baseUrl}/watchlist/${id}`, {
    method: "DELETE",
    headers: this._getHeaders(),
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          return Promise.reject(err);
        });
      }
      return res.json();
    })
    .catch(err => {
      throw err;
    });
}



  // Añadir item a watchlist
  addToWatchlist(item) {
  return fetch(`${this._baseUrl}/watchlist`, {
    method: "POST",
    headers: this._getHeaders(),
    body: JSON.stringify(item),
  }).then(this._handleResponse);
}

}

export default new MainApi({
  //baseUrl: "https://streamwhere.mooo.com/api",
  baseUrl: "http://localhost:3000/api",
});
