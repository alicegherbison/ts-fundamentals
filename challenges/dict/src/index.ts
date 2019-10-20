export type Dict<Type> = {
  [key: string]: Type | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<Type, TransformedValues>(
  dict: Dict<Type>,
  fn: (arg: Type, index: number) => TransformedValues
): Dict<TransformedValues> {
  const out: Dict<TransformedValues> = {};

  Object.keys(dict).forEach((dictionaryKey, index) => {
    const thisItem = dict[dictionaryKey];
    if (typeof thisItem !== "undefined") {
      out[dictionaryKey] = fn(thisItem, index);
    }
  });
  return out;
}

mapDict(
  {
    a: "a",
    b: "b",
    c: "c"
  },
  string => ({ value: string })
);

// Array.prototype.reduce, but for Dict
export function reduceDict() {}
