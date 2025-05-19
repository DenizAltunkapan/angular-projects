import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PasswordExplanationComponent } from './components/password-explanation/password-explanation.component';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';
import { PwnedPasswordCheckerComponent } from './components/pwned-password-checker/pwned-password-checker.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    PasswordExplanationComponent,
    PasswordGeneratorComponent,
    PwnedPasswordCheckerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
