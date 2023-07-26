import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sideSubject = new BehaviorSubject<boolean>(false)
  public value = this.sideSubject.asObservable()

  constructor() { }

  setValue (val:boolean) {
    this.sideSubject.next(val)
  }
}
