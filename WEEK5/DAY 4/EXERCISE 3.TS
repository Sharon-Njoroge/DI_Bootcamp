let someValue: any = "Hello TypeScript!";

// Using 'as' syntax (preferred)
let strLength: number = (someValue as string).length;

// Using angle-bracket syntax
let strValue: string = <string>someValue;

console.log(strValue.toUpperCase());