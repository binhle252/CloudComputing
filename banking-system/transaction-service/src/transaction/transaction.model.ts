import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fromAccountId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  toAccountId: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'completed',
  })
  status: string;
}
