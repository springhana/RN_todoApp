# ToDoApp

## 소개

간단하고 기초적인 기능만 있는 ToDoApp입니다.

- ToDo 할 일 완료 기능
- ToDo 삭제 기능
- ToDo 추가 기능
- ToDos를 LocalStorage에 저장
   - AsyncStorage라이브러리 사용

## 교육

노마드 코더의 "왕초보를 위한 React Native 101"을 보고 만든 ToDoApp입니다.

## 배운점

### AsyncStorage

폰에 로컬 스토리로 데이터를 관리 - 폰에서 용량으로 저장

- 설치

```shell
import AsyncStorage from '@react-native-async-storage/async-storage';
```

- 사용법

- 세팅
```jsx
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
```

- 사용
```tsx
  const saveToDos = async (toDos: {
    [key: string]: {value: string; working: boolean};
  }) => {
    await storeData(STORAGE_KEY, toDos);
  };

  const loadToDos = async () => {
    const todos = await getData(STORAGE_KEY);
    if (todos) {
      setToDos(JSON.parse(todos));
    }
  };
```

- 삭제하고 싶을때는 객체일 경우

```jsx
 const deleteToDo = (key: string) => {
    // key 날짜
    Alert.alert('Delete To Do', 'Are you sure?', [
      {text: 'Cancel'},
      {
        text: "I'm Sure",
        onPress: async () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
```

위의 코드를 버튼에 `onPress`에 넣어준다.

`delete newToDos[key]`는 해당 객체의 key에 값을 삭제시켜준다.

- delete 연산자  
	- delete 연산자는 객체의 속성을 제거합니다.
	- 제거한 객체의 참조를 어디에서도 사용하지 않는다면 나중에 자원을 회수합니다.

- Alert  
	- 지정된 제목과 메시지로 경고 대화 상자를 실행합니다.

## 화면

![image](https://github.com/springhana/RN_todoApp/assets/97121074/96873ee2-c43a-4c26-b2eb-1da1ef7fed82)
