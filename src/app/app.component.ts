import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.setPreferredTheme();
  }

  private setPreferredTheme(): void {
    if (this.getDarkThemePreference().matches) {
      this.getHtmlElement().classList.add('theme-dark');
    }

    this.getDarkThemePreference().addEventListener('change', (event) => {
      this.getHtmlElement().classList[event.matches ? 'add' : 'remove'](
        'theme-dark'
      );
    });
  }

  private getDarkThemePreference(): MediaQueryList {
    return window?.matchMedia('(prefers-color-scheme: dark)');
  }

  private getHtmlElement(): HTMLHtmlElement {
    return document.getElementsByTagName('html')[0];
  }
}
