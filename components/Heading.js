import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Heading = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },

    text: {
        fontSize: 60,
        textAlign: 'center',
        color: 'rgba(200, 0, 0, .4)',
        textTransform: 'lowercase',
        fontWeight: '200'
    }
});

export default Heading;