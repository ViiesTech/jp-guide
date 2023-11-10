import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator, ScrollView, ImageBackground, Switch, StyleSheet, useColorScheme,StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import colors from '../../constant/colors';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image'
// import MyTheme, { COLORS } from '../../utils/COLORS';
import { useDispatch, useSelector } from 'react-redux';
import { setDark, setLight } from '../../redux/PDFSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const colorScheme = useColorScheme();

  console.log("colorScheme: " + colorScheme)
  const [Detail, setDetail] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [changeUsername, setChangeUsername] = useState('')
  const [ImageUrl, setImageUrl] = useState("")
  const [Loader, setLoader] = useState("")

  const [TakePfp, setTakePfp] = useState("")

  const dispatch = useDispatch()

  const color = useSelector(state => state.pdf.Dark)




  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }

  const UID = auth()?.currentUser?.uid
  const FetchData = () => {

    // setLoader(true)
    firestore()
      .collection('Users')
      .doc(UID)
      .onSnapshot((text) => {
        // console.log(text.exists

        setTakePfp(text?.data()?.Image)
        if (text?.data()?.Image != "") {
          // setLoader(false)
        }
        if (text?.exists === false) {
          return null
        } else {
          setDetail(text?.data())
        }

        // console.log(text.data())

      })
  }

  useEffect(() => {
    FetchData()
    if (color === true) {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)

    }
  }, [])

  const Logout = async () => {


    await AsyncStorage.clear().then(() => {
      

      firestore()
        .collection('Users')
        .doc(UID)
        .update({

          LoggedIn: false,


        }).then(() => {
          auth()
            ?.signOut()

        })
    })



  }
  const saveChange = () => {
    firestore()
      .collection('Users')
      .doc(UID)
      .update({
        username: changeUsername
      })
    setModalVisible(!isModalVisible);

  }

  const toggleModal = async () => {
    setModalVisible(!isModalVisible);



  };

 


  const [isDarkMode, setIsDarkMode] = useState(false);



  const handleToggleSwitch = async () => {
    setIsDarkMode(!isDarkMode);

    if (isDarkMode === false) {
      dispatch(setDark())
      console.log('true')
      try {
        const jsonValue = JSON.stringify(true);
        await AsyncStorage.setItem('DarkMode', jsonValue);
      } catch (e) {
        // saving error
      }
    } else {
      dispatch(setLight())
      console.log('false')
      try {
        const jsonValue = JSON.stringify(false);
        await AsyncStorage.setItem('DarkMode', jsonValue);
      } catch (e) {
        // saving error
      }

    }
    // You can also handle theme switching logic here
  };


  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      StatusBar.setHidden(true)
    });
    return unsubscribe
    
  },[navigation])


  return (

      <FastImage source={color === true ? require('../../assets/images/hidark.png') : require('../../assets/images/hi.jpeg')} style={{ flex: 1 }}>




        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' color={COLORS.Text} size={40} />
              </TouchableOpacity>
              <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: COLORS.Text, marginLeft: 20 }}>Settings</Text>
            </View>


            <FastImage source={color === true ? require('../../assets/images/logodark.png') : require('../../assets/images/profile.png')} style={{ alignSelf: 'center', height: 200, width: 200 }} resizeMode={'contain'} />

            <View style={{ alignSelf: 'center' }}>

              <Switch

                trackColor={{ false: '#D3D3D3', true: '#2E2E2E' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#D3D3D3"
                onValueChange={handleToggleSwitch}
                value={isDarkMode}
                style={{
                  transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], alignSelf: 'center' // Adjust the scale values as per your requirement
                }}
              />

              <View style={{ backgroundColor: colors.primary, marginTop: 25, alignSelf: 'center', padding: 10, borderRadius: 10, flexDirection: 'row' }}>

                <Text style={{ color: 'white', fontSize: hp('1.5%'), color: color === false ? 'green' : 'white' }}>
                  Light
                </Text>
                <Text style={{ color: 'white', fontSize: hp('1.5%'), color: 'white' }}>  / </Text>
                <Text style={{ color: 'white', fontSize: hp('1.5%'), color: color === true ? 'green' : 'white' }}> Dark</Text>

              </View>

            </View>
            {/* <TouchableOpacity onPress={() => openGallary()} style={{ height: 100, width: 100, borderRadius: 200, alignSelf: 'center' , backgroundColor:'red'}}>
          {

            Loader === true ? 

            <ActivityIndicator size={'large'} color={"green"}/>

            :


            ImageUrl != "" ?

              <Image source={{ uri: ImageUrl }} style={{ alignSelf: 'center', height: 100, width: 100, borderRadius: 200 }} />
              :

              TakePfp != "" ?

                <Image source={{ uri: TakePfp }} style={{ alignSelf: 'center', height: 100, width: 100, borderRadius: 200 }} />

                :

                <Image source={require('../../assets/images/profile.png')} style={{ alignSelf: 'center', height: 100, width: 100 }} resizeMode={'contain'} />

          }


          <AntDesign name='edit' size={25} style={{ top: -20, right: -10, }} />


        </TouchableOpacity> */}
            {/* 
        <TouchableOpacity onPress={() => saveImage()} style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: wp('20%'), backgroundColor: 'blue', alignSelf: 'center', borderRadius: 200, marginTop: 15 }}>
          <Text style={{ color: 'white' }}>Save Image</Text>

        </TouchableOpacity> */}
            {
              console.log("Detailsss////......", Detail)
            }
            <Text style={{ fontWeight: 'bold', color: COLORS.Text, marginTop: 20, fontSize: 20 }}>Email</Text>
            <View style={{ height: 50, borderRadius: 200, backgroundColor: COLORS.WHITE, justifyContent: 'center', paddingHorizontal: 20, marginTop: 5 }}>
              <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: COLORS.Text, }}>{Detail?.Email}</Text>
            </View>

            <Text style={{ fontWeight: 'bold', color: COLORS.Text, marginTop: 20, fontSize: 20 }}>Username</Text>
            <View style={{ height: 50, borderRadius: 200, backgroundColor: COLORS.WHITE, paddingHorizontal: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: COLORS.Text, }}>{Detail?.username}</Text>
              <TouchableOpacity onPress={() => toggleModal()}>
                <AntDesign name='edit' size={25} color={COLORS.Text} />
              </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 0.2, backgroundColor: COLORS.WHITE, borderRadius: 20, padding: 20, justifyContent: 'space-between' }}>

                <Text style={{ fontSize: hp('2.5%',), fontWeight: 'bold' }}>Change Username</Text>
                <TextInput
                  style={{ height: 70, backgroundColor: "#c0c0c0", borderRadius: 10, paddingHorizontal: 20 }}
                  placeholder={"Username here"}
                  placeholderTextColor={"black"}
                  onChangeText={(txt) => {
                    setChangeUsername(txt)
                  }}
                  value={changeUsername}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>

                  <TouchableOpacity onPress={() => toggleModal()} style={{ height: 50, width: wp('39%'), backgroundColor: colors.secondery, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: COLORS.WHITE }}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => saveChange()} style={{ height: 50, width: wp('39%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: COLORS.WHITE }}>Save</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>

            <TouchableOpacity onPress={() => Logout()} style={{ height: 60, backgroundColor: colors.secondery, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: hp('2.5%'), fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={{ height: 60, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 30 }}>
              <Text style={{ color: "white", fontSize: hp('2.5%'), fontWeight: 'bold' }}>plan</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </FastImage>

  )
}
export default EditProfile


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
