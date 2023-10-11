const resultado = document.getElementById("calculadora-resultado")
const conta = document.getElementById("calculadora-conta")

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

        conta.textContent = conta.textContent + resultado.textContent + simbolo

        resultado.textContent = "0"
    })
}

const botaoIgual = document.getElementsByClassName("calculadora-botao-igual")[0]

botaoIgual.addEventListener("click", e => {
    const stringConta = (conta.textContent + resultado.textContent).replaceAll("⨯", "*").replaceAll("÷", "/")

    resultado.textContent = eval(stringConta)
    conta.textContent = ""
})

const botaoVirgula = document.getElementsByClassName("calculadora-botao-virgula")[0]

botaoVirgula.addEventListener("click", e => {
    if (!resultado.textContent.includes(".")) resultado.textContent = resultado.textContent + "."
})
