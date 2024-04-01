const box = document.querySelector(".carousel");
const imagens = document.querySelectorAll(".carousel-item img");

let contador = 0;



function oi () {

        contador++;

        if (contador > imagens.length -1) {
          contador = 0;
        }

 imagens[contador].scrollIntoView();

 console.log(contador)

}

function tchau() {

  imagens[1].scrollIntoView();
}

function p() {
  imagens[0].scrollIntoView();
}


setInterval(oi, 5000);