import { db } from "../config/firebase";
import { Collection } from "../types/Firebase.types";

type Data = {
  id?: string | number,
  [key: string]: string | number | boolean | undefined,
};

async function create(collection: Collection, data: Data) {
  if(data.id) {
    const { id, ...rest } = data;
    db.collection(collection).doc(id.toString()).set(rest);
  } else {
    db.collection(collection).doc().create(data);
  }
}

async function createAll(collection: Collection, data: Data[]) {
  const promises = data.map((d) => create(collection, d));

  return await Promise.all(promises);
}

function get(collection: Collection, id: number | string) {
  console.log(collection, id)
  return db
    .collection(collection)
    .doc(id.toString())
    .get()
}

export default {
  create,
  createAll,
  get,
};
