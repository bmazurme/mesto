export class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileProfession = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const profession = this._profileProfession.textContent;
    return {name, profession};
  }

  setUserInfo(obj) {
    this._profileName.textContent = obj.name;
    this._profileProfession.textContent = obj.about;
  }

  setUserAvatar(obj) {
    this._avatar.src = obj.avatar;
  }
}