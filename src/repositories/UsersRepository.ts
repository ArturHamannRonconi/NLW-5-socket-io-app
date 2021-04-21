import { Repository, EntityRepository } from 'typeorm'

import Users from '../entities/Users'

@EntityRepository(Users)
class UserRepository extends Repository<Users>
{

}

export default UserRepository