import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { UserCardModule } from 'src/app/shared/components/user-card/user-card.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    PipesModule,
    TranslateModule,
    UserCardModule,
    NavbarModule,
  ],
  exports: [HomepageComponent],
})
export class HomepageModule {}
