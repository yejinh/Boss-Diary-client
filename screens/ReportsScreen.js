import React, { Component } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';

export default class ReportsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      isLoading: false,
      isAllLoaded: false
    };
  }

  componentDidMount() {
    this._loadMoreReports();
  }

  _loadMoreReports = async() => {
    try {
      const {
        numOfNewReport,
        fetchUserReports
      } = this.props.screenProps;

      const {
        pageNumber,
        isAllLoaded
      } = this.state;

      if (isAllLoaded) return;

      const fetchedReports = await fetchUserReports(pageNumber, numOfNewReport);

      if (!fetchedReports.length) {
        this.setState({
          isLoading: false,
          isAllLoaded: true
        });

        if (pageNumber === 1) {
          Alert.alert('빈 보고서', '보고서를 작성하세요');
          return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;
        }
        return;
      }

      this.setState({
        pageNumber: pageNumber + 1,
        isLoading: false
      });
    } catch(err) {
      this.setState({
        isLoading: false
      });
    }
  }

  _footerSpinner = () => {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  render() {
    const { isLoading } = this.state;
    const { userReports, profilePhoto } = this.props.screenProps;

    if (isLoading) return <LoadingSpinner />;

    return (
      <SafeAreaView>
        <FlatList
          data={userReports}
          keyExtractor={item => item._id}
          onEndReachedThreshold={0.5}
          onEndReached={this._loadMoreReports}
          ListFooterComponent={this._footerSpinner}
          renderItem={({ item }) => (
            <Report
              key={item._id}
              profilePhoto={profilePhoto}
              report={item}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}
