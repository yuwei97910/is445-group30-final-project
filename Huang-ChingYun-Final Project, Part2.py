#!/usr/bin/env python
# coding: utf-8

# In[1]:


# pip install altair


# In[2]:


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import json
import altair as alt


# In[3]:


business_df = pd.read_json('yelp_academic_dataset_business.json', lines=True)
business_df.head()


# In[4]:


state_select = ['FL','TN','IN','PA']
business_df2 = business_df[business_df['state'].isin (state_select)]


# In[5]:


alt.data_transformers.disable_max_rows()


# In[7]:


select_box = alt.binding_select(options=list(business_df2['stars'].unique()))
selection = alt.selection_single(name='x_axis', fields=['stars'], bind=select_box)

alt.Chart(business_df2).mark_point().encode(
    x='longitude:Q',
    y='latitude:Q',
    color=alt.Color('review_count:Q'),
    tooltip='name'
).add_selection(
    selection
).transform_filter(
    selection
).interactive()


# In[ ]:




