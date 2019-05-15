export class AuthInfo {
  constructor(public $uid: string,
              public email: string,
              public verify: boolean) {}

  isLoggenIn() {
    return !!this.$uid;
  }

  getUserUID() {
    return this.$uid;
  }

  isVerify() {
    return !this.verify;
  }
}
