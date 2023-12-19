import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';
import { Observable, catchError, from, of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { LoginModule } from './pages/login/login.module';
import { TwoFactorModule } from './pages/two-factor/two-factor.module';
import { LoadingPageModule } from './shared/components/loading-page/loading-page.module';
import { INTERCEPTOR } from './shared/interceptors/interceptor.service';

export class SourceTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`)).pipe(
      catchError(() => of({}))
    );
  }
}

export function translateLoaderFactory(): TranslateLoader {
  return new SourceTranslateLoader();
}

const pagesImports = [
  LoadingPageModule,
  LoginModule,
  TwoFactorModule,
  HomepageModule,
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CookieModule.withOptions(),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
      },
    }),
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
  ].concat(pagesImports),
  providers: [INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
