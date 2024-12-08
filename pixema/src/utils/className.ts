interface ClassNameParam {
  [key: string]: boolean;
}

export function className(classes: ClassNameParam): string {
  let result: string = '';

  for (let key in classes) {
    if (classes[key]) {
      result += ` ${key}`;
    }
  }

  return result;
}
