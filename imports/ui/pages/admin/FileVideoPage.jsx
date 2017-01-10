import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import FileUpload from '../../components/FileUpload.jsx';
import FileList from '../../components/FileList.jsx';
// import FileSelect from '../../components/FileSelect.jsx';

export default class FileVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
    };
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }
  onSelectCategory(catId) {
    if (catId && catId !== this.state.selectedCategory) {
      this.setState({ selectedCategory: catId });
      // console.log('selectedCategory', catId);
    }
  }
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `카테고리 - ${previousTitle}`} />
        <h4>동영상 추가/삭제</h4>
        <Divider />
        <div style={{ padding: '10px' }}>
          <FileUpload fileType="video" onSelectCategory={this.onSelectCategory} />
          <FileList fileType="video" />
        </div>
      </div>
    );
  }
}

FileVideoPage.propTypes = {
  user: React.PropTypes.object,
};

