@import "common.js";

var onRun = function(context) {

  //
  // Constants
  //

  const MARGIN_NAME = 'marginbox';


  //
  // Main
  //

  const toggleVisibilityLayersByName = (sel, name) => {
    sel.slice().map(group => {
      let childs
      switch(group.class()) {
        case MSSymbolInstance:
          childs = group.symbolMaster().children();
          break;
        default:
          childs = group.children();
      }
      let marginLayers = findLayersByName(name, childs).slice()
      if(marginLayers.length > 0 ) {
        let firstStatus = marginLayers[0].isVisible();
        marginLayers.map(layer => layer.setIsVisible(!firstStatus));
      }
    })
  }

  toggleVisibilityLayersByName(context.selection, MARGIN_NAME);
};
