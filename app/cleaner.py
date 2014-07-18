import re
import string
from bs4 import BeautifulSoup



def clean(text):
	# text = '<b style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;">First Off...</b><br style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;"><br style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;"><b style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;">Call for projects closed.</b><span style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;">&nbsp;The 2015 joint call for local planning projects through the Regional Transportation Authority (RTA) Community Planning Program and CMAP&nbsp;</span><a href="http://www.cmap.illinois.gov/lta" target="_blank" style="color: rgb(17, 85, 204); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal; background-color: rgb(255, 255, 255);">Local Technical Assistance (LTA) Program</a><span style="color: rgb(34, 34, 34); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal;">&nbsp;is now closed. CMAP and RTA thank all who applied for planning assistance and grants. As noted in our&nbsp;</span><a href="http://www.cmap.illinois.gov/documents/10180/223389/CmteMemo--ScheduleFutureApps02-05-2014.pdf/6502d178-fd36-44d3-9a3e-f82881cb1b09" target="_blank" style="color: rgb(17, 85, 204); font-family: Calibri, sans-serif; font-size: 15px; line-height: normal; background-color: rgb(255, 255, 255);">schedule</a>'
	soup = BeautifulSoup(text)
	# print(soup.prettify())
	print '\n'

	for link in soup.find_all('a'):
		# print link.attrs
		link['style'] = 'color: rgb(64, 161, 211); font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.4; text-decoration: none !important; font-weight: bold;'

	for words in soup.find_all('span'):
		if words['style'] == 'font-weight: 700;':
			words['style'] = 'color: #535353; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.4; font-weight: 700;'
		else:
			words['style'] = 'color: #535353; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.4;'

	for bold in soup.find_all('b'):
		bold['style'] = 'color: #535353; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.4;'

	# print(soup.prettify())

	# contents = []

	# lines = open('input.txt').read().splitlines()

	# for i in lines:
	# 	if i != '':
	# 		contents.append(i)


	# print contents
	return soup


def main():
    text = raw_input("Enter text for cleaning:  ")
    x = clean(text)
    # print clean
    return x


if __name__ == "__main__":
    main()


