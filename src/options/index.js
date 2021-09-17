// Saves options to chrome.storage
function save_options() {
  var shopperFeatures = document.getElementById('shopper_features').checked;
  var earnerFeatures = document.getElementById('earner_features').checked;
  chrome.storage.sync.set({
    shopperFeatures: shopperFeatures,
    earnerFeatures: earnerFeatures
  }, function() {
    // Update status to let user know options were saved.
    var saveBtn = document.getElementById('save');
    saveBtn.textContent = 'Options saved.';
    setTimeout(function() {
      saveBtn.textContent = 'Save';
    }, 750);
  });
}

// Restores state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    shopperFeatures: true,
    earnerFeatures: true
  }, function(items) {
    document.getElementById('shopper_features').checked = items.shopperFeatures;
    document.getElementById('earner_features').checked = items.earnerFeatures;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
