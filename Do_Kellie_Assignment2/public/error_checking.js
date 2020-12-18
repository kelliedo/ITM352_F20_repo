
function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}
function checkQuantityTextbox(theTextbox) { // check the text box
    errors = isNonNegInt(theTextbox.value, true);
    if (errors.length == 0) {
        errors = ['You want:']
    } // if no errors display 'You want:'
    if (theTextbox.value.trim() == '') {
        errors = ['Quantity']
    } // if no errors display 'Quantity'
    document.getElementById(theTextbox.name + '_label').innerHTML = errors.join(", ");
}
function addToCart(i) { // display a number to show how many items are in the users cart
    var inCart = products_display_orderpage['quantity${i}'].value;
    if (isNonNegInt(inCart) = true) {
        sessionStorage['products${i}'] = inCart;
        console.log(inCart)
    }
}
window.onload = function () {
    let params = (new URL(document.location)).searchParams; // get the query string
    if (params.has('purchase_submit_button')) {
        has_errors = false; // assume no errors
        total_qty = 0;
        for (i = 0; i < products.length; i++) {
            if (params.has(`quantity${i}`)) {
                a_qty = params.get(`quantity${i}`);
                // make textboxes sticky
                product_form[`quantity${i}`].value = a_qty;
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // make errors true
                    checkQuantityTextbox(product_form[`quantity${i}`]); // show where the error is
                }
            }
        }
        // Display an error message for invalid quantites
        if (has_errors == true) {
            alert("Please enter only valid quantities! Cannot add to cart!");
        } else if (total_qty == 0) {
            alert("Please enter only valid quantities! Cannot add to cart!");
        }

    }
}
function saveProduct(i) { // save the product if there are no errors
    var productQuantity = quantity_form[`quantity_textbox${i}`].value;
    if (isNonNegInt(productQuantity) == true) { 
        sessionStorage[`${product}${i}`] = productQuantity; 
        alert('Added to cart')
    } else {
        alert('Could not add product to cart! You entered invalid data!'); //tells them it is invalid 
    };
    window.location.reload();
};
var cart = sessionStorage.length; 
if (cart > 0) {
    console.log(
        cart
    )
};

