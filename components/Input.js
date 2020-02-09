import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Button, Text } from "react-native";
import Color from './Color';

const Input = ({onPress}) => {
    const [text, setText] = useState('');

    const onChange = inputText => setText(inputText);

    const onSubmit = () => {
        onPress(text);
        setText('');
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Create react native app"
                placeholderTextColor="#999"
                value={text}
                onChangeText={onChange}
                onSubmitEditing={() => onSubmit()}
                />
            <TouchableOpacity style={styles.btnContainer} onPress={() => onSubmit()}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        shadowOpacity: .2,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
    },

    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: .9,
        color: '#000',
    },

    btnContainer: {
        flex: .1,
        alignItems: 'center',
    },

    btnText: {
        color: Color.blue,
        opacity: .7,
        fontSize: 27,
    }
});

export default Input;
