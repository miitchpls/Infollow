import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingPageService } from 'src/app/shared/components/loading-page/loading-page.service';
import { JwtToken } from 'src/app/shared/models/jwt-token.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('ease-in-out', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s'),
      ]),
      transition('* => void', [
        animate('0.5s', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class TwoFactorComponent implements AfterViewInit {
  public form: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    verificationCode: new FormArray(
      [
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required]),
      ],
      [Validators.required]
    ),
    twoFactorIdentifier: new FormControl('', [Validators.required]),
    verificationMethod: new FormControl('', [Validators.required]),
  });
  public inputs: NodeListOf<HTMLInputElement>;
  public obfuscatedPhoneNumber: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private loadingPageService: LoadingPageService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.setupOtpForm();
    this.obfuscatedPhoneNumber =
      this.router.getCurrentNavigation()?.extras?.state?.[
        'obfuscatedPhoneNumber'
      ];
  }

  ngAfterViewInit(): void {
    this.inputs = document.querySelectorAll('#otp > *[id]');
  }

  private setupOtpForm(): void {
    const expectedStates = [
      'username',
      'twoFactorIdentifier',
      'verificationMethod',
    ];

    for (let item of expectedStates) {
      if (this.router.getCurrentNavigation()?.extras?.state?.[item]) {
        this.form
          .get(item)
          ?.patchValue(
            this.router.getCurrentNavigation()?.extras?.state?.[item]
          );
      } else {
        console.error(this.translate.instant('something_wrong'));
        this.router.navigate(['']);
      }
    }
  }

  public ensureInput(event: KeyboardEvent, i: number): void {
    event.preventDefault();

    if (event.key === 'Backspace') {
      this.inputs[i].value = '';
      this.otpForm.get(i.toString())?.setValue('');
      if (i !== 0) this.inputs[i - 1].focus();
    } else {
      // Check pressed key is a number
      if (/^[0-9]$/i.test(event.key)) {
        this.inputs[i].value = event.key;
        this.otpForm.get(i.toString())?.setValue(event.key);
        if (i !== this.inputs.length - 1) {
          this.inputs[i + 1].focus();
        } else {
          this.login();
        }
      }
    }
  }

  public login(): void {
    this.loadingPageService.startLoading();

    this.authService
      .twoFactor({
        username: this.form.value.username,
        verificationCode: this.form.value.verificationCode.join(''),
        twoFactorIdentifier: this.form.value.twoFactorIdentifier,
        verificationMethod: this.form.value.verificationMethod,
      })
      .subscribe({
        next: (token: JwtToken) => {
          this.authService.setToken(token);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.toastr.error(this.translate.instant('something_wrong'));
        },
      })
      .add(() => {
        this.loadingPageService.stopLoading();
      });
  }

  get otpForm(): FormArray {
    return this.form.get('verificationCode') as FormArray;
  }
}
