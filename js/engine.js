const SEARCH_ENGINE_URLS = {
    'duckduckgo': 'https://www.duckduckgo.com?q=',
    'ecosia': 'https://www.ecosia.org/search?q=',
    'qwant': 'https://www.qwant.com/?q=',
    'bing': 'https://www.bing.com/search?q=',
    'google': 'https://www.google.com/search?q='
};

function computeBalancedDistribution(searchEngines) {
    let balancedDistribution = {};
    let intEqualShare = Math.floor(100 / searchEngines.length);
    let delta = 100 - searchEngines.length * intEqualShare;
    for (const engine in searchEngines) {
        let engineName = searchEngines[engine];
        if (delta !== 0 && parseInt(engine) === 0) {
            balancedDistribution[engineName] = intEqualShare + delta;
        } else {
            balancedDistribution[engineName] = intEqualShare;
        }
    }
    return balancedDistribution;
}

function getEngineFromRand(engineDomains, rand) {
    let selectedEngine = null;
    for (const [engine, domain] of Object.entries(engineDomains)) {
        let domainStart = domain[0];
        let domainEnd = domain[1];
        if ((domainEnd - domainStart) > 0 && rand >= domainStart  && rand < domainEnd) {
            selectedEngine = engine;
            break;
        }
    }
    return selectedEngine;
}

