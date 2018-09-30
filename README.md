# Jobs Scraper

⚗️ **EXPERIMENTAL** ⚗️ This is a script that will scrap jobs on a list of tech companies and save them in JSON files. The idea is to either store them in a DB afterwards or serve them directly. A front-end app will be able to consume them.

For now the list of jobs are IT related, in Sweden for the following companies:

-   Spotify
-   iZettle
-   Toca Boca
-   Tobii
-   King

## Running

-   Clone de repo `git clone https://github.com/alexandre-mouton-brady/jobs-scraper.git`
-   cd into it `cd jobs-scraper`
-   Install the dependencies `yarn` or `npm install`
-   Start the script `yarn start` or `npm run start` (It might takes a few minutes)
-   Once complete, if no errors happened (they are not handled really well as of now), your data should be saved to the `data` folder

## Built With

-   [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless browser by Google Chrome
-   [Node](https://nodejs.org/en/) - The backend technology that powers the script
-   [ESM](https://github.com/standard-things/esm) - Enable ES6 import / export syntax in a Node environement

## Inspiration

-   [DevTips](https://www.youtube.com/watch?v=pixfH6yyqZk)

## Authors

-   **Alexandre Mouton-Brady**
