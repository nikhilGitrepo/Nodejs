/**
 * http://usejsdoc.org/
 */
var movies = require('./movies');

var nikMovie = movies();

nikMovie.favMovie = '2States';

console.log('Nikhil\'s fav movie: ' + nikMovie.favMovie);