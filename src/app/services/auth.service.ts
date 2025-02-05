import { HttpService } from "./http.service";
import { Auth, AuthResponse, User } from "../common/interfaces";

export class AuthService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async signin(user: Auth): Promise<AuthResponse> {
    return this.httpService.post<AuthResponse>('/login', user, { skipAuth: true });
  }

  async signup(user: Auth): Promise<AuthResponse> {
    return this.httpService.post<AuthResponse>('/signup', user, { skipAuth: true });
  }

  async loadProfile(): Promise<User> {
    return this.httpService.get<User>('/profile');
  }
}   
