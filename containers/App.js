import React from 'react';
import { connect } from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const AppContainer = props => {
  return <AppNavigator screenProps={props}/>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
