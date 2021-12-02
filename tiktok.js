const log = require('logToConsole');
const copyFromWindow = require('copyFromWindow');
const callInWindow = require('callInWindow');
const ttq = copyFromWindow('ttq');
const eventsWithRecommendedProperties = ['ViewContent', 'AddToCart', 'CompletePayment', 'PlaceAnOrder'];
let recommendedEventProperties = [];
let eventProperties = {};

log('data =', data);

if (eventsWithRecommendedProperties.indexOf(data.eventName) > -1) {
  recommendedEventProperties = [  
    {property: 'content_type', value: data.content_type ? data.content_type : null},
    {property: 'quantity', value: data.quantity ? data.quantity : null},
    {property: 'description', value: data.description ? data.description : null},
    {property: 'content_id', value: data.content_id ? data.content_id : null},
    {property: 'currency', value: data.currency ? data.currency : null},
    {property: 'value', value: data.value ? data.value : null}
  ];
  
  recommendedEventProperties.map(item => {
    if (item.value) {
      eventProperties[item.property] = item.value;
    }
  });
  
  log('eventProperties =', eventProperties);
}

if (data.eventPropertiesList) {
  log('data.eventPropertiesList: ', data.eventPropertiesList);
  
  data.eventPropertiesList.map((item) => {
    eventProperties[item.propertyName] = item.propertyValue;
  });
}

log('final eventProperties =', eventProperties);

const validation = callInWindow('ttq.track', data.eventName, eventProperties);

log('callInWindow result - validation: ', validation);

data.gtmOnSuccess();