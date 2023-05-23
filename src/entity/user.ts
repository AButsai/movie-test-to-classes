import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ErrorEmailNotValid } from '../errors/ErrorProcessing.js'
import { Movies } from './movie.js'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ default: '' })
  password!: string

  @Column({ unique: true, default: '' })
  email!: string

  @BeforeInsert()
  validateEmail() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new ErrorEmailNotValid()
    }
  }

  @OneToMany('Movies', 'user')
  movies!: Movies[]
}
