export class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileProfession = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const about = this._profileProfession.textContent;
    return {name, about};
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}