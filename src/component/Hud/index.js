
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { styles } from './styles';

/* Component for loader
showHud : boolean to show the loader
loaderColor : color of the loader
showLoadingText : boolean to show loading text
loadingText : text to set on loader
loadingTextStyle : loading text style
 */
const Hud = ({
    showHud
}) => {
    const [showLoader, setShowLoader] = useState(showHud);
    useEffect(() => {
        setShowLoader(showHud);
    }, [showHud]);
    return (
        <Modal
            visible={showLoader}
            transparent={true}
        >
            <View
                style={styles.mainContainer}>
                <ActivityIndicator size="large"  color={'white'}/>
            </View>
        </Modal>
    );
};

export default Hud;
