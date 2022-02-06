export const formatCharacterData = (character) => {
  const output = {};
  const keys = Object.keys(character).filter((d) => !/^\d$/.test(d));
  for (let key of keys) {
    if (!["name", "avatar"].includes(key)) {
      output[key] = character[key].toNumber();
    } else {
      output[key] = character[key];
    }
  }
  return output;
}
