import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingPageComponent } from './loading-page.component';

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [CommonModule, OverlayModule, PortalModule, MatProgressBarModule],
  exports: [LoadingPageComponent],
})
export class LoadingPageModule {}
