export const boldMatchingText = (text: string, query: string) => {
  const queryRegex = new RegExp(query, "ig");
  return text.replace(queryRegex, (match) => `<b>${match}</b>`);
};

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
