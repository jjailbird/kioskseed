import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconDelete from 'material-ui/svg-icons/action/delete';
import { ModalManager } from 'react-dynamic-modal';
import FileViewer from './FileViewer.jsx';

// const ThemeManager = new mui.Styles.ThemeManager();

export default class FileIndividual extends Component {
  constructor(props) {
    super(props);
    this.removeFile = this.removeFile.bind(this);
    this.renameFile = this.renameFile.bind(this);
    this.openFileViewer = this.openFileViewer.bind(this);
  }
  /*
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }
  */
  removeFile() {
    const conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf === true) {
      Meteor.call('RemoveFile', this.props.fileId, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
  renameFile() {
    const validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    // let prompt = window.prompt('New file name?', this.props.fileName);
    let prompt = window.prompt('New file name?', this.props.fileObj.name);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
  openFileViewer(src, caption) {
    ModalManager.open(<FileViewer src={src} caption={caption} onRequestClose={() => true} />);
  }
  render() {
    const file = this.props.fileObj;
    // console.log('file', file);
    return (
      <GridTile
        // key={this.props.fileId}
        // title={this.props.fileName}
        // subtitle={<span>by <b>{this.props.fileSize}</b></span>}
        key={file._id}
        title={file.meta.caption ? file.meta.caption : file.name}
        subtitle={<span>by <b>{file.size}</b></span>}

        actionIcon={
          <IconButton onTouchTap={this.removeFile}><IconDelete color="red" /></IconButton>
        }
      >
        <img
          src={this.props.fileUrl}
          // alt={this.props.fileName}
          alt={file.name}
          style={{ cursor: 'pointer' }}
          onTouchTap={() => {
            // this.openFileViewer(this.props.fileUrl, this.props.fileName);
            this.openFileViewer(file.fileUrl, file.meta.caption ? file.meta.caption : file.name);
          }}
        />
      </GridTile>
    );
  }
}

/*
FileIndividual.childContextTypes = {
  // muiTheme: React.PropTypes.object.isRequired,
};
*/

FileIndividual.propTypes = {
  fileName: React.PropTypes.string.isRequired,
  fileSize: React.PropTypes.number.isRequired,
  fileUrl: React.PropTypes.string,
  fileId: React.PropTypes.string.isRequired,
  fileObj: React.PropTypes.object,
};
