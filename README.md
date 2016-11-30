# sample-project-A

Steps to setup
--------------

1. Install the latest version of nodeJS.
2. Once installed, run 'npm -v' to check the version number and verify that it is installed.
3. Install bower using the command 'npm bower install -g' (omit -g if you do not wish for a global install)
4. Install yaxy using the command 'npm yaxy install -g' (omit -g if you do not wish for a global install)
5. Now take a git clone of the carousel sample-project repository using 'git clone https://github.com/AkshayOommen/sample-project-A.git' or 'git clone git@github.com:AkshayOommen/sample-project-A.git'
6. Done? Great. Now open up command prompt (or Terminal if you're using a Mac) and set current working directory to sample-project-A
7. Once your current working directory is set, run 'bower install' to install all the JS library dependancies of the project.
8. Then, open up yaxy-config.txt and provide the project directory path that needs to be accessed at the mentioned url 'in this case, localhost:8081' (More info on yaxy: https://github.com/Kolyaj/Yaxy)
9. Done? Great. Run the command 'yaxy' in the same path where your yaxy-config.txt is present. The server is now listening on port 8558 by default.
10. Finally, run Chrome with a proxy server through Terminal on a Mac (/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=localhost:8558).
11. If you're using a Windows machine, open Chrome. Click on Settings -> Show Advanced Settings -> Network -> Change proxy Settings. Click on 'LAN Settings', check the 'Use a proxy server' checkbox and provide address as 'localhost' and port as '8558'. Save this.
11. Hit the url 'http://localhost:8081/app/#/carousel-view'

Project file details
----------------

1. The project runs primarily on angularJS.
2. The scripts folder consists of the following files -> app.js (for routing) , CarouselViewComponents.js (which consists of a filter, a directive and a controller. I'd usually use different files for each of them, but kept them in one to make things simple), videoList.json (which has the mock data) and carousel-template.html (the template my directive uses).
3. The styles folder consists of a single css file
4. The views folder consists of a single view
5. The index.html servers as my shell page where my partial will be loaded in
6. bower.json to help install all the JS libraries
7. yaxy-config.txt to provide the project directory to access at the provided url.

Additional details
------------------

1. No server for data saving/fetching used by this project owing to time constraints. History feature is demonstrated however. :)
2. The carousel features keyboard shortcut support (when focused) and you can move through the carousel using the left and right keys. On selecting a video, you can press 'Enter' to begin playing the video.
3. Further keyboard shortcuts are provided once the video popup opens.
