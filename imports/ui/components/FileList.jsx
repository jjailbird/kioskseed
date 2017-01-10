import { Meteor } from 'meteor/meteor';
import { MediaFiles } from '../../api/upload/MediaFiles.js';
import trackerReact from 'meteor/ultimatejs:tracker-react';

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';

import Subheader from 'material-ui/Subheader';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import confirm from '../utils/confirm.js';
import handleFormInputChange from '../utils/handleFormInputChange';
import fs from 'fs';

export default class FileList extends trackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        files: Meteor.subscribe('files.all'),
      },
    };
    // this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.removeFiles = this.removeFiles.bind(this);
    this.handleFormInputChange = handleFormInputChange.bind(this);
  }
  onCheck(e) {
    this.handleFormInputChange(e);
  }
  removeFiles(fileType) {
    // console.log('this.state.chkFiles', this.state.chkFiles.length);
    if (this.state.chkFiles && this.state.chkFiles.length > 0) {
      confirm('선택한 파일들을 삭제하시겠습니까?').then(() => {
        // console.log('this.state.chkFiles', this.state.chkFiles);
        const meteorCall = fileType === 'cat' ? 'Categories.Remove' : 'Files.RemoveAll';
        Meteor.call(meteorCall, this.state.chkFiles, (err, res) => {
          if (err) {
            console.log('Meteor.call error', err);
          }
        });
      }, () => {
        console.log('confirm', 'canceled!');
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
  render() {
    // const files = this.props.files;
    const fileType = this.props.fileType;
    let listTitle = '';
    switch (this.props.fileType) {
      case 'cat':
        listTitle = '카테고리';
        break;
      case 'video':
        listTitle = '동영상';
        break;
      case 'image':
        listTitle = '이미지';
        break;
      default:
        listTitle = '파일';
    }

    let files = [];
    if (this.props.fileType === 'image') {
      files = MediaFiles.find(
        { contentType: fileType, catId: this.props.fileCategory },
        { sort: { updatedAt: -1 } }
      ).fetch();
    } else {
      files = MediaFiles.find({ contentType: fileType }, { sort: { updatedAt: -1 } }).fetch();
    }
    files = MediaFiles.find({}, { sort: { updatedAt: -1 } }).fetch();
    return (
      <Paper
        style={{ display: 'inline-block', verticalAlign: 'top' }}
        zDepth={1}
        children={
          <List>
            <Subheader>
              <span>{listTitle} 리스트 ({files.length})</span>
              <span style={{ float: 'right' }}>
                <IconButton
                  tooltip={`선택한 ${listTitle} 삭제`}
                  touch
                  onTouchTap={() => { this.removeFiles(fileType); }}
                >
                  <IconDelete
                    color="#FF5733"
                    style={{ verticalAlign: 'text-bottom' }}
                  />
                </IconButton>
              </span>
            </Subheader>
          {files.map((file, index) => {
            // const link = MediaFiles.findOne({ _id: file._id }).link();
            // const file = MediaFiles.findOne({ _id: file._id });
            let link = MediaFiles.findOne({ _id: file._id }).link();
            if (fileType === 'video') {
              // link = `${file._downloadRoute}/${file._id}.thumb.jpg`;
              link = link.replace(`${file._id}.${file.extension}`, `${file._id}.thumb.jpg`);
            }

            let fileCount = 0;
            if (file.contentType === 'cat') {
              fileCount = MediaFiles.find({ contentType: 'image', catId: file._id }).count();
            }
            const fileCountDisp = (fileCount > 0) ? `(${fileCount})` : '';

            return (
              <ListItem
                key={index}
                rightAvatar={<Avatar src={link} />}
                leftCheckbox={
                  <Checkbox
                    name="chkFiles"
                    ref={(input) => this.chkFiles = input}
                    value={file._id}
                    onCheck={this.onCheck}
                  />
                }
                primaryText={`${file.meta.caption ? file.meta.caption : file.name}${fileCountDisp}`}
                secondaryText={file.meta.description}
                style={{ textAlign: 'left', minWidth: '300px' }}
              />
            );
          })}
          </List>
        }
      />
    );
  }
}

FileList.propTypes = {
  fileType: React.PropTypes.string,
  fileCategory: React.PropTypes.string,
  // files: React.PropTypes.array,
};
