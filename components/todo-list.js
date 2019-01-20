import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import Todo from './todo';

class TodoList extends Component{
    render(){
        return (
            <View style={styles.container}>
                {this.props.todoList.map((todo) => (
                    <Todo text={todo.text}/>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 15,
    }
})

export default TodoList; 