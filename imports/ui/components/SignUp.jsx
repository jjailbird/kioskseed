import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

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

Formsy.addValidationRule('isUserID',
  (values, value) => (
    /^[a-z0-9-_]+$/.test(value)
    && (value !== undefined && value.length >= 5 && value.length <= 20)
  )
);
Formsy.addValidationRule('isPassword',
  (values, value) => (
     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(value)
    && (value !== undefined && value.length >= 6 && value.length <= 16)
  )
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      dialogOpen: false,
      dialogError: false,
      dialogMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  onSubmit(data) {
    let message = '';
    Accounts.createUser(data, (error) => {
      if (error) {
        message = error.reason;
      } else {
        message = '회원가입이 완료 되었습니다.';
      }
      this.setState({
        dialogMessage: message,
        dialogOpen: true,
      });
    });
    return;
  }
  onSubmitKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
  }
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  disableSubmitButton() {
    this.setState({ canSubmit: false });
  }
  handleClose() {
    this.setState({ dialogOpen: false });
    // if (this.state.)this.context.router.push('/');
  }
  render() {
    const actions = <FlatButton label="확인" primary onTouchTap={this.handleClose} />;
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
            required
            validations="isUserID"
            validationError="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
          />
          <FormsyText
            name="email"
            style={styles.textField}
            floatingLabelText="이메일 주소"
            validations="isEmail"
            validationError="올바른 이메일 형식이 아닙니다."
            required
          />
          <FormsyText
            name="password"
            style={styles.textField}
            floatingLabelText="패스워드"
            type="password"
            // validations="isPassword"
            // validationError="6~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
            required
          />
          <FormsyText
            name="password_confirm"
            style={styles.textField}
            floatingLabelText="패스워드 확인"
            type="password"
            validations="equalsField:password"
            validationError="패스워드가 일치하지 않습니다."
          />
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="회원 가입"
            secondary
            disabled={!this.state.canSubmit}
            // onKeyPress={this.onSubmitKeyPress}
          />
        </Formsy.Form>
        <Dialog
          title="회원가입"
          actions={actions}
          open={this.state.dialogOpen}
        >
          {this.state.dialogMessage}
        </Dialog>
      </div>
    );
  }
}

export default SignUp;
