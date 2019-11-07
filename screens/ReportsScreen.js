import React, { Component } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';

export default class NewReportInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      pageNumber: 1,
      isLoading: false,
      isRefreshing: false,
      isAllLoaded: false
    };
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.setState({
          isLoading: true
        });
        this._loadMoreReports();
      }),

      this.props.navigation.addListener('willBlur', () => {
        this.setState({
          pageNumber: 1
        });
      })
    ];
  }


  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  _loadMoreReports = async() => {
    try {
      const { fetchUserReports } = this.props.screenProps;
      const { pageNumber, reports } = this.state;

      const fetchedReports = await fetchUserReports(pageNumber);

      if (!fetchedReports.length) {
        this.setState({
          isLoading: false,
          isAllLoaded: true
        });

        if (pageNumber === 1) {
          return Alert.alert('빈 보고서', '보고서를 작성하세요');
        }
        return;
      }

      this.setState({
        pageNumber: pageNumber + 1,
        reports: reports.concat(fetchedReports),
        isLoading: false
      });
    } catch(err) {
      this.setState({
        isLoading: false
      });
    }
  }

  _refresh = async() => {
    try {
      const reports = await fetchUserReports(1);

      this.setState({
        pageNumber: 2,
        reports: reports,
        isRefreshing: false
      });
    } catch(err) {
      this.setState({
        pageNumber: 2,
        isRefreshing: false
      });
    }
  };

  _footerSpinner = () => {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  render() {
    const { reports, isRefreshing, isAllLoaded } = this.state;
    const { profilePhoto } = this.props.screenProps;

    return (
      <SafeAreaView>
        <FlatList
          data={reports}
          keyExtractor={item => item._id}
          refreshing={isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing : true });
            this._refresh();
          }}
          onEndReachedThreshold={0.05}
          onEndReached={() => {
            if (!isAllLoaded) {
              this.setState({ isLoading: true });
              this._loadMoreReports();
            }
          }}
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
