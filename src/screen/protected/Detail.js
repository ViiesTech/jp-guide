import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Pdf from 'react-native-pdf';
import PdfData from '../../component/PdfData'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Comment from '../../component/Comment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeAlert from 'react-native-awesome-alerts'
import ShowingComments from '../../component/ShowingComments'

import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'


const Detail = ({ navigation }) => {

  const UID = auth().currentUser.uid

  const [commentText, onCommentText] = useState("")
  const [Comment, getComment] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [isSelected, setSelected] = useState('ABQ')
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const HEIGHT = StatusBar.currentHeight;





  const source = { uri: `https://customdemo.website/apps/JP-Guide/upload/Airports/${isSelected}.pdf`, caches: true };

  const data = [
    { title: "ABQ", },
    { title: "AUS", },
    { title: "ATL", },

    { title: "BDL", },
    { title: "BNA", },
    { title: "BOS", },
    { title: "BWI", },

    { title: "CLE", },
    { title: "CLT", },

    { title: "DCA", },
    { title: "DEN", },
    { title: "DFW", },
    { title: "DTW", },

    { title: "EWR", },

    { title: "FLL", },

    { title: "GSO", },

    { title: "IAD", },
    { title: "IAH", },

    { title: "JFK", },

    { title: "LAS", },
    { title: "LAX", },
    { title: "LGA", },

    { title: "MCI", },
    { title: "MCO", },
    { title: "MEM", },
    { title: "MIA", },
    { title: "MSP", },

    { title: "OMA", },
    { title: "ORD", },

    { title: "PBI", },
    { title: "PHL", },
    { title: "PHX", },

    { title: "RDU", },
    { title: "RSW", },

    { title: "SAN", },
    { title: "SAT", },
    { title: "SFO", },
    { title: "SMF", },
    { title: "STL", },

    { title: "TPA", },
    { title: "TUL", },
    { title: "TUS", },

  ]


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
    <ScrollView >
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Airports Worldwide</Text>
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
                    <TouchableOpacity onPress={() => setSelected(item.title)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 20, backgroundColor: isSelected == item.title ? "gray" : null }}>
                      <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                      {/* <Text style={{ fontSize: 18, color: 'white' }}>{item.state}</Text> */}
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
{/*           
          <TouchableOpacity onPress={() => toggleModal()} style={{ height: 60, width: wp('90%'), backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>View or add comments</Text>
      </TouchableOpacity>
       */}
          <ScrollView style={{ backgroundColor: 'white', height: hp('65%'), marginTop: 20, borderRadius: 10, width: wp('85%') }}>

            <View style={{ padding: 30 }}>
              {
                isSelected ?

                  <PdfData URL={source} onSendComment={sendComment} onState={onCommentText} val={commentText} />

                  :
                  null
              }

              <FlatList
                data={Comment}
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
                            {/* <View style={{ flexDirection: 'row' }}>
                              <Image source={require('../../assets/images/profile.png')} style={{ height: 60, width: 60, }} />
                              <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>{name}</Text>
                                <Text style={{ fontSize: hp('1.5%') }}>{comment}</Text>
                              </View>
                            </View> */}

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
              

            {/* 
            <View style={{ height: 200, width: wp('80%'), alignSelf: 'center',  padding: 20 }}>
                <Comment/>
            </View> */}

          </ScrollView>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'black'
  },
  PDF: {
    height: 100,
    width: wp('80%'),
    backgroundColor: 'transparent',
    alignSelf: 'flex-start'
  }
})
export default Detail