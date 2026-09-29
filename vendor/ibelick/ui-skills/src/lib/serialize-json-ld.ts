export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => {
    const escaped = {
      "<": "\\u003c",
      ">": "\\u003e",
      "&": "\\u0026",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    }[character];

    return escaped ?? character;
  });
