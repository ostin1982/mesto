class UserInfo {
    constructor({name, about, avatar}) {        
        this._name = name;
        this._occupation = about;
        this._avatar = avatar;
        this._userInfo = {};
    }

    getUserInfo() {
        return {
            name: this._name.innerText,
            occupation: this._occupation.innerText,
            };
        };

    setUserInfo(item) {
        if (item.name) {
            this._name.innerText = item.name};
            if(item.about) {
            this._occupation.innerText = item.about};
            if(item.avatar) {
            this._avatar.src = item.avatar};  
        }
}


export default UserInfo;