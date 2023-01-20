import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CustomButton from '../../component/CustomButton'
import colors from '../../constant/colors'
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native'


const ForgetPassword = ({ navigation }) => {



  const [email, setEmail] = useState('')

  const ResetPassword = () => {
      if (email) {
          auth().sendPasswordResetEmail(email)
          .then(()=>{

              Toast.show({
                  type: 'success',
                  text1: 'Password reset email sent successfully',
              });
              setEmail("")
              
              
              setTimeout(() => {
                  navigation.navigate('Login')

              }, 3000);
          })
              .catch((err) => {
                  console.log(err)
                  if (err.code == 'auth/user-not-found')
                  {
                      Toast.show({
                          type: 'success',
                          text1: 'Email not found',
                      });
                      setEmail("")
                  }
              })
      } else {
          Toast.show({
              type: 'error',
              text1: 'Please Enter Your Email',
          });
      }
  }
    
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true} />
        <ImageBackground source={require('../../assets/images/backgroung.png')} resizeMode="cover" style={styles.image}>
          <View style={{ width: wp('90%'), height: hp('90%'), justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ marginTop: hp('10') }}>
              <Image style={styles.imageCenter} source={require('../../assets/images/logo1.png')} />
            </View>
            <View style={{ width: wp('75%'), backgroundColor: 'rgba(252, 252, 252, 0.4)', padding: 20, borderRadius: 20 }}>
            
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  onChangeText={(text) => {
                    setEmail(text)
                  }}
                  value={email}
                />
              </View>
              
              <CustomButton
                buttonColor={colors.primary}
                title="Send"
                buttonStyle={{ width: '100%', alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
                textStyle={{ fontSize: 20 }}
                onPress={() => ResetPassword()}
              />

<CustomButton
                buttonColor={colors.secondery}
                title="Back"
                buttonStyle={{ width: '100%', alignSelf: 'center', marginVertical: 10, borderRadius: 10 }}
                textStyle={{ fontSize: 20 }}
                onPress={() => navigation.goBack    ()}
              />
            
            </View>
          </View>
        </ImageBackground>
      </View>
      <Toast />
    </ScrollView>
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
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    backgroundColor: '#E9E9E9', marginVertical: 10, height: hp('6'), borderRadius: 10,
    padding: 20
  },
  bottmoButtom: {
    width: wp('35'),
    height: hp('6'),
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 24, color: colors.primary, fontWeight: 'bold'
  }
})
export default ForgetPassword