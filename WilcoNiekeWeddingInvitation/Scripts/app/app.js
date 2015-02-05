var mapLoaded = false;

setTransform = function(e, v) {
    var s = e.style;
    s.webkitTransform = 
    s.MozTransform =
    s.msTransform =
    s.OTransform =
    s.transform = v;
};

(function() {
    var books = document.querySelectorAll('.book');

    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var pages = book.childNodes;
        for (var j = 0; j < pages.length; j++) {
            if (pages[j].tagName == "DIV") {
                setTransform(pages[j], 'translate3d(0px, 0px, '+(-j)+'px)');
            }
        }
    }
})();


var px, py, sx, sy, down, rot = 0, rotX = 0, rotY = 0, cancel;
var pages = document.querySelectorAll('#myBook > div > div');
var currentPage = 0;

var previousPage = function () {
    if (currentPage > 0) {
        currentPage--;
        setTransform(pages[currentPage], 'translate3d(0px,0px,' + (-currentPage) + 'px) rotateY(0deg)');
    }
};
var nextPage = function () {
    if (currentPage < pages.length) {
        setTransform(pages[currentPage], 'translate3d(0px,0px,' + currentPage + 'px) rotateY(-179deg)');
        currentPage++;
    }
};

var oakHouseLatlng = new google.maps.LatLng(-25.671085, 28.517962);
var oakHouseMapOptions = { zoom: 16, center: oakHouseLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
var oakHouseMap = new google.maps.Map(document.getElementById("mapOakHouse"), oakHouseMapOptions);
var oakHouseMarker = new google.maps.Marker({ position: oakHouseLatlng, map: oakHouseMap, title: "103 Oak Avenue" });

var chapelLatlng = new google.maps.LatLng(-25.673090, 28.520988);
var chapelMapOptions = { zoom: 16, center: chapelLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
var chapelMap = new google.maps.Map(document.getElementById("mapChapel"), chapelMapOptions);
var chapelMarker = new google.maps.Marker({ position: chapelLatlng, map: chapelMap, title: "Sand Stone Chapel" });