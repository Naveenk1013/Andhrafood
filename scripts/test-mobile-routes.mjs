// scripts/test-mobile-routes.mjs
async function testRoutes() {
  const routes = [
    '/en',
    '/en/browse',
    '/en/ruchi',
    '/en/saved',
    '/en/dishes/uggani',
    '/te',
    '/te/saved',
  ];

  console.log("=== Testing Locked Desktop Layout Across Mobile User-Agents ===");
  let allPass = true;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    try {
      const start = Date.now();
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        }
      });
      const duration = Date.now() - start;
      const html = await res.text();
      
      const has1280Viewport = html.includes('width=1280');
      const noBottomNav = !html.includes('aria-label="Mobile navigation"');
      const hasDesktopHeader = html.includes('All Dishes') && html.includes('Ruchi AI');
      const hasCloudinaryAssets = html.includes('res.cloudinary.com/dro6n6co1');

      console.log(`[${res.status === 200 ? 'PASS' : 'FAIL'}] ${route} - HTTP ${res.status} (${duration}ms)`);
      console.log(`       - 1280px Desktop Viewport Lock: ${has1280Viewport ? 'YES' : 'NO'}`);
      console.log(`       - Mobile BottomNav Excluded: ${noBottomNav ? 'YES' : 'NO'}`);
      console.log(`       - Full Desktop Header Present: ${hasDesktopHeader ? 'YES' : 'NO'}`);
      console.log(`       - Cloudinary Assets Present: ${hasCloudinaryAssets ? 'YES' : 'NO'}`);

      if (res.status !== 200 || !has1280Viewport || !noBottomNav) allPass = false;
    } catch (err) {
      console.error(`[ERROR] ${route}:`, err.message);
      allPass = false;
    }
  }

  console.log("===============================================================");
  console.log(allPass ? "DESKTOP LAYOUT LOCK VERIFIED ACROSS ALL ROUTES!" : "VERIFICATION FAILED!");
}

testRoutes();
