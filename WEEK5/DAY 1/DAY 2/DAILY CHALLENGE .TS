function validateUnionType(value: any, allowedTypes: string[]): boolean {
  // Get the string representation of the value's type
  const valueType = typeof value;
  
  // Check if the current type exists within the allowedTypes array
  return allowedTypes.includes(valueType);
}