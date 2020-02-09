import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/dist/Feather';
import Color from './Color';

export const Sepearator = () => <View style={styles.sepearator} />;

const TodoItem = ({todo, toggleComplete, deleteTodo}) => {

    const completedIcon = () => {
        return todo.completed ? (
            <Feather name="check-circle" style={styles.doneTaskBtn} />
        )
        : (
            <Text style={styles.undoneTaskBtn}></Text>
        )
    };

    const rightActions = (_progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        return  (
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTodo(todo.id)}>
                <Animated.View style={{transform: [{scale}]}}>
                    <Feather name="trash-2" style={styles.deleteIcon} />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable 
            renderRightActions={rightActions}
            style={styles.item}>
            <View style={styles.leftItem}>
                <TouchableOpacity style={styles.toggleBtn} onPress={() => toggleComplete(todo.id)}>
                    {completedIcon()}
                </TouchableOpacity>
                <Text style={[styles.itemText, todo.completed ? styles.lineThrough : {}]}>{todo.text}</Text>
            </View>
        </Swipeable>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.exact({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,

    toggleComplete: PropTypes.func.isRequired,

    deleteTodo: PropTypes.func.isRequired
};

const IconsSize = {fontSize: 18};

const styles = StyleSheet.create({
    sepearator: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e2e2',
        marginLeft: 5,
    },

    item: {
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },

    lineThrough: {
        textDecorationLine: 'line-through',
        textDecorationColor: '#777'
    },

    leftItem: {
        flex: .95,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },

    itemText: {
        ...IconsSize,
        flexGrow: 1
    },

    deleteBtn: {
        backgroundColor: Color.bgRed,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },

    deleteIcon: {
        ...IconsSize,
        color: '#fff'
    },

    toggleBtn: {
        padding: 3,
        
    },

    doneTaskBtn: {
        marginRight: 10,
        fontSize: 23,
        color: 'green',
        width: 23,
        height: 23,
    },

    undoneTaskBtn: {
        borderWidth: 1,
        width: 23,
        height: 23,
        marginRight: 10,
        borderRadius: 23 / 2,
        borderColor: Color.light
    }
});

export default TodoItem;
