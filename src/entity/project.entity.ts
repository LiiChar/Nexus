import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity({ name: 'project' })
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: false })
	title!: string;

	@OneToOne(() => Users, (user) => user.id)
	leader_id!: string;

	@Column({ nullable: true })
	description!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
