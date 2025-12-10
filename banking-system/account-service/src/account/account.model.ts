import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface AccountAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  balance?: number;
}

@Table
export class Account extends Model<AccountAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  declare balance: number;
}
