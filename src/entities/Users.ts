import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'
import { v4 as setUuid } from 'uuid'

@Entity('users')
class Users
{
  @PrimaryColumn()
  id: string

  @Column()
  email: string

  @CreateDateColumn()
  created_at: Date

  constructor()
  {
    if(!this.id) this.id = setUuid()
  }
}

export default Users