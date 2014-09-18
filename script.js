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
    }
    window.onhashchange = function () {
        changePage(parseInt(document.location.hash.slice(1)) || 1);
    }
    changePage(parseInt(document.location.hash.slice(1)) || 1);

// Keyboard Arrows
var keytimer = null;
function keyChangePage(direction) {
    var page = parseInt(document.location.hash.slice(1)) || 1;
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
arrows = document.querySelector('#arrows');
next = document.querySelector('#next');
previous = document.querySelector('#previous');
arrows.onmousedown = function(e) {
    if (keytimer !== null) {
        return;
    }
    var page = parseInt(document.location.hash.slice(1)) || 1;
    var direction;
    if (next) {
        if (page >= 139) {
            return;
        }
        direction = 1;
    } else if (previous) {
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
document.onmouseup = function(e) {
    if (keytimer !== null) {
        window.clearInterval(keytimer);
        keytimer = null;
    }
};

// on page 1, remove > arrow
if (page = 1) {
    document.getElementById("previous").style.display="none";
} else {
    document.getElementById("previous").style.display="block";
}


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
var scrubbing = false;
var nextPage = null;

function scrub() {
    if (nextPage) changePage(parseInt(nextPage.slice(1)));;
    if (scrubbing) window.requestAnimationFrame(scrub);
}
timeline = document.querySelector('#timeline');
timeline.onmouseover = function (event) {
    { event.preventDefault();
    scrubbing = true;
    // For performance, only update page when browser is ready
    window.requestAnimationFrame(scrub);
    }
    { if (!scrubbing) return;
    var x = event.clientX;
    var y = event.clientY;
    var elem = document.elementFromPoint(x, y);
    if (elem.tagName != 'A') return;
    nextPage = event.target.getAttribute('href');
   };
};      
document.onmouseout = function (event) {
    if (!scrubbing) return;
    if (nextPage) window.location = nextPage;
    scrubbing = false;
    nextPage = null;
};


// Timeline scrubbing — MOBIle
var scrubbing = false;
var nextPage = null;

function scrub() {
    if (nextPage) changePage(parseInt(nextPage.slice(1)));;
    if (scrubbing) window.requestAnimationFrame(scrub);
}
timeline = document.querySelector('#timeline');
timeline.touchmove = function (event) {
    { event.preventDefault();
    scrubbing = true;
    // For performance, only update page when browser is ready
    window.requestAnimationFrame(scrub);
    }
    { if (!scrubbing) return;
    var x = event.clientX;
    var y = event.clientY;
    var elem = document.elementFromPoint(x, y);
    if (elem.tagName != 'A') return;
    nextPage = event.target.getAttribute('href');
   };
};      
document.touchend = function (event) {
    if (!scrubbing) return;
    if (nextPage) window.location = nextPage;
    scrubbing = false;
    nextPage = null;
};
};














