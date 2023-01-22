export type Collection = "Athlete" | "Activity";
export type Where = {
  field: string;
  op: "<" | "<=" | "==" | ">=" | ">" | "!=" | "array-contains" | "array-contains-any" | "in" | "not-in";
  value: string | number | boolean;
};
