import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface StoreItemProps {
  image: any; // Tipo da propriedade de imagem
}

const StoreItem: React.FC<StoreItemProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={image}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: "gray",
  },
});

export default StoreItem;
