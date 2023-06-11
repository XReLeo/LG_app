const CluesGrid = []//matrice degli indizi 4 x N (top, right, bottom, left)

function ClueCell(x, y, clue) {

    this.x = x;
    this.y = y;
    this.centerX = x + side_length / 2;
    this.centerY = y + side_length / 2;
    this.clue = clue;
    this.show = true;
}

function CreateClueGrid(cluegrid_from_data) {

    //create grid with clues
    for (let i = 0; i < 4; i++) {

        CluesGrid[i] = [];
        for (let j = 0; j < N; j++) {

            var x = j * side_length + (window_width - (N + 2) * side_length) / 2;
            var y = j * side_length + side_length;

            if (i == 0) {//top
                y = side_length;
                x += side_length;
            }
            if (i == 1) {//right
                x = (window_width + (N) * side_length) / 2;
                y += side_length;
            }
            if (i == 2) {//bottom
                y = (N + 2) * side_length;
                x += side_length;
            }
            if (i == 3) {//left
                x = (window_width - (N + 2) * side_length) / 2;
                y += side_length;
            }

            let val = null;
            if (cluegrid_from_data) {
                val = cluegrid_from_data[i][j];   
            }
            var cell = new ClueCell(x, y, val);//crea una nuova cella
            CluesGrid[i][j] = cell;
        }
    }

}

function ResetClues(){

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < N; j++) {

            let cell = CluesGrid[i][j];
            cell.clue = 0;
        }
    }
}

function ShowClueGrid() {

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < N; j++) {

            var x = CluesGrid[i][j].x;
            var y = CluesGrid[i][j].y;

            fill(255);
            noStroke();

            rect(x, y, side_length, side_length);

            x = CluesGrid[i][j].centerX - NUM_SIZE / 3;
            y = CluesGrid[i][j].centerY + NUM_SIZE / 3;

            textSize(NUM_SIZE);
            fill(0);
            if(CluesGrid[i][j].show) text(CluesGrid[i][j].clue, x, y);

        }
    }

    //top
    let x1 = grid[0][0].x;
    let y1 = grid[0][0].y;
    let x2 = grid[0][N - 1].x + side_length;
    let y2 = grid[0][N - 1].y;
    stroke(0);
    line(x1, y1, x2, y2);

    //right
    x1 = grid[0][N - 1].x + side_length;
    y1 = grid[0][N - 1].y;
    x2 = grid[N - 1][N - 1].x + side_length;
    y2 = grid[N - 1][N - 1].y + side_length;
    stroke(0);
    line(x1, y1, x2, y2);

    //bottom
    x1 = grid[N - 1][0].x;
    y1 = grid[N - 1][0].y + side_length;
    x2 = grid[N - 1][N - 1].x + side_length;
    y2 = grid[N - 1][N - 1].y + side_length;
    stroke(0);
    line(x1, y1, x2, y2);

    //left
    x1 = grid[0][0].x;
    y1 = grid[0][0].y;
    x2 = grid[N - 1][0].x;
    y2 = grid[N - 1][0].y + side_length;
    stroke(0);
    line(x1, y1, x2, y2);

}

function ShowClues() {

    let put = 0;
    while (put < NUM_CLUES) {
        let i = floor(random(4));
        let j = floor(random(N));
        let ClueCell = CluesGrid[i][j];

        if (ClueCell.show == true) {
            put++;
            ClueCell.show = true;
        }
    }
}