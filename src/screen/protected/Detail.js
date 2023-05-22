import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
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
import { COLORS } from '../../utils/COLORS'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Detail = ({ navigation }) => {

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

  console.log("$$$$$$$$$$$$", allPdf)



  const [search, setSearch] = useState("");


  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const HEIGHT = StatusBar.currentHeight;





  // const source = { uri: `https://customdemo.website/apps/JP-Guide/upload/Airports/${isSelected}.pdf`, caches: true };

  // const sources = { uri: `https://customdemo.website/apps/JP-Guide/upload/${isSelected}.pdf`, caches: true };

  // const data = [
  //   { title: "ABQ", },
  //   { title: "AUS", },
  //   { title: "ATL", },

  //   { title: "AUA", },
  //   { title: "ANU", },


  //   { title: "BDL", },
  //   { title: "BNA", },
  //   { title: "BOS", },
  //   { title: "BWI", },

  //   { title: "BAQ", },
  //   { title: "BDA", },
  //   { title: "BGI", },
  //   { title: "BOG", },
  //   { title: "BZE", },

  //   { title: "CLE", },
  //   { title: "CLT", },

  //   { title: "CAP", },
  //   { title: "CCS", },
  //   { title: "CLO", },
  //   { title: "CUN", },
  //   { title: "CUR", },
  //   { title: "CZM", },


  //   { title: "DCA", },
  //   { title: "DEN", },
  //   { title: "DFW", },
  //   { title: "DTW", },

  //   { title: "EWR", },

  //   { title: "FLL", },

  //   { title: "FDF", },


  //   { title: "GCM", },
  //   { title: "GDL", },
  //   { title: "GEO", },
  //   { title: "GND", },
  //   { title: "GUA", },
  //   { title: "Gye", },


  //   { title: "GSO", },

  //   { title: "HAV", },
  //   { title: "HOG", },


  //   { title: "IAD", },
  //   { title: "IAH", },

  //   { title: "JFK", },

  //   { title: "KIN", },

  //   { title: "LAS", },
  //   { title: "LAX", },
  //   { title: "LGA", },

  //   { title: "LIR", },


  //   { title: "MCI", },
  //   { title: "MCO", },
  //   { title: "MEM", },
  //   { title: "MIA", },
  //   { title: "MSP", },

  //   { title: "MAR", },
  //   { title: "MBJ", },
  //   { title: "MDE", },
  //   { title: "MEX", },
  //   { title: "MGA", },

  //   { title: "NAS", },

  //   { title: "OMA", },
  //   { title: "ORD", },

  //   { title: "PBI", },
  //   { title: "PHL", },
  //   { title: "PHX", },

  //   { title: "PAP", },
  //   { title: "PLS", },
  //   { title: "POP", },
  //   { title: "POS", },
  //   { title: "PTY", },
  //   { title: "PUJ", },
  //   { title: "PVR", },

  //   { title: "RDU", },
  //   { title: "RSW", },

  //   { title: "RTB", },

  //   { title: "SAN", },
  //   { title: "SAT", },
  //   { title: "SFO", },
  //   { title: "SMF", },
  //   { title: "STL", },

  //   { title: "SAL", },
  //   { title: "SAP", },
  //   { title: "SDQ", },
  //   { title: "SJO", },
  //   { title: "SJU", },
  //   { title: "SKB", },
  //   { title: "SNU", },
  //   { title: "STI", },
  //   { title: "STT", },
  //   { title: "STX", },
  //   { title: "SXM", },

  //   { title: "TPA", },
  //   { title: "TUL", },
  //   { title: "TUS", },

  //   { title: "UIO", },
  //   { title: "UVF", },

  //   { title: "VRA", },

  //   { title: "XPL", },

  //   { title: "YUL", },
  //   { title: "YYZ", },




  // ]


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

  // const onDeleteComment = (chatID) => {

  //   firestore()
  //     .collection('Comments')
  //     .doc(isSelected)
  //     .collection("Comments")
  //     .doc(chatID)
  //     .delete()
  // }

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

    // const Temp = []
    // if (Aplha === "A") {
    //   A.forEach((item) => {
    //     console.log(",..............", item)
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "B") {
    //   B.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "C") {
    //   C.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "D") {
    //   D.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "E") {
    //   E.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "F") {
    //   F.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "G") {
    //   G.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "H") {
    //   H.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "I") {
    //   I.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "J") {
    //   J.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "K") {
    //   K.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "L") {
    //   L.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "M") {
    //   M.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "N") {
    //   N.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "O") {
    //   O.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "P") {
    //   P.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "R") {
    //   R.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "S") {
    //   S.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "T") {
    //   T.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "U") {
    //   U.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "V") {
    //   V.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "X") {
    //   X.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else if (Aplha === "Y") {
    //   Y.forEach((item) => {
    //     Temp.push(item)
    //   })
    // } else {

    // }

    // setGetData(Temp)
  }



  const goToPDFPage = (item) => {

    console.log("iiiiiiiiiii",item)

    navigation.navigate('PDFText', { pageUrl: item.Page, isSelected: item.name , Airport: item.Airport})
    toggleModal()
  }



  return (
    <View>
      <Modal isVisible={isModalVisible}>

        <View style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 20 }}>

          <TouchableOpacity onPress={() => { navigation.goBack() }}>

            <AntDesign name='closecircleo' size={25} />
          </TouchableOpacity>


          <TextInput
            style={{ height: 60, width: wp('80%'), backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, marginTop: 10, borderWidth: 1, paddingHorizontal: 20 }}
            placeholder="Enter City / Country Name"
            onChangeText={(txt) => {
              setSearch(txt)
              // CallData(txt.charAt(0))
            }}


            value={search}

          />


          {/* <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'black' }}>Airport Code By Aplhabets</Text> */}
          <View style={{ borderRadius: 10, padding: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>

            {
              alphabet?.map((item) => {

                console.log(".,................................", item)
                return (
                  <>
                    <TouchableOpacity onPress={() => CallData(item)} style={{ height: 70, width: 70, backgroundColor: colors.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2.5%') }}>{item}</Text>
                    </TouchableOpacity>

                  </>
                )
              })
            }


            <TouchableOpacity >

            </TouchableOpacity>
          </View>
          {/* <Text style={{ color: 'black', alignSelf: 'center', fontSize: hp('2.5%') }}>Airport Code for {CurrentAplhabet}</Text> */}
          {
            getData?.length === 0 || getData === undefined ?

              // <Text style={{ color: 'black', fontSize: hp("2.5%"), alignSelf: 'center' }}>Nothing found</Text>
              <View/>



              :

              <View />
          }
          {
            console.log('Airport Code for {CurrentAplhabet', getData)
          }
          <ScrollView>
            {

              search === "" ?

                AlphabetPdfs?.filter((val) => {

                  console.log(val)
                  if (search === "") {
                    return val
                  } else if (AlphabetPdfs?.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                }).map((item, key) => {
                  console.log("item", item)


                  return (
                    <>



                      <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>

                        {/* <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: COLORS.WHITE, borderWidth: 1, borderRadius: 200, borderColor: COLORS.BLACK, position: 'absolute', zIndex: 100, top: -10, right: -10 , alignItems:'center', justifyContent:'center'}}>
                          <TouchableOpacity >
                            <MaterialIcons
                              name='save'
                              color={COLORS.BLACK}
                              size={25}
                            />

                          </TouchableOpacity>
                        </TouchableOpacity> */}

                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                          {item.name}
                        </Text>
                        {/* {
                        item?.Domestic ?
                        <Text style={{alignSelf:'center', fontSize:hp('1%'),color:'white', fontWeight:'bold'}}>Domestic Airport</Text>

                        :
                        <Text style={{alignSelf:'center', fontSize:hp('1%'),color:'white', fontWeight:'bold'}}>International Airport</Text>


                      } */}
                      </TouchableOpacity>

                      <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                    </>
                  )
                })

                :

                allPdf?.filter((val) => {

                  console.log("itemmmmmmmmm", val)
                  if (search === "") {
                    return val
                  } else if (val.Airport && val.Airport.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                }).map((item, key) => {
                  console.log("item", item)


                  return (
                    <>
                      <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center', padding: item?.Domestic ? 10 : 0 }}>
                        {/* <TouchableOpacity style={{ height: 40, width: 40, backgroundColor: COLORS.WHITE, borderWidth: 1, borderRadius: 200, borderColor: COLORS.BLACK, position: 'absolute', zIndex: 100, top: -10, right: -10 , alignItems:'center', justifyContent:'center'}}>
                          <TouchableOpacity >
                            <MaterialIcons
                              name='save'
                              color={COLORS.BLACK}
                              size={25}
                            />

                          </TouchableOpacity>
                        </TouchableOpacity> */}

                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                          {item.name}
                        </Text>
                        {/* 
                      {
                        item?.Domestic ?
                        <Text style={{alignSelf:'center', fontSize:hp('1%'),color:'white', fontWeight:'bold'}}>Domestic Airport</Text>

                        :
                        <Text style={{alignSelf:'center', fontSize:hp('1%'),color:'white', fontWeight:'bold'}}>International Airport</Text>


                      } */}

                      </TouchableOpacity>
                      {/* 
                      {
                        item?.Domestic ?
                          <>
                            <Text style={{alignSelf:'center', fontSize:hp('2.5%')}}>Domestic Airports</Text>
                          </>
                          :

                          null
                      } */}

                      <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                    </>
                  )
                })



            }
          </ScrollView>

        </View>
      </Modal>
    </View>
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