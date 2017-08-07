var commentsWidget = new CommentsWidget();

function CommentsWidget() {
    var _this = this;

    this.HOTKEY_ENTER = 'enter';
    this.HOTKEY_CTRL_ENTER = 'ctrl+enter';
    this.$comment = void 0;
    this.$hotkey = void 0;
    this.defaultHotkey = this.HOTKEY_CTRL_ENTER;

    /**
     * Init and enable comments widget
     * Use options to set default params
     *
     * @param options
     */
    this.init = function (options) {
        _this.$comment = $('#comment');
        _this.$hotkey = $('#commentsWidgetForm .toggleSubmitHotKey .hotkey');

        this.applyOptions(options);
        this.applyEvents();
    };

    /**
     * Set default widget options
     *
     * @param options
     */
    this.applyOptions = function(options) {
        if (options.submitHotkey) {
            _this.setSubmitHotkey(options.submitHotkey);
        }
    };

    /**
     * Apply events on DOM elements
     */
    this.applyEvents = function() {
        $("#commentsWidgetForm").on("submit", function (e) {
            e.preventDefault();
            var comment = jQuery.trim(_this.$comment.val());
            if (!comment) {
                _this.$comment.focus();
                return;
            }
            var commentHtml = $('<div class="comment-row">' +
                comment +
                '</div>');

            $('#commentsWidgetList').prepend(commentHtml);
            _this.$comment.val('');
            $('html,body').animate({scrollTop: $('#commentsWidgetList').offset().top - 70});
        });

        $('#commentsWidgetForm .toggleSubmitHotKey').on("click", function (e) {
            e.preventDefault();
            var hotkey = _this.getSubmitHotkey();
            nextHotkey = _this.getNextSubmitHotkey(hotkey);
            _this.setSubmitHotkey(nextHotkey);
        });

        $('#commentsWidgetForm textarea').on ("keydown", function (e) {
            if (e.keyCode != 13) {
                return;
            }

            switch (_this.getSubmitHotkey()) {
                case _this.HOTKEY_CTRL_ENTER:
                    if (e.ctrlKey) {
                        _this.submitComment();
                    }
                    break;

                case _this.HOTKEY_ENTER:
                    if (!e.ctrlKey && !e.shiftKey) {
                        _this.submitComment();
                    }
                    break;
            }
        });
    };

    /**
     * Get next available submit hotkey
     *
     * @param {string} hotkey
     * @returns {string}
     */
    this.getNextSubmitHotkey = function (hotkey) {
        if (hotkey == _this.HOTKEY_CTRL_ENTER) {
            return _this.HOTKEY_ENTER;
        }

        return _this.HOTKEY_CTRL_ENTER;
    };

    /**
     * Get allowed submit hotkeys names
     *
     * @returns {Array.<string>}
     */
    this.getAllowedSubmitHotkeys = function () {
        return [
            _this.HOTKEY_CTRL_ENTER,
            _this.HOTKEY_ENTER
        ];
    };

    /**
     * Get current submit hotkey
     *
     * @returns {string}
     */
    this.getSubmitHotkey = function () {
        var hotkey = _this.$hotkey.text();

        if (jQuery.inArray(hotkey, _this.getAllowedSubmitHotkeys()) === -1) {
            hotkey = _this.defaultHotkey;
        }

        return hotkey;
    };

    /**
     * Set hotkey text to html element
     *
     * @param {string} hotkey
     */
    this.setSubmitHotkey = function (hotkey) {
        if (jQuery.inArray(hotkey, _this.getAllowedSubmitHotkeys()) === -1) {
            hotkey = _this.defaultHotkey;
        }

        _this.$hotkey.text(hotkey);
    };

    /**
     * Submit form with comment
     */
    this.submitComment = function () {
        $('#commentsWidgetForm').submit();
    };
};

