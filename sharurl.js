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
  $core_s = 'sharurl';
  $fb_s   = $('[data-' + $core_s + '="facebook"]'); 
  $tw_s   = $('[data-' + $core_s + '="twitter"]');
  $li_s   = $('[data-' + $core_s + '="linkedin"]');
  $ba_s   = $('[data-' + $core_s + '="bufferapp"]');
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

  conURL = function($boom_s) {
    return setTimeout(function() {
      var tl_shar, shar_link, target;
      tl_shar = $boom_s.attr("current") * 1;
      target = $boom_s.attr("result") * 1;
      shar_link = tl_shar + Math.ceil((target - tl_shar) / 1); //Timeline
      $boom_s.attr("current", shar_link);
      $boom_s.html(shar_link);
      if (shar_link < target) {
        return conURL($boom_s);
      }
    }, 100);
  };

  sharurl_id = function($boom_s, conteo_sharurl) {
    if (conteo_sharurl == null) {
      conteo_sharurl = null;
    }
    $boom_s.attr("result", conteo_sharurl);
    $boom_s.attr("current", 0);
    return conURL($boom_s);
  };

});
