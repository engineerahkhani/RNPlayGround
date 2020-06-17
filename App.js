import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App: () => React$Node = () => {
  const renderItem = (props) => (
    <View style={styles.itemWrapper}>
      <TouchableOpacity>
        <Icon
          style={styles.downloadIcon}
          name="cloud-download"
          color="#707070"
          size={24}
        />
      </TouchableOpacity>
      <View style={styles.itemTextWrapper}>
        <Text style={styles.itemTitle}>
          خاطره انگیز; شادی مردم پس از برد ایران مقابل مراکش
        </Text>
        <Text style={styles.time}>8 ساعت پیش</Text>
      </View>
      <Image
        source={{
          uri: 'https://static.farakav.com/files/pictures/thumb/01310359.jpg',
        }}
        style={styles.itemImage}
      />
    </View>
  );
  const listHeaderComponent = () => (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>خبرهای ورزشی</Text>
    </View>
  );
  const keyExtractor = ({id}) => `${id}`;

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={listHeaderComponent}
      data={[{id: 1}, {id: 2}, {id: 3}]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#eee',
    paddingTop: 52,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#009688',
    fontSize: 20,
  },
  time: {
    fontSize: 14,
    color: '#707070',
  },
  itemTextWrapper: {
    marginRight: 16,
    width: 0,
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTitle: {fontSize: 16, textAlign: 'right', color: '#333'},
  itemTitleWrapper: {width: 0, flexGrow: 1},
  downloadIcon: {
    marginRight: 'auto',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#eee',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 4,
    marginTop: 8,
    marginHorizontal: 8,
  },
  itemImage: {
    height: 50,
    width: 85,
    borderRadius: 5,
  },
});

export default App;
