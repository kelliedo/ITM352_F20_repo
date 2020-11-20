// taken directly from Lab13 with modifications
var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./products.json');
var products = data.products;


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

app.post("/process_form", function (request, response) {
    let POST = request.body; // put data into the body
});

if (typeof POST['submitPurchase'] != 'undefined') {
    var hasvalidquantities = true; 
    var hasquantities = false;
    for (i = 0; i < products.length; i++) {

        qty = POST[`quantity${i}`];
        hasquantities = hasquantities || qty > 0; // valid if value is larger than 0
        hasvalidquantities = hasvalidquantities && isNonNegInt(qty);
    }
    // create the invoice 
    const stringified = queryString.stringify(POST);
    if (hasvalidquantities && hasquantities) {
        response.redirect("./invoice.html?" + stringified);
    }
    else {
        response.redirect("./products_display.html?" + stringified)
    }
};

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

// taken from Lab 14 with modifications

var filename = "user_data.json";

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);
} else {
    console.log("Sorry can't read file " + filename);
    exit();
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    console.log("Got a POST login request");
    POST = request.body;
    user_name_from_form = POST["username"];
    console.log("User name from form=" + user_name_from_form);
    if (user_data[user_name_from_form] != undefined) {
        response.send(`<H3> User ${POST["username"]} logged in`);
    } else {
        response.send(`Error!`);
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    console.log("Got register POST");
    if (POST["username"] != undefined && POST['password'] != undefined) {          // Validate user input
        username = POST["username"];
        user_data[username] = {};
        user_data[username].name = username;
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        response.send("User " + username + " logged in");
    }
});


app.use(express.static('./public'));
app.listen(8080, () => console.log('listening on port 8080'));

