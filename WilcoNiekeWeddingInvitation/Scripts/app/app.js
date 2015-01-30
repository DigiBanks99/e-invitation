'use strict';

function PageInfo(element) {
    this.emptyContentConst = "Nothing to show";
    this.content, this.template, this.message;

    this.template = element.data().content;
    if (!IsUndefined(this.template)) {
        // extend this as contentTypes increase
        if (!IsUndefined(this.template.picture)) {
            this.content = '<img src="' + this.template.picture + '" />';
        } else if (!IsUndefined(this.template.message)) {
            this.content = '<span><p>' + this.template.message + '<p></span>';
        } else {
            this.content = this.emptyContentConst;
        }
    }
};

function ExcuteJQuery() {
    $("#toInnerCover").bind("click", function () {
        var $this = $(this);
        var pageInfo = new PageInfo($this);

        $("#cover").flip({
            direction: "rl",
            content: pageInfo.content,
            onBefore: function () {
                $(".revert").show();
            }
        })
        return false;
    });

    $("#flipPad a:not(.revert)").bind("click", function () {
        var $this = $(this);
        var pageInfo = new PageInfo($this);

        $("#cover").flip({
            direction: $this.attr("rel"),
            color: $this.attr("rev"),
            content: pageInfo.content,
            onBefore: function () { $(".revert").show() }
        })
        return false;
    });

    $(".revert").bind("click", function () {
        var $this = $(this);
        var pageInfo = new PageInfo($this);

        $("#flipbox").revertFlip();
        return false;
    });
};

function IsUndefined(value) {
    if (typeof value === 'undefined')
        return true;
    return false;
};

function IsNullOrEmpty(value) {
    if (IsUndefined(value) || value === null || (!IsUndefined(value) &&  value.length == 0))
        return true;
    return false;
};