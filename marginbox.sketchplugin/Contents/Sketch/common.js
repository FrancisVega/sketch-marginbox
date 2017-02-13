// Find layers by name
const findLayersByName = (name, scope) => scope.filteredArrayUsingPredicate(
  NSPredicate.predicateWithFormat('name == %@', name),
);

// Get the top level group
const rootGroup = layer =>
  layer.parentGroup().class() == "MSArtboardGroup" ? layer : rootGroup(layer.parentGroup());
