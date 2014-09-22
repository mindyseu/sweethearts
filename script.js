// Disable Hover / Click state in Touch
if ('ontouchstart' in document) {
    document.documentElement.className = '';
}

// change page
window.onload = function () {
    function changePage(page) {
        document.body.className = 'p' + page;
        document.querySelector('#next a').href = '#' + (page + 1);
        document.querySelector('#previous a').href = '#' + (page - 1);
        Array.prototype.forEach.call(
            document.querySelectorAll('#timeline a.activePage'),
            function (elem) {
                elem.className = '';
            });
        document.querySelector('#timeline a:nth-child(' + page + ')').className = 'activePage';

        // on page 1, remove > arrow
        if (page == 1) {
            document.getElementById("previous").style.display="none";
        } else {
            document.getElementById("previous").style.display="block";
        }
        // on page 139, remove < arrow
        if (page == 139) {
            document.getElementById("next").style.display="none";
        } else {
            document.getElementById("next").style.display="block";
        }
    }
    window.onhashchange = function () {
        changePage(parseInt(document.location.hash.slice(1)) || 1);
    }
    changePage(parseInt(document.location.hash.slice(1)) || 1);

// Keyboard Arrows
var keytimer = null;
function keyChangePage(direction) {
    var page = parseInt(document.location.hash.slice(1)) || 1;
    console.log(page, direction);
    page += direction;
    window.location = '#' + page;
    if (page >= 139 || page <= 1) {
        window.clearInterval(keytimer);
        keytimer = null;
        return;
    }
    if (page == 94) {
        window.clearInterval(keytimer);
        var interval;
        if (direction == -1) {
            interval = 500;
        } else {
            interval = 200;
        } 
        keytimer = window.setInterval(keyChangePage.bind(null, direction), interval);
    }
}
document.onkeydown = function(e) {
    if (keytimer !== null) {
        return;
    }
    var page = parseInt(document.location.hash.slice(1)) || 1;
    var direction;
    if (e.keyCode == 37 || e.keyCode == 32) {
        // arrowLeft or space
        if (page >= 139) {
            return;
        }
        direction = 1;
    } else if (e.keyCode == 39) {
        // arrowRight
        if (page <= 1) {
            return;
        }
        direction = -1;
    } else {
        return;
    }
    page += direction;
    window.location = '#' + page;
    var interval;
    if (page < 94) {
        interval = 500;
    } else {
        interval = 200;
    }
    keytimer = window.setInterval(keyChangePage.bind(null, direction), interval);
};
document.onkeyup = function(e) {
    if (keytimer !== null) {
        window.clearInterval(keytimer);
        keytimer = null;
    }
};

// ARROWS
var next = document.querySelector('#next a');
var previous = document.querySelector('#previous a');

[next, previous].forEach(function (elem) {

    elem.onclick = function (event) {
        event.preventDefault();
    };

    elem.onmousedown = function(event) {
        console.log('onmousedown', event.target);
        if (keytimer !== null) {
            return;
        }
        var page = parseInt(document.location.hash.slice(1)) || 1;
        var direction;
        if (event.target === next) {
            if (page >= 139) {
                return;
            }
            direction = 1;
        } else if (event.target === previous) {
            if (page <= 1) {
                return;
            }
            direction = -1;
        } else {
            return;
        }
        page += direction;
        window.location = '#' + page;
        var interval;
        if (page < 94) {
            interval = 500;
        } else {
            interval = 200;
        }
        keytimer = window.setInterval(keyChangePage.bind(null, direction), interval);
    };

});


document.onmouseup = function(e) {
    if (keytimer !== null) {
        window.clearInterval(keytimer);
        keytimer = null;
    }
};

// Timeline scrubbing — CLICK AND DRAG
/*    var scrubbing = false;
var nextPage = null;

function scrub() {
    if (nextPage) changePage(parseInt(nextPage.slice(1)));;
    if (scrubbing) window.requestAnimationFrame(scrub);
}

timeline = document.querySelector('#timeline');
timeline.onmousedown = function (event) {
    event.preventDefault();
    scrubbing = true;
    // For performance, only update page when browser is ready
    window.requestAnimationFrame(scrub);
};
timeline.onmouseover = function (event) {
    // While scrubbing, update the nextPage to display
    if (!scrubbing) return;
    var x = event.clientX;
    var y = event.clientY;
    var elem = document.elementFromPoint(x, y);
    if (elem.tagName != 'A') return;
    nextPage = event.target.getAttribute('href');
};
document.onmouseup = function (event) {
    if (!scrubbing) return;
    if (nextPage) window.location = nextPage;
    scrubbing = false;
    nextPage = null;
};
};*/

// Timeline scrubbing — HOVER
var nextPage = null;

function scrub() {
    if (nextPage) changePage(parseInt(nextPage.slice(1)));
}
timeline = document.querySelector('#timeline');
timeline.onmouseover = function (event) {
    var x = event.clientX;
    var y = event.clientY;
    var elem = document.elementFromPoint(x, y);
    if (elem.tagName != 'A') return;
    nextPage = elem.getAttribute('href');
    // For performance, only update page when browser is ready
    window.requestAnimationFrame(scrub);
};
timeline.onmouseleave = function (event) {
    if (!nextPage) return;
    window.history && window.history.replaceState(null, null, nextPage);  
};


// Timeline scrubbing — MOBIle
function touchScrub(event) {
    event.preventDefault();
    event.stopPropagation();
    var touch = event.changedTouches[0];
    var x = touch.clientX;
    var y = touch.clientY;
    var elem = document.elementFromPoint(x, y);
    if (elem.tagName != 'A') return;
    nextPage = elem.getAttribute('href');
    // For performance, only update page when browser is ready
    window.requestAnimationFrame(scrub);
}

timeline.addEventListener('touchstart', touchScrub, false);
timeline.addEventListener('touchmove', touchScrub, false);
timeline.addEventListener('touchend', function (event) {
    touchScrub(event);
    if (!nextPage) return;
    window.history && window.history.replaceState(null, null, nextPage);  
}, false);

// MOBILE - SWIPE LEFT AND RIGHT

var startX, startY;

function swipe(right) {
    var page = parseInt(document.location.hash.slice(1)) || 1;
    var direction;
    if (right) {
        if (page >= 139) {
            return;
        }
        direction = 1;
    } else {
        if (page <= 1) {
            return;
        }
        direction = -1;
    }
    page += direction;
    window.location = '#' + page;
}

document.body.addEventListener('touchstart', function(e) {
  var touch = e.changedTouches[0];
  startX = touch.screenX;
  startY = touch.screenY;
  e.preventDefault();
}, false);

document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, false);

document.body.addEventListener('touchend', function(e) {
  var touch = e.changedTouches[0];
  var dx = touch.screenX - startX;
  var dy = touch.screenY - startY;
  if (Math.abs(dx) < 50) return;
  if (Math.abs(dy) > Math.abs(dx)) return;
  e.preventDefault();
  swipe(dx > 0);
}, false);

};














