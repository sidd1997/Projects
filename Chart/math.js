const math = {};

math.lerp = (a, b, t)=>{
    return a+ (b - a) * t;
}

math.invLerp = (a, b, v)=>{
    return (v - a)/(b - a);
}

math.remap = (oldA, oldB, newA, newB, v)=>{
    return math.lerp(newA, newB, math.invLerp(oldA, oldB, v));
}

math.remapPoint = (oldBound, newBound, point ) => {
    return [
        math.remap(oldBound.left, oldBound.right, newBound.left, newBound.right,point[0]),
        math.remap(oldBound.top, oldBound.bottom, newBound.top, newBound.bottom, point[1])
    ];
}


math.formatNumber = (n , dec=0)=>{
    return n.toFixed(dec);
}