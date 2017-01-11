/* eslint-disable prefer-arrow-callback, func-names */

import { Meteor } from 'meteor/meteor';
import ffmpeg from 'fluent-ffmpeg';

const storagePath = Meteor.settings.public.storagePath;
// console.log('storagePath', storagePath);

// console.log('path test', Assets.absoluteFilePath('/public/uploads'));
const makeThumbnail = (file) => {
  const videoSourcePath = file.path;
  const videoThumbFile = `${file._id}.thumb.jpg`;
  // const videoThumbPath = `${file._storagePath}/${videoThumbFile}`;
  const videoThumbPath = file._storagePath;
  const proc = ffmpeg(videoSourcePath);
  /*
  proc.on('filenames', function (filenames) {
    console.log(`screenshots are ${filenames.join(', ')}`);
  });
  */
  proc.on('end', Meteor.bindEnvironment(function () {
    // console.log('screenshots were saved');
    updateMediaFile(file);
  }));
  proc.on('error', function (err) {
    console.log(`an error happened: ${err.message}`);
  });
  // take 2 screenshots at predefined timemarks and size
  proc.takeScreenshots(
    { count: 1, timemarks: ['12'], filename: videoThumbFile },
    videoThumbPath
  );
  // Meteor.wrapAsync(proc.on);
};

const updateMediaFile = (file) => {
  MediaFiles.update(file._id, {
    $set:
    {
      updatedAt: new Date(),
      contentType: file.meta.type ? file.meta.type : null,
      catId: file.meta.catId ? file.meta.catId : null,
      thumbnailPath: file.meta.type === 'video' ? `${file._storagePath}/${file._id}.thumb.jpg` : null,
    },
  });
};


export const MediaFiles = new FilesCollection({
  debug: false,
  collectionName: 'MediaFiles',
  // schema: new SimpleSchema(defaultSchema),
  // permissions: 777,
  // parentDirPermissions: 777,
  // public: true,
  // downloadRoute: 'http://localhost/',
  storagePath, // : '/data/kioskseed/uploads/',
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
      // Meteor.wrapAsync(makeThumbnail(file));
      makeThumbnail(file);
    } else {
      updateMediaFile(file);
      /*
      MediaFiles.update(file._id, {
        $set:
        {
          updatedAt: new Date(),
          contentType: file.meta.type ? file.meta.type : null,
          catId: file.meta.catId ? file.meta.catId : null,
        },
      });
      */
    }
  },
});
