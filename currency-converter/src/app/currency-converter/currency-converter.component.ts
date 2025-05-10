import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterService } from '../services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  amount: number = 0;
  sourceCurrency: string = 'EUR';
  targetCurrency: string = 'USD';
  result: number = 0;
  conversionRate: number | null = null;
  currencies: string[] = [
    'USD', // United States Dollar
    'EUR', // Euro
    'GBP', // British Pound Sterling
    'INR', // Indian Rupee
    'JPY', // Japanese Yen
    'CHF', // Swiss Franc
    'CNY', // Chinese Yuan
    'AUD', // Australian Dollar
    'CAD', // Canadian Dollar
    'TRY', // Turkish Lira
  ];

  currencyFlags: { [key: string]: string } = {
    USD: '🇺🇸', // United States Dollar
    EUR: '🇪🇺', // Euro
    GBP: '🇬🇧', // British Pound Sterling
    INR: '🇮🇳', // Indian Rupee
    JPY: '🇯🇵', // Japanese Yen
    CHF: '🇨🇭', // Swiss Franc
    CNY: '🇨🇳', // Chinese Yuan
    AUD: '🇦🇺', // Australian Dollar
    CAD: '🇨🇦', // Canadian Dollar
    TRY: '🇹🇷', // Turkish Lira
  };

  constructor(private currencyConverterService: CurrencyConverterService) {}

  updateConversionRate() {
    this.conversionRate = this.currencyConverterService.getConversionRate(
      this.sourceCurrency,
      this.targetCurrency,
    );
    if (this.conversionRate == null) {
      this.result = 0;
      return;
    }

    this.result = this.currencyConverterService.convertCurrency(
      this.amount,
      this.sourceCurrency,
      this.targetCurrency,
    );
  }

  convertCurrency() {
    this.updateConversionRate();
  }

  getFlagAndCurrency(currency: string): string {
    return `${this.currencyFlags[currency] || ''} ${currency}`;
  }
}
