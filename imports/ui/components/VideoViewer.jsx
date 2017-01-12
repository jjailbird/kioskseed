import React, { PureComponent } from 'react';
import { Modal, Effect, ModalManager } from 'react-dynamic-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconOff from 'material-ui/svg-icons/navigation/close';
import {
  default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay,
} from 'react-html5video';

import 'react-html5video/dist/ReactHtml5Video.css';

export default class VideoViewer extends PureComponent {
  render() {
    const { src, caption, onRequestClose } = this.props;
    return (
      <MuiThemeProvider>
        <Modal
          id="ReactDymicModal"
          onRequestClose={() => { onRequestClose(); }}
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
            <div style={{ position: 'realative' }}>
              <IconButton
                tooltip="SVG Icon" onTouchTap={ModalManager.close}
                iconStyle={{ width: 60, height: 60 }}
                style={{
                  position: 'absolute', display: 'inline-block',
                  fontWeight: 'bold', top: '50px', right: '100px' }}
              >
                <IconOff color="#fff" />
              </IconButton>
              <Video
                ref="vPlayer"
                controls
                autoPlay
                volume={50}
                poster="http://sourceposter.jpg"
                onCanPlayThrough={() => {
                  // Do stuff
                }}
              >
                <source src={src} type="video/mp4" />
                <Controls>
                  <Play />
                  <Seek />
                  <Time />
                  <Mute />
                  <Overlay />
                </Controls>
              </Video>
              <h3 style={{ color: '#fff' }}>{this.props.caption}</h3>
            </div>
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
}

VideoViewer.propTypes = {
  src: React.PropTypes.string,
  caption: React.PropTypes.string,
  onRequestClose: React.PropTypes.func,
};
