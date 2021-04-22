import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as setUuid } from 'uuid'

import User from '../entities/Users'

@Entity('connections')
class Connections
{
  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  User: User

  @Column()
  user_id: string

  @Column()
  socket_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor()
  {
    if(!this.id) this.id = setUuid()
  }
}

export default Connections