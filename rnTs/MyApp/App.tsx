import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import TodoList from './compo/todo';

const Hello = () => {
  return <TodoList name={1}></TodoList>;
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});

export default Hello;
