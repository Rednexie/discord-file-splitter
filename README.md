# Discord File Splitter

Not everyone has a cloud file storage subscription, but we might have some files to store and out disk space might not be enough to store those files. So we need somewhere free to store our files on. Discord is one of the best free solutions, since it is a chat platorm and it doesn't have any limits per account. But there is one problem: The max file size discord accepts is 25 MB.


Discord File Splitter solves this problem by giving you the ability to split your file into parts that you can upload to discord. And when you need them, you can download and combine them so you can get the original file back without any data loss.

<br><br>Discord File Splitter provides 3 interfaces for this functionality: <br><br>

- [*Native Desktop App*](#desktop-app) 

  
The dfs desktop app works on all desktop platforms thanks to electron.
- [*Command Line Interface*](#cli)

  
The cli is mainly made for Android devices with Termux and Node.js installations. This works well if you want to use dfs without electron.
- [*The Web Interface*](#web)


While uploading and downloading a file just to split it might be a bit inefficient, we suggest running the server on a local network to split files on mobile devices without installing any dependencies.

<br>

---

### Desktop App

To install electron, you must have [node](https://nodejs.org) installed on your device. So you can install [electron](https://electronjs.org/)
```bash
npm i -g electron
```


Note: This process could require sudo on linux devices.



After installing the Electron framework, you then have to clone the github repository to your device. This can be done with the following command:

```bash
git clone https://https://github.com/Rednexie/discord-file-splitter
```

After the cloning is done, you then have to enter to the main project directory:

```bash
cd discord-file-splitter
```

You can run the application: 

```
npx electron .
```


<br>

---

### Command Line Interface

To use dfs cli, you must have [node](https://nodejs.org) installed on your device.


You have to clone the cli branch to your system:

```bash
git clone -b cli https://https://github.com/Rednexie/discord-file-splitter
```

After the cloning is done, you then have to enter to the main project directory:

```bash
cd discord-file-splitter
```

And you can use the script.



For example to split a file named 'Pardus-23.2-GNOME-amd64.iso.zip! you can use the command:

```
node . s Pardus-23.2-GNOME-amd64.iso.zip
```


To combine it again, you can run the following command:

```bash
node . c Pardus-23.2-GNOME-amd64.iso.zip
```


<br>

---

# Web Server

To run and use the dfs web interface, you must have [node](https://nodejs.org) installed on your device.


You have to clone the web branch to your system:

```bash
git clone -b web https://https://github.com/Rednexie/discord-file-splitter
```

After the cloning is done, you then have to enter to the main project directory:

```bash
cd discord-file-splitter
```

You now have to install the dependencies of the system to run the webserver:

```bash
npm i
```


After the installation is complete, you can start the server on your desired port(default is 3000):

```bash
node .
```



## Possible Updates
- Discord Integration: Providing the file/message link when file is uploaded
- Logging: Saving the usage of the system
- Auto Upload to Discord
