import { Component } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: any;
  windSpeed: Number;
  windDirection: Number;
  private client: any;
  mqttbroker = 'localhost';

  ngOnInit(): void {
    this.client = new Paho.MQTT.Client(this.mqttbroker, Number(9001), '283ee1c1-c8be-41f8-8d8e-940f7172b619');
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
  }

  onConnect() {
    this.client.subscribe('exemplo/teste');
  }

  onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onMessageArrived(message: any) {
    this.title = message.payloadString
  }
}
