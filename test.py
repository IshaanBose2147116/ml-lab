# %%
import pandas as pd
from correlation_graph import show_correlation_graph
# %%
df = pd.read_csv('./dataset/diabetes.csv')
df
# %%
show_correlation_graph(df)