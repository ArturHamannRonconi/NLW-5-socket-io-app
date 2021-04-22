import express from 'express'
import path from 'path'
import { renderFile } from 'ejs'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import './database'
import routes from './routes'

const app               = express()
const publicDir: string = path.join(__dirname, '..', 'public')

app.set('views', publicDir)
app.set('view engine', 'html')
app.engine('html', renderFile)
app.use(express.static(publicDir))

app.get('/page/client', (req, res) => res.render('html/client.html'))
app.use(express.json())
app.use(routes)


const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket: Socket) => console.log(`Connection has been concluded... ${socket.id}`))

export { server, io }