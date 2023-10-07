const canvasIndex = document.getElementById('canvas');
const canvas = canvasIndex.getContext('2d');
var cuadros = []; // Array para almacenar los cuadros
var eliminados = []; // Array con los cuadros eliminados
const velocidad = 20; // Velocidad de movimiento
const cuadroSize = 50; // Tamaño de cada cuadro
const suelo = canvasIndex.height - cuadroSize; // Posición del suelo
var espaciado = suelo;
var n = 0;
var contador = 0;
const posicionXInicial = 25;
const posicionYInicial = 10;


//Agrega un cuadro al vector de cuadros
function agregarCuadro(colorC, letraC, espaciadoC, posicionC){
    cuadros.push({
        x: posicionXInicial,
        y: posicionYInicial,
        width: cuadroSize,
        height: cuadroSize,
        color: colorC,
        letra: letraC,
        mover: true,
        espaciado: espaciadoC,
        posicion: posicionC,
    });
    contador = contador + 1;
    espaciado = espaciado - cuadroSize;
}

// Agregar un evento para detectar las teclas presionadas
window.addEventListener('keydown', function (event) {

    if(event.key === "a"){

        agregarCuadro("rgb(181,230,29)", "a", espaciado - cuadroSize, contador);

    }else if(event.key === "b"){

        agregarCuadro("rgb(34,177,76)", "b", espaciado - cuadroSize, contador);
        n = n + 1;

    }else if(event.key === "c"){

        agregarCuadro("red", "c", espaciado - cuadroSize, contador);
        espaciado = espaciado + cuadroSize*2;

    }else if(event.key === "d"){

        agregarCuadro("orange", "d", espaciado - cuadroSize, contador);
        espaciado = espaciado + cuadroSize*2;
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
            if(i.letra === "c" || i.letra === "d"){

                eliminados.push(cuadros[i.posicion]);
                eliminados.push(cuadros[i.posicion - 1]);
                cuadros = cuadros.filter(elemento => elemento.posicion < i.posicion -1);
                contador = contador - 2;
            }

        }else if(i.mover === true){
            i.y = i.y + velocidad;
        }

    });

    // Anima eliminación de cuadros
    eliminados.forEach(function(i){

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
        if(i.width >= 2){
            i.width = i.width - 4;
            i.height = i.height - 4;
            i.x = i.x + 2;
            i.y = i.y + 2;
        }else{
            eliminados.pop();
        }
    });
}

function gameLoop(){
    dibujar();
}

setInterval(gameLoop, 1000/velocidad);