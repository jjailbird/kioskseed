import React, { PureComponent } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import FileUpload from '../../components/FileUpload.jsx';
import FileList from '../../components/FileList.jsx';

export default class FileCategoryPage extends PureComponent {
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `카테고리 - ${previousTitle}`} />
        <h4>카테고리 편집</h4>
        <Divider />
        <div style={{ padding: '10px' }}>
          <FileUpload fileType="cat" />
          <FileList fileType="cat" />
        </div>
      </div>
    );
  }
}

FileCategoryPage.propTypes = {
  user: React.PropTypes.object,
};

