function updateUnsafeHighlight() {
  if (!location.pathname.match(/^\/[^\/]+\/[^\/]+\/pull\/\d+\/files$/)) {
    return;
  }
  for (let $file of $a('#files .file')) {
    let filename = $file.querySelector('.file-info>a').textContent;
    if (!filename.endsWith(".rs")) {
      continue;
    }
    for (let $e of $file.querySelectorAll('td.blob-code>span')) {
      updateAllTextNodes($e);
    }
  }
}

let observer = new MutationObserver(updateUnsafeHighlight);
let $review = $('#js-repo-pjax-container');
observer.observe($review, {
  childList: true,
  subtree: true,
});
updateUnsafeHighlight();
