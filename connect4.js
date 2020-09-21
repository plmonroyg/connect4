var jugador1 = "ROJO";
var jugador2 = "AMARILLO";

var colorDefault = 'white';
var colorP1 = 'red';
var colorP2 = 'yellow';
var seed = Math.random();
const ancho = 10;
const alto = 9;

genera_tabla();

var tableRows = document.getElementsByTagName('tr');
var tableGrid = document.getElementsByTagName('td');
var turnoJugador = document.querySelector('.turno');
var jugadorActivo =1;
const puntos = document.querySelectorAll('.punto');
const btnReiniciar = document.querySelector('#btnReiniciar');



if (seed <=0.5){
    jugadorActivo = 1;
    turnoJugador.textContent = 'Juega '+jugador1;
}else{
    jugadorActivo = 2;
    turnoJugador.textContent = 'Juega '+jugador2;    

}

//adiciona eventos a cada celda de tabla 

Array.prototype.forEach.call(tableGrid, (cell) => {
    cell.addEventListener('click', cambiarColor);
    cell.style.backgroundColor = colorDefault;
});

function cambiarColor(e){
    let columna = e.target.cellIndex;
    let fila = [];

    for (i = alto-1; i >= 0; i--){
        if (tableRows[i].children[columna].style.backgroundColor == colorDefault){
            fila.push(tableRows[i].children[columna]);
            if (jugadorActivo === 1){
                fila[0].style.backgroundColor = colorP1;
                validaGanador(jugador1,jugadorActivo);
                turnoJugador.textContent = 'Juega '+jugador2;
                return jugadorActivo = 2;

            }else{
                fila[0].style.backgroundColor = colorP2;
                validaGanador(jugador2,jugadorActivo);
                turnoJugador.textContent = 'Juega '+jugador1;
                return jugadorActivo = 1;
            }
        }
    }
   
}

function validaGanador(ganador, jugActivo){
    if (validaHorizontal() || validaVertical() || validaDiagonal1() || validaDiagonal2()){
        turnoJugador.textContent = ganador+' Gana!!';
        alert( ganador+' Gana!!');
        reiniciar();                    
        return;
    }else if (validaEmpate()){
        turnoJugador.textContent = 'Empate!';                 
        alert('EMPATE!');
        reiniciar();   
        return;
    }
}



function verificaColor(one, two, three, four){
    return (one === two && one === three && one === four && one !== colorDefault && one !== undefined);
}

function validaHorizontal(){
    for (fila = 0; fila < tableRows.length; fila++){
        for (col =0; col <= ancho-4; col++){
           if (verificaColor(tableRows[fila].children[col].style.backgroundColor,
                            tableRows[fila].children[col+1].style.backgroundColor, 
                            tableRows[fila].children[col+2].style.backgroundColor,
                            tableRows[fila].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function validaVertical(){
    for (col = 0; col < ancho; col++){
        for (fila = 0; fila <=alto-4; fila++){
            if (verificaColor(tableRows[fila].children[col].style.backgroundColor,
                tableRows[fila+1].children[col].style.backgroundColor,
                tableRows[fila+2].children[col].style.backgroundColor,
                tableRows[fila+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function validaDiagonal1(){
    for(col = 0; col <= ancho-4; col++){
        for (fila = 0; fila <=alto-4; fila++){
            if (verificaColor(tableRows[fila].children[col].style.backgroundColor,
                tableRows[fila+1].children[col+1].style.backgroundColor,
                tableRows[fila+2].children[col+2].style.backgroundColor,
                tableRows[fila+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function validaDiagonal2(){
    for(col = 0; col <= ancho-4; col++){
        for (fila = alto-1; fila >=3; fila--){
            if (verificaColor(tableRows[fila].children[col].style.backgroundColor,
                tableRows[fila-1].children[col+1].style.backgroundColor,
                tableRows[fila-2].children[col+2].style.backgroundColor,
                tableRows[fila-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function validaEmpate(){
    let grid = []
    for (i=0; i < tableGrid.length; i++){
        if (tableGrid[i].style.backgroundColor !== colorDefault){
            grid.push(tableGrid[i]);
        }
    }
    if (grid.length === tableGrid.length){
        return true;
    }
}

function reiniciar(){
    puntos.forEach(x => {
        x.style.backgroundColor = colorDefault;
    });
    return (jugadorActivo === 1 ? turnoJugador.textContent = 'Juega '+jugador1 : turnoJugador.textContent = 'Juega '+jugador2);
}

function genera_tabla() {
    var body = document.getElementsByClassName("container")[0];
 
    var tabla   = document.createElement("table");
  
    for (var i = 0; i < alto; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
    
        for (var j = 0; j < ancho; j++) {
            var celda = document.createElement("td");
            celda.setAttribute("class","punto");
            hilera.appendChild(celda);
        }
        tabla.appendChild(hilera);
    }
   body.appendChild(tabla);

} 

btnReiniciar.addEventListener('click', () => {
    reiniciar();
});