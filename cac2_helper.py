# # from random import randint
# # from math import sqrt

# import matplotlib.pyplot as plt
# from sklearn.cluster import KMeans
# from sklearn.metrics import silhouette_score
# import numpy as np
# from scipy.spatial.distance import cdist
# import seaborn as sns
# import pandas as pd

# kmeans_data = [(2, 10), (2, 5), (8, 4), (5, 8), (7, 5), (6, 4), (1, 2), (4, 9)]
# # cluster1, cluster2 = [], []
# # init_centroid1 = randint(0, len(kmeans_data) - 1)
# # init_centroid2 = randint(0, len(kmeans_data) - 1)

# # while init_centroid2 == init_centroid1:
# #     init_centroid2 = randint(0, len(kmeans_data) - 1)

# # def kmeans(centroid1 = None, centroid2 = None):
# #     if not centroid1:
# #         centroid1 = randint(0, len(kmeans_data) - 1)
# #         centroid2 = randint(0, len(kmeans_data) - 1)

# #         while centroid1 == centroid2:
# #             centroid2 = randint(0, len(kmeans_data) - 1)
    
# #         centroid1 = kmeans_data[centroid1]
# #         centroid2 = kmeans_data[centroid2]
    
# #     distance1, distance2 = [], []

# #     for i in kmeans_data:
# #         dist1 = find_distance(i, centroid1)
# #         dist2 = find_distance(i, centroid2)

# #         if dist1 < dist2:
# #             cluster1.append(i)
# #         else:
# #             cluster2.append(i)

# #         distance1.append(dist1)
# #         distance2.append(dist2)
    
# #     # print("X1\tX2\tDistance 1\tDistance 2".expandtabs(10))
# #     header = "X1\tX2\tDistance 1\tDistance 2\n"
# #     for i in range(len(kmeans_data)):
# #         print(
# #             f"{header}{kmeans_data[i][0]}\t{kmeans_data[i][1]}\t{distance1[i]}\t{distance2[i]}"
# #         .expandtabs(10))
# #         header=""
    
# # def find_distance(point1: tuple, point2: tuple):
# #     return round(sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2), 2)

# # kmeans()

# x = [i[0] for i in kmeans_data]
# y = [i[1] for i in kmeans_data]
# X = np.array(list(zip(x, y)))
# df = pd.DataFrame(X, columns=["x", "y"])
# print(df)
# model = KMeans(2)
# model.fit(X)
# print(silhouette_score(X, model.labels_, metric='euclidean'))
# sns.scatterplot(
#     x="x", 
#     y="y",
#     data=df,
#     hue=model.labels_,
#     palette=["red", "blue"]
# )
# plt.show()

# # distortions = []
# # K = range(1, 8)
# # for i in K:
# #     model = KMeans(n_clusters=i)
# #     model.fit(X)
# #     distortions.append(sum(np.min(cdist(X, model.cluster_centers_,'euclidean'), axis=1)) / X.shape[0])

# # fig, ax = plt.subplots()
# # ax.plot(K, distortions, 'bx-')
# # for i in zip(K, distortions):
# #     ax.annotate(str(round(i[1], 2)), i)

# # plt.show()
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

df = pd.DataFrame(
    [
        ["Yes", "Single", 125, "No"],
        ["No", "Married", 100, "No"],
        ["No", "Single", 70, "No"],
        ["Yes", "Married", 120, "No"],
        ["No", "Divorced", 95, "Yes"],
        ["No", "Married", 60, "No"],
        ["Yes", "Divorced", 220, "No"],
        ["No", "Single", 85, "Yes"],
        ["No", "Married", 75, "No"],
        ["No", "Single", 90, "Yes"]
    ],
    columns=["Refund", "Martial Status", "Taxable Income", "Cheat"]
)