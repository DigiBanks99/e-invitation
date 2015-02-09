function msieversion() {

    if (navigator.userAgent.indexOf('MSIE') != -1)
        var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
    else // if no "MSIE" string in userAgent
        var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

    if (detectIEregexp.test(navigator.userAgent)) { //if some form of IE
        var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
        return ieversion;

        if (ieversion >= 12)
            alert("You're using IE12 or above")
        else if (ieversion >= 11)
            alert("You're using IE11 or above")
        else if (ieversion >= 10)
            alert("You're using IE10 or above")
        else if (ieversion >= 9)
            alert("You're using IE9 or above")
        else if (ieversion >= 8)
            alert("You're using IE8 or above")
        else if (ieversion >= 7)
            alert("You're using IE7.x")
        else if (ieversion >= 6)
            alert("You're using IE6.x")
        else if (ieversion >= 5)
            alert("You're using IE5.x")
    }

    return false;
}

setTransform = function (e, v) {
    var s = e.style;
    s.webkitTransform = v;
    s.MozTransform = v;
    s.OTransform = v;
    s.transform = v;
};

(function () {
    var books = document.querySelectorAll('.book');

    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var pages = book.childNodes;
        for (var j = 0; j < pages.length; j++) {
            if (pages[j].tagName == "DIV") {
                if (msieversion()) {
                    pages[j].style.transformOrigin = '0% 50%';
                    pages[j].style.msTransform = 'perspective(1400px) rotateY(0deg)';
                    pages[j].style.transform = 'perspective(1400px) rotateY(0deg)';
                    pages[j].style.zIndex = 100 - j;
                } else {
                    setTransform(pages[j], 'translate3d(0px, 0px, ' + (-j) + 'px)');
                }
            }
        }
    }
})();

var pages = document.querySelectorAll('#myBook > div > div');
var currentPage = 0;

var previousPage = function () {
    if (currentPage > 0) {
        currentPage--;

        var frontItems = pages[currentPage].getElementsByClassName('front');
        if (frontItems != null && frontItems.length > 0) {
            var front = frontItems[0];
            front.className = 'book-pages front active';
        }

        var backItems = pages[currentPage].getElementsByClassName('back');
        if (backItems != null && backItems.length > 0) {
            var back = backItems[0];
            back.className = 'book-pages back inactive hide';
        }

        if (msieversion()) {
            pages[currentPage].style.backfaceVisibility = 'visible';
            pages[currentPage].style.msTransform = 'perspective(1400px) rotateY(0deg)';
            pages[currentPage].style.transform = 'perspective(1400px) rotateY(0deg)';
            pages[currentPage + 1].style.zIndex -= 10;
            pages[currentPage].style.zIndex += 10;
        } else {
            setTransform(pages[currentPage], 'translate3d(0px,0px,' + (-currentPage) + 'px) rotateY(0deg)');
        }
    }

    showPreviousButton();
    showNextButton();
};
var nextPage = function () {
    if (currentPage < pages.length) {
        if (msieversion()) {
            pages[currentPage].style.backfaceVisibility = 'visible';
            pages[currentPage].style.msTransform = 'perspective(1400px) rotateY(-180deg)';
            pages[currentPage].style.transform = 'perspective(1400px) rotateY(-180deg)';
            pages[currentPage + 1].style.zIndex += 10;
            pages[currentPage].style.zIndex -= 10;
        } else {
            setTransform(pages[currentPage], 'translate3d(0px,0px,' + currentPage + 'px) rotateY(-179deg)');
        }

        var frontItems = pages[currentPage].getElementsByClassName('front');
        if (frontItems != null && frontItems.length > 0) {
            var front = frontItems[0];
            front.className = 'book-pages front inactive hide';
        }

        var backItems = pages[currentPage].getElementsByClassName('back');
        if (backItems != null && backItems.length > 0) {
            var back = backItems[0];
            back.className = 'book-pages back active';
        }

        currentPage++;
    }

    showPreviousButton();
    showNextButton();
};

function showPreviousButton() {
    if (currentPage == 0) {
        $("#btnPrevious").addClass('hide');
    } else {
        $("#btnPrevious").removeClass('hide');
    }
};
showPreviousButton();

function showNextButton() {
    if (currentPage == pages.length - 1) {
        $("#btnNext").addClass('hide');
    } else {
        $("#btnNext").removeClass('hide');
    }
};
showNextButton();

function transitionEndEventName() {
    var i,
        el = document.createElement('div'),
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && typeof el.style[i] !== 'undefined') {
            return transitions[i];
        }
    }
}

var oakHouseLatlng = new google.maps.LatLng(-25.671085, 28.517962);
var oakHouseMapOptions = { zoom: 16, center: oakHouseLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
var oakHouseMap = new google.maps.Map(document.getElementById("mapOakHouse"), oakHouseMapOptions);
var oakHouseMarker = new google.maps.Marker({ position: oakHouseLatlng, map: oakHouseMap, title: "103 Oak Avenue" });

var chapelLatlng = new google.maps.LatLng(-25.673090, 28.520988);
var chapelMapOptions = { zoom: 16, center: chapelLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
var chapelMap = new google.maps.Map(document.getElementById("mapChapel"), chapelMapOptions);
var chapelMarker = new google.maps.Marker({ position: chapelLatlng, map: chapelMap, title: "Sand Stone Chapel" });