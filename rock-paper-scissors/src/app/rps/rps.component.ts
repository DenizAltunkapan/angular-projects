import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rps',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './rps.component.html',
  styleUrl: './rps.component.scss',
})
export class RpsComponent {
  icons: any = {
    Rock: faHandRock,
    Paper: faHandPaper,
    Scissors: faHandScissors,
  };

  typedText = '';
  choices = ['Rock', 'Paper', 'Scissors'];
  currentIndex = 0;
  typingInProgress = false;

  playerChoice: string = '';
  computerChoice: string = '';
  result: string = '';

  ngOnInit() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    if (this.typingInProgress) return;

    this.typingInProgress = true;

    setInterval(() => {
      this.typeText();
    }, 2000);
  }

  typeText() {
    const text = this.choices[this.currentIndex];
    let i = 0;
    this.typedText = '';

    const typingInterval = setInterval(() => {
      this.typedText += text[i];
      i++;
      if (i === text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.choices.length;
          this.typingInProgress = false;
        }, 200);
      }
    }, 150);
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  determineWinner(playerChoice: string, computerChoice: string): string {
    if (playerChoice === computerChoice) {
      return 'Tie! Please try again.😊';
    } else if (
      (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
      (playerChoice === 'Paper' && computerChoice === 'Rock') ||
      (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      return 'You win!🎉';
    } else {
      return 'Computer wins!😵';
    }
  }

  onPlayerChoice(choice: string) {
    this.playerChoice = choice;
    const computerIndex = this.getRandomNumber(this.choices.length);
    this.computerChoice = this.choices[computerIndex];
    this.result = this.determineWinner(this.playerChoice, this.computerChoice);
  }
}
