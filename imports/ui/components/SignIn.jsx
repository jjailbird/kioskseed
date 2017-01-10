import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

const styles = {
  form: {
    margin: '30px auto 0',
  },
  textField: {
    display: 'block',
    width: '100%',
  },
  label: {
    lineHeight: '50px',
    fontWeight: '600',
  },
  button: {
    height: '50px',
    width: '200px',
    marginTop: '50px',
    marginBottom: '15px',
  },
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      errorMessage: '',
      errorOpen: false,
    };
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  onSubmit(data) {
    let message = '';
    Meteor.loginWithPassword(data.username, data.password, error => {
      if (error) {
        message = error.reason;
        this.setState({
          errorMessage: message,
          errorOpen: true,
        });
      } else {
        const gotoUrl = (this.props.gotoUrl) ? this.props.gotoUrl : '/';
        browserHistory.push(gotoUrl);
      }
    });
    return;
  }
  onTextChange() {
    this.setState({ errorOpen: false });
  }
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  render() {
    return (
      <div>
        <Formsy.Form
          style={styles.form}
          onValid={this.enableSubmitButton}
          onSubmit={this.onSubmit}
        >
          <FormsyText
            name="username"
            style={styles.textField}
            floatingLabelText="아이디 또는 이메일 주소"
            onChange={this.onTextChange}
            required
          />
          <FormsyText
            name="password"
            ref="password"
            style={styles.textField}
            floatingLabelText="패스워드"
            type="password"
            required
            onChange={this.onTextChange}
          />
          {this.state.errorOpen ?
            <h5 style={{ color: 'red' }}>{this.state.errorMessage}</h5>
            : ''
          }
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="로그인"
            secondary
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  gotoUrl: React.PropTypes.string,
  router: React.PropTypes.object,
};

export default SignIn;
