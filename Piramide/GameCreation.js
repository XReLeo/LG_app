//GAME

const defaultList = [];
const SolutionMatrix = [];
let NotUsed = [];

function CreateGame() {
    let good = false
    const max_iter = 10000;

    //check that there are no zeros
    let i = 0;
    while (good == false && i < max_iter) {
        good = true
        FillCells();
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= i; j++) {
                if (SolutionMatrix[i][j] == 0) {
                    good = false;
                }
            }
        }
        i++;
    }

    ColorCells();

    // Add cells to possible helps
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
            if (grid[i][j].value == null) {
                NotUsed.push(grid[i][j]);
            }
        }
    }

}

function FillCells() {

    let nums = [];//conatins numbers bitween 1 and 9

    for (let i = 1; i <= 9; i++) {
        nums.push(i);
    }

    for (let i = 0; i < rows; i++){
        SolutionMatrix[i] = []
    }

    //fill the last layer N-1
    for (let j = 0; j < N; j++){
        index = floor(random(nums.length));
        r_num = nums.splice(index, 1)
        SolutionMatrix[N - 1].push(r_num);
    }

    //fill the following layers
    for (let i = N - 2; i >= 0; i--){
        current_layer = SolutionMatrix[i];
        prec_layer = SolutionMatrix[i + 1];
        for (let j = 0; j < i+1; j++){
            sum = prec_layer[j] + prec_layer[j + 1];
            diff = prec_layer[j] - prec_layer[j + 1];

            current_layer[j] = Math.abs(diff)
            if(random(1) > 0.5 && sum <= 9) {
                current_layer[j] = sum;
            }
        }
    }
}

function ColorCells() {
    for (let i = 0; i < N; i++) {
        let row = grid[i];
        let sol_row = SolutionMatrix[i];
        let unique_vals = new Set(sol_row);
        console.log(sol_row.length, unique_vals.size);
        if(unique_vals.size != row.length){
            for (let j = 0; j < sol_row.length; j++){
                row[j].row_color = true;
            }
        }
    }
}

function GiveHelp(){

    let n1 = floor(random(NotUsed.length));

    let cellToChange = NotUsed[n1];
    Remove(NotUsed, NotUsed[n1]);
    let i = cellToChange.i;
    let j = cellToChange.j;

    cellToChange.value = SolutionMatrix[i][j];
    cellToChange.color = true;
}

function AddClues() {
    for (let i = 0; i < NUM_CLUES; i++) {
        GiveHelp();
    }
}