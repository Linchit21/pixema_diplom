interface StylesModuleType {
  [key: string]: string;
}

interface ClassNameMod {
  [key: string]: string | number | boolean | undefined | null;
}

export function createClassName(
  styles: StylesModuleType,
  block: string
): (element?: string, mods?: ClassNameMod) => string {
  return (element?: string, mods: ClassNameMod = {}): string => {
    const initialClassname = element ? `${block}__${element}` : block;
    let result: string = styles[initialClassname];

    for (const mod in mods) {
      if (mods[mod]) {
        result += ` ${styles[`${initialClassname}_${mod}`]}`;
      }
    }

    return result;
  };
}
