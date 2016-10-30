var CookieStash = (function() {

  var $stash = {}; // make a private data stash
  var stashID = 0; // ID to reference the private stash instance

  function CookieStash() {
	this.sID = stashID++;
    $stash[this.sID] = {}; // make an object to manage each instance

    // use a private stash, instead of 'this'
    $stash[this.sID].maxDuration = 30,
    $stash[this.sID].date = new Date();
  }

  CookieStash.prototype.getMaxDuration = function() {
    return $stash[this.sID].maxDuration;
  }

  CookieStash.prototype.getDate = function() {
	return $stash[this.sID].date;
  }

  CookieStash.prototype.returnCookieFormat = function (type, name)
  {
      var allCookies = document.cookie.split(';'); // make an array with all the available cookies

      for (var ii = 0; ii < allCookies.length; ii++) //search through all cookies
      {
          var 	needed 	= allCookies[ii], // get the current iteration
				needed 	= needed.split('='), // create an array of key with value
				key 	= needed[0].trim(), // get the key
				value 	= needed[1]; // get the value

          if (key == name)
          {
              if (type == 'get')
                  return value; // return the cookie value

              else if (type == 'isset')
              {
                  return true;
              }

          }
      }

      return false;
  }

  CookieStash.prototype.get = function (name) // get cookie
  {
      return this.returnCookieFormat('get', name);
  }

  CookieStash.prototype.isset = function (name) // is cookie set?
  {
      return this.returnCookieFormat('isset', name);
  }

  CookieStash.prototype.set = function (name, value) // set cookie
  {
      var date = this.getDate(),
          duration = this.getMaxDuration();

      date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
      var expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
  }

  CookieStash.prototype.setWithExpiry = function (name, value, days) // set cookie with a defined number of days
  {
      var date = this.getDate();
		
		
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
  }

  CookieStash.prototype.erase = function (name) // delete cookie
  {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }

  return CookieStash;
}());

var cookieStash = new CookieStash();
cookieStash.set('isFirstFisit', 1) // set cookie with just the value (will self-destruct in the defaulted no. of days - see getMaxDuration method)
console.log(cookieStash.get('isFirstFisit')) // it it's not set, it'll return false; otherwise, returns the value
// cookieStash.get('isFirstFisit') // it it's not set, it'll return false; otherwise, returns the value
// cookieStash.isset('isFirstFisit') // returns true / false
// cookieStash.setWithExpiry('isFirstFisit', 1, 30) // set cookie with value and expiry date
// cookieStash.set('isFirstFisit', 1) // set cookie with just the value (will self-destruct in the defaulted no. of days - see getMaxDuration method)
// cookieStash.erase('isFirstFisit') // delete cookie