//INTERACTION
const Elements = [];
class Element {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.value = null;
        this.selected = false;
    }

    show() {

        fill(150);
        rectMode(CENTER);
        rect(this.x, this.y, el_side);

        let x = this.x - NUM_SIZE / 3;
        let y = this.y + NUM_SIZE / 3;

        textSize(NUM_SIZE);
        fill(0);
        text(this.value, x, y);

        if(this.selected){
            fill(0, 0, 200, 100);
            rect(this.x, this.y, el_side);
        }
    }
}

function CreateElements() {

    const space = el_side / 9;

    let off_x = (dimCanvas_x - 8 * (el_side + space)) / 2;
    let new_el = new Element(off_x ,yElements);
    new_el.value = 1;
    Elements.push(new_el);

    for (let i = 1; i < 9; i++) {

        let x = Elements[i - 1].x + space + el_side;
        let y = yElements;
        new_el = new Element(x, y);
        new_el.value = i + 1;
        Elements.push(new_el);
    }

}

function ShowElements() {
    for (let el of Elements) {
        el.show();
    }
}

let selected_Element = null;

function CheckElements() {

    let stop = false;//diventa true quando viene selezionato un elemento
    let saved = null;

    for (let el of Elements) {

        const x = event.clientX - rectangle.left;//ascissa del click
        const y = event.clientY - rectangle.top;//ordinata del click

        if (el.selected) saved = el;
        el.selected = false;

        if (distance(el.x, el.y, x, y) < el_side / 2 && !stop) {

            waitRemove = false;
            RemoveButton.clicked = false;

            el.selected = true;
            selected_Element = el;

            stop = true;
        }
    }

    //se non è stato selezionato nessun elemento, rimane selezioanto il precedente
    if (stop == false && saved) saved.selected = true;
}

function ResetElements(){

    for(let el of Elements){
        el.selected = false;
    }
}

function CheckGrid() {

    const x = event.clientX - rectangle.left;//ascissa del click
    const y = event.clientY - rectangle.top;//ordinata del click

    for (let el of Elements) {

        if (el.selected == true) {

            for (let i = 0; i < N; i++) {
                for (let j = 0; j <= i; j++) {

                    let cell = grid[i][j];
                    const cellX = cell.centerX;//ascissa della cella
                    const cellY = cell.centerY;//ordinata della cella


                    if (distance(cellX, cellY, x, y) < side_length / 2 && !el.used) {
                        cell.value = el.value;
                        FilledCells.push(cell);
                        break;
                    }
                }
            }

        }
    }

}

let waitRemove = false;

function CheckRemove() {

    const x = event.clientX - rectangle.left;//ascissa del click
    const y = event.clientY - rectangle.top;//ordinata del click

    if (distance(RemoveButton.x, RemoveButton.y, x, y) < RemoveButton.size / 2) {
        waitRemove = true;
        RemoveButton.clicked = true;
        if(selected_Element) selected_Element.selected = false; 
    }
}

function RemoveValue() {

    if (waitRemove) {

        console.log('in RemoveValue');

        const x = event.clientX - rectangle.left;//ascissa del click
        const y = event.clientY - rectangle.top;//ordinata del click

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < i; j++) {

                let cell = grid[i][j];
                const cellX = cell.centerX;//ascissa della cella
                const cellY = cell.centerY;//ordinata della cella


                if (distance(cellX, cellY, x, y) < side_length / 2) {

                    cell.value = null;
                    break;
                }
            }
        }

    }
}

let FilledCells = [];//stores in order the numbers put on the grid 

function Back(){

    const x = event.clientX - rectangle.left;//ascissa del click
    const y = event.clientY - rectangle.top;//ordinata del click

    if (distance(BackButton.x, BackButton.y, x, y) < BackButton.size / 2) {

        waitRemove = false;
        if (selected_Element) selected_Element.selected = false;
        RemoveButton.clicked = false;

        let cell = FilledCells.pop();
        cell.value = null;
    }

}


class ButtonRubbish {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.clicked = false;
    }

    show() {

        push();
        fill(200);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.size);

        fill(0);
        stroke(0);
        rectMode(CENTER);
        let h = this.size / 1.5;
        let base = this.size / 2;
        const x = this.x;
        const y = this.y + h / 8;
        rect(x, y, base, h);

        let h1 = h / 5;
        let base1 = base * 1.2;
        const y1 = y - h / 2 - h1 / 2;
        rect(x, y1, base1, h1);

        const diam = this.size / 8;
        const y2 = y1 - diam / 2;
        ellipseMode(CENTER);
        ellipse(x, y2, diam);


        noStroke()
        fill(150);
        const size1 = diam / 2.5;
        const h_rect = h * 0.8;
        let a1 = x - base / 3.5;
        rect(a1, y, size1, h_rect);

        let a2 = x;
        rect(a2, y, size1, h_rect);

        let a3 = x + base / 3.5;
        rect(a3, y, size1, h_rect);


        if (this.clicked) {

            fill(0, 0, 200, 100);
            stroke(0);
            rectMode(CENTER);
            rect(this.x, this.y, this.size);
        }


        pop();



    }

}

class ButtonBack {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.clicked = false;
    }

    show() {

        push();
        fill(200);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.size);

        const R1 = this.size * 4 / 10;

        fill(0);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, 2 * R1);

        const R2 = this.size / 4;

        fill(200);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, 2 * R2);

        fill(200)
        noStroke();

        let x1 = this.x - this.size / 2;
        let y1 = this.y + this.size / 2;
        let x2 = x1 + this.size;
        let y2 = y1;
        let x3 = this.x;
        let y3 = this.y;

        triangle(x1, y1, x2, y2, x3, y3);

        fill(0);

        const d = R1 - R2;
        const h = 4 / 3 * d;
        const theta = atan((x2 - x3) / (y2 - y3));
        const dx = d * sin(theta);
        const dy = d * cos(theta);
        const xc = this.x + (R1 + R2) / 2 * cos(theta);
        const yc = this.y + (R1 + R2) / 2 * sin(theta)

        let a1 = xc - dx;
        let b1 = yc - dy;
        let a2 = xc + dx;
        let b2 = yc + dy;
        let a3 = xc - h * sin(theta);
        let b3 = yc + h * cos(theta);

        triangle(a1, b1, a2, b2, a3, b3);

        if (this.clicked) {

            fill(0, 0, 200, 100);
            stroke(0);
            rectMode(CENTER);
            rect(this.x, this.y, this.size);
        }

        pop();



    }

}




function distance(ax, ay, bx, by) {

    return sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
}