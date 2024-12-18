import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications: string[] = [];
  socket : WebSocket = new WebSocket('ws://localhost:8080');
  message : string = "hello"

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  constructor(@Inject (PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)) {
      // const this.socket : WebSocket = new WebSocket('ws://localhost:8080');
      this.socket.onmessage = (event) => {
        this.message = JSON.parse(event.data).message
        this.showAlert()
        console.log('event ' , JSON.parse(event.data).message)
      }
    }
    
    // console.log('message ' , message)
  }

  showNotification(message: string) {
    console.log('notification ' , message)
    alert(message); // Replace with your preferred notification method
  }

  sendNotification(message: string): void {
    // const 
    // console.log('this.socket.readyState' , this.socket.readyState)
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message + new Date()));
      console.log(`Sent message: ${message}`);
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }}
    showAlert() {
      window.alert('new Booking Arrived');
    }
}
