import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
// import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import Slider from 'react-slick';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { MediaFiles } from '../../api/upload/MediaFiles.js';
// import Center from 'react-center';
import { GridList, GridTile } from 'material-ui/GridList';
import { ModalManager } from 'react-dynamic-modal';
import FileViewer from '../../ui/components/FileViewer.jsx';
import { MARGIN_RIGHT_WIDTH, STYLE_CONTENT_CONTAINER, STYLE_CONTENT_TITLE } from './constants.js';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconReplay from 'material-ui/svg-icons/av/replay';

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
      infinite: false,
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
      <Slider className="image-slider" {...settings}>
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
        cellHeight={300}
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
    const catFile = MediaFiles.findOne({ _id: catId });
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
          <div style={STYLE_CONTENT_TITLE}>
            <h1
              style={{
                height: '47px', lineHeight: '47px', margin: '3px',
                fontWeight: 'normal', fontSize: '40px', color: '#fff',
              }}
              className="quote"
            >
              {` ${catFile.meta.caption} `}
            </h1>
          </div>
          <div style={STYLE_CONTENT_CONTAINER}>
            <div style={{ padding: '40px' }}>
              {this.renderSlides(fileCursors)}
              <Link
                to="/imageCategories"
                style={{
                  position: 'relative',
                  float: 'right', clear: 'right', cursor: 'pointer',
                  zIndex: 100,
                }}
              >
                <img
                  src="/img/btn.goto.back.png"
                  alt="뒤로가기"
                />
              </Link>
                {/*
              <FlatButton
                label="뒤로"
                labelStyle={{
                  color: '#657d7a', fontSize: '24px', fontWeight: 'bold',
                }}
                icon={<IconReplay color="#657d7a" style={{ fontWeight: 'bold' }} />}
                style={{
                  float: 'right', clear: 'right',
                }}
                onTouchTap={() => { browserHistory.push('/imageCategories'); }}
              />
              */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePage;
