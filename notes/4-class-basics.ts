import { HasPhoneNumber, HasEmail } from "./1-basics";

// == CLASSES == //

/**
 * (1) Classes work similarly to what you're used to seeing in JS
 * -   They can "implement" interfaces - describes a class aligning with a particular interface
 */

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}

/**
 * (2) This looks a little verbose -- we have to specify the words "name" and "email" 3x.
 * -   Typescript has a shortcut: PARAMETER PROPERTIES
 */

/**
 * (3) Access modifier keywords - "who can access this thing"
 *
 * - public - everyone
 * - protected - me (the instance) and (any instance of a) subclasses
 * - private - only me (only that class, subclass can't see private method or field)
 */

class ParamPropContact implements HasEmail {
  constructor(
    // adding an access modifier's keyword before our constructor's arguments we can create the equivalent setup to above
    // this means - take an argument in the constructor AND a field of the same name should exist on the instance, and when you receive it in the constructor, you should place it on the instance
    public name: string,
    public email: string = "no email"
  ) {
    // nothing needed
  }
}

/**
 * (4) Class fields can have initializers (defaults)
 */
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0; // default value, if not set within constructor. could also be 'readonly' - can't write to it. but does nothing in terms of preventing rights to this value - just a linting for using type information
  private passwordVal: string | undefined;
  constructor(public name: string, public email: string, public phone: number) {
    // () password must either be initialized like this, or have a default value
  }

  // es5 getter
  private get password(): string {
    if (!this.passwordVal) {
      this.passwordVal = Math.round(Math.random() * 1e14).toString(32);
    }

    return this.passwordVal;
  }

  async init() {
    this.password;
  }
}

/**
 * (5) TypeScript even allows for abstract classes, which have a partial implementation
 */

abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}

/**
 * (6) implementors must "fill in" any abstract methods or properties
 */
class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // must happen before non property-parameter arguments
    name: string,
    email: string
  ) {
    super(name, email);
  }
  sendEmail() {
    // mandatory!
    console.log("sending an email");
  }
}
