const canvasIndex = document.getElementById('canvas');
const canvas = canvasIndex.getContext('2d');
var cuadros = []; // Array para almacenar los cuadros
var eliminados = []; // Array con los cuadros eliminados
const velocidad = 20; // Velocidad de movimiento
const cuadroSize = 50; // Tamaño de cada cuadro
const suelo = canvasIndex.height - 2; // Posición del suelo
var espaciado = suelo; // Posicion del suelo modificable
var n = 0; // Numero de letras b que entran
var contador = 0; // Numero de letras que entran
const posicionXInicial = 25; // Posición en X del cuadro
const posicionYInicial = 10; // Posición en Y del cuadro

var contadorEntradas = 0; // Para validar las entradas
var invalida = false; // Poner entradas como validas o invalidas

var pEntrada = document.getElementById("p-entrada"); // Parrafo donde se muestra la entrada completa
var pEstado = document.getElementById("p-estado"); // Parrafo donde se muestra el estado de la entrada

var colorAceptado = "#a4dc41"; // Color de fondo cuando se acepta la entrada
var colorRechazado = "#c40606bb"; // Color de fondo cuando se rechaza la entrada

var contenedorEstado = document.querySelector("#contenedor-estado"); // Color de fondo del estado


// Agrega un cuadro al vector de cuadros
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
    espaciado = espaciado - cuadroSize; // Cambia la posicion donde se pondrá el siguiente cuadro
}




// Actualiza el parrafo del INDEX con la entrada completa
function actualizaEntrada (entrada){
    let anterior = pEntrada.textContent;
    pEntrada.textContent = anterior + entrada;
}




// Agregar un evento para detectar las teclas presionadas
window.addEventListener('keydown', function (event) {

    if(event.key === "a"){

        //rgb(181,230, 29) #daa520
        agregarCuadro("darkgoldenrod", "a", espaciado - cuadroSize, contador);
        actualizaEntrada("a");

        if(contadorEntradas !== 0){

            pEstado.textContent = "Invalida";
            invalida = true;
            contenedorEstado.style.backgroundColor = colorRechazado;

        }else{

            contadorEntradas = contadorEntradas + 1;
        }


    }else if(event.key === "b"){

        //rgb(34, 177, 76) #6b8e23
        agregarCuadro("darkcyan", "b", espaciado - cuadroSize, contador);
        actualizaEntrada("b");

        if(invalida=== false){
            n = n + 1;
        }

        if(contadorEntradas !== 1){
            pEstado.textContent = "Invalida";
            invalida = true;
            contenedorEstado.style.backgroundColor = colorRechazado;
        }
        

    }else if(event.key === "c"){

        agregarCuadro("orangered", "c", espaciado - cuadroSize, contador);
        actualizaEntrada("c");

        espaciado = espaciado + cuadroSize*2;
        contadorEntradas = contadorEntradas + 1;

        if(contadorEntradas !== 2){

            pEstado.textContent = "Invalida";
            invalida = true;
            contenedorEstado.style.backgroundColor = colorRechazado;

        }else{

            contadorEntradas = contadorEntradas + 1;

            if(n === 0 && invalida === false){

                pEstado.textContent = "Aceptada";
                contadorEntradas = 4;
                contenedorEstado.style.backgroundColor = colorAceptado;
            }
           
        }


    }else if(event.key === "d"){

        agregarCuadro("orange", "d", espaciado - cuadroSize, contador);
        actualizaEntrada("d");

        espaciado = espaciado + cuadroSize*2;

        if(invalida=== false){
            n = n - 1;
        }

        if(contadorEntradas !== 3){
            pEstado.textContent = "Invalida";
            invalida = true;
        }

        if(n === 0 && invalida === false){

            pEstado.textContent = "Aceptada";
            contadorEntradas = contadorEntradas + 1;
            contenedorEstado.style.backgroundColor = colorAceptado;

        }else{
            
            pEstado.textContent = "Invalida";
            contenedorEstado.style.backgroundColor = colorRechazado;
        }
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
        canvas.font = '25px Arial'; // Fuente y tamaño del texto
        canvas.fillText(i.letra, i.x + 20, i.y + 35); // Dibujar la letra en el centro del cuadro

        // Agregar un borde al cuadro
        canvas.strokeStyle = "white"; // Color del borde
        canvas.lineWidth = 2; // Ancho del borde
        canvas.strokeRect(i.x, i.y, i.width, i.height); // Dibuja el borde alrededor del cuadro existente

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