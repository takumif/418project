/// <reference path="board.ts" />

interface BlockAngles {
    [type: number]: number;   
}

// Defines angles for each orientation of triangle within 2 by 2 block.
// TL TR BR BL DOT , black squares contribute 0 degrees.
var anglesTL:BlockAngles = {8:90, 9:45, 11:0, 10:45, 7:90, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}; 
var anglesTR:BlockAngles = {8:45, 9:90, 11:45, 10:0, 7:90, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}; 
var anglesBL:BlockAngles = {8:45, 9:0, 11:45, 10:90, 7:90, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}; 
var anglesBR:BlockAngles = {8:0, 9:45, 11:90, 10:45, 7:90, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}; 

function isSolved(board: Square[][]): boolean {
    if (hasEmptyCell(board)) {
        return false;
    }
    
    var b_len = board.length;
        
    for (var row = 0; row < b_len - 1; row++) {
        for (var col = 0; col < b_len - 1; col++) {
            
            // Triangles and position in 2 by 2.
            var TL = board[row][col];
            var TR = board[row][col + 1];
            var BL = board[row + 1][col];
            var BR = board[row + 1][col + 1];

            // Check 2 by 2 block first.
            if (!isValidBlock(TL, TR, BL, BR)){
                return false;
            }
            
            // Check sides and corner dots.
               
        }
    }
    
    return true;
}

// Check validity for 2 by 2 block.
function isValidBlock(tl:number, tr:number, bl:number, br:number): boolean {
    
            
    // Check only inner dot in 2 by 2 block.
    
    var angles:Array<number> = new Array<number>();

/****** CORNER 1 *******/    
    // Calc. angles surrounding inner dot.
    var sum1 = 0;
    sum1 += anglesTL[tl];
    // Only for one angle coming from TL portion.
    // Sum adjacent angles in clockwise fashion iff tl is top-left or bottom-right triangle.
    // (Not case tri), (triangles in case), (tri in adjacent case)
    if ((tl != Square.TriTR) && (tl == Square.TriTL || tl == Square.TriBL || tl == Square.Dot) && (tr == Square.TriBR || tr == Square.TriTR || tr == Square.Dot)){
        sum1 += anglesTR[tr];
        console.log("--1.1--");
        if ((tr == Square.TriTR || tr == Square.Dot) && (br == Square.TriBL || br == Square.TriBR || br == Square.Dot)){
            sum1 += anglesBR[br];
            console.log("--2.1--");
            if ((br == Square.TriBR || br == Square.Dot) && (bl == Square.TriBL || bl == Square.TriTL || bl == Square.Dot)){
                sum1 += anglesBL[bl];        
                console.log("--3.1--");    
            }
        }
        
        // Initially started with a TL triangle or Dot.
        if ((sum1 < 360) && (tl == Square.TriTL || tl == Square.Dot) && (bl == Square.TriBR || bl == Square.Dot || bl == Square.TriBL)){
                console.log("--4.1--");
                sum1 += anglesBL[bl];
        }
    //    // Entire 2 by 2 is just dot cells.
    //    if (tl == Square.Dot && tr == Square.Dot && bl == Square.Dot && br == Square.Dot){
    //        sum1 -= 90;
    //    }
    } 

    console.log("Clockwise: " + sum1);    

    var sum2 = 0;
    var repeats = 0;
    sum2 += anglesTL[tl];    
    if ((tl != Square.TriBL) && (tl == Square.TriTL || tl == Square.TriTR || tl == Square.Dot) && (bl == Square.TriBL || bl == Square.TriBR || bl == Square.Dot)){
        sum2 += anglesBL[bl];
        console.log("--1.2--");
        if ((bl == Square.TriBL || bl == Square.Dot) && (br == Square.TriBR || br == Square.TriTR || br == Square.Dot)){
            sum2 += anglesBR[br];
            console.log("--2.2--");
            if ((br == Square.TriBR || br == Square.Dot) && (tr == Square.TriTL || tr == Square.TriTR || tr == Square.Dot)){
                sum2 += anglesTR[tr]; 
                console.log("--3.2--");
            }
        }
        // Initially started with a TL triangle or Dot.
        if ((sum1 < 360) && (tl == Square.TriTL || tl == Square.Dot) && (tr == Square.TriBR || tr == Square.Dot || tr == Square.TriTR)){
            sum2 += anglesTR[tr];
            //console.log("--4.2--");
        }
    //    // Entire 2 by 2 is just dot cells.
    //    if (tl == Square.Dot && tr == Square.Dot && bl == Square.Dot && br == Square.Dot){
    //        sum2 -= 90;
    //    }
    }     
    
    console.log("Anti-Clockwise: " + sum2);    

    // Add the larger angle during rotational travel.
    angles.push(max(sum1, sum2));

/********* END CORNER 1 ********/    

    console.log("Corner 1 - Final angle: " + angles);

    sum1 = 0;
    sum2 = 0;
    
    return false;
}

/************************************** AUX FUNCTIONS ***********************************************/

function max(a:number, b:number): number {
    return (a > b) ? a : b;   
}

function withinBounds(b_len: number, row: number, col: number): boolean {
    return (0 <= row && row < b_len) && (0 <= col && col < b_len);   
}

function hasEmptyCell(board: Square[][]): boolean {
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[0].length; col++) {
            if (board[row][col] == Square.Empty) {
                return true;
            }
        }
    }
    return false;
}