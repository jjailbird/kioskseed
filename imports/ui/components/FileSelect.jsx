import { MediaFiles } from '../../api/upload/MediaFiles.js';

import React, { Component, PureComponent, PropTypes } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  class SelectableList extends Component {
    constructor(props) {
      super(props);
      this.handleRequestChange = this.handleRequestChange.bind(this);
    }
    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }
    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
    }
    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  }
  SelectableList.propTypes = {
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.number.isRequired,
  };
  return SelectableList;
}

SelectableList = wrapState(SelectableList);

export default class FileSelect extends PureComponent {
  renderList() {
    const listType = this.props.fileType;
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
    const files = MediaFiles.find({ type: listType }, { sort: { updatedAt: -1 } }).fetch();

    return (
      <SelectableList
        ref={(node) => this.selectList = node}
        defaultValue={0}
      >
        <Subheader>
          <span>{listTitle} 선택</span>
        </Subheader>
        {files.map((file, index) => {
          const link = MediaFiles.findOne({ _id: file._id }).link();
          return (
            <ListItem
              value={index}
              key={index}
              leftAvatar={<Avatar src={link} />}
              primaryText={file.meta.caption ? file.meta.caption : file.name}
              secondaryText={file.meta.description}
              style={{ textAlign: 'left' }}
            />
          );
        })}
      </SelectableList>
    );
  }
  render() {
    return (
      <Paper
        style={{ display: 'inline-block', verticalAlign: 'top' }}
        zDepth={1}
        children={this.renderList()}
      />
    );
  }
}

FileSelect.propTypes = {
  fileType: React.PropTypes.string,
};
