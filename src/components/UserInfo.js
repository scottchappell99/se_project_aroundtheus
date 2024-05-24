export default class UserInfo {
  constructor({ name, subtitle }) {
    this._name = name;
    this._subtitle = subtitle;
  }

  getUserInfo() {
    this.presentUserInfo = {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    };
    return this.presentUserInfo;
  }

  setUserInfo(profileInfo) {
    this._name.textContent = profileInfo.name;
    this._subtitle.textContent = profileInfo.subtitle;
  }
}
