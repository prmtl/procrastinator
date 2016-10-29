const defaultOptions = {
  urls: '',
  enabled: true,
};

function getOptions(callback) {
  chrome.storage.sync.get(defaultOptions, callback);
}

function notify(text) {
  const $status = document.getElementById('status');
  $status.textContent = text;
  setTimeout(() => {
    $status.textContent = '';
  }, 750);
}

function saveOptions() {
  const urls = document.getElementById('urls').value;
  const enabled = document.getElementById('enabled').checked;
  chrome.storage.sync.set({
    urls,
    enabled,
  }, () => notify('Options saved.'));
}

function restoreOptions() {
  getOptions(options => {
    document.getElementById('urls').value = options.urls;
    document.getElementById('enabled').checked = options.enabled;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
