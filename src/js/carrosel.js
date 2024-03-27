const imagens = document.querySelectorAll(".carousel-item img");

    let contador = 0;



    function oi () {

            contador++;

            if (contador > imagens.length -1) {
              contador = 0;
            }
  
     imagens[contador].scrollIntoView();


    
    }

    setInterval(oi, 5000);