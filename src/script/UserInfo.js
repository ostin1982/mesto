class UserInfo {
    constructor({name, occupation}) {        
        this._name = document.querySelector(name);
        this._occupation = document.querySelector(occupation);
        this._userInfo = {};
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            occupation: this._occupation.textContent,
            };
        };

    setUserInfo(userInfo) {
        this._userInfo = userInfo;
        }

    renderUserInfo() {
        this._name.textContent = this._userInfo.name;
        this._occupation.textContent = this._userInfo.occupation;
        }
}

export default UserInfo;