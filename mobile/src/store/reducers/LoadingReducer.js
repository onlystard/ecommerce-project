import { createReducer } from '@reduxjs/toolkit';
import LoadingActions from '../actions/LoadingActions';

const initialState = { activeLoadings: {}, loading: false };

export default createReducer(initialState, builder =>
  builder
    .addCase(LoadingActions.start, (state, action) => {
      const { key, opacity } = action.payload;
      return {
        ...state,
        actives: { ...state.activeLoadings, [key]: action },
        loading: true,
        opacity,
      };
    })
    .addCase(LoadingActions.stop, (state, action) => {
      state.loading = false;
      /*
      console.log('1---' + action.payload.key + '---', state);
      try {
        delete state.activeLoadings[action.payload.key];
      } catch (e) {
        console.log(e);
      }

      if (state.activeLoadings == undefined) state.activeLoadings = {};
      console.log(state, '---2');

      state.loading = !!Object.keys(state.activeLoadings).length;
      */
    })
    .addCase(LoadingActions.clear, () => ({})),
);
