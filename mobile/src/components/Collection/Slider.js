import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import Slider from 'react-native-slide-to-unlock';

function SliderCollection({ tutorial, onSlider, titleSlider }) {
  return (
    <View>
      <View style={styles.contentFooter}>
        <Text style={styles.titleFooter}>{tutorial}</Text>
      </View>
      <View>
        <Slider
          onEndReached={onSlider}
          containerStyle={styles.containerStyle}
          sliderElement={
            <View style={styles.thanhtruot}>
              <Text style={styles.titleTT}>{titleSlider}</Text>
            </View>
          }></Slider>
      </View>
    </View>
  );
}

SliderCollection.propTypes = {
  tutorial: PropTypes.string,
  titleSlider: PropTypes.string,
  onSlider: PropTypes.func.isRequired,
};
export default SliderCollection;
const styles = StyleSheet.create({
  contentFooter: { width: '85%' },
  titleFooter: { fontSize: 15, color: 'white', marginVertical: 20 },
  containerStyle: {
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
    marginTop: '3%',
    shadowOffset: { width: 0, height: 1 },
    borderColor: '#fff',
  },
  thanhtruot: {
    backgroundColor: '#2CD1F8',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal:10
  },
  titleTT: { paddingHorizontal: 20, color: 'white', fontWeight: '700' },
});
