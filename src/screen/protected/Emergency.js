import { View, Text, StatusBar, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../component/Header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constant/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DocumentView, RNPdftron } from "react-native-pdftron";
import { Config } from 'react-native-pdftron';

const Emergency = ({ navigation }) => {
  const HEIGHT = StatusBar.currentHeight;
  return (
    <ScrollView>
      <View style={{ marginTop: HEIGHT + hp('5'), alignSelf: 'center' }}>
        <Header Logo={require('../../assets/images/profile.png')} profile={require('../../assets/images/OldPic.png')} btnColor={colors.primary} Nav={navigation} />
      </View>
      
      <View style={{ backgroundColor: colors.primary, width: wp('90'), height: hp('85'), alignSelf: 'center', borderRadius: 20, top: 30 }}>
        <View style={{ padding: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>

              <Icon name='arrow-back' color={'gray'} size={50} />
            </TouchableOpacity>
            {/* <Text style={{ fontSize: 24, color: 'white', marginLeft: 20 }}>Emergency Protocol</Text> */}
          </View>
        </View>

        <DocumentView
          source={"https://firebasestorage.googleapis.com/v0/b/jpguide-69169.appspot.com/o/International%20Supplement.pdf?alt=media&token=04985f13-559e-43ba-855a-b0289892eb3b"}
          // disabledElements={[Config.AnnotationMenu]}
          // disabledTools={[Config.Buttons.addPageButton]}



          style={styles.pdf} />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  pdf: {

    height: hp('70%'),
    width: wp('90%')
  }
});

export default Emergency