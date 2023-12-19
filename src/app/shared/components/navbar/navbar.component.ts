import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingPageService } from '../loading-page/loading-page.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() username: string;

  constructor(
    private authService: AuthService,
    private loadingPageService: LoadingPageService,
    private router: Router
  ) {}

  public logout(): void {
    this.loadingPageService.startLoading();
    this.authService
      .logout()
      .subscribe({
        next: () => {
          this.authService.deleteToken();
          this.router.navigate(['/login']);
        },
      })
      .add(() => {
        this.loadingPageService.stopLoading();
      });
  }
}
