import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as setUuid } from 'uuid'

import User from './Users'

@Entity('messages')
class Messages
{
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string
  
  @Column()
  text: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  User: User

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: Date

  constructor()
  {
    if(!this.id) this.id = setUuid()
  }
}

export default Messages