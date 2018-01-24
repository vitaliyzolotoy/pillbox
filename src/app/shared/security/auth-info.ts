export class AuthInfo {
  constructor(public $uid: string,
              public email: string) {}

  isLoggenIn() {
    return !!this.$uid;
  }

  getUserUID() {
    return this.$uid;
  }
}
