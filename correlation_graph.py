import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

def show_correlation_graph(df: pd.DataFrame, figsize: tuple=(10, 10)):
    plt.figure(figsize=figsize)
    corrmat = df.corr()
    top_corr_features = corrmat.index
    sns.heatmap(df[top_corr_features].corr(), annot=True, cmap="RdYlGn")
    plt.show()