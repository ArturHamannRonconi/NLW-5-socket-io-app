import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uui } from 'uuid'

@Entity('settings')
class Settings
{
  @PrimaryColumn()
  id: string

  @Column()
  username: string
  
  @Column()
  chat: boolean

  @UpdateDateColumn()
  updated_at: Date

  @CreateDateColumn()
  created_at: Date

  constructor()
  {
    if(!this.id) this.id = uui()
  }

}

export default Settings