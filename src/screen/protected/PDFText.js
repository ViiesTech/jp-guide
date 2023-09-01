import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button, TextInput, Linking, _View, ActivityIndicator, } from 'react-native'
import React, { useRef } from 'react'
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useEffect } from 'react';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/AntDesign'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DocumentView, RNPdftron, PDFViewCtrl, } from "react-native-pdftron";
import { openComposer } from "react-native-email-link";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
import { A, T, V } from '../../arrayindex/Alphabet';
import { COLORS } from '../../utils/COLORS';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import { useSelector, useDispatch } from 'react-redux'

const PDFText = ({ navigation, route }) => {


  const [Loader, setLoader] = useState(true)




  const _viewer = useRef()



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

  const [pdfDocPath, setPDFDocPAth] = useState("")

  const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE: color === true ? "#000000" : "#FFFFFF",
    Text: color === true ? "#FFFFFF" : "#000000"

  }






  useEffect(() => {
    FetchComment()
  }, [])

  //Set Dark mode in pdf 


  const SetMode = () => {



    if (color === true) {
      // _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None)

      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.NightMode);
    } else {
      // _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.GradientMap);
      _viewer.current.setColorPostProcessMode(Config.ColorPostProcessMode.None)


    }
  }

  //Set Dark mode in pdf 





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


  //Orientation
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  const [screenResolution, setScreenResolution] = useState('')

  useEffect(() => {




    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Orientation.addOrientationListener(updateDimensions);

    return () => {
      Orientation.removeOrientationListener(updateDimensions);
    };
  }, []);

  useEffect(() => {

    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  //sadjansjkdnaskjndjsakndjksankdnaskjndjnsajdnaskjndjsankjdnasjndkasjndksandnasjndjkasndjasnda____________

  const saveDoc = () => {

    // console.log( "this.view",  _viewer)


    _viewer.current.saveDocument().then(async (filePath) => {


      await AsyncStorage.setItem(`${isSelected}`, filePath).then(() => {
        navigation.navigate('Home')
      })
    });

  }












  return (
    <View style={{ backgroundColor: COLORS.WHITE, }}>



      {/* 
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('90%'), alignSelf: 'center', marginTop: 20 }}>

    



      </View> */}


      <View style={{ height: 60, borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between', alignSelf: 'center' }}>

        {
          Loader === true ?
            <View>
            <ActivityIndicator size={ COLORS.Text} color={COLORS.Text} />
            <Text style={{color: COLORS.Text, fontWeight:'bold', marginTop:10}}>Saving</Text>
            </View>

            :
            <TouchableOpacity onPress={() => saveDoc()} style={{ alignItems: 'center', justifyContent: 'center' }} >
              <Icon name='back' color={COLORS.Text} size={30} />
              <Text style={{ color: COLORS.Text, fontWeight: 'bold' }}>Return to Home</Text>
            </TouchableOpacity>
        }


        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <Text style={{ color: color === true ? 'white' : colors.primary, fontWeight: 'bold', fontSize: hp('2%') }}>Is this airport information correct?</Text>


          <View style={{ flexDirection: 'row', marginLeft: 20 }}>

            <TouchableOpacity onPress={() => LikePdf()} style={{ backgroundColor: colors.primary, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
              <MaterialCommunityIcons name='thumb-up' size={30} color={Like === "Like" ? "blue" : "white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => DisLikePdf()} style={{ marginLeft: 20, backgroundColor: colors.primary, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }} >
              <MaterialCommunityIcons name='thumb-down' size={30} color={Like === "DisLike" ? "blue" : "white"} />
            </TouchableOpacity>

          </View>
        </View>



        <TouchableOpacity onPress={() => savePDFtoFirebase()} style={{ alignItems: 'center', justifyContent: 'center' }} >
          <Ionicons
            name='airplane'
            color={COLORS.Text}
            size={35}
          />
          <Text style={{ fontWeight: 'bold', color: COLORS.Text }}>Save This Airport</Text>
        </TouchableOpacity>
      </View>





      <Text style={{ alignSelf: 'center', fontSize: hp('1.2%'), fontWeight: 'bold', marginTop: 10 }}>Likes {TotalLike.length}</Text>

      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={{ alignSelf: 'center' }} >






          {
            pageUrl !== null ?

              <DocumentView

                document={pageUrl}
                ref={_viewer}


                onLoadComplete={(path) => {
                  console.log('The document has finished loading:', path);
                  SetMode()
                  setLoader(false)
                }}

                onDocumentError={(error) => {
                  console.log('Error occured during document opening:', error);
                  setLoader(false)

                }}
                onError={(error) => {
                  console.log('Error occured during document opening:', error);
                  setLoader(false)

                }}
                //
                bottomToolbarEnabled={false}

                showLeadingNavButton={true}
                //
                followSystemDarkMode={false}
                forceAppTheme={color === true ? Config.ThemeOptions.ThemeDark : Config.ThemeOptions.ThemeLight}
                autoSaveEnabled={true}
                hideTopAppNavBar={true}
                style={{ height: hp('100%'), width: screenWidth }}

              />

              :
              <ActivityIndicator size={25} />
          }






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
        <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 10, padding: 30, alignSelf: 'center', borderWidth: 1, borderColor: 'white' }}>
          <TouchableOpacity onPress={() => setDislikeModal(false)} style={{}}>
            <Entypo
              name='cross'
              size={30}
              color={COLORS.Text}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', alignSelf: 'center', color: COLORS.Text }}>What information has changed?</Text>

          <TextInput
            placeholder='Type here'
            placeholderTextColor={'gray'}
            style={{ height: 100, width: wp('90%'), borderWidth: 1, borderColor: COLORS.Text, borderRadius: 10, padding: 10, paddingTop: 10, marginTop: 15, color: COLORS.Text }}
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