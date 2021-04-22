import { io } from '../app'

import ConnectionService from '../services/ConnectionsService' 
import UsersService from '../services/UsersService'
import MessagesService from '../services/MessagesService'

type Params = { text: string, email: string }

io.on('connect', socket => {
  const connectionService = new ConnectionService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()

  socket.on('clientFirstAccess', async (params: Params) => {
    const socket_id = socket.id
    const { text, email } = params as Params
    let userId: string

    const userExists = await usersService.findByEmail({ email })

    if(!userExists) {
      const user = await usersService.create({ email })
      userId = user.id

      await connectionService.create({ socket_id, user_id: user.id })
    } else {

      const connection = await connectionService.findByUserId(userExists.id)
      userId = userExists.id
      if(!connection) 
        await connectionService.create({ socket_id, user_id: userExists.id })
      
      connection.socket_id = socket.id
      await connectionService.create(connection)
    }

    await messagesService.create({ user_id: userId, text })
  })
})