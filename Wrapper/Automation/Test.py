from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
from pytractor import *

chrome_path = "D:\chromedriver_win32\chromedriver.exe"
driver = webdriver.Chrome(chrome_path)
driver.maximize_window()
driver.get('https://portal.northallegheny.org/tsi_live_360/apphost/TylerSis#/login')

login_username = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, 'inputUserName')))
login_username.send_keys('225134')
login_password = driver.find_element_by_css_selector('input[ng-model="password"]')
login_password.send_keys('')
login_btn = driver.find_element_by_css_selector('img[src*="save.png"]')
login_btn.click()
WebDriverWait(driver, 5).until(EC.url_changes(driver.current_url))

try:
    loading = driver.find_element_by_class_name('tst-overlay-container')
    while loading.is_enabled():
        continue
except:
    pass

"""

popup = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'div[role="dialog"]')))
popup_close = popup.find_element_by_css_selector('img[src*="Cancel.png"]')
popup_close.click()
"""

buttons = driver.find_elements_by_css_selector('div[role="button"]')
for button in buttons:
    if button.text == 'Grades':
        button.click()
