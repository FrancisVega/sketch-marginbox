var onRun = function(context) { // eslint-disable-line

  @import 'common.js';


  //
  // Consts
  //

  const isPaddingLayer = layer =>
    layer.name().trim().split("%")[1] !== "";

  const paddingData = layer => {
    if (isPaddingLayer(layer))
      return layer.name().split("%")[1].trim();
  }

  const fitPaddingLayer = (layer, bounds, padding) => {
    layer.frame().width = bounds.size.width + padding[1] + padding[3];
    layer.frame().height = bounds.size.height + padding[0] + padding[2];
    layer.frame().x = bounds.origin.x-padding[3];
    layer.frame().y = bounds.origin.y-padding[0];
  }

  const selection = context.selection;
  const paddingLayer = selection[0];
  const paddingValue = fourValuesFromString(paddingLayer.name().split("%")[1])

  const bounds = getLayerBoundsAll(
    paddingLayer.parentGroup().layers().slice()
    .filter(layer => layer != paddingLayer)
    .filter(layer => layer.name() != 'marginbox')
  )

  fitPaddingLayer( paddingLayer, bounds, paddingValue );

}
