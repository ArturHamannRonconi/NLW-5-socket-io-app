import { getCustomRepository, Repository } from 'typeorm'

import Messages from '../entities/Messages'
import MessagesRepository from '../repositories/MessagesRepository' 

type MessagesCreate = {
  user_id: string
  text: string
  admin_id?: string
}

class MessagesService
{
  private messagesRepository: Repository<Messages>

  constructor()
  {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create(messagesCreate: MessagesCreate)
  { 
    const message = this.messagesRepository.create(messagesCreate)
    await this.messagesRepository.save(message)
    
    return message
  }

  async listMessages(user: Pick<Messages, 'user_id'>)
  {
    const list = await this.messagesRepository.find(user)
    return list
  }
}

export { MessagesCreate }
export default MessagesService