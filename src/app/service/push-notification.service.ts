// push-notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  //private serverUrl = "https://cashily.ibm-bank.mr";
  private serverUrl = "http://localhost:80080";

  constructor(private http: HttpClient) {}

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  }

  async subscribeToNotifications(phoneNumber: string) {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array('BDjE6Dj1K5WSb8D6EwL7Z6ekEIyOq-zgQqftsX2msPo_RzrZ0OqeAgdjz4KkcGBlxUrlHYprK2y4_LF9OcnnRqk')
    });

    // Envoyer l'abonnement au serveur avec le numéro de téléphone
    await this.http.post("https://cashily.ibm-bank.mr"+`/api/auth/notifications/subscribe?phoneNumber=${phoneNumber}`, subscription).toPromise();
  }

  urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
