(function() {
  
    'use strict';
      
    // find the desired selectors
    var UsaBtn = document.getElementById('usa');
    var info = document.getElementById('usa-info');
    
    // set up a request
    var request = new XMLHttpRequest();
    
    // keep track of the request
    request.onreadystatechange = function() {
      // check if the response data send back to us 
      if(request.readyState === 4) {
        // add a border
        info.style.border = '1px solid #000000';
        info.style.marginBottom = '10px';
        // uncomment the line below to see the request
        console.log(request);
        // check if the request is successful
        if(request.status === 200) {
          // update the HTML of the element
          var information = JSON.parse(request.responseText);
          var html = '<p>Name: ' + information.name + '</p><p>Calling code: ' + information.callingCodes[0];
          html += '</p><p>Capital: ' + information.capital + '</p><p>Population: ' + information.population;
          html += '</p><p>Currency: ' + information.currencies[0].code + '-' + information.currencies[0].name + '</p>';
          info.innerHTML = html;
        } else {
          // otherwise display an error message
          info.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        }
      }
    }
  
    // specify the type of request
    request.open('GET', 'https://restcountries.eu/rest/v2/alpha/usa');
  
    // register an event
    UsaBtn.addEventListener('click', function() {
      // hide the button
      this.style.display = 'none';
      // send the request
      request.send();
    });
    
  })();

  (function() {
  
    'use strict';
      
    // find the desired selectors
    var CanBtn = document.getElementById('can');
    var info = document.getElementById('can-info');
    
    // set up a request
    var request = new XMLHttpRequest();
    
    // keep track of the request
    request.onreadystatechange = function() {
      // check if the response data send back to us 
      if(request.readyState === 4) {
        // add a border
        info.style.border = '1px solid #000000';
        info.style.marginBottom = '10px';
        // uncomment the line below to see the request
        console.log(request);
        // check if the request is successful
        if(request.status === 200) {
            var information = JSON.parse(request.responseText);
            var html = '<p>Name: ' + information.name + '</p><p>Calling code: ' + information.callingCodes[0];
            html += '</p><p>Capital: ' + information.capital + '</p><p>Population: ' + information.population;
            html += '</p><p>Currency: ' + information.currencies[0].code + '-' + information.currencies[0].name + '</p>';
            info.innerHTML = html;        
        } else {
          // otherwise display an error message
          info.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        }
      }
    }
  
    // specify the type of request
    request.open('GET', 'https://restcountries.eu/rest/v2/alpha/can');
  
    // register an event
    CanBtn.addEventListener('click', function() {
      // hide the button
      this.style.display = 'none';
      // send the request
      request.send();
    });
    
  })();

  (function() {
  
    'use strict';
      
    // find the desired selectors
    var MexBtn = document.getElementById('mex');
    var info = document.getElementById('mex-info');
    
    // set up a request
    var request = new XMLHttpRequest();
    
    // keep track of the request
    request.onreadystatechange = function() {
      // check if the response data send back to us 
      if(request.readyState === 4) {
        // add a border
        info.style.border = '1px solid #000000';
        info.style.marginBottom = '10px';
        // uncomment the line below to see the request
        console.log(request);
        // check if the request is successful
        if(request.status === 200) {
            var information = JSON.parse(request.responseText);
            var html = '<p>Name: ' + information.name + '</p><p>Calling code: ' + information.callingCodes[0];
            html += '</p><p>Capital: ' + information.capital + '</p><p>Population: ' + information.population;
            html += '</p><p>Currency: ' + information.currencies[0].code + '-' + information.currencies[0].name + '</p>';
            info.innerHTML = html;        
        } else {
          // otherwise display an error message
          info.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
        }
      }
    }
  
    // specify the type of request
    request.open('GET', 'https://restcountries.eu/rest/v2/alpha/mex');
  
    // register an event
    MexBtn.addEventListener('click', function() {
      // hide the button
      this.style.display = 'none';
      // send the request
      request.send();
    });
    
  })();