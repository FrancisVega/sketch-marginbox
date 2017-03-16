var onRun = function(context) { // eslint-disable-line

  const doc = context.document;
  const selection = context.selection;

  // Obtiene las capas hijas de *un* grupo seleccionado
  const getLayersOfSelection = sel =>
    sel.layers().slice().filter(layer =>
      layer.name().toLowerCase() != 'bg' &&
      layer.name().toLowerCase() != 'marginbox' &&
      layer.name().toLowerCase().slice(0,1) != '_');


  // Ordena una lista de capas según su coordenada Y
  const sortLayersVertically = layers => {
    return layers.sort(function(a, b) {
      return a.frame().y() - b.frame().y();
    });
  }

  const reflowSelection = sel => {
    const layers = getLayersOfSelection(sel);
    const groups = layers.slice().filter(layer => layer.class() == "MSLayerGroup");
    const sortedLayers = sortLayersVertically(groups);

    for (let i=1; i<sortedLayers.length; ++i) {
      let layer = sortedLayers[i];
      let layerY = layer.frame().y();
      let layerHeight = layer.frame().height();
      let previousLayer = sortedLayers[i-1];
      let previousLayerY = previousLayer.frame().y();
      let previousLayerHeight = previousLayer.frame().height();
      layer.frame().y = previousLayerY + previousLayerHeight;
    }

    // Fit size group
    sel.resizeToFitChildrenWithOption(true);
  }


  reflowSelection(selection[0])

/*
 *  let allLayers = [];
 *  const foo = sel => {
 *    // todos los hijos
 *    let hijos = sel.layers().slice();
 *    // solo los hijos que son grupos
 *    let hijosGrupos = hijos.filter(x => x.class() == "MSLayerGroup")
 *    // los guardamos
 *    if(hijosGrupos.length > 0)
 *      allLayers.push(hijosGrupos)
 *    // pasamos por cada uno de ellos y hacemos la misma operacion
 *    for (let i=0; i < hijosGrupos.length; i++) {
 *      foo(hijosGrupos[i])
 *    }
 *  }
 *
 *  const x = selection[0]
 *  allLayers.push([x])
 *  foo(selection[0])
 *  allLayers.reverse()
 *
 *  for(let i=0; i<allLayers.length; ++i) {
 *    allLayers[i].slice().map(x => reflowSelection(x))
 *  }
 */

}
