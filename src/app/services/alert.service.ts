import { Alert } from "../common/interfaces";
import { HttpService } from "./http.service";

export class AlertService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async getAlerts(): Promise<Alert[]> {
    return this.httpService.get<Alert[]>('/alerts');
  }

  async getAlert(id: number): Promise<Alert> {
    return this.httpService.get<Alert>(`/alerts/${id}`);
  }

  async createAlert(alert: Alert): Promise<Alert> {
    return this.httpService.post<Alert>('/alerts', alert);
  }

  async updateAlert(alert: Alert): Promise<Alert> {
    return this.httpService.put<Alert>(`/alerts/${alert.id}`, alert);
  }

  async deleteAlert(id: number): Promise<void> {
    return this.httpService.delete<void>(`/alerts/${id}`);
  }
}   