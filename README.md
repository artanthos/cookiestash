# cookiestash
js private cookie class

Cookie Stash
=============

1. [Intro](#intro)
2. [Problem](#problem)
3. [Solution](#solution)

Cookie Stash is a simple cookie manager class, written in JavaScript.

I needed some security for a class' private properties in a bigger and more important class, so I've also used this simple solution for the cookie class.

## Intro

Most people use `this` inside an object and they leave their data unprotected, meaning that their properties are accessible.

So, let's take this code:

```javascript
function Cookie() {
  this.maxDuration = 30; // default no. of days after which a cookie is set to expire
}

CookieStash.prototype.set = function (name, value) // set cookie
{
  var date = new Date();
  
  date.setTime(date.getTime() + (this.maxDuration * 24 * 60 * 60 * 1000));
  
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}
```

## Problem

The `this.maxDuration` is pretty useless. As soon as you instantiate the `Cookie` class, you are able to alter its `maxDuration` property.


```javascript
var gimmeCookie = new Cookie();
gimmeCookie.maxDuration = 1000; // this cookie will now expire within 3 years' time
```

## Solution

```javascript
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

	CookieStash.prototype.set = function (name, value) // set cookie
	{
	  var date = this.getDate(),
		  maxDuration = this.getMaxDuration();

	  date.setTime(date.getTime() + (maxDuration * 24 * 60 * 60 * 1000));
	  var expires = "expires=" + date.toUTCString();
	  document.cookie = name + "=" + value + "; " + expires;
	}
	
	return CookieStash;
}());
```

We saw that `this.maxDuration` wasn't so "private" for each class instance. 
So, we've replaced the usage of `this.maxDuration` with the method `this.getMaxDuration()`, which contains an adequate private property, namely `$stash[this.sID].maxDuration`.
`maxDuration` is not longer a `this` property (namely public) and as such, you can't modify it outside its instantiation.
I've also made `date` as a private property, just for the fun of it.
Now, instead of calling `var date = new Date()` each time, you can summon the method `this.getDate()` instead.

Thanks and check out the source code.

Happy coding!
