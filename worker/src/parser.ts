export function parse(text: string, values: any, startDelimiter = "{{", endDelimiter = "}}") {
  let startIndex = 0;
  let finalString = "";

  while (startIndex < text.length) {
    const startDelimiterIndex = text.indexOf(startDelimiter, startIndex);

    if (startDelimiterIndex === -1) {
      finalString += text.slice(startIndex);
      break;
    }

    finalString += text.slice(startIndex, startDelimiterIndex);

    let endIndex = text.indexOf(endDelimiter, startDelimiterIndex + startDelimiter.length);

    if (endIndex === -1) {
      finalString += text.slice(startDelimiterIndex);
      break;
    }

    const stringHoldingValue = text.slice(startDelimiterIndex + startDelimiter.length, endIndex);
    const keys = stringHoldingValue.split(".");
    let localValues: any = { ...values };

    for (let x = 0; x < keys.length; x++) {
      if (typeof localValues === "string") {
        localValues = JSON.parse(localValues);
      }
      const key = keys[x];
      if (localValues && key) {
        localValues = localValues[key];
      }
    }

    finalString += localValues;
    startIndex = endIndex + endDelimiter.length;
  }

  return finalString;
}
