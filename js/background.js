'use strict';
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        let searchEngines = Object.keys(SEARCH_ENGINE_URLS);
        let balancedSearchEngineDistrib = computeBalancedDistribution(searchEngines);
        console.log('Default ditribution :', balancedSearchEngineDistrib);
        chrome.storage.sync.set({
            'search_engine_distrib_store': balancedSearchEngineDistrib
        });

        chrome.storage.sync.set({'do_redirect': true});
        chrome.storage.sync.set({'activated': true});
    }
});
