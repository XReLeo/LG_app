//GRIGLIA----------------------------->

var grid = [];//array della griglia : matrice di Celle
function Cella(x, y, filled, color, contiene_indizio, element, type, rotation) {

    this.x = x;
    this.y = y;
    this.centerX = x + side_length / 2;
    this.centerY = y + side_length / 2;
    this.filled = filled;//diventa true se vi e presente la parte di una nave
    this.color = color;//diventa 0 se vi si trova una nave
    this.conteine_indizio = contiene_indizio;//diventa true se contiene la parte di una nave da usare come indizio
    this.element = element;
    this.type = type;
    this.rotation = rotation;
}

//NB: grid[riga][colonna] dove Y indica la riga e X la colonne

//crea una griglia con rows righe e cols colonne
function CreateGrid() {

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            var x = j * side_length;
            var y = i * side_length;
            var cella = new Cella(x, y, false, 255, false, null, null, null);//crea una nuova cella
            grid[i][j] = cella;//aggiungi una cella alla griglia
        }
    }
}

function CreateGrid_from_data(grid_from_data) {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            var x = j * side_length;
            var y = i * side_length;
            let filled = grid_from_data[i][j].filled;
            let color = grid_from_data[i][j].color;
            let contiene_indizio = grid_from_data[i][j].contiene_indizio;
            let element = grid_from_data[i][j].element;
            let type = grid_from_data[i][j].type;
            let rotation = grid_from_data[i][j].rotation;

            var cella = new Cella(x, y, filled, color, contiene_indizio, element, type, rotation);//crea una nuova cella
            grid[i][j] = cella;//aggiungi una cella alla griglia
        }
    }
}


PosizioniPossibili = [];//vettore contenente le posizioni possibili in cui puo essere posizionata una nave

//posto possibile in cui puo essere collocata una nave
function PostoPossibile(cella_iniz) {
    this.celle = [];//contiene le celle che possono essere occupate da una nave
    this.cella_iniz = cella_iniz;
}

//trova tutte le posizioni possibili in cui puoi collocare una nave
function TrovaPosizioniPossibili(dim, dir) {
    //se la direzione e orizzontale
    if (dir == 0) {
        //percorre per righe tutta la griglia
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {

                //quando trova una casella bianca
                if (grid[i][j].filled == false) {
                    var good = true;
                    var cella_iniz = grid[i][j];
                    var k = j;
                    var posto = new PostoPossibile(cella_iniz);
                    //guarda se ce ne sono abbastanza per contenere una nave lunga dim
                    while (good == true && k < j + dim && k < cols) {

                        (posto.celle).push(grid[i][k]);

                        if (grid[i][k].filled == true) {
                            good = false;
                        }

                        k++;

                    }

                    //se ce ne sono abbastanza entro i limiti della griglia, aggiungi alle posizioni possibili
                    if (good == true && k == j + dim) {
                        PosizioniPossibili.push(posto);
                    }

                }


            }
        }

    }


    //se la direzione e verticale
    if (dir == 1) {

        //percorre per colonne tutta la griglia
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {

                //quando trova una casella bianca
                if (grid[j][i].filled == false) {
                    var good = true;
                    var cella_iniz = grid[j][i];
                    var k = j;
                    var posto = new PostoPossibile(cella_iniz);
                    //guarda se ce ne sono abbastanza per contenere una nave lunga dim
                    while (good == true && k < j + dim && k < cols) {

                        (posto.celle).push(grid[k][i]);

                        if (grid[k][i].filled == true) {
                            good = false;
                        }

                        k++;

                    }

                    //se ce ne sono abbastanza entro i limiti della griglia, aggiungi alle posizioni possibili
                    if (good == true && k == j + dim) {
                        PosizioniPossibili.push(posto);

                    }

                }


            }
        }

    }


}


var Numeri_R = [];//numeri di celle nere nelle varie righe
var Numeri_C = [];//numeri di celle nere nelle varie colonne

function ContaCelleNere() {

    //se deve contare per righe

    for (let i = 0; i < rows; i++) {

        var n = 0; //numero di celle nere alla riga i 

        for (let j = 0; j < cols; j++) {
            if (grid[i][j].color == 0) {
                n++;
            }
        }

        Numeri_R.push(n);

    }

    for (let i = 0; i < cols; i++) {

        var n = 0; //numero di celle nere alla riga i 

        for (let j = 0; j < rows; j++) {
            if (grid[j][i].color == 0) {
                n++;
            }
        }

        Numeri_C.push(n);

    }

}


function ShowGrid() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            var x = grid[i][j].x + side_length;
            var y = grid[i][j].y + side_length;

            fill(255);
            stroke(0);
            rect(x, y, side_length, side_length);

        }
    }
}

var size = 20;//grandezza de1 caratteri di testo

function ShowNumeri() {

    for (let i = 0; i < cols; i++) {

        var x = grid[0][i].x + side_length;

        textSize(size);
        fill(0);
        text(Numeri_C[i], x + side_length / 2 - 10, side_length / 2 + 10);

    }

    for (let i = 0; i < cols; i++) {

        var y = grid[i][0].y + side_length;

        textSize(size);
        fill(0);
        text(Numeri_R[i], side_length / 2, y + side_length / 2 + 10);

    }


}