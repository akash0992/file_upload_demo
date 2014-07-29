var util = require('util')
    , multiparty = require('multiparty')
    , fs = require("fs")
    , PORT = process.env.PORT || 3000,
    express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.route("/")
    .get(function (req, res) {
        res.redirect("/index.html")
    });
app.route("/server/upload")
    .get(function (req, res) {
        res.redirect("/index.html")
    })
    .post(function (req, res) {
        var form = new multiparty.Form({uploadDir: __dirname + "/files", autoFiles: false});
        form.parse(req);
        form.on('file', function (name, file) {
            fs.renameSync(file.path, __dirname + "/files/" + file.originalFilename)
            console.log('received files:\n\n ' + util.inspect(file))
            res.redirect("/index.html")
        })

    })


app.listen(PORT,function(error){
    "use strict";
    console.log("server is running on ","http://0.0.0.0:"+PORT)
});