export const localStorageService = {
  set(key: string, data: string | object | []) {
    const json = JSON.stringify(data);

    localStorage.setItem(key, json);
  },

  get<Type>(key: string): Type | null {
    const data = localStorage.getItem(key);
    if (!data) return null;

    return JSON.parse(data);
  },
};
