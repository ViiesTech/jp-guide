import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button, TextInput, Linking } from 'react-native'
import React from 'react'
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DocumentView, RNPdftron } from "react-native-pdftron";
import { openComposer } from "react-native-email-link";



import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../constant/colors';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Config } from 'react-native-pdftron';
import { T, V } from '../../arrayindex/Alphabet';
import { COLORS } from '../../utils/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';

const PDFText = ({ navigation, route }) => {


  const [LikedModel, setLikedModel] = useState(false);
  const [DislikedModal, setDislikeModal] = useState(false);

  const [EmailMsg, setEmailMsg] = useState("");

  const UID = auth()?.currentUser?.uid
  const { pageUrl, isSelected, Airport } = route.params;

  console.log('pageUrl', pageUrl, isSelected)

  const source = { uri: pageUrl, caches: true };

  const [commentText, onCommentText] = useState("")
  const [Comments, getComment] = useState("")
  const [Like, disLike] = useState("")

  const [TotalLike, setTotalLike] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);


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
      .collection("Like&Dislike")
      .where('status', '==', 'Like')
      .onSnapshot((doc) => {


        const Temp = []

        doc?.docs?.map((doc) => {
          if (doc?.data()?.status === "Like") {

            Temp.push(doc?.data())
          }


          if (doc?.data()?.UID === UID) {
            disLike(doc?.data()?.status)
          }

        })

        console.log("Temp", Temp.length)
        setTotalLike(Temp)
        //   console.log("docer",)

        //   if (doc.data().Comment === "Dislike") {
        //     disLike("Dislike")
        //   }


        //   Temp.push(doc.data())
      })





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


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const LikePdf = () => {

    disLike("Like")

    firestore()
      .collection('Users')
      .doc(UID)
      .get()
      .then((info) => {
        // console.log("infoooooooooooooooo", info)
        firestore()
          .collection("Comments")
          .doc(isSelected)
          .collection("Like&Dislike")
          .doc(UID)
          .set({
            // name: info?.data()?.username,
            status: "Like",
            UID: UID,
          })

      }).then(() => {
        setLikedModel(true)

      }).then(() => {
        setTimeout(() => {
          setLikedModel(false)
        }, 2000)
      })
  }

  const DisLikePdf = () => {

    // console.log("Dislike")

    disLike("Dislike")


    firestore()
      .collection('Users')
      .doc(UID)
      .get()
      .then((info) => {
        // console.log("infoooooooooooooooo", info)
        firestore()
          .collection("Comments")
          .doc(isSelected)
          .collection("Like&Dislike")
          .doc(UID)
          .set({
            // name: info?.data()?.username,
            status: "Dislike",
            UID: UID,
          })

      }).then(() => {
        setDislikeModal(true)
      })
  }

  const savePDFtoFirebase = () => {

    firestore()
      .collection("SavedPDF")
      .doc(isSelected)
      .set({
        pdfURL: pageUrl,
        code: isSelected,
        AirportName: Airport
      }, {
        merge: true,
      }).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Saved',
        });
      })
  }


  const sendEmail = () => {
    if (EmailMsg === "") {
      Toast.show({
        type: 'error',
        text1: 'Text Field is empty',
      });
    } else {

      openComposer({
        to: "thejpguide@gmail.com",
        subject: "Jp-Guide",
        body: `${EmailMsg}`,
      }).then((res) => {

        console.log("response: " + res.app)
        setDislikeModal(false)
      }).catch((err) => {
        console.log("Error: " + err)

      })

    }



  };



  return (
    <View style={{ backgroundColor: 'white', }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%'), alignSelf: 'center', marginTop: 20 }}>

        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ height: 60, }}>
          <Icon name='back' color={'black'} size={30} />
        </TouchableOpacity>



        <TouchableOpacity onPress={() => savePDFtoFirebase()} style={{ alignItems: 'center', justifyContent: 'center' }} >
          <Ionicons
            name='airplane'
            color={COLORS.BLACK}
            size={35}
          />
          <Text style={{ fontWeight: 'bold' }}>Save This Airport</Text>
        </TouchableOpacity>

      </View>


      <TouchableOpacity onPress={() => toggleModal()} style={{ height: 60, backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'row', width: wp('90%'), paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>Is this airport information correct?</Text>


        <View style={{ flexDirection: 'row', marginLeft:20 }}>

          <TouchableOpacity onPress={() => LikePdf()} >
            <Fontisto name='like' size={30} color={Like === "Like" ? "blue" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DisLikePdf()} style={{ marginLeft: 20 }}>
            <Fontisto name='dislike' size={30} color={Like === "DisLike" ? "blue" : "white"} />
          </TouchableOpacity>

        </View>
      </TouchableOpacity>





      <Text style={{ alignSelf: 'center', fontSize: hp('1.2%'), fontWeight: 'bold', marginTop: 10 }}>Likes {TotalLike.length}</Text>

      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View >
          <DocumentView
            source={pageUrl}
            // disabledElements={[Config.AnnotationMenu]}
            disabledTools={[Config.Buttons.addPageButton]}



            style={styles.pdf} />



        </View>




        <Modal isVisible={isModalVisible}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>

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


      {
        //LIKED MODAL
      }
      <Modal
        isVisible={LikedModel}

        animationOut={'fadeOut'}
        animationIn={'fadeIn'}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Thank you for confirming 🎉 </Text>
        </View>
      </Modal>




      {
        //Dislike MODAL
      }
      <Modal
        isVisible={DislikedModal}

        animationOut={'fadeOut'}
        animationIn={'fadeIn'}
      >
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>What information has changed?</Text>

          <TextInput
            placeholder='Type here'
            placeholderTextColor={'gray'}
            style={{ height: 100, width: wp('90%'), borderWidth: 1, borderColor: 'black', borderRadius: 10, padding: 10, paddingTop: 10, marginTop: 15 }}
            numberOfLines={3}
            multiline={true}
            onChangeText={(txt) => {
              setEmailMsg(txt)
            }}
            value={EmailMsg}
          />


          <TouchableOpacity onPress={() => { sendEmail() }} style={{ height: 80, width: wp('90%'), backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </Modal>


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