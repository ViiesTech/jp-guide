import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button } from 'react-native'
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

const PDF = ({ navigation, route }) => {



  //   const UID = auth()?.currentUser?.uid
  const { pageUrl, isSelected, Airport } = route.params;

  //   console.log('pageUrl', pageUrl, isSelected)

  //   const source = { uri: pageUrl, caches: true };

  //   const [commentText, onCommentText] = useState("")
  //   const [Comments, getComment] = useState("")
  //   const [Like, disLike] = useState("")
  //   const [TotalLike, setTotalLike] = useState([])

  //   useEffect(() => {
  //     FetchComment()
  //   }, [])

  //   const sendComment = () => {

  //     if (commentText !== "") {
  //       firestore()
  //         .collection('Users')
  //         .doc(UID)
  //         .get()
  //         .then((info) => {
  //           firestore()
  //             .collection('Comments')
  //             .doc(isSelected)
  //             .collection("Comments")
  //             .add({
  //               name: info?.data()?.username,
  //               Comment: commentText,
  //               UID: UID,
  //               CreatedAt: Math.floor(Date.now() / 1000)
  //             }, {
  //               merge: true
  //             })
  //         }).then(() => {
  //           onCommentText("")
  //         })


  //     }

  //   }
  //   console.log(Like)


  //   const FetchComment = () => {
  //     // firestore()
  //     //   .collection('Comments')
  //     //   .doc(isSelected)
  //     //   .collection("Like")
  //     //   .onSnapshot((doc) => {
  //     //     // console.log(doc.docs[0].data())
  //     //     const Temp = []
  //     //     doc.docs.map((doc) => {
  //     //       console.log("docer",)
  //     //       if (doc.data().Comment === "Dislike") {
  //     //         disLike("Dislike")
  //     //       }
  //     //       Temp.push(doc.data())
  //     //     })
  //     //     setTotalLike(Temp)
  //     //   })

  //     firestore()
  //       .collection('Comments')
  //       .doc(isSelected)
  //       .collection("Like&Dislike")
  //       .where('status', '==', 'Like')
  //       .onSnapshot((doc) => {


  //         const Temp = []
  //         doc?.docs?.map((doc) => {
  //           if (doc?.data()?.status === "Like") {
  //             Temp.push(doc?.data())
  //           }


  //           if (doc?.data()?.UID === UID) {
  //             disLike(doc?.data()?.status)
  //           }
  //         })

  //         console.log("Temp", Temp.length)
  //         setTotalLike(Temp)
  //            console.log("docer",)
  //            if (doc.data().Comment === "Dislike") {
  //              disLike("Dislike")
  //            }
  //            Temp.push(doc.data())
  //       })

  //     firestore()
  //       .collection('Comments')
  //       .doc(isSelected)
  //       .collection("Comments")
  //       .orderBy('CreatedAt', 'desc')
  //       .onSnapshot((doc) => {
  //         const Temp = []
  //         doc?.docs?.map((tnt) => {
  //           Temp.push(tnt)
  //         })
  //         getComment(Temp)
  //       })
  //   }

  //   const onDeleteComment = (chatID) => {

  //     firestore()
  //       .collection('Comments')
  //       .doc(isSelected)
  //       .collection("Comments")
  //       .doc(chatID)
  //       .delete()
  //   }

  //   const [isModalVisible, setModalVisible] = useState(false);

  //   const toggleModal = () => {
  //     setModalVisible(!isModalVisible);
  //   };



  //   const LikePdf = () => {

  //     disLike("Like")


  //     firestore()
  //       .collection('Users')
  //       .doc(UID)
  //       .get()
  //       .then((info) => {
  //         // console.log("infoooooooooooooooo", info)
  //         firestore()
  //           .collection("Comments")
  //           .doc(isSelected)
  //           .collection("Like&Dislike")
  //           .doc(UID)
  //           .set({
  //             // name: info?.data()?.username,
  //             status: "Like",
  //             UID: UID,
  //           })

  //       }).then(() => {
  //       })
  //   }

  //   const DisLikePdf = () => {

  //   console.log("Dislike")

  //   disLike("Dislike")


  //     firestore()
  //       .collection('Users')
  //       .doc(UID)
  //       .get()
  //       .then((info) => {
  //         // console.log("infoooooooooooooooo", info)
  //         firestore()
  //           .collection("Comments")
  //           .doc(isSelected)
  //           .collection("Like&Dislike")
  //           .doc(UID)
  //           .set({
  //             // name: info?.data()?.username,
  //             status: "Dislike",
  //             UID: UID,
  //           })

  //       }).then(() => {
  //       })
  //   }

  //   const savePDFtoFirebase = () => {

  //       firestore()
  //       .collection("SavedPDF")
  //       .doc(isSelected)
  //       .set({
  //         pdfURL: pageUrl,
  //         code: isSelected,
  //         AirportName: Airport
  //       },{
  //         merge: true,
  //       })
  //   }


  return (
    <View style={{ backgroundColor: COLORS.WHITE, }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, marginTop: 10, marginLeft: 10 }}>
        <Icon name='back' color={'black'} size={30} />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View >
          <DocumentView
            source={pageUrl}
            // disabledElements={[Config.AnnotationMenu]}
            disabledTools={[Config.Buttons.addPageButton]}



            style={styles.pdf} />



        </View>


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

export default PDF