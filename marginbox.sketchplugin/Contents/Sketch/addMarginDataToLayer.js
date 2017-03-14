var onRun = function(context) {

  // Constants
  const doc = context.document;
  const sel = context.selection.slice();


  // Main
  try {
    const sq = [doc askForUserInput: 'Replace or Add Margin data' initialValue: ''];
    sel.map(layer => {
      layer.name = `${layer.name().split(":").shift()}: ${sq}`;
    });
  } catch(e) {
    log(e);
  }

}
