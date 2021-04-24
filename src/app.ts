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
app.get('/page/admin', (req, res) => res.render('html/admin.html'))

app.use(express.json())
app.use(routes)

const server = createServer(app)
const io = new Server(server)
export { server, io }