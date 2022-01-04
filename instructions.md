## #Steps for setting up our project

- Make Sure you have node and npm installed in your computer.
- Install yarn with your npm.
- Clone the repo in your pc or download it from the repository.
- Open it with VS code.
- Make sure that port 3000 and 4000 are available and not occupied in your browser with anything.
- After entering the project folder open gitbash or PowerShell and write <strong>"yarn"</strong>, this will save all the necessary dependencies in your project for frontend.
- Then write <strong>"yarn start"</strong> in the terminal this will open your frontend in the browser on port 3000.
- Open <strong>another</strong> terminal and type "cd server" , moving to the server folder as our backend is there.
- Then again write <strong>"yarn"</strong> in the terminal, this will save necessary dependencies for backend in your project.
- Then write <strong>"yarn start"</strong> in that terminal or you can also write "nodemon server.js". This will initiate your backend on port 4000.

#FAQ

- <strong>what if while running the frontend your app throws the following error?</br>
  Error: error:0308010C:digital envelope routines::unsupported </strong>
  -> just go to package.json in the script you will find:
  "scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  ...
  <strong>just change the second line like below and save and run again</strong>
  "scripts": {
  "start": "react-scripts --openssl-legacy-provider start",
  "build": "react-scripts build",
- <strong>What if any dependency library becomes outdated?</strong>
  -> just run the command <strong>"yarn add (dependency-name)@(specific version)"</strong> without brackets.
