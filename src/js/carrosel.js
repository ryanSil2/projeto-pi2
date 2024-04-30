const imagens = document.querySelectorAll(".carousel-item img");
const btn1 = document.querySelectorAll(".b1");
const btn2 = document.querySelectorAll(".b2");
console.log(btn1);
console.log(btn2)

let contador = 0;

btn1.forEach((item) => {
  item.onclick = (event) => {
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
imagens[contador].scrollIntoView();
  
}

function slideNext() {
  contador++;
  imagens[contador].scrollIntoView();
}

// setInterval(slide, 5000)