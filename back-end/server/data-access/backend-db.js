import Id from '../Id'
const TODO_COLLECTION = 'todo'
export default function makeBackendDB({ makeDb }) {

  async function insert({ id: _id = Id.makeId(), ...todo }) {
    const db = await makeDb()
    const result = await db
      .collection(TODO_COLLECTION)
      .insertOne({ _id, ...todo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

  async function findAll({ maximumNumberOfResults = Number.MAX_SAFE_INTEGER, query, limit = Number.MAX_SAFE_INTEGER, skip = 0, orderBy } = {}) {
    const db = await makeDb()
    const cursor = await db.collection(TODO_COLLECTION).find(query);
    const paginated = cursor.sort({ 'addedAt': -1 }).skip(skip).limit(limit)
    const result = await paginated.toArray()
    return {
      count: await cursor.count(),
      limit,
      skip,
      result
    }
  }

  async function update({ id: _id, ...todoInfo }) {
    const db = await makeDb()
    const result = await db
      .collection(TODO_COLLECTION)
      .updateOne({ _id }, { $set: { ...todoInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...todoInfo } : null
  }

  async function remove({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection(TODO_COLLECTION).deleteOne({ _id })
    return result.deletedCount
  }

  return Object.freeze({
    insert,
    findAll,
    update,
    remove
  })
}
