# ReactGoogleDocs

To run the app, run this command:  
```
npm install  
npm run dev  
```
Wait for the webpack to fully start if nothing shows up. Refresh once completed and you should see results.  

You will then need to set up a free mongo DB. Instructions on how to do this are found [here.](http://fredrik.anderzon.se/2017/01/17/setting-up-a-free-mongodb-database-on-mlab-and-connecting-to-it-with-node-js/)  

Create a file named env.sh to store all of your environment variables. They can be written in this format:  
```
export MONGODB_URI="YOUR_MONGODB_URI_GOES_HERE"
```
Then run `source env.sh` in your terminal. This will make all variables locally accessible.  

Finally, you will need to run your backend server. This can be hosted or thorugh your local host. To do this, switch into this directory and run `node server.js`. This will run your server locally and you will be able to save/access any changes. This will **NOT** allow for real time editing. To do this, you must host your server, we chose to use Heroku, or make your local server accessible to others by making a local tunnel to your machine. We did this by using [ngrok.](http://www.ifdattic.com/how-to-create-tunnel-with-ngrok/)  

# Overview
ReactGoogleDocs is a rich-text editing desktop application that supports collaboration. Users can create, view, edit and share their documents. Currently, popular desktop text editors such as Evernote, iNotes do not provide real-time, collaborative editing and are a big memory killer. Those that do support real-time, multi-user editing are web applications and too can quickly slow down your computer. Using a combination of Electron and React, we are able to implement a quick, non-memory intensive solution for real-time text editing. 

## Architecture Overview  
  
ReactGoogleDocs uses React and Draftjs to manage document state, enabling users to view collaborators' edits and view edit history. We used MongoDB to support document persistence, user registration and credentials. The backend server uses Nodejs, Express, and socket.io for multi-user support and real-time editing.

## Features
* Rich-text formatting
  * Bold
  * Italics
  * Underline
  * Font color and size
  * Text alignment
  * Bullet and Numbered lists
* Persistent Login
* Document-specific URLs for sharing and quick access
* Multi-user support. Users can view others' edits in real time.
  * Different colors assigned to each user to track where they are on the page
  * Collaborators see text selections and cursors in users' assigned colors
* Document version histories
  * Users can revert back to old document states
* Secure documents with passwords
* Auto-saving



![](https://cl.ly/2d211U3z1q2U/Screen%20Recording%202017-08-01%20at%2008.44%20PM.gif)

![](https://cl.ly/252B331P0g2U/Screen%20Recording%202017-08-01%20at%2008.46%20PM.gif)

![](https://cl.ly/3M363x3X450Y/Screen%20Recording%202017-08-01%20at%2009.01%20PM.gif)

## Technologies Used
* React  
* React Router  
* Electron  
* Draftjs  
* Nodejs  
* Express  
* MongoDB  
* Socket.io  
* Heroku  
