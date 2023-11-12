// jQuery Cheatsheet

// SELECTING ELEMENTS
const $elementById = $('#myElementId');
const $elementByClass = $('.myClass');
const $elementByTagName = $('div');
const $elementByAttribute = $('[data-attribute="value"]');
const $elementByMultipleSelectors = $('#myId, .myClass');

// EVENT HANDLING
$elementById.on('click', function() {
  // Click event handler
});

$elementById.click(function() {
  // Click event handler (shorter syntax)
});

$elementById.off('click'); // Unbind event handler

// DOM MANIPULATION
$elementById.text('New text'); // Set text
$elementById.html('<strong>New HTML</strong>'); // Set HTML
$elementById.val('New value'); // Set value (for form elements)
$elementById.attr('data-attribute', 'new-value'); // Set attribute
$elementById.css('property', 'value'); // Set CSS property

$elementById.addClass('new-class'); // Add class
$elementById.removeClass('old-class'); // Remove class
$elementById.toggleClass('toggle-class'); // Toggle class

$elementById.append('<p>Appended content</p>'); // Append content
$elementById.prepend('<p>Prepended content</p>'); // Prepend content

$elementById.after('<div>Inserted after</div>'); // Insert after
$elementById.before('<div>Inserted before</div>'); // Insert before

$elementById.remove(); // Remove element
$elementById.empty(); // Remove element content

// TRAVERSING
$elementById.parent(); // Get parent element
$elementById.children(); // Get child elements
$elementById.siblings(); // Get sibling elements
$elementById.next(); // Get next sibling
$elementById.prev(); // Get previous sibling

// AJAX REQUESTS
$.ajax({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: function(data) {
    // Handle success
  },
  error: function(error) {
    // Handle error
  }
});

// ANIMATION
$elementById.fadeIn(1000); // Fade in
$elementById.fadeOut(1000); // Fade out
$elementById.slideDown(1000); // Slide down
$elementById.slideUp(1000); // Slide up
$elementById.animate({ opacity: 0.5, left: '50px' }, 1000); // Custom animation

// EFFECTS
$elementById.hide(); // Hide element
$elementById.show(); // Show element
$elementById.toggle(); // Toggle element visibility

// UTILITIES

// Function to iterate over an array and execute a callback for each item
function each(array, callback) {
    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      callback(index, value);
    }
  }
  
  // Function to create a new array by applying a callback to each item in the original array
  function map(array, callback) {
    const mappedArray = [];
    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      mappedArray.push(callback(value, index));
    }
    return mappedArray;
  }
  
  // Function to filter an array based on a condition specified in a callback function
  function grep(array, callback) {
    const filteredArray = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (callback(element, index)) {
        filteredArray.push(element);
      }
    }
    return filteredArray;
  }
  
  // Function to check if a value is in an array
  function inArray(value, array) {
    return array.indexOf(value) !== -1;
  }
  
  // DOCUMENT READY
  
  // Function to execute a callback when the DOM is ready
  function documentReady(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }
  
  // SHORTHAND FOR DOCUMENT READY
  
  // Function to provide a shorthand for documentReady
  function ready(callback) {
    documentReady(callback);
  }
  
  // Example Usage
  
  // Using the 'each' function to iterate over an array
  each([1, 2, 3], (index, value) => {
    console.log(`Index: ${index}, Value: ${value}`);
  });
  
  // Using the 'map' function to create a new array based on the original array
  const mapped = map([1, 2, 3], value => value * 2);
  console.log(mapped);
  
  // Using the 'grep' function to filter elements from an array
  const filtered = grep([1, 2, 3, 4, 5], element => element % 2 === 0);
  console.log(filtered);
  
  // Using the 'inArray' function to check if a value is in an array
  console.log(inArray(2, [1, 2, 3])); // true
  console.log(inArray(4, [1, 2, 3])); // false
  
  // Using the 'ready' function to execute code when the DOM is ready
  ready(() => {
    console.log('Document is ready.');
  });
  