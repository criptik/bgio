import { INVALID_MOVE } from 'boardgame.io/core';

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
    const positions = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
	[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    // debugger;
    for (let pos of positions) {
	let setpos = new Set(pos.map(n => cells[n]));
	if (setpos.size == 1  && !setpos.has(null)) {
	    return true;
	}
    }
    return false;
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
}


export const TicTacToe = {
    setup: () => ({ cells: Array(9).fill(null) }),

    turn: {
	moveLimit: 1,
    },
    
    moves: {
	clickCell: (G, ctx, id) => {
	    if (G.cells[id] !== null) {
		return INVALID_MOVE;
	    }
	    G.cells[id] = ctx.currentPlayer;
	}
    },

    endIf: (G, ctx) => {
	if (IsVictory(G.cells)) {
	    return { winner: ctx.currentPlayer };
	}
	if (IsDraw(G.cells)) {
	    return { draw: true };
	}
    },    
};
