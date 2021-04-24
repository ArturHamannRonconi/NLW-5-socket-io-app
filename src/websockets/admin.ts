import { io } from '../app'

import ConnectionService from '../services/ConnectionsService' 
import MessagesService from '../services/MessagesService'

io.on('connect', async socket => {
  const connectionService = new ConnectionService()
  const messagesService = new MessagesService()

  const allUserConnections = await connectionService.findAllUsers()

  io.emit('adminListAllUsers', allUserConnections)

  socket.on('adminListMessagesByUser', async (userId, callback) => {
    const messages = await messagesService.listMessages(userId)
    
    callback(messages)
  })

  socket.on('adminSendMessage', async messageInfos => {
    const { user_id, text } = messageInfos

    await messagesService.create({
      user_id,
      text,
      admin_id: socket.id 
    })

    const { socket_id } = await connectionService.findByUserId(user_id)

    io.to(socket_id).emit('adminSendToClient', {
      text,
      socket_id: socket.id
    })

  })

  socket.on('adminUserInSupport', async user_id => {
    await connectionService.updateAdminId({
      user_id,
      admin_id: socket.id
    })

    const allUserConnections = await connectionService.findAllUsers()

    io.emit('adminListAllUsers', allUserConnections)
  })

})