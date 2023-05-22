import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { DocumentView, RNPdftron , PDFViewCtrl} from "react-native-pdftron";


const PDFTron = async() => {

    useEffect(() => {
        RNPdftron.enableJavaScript(true);
    }, [])


   

    const path =
    "https://customdemo.website/apps/JP-Guide/upload/AUA.pdf";

    return (

        <View style={{ flex: 1, }}>

            <DocumentView
                document={'../../PDF/ANU.pdf'}
                showLeadingNavButton={true}
                // disabledTools={[Config.Tools.annotationCreateLine, Config.Tools.annotationCreateRectangle]}

                
                leadingNavButtonIcon={
                    Platform.OS === "ios"
                        ? "ic_close_black_24px.png"
                        : "ic_arrow_back_white_24dp"
                }
                // onLeadingNavButtonPressed={onLeadingNavButtonPressed}
            />
        </View>
    )
}

export default PDFTron