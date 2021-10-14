import React from 'react';
import { Animated, Dimenstions } from 'react-native';
import { PinchGestureHandler} from 'react-native-gesture-handler';

const Zoom = (source) => {
  const { width } = Dimenstions.get('window');

  scale = new Animated.Value(1);
  onZoomEventFunction = Animated.event(
    [
      {
        nativeEvent: { scale: this.scale },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  onZoomStateChangeFunction = event => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <PinchGestureHandler
      onGestureEvent={this.onZoomEventFunction}
      onHandlerStateChange={this.onZoomStateChangeFunction}>
      <Animated.Image
        style={{ width: width, height: '100%', transform: [{ scale: this.scale }] }}
        source={source}
        resizeMode={'contant'}
      />
    </PinchGestureHandler>
  );
};
export default Zoom;
