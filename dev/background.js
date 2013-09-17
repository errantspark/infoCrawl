var local;
var info = [];
chrome.storage.local.get(function(e){
  local = e
  if (!local.timeline) 
    {chrome.storage.local.set({timeline: info})} 
  else 
    {info = local.timeline};
});
function check(tab_id, data, tab){
  if (tab.url.indexOf('wikipedia.org') > -1){
    chrome.pageAction.show(tab_id);
  } else {
    chrome.pageAction.hide(tab_id);
  }
}

chrome.tabs.onUpdated.addListener(check);

var onbrowse = function(e){
  console.log('l14');
  console.log(e);
  var clos;
  chrome.tabs.get(e.tabId, function(t){
    clos = t;
    console.log('l17');
    console.log(t);
    console.log(t.title);
    info.push([e,clos]);
  });
  chrome.storage.local.set({timeline: info});
};

chrome.webNavigation.onCompleted.addListener(onbrowse, {url: [{hostSuffix: 'wikipedia.org'}]});

chrome.webNavigation.onBeforeNavigate.addListener(function(ev){
  console.log('l27');
  console.log(ev);
  chrome.tabs.getCurrent(function(ta){
    console.log(ta);
  });
}, {url: [{hostSuffix: 'wikipedia.org'}]});

//everything prior to this point is bullshit but i'm not deleting it yet because
//my memory is shitty and i might need some of it
//AND YES MIKE I KNOW I CAN JUST USE GIT TO GET IT BACK BUT THAT'S EFFORT

var locst;
chrome.storage.local.get(function(e){locst = e});
var loadold = function(){hist = locst.hist; visits = locst.visits}
var hist;
var visits = [];
var vistf;
var visf;
var visid;
var vids;
var vods = {0: 'null'};
var addVisits = function(inp){
  inp.forEach(function(e,i){
    chrome.history.getVisits({url: e.url}, function(x){
      visits = visits.concat(x)
      if (i+1 === inp.length){
        vistf = visits.filter(function(e){return e.visitTime > new Date-600000})
        visf = vistf.filter(function(e){return e.transition === 'link'})
        visid = visf.map(function(e){return e.visitId})
        vids = visf.map(function(e){
          var hen = hist.filter(function(x){
            return x.id === e.id
          })
          hen = hen[0];
          return {
            title: hen.title.slice(0,hen.title.indexOf(' - Wikipedia')) ,
            id: e.id,
            type: 'suit',
            ref: e.referringVisitId,
            vis: e.visitId,
            source: e.referringVisitId,
            target: e.visitId
          }
        })
        visid.forEach(function(e){
            console.log(e);
              var la = vids.filter(function(x){return x.vis === e});
              vods[e] = la[0].title
        })
        vids = vids.map(function(e){

          return {
            type: 'suit',
            source: vods[e.ref],
            target: vods[e.vis]
          }
        })
    }})
  })
}
chrome.history.search(
  {text: '- Wikipedia, the free', startTime: new Date-600000}, 
  function(e){
    hist = e;
    addVisits(e)
  })
