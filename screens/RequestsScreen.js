import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Alert } from 'react-native';

export default function RequestsScreen(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isAllLoaded, setIsAllLoaded ] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(1);

  const { approvalRequests, fetchApprovalRequests } = props.screenProps;

  useEffect(() => {
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
  console.log(approvalRequests, 'test');

  return (
    <View><Text>request!!</Text></View>
  );
}
