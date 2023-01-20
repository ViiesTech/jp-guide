import { View, Text, StatusBar, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Maintenances = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const UID = auth().currentUser.uid

  const [isSelected, setIsSelected] = useState("Maintenance")

  console.log(isSelected)

  const [commentText, onCommentText] = useState("")
  const [Comments, getComment] = useState("")

  // console.log("dsandiuasndiuasnuidnsainidansin",isSelected)

  useEffect(() => {
    FetchComment()
  }, [isSelected])

  const sendComment = () => {

    if (commentText !== "") {
      firestore()
        .collection('Users')
        .doc(UID)
        .get()
        .then((info) => {
          firestore()
            .collection('Comments')
            .doc(isSelected)
            .collection("Comments")
            .add({
              name: info?.data()?.username,
              Comment: commentText,
              UID: UID,
              CreatedAt: Math.floor(Date.now() / 1000)
            }, {
              merge: true
            })
        }).then(() => {
          onCommentText("")
        })


    }

  }


  const FetchComment = () => {

    firestore()
      .collection('Comments')
      .doc(isSelected)
      .collection("Comments")
      .orderBy('CreatedAt', 'desc')
      .onSnapshot((doc) => {
        const Temp = []
        doc?.docs?.map((tnt) => {
          Temp.push(tnt)
        })
        getComment(Temp)
      })
  }

  const onDeleteComment = (chatID) => {

    firestore()
      .collection('Comments')
      .doc(isSelected)
      .collection("Comments")
      .doc(chatID)
      .delete()
  }



  const data = [
    { title: "Assistance to \nMaintenance", isActive: "Maintenance" }, { title: "Fluid Leak \n(Fuel)", isActive: "Fuel" }, { title: "Frequent ARMS \nCodes", isActive: "ARMS" }, { title: "737-NG & MAX \nINFO", isActive: "INFO" }
  ]
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), minHeight: hp('85%'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Maintenance Information</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, justifyContent: 'center' }}>
            {data.map((item, key) => {
              return (
                // <View style={{margin:10,borderRadius:20,borderColor:'white',borderWidth:1,backgroundColor: isSelected === "Maintenance" || "Fuel" || "ARMS" || "INFO"?'#8383AA':null}}>
                <TouchableOpacity onPress={() => setIsSelected(item.isActive)} style={{ width: wp('35'), height: hp('20'), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 10, marginRight: 10, marginTop: 10, backgroundColor: item.isActive == isSelected ? "#8383AA" : null }}>
                  <Text style={{ fontSize: 24, color: 'white' }}>{item.title}</Text>
                </TouchableOpacity>
                // </View>
              )
            })}
          </View>
          <View style={{ padding: 20, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, width: wp('73') }}>
            {
              isSelected == "Maintenance" ?
                <Text style={{ fontSize: 22, lineHeight: 50 }}>FOM Home Page: Preflight, Maintenance, Special Circumstances, Assistance to Maintenance & Pay and Credit.</Text>
                :
                isSelected == "Fuel" ?
                  <Text style={{ fontSize: 22, lineHeight: 50 }}>AOM Home page: Supplementary Procedures, Engines, Engine Drain Mast Fluid Leaks.</Text>
                  :
                  isSelected == "ARMS" ?
                    <>
                      <Text style={{ fontSize: 22, lineHeight: 50 }}>• Oil Service Code:<Text style={{ fontWeight: 'bold' }}> 791201xx</Text> (xx= 01 Left Eng., 02 Right. Eng., 03 Both)</Text>
                      <Text style={{ fontSize: 22, lineHeight: 50 }}>• MAX - Overhead Maintenance Light “On”: Code: 46101100</Text>
                      <Text style={{ fontSize: 22, lineHeight: 50 }}>• Windshield Clean:<Text style={{ fontWeight: 'bold' }}> 12020200</Text></Text>
                    </>
                    :
                    isSelected == "INFO" ?
                      <>
                        <Text style={{ fontSize: 22, lineHeight: 50 }}>• Minimum oil prior to engine start: <Text style={{ fontWeight: 'bold' }}>NG- 12</Text> Qts., <Text style={{ fontWeight: 'bold' }}>MAX- 14</Text> Qts.</Text>
                        <Text style={{ fontSize: 22, lineHeight: 50 }}>• Oil service required if: <Text style={{ fontWeight: 'bold' }}>NG- </Text>Below <Text style={{ fontWeight: 'bold' }}>12</Text> Qts., MAX-Below <Text style={{ fontWeight: 'bold' }}>14 </Text>Qts</Text>
                        <Text style={{ fontSize: 22, lineHeight: 50 }}>• Oil service for RON: <Text style={{ fontWeight: 'bold' }}>NG- </Text>Below <Text style={{ fontWeight: 'bold' }}>14</Text> Qts., MAX-Below <Text style={{ fontWeight: 'bold' }}>15 </Text>Qts</Text>
                        <Text style={{ fontSize: 22, lineHeight: 50 }}>• Min Hyd. Brake Pressure-<Text style={{ fontWeight: 'bold' }}> 2800</Text> psi</Text>
                        <Text style={{ fontSize: 22, lineHeight: 50 }}>• Min Fuel in each main tank during ground ops.-<Text style={{ fontWeight: 'bold' }}> 1675</Text> lbs</Text>

                      </>
                      :
                      null

            }

          </View>

          <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, backgroundColor: 'white', marginTop: 20, borderRadius: 20 }}>

            <Comment onSendComment={sendComment} onState={onCommentText} val={commentText} />

            <FlatList
              data={Comments}
              renderItem={(cmt) => {

                const comment = cmt?.item.data().Comment
                const name = cmt?.item.data().name
                const uid = cmt?.item.data().UID

                return (
                  <>
                    {
                      comment !== "" ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35, width: wp('70%'), justifyContent: 'space-between' }}>
                          <ShowingComments name={name} comment={comment} />
                          {
                            UID === uid ?
                              <TouchableOpacity onPress={() => onDeleteComment(cmt.item.id)}>

                                <MaterialCommunityIcons
                                  name='delete'
                                  size={25}

                                />
                              </TouchableOpacity>
                              :
                              null
                          }

                        </View>

                        :

                        <Text>No Comment here</Text>

                    }


                  </>
                )
              }}
            />
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default Maintenances