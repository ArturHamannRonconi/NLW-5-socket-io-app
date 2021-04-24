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

  async findAllUsers()
  {
    const connections = this.connectionRepository.find({
      where: { admin_id: null },
      relations: ['User']
    })

    return connections
  }

  async finBySocketId(socket_id: string)
  {
    const connection = await this.connectionRepository.findOne({ socket_id })
    return connection
  }

  async updateAdminId(info)
  {
    const { admin_id, user_id } = info

    await this.connectionRepository
      .createQueryBuilder()
      .update(Connections)
      .set({ admin_id })
      .where('user_id = :user_id', { user_id })
      .execute()
  } 
}

export default ConnectionsService