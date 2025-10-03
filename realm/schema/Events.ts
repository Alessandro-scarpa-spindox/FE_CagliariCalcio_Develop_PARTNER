import { Realm } from '../provider'

export class Events extends Realm.Object {
  _id!: Realm.BSON.ObjectId
  date!: number
  day!: number
  opponent?: string
  description?: string
  status!: 'opened' | 'closed'
  spaces!: Realm.Results<Space> // Utilizzo di Realm.Results per rappresentare una collezione di oggetti Space
  partners!: Realm.Results<Partner>

  static schema: Realm.ObjectSchema = {
    name: 'Events',
    properties: {
      _id: 'objectId',
      opponent: 'string',
      date: 'double',
      day: 'int',
      league: 'string',
      description: { type: 'string', optional: true },
      status: 'string',
      spaces: {
        type: 'list',
        objectType: 'Space',
      },
      partners: {
        type: 'list',
        objectType: 'Partner',
      },
    },
    primaryKey: '_id',
  }
}

export class Space extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Space',
    properties: {
      color: 'string',
    },
  }
}

export class Partner extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Partner',
    properties: {
      maxGuests: 'int',
    },
  }
}
