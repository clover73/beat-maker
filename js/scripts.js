// function to play sounds that gets called during animation loops, piggybacks off of animation function already iteration through the rows
function playOnBeat(element, time, instrument) {
  if($(element).hasClass('selected')) {
    setTimeout(function() {
      if(instrument === "snare") {
        var origAudio1 = document.getElementById("snareSound");
        var newAudio1 = origAudio1.cloneNode();
        if (letItLoop === true) {
          newAudio1.play();
        }
      } else if(instrument === "bass") {
        var origAudio2 = document.getElementById("bassSound");
        var newAudio2 = origAudio2.cloneNode();
        if (letItLoop === true) {
          newAudio2.play();
        }
      } else if(instrument === "hihat") {
        var origAudio3 = document.getElementById("hihatSound");
        var newAudio3 = origAudio3.cloneNode();
        if (letItLoop === true) {
          newAudio3.play();
        }
      } else if(instrument === "bongo") {
        var origAudio4 = document.getElementById("bongoSound");
        var newAudio4 = origAudio4.cloneNode();
        if (letItLoop === true) {
          newAudio4.play();
        }
      } else if(instrument === "tambourine") {
        var origAudio5 = document.getElementById("tambourineSound");
        var newAudio5 = origAudio5.cloneNode();
        if (letItLoop === true) {
          newAudio5.play();
        }
      }
// INSERT Point for NEW Instruments
    }, time);
  }
}

// loops that iterate through each row - ideally should be refactored into just one function that can be called on for each instrument.
function loop1() {
  // letItLoop was set as a global boolean so we could tell script to stop everything on pause clicks
  if (letItLoop === true) {
    // this is why what we're doing's probably really rough, since we could have a general function with a parameter for where "#snare .spot" is called so it'd be reuseable.
    $("#snare .spot").each(function(i) {
      // "each" method goes through each of the .spot items, variable i is declared to delay the animation between each because otherwise animations would start at the same time for all the .spots.
      $(this).delay(100 * i).animate({
        opacity: .1,
      }, 100).animate({
        opacity: 1,
      }, 0);
      // shoving arguments into playOnBeat function that plays sounds. We ended up making it its own function so it'd run concurrently with this animation function, using "100 * i" as its "time" parameter.
      playOnBeat(this, 100 * i, "snare");
    });
  }
}; // Loop1 Ending CURLY

function loop2() {
  $("#bass .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bass");
  });
}; // Loop2 Ending CURLY
function loop3() {
  $("#hihat .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "hihat");
  });
}; // Loop3 Ending CURLY
function loop4() {
  $("#bongo .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bongo");
  });
}; // Loop4 Ending CURLY

function loop5() {
  $("#tambourine .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "tambourine");
  });
}; // Loop2 Ending CURLY

// end of collection of ghetto loops

// MERRRRRR I DO NOT Understand what happens here
function loops() {
  if(letItLoop === true) {
    loop1();
    loop2();
    loop3();
    loop4();
    loop5();
    setTimeout(loops, 3200);
  }
}

let letItLoop = false;

function barBounce() {
  if(letItLoop) {
    $(".bars div").each(function() {
      $(this).animate({
        height: (Math.floor(Math.random() * 650)) + "px",
        opacity: (Math.random() + .2)
      }, 300);

    });
    setTimeout(barBounce, 300);
  } else {
    $(".bars div").each(function() {
      $(this).animate({
        height: "0",
      }, 300);
    });
  }
}
// MERRRRRR I DO NOT Understand what happens here


$(document).ready(function() {
  $(".playButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = true;
    barBounce();
    loops();
    $(".record, .wan").addClass("fa-spin");
  });
  $(".pauseButton").click(function() {
    $(".playButton").attr("disabled", "disabled");
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = false;
    loops();
    $(".spot").finish();
    setTimeout(function() {
      $(".playButton").removeAttr("disabled")
    }, 3200)
    $(".record, .wan").removeClass("fa-spin");
  });
    // SNARE Click Function BEGINNING
  $("#snare .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected snare");
    } else {
      $(this).addClass("selected snare");
    }
  });
  // SNARE Click Function Ending
  // BASS Click Function BEGINNING
  $("#bass .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected bass");
    } else {
      $(this).addClass("selected bass");
    }
  });   // BASS Click Function Ending
  // HiHat Click Function BEGINNING
  $("#hihat .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected hihat");
    } else {
      $(this).addClass("selected hihat");
    }
  });   // HiHat Click Function Ending
  // Bongo Click Function BEGINNING
  $("#bongo .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected bongo");
    } else {
      $(this).addClass("selected bongo");
    }
  });   // Bongo Click Function Ending
  // tambourine Click Function BEGINNING
  $("#tambourine .spot").click(function() {
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected tambourine");
    } else {
      $(this).addClass("selected tambourine");
    }
  });   // tambourine Click Function Ending

  $(".spot").hover(function() {
    $(this).parent().animate({
      "opacity": ".9"
    }, 0);
  });
  $(".spot").mouseout(function() {
    $(this).parent().animate({
      "opacity": "1"

    }, 0);
  });

});
