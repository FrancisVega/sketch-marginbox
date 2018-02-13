var setParentSymbolName = function(context) {
  context.actionContext.oldSelection.slice().map(function(layer) {
    if(layer.class() == "MSSymbolInstance") {
      layer.name = layer.symbolMaster().name();
      //layer.resetSizeToMaster(); // Reset size from master
    }
  })
}
