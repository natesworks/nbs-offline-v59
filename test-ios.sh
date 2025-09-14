#!/usr/bin/bash
# sudo usbmuxd
# sudo iproxy 27042 27042
npm run build
frida -H 127.0.0.1:27042 -n Gadget -l script.js