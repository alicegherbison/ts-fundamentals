export type Dict<Type> = {
  [key: string]: Type | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<Type, TransformedValues>(
  dict: Dict<Type>,
  fn: (arg: Type) => TransformedValues
): Dict<TransformedValues> {}

// Array.prototype.reduce, but for Dict
export function reduceDict() {}
