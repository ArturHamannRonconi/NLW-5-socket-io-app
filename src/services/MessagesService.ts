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

  async listMessages(user_id: string)
  {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['User']
    })

    const messages = list.reduce((messages, message) => {
      messages.push({
        isClientMessage: message.admin_id === null,
        text: message.text,
        created_at: message.created_at
      })
      return messages
    }, [])

    return messages
  }
}

export { MessagesCreate }
export default MessagesService