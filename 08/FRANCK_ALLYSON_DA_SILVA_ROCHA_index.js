// Função para sortear a palavra em meio a dois arrays, um de dica e outro de palavras. 
function sorteia(dicas, palavras){
    const indexDica = Math.floor(Math.random() * dicas.length)
    const indexPalavra = Math.floor(Math.random() * palavras[indexDica].length)
   
    return [dicas[indexDica], palavras[indexDica][indexPalavra]]
}

// Função para mostrar as lacunas restantes da palavra sorteada.
function lacunas(palavra, acertos){
    for (i=0; i<palavra.length; i++){
        const letraCerta = acertos.find(letra => letra == palavra[i])

        if (letraCerta == undefined){
            if (palavra[i] != " "){
                palavra = palavra.replace(palavra[i], "_")
            }
        }
    }
    return palavra
}

// Função que valida se a resposta é válida ou não!
function validaResposta(palavra, resposta){
    palavra = palavra.split('')
    const letraEncontrada = palavra.find(letra => letra == resposta)
    
    if(letraEncontrada != undefined){
        return true
    }

    return false
}

// Função para desenhar o boneco no HUD
function desenhaBoneco(chances){
    cabeca = "                         O \n"
    bracoEsquerdo = "                      ¯¯"
    corpo = "||"
    bracoDireito = "¯¯\n"
    pernaEsquerda = "                        /"
    pernaDireita = "\\ \n"

    const boneco = [cabeca, bracoEsquerdo, corpo, bracoDireito, pernaEsquerda, pernaDireita]
    stringBoneco = ""
    for(i=0; i<=chances; i++){
        stringBoneco = stringBoneco + boneco[i]
    }

    console.log(stringBoneco)
}

// Mostra o HUD do Jogo. 
function hud(chances, sorteio, lacunas, erros){
    console.log("\n-----------------------------------------------------")
    console.log("              J O G O   D A   F O R C A              ")
    console.log("-----------------------------------------------------")
    console.log("Dica: "+ sorteio[0] + " | Chances restantes: " + chances + " | Erros: " + erros)
    console.log("-----------------------------------------------------")
    console.log("\n                 Lacunas: " + lacunas + "\n" )
    desenhaBoneco(chances)
    console.log("_____________________________________________________")
}

// Função que testa se a palavra foi acertada.
function acertouPalavra(lacunas){
    if(lacunas.split("").find(underline => underline == "_") == undefined){
        return true
    }
    return false
}

// Verifica se a letra ja foi digitada. 
function letraRepetida(acertos, erros){
    if(acertos.find(letra => letra == resposta) || erros.find(letra => letra == resposta)){
        return true
    }
    return false
}

dicas = [
    "fruta", 
    "carro",
    "estado"
]

palavras = [
    ["laranja", "banana", "tomate", "tangerina", "abacate", "caqui", "acerola", "uva"], 
    ["bmw", "audi", "mercedes", "volvo", "fiat", "chevrolet", "toyota", "mitsubishi"],
    ["minas gerais", "sao paulo", "piaui", "pernambuco", "rio grande do sul", "rio grande do norte", "amazonas"]
]

while(true){

    let chances = 5
    let acertos = []
    let erros = []
    let ganhou = false
    let perdeu = false
    let jogarNovamente = false
    let letraDigitada = false

    const SORTEIO = sorteia(dicas, palavras)

    const readlineSync = require('readline-sync')
    let op = ""

    while(true){

        let lacunasAtuais = lacunas(SORTEIO[1], acertos)

        hud(chances, SORTEIO, lacunasAtuais, erros)
        if(letraDigitada == true){
            console.log("Você já digitou esta letra, tente novamente!")
            letraDigitada = false
        }

        if(chances == 0){
            perdeu = true
            console.log("A palavra era: " + SORTEIO[1])
            console.log("VOCÊ PERDEU!!\n\n")
        }
        
        if(acertouPalavra(lacunasAtuais) == true){
            ganhou = true
            console.log("VOCÊ GANHOU!!!\n\n")
        }

        if(perdeu == true || ganhou == true){
            op = readlineSync.question("Deseja jogar novamente? [S/N]: ")
            if(op == "N" || op == "n"){
                break
            } else {
                jogarNovamente = true
                break
            }
        }

        resposta = readlineSync.question("Digite uma letra: ").toLowerCase()

        if(letraRepetida(acertos, erros) == true){
            letraDigitada = true
        } else {
            if(validaResposta(SORTEIO[1], resposta) == true){
                acertos.push(resposta)
            } else {
                erros.push(resposta)
                chances = chances - 1
            }
        }
        
        console.clear()
    }
    
    if(jogarNovamente == false){
        break
    }
}