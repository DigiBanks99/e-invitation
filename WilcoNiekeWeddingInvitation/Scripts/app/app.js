'use strict';

var mapLoaded = false;

function PageInfo(element, success) {
    this.emptyContentConst = "Nothing to show";
    this.content, this.template, this.message;

    this.template = element.data().content;
    if (!isUndefined(this.template)) {
        // extend this as contentTypes increase
        if (!isUndefined(this.template.picture)) {
            this.content = '<img src="' + this.template.picture + '" />';
        } else if (!isUndefined(this.template.message)) {
            this.content = getMessage(this.template.message, function (value) {
                success(value);
                return value;
            });
        } else if (!isUndefined(this.template.map)) {
            this.content = '<div>Map to Oak House</div>';
        } else {
            this.content = this.emptyContentConst;
        }
    }
};

function initCover() {
    var $this = $("#toCover");
    var pageInfo = new PageInfo($this);

    $("#space").removeClass('hide');

    $("#coverCard").flip({
        direction: "bt",
        content: pageInfo.content,
        onBefore: function () {
            $(".revert").show();
        }
    });

    getGuestHouses();

    $("#toMap").hide();
    $("#toMessage").hide();
    $("#map").addClass('hide');
    $("#toCover").hide();
    $("#toInnerCover").show();
    $("#pageCover").removeClass('hide');
    $("#pageMessage").addClass('hide');
    $("#pageGuestHouses").addClass('hide');
};

function excuteJQuery() {
    $("#toInnerCover").bind("click", function () {
        var $this = $(this);
        var pageInfo = new PageInfo($this);

        $("#toMap").show();
        $("#map").addClass('hide');
        $("#toMessage").hide();
        $("#toCover").show();
        $("#toInnerCover").hide();
        $("#pageCover").removeClass('hide');
        $("#pageMessage").removeClass('hide');
        $("#pageGuestHouses").addClass('hide');
        $("#space").addClass('hide');

        $("#coverCard").flip({
            direction: "rl",
            content: pageInfo.content,
            onBefore: function () {
                $(".revert").show();
            }
        })

        var pageInfoContent = 'Not set';
        var messagePageInfo = new PageInfo($("#toMessage"), function (response) {
            pageInfoContent = response;

            $("#messageCard").flip({
                direction: "rl",
                content: pageInfoContent
            });
        });
        return false;
    });

    $("#toCover").bind("click", function () {
        var $this = $(this);
        var pageInfo = new PageInfo($this);

        $("#space").removeClass('hide');

        $("#coverCard").flip({
            direction: "lr",
            content: pageInfo.content,
            onBefore: function () {
                $(".revert").show();
            }
        });

        $("#toMap").hide();
        $("#map").addClass('hide');
        $("#toCover").hide();
        $("#toInnerCover").show();
        $("#pageCover").removeClass('hide');
        $("#pageMessage").addClass('hide');
        $("#pageGuestHouses").addClass('hide');
        return false;
    });

    $("#toMap").bind("click", function () {
        var $this = $(this);
        var mapPageInfo = new PageInfo($this);

        $("#map").addClass('hide');
        $("#toMap").hide();
        $("#toInnerCover").hide();
        $("#toCover").hide();
        $("#toMessage").show();
        $("#pageCover").addClass('hide');
        $("#pageMessage").removeClass('hide');
        $("#pageGuestHouses").removeClass('hide');

        $("#messageCard").flip({
            direction: "lr",
            content: mapPageInfo.content,
            onBefore: function () {
                $(".revert").show();
            },
            onEnd: function (element) {
                loadMapScript(function () {
                    $("#map").removeClass('hide');
                })
            }
        });
        return false;
    });

    $("#toMessage").bind("click", function () {
        var $this = $(this);

        var pageInfoContent = 'Not set';
        var messagePageInfo = new PageInfo($this, function (response) {
            pageInfoContent = response;

            $("#messageCard").flip({
                direction: "rl",
                content: pageInfoContent
            });
        });

        $("#toMap").show();
        $("#map").addClass('hide');
        $("#toInnerCover").hide();
        $("#toCover").show();
        $("#toMessage").hide();
        $("#pageCover").removeClass('hide');
        $("#pageMessage").removeClass('hide');
        $("#pageGuestHouses").addClass('hide');
        return false;
    })
};

function initializeMap() {
    var mapProp = {
        center: new google.maps.LatLng(-25.670848, 28.517866),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var element = document.getElementById("map");
    if (!isNullOrEmpty(element))
        var map = new google.maps.Map(element, mapProp);
};

function getMessage(key, callBack, callBackObj) {
    var message = '';
    switch (key) {
        case "welcomeMessage":
            $.getJSON("http://localhost:1468/Content/json/message.json", function (data) {
                var boodskap = data.message;
                message = '<div class="welcome-message">' +
                                 '<p><span>' + boodskap.title + '</span></p>' +
                                 '<p><span>' + boodskap.main + '</span></p>' +
                                 '<p><span>' + boodskap.sub + '</span></p>' +
                                 '<p><span>' + boodskap.postsub + '</span></p>' +
                                 '<p><span>' + boodskap.rsvp + '</span><br />';
                for (var i = 0; i < boodskap.contacts.length; i++) {
                    message += '<span>' + boodskap.contacts[i].person + '</span><br />';
                }
                message +=       '</p>' +
                                 '<p><span>' + boodskap.gift + '</span>' +
                                 '<i class="fa fa-envelope-o" aria-hidden="true"></i></p>' + // TODO: add envelop
                                 '<p><span>' + boodskap.footnote + '</span></p>' +
                             '</div>';

                callBack(message);
                return message;
            });
            break;
        default:
            message = 'Nothing to show';
            break;
    }
    return message;
};

function getGuestHouses() {
    var $this = $("#guestHousesCard");
    $.getJSON("http://localhost:1468/Content/json/guesthouses.json", function (data) {
        if (isNullOrEmpty(data))
            return;

        var content = '<ul class="list-group">';
        for (var i = 0; i < data.length; i++) {
            var guesthouse = data[i];
            content += '<li class="list-group-item guesthouse">';
            content += '<p>';
            content += '<span>' + guesthouse.name + '</span><br />';
            content += '<span>' + guesthouse.address + '</span><br />';
            content += '<span>' + guesthouse.tel + '</span><br />';
            if (guesthouse.coordinates != null) {
                content += '<span>' + guesthouse.coordinates + '</span><br />';
            }
            content += '</p>';
            content += '</li>';
        }
        content += '</ul>';
        $this.append(content);
        $this.html()
    })
    return;
};

function loadMapScript(callback) {
    if (mapLoaded) {
        callback();
        return;
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&signed_in=true&callback=initializeMap';
    document.body.appendChild(script);
    mapLoaded = true;

    if (typeof callback === 'function') {
        callback(script);
    }

    return { then: callback };
};

function isUndefined(value) {
    if (typeof value === 'undefined')
        return true;
    return false;
};

function isNullOrEmpty(value) {
    if (isUndefined(value) || value === null || (!isUndefined(value) && value.length == 0))
        return true;
    return false;
};