import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PwnedPasswordCheckerService } from '../../services/pwned-password-checker.service';

@Component({
  selector: 'app-pwned-password-checker',
  imports: [CommonModule, FormsModule],
  templateUrl: './pwned-password-checker.component.html',
  styleUrl: './pwned-password-checker.component.scss',
})
export class PwnedPasswordCheckerComponent {
  password: string = '';
  passwordStatus: boolean | null | 'error' = null;

  constructor(private passwordCheckerService: PwnedPasswordCheckerService) {}

  checkPassword() {
    if (!this.password) return;

    this.passwordCheckerService
      .checkPassword(this.password)
      .subscribe((result) => {
        this.passwordStatus = result;
      });
  }

  onPasswordInput() {
    this.passwordStatus = null;
  }
}
