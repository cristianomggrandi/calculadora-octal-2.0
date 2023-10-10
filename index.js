const resultado = document.getElementById("calculadora-resultado")

const botoesNumerais = document.getElementsByClassName("calculadora-botoes-numero")

for (botao of botoesNumerais) {
    botao.addEventListener("click", e => {
        const resultadoNumerico = Number(resultado.textContent)

        resultado.textContent = resultadoNumerico + Number(e.target.textContent)
    })
}
