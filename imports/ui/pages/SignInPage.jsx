import React, { PureComponent } from 'react';
import Title from 'react-title-component';
import Divider from 'material-ui/Divider';

import SignIn from '../components/SignIn.jsx';

const styles = {
  root: {
    minHeight: '400px',
    textAlign: 'center',
    padding: '1em 2em',
  },
};

class SignInPage extends PureComponent {
  render() {
    return (
      <div style={styles.root}>
        <Title render={(previousTitle) => `로그인 - ${previousTitle}`} />
        <h2>로그인</h2>
        <Divider />
        <SignIn gotoUrl="/admin" />
      </div>
    );
  }
}

export default SignInPage;
