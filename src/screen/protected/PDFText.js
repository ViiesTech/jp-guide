import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button } from 'react-native'
import React from 'react'
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'




import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../constant/colors';

const PDFText = ({ navigation, route }) => {

  const UID = auth().currentUser.uid
  const { pageUrl, isSelected } = route.params;

  console.log('pageUrl', pageUrl)

  const source = { uri: pageUrl, caches: true };

  const [commentText, onCommentText] = useState("")
  const [Comments, getComment] = useState("")

  useEffect(() => {
    FetchComment()
  }, [])

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

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  return (
    <View style={{ backgroundColor: 'white', }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, padding: 20, marginTop: 20 }}>
        <Icon name='back' color={'black'} size={25} />
      </TouchableOpacity>


      <TouchableOpacity onPress={() => toggleModal()} style={{ height: 60, width: wp('90%'), backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>View or add comments</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View >
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf} />



        </View>

        <Modal isVisible={isModalVisible}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' , padding:20, borderRadius:10}}>

            <TouchableOpacity onPress={() => toggleModal()}>
              <Entypo name={'circle-with-cross'} size={40} color={'black'} />
            </TouchableOpacity>

            {/* <Button title="Hide modal" onPress={toggleModal} /> */}

            <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, backgroundColor: 'white', borderRadius: 20, paddingBottom: 70, bottom: 0 }}>

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
          </ScrollView>
        </Modal>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  pdf: {

    height: hp('100%'),
    width: wp('100%')
  }
});

export default PDFText