import { Component } from '@angular/core';
import { PICTURELIST } from './pictureList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'slider';
  pictureList = PICTURELIST;
}
