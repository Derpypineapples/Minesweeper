var mineCount = 1;
var width, height;
var minespop = false;

var gridspace = [];

class gridsquare{
    constructor(){
        this.hasMine = false;
        this.mineCount = 0;
    }

    get mines(){
        return this.mineCount;
    }

    setMine(b){
        this.hasMine = b;
    }

    incMines(){
        this.mineCount += 1;
    }
}

//Build Fields
function buildField(w, h){
    width = w;
    height = h;
    
    let fieldCont = "";
    for (var i = 0; i < h+2; i++){
        fieldCont += "<tr>";
        for (var j = 0; j < w+2; j++){
            let ind = (j-1) + ((i-1)*w);
            gridspace["g" + ind] = new gridsquare();
            if (!(i == 0 || i == h+1 || j == 0 || j == w+1)){
                fieldCont += "<td><img id=\"g" + ind + "\"";
                fieldCont += " src=\"tile.jpg\" alt=\"\" onmouseup=\"clearSquare(this)\">"+ind+"</img></td>";
                console.log("Pos: " + ind);
                //fieldCont += "<td>" + (j-1 + ((i-1)*width)) + "</td>" //Debug tile count
            }
            else{
                fieldCont += "<td id=\"e";
                fieldCont += "\" style=\"background-color: darkslategrey; width: 4px; height: 4px;\">"+ind+"</td>"
            }
        }
        fieldCont += "</tr>";
    }

    window.document.getElementById("field").innerHTML = fieldCont;
}
window.onload = buildField(7, 5);

//Plant mines in field after built
function plantMines(mc, first){
    for (var i = 0; i < mc; i++){
        let ran;
        do {
            run = false;
            ran = Math.floor(Math.random() * (width*height));
            if (gridspace["g" + ran].hasMine == true || first == "g" + ran){ run = true; }
        } while (run);

        console.log("Mine Planted: " + "g" + ran);

        gridspace["g" + (ran-(width-1))].incMines();
        gridspace["g" + (ran-width)].incMines();
        gridspace["g" + (ran-(width+1))].incMines();

        gridspace["g" + (ran+1)].incMines();
        gridspace["g" + ran].setMine(true);
        gridspace["g" + (ran-1)].incMines();

        gridspace["g" + (ran+(width-1))].incMines();
        gridspace["g" + (ran+width)].incMines();
        gridspace["g" + (ran+(width+1))].incMines();
    }
}

function clearSquare(grid){
    if (grid == null) return;

    if (!minespop){
        plantMines(mineCount, grid.id);
        minespop = true;
    }

    if (gridspace[grid.id].hasMine == true) return;

    grid.src = null;
    if (gridspace[grid.id].mineCount > 0){
        window.document.getElementById(grid.id).parentElement.innerHTML = gridspace[grid.id].mineCount;
    }
    else if (gridspace[grid.id].mineCount == 0){
        let gridint = parseInt(grid.id.slice(1))

        clearSquare(window.document.getElementById("g" + (gridint-(width-1))));
        clearSquare(window.document.getElementById("g" + (gridint-(width))));
        clearSquare(window.document.getElementById("g" + (gridint-(width+1))));
        
        clearSquare(window.document.getElementById("g" + (gridint-1)));
        clearSquare(window.document.getElementById("g" + (gridint+1)));

        clearSquare(window.document.getElementById("g" + (gridint+(width-1))));
        clearSquare(window.document.getElementById("g" + (gridint+(width))));
        clearSquare(window.document.getElementById("g" + (gridint+(width+1))));
    }
}

function change(source, img) { source.src = img; }