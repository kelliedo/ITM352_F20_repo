// Kellie Do ITM 352 Assignment 2 
// taken directly from Lab13 with modifications

var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./products.json");
var fs = require('fs');
var queryString = require('query-string');
var data = require('./products.json');
var filename = "user_data.json";

app.use(express.static('./public'));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// taken from Lab 14, makes data readable or else outputs an error
var filename = "user_data.json";

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);
} else {
    console.log("Sorry can't read file " + filename);
    exit();

app.use(myParser.urlencoded({ extended: true }));

app.post("/process_invoice", function (request, response) {
    let POST = request.body;
    console.log(POST);
    if (typeof POST['submitPurchase'] != 'undefined') {
        var hasvalidquantities = true;
        var hasquantities = false
        for (i = 0; i < products.length; i++) {

            qty = POST[`quantity${i}`];
            hasquantities = hasquantities || qty > 0;
            hasvalidquantities = hasvalidquantities && isNonNegInt(qty);
        }
        // generate an invoice if all quantities are valid
        const stringified = queryString.stringify(POST);
        if (hasvalidquantities && hasquantities) {
            response.redirect("./login.html?" + stringified); 
        }
        else { response.send('Enter a valid quantity!') }
    }
});

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}
}
// Lab 14 code; processes login form then goes to invoice
app.post("/process_login", function (request, response) {
    var login_error = [];
    console.log("Got a POST login request");
    POST = request.body;
    var stringified = queryString.stringify(POST);
    form_username = POST["username"].toLowerCase();
    console.log("Form username=" + form_username);
    if (typeof user_data[form_username] != 'undefined') {
      if (user_data[form_username].password == request.body.password) {
        request.query.username = form_username;
        console.log(user_data[request.query.username].name);
        request.query.name = user_data[request.query.username].name
        response.redirect('/invoice.html?' + stringified)
        return;
      }
      else {
        console.log(login_error);
        request.query.username = form_username;
        request.query.name = user_data[form_username].name;
        request.query.login_error = login_error.join(';');
      }
    } else {
      login_error.push = ('Invalid Username or Password');
      console.log(login_error);
      request.query.username = form_username;
      request.query.name = user_data[form_username].name;
      request.query.login_error = login_error.join(';');
    }
    response.redirect('./login_page.html?' + stringified);
  });
  // code to process registration
  app.post("/process_register", function (request, response) {
    let POST = request.body;
    console.log("Got register POST");
    var register_errors = [];
    var stringified = queryString.stringify(POST);
  
    // make sure username is between 4-10 characters and only consists of letters and numbers
    if ((/.{3,9}/.test(POST['username'])) && (/^[a-zA-Z0-9]*$/.test(POST['username']))) {
      console.log('username OK');
    } else {
      register_errors.push('Username must be a minimum of 4 characters, maximum of 10. Only letters and numbers allowed.');
    }
    // check that username is unique
    var register_username = POST['username'].toLowerCase();
    if (user_data[register_username] != 'undefined') {
      register_errors.push('Username taken, please choose another one');
    } else {
      console.log('Valid username');
    }
  
    // make sure password is more than 6 characters
    if (POST['password'].length < 6) {
      register_errors.push('Password length must be a minimum of 6 characters');
    } else {
      console.log('Valid password!');
    }
  
    // check if both passwords match
    if (POST['password'] == POST['confirmpassword']) {
      console.log('passwords match');
    } else {
      register_errors.push('Please check that passwords match');
    }
  
    // validate name
    if (/^[A-Za-z]+$/.test(POST['name']) || (POST['name'] != "undefined")) {
      console.log('full name OK');
    } else {
      register_errors.push('Letters only');
    }
    // validate email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(POST['email'])) {
      console.log('email OK');
    } else {
      register_errors.push('Invalid email');
    }
  
    // if everything's OK then register user
    if (register_errors.length == 0) { // no registration errors exist
      // add registered user data to file
      username = POST["username"];
      user_data[username] = {};
      user_data[username].name = username;
      user_data[username].password = POST['password'];
      user_data[username].email = POST['email'];
  
      data = JSON.stringify(user_data);
      fs.writeFileSync(filename, data, "utf-8");
  
      response.redirect('./invoice.html?' + stringified);
    } 
    if (register_errors.length == 0) {
      response.send("Sorry, try again");
    }
  });

  


app.use(express.static('./public'));
app.listen(8080, () => console.log('listening on port 8080'));

