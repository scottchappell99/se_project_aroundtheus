export default class UserInfo {
  constructor({ name, occupation }) {
    this._name = name;
    this._occupation = occupation;
  }

  getUserInfo() {
    this.presentUserInfo = {
      name: this._name.textContent,
      occupation: this._occupation.textContent,
    };
    return this.presentUserInfo;
  }

  setUserInfo(profileInfo) {
    this._name.textContent = profileInfo.name;
    this._occupation.textContent = profileInfo.occupation;
  }
}
