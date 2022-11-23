#%%
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#%%
df_business = pd.read_json('yelp_academic_dataset_business.json', lines=True)
print(type(df_business.loc[1, 'categories'])) # str
print(type(df_business.loc[1, 'attributes'])) # dict


#%%
df_business['cat_list'] = [x.split(',') if x else [''] for x in df_business['categories']]
all_cat = list(df_business['cat_list'])

# %%
unique_cat = set(np.concatenate(all_cat))
unique_cat = [x.replace(' ', '') for x in unique_cat] # length = 2455

#%%
# cat: a string
# cat_list: a list with string

# give each record a unique category 'unique_category'
# 'Restaurants', 'Hotel&Travel', 'Bars', 'Cafeteria', 'Pharmacy'
def give_unique_cat(cat_list: list):
    cat_list = [x.replace(' ', '') for x in cat_list]
    unique_category = 'Others'
    if 'Restaurants' in cat_list or 'Food' in cat_list or 'Cafeteria' in cat_list: 
        unique_category = 'Food'
    if 'Hotel&Travel' in cat_list or 'Hotels' in cat_list : 
        unique_category = 'Hotels'
    if 'Bars' in cat_list or 'Beer' in cat_list: 
        unique_category = 'Bars'
    # if 'Cafeteria' in cat_list: 
    #     unique_category = 'Cafeteria'
    if 'Pharmacy' in cat_list or 'Doctors' in cat_list or 'Health&Medical' in cat_list: 
        unique_category = 'Health & Medical'
    if 'Shopping' in cat_list: 
        unique_category = 'Shopping'
    if 'Arts&Entertainment' in cat_list: 
        unique_category = 'Arts & Entertainment'
    if 'Financial Services' in cat_list: 
        unique_category = 'Financial Services'
    if 'Automotive' in cat_list: 
        unique_category = 'Automotive'
    if 'ActiveLife' in cat_list: 
        unique_category = 'Active Life'

    return unique_category

df_business['unique_category'] = [give_unique_cat(x) for x in df_business['cat_list']]
df_business['unique_category'].value_counts().plot(kind='bar')

#%%
# Restaurant type
def give_restaurant_type(cat_list: list):
    restaurant_type = None
    cat_list = [x.replace(' ', '') for x in cat_list]
    if not ('Food' in cat_list or 'Restaurants' in cat_list):
        return restaurant_type

    # print(cat_list)

    if 'Korean' in cat_list:
        restaurant_type = 'Korean'
    elif 'Italian' in cat_list:
        restaurant_type = 'Italian'
    elif 'Pizza' in cat_list or 'FastFood' in cat_list or 'Burgers' in cat_list:
        restaurant_type = 'Fast Food'
    elif 'Japanese' in cat_list:
        restaurant_type = 'Japanese'
    elif 'American(Traditional)' in cat_list or 'American(New)' in cat_list:
        restaurant_type = 'American'
    elif 'Chinese' in cat_list:
        restaurant_type = 'Chinese'
    elif 'Mexican' in cat_list:
        restaurant_type = 'Mexican'
    elif 'Vietnamese' in cat_list:
        restaurant_type = 'Vietnamese'
    else:
        restaurant_type = 'Others'

    return restaurant_type

df_business['restaurant_type'] = [give_restaurant_type(x) for x in df_business['cat_list']]
df_business['restaurant_type'].value_counts().plot(kind='bar')

#%%
# -------------------------------------------------------
# attributes: a dictionary
# 'WiFi', 'RestaurantsPriceRange2', 'GoodForKids', 'RestaurantsDelivery', 'RestaurantsGoodForGroups', 'BusinessParking'
def check_attribute(attribute: dict, key: str):
    if not attribute:
        return False

    v = attribute.get(key)
    if key == 'BusinessParking':
        if v:
            v = 'True' in v
        else:
            v = 'False'

    if v and v != 'False' and v!= 'None': 
        return True
    else:
        return False

df_business['has_wifi'] = [check_attribute(x, 'WiFi') for x in df_business['attributes']]
df_business['has_parking'] = [check_attribute(x, 'BusinessParking') for x in df_business['attributes']]
df_business['animal_friendly'] = [check_attribute(x, 'DogsAllowed') for x in df_business['attributes']]

#%%
# def check_restaurant_price_range(attribute: dict):
#     if not attribute:
#         return None

#     price_range = None
    # if attribute.get('RestaurantsPriceRange1'): return 1
    # elif attribute.get('RestaurantsPriceRange2'): return 2
    # elif attribute.get('RestaurantsPriceRange3'): return 3
    # elif attribute.get('RestaurantsPriceRange4'): return 4
    # elif attribute.get('RestaurantsPriceRange5'): return 5

# df_business['restaurant_price_range'] = [check_restaurant_price_range(x) for x in df_business['attributes']]
# df_business['restaurant_price_range'].value_counts().plot(kind='bar')
