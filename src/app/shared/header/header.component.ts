import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  title: string = ''
  // sideChange: boolean = false;
  // @Output() sideEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

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
    this.userService.loggedInUser().subscribe({
      next: (res) => {
        console.log(res);
        this.currentUser = res;
      },
      error: (err) => {
        console.log(err.error);        
      }
    })
  }

  // changeSide() {
  //   this.sideChange = !this.sideChange
  //   this.sideEvent.emit(this.sideChange)
  //   this.sharedService.setValue(this.sideChange)
  // }

}
