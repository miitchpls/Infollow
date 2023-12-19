import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingPageService } from 'src/app/shared/components/loading-page/loading-page.service';
import { JwtToken } from 'src/app/shared/models/jwt-token.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  public form: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private loadingPage: LoadingPageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  public login(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loadingPage.startLoading();
    this.form.disable();
    this.authService
      .login(this.form.value)
      .subscribe({
        next: (token: JwtToken) => {
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          switch (err?.error?.id) {
            case 'not_whitelisted':
              this.toastr.error(this.translate.instant('not_whitelisted'));
              break;

            case 'two_factor_required':
              this.router.navigate(['two-factor'], {
                relativeTo: this.route,
                state: Object.assign(
                  {
                    username: this.form.value.username,
                  },
                  err.error
                ),
              });
              break;
            case 'unprocessable_entity':
            default:
              this.toastr.error(this.translate.instant('something_wrong'));
          }
        },
      })
      .add(() => {
        this.loadingPage.stopLoading();
        this.form.enable();
      });
  }

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get isUsernameInvalid(): boolean | undefined {
    return (
      this.username?.invalid && (this.username?.dirty || this.username?.touched)
    );
  }

  get isPasswordInvalid(): boolean | undefined {
    return (
      this.password?.invalid && (this.password?.dirty || this.password?.touched)
    );
  }
}
