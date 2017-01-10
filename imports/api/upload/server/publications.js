/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { MediaFiles } from '../MediaFiles.js';
import { MediaCategories } from '../MediaCategories.js';
import ffmpeg from 'fluent-ffmpeg';

if (Meteor.isServer) {
  // MediaFiles.denyClient();
  MediaFiles.allowClient();
  // MediaFiles.collection.attachSchema(defaultSchema);
  Meteor.publish('media.categories', () => MediaCategories.find());
  Meteor.publish('files.all', () => MediaFiles.find().cursor);
  Meteor.methods({
    'Files.Remove'(fileid) {
      check(fileid, String);
      MediaFiles.remove({ _id: fileid });
    },
    'Files.RemoveAll'(fileIds) {
      // console.log('fileIds', fileIds);
      check(fileIds, Array);
      MediaFiles.remove({ _id: { $in: fileIds } });
    },
    'Files.Rename'(fileid, filename) {
      check(fileid, String);
      check(filename, String);
      MediaFiles.update({ _id: fileid }, { $set: { name: filename } });
    },
    'Categories.Remove'(catIds) {
      check(catIds, Array);
      MediaFiles.remove({ _id: { $in: catIds } });
      MediaFiles.remove({ catId: { $in: catIds } });
    },
    'Files.MakeThumbnail'(file) {
      check(file, Object);
      const videoSourcePath = file.path;
      const videoThumbFile = `${file._id}.thumb.jpg`;
      const videoThumbPath = `${file._storagePath}/${videoThumbFile}`;
      const proc = new ffmpeg({ source: videoSourcePath })
        // .withSize('150x100')
        .takeScreenshots({
          count: 1,
          timemarks: ['0.1'],
          filename: videoThumbFile,
          // timemarks: ['50%', '75%'],
          // filename: '%b_screenshot_%w_%i',
        }, file._storagePath, function (err, filenames) {
          // console.log(filenames);
          // console.log('screenshots were saved');
          return filenames;
        });
    },
  });
} else {
  Meteor.subscribe('files.all');
  Meteor.subscribe('media.categories');
}
