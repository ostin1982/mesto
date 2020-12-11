class Api {
    constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    }

    _fetchButCatch(url, init) {
        return fetch(url, init)
        .then((response) => {
            if (response.ok) {
                return response.json()
                }
            return Promise.reject(`Возникла ошибка: ${response.status}`)
        })
    }

    
    //Получить карточки с сервера
    getInitialCards() {
        return this._fetchButCatch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
    }

    //Блок работы с карточками
    //Добавление карточки
    newCard(card) {
        return this._fetchButCatch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
                id: card._id,
                })
            });
    }

    //Удаление карточки
    deleteCard(card) {
        return this._fetchButCatch(`${this._baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify()
        });
    }

    //Лайк картинке
    likeCard(card) {
        return this._fetchButCatch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify()
        });
    }

    //Удаление лайк картинке
    deleteLikeCard(card) {
        return this._fetchButCatch(`${this._baseUrl}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify()
        });
    } 

    //Блок работы с профилем
    //Получить данные пользователя
    userInfoAbout() {
        return this._fetchButCatch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
    }

    //Редактировать данные пользователя
    newInfo(userData) {
        return this._fetchButCatch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }); 
    }

    //Редактировать аватар пользователя
    newUserAvatar(imgSrc){
        return this._fetchButCatch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: imgSrc.avatar
            })
        });
    }
}

export default Api;
