let baseSelecionada = 10

const resultado = document.getElementById("calculadora-resultado")
const conta = document.getElementById("calculadora-conta")

document.onkeydown = e => {
    const numeroPressionado = Number(e.key)

    if (!isNaN(numeroPressionado) && numeroPressionado < baseSelecionada) {
        resultado.textContent = (resultado.textContent !== "0" ? resultado.textContent : "") + numeroPressionado.toString()
    } else {
        switch (e.key) {
            case "*":
            case "x":
            case "/":
            case "+":
            case "-":
                const simbolo = e.key.replace("*", "x").replace("/", "÷")

                conta.textContent = calcularExpressao(conta.textContent + resultado.textContent) + simbolo
                resultado.textContent = "0"

                break
            case "=":
            case "Enter":
                resultado.textContent = calcularExpressao(conta.textContent + resultado.textContent)
                conta.textContent = ""

                break
            case "c":
            case "C":
                if (resultado.textContent !== "0") resultado.textContent = "0"
                else conta.textContent = ""

                break
            case "q":
            case "Q":
                if (resultado.textContent !== "0") {
                    resultado.textContent = Number(resultado.textContent) * Number(resultado.textContent)
                }
                break
            case "r":
            case "R":
                if (resultado.textContent !== "0") {
                    resultado.textContent = Math.sqrt(Number(resultado.textContent))
                }
                break
        }
    }
}

function calcularExpressao(expressao) {
    const regexComparacao = /[\+, ⨯, ÷, \-]/

    const indexOperador = expressao.search(regexComparacao)

    const expressaoDecimal = expressao
        .split(regexComparacao)
        .map(parte => (!isNaN(parte) ? parseInt(parte, baseSelecionada) : parte))
        .join(expressao[indexOperador])

    console.log(expressao[indexOperador])

    const resultado = eval(expressaoDecimal.replaceAll("⨯", "*").replaceAll("÷", "/")).toString(baseSelecionada)

    if (resultado !== NaN && resultado !== Infinity) return resultado

    return 0
}

const botoesNumerais = document.getElementsByClassName("calculadora-botao-numero")

for (botao of botoesNumerais) {
    botao.addEventListener("click", e => {
        resultado.textContent = (resultado.textContent !== "0" ? resultado.textContent : "") + e.target.textContent
    })
}

const botoesOperadores = document.getElementsByClassName("calculadora-botao-operacao")

for (botao of botoesOperadores) {
    botao.addEventListener("click", e => {
        const simbolo = e.target.textContent

        conta.textContent = calcularExpressao(conta.textContent + resultado.textContent) + simbolo

        resultado.textContent = "0"
    })
}

const botaoRaiz = document.getElementsByClassName("calculadora-botao-raiz")[0]

botaoRaiz.addEventListener("click", e => {
    if (resultado.textContent !== "0") {
        resultado.textContent = Math.sqrt(Number(resultado.textContent))
    }
})

const botaoQuadrado = document.getElementsByClassName("calculadora-botao-quadrado")[0]

botaoQuadrado.addEventListener("click", e => {
    if (resultado.textContent !== "0") {
        resultado.textContent = Number(resultado.textContent) * Number(resultado.textContent)
    }
})

const botaoIgual = document.getElementsByClassName("calculadora-botao-igual")[0]

botaoIgual.addEventListener("click", e => {
    resultado.textContent = calcularExpressao(conta.textContent + resultado.textContent)
    conta.textContent = ""
})

const botaoVirgula = document.getElementsByClassName("calculadora-botao-virgula")[0]

botaoVirgula.addEventListener("click", e => {
    if (!resultado.textContent.includes(".") && baseSelecionada === 10) resultado.textContent = resultado.textContent + "."
})

const botaoClear = document.getElementsByClassName("calculadora-botao-clear")[0]

botaoClear.addEventListener("click", e => {
    if (resultado.textContent !== "0") resultado.textContent = "0"
    else conta.textContent = ""
})

const botoesBase = document.getElementsByName("base")

for (botao of botoesBase) {
    botao.addEventListener("change", e => {
        const baseAnterior = baseSelecionada

        switch (e.target.id) {
            case "dec":
                baseSelecionada = 10
                break
            case "bin":
                baseSelecionada = 2
                break
            case "oct":
                baseSelecionada = 8
                break
        }

        for (botao of botoesNumerais) {
            const numeroBotao = Number(botao.textContent)
            if (numeroBotao >= baseSelecionada) botao.disabled = true
            else botao.disabled = false
        }

        resultado.textContent = parseInt(resultado.textContent, baseAnterior).toString(baseSelecionada)
    })
}
