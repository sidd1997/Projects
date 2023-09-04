const math = {};

math.lerp = (a, b, t) => {
    return a + (b - a) * t;
}

math.invLerp = (a, b, v) => {
    return (v - a) / (b - a);
}

math.remap = (oldA, oldB, newA, newB, v) => {
    return math.lerp(newA, newB, math.invLerp(oldA, oldB, v));
}

math.remapPoint = (oldBound, newBound, point) => {
    return [
        math.remap(oldBound.left, oldBound.right, newBound.left, newBound.right, point[0]),
        math.remap(oldBound.top, oldBound.bottom, newBound.top, newBound.bottom, point[1])
    ];
}

math.add = (p1, p2) => {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

math.scale = (p, scale) => {
    return [p[0] * scale, p[1] * scale];
}

math.distance = (p1, p2) => {
    return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

math.subtract = (p1, p2) => {
    return [p1[0] - p2[0], p1[1] - p2[1]];
}

math.formatNumber = (n, dec = 0) => {
    return n.toFixed(dec);
}

math.equals = (p1, p2) => {
    return p1[0] == p2[0] && p1[1] == p2[1];
}

math.getNearest = (loc, points) => {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearestIndex = 0;
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const d = math.distance(loc, point);
        if (d < minDist) {
            minDist = d;
            nearestIndex = i;
        }
    }
    return nearestIndex;
}