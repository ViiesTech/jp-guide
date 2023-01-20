import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
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


const Communication = ({ navigation }) => {
  const UID = auth().currentUser.uid
  const HEIGHT = StatusBar.currentHeight;

  const [isSelected, setSelected] = useState("ACARS")

  const data = [
    { title: "ACARS", state: "Albuquerque,NM" },
    { title: "Re-establishing \nACARS", state: "Bradley Windsor Locks, CT" },
    { title: "Coded Departure\n Routes (Domestic)", state: "Albuquerque,NM" },
    { title: "Dispatch Frequencies \non the ground", state: "Albuquerque,NM" },
  ]


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



  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), minHeight: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>CommunicationsACARS</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ margin: 15 }} key={key}>
                    <TouchableOpacity onPress={() => setSelected(item.title)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 20, height: hp('7'), justifyContent: 'center', backgroundColor: item.title == isSelected ? "#8383AA" : null }}>
                      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 10, }}>
            <View style={{ padding: 30 }}>
              {
                isSelected == "ACARS" ?
                  <>
                    <Text style={[styles.text]}>• “No Comm Light” ensure the correct frequency is tuned</Text>
                    <Text style={[styles.text]}>• Primary ARINC - 131.55</Text>
                    <Text style={[styles.text]}>• SITA AIRCOM - 131.725</Text>
                    <Text style={[styles.text]}>• If “Voice Only” displayed on CDU, check VHF Comm #3, “DATA” needs to be in active window.</Text>
                    <Text style={[styles.text]}>• **Obtain Close Out from CCI via (“Input Required” Section: WBZ*)</Text>
                  </>
                  :
                  isSelected == "Re-establishing \nACARS" ?
                    <>
                      <Text style={[styles.text]}>• Menu, ACARS pg. 2</Text>
                      <Text style={[styles.text]}>Technical, Link Status, Manual Tune, *ARINC – AMER... Will begin to search freq’s.(131.55 is primary).</Text>
                      <Text style={[styles.text]}>• On Link Status page, ensure 4L is in VHF.</Text>
                      <Text style={[styles.text]}>• On ground, check CB’s behind FO, just above headrest (CMU-1 & CMU/ACARS (DC),row E 8 & 9).</Text>
                    </>
                    :

                    isSelected == "Coded Departure\n Routes (Domestic)" ?
                      <Text style={[styles.text]}>FOM Home Page: Flight Plan/Dispatch Release, Computer Flight Plan/Dispatch Release, Coded Departure Route (CDR), See hotlinks within chapter to explain + readback guidance.</Text>

                      :

                      isSelected == "Dispatch Frequencies \non the ground" ?
                        <Text style={[styles.text]}>FOM Home Page: Enroute ● Communications ● General: Dispatch Direct VHF Network- *Keep moving through the pages to see VHF ARINC frequencies map & Atlantic waters HF frequencies map.</Text>

                        :
                        null
              }
            </View>
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

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 50,
    color: 'black'
  }
})
export default Communication
