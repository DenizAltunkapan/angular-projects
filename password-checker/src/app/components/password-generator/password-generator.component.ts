import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { EntropyService } from '../../services/entropy.service';

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent {
  length: number = 12;
  includeUppercase: boolean = true;
  includeNumbers: boolean = true;
  includeSpecialChars: boolean = true;
  password: string = '';
  passwordEntropy: number = 0;
  passwordStrength: string = 'Very Weak';
  passwordStrengthColor: string = 'red';

  constructor(
    public passwordGeneratorService: PasswordGeneratorService,
    public entropyService: EntropyService,
  ) {}

  generatePassword() {
    const { result } = this.passwordGeneratorService.generatePassword(
      this.length,
      this.includeUppercase,
      this.includeNumbers,
      this.includeSpecialChars,
    );

    this.password = result;
    this.passwordEntropy = this.entropyService.calculatePasswordEntropy(
      this.password,
    );
    this.updatePasswordStrength();
  }

  updatePasswordStrength() {
    if (this.passwordEntropy < 36) {
      this.passwordStrength = 'Very Weak';
      this.passwordStrengthColor = 'red';
    } else if (this.passwordEntropy < 60) {
      this.passwordStrength = 'Weak';
      this.passwordStrengthColor = 'orange';
    } else if (this.passwordEntropy < 90) {
      this.passwordStrength = 'Moderate';
      this.passwordStrengthColor = 'yellow';
    } else if (this.passwordEntropy < 120) {
      this.passwordStrength = 'Strong';
      this.passwordStrengthColor = 'lightgreen';
    } else {
      this.passwordStrength = 'Very Strong';
      this.passwordStrengthColor = 'green';
    }
  }

  onPasswordChange(newPassword: string) {
    if (!this.password) {
      this.passwordEntropy = 0;
      this.passwordStrength = 'Very Weak';
      this.passwordStrengthColor = 'red';
      return;
    }
    this.passwordEntropy =
      this.entropyService.calculatePasswordEntropy(newPassword);
    this.updatePasswordStrength();
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.password)
      .then(() => {
        alert('Password copied to clipboard');
      })
      .catch((err) => {
        alert('Failed to copy password: ' + err);
      });
  }

  calculateStrengthWidth(entropy: number): number {
    const maxEntropy = 120;
    const normalizedEntropy = Math.min(entropy, maxEntropy);
    return (normalizedEntropy / maxEntropy) * 100;
  }
}
