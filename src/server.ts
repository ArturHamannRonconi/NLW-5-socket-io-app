import { createServer } from 'http'
import express from 'express'
import { Server, Socket } from 'socket.io'

import './database'
import routes from './routes'

const app = express()

const http = createServer(app)
const io = new Server(http)

io.on('connection', (socket: Socket) => console.log(`Connection has been concluded... ${socket.id}`))

app.use(express.json())
app.use(routes)

http.listen(3333, () => console.log('Server is running on port 33333...'))