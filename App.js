import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URI = 'https://video.varzesh3.com/api/video/2';

const App: () => React$Node = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [medias, setMedias] = useState([]);

  async function fetchData() {
    setLoading(true);
    const response = await fetch(API_URI);
    response
      .json()
      .then((data) => {
        setMedias(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item, index}) => (
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
        <Text style={styles.itemTitle}>{item.Title}</Text>
        <Text style={styles.time}>{item.RelativeDate}</Text>
      </View>
      <Image
        source={{
          uri: item.Thumb,
        }}
        style={styles.itemImage}
        resizeMode="stretch"
      />
    </View>
  );
  const listHeaderComponent = () => (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>خبرهای ورزشی</Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={listHeaderComponent}
      data={medias}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.Id}
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
    paddingBottom: 8,
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
