import React from 'react';
import { StyleSheet, View, Modal, Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';

function AlertComponet({ title, button1, button2, visible }) {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={button1}>
                <Text style={styles.textStyle}>{i18n.t('FinCCP::CcpHistory.No')}</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={button2}>
                <Text style={styles.textStyle}>{i18n.t('FinCCP::CcpHistory.Yes')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
AlertComponet.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  button2: PropTypes.func.isRequired,
  button1: PropTypes.func.isRequired,
};
export default AlertComponet;
const styles = StyleSheet.create({
  cancel: {
    height: 55,
    width: '80%',
    backgroundColor: '#dc1e1e',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textCancel: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 15,
    paddingVertical: 20,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    width: '35%',
    height: 40,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#2CD1F8',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});
