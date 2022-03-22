import {
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer-model";

@Table({
  tableName: "address",
  timestamps: false,
})
export default class AddressModel extends Model {
  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false })
  declare country: string;

  @Column({ allowNull: false })
  declare zipCode: string;

  @BelongsTo(() => CustomerModel)
  declare customerModel: CustomerModel;

  @ForeignKey(() => CustomerModel)
  @Column
  customerId: string;
}
