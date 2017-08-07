var commentsWidget = new CommentsWidget();

function CommentsWidget() {
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
        commentsWidget.$comment = $('#comment');
        commentsWidget.$hotkey = $('#commentsWidgetForm .toggleSubmitHotKey .hotkey');

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
            commentsWidget.setSubmitHotkey(options.submitHotkey);
        }
    };

    /**
     * Apply events on DOM elements
     */
    this.applyEvents = function() {
        $("#commentsWidgetForm").on("submit", function (e) {
            e.preventDefault();
            var comment = jQuery.trim(commentsWidget.$comment.val());
            if (!comment) {
                commentsWidget.$comment.focus();
                return;
            }
            var commentHtml = $('<div class="comment-row">' +
                comment +
                '</div>');

            $('#commentsWidgetList').prepend(commentHtml);
            commentsWidget.$comment.val('');
            $('html,body').animate({scrollTop: $('#commentsWidgetList').offset().top - 70});
        });

        $('#commentsWidgetForm .toggleSubmitHotKey').on("click", function (e) {
            e.preventDefault();
            var hotkey = commentsWidget.getSubmitHotkey();
            nextHotkey = commentsWidget.getNextSubmitHotkey(hotkey);
            commentsWidget.setSubmitHotkey(nextHotkey);
        });

        $('#commentsWidgetForm textarea').on ("keydown", function (e) {
            if (e.keyCode != 13) {
                return;
            }

            switch (commentsWidget.getSubmitHotkey()) {
                case commentsWidget.HOTKEY_CTRL_ENTER:
                    if (e.ctrlKey) {
                        commentsWidget.submitComment();
                    }
                    break;

                case commentsWidget.HOTKEY_ENTER:
                    if (!e.ctrlKey && !e.shiftKey) {
                        commentsWidget.submitComment();
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
        if (hotkey == commentsWidget.HOTKEY_CTRL_ENTER) {
            return commentsWidget.HOTKEY_ENTER;
        }

        return commentsWidget.HOTKEY_CTRL_ENTER;
    };

    /**
     * Get allowed submit hotkeys names
     *
     * @returns {Array.<string>}
     */
    this.getAllowedSubmitHotkeys = function () {
        return [
            commentsWidget.HOTKEY_CTRL_ENTER,
            commentsWidget.HOTKEY_ENTER
        ];
    };

    /**
     * Get current submit hotkey
     *
     * @returns {string}
     */
    this.getSubmitHotkey = function () {
        var hotkey = commentsWidget.$hotkey.text();

        if (!jQuery.inArray(hotkey, commentsWidget.getAllowedSubmitHotkeys)) {
            hotkey = commentsWidget.defaultHotkey;
        }

        return hotkey;
    };

    /**
     * Set hotkey text to html element
     *
     * @param {string} hotkey
     */
    this.setSubmitHotkey = function (hotkey) {
        if (jQuery.inArray(hotkey, commentsWidget.getAllowedSubmitHotkeys()) === -1) {
            hotkey = commentsWidget.defaultHotkey;
        }

        commentsWidget.$hotkey.text(hotkey);
    };

    /**
     * Submit form with comment
     */
    this.submitComment = function () {
        $('#commentsWidgetForm').submit();
    };
};

