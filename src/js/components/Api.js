export class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
        headers: this._options.headers
      })
      .then(res => this._checkResponse(res));//(res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
        headers: this._options.headers
      })
      .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  patchAvatar({avatar}) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  patchUser({name, about}) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: this._options.headers,
    })
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  changeLike(cardId, value) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: value ? 'PUT' : 'DELETE',  
      headers: this._options.headers,
    })
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  postCard({name, link}) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',  
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
}