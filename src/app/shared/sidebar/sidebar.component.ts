import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // this.sharedService.value.subscribe({
    //   next: (res) => {
    //     this.sideChanged = res;
    //   }
    // })
  }

  onLogout() {
    const data = ''
    this.authService.logout(data).subscribe({
      next: (res)=>{
        console.log(res);
        
      }    
    })
    // this.router.navigateByUrl('/auth/login');
  }
}
