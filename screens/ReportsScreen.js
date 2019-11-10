import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import ReportModal from '../components/ReportModal';
import EmptyScreen from '../components/EmptyScreen';

export default function ReportsScreen(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isAllLoaded, setIsAllLoaded ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ clickedReport, setClickedReport ] = useState(null);
  const [ pageNumber, setPageNumber ] = useState(1);

  const {
    userReports,
    profilePhoto,
    numOfNewReport,
    fetchUserReports,
    onUserSearch,
    onApprovalRequest,
  } = props.screenProps;

  useEffect(() => {
    _loadMoreReports();
  }, []);

  const _loadMoreReports = async() => {
    try {
      if (isAllLoaded) return;

      const fetchedReports = await fetchUserReports(pageNumber, numOfNewReport);

      if (!fetchedReports.length) {
        setIsLoading(false);
        setIsAllLoaded(true);

        if (pageNumber === 1) {
          Alert.alert('빈 보고서', '보고서를 작성하세요');
          return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;
        }
        return;
      }

      setPageNumber(pageNumber + 1);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const _toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const _clickReport = itemId => () => {
    setClickedReport(itemId)
  };

  const _requestApproval = userId => {
    onApprovalRequest(clickedReport, userId);
  };

  const _footerSpinner = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView>
      <FlatList
        data={userReports}
        keyExtractor={item => item._id}
        onEndReachedThreshold={0.01}
        onEndReached={_loadMoreReports}
        ListFooterComponent={_footerSpinner}
        renderItem={({ item }) => (
          <Report
            key={item._id}
            profilePhoto={profilePhoto}
            report={item}
            openModal={_toggleModal}
            onUserSearch={onUserSearch}
            onClick={_clickReport(item._id)}
          />
        )}
      />
      <ReportModal
        modalVisible={modalVisible}
        closeModal={_toggleModal}
        onUserSearch={onUserSearch}
        toggleModal={_toggleModal}
        onClick={_requestApproval}
      />
    </SafeAreaView>
  );
}
