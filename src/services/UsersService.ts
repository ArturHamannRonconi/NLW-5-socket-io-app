import { getCustomRepository, Repository } from 'typeorm'

import Users from '../entities/Users'
import UsersRepository from '../repositories/UsersRepository'

type UsersCreate = Pick<Users, 'email'>

class UsersService
{
  private usersRepository: Repository<Users>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create(usersCreate: UsersCreate): Promise<Users>
  {
    
    const emailAlreadyExists = await this.usersRepository.findOne(usersCreate)

    if(emailAlreadyExists) throw new Error('Email already exists!')

    const user = this.usersRepository.create(usersCreate)
    await this.usersRepository.save(user)

    return user
  }
}

export { UsersCreate }
export default UsersService