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

  return Object.freeze({
    insert
  })
}
