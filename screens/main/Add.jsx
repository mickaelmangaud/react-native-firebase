import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [hasImagePickerPermission, setHasImagePickerPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      sethasCameraPermission(cameraStatus === 'granted');

      const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasImagePickerPermission(imagePickerStatus ===  'granted');
    })();
  }, []);

  const flipImage = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    });

    if (!result.cancelled) setImage(result.uri);
  };

  const navigateToSaveScreen = () => {
    navigation.navigate('Save', { image });
  }

  if (hasCameraPermission === null || hasImagePickerPermission === null) {
    return <View />;
  }
  if (!hasCameraPermission || !hasImagePickerPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>
      {image && <Image source={{uri: image}} style={styles.image}/>}
      <Button title="Flip Image"onPress={flipImage} />
      <Button title='Take Picture' onPress={takePicture}/>
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Save Image" onPress={navigateToSaveScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }, image: {
    flex: 1
  }
})