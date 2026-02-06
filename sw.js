const CACHE = 'snake-v-final';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['index.html', 'manifest.json', 'audio.mp3', 'avatar.png'])));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('message', event => {
  if (event.data.type === 'SCHEDULE_5_DAYS') {
    if (self.notifTimeout) clearTimeout(self.notifTimeout);
    
    self.notifTimeout = setTimeout(() => {
      self.registration.showNotification('😎 Tới giờ thể hiện trình độ của mình rồi!', {
        body: 'Hãy thể hiện phản xạ của mình đi nào!',
        icon: 'avatar.png',
        badge: 'avatar.png',
        vibrate: [500, 110, 500, 110, 450],
        tag: 'snake-auto-remind',
        renotify: true,
        data: { url: '/' }
      });
      // Phát âm thanh bạn đã cung cấp
      const audio = new Audio('audio.mp3');
      audio.play().catch(() => {});
    }, event.data.delay);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});

