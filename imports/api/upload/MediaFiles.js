/* eslint-disable prefer-arrow-callback, func-names */
// import { Mongo } from 'meteor/mongo';

// const Thumbler = require('thumbler');
// import thumbler from 'thumbler';
// const ffmpeg = require('@ffmpeg-installer/ffmpeg');
// const ffmpeg = require('fluent-ffmpeg');
import ffmpeg from 'fluent-ffmpeg';
// import path from 'path';
// console.log('path test', path.resolve('./public/uploads'));

// console.log('path test', Assets.absoluteFilePath('/public/uploads'));

export const MediaFiles = new FilesCollection({
  debug: false,
  collectionName: 'MediaFiles',
  // schema: new SimpleSchema(defaultSchema),
  // permissions: 777,
  // parentDirPermissions: 777,
  // public: true,
  // downloadRoute: '/uploads/',
  storagePath: '/data/kioskseed/uploads/',
  // storagePath: '/Users/jjailbird/Documents/dev/kiosk/kioskseed/public/uploads/',
  allowClientCode: true, // Disallow remove files from client
  onBeforeUpload(file) {
    // Allow upload files under 100MB, and only in png/jpg/jpeg formats
    if (file.size <= 104857600000 && /png|jpg|jpeg|mp4/i.test(file.extension)) {
      return true;
    } else {
      alert('Please upload image, video, with size equal or less than 10GB');
      return false;
    }
  },
  onAfterUpload(file) {
    const self = this;
    // console.log('onAfterUpload', file);

    if (file.meta.type === 'video') {
      // console.log('onAfterUpload.video', file.path);

      const videoSourcePath = file.path;
      const videoThumbFile = `${file._id}.thumb.jpg`;
      // const videoThumbPath = `${file._storagePath}/${videoThumbFile}`;
      const videoThumbPath = file._storagePath;
      // const videoThumbPath = '/Users/jjailbird/Documents/dev/kiosk/kioskseed/public/uploads';
      const proc = new ffmpeg({ source: videoSourcePath })
        // .withSize('150x100')
        .takeScreenshots({
          count: 1,
          timemarks: ['0.1'],
          filename: videoThumbFile,
          // timemarks: ['50%', '75%'],
          // filename: '%b_screenshot_%w_%i',
        }, videoThumbPath, function (err, filenames) {
          console.log(filenames);
          console.log('screenshots were saved');
        });
    }
    MediaFiles.update(file._id, {
      $set:
      {
        updatedAt: new Date(),
        contentType: file.meta.type ? file.meta.type : null,
        catId: file.meta.catId ? file.meta.catId : null,
      },
    });
  },
});
