import { Meteor } from 'meteor/meteor';

export const NAV_RIGHT_WIDTH = 320;
export const MARGIN_RIGHT_WIDTH = 290;
export const STYLE_CONTENT_CONTAINER = {
  width: '100%',
  height: '907px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '25px',
  paddingTop: '40px',
  paddingBottom: '40px',
};
export const STYLE_CONTENT_TITLE = {
  paddingTop: '23px', paddingBottom: '31px',
};

export const IMAGE_HOST =
  Meteor.settings.public.imageHost ? Meteor.settings.public.imageHost : 'http://localhost';
