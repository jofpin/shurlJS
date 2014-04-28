/**
 *
 * sharurl.js
 *
 * Track the number of times your page has been shared on several social networks.
 * Version: 1.2.1
 *
 * Find the project on GitHub: 
 * https://github.com/mrjopino/sharurl.js
 *
 * ============================
 * Copyright, 2014 by Jose Pino
 * https://twitter.com/mrjopino
 * ============================
 */
 
$(document).ready(function () {
  $prefix = 's';
  $fb_s   = $('[data-' + $prefix + '-fb]'); 
  $tw_s   = $('[data-' + $prefix + '-tw]');
  $li_s   = $('[data-' + $prefix + '-li]');
  $ba_s   = $('[data-' + $prefix + '-ba]');
  _callback_sharurl = '&callback=?';

  var sharurl_id, conURL;

  $.getJSON("https://api.facebook.com/method/fql.query?query=select%20total_count%20from%20link_stat%20where%20url='" + _sharurl + "'&format=json", function(json) {
    return sharurl_id($($fb_s), json[0].total_count);
 });

  $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + _sharurl + _callback_sharurl, function(json) {
    return sharurl_id($($tw_s), json.count);
 });

  $.getJSON("http://www.linkedin.com/countserv/count/share?url=" + _sharurl + _callback_sharurl, function(json) {
    return sharurl_id($($li_s), json.count);
 });
  
  $.getJSON("https://api.bufferapp.com/1/links/shares.json?url=" + _sharurl + _callback_sharurl, function(json) {
    return sharurl_id($($ba_s), json.shares);
 });
  
console.log('sharurl : ' + _sharurl);

  conURL = function($_url_conURL) {
    return setTimeout(function() {
      var tl_shar, shar_enlace, target;
      tl_shar = $_url_conURL.attr("data-") * 1;
      target = $_url_conURL.attr("data-s-") * 1;
      shar_enlace = tl_shar + Math.ceil((target - tl_shar) / 1); //Timeline
      $_url_conURL.attr("data-", shar_enlace);
      $_url_conURL.html(shar_enlace);
      if (shar_enlace < target) {
        return conURL($_url_conURL);
      }
    }, 100);
  };

  sharurl_id = function($_url_conURL, conteo_sharurl) {
    if (conteo_sharurl == null) {
      conteo_sharurl = null;
    }
    $_url_conURL.attr("data-s-", conteo_sharurl);
    $_url_conURL.attr("data-", 0);
    return conURL($_url_conURL);
  };

});
