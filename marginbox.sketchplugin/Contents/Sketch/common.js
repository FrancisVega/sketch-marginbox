// Find layers by name
const findLayersByName = (name, scope) => scope.filteredArrayUsingPredicate(
  NSPredicate.predicateWithFormat('name == %@', name),
);
