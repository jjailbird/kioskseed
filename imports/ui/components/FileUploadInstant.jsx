import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from 'material-ui/Slider';
import ToggleDisplay from 'react-toggle-display';
import { MediaFiles } from '../../api/upload/MediaFiles.js';

class FileUploadInstant extends trackerReact(Component) {
// class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      subscription: {
        files: Meteor.subscribe('files.all'),
      },
      lightboxIsOpen: false,
      currentImage: 0,
    };
    this.openFileDialog = this.openFileDialog.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
    // console.log('constructor!');
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount!');
    this.state.subscription.files.stop();
  }
  uploadIt(e) {
    e.preventDefault();
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      const file = e.currentTarget.files[0];
      if (file) {
        const uploadInstance = MediaFiles.insert({
          file,
          meta: {
            // locator: this.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering

          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true, // If you see issues with uploads, change this to false
        }, false);
        this.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

        // These are the event functions, don't need most of them
        // ,it shows where we are in the process
        uploadInstance.on('start', () => {
          // console.log('Starting');
        });

        uploadInstance.on('end', (error, fileObj) => {
          // console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', (error, fileObj) => {
          // console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          this.refs.fileinput.value = '';

          // Reset our state for the next file
          this.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('error', (error, fileObj) => {
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', (progress, fileObj) => {
          // console.log(`Upload Percentage: ${progress}`);
          // Update our progress bar
          this.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }
  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  /*
  showUploads() {
    // console.log('**********************************', this.state.uploading);
    if (!_.isEmpty(this.state.uploading)) {
      return (
        <div>
          {this.state.uploading.file.name}
          <div className="progress progress-bar-default">
            <div
              style={{ width: `${this.state.progress}%` }}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={this.state.progress || 0} role="progressbar"
              className="progress-bar"
            >
              <span className="sr-only">{this.state.progress}% Complete (success)</span>
              <span>{this.state.progress}%</span>
            </div>
          </div>
        </div>
      );
    }
    return (<div></div>);
  }
  */
  openFileDialog() {
    document.getElementById('fileinput').click();
    // this.refs.fileinput.clck();
  }
  render() {
    // if (this.data.docsReadyYet) {
    if (this.state.subscription.files.ready()) {
      // const fileCursors = this.data.docs;
      // const fileCursors = MediaFiles.find({}, { sort: { updatedAt: -1 } }).fetch();
      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      return (
        <div>
          <p>Upload New File:</p>
          <FloatingActionButton
            style={{ marginRight: 20 }}
            onTouchTap={this.openFileDialog}
          >
            <ContentAdd />
          </FloatingActionButton>
          <input
            type="file"
            id="fileinput"
            ref="fileinput"
            disabled={this.state.inProgress}
            onChange={this.uploadIt} style={{ display: 'none' }}
          />
          <ToggleDisplay show={this.state.inProgress}>
            <Slider defaultValue={0} value={this.state.progress} min={0} max={100} />
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </ToggleDisplay>
        </div>
      );
    }
    return (<div>not ready</div>);
  }
}

export default FileUploadInstant;
