import React, {Component} from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import {StyleSheet, ScrollView, View, Text, PermissionsAndroid} from 'react-native';
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
    const todo = this.props.navigation.getParam('todo');
    return (
      <View>
        <Text>{todo.text}</Text>
        <Text>Created at: {todo.location}</Text>
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

    const todo1 = {
      id: 1,
      text: 'Almoçar'
    }
    const todo2 = {
      id: 2,
      text: 'Almoçar'
    }
    const todo3 = {
      id: 3,
      text: 'Almoçar'
    }
    this.state = {
      idCount: 3,
      todos:[todo1, todo2, todo3]
      //name:"Rodrigo"
    }
    this.requestMapsPermission();
  }

  async requestMapsPermission(){
    try{
      const isGranted= await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title':'Todo app location access',
          'message':'We need your location to know here you'
        }
      )
      this.setState({
        geolocationPermissionGranted: isGranted,
      })
    }catch(err){
      console.error(err);
    }
  }

  async setTodoLocation(id, coords){
    const {latitude, longitude} = coords;
    try{
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=`
      );

      const data = await response.json();

      if(!data.error_message){
        
        const address = data.results[0].formatted_address;

        const { todos } = this.state;
        todos.find(todo => todo.id === id).location = address;
        this.setState({
          todos
        });
      }else{
        throw JSON.stringify(data);
      }
    }catch(e){
      console.error(e);
    }
  }

  addTodo(text){
    const id = this.state.idCount + 1;
    this.setState({
      todos:[
        {id, text},
        ...this.state.todos       
      ],
      idCount: id
    })

    if(this.state.geolocationPermissionGranted){
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setTodoLocation(id, pos.coords)
      }, null, {enableHighAccuracy: true})
    }
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
