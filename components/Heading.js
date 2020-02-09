import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Color from './Color';
import Shadow from './Shadow';

const Heading = ({title}) => {
    return (
        <Text style={styles.text}>{title}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 70,
        textAlign: 'center',
        color: Color.red,
        textTransform: 'lowercase',
        fontWeight: '200',
        ...Shadow.md
    }
});

export default Heading;