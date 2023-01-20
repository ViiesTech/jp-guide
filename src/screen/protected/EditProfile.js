import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import colors from '../../constant/colors';


const EditProfile = ({ navigation }) => {

  const [Detail, setDetail] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [changeUsername, setChangeUsername] = useState('')


  const UID = auth().currentUser.uid
  const FetchData = () => {
    firestore()
      .collection('Users')
      .doc(UID)
      .onSnapshot((text) => {
        // console.log(text.exists)

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
  }, [])

  const Logout = () => {
    
    firestore()
    .collection('Users')
    .doc(UID)
    .update({

      LoggedIn: false,


    }).then(()=>{
      auth()
      .signOut()
    
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' color={'gray'} size={40} />
          </TouchableOpacity>
          <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: "black", marginLeft: 20 }}>Settings</Text>
        </View>
        <Image source={require('../../assets/images/headerLogo.png')} style={{ alignSelf: 'center', height: 200, width: 200 }} resizeMode={'contain'} />

        <Text style={{ fontWeight: 'bold', color: 'black', marginTop: 20, fontSize: 20 }}>Email</Text>
        <View style={{ height: 60, borderRadius: 200, backgroundColor: '#c0c0c0', justifyContent: 'center', paddingHorizontal: 20, marginTop: 5 }}>
          <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: 'black', }}>{Detail?.Email}</Text>
        </View>

        <Text style={{ fontWeight: 'bold', color: 'black', marginTop: 20, fontSize: 20 }}>Username</Text>
        <View style={{ height: 60, borderRadius: 200, backgroundColor: '#c0c0c0', paddingHorizontal: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: 'black', }}>{Detail?.username}</Text>
          <TouchableOpacity onPress={() => toggleModal()}>
            <AntDesign name='edit' size={25} />
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 0.2, backgroundColor: 'white', borderRadius: 20, padding: 20, justifyContent: 'space-between' }}>

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
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => saveChange()} style={{ height: 50, width: wp('39%'), backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: "white" }}>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

        <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={{ height: 100, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 30 }}>
          <Text style={{ color: "white", fontSize: hp('2.5%'), fontWeight: 'bold' }}>Upgrade Premium</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Logout()} style={{ height: 60, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 30 }}>
          <Text style={{ color: "white", fontSize: hp('2.5%'), fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default EditProfile