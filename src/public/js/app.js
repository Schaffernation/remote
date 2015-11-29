'use strict';

!function () {
    $(function main() {
        $('.js-button').on('click', _.throttle(onButtonClick, 100));
    });

    function onButtonClick(e) {
        var path = $(e.currentTarget).data('path') || '#';
        console.log(path);

        $.post('/api' + path, {}, responseToSuccess).fail(responseToFailure);
    }

    function responseToSuccess(res) {
        console.log(res);
    }
    function responseToFailure(err) {
      console.log(err)
    }
}()
