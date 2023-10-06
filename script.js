const canvasIndex = document.getElementById('canvas');
const canvas = canvasIndex.getContext('2d');
const cuadros = []; // Array para almacenar los cuadros
const velocidad = 15; // Velocidad de movimiento
const cuadroSize = 50; // Tamaño de cada cuadro
const suelo = canvasIndex.height - cuadroSize; // Posición del suelo
var espaciado = suelo;
var n = 0;
var contador = 0;
const posicionXInicial = 25;
const posicionYInicial = 10;


function agregarCuadro(xi, yi, w, h, c, l){
    cuadros.push({
        x: xi,
        y: yi,
        width: w,
        height: h,
        color: c,
        letra: l,
    });
    contador = contador + 1;
    espaciado = espaciado - cuadroSize;
}

// Agregar un evento para detectar las teclas presionadas
window.addEventListener('keydown', function (event) {

    if(event.key === "a"){

        /*cuadros[contador] = {
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "blue",
            letra: "a",
        }*/
        cuadros.push({
            x: posicionXInicial,
            y: posicionYInicial,
            width: cuadroSize,
            height: cuadroSize,
            color: "blue",
            letra: "a",
            mover: true,
            espaciado: espaciado - cuadroSize,
        });
        contador = contador + 1;
        espaciado = espaciado - cuadroSize;

    }else if(event.key === "b"){

        /*cuadros[contador] = {
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "green",
            letra: "b",
        }*/
        cuadros.push({
            x: posicionXInicial,
            y: posicionYInicial,
            width: cuadroSize,
            height: cuadroSize,
            color: "green",
            letra: "b",
            mover: true,
            espaciado: espaciado - cuadroSize,
        });
        contador = contador + 1;
        n = n + 1;
        espaciado = espaciado - cuadroSize;

    }else if(event.key === "c"){

        /*cuadros[contador] = {
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "red",
            letra: "c",
        }*/
        cuadros.push({
            x: posicionXInicial,
            y: posicionYInicial,
            width: cuadroSize,
            height: cuadroSize,
            color: "red",
            letra: "c",
            mover: true,
            espaciado: espaciado - cuadroSize,
        });
        contador = contador + 1;

    }else if(event.key === "d"){

        /*cuadros[contador] = {
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "orange",
            letra: "d",
        }*/
        cuadros.push({
            x: posicionXInicial,
            y: posicionYInicial,
            width: cuadroSize,
            height: cuadroSize,
            color: "orange",
            letra: "d",
            mover: true,
            espaciado: espaciado - cuadroSize,
        });
        contador = contador + 1;

    }

});




function dibujar(){
    canvas.clearRect(0,0,canvasIndex.width, canvasIndex.height);

    //Dibuja todos los cuadros
    cuadros.forEach(function(i){
        canvas.fillStyle = i.color;
        canvas.fillRect(
            i.x,
            i.y,
            i.width,
            i.height
        );

        canvas.fillStyle = 'white'; // Color del texto
        canvas.font = '30px Arial'; // Fuente y tamaño del texto
        canvas.fillText(i.letra, i.x + 20, i.y + 35); // Dibujar la letra en el centro del cuadro


        if(i.y >= i.espaciado && i.mover === true){
            i.y = i.espaciado;
            i.mover = false;

        }else if(i.mover === true){
            i.y = i.y + velocidad;
        }
        console.log(i);

    });
    
}

function gameLoop(){
    dibujar();
}

setInterval(gameLoop, 1000/velocidad);