import { View, Text, Animated, Easing, _Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Lottie from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from './AdminScreens/AdminHome';
import { MyTabs } from '../route.js/routes';

import Detail from '../screen/protected/Detail';
import Emergency from '../screen/protected/Emergency';
import Operational from '../screen/protected/Operational';
import Maintenances from '../screen/protected/Maintenances';
import Notes from '../screen/protected/Notes';
import Communication from '../screen/protected/Communication';
import NoteDetail from '../screen/protected/NoteDetail';
import auth from '@react-native-firebase/auth';
import EditProfile from '../screen/protected/EditProfile';
import Payment from '../screen/protected/Payment';
import PDFText from '../screen/protected/PDFText';



const Loading = ({ navigation }) => {
    spinValue = new Animated.Value(0);
    const [_rotateTo, setRotateTo] = useState('30deg')
    const [RotateFrom, setRoteFrom] = useState('0deg')
    const animationProgress = useRef(new Animated.Value(0))
    let a = 0;

    const Stack = createNativeStackNavigator();


    useEffect(() => {
        getData()
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [])

    const getData = () => {

        const UID = auth()?.currentUser?.uid

        firestore()
            .collection("Users")
            .doc(UID)
            .get()
            .then((DOC) => {


                // navigation.navigate("AdminHome")

                // return
                if (DOC?.data()?.status === "admin") {
                    return (
                        navigation.navigate("AdminHome")
                    )
                } else {
                    navigation.navigate("Home")
                }

            })
    }

    const rotate = () => {
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        ).start(({ finished }) => {
            // console.log("fasdfkasdlk", finished)
            if (finished == true) {
                setRotateTo('-30deg')
                setRoteFrom('30deg')
                RotaeRight()
                // rotate()
            }
        });
    }
    const RotaeRight = () => {
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        ).start(({ finished }) => {
            // console.log("fasdfkasdlk", finished)
            if (finished == true) {
                setRotateTo('0deg')
                setRoteFrom('-30deg')
                CenterRotate()
            }
        });
    }
    const CenterRotate = () => {
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        ).start(({ finished }) => {
            // console.log("fasdfkasdlk", finished)
            if (finished == true) {
                // navigation.replace("GetStart")
                console.log("Finished")
            }
        });
    }
    useEffect(() => {
        rotate()
    }, [])
    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: [RotateFrom, _rotateTo]
    })
    // console.log(_rotateTo, RotateFrom)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Lottie
                source={require('../assets/images/96634-circle-loader-black.json')}
                progress={animationProgress.current}
                style={styles.loading}
            />
            <Animated.Image
                style={{ transform: [{ rotate: spin }], position: 'absolute' }}
                source={require('../assets/images/aeroplan.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        // position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('30'),
        height: hp('30')
    }
})

export default Loading