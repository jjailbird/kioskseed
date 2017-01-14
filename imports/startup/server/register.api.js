import { Meteor } from 'meteor/meteor';

var os = require('os');
var ifaces = os.networkInterfaces();
let ipAddress = null;
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    /*
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    */
    ipAddress = iface.address;
    ++alias;
  });
});

let rootUrl = 'http://localhost:3000';
let imageHost = 'http://localhost';

if (Meteor.settings.public.publicHost) {
  rootUrl = Meteor.settings.public.publicHost;
} else if (Meteor.settings.public.localHost) {
  rootUrl = Meteor.setting.public.localHost;
} else if (ipAddress) {
  rootUrl = `http://${ipAddress}:3000`;
}

if (!Meteor.settings.public.imageHost) {
  imageHost = rootUrl.replace(':3000', '');
  Meteor.settings.public.imageHost = imageHost;
}

console.log('ROOT_URL', rootUrl);
console.log('imageHost', imageHost);

Meteor.startup(() => {
  // process.env.MAIL_URL = 'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
  process.env.ROOT_URL = rootUrl;
  if (Meteor.settings.public.mongoURL) {
    process.env.MONGO_URL = Meteor.settings.public.mongoURL;
    console.log('MONGO_URL', Meteor.settings.public.mongoURL);
  }
  var childProcess = require('child_process');
  childProcess.exec(`start chrome --kiosk ${rootUrl}`);
});

import '../../api/upload/server/publications';
