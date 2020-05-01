// Store percentage values when user makes changes
document.addEventListener('DOMContentLoaded', function () {

    Object.keys(SEARCH_ENGINE_URLS).forEach((engine) => {
        let input = document.getElementById(engine);

        $(`#${engine}`).keyup(function () {
            $(`.${engine}`).text($(`#${engine}`).val());
            updateTotalPercentage();
        });

        chrome.storage.sync.get('search_engine_distrib_store', function (data) {
            input.value = data.search_engine_distrib_store[engine];
        });

    });

    chrome.storage.sync.get('activated', function (data) {
        let activated = data.activated;
        if(activated === true) {
            document.getElementById("activated").checked = true;
        } else {
            document.getElementById("activated").checked = false;
        }
    });

    document.getElementById('bora').addEventListener('click', function () {

        let enginesPercentageDistrib = {};
        let totalPercentage = 0;
        Object.keys(SEARCH_ENGINE_URLS).forEach((engine) => {
            let input = document.getElementById(engine);
            enginePercentage = (parseInt(input.value) > 0 ? parseInt(input.value) : 0);
            totalPercentage += enginePercentage
            enginesPercentageDistrib[engine] = enginePercentage;
        });

        if (totalPercentage !== 100) {
            alert('Oopsie !\nTotal must be 100%... Please update your distribution. ' +
                'Current distribution : ' + totalPercentage + '%\nThanks...');
        } else {
            chrome.storage.sync.set({
                'search_engine_distrib_store': enginesPercentageDistrib
            });
            window.close();
        }
    });

    document.getElementById('activated').addEventListener('click', function () {
        $('#activated').change(function() {
            if ($(this).prop('checked')) {
                chrome.storage.sync.set({'activated': true});
                document.getElementById("activated").checked = true;
                chrome.browserAction.setIcon({path: 'img/bora16.png'});
            }
            else {
                chrome.storage.sync.set({'activated': false});
                document.getElementById("activated").checked = false;
                chrome.browserAction.setIcon({path: 'img/disabled16.png'});
            }
        });
    });

    document.getElementById('balance').addEventListener('click', function () {
        let balancedDistrib = computeBalancedDistribution(Object.keys(SEARCH_ENGINE_URLS));
        Object.keys(SEARCH_ENGINE_URLS).forEach((engine) => {
            document.getElementById(engine).value = balancedDistrib[engine];
        });
        updateTotalPercentage();
    });

    function updateTotalPercentage() {
        let totalPercentage = 0;
        Object.keys(SEARCH_ENGINE_URLS).forEach((engine) => {
            let input = document.getElementById(engine);
            totalPercentage += (parseInt(input.value) > 0 ? parseInt(input.value) : 0)
        });

        $('.percentage').text(totalPercentage);
    }

});
