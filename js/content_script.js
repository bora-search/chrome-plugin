function getUrlParameter() {

    chrome.storage.sync.get(['activated', 'do_redirect', 'search_engine_distrib_store'], function (data) {
        let doRedirect = data.do_redirect;
        let activated = data.activated;

        if (activated === true) {
            if (doRedirect === true) {
                let searchEngineDistrib = data.search_engine_distrib_store
                let searchEngineDomains = {};
                let totalWeight = 0;

                for (const [engine, weight] of Object.entries(searchEngineDistrib)) {
                    let domainStart = totalWeight;
                    let domainEnd = domainStart + weight;
                    searchEngineDomains[engine] = [domainStart, domainEnd];
                    totalWeight += weight;
                }

                console.log(searchEngineDomains);
                let rand = Math.random() * 100;
                let selectedEngine = getEngineFromRand(searchEngineDomains, rand);
                let url = window.location.search.substring(1), urlVariables = url.split('&'), parameterName, i;

                for (i = 0; i < urlVariables.length; i++) {
                    parameterName = urlVariables[i].split('=');
                    if (parameterName[0] === 'q') {
                        let searchURL = SEARCH_ENGINE_URLS[selectedEngine] + parameterName[1];
                        window.location = searchURL;
                    }
                }
                chrome.storage.sync.set({'do_redirect': false});
            } else {
                chrome.storage.sync.set({'do_redirect': true});
            }
        }
    });

};

getUrlParameter();
