# DonateABLE
DonateABLE is a site for users to sign up for an account and using their device to mine cryptocurrency for a charity of their choosing. No need to make a financial donation, just leave your device running to make an impact in your community!

DonateABLE is built using TypeScript, React, SASS and Firebase.

See the project live [here](https://donateable.ca)

## Installation
Clone the repository

```
git clone https://github.com/DonateABLE/donateABLE-firebase.git
```
Change to the directory 
```
cd donateABLE-firebase
```
Finally run npm to install dependencies 
```
npm install
```

There is a couple scripts described in `package.json` that are needed to run the development environment. 

Run the Firebase emulators

```
npm run emulate
```

Run the webpack watch script to watch for changes in the codebase as you develop

```
npm run watch
```

Awesome! You can make changes and see them live at: `http://localhost:5000`

## Folder Structure

* `/` - Contains the various config files for TSLint, webpack, Firebase and dependencies 
* `/functions` - Contains the firebase functions that are setup in the backend
* `/src/components` - Contains all of the React components that can be reused across all of the pages (i.e. Buttons, Modals, Forms)
* `/src/orm` - Contains the ORM wrapper around Firebase, the structure for data used in the web app, and the model
* `/src/pages` - Contains the individual pages 

