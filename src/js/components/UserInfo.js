export class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileProfession = document.querySelector(data.profession);
  }

  getUserInfo() {
    const name = this._profileName.textContent;
    const profession = this._profileProfession.textContent;
    return {name, profession};
  }

  setUserInfo(obj) {
    this._profileName.textContent = obj.name;
    this._profileProfession.textContent = obj.profession;
  }
}