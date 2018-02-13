var addOrUpdate = function(context) {
  @import 'common.js';

  /*
   *context.actionContext.oldSelection.slice().map(function(layer) {
   *    log(layer.name())
   *})
   */

  function findMarginBoxGroup ( layer ) {
    if(layer.parentGroup().class() == "MSArtboardGroup" || layer.parentGroup().class() == "MSSymbolMaster") {
      return layer;
    } else {
      return findMarginBoxGroup( layer.parentGroup() );
    }
  }

  const G = context.actionContext.oldSelection.slice().map(function(layer){
    return findMarginBoxGroup( layer )
  })

  const uniqueArray = G.filter(function(item, pos) {
    return G.indexOf(item) == pos;
  })

  log(uniqueArray)
  const MARGIN_LAYER_NAME = 'marginbox';
  const MARGIN_BORDER_COLOR = { r:255, g:0, b:128, a:0.5 };
  const MARGIN_FILL_COLOR = { r:255, g:0, b:128, a:0.05 };
  const MARGIN_BORDER_THICKNESS = 1;

  //const selection = context.actionContext.oldSelection;
  const selection = uniqueArray;
  const allChildren = getChildrenOfSelection(selection);
  const justGroups = allChildren.slice().filter(layer => layer.class() == 'MSLayerGroup');

  for (let i=0; i<justGroups.length; ++i) {
    const keyLayer = justGroups[i];
    const childsOfKeyLayer = keyLayer.layers();

    // Marginbox layer
    var marginbox = findLayersByName(MARGIN_LAYER_NAME, childsOfKeyLayer).firstObject();

    // Filter marginbox layer
    log(childsOfKeyLayer)
    const validLayers = childsOfKeyLayer.slice().filter(layer => layer.name() != MARGIN_LAYER_NAME);
    log(validLayers)

    // Boundingbox of all child layers
    const bounds = getLayerBounds(validLayers);
    const heightBoundingBox = bounds.height;
    const widthBoundingBox = bounds.width;

    if(marginbox == null) {
      marginbox = createRectLayer (MARGIN_LAYER_NAME, 0, 0, 1, 1, keyLayer);
      MSLayerMovement.moveToBack([marginbox]);

      // Add fill
      marginbox.style().addStylePartOfType(0);
      // Add border
      marginbox.style().addStylePartOfType(1);
      // Get fill
      const originalFill = marginbox.style().fills().firstObject();
      // Get border
      const originalBorder = marginbox.style().borders().firstObject();
      // Set fill
      const marginFillColor = MSColor.colorWithRed_green_blue_alpha(
        MARGIN_FILL_COLOR.r, MARGIN_FILL_COLOR.g, MARGIN_FILL_COLOR.b, MARGIN_FILL_COLOR.a
      );
      originalFill.color = marginFillColor;
      // Set border
      const marginBorderColor = MSColor.colorWithRed_green_blue_alpha(
        MARGIN_BORDER_COLOR.r, MARGIN_BORDER_COLOR.g, MARGIN_BORDER_COLOR.b, MARGIN_BORDER_COLOR.a
      );
      originalBorder.color = marginBorderColor;
      originalBorder.thickness = MARGIN_BORDER_THICKNESS;
      originalBorder.position = 1;
    }

    // Reset marginbox layer positions
    marginbox.frame().y = minY(validLayers);
    marginbox.frame().x = minX(validLayers);

    // Get margin values
    const mData = fourValuesFromString(keyLayer.name());

    if (
      mData[0] == 0 && mData[1] == 0 && mData[2] == 0 && mData[3] == 0 ||
      isNaN(mData[0]) && isNaN(mData[1]) && isNaN(mData[2]) && isNaN(mData[3])
    ) {
      if(marginbox) {
        keyLayer.removeLayer(marginbox);
      }
    }

    // Marginbox position
    marginbox.frame().y = marginbox.frame().y() - mData[0];
    marginbox.frame().x = marginbox.frame().x() - mData[3];
    marginbox.frame().height = heightBoundingBox + mData[0] + mData[2];
    marginbox.frame().width = widthBoundingBox + mData[1] + mData[3];

    // Fit size group
    keyLayer.resizeToFitChildrenWithOption(true);
  }

  // Select the first selection layers
  context.document.currentPage().deselectAllLayers();
  for(let i=0, len=selection.length; i<len; ++i) {
    selection[i].select_byExpandingSelection(true, true);
  }

}
