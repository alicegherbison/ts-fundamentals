import { HasPhoneNumber, HasEmail } from "./1-basics";

//== TYPE ALIAS ==//
/**
 * (1) Type aliases allow us to give a type a name
 */
// type alias can give a name to any type

type StringOrNumber = string | number;

// this is the ONLY time you'll see a type on the RHS of assignment - this is completely typespace - will not compile to js at all
type HasName = { name: string };

// NEW in TS 3.7: Self-referencing types!
type NumVal = 1 | 2 | 3 | NumArr[];
interface NumArr extends Array<NumVal> {}

// == INTERFACE == //
/**
 * (2) Interfaces can extend from other interfaces
 */

// extends is used for inheritance of similar things - interfaces extend from interfaces, classes extend from classes
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string;
}

/**
 * (3) they can also be used to describe call signatures
 */

// interfaces can describe objects, functions and arrays = js values that extend from the js object type - interfaces can't handle primitave types
interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

// arrow used instead of colon
type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;

// NOTE: we don't need type annotations for contact or message
const emailer: ContactMessenger1 = (_contact, _message) => {
  /** ... */
};

/**
 * (4) construct signatures can be described as well
 */

// a way of describing a constructor that instantiates either things that have an email address or phone number (and definitely a name)
interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

/**
 * (5) index signatures describe how a type will respond to property access
 */

/**
 * @example
 * {
 *    iPhone: { areaCode: 123, num: 4567890 },
 *    home:   { areaCode: 123, num: 8904567 },
 * }
 */

interface PhoneNumberDict {
  // arr[0],  foo['myProp']
  // this is saying it's either not there at all or will have this form
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const d: PhoneNumberDict = {};

// no way for undefined value to pass into this block - conditions can be used to narrow types
if (typeof d.abc === "string") {
  d.abc;
}

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 5551212 },
  home: { areaCode: 321, num: 5550010 } // try editing me
};

// at most, a type may have one string and one number index signature

/**
 * (6) they may be used in combination with other types
 */

// augment the existing PhoneNumberDict
// i.e., imported it from a library, adding stuff to it - an index signature
interface PhoneNumberDict {
  home: {
    /**
     * (7) interfaces are "open", meaning any declarations of the
     * -   same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
}

// declaration merging and stacking interfaces
phoneDict.home; // definitely present
phoneDict.office; // definitely present
phoneDict.mobile; // MAYBE present

// interfaces are kind of like functions - they're parsed like functions in that interfaces exist and have a particular name as we parse things, but only when accessing and using do we find out what are the allowable types. type alias are sorted out eagerly; interfaces are sorted out lazily

// == TYPE ALIASES vs INTERFACES == //

/**
 * (7) Type aliases are initialized synchronously, but
 * -   can reference themselves
 */

// type NumberVal = 1 | 2 | 3 | NumberVal[];

/**
 * (8) Interfaces are initialized lazily, so combining it
 * -   w/ a type alias allows for recursive types!
 */

// type StringVal = "a" | "b" | "c" | StringArr;

// // type StringArr = StringVal[];
// interface StringArr {
//   // arr[0]
//   [k: number]: "a" | "b" | "c" | StringVal[];
// }

// const x: StringVal = Math.random() > 0.5 ? "b" : ["a"]; // ✅ ok!

export default {};
