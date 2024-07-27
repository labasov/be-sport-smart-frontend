export const toSportKey = (sportName: string, trim: boolean = true): string => {
  // Trim leading and trailing spaces
  let text = sportName;
  
  // If trim is true, trim leading and trailing underscores
  if (trim) {
    text = text.trim().replace(/^_+|_+$/g, '');
  }
  
  // Replace spaces with underscores and convert to lowercase
  let transformedText = text.replace(/\s+/g, '_').toLowerCase();
  
  // Remove non-alphanumeric characters except underscores
  transformedText = transformedText.replace(/[^a-z0-9_]/g, '');

  return transformedText;
};