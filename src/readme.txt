Readme for the source js code

This code runs with the help of express.js

path.join() used to define paths for the Express config

app.set() sets the handlebars engine and views location

"nodemon src/appn.js -e js,hbs" command is used to run nodemon for any change in js file or hbs file

App.use(): 
When the js program starts running in the browser, it reaches the app.use command and searches for the /xxxxx command in the mentioned folder.
If it doesn't find a match it moves forward to app.get().

App.get():
After it searches for files in the folder mentioned, it looks for match in .get().
    For the 404 page:
        The process is similar to if, else.
        If the else condition is put before some if conditions, the upcoming else if conditons will not run.
        In this case, '', '/help', '/about', '/weather' are the if and else if conditions where as '*' is the else condtion which works as anything except the ones menton before
        If in any case we put '*' before '/weather' or any other path, it will show the contents of the 404 page(* is used for 404 page here) for the weather page, that we have already 
        programmed.   



More information on expressjs api documentation(for,app[.set(), .get(), .use() and .listen()])

Information is also available about the response and request in the get funtion.
