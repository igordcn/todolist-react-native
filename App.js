import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';

/*
class Hello extends Component{
 /* constructor(){
    super();
    this.state = {
      name: 'Rodrigo'
    }
    setTimeout(() => {
      this.setState({
        name: 'Qualquer'
      })
    }, 5000)
  }
  render(){
    return(
      <Text style={styles.welcome}>Welcome, {this.props.name}</Text>
    )//{this.state.name}!
  }
}*/


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:[{
        text: 'Almoçar'
      },{
        text: 'Trabalhar'
      },{
        text: 'Dormir'
      }]
      //name:"Rodrigo"
    }
  }

  addTodo(text){
    this.setState({
      todos:[
        {text: text},
        ...this.state.todos       
      ]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AddTodo add={text => this.addTodo(text)}/>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TodoList todoList={this.state.todos}/> 
        </ScrollView>
      </View>
    );
  }
}

/*
<Hello name={this.state.name}/>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
