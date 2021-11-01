const people = require("./People");
const levels = require("./Levels");
const classes = require("./Classes");

module.exports = app => {
    app.use("/people", people);
    app.use("/levels", levels);
    app.use("/classes", classes);
}