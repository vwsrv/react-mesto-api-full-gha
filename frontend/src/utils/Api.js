class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } throw new Error(`Ошибка соединения ${res.status}`);
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  }

  setUserProfile({ userData }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      })
    })
      .then((res) => this._checkServerResponse(res));
  }

  setUserProfileAvatar({ userData }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
      .then((res) => this._checkServerResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then((res) => this._checkServerResponse(res));
  }

  setUserCard({ cardData }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify(
        {
          name: cardData.name,
          link: cardData.link
        })
    })
      .then((res) => this._checkServerResponse(res));
  }

  deleteUserCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then((res) => this._checkServerResponse(res));
  }

  changeLikeStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._checkServerResponse(res));
  }
}
const token = localStorage.getItem('userId')
export const api = new Api({
  baseUrl: 'https://api.vwssrv.nomoredomainsrocks.ru',
  headers: { 
    authorization: token,
    'Content-Type': 'application/json',
  },
  credentials: 'include'
})