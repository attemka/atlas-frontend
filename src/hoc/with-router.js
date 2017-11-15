import React, { Component } from 'react';
import getDisplayName from './getDisplayName';

import { withRouter } from 'react-router-dom';

export default function(EnhancedComponent) {
  class Enhancer extends Component {
    isHome = () => this.props.location.pathname === '/';
    goHome = () => this.props.history.push('/');

    goToLogin = () => this.props.history.push(`/login`);

    goBack = () => this.props.history.goBack();

    render() {
      return (
        <EnhancedComponent
          isHome={this.isHome}
          goHome={this.goHome}
          goToLogin={this.goToLogin}
          goBack={this.goBack}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  Enhancer.displayName = `withRouter(${getDisplayName(EnhancedComponent)})`;

  return withRouter(Enhancer);
}