import { Component } from '@angular/core';
import { RpsComponent } from './rps/rps.component';

@Component({
  selector: 'app-root',
  imports: [RpsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
