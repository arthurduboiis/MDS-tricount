import { precacheAndRoute } from 'workbox-precaching'
import { db, sync } from "./utils/db.js";


precacheAndRoute(self.__WB_MANIFEST)

import './pusher';

self.addEventListener('online', () => {
  sync();
});
