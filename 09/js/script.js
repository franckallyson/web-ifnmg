let tamanhoColunas = [1, 2, 3, 4, 3, 2, 1]
let jogador1;
let jogador2;
let jogadorAtual;
let computador = false;
// Variável para armazenar a Div de Inicio que será removida ao registrar os nomes
let inicio;

// Função para iniciar contra o computador
function iniciaComputador() {
    computador = true;
    if (jogadorAtual == undefined) {
        registraNomes()
    }

    setTimeout(function () {
        console.log("Vez do computador");
        
        var n = tamanhoColunas.reduce(function (total, numero) {
            return total + numero;
        }, 0)

        var m = tamanhoColunas.reduce(function (anterior, atual) {
            return anterior > atual ? anterior : atual
        })

        var jogadaComputador = n % (m+1)
        //var jogadaComputador = 0
        console.log(n)
        console.log(m)
        console.log(jogadaComputador)

        if (jogadaComputador == 0) {
            document.getElementById('img' + tamanhoColunas.indexOf(m) + "1").click()
        } else {
            for(var i = 0; i < tamanhoColunas.length; i++){
                if(jogadaComputador < tamanhoColunas[i]){
                    console.log('img' + i + ((tamanhoColunas[i]+1)-jogadaComputador))
                    document.getElementById('img' + i + ((tamanhoColunas[i]+1)-jogadaComputador)).click()
                    break
                } else if(jogadaComputador == tamanhoColunas[i]){
                    document.getElementById('img' + i + '1').click()
                    break
                }   
            }
        }
    }, 2000);

}

// Função para trocar os nomes dos jogadores
function trocarNomes() {
    reiniciaTabuleiro()
    document.getElementById('container').appendChild(inicio)
}

// Função para remover o inicio 
function removeInicio() {
    inicio = document.getElementById('inicio')
    document.getElementById('inicio').remove()
    document.getElementById('vez').classList.remove('esconder')
}

// Função que registra o nome dos jogadores
function registraNomes() {
    jogador1 = document.getElementById('player1').value
    jogador2 = document.getElementById('player2').value
    if (jogador1 == "") {
        jogador1 = "Jogador 1"
    }
    if (jogador2 == "") {
        jogador2 = "Jogador 2"
    }
    if(computador == true){
        jogador1 = "Computador"
    }

    jogadorAtual = jogador1
    console.log(jogadorAtual)
    document.getElementById('jogador').textContent = jogadorAtual

}

// Função que reinicia o tabuleiro
function reiniciaTabuleiro() {
    tamanhoColunas = [1, 2, 3, 4, 3, 2, 1]
    jogadorAtual = jogador1

    document.getElementById('jogador').textContent = jogadorAtual

    for (var i = 0; i < tamanhoColunas.length; i++) {
        for (var j = 1; j <= tamanhoColunas[i]; j++) {
            document.getElementById('img' + i + j).classList.remove('esconder')
        }
    }

    document.getElementById('reiniciar').classList.add('esconder')
    document.getElementById('trocar-nomes').classList.add('esconder')
}

// Função para quando o usuário colocaro mouse sobre o palito
function palitoSelecionado(x, y) {
    for (var i = y; i <= tamanhoColunas[x]; i++) {
        const imagem = document.getElementById('img' + x + i)
        imagem.src = "images/Palito-selecionado.png"
    }
}

// Função para quando o usuário retirar o mouse de cima do palito
function palitoDeselecionado(x, y) {
    for (var i = y; i <= tamanhoColunas[x]; i++) {
        document.getElementById('img' + x + i).src = "images/Palito.png"
    }
}

// Função que realiza as operações necessárias em cada clique no palito
function palitoClicado(x, y) {
    for (var i = y; i <= tamanhoColunas[x]; i++) {
        document.getElementById('img' + x + i).src = "images/Palito.png"
        document.getElementById('img' + x + i).classList.add('esconder')
    }

    tamanhoColunas[x] = y - 1

    if (verificaVitoria() == true) {
        document.getElementById('vencedor').textContent = jogadorAtual
        document.getElementById('modal-vitoria').click()

        document.getElementById('reiniciar').classList.remove('esconder')
        document.getElementById('trocar-nomes').classList.remove('esconder')
    } else {

        if (jogadorAtual == jogador1) {
            jogadorAtual = jogador2
        } else {
            jogadorAtual = jogador1
        }

        document.getElementById('jogador').textContent = jogadorAtual
    }

    if ((jogadorAtual == jogador1) && (computador == true)) {
        iniciaComputador()
    }
}

// Função que verifica a vitória do jogador. 
function verificaVitoria() {
    for (var i = 0; i < tamanhoColunas.length; i++) {

        if (tamanhoColunas[i] != 0) {
            return false
        }
    }
    computador = false
    return true
}
