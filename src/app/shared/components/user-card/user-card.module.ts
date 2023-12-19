import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../../pipes/pipes.module';
import { UserCardSkeletonComponent } from './user-card-skeleton/user-card-skeleton.component';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent, UserCardSkeletonComponent],
  imports: [CommonModule, PipesModule, MatIconModule],
  exports: [UserCardComponent, UserCardSkeletonComponent],
})
export class UserCardModule {}
