import { getCustomRepository, Repository } from 'typeorm'

import Settings from '../entities/Settings'
import SettingsRepository from '../repositories/SettingsRepository'

type SettingsCreate = Pick<Settings, 'chat' | 'username'>

class SettingsService
{
  private settingsRepository: Repository<Settings>
  
  constructor()
  {
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

  async findByUsername(username: string)
  {
    const settings = await this.settingsRepository.findOne({ username })
    return settings
  }

  async update({ username, chat }: { username: string, chat: boolean })
  {
    await this.settingsRepository.createQueryBuilder()
      .update(Settings)
      .set({ chat })
      .where('username = :username', { username })
      .execute()
  }
}

export { SettingsCreate }
export default SettingsService