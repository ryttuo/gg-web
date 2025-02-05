import { HttpService } from "./http.service";
import { Auth } from "../common/interfaces";

export class AuthService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async signin(user: Auth) {
    return this.httpService.post('/login', user);
  }

  async signup(user: Auth) {
    return this.httpService.post('/signup', user);
  }
}   