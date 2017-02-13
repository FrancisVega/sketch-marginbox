var onRun = function(context) {

  // Imports
  @import "sQuery.js"


  // Constants
  const MARGIN_LAYER_NAME = 'marginbox'


  // Main
  try {
    const marginboxLayers = $("%selected%").childs().withName(MARGIN_LAYER_NAME)
    const firstStatus = marginboxLayers.layers[0].isVisible()
    marginboxLayers.each(function() {
      this.setIsVisible(!firstStatus)
    })
  } catch(e) {
    log(e)
  }

}
