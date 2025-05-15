import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-checkers',
  imports: [CommonModule],
  templateUrl: './checkers.component.html',
  styleUrl: './checkers.component.scss',
})
export class CheckersComponent {
  constructor(public gameService: GameService) {
    this.gameService.initializeBoard();
  }

  onCellClick(row: number, col: number): void {
    if (this.gameService.gameOver) {
      return;
    }

    if (this.gameService.selectedPiece) {
      this.gameService.movePiece(row, col);
    } else {
      this.gameService.selectPiece(row, col);
    }
  }

  isSelected(row: number, col: number): boolean {
    return (
      this.gameService.selectedPiece?.row === row &&
      this.gameService.selectedPiece?.col === col
    );
  }

  resetGame(): void {
    this.gameService.initializeBoard();
  }
}
