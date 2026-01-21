import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { OnInit } from "@angular/core";

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login  implements OnInit {
  showSuccessMessage: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['registered'] === 'true') {
        this.showSuccessMessage = true;

        // Opcional: Ocultar el mensaje después de unos segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }
    });
  }
}
