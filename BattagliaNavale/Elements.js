//ELEMENTS---------------------------->

var Elements = [];

class Element {
    constructor(x, y, used, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.used = used;
        this.selected = false;
        this.circle = false;
        this.rounded = false;
        this.rotation = null;
        this.rect = false;

    }

    MarkAsUsed() {
        this.used = true;
    }

    show() {

        const lato = side_length - 2 * extra;

        push()
        fill(0);
        if (this.selected) fill(0, 0, 200);
        rectMode(CENTER);
        noStroke();

        if (this.rounded == true && this.rotation == 3) {

            rect(this.x, this.y, lato, lato, 0, rounded, rounded, 0);
            if (this.used) {

                fill(255);
                noStroke();
                rect(this.x, this.y, 7 / 8 * lato, 7 / 8 * lato, 0, rounded, rounded, 0);

            }

        }
        if (this.rect == true) {

            rect(this.x, this.y, lato, lato);
            if (this.used) {
                fill(255);
                noStroke();
                rect(this.x, this.y, 7 / 8 * lato, 7 / 8 * lato);
            }
        }
        if (this.rounded == true && this.rotation == 1) {

            rect(this.x, this.y, lato, lato, rounded, 0, 0, rounded);
            if (this.used) {

                fill(255);
                noStroke();
                rect(this.x, this.y, 7 / 8 * lato, 7 / 8 * lato, rounded, 0, 0, rounded);

            }
        }
        pop()

        push();
        if (this.circle == true) {

            fill(0);
            if (this.selected) fill(0, 0, 200);
            if (this.used) {
                stroke(0);
                fill(255);
            }
            ellipseMode(CENTER);
            ellipse(this.x, this.y, lato);

        }
        pop()
    }
}

function CreateElements(ele_from_data) {

    Elements = [];

    const dist_x = 0.5 * side_length;
    let dist_y = 1.1 * side_length;

    let dim = 0;
    let index_el = 0;
    for (let i = 0; i < numeri.length; i++) {
        dim++;
        for (let j = 0; j < numeri[i]; j++) {

            const x_iniz = 1 / 2 * side_length + (j * dim) * side_length + dist_x;
            const y_iniz = cnvy + (N) * side_length + (dim - 1) * dist_y;

            if (dim > 1) {
                for (let k = 0; k < dim; k++) {

                    var x_part = x_iniz + k * 0.9 * side_length;
                    var y_part = y_iniz;

                    let ele = null;
                    if (ele_from_data) {
                        ele = new Element(x_part, y_part, ele_from_data[index_el], index_el);
                    } else {
                        ele = new Element(x_part, y_part, false, index_el);
                    }

                    if (k == 0) {

                        ele.rounded = true;
                        ele.rotation = 3;//left

                    }
                    if (k > 0 && k < dim - 1) {

                        ele.rect = true;

                    }
                    if (k == dim - 1) {

                        ele.rounded = true;
                        ele.rotation = 1;
                    }

                    Elements.push(ele);
                    index_el++;

                }

            }
            else if (dim == 1) {
                var x_part = x_iniz;
                var y_part = y_iniz;

                let ele = null;
                if (ele_from_data) {
                    ele = new Element(x_part, y_part, ele_from_data[index_el], index_el);
                } else {
                    ele = new Element(x_part, y_part, false, index_el);
                }
                ele.circle = true;

                Elements.push(ele);
                index_el++;

            }

        }
    }

}

function CheckElements() {

    let stop = false;//diventa true quando viene selezionato un elemento
    let saved = null;

    for (let el of Elements) {

        const x = event.clientX - rectangle.left;//ascissa del click
        const y = event.clientY - rectangle.top;//ordinata del click

        if (el.selected) saved = el;
        el.selected = false;

        if (distance(el.x, el.y, x, y) < side_length / 2 && !stop) {
            el.selected = true;
            stop = true;
        }
    }

    //se non è stato selezionato nessun elemento, rimane selezioanto il precedente
    if (stop == false && saved) saved.selected = true;
}

function DeleteElements() {

    fill(back_color);
    noStroke();
    rect(selected_el_X - 10, selected_el_Y - 10, element_size + 20, element_size + 20);

}


function ShowElements() {

    ShowIndizi();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {

            let cell = grid[i][j];
            if (cell.element != null) {

                if (cell.type == 'rounded_rect') {

                    var x = cell.x + extra + side_length;
                    var y = cell.y + extra + side_length;

                    fill(0, 0, 200, 150);
                    noStroke();

                    if (cell.conteine_indizio) {
                        fill(0, 0, 200);
                    }

                    if (cell.rotation == 1) {

                        rect(x, y, side_length - 2 * extra, side_length - 2 * extra, rounded, 0, 0, rounded);

                    }

                    if (cell.rotation == 0) {

                        rect(x, y, side_length - 2 * extra, side_length - 2 * extra, 0, 0, rounded, rounded);

                    }

                    if (cell.rotation == 3) {

                        rect(x, y, side_length - 2 * extra, side_length - 2 * extra, 0, rounded, rounded, 0);
                    }

                    if (cell.rotation == 2) {

                        rect(x, y, side_length - 2 * extra, side_length - 2 * extra, rounded, rounded, 0, 0);
                    }
                }

                if (cell.type == 'circle') {

                    var x = cell.x + extra_for_circle + side_length;
                    var y = cell.y + extra_for_circle + side_length;

                    fill(0, 0, 200, 150);
                    ellipse(x, y, r);

                }

                if (cell.type == 'rect') {

                    var x = cell.x + extra + side_length;
                    var y = cell.y + extra + side_length;

                    fill(0, 0, 200, 150);
                    noStroke();
                    rect(x, y, side_length - 2 * extra, side_length - 2 * extra);

                }

            }

        }
    }

}