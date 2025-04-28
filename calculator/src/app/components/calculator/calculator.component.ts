import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, DisplayComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  buttonLayout: string[][] = [
    ['C', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  constructor(private calculatorService: CalculatorService) {}

  get display() {
    return this.calculatorService.currentValue;
  }

  get history() {
    return this.calculatorService.history;
  }


  handleInput(input: string) {
    if (input === 'C') {
      this.calculatorService.clear();
    } else if (input === '⌫') {
      this.calculatorService.backspace();
    } else if (input === '=') {
      this.calculatorService.calculate();
    } else {
      this.calculatorService.append(input);
    }
  }

  getButtonClass(button: string): string {
    let baseClass = 'text-xl font-semibold py-4 rounded-lg transition-all duration-200 active:scale-95 ';
    
    if (button === '=') {
      return baseClass + 'bg-gray-400 hover:bg-gray-500 text-white col-span-2';
    } else if (['+', '-', '*', '/', '%'].includes(button)) {
      return baseClass + 'bg-blue-500 hover:bg-blue-600 text-white';
    } else if (['C', '⌫'].includes(button)) {
      return baseClass + 'bg-red-500 hover:bg-red-600 text-white';
    } else {
      return baseClass + 'bg-gray-700 hover:bg-gray-600 text-white';
    }
  }
}