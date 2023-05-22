import { View, Text, Settings, Image} from 'react-native'
import React, { useEffect, useState, version } from 'react'
import GetStart from '../screen/auth/GetStart'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screen/auth/Login';
import Home from '../screen/protected/Home';
import Detail from '../screen/protected/Detail';
import Emergency from '../screen/protected/Emergency';
import Operational from '../screen/protected/Operational';
import Maintenances from '../screen/protected/Maintenances';
import Notes from '../screen/protected/Notes';
import Communication from '../screen/protected/Communication';
import NoteDetail from '../screen/protected/NoteDetail';
import Animation from '../screen/protected/Animation';

import auth from '@react-native-firebase/auth';
import EditProfile from '../screen/protected/EditProfile';
import SignUp from '../screen/auth/SignUp';
import ForgetPassword from '../screen/auth/ForgetPassword';
import Payment from '../screen/protected/Payment';
import PrivacyPolicy from '../screen/auth/PrivacyPolicy';
import PDFText from '../screen/protected/PDFText';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Tab = createBottomTabNavigator();

// import PdfHighlighter from '../PdfHighlighter';


//PDF Tron

import PDFTron from '../screen/protected/PDFTron';
import Journey from '../screen/protected/Journey';
import colors from '../constant/colors';
import firestore from '@react-native-firebase/firestore';
import AdminHome from '../screen/AdminScreens/AdminHome';
import Loading from '../screen/Loading';
import SavePdf from '../screen/protected/SavePdf';
import AllPdf from '../screen/AdminScreens/AllPdf';
import PDF from '../screen/AdminScreens/PDF';
import { COLORS } from '../utils/COLORS';


const Stack = createNativeStackNavigator();


export const MyTabs = () => {

  const [Pfp, setPFP ] = useState()

  const  UID = auth()?.currentUser?.uid

  firestore()
  .collection("Users")
  .doc(UID)
  .onSnapshot((doc)=>{
       setPFP(doc?.data()?.Image)

  })


  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.primary, height: 80, } }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: "",
        tabBarIcon: (({ focused }) => {
          return (
            <View style={{ height: 40, width: 100, alignItems: 'center', justifyContent: 'center' }}>

              <FontAwesome5
                name={"home"}
                color={!focused ? colors.secondery : "white"}
                size={30}
              />


              <Text style={{ color: focused ? 'white' :  colors.secondery , marginTop: 10 }}>Home</Text>

            </View>
          )
        })
      }} />

      <Tab.Screen name="Setting" component={EditProfile} options={{
        tabBarLabel: "",
        tabBarIcon: (({ focused }) => {
          return (
            <View style={{ height: 40, width: 100, alignItems: 'center', justifyContent: 'center',  }}>
              <View style={{borderWidth:2, borderColor: focused ? "white" :  colors.secondery, borderRadius:200}}>

              <Image source={{uri : Pfp }}  style={{height:40, width:40, borderRadius:200}}/>
              </View>


              <Text style={{ color: focused ? 'white' :  colors.secondery  , marginTop: 10 }}>Settings</Text>

            </View>
          )
        })
      }} />


      <Tab.Screen name="Journey" component={SavePdf} options={{
        tabBarLabel: "",
        tabBarIcon: (({ focused }) => {
          return (
            <View style={{ height: 40, width: 100, alignItems: 'center', justifyContent: 'center' }}>

              <Fontisto
                name={"plane"}
                color={!focused ? colors.secondery : "white"}
                size={30}
              />

              <Text style={{color: focused ? 'white' :  colors.secondery , marginTop: 10 }}>Saved Airports</Text>
            </View>
          )
        })
      }} />
    </Tab.Navigator>
  );
}


const Routes = () => {

  const [Loader, setLoader] = useState(true)
  const [status, setStatus] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 4000);
  }, [])


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;



  return (
    <Stack.Navigator initialRouteName='GetStart' screenOptions={{ headerShown: false }}>
      {
        Loader == true ?

          <Stack.Screen name='Animation' component={Animation} />
          :

          !user ?
            <>
              <Stack.Screen name="GetStart" component={GetStart} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />

            </>
            :
            <>

              <Stack.Screen name="Loading" component={Loading} />


              <Stack.Screen name="AdminHome" component={AdminHome} />
              <Stack.Screen name="AllPdf" component={AllPdf} />
              <Stack.Screen name="PDF" component={PDF} />


              <>
                <Stack.Screen name="Home" component={MyTabs} />
                <Stack.Screen name='Detail' component={Detail} />
                <Stack.Screen name='Emergency' component={Emergency} />
                <Stack.Screen name='Operational' component={Operational} />
                <Stack.Screen name='Maintenances' component={Maintenances} />
                <Stack.Screen name='EditProfile' component={EditProfile} />
                <Stack.Screen name='Communication' component={Communication} />
                <Stack.Screen name='Notes' component={Notes} />
                <Stack.Screen name='NoteDetail' component={NoteDetail} />
                <Stack.Screen name="Payment" component={Payment} />
                <Stack.Screen name="PDFText" component={PDFText} />
              </>





            </>
      }
    </Stack.Navigator>
  )
}


export default Routes