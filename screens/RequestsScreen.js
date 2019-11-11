import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';

export default function RequestsScreen(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isAllLoaded, setIsAllLoaded ] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(1);

  const { profilePhoto, approvalRequests, fetchApprovalRequests } = props.screenProps;

  useEffect(() => {
    setIsLoading(true);
    _loadMoreReports();
  }, []);

  const _loadMoreReports = async() => {
    try {
      if (isAllLoaded) return;

      const fetchedReports = await fetchApprovalRequests(pageNumber);

      if (!fetchedReports.length) {
        setIsLoading(false);
        setIsAllLoaded(true);

        if (pageNumber === 1) {
          return Alert.alert('결재 요청', '결재 요청이 없습니다');
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

  const _footerSpinner = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isLoading && !approvalRequests.length) return <EmptyScreen message={'보고서 결재 요청이 없습니다'}/>;

  return (
    <SafeAreaView>
      <FlatList
      data={approvalRequests}
      keyExtractor={item => item._id}
      onEndReachedThreshold={0.01}
      onEndReached={_loadMoreReports}
      ListFooterComponent={_footerSpinner}
      renderItem={({ item }) => (
        <Report
          buttonText={'결재 승인'}
          key={item._id}
          profilePhoto={item.profile_photo}
          report={item}
          isApprovalPage={true}
        />
      )}
    />
  </SafeAreaView>
  );
}
