function updateUnsafeHighlight() {
  for (let $file of $a('.differential-file-icon-header')) {
    if (!$file.textContent.endsWith(".rs")) {
      continue;
    }
    let $content = $file.nextElementSibling;
    for (let $e of $content.querySelectorAll('tr:not(.inline)>td')) {
      updateAllTextNodes($e);
    }
  }
}

let observer = new MutationObserver(updateUnsafeHighlight);
let $review = $('#differential-review-stage');
observer.observe($review, {
  childList: true,
  subtree: true,
});
updateUnsafeHighlight();
