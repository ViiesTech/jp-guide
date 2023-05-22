import { View, Text, StyleSheet, StatusBar, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import TextInputComp from '../../component/TextInputComp';
import colors from '../../constant/colors';
import Card from '../../component/Card';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StripeProvider } from '@stripe/stripe-react-native';
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { A, B, C,D,E, F, G, H,I,J, K, L, M, N,O, P, R, S,T, U, V, X, Y , globalSearch} from '../../arrayindex/Alphabet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import DarkMode from '../../component/DarkMode';
import { ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const Journey = ({ navigation }) => {
    const [ImageUrl, setImageUrl] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [Loader, setLoader] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState()

    const [myList, setMyList] = useState()


    const [getData, setGetData] = useState()
    const [CurrentAplhabet, setAplhabet] = useState("")

    const [PlanType, setPlanType] = useState("")
    const [Plan, setPlan] = useState({
        Departure: "",
        Destination: ""
    })
    const [URL, setURL] = useState({
        DepartureURL: "",
        DestinationURL: ""
    })

    const UID = auth()?.currentUser?.uid

    const toggleModal = (type) => {
        setPlanType(type)
        setModalVisible(!isModalVisible);
    };

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    useEffect(() => {
        getMYData()
        callListedData()

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
        const Temp = []
        if (Aplha === "A") {
            A.forEach((item) => {
                console.log(",..............", item)
                Temp.push(item)
            })
        } else if (Aplha === "B") {
            B.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "C") {
            C.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "D") {
            D.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "E") {
            E.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "F") {
            F.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "G") {
            G.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "H") {
            H.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "I") {
            I.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "J") {
            J.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "K") {
            K.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "L") {
            L.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "M") {
            M.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "N") {
            N.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "O") {
            O.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "P") {
            P.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "R") {
            R.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "S") {
            S.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "T") {
            T.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "U") {
            U.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "V") {
            V.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "X") {
            X.forEach((item) => {
                Temp.push(item)
            })
        } else if (Aplha === "Y") {
            Y.forEach((item) => {
                Temp.push(item)
            })
        } else {

        }

        setGetData(Temp)
    }

    const callListedData = () => {

        firestore()
            .collection("Users")
            .doc(UID)
            .collection("Plans")
            .get()
            .then((doc) => {
                const Temp = []
                doc?.docs?.map((txt) => {

                    Temp?.push(txt?.data())
                })

                setMyList(Temp)

            })
    }


    const saveToState = (state) => {


        if (PlanType === "Departure") {

            setPlan({ ...Plan, Departure: state.Airport })
            setURL({ ...URL, DepartureURL: state.Page })

            setModalVisible(!isModalVisible);


        } else {
            setPlan({ ...Plan, Destination: state.Airport })
            setURL({ ...URL, DestinationURL: state.Page })

            setModalVisible(!isModalVisible);


        }
        console.log(state)
    }

    const now = new Date();
    const currentTimeInMillis = now.getTime();

    const CreatePlan = () => {
        setLoader(true)
        if (Plan?.Departure === "" && Plan?.Destination === "") {
            setLoader(false)
            return console.log("Kindly create your plan")
        } else {

            firestore()
                .collection("Users")
                .doc(UID)
                .collection("Plans")
                .add({
                    Departure: Plan.Departure,
                    Destination: Plan.Destination,

                    DepartureURL: URL.DepartureURL,
                    DestinationURL: URL.DestinationURL,

                    createdAt: currentTimeInMillis
                }).then(() => {
                    console.log("Successfully created")
                    callListedData()
                    setLoader(false)
                })
        }
    }

    const goToPDF = (item, Url) => {


        const str = item;
        const firstThreeChars = str.substring(0, 3); // get the characters from index 0 to 2 (inclusive)
        console.log(firstThreeChars);

        navigation.navigate('PDFText', { pageUrl: Url, isSelected: firstThreeChars })
    }

    return (

        <ImageBackground source={require('../../assets/images/hi.jpeg')} style={{ flex: 1, padding: 20 }} resizeMode={'cover'}>
            <Header Logo={require('../../assets/images/profile.png')} QuickFind={"NO"} ImageUrl={ImageUrl} profile={require('../../assets/images/OldPic.png')} btnColor={colors.primary} Nav={navigation} />

            <View style={{ backgroundColor: colors.primary, width: wp('90'), alignSelf: 'center', borderRadius: 20, top: 10, marginBottom: 30, padding: 20, flex: 1 }}>

                <View style={{ flexDirection: 'row', height: 100, width: wp('80%'), justifyContent: 'space-between', alignSelf: 'center', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => toggleModal("Departure")} style={{ padding: 20, width: wp('30%'), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: 'black' }} numberOfLines={1}>{Plan.Departure ? Plan.Departure : "Departure"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleModal("Destination")} style={{ padding: 20, width: wp('30%'), backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: 'black' }} numberOfLines={1}>{Plan.Destination ? Plan.Destination : "Destination"}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => CreatePlan()} style={{ height: 60, width: wp('20%'), backgroundColor: colors.secondery, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: colors.white }}>{Loader ? <ActivityIndicator size={'small'} color={'white'} /> : "Create"}</Text>
                </TouchableOpacity>


                <View style={{ flex: 1, width: wp('80%'), borderRadius: 10, backgroundColor: colors.white, alignSelf: 'center', marginTop: 10, padding: 20 }}>

                    <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>My Travel Plans</Text>

                    <View style={{ flexDirection: 'row', width: wp('60%'), justifyContent: 'space-between', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: hp('2.5%'), alignItems: 'center', justifyContent: 'center' }}>Departure</Text>

                        <Text style={{ fontSize: hp('2.5%'), alignItems: 'center', justifyContent: 'center' }}>Destination</Text>
                    </View>

                    <FlatList
                        data={myList}
                        renderItem={({ item }) => {
                            console.log(item)


                            return (
                                <View style={{ height: 60, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10 }}>

                                    <TouchableOpacity onPress={() => goToPDF(item.Departure, item.DepartureURL)} style={{ flexDirection: 'row', alignItems: 'center', width: wp('35%'), backgroundColor: colors.primary, minHeight: 60, borderRadius: 10, justifyContent: 'center' }}>

                                        <FontAwesome5
                                            name={'plane-departure'}
                                            size={25}
                                            color={colors.white}
                                        />

                                        <Text style={{ marginLeft: 10, fontSize: hp('1.5%'), color: colors.white, width: wp('25%') }}>{item.Departure}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => goToPDF(item.Destination, item.DestinationURL)} style={{ flexDirection: 'row', alignItems: 'center', width: wp('35%'), backgroundColor: colors.primary, minHeight: 60, borderRadius: 10, justifyContent: 'center' }}>

                                        <FontAwesome5
                                            name={'plane-arrival'}
                                            size={25}
                                            color={colors.white}
                                        />

                                        <Text style={{ marginLeft: 10, fontSize: hp('1.5%'), color: colors.white, width: wp('25%') }}>{item.Destination}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />

                </View>

            </View>



            <Modal isVisible={isModalVisible}>

                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 20 }}>

                    <TouchableOpacity onPress={() => { toggleModal() }}>

                        <AntDesign name='closecircleo' size={25} />
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: hp('2.5%') }}>{PlanType}</Text>


                    <TextInput
                        style={{ height: 60, width: wp('80%'), backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, marginTop: 10, borderWidth: 1, paddingHorizontal: 20 }}
                        placeholder="Enter City / Country Name"
                        onChangeText={(txt) => {
                            setSearch(txt)
                        }}


                        value={search}

                    />


                    {/* <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'black' }}>Airport Code By Aplhabets</Text> */}
                    <View style={{ borderRadius: 10, padding: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>

                        {
                            alphabet?.map((item) => {

                                console.log(item)
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

                            <Text style={{ color: 'black', fontSize: hp("2.5%"), alignSelf: 'center' }}>Nothing found</Text>

                            :

                            <View />
                    }

                    <ScrollView>
                        {

                            search === "" ?

                                getData?.filter((val) => {

                                    console.log(val)
                                    if (search === "") {
                                        return val
                                    } else if (val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                        return val
                                    }
                                }).map((item, key) => {
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>
                                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Text>

                                                {
                                                    item?.Domestic ?
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: 'white', fontWeight: 'bold' }}>Domestic Airport</Text>

                                                        :
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: 'white', fontWeight: 'bold' }}>International Airport</Text>


                                                }
                                            </TouchableOpacity>

                                            <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                                        </>
                                    )
                                })

                                :

                                globalSearch?.filter((val) => {

                                    console.log(val)
                                    if (search === "") {
                                        return val
                                    } else if (val.Airport.toLowerCase().includes(search.toLowerCase())) {
                                        return val
                                    }
                                }).map((item, key) => {
                                    console.log("item.....", item.Domestic)


                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => goToPDFPage(item)} style={{ height: 60, backgroundColor: colors.primary, borderRadius: 10, marginTop: 20, justifyContent: 'center', paddingHorizontal: 20, alignSelf: 'center' }}>
                                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Text>
                                                {
                                                    item?.Domestic ?
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: 'white', fontWeight: 'bold' }}>Domestic Airport</Text>

                                                        :
                                                        <Text style={{ alignSelf: 'center', fontSize: hp('1%'), color: 'white', fontWeight: 'bold' }}>International Airport</Text>


                                                }
                                            </TouchableOpacity>

                                            <Text style={{ alignSelf: 'center', fontSize: hp('2.5%'), fontWeight: 'bold', marginTop: 5 }}>{item?.Airport}</Text>
                                        </>
                                    )
                                })



                        }
                    </ScrollView>

                </View>
            </Modal>
        </ImageBackground>
    )
}

export default Journey