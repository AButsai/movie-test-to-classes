import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.js'
import moment from 'moment'

@Entity()
export class Movies extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  director!: string

  @Column()
  releaseDate!: string

  @BeforeInsert()
  @BeforeUpdate()
  validateReleaseDate() {
    const currentDate = new Date()
    const releaseDate = moment(this.releaseDate, 'DD-MM-YYYY', true)
    if (releaseDate.isValid() && !releaseDate.isSameOrBefore(currentDate)) {
      throw new Error('Release date cannot be in the future')
    }
  }

  @ManyToOne('User', 'movies')
  user!: User
}
