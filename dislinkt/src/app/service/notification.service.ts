import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private storageValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  currentNotificationNumber = this.storageValue.asObservable();

  constructor(private http: HttpClient) { }

  private notificationUrl = "/notifications"

  getNotifications(id: string) {
    return this.http.get(`${config.baseUrl}${this.notificationUrl}/${id}`)
  }

  changeNotificationsStatus(id: string) {
    return this.http.get(`${config.baseUrl}${this.notificationUrl}/changeStatus/${id}`)
  }

  changeValue(selected: number) {
    this.storageValue.next(selected)
  }

  addValue() {
    const currValue = this.storageValue.value
    this.storageValue.next(currValue+1)
  }
}
