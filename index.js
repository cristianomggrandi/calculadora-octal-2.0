const resultado = document.getElementById("calculadora-resultado")
const conta = document.getElementById("calculadora-conta")

const botoesNumerais = document.getElementsByClassName("calculadora-botoes-numero")

for (botao of botoesNumerais) {
    botao.addEventListener("click", e => {
        resultado.textContent = (resultado.textContent !== "0" ? resultado.textContent : "") + e.target.textContent
    })
}

const botoesOperadores = document.getElementsByClassName("calculadora-botoes-operacao")

for (botao of botoesOperadores) {
    botao.addEventListener("click", e => {
        const simbolo = e.target.textContent

        if (["+", "-", "⨯", "÷"].includes(simbolo)) {
            conta.textContent = conta.textContent + resultado.textContent + simbolo

            resultado.textContent = "0"
        } else {
            if (simbolo === "=") {
                const stringConta = (conta.textContent + resultado.textContent).replaceAll("⨯", "*").replaceAll("÷", "/")

                resultado.textContent = eval(stringConta)
                conta.textContent = ""
            }
        }
    })
}
