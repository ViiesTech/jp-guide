import { View, Text, Animated, Easing, _Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Lottie from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDark, setLight } from '../../redux/PDFSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Animation = ({navigation}) => {


    const dispatch = useDispatch()

    useEffect(()=>{
      checkDarkMode()
    },[])
  
    const checkDarkMode = async() => {
      try {
        const jsonValue = await AsyncStorage.getItem('DarkMode');
  
        if(jsonValue != null ){
          const val = JSON.parse(jsonValue)
          if(val === true){
            
            dispatch(setDark())
            console.log("trueeeeee")
          }else{
            dispatch(setLight())
            console.log("falseeeeee")

          }
          
        }else{
          null
        }
        // console.log(typeofjsonValue)
  
      } catch (e) {
        // error reading value
      }
    }


    const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE : color === true ?  "#000000" : "#FFFFFF" ,
    Text : color === true ?  "#FFFFFF" :"#000000"

  }
    
    spinValue = new Animated.Value(0);
    const [_rotateTo, setRotateTo] = useState('30deg')
    const [RotateFrom, setRoteFrom] = useState('0deg')
    const animationProgress = useRef(new Animated.Value(0))
    let a = 0;

    useEffect(() => {
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }, [])
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Lottie
                source={require('../../assets/images/96634-circle-loader-black.json')}
                progress={animationProgress.current}
                style={styles.loading}
            />
            <Animated.Image
                style={{ transform: [{ rotate: spin }],position:'absolute' }}
                source={require('../../assets/images/aeroplan.png')}
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
        width:wp('30'),
        height:hp('30')
    }
})
export default Animation