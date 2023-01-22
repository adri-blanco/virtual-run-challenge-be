import { db } from "../config/firebase";
import { Collection, Where } from "../types/Firebase.types";

type Data = {
  id?: string | number;
  [key: string]: string | number | boolean | undefined;
};

async function create(collection: Collection, data: Data) {
  if (data.id) {
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
  return db.collection(collection).doc(id.toString()).get();
}

type GetAllFunction =
  | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

function getAll(collection: Collection, whereConditions?: Where[], orderBy?: string) {
  let func: GetAllFunction = db.collection(collection);

  if (whereConditions) {
    whereConditions.forEach((w) => {
      func = func.where(w.field, w.op, w.value);
    });
  }

  if (orderBy) {
    func = func.orderBy(orderBy);
  }

  return func.get().then((docs) => {
    const items: object[] = [];
    docs.forEach((item) => items.push(item.data()));
    return items;
  });
}

export default {
  create,
  createAll,
  get,
  getAll,
};
