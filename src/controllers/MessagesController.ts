import { Request, Response } from 'express'

import MessagesService, { MessagesCreate } from '../services/MessagesService'

class MessagesController
{
  async create(request: Request, response: Response): Promise<Response>
  {
    const { user_id, text, admin_id } = request.body as MessagesCreate
    const messagesService = new MessagesService()

    try {
      const message = await messagesService.create({ user_id, text, admin_id })

      response.status(200)
      return response.json({ error: null, body: message })
      
    } catch (error) {
      response.status(400)

      return response.json({ error: error.message, body: null })  
    }

  }
  
  async listMessages(request: Request, response: Response)
  {
    const { userId } = request.params
    const messagesService = new MessagesService()
    
    try {
      const messages = await messagesService.listMessages(userId)

      response.status(200)
      return response.json({ error: null, body: messages })
      
    } catch (error) {
      response.status(400)

      return response.json({ error: error.message, body: null })  
    }

  }
}

export default MessagesController