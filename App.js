import React, {Component} from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
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
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: '#1564bf',
    //display: 'none'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white'
  }
}



class TodoDetails extends Component{
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'Todo App'
  }
  render(){
    return (
      <View>
        <Text>{this.props.navigation.getParam('text')}</Text>
      </View>
    )
  }
}

class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    ...defaultNavigationOptions
  }

  constructor(props){
    super(props);

    /*setTimeout(() => {
      this.props.navigation.navigate('TodoDetails', {text: 'Parâmetro 1'});
    }, 3000);*/
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
          <TodoList
           todoList={this.state.todos}
           navigation={this.props.navigation}/> 
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

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  TodoDetails: {screen: TodoDetails}
})

export default createAppContainer(AppNavigator);
