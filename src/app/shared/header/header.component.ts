import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = ''
  // sideChange: boolean = false;
  // @Output() sideEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTitle()
  }

  getTitle() {
    const path = this.route.routeConfig?.path;
    if (path === 'manage-users') {
      this.title = 'Manage Users';
    } else if (path === 'feedback-upload') {
      this.title = 'Feedback Upload';
    }
  }

  // changeSide() {
  //   this.sideChange = !this.sideChange
  //   this.sideEvent.emit(this.sideChange)
  //   this.sharedService.setValue(this.sideChange)
  // }

}
