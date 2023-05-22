import { ImageBackground, View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInputComp from '../../component/TextInputComp';
import colors from '../../constant/colors';
import Card from '../../component/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StripeProvider } from '@stripe/stripe-react-native';
import Modal from "react-native-modal";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import DarkMode from '../../component/DarkMode';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { C, T } from '../../arrayindex/Alphabet';
import { COLORS } from '../../utils/COLORS';

const SavePdf = ({ navigation }) => {
    const [ImageUrl, setImageUrl] = useState("")
    const [data, setData] = useState()


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPDFtoFirebaseDATA()
        });
        return unsubscribe;
    }, [navigation])


    const getPDFtoFirebaseDATA = () => {

        console.log("called?")

        const Temp = []
        firestore()
            .collection("SavedPDF")
            .get()
            .then((doc) => {

                doc.docs.forEach((doc) => {
                    Temp.push(doc.data())
                })
            }).then((doc) => {

                setData(Temp)
            })



    }


    const DeletePdf = (code) => {
        const documentRef = firestore().collection('SavedPDF').doc(code);

        documentRef.delete().then(() => {
            console.log('Document successfully deleted!');
            getPDFtoFirebaseDATA()
        }).catch((error) => {
            console.error('Error removing document: ', error);
        });



    }

    return (
        <ImageBackground source={require('../../assets/images/hi.jpeg')} style={{ flex: 1, padding: 20 }} resizeMode={'cover'}>
            <Header Logo={require('../../assets/images/profile.png')} QuickFind={"NO"} ImageUrl={ImageUrl} profile={require('../../assets/images/OldPic.png')} btnColor={colors.primary} Nav={navigation} />

            <View style={{ backgroundColor: colors.white, width: wp('90'), alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, padding: 20, flex: 1 }}>

                <Text style={{ alignSelf: 'center', color: COLORS.BLACK, fontSize: hp('2.5%'), fontWeight: 'bold', marginBottom: 20, marginTop: 10 }}>My Saved Airports</Text>

                <FlatList
                    data={data}
                    contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center' }}
                    renderItem={({ item }) => {
                        console.log('renderItem', item)
                        return (
                            <View style={{width:wp('20$')}}>
                                <TouchableOpacity onPress={() => navigation.navigate('PDFText', { pageUrl: item.pdfURL, isSelected: item.code, Airport: item.AirportName })} style={{ height: 80, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 5, marginTop: 10, alignItems: 'center',  paddingHorizontal: 10, justifyContent: 'center', width: wp('16%'), marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), color:COLORS.WHITE }}>{item.code}</Text>

                                        {/* <FontAwesome5
                                        style={{ marginRight: 20, marginLeft: 20 }}
                                        name={'plane-departure'}
                                        size={25}
                                        color={'black'}
                                    /> */}



                                        {/* <Text style={{ fontSize: hp('2%') }}>{item.AirportName}</Text> */}
                                    </View>



                                </TouchableOpacity>



                                <TouchableOpacity onPress={() => DeletePdf(item.code)} >

                                    <AntDesign
                                        name='delete'
                                        size={35}
                                        color={"red"}
                                        style={{alignSelf:'flex-end', left:10}}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}

                />



            </View>




        </ImageBackground>
    )
}

export default SavePdf