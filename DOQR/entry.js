// A QR parameter (including an empty/malformed one) always belongs to the
// existing visitor flow. Do not redirect or rewrite its query/hash.
if (new URLSearchParams(location.search).has('qr')) {
  await import('./app.js?v=20260901-2');
} else {
  await import('./landing.js?v=20261004-1');
}
