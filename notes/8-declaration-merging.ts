/**
 * (1) "identifiers" (i.e., a variable, class, function, interface) (things you could export - typescript calls these 'symbols')
 * -   can be associated with three things: value, type and namespace
 */

function foo() {}
interface bar {}
namespace baz {
  export const biz = "hello";
}

// how to test for a value
const x = foo; // foo is in the value position (RHS).
// if it's a value, a variable should be able to hold it

// how to test for a type
const y: bar = {}; // bar is in the type position (LHS) - bar can be regarded as a type.

// how to test for a namespace (hover over baz symbol)
baz;

export { foo, bar, baz }; // all are importable/exportable

/**
 * (2) Functions and variables are purely values.
 * -   Their types may only be extracted using type queries
 */
const xx = 4;
const yy: typeof xx = 4;

/**
 * (3) Interfaces are purely types
 */
interface Address {
  street: string;
}

const z = Address; // 🚨 ERROR (fails value test)

/**
 * (4) Classes are both types _and_ values
 */

class Contact {
  name: string;
  static hello = "world";
}

// passes both the value and type tests
Contact.hello;
const contactClass = Contact; // value relates to the factory for creating instances
const contactInstance: Contact = new Contact(); // interface relates to instances

/**
 * (5) declarations with the same name can be merged, to occupy the same identifier
 */

class Album {
  label: Album.AlbumLabel = new Album.AlbumLabel();
}
namespace Album {
  export class AlbumLabel {}
}
interface Album {
  artist: string;
}

let al: Album; // type test
let alValue = Album; // value test

export { Album }; // 👈 hover over the "Album" -- all three slots filled

/**
 * (6) Namespaces have their own slot, and are also values
 */

// 💡 they can be merged with classes

class AddressBook {
  contacts!: Contact[];
}
namespace AddressBook {
  // this is namespaced with respect to the parent class
  export class ABContact extends Contact {} // inner class
}

const ab = new AddressBook();
ab.contacts.push(new AddressBook.ABContact());
// a namespace tacks things on

// 💡 or functions

function format(amt: number) {
  return `${format.currency}${amt.toFixed(2)}`;
}
namespace format {
  export const currency: string = "$ ";
}

format(2.314); // $ 2.31
format.currency; // $

// knowing what's a type and what's a value; what can be augmented (interfaces) vs knowing what you have to leave alone when they're defined (values) - can't override values.
