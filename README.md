# Lunch Aggregator - server

Provides api for [la_client](https://github.com/kozubikmichal/la_server) with daily menu information for restaurants around CTPark Brno Holandská

List of provided restaurant menus:

* [IQ Holandská](http://iqrestaurant.cz/brno/menu.html)
* [IQ Holandská (Týdenní nabídka)](http://iqrestaurant.cz/brno/menu.html)
* [MyFood Holandská](https://www.sklizeno.cz/o-nas/brno-holandska/)
* [Tusto Titanium](http://titanium.tusto.cz/tydenni-menu/)
* [Kometa Pub Arena](http://arena.kometapub.cz/tydenni-menu.php)
* [Rebio Holandská](http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx)
* [Makalu](http://www.nepalska-restaurace-makalu.cz/index.php)
* [U Hovězího pupku](http://www.uhovezihopupku.cz/menu/)

## API Routes

* `/api/menu`
  * list of all menus for today
* `/api/menu/:id`
  * menu for restaurant with given **id**
* `/api/restaurant`
  * list of all restaurants
* `/api/clearCache`
  * cache cleanup (by default request are cached for 30 minutes)

## Technologies used

* [nodejs](https://nodejs.org/en/)
* [Expressjs](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [typescript-ioc](https://www.npmjs.com/package/typescript-ioc)
* [mocha](https://mochajs.org/)