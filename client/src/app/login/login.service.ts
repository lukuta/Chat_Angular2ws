/**
 * Created by lkuta on 04.04.17.
 */
export class LoginService{
  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  loginValidation(username) {
    return !(username == '' || username.length < 3);
  }
}
