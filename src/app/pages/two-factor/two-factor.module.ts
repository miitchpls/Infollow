import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TwoFactorComponent } from './two-factor.component';

@NgModule({
  declarations: [TwoFactorComponent],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [TwoFactorComponent],
})
export class TwoFactorModule {}
