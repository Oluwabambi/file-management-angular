import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/_Classes/Globals';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  title: string = ''
  isMenuOpen: boolean = false;
  // @Output() sideEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private userService: UsersService, private authService: AuthService, private globals: Globals, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getTitle()
    this.getCurrentUser();
  }

  getTitle() {
    const path = this.route.routeConfig?.path;
    if (path === 'manage-users') {
      this.title = 'Manage Users';
    } else if (path === 'feedback-upload') {
      this.title = 'Feedback Upload';
    }
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(this.tokenService.getUserDetails())
    // this.userService.loggedInUser().subscribe({
    //   next: (res) => {
    //     this.currentUser = res;
    //   },
    //   error: (err) => {      
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
  }

  // changeSide() {
  //   this.sideChange = !this.sideChange
  //   this.sideEvent.emit(this.sideChange)
  //   this.sharedService.setValue(this.sideChange)
  // }

}
