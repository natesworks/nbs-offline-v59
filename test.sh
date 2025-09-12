#!/usr/bin/bash
npm run build
adb forward tcp:27042 tcp:27042
frida -p $(adb shell pidof com.natesworks.nbsoffline) -H 127.0.0.1:27042 -l script.js
