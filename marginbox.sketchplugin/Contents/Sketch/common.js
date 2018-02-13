//
// Functions
//

// Get min value from array
const min = arr => Math.min.apply(Math, arr);

// Min (y) pos from layers
const minY = layers => min(layers.slice().map(layer => layer.frame().y()));

// Min (x) pos from layers
const minX = layers => min(layers.slice().map(layer => layer.frame().x()));

// Get layers bounds size
const getLayerBounds = layers => MSLayerGroup.groupBoundsForContainer(
  MSLayerArray.arrayWithLayers(layers)).size;

// Get layer bounds all
const getLayerBoundsAll = layers =>
  MSLayerGroup.groupBoundsForContainer(
    MSLayerArray.arrayWithLayers(layers)
  );

// Get all children of selection
const getChildrenOfSelection = (selection) => {
  const all = [];
  let childs = [];
  for (let i = 0; i < selection.length; i += 1) {
    if(selection[i].class() == 'MSLayerGroup') {
      childs = selection[i].children();
      for (let j=0; j<childs.length; ++j) {
        all.push(childs[j])
      }
    }
  }
  return all;
}

// Create rectangle type layer
const createRectLayer = (name, x, y, width, height, parent) => {
  if(parent.class() == 'MSLayerGroup') {
    const rectShape = MSRectangleShape.alloc().init();
    rectShape.frame = MSRect.rectWithRect(NSMakeRect(x,y,width,height));
    const shapeGroup = MSShapeGroup.shapeWithPath(rectShape);
    shapeGroup.name = name;
    parent.addLayers([shapeGroup]);
    return shapeGroup;
  }
}
// Find layers by name
const findLayersByName = (name, scope) => scope.filteredArrayUsingPredicate(
  NSPredicate.predicateWithFormat('name == %@', name),
);

// Get the top level group
const rootGroup = layer =>
  layer.parentGroup().class() == "MSArtboardGroup" ? layer : rootGroup(layer.parentGroup());

// Extract margin values from layer name
const fourValuesFromString = str => {
  const INFINITY = 999;
  const cleanValues = str.toLowerCase().split(/:/g).pop().trim().replace(/\s+/g, " ")
  const singleFormat = cleanValues.match(/[A-z]\d+/g)
  const margin = [0, 0, 0, 0]
  if (singleFormat) {
    for (let i = 0; i < singleFormat.length; i += 1) {
      if (singleFormat[i][0] == "t") { margin[0] = singleFormat[i].slice(1, INFINITY)}
      if (singleFormat[i][0] == "r") { margin[1] = singleFormat[i].slice(1, INFINITY)}
      if (singleFormat[i][0] == "b") { margin[2] = singleFormat[i].slice(1, INFINITY)}
      if (singleFormat[i][0] == "l") { margin[3] = singleFormat[i].slice(1, INFINITY)}
    }
    return margin.map(x => Number(x))
  } else {
    const cssFormat = cleanValues.split(/\s/g)
    if (cssFormat.length == 1) {
      margin[0] = cssFormat[0];
      margin[1] = cssFormat[0];
      margin[2] = cssFormat[0];
      margin[3] = cssFormat[0];
    }
    if (cssFormat.length == 2) {
      margin[0] = cssFormat[0];
      margin[2] = cssFormat[0];
      margin[1] = cssFormat[1];
      margin[3] = cssFormat[1];
    }
    if (cssFormat.length == 4) {
      margin[0] = cssFormat[0];
      margin[1] = cssFormat[1];
      margin[2] = cssFormat[2];
      margin[3] = cssFormat[3];
    }
    return margin.map(x => Number(x))
  }
}

