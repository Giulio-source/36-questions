export function cleanQuestionNumber(value: string) {
  const regex = /\d+\.\s(.*)/g;
  const result = regex.exec(value);

  return result ? result[1] : value;
}
