import { getCustomRepository, Repository } from 'typeorm'

import Users from '../entities/Users'
import UsersRepository from '../repositories/UsersRepository'

type UsersCreate = Pick<Users, 'email'>

class UsersService
{
  private usersRepository: Repository<Users>

  constructor()
  {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(email: string): Promise<Users>
  {
    
    const emailAlreadyExists = await this.usersRepository.findOne({ email })

    if(emailAlreadyExists) throw new Error('Email already exists!')

    const user = this.usersRepository.create({ email })
    await this.usersRepository.save(user)

    return user
  }

  async findByEmail(email: string)
  {
    const user = await this.usersRepository.findOne({ email })
    return user
  }
}

export { UsersCreate }
export default UsersService