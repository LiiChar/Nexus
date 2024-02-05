import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: false })
	password: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: false, default: false })
	verified: boolean;

	@Column({ nullable: false, default: 'default.png' })
	photo: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
