import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  navClick: boolean = false;

  showNav() {
    this.navClick = !this.navClick;
  }

  scroll(el: HTMLElement) {
  
    if(this.navClick){
      this.navClick = false;
    }
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
