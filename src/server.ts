import express from 'express'
import './database'

const app = express()


/**
 * GET    = buscas
 * POST   = criação
 * PUT    = alteração
 * DELETE = deletar
 * PATCH  = alterar informação específica
 */

app.get('/', (request, response) => response.json({ message: 'Olá NLW#5' }))

app.post('/', (request, response) => response.json({ message: 'Usuário salvo com sucesso' }))


app.listen(3333, () => console.log('Server is running on port 33333...'))