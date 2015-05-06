##web-challenge semifinal

###How to install

```sh
git clone https://github.com/Graphoper/ua-web-challenge-vii-semifinal.git
cd ua-web-challenge-vii-semifinal
npm install -g grunt-cli bower
npm install && bower install 
```

Congratulations! Installation is completed. Now you have to launch this app

###How to launch

```sh
grunt
```

That's all. Check [http://localhost:1000](http://localhost:1000) in your browser


###Some clarifications

####Page refresh

All links without `/?/` symbol at the beginning like: 

> http://localhost:1000/hot or || http://localhost:1000/comments/3374ps 

will not work on refresh. Since Backbone router uses "hash" you have to place `#` symbol at the beginning of those URLs.

> http://localhost:1000/#hot || http://localhost:1000/#comments/3374ps.

####Service Worker

Service worker works only via https. So be sure that you're using a proper protocol.
Anyway you're able to check SW status in the console.