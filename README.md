Kickstarter Project from

Beginner's Course on Ethereum and Solidity by Stephen Grider - https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide

It's pretty much the same project but adapted to the newest versions of Solidity. 

Things that change from the course:

- Use of `constructor` to declare constructors instead of functions with the same name as contracts
- Added identification of `storage` and `memory` for string variables
- Used pure React with Router instead of NextJS
- Structure of the project 
- Styles (CSS) and components 

<hr></hr>

Want to start the project? Feel free to test my skills by looking at the code above (not many descriptions or comments about functions)

Here's how:

1. Download the project using the code button above
2. Extract the files from the .zip in the desired folder
3. Open the folder and look for the main page (a `package.json` file should be on sight)
4. Open your favorite terminal and get to that same page (use Right Click -> Git Bash HERE on Windows with NPM installed)
5. Navigate to the `ethereum` folder and call `node deploy` in the terminal 
6. Check for the folder `build` and copy the two `.json` files
7. Paste them in `client/src/ethereum/build` 
8. Go back to the main folder where you can see the `package.json` file
9. Run `npm run kickstarter` in the terminal 

NOTE: The project will run automatically and open Chrome. You can change the browser it opens by getting into the `package.json` file and searching for the `"start": "cross-env BROWSER=chrome start" line.

You can change the word Chrome in this line for your favorite browser (e.g. **brave**, **firefox**, **opera**, etc.)
