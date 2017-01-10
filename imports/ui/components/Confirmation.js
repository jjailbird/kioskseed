import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
import { confirmable } from 'react-confirm';


class Confirmation extends React.PureComponent {

  render() {
    const {
      okLabel = 'OK',
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      modal,
    } = this.props;

    const actions = [
      <FlatButton
        label={cancelLabel}
        secondary
        onClick={cancel}
      />,
      <FlatButton
        label={okLabel}
        primary
        onClick={proceed}
      />,
    ];

    return (
      <MuiThemeProvider>
        <Dialog
          title={title}
          actions={actions}
          modal={modal}
          open={show}
          onRequestClose={dismiss}
        >
          {confirmation}
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default confirmable(Confirmation);
