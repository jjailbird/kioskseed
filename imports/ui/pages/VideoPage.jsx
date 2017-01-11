import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
// import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import Slider from 'react-slick';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { MediaFiles } from '../../api/upload/MediaFiles.js';
// import Center from 'react-center';
import { GridList, GridTile } from 'material-ui/GridList';
import { ModalManager } from 'react-dynamic-modal';
// import FileViewer from '../../ui/components/FileViewer.jsx';
import VideoViewer from '../../ui/components/VideoViewer.jsx';
import { MARGIN_RIGHT_WIDTH, STYLE_CONTENT_CONTAINER, STYLE_CONTENT_TITLE } from './constants.js';

const styles = {
  gridList: {
    width: 1495,
    height: 635,
    overflowY: 'auto',
    margin: '20px 0px 0px 0px',
  },
};

class ImagePage extends trackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      files: Meteor.subscribe('files.all'),
    };
  }
  componentWillUnmount() {
    /*
    this.setState({
      images: MediaFiles.find({}, { sort: { updatedAt: -1 } }).fetch(),
    });
    */
    this.state.files.stop();
  }
  openVideoViewer(src, caption) {
    ModalManager.open(<VideoViewer src={src} caption={caption} onRequestClose={() => true} />);
  }
  renderSlides(slideSource) {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // className: 'fill',
    };

    const itemTotal = slideSource.length;
    const pageLimit = 6;
    const pageTotal = Math.ceil(itemTotal / pageLimit);
    const slides = [];
    for (let i = 0; i < pageTotal; i++) {
      const iStart = (i === 0) ? 0 : (i * pageLimit);
      const iEnd = iStart + pageLimit;
      slides.push(slideSource.slice(iStart, iEnd));
    }

    return (
      <Slider className="video-slider" {...settings}>
        {slides.map((file, index) => (
          <div key={index}>
            {this.renderGridList(file)}
          </div>
        ))}
      </Slider>
    );
  }
  renderGridList(images) {
    return (
      <GridList
        style={styles.gridList}
        cols={3}
        cellHeight={250}
        padding={60}
        className="video-grid"
      >
      {images.map((aFile, key) => {
        const link = MediaFiles.findOne({ _id: aFile._id }).link();
        const thumbnail = `http://localhost/${aFile._id}.thumb.jpg`;
        return (
          <GridTile
            // subtitle={<span>by <b>{this.props.fileSize}</b></span>}
            key={key}
            title={aFile.meta.caption}
          >
            <img
              src={thumbnail}
              // alt={this.props.fileName}
              alt={aFile.meta.caption ? aFile.meta.caption : aFile.name}
              style={{ cursor: 'pointer' }}
              onTouchTap={() => {
              // this.openVideoViewer(this.props.fileUrl, this.props.fileName);
                this.openVideoViewer(link, aFile.meta.caption ? aFile.meta.caption : aFile.name);
              }}
            />
          </GridTile>
        );
      })}
      </GridList>
    );
  }
  render() {
    // const fileCursors = MediaFiles.find({}, { sort: { updatedAt: -1 } }).fetch();
    // console.log('fileCursors', fileCursors.length);
    const fileCursors = MediaFiles.find({ contentType: 'video' }, { sort: { updatedAt: -1 } }).fetch();

    return (
      <div
        className="root fill"
        style={{
          backgroundImage: 'url("/img/videos.bg_mini.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <div style={{ marginRight: `${MARGIN_RIGHT_WIDTH}px` }}>
          <Title render={(previousTitle) => `영상보기 - ${previousTitle}`} />
          <div style={STYLE_CONTENT_TITLE}>
            <img src="/img/videos.title.png" alt="영상보기" />
          </div>
          <div style={STYLE_CONTENT_CONTAINER}>
            <div style={{ padding: '40px' }}>
              {this.renderSlides(fileCursors)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePage;
