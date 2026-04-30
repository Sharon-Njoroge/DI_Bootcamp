/**
 * Validates if a value matches one of the provided type strings.
 * @param value - The variable to check.
 * @param allowedTypes - An array of strings representing allowed types (e.g., ['string', 'number']).
 * @returns boolean
 */
function validateUnionType(value: any, allowedTypes: string[]): boolean {
  // Get the runtime type of the value
  const valueType = typeof value;

  // Iterate through the allowed types to find a match
  for (const type of allowedTypes) {
    if (valueType === type) {
      return true;
    }
  }

  return false;
}

// Alternative modern approach using .includes()
const validateUnionTypeModern = (value: any, allowedTypes: string[]): boolean => 
  allowedTypes.includes(typeof value);