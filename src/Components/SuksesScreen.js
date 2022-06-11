/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SuccessAnim } from '../Assets/index';
import ScreenStatusBar from './ScreenStatusBar';
import { Color } from '../utils/color';

function SuksesScreen() {
    const navigation = useNavigation();
    const focus = useIsFocused();

    return (
        <View style={styles.container}>
            <ScreenStatusBar status={focus} color={Color.PRIMARY_MAIN_COLOR} />
            <View style={{ flex: 3, marginTop: 60 }}>
                <LottieView source={SuccessAnim} autoPlay loop={false} />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25 }}>
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={{ fontSize: 15, color: Color.WHITE, fontWeight: 'bold' }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SuksesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SECOND_MAIN_COLOR,
        paddingHorizontal: 25,
    },
    btnLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BUTTON_AUTH,
        paddingVertical: 13,
        borderRadius: 30,
        marginTop: 40,
    },
});
