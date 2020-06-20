import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from './ProgressBar';
import RNBackgroundDownloader from 'react-native-background-downloader';

const API_URI = 'https://video.varzesh3.com/api/video/2';
const preventParentEvent = (e) => e.stopPropagation();
const {width: DEVICE_WIDTH} = Dimensions.get('window');

const App: () => React$Node = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setErrors] = useState(false);
  const [files, setFiles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [downloadPercent, setDownloadPercent] = useState(0);
  async function fetchData() {
    setLoading(true);
    const response = await fetch(API_URI);
    response
      .json()
      .then((data) => {
        setFiles(data);
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
  const visibleModalHandler = (item) => {
    setVisible(true);
    downloadHandler(item);
  };
  const renderItem = ({item, index}) => {
    const onPress = () => visibleModalHandler(item);
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity disabled={item.downloaded} onPress={onPress}>
          <Icon
            style={styles.downloadIcon}
            name={item.downloaded ? 'play-circle' : 'cloud-download'}
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
  };
  const downloadHandler = (item) => {
    const destination = item.FileUri.replace(
      'https://static-video.varzesh3.com/local/',
      RNBackgroundDownloader.directories.documents,
    );
    console.log('destination', destination);
    RNBackgroundDownloader.download({
      id: `video_${item.Id}`,
      url: item.FileUri,
      destination,
    })
      .begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
        setDownloadPercent(percent * 100);
      })
      .done(() => {
        console.log('Download is done!');
        setDownloadPercent(100);
        setFiles((prev) =>
          prev.map((file) => {
            return file.Id === item.Id ? {...file, downloaded: true} : file;
          }),
        );
        setVisible(false);
      })
      .error((error) => {
        console.log('Download canceled due to error: ', error);
      });
  };
  const onRequestClose = () => null;

  return (
    <>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>خبرهای ورزشی</Text>
      </View>
      <FlatList
        onRefresh={() => null}
        refreshing={loading}
        contentContainerStyle={styles.contentContainer}
        data={files}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.Id}`}
      />
      <Modal
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="slide"
        onBackdropPress={onRequestClose}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={preventParentEvent}>
              <View style={styles.modalWrapper}>
                <Text style={styles.modalTitle}>Download Video</Text>
                <Text style={styles.modalSubTitle}>
                  please wait until download finish, don't close the app
                </Text>
                <ProgressBar
                  progress={downloadPercent}
                  backgroundColor="#fafafa"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalSubTitle: {
    color: '#333',
    fontSize: 13,
    marginBottom: 16,
  },
  modalHint: {
    color: '#333',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },

  modalWrapper: {
    paddingHorizontal: 16 * 2,
    paddingVertical: 20,
    width: DEVICE_WIDTH - 2 * 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
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
