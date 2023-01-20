import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, MaskedViewIOS } from 'react-native'
import React,{useState, useEffect} from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Comment from '../../component/Comment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import ShowingComments from '../../component/ShowingComments'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Operational = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  
  const UID = auth().currentUser.uid

  const data = [
    { title: "Climb for Terrain", des: "Location Diagram: AOM Home Page: Aircraft General, Emergency Equipment: Location Diagrams.", iamge: require('../../assets/images/airplan.png') },
    { title: "Cold Weather Operations", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]
  const data2 = [
    { title: "Emergency Equipment", des: "Location Diagram: AOM Home Page: Aircraft General, Emergency Equipment: Location Diagrams.", iamge: require('../../assets/images/airplan.png') },
    { title: "Threat Levels", des: "FOM Home Page: Fast Reference Links, Threat Levels", iamge: require('../../assets/images/airplan.png') },
    // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." },
    // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]
  const data3 = [
    { title: "Flight Confidence Check", des: "FOM Home Page: Post Flight/RON, Maintenance, FCC/FCF/ ETOPS: Flight Confidence Checks.", iamge: require('../../assets/images/airplan.png') },
    { title: "FO’s with less than 100 hours", des: "FOM Home Page: Qualifications/Limitations (next page), First Officer With Less Than 100 Hours." },
    { title: "Revised Mandatory Face Mask PA", des: "Comply365: My Publications, COVID-19 Guidance and Info., Company Guidance & Information, Revised Mandatory Face Mask PA." },
    // { title: "Climb for Terrain", des: "AOM Home Page: Adverse Weather, General (next page), Cold Weather Operations." }
  ]

  const data4 = [
    { title: "Noise Abatement Takeoff (NADP 2 & NADP 1)", des: "AOM Home Page: Takeoff, Procedures, Normal/Noise Abatement Takeoff.", iamge: require('../../assets/images/airplan.png') },
    { title: "Pay and Credit", des: "FOM Home Page: Preflight, General, Delays (next page), Ready for Departure (RFD)." },
    { title: "Required Reports", des: "FOM Home Page: Fast Reference Links, Required Reports" },
    { title: "Sabre/DECS entries", des: "FOM Home Page: Additional Chapters, Sabre/DECS" }
  ]

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
            .doc("Operation")
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
      .doc("Operation")
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
      .doc("Operation")
      .collection("Comments")
      .doc(chatID)
      .delete()
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/logo1.png')} profile={require('../../assets/images/profile.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Operational Information</Text>
          </View>
          <ScrollView style={{ height: hp('65'), marginTop: 20, borderRadius: 10 }}>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/images/airplan.png')} style={{ width: 50, height: 20 }} />
                <Text style={{ color: 'red', fontSize: 20, marginLeft: 10 }}>Bleeds Off Takeoff</Text>
              </View>
              <Text style={{ fontSize: 20, lineHeight: 40 }}>AOM Home Page: Fast Reference Links, Engine Bleed Off Takeoff.</Text>
            </View>

            {/* FLALIST CLIMB OF TERRAIN */}
            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('50') }}>
                      <View style={{ flexDirection: 'row' }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />


            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data3}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('45%') }}>
                      <View style={{ flexDirection: 'row', width: wp('45') }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />

            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data4}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, }}>
                      <View style={{ flexDirection: 'row', width: wp('45%') }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />

            <FlatList
              horizontal
              keyExtractor={item => item.id}
              data={data2}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 50 }}
              renderItem={({ item, key }) => {
                return (
                  <View style={{ marginRight: 20, justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, width: wp('50') }}>
                      <View style={{ flexDirection: 'row' }}>
                        {item.iamge ?
                          <Image source={item.iamge} style={{ width: 50, height: 20 }} /> :
                          null
                        }
                        <Text style={{ color: 'red', fontSize: 20 }}>{item.title}</Text>
                      </View>
                      <Text style={{ fontSize: 20, lineHeight: 40 }}>{item.des}</Text>
                    </View>
                  </View>
                )
              }}
            />

            <View style={{ width: wp('80%'), alignSelf: 'center', padding: 20, backgroundColor: 'white', marginTop: 20, borderRadius: 20 }}>

              <Comment onSendComment={sendComment} onState={onCommentText} val={commentText}/>

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
        </View>
      </View>
    </ScrollView>
  )
}

export default Operational