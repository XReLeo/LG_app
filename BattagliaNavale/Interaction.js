let savedCell = null;//cella correntemente occupata

function CheckGrid() {

    const x = event.clientX - rectangle.left - 3 * side_length / 2;//ascissa del click
    const y = event.clientY - rectangle.top - 3 * side_length / 2;//ordinata del click

    for (let el of Elements) {

        if (el.selected == true) {

            if (el.circle == true) {
                selected_element = 'circle';
            }
            if (el.rect == true) {
                selected_element = 'rect';
            }
            if (el.rounded == true) {
                selected_element = 'rounded_rect';
            }

            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {

                    let cell = grid[i][j];
                    const cellX = cell.x;//ascissa della cella
                    const cellY = cell.y;//ordinata della cella


                    if (distance(cellX, cellY, x, y) < side_length / 2 && !el.used) {
                        let previousEl = cell.element;
                        if (previousEl!=null) Elements[previousEl].used = false;
                        cell.element = el.index;
                        cell.type = selected_element;
                        cell.rotation = el.rotation;
                        el.used = true;
                        savedCell = cell;
                        break;
                    }
                }
            }

        }
    }

}

function CheckRotate() {

    RotateButton.clicked = false;

    if (savedCell) {

        if (savedCell.rotation != null) {

            const x = event.clientX - rectangle.left;//ascissa del click
            const y = event.clientY - rectangle.top;//ordinata del click

            if (distance(RotateButton.x, RotateButton.y, x, y) < RotateButton.size / 2) {
                savedCell.rotation = (savedCell.rotation + 1) % 4;
                RotateButton.clicked = true;
            }
        }

    }
}

let waitRemove = false;

//deve risettare la sua posizione precedente fuori dal campo
function CheckRemove() {

    const x = event.clientX - rectangle.left;//ascissa del click
    const y = event.clientY - rectangle.top;//ordinata del click

    RemoveButton.clicked = false;

    if (distance(RemoveButton.x, RemoveButton.y, x, y) < RotateButton.size / 2) {
        waitRemove = true;
        RemoveButton.clicked = true;
    }
}

function RemoveElement() {

    if (waitRemove) {

        let el = null;

        const x = event.clientX - rectangle.left - 3 * side_length / 2;//ascissa del click
        const y = event.clientY - rectangle.top - 3 * side_length / 2;//ordinata del click

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {

                let cell = grid[i][j];
                const cellX = cell.x;//ascissa della cella
                const cellY = cell.y;//ordinata della cella


                if (distance(cellX, cellY, x, y) < side_length / 2 && cell.element != null) {

                    el = Elements[cell.element];
                    cell.element = null;
                    cell.type = null;
                    cell.rotation = null;
                    el.used = false;
                    el.selected = false;
                    waitRemove = false;
                    break;
                }
            }
        }

        if (el) {
            el.show();
        }

    }

    waitRemove = false;
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

class ButtonRotate {
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