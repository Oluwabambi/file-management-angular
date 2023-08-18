import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentUser: any;

  constructor(private tokenService: TokenService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(this.tokenService.getUserDetails());
  }

  onLogout() {
    const data = '';
    this.authService.logout(data).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
