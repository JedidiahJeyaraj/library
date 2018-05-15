/*******************------README----*******************/

-------------------------------------:REQUIREMENTS:------------------

To run this application the following things are needed:

1.  nodejs 8+ version
2.  npm 5.6
3.  mongoDB 3.6

-----------------------------------------------------------------------------------------------------

----------------------TO RUN THE APPLICATION--------------------

1.  Extract the application.tar.gz in any preferred location.
2.  Start the mongo db server using the command "service mongod start" in terminal.
3.  Now open the terminal and navigate to the application folder.
4.  Now navigate to the backend folder using "cd backend" where package.json and app.js is present and then type "npm install" in the terminal and execute.
5.  Now to run the server type 'npm start' and this will start providing the services in "http://localhost:3001".
6.  Now navigate to the library folder using "cd ../library" where package.json is present and then type "npm install" in the terminal and execute.
7.  Now to run the application type 'npm start' and this will automatically open the website in your default browser.

-------------------------------------------------------------------------------------------------------

--------------------FUNCTION AVAILABLE IN THE APPLICATION------------------

1.  For Creation of new Genre "Add Genre" tab is present in the navigation bar which will populate a Add Genre Form.

2.  For Viewing all the available genre "View Genre" tab is present in the navigation bar which will populate all the available genre in a table format.

3.  In the View Genre Table the "Edit" option is given for editing the genre. "Delete" Option is given for deleting the genre. And "View Book" will display all the books of that specific gerne

4.  For Creation of new Book "Add Books" tab is present in the navigation bar which will populate an Add Book Form.

5.  For Viewing all the available books "View Books" tab is present in the navigation bar which will populate all the books in a table format.

6.  In the View Book Table the "Edit" option is given for editing the book. "Delete" Option is given for deleting the book."Issue" will issue the book and will change the status to "issued", and if issued then the "Recieve" button will come to Recieve the book and change the status to available.

7.  Below Search all the available genre are preset which when clicked will display all the available books present in that particular genre.

/*****************************************************************************************************/
