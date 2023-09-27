import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Dimensions } from 'react-native'
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R, S, T, U, V, X, Y, globalSearch } from '../../arrayindex/Alphabet'
import { useSelector, useDispatch } from 'react-redux'
import Modal from "react-native-modal";
import Entypo from 'react-native-vector-icons/Entypo'
// import { COLORS } from '../../utils/COLORS'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Orientation from 'react-native-orientation-locker';
import { OrientationLocker, PORTRAIT, LANDSCAPE, useDeviceOrientationChange, OrientationType } from "react-native-orientation-locker";
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail = ({ navigation }) => {


  const color = useSelector(state => state.pdf.Dark)


  const COLORS = {
    WHITE : color === true ?  "#000000" : "#FFFFFF" ,
    Text : color === true ?  "#FFFFFF" :"#000000"

  }

  const UID = auth()?.currentUser?.uid

  const [commentText, onCommentText] = useState("")
  const [Comment, getComment] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [isSelected, setSelected] = useState('ABQ')
  const [isModalVisible, setModalVisible] = useState(false);
  const [getData, setGetData] = useState()
  const [ddata, setData] = useState()
  const [CurrentAplhabet, setAplhabet] = useState("")
  const [firebaseGlobalSearch, setFirebaseGlobalSearch] = useState()

  const [AlphabetPdfs, setAlphabetPdfs] = useState()

  const allPdf = useSelector(state => state.pdf.allPdf);

  // console.log("$$$$$$$$$$$$", allPdf)



  const [search, setSearch] = useState("");


  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",];
  const alphabets = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const HEIGHT = StatusBar.currentHeight;


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



  useEffect(() => {
    FetchComment()
    toggleModal()
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

 

  useEffect(() => {

    getMYData()
  }, [])

  const getMYData = () => {

    firestore()
      .collection("Users")
      .doc(UID)
      .onSnapshot((doc) => {
        // console.log("doccccccccer",doc.data())
        setData(doc?.data())

      })

  }

  const CallData = (Aplha) => {
    setSearch("")
    setAplhabet(Aplha)


    console.log(Aplha)



    firestore()
      .collection("Alphabet")
      .doc(Aplha)
      .collection(Aplha)
      .get()
      .then((i) => {
        const AlphabetPDF = i.docs?.map((doc) => doc.data())

        const sort = AlphabetPDF.sort((a, b) => a.name.localeCompare(b.name));

        setAlphabetPdfs(sort)

        // console.log("AlphabetPDF",sort)
      })
  }



  const goToPDFPage = async(item) => {

    // console.log("iiiiiiiiiii", item)

    // navigation.navigate('PDFViewerDelete')

    // console.log(item)
    // return


      await AsyncStorage.getItem(item.name).then((doc) => {
        console.log("docer;;';';';';';';';';';';';';';", doc)
        // return
        // setPDFDocPAth(doc)

        if(doc !== null){
          navigation.navigate('PDFText', { pageUrl: doc, isSelected: item.name, Airport: item.Airport })
          console.log("In Local Pdf")
        }else{

          firestore().collection("Users").doc(UID).collection("pdf").doc(item.name).get().then((doc)=>{

            if(doc.data() !== undefined){

              navigation.navigate('PDFText', { pageUrl: doc.data().ImageURL, isSelected: item.name, Airport: item.Airport })
              console.log("Going from my Local Pdf")
              
            }else{
              
              navigation.navigate('PDFText', { pageUrl: item.Page, isSelected: item.name, Airport: item.Airport })
              console.log("Going from my Global Pdf")

            }
              console.log(doc.data())
          })

        }
  
      })


  
      // console.log("Gettting version.......", doc)
  


    toggleModal()
  }



  return (
    <FastImage source={color === true ?  require('../../assets/images/hidark.png'): require('../../assets/images/hi.jpeg')}  style={{ flex:1}}>
      <Modal isVisible={isModalVisible}>

        <View style={{ flex: 1, backgroundColor: color === true ?  'rgba(252, 252, 252, 0.1)'  : 'white', padding: 20, borderRadius: 20, width:screenWidth * 0.9 }}>




          <TouchableOpacity onPress={() => { navigation.goBack() }}>

            <AntDesign name='closecircleo' size={25} color={COLORS.Text}/>
          </TouchableOpacity>


          <TextInput
            style={{ height: 60, width: screenWidth * 0.8, backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, marginTop: 10, borderWidth: 1, paddingHorizontal: 20 }}
            placeholder="Enter City / Country Name"
            placeholderTextColor={'gray'}
            onChangeText={(txt) => {
              setSearch(txt)
              // CallData(txt.charAt(0))
            }}


            value={search}

          />




          <Text style={{ alignSelf: 'center', color: COLORS.Text, fontSize: hp('3%'), marginTop: 20, fontWeight:'bold' }}>Select First Letter of Airport Code</Text>
          <View style={{ borderRadius: 10,  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.8 , alignSelf:'center' }} tot>

            {
              alphabet?.map((item) => {

                // console.log(".,................................", item)
                return (
                  <>
                    <TouchableOpacity onPress={() => CallData(item)} style={{ height: 40, width: 40, backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>{item}</Text>
                    </TouchableOpacity>

                  </>
                )
              })


            }




          </View>

          <View style={{ borderRadius: 10,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.8, alignSelf:'center'}} >

          
          {
            alphabets?.map((item) => {

              // console.log(".,................................", item)
              return (
                <>
                  <TouchableOpacity onPress={() => CallData(item)} style={{ height: 40, width: 40, backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                    <Text style={{ color:'white', fontWeight: 'bold', fontSize: hp('2%') }}>{item}</Text>
                  </TouchableOpacity>

                </>
              )
            })
          }
          </View>
          {/* <Text style={{ color: 'black', alignSelf: 'center', fontSize: hp('2.5%') }}>Airport Code for {CurrentAplhabet}</Text> */}
          {
            getData?.length === 0 || getData === undefined ?

              // <Text style={{ color: 'black', fontSize: hp("2.5%"), alignSelf: 'center' }}>Nothing found</Text>
              <View />



              :

              <View />
          }
  

          <Text style={{ alignSelf: 'center', fontSize: hp('3%',), fontWeight: 'bold', marginTop: 20, color:COLORS.Text }}>Airports</Text>
          <ScrollView style={{alignSelf:'center'}}>
            <ScrollView horizontal scrollEnabled={false} contentContainerStyle={{ flexWrap: 'wrap', width: screenWidth * 0.8, alignSelf:'center',  }}>

              {

                search === "" ?

                  AlphabetPdfs?.filter((val) => {

                    // console.log(val)
                    if (search === "") {
                      return val
                    } else if (AlphabetPdfs?.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                      return val
                    }
                  }).map((item, key) => {
                    // console.log("item", item)


                    return (
                      <View style={{ marginLeft: 20 }}>



                        <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 50, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', width: 50, alignSelf: 'center',marginRight:10,}}>



                          <Text style={{ color: "white", alignSelf: 'center', fontSize: hp('1.8%'), fontWeight: 'bold' }}>
                            {item.name}
                          </Text>

                        </TouchableOpacity>


                      </View>
                    )
                  })

                  :

                  allPdf?.filter((val) => {

                    // console.log("itemmmmmmmmm", val)
                    if (search === "") {
                      return val
                    } else if (val.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                      return val
                    }
                  }).map((item, key) => {
                    // console.log("item", item)


                    return (
                      <View style={{ marginLeft: 20 }}>



                        <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 50, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', width: 50, alignSelf: 'center', marginRight:10 }}>



                          <Text style={{ color: "white", alignSelf: 'center', fontSize: hp('1.8%'), fontWeight: 'bold' }}>
                            {item.name}
                          </Text>

                        </TouchableOpacity>


                      </View>
                    )
                  })



              }
            </ScrollView>
          </ScrollView>

        </View>
      </Modal>
    </FastImage>
    // <ScrollView >
    //   <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
    //     <Header Logo={require('../../assets/images/profile.png')} profile={require('../../assets/images/OldPic.png')} btnColor={colors.primary} Nav={navigation} />
    //   </View>
    //   <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
    //     <View style={{ padding: 30 }}>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <TouchableOpacity onPress={() => navigation.goBack()}>
    //           <Icon name='arrow-back' color={'gray'} size={50} />
    //         </TouchableOpacity>
    //         <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Airports Worldwide</Text>
    //       </View>
    //       {/* <View style={{ marginTop: 10 }}>
    //         <FlatList
    //           data={data}
    //           keyExtractor={item => item.id}
    //           horizontal
    //           showsHorizontalScrollIndicator={false}
    //           renderItem={({ item, key }) => {
    //             return (
    //               <View style={{ margin: 15 }} key={key}>
    //                 <TouchableOpacity onPress={() => setSelected(item.title)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 20, backgroundColor: isSelected == item.title ? "gray" : null }}>
    //                   <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
    //                   <Text style={{ fontSize: 18, color: 'white' }}>{item.state}</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             )
    //           }}
    //         />
    //       </View> */}
    //       {/*           
    //       <TouchableOpacity onPress={() => toggleModal()} style={{ height: 60, width: wp('90%'), backgroundColor: colors.primary, alignSelf: 'center', borderRadius: 500, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
    //     <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2%') }}>View or add comments</Text>
    //   </TouchableOpacity>
    //    */}
    //       <ScrollView style={{ backgroundColor: 'white', height: hp('65%'), marginTop: 20, borderRadius: 10, width: wp('85%') }}>

    //         <View style={{ padding: 30 }}>
    //           {
    //             isSelected === "AUA" || isSelected === "ANU" || isSelected === "BAQ" || isSelected === "BDA" || isSelected === "BGI" || isSelected === "BOG" || isSelected === "BZE" || isSelected === "CZM" || isSelected === "CAP" || isSelected === "CCS" || isSelected === "CLO" || isSelected === "CUN" || isSelected === "CUR" ||isSelected === "FDF" ||isSelected === "GCM" ||isSelected === "GDL" ||isSelected === "GEO" ||isSelected === "GND" || isSelected === "GUA" || isSelected ==="GYE" ||isSelected === "HAV" || isSelected ==="HOG" || isSelected ==="KIN" || isSelected ==="LIR" || isSelected ==="MAR" || isSelected ==="MBJ" || isSelected ==="MDE" ||isSelected === "MEX" ||isSelected === "MGA"  ||isSelected === "NAS" ||isSelected === "PAP" || isSelected ==="PLS" || isSelected ==="POP" ||isSelected === "POS" ||isSelected === "PTY" ||isSelected === "PUJ" ||isSelected === "PVR" || isSelected ==="RTB" ||isSelected === "SAL" ||isSelected === "SAP" ||isSelected === "SDQ" ||isSelected === "SJO" ||isSelected === "SJU" ||isSelected === "SKB" ||isSelected === "SNU" ||isSelected === "STI"  ||isSelected === "STX" ||isSelected === "SXM" ||isSelected === "UIO" ||isSelected === "UVF" ||isSelected === "VRA" ||isSelected === "XPL" ||isSelected === "YUL" || isSelected ==="YYZ" ?
    //               <PdfData URL={sources} onSendComment={sendComment} onState={onCommentText} val={commentText} />

    //               :

    //               <PdfData URL={source} onSendComment={sendComment} onState={onCommentText} val={commentText} />


    //           }

    //           <FlatList
    //             data={Comment}
    //             renderItem={(cmt) => {

    //               const comment = cmt?.item.data().Comment
    //               const name = cmt?.item.data().name
    //               const uid = cmt?.item.data().UID

    //               return (
    //                 <>
    //                   {
    //                     comment !== "" ?
    //                       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35, width: wp('70%'), justifyContent: 'space-between' }}>
    //                         <ShowingComments name={name} comment={comment} />
    //                         {/* <View style={{ flexDirection: 'row' }}>
    //                           <Image source={require('../../assets/images/profile.png')} style={{ height: 60, width: 60, }} />
    //                           <View style={{ marginLeft: 15 }}>
    //                             <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>{name}</Text>
    //                             <Text style={{ fontSize: hp('1.5%') }}>{comment}</Text>
    //                           </View>
    //                         </View> */}

    //                         {
    //                           UID === uid ?
    //                             <TouchableOpacity onPress={() => onDeleteComment(cmt.item.id)}>

    //                               <MaterialCommunityIcons
    //                                 name='delete'
    //                                 size={25}

    //                               />
    //                             </TouchableOpacity>
    //                             :
    //                             null
    //                         }

    //                       </View>

    //                       :

    //                       <Text>No Comment here</Text>

    //                   }


    //                 </>
    //               )
    //             }}
    //           />
    //         </View>


    //         {/* 
    //         <View style={{ height: 200, width: wp('80%'), alignSelf: 'center',  padding: 20 }}>
    //             <Comment/>
    //         </View> */}

    //       </ScrollView>
    //     </View>
    //   </View>
    // </ScrollView>
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