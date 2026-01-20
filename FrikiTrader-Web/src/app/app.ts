import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from "@angular/router";
import { Navbar } from './shared/components/navbar/navbar';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { signal } from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(public router: Router) {};
  protected readonly title = signal('FrikiTrader-Web');
}
