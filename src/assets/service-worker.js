// src/service-worker.js
self.addEventListener('push', function(event) {
  let data;
  
  try {event.data
    data = event.data.json();
    console.log(data.body)
  } catch (e) {
    console.error('Error parsing push message data:', e);
    return;
  }

  const options = {
    body: data.body,
    icon: 'assets/icon/icon-b-pay.svg',
    badge: 'assets/icon/icon-retrait.svg'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );


  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/')
  );
});
});