function playOnBeat(element, time, instrument) {
  if($(element).hasClass('selected')) {
    setTimeout(function() {
      if(instrument === "snare") {
        var origAudio1 = document.getElementById("snareSound");
        var newAudio = origAudio1.cloneNode();
      } else if(instrument === "bass") {
        var origAudio2 = document.getElementById("bassSound");
        var newAudio = origAudio2.cloneNode();
      } else if(instrument === "hihat") {
        var origAudio3 = document.getElementById("hihatSound");
        var newAudio = origAudio3.cloneNode();
      } else if(instrument === "bongo") {
        var origAudio4 = document.getElementById("bongoSound");
        var newAudio = origAudio4.cloneNode();
      } else if(instrument === "keys") {
        var origAudio5 = document.getElementById("keysSound");
        var newAudio = origAudio5.cloneNode();
      } 
      if (letItLoop === true) {
        newAudio.play();
      }
    }, time);
  }
}
function loop1() {
  $("#snare .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "snare");
  });
};
function loop2() {
  $("#bass .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bass");
  });
};
function loop3() {
  $("#hihat .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "hihat");
  });
};
function loop4() {
  $("#bongo .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "bongo");
  });
};
function loop5() {
  $("#keys .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, "keys");
  });
};
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
function barBounce() {
  if(letItLoop) {
    $(".bars div").each(function() {
      $(this).animate({
        height: (Math.floor(Math.random() * 650)) + "px",
        opacity: (Math.random() + .2)
      }, 350);
    });
    setTimeout(barBounce, 400);
  } else {
    $(".bars div").each(function() {
      $(this).animate({
        height: "0",
        opacity: 0
      }, 700);
    });
  }
}
function Beat() {
  this.beat = [];
  this.savedBeats = []
}
Beat.prototype.saveBeat = function (){
  var beatArray = [];
  $(".beatsAll .spot").each(function(){
    if($(this).hasClass("selected")){
      beatArray.push("selected");
    } else {
      beatArray.push("no");
    }
  });
  this.beat = beatArray;
}
Beat.prototype.savedArray = function (){
  this.savedBeats.push(this.beat);
}
let letItLoop = false;
$(document).ready(function() {
  var beats = new Beat();
  var saved = 0;
  $(".playButton").click(function() {
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = true;
    barBounce();
    loops();
    $(".record, .smallRecord").addClass("fa-spin");
  });
  $(".pauseButton").click(function() {
    $(".playButton").attr("disabled", "disabled");
    $(".playButton").toggle();
    $(".pauseButton").toggle();
    letItLoop = false;
    $(".spot").finish();
    setTimeout(function() {
      $(".playButton").removeAttr("disabled")
    }, 3200)
    $(".record, .smallRecord").removeClass("fa-spin");
  });
  $(".clearButton").click(function() {
    $(".beatsAll .spot").removeClass("selected snare bass hihat bongo keys");
  });
  $(".saveButton").click(function(){
    if(!$(".spot").hasClass("selected")){
      $(".modal").addClass("activateModal")
    } else {
      $(".modal").removeClass("activateModal")
      beats.saveBeat();
      beats.savedArray();
      $(".savedBeats").show();
      $("#listOfBeats").append("<li value='" + saved + "'>"+ "Beat " + (saved + 1) +" <img src=\"img/trash.png\" class=\"trash icon\"></li>");
      saved++;
    }
  });
  $("#listOfBeats").on('click', 'li', function(){
    var chosenBeat = beats.savedBeats[$(this).val()];
    $(this).children().toggle();
    $(".beatsAll .spot").removeClass("selected snare bass hihat bongo keys");
    $(".beatsAll .spot").each(function(i){
        if(chosenBeat[i] === "selected") {
        $(this).addClass("selected snare bass hihat bongo keys");
      }
    });
    $(".trash").click(function() {
      $(this).parent().remove();
    })
  });
  $(".spot").click(function() {
    $(this).toggleClass("selected snare bass hihat bongo keys");
  });
  $(".spot").mousedown(function(e) {
    e.preventDefault();
    if ($(this).hasClass("selected")) {
      $(".spot").mouseenter(function() {
        $(this).removeClass("selected snare bass hihat bongo keys");
      });
      $(".spot").mouseleave(function() {
        $(this).removeClass("selected snare bass hihat bongo keys");
      });
    } else if (!$(this).hasClass("selected")) {
      $(".spot").mouseenter(function() {
        $(this).addClass("selected snare bass hihat bongo keys");
      });
      $(".spot").mouseleave(function() {
        $(this).addClass("selected snare bass hihat bongo keys");
      });
    }
    $(document).mouseup(function() {
      $(".spot").off("mouseenter");
      $(".spot").off("mouseleave");
    });
  });
});