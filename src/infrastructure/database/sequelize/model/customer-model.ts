import {
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import AddressModel from "./address-model";

@Table({
  tableName: "customer",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare rewardPoints: number;

  @HasMany(() => AddressModel)
  declare address: AddressModel[];
}
