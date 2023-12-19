import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() picture: string;
  @Input() username: string;
  @Input() fullname: string;

  constructor() {}

  public open(username: string): void {
    if (
      navigator.userAgent.indexOf('Android') > 0 ||
      navigator.userAgent.indexOf('iPhone') > 0
    ) {
      window.open(`instagram://user?username=${username}`);
    } else {
      window.open(`https://www.instagram.com/${username}/`, '_blank');
    }
  }
}
