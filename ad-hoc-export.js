var csv             = require('ya-csv');
var cheerio         = require('cheerio');
var requestPromise  = require('request-promise');
var inputs          = require('./inputs.json');

var writer = csv.createCsvFileWriter('products.csv', {
  'separator': ','
});

var constructLine = function(data) {
  var line = [
    data.handle,                                    // Handle
    data.title,                                     // Title
    ,                                               // Body (HTML
    'Red Bull',                                     // Vendor
    'Product',                                      // Type
    "",                                             // Tags
    true,                                           // Published
    ,                                               // Option1 Name
    ,                                               // Option1 Value
    ,                                               // Option2 Name
    ,                                               // Option2 Value
    ,                                               // Option3 Name
    ,                                               // Option3 Value
    data.sku,                                       // Variant SKU
    '100',                                          // Variant Grams
    'shopify',                                      // Variant Inventory Tracker
    '2',                                            // Variant Inventory Qty
    'continue',                                     // Variant Inventory Policy
    'manual',                                       // Variant Fulfillment Service
    data.price,                                     // Variant Price
    '10000.00',                                     // Variant Compare At Price
    true,                                           // Variant Requires Shipping
    true,                                           // Variant Taxable
    "",                                             // Variant Barcode
    data.imgUrl||'http://placehold.it/400x400',     // Image Src
    'Product Image',                                // Image Alt Text
    false,                                          // Gift Card
    ,                                               // SEO Title
    ,                                               // SEO Description
    ,                                               // Google Shopping / Google Product Category
    ,                                               // Google Shopping / Gender
    ,                                               // Google Shopping / Age Group
    ,                                               // Google Shopping / MPN
    ,                                               // Google Shopping / AdWords Grouping
    ,                                               // Google Shopping / AdWords Labels
    ,                                               // Google Shopping / Condition
    ,                                               // Google Shopping / Custom Product
    ,                                               // Google Shopping / Custom Label 0
    ,                                               // Google Shopping / Custom Label 1
    ,                                               // Google Shopping / Custom Label 2
    ,                                               // Google Shopping / Custom Label 3
    ,                                               // Google Shopping / Custom Label 4
    data.imgUrl,                                    // Variant Image
    'oz'                                            // Variant Weight
  ];
  return line;
};

function init() {
  writer.writeRecord(inputs.headings);
  inputs.urls.forEach(function(url, index) {
    requestPromise(url)
      .then(function(body) {
        var $ = cheerio.load(body);
        var data = {};

        data.title = $('.productBlock h1').text();
        data.handle = data.title.toLowerCase().replace(/(\s)/g, '-').replace(/(\/|\?|\&|\.|\:|\;)/g, '+');
        data.price = $('#productPrice').text().trim().substring(1);
        data.sku = $('#detailsPanel [data-ng-bind="product.code"]').text();
        data.imgUrl = $('meta[property="og:image"]').attr('content');

        var line = constructLine(data);
        writer.writeRecord(line);
      })
      .catch(console.error);
  });
}

init();
