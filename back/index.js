const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const conn = require('./db/conn')
const Usuario = require('./model/Usuario')

const PORT = 3000
const hostname = 'localhost'
/*-----------------------------------------*/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
/*-----------------------------------------*/
app.post('/logar', async (req, res) => {
    const login = req.body
    console.log("log = ",login)

    try {
        const pesq = await Usuario.findOne({ where: { email: login.email }, raw: true })
        console.log("pesq = ",pesq)
        if (pesq === null) {
            console.log("Usuário não existe no banco de dados!")
            res.status(404).json({ message: "Usuário não existe no banco de dados!" })
        } else if (pesq.email == login.email) {
            bcrypt.compare(login.senha, pesq.senha, (err, result) => {
                if (err) {
                    console.log("Erro ao verificar a criptografia!")
                    res.status(500).json({ message: "Erro ao verificar criptografar" })
                }else if(result){
                    console.log("Senha correta!")
                    res.status(200).json({ message: "Senha correta!" })
                }else{
                    console.log("Senha incorreta!")
                    res.status(404).json({ message: "Senha incorreta, tente novamente." })
                }
            })
        }

    } catch (err) {
        console.error("Usuário não encontrado no banco de dados!", err)
        res.status(500).json({ message: "Erro ao consultar o usuário no banco de dados!" })

    }
})
app.post('/cadastrar', (req, res) => {
    const cad = req.body
    console.log(cad)

    bcrypt.hash(cad.senha, 10, async (err, hash) => {
        if (err) {
            console.log("Erro ao gerar o hash!")
            res.status(500).json({ message: "Erro ao criptografar a senha" })
        }
        try {
            const grav = await Usuario.create(
                { nome: cad.nome, email: cad.email, senha: hash })
            console.log(grav)

            res.status(200).json(grav)

        } catch (err) {
            console.error("Erro ao gravar dados", err)
            res.status(200).json({ message: "Erro ao gravar os dados" })
        }
    })

})
app.get('/', (req, res) => {
    res.status(200).json({ message: "Aplicação está rodando!" })
})

/*-----------------------------------------*/
conn.sync().then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((err) => {
    console.error("Erro de conexão com o banco de dados!", err)
})