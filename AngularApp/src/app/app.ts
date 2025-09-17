import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('AngularApp');

  globalCounter = 0;
  userCounter = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCounters();
  }

  loadCounters(): void {
    this.apiService.getGlobal().subscribe((val: number) => this.globalCounter = val);
    this.apiService.getUser().subscribe((val: number) => this.userCounter = val);
  }

  incrementGlobal(): void {
    this.apiService.incrementGlobal().subscribe((val: number) => this.globalCounter = val);
  }

  incrementUser(): void {
    this.apiService.incrementUser().subscribe((val: number) => this.userCounter = val);
  }

}
