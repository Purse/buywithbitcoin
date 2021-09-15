# Purse Browser Extension
[Purse.io](https://purse.io) gets you 5-33% off items on Amazon when shopping with Bitcoin or Bitcoin Cash.

The Purse Browser Extension (Chrome and Firefox) provides enhanced functionality when interacting with Amazon by adding widgets to the page.

Shoppers: Can add items to cart directly from Amazon product pages.  View your Purse Cart, and proceed to Checkout.

Earners: Submit tracking information directly to purse from within the Amazon Tracking Pages.

### Supported Domains
- amazon.com
- amazon.co.uk
- amazon.ca
- amazon.de
- amazon.co.jp

# Local Development
```
npm install
# watches for changes and webpacks them into ./dist
npm start
```
you can then load the unpacked `./dist` directory in chrome

## Firefox
in a separate tab from the `npm start` script above, you can run `npm run start-ff` to have `web-ext` watch for changes in the `./dist` folder and open a firefox browser with the local unpacked extension loaded.


# Production Build
```
npm install
# webpack everything into the ./dist directory
npm run build-prod
# uses web-ext to zip the extension into the ./dest/web-ext-artifacts filder
npm run compress-build
```

# Deploying
When you're ready to deploy, use the `npm run deploy-[patch|minor|major]` command to bump the version tags, build, and compress all in one step.
