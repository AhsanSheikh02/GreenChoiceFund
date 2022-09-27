import React, { useRef, useState } from "react";
import { FlatList, TouchableOpacity, SafeAreaView, View, Image, StyleSheet, Dimensions, } from "react-native";
import Modal from "react-native-modal";
import ImageZoom from 'react-native-image-pan-zoom';

import colors from '../Assets/Colors/Index';
import Fonts from "../Assets/Fonts/Index";
import Images from "../Assets/Images/Index";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ImageLoader from "./ImageLoader";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const FullImage = (props) => {
    const {
        visible,
        onRequestClose,
        list,
        infographics
    } = props

    const listRef = useRef()
    const { selectedImage: propIndex, infographic } = useSelector(state => state.Splash);
    const [selectedIndex, setSelectedIndex] = useState(propIndex)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        console.log('initial', selectedIndex);
        setSelectedIndex(propIndex)
    }, [propIndex])


    const scrollToNextIndex = (newIndex) => {
        setSelectedIndex(newIndex)
        listRef?.current?.scrollToIndex({ animated: true, index: newIndex })
    }

    const renderImages = ({ item, index }) => {

        return (
            <ImageZoom cropWidth={deviceWidth}
                cropHeight={deviceHeight}
                imageWidth={deviceWidth}
                imageHeight={250}>
                <ImageLoader isLoading={isLoading} />
                <Image
                    onLoadStart={() => {
                        setIsLoading(true)
                    }}
                    onError={(error) => console.log(error)}
                    onLoadEnd={() => {
                        setIsLoading(false)

                    }}
                    source={{
                        uri: item?.image
                    }}
                    style={{ width: deviceWidth, height: 250, alignSelf: 'center',backgroundColor:colors.Placeholder }}
                    resizeMode='cover'
                />
            </ImageZoom>

        )
    }
    return (

        <Modal
            isVisible={visible}
            animationIn='fadeInRight'
            animationOut='fadeOutLeft'
            coverScreen={true}
            animationInTiming={350}
            animationOutTimixng={350}
            onBackButtonPress={onRequestClose}
            // hasBackdrop={true}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            style={styles.modal}
            backdropColor={colors.Primary}
        >


            <SafeAreaView style={styles.modalContainer}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ position: 'absolute', top: 32, left: 20, zIndex: 999 }}
                    onPress={onRequestClose}>
                    <Image source={Images.Back} style={styles.backIcon} />
                </TouchableOpacity>

                {
                    infographics ?
                        <ImageZoom
                            cropWidth={deviceWidth}
                            cropHeight={deviceHeight}
                            imageWidth={deviceWidth}
                            imageHeight={deviceHeight}>
                            <ImageLoader isLoading={isLoading} />
                            <Image
                                onLoadStart={() => {
                                    setIsLoading(true)
                                }}
                                onError={(error) => console.log(error)}
                                onLoadEnd={() => {
                                    setIsLoading(false)

                                }}
                                source={{
                                    uri: infographic
                                }}
                                style={{ width: deviceWidth, height: deviceHeight, alignSelf: 'center', backgroundColor:colors.Placeholder }}
                                resizeMode='contain'
                            />
                        </ImageZoom>
                        :
                        <>
                            <FlatList
                                ref={listRef}
                                pagingEnabled={true}
                                initialScrollIndex={selectedIndex}
                                onScrollToIndexFailed={info => {
                                    const wait = new Promise(resolve => setTimeout(resolve, 200));
                                    wait.then(() => {
                                        listRef.current?.scrollToIndex({ index: info.index });
                                    });
                                }}
                                scrollEnabled={false}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item?.id?.toString()}
                                data={list}
                                renderItem={renderImages}
                            />

                            {selectedIndex > 0 &&
                                <View style={[styles.arrowContainer, { left: 0 }]}>
                                    <TouchableOpacity
                                        // style={{ zIndex: 9999, }}
                                        onPress={() => scrollToNextIndex(selectedIndex - 1)}>
                                        <Image source={Images.Back} resizeMode={'contain'} style={[styles.moveIcon, { left: 10 }]} />
                                    </TouchableOpacity>
                                </View>
                            }
                            {list.length - 1 > selectedIndex &&
                                <View style={[styles.arrowContainer, { right: 0 }]}>
                                    <TouchableOpacity onPress={() => scrollToNextIndex(selectedIndex + 1)}>
                                        <Image source={Images.Next} resizeMode={'contain'} style={[styles.moveIcon, { right: 10 }]} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </>
                }
            </SafeAreaView>


        </Modal >
    )
}
const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 0,
        // justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems:'center',
        backgroundColor: colors.Primary,
    },
    moveIcon: {
        height: 25,
        width: 25,
        tintColor: colors.White,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        height: 16,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.White,
        zIndex: 999
    }
});

export default FullImage;


