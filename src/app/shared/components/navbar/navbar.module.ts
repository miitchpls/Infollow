import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarSkeletonComponent } from './navbar-skeleton/navbar-skeleton.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent, NavbarSkeletonComponent],
  imports: [CommonModule, MatIconModule],
  exports: [NavbarComponent, NavbarSkeletonComponent],
})
export class NavbarModule {}
