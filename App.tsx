/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {theme} from './color';
import {getData, storeData} from './store/asyncStorage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const STORAGE_KEY = '@toDos';

function App(): React.JSX.Element {
  const [value, setValue] = useState('');
  const [working, setWorking] = useState(true);
  const [toDos, setToDos] = useState<{
    [key: string]: {value: string; working: boolean; completed: boolean};
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (event: string) => setValue(event);

  const saveToDos = async (toDos: {
    [key: string]: {value: string; working: boolean; completed: boolean};
  }) => {
    await storeData(STORAGE_KEY, toDos);
  };

  const loadToDos = async () => {
    const todos = await getData(STORAGE_KEY);
    if (todos) {
      setToDos(JSON.parse(todos));
      setLoading(false);
    }
  };

  const addToDo = async () => {
    if (value === '') {
      return;
    }
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: {value, working, completed: false},
    };

    setToDos(newToDos);
    await saveToDos(newToDos);
    setValue('');
    // const newToDos = Object.assign({}, toDos, {[Date.now()]: {value, working}});
  };

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

  const completedToDo = async (key: string) => {
    const newToDos = {...toDos};
    newToDos[key].completed = !newToDos[key].completed;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{...styles.btnText, color: working ? 'white' : theme.grey}}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{...styles.btnText, color: working ? theme.grey : 'white'}}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={value}
        returnKeyType="done"
        style={styles.input}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
      />

      <ScrollView>
        {Object.keys(toDos).map((key: string) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].value}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <BouncyCheckbox
                  onPress={() => completedToDo(key)}
                  isChecked={toDos[key].completed}
                />
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },

  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
