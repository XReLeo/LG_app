//GAME

const defaultList = [];
let SolutionMatrix = [];
let NotUsed = [];

function FillCells() {

    let nums = [];//conatins numbers bitween 1 and N

    for (let i = 1; i <= N; i++) {
        nums.push(i);
    }

    //create the base row randomly which is defaultList
    while (nums.length > 0) {
        let index = floor(random(nums.length))
        let num = nums[index];
        nums.splice(index, 1);
        defaultList.push(num);
    }

    let matrix = [];
    let offsets = [];//contains an offset for each row from which start to insert the values of the base row

    for (let i = 1; i <= N; i++) {
        offsets.push(i);
    }

    for (let i = 0; i < N; i++) {
        matrix[i] = [];
        for (let j = 0; j < N; j++) {
            matrix[i][j] = null;
        }
    }

    //assign a randomly offsetted list of defaultList to each row
    for (let i = 0; i < N; i++) {
        let index = floor(random(offsets.length));
        let offset = offsets[index];
        offsets.splice(index, 1);
        for (let j = 0; j < N; j++) {

            let el = defaultList[(j + offset) % N];
            matrix[i][j] = el;
        }
    }

    // console.log(matrix);

    SwapColumn(matrix);
    SwapRow(matrix);

    for(let i = 0; i < N; i++){
        SolutionMatrix[i] = [];
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            grid[i][j].value = matrix[i][j];
            SolutionMatrix[i][j] = matrix[i][j];
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            NotUsed.push({
                i: i,
                j: j
            })
        }
    }
}

function GiveHelp(){

    let n1 = floor(random(NotUsed.length));

    let cellToChange = NotUsed[n1];
    Remove(NotUsed, NotUsed[n1]);
    let i = cellToChange.i;
    let j = cellToChange.j;

    grid[i][j].value = SolutionMatrix[i][j];
    grid[i][j].color = true;
}

const NumOfSwap = 5;

function SwapColumn(matrix){

    for(let count = 0; count < NumOfSwap; count++){
        let random1 = floor(random(N));
        let random2 = floor(random(N));
        for(let i = 0; i < N; i++){
            let aux = matrix[i][random1];
            matrix[i][random1] = matrix[i][random2];
            matrix[i][random2] = aux;
        }
    }

}

function SwapRow(matrix) {

    for (let count = 0; count < NumOfSwap; count++) {

        let random1 = floor(random(N));
        let random2 = floor(random(N));

        let aux = matrix[random1];
        matrix[random1] = matrix[random2];
        matrix[random2] = aux;
    }

}

function CreateClues() {

    //top
    for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {

            let increase = true;
            for (let k = 0; k < i; k++) {
                if (grid[k][j].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[0][j].clue++;
            }
        }
    }

    //right
    for (let i = 0; i < N; i++) {
        for (let j = N - 1; j >= 0; j--) {

            let increase = true;
            for (let k = N - 1; k >= j; k--) {
                if (grid[i][k].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[1][i].clue++;
            }
        }
    }

    //bottom
    for (let j = 0; j < N; j++) {
        for (let i = N - 1; i >= 0; i--) {

            let increase = true;
            for (let k = N - 1; k >= i; k--) {
                if (grid[k][j].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[2][j].clue++;
            }
        }
    }

    //left
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {

            let increase = true;
            for (let k = 0; k < j; k++) {
                if (grid[i][k].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[3][i].clue++;
            }
        }
    }
}