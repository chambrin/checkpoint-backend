import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
@ObjectType()
export class Country extends BaseEntity {
    @PrimaryColumn()
    @Field()
    code!: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    emoji!: string;

    @Column()
    @Field()
    continent!: string;
}