let resposta = document.getElementById('resposta')
let logar = document.getElementById('logar')
let gravar = document.getElementById('gravar')


gravar.addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value 
    const senha = document.getElementById('senha').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha
    }
    console.log(valores)

    fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)
            resposta.innerHTML = 'Cadastro feito com sucesso!' 
        })

        .catch((err) => {
            console.error("erro ao gravar no banco de dados!", err)
        })
})

