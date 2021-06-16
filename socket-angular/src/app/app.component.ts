import { Component, OnInit } from '@angular/core';

import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'socketio-angular';
  public message: string = '';
  public chatMessages: string[] = [];

  constructor(private socketService: WebsocketService) {}

  public ngOnInit(): void {
    this.socketService.setupSocketConnection();

    // Ecoute sur le channel "chat-server"
    this.socketService.socket.on('chat-server', (data: string) => {
      console.log('chat-server', data);
      this.chatMessages.push(data);
    });
  }

  public sendMarco() {
    this.socketService.sendMarco();
  }

  public sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
