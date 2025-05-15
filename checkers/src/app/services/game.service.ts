import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board: string[][] = [];
  currentPlayer: string = 'white';
  selectedPiece: { row: number; col: number } | null = null;
  gameOver: boolean = false;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => {
        if ((row + col) % 2 === 1) {
          if (row < 3) return 'black';
          if (row > 4) return 'white';
        }
        return '';
      }),
    );

    this.currentPlayer = 'white';
    this.selectedPiece = null;
    this.gameOver = false;
  }

  selectPiece(row: number, col: number): boolean {
    if (this.board[row][col].startsWith(this.currentPlayer)) {
      this.selectedPiece = { row, col };
      return true;
    }
    return false;
  }

  private switchPlayer(): void {
    this.selectedPiece = null;
    this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
  }

  private countPieces(color: string): number {
    return this.board.flat().filter((piece) => piece.startsWith(color)).length;
  }

  private checkGameOver(): void {
    const whitePieces = this.countPieces('white');
    const blackPieces = this.countPieces('black');

    if (whitePieces == 0) {
      console.log('White wins!');
      this.gameOver = true;
    } else if (blackPieces == 0) {
      console.log('Black wins!');
      this.gameOver = true;
    }
  }

  private isValidMove(targetRow: number, targetCol: number): boolean {
    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];
    const dx = targetCol - col;
    const dy = targetRow - row;

    if (this.board[targetRow][targetCol] !== '') return false;
    const isKing = piece.includes('king');

    const forwardMove =
      (this.currentPlayer === 'white' && dy === -1) ||
      (this.currentPlayer === 'black' && dy === 1);

    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      return isKing || forwardMove;
    }

    if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;

      return (
        this.board[jumpedRow][jumpedCol] !== '' &&
        !this.board[jumpedRow][jumpedCol].startsWith(this.currentPlayer)
      );
    }

    return false;
  }

  movePiece(targetRow: number, targetCol: number): boolean {
    if (!this.isValidMove(targetRow, targetCol)) {
      this.selectedPiece = null;
      return false;
    }

    const { row, col } = this.selectedPiece!;
    const piece = this.board[row][col];

    this.board[targetRow][targetCol] = piece;
    this.board[row][col] = '';
    this.selectedPiece = null;

    if (Math.abs(targetRow - row) === 2) {
      const jumpedRow = (row + targetRow) / 2;
      const jumpedCol = (col + targetCol) / 2;
      this.board[jumpedRow][jumpedCol] = '';
    }

    if (
      (this.currentPlayer === 'white' && targetRow === 0) ||
      (this.currentPlayer === 'black' && targetRow === 7)
    ) {
      this.board[targetRow][targetCol] = `${piece} king`;
    }
    this.switchPlayer();
    this.checkGameOver();
    return true;
  }
}
