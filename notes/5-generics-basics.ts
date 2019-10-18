import { HasEmail } from "./1-basics";

/**
 * (1) Generics allow us to parameterize types in the same way that
 * -   functions parameterize values
 */

// param determines the value of x
function wrappedValue(x: any) {
  return {
    value: x
  };
}

// type param determines the type of x
interface WrappedValue<X> {
  value: X;
}

let val: WrappedValue<string[]> = { value: [] };
val.value;

/**
 * we can name these params whatever we want, but a common convention
 * is to use capital letters starting with `T` (a C++ convention from "templates")
 */

/**
 * (2) Type parameters can have default types
 * -   just like function parameters can have default values
 */

// for Array.prototype.filter - this is taking a string as an argument and returning a boolean
// any is default type - default parameter value
interface FilterFunction<T = any> {
  (val: T): boolean;
}

const stringFilter: FilterFunction<string> = val => typeof val === "string";
stringFilter(0); // 🚨 ERROR
stringFilter("abc"); // ✔️ OK

// can be used with any value
const truthyFilter: FilterFunction = val => val;
truthyFilter(0); // false
truthyFilter(1); // true
truthyFilter(""); // false
truthyFilter(["abc"]); // true

/**
 * (3) You don't have to use exactly your type parameter as an arg
 * -   things that are based on your type parameter are fine too
 */

// promise type is generic over the type that it resolves to - this means that it abstracts the type it resolves to, it takes it as a type parameter - like a promise that resolves to a number etc
function resolveOrTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // start the timeout, reject when it triggers
    const task = setTimeout(() => reject("time up!"), timeout);

    promise.then(val => {
      // cancel the timeout
      clearTimeout(task);

      // resolve with the value
      resolve(val);
    });
  });
}
resolveOrTimeout(fetch(""), 3000);

/**
 * (4) Type parameters can have constraints
 */

// we accept a type T that is at least an object with a property id whose property is a string
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: { [k: string]: T } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}

const myDict = arrayToDict([
  { id: "a", value: "first", lisa: "Huang" },
  { id: "b", value: "second" }
]);

// by adding the idea of a generic, we can retain the detail of the object we passed in, even though the function doing the work knows nothing about these extra properties that might be there. but because it's giving us a blank we can fill in, from the outside we can say for the purposes of invoking this function, it's giving big objects with lots of properties.

/**
 * (5) Type parameters are associated with scopes, just like function arguments
 */

function startTuple<T>(a: T) {
  return function finishTuple<U>(b: U) {
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);

/**
 * (6) When to use generics
 *
 * - Generics are necessary when we want to describe a relationship between
 * - two or more types (i.e., a function argument and return type).
 *
 * - aside from interfaces and type aliases, If a type parameter is used only once
 * - it can probably be eliminated
 */

interface Shape {
  draw();
  isDrawn: boolean;
}
interface Circle extends Shape {
  radius: number;
}

// this is unnecessary abstraction
function drawShapes1<S extends Shape>(shapes: S[]): S[] {
  return shapes.map(s => {
    s.draw();
    s.isDrawn = true;
    return s;
  });
}

// specifying the Shape[] type - that's what allows us to access the method draw()
// constraints on type parameters are equivalent to specifying the type on an argument in that it dictates what you can do within the function on s
function drawShapes2(shapes: Shape[]) {
  // this is simpler. Above type param is not necessary
  shapes.forEach(s => s.draw());
}

// you can always eliminate a type parameter that's used once
// ask for only what you need, and return everything you can
