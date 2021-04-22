import { getCustomRepository, Repository } from 'typeorm'

import ConnectionsRepository from '../repositories/ConnectionsRepository'
import Connections from '../entities/Connections'

type ConnectionsCreate = {
  socket_id: string
  user_id: string
  admin_id?: string
  id?: string
}

class ConnectionsService
{
  private connectionRepository: Repository<Connections>
  constructor()
  {
    this.connectionRepository = getCustomRepository(ConnectionsRepository)
  }


  async create({ socket_id, user_id, admin_id, id }: ConnectionsCreate): Promise<Connections>
  {
    const connection = this.connectionRepository.create({ socket_id, user_id, admin_id, id })
    await this.connectionRepository.save(connection)

    return connection
  }

  async findByUserId(user_id: string)
  {
    const connection = await this.connectionRepository.findOne({ user_id })
    return connection
  }
}

export default ConnectionsService