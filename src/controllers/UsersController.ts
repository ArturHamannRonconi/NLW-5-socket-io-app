import { Request, Response } from 'express'

import UsersService, { UsersCreate } from '../services/UsersService'

class UsersController
{
  async create(request: Request, response: Response): Promise<Response>
  {
    const { email }: UsersCreate = request.body
    const usersService = new UsersService()

    try {
      const user = await usersService.create({ email })
      response.status(200)

      return response.json({ error: null, body: user })    
    } catch (error) {
      response.status(400)

      return response.json({ error: error.message, body: null })
    }

  }
}

export default UsersController