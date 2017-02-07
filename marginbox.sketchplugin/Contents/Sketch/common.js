// Find layers by name
const findLayersByName = (name, scope) => scope.filteredArrayUsingPredicate(
  NSPredicate.predicateWithFormat('name == %@', name),
);

// Get the top level group
const getRootGroup = layer => {
    const parent = layer.parentGroup()
    if (parent.class() == "MSArtboardGroup") {
        return layer;
    } else {
        return getRootGroup(parent);
    }
}
