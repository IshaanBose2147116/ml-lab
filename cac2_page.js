const kmeans_data = [[2, 10], [2, 5], [8, 4], [5, 8], [7, 5], [6, 4], [1, 2], [4, 9]];
const parentContainer = document.getElementById("container");
parentContainer.innerHTML = "";
let cluster1 = [], cluster2 = [];
let prevCentroid1 = [], prevCentroid2 = [];

function kmeans(centroid1 = null, centroid2 = null) {
    if (centroid1 === null) {
        centroid1 = Math.floor(Math.random() * kmeans_data.length);
        centroid2 = Math.floor(Math.random() * kmeans_data.length);

        while (centroid1 === centroid2) {
            centroid2 = Math.floor(Math.random() * kmeans_data.length);
        }

        centroid1 = kmeans_data[centroid1];
        centroid2 = kmeans_data[centroid2];
    } 

    while (centroid1[0] != prevCentroid1[0] || centroid1[1] != prevCentroid1[1] ||
        centroid2[0] != prevCentroid2[0] || centroid2[1] != prevCentroid2[1]) {
        let distance1 = [], distance2 = [];
        // let cluster1 = [], cluster2 = [];
        cluster1 = []; cluster2 = [];

        for (let i in kmeans_data) {
            let dist1 = findDistance(kmeans_data[i], centroid1), dist2 = findDistance(kmeans_data[i], centroid2);
            
            if (dist1 < dist2) {
                cluster1.push(kmeans_data[i]);
            } else {
                cluster2.push(kmeans_data[i]);
            }

            distance1.push(dist1);
            distance2.push(dist2);
        }

        var table = `
        <table>
        <tr>
            <th>X1</th>
            <th>X2</th>
            <th>Distance 1</th>
            <th>Distance 2</th>
        </tr>
        `;

        for (let i = 0; i < kmeans_data.length; i++) {
            let row = `
            <tr ${cluster1.includes(kmeans_data[i]) ? 
                "style='background-color: rgb(255, 237, 135);'" : 
                "style='background-color: rgb(183, 255, 173);'"}>
                <td>${kmeans_data[i][0]}</td>
                <td>${kmeans_data[i][1]}</td>
                <td>${distance1[i]}</td>
                <td>${distance2[i]}</td>
            </tr>
            `;

            table += row;
        }

        table += "</table>";

        parentContainer.innerHTML += `
        <div class="container">
            <div>
                <span style="background-color: rgb(255, 237, 135);">Centroid 1</span>: (${ centroid1 }), 
                <span style="background-color: rgb(183, 255, 173);">Centroid 2</span>: (${ centroid2 })
            <div>
            ${table}
        </div>
        `;

        var c1_x1 = 0, c1_x2 =0, c2_x1 = 0, c2_x2 = 0;

        for (i in cluster1) {
            c1_x1 += cluster1[i][0];
            c1_x2 += cluster1[i][1];
        }

        c1_x1 = round(c1_x1 / cluster1.length);
        c1_x2 = round(c1_x2 / cluster1.length);

        for (i in cluster2) {
            c2_x1 += cluster2[i][0];
            c2_x2 += cluster2[i][1];
        }

        c2_x1 = round(c2_x1 / cluster2.length);
        c2_x2 = round(c2_x2 / cluster2.length);

        prevCentroid1 = centroid1;
        prevCentroid2 = centroid2;

        centroid1 = [c1_x1, c1_x2];
        centroid2 = [c2_x1, c2_x2];

        console.log(centroid1, prevCentroid1, centroid2, prevCentroid2);
    }

    // kmeans([c1_x1, c1_x2], [c2_x1, c2_x2]);
}

function findDistance(point1, point2) {
    var x1 = Math.pow(point1[0] - point2[0], 2);
    var x2 = Math.pow(point1[1] - point2[1], 2);
    return round(Math.sqrt(x1 + x2));
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateSilhouetteScore() {
    // var avgintra = 0;
    // var avgInter = 0;
    var s = 0;
    var a = 0, b = 0;

    [cluster1, cluster2].forEach((val, ind, arr) => {
        // val => cluster
        var avgIntra = 0, avgInter = 0;
        var otherCluster = ind === 0 ? cluster2 : cluster1;

        val.forEach((val, ind, arr) => {
            // val => point
            avgIntra += calculateAvgIntraClusterDist(val, ind, arr);
            avgInter += calculateAvgInterClusterDist(val, otherCluster);
        });

        avgIntra = avgIntra / val.length;
        avgInter = avgInter / val.length;

        console.log(avgIntra + " " + avgInter);

        a += avgIntra;
        b += avgInter;

        // console.log(val)
        // var randPoint = Math.floor(Math.random() * val.length);
        // randPoint = val[randPoint];
        // console.log(`Randpoint: ${randPoint}, Ind: ${ind}, Cluster: ${val}`);
        // var avgintra = calculateAvgIntraClusterDist(randPoint, ind, val);
        // var avgInter = calculateAvgInterClusterDist(randPoint, arr[(ind + 1) % arr.length]);
        // s += 1 - (avgintra / avgInter);
    });

    // avgintra = avgintra / 2;
    // avgInter = avgInter / 2;
    // console.log((avgInter - avgintra) / Math.max(avgintra, avgInter));
    a /= 2; b /= 2;
    console.log((b - a) / Math.max(b, a));
}

function calculateAvgIntraClusterDist(point, ind, cluster) {
    dist = 0;

    for (let i in cluster) {
        if (i != ind) {
            dist += findDistance(point, cluster[i]);
        }
    }

    return dist / cluster.length;
}

function calculateAvgInterClusterDist(point, cluster) {
    dist = 0;

    for (let i in cluster) {
        dist += findDistance(point, cluster[i]);
    }

    return dist / cluster.length;
}

kmeans();
parentContainer.innerHTML += `
<img src="./images/cac2_plot.png" />
<img src="./images/elbow.png" />`;

calculateSilhouetteScore();