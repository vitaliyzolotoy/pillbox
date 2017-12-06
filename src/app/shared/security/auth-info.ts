export class AuthInfo {
  constructor(public $uid: string) {}

  isLoggenIn() {
    return !!this.$uid;
  }

  getUserUID() {
    return this.$uid;
  }
}
