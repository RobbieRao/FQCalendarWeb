(function(){
  function setLazy(img){
    if(!img.hasAttribute('loading')){
      img.setAttribute('loading','lazy');
    }
  }
  function setLazyAll(root){
    root.querySelectorAll('img').forEach(setLazy);
  }
  document.addEventListener('DOMContentLoaded',function(){
    setLazyAll(document);
    var observer=new MutationObserver(function(mutations){
      mutations.forEach(function(m){
        m.addedNodes.forEach(function(node){
          if(node.nodeType===1){
            if(node.tagName==='IMG'){
              setLazy(node);
            }else{
              setLazyAll(node);
            }
          }
        });
      });
    });
    observer.observe(document.body,{childList:true,subtree:true});
  });
})();

