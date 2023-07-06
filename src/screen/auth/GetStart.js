import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React,{useState, useEffect} from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomButton from '../../component/CustomButton';
import colors from '../../constant/colors';
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import FastImage from 'react-native-fast-image'


const GetStart = ({ navigation }) => {
  //Orientation
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const [screenResolution, setScreenResolution] = useState('')

  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Orientation.addOrientationListener(updateDimensions);

    return () => {
      Orientation.removeOrientationListener(updateDimensions);
    };
  }, []);

  useEffect(() => {

    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  //sadjansjkdnaskjndjsakndjksankdnaskjndjnsajdnaskjndjsankjdnasjndkasjndksandnasjndjkasndjasnda____________


  const handleLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={{height:screenHeight, width:screenWidth}}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true} />
      <FastImage source={require('../../assets/images/backgroung.png')} resizeMode="cover" style={{height:screenHeight , width: screenWidth, alignItems:'center', justifyContent:'center', padding:20}}>
        {/* <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}> */}

        <View style={{ width: screenWidth * 0.9, height: screenHeight * 0.9, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{  }}>
            <Image style={{height:screenHeight * 0.5,width:screenWidth * 0.5}} source={require('../../assets/images/profile.png')} resizeMode='contain' />
          </View>
          <View style={{ width: screenWidth * 0.9}}>
            <CustomButton
              buttonColor={colors.primary}
              title="Login"
              buttonStyle={{ width: screenWidth * 0.9 , alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
              textStyle={{ fontSize: 20 }}
              onPress={() => handleLogin()}
            />
            <CustomButton
              buttonColor={colors.secondery}
              title="Create an Account"
              buttonStyle={{ width: screenWidth * 0.9, alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
              textStyle={{ fontSize: 20 }}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
        {/* </ScrollView> */}

      </FastImage>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageCenter: {
    imageCenter: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
  }
});
export default GetStart