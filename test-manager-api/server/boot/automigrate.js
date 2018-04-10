module.exports = function(app){
    app.dataSources.db.automigrate();
    console.log("Perfomed automigration");
}