import { Request, Response } from 'express'

import SettingsService, { SettingsCreate } from '../services/SettingsService'

class SettingsController
{

  async create(request: Request, response: Response): Promise<Response>
  {
    const { chat, username }: SettingsCreate = request.body
    const settingsService = new SettingsService()
    
    try {
      const settings = await settingsService.create({ chat, username }) 
      response.status(200)

      return response.json({ error: null, body: settings })
    } catch(error) {
      response.status(400)
      
      return response.json({ error: error.message, body: null })
    }

  }

  async findByUsername(request: Request, response: Response): Promise<Response>
  {
    const { username } = request.params
    const settingsService = new SettingsService()
    
    const settings = await settingsService.findByUsername(username)

    return response.json(settings)
  }

  async update(request: Request, response: Response)
  {
    const { username } =  request.params
    const { chat } = request.body

    const settingsService = new SettingsService()
    const settings = await settingsService.update({ username, chat })

    return response.json(settings)
  }
}

export default SettingsController