/**
 *
 * sharurl.js
 *
 * Track the number of times your page has been shared on several social networks.
 * Version: 1.0.1
 *
 * Find the project on GitHub: 
 * https://github.com/jofpin/shurlJS
 *
 * ============================
 * Copyright, 2014 by Jose Pino
 * https://twitter.com/jofpin
 * ============================
 */
jQuery.getShurl = function(url, time) {
    var main = {
      credit: {
        name: "Shurl",
        version: "1.0.1",
        code: "https://github.com/jofpin/shurlJS",
        author: "Jose Pino",
        twitter: "@jofpin",
        email: "jofpin@gmail.com"
      },
      self: this,
      root: url,
      core: 'shurl',
      result: "result",
      error: "Not Found",
      relate: 0,
      callback: '&callback=?',
      network: {
        facebook: "facebook",
        twitter: "twitter",
        linkedin: "linkedin",
        bufferapp: "bufferapp",
        pinterest: "pinterest"
      }
  }; 

  // simplification > console.log
  var log = function(value) {
    console.log(value);
  }

  // Credits of shurl.js :)
  main.self.credits = function() {
    log("CREDITS:" + " " + main.credit.name + " " + main.credit.version);
    log("URL: " + main.credit.code);
    log("------------------------------");
    log("Coded by ( " + main.credit.author + ", " + main.credit.twitter + " | " + main.credit.email + ", 2014 )");
    log("------------------------------");
  }
  
  // configs and extraction of data from social networks
  main.self.networks = function() {

    // Facebook
    $.getJSON("https://api.facebook.com/method/links.getStats?urls=" + main.root + "&format=json", function(json) {
      
      var data = json[0].total_count;
      
      if (data > main.relate) {
        log(main.network.facebook + ":" + " " + data);
        return main.self.runner($(('[data-' + main.core + '="' + main.network.facebook + '"]')), data);
      } else {
        log("Data" + " " + main.network.facebook + ":" + " " + main.error);
      };
    });

    // Twitter
    $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + main.root + main.callback, function(json) {

      var data = json.count;

      if (data > main.relate) {
        log(main.network.twitter + ":" + " " + data);
        return main.self.runner($(('[data-' + main.core + '="' + main.network.twitter + '"]')), data);
      } else {
        log("Data" + " " + main.network.twitter + ":" + " " + main.error);
      };
    });

    // Linkedin
    $.getJSON("http://www.linkedin.com/countserv/count/share?url=" + main.root + main.callback, function(json) {

      var data = json.count;

      if (data > main.relate) {
        log(main.network.linkedin + ":" + " " + data);
        return main.self.runner($(('[data-' + main.core + '="' + main.network.linkedin + '"]')), data);
      } else {
        log("Data" + " " + main.network.linkedin + ":" + " " + main.error);
      };
    });

    // BufferApp
    $.getJSON("https://api.bufferapp.com/1/links/shares.json?url=" + main.root + main.callback, function(json) {

      var data = json.shares;

      if (data > main.relate) {
        log(main.network.bufferapp + ":" + " " + data);
        return main.self.runner($(('[data-' + main.core + '="' + main.network.bufferapp + '"]')), data);
      } else {
        log("Data" + " " + main.network.bufferapp + ":" + " " + main.error);
      };

    });

    // Pinterest
    $.getJSON("http://api.pinterest.com/v1/urls/count.json?url=" + main.root + main.callback, function(json) {

      var data = json.count;

      if (data > main.relate) {
        log(main.network.pinterest + ":" + " " + data);
        return main.self.runner($(('[data-' + main.core + '="'+ main.network.pinterest + '"]')), data);
      } else {
        log("Data" + " " + main.network.pinterest + ":" + " " + main.error);
      };

    });
 };

  // setings of results
  main.self.seting = function(pull) {
    return setTimeout(function() {
      var target = pull.attr(main.result) * 1; 
      var viewCount = target + Math.ceil((target - target) / 2);
      
      // preview result
      pull.attr(main.result, viewCount);
      pull.html(viewCount);
      if (viewCount < target) {
        return main.self.seting(pull);
      }
    }, time);
  };

  // runner other game > set count
  main.self.runner = function(pull, count) {
    if (count == null) {
      count = null;
    };
    pull.attr(main.result, count);
    return main.self.seting(pull);
  };

  // running data networks & credits
  main.self.networks();
  main.self.credits();
};

//$.getShurl("http://twitter.com", 100);
