let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let contador = 1;

//Função para utilizar a voz
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//Função que define a mensagem inicial
function mensagemInicial(){
    exibirTexto("h1", "Jogo do Número Secreto");
    exibirTexto("p", "Escolha um número entre 1 e "+numeroLimite);
}
mensagemInicial();

//Numero aleatório e avalia para que não haja repetição até que 100 números sejam jogados
function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;
    if (quantidadeDeElementos == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//Função que controla a lógica se o número é maior ou menor. Além de dar a funcionabilildade ao botão.
function verificarChute(){
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTexto("h1", "PARABÉNS! Você ganhou!! :)");
        let palavraTentativa = contador > 1 ? "tentativas" : "tentativa";
        let mensagemTentativa = `Você descobriu o número secreto! Depois de ${contador} ${palavraTentativa}!`;
        exibirTexto("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else{
        if (chute > numeroSecreto) {
            exibirTexto("h1", "QUASE! Tente novamente");
            exibirTexto("p", "O número é MENOR que " + chute);
            limparCampo();
            contador++
        }
        else{
            exibirTexto("h1", "QUASE! Tente novamente");
            exibirTexto("p", "O número é MAIOR que " + chute);
            limparCampo();
            contador++
        }
    }
}

//Função para limpar o valor no input após cada tentativa
function limparCampo () {
    chute = document.querySelector("input");
    chute.value = "";
}

//Função que permite o recomeço do jogo
function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    contador = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}