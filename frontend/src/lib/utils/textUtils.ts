// This function is used to create initials from a first name and a last name.
export const createInitials = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const firstInitial = firstName?.charAt(0) ?? "";
  const lastInitial = lastName?.charAt(0) ?? "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
};


// This function is used to highlight text that matches a query. It returns an array
// of tuples where the first element is the text and the second element is a boolean
// indicating whether the text is a match. 
// We use this function to highlight user search results in the search bar.
export const highlightText = (
  text: string,
  query: string,
): [string, boolean][] => {
  if (!query) return [[text, false]];

  const result: [string, boolean][] = [];
  let remainingText = text;

  while (remainingText) {
    const index = remainingText.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) {
      // No more matches, push the remaining text as non-matching.
      result.push([remainingText, false]);
      break;
    }

    // Push the non-matching part before the match.
    if (index > 0) {
      result.push([remainingText.slice(0, index), false]);
    }

    // Push the matching part.
    result.push([remainingText.slice(index, index + query.length), true]);

    // Update the remaining text to be after the match.
    remainingText = remainingText.slice(index + query.length);
  }

  return result;
};
