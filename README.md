web-challenge semifinal
============

1) npm install -g grunt-cli bower

2) npm install

3) bower install

4) grunt

5) check http://localhost:1000

=============

All links without "/?/" symbol at the beginning like http://localhost:1000/hot || http://localhost:1000/comments/3374ps will not work on refresh. Since Backbone router uses "hash" you have to place "#" symbol at the beginning of URL if you want to get this page from Service Worker cache. So if you want it check whether these links could be taken from cache during page refresh, please use links like http://localhost:1000/#hot || http://localhost:1000/#comments/3374ps.