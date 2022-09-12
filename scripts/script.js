var rotatePosicaoInicial = - 3 * 30
var rotate = 15 + rotatePosicaoInicial;
var signoAtual = 0;
var tempo;
var pararGiro = false;
var pararSigno;
var velocidade = 15;

document.addEventListener("DOMContentLoaded", function () {
  carregaDadosSignos();
  document.getElementById("img").style.transform = "rotate(" + rotate + "deg)";
  start();

  function start() {
    const nomeSignoAtual = document.querySelector(".nome-signo");
    const imagemSignoAtual = document.querySelector(".imagem-signo");
    const previsaoSignoAtual = document.querySelector(".previsao-signo");
    const previsaoNomeSignoAtual = document.querySelector(".previsao-nome-signo");
    const previsao = document.querySelector(".previsao");
    const botaoReiniciar = document.querySelector(".botao-reiniciar")

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
        previsaoSignoAtual.innerHTML = previsaoSignos[signoAtual] + "<span>(fonte: www.metropoles.com)</span>";
        previsao.classList.remove("oculto");
        botaoReiniciar.classList.remove("oculto");
      }
    }
    tempo = setInterval(contarSegundos, velocidade);
  };

  document.querySelector(".botao-enviar").addEventListener("click", function () {
    const valorData = document.querySelector(".data-nascimento").value;
    const botaoEnviar = document.querySelector(".botao-enviar");
    const [year, month, day] = valorData.split('-');
    const dataAniversario = new Date(+year, +month - 1, +day);
    pararGiro = true;
    pararSigno = calculaSigno(dataAniversario) - 1;
    botaoEnviar.classList.add("oculto");
  });

  document.querySelector(".botao-reiniciar").addEventListener("click", function () {
    const botaoEnviar = document.querySelector(".botao-enviar");
    const botaoReiniciar = document.querySelector(".botao-reiniciar")
    const previsao = document.querySelector(".previsao");
    pararGiro = false;
    botaoEnviar.classList.remove("oculto");
    botaoReiniciar.classList.add("oculto");
    previsao.classList.add("oculto");

    start();
  });

  function paraContarSegundos() {
    clearInterval(tempo);
    tempo = null;
  }
});