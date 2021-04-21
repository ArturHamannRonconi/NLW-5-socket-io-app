import { getCustomRepository, Repository } from 'typeorm'

import Settings from '../entities/Settings'
import SettingsRepository from '../repositories/SettingsRepository'

type SettingsCreate = Pick<Settings, 'chat' | 'username'>

class SettingsService
{
  private settingsRepository: Repository<Settings>
  
  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create(settingsCreate: SettingsCreate): Promise<Settings>
  {

    const userAlreadyExists = await this.settingsRepository.findOne({ username: settingsCreate.username })
    if(userAlreadyExists) throw new Error('User already exists!')  

    const settings = this.settingsRepository.create(settingsCreate)
    await this.settingsRepository.save(settings)

    return settings
  }

}

export { SettingsCreate }
export default SettingsService