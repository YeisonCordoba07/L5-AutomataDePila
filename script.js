const canvasIndex = document.getElementById('canvas');
const canvas = canvasIndex.getContext('2d');
const cuadros = []; // Array para almacenar los cuadros
const velocidad = 5; // Velocidad de movimiento
const cuadroSize = 50; // Tamaño de cada cuadro
const suelo = canvas.height - cuadroSize; // Posición del suelo
var espaciado = suelo;
var n = 0;
var contador = 0;




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
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "blue",
            letra: "a",
        });
        contador = contador + 1;
        espaciado = espaciado + cuadroSize;

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
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "green",
            letra: "b",
        });
        contador = contador + 1;
        n = n + 1;
        espaciado = espaciado + cuadroSize;

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
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "red",
            letra: "c",
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
            x: cuadroSize,
            y: cuadroSize,
            width: cuadroSize,
            height: cuadroSize,
            width: cuadroSize,
            color: "orange",
            letra: "d",
        });
        contador = contador + 1;

    }

});




function dibujar(){
    canvas.clearRect(0,0,canvas.width, canvas.height);

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

        i.y = i.y + velocidad;
        if(i.y >= espaciado){
            i.y = espaciado;
        }

    });
}

function gameLoop(){
    dibujar();
}

setInterval(gameLoop, 1000/velocidad);