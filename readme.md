# House of Fun App

Please make sure you are using Node 7.6 or higher

To Start run `npm install` and then `npm run app`
now you can go to `http://localhost:3000` and test the app by filling the fields and trying to insert new alien records or by querying the alien DB (__if__ you leave empty fields in the query section and press the `get` button you will retrive all the records of recorded aliens).

You can also shoot the backend with Postman or other manual HTTP client at `http://localhost:4000/insert` with POST method to insert new records or `http://localhost:4000/aliens?id=101` to get all aliens that alien with id 101 supervises. Warriors are supervised by commanders and commnaders supervised by chiefs.

Here is the schema of the db 
![db schema](https://github.com/stasezersky/house_of_fun/blob/master/DBscheme.jpg)

Behind the scene I run two processes - one is the backend and another one for the frontend.
* The DB used here is MongoDB and the official MongoDB node.js client 
* The logger is Bunyan which logs to stdout and into file at logs/app.log
* The HTTP backend server is KOA
* The frontend built with Next.js using React and Express HTTP server

The Backend flow is as follows:
1. KOA app starts at app.js and configures the Bunyan logger, and MongoDB url on the global object. Then it uses middleware such as Router, CORS, BodyParser and starts serving the app.
2. When request comes in - it is passed into the router at `routes/appRoutes.js` to evaluate the route. The router uses only two routes : `/insert` or `/aliens`
3. After router parses the routes - it passes the `ctx` (context) to the correct controller function from `controllers/actions.js`
4. The controller strips off the data fields from the `ctx` and passes the data to the corrct function in the instance of the handler from `lib/db_handler`.
5. the db_handler instance instantiated already the MongoDB client and the AlienDBService with the Mongo client. Now it passes the data to the alienDbService at `services/alienDB/alienDbService` for processing.
6. the alienDbService instanciates all service per collection and indexes the collections according to the schema above. Then it contains instances of all collections to validate and manipulate the data into and from the `alienDB` inside the MongoDB.
7. If a request is malformed - it will be caught in the alienDbService insstance and the service will return a message that logs status and error data - however it will not fail.

The Frontend flow:
1. Next.js uses express behind the scene to serve content - when a request comes in to route `/` Next.js will serve the `front_end/pages/index.js` page which contains some components from `front_end/components/`.
2. It will render the components and will track changes on the inputs
3. Some fields are in `select` component to limit the option possibilities.
4. When ready press `insert` button or `get` button and it will send a request to the backend service to the correct route with the correct method.
5. You will be taken to a different page to see the response.
6. If the action failed - the response will have `status: failed` and will have an explanation about the failure reason.

Have FUN :)


