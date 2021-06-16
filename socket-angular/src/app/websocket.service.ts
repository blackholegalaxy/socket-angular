import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  public socket: any;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token: Math.random().toString(),
      }
    });

    // Ecoute sur le channel "ping"
    this.socket.on('ping', (data: any) => {
      console.log(data);
    });

    // Ecoute sur le channel "ping"
    this.socket.on('marco', (data: any) => {
      console.log(data);
    });
  }

  public sendMarco(): void {
    this.socket.emit('marco', 'Marco!');
  }

  public sendMessage(message: string): void {
    // Throw and forget
    this.socket.emit('chat', message);
  }
}
