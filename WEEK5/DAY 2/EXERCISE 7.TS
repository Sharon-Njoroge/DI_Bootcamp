// Using 'as' syntax for type assertion
const inputElement = document.getElementById("user-input") as HTMLInputElement;

if (inputElement) {
    inputElement.value = "TypeScript is awesome!";
}