let $ = q => document.querySelector(q);
let $a = q => document.querySelectorAll(q);

function updateAllTextNodes(root) {
  let iter = document.createNodeIterator(root, NodeFilter.SHOW_TEXT);
  let node;
  while (node = iter.nextNode()) {
    if (node.parentNode.className == "unsafe") {
      continue;
    }
    let slices = node.textContent.split(/\bunsafe\b/);
    if (slices.length == 1) {
      continue;
    }
    let lastSlice = slices.pop();
    for (let slice of slices) {
      if (slice.length > 0) {
        node.before(slice);
      }
      let $unsafe = document.createElement('span');
      $unsafe.className = 'unsafe';
      $unsafe.textContent = "unsafe";
      node.before($unsafe);
    }
    if (lastSlice.length > 0) {
      node.before(lastSlice);
    }
    node.remove();
  }
}
