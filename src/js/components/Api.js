export class Api {
  constructor(options) {
    this._options = options;
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
        headers: this._options.headers
      })
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
        headers: this._options.headers
      })
  }

  patchAvatar({avatar}) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
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
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: this._options.headers,
    })
  }

  deleteLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',  
      headers: this._options.headers,
    })
  }

  putLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',  
      headers: this._options.headers,
    })
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
  }
}