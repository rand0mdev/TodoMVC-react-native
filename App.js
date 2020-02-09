import React, { Component } from 'react'
import { Text, StatusBar, SafeAreaView, StyleSheet, View, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {uuid} from 'uuidv4';
import Heading from './components/Heading';
import Input from './components/Input';
import TodoItem, { Sepearator } from './components/TodoItem';
import Color from './components/Color';
import Shadow from './components/Shadow';

const STORAGE_KEY = '@todo';

const EmptyList = () => {
  return (
    <>
      <View style={styles.bottomSpacer}></View>
      <Text style={styles.emptyList}>&mdash; No task to achieve
      </Text>
    </>
  );
}

// AsyncStorage.removeItem(STORAGE_KEY);

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [],
      Type: 'All'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if(data) {
        this.setState({
          todos: JSON.parse(data)
        });
      }
    } catch(err) {
      console.error(err);
    }
  }

  async saveData() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.todos));
    } catch (err) {
      console.error(err);
    }
  }

  async onSubmit(text){
    if(!text) {
      Alert.alert("You can't add empty text.")
    } else {
      const todo = {
        text,
        id: uuid(),
        completed: false
      };

      await this.setState({
        todos: [todo, ...this.state.todos]
      });
      await this.saveData();
    }
  }

  async toggleComplete(id) {
    let todos = this.state.todos;

    todos.forEach(todo => {
      if(todo.id == id) {
        todo.completed = !todo.completed;
      }
    })

    await this.setState({todos});
    await this.saveData();
  }

  async deleteTodo(id) {
    await this.setState({
      todos: this.state.todos.filter(todo => todo.id != id)
    });
    await this.saveData();
  }

  render() {
    const { todos } = this.state;
  
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea}>
          <Heading title="todos" />
          <Input style={styles.inputContainer} onPress={this.onSubmit}/>
          <Animated.FlatList 
            style={styles.todos}
            data={todos}
            renderItem={({item}) => <TodoItem todo={item} toggleComplete={this.toggleComplete} deleteTodo={this.deleteTodo}/>}
            ItemSeparatorComponent={() => <Sepearator/>}
            ListEmptyComponent={() => <EmptyList />}/>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Color.mainBg
  },

  safeArea: {
    flex: 1,
    marginTop: 60,
  },

  inputContainer: {
    flex: .1,
  },

  todos: {
    marginTop: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },

  bottomSpacer: {
    borderWidth: .5,
    borderColor: '#ccc',
    marginHorizontal: 11,
    marginTop: 15,
    ...Shadow.sm
  },

  emptyList: {
    marginTop: 5,
    textAlign: 'center',
    color: Color.blue,
    fontStyle: 'italic',
    opacity: .7,
    ...Shadow.sm
  }
});
