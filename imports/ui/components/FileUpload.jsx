import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import Slider from 'material-ui/Slider';
import LinearProgress from 'material-ui/LinearProgress';
import ToggleDisplay from 'react-toggle-display';
import { MediaFiles } from '../../api/upload/MediaFiles.js';

import RaisedButton from 'material-ui/RaisedButton';
import IconInput from 'material-ui/svg-icons/action/input';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import MenuItem from 'material-ui/MenuItem';

// import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

class FileUpload extends trackerReact(Component) {
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
      // file: '',
      fileName: '',
      imagePreviewUrl: '/img/image.blank.svg',
    };
    this.openFileDialog = this.openFileDialog.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    // console.log('constructor!');
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount!');
    this.state.subscription.files.stop();
  }
  onImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    const fileExtension = file && file.name.split('.').pop();

    // console.log(file);
    let confirm = false;
    if (this.props.fileType === 'video') {
      confirm = /mp4/i.test(fileExtension);
    } else {
      confirm = /png|jpg|jpeg/i.test(fileExtension);
    }

    if (confirm) {
      if (this.props.fileType === 'video') {
        this.setState({
          fileName: file.name ? file.name.replace(`.${fileExtension}`, '') : '',
          imagePreviewUrl: '/img/video.blank.svg',
        });
      } else {
        reader.onloadend = () => {
          this.setState({
            fileName: file.name ? file.name.replace(`.${fileExtension}`, '') : '',
            imagePreviewUrl: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
      // this.inputFileCaption.setState({ value: file.fileName });
      // document.getElementById('inputFileCaption').value = file.fileName;
    } else {
      this.inputFile.value = '';
      alert('허용된 화일 타입이 아닙니다.');
    }
  }
  onSelectChange(e, key) {
    // console.log('onSelectChange', key);
    this.props.onSelectCategory(key);
  }
  onSubmit(data) {
    // console.log('data', data);
    const fileInfo = {};
    fileInfo.inputFile = this.inputFile;
    fileInfo.fileCap = data.inputFileCaption;
    fileInfo.fileDesc = data.inputFileDesc;
    fileInfo.fileType = this.props.fileType;
    if (data.inputFileCat) {
      fileInfo.fileCat = data.inputFileCat;
    }
    this.uploadIt(fileInfo);
    // console.log('fileInfo', fileInfo);
  }
  uploadIt(fileInfo) {
    // console.log('e', e.currentTarget.files);

    // e.preventDefault();
    // if (e.currentTarget.files && e.currentTarget.files[0]) {
    // const inputFile = this.inputFile;
    if (fileInfo.inputFile && fileInfo.inputFile.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      // const file = e.currentTarget.files[0];
      const file = fileInfo.inputFile.files[0];
      if (file) {
        const uploadInstance = MediaFiles.insert({
          file,
          meta: {
            // locator: this.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
            caption: fileInfo.fileCap,
            description: fileInfo.fileDesc,
            type: fileInfo.fileType ? fileInfo.fileType : null,
            catId: fileInfo.fileCat ? fileInfo.fileCat : null,
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          transport: 'http',
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
          // this.refs.fileinput.value = '';
          this.inputFile.value = '';
          this.inputFileCaption.setState({ value: '' });
          this.inputFileDesc.setState({ value: '' });
          const imgPreviewer = document.getElementById('imgPreviewer');
          imgPreviewer.src = '/img/image.blank.svg';
          /*
          this.setState({
            imagePreviewUrl: '/img/image.blank.svg',
          });
          */
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
  openFileDialog() {
    document.getElementById('inputFile').click();
    // this.refs.fileinput.clck();
  }
  renderCategorySelect() {
    const categories = MediaFiles.find({ contentType: 'cat' }, { sort: { updatedAt: -1 } }).fetch();
    return (
      <FormsySelect
        id="inputFileCat"
        name="inputFileCat"
        ref={(input) => this.inputFileCat = input}
        floatingLabelText="카테고리 선택"
        // menuItems={this.selectFieldItems}
        required
        onChange={this.onSelectChange}
      >
      {categories.map((file, index) => {
        const link = MediaFiles.findOne({ _id: file._id }).link();
        return (
          <MenuItem
            key={index}
            value={file._id}
            primaryText={file.meta.caption ? file.meta.caption : file.name}
          />
        );
      })}
      </FormsySelect>
    );
  }
  render() {
    if (this.state.subscription.files.ready()) {
      let uploadTitle = '';
      switch (this.props.fileType) {
        case 'cat':
          uploadTitle = '카테고리';
          break;
        case 'video':
          uploadTitle = '동영상';
          break;
        case 'image':
          uploadTitle = '이미지';
          break;
        default:
          uploadTitle = '파일';
      }
      return (
        <Paper
          style={{ display: 'inline-block', verticalAlign: 'top', height: '100%' }}
          zDepth={1}
          children={
            <div>
              <Subheader>{uploadTitle}</Subheader>
              <Formsy.Form
                ref={(node) => this.frmSubmit = node}
                style={{ padding: '20px 20px 75px', verticalAlign: 'top' }}
                onSubmit={this.onSubmit}
              >
                <div
                  style={{
                    position: 'relative', display: 'inline-block', verticalAlign: 'top' }}
                >
                  <img
                    id="imgPreviewer"
                    src={this.state.imagePreviewUrl}
                    alt="Selected Image"
                    width="200px"
                    height="130px"
                    style={{ width: '200px', height: '130px', backgroundColor: '#EFEFEF' }}
                  />
                </div>
                <div>
                  <RaisedButton
                    label="파일 선택"
                    secondary
                    style={{ margin: 12 }}
                    icon={<IconInput />}
                    onTouchTap={this.openFileDialog}
                  />
                  <input
                    type="file"
                    id="inputFile"
                    // ref="fileinput"
                    ref={(input) => this.inputFile = input}
                    disabled={this.state.inProgress}
                    // onChange={this.uploadIt}
                    onChange={this.onImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {this.props.fileType === 'image' ? this.renderCategorySelect() : ''}
                <FormsyText
                  // id="media_cat"
                  ref={(input) => this.inputFileCaption = input}
                  name="inputFileCaption"
                  floatingLabelText={`${uploadTitle} 제목`}
                  required
                  style={{ display: 'block' }}
                  value={this.state.fileName}
                />
                <FormsyText
                  // id="media_desc"
                  ref={(input) => this.inputFileDesc = input}
                  name="inputFileDesc"
                  floatingLabelText={`${uploadTitle} 설명`}
                  style={{ display: 'block' }}
                />
                <RaisedButton
                  label="취소"
                  style={{ float: 'left', clear: 'left', marginTop: '15px' }}
                  // onTouchTap={this.uploadIt}
                />
                <RaisedButton
                  type="submit"
                  label="업로드"
                  style={{ float: 'right', clear: 'right', marginTop: '15px' }}
                  // onTouchTap={this.uploadIt}
                />
              </Formsy.Form>
              <ToggleDisplay show={this.state.inProgress}>
                {/*
                <Slider defaultValue={0} value={this.state.progress} min={0} max={100} />
                */}
                <LinearProgress mode="determinate" value={this.state.progress} />
                <span className="sr-only">{this.state.progress}% Complete (success)</span>
                <span>{this.state.progress}%</span>
              </ToggleDisplay>
            </div>
          }
        />
      );
    }
    return (<div>not ready</div>);
  }
}

FileUpload.propTypes = {
  fileType: React.PropTypes.string,
  onSelectCategory: React.PropTypes.func,
};

export default FileUpload;
