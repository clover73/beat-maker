function playOnBeat(element, time, instrument) {
  if($(element).hasClass('selected')) {
    setTimeout(function() {
      var origAudio = document.getElementById(instrument + "Sound");
      var newAudio = origAudio.cloneNode();
      if (letItLoop === true) {
        newAudio.play();
      }
    }, time);
  }
}

function loop(instrument) {
  $("#" + instrument +" .spot").each(function(i) {
    $(this).delay(100 * i).animate({
      opacity: .1,
    }, 100).animate({
      opacity: 1,
    }, 0);
    playOnBeat(this, 100 * i, instrument);
  });
};

function loops() {
  if(letItLoop === true) {
    loop("snare");
    loop("bass");
    loop("hihat");
    loop("bongo");
    loop("keys");
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

Beat.prototype.saveBeat = function () {
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

Beat.prototype.savedArray = function (val){
  this.savedBeats[val] = this.beat;
}

let letItLoop = false;

$(document).ready(function() {
  var beats = new Beat();

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

  $(".saveButton").click(function() {
    $(".modal").addClass("activateModal");
  });

  $(".saved").click(function() {
    var val = $(this).val();
    if($(this).hasClass("boxed")) {
      var chosenBeat = beats.savedBeats[$(this).val()];
      $(".beatsAll .spot").removeClass("selected snare bass hihat bongo keys");
      $(".beatsAll .spot").each(function(i){
          if(chosenBeat[i] === "selected") {
          $(this).addClass("selected snare bass hihat bongo keys");
        }
      });
    } else {
      if(!$(".spot").hasClass("selected")) {
        $(".saveButton").click();
      } else {
        beats.saveBeat();
        beats.savedArray(val);
        $(this).addClass("boxed");
      }
    }
    $(".modal").removeClass("activateModal")
  });

  $(".saved").on('contextmenu', function(e) {
    e.preventDefault();
    $(this).removeClass("boxed");
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