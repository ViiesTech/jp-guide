import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomButton from '../../component/CustomButton';
import colors from '../../constant/colors';

const GetStart = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true} />
      <ImageBackground source={require('../../assets/images/backgroung.png')} resizeMode="cover" style={styles.image}>
        <View style={{ width: wp('90%'), height: hp('90%'), justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{  }}>
            <Image style={{height:hp('55%'), width:wp('55%')}} source={require('../../assets/images/profile.png')} resizeMode='contain' />
          </View>
          <View style={{ width: wp('70%') }}>
            <CustomButton
              buttonColor={colors.primary}
              title="Login"
              buttonStyle={{ width: '100%', alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
              textStyle={{ fontSize: 20 }}
              onPress={() => handleLogin()}
            />
            <CustomButton
              buttonColor={colors.secondery}
              title="Create an Account"
              buttonStyle={{ width: '100%', alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
              textStyle={{ fontSize: 20 }}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </ImageBackground>
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