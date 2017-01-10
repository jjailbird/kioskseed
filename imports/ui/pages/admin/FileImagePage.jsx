import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import FileUpload from '../../components/FileUpload.jsx';
import FileList from '../../components/FileList.jsx';
// import FileSelect from '../../components/FileSelect.jsx';

export default class FileImagePage extends Component {
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
        <h4>이미지 추가/삭제</h4>
        <Divider />
        <div style={{ padding: '10px' }}>
          {/* <FileSelect fileType="cat" onSelectCategory={this.onSelectCategory} /> */}
          <FileUpload fileType="image" onSelectCategory={this.onSelectCategory} />
          <FileList fileType="image" fileCategory={this.state.selectedCategory} />
        </div>
      </div>
    );
  }
}

FileImagePage.propTypes = {
  user: React.PropTypes.object,
};

