import { Realm } from '../provider'

export class Users extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  email!: string
  phone!: string
  role!: 'partner' | 'admin' | 'manager' | 'operator'
  status!: 'confirmed' | 'pending'
  creationAt!: number
  userId!: string
  partnerId!: string

  static schema: Realm.ObjectSchema = {
    name: 'Partner',
    properties: {
      _id: 'objectId',
      email: 'string',
      phone: 'string',
      role: 'string',
      status: 'string',
      creationAt: 'double',
      userId: 'string',
      partnerId: 'string',
    },
    primaryKey: 'email',
  }
}
