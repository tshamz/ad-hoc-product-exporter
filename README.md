###### wip

# ad-hoc-product-exporter
Scrape a store's product pages and turn the values into a .csv ready for import into shopify

## instructions
  *Step 1:* Create a sitemap of the store you want to scrape with tool like (this)[http://www.web-site-map.com/]

  *Step 2:* However you can, extract only the product page urls from the sitemap (RegEx, Sublime Multi-cursor, manual labor)

  *Step 3:* Put all of those urls into an array (wrapped in _DOUBLE QUOTES_), and make that array the value of "urls" in inputs.json

  *Step 4:* Identify what information you can/want to scrape from the product pages, and add their respective selectors and accompanying transform methods (if any) to the`var data` object in `init()`

  *Step 5:* Finally, in `constructLine()` make sure the data that's getting passed in via. `data` from the step before is going to the correct column in the generated line

  *Step 6:* run `node ad-hoc-export.js`

  *Step 7:* ???????

  *Step 8:* PROFIT!!!
