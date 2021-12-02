Doubleclick

// Enter your template code here.
const log = require('logToConsole');
const sendPixel = require('sendPixel');
const generateRandom = require('generateRandom');
const queryPermission = require('queryPermission');

let axel = generateRandom(1000000000000, 9999999999999) + "";

let urlToPixel = '';

if (data.type == 'remarketing') {
  urlToPixel = 'https://pubads.g.doubleclick.net/activity;dc_iu=/' + data.dciu + '/DFPAudiencePixel;ord=' + axel + ';dc_seg=' + data.dcseg + '?';
} else {
  urlToPixel = 'https://pubads.g.doubleclick.net/activity;xsp=' + data.xsp + ';ord=1;num=' + axel + '?';
}


if (queryPermission('send_pixel', urlToPixel)) {
  sendPixel(urlToPixel);
  log('Success Pixel: ', urlToPixel);
} else {
  log('Failure Pixel: ', urlToPixel);
  data.gtmOnFailure();
}

// ==================================================================================================

// Enter your template code here.
const log = require('logToConsole');
const generateRandom = require('generateRandom');
const sendPixel = require('sendPixel');
log('[DoubleClick - custom template] data =', data);

const axel = (generateRandom(1111111111111111, 9999999999999999)).toString();
log('[DoubleClick - custom template] axel = ', axel);

let src = '';

if (data.pixelType == 'activityPixel') {
  src = 'https://pubads.g.doubleclick.net/activity;xsp=' + data.xsp + ';ord=' + axel + '?';
} else { // pixelType == 'audiencePixel'
  src = 'https://pubads.g.doubleclick.net/activity;dc_iu=/' + data.accountID + '/DFPAudiencePixel;ord=' + axel + ';dc_seg=' + data.dcSeg + '?';
}

log('[DoubleClick - custom template] src = ', src);

sendPixel(src, data.gtmOnSuccess, data.gtmOnFailed);