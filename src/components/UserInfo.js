export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    this.presentUserInfo = {
      name: this._name,
      about: this._about,
    };
    return this.presentUserInfo;
  }

  setUserInfo(profileInfo) {
    profileInfo.name.textContent = this._name;
    profileInfo.about.textContent = this._about;
    profileInfo.avatar.src = this._avatar;
    profileInfo.avatar.alt = `${this._name}, ${this._about}`;
    return profileInfo;
  }

  changeUserInfo(newInfo) {
    this._name = newInfo.name;
    this._about = newInfo.about;
  }

  changeAvatar(newImage) {
    this._avatar = newImage;
  }
}
