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
import FileViewer from '../../ui/components/FileViewer.jsx';
import { MARGIN_RIGHT_WIDTH } from './constants.js';

const styles = {
  gridList: {
    width: '100%',
    height: 700,
    overflowY: 'auto',
    margin: '0px',
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
  openFileViewer(src, caption) {
    ModalManager.open(<FileViewer src={src} caption={caption} onRequestClose={() => true} />);
  }
  renderSlides(slideSource) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // className: 'fill',
    };

    const itemTotal = slideSource.length;
    const pageLimit = 8;
    const pageTotal = Math.ceil(itemTotal / pageLimit);
    const slides = [];
    for (let i = 0; i < pageTotal; i++) {
      const iStart = (i === 0) ? 0 : (i * pageLimit);
      const iEnd = iStart + pageLimit;
      slides.push(slideSource.slice(iStart, iEnd));
    }

    return (
      <Slider {...settings}>
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
        cols={4}
        cellHeight={320}
        padding={20}
      >
      {images.map((aFile, key) => {
        const link = MediaFiles.findOne({ _id: aFile._id }).link();
        return (
          <GridTile
            // subtitle={<span>by <b>{this.props.fileSize}</b></span>}
            key={key}
            title={aFile.name}
          >
            <img
              src={link}
              // alt={this.props.fileName}
              alt={aFile.name}
              style={{ cursor: 'pointer' }}
              onTouchTap={() => {
              // this.openFileViewer(this.props.fileUrl, this.props.fileName);
                this.openFileViewer(link, aFile.name);
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
    // console.log('this.props.params.cat', this.props.params.cat);
    const catId = this.props.params.cat;
    const fileCursors = MediaFiles.find(
      { contentType: 'image', catId }, { sort: { updatedAt: -1 } }).fetch();

    return (
      <div
        className="root fill"
        style={{
          backgroundImage: 'url("/img/images.bg.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <div style={{ marginRight: `${MARGIN_RIGHT_WIDTH}px` }}>
          <Title render={(previousTitle) => `사진보기 - ${previousTitle}`} />
          <div style={{ paddingTop: '10px', paddingBottom: '20px' }}>
            <img src="/img/images.gallery.title.png" alt="사진보기" />
          </div>
          <div
            style={{
              width: '100%',
              height: '900px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '25px',
              paddingTop: '40px',
              paddingBottom: '40px',
            }}
          >
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
