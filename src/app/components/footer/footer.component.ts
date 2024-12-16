import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  activeSegment: string = 'home';

  constructor(private router: Router, protected userService: UserService) {
  }

  onSegmentChanged(event: any) {
    this.activeSegment = event.detail.value;
    this.router.navigate([`/${this.activeSegment}`]);
  }
}
