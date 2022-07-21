/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

const Button = ({ title, disabled, titleStyle, buttonStyle, onPress }) => {

    return (
        <TouchableOpacity
            style={[styles.mainContainer, buttonStyle, {
                opacity: disabled ? 0.5 : 1
            }]}
            onPress={() =>
                onPress ?
                    disabled ? null
                        : onPress()
                    : null}
        >
            <Text style={[styles.headerText, titleStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};



export default Button;
