var Square;
(function (Square) {
    Square[Square["Empty"] = 0] = "Empty";
    Square[Square["Black"] = 1] = "Black";
    Square[Square["Black0"] = 2] = "Black0";
    Square[Square["Black1"] = 3] = "Black1";
    Square[Square["Black2"] = 4] = "Black2";
    Square[Square["Black3"] = 5] = "Black3";
    Square[Square["Black4"] = 6] = "Black4";
    Square[Square["Dot"] = 7] = "Dot";
    Square[Square["TriTL"] = 8] = "TriTL";
    Square[Square["TriTR"] = 9] = "TriTR";
    Square[Square["TriBL"] = 10] = "TriBL";
    Square[Square["TriBR"] = 11] = "TriBR";
})(Square || (Square = {}));
function initBoard(rows, cols) {
    var board = new Array(rows);
    for (var r = 0; r < rows; r++) {
        board[r] = new Array(cols);
        for (var c = 0; c < cols; c++) {
            board[r][c] = Square.Empty;
        }
    }
    return board;
}
function getNextSquareType(current) {
    var next = current + 1;
    if (next in Square) {
        return next;
    }
    else {
        return 7; // start from dot.
    }
}
function getPrevSquareType(current) {
    var prev = current - 1;
    if (prev >= 0) {
        return prev;
    }
    else {
        return Square.TriBR; // hard-code the last one for now
    }
}
function squareToString(type) {
    return Square[type];
}
function stringToSquare(name) {
    return Square[name];
}
function randomBoard(boardLen) {
    if (boardLen <= 1)
        return null;
    var board = new Array(boardLen);
    for (var i = 0; i < boardLen; i++) {
        board[i] = new Array(boardLen);
        for (var j = 0; j < boardLen; j++) {
            // A random type from 0 to 11.
            var r = Math.floor(Math.random() * 11);
            if (r < 7 && r > 3)
                r = 0;
            board[i][j] = r;
        }
    }
    return board;
}
function unsolve(board) {
    var newBoard = new Array(board.length);
    for (var row = 0; row < board.length; row++) {
        newBoard[row] = new Array(board[row].length);
        for (var col = 0; col < board[0].length; col++) {
            if ([Square.Dot, Square.TriTL, Square.TriTR, Square.TriBL, Square.TriBR
            ].indexOf(board[row][col]) != -1) {
                newBoard[row][col] = Square.Empty;
            }
            else {
                newBoard[row][col] = board[row][col];
            }
        }
    }
    return newBoard;
}
/**
 * Removes the first occurrence of an element in the array, if any.
 * Returns true if removal happened
 */
function remove(arr, element) {
    if (arr.indexOf(element) == -1) {
        return false;
    }
    else {
        arr.splice(arr.indexOf(element), 1);
        return true;
    }
}
/**
 * Gets the intersection of two input arrays
 */
function getIntersection(arr1, arr2) {
    var intersection = [];
    for (var i = 0; i < arr1.length; i++) {
        var element = arr1[i];
        if (arr2.indexOf(element) != -1) {
            intersection.push(element);
        }
    }
    return intersection;
}
function copyBoard(board) {
    var newBoard = new Array(board.length);
    for (var row = 0; row < board.length; row++) {
        newBoard[row] = new Array(board[row].length);
        for (var col = 0; col < board[row].length; col++) {
            newBoard[row][col] = board[row][col];
        }
    }
    return newBoard;
}
function isWithinBounds(board, row, col) {
    return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}
/**
 * Returns the statically assigned direction for a triangle tile
 */
function getTriangleOfDirection(direction) {
    switch (direction) {
        case 0:
            return Square.TriTR;
        case 1:
            return Square.TriTL;
        case 2:
            return Square.TriBL;
        case 3:
            return Square.TriBR;
    }
}
/**
 * Returns null if the row or col is out of bounds
 */
function getRowColInDirection(board, row, col, direction) {
    var neighbor;
    switch (direction) {
        case 0:
            neighbor = { row: row - 1, col: col };
        case 1:
            neighbor = { row: row, col: col - 1 };
        case 2:
            neighbor = { row: row + 1, col: col };
        case 3:
            neighbor = { row: row, col: col + 1 };
    }
    return isWithinBounds(board, neighbor.row, neighbor.col) ? neighbor : null;
}
function isNumberedSquare(square) {
    switch (square) {
        case Square.Black0:
        case Square.Black1:
        case Square.Black2:
        case Square.Black3:
        case Square.Black4:
            return true;
        default:
            return false;
    }
}
function getNumberOnSquare(square) {
    switch (square) {
        case Square.Black0:
            return 0;
        case Square.Black1:
            return 1;
        case Square.Black2:
            return 2;
        case Square.Black3:
            return 3;
        case Square.Black4:
            return 4;
        default:
            throw "The square doesn't have a number on it!";
    }
}
