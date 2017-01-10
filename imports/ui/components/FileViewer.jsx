import React, { PureComponent } from 'react';
import { Modal, Effect, ModalManager } from 'react-dynamic-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconOff from 'material-ui/svg-icons/action/highlight-off';

export default class FileViewer extends PureComponent {
  render() {
    const { src, caption, onRequestClose } = this.props;
    return (
      <MuiThemeProvider>
        <Modal
          id="ReactDymicModal"
          onRequestClose={onRequestClose}
          effect={Effect.ScaleUp}
          style={{
            overlay: { overflow: 'auto' },
            content: {
              margin: 'auto auto', backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'table', width: '100%', height: '100%',
            },
          }}
        >
          <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
            <h3 style={{ color: '#fff' }}>{this.props.caption}</h3>
            <IconButton
              tooltip="SVG Icon" onTouchTap={ModalManager.close}
              style={{
                position: 'absolute', display: 'inline-block',
                fontSize: '18px', fontWeight: 'bold', top: '10px', right: '10px' }}
            >
              <IconOff color="#fff" />
            </IconButton>
            <img src={src} alt={caption} style={{ maxWidth: '90%', maxHeight: '90%' }} />
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
}

FileViewer.propTypes = {
  src: React.PropTypes.string,
  caption: React.PropTypes.string,
  onRequestClose: React.PropTypes.func,
};
