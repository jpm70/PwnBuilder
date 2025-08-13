const CACHE_NAME = 'pwnbuilder-v1';
const urlsToCache = [
  '/PwnBuilder/',
  '/PwnBuilder/index.html',
  '/PwnBuilder/main.js',
  '/PwnBuilder/tools/nmap.js',
  '/PwnBuilder/tools/hydra.js',
  '/PwnBuilder/tools/dirb.js',
  '/PwnBuilder/tools/enum4linux.js',
  '/PwnBuilder/tools/jtr.js',
  '/PwnBuilder/tools/netcat.js',
  '/PwnBuilder/tools/nikto.js',
  '/PwnBuilder/tools/wfuzz.js',
  '/PwnBuilder/tools/aircrackng.js',
  '/PwnBuilder/tools/aireplayng.js',
  '/PwnBuilder/tools/airmonng.js',
  '/PwnBuilder/tools/airodumpng.js',
  '/PwnBuilder/tools/dnsenum.js',
  '/PwnBuilder/tools/dig.js',
  '/PwnBuilder/tools/ettercap.js',
  '/PwnBuilder/tools/hashcat.js',
  '/PwnBuilder/tools/medusa.js',
  '/PwnBuilder/tools/msfconsole.js',
  '/PwnBuilder/tools/searchsploit.js',
  '/PwnBuilder/tools/sqlmap.js',
  '/PwnBuilder/tools/tcpdump.js',
  '/PwnBuilder/tools/theHarvester.js',
  '/PwnBuilder/tools/tshark.js',
  '/PwnBuilder/tools/whois.js',
  '/PwnBuilder/tools/wpscan.js',
  '/PwnBuilder/tools/meterpreter.js',
  '/PwnBuilder/tools/socat.js',
  '/PwnBuilder/tools/arpspoof.js',
  '/PwnBuilder/tools/binwalk.js',
  '/PwnBuilder/tools/cewl.js',
  '/PwnBuilder/tools/commix.js',
  '/PwnBuilder/tools/crunch.js',
  '/PwnBuilder/tools/dsniff.js',
  '/PwnBuilder/tools/fierce.js',
  '/PwnBuilder/tools/foremost.js',
  '/PwnBuilder/tools/gdb.js',
  '/PwnBuilder/tools/netdiscover.js',
  '/PwnBuilder/tools/objdump.js',
  '/PwnBuilder/tools/radare2.js',
  '/PwnBuilder/tools/strace.js',
  '/PwnBuilder/tools/strings.js',
  '/PwnBuilder/tools/volatility.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Fallo en el caché de la instalación:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
