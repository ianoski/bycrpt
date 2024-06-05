let res_logar = document.getElementById('res_logar')
let logar = document.getElementById('logar')

logar.addEventListener('click',()=>{
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }
    console.log(valores)
    fetch('http://localhost:3000/logar',{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        console.log(dados)
        res_logar.innerHTML = dados.message
    })
    .catch((err)=>{
        console.error("erro ao logar usuário")
    })
})