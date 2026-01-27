import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "techmind:";

export const Storage = {
  save: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${PREFIX}${key}`, jsonValue);
      return true;
    } catch (e) {
      console.error("Storage Error (Save):", e);
      return false;
    }
  },

  get: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${PREFIX}${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Storage Error (Get):", e);
      return null;
    }
  },

  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${PREFIX}${key}`);
      return true;
    } catch (e) {
      console.error("Storage Error (Remove):", e);
      return false;
    }
  },

  clear: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const techmindKeys = keys.filter((key: string) => key.startsWith(PREFIX));
      await AsyncStorage.multiRemove(techmindKeys);
      return true;
    } catch (e) {
      console.error("Storage Error (Clear):", e);
      return false;
    }
  },
};
