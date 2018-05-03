# This is just an outline 

import googlemaps


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC 
from selenium.webdriver.support.ui import WebDriverWait

# Selenium BTW is an automated website testing script 
# You can do anything you do normally with Chrome with this

myLatitude = '32.9603092'
myLongitude = '-96.73249129999999'
api_key = 'AIzaSyAHzGpecosGSzMWEDkjRAicInfPcTXKh3k' # Okay this one works

driver = webdriver.Chrome()

# First we need to convert these to an address
# Thank fuck someone already made a Python client library for this


gmaps = googlemaps.Client(key=api_key)

# Look up an address with reverse geocoding
reverse_geocode_result = gmaps.reverse_geocode((myLatitude, myLongitude))

# Need to narrow it down to JUST the zip code
zip_code = reverse_geocode_result[0]["address_components"][6]["short_name"]
# zip_code prints 75080

# Now I'm getting the bounds, these are going to have be in one string

bounds = []
NE = reverse_geocode_result[0]["geometry"]["bounds"]["northeast"]

bounds.append(NE["lat"])
bounds.append(NE["lng"])

SW = reverse_geocode_result[0]["geometry"]["bounds"]["southwest"]

bounds.append(SW["lat"])
bounds.append(SW["lng"])

# Have to convert everything to a string using a list comprehension.
bounds = [str(b) for b in bounds]

# bounding_box = bounds.join(',')
bounding_box = ",".join(bounds) # Python skills rusty AF
# Bounding box complete, returns 32.960737,-96.7323744,32.9607284,-96.7334949

buy_url = 'https://www.zillow.com/homes/for_sale/{}/globalrelevanceex_sort/{}'.format(zip_code, bounding_box)
driver.get(buy_url) # Goes to the above URL

# Done