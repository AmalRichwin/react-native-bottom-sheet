import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const App = () => {
  const bottomSheetRef = useRef(null);
  const [backdropPressBehavior, setBackdropPressBehavior] =
    useState('collapse');

  const snapPoints = useMemo(() => ['50%', '100%'], []);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop1 = useCallback(
    props => (
      <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior],
  );

  const handleTogglePressBehavior = useCallback(() => {
    setBackdropPressBehavior(state => {
      switch (state) {
        case 'none':
          return 'close';
        case 'close':
          return 'collapse';
        case 'collapse':
          return 'none';
      }
    });
  }, []);

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={handlePresentPress}>
          <Text>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleTogglePressBehavior}
          style={{marginVertical: '15%'}}>
          <Text>Toggle</Text>
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop1}>
          <TouchableOpacity
            onPress={handleExpandPress}
            style={{marginVertical: '15%'}}>
            <Text>Expand</Text>
          </TouchableOpacity>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
