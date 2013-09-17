function check(tab_id, data, tab){
  if (tab.url.indexOf('wikipedia.org') > -1){
    chrome.pageAction.show(tab_id);
  } else {
    chrome.pageAction.hide(tab_id);
  }
}

chrome.tabs.onUpdated.addListener(check);

var info = [];

var onbrowse = function(e){
  console.log('l14');
  console.log(e);
  var clos;
  chrome.tabs.get(e.tabId, function(t){
    clos = t;
    console.log('l17');
    console.log(t);
    console.log(t.title);
  });
  info.push([e,clos]);
  var local;
  chrome.storage.local.get(fuction(e){local = e});
};

chrome.webNavigation.onCompleted.addListener(onbrowse, {url: [{hostSuffix: 'wikipedia.org'}]});

chrome.webNavigation.onBeforeNavigate.addListener(function(ev){
  console.log('l27');
  console.log(ev);
  chrome.tabs.getCurrent(function(ta){
    console.log(ta);
  });
}, {url: [{hostSuffix: 'wikipedia.org'}]});
