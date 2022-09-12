var rotatePosicaoInicial = - 3 * 30
var rotate = 15 + rotatePosicaoInicial;
var signoAtual = 0;
var tempo;
var pararGiro = false;
var pararSigno;
var velocidade = 20;

document.addEventListener("DOMContentLoaded", function () {
  recuperaImagemSignos();
  document.getElementById("img").style.transform = "rotate(" + rotate + "deg)";
  start();

  function start() {
    const nomeSignoAtual = document.querySelector(".nome-signo");
    const imagemSignoAtual = document.querySelector(".imagem-signo");
    const previsaoSignoAtual = document.querySelector(".previsao-signo");
    const previsaoNomeSignoAtual = document.querySelector(".previsao-nome-signo");
    const previsao = document.querySelector(".previsao");

    function contarSegundos() {
      if (rotate == -360) { rotate = 0 }
      rotate = rotate - 1;
      if (rotate % 30 == 0) {
        signoAtual++;
        if (signoAtual == 12) signoAtual = 0;
        nomeSignoAtual.innerHTML = nomeSignos[signoAtual];
        imagemSignoAtual.setAttribute("src", imagemSignosURL[signoAtual]);
      }
      document.getElementById("img").style.transform = "rotate(" + rotate + "deg)";
      if (pararGiro && (rotate == 15 - pararSigno * 30 + rotatePosicaoInicial)) {
        paraContarSegundos();
        previsaoNomeSignoAtual.innerHTML = "Previsão para o signo de " + nomeSignos[signoAtual];        
        previsaoSignoAtual.innerHTML = previsaoSignos[signoAtual] + " (fonte: www.metropoles.com)";
        previsao.classList.remove("oculto");
      }
    }
    tempo = setInterval(contarSegundos, velocidade);
  };

  document.querySelector(".botao-enviar").addEventListener("click", function () {
    pararGiro = true;
    pararSigno = signoAtual;
  });

  function paraContarSegundos() {
    clearInterval(tempo);
    tempo = null;
  }
});