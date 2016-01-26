// BROWSERIFY.JS - Entry point module to make require global 
module.exports = (function(window){
window.require = window.require || require; 
})(window);
