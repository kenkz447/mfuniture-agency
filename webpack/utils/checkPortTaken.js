// @ts-check
const net = require('net')

/**
* @param {number} port
* @param {(isTaken: boolean) => void} callback
*/
function checkPortTaken(port, callback) {
    var success_ix = 0;

    const test_ipv4 = net.createServer()
        .once(
            'error',
            function (err) {
                callback(true)
            }
        )
        .once('listening', function () {
            test_ipv4
                .once(
                    'close',
                    function () {
                        success_ix++; if (success_ix == 2) {
                            callback(false)
                        }
                    })
                .close()
        })
        .listen(port, '0.0.0.0');

    const test_ipv6 = net
        .createServer()
        .once(
            'error',
            function (err) {
                callback(true);
            }
        )
        .once('listening', function () {
            test_ipv6
                .once(
                    'close',
                    function () {
                        success_ix++; if (success_ix == 2) {
                            callback(false);
                        }
                    }
                )
                .close()
        })
        .listen(port, '::');
}

module.exports = checkPortTaken;