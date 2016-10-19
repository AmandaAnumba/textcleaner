Text Cleaner
===============

For use with CMAP Constant Contact emails. 


Dependencies
===============

- Python
	| Flask
	| Heroku for deployment
- Terminal/PowerShell
- Text Editor (ex: Sublime Text 3)


Usage
===============

To edit
- go to `app` to edit the python files
- go to `app > templates` to edit the html files
- go to `app > static` to edit all other files (CSS, Bootstrap plugin, JavaScript, etc)

Edit `cleaner.py` to enhance the text formatting process. Then run `python cleaner.py` to test it and make sure everything is working how you want it to. 

To view locally, `cd app` in your terminal and run `python views.py`. Then go to `localhost:5000` in your internet browser.  

Edit `views.py` to control how the html front-end interacts with the python back-end using Flask. If you are not familiar with Flask, check out a few Python Flask tutorials.  
