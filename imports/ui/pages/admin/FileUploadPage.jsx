import React, { PureComponent } from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import trackerReact from 'meteor/ultimatejs:tracker-react';
import { MediaFiles } from '../../../api/upload/MediaFiles.js';

import FileUpload from '../../../ui/components/FileUpload.jsx';
import FileIndividual from '../../../ui/components/FileIndividual.jsx';
import { GridList } from 'material-ui/GridList';


const styles = {
  upload: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 450,
    overflowY: 'auto',
  },
};

class FileUploadPage extends trackerReact(PureComponent) {
  render() {
    const fileCursors = MediaFiles.find({}, { sort: { updatedAt: -1 } }).fetch();
    return (
      <div className="root">
        <Title render={(previousTitle) => `파일 업로드 - ${previousTitle}`} />
        <h2>파일 업로드</h2>
        <Divider />
        <FileUpload />
        <div style={styles.upload}>
          <GridList
            style={styles.gridList}
            cols={3}
            cellHeight={200}
            padding={1}
          >
          {fileCursors.map((aFile, key) => {
            // console.log('A file: ', aFile.link(), aFile.get('name'));
            // console.log('aFile', aFile);
            const link = MediaFiles.findOne({ _id: aFile._id }).link();
            return (
              <FileIndividual
                key={`file${key}`}
                fileName={aFile.name}
                fileUrl={link}
                fileId={aFile._id}
                fileSize={aFile.size}
                fileType={aFile.type}
                fileObj={aFile}
              />
            );
          })}
          </GridList>
        </div>
      </div>
    );
  }
}

export default FileUploadPage;
