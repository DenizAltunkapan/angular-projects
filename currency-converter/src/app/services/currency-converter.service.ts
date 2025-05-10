import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private conversionRates: { [key: string]: { [key: string]: number } } = {
    USD: {
      EUR: 0.89,
      GBP: 0.75,
      INR: 83.5,
      JPY: 145.0,
      CHF: 0.88,
      CNY: 7.25,
      AUD: 1.57,
      CAD: 1.43,
      TRY: 38.74,
    },
    EUR: {
      USD: 1.12,
      GBP: 0.84,
      INR: 95.0,
      JPY: 163.65,
      CHF: 0.96,
      CNY: 7.95,
      AUD: 1.72,
      CAD: 1.56,
      TRY: 43.58,
    },
    GBP: {
      USD: 1.33,
      EUR: 1.19,
      INR: 107.43,
      JPY: 194.37,
      CHF: 1.14,
      CNY: 9.39,
      AUD: 2.04,
      CAD: 1.86,
      TRY: 51.51,
    },
    INR: {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0093,
      JPY: 1.73,
      CHF: 0.0105,
      CNY: 0.086,
      AUD: 0.018,
      CAD: 0.017,
      TRY: 0.45,
    },
    JPY: {
      USD: 0.0069,
      EUR: 0.0061,
      GBP: 0.0052,
      INR: 0.58,
      CHF: 0.0059,
      CNY: 0.048,
      AUD: 0.0105,
      CAD: 0.0095,
      TRY: 0.27,
    },
    CHF: {
      USD: 1.14,
      EUR: 1.04,
      GBP: 0.88,
      INR: 95.0,
      JPY: 170.22,
      CNY: 8.22,
      AUD: 1.79,
      CAD: 1.62,
      TRY: 46.57,
    },
    CNY: {
      USD: 0.14,
      EUR: 0.13,
      GBP: 0.11,
      INR: 11.63,
      JPY: 20.51,
      CHF: 0.12,
      AUD: 0.22,
      CAD: 0.2,
      TRY: 5.35,
    },
    AUD: {
      USD: 0.64,
      EUR: 0.58,
      GBP: 0.49,
      INR: 53.0,
      JPY: 95.35,
      CHF: 0.56,
      CNY: 4.57,
      CAD: 0.91,
      TRY: 24.83,
    },
    CAD: {
      USD: 0.7,
      EUR: 0.64,
      GBP: 0.54,
      INR: 60.0,
      JPY: 104.77,
      CHF: 0.62,
      CNY: 5.05,
      AUD: 1.1,
      TRY: 27.78,
    },
    TRY: {
      USD: 0.026,
      EUR: 0.023,
      GBP: 0.019,
      INR: 2.21,
      JPY: 3.76,
      CHF: 0.021,
      CNY: 0.19,
      AUD: 0.04,
      CAD: 0.036,
    },
  };

  getConversionRate(source: string, target: string): number | null {
    if (!this.conversionRates[source] || !this.conversionRates[source][target])
      return null;
    return this.conversionRates[source][target];
  }

  convertCurrency(amount: number, source: string, target: string): number {
    const rate = this.getConversionRate(source, target);
    if (rate === null) return 0;
    return amount * rate;
  }
}
