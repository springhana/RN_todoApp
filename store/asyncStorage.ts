import AsyncStorage from '@react-native-async-storage/async-storage';

// 데이터 저장 함수
export const storeData = async (
  key: string,
  value: {[key: string]: {value: string; working: boolean}},
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data stored successfully!');
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

// 데이터 검색 함수
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
      return value;
    } else {
      console.log('No data found for the key:', key);
      return null;
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
    return null;
  }
};

// 데이터 삭제 함수
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully!');
  } catch (error) {
    console.log('Error removing data: ', error);
  }
};
