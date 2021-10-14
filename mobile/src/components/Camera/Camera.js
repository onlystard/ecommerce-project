import PropTypes from 'prop-types';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, Text } from 'react-native';
import i18n from 'i18n-js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

function CameraExpo({ setImg, Uri, setImage, styleborder, title, styleTitle }) {
  const [modalShow, setModalshow] = useState(false);

  const CameraModule = props => {
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setModalVisible();
        }}>
        <Camera
          style={{ flex: 1 }}
          ratio="16:9"
          flashMode={Camera.Constants.FlashMode.off}
          type={type}
          ref={ref => {
            setCameraRef(ref);
          }}>
          <View style={styles.containerView}>
            <View style={styles.styleView}>
              <Button
                icon="close"
                style={{ marginLeft: 12 }}
                mode="outlined"
                color="white"
                onPress={() => {
                  props.setModalVisible();
                }}>
                Close
              </Button>
              <TouchableOpacity
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync({ skipProcessing: true });
                    props.setImage(photo);
                    props.setModalVisible();
                  }
                }}>
                <View style={styles.cameraStyle}>
                  <View style={styles.cameraSt}></View>
                </View>
              </TouchableOpacity>
              <Button
                icon="axis-z-rotate-clockwise"
                style={{ marginRight: 12 }}
                mode="outlined"
                color="white"
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}>
                {type === Camera.Constants.Type.back ? 'Front' : 'Back '}
              </Button>
            </View>
          </View>
        </Camera>
      </Modal>
    );
  };
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View>
      <Text style={[styles.titleMC, styleTitle]}>{title}</Text>
      <View>
        <TouchableOpacity onPress={() => setModalshow(true)}>
          {setImage && <Image source={Uri} style={[styles.borderimage, styleborder]} />}
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={modalShow}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 30, right: 20, zIndex: 11 }}
              onPress={() => setModalshow(!modalShow)}>
              <Image
                source={require('../../../assets/deleteimage.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <View style={{ width: '100%', height: '100%' }}>
              <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                captureEvent={true}>
                {{ setImage } && (
                  <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    source={Uri}
                  />
                )}
              </ReactNativeZoomableView>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.chupanh} onPress={() => setShowCamera(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="camera" size={22} color="white" />
            <Text style={styles.textChupanh}>{i18n.t('FinCCP::CcpUpdate.Takephoto')}</Text>
          </View>
        </TouchableOpacity>
        {camera && (
          <CameraModule
            showModal={camera}
            setModalVisible={() => setShowCamera(false)}
            setImage={setImg}
          />
        )}
      </View>
    </View>
  );
}

CameraExpo.propTypes = {
  setImg: PropTypes.func.isRequired,
  Uri: PropTypes.object,
  setImage: PropTypes.object,
  styleborder: PropTypes.object,
  styleTitle: PropTypes.object,
};
export default CameraExpo;
const styles = StyleSheet.create({
  borderimage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 3,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BEBEBE',
  },
  containerView: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' },
  styleView: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraStyle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  cameraSt: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
  },
  chupanh: {
    height: 35,
    paddingVertical: '1.5%',
    paddingHorizontal: 10,
    backgroundColor: '#2CD1F8',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textChupanh: { color: 'white', marginLeft: 5 },
  titleMC: { marginLeft: '5%', marginTop: '5%', opacity: 0.5, marginBottom: 10 },
});
