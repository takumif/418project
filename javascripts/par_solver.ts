/// <reference path="board.ts" />
/// <reference path="solver.ts" />
/// <reference path="solver_helper.ts" />

/**
 * Returns null if the board is unsolvable. Does not modify the input board
 */
function parSolve(originalBoard: Square[][]): Square[][] {
    var board = copyBoard(originalBoard);
    var progress = true;
    while (progress) {
        progress = fillDeducibleSquares(board);
    }
    if (isSolved(board)) {
        return board;
    } else {
        return parSolveByGuessing(board);
    }
}

/**
 * Returns null if the board is unsolvable. Does not modify the input board
 */
function parSolveByGuessing(originalBoard: Square[][]): Square[][] {
    for (var row = 0; row < originalBoard.length; row++) {
        for (var col = 0; col < originalBoard[0].length; col++) {
            var solution = parSolveByGuessingForSquare(originalBoard, row, col);
            if (solution != null) {
                return solution;
            }
        }
    }
    return null;
}

/**
 * Returns null if the board is unsolvable or the square is already filled.
 * Does not modify the input board
 */
function parSolveByGuessingForSquare(originalBoard: Square[][], row: number, col: number): Square[][] {
    if (originalBoard[row][col] == Square.Empty) {
        var possibilities = [Square.TriTR, Square.TriTL, Square.TriBL, Square.TriBR, Square.Dot];
        for (var i in possibilities) {
            var board = copyBoard(originalBoard);
            board[row][col] = possibilities[i];
            var solution = parSolve(board);
            if (solution != null) {
                return solution;
            }
        }
    }
    return null;
}

function initWorkers(): void {
    var workerScript = "par_worker.js";
    var workerCount = 10;
    var workers: Worker[] = new Array(workerCount);
    for (var i = 0; i < workerCount; i++) {
        workers[i] = new Worker(workerScript);
    }
}