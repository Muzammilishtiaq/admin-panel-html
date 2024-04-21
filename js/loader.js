$(document).ready(function () {
    const loader = $('#loader');
    
         loader.addClass('loader-hidden');
     
         loader.on('transitionend', function () {
             $('body').removeClass('loader-hidden');
             $('#livestream-table').hide();
         });
});