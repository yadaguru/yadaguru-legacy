#YadaGuru
##College Application Reminders

Visit our [CodeForPhily project info page](https://codeforphilly.org/projects/college_application_app_for_philly_schools).

##Local Development Installation
 * Be sure you have installed `node`, `npm`, and `mongodb`
 * Be sure that the `mongodb` service is running
 * Run `npm install -g gulp bower`
 * `cd` into the project root folder (if you are not already there)
 * Run `npm install` to install dependences
 * Run `bower install` to install client-side libraries
 * Run `node seed.js` to seed the database (see below)

##Serving Locally
Run `gulp serve` to serve the project with browsersync on `localhost:9000`. While gulp is running the browser and server will be reloaded on every file change related to their domain.

##The Excel File
The Excel file found at the root of this folder contains all of the date reminders and messages for the generated reminders.

##Seed.js
The seed.js file can be used to seed a local mongodb instance. The process will remove any entries in the collections before seeding them with data. To run the file use `node seed.js`. There are optional arguments:
 * `<seedFolder>` Defaults to `seeds`. Allows the selection of a folder that holds the seed .json files.
 * `--dbname <name>` Defaults to `yadaguru`. Allows the choice of local db to utilize, recommended to leave as default.
 * `--adminuser <user>` Defaults to `yada`. Allows you to define admin username for login.
 * `--adminpass <pass>` Defaults to `guru`. Allows you to define admin password for login.

To add new seed files it is required that the files name matches the mongoose model. For example `mongoose.model('TestDate', testDateSchema)` the seed file should be named `TestDate.json`.
