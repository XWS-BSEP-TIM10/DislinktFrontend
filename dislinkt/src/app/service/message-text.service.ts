import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MessageTextService {
  private storageValue: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(new Array);

  currentValue = this.storageValue.asObservable();

  
  constructor() { }

  changeValue(selected: any[]) {
    this.storageValue.next(selected)
  }

  addValue(selected : any){
    this.storageValue.next(this.storageValue.getValue().concat([selected]));
  }
}
