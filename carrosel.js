const imagens = document.querySelectorAll(".carousel-item img");
const btn1 = document.querySelectorAll(".b1");
const btn2 = document.querySelectorAll(".b2");

let contador = 0;

btn1.forEach((item) => {
  item.onclick = () => {
    slideBack();
  }
})

btn2.forEach((item) => {
  item.onclick = () => {
    slideNext();
  }
})

function slide() {
  contador++;

  if (contador > imagens.length -1) {
    contador = 0;
  }

  imagens[contador].scrollIntoView();
}

function slideBack() {
contador--;

if (contador < imagens.length -1) {
  contador = imagens.length -1;
}
imagens[contador].scrollIntoView();
  
}

function slideNext() {
  contador++;

  if (contador > imagens.length -1) {
    contador = 0;
  }
  imagens[contador].scrollIntoView();
}

setInterval(slide, 5000)