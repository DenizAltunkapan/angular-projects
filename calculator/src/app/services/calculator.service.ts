import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private _expression: string = '';
  private _history: string = '';

  get currentValue(): string {
    return this._expression || '0';
  }

  get history(): string {
    return this._history;
  }

  append(value: string) {
    if (this._expression === '0' && value !== '.') {
      this._expression = value;
    } else {
      this._expression += value;
    }
  }

  clear() {
    this._expression = '';
    this._history = '';
  }

  backspace() {
    this._expression = this._expression.slice(0, -1);
    if (this._expression === '') {
      this._expression = '0';
    }
  }

  calculate() {
    try {
      this._history = this._expression + ' =';
      const result = eval(this._expression);
      this._expression = parseFloat(result.toFixed(8)).toString();
    } catch (error) {
      this._expression = 'Error';
      setTimeout(() => this.clear(), 1500);
    }
  }
}
