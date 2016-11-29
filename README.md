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
9. Done? Great. Run the command 'yaxy' in the same path where your yaxy-config.txt is present.
10. Finally, run Chrome through Terminal on a Mac (/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=localhost:8558) or Command Prompt on Windows (google-chrome --proxy-server="localhost:8558") to hit the proxy server.
11. Hit the url 'http://localhost:8081/app/#/carousel-view'
