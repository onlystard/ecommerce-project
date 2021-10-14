import { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { getEnvVars } from '../../Environment';

const { trackerHost } = getEnvVars();
const defaultTrackingState = () => ({
  tracking: false,
  username: 'Anonymous',
  orgname: 'default',
});
export function useTracking(state = defaultTrackingState()) {
  const [ready, setReady] = useState(false);
  const [trackingState, setTrackingState] = useState(state);

  useEffect(() => {
    if (ready) {
      BackgroundGeolocation.changePace(trackingState.tracking);
    }
  }, [trackingState]);

  useEffect(() => {
    if (!trackingState.tracking) {
      return;
    }

    configureBackgroundGeolocation();
    return async function () {
      await BackgroundGeolocation.stop();
      await BackgroundGeolocation.removeAllListeners();
    };
  }, [trackingState]);

  const configureBackgroundGeolocation = async () => {
    await BackgroundGeolocation.destroyTransistorAuthorizationToken(trackerHost);
    let token = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
      trackingState.orgname,
      trackingState.username,
      trackerHost,
    );

    BackgroundGeolocation.onLocation(onLocation);
    BackgroundGeolocation.onMotionChange(onMotionChange);

    await BackgroundGeolocation.ready(
      {
        deferTime: 30000,
        locationUpdateInterval: 30000,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopOnTerminate: true,
        startOnBoot: true,
        enableHeadless: true,
        preventSuspend: true,
        foregroundService: true,
        heartbeatInterval: 60,
        interval: 20,
        url: trackerHost + '/api/locations',
        authorization: {
          // <-- JWT authorization
          strategy: 'JWT',
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          refreshUrl: trackerHost + '/api/refresh_token',
          refreshPayload: {
            refresh_token: '{refreshToken}',
          },
          expires: token.expires,
        },
        backgroundPermissionRationale: {
          title:
            "Allow {applicationName} to access this device's location even when closed or not in use.",
          message:
            'This app collects location data to enable recording your trips to work and calculate distance-travelled.',
          positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
          negativeAction: 'Cancel',
        },
        autoSync: true,
        debug: false,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      },
      async state => {
        await BackgroundGeolocation.start();
        await BackgroundGeolocation.changePace(trackingState.tracking);
        setReady(true);
      },
    );
  };
  function onLocation(location) {
  }

  function onMotionChange(event) {
  }

  return [trackingState, setTrackingState];
}
