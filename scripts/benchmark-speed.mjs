async function testPerformance() {
  const urls = [
    { name: 'Home Page (/en)', url: 'http://localhost:3000/en' },
    { name: 'Browse Gallery (/en/browse)', url: 'http://localhost:3000/en/browse' },
    { name: 'Recipe Detail (/en/dishes/pesarattu)', url: 'http://localhost:3000/en/dishes/pesarattu' },
    { name: 'Cloudinary CDN Asset (Pesarattu Image)', url: 'https://res.cloudinary.com/dro6n6co1/image/upload/v1792309950/APFOOD/pesarattu.jpg' },
    { name: 'Cloudinary CDN Video (APfood 4K Video)', url: 'https://res.cloudinary.com/dro6n6co1/video/upload/v1792308468/APfood_ebb8wq.mp4' }
  ];

  console.log('=== REAL-TIME SPEED BENCHMARK ===\n');

  // Warmup run
  try { await fetch('http://localhost:3000/en'); } catch (_) {}

  for (const item of urls) {
    const isCloudinary = item.url.includes('cloudinary');
    const t0 = performance.now();
    try {
      const res = await fetch(item.url, { method: isCloudinary ? 'HEAD' : 'GET' });
      let sizeKb = 0;
      if (isCloudinary) {
        sizeKb = Math.round(Number(res.headers.get('content-length') || 0) / 1024);
      } else {
        const text = await res.text();
        sizeKb = Math.round(text.length / 1024);
      }
      const t1 = performance.now();
      const ms = Math.round(t1 - t0);
      console.log(`[PASS] ${item.name.padEnd(42)} -> ${ms.toString().padStart(4)} ms | Status: ${res.status} | Size: ${sizeKb} KB`);
    } catch (e) {
      console.log(`[FAIL] ${item.name.padEnd(42)} -> Error: ${e.message}`);
    }
  }
  console.log('\n==================================\n');
}

testPerformance().catch(console.error);
