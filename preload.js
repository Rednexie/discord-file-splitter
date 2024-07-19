const { ipcRenderer, contextBridge: { exposeInMainWorld } } = require('electron')

exposeInMainWorld('renderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, fn) => ipcRenderer.on(channel, (ev, ...args) => fn(...args))
});
