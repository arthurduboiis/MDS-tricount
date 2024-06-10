import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";


import "./pusher";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
