vdversion = '7014.2018.0222.1151';
var X = 0;
var Y = 1;
var Z = 2;
var B = 3;
var W = 3;
var INDEX = 3;
var A00 = 0;
var A01 = 1;
var A02 = 2;
var A03 = 3;
var A10 = 4;
var A11 = 5;
var A12 = 6;
var A13 = 7;
var A20 = 8;
var A21 = 9;
var A22 = 10;
var A23 = 11;
var A30 = 12;
var A31 = 13;
var A32 = 14;
var A33 = 15;
var vdgeo = {};
vdgeo.vd_wl = function(number, precision) {
    var ret = '';
    if (precision) ret = number.toFixed(precision);
    else ret = number.toString();
    var i = ret.length - 1;
    while (i > 0 && ret[i] == '0') i--;
    if (i > 0 && ret[i] == '.') i--;
    ret = ret.substr(0, i + 1);
    return ret;
};
vdgeo.vd_sa = function(point, precision) {
    var ret = "";
    for (var i = 0; i < point.length; i++) {
        ret += vdgeo.vd_wl(point[i], precision);
        if (i != point.length - 1) ret += ",";
    }
    return ret;
};
vdgeo.vd_sK = function(point) {
    var pt = [0, 0, 0];
    var vd_yw = point.split(",");
    for (var i = 0; i < vd_yw.length; i++) {
        pt[i] = Number(vd_yw[i]);
    }
    return pt;
};
vdgeo.newpoint = function(x, y, z) {
    return [x, y, z];
};
vdgeo.vd_BG = function(x, y, z, i) {
    return [x, y, z, i];
};
vdgeo.newvertex = function(x, y, z, vd_hA) {
    return [x, y, z, vd_hA];
};
vdgeo.pointPolar = function(pt, ang, dst) {
    ang = vdgeo.FixAngle(ang);
    return vdgeo.newpoint(Math.cos(ang) * dst + pt[X], Math.sin(ang) * dst + pt[Y], pt[Z]);
};
vdgeo.vd_HT = function(pt, x, y, z) {
    pt[X] += x;
    pt[Y] += y;
    pt[Z] += z;
};
vdgeo.vd_hS = function(pt, x, y, z, w) {
    pt[X] = x;
    pt[Y] = y;
    pt[Z] = z;
    pt[W] = w;
};
vdgeo.MidPoint = function(p1, p2) {
    return vdgeo.newpoint((p1[X] + p2[X]) / 2.0, (p1[Y] + p2[Y]) / 2.0, (p1[Z] + p2[Z]) / 2.0);
};
vdgeo.Distance2D = function(p1, p2) {
    return Math.sqrt((p1[X] - p2[X]) * (p1[X] - p2[X]) + (p1[Y] - p2[Y]) * (p1[Y] - p2[Y]));
};
vdgeo.Distance3D = function(p1, p2) {
    return Math.sqrt((p1[X] - p2[X]) * (p1[X] - p2[X]) + (p1[Y] - p2[Y]) * (p1[Y] - p2[Y]) + (p1[Z] - p2[Z]) * (p1[Z] - p2[Z]));
};
vdgeo.vd_cM = function(dest, source) {
    dest[X] = source[X];
    dest[Y] = source[Y];
    dest[Z] = source[Z];
    dest[W] = source[W];
};
vdgeo.vd_oe = function(pt, vd_vL, dir, dist) {
    pt[X] = vd_vL[X] + dir[X] * dist;
    pt[Y] = vd_vL[Y] + dir[Y] * dist;
    pt[Z] = vd_vL[Z] + dir[Z] * dist;
};
vdgeo.vd_AX = function(pt, val) {
    return vdgeo.newpoint(pt[X] * val, pt[Y] * val, pt[Z] * val);
};
vdgeo.GetAngle = function(p1, p2) {
    if (vdgeo.AreEqual(vdgeo.Distance2D(p1, p2), 0.0, vdgeo.DefaultLinearEquality)) return 0.0;
    return vdgeo.FixAngle(Math.atan2(p2[Y] - p1[Y], p2[X] - p1[X]));
};
vdgeo.VectorDirection = function(p1, p2) {
    var v = vdgeo.newpoint(p2[X] - p1[X], p2[Y] - p1[Y], p2[Z] - p1[Z]);
    vdgeo.vd_cq(v);
    return v;
};
vdgeo.vd_el = function(v, other) {
    return (v[X] * other[X] + v[Y] * other[Y] + v[Z] * other[Z]);
};
vdgeo.vd_ld = function(v) {
    return Math.sqrt(vdgeo.vd_el(v, v));
};
vdgeo.vd_yX = function(vec) {
    var v = vdgeo.newpoint(vec[X], vec[Y], vec[Z]);
    vdgeo.vd_cq(v);
    var sa = 0.0;
    if (vdgeo.AreEqual(v[X], 0, vdgeo.DefaultLinearEquality)) {
        if (v[Y] > 0.0) {
            sa = vdgeo.HALF_PI;
        } else {
            sa = 3.0 * vdgeo.HALF_PI;
        }
    } else if (vdgeo.AreEqual(v[Y], 0, vdgeo.DefaultLinearEquality)) {
        if (v[X] > 0.0) {
            sa = 0.0;
        } else {
            sa = vdgeo.PI;
        }
    } else {
        sa = Math.atan(Math.abs(v[Y]) / Math.abs(v[X]));
        if (v[Y] > 0.0 && v[X] < 0.0) {
            sa = vdgeo.PI - sa;
        } else if (v[Y] < 0.0 && v[X] < 0.0) {
            sa = vdgeo.PI + sa;
        } else if (v[Y] < 0.0 && v[X] > 0.0) {
            sa = vdgeo.VD_TWOPI - sa;
        }
    }
    return sa;
};
vdgeo.vd_cq = function(v) {
    var l = vdgeo.vd_ld(v);
    if (vdgeo.AreEqual(l, 0.0, vdgeo.DefaultVectorEquality)) {
        v[X] = 0.0;
        v[Y] = 0.0;
        v[Z] = 1.0;
        return false;
    }
    v[X] /= l;
    v[Y] /= l;
    v[Z] /= l;
    return true;
};
vdgeo.vd_Am = function(v1, v2, v) {
    v[X] = v1[Y] * v2[Z] - v2[Y] * v1[Z];
    v[Y] = v1[Z] * v2[X] - v2[Z] * v1[X];
    v[Z] = v1[X] * v2[Y] - v2[X] * v1[Y];
};
vdgeo.vd_ke = function(v1, v2) {
    var v = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_Am(v1, v2, v);
    return v;
};
vdgeo.vd_lX = function(p1, p2, p3, v) {
    var A = vdgeo.newpoint(p2[X] - p1[X], p2[Y] - p1[Y], p2[Z] - p1[Z]);
    var B = vdgeo.newpoint(p3[X] - p1[X], p3[Y] - p1[Y], p3[Z] - p1[Z]);
    vdgeo.vd_Am(A, B, v);
    if (!vdgeo.vd_cq(v)) return false;
    return true;
};
vdgeo.vd_ES = function(p1, p2, p3) {
    var v = vdgeo.newpoint(0, 0, 0);
    if (!vdgeo.vd_lX(p1, p2, p3, v)) return null;
    return v;
};
vdgeo.vd_IP = function(p1, p2, p3, p4) {
    if (vdgeo.vd_eX(p1, p2, vdgeo.vd_os)) return 1;
    if (vdgeo.vd_eX(p2, p3, vdgeo.vd_os)) return 2;
    if (vdgeo.vd_eX(p3, p4, vdgeo.vd_os)) return 3;
    if (vdgeo.vd_eX(p4, p1, vdgeo.vd_os)) return 4;
    return 0;
};
vdgeo.vd_FU = function(p1, p2, p3, p4, v) {
    var olap = vdgeo.vd_IP(p1, p2, p3, p4);
    switch (olap) {
    case 0:
        return vdgeo.vd_lX(p1, p2, p3, v);
    case 1:
        return vdgeo.vd_lX(p2, p3, p4, v);
    case 2:
        return vdgeo.vd_lX(p1, p3, p4, v);
    case 3:
        return vdgeo.vd_lX(p1, p2, p4, v);
    case 4:
        return vdgeo.vd_lX(p1, p2, p3, v);
    }
    return false;
};
vdgeo.vd_LO = function(mat) {
    return [mat[A00], mat[A10], mat[A20], mat[A30], mat[A01], mat[A11], mat[A21], mat[A31], mat[A02], mat[A12], mat[A22], mat[A32], mat[A03], mat[A13], mat[A23], mat[A33]];
};
vdgeo.vd_No = function(vd_sP, pvTo) {
    var vA = vdgeo.newpoint(vd_sP[X], vd_sP[Y], vd_sP[Z]);
    var vB = vdgeo.newpoint(pvTo[X], pvTo[Y], pvTo[Z]);
    vdgeo.vd_cq(vA);
    vdgeo.vd_cq(vB);
    var vd_wP = vdgeo.newpoint(vA[X] + vB[X], vA[Y] + vB[Y], vA[Z] + vB[Z]);
    vdgeo.vd_cq(vd_wP);
    var vOut = vdgeo.vd_ke(vA, vd_wP);
    var x = vOut[X];
    var y = vOut[Y];
    var z = vOut[Z];
    var w = vdgeo.vd_el(vA, vd_wP);
    return [x, y, z, w];
};
vdgeo.vd_KC = function(q) {
    var x = q[X];
    var y = q[Y];
    var z = q[Z];
    var w = q[W];
    var vd_lC = 0.0;
    var vd_ko = 0.0;
    var bank = 0.0;
    var test = x * y + z * w;
    if (test > 0.499) {
        vd_lC = 2 * Math.atan2(x, w);
        vd_ko = vdgeo.PI / 2;
        bank = 0;
        return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_lC), vdgeo.FixAngle(vd_ko)];
    }
    if (test < -0.499) {
        vd_lC = -2 * Math.atan2(x, w);
        vd_ko = -vdgeo.PI / 2;
        bank = 0;
        return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_lC), vdgeo.FixAngle(vd_ko)];
    }
    var sqx = x * x;
    var sqy = y * y;
    var sqz = z * z;
    vd_lC = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz);
    vd_ko = Math.asin(2 * test);
    bank = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz);
    return [vdgeo.FixAngle(bank), vdgeo.FixAngle(vd_lC), vdgeo.FixAngle(vd_ko)];
};
vdgeo.vd_s = function() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};
vdgeo.vd_bY = function(m) {
    var ret = vdgeo.vd_s();
    vdgeo.vd_qX(ret, m);
    return ret;
};
vdgeo.vd_LH = function(m, precision) {
    if (precision == undefined) precision = 10;
    return "[" + m[A00].toFixed(precision) + "," + m[A01].toFixed(precision) + "," + m[A02].toFixed(precision) + "," + m[A03].toFixed(precision) + "," + m[A10].toFixed(precision) + "," + m[A11].toFixed(precision) + "," + m[A12].toFixed(precision) + "," + m[A13].toFixed(precision) + "," + m[A20].toFixed(precision) + "," + m[A21].toFixed(precision) + "," + m[A22].toFixed(precision) + "," + m[A23].toFixed(precision) + "," + m[A30].toFixed(precision) + "," + m[A31].toFixed(precision) + "," + m[A32].toFixed(precision) + "," + m[A33].toFixed(precision) + "]";
};
vdgeo.vd_MB = function(m, precision) {
    if (precision == undefined) precision = 10;
    m[A00] = Number(m[A00].toFixed(precision));
    m[A01] = Number(m[A01].toFixed(precision));
    m[A02] = Number(m[A02].toFixed(precision));
    m[A03] = Number(m[A03].toFixed(precision));
    m[A10] = Number(m[A10].toFixed(precision));
    m[A11] = Number(m[A11].toFixed(precision));
    m[A12] = Number(m[A12].toFixed(precision));
    m[A13] = Number(m[A13].toFixed(precision));
    m[A20] = Number(m[A20].toFixed(precision));
    m[A21] = Number(m[A21].toFixed(precision));
    m[A22] = Number(m[A22].toFixed(precision));
    m[A23] = Number(m[A23].toFixed(precision));
    m[A30] = Number(m[A30].toFixed(precision));
    m[A31] = Number(m[A31].toFixed(precision));
    m[A32] = Number(m[A32].toFixed(precision));
    m[A33] = Number(m[A33].toFixed(precision));
};
vdgeo.vd_fn = function(m) {
    m[A00] = 1.0;
    m[A01] = 0.0;
    m[A02] = 0.0;
    m[A03] = 0.0;
    m[A10] = 0.0;
    m[A11] = 1.0;
    m[A12] = 0.0;
    m[A13] = 0.0;
    m[A20] = 0.0;
    m[A21] = 0.0;
    m[A22] = 1.0;
    m[A23] = 0.0;
    m[A30] = 0.0;
    m[A31] = 0.0;
    m[A32] = 0.0;
    m[A33] = 1.0;
};
vdgeo.vd_qX = function(m, from) {
    m[A00] = from[A00];
    m[A01] = from[A01];
    m[A02] = from[A02];
    m[A03] = from[A03];
    m[A10] = from[A10];
    m[A11] = from[A11];
    m[A12] = from[A12];
    m[A13] = from[A13];
    m[A20] = from[A20];
    m[A21] = from[A21];
    m[A22] = from[A22];
    m[A23] = from[A23];
    m[A30] = from[A30];
    m[A31] = from[A31];
    m[A32] = from[A32];
    m[A33] = from[A33];
};
vdgeo.vd_fs = function(m, mat) {
    if (vdgeo.vd_zE(m) && vdgeo.vd_zE(mat)) {
        vdgeo.vd_Ib(m, mat);
        return;
    }
    if (vdgeo.vd_rv(m)) {
        vdgeo.vd_qX(m, mat);
        return;
    }
    if (vdgeo.vd_rv(mat)) {
        return;
    }
    var a_00 = m[A00] * mat[A00] + m[A10] * mat[A01] + m[A20] * mat[A02] + m[A30] * mat[A03];
    var a_01 = m[A01] * mat[A00] + m[A11] * mat[A01] + m[A21] * mat[A02] + m[A31] * mat[A03];
    var a_02 = m[A02] * mat[A00] + m[A12] * mat[A01] + m[A22] * mat[A02] + m[A32] * mat[A03];
    var a_03 = m[A03] * mat[A00] + m[A13] * mat[A01] + m[A23] * mat[A02] + m[A33] * mat[A03];
    var a_10 = m[A00] * mat[A10] + m[A10] * mat[A11] + m[A20] * mat[A12] + m[A30] * mat[A13];
    var a_11 = m[A01] * mat[A10] + m[A11] * mat[A11] + m[A21] * mat[A12] + m[A31] * mat[A13];
    var a_12 = m[A02] * mat[A10] + m[A12] * mat[A11] + m[A22] * mat[A12] + m[A32] * mat[A13];
    var a_13 = m[A03] * mat[A10] + m[A13] * mat[A11] + m[A23] * mat[A12] + m[A33] * mat[A13];
    var a_20 = m[A00] * mat[A20] + m[A10] * mat[A21] + m[A20] * mat[A22] + m[A30] * mat[A23];
    var a_21 = m[A01] * mat[A20] + m[A11] * mat[A21] + m[A21] * mat[A22] + m[A31] * mat[A23];
    var a_22 = m[A02] * mat[A20] + m[A12] * mat[A21] + m[A22] * mat[A22] + m[A32] * mat[A23];
    var a_23 = m[A03] * mat[A20] + m[A13] * mat[A21] + m[A23] * mat[A22] + m[A33] * mat[A23];
    var a_30 = m[A00] * mat[A30] + m[A10] * mat[A31] + m[A20] * mat[A32] + m[A30] * mat[A33];
    var a_31 = m[A01] * mat[A30] + m[A11] * mat[A31] + m[A21] * mat[A32] + m[A31] * mat[A33];
    var a_32 = m[A02] * mat[A30] + m[A12] * mat[A31] + m[A22] * mat[A32] + m[A32] * mat[A33];
    var a_33 = m[A03] * mat[A30] + m[A13] * mat[A31] + m[A23] * mat[A32] + m[A33] * mat[A33];
    m[A00] = a_00;
    m[A01] = a_01;
    m[A02] = a_02;
    m[A03] = a_03;
    m[A10] = a_10;
    m[A11] = a_11;
    m[A12] = a_12;
    m[A13] = a_13;
    m[A20] = a_20;
    m[A21] = a_21;
    m[A22] = a_22;
    m[A23] = a_23;
    m[A30] = a_30;
    m[A31] = a_31;
    m[A32] = a_32;
    m[A33] = a_33;
};
vdgeo.vd_rv = function(m) {
    return (m[A00] === 1.0 && m[A01] === 0.0 && m[A02] === 0.0 && m[A03] === 0.0 && m[A10] === 0.0 && m[A11] === 1.0 && m[A12] === 0.0 && m[A13] === 0.0 && m[A20] === 0.0 && m[A21] === 0.0 && m[A22] === 1.0 && m[A23] === 0.0 && m[A30] === 0.0 && m[A31] === 0.0 && m[A32] === 0.0 && m[A33] === 1.0);
};
vdgeo.vd_oH = function(m) {
    var m_N = vdgeo.vd_ke(vdgeo.vd_ll(m), vdgeo.vd_AU(m));
    var m_A = vdgeo.vd_el(m_N, m_N);
    if (( - vdgeo.EPSILON) < m_A && m_A < vdgeo.EPSILON) return false;
    return (vdgeo.vd_el(m_N, vdgeo.vd_ip(m)) < 0.0 ? true: false);
};
vdgeo.vd_ll = function(m) {
    return vdgeo.newpoint(m[A00], m[A10], m[A20]);
};
vdgeo.vd_AU = function(m) {
    return vdgeo.newpoint(m[A01], m[A11], m[A21]);
};
vdgeo.vd_ip = function(m) {
    return vdgeo.newpoint(m[A02], m[A12], m[A22]);
};
vdgeo.vd_Ie = function(m) {
    return vdgeo.newpoint(m[A03], m[A13], m[A23]);
};
vdgeo.vd_kv = function(m) {
    return vdgeo.newpoint(vdgeo.vd_ld(vdgeo.vd_ll(m)), vdgeo.vd_ld(vdgeo.vd_AU(m)), vdgeo.vd_ld(vdgeo.vd_ip(m)));
};
vdgeo.vd_lt = function(m) {
    var zdir = vdgeo.vd_ip(m);
    if (vdgeo.AreEqual(zdir[X], 0, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(zdir[Y], 0, vdgeo.DefaultVectorEquality)) return vdgeo.vd_yX(vdgeo.vd_ll(m));
    var offset = vdgeo.vd_Ie(m);
    var _mat = vdgeo.vd_bY(m);
    vdgeo.vd_ae(_mat, -offset[X], -offset[Y], -offset[Z]);
    vdgeo.vd_hN(_mat, zdir);
    return vdgeo.vd_yX(vdgeo.vd_ll(_mat));
};
vdgeo.vd_zE = function(m) {
    return (m[A02] === 0.0 && m[A12] === 0.0 && m[A20] === 0.0 && m[A21] === 0.0 && m[A23] === 0.0 && m[A32] === 0.0);
};
vdgeo.vd_Ib = function(m, mat) {
    var a_00 = m[A00] * mat[A00] + m[A10] * mat[A01] + m[A30] * mat[A03];
    var a_01 = m[A01] * mat[A00] + m[A11] * mat[A01] + m[A31] * mat[A03];
    var a_03 = m[A03] * mat[A00] + m[A13] * mat[A01] + m[A33] * mat[A03];
    var a_10 = m[A00] * mat[A10] + m[A10] * mat[A11] + m[A30] * mat[A13];
    var a_11 = m[A01] * mat[A10] + m[A11] * mat[A11] + m[A31] * mat[A13];
    var a_13 = m[A03] * mat[A10] + m[A13] * mat[A11] + m[A33] * mat[A13];
    var a_22 = m[A22] * mat[A22];
    var a_30 = m[A00] * mat[A30] + m[A10] * mat[A31] + m[A30] * mat[A33];
    var a_31 = m[A01] * mat[A30] + m[A11] * mat[A31] + m[A31] * mat[A33];
    var a_33 = m[A03] * mat[A30] + m[A13] * mat[A31] + m[A33] * mat[A33];
    m[A00] = a_00;
    m[A01] = a_01;
    m[A02] = 0;
    m[A03] = a_03;
    m[A10] = a_10;
    m[A11] = a_11;
    m[A12] = 0;
    m[A13] = a_13;
    m[A20] = 0;
    m[A21] = 0;
    m[A22] = a_22;
    m[A23] = 0;
    m[A30] = a_30;
    m[A31] = a_31;
    m[A32] = 0;
    m[A33] = a_33;
};
vdgeo.vd_Hp = function(m) {
    return (m[A03] * m[A12] * m[A21] * m[A30] - m[A02] * m[A13] * m[A21] * m[A30] - m[A03] * m[A11] * m[A22] * m[A30] + m[A01] * m[A13] * m[A22] * m[A30] + m[A02] * m[A11] * m[A23] * m[A30] - m[A01] * m[A12] * m[A23] * m[A30] - m[A03] * m[A12] * m[A20] * m[A31] + m[A02] * m[A13] * m[A20] * m[A31] + m[A03] * m[A10] * m[A22] * m[A31] - m[A00] * m[A13] * m[A22] * m[A31] - m[A02] * m[A10] * m[A23] * m[A31] + m[A00] * m[A12] * m[A23] * m[A31] + m[A03] * m[A11] * m[A20] * m[A32] - m[A01] * m[A13] * m[A20] * m[A32] - m[A03] * m[A10] * m[A21] * m[A32] + m[A00] * m[A13] * m[A21] * m[A32] + m[A01] * m[A10] * m[A23] * m[A32] - m[A00] * m[A11] * m[A23] * m[A32] - m[A02] * m[A11] * m[A20] * m[A33] + m[A01] * m[A12] * m[A20] * m[A33] + m[A02] * m[A10] * m[A21] * m[A33] - m[A00] * m[A12] * m[A21] * m[A33] - m[A01] * m[A10] * m[A22] * m[A33] + m[A00] * m[A11] * m[A22] * m[A33]);
};
vdgeo.vd_kW = function(m) {
    var det = vdgeo.vd_Hp(m);
    var t00 = m[A12] * m[A23] * m[A31] - m[A13] * m[A22] * m[A31] + m[A13] * m[A21] * m[A32] - m[A11] * m[A23] * m[A32] - m[A12] * m[A21] * m[A33] + m[A11] * m[A22] * m[A33];
    var t01 = m[A03] * m[A22] * m[A31] - m[A02] * m[A23] * m[A31] - m[A03] * m[A21] * m[A32] + m[A01] * m[A23] * m[A32] + m[A02] * m[A21] * m[A33] - m[A01] * m[A22] * m[A33];
    var t02 = m[A02] * m[A13] * m[A31] - m[A03] * m[A12] * m[A31] + m[A03] * m[A11] * m[A32] - m[A01] * m[A13] * m[A32] - m[A02] * m[A11] * m[A33] + m[A01] * m[A12] * m[A33];
    var t03 = m[A03] * m[A12] * m[A21] - m[A02] * m[A13] * m[A21] - m[A03] * m[A11] * m[A22] + m[A01] * m[A13] * m[A22] + m[A02] * m[A11] * m[A23] - m[A01] * m[A12] * m[A23];
    var t10 = m[A13] * m[A22] * m[A30] - m[A12] * m[A23] * m[A30] - m[A13] * m[A20] * m[A32] + m[A10] * m[A23] * m[A32] + m[A12] * m[A20] * m[A33] - m[A10] * m[A22] * m[A33];
    var t11 = m[A02] * m[A23] * m[A30] - m[A03] * m[A22] * m[A30] + m[A03] * m[A20] * m[A32] - m[A00] * m[A23] * m[A32] - m[A02] * m[A20] * m[A33] + m[A00] * m[A22] * m[A33];
    var t12 = m[A03] * m[A12] * m[A30] - m[A02] * m[A13] * m[A30] - m[A03] * m[A10] * m[A32] + m[A00] * m[A13] * m[A32] + m[A02] * m[A10] * m[A33] - m[A00] * m[A12] * m[A33];
    var t13 = m[A02] * m[A13] * m[A20] - m[A03] * m[A12] * m[A20] + m[A03] * m[A10] * m[A22] - m[A00] * m[A13] * m[A22] - m[A02] * m[A10] * m[A23] + m[A00] * m[A12] * m[A23];
    var t20 = m[A11] * m[A23] * m[A30] - m[A13] * m[A21] * m[A30] + m[A13] * m[A20] * m[A31] - m[A10] * m[A23] * m[A31] - m[A11] * m[A20] * m[A33] + m[A10] * m[A21] * m[A33];
    var t21 = m[A03] * m[A21] * m[A30] - m[A01] * m[A23] * m[A30] - m[A03] * m[A20] * m[A31] + m[A00] * m[A23] * m[A31] + m[A01] * m[A20] * m[A33] - m[A00] * m[A21] * m[A33];
    var t22 = m[A01] * m[A13] * m[A30] - m[A03] * m[A11] * m[A30] + m[A03] * m[A10] * m[A31] - m[A00] * m[A13] * m[A31] - m[A01] * m[A10] * m[A33] + m[A00] * m[A11] * m[A33];
    var t23 = m[A03] * m[A11] * m[A20] - m[A01] * m[A13] * m[A20] - m[A03] * m[A10] * m[A21] + m[A00] * m[A13] * m[A21] + m[A01] * m[A10] * m[A23] - m[A00] * m[A11] * m[A23];
    var t30 = m[A12] * m[A21] * m[A30] - m[A11] * m[A22] * m[A30] - m[A12] * m[A20] * m[A31] + m[A10] * m[A22] * m[A31] + m[A11] * m[A20] * m[A32] - m[A10] * m[A21] * m[A32];
    var t31 = m[A01] * m[A22] * m[A30] - m[A02] * m[A21] * m[A30] + m[A02] * m[A20] * m[A31] - m[A00] * m[A22] * m[A31] - m[A01] * m[A20] * m[A32] + m[A00] * m[A21] * m[A32];
    var t32 = m[A02] * m[A11] * m[A30] - m[A01] * m[A12] * m[A30] - m[A02] * m[A10] * m[A31] + m[A00] * m[A12] * m[A31] + m[A01] * m[A10] * m[A32] - m[A00] * m[A11] * m[A32];
    var t33 = m[A01] * m[A12] * m[A20] - m[A02] * m[A11] * m[A20] + m[A02] * m[A10] * m[A21] - m[A00] * m[A12] * m[A21] - m[A01] * m[A10] * m[A22] + m[A00] * m[A11] * m[A22];
    var vd_bX = 1.0 / det;
    m[A00] = t00 * vd_bX;
    m[A01] = t01 * vd_bX;
    m[A02] = t02 * vd_bX;
    m[A03] = t03 * vd_bX;
    m[A10] = t10 * vd_bX;
    m[A11] = t11 * vd_bX;
    m[A12] = t12 * vd_bX;
    m[A13] = t13 * vd_bX;
    m[A20] = t20 * vd_bX;
    m[A21] = t21 * vd_bX;
    m[A22] = t22 * vd_bX;
    m[A23] = t23 * vd_bX;
    m[A30] = t30 * vd_bX;
    m[A31] = t31 * vd_bX;
    m[A32] = t32 * vd_bX;
    m[A33] = t33 * vd_bX;
};
vdgeo.vd_bo = function(m) {
    var ret = vdgeo.vd_bY(m);
    vdgeo.vd_kW(ret);
    return ret;
};
vdgeo.vd_AA = function(x0, y0, x1, y1) {
    var mat = vdgeo.vd_s();
    vdgeo.vd_ay(mat, 1.0 / (x1 - x0), 1.0 / (y1 - y0), 1.0);
    vdgeo.vd_ae(mat, x0, y0, 0);
    return mat;
};
vdgeo.vd_ae = function(m, dx, dy, dz) {
    if (dx === 0.0 && dy === 0.0 && dz === 0.0) return;
    var mat = vdgeo.vd_s();
    mat[A03] = dx;
    mat[A13] = dy;
    mat[A23] = dz;
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_ay = function(m, a, b, c) {
    if (a === 1.0 && b === 1.0 && c === 1.0) return;
    var mat = vdgeo.vd_s();
    mat[A00] = a;
    mat[A11] = b;
    mat[A22] = c;
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_ag = function(m, rads) {
    if (rads === 0.0) return;
    var mat = vdgeo.vd_s();
    var vd_cB, sine;
    vd_cB = Math.cos(rads);
    sine = Math.sin(rads);
    mat[A00] = vd_cB;
    mat[A11] = vd_cB;
    mat[A01] = -sine;
    mat[A10] = sine;
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_Hk = function(m, rads) {
    if (rads === 0.0) return;
    var mat = vdgeo.vd_s();
    var vd_cB, sine;
    vd_cB = Math.cos(rads);
    sine = Math.sin(rads);
    mat[A11] = vd_cB;
    mat[A22] = vd_cB;
    mat[A12] = -sine;
    mat[A21] = sine;
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_GT = function(m, rads) {
    if (rads === 0.0) return;
    var mat = vdgeo.vd_s();
    var vd_cB, sine;
    vd_cB = Math.cos(rads);
    sine = Math.sin(rads);
    mat[A00] = vd_cB;
    mat[A22] = vd_cB;
    mat[A02] = sine;
    mat[A20] = -sine;
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_AE = function(m, Sx, Sy) {
    if (Sx === 0.0 && Sy === 0.0) return;
    var mat = vdgeo.vd_s();
    mat[A01] = Math.tan(Sx);
    mat[A10] = Math.tan(Sy);
    vdgeo.vd_fs(m, mat);
};
var vd_BO = 0.015625;
vdgeo.vd_HX = function(m, vd_iS, vd_vq) {
    var vd_cZ = vdgeo.newpoint(vd_iS[X], vd_iS[Y], vd_iS[Z]);
    vdgeo.vd_cq(vd_cZ);
    var vd_dT = vdgeo.newpoint(vd_vq[X], vd_vq[Y], vd_vq[Z]);
    vdgeo.vd_cq(vd_dT);
    var vd_hr = vdgeo.vd_ke(vd_cZ, vd_dT);
    vdgeo.vd_cq(vd_hr);
    var mat = vdgeo.vd_s();
    mat[A00] = vd_dT[X];
    mat[A01] = vd_hr[X];
    mat[A02] = vd_cZ[X];
    mat[A10] = vd_dT[Y];
    mat[A11] = vd_hr[Y];
    mat[A12] = vd_cZ[Y];
    mat[A20] = vd_dT[Z];
    mat[A21] = vd_hr[Z];
    mat[A22] = vd_cZ[Z];
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_cx = function(m, vd_iS) {
    if (vd_iS == undefined) return;
    var vd_cZ = vdgeo.newpoint(vd_iS[X], vd_iS[Y], vd_iS[Z]);
    vdgeo.vd_cq(vd_cZ);
    if (vd_cZ[X] === 0.0 && vd_cZ[Y] === 0.0 && vd_cZ[Z] === 1.0) return;
    var vd_dT;
    var vd_hr;
    var Wy = vdgeo.newpoint(0.0, 1.0, 0.0);
    var Wz = vdgeo.newpoint(0.0, 0.0, 1.0);
    if ((Math.abs(vd_cZ[X]) < vd_BO) && (Math.abs(vd_cZ[Y]) < vd_BO)) vd_dT = vdgeo.vd_ke(Wy, vd_cZ);
    else vd_dT = vdgeo.vd_ke(Wz, vd_cZ);
    vdgeo.vd_cq(vd_dT);
    vd_hr = vdgeo.vd_ke(vd_cZ, vd_dT);
    vdgeo.vd_cq(vd_hr);
    var mat = vdgeo.vd_s();
    mat[A00] = vd_dT[X];
    mat[A01] = vd_hr[X];
    mat[A02] = vd_cZ[X];
    mat[A10] = vd_dT[Y];
    mat[A11] = vd_hr[Y];
    mat[A12] = vd_cZ[Y];
    mat[A20] = vd_dT[Z];
    mat[A21] = vd_hr[Z];
    mat[A22] = vd_cZ[Z];
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_hN = function(m, vd_cZ) {
    var mat = vdgeo.vd_s();
    vdgeo.vd_cx(mat, vd_cZ);
    vdgeo.vd_kW(mat);
    vdgeo.vd_fs(m, mat);
};
vdgeo.vd_IC = function(m, axis, rotation) {
    vdgeo.vd_hN(m, axis);
    vdgeo.vd_ag(m, rotation);
    vdgeo.vd_cx(m, axis);
};
vdgeo.vd_MP = function(m, vd_Is, vd_GP, vd_qp, vd_rG) {
    vdgeo.vd_fn(m);
    vdgeo.vd_ay(m, vd_qp * 0.5, vd_rG * 0.5, 1);
    vdgeo.vd_ae(m, -vd_qp * 0.5 + vd_Is, -vd_rG * 0.5 + vd_GP, 0);
};
vdgeo.vd_HJ = function(m, vd_c, vd_aU, vd_sX, near, far) {
    var width = vd_aU * vd_sX;
    var left = vd_c[X] - width * 0.5;
    var right = vd_c[X] + width * 0.5;
    var top = vd_c[Y] + vd_aU * 0.5;
    var bottom = vd_c[Y] - vd_aU * 0.5;
    vdgeo.vd_fn(m);
    m[A00] = 2.0 / (right - left);
    m[A03] = -(right + left) / (right - left);
    m[A11] = 2.0 / (top - bottom);
    m[A13] = -(top + bottom) / (top - bottom);
    m[A22] = -2.0 / (far - near);
    m[A23] = -(far + near) / (far - near);
    m[A32] = 0.0;
    m[A33] = 1.0;
};
vdgeo.vd_HK = function(m, vd_sX, far, FocalLength, LensAngle) {
    var near = FocalLength;
    near = Math.max(near, 0.001);
    far = Math.max(near + 0.001, far);
    var vd_kH = 2.0 * FocalLength * Math.tan(vdgeo.DegreesToRadians(LensAngle / 2.0));
    var top = vd_kH * 0.5;
    var bottom = -top;
    var right = vd_sX * top;
    var left = -right;
    vdgeo.vd_fn(m);
    m[A00] = 2.0 * near / (right - left);
    m[A02] = (right + left) / (right - left);
    m[A11] = 2.0 * near / (top - bottom);
    m[A12] = (top + bottom) / (top - bottom);
    m[A22] = -(far + near) / (far - near);
    m[A23] = -2.0 * far * near / (far - near);
    m[A32] = -1.0;
    m[A33] = 0.0;
};
vdgeo.vd_HG = function(p1, p2) {
    var z1 = p1[Z];
    var z2 = p2[Z];
    if (z1 < 0 && z2 < 0) return false;
    if (z1 < 0 || z2 < 0) {
        var gradient = ( - p1[Z]) / (p2[Z] - p1[Z]);
        var x = vdgeo.vd_aj(p1[X], p2[X], gradient);
        var y = vdgeo.vd_aj(p1[Y], p2[Y], gradient);
        var z = vdgeo.vd_aj(p1[Z], p2[Z], gradient);
        var w = vdgeo.vd_aj(p1[W], p2[W], gradient);
        if (z1 < 0) {
            p1[X] = x;
            p1[Y] = y;
            p1[Z] = 0;
            p1[W] = w;
        } else if (z2 < 0) {
            p2[X] = x;
            p2[Y] = y;
            p2[Z] = 0;
            p2[W] = w;
        }
    }
    if (p1[W]) {
        p1[X] /= p1[W];
        p1[Y] /= p1[W];
        p1[Z] /= p1[W];
    }
    if (p2[W]) {
        p2[X] /= p2[W];
        p2[Y] /= p2[W];
        p2[Z] /= p2[W];
    }
    return true;
};
vdgeo.vd_GZ = function(pts, uvs) {
    var i = 0,
    n = 0;
    var uv1, uv2, u, v, d, vd_fX;
    var p1, p2, z1, z2, x, y, z, w, gradient;
    var vd_bR = [];
    if (uvs) vd_fX = [];
    for (i = 0; i < pts.length; i++) {
        p1 = [pts[i][X], pts[i][Y], pts[i][Z], pts[i][W]];
        if (uvs) {
            uv1 = [uvs[i][X], uvs[i][Y], uvs[i][Z]];
        }
        n = i + 1;
        if (n === pts.length) n = 0;
        p2 = [pts[n][X], pts[n][Y], pts[n][Z], pts[n][W]];
        if (uvs) {
            uv2 = [uvs[n][X], uvs[n][Y], uvs[n][Z]];
        }
        z1 = p1[Z];
        z2 = p2[Z];
        if (z1 < 0 && z2 < 0) continue;
        if (z1 < 0 || z2 < 0) {
            gradient = ( - p1[Z]) / (p2[Z] - p1[Z]);
            x = vdgeo.vd_aj(p1[X], p2[X], gradient);
            y = vdgeo.vd_aj(p1[Y], p2[Y], gradient);
            z = vdgeo.vd_aj(p1[Z], p2[Z], gradient);
            w = vdgeo.vd_aj(p1[W], p2[W], gradient);
            if (uvs) {
                u = vdgeo.vd_kx(uv1[X], uv2[X], gradient);
                v = vdgeo.vd_kx(uv1[Y], uv2[Y], gradient);
                d = vdgeo.vd_kx(uv1[Z], uv2[Z], gradient);
            }
            if (z1 < 0) {
                p1[X] = x;
                p1[Y] = y;
                p1[Z] = z;
                p1[W] = w;
                if (uvs) {
                    uv1[X] = u;
                    uv1[Y] = v;
                    uv1[Z] = d;
                    vd_fX.push(uv1);
                }
                vd_bR.push(p1);
            } else if (z2 < 0) {
                p2[X] = x;
                p2[Y] = y;
                p2[Z] = z;
                p2[W] = w;
                if (uvs) {
                    uv2[X] = u;
                    uv2[Y] = v;
                    uv2[Z] = d;
                    vd_fX.push(uv1);
                    vd_fX.push(uv2);
                }
                vd_bR.push(p1);
                vd_bR.push(p2);
            }
        } else {
            vd_bR.push(p1);
            if (uvs) vd_fX.push(uv1);
        }
    }
    for (i = 0; i < vd_bR.length; i++) {
        if (vd_bR[i][W]) {
            vd_bR[i][X] /= vd_bR[i][W];
            vd_bR[i][Y] /= vd_bR[i][W];
            vd_bR[i][Z] /= vd_bR[i][W];
            if (uvs && vd_fX[i][Z] != 0) {
                vd_fX[i][X] /= vd_bR[i][W];
                vd_fX[i][Y] /= vd_bR[i][W];
                vd_fX[i][Z] /= vd_bR[i][W];
            }
        }
    }
    return [vd_bR, vd_fX];
};
vdgeo.vd_fj = function(x, y, z, projection, vd_bp) {
    vd_bp[X] = (x * projection[A00]) + (y * projection[A01]) + (z * projection[A02]) + projection[A03];
    vd_bp[Y] = (x * projection[A10]) + (y * projection[A11]) + (z * projection[A12]) + projection[A13];
    vd_bp[Z] = (x * projection[A20]) + (y * projection[A21]) + (z * projection[A22]) + projection[A23];
    vd_bp[W] = (x * projection[A30]) + (y * projection[A31]) + (z * projection[A32]) + projection[A33];
};
vdgeo.vd_as = function(x, y, z, projection) {
    var vd_bp = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_fj(x, y, z, projection, vd_bp);
    if (vd_bp[W]) {
        vd_bp[X] /= vd_bp[W];
        vd_bp[Y] /= vd_bp[W];
        vd_bp[Z] /= vd_bp[W];
    }
    return vd_bp;
};
vdgeo.vd_dU = function(pt, projection) {
    return vdgeo.vd_as(pt[X], pt[Y], pt[Z], projection);
};
vdgeo.vd_Ag = function(m) {
    if (vdgeo.AreEqual(m[A22], 0.0, vdgeo.DefaultVectorEquality)) return false;
    m[A20] = m[A21] = m[A23] = m[A02] = m[A12] = 0.0;
    return true;
};
vdgeo.vd_Om = function(m) {
    var ret = vdgeo.vd_bY(m);
    if (!vdgeo.vd_Ag(ret)) return null;
    return ret;
};
vdgeo.vd_rN = function(m, x, y, z) {
    return vdgeo.newpoint(m[A00] * x + m[A01] * y + m[A02] * z + m[A03], m[A10] * x + m[A11] * y + m[A12] * z + m[A13], m[A20] * x + m[A21] * y + m[A22] * z + m[A23]);
};
vdgeo.vd_sy = function(m, x, y, z, pt) {
    pt[X] = m[A00] * x + m[A01] * y + m[A02] * z + m[A03];
    pt[Y] = m[A10] * x + m[A11] * y + m[A12] * z + m[A13];
    pt[Z] = m[A20] * x + m[A21] * y + m[A22] * z + m[A23];
};
vdgeo.vd_Z = function(m, pt) {
    return vdgeo.vd_rN(m, pt[X], pt[Y], pt[Z]);
};
vdgeo.vd_ei = function(m, pt, vd_bQ) {
    vd_bQ[X] = m[A00] * pt[X] + m[A01] * pt[Y] + m[A02] * pt[Z] + m[A03];
    vd_bQ[Y] = m[A10] * pt[X] + m[A11] * pt[Y] + m[A12] * pt[Z] + m[A13];
    vd_bQ[Z] = m[A20] * pt[X] + m[A21] * pt[Y] + m[A22] * pt[Z] + m[A23];
};
vdgeo.vd_HC = function(m, x, y, z, vd_bQ) {
    vd_bQ[X] = m[A00] * x + m[A01] * y + m[A02] * z + m[A03];
    vd_bQ[Y] = m[A10] * x + m[A11] * y + m[A12] * z + m[A13];
};
vdgeo.vd_iZ = function(m, x, y, z, normalize) {
    var v = vdgeo.newpoint();
    vdgeo.vd_me(m, x, y, z, v, normalize);
    return v;
};
vdgeo.vd_me = function(m, x, y, z, v, normalize) {
    v[X] = m[A00] * x + m[A01] * y + m[A02] * z;
    v[Y] = m[A10] * x + m[A11] * y + m[A12] * z;
    v[Z] = m[A20] * x + m[A21] * y + m[A22] * z;
    if (normalize === true) vdgeo.vd_cq(v);
};
vdgeo.vd_pz = function(m, pt, vd_mh) {
    var ret = [0, 0, 0, 0];
    ret[X] = m[A00] * pt[X] + m[A01] * pt[Y] + m[A02] * pt[Z] + m[A03];
    ret[Y] = m[A10] * pt[X] + m[A11] * pt[Y] + m[A12] * pt[Z] + m[A13];
    ret[Z] = m[A20] * pt[X] + m[A21] * pt[Y] + m[A22] * pt[Z] + m[A23];
    if (vd_mh == undefined) vd_mh = vdgeo.vd_oH(m);
    ret[B] = pt[B] * (vd_mh ? -1.0 : 1.0);
    return ret;
};
vdgeo.vd_qE = function(m, pts) {
    var vd_mh = vdgeo.vd_oH(m);
    var ret = [];
    for (var i = 0; i < pts.length; i++) {
        ret.push(vdgeo.vd_pz(m, pts[i], vd_mh));
    }
    return ret;
};
vdgeo.vd_zH = function(m, x, y, vd_bQ) {
    vd_bQ[X] = m[A00] * x + m[A01] * y + m[A03];
    vd_bQ[Y] = m[A10] * x + m[A11] * y + m[A13];
};
vdgeo.vd_hz = function(m, pts) {
    var ret = [];
    for (var i = 0; i < pts.length; i++) {
        ret.push(vdgeo.vd_Z(m, pts[i]));
    }
    return ret;
};
vdgeo.vd_Md = function(m, pts) {
    var ret = [];
    ret.length = pts.length;
    for (var i = 0; i < pts.length; i++) {
        ret[i] = vdgeo.newpoint(m[A00] * pts[i][X] + m[A01] * pts[i][Y] + m[A02] * pts[i][Z] + m[A03], m[A10] * pts[i][X] + m[A11] * pts[i][Y] + m[A12] * pts[i][Z] + m[A13]);
    }
    return ret;
};
vdgeo.vd_Fy = function(box) {
    return vdgeo.MidPoint([box[0], box[1], box[2]], [box[3], box[4], box[5]]);
};
vdgeo.vd_qd = function(m, box) {
    var b1 = vdgeo.vd_Z(m, vdgeo.newpoint(box[0], box[1], box[2]));
    var b2 = vdgeo.vd_Z(m, vdgeo.newpoint(box[0], box[4], box[2]));
    var b3 = vdgeo.vd_Z(m, vdgeo.newpoint(box[3], box[4], box[2]));
    var b4 = vdgeo.vd_Z(m, vdgeo.newpoint(box[3], box[1], box[2]));
    var b5 = vdgeo.vd_Z(m, vdgeo.newpoint(box[0], box[1], box[5]));
    var b6 = vdgeo.vd_Z(m, vdgeo.newpoint(box[0], box[4], box[5]));
    var b7 = vdgeo.vd_Z(m, vdgeo.newpoint(box[3], box[4], box[5]));
    var b8 = vdgeo.vd_Z(m, vdgeo.newpoint(box[3], box[1], box[5]));
    return [Math.min(b1[X], b2[X], b3[X], b4[X], b5[X], b6[X], b7[X], b8[X]), Math.min(b1[Y], b2[Y], b3[Y], b4[Y], b5[Y], b6[Y], b7[Y], b8[Y]), Math.min(b1[Z], b2[Z], b3[Z], b4[Z], b5[Z], b6[Z], b7[Z], b8[Z]), Math.max(b1[X], b2[X], b3[X], b4[X], b5[X], b6[X], b7[X], b8[X]), Math.max(b1[Y], b2[Y], b3[Y], b4[Y], b5[Y], b6[Y], b7[Y], b8[Y]), Math.max(b1[Z], b2[Z], b3[Z], b4[Z], b5[Z], b6[Z], b7[Z], b8[Z])];
};
vdgeo.vd_ki = function(m1, m2) {
    var ret = vdgeo.vd_bY(m1);
    vdgeo.vd_fs(ret, m2);
    return ret;
};
vdgeo.vd_jK = function(pts) {
    if (pts.length === 0) return null;
    var vd_bK = new vd_ls();
    for (var i = 1; i < pts.length; i++) {
        vd_bK.vd_dw(pts[i]);
    }
    return vd_bK.vd_iE();
};
vdgeo.vd_Eg = function(vd_cP, vd_dF, vd_cT, vd_cU, p1, p2, vd_A, vd_a) {
    var vd_aE = 0,
    vd_aq = 0;
    var done = false;
    vd_A[X] = p1[X];
    vd_A[Y] = p1[Y];
    vd_A[Z] = p1[Z];
    vd_a[X] = p2[X];
    vd_a[Y] = p2[Y];
    vd_a[Z] = p2[Z];
    var vd_gc;
    vd_gc = 0;
    done = false;
    do {
        vd_aE = vd_aq = 0;
        if (vd_A[X] < vd_cP) {
            vd_aE |= 1;
        } else if (vd_A[X] > vd_cT) {
            vd_aE |= 2;
        }
        if (vd_A[Y] < vd_dF) {
            vd_aE |= 4;
        } else if (vd_A[Y] > vd_cU) {
            vd_aE |= 8;
        }
        if (vd_a[X] < vd_cP) {
            vd_aq |= 1;
        } else if (vd_a[X] > vd_cT) {
            vd_aq |= 2;
        }
        if (vd_a[Y] < vd_dF) {
            vd_aq |= 4;
        } else if (vd_a[Y] > vd_cU) {
            vd_aq |= 8;
        }
        if ((vd_aE & vd_aq) > 0) {
            done = true;
            vd_gc = 1;
        } else {
            if ((vd_aE | vd_aq) === 0) {
                done = true;
            } else {
                vd_gc = 2;
                if (vd_aE === 0) {
                    if ((vd_aq & 8) > 0) {
                        vd_a[X] += (vd_cU - vd_a[Y]) * ((vd_A[X] - vd_a[X]) / (vd_A[Y] - vd_a[Y]));
                        vd_a[Y] = vd_cU;
                    } else if ((vd_aq & 4) > 0) {
                        vd_a[X] += (vd_dF - vd_a[Y]) * ((vd_A[X] - vd_a[X]) / (vd_A[Y] - vd_a[Y]));
                        vd_a[Y] = vd_dF;
                    } else if ((vd_aq & 2) > 0) {
                        vd_a[Y] += (vd_cT - vd_a[X]) * ((vd_A[Y] - vd_a[Y]) / (vd_A[X] - vd_a[X]));
                        vd_a[X] = vd_cT;
                    } else if ((vd_aq & 1) > 0) {
                        vd_a[Y] += (vd_cP - vd_a[X]) * ((vd_A[Y] - vd_a[Y]) / (vd_A[X] - vd_a[X]));
                        vd_a[X] = vd_cP;
                    }
                } else {
                    if ((vd_aE & 8) > 0) {
                        vd_A[X] += (vd_cU - vd_A[Y]) * ((vd_a[X] - vd_A[X]) / (vd_a[Y] - vd_A[Y]));
                        vd_A[Y] = vd_cU;
                    } else if ((vd_aE & 4) > 0) {
                        vd_A[X] += (vd_dF - vd_A[Y]) * ((vd_a[X] - vd_A[X]) / (vd_a[Y] - vd_A[Y]));
                        vd_A[Y] = vd_dF;
                    } else if ((vd_aE & 2) > 0) {
                        vd_A[Y] += (vd_cT - vd_A[X]) * ((vd_a[Y] - vd_A[Y]) / (vd_a[X] - vd_A[X]));
                        vd_A[X] = vd_cT;
                    } else if ((vd_aE & 1) > 0) {
                        vd_A[Y] += (vd_cP - vd_A[X]) * ((vd_a[Y] - vd_A[Y]) / (vd_a[X] - vd_A[X]));
                        vd_A[X] = vd_cP;
                    }
                }
            }
        }
    } while (! done );
    if (vd_gc !== 1) {
        var vd_wd = 0,
        vd_vU = 0;
        if ((p2[X] - p1[X]) != 0.0) {
            vd_wd = (vd_A[X] - p1[X]) / (p2[X] - p1[X]);
            vd_vU = (vd_a[X] - p1[X]) / (p2[X] - p1[X]);
        } else if ((p2[Y] - p1[Y]) != 0.0) {
            vd_wd = (vd_A[Y] - p1[Y]) / (p2[Y] - p1[Y]);
            vd_vU = (vd_a[Y] - p1[Y]) / (p2[Y] - p1[Y]);
        }
        vd_A[Z] = vdgeo.vd_kx(p1[Z], p2[Z], vd_wd);
        vd_a[Z] = vdgeo.vd_kx(p1[Z], p2[Z], vd_vU);
    }
    return vd_gc;
};
vdgeo.vd_Be = function(vd_cP, vd_dF, vd_cT, vd_cU, p1, p2, vd_A, vd_a) {
    var vd_aE = 0,
    vd_aq = 0;
    var done = false;
    vd_A[X] = p1[X];
    vd_A[Y] = p1[Y];
    vd_a[X] = p2[X];
    vd_a[Y] = p2[Y];
    var vd_gc;
    vd_gc = 0;
    done = false;
    do {
        vd_aE = vd_aq = 0;
        if (vd_A[X] < vd_cP) {
            vd_aE |= 1;
        } else if (vd_A[X] > vd_cT) {
            vd_aE |= 2;
        }
        if (vd_A[Y] < vd_dF) {
            vd_aE |= 4;
        } else if (vd_A[Y] > vd_cU) {
            vd_aE |= 8;
        }
        if (vd_a[X] < vd_cP) {
            vd_aq |= 1;
        } else if (vd_a[X] > vd_cT) {
            vd_aq |= 2;
        }
        if (vd_a[Y] < vd_dF) {
            vd_aq |= 4;
        } else if (vd_a[Y] > vd_cU) {
            vd_aq |= 8;
        }
        if ((vd_aE & vd_aq) > 0) {
            done = true;
            vd_gc = 1;
        } else {
            if ((vd_aE | vd_aq) === 0) {
                done = true;
            } else {
                vd_gc = 2;
                if (vd_aE === 0) {
                    if ((vd_aq & 8) > 0) {
                        vd_a[X] += (vd_cU - vd_a[Y]) * ((vd_A[X] - vd_a[X]) / (vd_A[Y] - vd_a[Y]));
                        vd_a[Y] = vd_cU;
                    } else if ((vd_aq & 4) > 0) {
                        vd_a[X] += (vd_dF - vd_a[Y]) * ((vd_A[X] - vd_a[X]) / (vd_A[Y] - vd_a[Y]));
                        vd_a[Y] = vd_dF;
                    } else if ((vd_aq & 2) > 0) {
                        vd_a[Y] += (vd_cT - vd_a[X]) * ((vd_A[Y] - vd_a[Y]) / (vd_A[X] - vd_a[X]));
                        vd_a[X] = vd_cT;
                    } else if ((vd_aq & 1) > 0) {
                        vd_a[Y] += (vd_cP - vd_a[X]) * ((vd_A[Y] - vd_a[Y]) / (vd_A[X] - vd_a[X]));
                        vd_a[X] = vd_cP;
                    }
                } else {
                    if ((vd_aE & 8) > 0) {
                        vd_A[X] += (vd_cU - vd_A[Y]) * ((vd_a[X] - vd_A[X]) / (vd_a[Y] - vd_A[Y]));
                        vd_A[Y] = vd_cU;
                    } else if ((vd_aE & 4) > 0) {
                        vd_A[X] += (vd_dF - vd_A[Y]) * ((vd_a[X] - vd_A[X]) / (vd_a[Y] - vd_A[Y]));
                        vd_A[Y] = vd_dF;
                    } else if ((vd_aE & 2) > 0) {
                        vd_A[Y] += (vd_cT - vd_A[X]) * ((vd_a[Y] - vd_A[Y]) / (vd_a[X] - vd_A[X]));
                        vd_A[X] = vd_cT;
                    } else if ((vd_aE & 1) > 0) {
                        vd_A[Y] += (vd_cP - vd_A[X]) * ((vd_a[Y] - vd_A[Y]) / (vd_a[X] - vd_A[X]));
                        vd_A[X] = vd_cP;
                    }
                }
            }
        }
    } while (! done );
    return vd_gc;
};
vdgeo.vd_Mw = function(x1, y1, z1, x2, y2, z2, x, y) {
    var gradient = 0;
    if ((x2 - x1) != 0.0) {
        gradient = (x - x1) / (x2 - x1);
    } else if ((y2 - y1) != 0.0) {
        gradient = (y - y1) / (y2 - y1);
    } else {
        gradient = 0;
    }
    return vdgeo.vd_kx(z1, z2, gradient);
};
vdgeo.vd_Ec = function(value) {
    return Math.max(0, Math.min(value, 1));
};
vdgeo.vd_kx = function(min, max, gradient) {
    return min + (max - min) * vdgeo.vd_Ec(gradient);
};
vdgeo.vd_aj = function(min, max, gradient) {
    return min + (max - min) * gradient;
};
vdgeo.EPSILON = 4.94066e-324;
vdgeo.INCH_MM = 25.4;
vdgeo.VD_TWOPI = 6.2831853071796;
vdgeo.HALF_PI = 1.5707963267948;
vdgeo.PI = 3.1415926535898;
vdgeo.VD_270PI = 4.7123889803844;
vdgeo.vd_os = 0.00001;
vdgeo.DefaultLinearEquality = 0.00000001;
vdgeo.DefaultPointEquality = 0.00000001;
vdgeo.DefaultVectorEquality = 0.000001;
vdgeo.DefaultAngularEquality = 0.000001;
vdgeo.vd_zV = 0.000001;
vdgeo.vd_Nn = 0.000001;
vdgeo.DefaultScaleEquality = 0.0000000001;
vdgeo.vd_AI = 0.0000000001;
vdgeo.vd_Hf = 1.0e + 09;
vdgeo.CURVERESOLUTION = 200;
vdgeo.vd_IB = false;
vdgeo.AreEqual = function(val1, val2, eq) {
    return (Math.abs(val1 - val2) <= eq);
};
vdgeo.DegreesToRadians = function(vd_Fe) {
    return (vdgeo.PI / 180.0) * vd_Fe;
};
vdgeo.RadiansToDegrees = function(vd_LU) {
    return (vd_LU * (180.0 / vdgeo.PI));
};
vdgeo.vd_KY = function(vd_fb, vd_fe) {
    if (!vdgeo.vd_IB) return false;
    return vdgeo.AreEqual(vd_fb, vd_fe, vdgeo.DefaultLinearEquality) || vdgeo.AreEqual(Math.abs(vd_fe - vd_fb), vdgeo.VD_TWOPI, vdgeo.DefaultLinearEquality);
};
vdgeo.FixAngle = function(vd_lQ, vd_cD) {
    if (vd_cD == undefined) vd_cD = vdgeo.DefaultAngularEquality;
    if (vdgeo.AreEqual(vd_lQ, vdgeo.VD_TWOPI, vd_cD)) return vdgeo.VD_TWOPI;
    var angle = vd_lQ;
    angle = angle % vdgeo.VD_TWOPI;
    if (angle > (vdgeo.VD_TWOPI + vd_cD)) angle -= vdgeo.VD_TWOPI;
    if ((angle + vd_cD) < 0.0) angle += vdgeo.VD_TWOPI;
    if (vdgeo.AreEqual(angle, 0.0, vd_cD)) return 0.0;
    if (vdgeo.AreEqual(angle, vdgeo.HALF_PI, vd_cD)) return vdgeo.HALF_PI;
    if (vdgeo.AreEqual(angle, vdgeo.PI, vd_cD)) return vdgeo.PI;
    if (vdgeo.AreEqual(angle, vdgeo.VD_270PI, vd_cD)) return vdgeo.VD_270PI;
    if (vdgeo.AreEqual(angle, vdgeo.VD_TWOPI, vd_cD)) return vdgeo.VD_TWOPI;
    return angle;
};
vdgeo.vd_qL = function(vd_aH, rad, sa, ea, elevation) {
    var da = (ea - sa);
    da = vdgeo.FixAngle(da);
    if (vdgeo.vd_KY(sa, ea)) da = vdgeo.VD_TWOPI;
    var vd_gV = da / vd_aH;
    var aa = vdgeo.FixAngle(sa);
    var vd_pt = [];
    for (var i = 0; i < vd_aH; i++) {
        vd_pt.push(vdgeo.newpoint(rad * Math.cos(aa), rad * Math.sin(aa), elevation));
        aa = aa + vd_gV;
    }
    return vd_pt;
};
vdgeo.vd_hT = function(vd_cj, vd_di, Radius, vd_kM) {
    vd_kM = vdgeo.FixAngle(vd_kM);
    var nseg;
    var vd_ql, ar1;
    var vd_oM, vd_ra, fi1;
    vd_ra = 400;
    if (vd_cj > 1000) vd_ra *= (vd_cj / 1000);
    vd_ql = vd_kM / vdgeo.VD_TWOPI;
    if ((vd_oM = vdgeo.vd_o(8.99 * vd_ql)) < 1) vd_oM = 1;
    ar1 = 0.3222 * Math.sqrt(vd_cj * Radius / vd_di);
    ar1 *= vd_ql;
    if (ar1 < vd_oM) ar1 = vd_oM;
    else if (ar1 > vd_ra) ar1 = vd_ra;
    nseg = vdgeo.vd_o(ar1);
    if (Math.abs(vd_ql - 1.0) < vdgeo.DefaultLinearEquality && (fi1 = nseg % 4) != 0) nseg += 4 - fi1;
    return Math.max(nseg, 8);
};
vdgeo.vd_rK = function(vd_cj, vd_di, vd_lr, vd_bU) {
    var vd_mG = 0.0;
    for (var k = 1; k < vd_lr.length - 1; k++) {
        vd_mG = Math.max(vdgeo.Distance3D(vd_lr[k], vd_lr[k + 1]), vd_mG);
    }
    if (vd_bU) {
        vd_mG = Math.max(vdgeo.Distance3D(vd_lr[vd_lr.length - 1], vd_lr[0]), vd_mG);
    }
    var vd_aH = vdgeo.vd_hT(vd_cj, vd_di, vd_mG / 2.0, vdgeo.PI);
    return Math.min(vd_aH, 100);
};
vdgeo.Bulge2Arc = function(p1, p2) {
    if (!p1[B] || vdgeo.AreEqual(p1[B], 0.0, vdgeo.vd_zV)) return null;
    vd_hq = vdgeo.Distance2D(p1, p2);
    if (vdgeo.AreEqual(vd_hq, 0.0, vdgeo.vd_zV)) return null;
    var Center = null,
    Radius = 0.0,
    vd_eP = 0.0,
    vd_gq = 0.0;
    var vd_hq, vd_pq;
    vd_pq = (p1[B] * vd_hq) / 2.0;
    Radius = ((vd_hq / 2.0) * (vd_hq / 2.0) + (vd_pq * vd_pq)) / (vd_pq * 2.0);
    Center = vdgeo.MidPoint(p1, p2);
    Center = vdgeo.pointPolar(Center, vdgeo.GetAngle(p1, p2) + vdgeo.PI / 2.0, (Radius - vd_pq));
    vd_eP = vdgeo.GetAngle(Center, ((p1[B] > 0) ? p1: p2));
    vd_gq = vdgeo.GetAngle(Center, ((p1[B] > 0) ? p2: p1));
    Radius = Math.abs(Radius);
    return [Center, Radius, vd_eP, vd_gq];
};
vdgeo.Arc2Bulge = function(Radius, vd_Cj) {
    var alt = Math.abs(Radius - (Math.cos(vd_Cj / 2.0) * Radius));
    var vd_hq = 2.0 * alt / Math.tan(vd_Cj / 4.0);
    if (vdgeo.AreEqual(vd_hq, 0.0, vdgeo.DefaultLinearEquality)) return 0.0;
    var vd_hA = 2.0 * alt / vd_hq;
    return vd_hA;
};
function vd_pe(vd_aH, pts, pA, pB, pC) {
    var t, x, y, z = pA[Z];
    for (var i = 1; i < vd_aH - 1; i++) {
        t = i / vd_aH;
        x = (pA[X] - 2.0 * pB[X] + pC[X]) * t * t + (2.0 * pB[X] - 2.0 * pA[X]) * t + pA[X];
        y = (pA[Y] - 2.0 * pB[Y] + pC[Y]) * t * t + (2.0 * pB[Y] - 2.0 * pA[Y]) * t + pA[Y];
        pts.push(vdgeo.newpoint(x, y, z));
    }
    pts.push(vdgeo.newpoint(pC[X], pC[Y], pC[Z]));
};
vdgeo.vd_Mn = function(vd_aH, vd_ab) {
    var Points = [];
    var pts = [];
    pts.length = 3;
    pts[0] = vd_ab[0];
    for (var k = 1; k < vd_ab.length; k++) {
        pts[1] = vd_ab[k];
        Points.push(vdgeo.newpoint(pts[0][X], pts[0][Y], pts[0][Z]));
        if (k < vd_ab.length - 1) {
            pts[2] = vd_ab[k + 1];
            if ((k + 1) != vd_ab.length - 1) pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
        }
        vd_pe(vd_aH, Points, pts[0], pts[1], pts[2]);
        pts[0] = pts[2];
    }
    return Points;
};
vdgeo.vd_xb = function(vd_cj, vd_di, vd_ab, vd_bU) {
    var vd_aH = vdgeo.vd_rK(vd_cj, vd_di, vd_ab, vd_bU);
    var Points = [];
    var pts = [];
    pts.length = 3;
    pts[0] = vd_ab[0];
    for (var k = 1; k < vd_ab.length; k++) {
        pts[1] = vd_ab[k];
        if (k === 1 && vd_bU) {
            pts[0] = vdgeo.MidPoint(pts[0], pts[1]);
        }
        Points.push(vdgeo.newpoint(pts[0][X], pts[0][Y], pts[0][Z]));
        if (k < vd_ab.length - 1) {
            pts[2] = vd_ab[k + 1];
            if ((k + 1) != vd_ab.length - 1 || vd_bU) pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
        } else {
            if (!vd_bU) break;
            pts[1] = vd_ab[vd_ab.length - 1];
            pts[2] = vd_ab[0];
            pts[2] = vdgeo.MidPoint(pts[1], pts[2]);
            vd_pe(vd_aH, Points, pts[0], pts[1], pts[2]);
            pts[0] = pts[2];
            pts[1] = vd_ab[0];
            pts[2] = Points[0];
            vd_pe(vd_aH, Points, pts[0], pts[1], pts[2]);
            pts[0] = pts[2];
            break;
        }
        vd_pe(vd_aH, Points, pts[0], pts[1], pts[2]);
        pts[0] = pts[2];
    }
    return Points;
};
vdgeo.vd_sf = function(vd_cj, vd_di, vd_ab, vd_bU, StartTangent, EndTangent) {
    var vd_gE = vdgeo.vd_rK(vd_cj, vd_di, vd_ab, vd_bU);
    var vd_kg = vd_Ml(vd_ab, StartTangent, EndTangent, vd_bU);
    if (vd_kg == null) return vd_ab;
    return vd_kg.vd_vo(vd_gE);
};
vdgeo.vd_rX = function(vd_cj, vd_di, vd_ab, vd_eu, vd_aV, vd_bU) {
    var vd_gE = vdgeo.vd_rK(vd_cj, vd_di, vd_ab, vd_bU);
    var vd_kg = new vdgeo.vd_wr(vd_ab, vd_bU, 3, vd_eu, vd_aV);
    return vd_kg.vd_vo(vd_gE);
};
vdgeo.vd_KN = function(vd_cj, vd_di, vd_ab, vd_eu, vd_aV, vd_bU) {
    var vd_gE = vdgeo.vd_rK(vd_cj, vd_di, vd_ab, vd_bU);
    var vd_kg = new vdgeo.vd_wr(vd_ab, vd_bU, 2, vd_eu, vd_aV);
    return vd_kg.vd_vo(vd_gE);
};
vdgeo.vd_Bz = function(pl, p1) {
    if (!pl || !p1 || !pl.VertexList || pl._t !== vdConst.vdPolyline_code) return null;
    var vd_hQ = pl.ExtrusionVector;
    if (!vd_hQ) vd_hQ = vdgeo.newpoint(0, 0, 1);
    var vd_iO = vdgeo.vd_s();
    vdgeo.vd_cx(vd_iO, vd_hQ);
    var vd_jp = vdgeo.vd_bo(vd_iO);
    var vd_bC = vdgeo.vd_qE(vd_jp, pl.VertexList.Items);
    var vd_bU = pl.Flag === 1;
    var pt1 = vdgeo.vd_Z(vd_jp, p1);
    var vd_my = {};
    var vd_lw = vdgeo.GetPlineSegmentIndexFromPoint(pt1, vd_bC, vd_bU, null, vd_my);
    if (vd_lw < 0 || !vd_my.pt) return null;
    var sp1, ep1, arc1, a, b, a0, b0;
    pt1 = vdgeo.vd_Z(vd_jp, vd_my.pt);
    sp1 = vd_bC[vd_lw];
    if (vd_lw === vd_bC.length - 1) ep1 = vd_bC[0];
    else ep1 = vd_bC[vd_lw + 1];
    sp1 = vdgeo.vd_pz(vd_jp, sp1);
    ep1 = vdgeo.vd_pz(vd_jp, ep1);
    arc1 = vdgeo.Bulge2Arc(sp1, ep1);
    if (!arc1) {
        b = 0.0;
        b0 = 0.0;
    } else {
        if (sp1[B] > 0.0) {
            a = vdgeo.FixAngle(arc1[3] - vdgeo.GetAngle(arc1[0], pt1));
            a0 = vdgeo.FixAngle(vdgeo.GetAngle(arc1[0], pt1) - arc1[2]);
        } else {
            a = vdgeo.FixAngle(vdgeo.GetAngle(arc1[0], pt1) - arc1[2]);
            a0 = vdgeo.FixAngle(arc1[3] - vdgeo.GetAngle(arc1[0], pt1));
        }
        b = vdgeo.Arc2Bulge(arc1[1], a) * Math.abs(sp1[B]) / sp1[B];
        b0 = vdgeo.Arc2Bulge(arc1[1], a0) * Math.abs(sp1[B]) / sp1[B];
    }
    pl.VertexList.Items[vd_lw][B] = b0;
    var nv = vdgeo.vd_pz(vd_iO, [pt1[X], pt1[Y], pt1[Z], b]);
    pl.VertexList.Items.splice(vd_lw + 1, 0, nv);
    return [vd_lw + 1, vd_my.offset, vd_my.vd_JK];
};
vdgeo.GetPlineSegmentIndexFromPoint = function(pt, vd_bC, vd_bU, vd_hQ, vd_ln) {
    if (!vd_hQ) vd_hQ = vdgeo.newpoint(0, 0, 1);
    var vd_iO = vdgeo.vd_s();
    vdgeo.vd_cx(vd_iO, vd_hQ);
    var vd_jp = vdgeo.vd_bo(vd_iO);
    var vd_ad = vdgeo.vd_qE(vd_jp, vd_bC);
    var p = vdgeo.vd_Z(vd_jp, pt);
    var Center, sp, ep;
    var radius = 0.0,
    vd_fb = 0.0,
    vd_fe = 0.0;
    var success = false;
    var sa, ea, pa, vd_tf;
    var vd_kl = null;
    var vd_qn = false;
    var dist = 0.0;
    var vd_uK = null;
    var vd_Af = -1;
    var vd_vB = 0.0;
    var vd_dn = 0.0;
    var offset = 0.0;
    for (var i = 0; i <= vd_ad.length - 1; i++) {
        sp = vd_ad[i];
        if (i == vd_ad.length - 1) {
            if (!vd_bU) break;
            ep = vd_ad[0];
        } else {
            ep = vd_ad[i + 1];
        }
        success = vdgeo.Bulge2Arc(sp, ep);
        if (success == null) {
            vd_kl = vdgeo.vd_rs(p, sp, ep);
            vd_dn = vdgeo.Distance3D(sp, ep);
            offset = vdgeo.Distance3D(vd_kl, sp);
            vd_qn = vdgeo.AreEqual(offset + vdgeo.Distance3D(vd_kl, ep), vd_dn, vdgeo.DefaultLinearEquality);
        } else {
            Center = success[0];
            radius = success[1];
            vd_fb = success[2];
            vd_fe = success[3];
            ea = vdgeo.FixAngle(vd_fe - vd_fb);
            sa = 0.0;
            vd_tf = vdgeo.GetAngle(Center, p);
            pa = vdgeo.FixAngle(vd_tf - vd_fb);
            vd_dn = radius * ea;
            if (sp[B] > 0.0) offset = radius * pa;
            else offset = radius * vdgeo.FixAngle(vd_fe - vd_tf);
            vd_kl = vdgeo.pointPolar(Center, vd_tf, radius);
            vd_qn = (pa <= ea);
        }
        if (vd_qn) {
            dist = vdgeo.Distance3D(vd_kl, p);
        } else {
            dist = Math.min(vdgeo.Distance3D(sp, p), vdgeo.Distance3D(ep, p));
        }
        if (vd_uK === null || dist < vd_uK) {
            vd_uK = dist;
            vd_Af = i;
            if (vd_ln) {
                if (vd_qn) {
                    vd_ln.pt = vdgeo.vd_Z(vd_iO, vd_kl);
                    vd_ln.offset = vd_vB + offset;
                } else {
                    vd_ln.pt = null;
                }
            }
        }
        vd_vB += vd_dn;
    }
    if (vd_ln) vd_ln.vd_JK = vd_vB;
    return vd_Af;
};
vdgeo.vd_EL = function(vd_ad, vd_cj, vd_di, vd_bU) {
    var SamplePoints = [];
    var vd_aH = 8;
    var apts;
    var Center = vdgeo.newpoint(0, 0, 0);
    var radius = 0.0,
    vd_fb = 0.0,
    vd_fe = 0.0;
    var success = false;
    var sp = null;
    var ep = null;
    for (var i = 0; i <= vd_ad.length - 1; i++) {
        sp = vd_ad[i];
        if (i == vd_ad.length - 1) {
            if (!vd_bU) break;
            ep = vd_ad[0];
        } else {
            ep = vd_ad[i + 1];
        }
        success = vdgeo.Bulge2Arc(sp, ep);
        if (success == null) {
            SamplePoints.push(vdgeo.vd_BG(sp[X], sp[Y], sp[Z], i));
        } else {
            Center = success[0];
            radius = success[1];
            vd_fb = success[2];
            vd_fe = success[3];
            vd_aH = vdgeo.vd_hT(vd_cj, vd_di, radius, vdgeo.FixAngle(vd_fe - vd_fb));
            apts = vdgeo.vd_qL(vd_aH, radius, vd_fb, vd_fe, 0);
            apts.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), vd_fe, radius));
            if (vd_ad[i][B] < 0.0) apts.reverse();
            var k;
            for (k = 0; k < apts.length; k++) vdgeo.vd_HT(apts[k], Center[X], Center[Y], Center[Z]);
            for (k = 0; k < apts.length - 1; k++) {
                apts[k][INDEX] = i;
                SamplePoints.push(apts[k]);
            }
        }
    }
    if (ep != null) SamplePoints.push(vdgeo.vd_BG(ep[X], ep[Y], ep[Z], vd_ad.length - 1));
    return SamplePoints;
};
vdgeo.vd_Mm = function(p1, p2, p3, len) {
    var vd_lQ = vdgeo.vd_kM(p1, p2, p3);
    var sinA = Math.sin(vd_lQ * 0.5);
    if (!vdgeo.AreEqual(sinA, 0.0, vdgeo.DefaultAngularEquality)) len /= sinA;
    if (vd_lQ < vdgeo.PI) len *= -1;
    var m_e0 = [p1[X] - p2[X], p1[Y] - p2[Y], p1[Z] - p2[Z]];
    var m_e1 = [p3[X] - p2[X], p3[Y] - p2[Y], p3[Z] - p2[Z]];
    vdgeo.vd_cq(m_e0);
    vdgeo.vd_cq(m_e1);
    var v = [(m_e0[X] + m_e1[X]) / 2.0, (m_e0[Y] + m_e1[Y]) / 2.0, (m_e0[Z] + m_e1[Z]) / 2.0];
    vdgeo.vd_cq(v);
    v[X] *= len;
    v[Y] *= len;
    v[Z] *= len;
    return v;
};
vdgeo.vd_Ll = function(vd_ad, vd_bU, width) {
    if (width == 0.0) return null;
    var vd_fc = [];
    var vd_vV = width / 2.0;
    var vd_ph = [0, 0, 0];
    var sp = null;
    var ep = null;
    var pp = null;
    var v = null;
    for (var i = 0; i < vd_ad.length; i++) {
        sp = vd_ad[i];
        if (i === 0) {
            ep = vd_ad[i + 1];
            if (vd_bU) pp = vd_ad[vd_ad.length - 2];
            else pp = null;
        } else if (i === vd_ad.length - 1) {
            pp = vd_ad[i - 1];
            if (vd_bU) ep = vd_ad[1];
            else ep = null;
        } else {
            ep = vd_ad[i + 1];
            pp = vd_ad[i - 1];
        }
        if (!pp) {
            v = vdgeo.pointPolar(vd_ph, vdgeo.GetAngle(sp, ep) + vdgeo.HALF_PI, vd_vV);
        } else if (!ep) {
            v = vdgeo.pointPolar(vd_ph, vdgeo.GetAngle(pp, sp) + vdgeo.HALF_PI, vd_vV);
        } else {
            v = vdgeo.vd_Mm(pp, sp, ep, vd_vV)
        }
        vd_fc.push(v);
    }
    return vd_fc;
};
vdgeo.vd_rT = function(angle, vd_kD, vd_oD) {
    var vd_bp = vdgeo.newpoint(0, 0, 0);
    if (vdgeo.AreEqual(vd_kD, 0.0, vdgeo.DefaultLinearEquality) || vdgeo.AreEqual(vd_oD, 0.0, vdgeo.DefaultLinearEquality)) return vd_bp;
    angle = vdgeo.FixAngle(angle);
    var f = Math.tan(angle);
    vd_bp[X] = Math.sqrt(Math.pow(vd_kD, 2) * Math.pow(vd_oD, 2) / (Math.pow(vd_oD, 2) + Math.pow(vd_kD, 2) * Math.pow(f, 2)));
    vd_bp[Y] = Math.abs(vd_bp[X] * f);
    if (angle >= 0.0 && angle < vdgeo.HALF_PI) {} else if (angle >= vdgeo.HALF_PI && angle < vdgeo.PI) {
        vd_bp[X] *= -1.0;
    } else if (angle >= vdgeo.PI && angle < (3.0 * vdgeo.HALF_PI)) {
        vd_bp[X] *= -1.0;
        vd_bp[Y] *= -1.0;
    } else if (angle >= (3.0 * vdgeo.HALF_PI) && angle < vdgeo.VD_TWOPI) {
        vd_bp[Y] *= -1.0;
    }
    return vd_bp;
};
vdgeo.vd_sC = function(vd_cj, vd_di, vd_kD, vd_kM) {
    return Math.max(vdgeo.vd_hT(vd_cj, vd_di, vd_kD, vd_kM), 64);
};
vdgeo.vd_rO = function(vd_aH, vd_kD, vd_oD, sa, ea) {
    if (vdgeo.AreEqual(sa, ea, vdgeo.DefaultAngularEquality)) ea += vdgeo.VD_TWOPI;
    var da = vdgeo.FixAngle(ea - sa);
    var vd_gV = da / vd_aH;
    var aa = vdgeo.FixAngle(sa);
    var vd_pt = [];
    for (var i = 0; i < vd_aH + 1; i++) {
        vd_pt.push(vdgeo.vd_rT(aa, vd_kD, vd_oD));
        aa = aa + vd_gV;
    }
    return vd_pt;
};
vdgeo.vd_eX = function(p1, p2, vd_cD) {
    return vdgeo.AreEqual(p1[X], p2[X], vd_cD) && vdgeo.AreEqual(p1[Y], p2[Y], vd_cD) && vdgeo.AreEqual(p1[Z], p2[Z], vd_cD);
};
vdgeo.vd_AW = function(pts) {
    return vdgeo.vd_eX(pts[0], pts[pts.length - 1], vdgeo.DefaultPointEquality);
};
vdgeo.vd_kk = function(p1, p2, p3, p4, vd_cD, vd_bp) {
    var x1 = p1[X],
    x2 = p2[X],
    x3 = p3[X],
    x4 = p4[X],
    y1 = p1[Y],
    y2 = p2[Y],
    y3 = p3[Y],
    y4 = p4[Y];
    var dx = (x1 + x2 + x3 + x4) / 4.0;
    var dy = (y1 + y2 + y3 + y4) / 4.0;
    x1 -= dx;
    x2 -= dx;
    x3 -= dx;
    x4 -= dx;
    y1 -= dy;
    y2 -= dy;
    y3 -= dy;
    y4 -= dy;
    var A1 = y4 - y3;
    var B1 = x3 - x4;
    var A2 = y2 - y1;
    var B2 = x1 - x2;
    var DD = A1 * B2 - A2 * B1;
    if (vdgeo.AreEqual(DD, 0.0, vd_cD)) return 0;
    var G1 = x4 * y3 - x3 * y4;
    var G2 = x2 * y1 - x1 * y2;
    var DX = B1 * G2 - B2 * G1;
    var DY = A2 * G1 - A1 * G2;
    vd_bp[X] = (DX / DD) + dx;
    vd_bp[Y] = (DY / DD) + dy;
    vd_bp[Z] = p1[Z];
    return 1;
};
vdgeo.vd_Dy = function(p1, p2, p3) {
    var mp1 = vdgeo.MidPoint(p1, p2);
    var mp2 = vdgeo.MidPoint(p2, p3);
    var mp1a = vdgeo.pointPolar(mp1, vdgeo.GetAngle(p1, p2) + vdgeo.HALF_PI, 1.0);
    var mp2a = vdgeo.pointPolar(mp2, vdgeo.GetAngle(p2, p3) + vdgeo.HALF_PI, 1.0);
    var vd_bp = vdgeo.newpoint(0, 0, 0);
    vdgeo.vd_kk(mp1, mp1a, mp2, mp2a, vdgeo.DefaultVectorEquality, vd_bp);
    return vd_bp;
};
vdgeo.vd_DS = function(p1, p2, p3) {
    var sa = 0.0,
    sb = 0.0;
    sa += (p1[X] * p2[Y]);
    sb += (p1[Y] * p2[X]);
    sa += (p2[X] * p3[Y]);
    sb += (p2[Y] * p3[X]);
    sa += (p3[X] * p1[Y]);
    sb += (p3[Y] * p1[X]);
    return (sb - sa) / 2.0;
};
vdgeo.GetPointsArea = function(pts) {
    if (!pts || pts.length == 0) return 0.0;
    var sa = 0.0;
    var sb = 0.0;
    for (var i = 0; i < pts.length - 1; i++) {
        sa += (pts[i][X] * pts[i + 1][Y]);
        sb += (pts[i][Y] * pts[i + 1][X]);
    }
    sa += (pts[pts.length - 1][X] * pts[0][Y]);
    sb += (pts[pts.length - 1][Y] * pts[0][X]);
    return (sb - sa) / 2.0;
};
vdgeo.vd_Mk = function(vd_bM) {
    if (!vd_bM || vd_bM.length == 0) return 0.0;
    var area = vdgeo.GetPointsArea(vd_bM);
    var Center;
    var Radius;
    var vd_eP;
    var vd_gq;
    var vd_hq;
    var vd_wG;
    var alt;
    var vd_uH;
    var p1;
    var p2;
    for (var i = 0; i < vd_bM.length; i++) {
        p1 = vd_bM[i];
        if (i == vd_bM.length - 1) p2 = vd_bM[0];
        else p2 = vd_bM[i + 1];
        var ret = vdgeo.Bulge2Arc(p1, p2);
        if (!ret) continue;
        Center = ret[0];
        Radius = ret[1];
        vd_eP = ret[2];
        vd_gq = ret[3];
        vd_hq = vdgeo.Distance2D(p1, p2);
        vd_wG = Math.atan(Math.abs(p1[B])) * 4.0;
        alt = Radius - (Radius * Math.cos(vd_wG / 2.0));
        vd_uH = vd_wG / 2.0 * Radius * Radius;
        vd_uH += (vd_hq * (alt - Radius) / 2.0);
        area += ( - 1.0 * (p1[B] / Math.abs(p1[B])) * vd_uH);
    }
    return area;
};
vdgeo.vd_BZ = function(vd_bM, closed) {
    if (!vd_bM || vd_bM.length == 0) return 0.0;
    var vd_sR = 0;
    var Center;
    var Radius;
    var vd_eP;
    var vd_gq;
    var p1;
    var p2;
    for (var i = 0; i < vd_bM.length; i++) {
        p1 = vd_bM[i];
        if (i == vd_bM.length - 1) {
            if (!closed) continue;
            p2 = vd_bM[0];
        } else p2 = vd_bM[i + 1];
        var ret = vdgeo.Bulge2Arc(p1, p2);
        if (!ret) {
            vd_sR += vdgeo.Distance3D(p1, p2);
        } else {
            Center = ret[0];
            Radius = ret[1];
            vd_eP = ret[2];
            vd_gq = ret[3];
            vd_sR += Radius * vdgeo.FixAngle(vd_gq - vd_eP);
        }
    }
    return vd_sR;
};
vdgeo.vd_jH = function(vd_bM, length, closed) {
    var vd_bR = [];
    if (!vd_bM || vd_bM.length == 0) return vd_bR;
    vd_bR.push(vdgeo.pointPolar(vd_bM[0], 0.0, 0.0));
    var cl = 0.0;
    var cl1 = 0.0;
    var Center;
    var Radius;
    var vd_eP;
    var vd_gq;
    var p1;
    var p2;
    for (var i = 0; i < vd_bM.length; i++) {
        p1 = vd_bM[i];
        if (i == vd_bM.length - 1) {
            if (!closed) continue;
            p2 = vd_bM[0];
        } else p2 = vd_bM[i + 1];
        var ret = vdgeo.Bulge2Arc(p1, p2);
        if (!ret) {
            vd_eP = vdgeo.GetAngle(p1, p2);
            cl1 = vdgeo.Distance3D(p1, p2);
            while ((cl + cl1 + vdgeo.DefaultLinearEquality) >= length) {
                p1 = vdgeo.pointPolar(p1, vd_eP, length - cl);
                vd_bR.push(p1);
                cl1 -= (length - cl);
                cl = 0;
            }
        } else {
            Center = ret[0];
            Radius = ret[1];
            vd_eP = ret[2];
            vd_gq = ret[3];
            cl1 = Radius * vdgeo.FixAngle(vd_gq - vd_eP);
            while ((cl + cl1 + vdgeo.DefaultLinearEquality) >= length) {
                vd_eP += (length - cl) / Radius;
                p1 = vdgeo.pointPolar(Center, vd_eP, Radius);
                vd_bR.push(p1);
                cl1 -= (length - cl);
                cl = 0;
            }
        }
        cl += cl1;
    }
    if (vd_bR.length == 1) vd_bR = [];
    return vd_bR;
};
function vd_Kf(vd_oZ, n, vd_dP) {
    var i = 0;
    var vd_aV = [];
    vd_aV.length = n;
    var prev = vd_oZ[0];
    vd_aV[0] = 0;
    for (i = 1; i < n; i++) {
        var curr = vd_oZ[i];
        var distance = vdgeo.Distance2D(prev, curr);
        vd_aV[i] = vd_aV[i - 1] + distance;
        prev = curr;
    }
    var vd_uv = n + (2 * vd_dP);
    var vd_eZ = [];
    vd_eZ.length = vd_uv;
    for (i = 0; i < vd_dP; i++) vd_eZ[i] = vd_aV[0];
    for (i = 0; i < n; i++) vd_eZ[i + vd_dP] = vd_aV[i];
    for (i = 1; i <= vd_dP; i++) vd_eZ[vd_uv - i] = vd_aV[n - 1];
    return vd_eZ;
};
function T(k, t) {
    var d = 3;
    return t[d - 1 + (k)];
};
function vd_DM(nS, rAt, vd_aV) {
    var d = 3;
    var m = 0;
    var j = 0;
    var t = [];
    t.length = d * 2;
    for (j = 0, m = nS - d + 1; j < 2 * d; m++, j++) t[j] = vd_aV[m];
    var v = [];
    v[0] = [];
    v[0].length = 1;
    v[0][0] = 1.0;
    for (m = 1; m <= d; m++) {
        v[m] = [];
        v[m].length = m + 1;
        v[m][0] = v[m - 1][0] * ((T(1, t) - rAt) / (T(1, t) - T( - m + 1, t)));
        for (j = 1; j < m; j++) {
            v[m][j] = v[m - 1][j - 1] * ((rAt - T( - m + j, t)) / (T(j, t) - T( - m + j, t))) + v[m - 1][j] * ((T(j + 1, t) - rAt) / (T(j + 1, t) - T( - m + j + 1, t)));
        }
        v[m][m] = v[m - 1][m - 1] * ((rAt - T(0, t)) / (T(m, t) - T(0, t)));
    }
    return v[d];
};
function vd_JS(alpha, beta, vd_dk, low, up) {
    up.length = beta.length;
    low.length = beta.length;
    up[0] = beta[0];
    for (var i = 1; i < beta.length; i++) {
        low[i] = alpha[i] / up[i - 1];
        up[i] = beta[i] - low[i] * vd_dk[i - 1];
    }
};
function vd_vH(low, up, vd_dk, D, X) {
    var n = low.length;
    var i = 0;
    X.length = n;
    var y = [];
    y.length = n;
    y[0] = D[0];
    for (i = 1; i < n; i++) y[i] = D[i] - low[i] * y[i - 1];
    X[n - 1] = y[n - 1] / up[n - 1];
    for (i = n - 2; i >= 0; i--) X[i] = (y[i] - vd_dk[i] * X[i + 1]) / up[i];
};
var vd_yJ = vdgeo.newpoint(0, 0, 0);
function vd_Ml(vd_bE, StartTangent, EndTangent, closed) {
    var s1, t1, r1;
    var i = 0;
    var vd_sq = vdgeo.vd_AW(vd_bE);
    closed = closed || vd_sq;
    var n = vd_bE.length;
    if (closed && vd_sq) n--;
    if (n < 3) return null;
    if (StartTangent == undefined) StartTangent = null;
    if (EndTangent == undefined) EndTangent = null;
    if (closed) {
        if (StartTangent == null || EndTangent == null) {
            if (!vd_sq) vd_bE[n] = vd_bE[0];
            n = vd_bE.length;
            var cen = vdgeo.vd_Dy(vd_bE[n - 2], vd_bE[0], vd_bE[1]);
            var area = vdgeo.vd_DS(vd_bE[n - 2], vd_bE[0], vd_bE[1]);
            if (!vdgeo.AreEqual(area, 0.0, vdgeo.DefaultLinearEquality)) {
                var ang = vdgeo.GetAngle(cen, vd_bE[0]) + vdgeo.PI / 2.0 - vdgeo.PI * (area > 0 ? 1.0 : -1.0);
                if (StartTangent == null) StartTangent = vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), ang, 1.0);
                if (EndTangent == null) EndTangent = vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), ang, 1.0)
            }
        }
    }
    var vd_Ms = (StartTangent != null && !vdgeo.vd_eX(StartTangent, vd_yJ, vdgeo.DefaultPointEquality));
    var vd_Lq = (EndTangent != null && !vdgeo.vd_eX(EndTangent, vd_yJ, vdgeo.DefaultPointEquality));
    var vd_nP = null,
    vd_nb = null;
    n = vd_bE.length;
    var nCP = n + 2;
    var vd_uv = n + 6;
    var vd_aV = vd_Kf(vd_bE, n, 3);
    var alpha = [];
    alpha.length = nCP;
    for (i = 0; i < alpha.length; i++) alpha[i] = 0;
    var beta = [];
    beta.length = nCP;
    for (i = 0; i < beta.length; i++) beta[i] = 0;
    var vd_dk = [];
    vd_dk.length = nCP;
    for (i = 0; i < vd_dk.length; i++) vd_dk[i] = 0;
    if (vd_Ms) {
        vd_nP = vdgeo.vd_AX(StartTangent, (0.333333333333333 * (vd_aV[4] - vd_aV[3])));
        alpha[1] = -1.0;
    } else {
        s1 = vd_aV[4] - vd_aV[3];
        t1 = vd_aV[5] - vd_aV[3];
        r1 = s1 + t1;
        alpha[1] = -t1 / r1;
        vd_dk[1] = -s1 / r1;
        vd_nP = vdgeo.newpoint(0, 0, 0);
    }
    beta[0] = beta[1] = 1.0;
    for (i = 2; i < nCP - 2; i++) {
        var temp = vd_DM(i + 1, vd_aV[i + 2], vd_aV);
        alpha[i] = temp[1];
        beta[i] = temp[2];
        vd_dk[i] = temp[3];
    }
    if (vd_Lq) {
        vd_dk[nCP - 2] = -1.0;
        vd_nb = vdgeo.vd_AX(EndTangent, ( - 0.333333333333333 * (vd_aV[nCP] - vd_aV[nCP - 1])));
    } else {
        s1 = vd_aV[nCP] - vd_aV[nCP - 1];
        t1 = vd_aV[nCP] - vd_aV[nCP - 2];
        r1 = s1 + t1;
        alpha[nCP - 2] = -s1 / r1;
        vd_dk[nCP - 2] = -t1 / r1;
        vd_nb = vdgeo.newpoint(0, 0, 0);
    }
    beta[nCP - 2] = beta[nCP - 1] = 1;
    var low = [];
    var up = [];
    vd_JS(alpha, beta, vd_dk, low, up);
    var right = [];
    right.length = nCP;
    var vd_yV = [];
    right[0] = vd_bE[0][X];
    right[1] = vd_nP[X];
    for (i = 1; i < n - 1; i++) right[i + 1] = vd_bE[i][X];
    right[nCP - 2] = vd_nb[X];
    right[nCP - 1] = vd_bE[n - 1][X];
    vd_vH(low, up, vd_dk, right, vd_yV);
    var vd_yx = [];
    right[0] = vd_bE[0][Y];
    right[1] = vd_nP[Y];
    for (i = 1; i < n - 1; i++) right[i + 1] = vd_bE[i][Y];
    right[nCP - 2] = vd_nb[Y];
    right[nCP - 1] = vd_bE[n - 1][Y];
    vd_vH(low, up, vd_dk, right, vd_yx);
    var vd_yS = [];
    right[0] = vd_bE[0][Z];
    right[1] = vd_nP[Z];
    for (i = 1; i < n - 1; i++) right[i + 1] = vd_bE[i][Z];
    right[nCP - 2] = vd_nb[Z];
    right[nCP - 1] = vd_bE[n - 1][Z];
    vd_vH(low, up, vd_dk, right, vd_yS);
    var vd_Cy = [];
    for (i = 0; i < nCP; i++) vd_Cy.push(vdgeo.newpoint(vd_yV[i], vd_yx[i], vd_yS[i]));
    return new vdgeo.vd_wr(vd_Cy, closed, 3, null, vd_aV);
};
vdgeo.vd_wr = function(vd_mt, closed, vd_dP, vd_eu, vd_aV) {
    var vd_jq = null;
    var vd_ao = null;
    var vd_qT = false;
    var vd_gY = 3;
    var vd_oK = null;
    var vd_Ba = false;
    if (vd_eu == undefined) vd_eu = null;
    if (vd_aV == undefined) vd_aV = null;
    vd_qT = closed;
    vd_jq = vd_mt;
    vd_gY = Math.min(vd_mt.length - 1, vd_dP);
    if (vd_aV != null && vd_DJ(vd_mt.length, vd_qT, vd_dP) == vd_aV.length) vd_ao = vd_aV;
    else vd_ao = vd_KH(vd_mt, vd_qT, vd_dP);
    if (vd_eu != null && vd_eu.length == vd_mt.length) {
        vd_oK = vd_eu;
    } else {
        vd_oK = [];
        for (var i = 0; i < vd_mt.length; i++) vd_oK.push(1.0);
    }
    vd_Ba = vd_GN();
    var vd_Ic = 9;
    var vd_Ce = 1e-9;
    function vd_DJ(vd_CQ, closed, vd_dP) {
        if (closed) return vd_CQ + 1;
        else return vd_CQ + vd_dP + 1;
    };
    function vd_GN() {
        var rc = false;
        var i, j;
        if (vd_gY < 1 || vd_gY > vd_Ic || vd_jW() < vd_Ce || vd_fz() < Math.min(vd_gY, 3)) return false;
        for (i = 0;; i = j) {
            for (j = i + 1; j < Size() && vdgeo.AreEqual(vd_ao[j], vd_ao[i], vd_Ce); j++) vd_ao[j] = vd_ao[i];
            if (j >= vd_fz()) break;
            if (vd_ao[j] < vd_ao[i]) return false;
        }
        rc = true;
        vd_Js();
        return rc;
    };
    function vd_KH(vd_oZ, closed, vd_dP) {
        var n = vd_oZ.length;
        var i = 0;
        var vd_eZ = [];
        if (closed) {
            for (i = 0; i <= n; i++) vd_eZ.push(i);
        } else {
            for (i = 0; i <= vd_dP; i++) vd_eZ.push(0.0);
            for (i = vd_dP + 1; i <= n; i++) vd_eZ.push(i - vd_dP);
            for (i = 0; i < vd_dP; i++) vd_eZ.push(vd_eZ[vd_eZ.length - 1]);
        }
        return vd_eZ;
    };
    function vd_fz() {
        return vd_ao.length - 1;
    };
    function vd_jW() {
        return vd_ao[vd_ao.length - 1] - vd_ao[0];
    };
    function Knot(vd_bA) {
        var k = 0,
        vd_mZ = vd_bA;
        while (vd_mZ >= vd_fz()) {
            vd_mZ -= vd_fz();
            k++;
        }
        while (vd_mZ < 0) {
            vd_mZ += vd_fz();
            k--;
        }
        return vd_ao[vd_mZ] + k * vd_jW();
    };
    function vd_GJ(vd_bA) {
        var vd_il = vd_jq.length;
        while (vd_bA >= vd_il) vd_bA -= vd_il;
        while (vd_bA < 0) vd_bA += vd_il;
        return vd_jq[vd_bA];
    };
    function vd_Ea(vd_bA) {
        var vd_il = vd_jq.length;
        while (vd_bA >= vd_il) vd_bA -= vd_il;
        while (vd_bA < 0) vd_bA += vd_il;
        return vd_oK[vd_bA];
    };
    var vd_cW = 0;
    function vd_Js() {
        vd_cW = vd_fz() - 1;
    };
    function vd_Lh() {
        if (vd_fz() <= vd_gY || vd_ao[vd_gY] != vd_ao[0]) return vd_jW();
        else return 0;
    };
    function vd_Ih(t, vd_gC) {
        var rc = true;
        var s = vd_ao[0] + vd_jW();
        vd_gC = 0;
        while (t > s) {
            t -= vd_jW();
            vd_gC++;
        }
        while (t < vd_ao[0]) {
            t += vd_jW();
            vd_gC--;
        }
        if (Math.abs(vd_gC) > 8) rc = false;
        else vd_gC *= vd_fz();
        return [rc, t, vd_gC];
    };
    function Size() {
        return vd_ao.length - 1;
    };
    function vd_JF(vd_KD, vd_gx, nTop) {
        if (vd_gx > nTop) throw new vd_cv();
        while (true) {
            var nMid = (vd_gx + nTop) / 2;
            if (nMid == vd_gx) return vd_gx;
            if (vd_KD >= vd_ao[nMid]) vd_gx = nMid;
            else nTop = nMid;
        }
    };
    function vd_FH(vd_AD, t, vd_CJ) {
        var rc = true;
        var nTop, vd_gx;
        var vd_gC = 0;
        list: {
            if (vd_fz() <= 0) {
                rc = false;
                break list;
            }
            if (vd_Lh() != 0.0) {
                var retf = vd_Ih(t, vd_gC);
                t = retf[1];
                vd_gC = retf[2];
                if (retf[0] == false) {
                    rc = false;
                    break list;
                }
            }
            if (t >= vd_ao[vd_cW]) {
                if (vd_cW >= Size() - 1) break list;
                if (t < vd_ao[vd_cW + 1]) break list;
                vd_cW++;
                if (vd_cW >= Size() - 1) break list;
                if (t < vd_ao[vd_cW + 1]) break list;
                vd_gx = vd_cW + 1;
                nTop = Size() - 1;
            } else {
                if (vd_cW <= 0) break list;
                vd_cW--;
                if (vd_cW <= 0 || t >= vd_ao[vd_cW]) break list;
                vd_gx = 0;
                nTop = vd_cW;
            }
            vd_cW = vd_JF(t, vd_gx, nTop);
            if (t > vd_ao[vd_fz() - 1]) vd_cW = vd_fz() - 1;
            if (t < vd_ao[0]) vd_cW = 0;
        }
        while (vd_cW < vd_fz() - 1 && vd_ao[vd_cW] >= vd_ao[vd_cW + 1]) vd_cW++;
        vd_CJ = vd_cW + vd_gC;
        return [rc, vd_CJ];
    };
    function vd_yd(u, i, vd_AD) {
        var j = 0;
        var d = vd_gY;
        var D = [];
        D.length = d + 1;
        var w = [];
        w.length = d + 1;
        var t = [];
        t.length = 2 * (d + 1);
        if (vd_Ba) {
            var retf = vd_FH(vd_AD, u, i);
            i = retf[1];
            if (!retf[0]) throw new vd_cv()
        }
        for (j = 0; j <= d; j++) {
            w[j] = vd_Ea(i + j - d);
            var pt = vd_GJ(i + j - d);
            D[j] = vdgeo.newpoint(pt[X], pt[Y], pt[Z]);
            D[j][X] *= w[j];
            D[j][Y] *= w[j];
            D[j][Z] *= w[j];
        }
        for (j = 0; j <= 2 * d + 1; j++) t[j] = Knot(i - d + j);
        for (var k = d; k > 0; k--) {
            for (j = 1; j <= k; j++) {
                var s = (u - t[d - k + j]) / (t[d + j] - t[d - k + j]);
                w[j - 1] += (w[j] - w[j - 1]) * s;
                D[j - 1][X] += (D[j][X] - D[j - 1][X]) * s;
                D[j - 1][Y] += (D[j][Y] - D[j - 1][Y]) * s;
                D[j - 1][Z] += (D[j][Z] - D[j - 1][Z]) * s;
            }
        }
        return vdgeo.newpoint(D[0][X] / w[0], D[0][Y] / w[0], D[0][Z] / w[0]);
    };
    this.vd_vo = function(vd_gE) {
        vd_gE = Math.max(vd_gE, 8);
        var ret = [];
        if (vd_jq.length < 2) return vd_jq;
        var pt = null;
        var vd_lj;
        var vd_kc;
        var rTo = vd_ao[vd_ao.length - 1];
        var vd_xa;
        if (vd_ao[0] == vd_ao[1]) {
            vd_xa = vd_gY;
            vd_kc = vd_ao[vd_gY];
        } else {
            vd_kc = vd_ao[0];
            vd_xa = 0;
        }
        for (var span = vd_xa; vd_kc < rTo; vd_kc = vd_lj, span++) {
            vd_lj = Knot(span + 1);
            if (rTo < vd_lj) vd_lj = rTo;
            if (vdgeo.AreEqual(vd_lj - vd_kc, 0.0, vdgeo.DefaultLinearEquality)) continue;
            var t = vd_kc;
            pt = vd_yd(t, span, 0);
            if (! (ret.length > 0 && vdgeo.vd_eX(ret[ret.length - 1], pt, vdgeo.DefaultPointEquality))) {
                ret.push(pt);
            }
            var d = (vd_lj - t) / vd_gE;
            if (vdgeo.AreEqual(d, 0.0, vdgeo.DefaultLinearEquality)) continue;
            for (var j = 1; j < vd_gE; j++) {
                t += d;
                pt = vd_yd(t, span, j);
                ret.push(pt);
            }
        }
        var vd_mJ = null;
        if (vd_qT) vd_mJ = ret[0];
        else vd_mJ = vd_jq[vd_jq.length - 1];
        ret.push(vdgeo.newpoint(vd_mJ[X], vd_mJ[Y], vd_mJ[Z]));
        return ret;
    }
};
vdgeo.vd_vd = function(value) {
    return vdgeo.vd_o(value);
};
vdgeo.vd_o = function(value) {
    return (value | 0);
};
vdgeo.vd_pb = function(x, y, minx, vd_W, maxx, vd_e) {
    if (x >= minx) if (x <= maxx) if (y >= vd_W) if (y <= vd_e) return true;
    return false;
};
vdgeo.PointInRegion = function(x, y, pts) {
    var i, j;
    var c = false;
    var Count = pts.length;
    for (i = 0, j = Count - 1; i < Count; j = i++) {
        if ((((pts[i][Y] <= y) && (y < pts[j][Y])) || ((pts[j][Y] <= y) && (y < pts[i][Y])))) {
            var dis = (pts[j][X] - pts[i][X]) * (y - pts[i][Y]) / (pts[j][Y] - pts[i][Y]) + pts[i][X];
            if (x < dis && (x != dis)) c = !c;
        }
    }
    return c;
};
vdgeo.vd_rs = function(P, P0, P1) {
    if (vdgeo.vd_eX(P0, P1, vdgeo.vd_os)) return vdgeo.newpoint(P0[X], P0[Y], P0[Z]);
    var v = vdgeo.newpoint(P1[X] - P0[X], P1[Y] - P0[Y], P1[Z] - P0[Z]);
    var w = vdgeo.newpoint(P[X] - P0[X], P[Y] - P0[Y], P[Z] - P0[Z]);
    var c1 = vdgeo.vd_el(w, v);
    var c2 = vdgeo.vd_el(v, v);
    var b = c1 / c2;
    return vdgeo.newpoint(P0[X] + v[X] * b, P0[Y] + v[Y] * b, P0[Z] + v[Z] * b);
};
vdgeo.vd_kM = function(p1, p2, p3) {
    var vd_mm = vdgeo.GetAngle(p2, p3) - vdgeo.GetAngle(p2, p1);
    if (vd_mm <= 0.0 || vdgeo.AreEqual(vd_mm, 0.0, 0.000001)) vd_mm = vd_mm + vdgeo.VD_TWOPI;
    return vd_mm;
};
vdgeo.vd_HU = function(sp, ep, mp) {
    var ang1 = vdgeo.GetAngle(sp, mp) + vdgeo.HALF_PI;
    var ang2 = vdgeo.GetAngle(sp, ep) + vdgeo.HALF_PI;
    var m_1 = vdgeo.MidPoint(sp, mp);
    var m_2 = vdgeo.MidPoint(sp, ep);
    var m_1a = vdgeo.pointPolar(m_1, ang1, 100.0);
    var m_2a = vdgeo.pointPolar(m_2, ang2, 100.0);
    var ang = ang2 - ang1;
    if (ang < 0.0) ang = ang + vdgeo.VD_TWOPI;
    var cen = vdgeo.newpoint(0, 0, 0);
    var res = vdgeo.vd_kk(m_1, m_1a, m_2, m_2a, vdgeo.DefaultPointEquality, cen);
    var rad = 0.0,
    sa = 0.0,
    ea = 0.0;
    if (res === 0) return null;
    var rad = vdgeo.Distance2D(cen, sp);
    if (ang > vdgeo.PI) {
        sa = vdgeo.GetAngle(cen, ep);
        ea = vdgeo.GetAngle(cen, sp);
    } else {
        sa = vdgeo.GetAngle(cen, sp);
        ea = vdgeo.GetAngle(cen, ep);
    }
    return [cen, rad, sa, ea];
};
var vd_dW = {};
vd_dW.vd_qe = 20037508.342789244;
vd_dW.vd_qF = 6378137.000;
vd_dW.vd_Ld = function(lat, lon) {
    var x = vd_dW.vd_qF * vdgeo.DegreesToRadians(lon);
    var y = vd_dW.vd_qF * Math.log(Math.tan((vdgeo.PI * 0.25) + (0.5 * vdgeo.DegreesToRadians(lat))));
    x = Math.min(vd_dW.vd_qe, Math.max( - vd_dW.vd_qe, x));
    y = Math.min(vd_dW.vd_qe, Math.max( - vd_dW.vd_qe, y));
    return [x, y];
};
vd_dW.vd_Ij = function(noth, east) {
    var lon = vdgeo.RadiansToDegrees(east / vd_dW.vd_qF);
    var lat = vdgeo.RadiansToDegrees((vdgeo.PI * 0.5) - 2.0 * Math.atan(Math.exp( - noth / vd_dW.vd_qF)));
    return [lat, lon];
};
var _vdDocument = null;
var _vdDocTmp = null;
function vd_KK(vd_yl) {
    if (vd_yl === null) return "[object Null]";
    return Object.prototype.toString.call(vd_yl);
};
var vdgdi = {};
vdgdi.vd_hh = function(color) {
    return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
};
vdgdi.vd_sB = function(col) {
    var ret = 0;
    ret += (col[0] * col[0]);
    ret += (col[1] * col[1]);
    ret += (col[2] * col[2]);
    return Math.sqrt(ret);
};
vdgdi.WHITE = [255, 255, 255, 255];
vdgdi.BLACK = [0, 0, 0, 255];
vdgdi.vd_Ei = 61;
var vdConst = {};
vdConst.MERGEFLAGS_DEFAULT = 0;
vdConst.MERGEFLAGS_KEEP_EXISITING = 0;
vdConst.MERGEFLAGS_REPLACE_EXISITING = 1;
vdConst.MERGEFLAGS_KEEP_BOTH = 2;
vdConst.GRIPMODE_USER = 0;
vdConst.GRIPMODE_AUTO = 1;
vdConst.GRIPMODE_SINGLE = 2;
vdConst.ActionHighLightColor = [];
vdConst.Err_LoadFile = 1;
vdConst.vd_eC = 2;
vdConst.vdLine_code = 1;
vdConst.vdPolyline_code = 2;
vdConst.vdText_code = 3;
vdConst.vdRect_code = 4;
vdConst.vdCircle_code = 5;
vdConst.vdEllipse_code = 6;
vdConst.vdArc_code = 7;
vdConst.vdImage_code = 8;
vdConst.vdInsert_code = 9;
vdConst.vd3DFace_code = 10;
vdConst.vdPolyface_code = 11;
vdConst.vdAttrib_code = 12;
vdConst.vdAttribDef_code = 13;
vdConst.vdInfinityLine_code = 14;
vdConst.vdPoint_code = 15;
vdConst.vdViewport_code = 16;
vdConst.vdPolyhatch_code = 17;
vdConst.vdLayout_code = 18;
vdConst.vdBlock_code = 19;
vdConst.vdLayer_code = 20;
vdConst.vdTextstyle_code = 21;
vdConst.vdHatchPattern_code = 22;
vdConst.vdLineType_code = 23;
vdConst.vdDimension_code = 24;
vdConst.vdMText_code = 25;
vdConst.vdImageDef_code = 26;
vdConst.vdMultiline_code = 27;
vdConst.vdGroundSurface_code = 28;
vdConst.vdLeader_code = 29;
vdConst.vdGroup_code = 31;
vdConst.vd_HF = 30;
vdConst.vdView_code = 32;
vdConst.vdNote_code = 100;
vdConst.NOTE_SIZE = 32;
vdConst.NOTE_TRANSPARENT = 170;
vdConst.NOTE_LIMIT_TITLE = 32;
vdConst.NOTE_LIMIT_DESC = 255;
vdConst.NOTE_TOOLTIP_TIMEOUT = 15000;
vdConst.vd_LX = function(path) {
    return path.replace('\\', '/').split('/').pop().split('&')[0].split('#')[0].split('?')[0];
};
vdConst.vd_KJ = function(obj) {
    if (obj._t === undefined) return false;
    return obj._t === 24 || obj._t === 25 || (obj._t >= 1 && obj._t <= 17) || (obj._t >= 27 && obj._t <= 30);
};
vdConst.TextLineFlags_None = 0;
vdConst.TextLineFlags_UnderLine = 1;
vdConst.TextLineFlags_OverLine = 2;
vdConst.TextLineFlags_CenterLine = 4;
vdConst.VdConstTextstyle_BACKWARD = 2;
vdConst.VdConstTextstyle_BACKWARD_UPSIDEDOWN = 6;
vdConst.VdConstTextstyle_LEFTTORIGHT = 0;
vdConst.VdConstTextstyle_UPSIDEDOWN = 4;
vdConst.VdConstVerJust_VdTextVerBaseLine = 24;
vdConst.VdConstVerJust_VdTextVerBottom = 8;
vdConst.VdConstVerJust_VdTextVerCen = 100;
vdConst.VdConstVerJust_VdTextVerTop = 0;
vdConst.VdConstHorJust_VdTextHorAligned = 103;
vdConst.VdConstHorJust_VdTextHorCenter = 6;
vdConst.VdConstHorJust_VdTextHorFit = 105;
vdConst.VdConstHorJust_VdTextHorLeft = 0;
vdConst.VdConstHorJust_VdTextHorRight = 2;
vdConst.InfinityTypes_Ray = 0;
vdConst.InfinityTypes_XLine = 1;
vdConst.COLOR_BYLAYER = 192;
vdConst.LW_BYBLOCK = -2;
vdConst.LW_BYLAYER = -1;
vdConst.LW_DOCUMENTDEFAULT = -3;
vdConst.TransparencyMethod_ByBlock = 1;
vdConst.TransparencyMethod_ByLayer = 0;
vdConst.BlockColorOper_Layer = 0;
vdConst.BlockColorOper_Block = 1;
vdConst.vd_Mc = 0;
vdConst.vd_Fc = 1;
vdConst.vd_Ff = 2;
vdConst.vd_Ge = 3;
vdConst.PRINT_WINDOW_FLAG_EXTENTS = 1;
vdConst.PRINT_WINDOW_FLAG_VIEW = 2;
vdConst.PRINT_WINDOW_FLAG_ORIGINAL = 3;
vdConst.PRINT_SCALE_FLAG_FIT = 1;
vdConst.PRINT_SCALE_FLAG_ORIGINAL = 3;
vdConst.LINETYPE_FLAG_Dot = 0;
vdConst.LINETYPE_FLAG_TTF_TEXT = 2;
vdConst.LINETYPE_FLAG_SHX_TEXT = 4;
vdConst.ACTION_POINT_WORLD = 0;
vdConst.ACTION_LINE_WORLD = 1;
vdConst.ACTION_RECT_VIEW = 2;
vdConst.ACTION_DISPLAY_USEFILLCOLOR = 1;
vdConst.ACTION_DISPLAY_USECROSSCOLOR = 2;
vdConst.ACTION_DISPLAY_DEFAULT = 3;
vdConst.DEFAULT_ZOOMSCALE = 1;
vdConst.DEFAULT_SCROLL = 2;
vdConst.DEFAULT_ZOOMEXTENTS = 4;
vdConst.DEFAULT_ROTATE3D = 8;
vdConst.DEFAULT_MOUSE_ACTION_ALL = vdConst.DEFAULT_ZOOMSCALE + vdConst.DEFAULT_SCROLL + vdConst.DEFAULT_ZOOMEXTENTS + vdConst.DEFAULT_ROTATE3D;
vdConst.DEFAULT_MOUSE_ACTION_NONE = 0;
vdConst.vd_nd = 0;
vdConst.vd_cp = 1;
vdConst.LineTypeDrawMethod_Center = 1;
vdConst.LineTypeDrawMethod_Start = 0;
vdConst.SplineFlagSTANDARD = 0;
vdConst.SplineFlagFITTING = 1;
vdConst.SplineFlagCONTROLPOINTS = 2;
vdConst.SplineFlagQUADRATIC = 4;
vdConst.vd_Bi = 0;
vdConst.vd_ta = 1;
vdConst.RENDERMODE_WIRE_2d = 0;
vdConst.RENDERMODE_WIRE_3d = 1;
vdConst.RENDERMODE_SHADE = 3;
vdConst.RENDERMODE_RENDER = 5;
vdConst.RENDERMODE_SHADE_GL = 10;
vdConst.RENDERMODE_RENDER_GL = 11;
vdConst.vd_KW = 11;
vdConst.NUMSECTIONS = 2;
vdConst.InterpolationMode_Nearest = 0;
vdConst.InterpolationMode_Bilinear = 1;
vdConst.StdView_TOP = 0;
vdConst.StdView_BOTTOM = 1;
vdConst.StdView_FRONT = 2;
vdConst.StdView_BACK = 3;
vdConst.StdView_LEFT = 4;
vdConst.StdView_RIGHT = 5;
vdConst.StdView_ISO_NE = 6;
vdConst.StdView_ISO_NW = 7;
vdConst.StdView_ISO_SE = 8;
vdConst.StdView_ISO_SW = 9;
vdConst.InsUnitUnspecified = 0;
vdConst.InsUnitInches = 1;
vdConst.InsUnitFeet = 2;
vdConst.InsUnitMiles = 3;
vdConst.InsUnitMillimeters = 4;
vdConst.InsUnitCentimeters = 5;
vdConst.InsUnitMeters = 6;
vdConst.InsUnitKilometers = 7;
vdConst.InsUnitMicroinches = 8;
vdConst.InsUnitMils = 9;
vdConst.InsUnitYards = 10;
vdConst.InsUnitAngstroms = 11;
vdConst.InsUnitNanometers = 12;
vdConst.InsUnitMicrons = 13;
vdConst.InsUnitDecimeters = 14;
vdConst.InsUnitDekameters = 15;
vdConst.InsUnitHectometers = 16;
vdConst.InsUnitGigameters = 17;
vdConst.InsUnitAstronomical_Units = 18;
vdConst.InsUnitLight_Years = 19;
vdConst.InsUnitParsecs = 20;
vdConst.OsnapMode_NONE = 0;
vdConst.OsnapMode_END = 1;
vdConst.OsnapMode_MID = 2;
vdConst.OsnapMode_CEN = 4;
vdConst.OsnapMode_INS = 8;
vdConst.OsnapMode_NEA = 32;
vdConst.OsnapMode_NODE = 128;
vdConst.OsnapMode_QUA = 256;
vdConst.OsnapMode_DISABLE = 8192;
vdConst.OsnapMode_ALL = vdConst.OsnapMode_END + vdConst.OsnapMode_MID + vdConst.OsnapMode_CEN + vdConst.OsnapMode_INS + vdConst.OsnapMode_NEA + vdConst.OsnapMode_NODE + vdConst.OsnapMode_QUA;
vdConst.OsnapMaxItems = 100;
vdConst.vd_qc = function(vd_lx) {
    var vd_kJ = new Object();
    vd_kJ.ColorFlag = vd_lx.ColorFlag;
    vd_kJ.MaterialImage = vd_lx.MaterialImage;
    vd_kJ.ColorIndex = vd_lx.ColorIndex;
    if (vd_lx.SystemColor) {
        vd_kJ.SystemColor = [].concat(vd_lx.SystemColor);
    }
    if (vd_lx.MaterialMatrix) vd_kJ.MaterialMatrix = [].concat(vd_lx.MaterialMatrix);
    return vd_kJ;
};
vdConst.vd_BN = ['EcsMatrix', 'vd_j', 'selected', 'ps', 'BoundingBox', 'SamplePoints', 'vd_fc', 'tb', 'DiplayString', 'testlines', 'uwidths', 'owidths', 'pointSegments', 'Normals', 'UVS', 'ImageClipPts', 'ImageClipUVS', '_groups', 'excludeFromSave'];
vdConst.vd_Bf = function() {
    this.clone = function() {
        return null;
    };
    return this;
};
vdConst.cloneEntity = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy;
    if (obj instanceof vdConst.vd_Bf) return obj.clone();
    else copy = obj.constructor();
    if (obj == null) return obj;
    for (var attr in obj) {
        if (typeof(obj[attr]) == "function") continue;
        if (obj.hasOwnProperty(attr) && vdConst.vd_BN.indexOf(attr) === -1 && vd_dr.vd_Bh.indexOf(attr) === -1) {
            copy[attr] = vdConst.cloneEntity(obj[attr]);
        }
    }
    return copy;
};
vdConst.vd_xD = function(str) {
    var ret = '';
    ret += '(';
    for (var s = 0; s < str.length; s++) {
        ret += str.charCodeAt(s).toString();
        if (s < str.length - 1) ret += ',';
    }
    ret += ')';
    return ret;
};
vdConst.vd_yt = function(str) {
    return eval('String.fromCharCode' + str);
};
vdConst.vd_zB = function(vd_i) {
    if (!vd_i) return 0;
    vd_i.HandleCurrent++;
    while (vd_i['h_' + vd_i.HandleCurrent.toString()]) vd_i.HandleCurrent++;
    return vd_i.HandleCurrent;
};
vdConst.FillModeNone = "";
vdConst.FillModeSolid = "solid";
vdConst.FillModeHatchBDiagonal = "U10_45";
vdConst.FillModeHatchCross = "U20";
vdConst.FillModeHatchDiagCross = "U10_45_135";
vdConst.FillModeHatchFDiagonal = "U10_135";
vdConst.FillModeHatchHorizontal = "U10";
vdConst.FillModeHatchVertical = "U10_90";
vdConst.FillModeSingleHatch = "U1";
vdConst.FillModeDoubleHatch = "U2";
vdConst.colorToString = function(color) {
    if (color.ColorFlag == 192) return "bylayer";
    else if (color.ColorFlag == 193) return "byblock";
    else if (color.ColorFlag == 195) return color.ColorIndex.toString();
    else if (color.SystemColor) {
        var ret = "";
        for (var i = 0; i < color.SystemColor.length; i++) {
            ret += color.SystemColor[i].toString();
            if (i != color.SystemColor.length - 1) ret += ",";
        }
        return ret;
    }
    return "6";
};
vdConst.colorFromString = function(vd_GI) {
    var color = {};
    var val = vd_GI.toLowerCase();
    if (val == "bylayer") color.ColorFlag = 192;
    else if (val == "byblock") color.ColorFlag = 193;
    else {
        var vd_pZ = val.split(",");
        switch (vd_pZ.length) {
        case 0:
            break;
        case 1:
            color.ColorFlag = 195;
            color.ColorIndex = Number(vd_pZ[0]);
            break;
        default:
            color.ColorFlag = 194;
            color.SystemColor = [];
            for (var i = 0; i < vd_pZ.length; i++) {
                color.SystemColor.push(Number(vd_pZ[i]));
            }
            break;
        }
    }
    return color;
};
vdConst.createNewColor = function(vd_LM) {
    return vdConst.colorFromString(vd_LM);
};
vdConst.MouseLeftButton = 1;
vdConst.MouseMiddleButton = 2;
vdConst.MouseRightButton = 3;
var base64 = {};
base64.vd_oJ = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
base64.vd_sV = function() {
    var e, tmp;
    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
    } catch(tmp) {
        var ex = new Error("DOM vd_cv 5");
        ex.code = ex.number = 5;
        ex.name = ex.description = "INVALID_CHARACTER_ERR";
        ex.toString = function() {
            return 'Error: ' + ex.name + ': ' + ex.message;
        };
        return ex;
    }
};
base64.vd_aM = function(s, i) {
    var idx = base64.ALPHA.indexOf(s.charAt(i));
    if (idx === -1) {
        throw base64.vd_sV();
    }
    return idx;
};
base64.vd_wV = function(s) {
    s = '' + s;
    var vd_aM = base64.vd_aM;
    var pads, i, b10;
    var imax = s.length;
    if (imax === 0) {
        return s;
    }
    if (imax % 4 !== 0) {
        throw base64.vd_sV();
    }
    pads = 0;
    if (s.charAt(imax - 1) === base64.vd_oJ) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.vd_oJ) {
            pads = 2;
        }
        imax -= 4;
    }
    var x = [];
    for (i = 0; i < imax; i += 4) {
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12) | (vd_aM(s, i + 2) << 6) | vd_aM(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }
    switch (pads) {
    case 1:
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12) | (vd_aM(s, i + 2) << 6);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
        break;
    case 2:
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12);
        x.push(String.fromCharCode(b10 >> 16));
        break;
    }
    return x.join('');
};
base64.vd_Nk = function(s) {
    s = '' + s;
    var vd_aM = base64.vd_aM;
    var pads, i, b10;
    var imax = s.length;
    var x = [];
    if (imax === 0) {
        return x;
    }
    if (imax % 4 !== 0) {
        throw base64.vd_sV();
    }
    pads = 0;
    if (s.charAt(imax - 1) === base64.vd_oJ) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.vd_oJ) {
            pads = 2;
        }
        imax -= 4;
    }
    for (i = 0; i < imax; i += 4) {
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12) | (vd_aM(s, i + 2) << 6) | vd_aM(s, i + 3);
        x.push(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff);
    }
    switch (pads) {
    case 1:
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12) | (vd_aM(s, i + 2) << 6);
        x.push(b10 >> 16, (b10 >> 8) & 0xff);
        break;
    case 2:
        b10 = (vd_aM(s, i) << 18) | (vd_aM(s, i + 1) << 12);
        x.push(b10 >> 16);
        break;
    }
    return x;
};
base64.vd_iq = function(s, i) {
    return s.charCodeAt(i);
};
base64.vd_Ej = function(s) {
    var vd_sT = base64.vd_oJ;
    var alpha = base64.ALPHA;
    var vd_iq = base64.vd_iq;
    var i, b10;
    var x = [];
    var imax = s.length - s.length % 3;
    for (i = 0; i < imax; i += 3) {
        b10 = (vd_iq(s, i) << 16) | (vd_iq(s, i + 1) << 8) | vd_iq(s, i + 2);
        x.push(alpha.charAt(b10 >> 18));
        x.push(alpha.charAt((b10 >> 12) & 0x3F));
        x.push(alpha.charAt((b10 >> 6) & 0x3f));
        x.push(alpha.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
    case 1:
        b10 = vd_iq(s, i) << 16;
        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + vd_sT + vd_sT);
        break;
    case 2:
        b10 = (vd_iq(s, i) << 16) | (vd_iq(s, i + 1) << 8);
        x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + alpha.charAt((b10 >> 6) & 0x3f) + vd_sT);
        break;
    }
    return x.join('');
};
base64.vd_Nf = function(vd_qB) {
    var vd_qt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var vd_mz = new Array();
    var c = 0;
    while (c < vd_qB.length) {
        var b0 = vd_qB[c++];
        var b1 = vd_qB[c++];
        var b2 = vd_qB[c++];
        var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
        var i0 = (buf & (63 << 18)) >> 18;
        var i1 = (buf & (63 << 12)) >> 12;
        var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
        var i3 = isNaN(b2) ? 64 : (buf & 63);
        vd_mz.push(vd_qt.charAt(i0));
        vd_mz.push(vd_qt.charAt(i1));
        vd_mz.push(vd_qt.charAt(i2));
        vd_mz.push(vd_qt.charAt(i3));
    }
    return vd_mz.join('');
};
base64.sfc = function(ret) {
    var ar1 = 'String.fromCharCode(';
    var k = 0;
    for (var i = 0; i < ret.length; i++) {
        var c = ret.charCodeAt(i);
        if (c == 0) continue;
        ar1 += (c.toString() + ",");
        k++;
    }
    if (k > 0) ar1 = ar1.substr(0, ar1.length - 1);
    ar1 += ")";
    return ar1;
};
base64.vd_yq = function(ret) {
    return eval(base64.sfc(ret));
};
function _evl(sender) {
    var doc = sender.vd_h.vd_bm.GetDocument();
    if (!doc) return false;
    return doc.pathname.indexOf(String.fromCharCode(118, 100, 114, 97, 119, 46, 99, 111, 109)) >= 0;
};
function vd_LC(w, h, vd_mX) {
    var vd_U = this;
    this.vd_wj = false;
    this.root = {
        x: 0,
        y: 0,
        w: w,
        h: h
    };
    if (!w || !h) vd_U.vd_wj = true;
    this.fit = function(vd_nC) {
        vd_nC.sort(function(a, b) {
            return Math.max(a.w, a.h) - Math.max(b.w, b.h);
        });
        var n, vd_m, block, len = vd_nC.length;
        if (vd_U.vd_wj) {
            w = len > 0 ? vd_nC[0].w + vd_mX: 0;
            h = len > 0 ? vd_nC[0].h + vd_mX: 0;
        }
        vd_U.root = {
            x: 0,
            y: 0,
            w: w,
            h: h
        };
        for (n = 0; n < len; n++) {
            block = vd_nC[n];
            if (vd_m = vd_oF(vd_U.root, block.w, block.h)) block.fit = vd_wb(vd_m, block.w + vd_mX, block.h + vd_mX);
            else {
                if (vd_U.vd_wj) block.fit = vd_KV(block.w + vd_mX, block.h + vd_mX);
            }
        }
        return vd_U.root;
    };
    function vd_oF(vd_lk, _w, _h) {
        var ret = null;
        if (vd_lk.used) {
            ret = vd_oF(vd_lk.right, _w, _h);
            if (!ret) ret = vd_oF(vd_lk.down, _w, _h);
            return ret;
        } else if ((_w <= vd_lk.w) && (_h <= vd_lk.h)) return vd_lk;
        else return null;
    };
    function vd_wb(vd_m, _w, _h) {
        vd_m.used = true;
        vd_m.down = {
            x: vd_m.x,
            y: vd_m.y + _h,
            w: vd_m.w,
            h: vd_m.h - _h
        };
        vd_m.right = {
            x: vd_m.x + _w,
            y: vd_m.y,
            w: vd_m.w - _w,
            h: _h
        };
        return vd_m;
    };
    function vd_KV(_w, _h) {
        var vd_Cc = (_w <= vd_U.root.w);
        var vd_CM = (_h <= vd_U.root.h);
        var vd_IW = vd_CM && (vd_U.root.h >= (vd_U.root.w + _w));
        var vd_Kx = vd_Cc && (vd_U.root.w >= (vd_U.root.h + _h));
        if (vd_IW) return vd_xi(_w, _h);
        else if (vd_Kx) return vd_xz(_w, _h);
        else if (vd_CM) return vd_xi(_w, _h);
        else if (vd_Cc) return vd_xz(_w, _h);
        else return null;
    };
    function vd_xi(_w, _h) {
        var vd_m = null;
        vd_U.root = {
            used: true,
            x: 0,
            y: 0,
            w: vd_U.root.w + _w,
            h: vd_U.root.h,
            down: vd_U.root,
            right: {
                x: vd_U.root.w,
                y: 0,
                w: _w,
                h: vd_U.root.h
            }
        };
        if (vd_m = vd_oF(vd_U.root, _w, _h)) return vd_wb(vd_m, _w, _h);
        else return null;
    };
    function vd_xz(_w, _h) {
        var vd_m = null;
        vd_U.root = {
            used: true,
            x: 0,
            y: 0,
            w: vd_U.root.w,
            h: vd_U.root.h + _h,
            down: {
                x: 0,
                y: vd_U.root.h,
                w: vd_U.root.w,
                h: _h
            },
            right: vd_U.root
        };
        if (vd_m = vd_oF(vd_U.root, _w, _h)) return vd_wb(vd_m, _w, _h);
        else return null;
    };
    return this;
};
var trig = {};
trig.vd_Es = function(pts, i, j, k, normal, vd_dY) {
    vd_dY.m_e0 = [pts[i][X] - pts[k][X], pts[i][Y] - pts[k][Y], pts[i][Z] - pts[k][Z]];
    vd_dY.m_e1 = [pts[j][X] - pts[k][X], pts[j][Y] - pts[k][Y], pts[j][Z] - pts[k][Z]];
    vd_dY.m_N = trig.nVec(vd_dY.m_e0, vd_dY.m_e1);
    vd_dY.m_A = vdgeo.vd_el(vd_dY.m_N, vd_dY.m_N);
    if (( - vdgeo.EPSILON) < vd_dY.m_A && vd_dY.m_A < vdgeo.EPSILON) return 0;
    return (vdgeo.vd_el(vd_dY.m_N, normal) < 0.0 ? -1 : 1);
};
trig.vd_Ls = function(normal, point, q2, m_e0, m_e1, m_N, m_A) {
    var pmq2 = [point[X] - q2[X], point[Y] - q2[Y], point[Z] - q2[Z]];
    var ntmp, B0, B1;
    ntmp = trig.nVec(pmq2, m_e1);
    if ((B0 = vdgeo.vd_el(m_N, ntmp)) <= 0.0) return false;
    ntmp = trig.nVec(m_e0, pmq2);
    if ((B1 = vdgeo.vd_el(m_N, ntmp)) <= 0.0) return false;
    return ((m_A - B0 - B1) > 0.0 ? true: false);
};
trig.vd_zx = function(vd_bA, j, vd_ef) {
    while (++j < vd_ef) vd_bA[j - 1] = vd_bA[j];
    return (vd_ef - 1);
};
trig.nVec = function(e0, e1) {
    return [e0[Y] * e1[Z] - e0[Z] * e1[Y], e0[Z] * e1[X] - e0[X] * e1[Z], e0[X] * e1[Y] - e0[Y] * e1[X], ];
};
trig.vd_KL = function(pts, normal, vd_bA, i, j, k, vd_ef, m_e0, m_e1, m_N, m_A) {
    var ik = vd_bA[k];
    for (var ip = 0; ip < vd_ef; ip++) if ((ip < i || ip > k) && trig.vd_Ls(normal, pts[vd_bA[ip]], pts[ik], m_e0, m_e1, m_N, m_A)) {
        return true;
    }
    return false;
};
trig.vd_Nd = function(pts, normal) {
    if (pts.length < 3) return [];
    if (pts.length == 3) return [0, 1, 2];
    var vd_wh = 0;
    var vd_qs = true;
    var vd_ey = [];
    var vd_mp = {};
    var vd_Ir = pts.length;
    var vd_rl = -1;
    var index;
    if (!vdgeo.vd_eX(pts[pts.length - 1], pts[0], vdgeo.DefaultPointEquality)) {
        pts.push(pts[0]);
        vd_rl = pts.length - 1;
    }
    var vd_bA = [];
    vd_bA.length = pts.length + 2;
    var vd_ef = pts.length;
    var ii = 0;
    for (i = vd_wh; i < pts.length; i++) {
        if (i > vd_wh && vdgeo.vd_eX(pts[vd_bA[ii - 1]], pts[i], vdgeo.DefaultPointEquality)) continue;
        vd_bA[ii] = i;
        ii++;
    }
    for (var i = 0; i < vd_wh; i++) {
        if (i > 0 && vdgeo.vd_eX(pts[vd_bA[ii - 1]], pts[i], vdgeo.DefaultPointEquality)) continue;
        vd_bA[ii] = i;
        ii++;
    }
    vd_ef = ii;
    while (vd_ef > 3 && vd_qs) {
        vd_qs = false;
        for (var i = 0,
        j = 1,
        k = 2; k < vd_ef;) {
            switch (trig.vd_Es(pts, vd_bA[i], vd_bA[j], vd_bA[k], normal, vd_mp)) {
            case 1:
                if (trig.vd_KL(pts, normal, vd_bA, i, j, k, vd_ef, vd_mp.m_e0, vd_mp.m_e1, vd_mp.m_N, vd_mp.m_A)) {
                    i = j;
                    j = k;
                    k++;
                } else {
                    index = vd_bA[i];
                    if (index == vd_rl) index = 0;
                    vd_ey.push(index);
                    index = vd_bA[j];
                    if (index == vd_rl) index = 0;
                    vd_ey.push(index);
                    index = vd_bA[k];
                    if (index == vd_rl) index = 0;
                    vd_ey.push(index);
                    vd_ef = trig.vd_zx(vd_bA, j, vd_ef);
                    vd_qs = true;
                }
                break;
            case - 1 : i = j;
                j = k;
                k++;
                break;
            case 0:
                vd_ef = trig.vd_zx(vd_bA, j, vd_ef);
                vd_qs = true;
                break;
            }
        }
    }
    pts.length = vd_Ir;
    return vd_ey;
};
function Clip() {
    var vd_U = this;
    function vd_nt() {
        var vd_U = this;
        var vd_X = [];
        var vd_AJ = true;
        Object.defineProperty(vd_U, 'list', {
            get: function() {
                return vd_X;
            }
        });
        this.clear = function() {
            vd_X = [];
        };
        this.add = function(x, y) {
            vd_U.vd_oP(vdgeo.newpoint(x, y, 0));
        };
        this.vd_oP = function(p) {
            vd_X.push(p);
        };
        this.vd_nR = function(p) {
            throw new vd_cv("Cannot add poly to a simple poly.");
        };
        this.vd_aL = function() {
            return vd_X.length == 0;
        };
        this.vd_jK = function() {
            var ret = new vd_ls();
            for (var i = 0; i < vd_X.length; i++) {
                ret.vd_dw(vd_X[i]);
            }
            return ret;
        };
        this.vd_jv = function(vd_fO) {
            if (vd_fO != 0) {
                throw new vd_cv("vd_nt only has one poly");
            }
            return vd_U;
        };
        this.vd_gl = function() {
            return 1;
        };
        this.vd_jZ = function() {
            return vd_X.length;
        };
        this.getX = function(index) {
            return vd_X[index][X];
        };
        this.getY = function(index) {
            return vd_X[index][Y];
        };
        this.vd_jP = function() {
            return false;
        };
        this.vd_vK = function(vd_jP) {
            throw new vd_cv("vd_nt cannot be a hole");
        };
        this.vd_vi = function(vd_fO) {
            if (vd_fO != 0) {
                throw new vd_cv("vd_nt only has one poly");
            }
            return vd_AJ;
        };
        this.vd_no = function(vd_fO, vd_uB) {
            if (vd_fO != 0) {
                throw new vd_cv("vd_nt only has one poly");
            }
            vd_AJ = vd_uB;
        };
        return this;
    };
    function vd_pg() {
        var vd_U = this;
        var vd_rU = false;
        var vd_X = [];
        Object.defineProperty(vd_U, 'list', {
            get: function() {
                return vd_X;
            }
        });
        this.clear = function() {
            vd_X = [];
        };
        this.add = function(x, y) {
            vd_U.vd_oP(vdgeo.newpoint(x, y, 0));
        };
        this.vd_oP = function(p) {
            if (vd_X.length == 0) {
                vd_X.push(new vd_nt());
            }
            vd_X[0].vd_oP(p);
        };
        this.vd_nR = function(p) {
            if ((vd_X.length > 0) && vd_rU) {
                throw new vd_cv("Cannot add polys to something designated as a hole.");
            }
            vd_X.push(p);
        };
        this.vd_aL = function() {
            return vd_X.length == 0;
        };
        this.vd_jK = function() {
            if (vd_X.length == 0) {
                return new vd_ls();
            } else if (vd_X.length == 1) {
                var ip = vd_U.vd_jv(0);
                return ip.vd_jK();
            } else {
                throw new vd_cv("vd_jK not supported on complex poly.");
            }
        };
        this.vd_jv = function(vd_fO) {
            return vd_X[vd_fO];
        };
        this.vd_gl = function() {
            return vd_X.length;
        };
        this.vd_jZ = function() {
            return vd_X[0].vd_jZ();
        };
        this.getX = function(index) {
            return vd_X[0].getX(index);
        };
        this.getY = function(index) {
            return vd_X[0].getY(index);
        };
        this.vd_jP = function() {
            if (vd_X.length > 1) {
                throw new vd_cv("Cannot call on a poly made up of more than one poly.");
            }
            return vd_rU;
        };
        this.vd_vK = function(vd_jP) {
            if (vd_X.length > 1) {
                throw new vd_cv("Cannot call on a poly made up of more than one poly.");
            }
            vd_rU = vd_jP;
        };
        this.vd_vi = function(vd_fO) {
            return vd_X[vd_fO].vd_vi(0);
        };
        this.vd_no = function(vd_fO, vd_uB) {
            if (vd_X.length != 1) {
                throw new vd_cv("Only applies to polys of size 1");
            }
            vd_X[vd_fO].vd_no(0, vd_uB);
        };
        return this;
    };
    var vd_Cl = -3.40282e + 038;
    var vd_Bx = 2.2204460492503131e-016;
    var LEFT = 0;
    var RIGHT = 1;
    var ABOVE = 0;
    var BELOW = 1;
    var CLIP = 0;
    var vd_P = 1;
    function vd_rJ() {
        return new vd_pg();
    };
    function vd_GC(op, subj, clip) {
        var result = vd_rJ();
        if ((subj.vd_aL() && clip.vd_aL()) || (subj.vd_aL() && ((op == vd_al.vd_fu) || (op == vd_al.vd_ep))) || (clip.vd_aL() && (op == vd_al.vd_fu))) {
            return result;
        }
        if (((op == vd_al.vd_fu) || (op == vd_al.vd_ep)) && !subj.vd_aL() && !clip.vd_aL()) {
            vd_zy(subj, clip, op);
        }
        var vd_bW = new vd_Aa();
        var sbte = new vd_Az();
        var vd_vO = null;
        var vd_vA = null;
        if (!subj.vd_aL()) {
            vd_vO = vd_pX(vd_bW, sbte, subj, vd_P, op);
        }
        if (!clip.vd_aL()) {
            vd_vA = vd_pX(vd_bW, sbte, clip, CLIP, op);
        }
        if (vd_bW.vd_n == null) {
            return result;
        }
        var sbt = sbte.vd_BU();
        var vd_w = [0, 0];
        vd_w[0] = LEFT;
        vd_w[1] = LEFT;
        if (op == vd_al.vd_ep) {
            vd_w[CLIP] = RIGHT;
        }
        var vd_gb = vd_bW.vd_n;
        var vd_dq = new vd_Kv();
        var aet = new vd_xV();
        var vd_gy = 0;
        while (vd_gy < sbt.length) {
            var yb = sbt[vd_gy++];
            var yt = 0.0;
            var dy = 0.0;
            if (vd_gy < sbt.length) {
                yt = sbt[vd_gy];
                dy = yt - yb;
            }
            if (vd_gb != null) {
                if (vd_gb.y == yb) {
                    for (var edge = vd_gb.vd_iH; (edge != null); edge = edge.vd_eJ) {
                        vd_xQ(aet, edge);
                    }
                    vd_gb = vd_gb.next;
                }
            }
            var px = vd_Cl;
            var e0 = aet.vd_n;
            var e1 = aet.vd_n;
            aet.vd_n.vd_I[ABOVE][aet.vd_n.type] = (aet.vd_n.top[Y] != yb) ? 1 : 0;
            aet.vd_n.vd_I[ABOVE][((aet.vd_n.type == 0) ? 1 : 0)] = 0;
            aet.vd_n.vd_ax[ABOVE] = vd_aC.vd_fE;
            for (var vd_G = aet.vd_n.next; (vd_G != null); vd_G = vd_G.next) {
                var vd_gZ = vd_G.type;
                var vd_jA = ((vd_G.type == 0) ? 1 : 0);
                vd_G.vd_I[ABOVE][vd_gZ] = (vd_G.top[Y] != yb) ? 1 : 0;
                vd_G.vd_I[ABOVE][vd_jA] = 0;
                vd_G.vd_ax[ABOVE] = vd_aC.vd_fE;
                if (vd_G.vd_I[ABOVE][vd_gZ] == 1) {
                    if (EQ(e0.xb, vd_G.xb) && EQ(e0.dx, vd_G.dx) && (e0.top[Y] != yb)) {
                        vd_G.vd_I[ABOVE][vd_gZ] ^= e0.vd_I[ABOVE][vd_gZ];
                        vd_G.vd_I[ABOVE][vd_jA] = e0.vd_I[ABOVE][vd_jA];
                        vd_G.vd_ax[ABOVE] = vd_aC.vd_hk;
                        e0.vd_I[ABOVE][CLIP] = 0;
                        e0.vd_I[ABOVE][vd_P] = 0;
                        e0.vd_ax[ABOVE] = vd_aC.vd_hn;
                    }
                    e0 = vd_G;
                }
            }
            var vd_az = [0, 0];
            vd_az[CLIP] = vd_N.NH;
            vd_az[vd_P] = vd_N.NH;
            var vd_at = [0, 0];
            vd_at[CLIP] = 0;
            vd_at[vd_P] = 0;
            var cf = null;
            for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                vd_at[CLIP] = edge.vd_I[ABOVE][CLIP] + (edge.vd_I[BELOW][CLIP] << 1);
                vd_at[vd_P] = edge.vd_I[ABOVE][vd_P] + (edge.vd_I[BELOW][vd_P] << 1);
                if ((vd_at[CLIP] != 0) || (vd_at[vd_P] != 0)) {
                    edge.vd_bh[CLIP] = vd_w[CLIP];
                    edge.vd_bh[vd_P] = vd_w[vd_P];
                    var vd_hH = false;
                    var br = 0,
                    bl = 0,
                    tr = 0,
                    tl = 0;
                    if ((op == vd_al.vd_ep) || (op == vd_al.vd_fu)) {
                        vd_hH = ((vd_at[CLIP] != 0) && ((vd_w[vd_P] != 0) || (vd_az[vd_P] != 0))) || ((vd_at[vd_P] != 0) && ((vd_w[CLIP] != 0) || (vd_az[CLIP] != 0))) || ((vd_at[CLIP] != 0) && (vd_at[vd_P] != 0) && (vd_w[CLIP] == vd_w[vd_P]));
                        br = ((vd_w[CLIP] != 0) && (vd_w[vd_P] != 0)) ? 1 : 0;
                        bl = (((vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) != 0) && ((vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        tr = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) != 0) && ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0)) != 0)) ? 1 : 0;
                        tl = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) != 0) && ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]) != 0)) ? 1 : 0;
                    } else if (op == vd_al.vd_lK) {
                        vd_hH = (vd_at[CLIP] != 0) || (vd_at[vd_P] != 0);
                        br = (vd_w[CLIP]) ^ (vd_w[vd_P]);
                        bl = (vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) ^ (vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]);
                        tr = (vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) ^ (vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0));
                        tl = (vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) ^ (vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]);
                    } else if (op == vd_al.vd_ok) {
                        vd_hH = ((vd_at[CLIP] != 0) && (!(vd_w[vd_P] != 0) || (vd_az[vd_P] != 0))) || ((vd_at[vd_P] != 0) && (!(vd_w[CLIP] != 0) || (vd_az[CLIP] != 0))) || ((vd_at[CLIP] != 0) && (vd_at[vd_P] != 0) && (vd_w[CLIP] == vd_w[vd_P]));
                        br = ((vd_w[CLIP] != 0) || (vd_w[vd_P] != 0)) ? 1 : 0;
                        bl = (((vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) != 0) || ((vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        tr = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) != 0) || ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0)) != 0)) ? 1 : 0;
                        tl = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) != 0) || ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]) != 0)) ? 1 : 0;
                    } else {
                        throw new vd_cv("Unknown op");
                    }
                    vd_w[CLIP] ^= edge.vd_I[ABOVE][CLIP];
                    vd_w[vd_P] ^= edge.vd_I[ABOVE][vd_P];
                    if (vd_at[CLIP] != 0) {
                        vd_az[CLIP] = vd_N.vd_qJ[vd_az[CLIP]][((vd_at[CLIP] - 1) << 1) + vd_w[CLIP]];
                    }
                    if (vd_at[vd_P] != 0) {
                        vd_az[vd_P] = vd_N.vd_qJ[vd_az[vd_P]][((vd_at[vd_P] - 1) << 1) + vd_w[vd_P]];
                    }
                    if (vd_hH) {
                        var xb = edge.xb;
                        var vd_iY = vd_D.vd_tj(tr, tl, br, bl);
                        switch (vd_iY) {
                        case vd_D.EMN:
                        case vd_D.IMN:
                            edge.vd_z[ABOVE] = vd_dq.vd_ky(xb, yb);
                            px = xb;
                            cf = edge.vd_z[ABOVE];
                            break;
                        case vd_D.ERI:
                            if (xb != px) {
                                cf.vd_hE(xb, yb);
                                px = xb;
                            }
                            edge.vd_z[ABOVE] = cf;
                            cf = null;
                            break;
                        case vd_D.ELI:
                            edge.vd_z[BELOW].vd_gL(xb, yb);
                            px = xb;
                            cf = edge.vd_z[BELOW];
                            break;
                        case vd_D.EMX:
                            if (xb != px) {
                                cf.vd_gL(xb, yb);
                                px = xb;
                            }
                            vd_dq.vd_pR(cf, edge.vd_z[BELOW]);
                            cf = null;
                            break;
                        case vd_D.ILI:
                            if (xb != px) {
                                cf.vd_gL(xb, yb);
                                px = xb;
                            }
                            edge.vd_z[ABOVE] = cf;
                            cf = null;
                            break;
                        case vd_D.IRI:
                            edge.vd_z[BELOW].vd_hE(xb, yb);
                            px = xb;
                            cf = edge.vd_z[BELOW];
                            edge.vd_z[BELOW] = null;
                            break;
                        case vd_D.IMX:
                            if (xb != px) {
                                cf.vd_hE(xb, yb);
                                px = xb;
                            }
                            vd_dq.vd_nG(cf, edge.vd_z[BELOW]);
                            cf = null;
                            edge.vd_z[BELOW] = null;
                            break;
                        case vd_D.IMM:
                            if (xb != px) {
                                cf.vd_hE(xb, yb);
                                px = xb;
                            }
                            vd_dq.vd_nG(cf, edge.vd_z[BELOW]);
                            edge.vd_z[BELOW] = null;
                            edge.vd_z[ABOVE] = vd_dq.vd_ky(xb, yb);
                            cf = edge.vd_z[ABOVE];
                            break;
                        case vd_D.EMM:
                            if (xb != px) {
                                cf.vd_gL(xb, yb);
                                px = xb;
                            }
                            vd_dq.vd_pR(cf, edge.vd_z[BELOW]);
                            edge.vd_z[BELOW] = null;
                            edge.vd_z[ABOVE] = vd_dq.vd_ky(xb, yb);
                            cf = edge.vd_z[ABOVE];
                            break;
                        case vd_D.LED:
                            if (edge.bot[Y] == yb) edge.vd_z[BELOW].vd_gL(xb, yb);
                            edge.vd_z[ABOVE] = edge.vd_z[BELOW];
                            px = xb;
                            break;
                        case vd_D.RED:
                            if (edge.bot[Y] == yb) edge.vd_z[BELOW].vd_hE(xb, yb);
                            edge.vd_z[ABOVE] = edge.vd_z[BELOW];
                            px = xb;
                            break;
                        default:
                            break;
                        }
                    }
                }
            }
            for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                if (edge.top[Y] == yb) {
                    var vd_T = edge.prev;
                    var vd_G = edge.next;
                    if (vd_T != null) vd_T.next = vd_G;
                    else aet.vd_n = vd_G;
                    if (vd_G != null) vd_G.prev = vd_T;
                    if ((edge.vd_ax[BELOW] == vd_aC.vd_hk) && (vd_T != null)) {
                        if (vd_T.vd_ax[BELOW] == vd_aC.vd_hn) {
                            vd_T.vd_z[BELOW] = edge.vd_z[BELOW];
                            vd_T.vd_ax[BELOW] = vd_aC.vd_fE;
                            if (vd_T.prev != null) {
                                if (vd_T.prev.vd_ax[BELOW] == vd_aC.vd_hn) {
                                    vd_T.vd_ax[BELOW] = vd_aC.vd_hk;
                                }
                            }
                        }
                    }
                } else {
                    if (edge.top[Y] == yt) edge.xt = edge.top[X];
                    else edge.xt = edge.bot[X] + edge.dx * (yt - edge.bot[Y]);
                }
            }
            if (vd_gy < sbte.vd_kz) {
                var vd_mH = new vd_zi();
                vd_mH.vd_Bp(aet, dy);
                for (var vd_ck = vd_mH.vd_n; (vd_ck != null); vd_ck = vd_ck.next) {
                    e0 = vd_ck.ie[0];
                    e1 = vd_ck.ie[1];
                    if (((e0.vd_I[ABOVE][CLIP] != 0) || (e0.vd_I[ABOVE][vd_P] != 0)) && ((e1.vd_I[ABOVE][CLIP] != 0) || (e1.vd_I[ABOVE][vd_P] != 0))) {
                        var p = e0.vd_z[ABOVE];
                        var q = e1.vd_z[ABOVE];
                        var ix = vd_ck.point[X];
                        var iy = vd_ck.point[Y] + yb;
                        var vd_bi = (((e0.vd_I[ABOVE][CLIP] != 0) && !(e0.vd_bh[CLIP] != 0)) || ((e1.vd_I[ABOVE][CLIP] != 0) && (e1.vd_bh[CLIP] != 0)) || (!(e0.vd_I[ABOVE][CLIP] != 0) && !(e1.vd_I[ABOVE][CLIP] != 0) && (e0.vd_bh[CLIP] != 0) && (e1.vd_bh[CLIP] != 0))) ? 1 : 0;
                        var vd_am = (((e0.vd_I[ABOVE][vd_P] != 0) && !(e0.vd_bh[vd_P] != 0)) || ((e1.vd_I[ABOVE][vd_P] != 0) && (e1.vd_bh[vd_P] != 0)) || (!(e0.vd_I[ABOVE][vd_P] != 0) && !(e1.vd_I[ABOVE][vd_P] != 0) && (e0.vd_bh[vd_P] != 0) && (e1.vd_bh[vd_P] != 0))) ? 1 : 0;
                        var tr = 0,
                        tl = 0,
                        br = 0,
                        bl = 0;
                        if ((op == vd_al.vd_ep) || (op == vd_al.vd_fu)) {
                            tr = ((vd_bi != 0) && (vd_am != 0)) ? 1 : 0;
                            tl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e1.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            br = (((vd_bi ^ e0.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            bl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        } else if (op == vd_al.vd_lK) {
                            tr = (vd_bi) ^ (vd_am);
                            tl = (vd_bi ^ e1.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e1.vd_I[ABOVE][vd_P]);
                            br = (vd_bi ^ e0.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e0.vd_I[ABOVE][vd_P]);
                            bl = (vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]);
                        } else if (op == vd_al.vd_ok) {
                            tr = ((vd_bi != 0) || (vd_am != 0)) ? 1 : 0;
                            tl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e1.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            br = (((vd_bi ^ e0.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            bl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        } else {
                            throw new vd_cv("Unknown op type, " + op);
                        }
                        var vd_iY = vd_D.vd_tj(tr, tl, br, bl);
                        switch (vd_iY) {
                        case vd_D.EMN:
                            e0.vd_z[ABOVE] = vd_dq.vd_ky(ix, iy);
                            e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                            break;
                        case vd_D.ERI:
                            if (p != null) {
                                p.vd_hE(ix, iy);
                                e1.vd_z[ABOVE] = p;
                                e0.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.ELI:
                            if (q != null) {
                                q.vd_gL(ix, iy);
                                e0.vd_z[ABOVE] = q;
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.EMX:
                            if ((p != null) && (q != null)) {
                                p.vd_gL(ix, iy);
                                vd_dq.vd_pR(p, q);
                                e0.vd_z[ABOVE] = null;
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IMN:
                            e0.vd_z[ABOVE] = vd_dq.vd_ky(ix, iy);
                            e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                            break;
                        case vd_D.ILI:
                            if (p != null) {
                                p.vd_gL(ix, iy);
                                e1.vd_z[ABOVE] = p;
                                e0.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IRI:
                            if (q != null) {
                                q.vd_hE(ix, iy);
                                e0.vd_z[ABOVE] = q;
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IMX:
                            if ((p != null) && (q != null)) {
                                p.vd_hE(ix, iy);
                                vd_dq.vd_nG(p, q);
                                e0.vd_z[ABOVE] = null;
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IMM:
                            if ((p != null) && (q != null)) {
                                p.vd_hE(ix, iy);
                                vd_dq.vd_nG(p, q);
                                e0.vd_z[ABOVE] = vd_dq.vd_ky(ix, iy);
                                e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                            }
                            break;
                        case vd_D.EMM:
                            if ((p != null) && (q != null)) {
                                p.vd_gL(ix, iy);
                                vd_dq.vd_pR(p, q);
                                e0.vd_z[ABOVE] = vd_dq.vd_ky(ix, iy);
                                e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                            }
                            break;
                        default:
                            break;
                        }
                    }
                    if (e0.vd_I[ABOVE][CLIP] != 0) e1.vd_bh[CLIP] = (e1.vd_bh[CLIP] == 0) ? 1 : 0;
                    if (e1.vd_I[ABOVE][CLIP] != 0) e0.vd_bh[CLIP] = (e0.vd_bh[CLIP] == 0) ? 1 : 0;
                    if (e0.vd_I[ABOVE][vd_P] != 0) e1.vd_bh[vd_P] = (e1.vd_bh[vd_P] == 0) ? 1 : 0;
                    if (e1.vd_I[ABOVE][vd_P] != 0) e0.vd_bh[vd_P] = (e0.vd_bh[vd_P] == 0) ? 1 : 0;
                    var vd_T = e0.prev;
                    var vd_G = e1.next;
                    if (vd_G != null) {
                        vd_G.prev = e0;
                    }
                    if (e0.vd_ax[ABOVE] == vd_aC.vd_hk) {
                        var search = true;
                        while (search) {
                            vd_T = vd_T.prev;
                            if (vd_T != null) {
                                if (vd_T.vd_ax[ABOVE] != vd_aC.vd_hn) {
                                    search = false;
                                }
                            } else {
                                search = false;
                            }
                        }
                    }
                    if (vd_T == null) {
                        aet.vd_n.prev = e1;
                        e1.next = aet.vd_n;
                        aet.vd_n = e0.next;
                    } else {
                        vd_T.next.prev = e1;
                        e1.next = vd_T.next;
                        vd_T.next = e0.next;
                    }
                    e0.next.prev = vd_T;
                    e1.next.prev = e1;
                    e0.next = vd_G;
                }
                for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                    var vd_G = edge.next;
                    var vd_dO = edge.succ;
                    if ((edge.top[Y] == yt) && (vd_dO != null)) {
                        vd_dO.vd_z[BELOW] = edge.vd_z[ABOVE];
                        vd_dO.vd_ax[BELOW] = edge.vd_ax[ABOVE];
                        vd_dO.vd_I[BELOW][CLIP] = edge.vd_I[ABOVE][CLIP];
                        vd_dO.vd_I[BELOW][vd_P] = edge.vd_I[ABOVE][vd_P];
                        var vd_T = edge.prev;
                        if (vd_T != null) vd_T.next = vd_dO;
                        else aet.vd_n = vd_dO;
                        if (vd_G != null) vd_G.prev = vd_dO;
                        vd_dO.prev = vd_T;
                        vd_dO.next = vd_G;
                    } else {
                        edge.vd_z[BELOW] = edge.vd_z[ABOVE];
                        edge.vd_ax[BELOW] = edge.vd_ax[ABOVE];
                        edge.vd_I[BELOW][CLIP] = edge.vd_I[ABOVE][CLIP];
                        edge.vd_I[BELOW][vd_P] = edge.vd_I[ABOVE][vd_P];
                        edge.xb = edge.xt;
                    }
                    edge.vd_z[ABOVE] = null;
                }
            }
        }
        result = vd_dq.vd_Ln();
        return result;
    };
    function EQ(a, b) {
        return (Math.abs(a - b) <= vd_Bx);
    };
    function vd_jb(i, n) {
        return ((i - 1 + n) % n);
    };
    function vd_kV(i, n) {
        return ((i + 1) % n);
    };
    function vd_LV(p, i) {
        return (p.getY(vd_jb(i, p.vd_jZ())) != p.getY(i)) || (p.getY(vd_kV(i, p.vd_jZ())) != p.getY(i));
    };
    function vd_Cm(p) {
        var box = [];
        box.length = p.vd_gl();
        for (var c = 0; c < p.vd_gl(); c++) {
            var vd_JZ = p.vd_jv(c);
            box[c] = vd_JZ.vd_jK();
        }
        return box;
    };
    function vd_zy(subj, clip, op) {
        var vd_pc = vd_Cm(subj);
        var vd_py = vd_Cm(clip);
        var vd_se = subj.vd_gl();
        var vd_qK = clip.vd_gl();
        var vd_uU = [vd_se, vd_qK];
        for (var s = 0; s < vd_se; s++) {
            for (var c = 0; c < vd_qK; c++) {
                vd_uU[s, c] = (!((vd_pc[s].vd_bs[X] < vd_py[c].vd_aa[X]) || (vd_pc[s].vd_aa[X] > vd_py[c].vd_bs[X]))) && (!((vd_pc[s].vd_bs[Y] < vd_py[c].vd_aa[Y]) || (vd_pc[s].vd_aa[Y] > vd_py[c].vd_bs[Y])));
            }
        }
        for (var c = 0; c < vd_qK; c++) {
            var vd_lg = false;
            for (var s = 0; ! vd_lg && (s < vd_se); s++) {
                vd_lg = vd_uU[s, c];
            }
            if (!vd_lg) {
                clip.vd_no(c, false);
            }
        }
        if (op == vd_al.vd_fu) {
            for (var s = 0; s < vd_se; s++) {
                var vd_lg = false;
                for (var c = 0; ! vd_lg && (c < vd_qK); c++) {
                    vd_lg = vd_uU[s, c];
                }
                if (!vd_lg) {
                    subj.vd_no(s, false);
                }
            }
        }
    };
    function vd_Bs(vd_bW, y) {
        if (vd_bW.vd_n == null) {
            vd_bW.vd_n = new vd_wk(y);
            return vd_bW.vd_n;
        } else {
            var prev = null;
            var vd_m = vd_bW.vd_n;
            var done = false;
            while (!done) {
                if (y < vd_m.y) {
                    var vd_mI = vd_m;
                    vd_m = new vd_wk(y);
                    vd_m.next = vd_mI;
                    if (prev == null) {
                        vd_bW.vd_n = vd_m;
                    } else {
                        prev.next = vd_m;
                    }
                    done = true;
                } else if (y > vd_m.y) {
                    if (vd_m.next == null) {
                        vd_m.next = new vd_wk(y);
                        vd_m = vd_m.next;
                        done = true;
                    } else {
                        prev = vd_m;
                        vd_m = vd_m.next;
                    }
                } else {
                    done = true;
                }
            }
            return vd_m;
        }
    };
    function vd_zo(vd_oz, e) {
        if (vd_oz.vd_iH == null) {
            vd_oz.vd_iH = e;
        } else {
            var done = false;
            var vd_lo = null;
            var vd_dA = vd_oz.vd_iH;
            while (!done) {
                if (e.bot[X] < vd_dA.bot[X]) {
                    if (vd_lo == null) {
                        vd_oz.vd_iH = e;
                    } else {
                        vd_lo.vd_eJ = e;
                    }
                    e.vd_eJ = vd_dA;
                    done = true;
                } else if (e.bot[X] == vd_dA.bot[X]) {
                    if (e.dx < vd_dA.dx) {
                        if (vd_lo == null) {
                            vd_oz.vd_iH = e;
                        } else {
                            vd_lo.vd_eJ = e;
                        }
                        e.vd_eJ = vd_dA;
                        done = true;
                    } else {
                        if (vd_dA.vd_eJ == null) {
                            vd_dA.vd_eJ = e;
                            done = true;
                        } else {
                            vd_lo = vd_dA;
                            vd_dA = vd_dA.vd_eJ;
                        }
                    }
                } else {
                    if (vd_dA.vd_eJ == null) {
                        vd_dA.vd_eJ = e;
                        done = true;
                    } else {
                        vd_lo = vd_dA;
                        vd_dA = vd_dA.vd_eJ;
                    }
                }
            }
        }
    };
    function vd_xQ(aet, edge) {
        if (aet.vd_n == null) {
            aet.vd_n = edge;
            edge.prev = null;
            edge.next = null;
        } else {
            var vd_cY = aet.vd_n;
            var prev = null;
            var done = false;
            while (!done) {
                if (edge.xb < vd_cY.xb) {
                    edge.prev = prev;
                    edge.next = vd_cY;
                    vd_cY.prev = edge;
                    if (prev == null) {
                        aet.vd_n = edge;
                    } else {
                        prev.next = edge;
                    }
                    done = true;
                } else if (edge.xb == vd_cY.xb) {
                    if (edge.dx < vd_cY.dx) {
                        edge.prev = prev;
                        edge.next = vd_cY;
                        vd_cY.prev = edge;
                        if (prev == null) {
                            aet.vd_n = edge;
                        } else {
                            prev.next = edge;
                        }
                        done = true;
                    } else {
                        prev = vd_cY;
                        if (vd_cY.next == null) {
                            vd_cY.next = edge;
                            edge.prev = vd_cY;
                            edge.next = null;
                            done = true;
                        } else {
                            vd_cY = vd_cY.next;
                        }
                    }
                } else {
                    prev = vd_cY;
                    if (vd_cY.next == null) {
                        vd_cY.next = edge;
                        edge.prev = vd_cY;
                        edge.next = null;
                        done = true;
                    } else {
                        vd_cY = vd_cY.next;
                    }
                }
            }
        }
    };
    function vd_Kq(sbte, y) {
        if (sbte.vd_qu == null) {
            sbte.vd_qu = new vd_rA(y);
            sbte.vd_kz++;
            return;
        }
        var vd_hm = sbte.vd_qu;
        var done = false;
        while (!done) {
            if (vd_hm.y > y) {
                if (vd_hm.less == null) {
                    vd_hm.less = new vd_rA(y);
                    sbte.vd_kz++;
                    done = true;
                } else {
                    vd_hm = vd_hm.less;
                }
            } else if (vd_hm.y < y) {
                if (vd_hm.more == null) {
                    vd_hm.more = new vd_rA(y);
                    sbte.vd_kz++;
                    done = true;
                } else {
                    vd_hm = vd_hm.more;
                }
            } else {
                done = true;
            }
        }
    };
    function vd_pX(vd_bW, sbte, p, type, op) {
        var vd_cf = new vd_xv();
        for (var c = 0; c < p.vd_gl(); c++) {
            var ip = p.vd_jv(c);
            if (!ip.vd_vi(0)) {
                ip.vd_no(0, true);
            } else {
                var vd_ht = 0;
                var vd_fY = 0;
                vd_cf = new vd_xv();
                for (var i = 0; i < ip.vd_jZ(); i++) {
                    if (vd_LV(ip, i)) {
                        var x = ip.getX(i);
                        var y = ip.getY(i);
                        vd_cf.vd_Gz(x, y);
                        vd_Kq(sbte, ip.getY(i));
                        vd_ht++;
                    }
                }
                for (var min = 0; min < vd_ht; min++) {
                    if (vd_cf.vd_DL(min)) {
                        var vd_dZ = 1;
                        var max = vd_kV(min, vd_ht);
                        while (vd_cf.vd_Hu(max)) {
                            vd_dZ++;
                            max = vd_kV(max, vd_ht);
                        }
                        var v = min;
                        var e = vd_cf.vd_fF(vd_fY);
                        e.vd_ax[BELOW] = vd_aC.vd_fE;
                        e.vd_I[BELOW][CLIP] = 0;
                        e.vd_I[BELOW][vd_P] = 0;
                        for (var i = 0; i < vd_dZ; i++) {
                            var ei = vd_cf.vd_fF(vd_fY + i);
                            var ev = vd_cf.vd_fF(v);
                            ei.xb = ev.vd_b[X];
                            ei.bot[X] = ev.vd_b[X];
                            ei.bot[Y] = ev.vd_b[Y];
                            v = vd_kV(v, vd_ht);
                            ev = vd_cf.vd_fF(v);
                            ei.top[X] = ev.vd_b[X];
                            ei.top[Y] = ev.vd_b[Y];
                            ei.dx = (ev.vd_b[X] - ei.bot[X]) / (ei.top[Y] - ei.bot[Y]);
                            ei.type = type;
                            ei.vd_z[ABOVE] = null;
                            ei.vd_z[BELOW] = null;
                            ei.next = null;
                            ei.prev = null;
                            ei.succ = ((vd_dZ > 1) && (i < (vd_dZ - 1))) ? vd_cf.vd_fF(vd_fY + i + 1) : null;
                            ei.pred = ((vd_dZ > 1) && (i > 0)) ? vd_cf.vd_fF(vd_fY + i - 1) : null;
                            ei.vd_eJ = null;
                            ei.vd_bh[CLIP] = (op == vd_al.vd_ep) ? RIGHT: LEFT;
                            ei.vd_bh[vd_P] = LEFT;
                        }
                        vd_zo(vd_Bs(vd_bW, vd_cf.vd_fF(min).vd_b[Y]), e);
                        vd_fY += vd_dZ;
                    }
                }
                for (var min = 0; min < vd_ht; min++) {
                    if (vd_cf.vd_Mi(min)) {
                        var vd_dZ = 1;
                        var max = vd_jb(min, vd_ht);
                        while (vd_cf.vd_JT(max)) {
                            vd_dZ++;
                            max = vd_jb(max, vd_ht);
                        }
                        var v = min;
                        var e = vd_cf.vd_fF(vd_fY);
                        e.vd_ax[BELOW] = vd_aC.vd_fE;
                        e.vd_I[BELOW][CLIP] = 0;
                        e.vd_I[BELOW][vd_P] = 0;
                        for (var i = 0; i < vd_dZ; i++) {
                            var ei = vd_cf.vd_fF(vd_fY + i);
                            var ev = vd_cf.vd_fF(v);
                            ei.xb = ev.vd_b[X];
                            ei.bot[X] = ev.vd_b[X];
                            ei.bot[Y] = ev.vd_b[Y];
                            v = vd_jb(v, vd_ht);
                            ev = vd_cf.vd_fF(v);
                            ei.top[X] = ev.vd_b[X];
                            ei.top[Y] = ev.vd_b[Y];
                            ei.dx = (ev.vd_b[X] - ei.bot[X]) / (ei.top[Y] - ei.bot[Y]);
                            ei.type = type;
                            ei.vd_z[ABOVE] = null;
                            ei.vd_z[BELOW] = null;
                            ei.next = null;
                            ei.prev = null;
                            ei.succ = ((vd_dZ > 1) && (i < (vd_dZ - 1))) ? vd_cf.vd_fF(vd_fY + i + 1) : null;
                            ei.pred = ((vd_dZ > 1) && (i > 0)) ? vd_cf.vd_fF(vd_fY + i - 1) : null;
                            ei.vd_eJ = null;
                            ei.vd_bh[CLIP] = (op == vd_al.vd_ep) ? RIGHT: LEFT;
                            ei.vd_bh[vd_P] = LEFT;
                        }
                        vd_zo(vd_Bs(vd_bW, vd_cf.vd_fF(min).vd_b[Y]), e);
                        vd_fY += vd_dZ;
                    }
                }
            }
        }
        return vd_cf;
    };
    function vd_xm(st, it, edge, dy) {
        if (st == null) {
            st = new vd_xM(edge, null);
        } else {
            var den = (st.xt - st.xb) - (edge.xt - edge.xb);
            if ((edge.xt >= st.xt) || (edge.dx == st.dx) || (Math.abs(den) <= vd_Bx)) {
                var vd_mI = st;
                st = new vd_xM(edge, vd_mI);
            } else {
                var r = (edge.xb - st.xb) / den;
                var x = st.xb + r * (st.xt - st.xb);
                var y = r * dy;
                it.vd_n = vd_zO(it.vd_n, st.edge, edge, x, y);
                st.prev = vd_xm(st.prev, it, edge, dy);
            }
        }
        return st;
    };
    function vd_zO(vd_hU, vd_oc, vd_kF, x, y) {
        if (vd_hU == null) {
            vd_hU = new vd_Ad(vd_oc, vd_kF, x, y, null);
        } else {
            if (vd_hU.point[Y] > y) {
                var vd_mI = vd_hU;
                vd_hU = new vd_Ad(vd_oc, vd_kF, x, y, vd_mI);
            } else {
                vd_hU.next = vd_zO(vd_hU.next, vd_oc, vd_kF, x, y);
            }
        }
        return vd_hU;
    };
    var vd_al = {
        vd_ep: 0,
        vd_fu: 1,
        vd_lK: 2,
        vd_ok: 3
    };
    var vd_D = {
        NUL: 0,
        EMX: 1,
        ELI: 2,
        TED: 3,
        ERI: 4,
        RED: 5,
        IMM: 6,
        IMN: 7,
        EMN: 8,
        EMM: 9,
        LED: 10,
        ILI: 11,
        BED: 12,
        IRI: 13,
        IMX: 14,
        FUL: 15,
        vd_tj: function(tr, tl, br, bl) {
            return tr + (tl << 1) + (br << 2) + (bl << 3);
        }
    };
    var vd_N = {};
    vd_N.NH = 0;
    vd_N.BH = 1;
    vd_N.TH = 2;
    vd_N.vd_qJ = [[vd_N.BH, vd_N.TH, vd_N.TH, vd_N.BH, vd_N.NH, vd_N.NH], [vd_N.NH, vd_N.NH, vd_N.NH, vd_N.NH, vd_N.TH, vd_N.TH], [vd_N.NH, vd_N.NH, vd_N.NH, vd_N.NH, vd_N.BH, vd_N.BH]];
    var vd_aC = {
        vd_fE: "vd_fE",
        vd_hk: "vd_hk",
        vd_hn: "vd_hn"
    };
    function vd_te(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.next = null;
        return this;
    };
    function vd_AM(next, x, y) {
        var vd_U = this;
        this.hole = false;
        var vn = new vd_te(x, y);
        this.v = [];
        this.v[LEFT] = vn;
        this.v[RIGHT] = vn;
        this.next = next;
        this.proxy = this;
        this.active = 1;
        this.vd_hE = function(x, y) {
            var nv = new vd_te(x, y);
            vd_U.proxy.v[RIGHT].next = nv;
            vd_U.proxy.v[RIGHT] = nv;
        };
        this.vd_gL = function(x, y) {
            var nv = new vd_te(x, y);
            nv.next = vd_U.proxy.v[LEFT];
            vd_U.proxy.v[LEFT] = nv;
        };
        return this;
    };
    function vd_Kv(top) {
        var vd_n = top;
        this.vd_ky = function(x, y) {
            var vd_DB = vd_n;
            vd_n = new vd_AM(vd_DB, x, y);
            return vd_n;
        };
        this.vd_nG = function(p, q) {
            q.proxy.hole = true;
            if (p.proxy != q.proxy) {
                p.proxy.v[RIGHT].next = q.proxy.v[LEFT];
                q.proxy.v[LEFT] = p.proxy.v[LEFT];
                var target = p.proxy;
                for (var vd_m = vd_n; (vd_m != null); vd_m = vd_m.next) {
                    if (vd_m.proxy == target) {
                        vd_m.active = 0;
                        vd_m.proxy = q.proxy;
                    }
                }
            }
        };
        this.vd_pR = function(p, q) {
            q.proxy.hole = false;
            if (p.proxy != q.proxy) {
                q.proxy.v[RIGHT].next = p.proxy.v[LEFT];
                q.proxy.v[RIGHT] = p.proxy.v[RIGHT];
                var target = p.proxy;
                for (var vd_m = vd_n; (vd_m != null); vd_m = vd_m.next) {
                    if (vd_m.proxy == target) {
                        vd_m.active = 0;
                        vd_m.proxy = q.proxy;
                    }
                }
            }
        };
        function vd_Fr() {
            var nc = 0;
            for (var polygon = vd_n; (polygon != null); polygon = polygon.next) {
                if (polygon.active != 0) {
                    var nv = 0;
                    for (var v = polygon.proxy.v[LEFT]; (v != null); v = v.next) {
                        nv++;
                    }
                    if (nv > 2) {
                        polygon.active = nv;
                        nc++;
                    } else {
                        polygon.active = 0;
                    }
                }
            }
            return nc;
        };
        this.vd_Ln = function() {
            var result = vd_rJ();
            var vd_vZ = vd_Fr();
            if (vd_vZ > 0) {
                var c = 0;
                var vd_BI = null;
                for (var vd_jh = vd_n; (vd_jh != null); vd_jh = vd_BI) {
                    vd_BI = vd_jh.next;
                    if (vd_jh.active != 0) {
                        var poly = result;
                        if (vd_vZ > 1) {
                            poly = vd_rJ();
                        }
                        if (vd_jh.proxy.hole) {
                            poly.vd_vK(vd_jh.proxy.hole);
                        }
                        for (var vtx = vd_jh.proxy.v[LEFT]; (vtx != null); vtx = vtx.next) {
                            poly.add(vtx.x, vtx.y);
                        }
                        if (vd_vZ > 1) {
                            result.vd_nR(poly);
                        }
                        c++;
                    }
                }
                var orig = result;
                result = vd_rJ();
                for (var i = 0; i < orig.vd_gl(); i++) {
                    var inner = orig.vd_jv(i);
                    if (!inner.vd_jP()) {
                        result.vd_nR(inner);
                    }
                }
                for (var i = 0; i < orig.vd_gl(); i++) {
                    var inner = orig.vd_jv(i);
                    if (inner.vd_jP()) {
                        result.vd_nR(inner);
                    }
                }
            }
            return result;
        };
        return this;
    };
    function vd_CV() {
        this.vd_b = [0, 0, 0];
        this.bot = [0, 0, 0];
        this.top = [0, 0, 0];
        this.xb = 0;
        this.xt = 0;
        this.dx = 0;
        this.type = 0;
        this.vd_I = [[0, 0], [0, 0]];
        this.vd_bh = [0, 0];
        this.vd_ax = [vd_aC.vd_fE, vd_aC.vd_fE];
        this.vd_z = [null, null];
        this.prev = null;
        this.next = null;
        this.pred = null;
        this.succ = null;
        this.vd_eJ = null;
        return this;
    };
    function vd_xV() {
        this.vd_n = null;
        return this;
    };
    function vd_xv() {
        var vd_X = [];
        this.vd_Gz = function(x, y) {
            var vd_m = new vd_CV();
            vd_m.vd_b[X] = x;
            vd_m.vd_b[Y] = y;
            vd_X.push(vd_m);
        };
        this.vd_fF = function(index) {
            return vd_X[index];
        };
        this.vd_DL = function(i) {
            var prev = vd_X[vd_jb(i, vd_X.length)];
            var next = vd_X[vd_kV(i, vd_X.length)];
            var ith = vd_X[i];
            return ((prev.vd_b[Y] >= ith.vd_b[Y]) && (next.vd_b[Y] > ith.vd_b[Y]));
        };
        this.vd_Hu = function(i) {
            var next = vd_X[vd_kV(i, vd_X.length)];
            var ith = vd_X[i];
            return (next.vd_b[Y] > ith.vd_b[Y]);
        };
        this.vd_Mi = function(i) {
            var prev = vd_X[vd_jb(i, vd_X.length)];
            var next = vd_X[vd_kV(i, vd_X.length)];
            var ith = vd_X[i];
            return ((prev.vd_b[Y] > ith.vd_b[Y]) && (next.vd_b[Y] >= ith.vd_b[Y]));
        };
        this.vd_JT = function(i) {
            var prev = vd_X[vd_jb(i, vd_X.length)];
            var ith = vd_X[i];
            return (prev.vd_b[Y] > ith.vd_b[Y]);
        };
        return this;
    };
    function vd_wk(vd_vC) {
        this.y = vd_vC;
        this.vd_iH = null;
        this.next = null;
        return this;
    };
    function vd_Aa() {
        this.vd_n = null;
        return this;
    };
    function vd_rA(vd_vC) {
        this.y = vd_vC;
        this.less = null;
        this.more = null;
        return this;
    };
    function vd_Az() {
        var vd_U = this;
        this.vd_kz = null;
        this.vd_qu = null;
        this.vd_BU = function() {
            var sbt = [];
            sbt.length = vd_U.vd_kz;
            var vd_fq = 0;
            vd_fq = vd_wE(vd_fq, sbt, vd_U.vd_qu);
            if (vd_fq != vd_U.vd_kz) {
                throw new vd_cv("Something went wrong buildign sbt from tree.");
            }
            return sbt;
        };
        function vd_wE(vd_fq, sbt, vd_mO) {
            if (vd_mO.less != null) {
                vd_fq = vd_wE(vd_fq, sbt, vd_mO.less);
            }
            sbt[vd_fq] = vd_mO.y;
            vd_fq++;
            if (vd_mO.more != null) {
                vd_fq = vd_wE(vd_fq, sbt, vd_mO.more);
            }
            return vd_fq;
        };
        return this;
    };
    function vd_Ad(vd_oc, vd_kF, x, y, next) {
        this.ie = [vd_oc, vd_kF];
        this.point = [x, y, 0];
        this.next = next;
        return this;
    };
    function vd_zi() {
        this.vd_n = null;
        this.vd_Bp = function(aet, dy) {
            var st = null;
            for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                if ((edge.vd_ax[ABOVE] == vd_aC.vd_hk) || (edge.vd_I[ABOVE][CLIP] != 0) || (edge.vd_I[ABOVE][vd_P] != 0)) {
                    st = vd_xm(st, this, edge, dy);
                }
            }
        };
        return this;
    };
    function vd_xM(edge, prev) {
        this.edge = edge;
        this.xb = edge.xb;
        this.xt = edge.xt;
        this.dx = edge.dx;
        this.prev = prev;
        return this;
    };
    function vd_fD(tn, edge, x, y) {
        if (!tn) {
            tn = new vd_AM(null, x, y);
            tn.next = null;
            tn.v[LEFT] = null;
            tn.v[RIGHT] = null;
            tn.active = 1;
            tn.v[LEFT] = vd_tD(tn.v[LEFT], x, y);
            edge.vd_z[ABOVE] = tn;
        } else tn.next = vd_fD(tn.next, edge, x, y);
        return tn;
    };
    function vd_tD(t, x, y) {
        if (!t) {
            t = new vd_te(x, y);
            t.next = null;
        } else t.next = vd_tD(t.next, x, y);
        return t;
    };
    function vd_au(e, p, s, x, y) {
        e.vd_z[p].v[s] = vd_tD(e.vd_z[p].v[s], x, y);
        e.vd_z[p].active++;
    };
    function vd_EU(tn) {
        var total;
        for (total = 0; tn != null; tn = tn.next) if (tn.active > 2) total++;
        return total;
    };
    function vd_ma(d, e, p) {
        d = e;
        do {
            d = d.next;
        } while ( d . vd_z [ p ] == null);
        return d;
    };
    function vd_mr(d, e, p) {
        d = e;
        do {
            d = d.prev;
        } while ( d . vd_z [ p ] == null);
        return d;
    };
    function vd_hl(d, y) {
        return d.bot[X] + d.dx * (y - d.bot[Y]);
    };
    function vd_LN(op, subj, clip) {
        var nx = 0.0;
        var cft = 0;
        var result = [];
        if ((subj.vd_aL() && clip.vd_aL()) || (subj.vd_aL() && ((op == vd_al.vd_fu) || (op == vd_al.vd_ep))) || (clip.vd_aL() && (op == vd_al.vd_fu))) {
            return result;
        }
        if (((op == vd_al.vd_fu) || (op == vd_al.vd_ep)) && !subj.vd_aL() && !clip.vd_aL()) {
            vd_zy(subj, clip, op);
        }
        var vd_bW = new vd_Aa();
        var sbte = new vd_Az();
        var vd_vO = null;
        var vd_vA = null;
        if (!subj.vd_aL()) {
            vd_vO = vd_pX(vd_bW, sbte, subj, vd_P, op);
        }
        if (!clip.vd_aL()) {
            vd_vA = vd_pX(vd_bW, sbte, clip, CLIP, op);
        }
        if (vd_bW.vd_n == null) {
            return result;
        }
        var sbt = sbte.vd_BU();
        var vd_w = [0, 0];
        vd_w[0] = LEFT;
        vd_w[1] = LEFT;
        if (op == vd_al.vd_ep) {
            vd_w[CLIP] = RIGHT;
        }
        var vd_gb = vd_bW.vd_n;
        var vd_bt = null;
        var aet = new vd_xV();
        var vd_gy = 0;
        while (vd_gy < sbt.length) {
            var yb = sbt[vd_gy++];
            var yt = 0.0;
            var dy = 0.0;
            if (vd_gy < sbt.length) {
                yt = sbt[vd_gy];
                dy = yt - yb;
            }
            if (vd_gb != null) {
                if (vd_gb.y == yb) {
                    for (var edge = vd_gb.vd_iH; (edge != null); edge = edge.vd_eJ) {
                        vd_xQ(aet, edge);
                    }
                    vd_gb = vd_gb.next;
                }
            }
            var px = vd_Cl;
            var e0 = aet.vd_n;
            var e1 = aet.vd_n;
            aet.vd_n.vd_I[ABOVE][aet.vd_n.type] = (aet.vd_n.top[Y] != yb) ? 1 : 0;
            aet.vd_n.vd_I[ABOVE][((aet.vd_n.type == 0) ? 1 : 0)] = 0;
            aet.vd_n.vd_ax[ABOVE] = vd_aC.vd_fE;
            var vd_G = null;
            var vd_T = null;
            for (vd_G = aet.vd_n.next; (vd_G != null); vd_G = vd_G.next) {
                var vd_gZ = vd_G.type;
                var vd_jA = ((vd_G.type == 0) ? 1 : 0);
                vd_G.vd_I[ABOVE][vd_gZ] = (vd_G.top[Y] != yb) ? 1 : 0;
                vd_G.vd_I[ABOVE][vd_jA] = 0;
                vd_G.vd_ax[ABOVE] = vd_aC.vd_fE;
                if (vd_G.vd_I[ABOVE][vd_gZ] == 1) {
                    if (EQ(e0.xb, vd_G.xb) && EQ(e0.dx, vd_G.dx) && (e0.top[Y] != yb)) {
                        vd_G.vd_I[ABOVE][vd_gZ] ^= e0.vd_I[ABOVE][vd_gZ];
                        vd_G.vd_I[ABOVE][vd_jA] = e0.vd_I[ABOVE][vd_jA];
                        vd_G.vd_ax[ABOVE] = vd_aC.vd_hk;
                        e0.vd_I[ABOVE][CLIP] = 0;
                        e0.vd_I[ABOVE][vd_P] = 0;
                        e0.vd_ax[ABOVE] = vd_aC.vd_hn;
                    }
                    e0 = vd_G;
                }
            }
            var vd_az = [0, 0];
            vd_az[CLIP] = vd_N.NH;
            vd_az[vd_P] = vd_N.NH;
            var vd_at = [0, 0];
            vd_at[CLIP] = 0;
            vd_at[vd_P] = 0;
            var cf = null;
            for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                vd_at[CLIP] = edge.vd_I[ABOVE][CLIP] + (edge.vd_I[BELOW][CLIP] << 1);
                vd_at[vd_P] = edge.vd_I[ABOVE][vd_P] + (edge.vd_I[BELOW][vd_P] << 1);
                if ((vd_at[CLIP] != 0) || (vd_at[vd_P] != 0)) {
                    edge.vd_bh[CLIP] = vd_w[CLIP];
                    edge.vd_bh[vd_P] = vd_w[vd_P];
                    var vd_hH = false;
                    var br = 0,
                    bl = 0,
                    tr = 0,
                    tl = 0;
                    if ((op == vd_al.vd_ep) || (op == vd_al.vd_fu)) {
                        vd_hH = ((vd_at[CLIP] != 0) && ((vd_w[vd_P] != 0) || (vd_az[vd_P] != 0))) || ((vd_at[vd_P] != 0) && ((vd_w[CLIP] != 0) || (vd_az[CLIP] != 0))) || ((vd_at[CLIP] != 0) && (vd_at[vd_P] != 0) && (vd_w[CLIP] == vd_w[vd_P]));
                        br = ((vd_w[CLIP] != 0) && (vd_w[vd_P] != 0)) ? 1 : 0;
                        bl = (((vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) != 0) && ((vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        tr = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) != 0) && ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0)) != 0)) ? 1 : 0;
                        tl = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) != 0) && ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]) != 0)) ? 1 : 0;
                    } else if (op == vd_al.vd_lK) {
                        vd_hH = (vd_at[CLIP] != 0) || (vd_at[vd_P] != 0);
                        br = (vd_w[CLIP]) ^ (vd_w[vd_P]);
                        bl = (vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) ^ (vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]);
                        tr = (vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) ^ (vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0));
                        tl = (vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) ^ (vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]);
                    } else if (op == vd_al.vd_ok) {
                        vd_hH = ((vd_at[CLIP] != 0) && (!(vd_w[vd_P] != 0) || (vd_az[vd_P] != 0))) || ((vd_at[vd_P] != 0) && (!(vd_w[CLIP] != 0) || (vd_az[CLIP] != 0))) || ((vd_at[CLIP] != 0) && (vd_at[vd_P] != 0) && (vd_w[CLIP] == vd_w[vd_P]));
                        br = ((vd_w[CLIP] != 0) || (vd_w[vd_P] != 0)) ? 1 : 0;
                        bl = (((vd_w[CLIP] ^ edge.vd_I[ABOVE][CLIP]) != 0) || ((vd_w[vd_P] ^ edge.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        tr = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0)) != 0) || ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0)) != 0)) ? 1 : 0;
                        tl = (((vd_w[CLIP] ^ ((vd_az[CLIP] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][CLIP]) != 0) || ((vd_w[vd_P] ^ ((vd_az[vd_P] != vd_N.NH) ? 1 : 0) ^ edge.vd_I[BELOW][vd_P]) != 0)) ? 1 : 0;
                    } else {
                        throw new vd_cv("Unknown op");
                    }
                    vd_w[CLIP] ^= edge.vd_I[ABOVE][CLIP];
                    vd_w[vd_P] ^= edge.vd_I[ABOVE][vd_P];
                    if (vd_at[CLIP] != 0) {
                        vd_az[CLIP] = vd_N.vd_qJ[vd_az[CLIP]][((vd_at[CLIP] - 1) << 1) + vd_w[CLIP]];
                    }
                    if (vd_at[vd_P] != 0) {
                        vd_az[vd_P] = vd_N.vd_qJ[vd_az[vd_P]][((vd_at[vd_P] - 1) << 1) + vd_w[vd_P]];
                    }
                    if (vd_hH) {
                        var xb = edge.xb;
                        var vd_iY = vd_D.vd_tj(tr, tl, br, bl);
                        switch (vd_iY) {
                        case vd_D.EMN:
                            vd_bt = vd_fD(vd_bt, edge, xb, yb);
                            cf = edge;
                            break;
                        case vd_D.ERI:
                            edge.vd_z[ABOVE] = cf.vd_z[ABOVE];
                            if (xb != cf.xb) vd_au(edge, ABOVE, RIGHT, xb, yb);
                            cf = null;
                            break;
                        case vd_D.ELI:
                            vd_au(edge, BELOW, LEFT, xb, yb);
                            edge.vd_z[ABOVE] = null;
                            cf = edge;
                            break;
                        case vd_D.EMX:
                            if (xb != cf.xb) vd_au(edge, BELOW, RIGHT, xb, yb);
                            edge.vd_z[ABOVE] = null;
                            cf = null;
                            break;
                        case vd_D.IMN:
                            if (cft == vd_D.LED) {
                                if (cf.bot[Y] != yb) vd_au(cf, BELOW, LEFT, cf.xb, yb);
                                vd_bt = vd_fD(vd_bt, cf, cf.xb, yb);
                            }
                            edge.vd_z[ABOVE] = cf.vd_z[ABOVE];
                            vd_au(edge, ABOVE, RIGHT, xb, yb);
                            break;
                        case vd_D.ILI:
                            vd_bt = vd_fD(vd_bt, edge, xb, yb);
                            cf = edge;
                            cft = vd_D.ILI;
                            break;
                        case vd_D.IRI:
                            if (cft == vd_D.LED) {
                                if (cf.bot[Y] != yb) vd_au(cf, BELOW, LEFT, cf.xb, yb);
                                vd_bt = vd_fD(vd_bt, cf, cf.xb, yb);
                            }
                            vd_au(edge, BELOW, RIGHT, xb, yb);
                            edge.vd_z[ABOVE] = null;
                            break;
                        case vd_D.IMX:
                            vd_au(edge, BELOW, LEFT, xb, yb);
                            edge.vd_z[ABOVE] = null;
                            cft = vd_D.IMX;
                            break;
                        case vd_D.IMM:
                            vd_au(edge, BELOW, LEFT, xb, yb);
                            edge.vd_z[ABOVE] = cf.vd_z[ABOVE];
                            if (xb != cf.xb) vd_au(cf, ABOVE, RIGHT, xb, yb);
                            cf = edge;
                            break;
                        case vd_D.EMM:
                            vd_au(edge, BELOW, RIGHT, xb, yb);
                            edge.vd_z[ABOVE] = null;
                            vd_bt = vd_fD(vd_bt, edge, xb, yb);
                            cf = edge;
                            break;
                        case vd_D.LED:
                            if (edge.bot[Y] == yb) vd_au(edge, BELOW, LEFT, xb, yb);
                            edge.vd_z[ABOVE] = edge.vd_z[BELOW];
                            cf = edge;
                            cft = vd_D.LED;
                            break;
                        case vd_D.RED:
                            edge.vd_z[ABOVE] = cf.vd_z[ABOVE];
                            if (cft == vd_D.LED) {
                                if (cf.bot[Y] == yb) {
                                    vd_au(edge, BELOW, RIGHT, xb, yb);
                                } else {
                                    if (edge.bot[Y] == yb) {
                                        vd_au(cf, BELOW, LEFT, cf.xb, yb);
                                        vd_au(edge, BELOW, RIGHT, xb, yb);
                                    }
                                }
                            } else {
                                vd_au(edge, BELOW, RIGHT, xb, yb);
                                vd_au(edge, ABOVE, RIGHT, xb, yb);
                            }
                            cf = null;
                            break;
                        default:
                            break;
                        }
                    }
                }
            }
            for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                if (edge.top[Y] == yb) {
                    vd_T = edge.prev;
                    vd_G = edge.next;
                    if (vd_T != null) vd_T.next = vd_G;
                    else aet.vd_n = vd_G;
                    if (vd_G != null) vd_G.prev = vd_T;
                    if ((edge.vd_ax[BELOW] == vd_aC.vd_hk) && (vd_T != null)) {
                        if (vd_T.vd_ax[BELOW] == vd_aC.vd_hn) {
                            vd_T.vd_z[BELOW] = edge.vd_z[BELOW];
                            vd_T.vd_ax[BELOW] = vd_aC.vd_fE;
                            if (vd_T.prev != null) {
                                if (vd_T.prev.vd_ax[BELOW] == vd_aC.vd_hn) {
                                    vd_T.vd_ax[BELOW] = vd_aC.vd_hk;
                                }
                            }
                        }
                    }
                } else {
                    if (edge.top[Y] == yt) edge.xt = edge.top[X];
                    else edge.xt = edge.bot[X] + edge.dx * (yt - edge.bot[Y]);
                }
            }
            if (vd_gy < sbte.vd_kz) {
                var vd_mH = new vd_zi();
                vd_mH.vd_Bp(aet, dy);
                for (var vd_ck = vd_mH.vd_n; (vd_ck != null); vd_ck = vd_ck.next) {
                    e0 = vd_ck.ie[0];
                    e1 = vd_ck.ie[1];
                    if (((e0.vd_I[ABOVE][CLIP] != 0) || (e0.vd_I[ABOVE][vd_P] != 0)) && ((e1.vd_I[ABOVE][CLIP] != 0) || (e1.vd_I[ABOVE][vd_P] != 0))) {
                        var p = e0.vd_z[ABOVE];
                        var q = e1.vd_z[ABOVE];
                        var ix = vd_ck.point[X];
                        var iy = vd_ck.point[Y] + yb;
                        var vd_bi = (((e0.vd_I[ABOVE][CLIP] != 0) && !(e0.vd_bh[CLIP] != 0)) || ((e1.vd_I[ABOVE][CLIP] != 0) && (e1.vd_bh[CLIP] != 0)) || (!(e0.vd_I[ABOVE][CLIP] != 0) && !(e1.vd_I[ABOVE][CLIP] != 0) && (e0.vd_bh[CLIP] != 0) && (e1.vd_bh[CLIP] != 0))) ? 1 : 0;
                        var vd_am = (((e0.vd_I[ABOVE][vd_P] != 0) && !(e0.vd_bh[vd_P] != 0)) || ((e1.vd_I[ABOVE][vd_P] != 0) && (e1.vd_bh[vd_P] != 0)) || (!(e0.vd_I[ABOVE][vd_P] != 0) && !(e1.vd_I[ABOVE][vd_P] != 0) && (e0.vd_bh[vd_P] != 0) && (e1.vd_bh[vd_P] != 0))) ? 1 : 0;
                        var tr = 0,
                        tl = 0,
                        br = 0,
                        bl = 0;
                        if ((op == vd_al.vd_ep) || (op == vd_al.vd_fu)) {
                            tr = ((vd_bi != 0) && (vd_am != 0)) ? 1 : 0;
                            tl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e1.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            br = (((vd_bi ^ e0.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            bl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) != 0) && ((vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        } else if (op == vd_al.vd_lK) {
                            tr = (vd_bi) ^ (vd_am);
                            tl = (vd_bi ^ e1.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e1.vd_I[ABOVE][vd_P]);
                            br = (vd_bi ^ e0.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e0.vd_I[ABOVE][vd_P]);
                            bl = (vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) ^ (vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]);
                        } else if (op == vd_al.vd_ok) {
                            tr = ((vd_bi != 0) || (vd_am != 0)) ? 1 : 0;
                            tl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e1.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            br = (((vd_bi ^ e0.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                            bl = (((vd_bi ^ e1.vd_I[ABOVE][CLIP] ^ e0.vd_I[ABOVE][CLIP]) != 0) || ((vd_am ^ e1.vd_I[ABOVE][vd_P] ^ e0.vd_I[ABOVE][vd_P]) != 0)) ? 1 : 0;
                        } else {
                            throw new vd_cv("Unknown op type, " + op);
                        }
                        var vd_iY = vd_D.vd_tj(tr, tl, br, bl);
                        switch (vd_iY) {
                        case vd_D.EMN:
                            vd_bt = vd_fD(vd_bt, e1, ix, iy);
                            e0.vd_z[ABOVE] = e1.vd_z[ABOVE];
                            break;
                        case vd_D.ERI:
                            if (p != null) {
                                vd_T = vd_mr(vd_T, e0, ABOVE);
                                px = vd_hl(vd_T, iy);
                                vd_au(vd_T, ABOVE, LEFT, px, iy);
                                vd_au(e0, ABOVE, RIGHT, ix, iy);
                                e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                                e0.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.ELI:
                            if (q != null) {
                                vd_G = vd_ma(vd_G, e1, ABOVE);
                                nx = vd_hl(vd_G, iy);
                                vd_au(e1, ABOVE, LEFT, ix, iy);
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                                e0.vd_z[ABOVE] = e1.vd_z[ABOVE];
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.EMX:
                            if (p != null && q != null) {
                                vd_au(e0, ABOVE, LEFT, ix, iy);
                                e0.vd_z[ABOVE] = null;
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IMN:
                            vd_T = vd_mr(vd_T, e0, ABOVE);
                            px = vd_hl(vd_T, iy);
                            vd_au(vd_T, ABOVE, LEFT, px, iy);
                            vd_G = vd_ma(vd_G, e1, ABOVE);
                            nx = vd_hl(vd_G, iy);
                            vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                            vd_bt = vd_fD(vd_bt, vd_T, px, iy);
                            e1.vd_z[ABOVE] = vd_T.vd_z[ABOVE];
                            vd_au(e1, ABOVE, RIGHT, ix, iy);
                            vd_bt = vd_fD(vd_bt, e0, ix, iy);
                            vd_G.vd_z[ABOVE] = e0.vd_z[ABOVE];
                            vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                            break;
                        case vd_D.ILI:
                            if (p != null) {
                                vd_au(e0, ABOVE, LEFT, ix, iy);
                                vd_G = vd_ma(vd_G, e1, ABOVE);
                                nx = vd_hl(vd_G, iy);
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                                e1.vd_z[ABOVE] = e0.vd_z[ABOVE];
                                e0.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IRI:
                            if (q != null) {
                                vd_au(e1, ABOVE, RIGHT, ix, iy);
                                vd_T = vd_mr(vd_T, e0, ABOVE);
                                px = vd_hl(vd_T, iy);
                                vd_au(vd_T, ABOVE, LEFT, px, iy);
                                e0.vd_z[ABOVE] = e1.vd_z[ABOVE];
                                e1.vd_z[ABOVE] = null;
                            }
                            break;
                        case vd_D.IMX:
                            if (p != null && q != null) {
                                vd_au(e0, ABOVE, RIGHT, ix, iy);
                                vd_au(e1, ABOVE, LEFT, ix, iy);
                                e0.vd_z[ABOVE] = null;
                                e1.vd_z[ABOVE] = null;
                                vd_T = vd_mr(vd_T, e0, ABOVE);
                                px = vd_hl(vd_T, iy);
                                vd_au(vd_T, ABOVE, LEFT, px, iy);
                                vd_bt = vd_fD(vd_bt, vd_T, px, iy);
                                vd_G = vd_ma(vd_G, e1, ABOVE);
                                nx = vd_hl(vd_G, iy);
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                                vd_G.vd_z[ABOVE] = vd_T.vd_z[ABOVE];
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                            }
                            break;
                        case vd_D.IMM:
                            if (p != null && q != null) {
                                vd_au(e0, ABOVE, RIGHT, ix, iy);
                                vd_au(e1, ABOVE, LEFT, ix, iy);
                                vd_T = vd_mr(vd_T, e0, ABOVE);
                                px = vd_hl(vd_T, iy);
                                vd_au(vd_T, ABOVE, LEFT, px, iy);
                                vd_bt = vd_fD(vd_bt, vd_T, px, iy);
                                vd_G = vd_ma(vd_G, e1, ABOVE);
                                nx = vd_hl(vd_G, iy);
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                                e1.vd_z[ABOVE] = vd_T.vd_z[ABOVE];
                                vd_au(e1, ABOVE, RIGHT, ix, iy);
                                vd_bt = vd_fD(vd_bt, e0, ix, iy);
                                vd_G.vd_z[ABOVE] = e0.vd_z[ABOVE];
                                vd_au(vd_G, ABOVE, RIGHT, nx, iy);
                            }
                            break;
                        case vd_D.EMM:
                            if (p != null && q != null) {
                                vd_au(e0, ABOVE, LEFT, ix, iy);
                                vd_bt = vd_fD(vd_bt, e1, ix, iy);
                                e0.vd_z[ABOVE] = e1.vd_z[ABOVE];
                            }
                            break;
                        default:
                            break;
                        }
                    }
                    if (e0.vd_I[ABOVE][CLIP] != 0) e1.vd_bh[CLIP] = (e1.vd_bh[CLIP] == 0) ? 1 : 0;
                    if (e1.vd_I[ABOVE][CLIP] != 0) e0.vd_bh[CLIP] = (e0.vd_bh[CLIP] == 0) ? 1 : 0;
                    if (e0.vd_I[ABOVE][vd_P] != 0) e1.vd_bh[vd_P] = (e1.vd_bh[vd_P] == 0) ? 1 : 0;
                    if (e1.vd_I[ABOVE][vd_P] != 0) e0.vd_bh[vd_P] = (e0.vd_bh[vd_P] == 0) ? 1 : 0;
                    vd_T = e0.prev;
                    vd_G = e1.next;
                    if (vd_G != null) {
                        vd_G.prev = e0;
                    }
                    if (e0.vd_ax[ABOVE] == vd_aC.vd_hk) {
                        var search = true;
                        while (search) {
                            vd_T = vd_T.prev;
                            if (vd_T != null) {
                                if (vd_T.vd_ax[ABOVE] != vd_aC.vd_hn) {
                                    search = false;
                                }
                            } else {
                                search = false;
                            }
                        }
                    }
                    if (vd_T == null) {
                        aet.vd_n.prev = e1;
                        e1.next = aet.vd_n;
                        aet.vd_n = e0.next;
                    } else {
                        vd_T.next.prev = e1;
                        e1.next = vd_T.next;
                        vd_T.next = e0.next;
                    }
                    e0.next.prev = vd_T;
                    e1.next.prev = e1;
                    e0.next = vd_G;
                }
                for (var edge = aet.vd_n; (edge != null); edge = edge.next) {
                    vd_G = edge.next;
                    var vd_dO = edge.succ;
                    if ((edge.top[Y] == yt) && (vd_dO != null)) {
                        vd_dO.vd_z[BELOW] = edge.vd_z[ABOVE];
                        vd_dO.vd_ax[BELOW] = edge.vd_ax[ABOVE];
                        vd_dO.vd_I[BELOW][CLIP] = edge.vd_I[ABOVE][CLIP];
                        vd_dO.vd_I[BELOW][vd_P] = edge.vd_I[ABOVE][vd_P];
                        vd_T = edge.prev;
                        if (vd_T != null) vd_T.next = vd_dO;
                        else aet.vd_n = vd_dO;
                        if (vd_G != null) vd_G.prev = vd_dO;
                        vd_dO.prev = vd_T;
                        vd_dO.next = vd_G;
                    } else {
                        edge.vd_z[BELOW] = edge.vd_z[ABOVE];
                        edge.vd_ax[BELOW] = edge.vd_ax[ABOVE];
                        edge.vd_I[BELOW][CLIP] = edge.vd_I[ABOVE][CLIP];
                        edge.vd_I[BELOW][vd_P] = edge.vd_I[ABOVE][vd_P];
                        edge.xb = edge.xt;
                    }
                    edge.vd_z[ABOVE] = null;
                }
            }
        }
        var tn, tnn;
        var lt, ltn, rt, rtn;
        var v = 0,
        s = 0;
        var vd_CA = vd_EU(vd_bt);
        if (vd_CA > 0) {
            result = [];
            result.length = vd_CA;
            for (var i = 0; i < result.length; i++) {
                result[i] = [];
            }
            s = 0;
            for (tn = vd_bt; tn != null; tn = tnn) {
                tnn = tn.next;
                if (tn.active > 2) {
                    result[s] = [];
                    result[s].length = tn.active;
                    v = 0;
                    lt = tn.v[LEFT];
                    rt = tn.v[RIGHT];
                    while (lt != null || rt != null) {
                        if (lt != null) {
                            ltn = lt.next;
                            result[s][v] = [lt.x, lt.y, 0];
                            v++;
                            lt = ltn;
                        }
                        if (rt != null) {
                            rtn = rt.next;
                            result[s][v] = [rt.x, rt.y, 0];
                            v++;
                            rt = rtn;
                        }
                    }
                    s++;
                } else {
                    for (lt = tn.v[LEFT]; lt != null; lt = ltn) {
                        ltn = lt.next;
                    }
                    for (rt = tn.v[RIGHT]; rt != null; rt = rtn) {
                        rtn = rt.next;
                    }
                }
            }
        }
        return result;
    };
    function vd_Mj(poly) {
        var ret = [];
        var vd_Jv = poly.vd_gl();
        for (var i = 0; i < vd_Jv; i++) {
            var p2 = poly.vd_jv(i);
            var npts = p2.vd_jZ();
            var pts = [];
            for (var k = 0; k < npts; k++) {
                pts.push([p2.getX(k), p2.getY(k), 0.0]);
            }
            ret.push(pts);
        }
        return ret;
    };
    function vd_Mg(pts) {
        var ret = new vd_pg();
        if (pts && pts.length > 0) {
            var pls = new vd_pg();
            pls.vd_vK(false);
            for (var k = 0; k < pts.length; k++) pls.vd_oP(pts[k]);
            ret.vd_nR(pls);
        }
        return ret;
    };
    this.vd_DN = function(vd_rC, vd_xq) {
        var vd_jD = [];
        for (var i = 0; i < vd_rC.length; i++) {
            var poly = vd_Mg(vd_rC[i]);
            vd_jD.push(poly);
            if (vd_jD.length == 2) {
                var p1 = vd_jD[1];
                var p2 = vd_jD[0];
                var oper = vd_al.vd_lK;
                if (vd_xq) oper = vd_xq[i];
                var p = vd_GC(oper, p1, p2);
                vd_jD = [p];
            }
        }
        if (vd_jD.length > 0) return vd_jD[0];
        else return null;
    };
    this.vd_Ap = function(p) {
        if (!p) return [];
        try {
            return vd_LN(vd_al.vd_ep, p, new vd_pg());
        } catch(ex) {
            return [];
        }
    };
    this.vd_DQ = function(s) {
        var ret = [];
        if (!s) return ret;
        for (var k = 0; k < s.length; k++) {
            var pts = s[k];
            var ret1 = [];
            ret1.push(pts[0]);
            for (var i = 1; i < pts.length; i += 2) ret1.push(pts[i]);
            var j = pts.length - 1;
            if ((pts.length - 1) % 2.0 != 0.0) j--;
            for (var i = j; i >= 0; i -= 2) ret1.push(pts[i]);
            ret.push(ret1);
        }
        return ret;
    };
    this.vd_MC = function(vd_rC) {
        return vd_U.vd_DQ(vd_U.vd_Ap(vd_U.vd_DN(vd_rC)));
    };
    return this;
};
var gpc = new Clip();
function Edge(a, b) {
    this.vd_eT = a;
    this.vd_ft = b;
    this.vd_gz = false;
    return this;
};
function vd_Ch(a, b, c, eps, points) {
    var vd_U = this;
    this.vd_eT = a;
    this.vd_ft = b;
    this.vd_hG = c;
    this.vd_gz = false;
    function vd_Kl(eps, points) {
        var cp1 = points[vd_U.vd_eT],
        cp2 = points[vd_U.vd_ft],
        cp3 = points[vd_U.vd_hG];
        var radius;
        var vd_gT;
        var vd_oA;
        var m1;
        var m2;
        var mx1;
        var mx2;
        var my1;
        var my2;
        var dx;
        var dy;
        var rsqr;
        var vd_zl = Math.abs(cp1[Y] - cp2[Y]) < eps;
        var vd_zM = Math.abs(cp2[Y] - cp3[Y]) < eps;
        if (vd_zl && vd_zM) {
            return null;
        }
        if (vd_zl) {
            m2 = -(cp3[X] - cp2[X]) / (cp3[Y] - cp2[Y]);
            mx2 = (cp2[X] + cp3[X]) / 2;
            my2 = (cp2[Y] + cp3[Y]) / 2;
            vd_gT = (cp2[X] + cp1[X]) / 2;
            vd_oA = m2 * (vd_gT - mx2) + my2;
        } else if (vd_zM) {
            m1 = -(cp2[X] - cp1[X]) / (cp2[Y] - cp1[Y]);
            mx1 = (cp1[X] + cp2[X]) / 2;
            my1 = (cp1[Y] + cp2[Y]) / 2;
            vd_gT = (cp3[X] + cp2[X]) / 2;
            vd_oA = m1 * (vd_gT - mx1) + my1;
        } else {
            m1 = -(cp2[X] - cp1[X]) / (cp2[Y] - cp1[Y]);
            m2 = -(cp3[X] - cp2[X]) / (cp3[Y] - cp2[Y]);
            mx1 = (cp1[X] + cp2[X]) / 2;
            mx2 = (cp2[X] + cp3[X]) / 2;
            my1 = (cp1[Y] + cp2[Y]) / 2;
            my2 = (cp2[Y] + cp3[Y]) / 2;
            vd_gT = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
            vd_oA = m1 * (vd_gT - mx1) + my1;
        }
        dx = cp2[X] - vd_gT;
        dy = cp2[Y] - vd_oA;
        rsqr = dx * dx + dy * dy;
        radius = Math.sqrt(rsqr);
        return [vd_gT, vd_oA, radius];
    };
    var vd_uf = vd_Kl(eps, points);
    this.vd_IQ = function(eps, pt) {
        if (vd_uf == null) return false;
        return vdgeo.Distance2D(pt, vd_uf) <= vd_uf[Z];
    };
    this.vd_Mb = function(p) {
        if (p == null) return false;
        if (vd_U == p) return true;
        return ((vd_U.vd_eT == p.vd_eT || vd_U.vd_eT == p.vd_ft || vd_U.vd_eT == p.vd_hG) || (vd_U.vd_ft == p.vd_eT || vd_U.vd_ft == p.vd_ft || vd_U.vd_ft == p.vd_hG) || (vd_U.vd_hG == p.vd_eT || vd_U.vd_hG == p.vd_ft || vd_U.vd_hG == p.vd_hG));
    };
    return this;
};
var vd_vr = {};
vd_vr.vd_yW = function(vd_pO, prec) {
    if (!vd_pO || vd_pO.length == 0) return null;
    var vd_cD = 1.0 / Math.pow(10, prec);
    var points = [];
    for (var i = 0; i < vd_pO.length; i++) {
        var pt = vd_pO[i];
        points.push([Number(pt[X].toFixed(prec)), Number(pt[Y].toFixed(prec)), Number(pt[Z].toFixed(prec)), i]);
    }
    points.sort(function(x, y) {
        var dif = vdgeo.Distance2D(x, [0, 0, 0]) - vdgeo.Distance2D(y, [0, 0, 0]);
        if (dif == 0.0) {
            if (x[Z] == y[Z]) return 0;
            else if (x[Z] > y[Z]) return 1;
            else return - 1;
        }
        if (dif > 0.0) return 1;
        else return - 1;
    });
    var tmp = [points[0]];
    var c = 0;
    for (var i = 1; i < points.length; i++) {
        if (vdgeo.AreEqual(vdgeo.Distance2D(tmp[c], points[i]), 0.0, vd_cD)) continue;
        tmp.push(points[i]);
        c++;
    }
    points = tmp;
    points.sort(function(a, b) {
        return a[X] - b[X]
    });
    var vd_pw = points.length;
    var xmin;
    var xmax;
    var ymin;
    var ymax;
    var xmid;
    var ymid;
    var dx;
    var dy;
    var dmax;
    xmin = points[0][X];
    ymin = points[0][Y];
    xmax = xmin;
    ymax = ymin;
    for (var i = 1; i < points.length; i++) {
        if (points[i][X] < xmin) {
            xmin = points[i][X];
        }
        if (points[i][X] > xmax) {
            xmax = points[i][X];
        }
        if (points[i][Y] < ymin) {
            ymin = points[i][Y];
        }
        if (points[i][Y] > ymax) {
            ymax = points[i][Y];
        }
    }
    dx = xmax - xmin;
    dy = ymax - ymin;
    if (dx > dy) {
        dmax = dx;
    } else {
        dmax = dy;
    }
    xmid = (xmax + xmin) / 2.0;
    ymid = (ymax + ymin) / 2.0;
    var vd_KU = [(xmid - 2 * dmax), (ymid - dmax), 0, -1];
    var vd_KE = [xmid, (ymid + 2 * dmax), 0, -1];
    var vd_Lx = [(xmid + 2 * dmax), (ymid - dmax), 0, -1];
    points.push(vd_KU);
    points.push(vd_KE);
    points.push(vd_Lx);
    var vd_xx = new vd_Ch(vd_pw, vd_pw + 1, vd_pw + 2, vd_cD, points);
    var vd_ey = [];
    var vd_ge;
    var vd_LQ = 0;
    vd_ey.push(vd_xx);
    var vd_tq = 0;
    for (var vd_qw = vd_LQ; vd_qw < vd_pw; vd_qw++) {
        vd_ge = [];
        var tc = vd_ey.length;
        for (var itri = 0; itri < tc; itri++) {
            var tri = vd_ey[itri];
            if (tri.vd_gz) continue;
            var vd_IV = tri.vd_IQ(vd_cD, points[vd_qw]);
            if (vd_IV) {
                var vd_kF = new Edge(tri.vd_eT, tri.vd_ft);
                var vd_Ez = new Edge(tri.vd_ft, tri.vd_hG);
                var vd_Eh = new Edge(tri.vd_hG, tri.vd_eT);
                vd_ge.push(vd_kF);
                vd_ge.push(vd_Ez);
                vd_ge.push(vd_Eh);
                tri.vd_gz = true;
                vd_tq++;
            }
        }
        if (vd_tq > 0) {
            var vd_za = [];
            for (var itri = 0; itri < tc; itri++) {
                var tri = vd_ey[itri];
                if (tri.vd_gz) continue;
                vd_za.push(tri);
            }
            vd_ey = vd_za;
            tc = vd_ey.length;
            vd_tq = 0;
        }
        var ec = vd_ge.length;
        for (var i = 0; i < ec; i++) {
            var vd_ic = vd_ge[i];
            if (vd_ic.vd_gz) continue;
            for (var j = i + 1; j < vd_ge.length; j++) {
                var vd_pA = vd_ge[j];
                if (vd_pA.vd_gz) continue;
                if (vd_ic.vd_eT == vd_pA.vd_ft) {
                    if (vd_ic.vd_ft == vd_pA.vd_eT) {
                        vd_ic.vd_gz = true;
                        vd_pA.vd_gz = true;
                    }
                }
            }
        }
        for (var i = 0; i < ec; i++) {
            var vd_ic = vd_ge[i];
            if (vd_ic.vd_gz) continue;
            var trig = new vd_Ch(vd_ic.vd_eT, vd_ic.vd_ft, vd_qw, vd_cD, points);
            vd_ey.push(trig);
        }
    }
    var vd_qx = [];
    for (var i = 0; i < vd_ey.length; i++) {
        var vd_mS = vd_ey[i];
        if (vd_mS.vd_gz) continue;
        if (vd_mS.vd_Mb(vd_xx)) {
            vd_mS.vd_gz = true;
            continue;
        }
        vd_qx.push(points[vd_mS.vd_eT][3]);
        vd_qx.push(points[vd_mS.vd_ft][3]);
        vd_qx.push(points[vd_mS.vd_hG][3]);
    }
    return vd_qx;
};
var vd_dr = {};
vd_dr.vd_Bh = ['FontFileVDS', 'bytes', 'vd_iy', 'vd_uM', 'ActiveLayOutRef', 'ActiveLineTypeRef', 'ActiveTextStyleRef', 'ActiveLayerRef', 'MaterialImageRef', 'LayerRef', 'LineTypeRef', 'StyleRef', 'BlockRef', 'ExternalReference', 'ShapeStyleRef', 'OverAllLength', 'segmentlength', 'bytescount', 'vd_an', 'vd_Cp'];
vd_dr.vd_zh = function(vd_y) {
    if (vd_y.i == 0) {
        vd_y.vd_ia = 0;
        vd_y.string.push(vd_y.offset.join(""), "function f" + vd_y.vd_ia.toString() + "(){try{", vd_y.vd_da);
    }
    do {
        if (vd_y.i == vd_y.vd_it.length) break;
        var vd_v = vd_y.vd_it[vd_y.i];
        vd_y.string.push(vd_y.offset.join(""), "_vdDocument." + vd_v + "=", vd_dr.vd_oT(vd_y.vd_bm, vd_y.vd_iA, vd_y.obj[vd_v], vd_y.offset), ";", vd_y.vd_da);
        var vd_zN = vdgeo.vd_o(100.0 * vd_y.i / vd_y.vd_it.length);
        vd_y.i++;
        var vd_rx = vd_y.vd_bm.vd_eb.Progress(vd_zN, 100);
        if (vd_rx) {
            vd_y.vd_ia++;
            vd_y.string.push(vd_y.offset.join(""), "document._p(" + vd_zN.toString() + ");}catch(ex){document._e(ex," + vd_y.vd_ia.toString() + ");return;}setTimeout(f" + vd_y.vd_ia.toString() + ",0);}", vd_y.vd_da);
            vd_y.string.push(vd_y.offset.join(""), "function f" + vd_y.vd_ia.toString() + "(){try{", vd_y.vd_da);
            setTimeout(function() {
                vd_dr.vd_zh(vd_y);
            },
            0);
            return;
        }
    } while ( true );
    if (vd_y.i == vd_y.vd_it.length) {
        vd_y.string.push(vd_y.offset.join(""), "document._l();");
        vd_y.string.push(vd_y.offset.join(""), "} catch (ex) { document._e(ex, " + vd_y.vd_ia.toString() + "); } };", vd_y.vd_da);
        vd_y.string.push(vd_y.offset.join(""), "f0();", vd_y.vd_da);
        vd_y.vd_bm.vd_eb.end();
        var ret = vd_y.string.join("");
        if (vd_y.vd_iA !== true) ret = vd_dr.vd_Ft(ret, vd_y.vd_bm, vd_y.obj);
        else if (vd_y.vd_bm.vdAfterSaveDocument != null) vd_y.vd_bm.vdAfterSaveDocument({
            dataObject: vd_y.obj,
            dataStream: ret
        });
    }
};
vd_dr.vd_oT = function(vd_bm, vd_iA, obj, offset) {
    var vd_Lp = offset == undefined;
    if (vd_Lp) {
        if (!obj) obj = vd_bm.GetDocument();
        vd_bm.vd_eb.start("Saving data", true);
    }
    if (offset == undefined) offset = [];
    var ret = '';
    var space = '\t';
    var vd_da = '\n';
    var string = [];
    if (obj == null || obj == undefined) {
        string.push(' ');
    } else if (typeof(obj) == "object" && (obj.join == undefined)) {
        var vd_vy = obj.Model != undefined;
        var vd_it = [];
        if (vd_vy) string.push("_vdDocument = ", vd_da);
        string.push("{", vd_da);
        offset.push(space);
        var vd_uT;
        for (vd_v in obj) {
            if (vdConst.vd_BN.indexOf(vd_v) >= 0) continue;
            if (vd_dr.vd_Bh.indexOf(vd_v) >= 0) continue;
            if (vd_vy && vd_v.substr(0, 2) == 'h_') {
                vd_uT = obj[vd_v];
                if (!vd_uT.Deleted && !vd_uT.excludeFromSave) vd_it.push(vd_v);
                continue;
            }
            var value = obj[vd_v];
            if (typeof(value) == "function") continue;
            if (value == undefined) continue;
            if (vd_v == 'jpegData' && typeof value == 'string') {
                string.push(offset.join(""), vd_v, ":", "'", value, "'", ",", vd_da);
                continue;
            }
            string.push(offset.join(""), vd_v, ":", vd_dr.vd_oT(vd_bm, vd_iA, value, offset), ",", vd_da);
        };
        offset.pop();
        string.push(offset.join(""), "}");
        if (vd_vy && vd_it.length > 0) {
            string.push(";", vd_da);
            var vd_y = {
                i: 0,
                vd_bm: vd_bm,
                obj: obj,
                vd_it: vd_it,
                string: string,
                offset: offset,
                vd_ia: 0,
                vd_iA: vd_iA,
                vd_da: vd_da
            };
            vd_dr.vd_zh(vd_y);
            return;
        }
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        var vd_mD;
        var vd_Go = obj.length > 0 && typeof(obj[0]) == "object";
        if (vd_Go) {
            string.push("[", vd_da);
            offset.push(space);
            for (vd_v in obj) {
                vd_mD = vd_dr.vd_oT(vd_bm, vd_iA, obj[vd_v], offset);
                if (vd_mD == '') continue;
                string.push(offset.join(""), vd_mD, ",", vd_da);
            }
            offset.pop();
            string.push(offset.join(""), "]");
        } else {
            string.push("[");
            for (vd_v in obj) {
                vd_mD = vd_dr.vd_oT(vd_bm, vd_iA, obj[vd_v], offset);
                if (vd_mD == '') continue;
                string.push(vd_mD, ",");
            }
            string.push("]");
        }
    } else if (typeof obj == 'string') {
        if (obj.substr(0, 2) == 'h_') {
            var vd_vX = vd_bm.GetEntityItem(obj);
            if (!vd_vX || (!vd_vX.Deleted && !vd_vX.excludeFromSave)) string.push('\'' + obj + '\'');
        } else {
            string.push('String.fromCharCode(');
            for (var s = 0; s < obj.length; s++) {
                string.push(obj.charCodeAt(s).toString());
                if (s < obj.length - 1) string.push(',');
            }
            string.push(')');
        }
    } else if (typeof(obj) == "function") {
        string.push(' ');
    } else {
        string.push(obj.toString());
    }
    ret = string.join("");
    return ret;
};
vd_dr.vd_AZ = function(vd_y) {
    if (vd_y.i == 0) {
        for (var k = 0; k < 256; k++) {
            vd_y.vd_dE[String.fromCharCode(k)] = vd_y.vd_zL++;
        }
        vd_y.vd_dm.push("document._d([[");
        vd_y.vd_bm.vd_eb.start("Compressing data", true);
    }
    do {
        if (vd_y.i == vd_y.vd_nk.length) break;
        var c = vd_y.vd_nk[vd_y.i];
        var wc = vd_y.w + c;
        if (vd_y.vd_dE.hasOwnProperty(wc)) {
            vd_y.w = wc;
        } else {
            vd_y.vd_dm.push(vd_y.vd_dE[vd_y.w]);
            vd_y.ca++;
            if (vd_y.ca >= vd_y.vd_KZ) {
                vd_y.vd_dm.push(vd_y.vd_Eq);
                vd_y.ca = 0;
            } else {
                vd_y.vd_dm.push(",");
            }
            vd_y.vd_dE[wc] = vd_y.vd_zL++;
            vd_y.w = c;
        }
        vd_y.i++;
        var vd_rx = vd_y.vd_bm.vd_eb.Progress(vd_y.i, vd_y.vd_nk.length);
        if (vd_rx) {
            setTimeout(function() {
                vd_dr.vd_AZ(vd_y);
            },
            0);
            return;
        }
    } while ( true );
    if (vd_y.i == vd_y.vd_nk.length) {
        if (vd_y.w != '') vd_y.vd_dm.push(vd_y.vd_dE[vd_y.w]);
        vd_y.vd_dm.push("]]);");
        vd_y.vd_bm.vd_eb.end();
        if (vd_y.vd_bm.vdAfterSaveDocument != null) vd_y.vd_bm.vdAfterSaveDocument({
            dataObject: vd_y.dataObject,
            dataStream: vd_y.vd_dm.join("")
        });
    }
};
vd_dr.vd_Ft = function(vd_Ks, vd_bm, dataObject) {
    vd_dr.vd_AZ({
        vd_Eq: "],\r\n[",
        vd_KZ: 32767,
        vd_bm: vd_bm,
        vd_nk: vd_Ks,
        dataObject: dataObject,
        vd_dm: [],
        i: 0,
        vd_dE: {},
        vd_zL: 0,
        ca: 0,
        w: ''
    });
    return;
};
function vd_ls() {
    var vd_U = this;
    this.vd_aa = vdgeo.newpoint(0, 0, 0);
    this.vd_bs = vdgeo.newpoint(0, 0, 0);
    this.vd_aL = true;
    this.vd_dw = function(pt) {
        if (vd_U.vd_aL) {
            vd_U.vd_aa[X] = pt[X];
            vd_U.vd_aa[Y] = pt[Y];
            vd_U.vd_aa[Z] = pt[Z];
            vd_U.vd_bs[X] = pt[X];
            vd_U.vd_bs[Y] = pt[Y];
            vd_U.vd_bs[Z] = pt[Z];
            vd_U.vd_aL = false;
        } else {
            vd_U.vd_aa[X] = Math.min(vd_U.vd_aa[X], pt[X]);
            vd_U.vd_aa[Y] = Math.min(vd_U.vd_aa[Y], pt[Y]);
            vd_U.vd_aa[Z] = Math.min(vd_U.vd_aa[Z], pt[Z]);
            vd_U.vd_bs[X] = Math.max(vd_U.vd_bs[X], pt[X]);
            vd_U.vd_bs[Y] = Math.max(vd_U.vd_bs[Y], pt[Y]);
            vd_U.vd_bs[Z] = Math.max(vd_U.vd_bs[Z], pt[Z]);
        }
    };
    this.AddBox = function(box) {
        if (box.vd_aL) return;
        vd_U.vd_dw(box.vd_aa);
        vd_U.vd_dw(box.vd_bs);
    };
    this.vd_ty = function(box) {
        if (!box) return;
        vd_U.vd_dw(vdgeo.newpoint(box[0], box[1], box[2]));
        vd_U.vd_dw(vdgeo.newpoint(box[3], box[4], box[5]));
    };
    this.vd_iE = function() {
        if (vd_U.vd_aL) return null;
        return [vd_U.vd_aa[X], vd_U.vd_aa[Y], vd_U.vd_aa[Z], vd_U.vd_bs[X], vd_U.vd_bs[Y], vd_U.vd_bs[Z]];
    };
    return this;
};
function vd_Jy() {
    var vd_U = this;
    this.vd_nQ = function(vd_iM, vd_iX) {
        return 1.0;
    };
    this.vd_rQ = function(vd_iM, mat, vd_iX) {
        return;
    };
    this.vd_cF = function() {
        return vdConst.vd_cp;
    };
    var vd_bK = new vd_ls();
    this.vd_gi = new vd_ls();
    this.vd_aU = 10;
    this.vd_c = vdgeo.newpoint(0, 0, 0);
    this.vd_bD = vdgeo.vd_s();
    this.vd_cR = vdgeo.vd_s();
    this.vd_gu = vdgeo.vd_s();
    this.vd_bS = 1.0;
    var vd_wN = null;
    this.vd_Y = null;
    this.palette == null;
    this.vd_iC = 1.0;
    this.vd_cl = new Array();
    this.linetype = null;
    this.vd_le = 1.0;
    var vd_fN = [255, 255, 255, 255];
    var vd_ak = new Array(new Array(vdgeo.vd_s(), vdgeo.vd_s(), vdgeo.vd_s()));
    this.vd_nB = function() {
        return false;
    };
    this.vd_Kh = function(render) {
        vd_wN = render;
    };
    this.GetPixelSize = function() {
        if (vd_wN) return vd_wN.vd_bS;
        return vd_U.vd_bS;
    };
    this.vd_kn = function() {
        return vd_fN;
    };
    this.vd_eU = function(index) {
        return vd_fN;
    };
    this.vd_np = function(vd_hP, vd_br) {
        vd_U.palette = vd_hP;
        vd_U.vd_aZ(vd_fN);
    };
    this.vd_aP = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    this.vd_tm = function() {
        return vd_U.vd_aU * vd_U.vd_uF();
    };
    this.vd_uF = function() {
        return 1;
    };
    this.vd_ot = function() {
        if (vd_U.vd_cl.length == 0) return null;
        return vd_U.vd_cl[vd_U.vd_cl.length - 1];
    };
    this.vd_ij = function(bval) {
        return ShowHidenEdges;
    };
    this.vd_mP = function(fig) {
        if (fig == null) {
            if (vd_U.vd_cl.length == 1) {
                vd_U.vd_gi.AddBox(vd_bK);
                vd_U.vd_ot().BoundingBox = vd_bK.vd_iE();
                vd_bK = new vd_ls();
            }
            vd_U.vd_cl.pop();
        } else {
            vd_U.vd_cl.push(fig);
        }
    };
    this.vd_wL = function(ltscale) {
        return vd_U.vd_le;
    };
    this.vd_wW = function(lt) {
        return vd_U.linetype;
    };
    this.vd_dK = function(vd_mN) {
        return 0.0;
    };
    this.vd_aZ = function(color) {
        return vd_fN;
    };
    this.vd_ho = function(vd_dN) {
        return null;
    };
    this.vd_gn = null;
    this.vd_eq = function(vd_mB) {
        return null;
    };
    this.vd_wB = function(vd_ws) {
        return false;
    };
    this.vd_bf = function(mat) {
        var m = vd_U.vd_aS();
        vd_ak.push(new Array(null, null, null));
        vd_U.vd_mC(vdgeo.vd_ki(mat, m));
    };
    this.vd_bg = function() {
        vd_ak.pop();
    };
    this.vd_aS = function() {
        return vd_ak[vd_ak.length - 1][0];
    };
    this.vd_fp = function() {
        return vd_ak[vd_ak.length - 1][1];
    };
    this.vd_Lr = function() {
        return null;
    };
    this.vd_mC = function(mat) {
        vd_ak[vd_ak.length - 1][0] = mat;
    };
    this.clip = null;
    this.vd_KQ = function() {};
    this.vd_Ar = function(left, top, right, bottom) {};
    this.vd_ry = function() {};
    this.update = function(vd_oO, vd_gQ, vd_mu) {
        vd_U.vd_aU = vd_oO;
        vd_U.vd_bS = 1;
        vd_U.vd_mC(vdgeo.vd_s());
    };
    this.clear = function() {
        vd_bK.vd_aL = true;
        vd_U.vd_gi.vd_aL = true;
    };
    this.refresh = function() {};
    this.vd_du = function(vd_hu, vd_ha) {
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vd_hu));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vd_ha));
    };
    this.vd_BC = function(vd_uV, direction, vd_CE) {};
    this.vd_dQ = function(pts, closed) {
        if (pts.length < 2) return;
        var sp = pts[0];
        for (var i = 1; i < pts.length; i++) {
            var ep = pts[i];
            vd_U.vd_du(sp, ep);
            sp = ep;
        }
        if (closed) vd_U.vd_du(pts[pts.length - 1], pts[0]);
    };
    this.vd_fB = function(pts) {
        this.vd_dQ(pts, true);
    };
    this.vd_Gt = function(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed) {
        vd_U.vd_fl(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed);
    };
    this.vd_fl = function(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed) {
        vd_U.vd_du(p1, p2);
        vd_U.vd_du(p2, p3);
        vd_U.vd_du(p3, p4);
        vd_U.vd_du(p4, p1);
    };
    this.vd_ue = function(vd_be, vd_hg, vd_jS, vd_dG) {
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(0, vd_dG.Ascent, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(vd_hg, vd_dG.Ascent, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(0, -vd_dG.Descent, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(vd_hg, -vd_dG.Descent, 0)));
    };
    this.vd_pV = function(vd_q, vd_uk, vd_kA, vd_lI) {
        if (vd_q == null) return;
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(0, 0, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(vd_kA, 0, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(vd_kA, vd_lI, 0)));
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), vdgeo.newpoint(0, vd_lI, 0)));
    };
    this.vd_nE = function(pt) {
        vd_bK.vd_dw(vdgeo.vd_Z(this.vd_aS(), pt));
    };
    var vd_dg = vdgeo.newpoint(0, 0, 0);
    var vd_dl = vdgeo.newpoint(0, 0, 0);
    this.vd_jB = function(pts, thickness, closed) {
        if (pts.length < 2) return;
        if (thickness == 0.0 | thickness == undefined) {
            vd_U.vd_dQ(pts, closed);
            return;
        }
        for (var i = 1; i < pts.length; i++) {
            vd_dg[X] = pts[i - 1][X];
            vd_dg[Y] = pts[i - 1][Y];
            vd_dg[Z] = pts[i - 1][Z] + thickness;
            vd_dl[X] = pts[i][X];
            vd_dl[Y] = pts[i][Y];
            vd_dl[Z] = pts[i][Z] + thickness;
            vd_U.vd_fl(pts[i], pts[i - 1], vd_dg, vd_dl, true, true, true, (i == pts.length - 1));
        }
        if (closed) {
            var vd_fk = pts.length - 1;
            vd_dg[X] = pts[0][X];
            vd_dg[Y] = pts[0][Y];
            vd_dg[Z] = pts[0][Z] + thickness;
            vd_dl[X] = pts[vd_fk][X];
            vd_dl[Y] = pts[vd_fk][Y];
            vd_dl[Z] = pts[vd_fk][Z] + thickness;
            vd_U.vd_fl(pts[vd_fk], pts[0], vd_dg, vd_dl, true, false, true, true);
        }
    };
    this.vd_eD = function(vd_cH) {};
    this.vd_oL = function(pts, vd_bO, uvs, vd_dN) {
        vd_U.vd_fB(pts);
    };
    this.vd_go = function(pts) {
        vd_U.vd_fB(pts);
    };
    this.vd_zp = function(FaceList, VertexList) {
        var ii = 0;
        var p0, p1, p2, p3;
        for (var i = 0; i < FaceList.length; i = i + 5) {
            ii = FaceList[i];
            ii = Math.abs(ii);
            p0 = VertexList[ii - 1];
            ii = FaceList[i + 1];
            ii = Math.abs(ii);
            p1 = VertexList[ii - 1];
            ii = FaceList[i + 2];
            ii = Math.abs(ii);
            p2 = VertexList[ii - 1];
            ii = FaceList[i + 3];
            ii = Math.abs(ii);
            p3 = VertexList[ii - 1];
            vd_U.vd_fl(p0, p1, p2, p3, true, true, true, true);
        }
    };
    this.GetEntityFromPoint = function(x, y, vd_mU, vd_db) {
        return null;
    };
    this.GetEntitiesFromBox = function(xmin, ymin, xmax, ymax, vd_db) {
        return new Array();
    };
    return this;
};
function vd_Hb(vd_vm) {
    var vd_U = this;
    this.ResValue = null;
    this.actionType = vdConst.ACTION_POINT_WORLD;
    this.actionCount = 0;
    this.vd_IH = function() {
        if (vd_U.vd_O !== 'select') return;
        if (!vd_lB) return;
        vd_lB = !vd_qH;
    };
    Object.defineProperty(vd_U, 'vd_Fn', {
        get: function() {
            return vd_qH;
        }
    });
    this.IsCanceled = function() {
        return vd_lB;
    };
    this.IsStarted = function() {
        return vd_cJ;
    };
    this.vdrawOwner = function() {
        return vd_d;
    };
    this.TouchSupported = function() {
        return vd_Bw || ('ontouchstart' in document.documentElement) || ('ontouchstart' in window);
    };
    this.DefaultActions = vdConst.DEFAULT_MOUSE_ACTION_ALL;
    this.DispProps = vdConst.ACTION_DISPLAY_DEFAULT;
    this.PanMouseButton = vdConst.MouseLeftButton;
    this.RotateMouseButton = vdConst.MouseMiddleButton | vdConst.MouseLeftButton;
    this.ZoomScaleMouseButton = vdConst.MouseMiddleButton | vdConst.MouseLeftButton;
    var vd_ec = null;
    this.TouchCancelTimeOut = -1200;
    var vd_Bw = false;
    this.vd_vx = function() {
        vd_Bw = true;
    };
    this.vd_lU = function(action, status) {};
    this.vd_rP = null;
    this.vd_jm = 0;
    this.vd_mM = null;
    this.vd_pa = null;
    this.vd_wK = [255, 255, 0, 255];
    this.vd_vR = 14;
    this.vd_wF = false;
    this.DrawActionDefault = true;
    var vd_bN = null;
    var vd_ap = null;
    var vd_H = null;
    var vd_d = vd_vm;
    var vd_cJ = false;
    var vd_kB = false;
    var vd_lB = false;
    var vd_qH = 0;
    var vd_dB = false;
    var vd_wa = null;
    Object.defineProperty(vd_U, 'OsnapPoint', {
        get: function() {
            return vd_H;
        }
    });
    this.IsPaused = function() {
        return vd_dB;
    };
    this.Pause = function(vd_En) {
        if (!vd_dB) {
            vd_wa = {
                DefaultActions: vd_U.DefaultActions
            };
        }
        if (vd_En !== undefined) vd_U.DefaultActions = vd_En;
        vd_dB = true;
        vd_U.hide();
    };
    this.Resume = function() {
        if (vd_dB && vd_wa) {
            vd_U.DefaultActions = vd_wa.DefaultActions;
        }
        vd_dB = false;
        vd_U.show();
    };
    var vd_lM = null;
    function vd_IY(vd_HV) {
        if (vd_lM == null) vd_lM = vd_d.canvas.style.cursor;
        vd_d.canvas.style.cursor = vd_HV;
    };
    function vd_ny() {
        if (vd_lM != null) vd_d.canvas.style.cursor = vd_lM;
        vd_lM = null;
    };
    this.vd_zk = function(vd_mQ) {
        vd_bN = null;
        vd_U.actionCount = 0;
        if (!vd_mQ) return;
        vd_bN = vdConst.cloneEntity(vd_mQ);
        vd_U.actionCount = 1;
    };
    function vd_wD(vd_ud, evt) {
        switch (evt.mousebutton) {
        case 1:
            return (vd_ud & vdConst.MouseLeftButton) != 0;
        case 2:
            return (vd_ud & vdConst.MouseMiddleButton) != 0;
        case 3:
            return (vd_ud & vdConst.MouseRightButton) != 0;
        default:
            return false;
        }
    };
    this.start = function(vd_uP) {
        if (vd_cJ) return;
        vd_U.Resume();
        vd_cJ = true;
        vd_lB = false;
        vd_qH = 0;
        if (vd_uP === undefined) vd_uP = 0;
        vd_U.actionCount = vd_uP;
        vd_d.canvas.focus();
        vd_d.vd_qv(vd_U, 'start');
        vd_H = null;
    };
    this.end = function() {
        vd_U.DrawActionDefault = true;
        if (vd_cJ == false) return;
        vd_ny();
        vd_U.hide();
        vd_cJ = false;
        if (vd_lB == false) {
            if (vd_U.actionType == vdConst.ACTION_POINT_WORLD) {
                vd_U.ResValue = vdgeo.newpoint(vd_ap[X], vd_ap[Y], vd_ap[Z]);
            } else if (vd_U.actionType == vdConst.ACTION_LINE_WORLD) {
                vd_U.ResValue = [vdgeo.newpoint(vd_bN[X], vd_bN[Y], vd_bN[Z]), vdgeo.newpoint(vd_ap[X], vd_ap[Y], vd_ap[Z])];
            } else if (vd_U.actionType == vdConst.ACTION_RECT_VIEW) {
                var vd_nT = vd_d.vd_p().vd_aS();
                var vd_bQ = vdgeo.vd_Z(vd_nT, vd_bN);
                var vd_jy = vdgeo.vd_Z(vd_nT, vd_ap);
                vd_U.ResValue = [vd_bQ, vd_jy];
            }
        }
        vd_d.vd_qv(vd_U, 'end');
    };
    this.cancel = function(status) {
        if (!vd_cJ) return;
        if (vd_lB) return;
        vd_U.hide();
        vd_lB = true;
        if (status) vd_qH = status;
        vd_U.end();
    };
    this.show = function() {
        if (!vd_cJ) return;
        if (vd_kB) return;
        if (vd_d.ToolTip.hide()) vd_ny();
        vd_d.vd_p().vd_Y.vd_Bd(true);
        vd_kB = true;
    };
    this.hide = function() {
        if (!vd_kB) return;
        if (vd_d.ToolTip.hide()) vd_ny();
        if (vd_cJ) vd_U.draw(true);
        vd_kB = false;
        vd_d.vd_p().vd_Y.vd_Bd(false);
    };
    this.mouseover = function(evt) {
        if (!vd_cJ) return;
        vd_U.show();
    };
    this.mouseout = function(evt) {
        vd_U.vd_lG(evt);
        if (!vd_cJ) return;
        vd_U.hide();
    };
    this.resize = function() {
        if (!vd_cJ) return;
        vd_U.hide();
    };
    function vd_Hh(evt) {
        var entity = vd_d.GetEntityFromPoint(evt.xPix, evt.yPix);
        if (entity != null && entity.ToolTip) {
            vd_IY("pointer");
            var timeout = undefined;
            if (entity._t === vdConst.vdNote_code && vdConst.NOTE_TOOLTIP_TIMEOUT > 0) timeout = vdConst.NOTE_TOOLTIP_TIMEOUT;
            vd_d.ToolTip.vd_zP([evt.xPix + vd_d.ToolTip.BoundaryOffset[0], evt.yPix + vd_d.ToolTip.BoundaryOffset[1]], entity.ToolTip, undefined, timeout);
        } else {
            if (vd_d.ToolTip.hide()) vd_ny();
        }
    };
    this.mousemove = function(evt) {
        vd_U.vd_lG(evt);
        vd_H = null;
        if (!vd_cJ || vd_dB) {
            var vd_lF = false;
            if (evt.prevPos != null) {
                var vd_yy = (vd_U.DefaultActions & (vdConst.DEFAULT_SCROLL | vdConst.DEFAULT_ROTATE3D));
                if (vd_yy != 0) {
                    if ((evt.istouched === true) || (evt.istouched !== true && vd_wD(vd_U.PanMouseButton, evt))) {
                        vd_lF = true;
                        if (vd_d.GetActiveLayout() === vd_d.vd_Bm() && vd_yy === vdConst.DEFAULT_ROTATE3D) {
                            vd_d.vd_Aw(evt.prevPos, evt.xPix, evt.yPix, vd_d.GetDefaultTimeOutMilliseconds());
                        } else {
                            vd_d.scroll(evt.prevPos, evt.xPix, evt.yPix, vd_d.GetDefaultTimeOutMilliseconds());
                        }
                    } else if (evt.istouched !== true && vd_wD(vd_U.RotateMouseButton, evt)) {
                        vd_lF = true;
                        if ((vd_U.DefaultActions & vdConst.DEFAULT_ROTATE3D) == 0 || vd_d.GetActiveLayout() !== vd_d.vd_Bm()) {
                            vd_d.scroll(evt.prevPos, evt.xPix, evt.yPix, vd_d.GetDefaultTimeOutMilliseconds());
                        } else {
                            vd_d.vd_Aw(evt.prevPos, evt.xPix, evt.yPix, vd_d.GetDefaultTimeOutMilliseconds());
                        }
                    }
                }
                if (!vd_lF && ((vd_U.DefaultActions & vdConst.DEFAULT_ZOOMSCALE) == vdConst.DEFAULT_ZOOMSCALE) && vd_wD(vd_U.ZoomScaleMouseButton, evt) && vd_ec) {
                    var vd_kR = evt.yPix - vd_ec[Y];
                    if (Math.abs(vd_kR) > 2) {
                        vd_ec = [evt.xPix, evt.yPix];
                        vd_kR = (vd_kR < 0 ? vd_d.MouseWheelZoomScale: (1 / vd_d.MouseWheelZoomScale));
                        vd_lF = true;
                        vd_d.zoomScale(vdgeo.vd_o(vd_d.canvas.width * 0.5), vdgeo.vd_o(vd_d.canvas.height * 0.5), vd_kR, vd_d.GetDefaultTimeOutMilliseconds());
                    }
                }
            }
            if (!vd_lF && vd_d.ToolTip.AutoShow) {
                vd_Hh(evt);
            }
        }
        if (vd_cJ) {
            if (!vd_kB) vd_U.show();
            vd_U.draw(true);
            vd_ap = vd_d.vd_p().vd_mR(evt.xPix, evt.yPix);
            vd_tH();
            if (!vd_dB) vd_H = vd_d.vd_Lo(evt.xPix, evt.yPix);
            vd_U.draw(false);
            vd_yT(evt);
        }
    };
    this.dblclick = function(evt) {
        if (!vd_cJ || vd_dB) {
            if ((vd_U.DefaultActions & vdConst.DEFAULT_ZOOMEXTENTS) != 0) {
                vd_d.zoomExtents();
                vd_d.redraw();
            }
            return;
        }
    };
    this.vd_vT = function(mode) {
        var vd_Iv = vd_U.vd_wF;
        vd_U.vd_wF = mode;
        return vd_Iv;
    };
    function vd_tH() {
        if (!vd_U.vd_wF) return;
        if (vd_U.actionType != vdConst.ACTION_LINE_WORLD) return;
        if (vd_bN) {
            var dx = Math.abs(vd_ap[X] - vd_bN[X]);
            var dy = Math.abs(vd_ap[Y] - vd_bN[Y]);
            if (dy < dx) vd_ap[Y] = vd_bN[Y];
            else vd_ap[X] = vd_bN[X];
            vd_ap[Z] = vd_bN[Z];
        }
    };
    this.parse = function(vd_JJ) {
        if (!vd_cJ || vd_dB) return;
        var str = vd_JJ.trim();
        if (str.length == 0) return;
        var pt = null;
        var items;
        if (str[0] != '@' && str.indexOf(",") >= 0) {
            items = str.split(",");
            if (items.length == 2) {
                pt = [Number(items[0]), Number(items[1]), 0];
            } else if (items.length == 3) {
                pt = [Number(items[0]), Number(items[1]), Number(items[2])];
            }
        } else if (vd_bN && vd_U.actionType != vdConst.ACTION_POINT_WORLD) {
            if (str.indexOf("<") >= 0) {
                items = str.split("<");
                if (items.length == 2) {
                    pt = vdgeo.pointPolar(vd_bN, vdgeo.DegreesToRadians(Number(items[1])), Number(items[0]))
                }
            } else if (str[0] == '@') {
                str = str.substr(1);
                items = str.split(",");
                if (items.length == 2) {
                    pt = [vd_bN[X] + Number(items[0]), vd_bN[Y] + Number(items[1]), vd_bN[Z]];
                } else if (items.length == 3) {
                    pt = [vd_bN[X] + Number(items[0]), vd_bN[Y] + Number(items[1]), vd_bN[Z] + Number(items[2])];
                }
            }
        }
        if (!pt) return;
        vd_H = null;
        vd_ap = pt;
        vd_xr();
    };
    this.click = function(evt) {};
    this.mouseup = function(evt) {
        vd_U.vd_lG(evt);
        var dx = 0;
        var dy = 0;
        if (vd_ec) {
            dx = Math.abs(evt.xPix - vd_ec[X]);
            dy = Math.abs(evt.yPix - vd_ec[Y]);
        }
        vd_ec = null;
        if (!vd_cJ || vd_dB) return;
        if (vd_H) {
            vd_ap = vdgeo.vd_dU(vd_H, vdgeo.vd_bo(vd_d.vd_p().vd_aS()));
        } else {
            vd_ap = vd_d.vd_p().vd_mR(evt.xPix, evt.yPix);
            vd_tH();
        }
        if (!vd_d.vd_ji([evt.xPix, evt.yPix])) {
            vd_U.cancel();
        } else {
            if (evt.mousebutton <= 1) {
                vd_xr(evt);
            }
        }
    };
    var vd_lN = 0;
    this.vd_lG = function(evt) {
        if (vd_lN) clearTimeout(vd_lN);
        vd_lN = 0;
    };
    function vd_yT(evt) {
        if (!vd_cJ || vd_dB) return;
        if (vd_lN > 0) vd_U.vd_lG(evt);
        if (evt.mousebutton != 1) return;
        var timeout = vd_U.TouchCancelTimeOut;
        if (timeout < 0 && vd_U.TouchSupported()) timeout = Math.abs(timeout);
        if (timeout > 0) vd_lN = setTimeout(function(evt) {
            vd_U.cancel();
            vd_U.vd_lG(evt);
        },
        timeout);
    };
    this.mousedown = function(evt) {
        vd_U.vd_lG(evt);
        var dx = 0;
        var dy = 0;
        if (vd_ec) {
            dx = Math.abs(evt.xPix - vd_ec[X]);
            dy = Math.abs(evt.yPix - vd_ec[Y]);
        }
        vd_ec = [evt.xPix, evt.yPix];
        if (!vd_cJ && !vd_dB && evt.mousebutton <= 1 && dx < 2 && dy < 2 && vd_d.GripManager.vd_Bj(evt)) return;
        if (!vd_cJ || vd_dB) return;
        if (vd_H) {
            vd_ap = vdgeo.vd_dU(vd_H, vdgeo.vd_bo(vd_d.vd_p().vd_aS()));
        } else {
            vd_ap = vd_d.vd_p().vd_mR(evt.xPix, evt.yPix);
            vd_tH();
        }
        if (evt.mousebutton > 1) {
            vd_U.cancel(1);
        } else {
            if (vd_cJ && !vd_dB && !vd_kB) {
                vd_U.mousemove(evt);
                return;
            }
        }
        vd_yT(evt);
    };
    function vd_xr(evt) {
        if (vd_U.actionType == vdConst.ACTION_POINT_WORLD) {
            vd_U.end();
        } else {
            vd_U.actionCount++;
            if (vd_U.actionCount == 2) {
                vd_U.end();
            } else {
                vd_d.vd_qv(vd_U, 'count');
                vd_bN = vdgeo.newpoint(vd_ap[X], vd_ap[Y], vd_ap[Z]);
                if (vd_ap[W] !== undefined) vd_bN.push(vd_ap[W]);
            }
        }
    };
    this.mousewheel = function(e) {
        if ((vd_U.DefaultActions & vdConst.DEFAULT_ZOOMSCALE) != 0 && (vd_U.ZoomScaleMouseButton & vdConst.MouseMiddleButton) != 0) {
            vd_d.zoomScale(e.xPix, e.yPix, e.Delta, vd_d.GetDefaultTimeOutMilliseconds());
        }
    };
    this.vd_Ex = function(e) {
        vd_d.vd_Je(e.PrevPos1, e.PrevPos2, e.Pos1, e.Pos2, vd_U.DefaultActions)
    };
    this.keydown = function(e) {
        if (!vd_cJ && !vd_dB && e.keyCode == 27) vd_d.GripManager.vd_Bj(null);
        if (!vd_cJ || vd_dB) return;
        if (e.keyCode == 27) vd_U.cancel();
    };
    this.draw = function(vd_Mf) {
        if (vd_Mf) {
            vd_d.vd_p().vd_Y.vd_CH();
            return;
        }
        var vd_KB = vd_d.vd_p().vd_Y.vd_fK;
        vd_d.vd_p().vd_Y.vd_fK = false;
        var vd_jG = vd_U.vd_rP;
        if (vd_jG == null) vd_jG = vd_d.vd_p().vd_kn();
        var vd_ox = vd_d.vd_eW;
        vd_d.vd_eW = false;
        var vd_JG = vd_d.vd_p().vd_Y.Alpha;
        var vd_nJ = vd_d.vd_p().vd_aZ(vd_jG);
        var vd_Iy = vd_d.vd_p().vd_dK(Math.max(1, vd_U.vd_jm));
        var vd_nT = vd_d.vd_p().vd_aS();
        var pts = [];
        if (vd_U.DrawActionDefault && (vd_U.actionType == vdConst.ACTION_LINE_WORLD || vd_U.actionType == vdConst.ACTION_RECT_VIEW) && vd_U.actionCount == 1) {
            if (vd_U.actionType == vdConst.ACTION_LINE_WORLD) {
                vd_d.vd_p().vd_du(vd_bN, vd_ap);
            } else {
                var vd_rH = vd_nT;
                if (vd_d.vd_p().vd_ba) vd_rH = vd_d.vd_p().vd_fp();
                var vd_jy = vdgeo.vd_dU(vd_ap, vd_rH);
                var vd_bQ = vdgeo.vd_dU(vd_bN, vd_rH);
                vd_d.vd_p().vd_bf(vdgeo.vd_bo(vd_rH));
                pts = [[vd_bQ[X], vd_bQ[Y], 0], [vd_jy[X], vd_bQ[Y], 0], [vd_jy[X], vd_jy[Y], 0], [vd_bQ[X], vd_jy[Y], 0]];
                var vd_vY = (vd_bQ[X] > vd_jy[X]);
                if ((vd_U.DispProps & vdConst.ACTION_DISPLAY_USEFILLCOLOR) != 0 && vd_U.vd_mM != null && vd_U.vd_pa != null) {
                    if (vd_vY) vd_jG = vd_U.vd_pa;
                    else vd_jG = vd_U.vd_mM;
                }
                vd_d.vd_p().vd_aZ(vd_jG);
                var alpha = vd_d.vd_p().vd_Y.vd_ms(255);
                vd_d.vd_p().vd_dQ(pts, true);
                vd_d.vd_p().vd_Y.vd_ms(alpha);
                if ((vd_U.DispProps & vdConst.ACTION_DISPLAY_USEFILLCOLOR) != 0 && vd_U.vd_mM != null && vd_U.vd_pa != null) {
                    vd_d.vd_p().vd_fB(pts);
                }
                vd_d.vd_p().vd_bg();
            }
        }
        if (vd_H && (vd_U.actionType == vdConst.ACTION_LINE_WORLD || vd_U.actionType == vdConst.ACTION_POINT_WORLD)) {
            vd_d.vd_p().vd_aZ(vd_U.vd_wK);
            vd_d.vd_p().vd_dK(2);
            var vd_B = vd_d.vd_p().GetPixelSize() * vd_U.vd_vR / 2;
            pts = [];
            var vd_aH, vd_gV, ang;
            vd_d.vd_p().vd_bf(vdgeo.vd_bo(vd_nT));
            switch (vd_H[3]) {
            case vdConst.OsnapMode_END:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y] - vd_B, 0], [vd_H[X] - vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0]], true);
                break;
            case vdConst.OsnapMode_NEA:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y] - vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] - vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0]], true);
                break;
            case vdConst.OsnapMode_MID:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y] - vd_B, 0], [vd_H[X], vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0]], true);
                break;
            case vdConst.OsnapMode_QUA:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y], 0], [vd_H[X], vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y], 0], [vd_H[X], vd_H[Y] - vd_B, 0]], true);
                break;
            case vdConst.OsnapMode_CEN:
                {
                    vd_aH = vdgeo.vd_hT(vdgeo.CURVERESOLUTION, vd_d.vd_p().GetPixelSize(), vd_B, vdgeo.VD_TWOPI);
                    vd_gV = vdgeo.VD_TWOPI / vd_aH;
                    for (ang = 0; ang <= vdgeo.VD_TWOPI; ang += vd_gV) {
                        pts.push(vdgeo.newpoint(vd_H[X] + vd_B * Math.cos(ang), vd_H[Y] + vd_B * Math.sin(ang), 0));
                    }
                    vd_d.vd_p().vd_dQ(pts, true);
                }
                break;
            case vdConst.OsnapMode_INS:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y], 0], [vd_H[X] + vd_B, vd_H[Y], 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0], [vd_H[X], vd_H[Y] - vd_B, 0], [vd_H[X], vd_H[Y] + vd_B, 0], [vd_H[X] - vd_B, vd_H[Y] + vd_B, 0]], true);
                break;
            case vdConst.OsnapMode_NODE:
                {
                    vd_aH = vdgeo.vd_hT(vdgeo.CURVERESOLUTION, vd_d.vd_p().GetPixelSize(), vd_B, vdgeo.VD_TWOPI);
                    vd_gV = vdgeo.VD_TWOPI / vd_aH;
                    for (ang = 0; ang <= vdgeo.VD_TWOPI; ang += vd_gV) {
                        pts.push(vdgeo.newpoint(vd_H[X] + vd_B * Math.cos(ang), vd_H[Y] + vd_B * Math.sin(ang), 0));
                    }
                    vd_d.vd_p().vd_dQ(pts, true);
                    vd_d.vd_p().vd_du([vd_H[X] - vd_B, vd_H[Y] - vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] + vd_B, 0]);
                    vd_d.vd_p().vd_du([vd_H[X] - vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0]);
                }
                break;
            default:
                vd_d.vd_p().vd_dQ([[vd_H[X] - vd_B, vd_H[Y] - vd_B, 0], [vd_H[X] - vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] + vd_B, 0], [vd_H[X] + vd_B, vd_H[Y] - vd_B, 0]], true);
                break;
            }
            vd_d.vd_p().vd_bg();
        }
        vd_d.vd_p().vd_aZ(vd_nJ);
        vd_d.vd_p().vd_Y.vd_ms(vd_JG);
        vd_d.vd_p().vd_dK(vd_Iy);
        vd_d.vd_qv(vd_U, 'draw');
        vd_d.vd_eW = vd_ox;
        vd_d.vd_p().vd_Y.Refresh(true);
        vd_d.vd_p().vd_Y.vd_fK = vd_KB;
    };
    this.vd_eB = function() {
        return [vd_d.vd_p(), vd_ap, vd_bN];
    };
    Object.defineProperty(vd_U, 'ReferencePoint', {
        get: function() {
            if (vd_U.actionType == vdConst.ACTION_POINT_WORLD) return null;
            return vd_bN;
        }
    });
    Object.defineProperty(vd_U, 'CurrentPoint', {
        get: function() {
            return vd_ap;
        }
    });
    Object.defineProperty(vd_U, 'render', {
        get: function() {
            return vd_d.vd_p();
        }
    });
    return this;
};
var vd_KP = [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0];
function vd_JD(vd_LD, vd_tK) {
    var vd_U = this;
    this.vd_fK = true;
    this.vd_gs = [1.0, 1.0, 1.0];
    var vd_cz = undefined;
    this.vd_nU = function() {
        return vd_cz;
    };
    this.vd_ek = 0;
    this.zFar = 1;
    this.vd_Fb = function(vd_FN, zfar) {
        vd_U.vd_ek = vd_FN;
        vd_U.zFar = zfar;
    };
    this.vd_h = vd_LD;
    this.Alpha = 255;
    this.vd_aX = [0, 0, 0, 255];
    this.penwidth = 0;
    var vd_br = [0, 0, 0, 255];
    this.vd_ar = 0;
    this.vd_bx = 0;
    var vd_aB = null;
    var vd_M = null;
    var vd_pE = 0;
    var px = 0,
    py = 0;
    this.vd_lP = vdConst.InterpolationMode_Bilinear;
    function vd_xE(p) {
        return vdgeo.vd_o(p + 0.49);
    };
    function vd_Hr(p) {
        return vdgeo.vd_o(p);
    };
    var vd_bk = vd_xE;
    this.vd_ew = function() {
        vd_qZ = vd_Ji;
        if (vd_U.vd_h.vd_bu || vd_U.vd_h.vd_cQ) {
            vd_bk = vd_xE;
            if (vd_U.vd_h.vd_cQ) vd_qZ = vd_xu;
        } else {
            vd_bk = vd_Hr;
        }
    };
    var vd_BA = 0;
    var vd_nF;
    function vd_xu(px, py, pz) {
        if (vd_U.vd_h.vd_cQ.length === 0) return true;
        for (var i = 0; i < vd_U.vd_h.vd_cQ.length; i++) {
            vd_nF = vd_U.vd_h.vd_cQ[i][2];
            vd_BA = vd_nF[A20] * px + vd_nF[A21] * py + vd_nF[A22] * pz + vd_nF[A23];
            if (vd_BA < 0) return false;
        }
        return true;
    };
    function vd_Ji(px, py, pz) {
        return true;
    };
    var vd_qZ = vd_xu;
    this.vd_Df = function(img) {
        if (img != null) {
            if (img._a1 == false || (typeof(_evl) != 'undefined' && _evl(vd_U) == false)) {
                var bytescount = 4;
                var left = vd_bk((vd_U.vd_ar - img.width) * 0.5);
                var top = vd_bk((vd_U.vd_bx - img.height) * 0.5);
                left = Math.max(left, 0);
                top = Math.max(top, 0);
                var right = left + img.width;
                var bottom = top + img.height;
                right = Math.min(right, vd_U.vd_ar);
                bottom = Math.min(bottom, vd_U.vd_bx);
                var div = 162 / 255;
                for (var y = top; y < bottom; y++) {
                    for (var x = left; x < right; x++) {
                        var srcy = y - top;
                        var srcx = (x - left) * bytescount;
                        var pos = (((vd_U.vd_bx - 1) - y) * vd_U.vd_ar + x) * 4;
                        var ir = img.bytes[srcy][srcx];
                        var ig = img.bytes[srcy][srcx + 1];
                        var ib = img.bytes[srcy][srcx + 2];
                        ir = vdgeo.vd_o(ir * div + vd_M[pos] * (1 - div));
                        ig = vdgeo.vd_o(ig * div + vd_M[pos + 1] * (1 - div));
                        ib = vdgeo.vd_o(ib * div + vd_M[pos + 2] * (1 - div));
                        vd_M[pos] = ir;
                        vd_M[pos + 1] = ig;
                        vd_M[pos + 2] = ib;
                    }
                }
            }
        }
    };
    this.vd_wm = function() {
        return vd_aB;
    };
    this.vd_jd = function(data, width, height, vd_MO) {
        vd_aB = data;
        if (!vd_aB) {
            vd_M = null;
            vd_cz = null;
            vd_U.vd_ar = 0;
            vd_U.vd_bx = 0;
            vd_pE = 0;
        } else {
            vd_M = vd_aB.data;
            vd_U.vd_ar = parseInt(width);
            vd_U.vd_bx = parseInt(height);
            vd_pE = vd_U.vd_ar * vd_U.vd_bx * 4;
            var len = vd_pE / 4;
            vd_cz = [];
            vd_cz.length = len;
            for (i = 0; i < len; i++) {
                vd_cz[i] = [1, undefined, undefined];
            }
        }
    };
    function vd_KA() {
        var len = vd_cz.length;
        var i;
        var item;
        for (i = 0; i < len; i++) {
            item = vd_cz[i];
            item[0] = 1.0;
            item[1] = undefined;
            item[2] = undefined;
        }
    };
    this.clear = function(color) {
        vd_br = color;
        vd_II(vd_M, color);
        if (vd_U.vd_h.vd_bu || vd_U.vd_h.vd_aG) {
            vd_KA();
        }
    };
    this.vd_Ah = function(img) {
        var i;
        if (!vd_aB) return;
        if (vd_U.vd_h.vd_dC()) vd_U.vd_h.vd_ps();
        if (vd_U.vd_h.vd_bm.Notes) vd_U.vd_h.vd_bm.Notes.vd_nz(vd_U.vd_h);
        vd_U.vd_Df(img);
        for (i = 3; i < vd_pE; i += 4) {
            vd_M[i] = 255;
        }
        vd_U.vd_ho(null);
    };
    function vd_II(data, color) {
        if (!data || !color) return;
        var left = vd_U.vd_h.clip[0];
        var right = vd_U.vd_h.clip[2];
        var top = vd_U.vd_h.clip[1];
        var bottom = vd_U.vd_h.clip[3];
        var iy, ix;
        var k = (top * vd_U.vd_ar + left) * 4;
        var off = (vd_U.vd_ar - right + left - 1) * 4;
        for (iy = top; iy <= bottom; iy++) {
            for (ix = left; ix <= right; ix++) {
                data[k++] = color[0];
                data[k++] = color[1];
                data[k++] = color[2];
                data[k++] = color[3];
            }
            k += off;
        }
    };
    this.vd_Oe = function() {
        return false;
    };
    this.vd_ms = function(vd_Gb) {
        var ret = vd_U.Alpha;
        vd_U.Alpha = vd_Gb;
        return ret;
    };
    this.vd_aZ = function(Color) {
        if (Color[3] !== undefined) vd_U.Alpha = Color[3];
        vd_U.vd_aX = Color;
    };
    this.vd_dK = function(vd_mN) {
        vd_U.penwidth = vd_mN;
    };
    this.vd_GD = function(x1, y1, z1) {
        vd_cC(vd_bk(x1), vd_bk(y1));
        vd_U.vd_bV(z1);
    };
    this.vd_Fm = function(x1, y1, x2, y2) {
        x1 = vd_bk(x1);
        y1 = vd_bk(y1);
        x2 = vd_bk(x2);
        y2 = vd_bk(y2);
        vd_U.vd_rW(x1, y1, x2, y2, 1, 1);
    };
    this.vd_AQ = function(x1, y1, w, z1, z2, u1, v1, w1, u2, v2, w2) {
        var iz = 0,
        iu = 0,
        iv = 0,
        iw = 0;
        var gradient = 0,
        sx = 0,
        ex = 0,
        x = 0,
        z = 0,
        u = 0,
        v = 0,
        tw = 0;
        if (y1 < vd_U.vd_h.clip[1] || y1 > vd_U.vd_h.clip[3]) return;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        sx = vd_bk(sx);
        ex = vd_bk(ex);
        y1 = vd_bk(y1);
        iz = (z2 - z1);
        iu = (u2 - u1);
        iv = (v2 - v1);
        iw = (w2 - w1);
        var scol = vd_U.vd_aX;
        if (vd_U.vd_h.vd_kQ) {
            for (x = sx; x < ex; x++) {
                gradient = (x - x1) / w;
                z = z1 + iz * gradient;
                u = u1 + iu * gradient;
                v = v1 + iv * gradient;
                tw = w1 + iw * gradient;
                vd_U.vd_aX = [vdgeo.vd_o(u), vdgeo.vd_o(v), vdgeo.vd_o(tw)];
                vd_cC(x, y1);
                vd_U.vd_bV(z);
            }
            vd_U.vd_aX = scol;
        } else {
            for (x = sx; x < ex; x++) {
                gradient = (x - x1) / w;
                z = z1 + iz * gradient;
                u = u1 + iu * gradient;
                v = v1 + iv * gradient;
                tw = w1 + iw * gradient;
                if (tw != 0.0) {
                    u /= tw;
                    v /= tw;
                }
                vd_cC(x, y1);
                vd_U.vd_bV(z, true, u, v);
            }
        }
    };
    var vd_yL = false;
    var vd_ez = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.vd_Al = function(x1, y1, w, z1, z2) {
        var iz = 0;
        var sx = 0,
        ex = 0,
        i = 0,
        gradient = 0,
        z = 0;
        if (y1 < vd_U.vd_h.clip[1] || y1 > vd_U.vd_h.clip[3]) return;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        sx = vd_bk(sx);
        ex = vd_bk(ex);
        y1 = vd_bk(y1);
        iz = (z2 - z1);
        for (i = sx; i < ex; i++) {
            gradient = (i - x1) / w;
            z = z1 + iz * gradient;
            vd_cC(i, y1);
            vd_U.vd_bV(z);
        }
    };
    this.vd_qV = function(x1, y1, w) {
        var sx = 0,
        ex = 0,
        i = 0;
        if (y1 < vd_U.vd_h.clip[1] || y1 > vd_U.vd_h.clip[3]) return;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        sx = vd_bk(sx);
        ex = vd_bk(ex);
        y1 = vd_bk(y1);
        for (i = sx; i < ex; i++) {
            vd_cC(i, y1);
            vd_U.vd_bV(1);
        }
    };
    this.vd_Gv = function(x1, y1, x2, y2, z1, z2) {
        vd_yL = true;
        vd_ez[0] = x1;
        vd_ez[1] = y1;
        vd_ez[2] = z1;
        vd_ez[3] = x2;
        vd_ez[4] = y2;
        vd_ez[5] = z2;
        x1 = vd_bk(x1);
        y1 = vd_bk(y1);
        x2 = vd_bk(x2);
        y2 = vd_bk(y2);
        vd_U.vd_rW(x1, y1, x2, y2, z1, z2);
        vd_yL = false;
    };
    var y = 0;
    var vd_W = 0,
    vd_e = 0,
    minx = 0,
    maxx = 0;
    var x1 = 0,
    y1 = 0,
    z1 = 0;
    var x2 = 0,
    y2 = 0,
    z2 = 0;
    var ind1 = 0,
    ind2 = 0;
    var ints = 0;
    var uvx1 = 0,
    uvx2 = 0,
    uvy1 = 0,
    uvy2 = 0,
    uvz1 = 0,
    uvz2 = 0;
    var p1, p2, uv1, uv2, l1, l2;
    this.vd_Eo = function(pts, uvs, vd_eN) {
        if (!uvs || (!vd_U.vd_h.vd_kQ && !vd_U.vd_h.vd_dR)) {
            vd_U.vd_jo(pts, vd_eN);
            return;
        }
        var gradient = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        z = 0,
        i = 0;
        var n = pts.length;
        if (n === 0) return;
        p1 = pts[0];
        vd_W = p1[Y];
        vd_e = p1[Y];
        minx = p1[X];
        maxx = p1[X];
        for (i = 1; i < n; i++) {
            p1 = pts[i];
            if (p1[Y] < vd_W) vd_W = p1[Y];
            else if (p1[Y] > vd_e) vd_e = p1[Y];
            if (p1[X] < minx) minx = p1[X];
            else if (p1[X] > maxx) maxx = p1[X];
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        vd_W = Math.round(vd_W);
        vd_e = Math.round(vd_e);
        var vd_bw;
        for (y = vd_W; y <= vd_e; y++) {
            vd_bw = [];
            ints = 0;
            for (i = 0; i < n; i++) {
                if (i === 0) {
                    ind1 = n - 1;
                    ind2 = 0;
                } else {
                    ind1 = i - 1;
                    ind2 = i;
                }
                p1 = pts[ind1];
                p2 = pts[ind2];
                y2 = p2[Y];
                y1 = p1[Y];
                if (y1 == y2) continue;
                uv1 = uvs[ind1];
                uv2 = uvs[ind2];
                if (y1 > y2) {
                    p2 = pts[ind1];
                    p1 = pts[ind2];
                    uv2 = uvs[ind1];
                    uv1 = uvs[ind2];
                }
                y2 = p2[Y];
                y1 = p1[Y];
                x2 = p2[X];
                x1 = p1[X];
                z2 = p2[Z];
                z1 = p1[Z];
                uvy2 = uv2[Y];
                uvy1 = uv1[Y];
                uvx2 = uv2[X];
                uvx1 = uv1[X];
                uvz2 = uv2[Z];
                uvz1 = uv1[Z];
                if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                    gradient = (y - y1) / (y2 - y1);
                    u = vdgeo.vd_aj(uvx1, uvx2, gradient);
                    v = vdgeo.vd_aj(uvy1, uvy2, gradient);
                    w = vdgeo.vd_aj(uvz1, uvz2, gradient);
                    z = vdgeo.vd_aj(z1, z2, gradient);
                    x = vdgeo.vd_aj(x1, x2, gradient);
                    ints++;
                    vd_bw.push([x, z, u, v, w]);
                    if (vd_eN && ints === 2) break;
                }
            }
            if (ints === 0) continue;
            if (ints === 2) {
                l1 = vd_bw[0];
                l2 = vd_bw[1];
                if (l1[0] > l2[0]) {
                    l2 = vd_bw[0];
                    l1 = vd_bw[1];
                }
                vd_U.vd_AQ(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1], l1[2], l1[3], l1[4], l2[2], l2[3], l2[4]);
            } else {
                vd_bw.sort(function(a, b) {
                    return a[0] - b[0]
                });
                for (var ii = 0; ii < ints - 1; ii += 2) {
                    l1 = vd_bw[ii];
                    l2 = vd_bw[ii + 1];
                    vd_U.vd_AQ(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1], l1[2], l1[3], l1[4], l2[2], l2[3], l2[4]);
                }
            }
        }
    };
    this.vd_jo = function(pts, vd_eN) {
        var gradient = 0,
        x = 0,
        z = 0,
        i = 0;
        var n = pts.length;
        if (n === 0) return;
        p1 = pts[0];
        vd_W = p1[Y];
        vd_e = p1[Y];
        minx = p1[X];
        maxx = p1[X];
        for (i = 1; i < n; i++) {
            p1 = pts[i];
            if (p1[Y] < vd_W) vd_W = p1[Y];
            else if (p1[Y] > vd_e) vd_e = p1[Y];
            if (p1[X] < minx) minx = p1[X];
            else if (p1[X] > maxx) maxx = p1[X];
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        vd_W = Math.round(vd_W);
        vd_e = Math.round(vd_e);
        var vd_bw;
        for (y = vd_W; y <= vd_e; y++) {
            vd_bw = [];
            ints = 0;
            for (i = 0; i < n; i++) {
                if (i === 0) {
                    ind1 = n - 1;
                    ind2 = 0;
                } else {
                    ind1 = i - 1;
                    ind2 = i;
                }
                p1 = pts[ind1];
                p2 = pts[ind2];
                y2 = p2[Y];
                y1 = p1[Y];
                if (y1 == y2) continue;
                if (y1 > y2) {
                    p2 = pts[ind1];
                    p1 = pts[ind2];
                }
                y2 = p2[Y];
                y1 = p1[Y];
                x2 = p2[X];
                x1 = p1[X];
                z2 = p2[Z];
                z1 = p1[Z];
                if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                    gradient = (y - y1) / (y2 - y1);
                    z = vdgeo.vd_aj(z1, z2, gradient);
                    x = vdgeo.vd_aj(x1, x2, gradient);
                    ints++;
                    vd_bw.push([x, z]);
                    if (vd_eN && ints === 2) break;
                }
            }
            if (ints === 0) continue;
            if (ints === 2) {
                l1 = vd_bw[0];
                l2 = vd_bw[1];
                if (l1[0] > l2[0]) {
                    l2 = vd_bw[0];
                    l1 = vd_bw[1];
                }
                vd_U.vd_Al(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
            } else {
                vd_bw.sort(function(a, b) {
                    return a[0] - b[0]
                });
                for (var ii = 0; ii < ints - 1; ii += 2) {
                    l1 = vd_bw[ii];
                    l2 = vd_bw[ii + 1];
                    vd_U.vd_Al(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
                }
            }
        }
    };
    this.vd_ds = function(pts) {
        var gradient = 0,
        i = 0;
        var n = pts.length;
        if (n === 0) return;
        p1 = pts[0];
        vd_W = p1[Y];
        vd_e = p1[Y];
        minx = p1[X];
        maxx = p1[X];
        for (i = 1; i < n; i++) {
            p1 = pts[i];
            if (p1[Y] < vd_W) vd_W = p1[Y];
            else if (p1[Y] > vd_e) vd_e = p1[Y];
            if (p1[X] < minx) minx = p1[X];
            else if (p1[X] > maxx) maxx = p1[X];
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        vd_W = Math.round(vd_W);
        vd_e = Math.round(vd_e);
        if (vd_e - vd_W <= 1) {
            vd_U.vd_qV(minx, vd_W, maxx - minx + 1);
            return;
        }
        for (y = vd_W; y <= vd_e; y++) {
            var vd_bw = [];
            ints = 0;
            for (i = 0; i < n; i++) {
                if (i === 0) {
                    ind1 = n - 1;
                    ind2 = 0;
                } else {
                    ind1 = i - 1;
                    ind2 = i;
                }
                p1 = pts[ind1];
                p2 = pts[ind2];
                y2 = p2[Y];
                y1 = p1[Y];
                if (y1 == y2) continue;
                if (y1 > y2) {
                    p2 = pts[ind1];
                    p1 = pts[ind2];
                }
                y2 = p2[Y];
                y1 = p1[Y];
                x2 = p2[X];
                x1 = p1[X];
                if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                    gradient = (y - y1) / (y2 - y1);
                    var x = vdgeo.vd_aj(x1, x2, gradient);
                    vd_bw.push(x);
                    ints++;
                }
            }
            if (ints === 0) continue;
            if (ints === 2) {
                l1 = vd_bw[0];
                l2 = vd_bw[1];
                if (l1 > l2) {
                    l2 = vd_bw[0];
                    l1 = vd_bw[1];
                }
                vd_U.vd_qV(l1, y, l2 - l1 + 1);
            } else {
                vd_bw.sort(function(a, b) {
                    return a - b
                });
                for (var ii = 0; ii < ints - 1; ii += 2) {
                    vd_U.vd_qV(vd_bw[ii], y, vd_bw[ii + 1] - vd_bw[ii] + 1);
                }
            }
        }
    };
    this.vd_Gd = function(x1, y1, w, z1, z2, u1, v1, w1, u2, v2, w2) {
        var iz = 0,
        iu = 0,
        iv = 0,
        iw = 0;
        var sx = 0,
        ex = 0,
        i = 0,
        gradient = 0,
        z = 0,
        u = 0,
        v = 0,
        tw = 0;
        var _sx = 0,
        _ex = 0,
        vd_eO = 0,
        vd_ea, dx = 0,
        dy = 0;
        var vd_eG = 0,
        sx_a = 0,
        ex_a = 0;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        _sx = vdgeo.vd_o(sx);
        _ex = vdgeo.vd_o(ex);
        if (_sx >= _ex) return;
        vd_eO = 1.0;
        vd_ea = 1.0;
        dx = (_sx - sx);
        if (dx <= 0) dx = 1.0 + dx;
        dy = ex - _ex;
        if (dy <= 0) dy = 1.0 + dy;
        vd_eO = Math.max(0.3, dx);
        vd_ea = Math.max(0.3, dy);
        sx = _sx;
        ex = _ex;
        y1 = vdgeo.vd_o(y1);
        iz = (z2 - z1);
        iu = (u2 - u1);
        iv = (v2 - v1);
        iw = (w2 - w1);
        vd_eG = vd_U.Alpha;
        sx_a = vdgeo.vd_o(vd_eO * vd_U.Alpha);
        ex_a = vdgeo.vd_o(vd_ea * vd_U.Alpha);
        gradient = (sx - x1) / w;
        z = z1 + iz * gradient;
        u = u1 + iu * gradient;
        v = v1 + iv * gradient;
        tw = w1 + iw * gradient;
        if (tw != 0.0) {
            u /= tw;
            v /= tw;
        }
        vd_cC(sx, y1);
        vd_U.Alpha = sx_a;
        vd_U.vd_bV(z, true, u, v);
        vd_U.Alpha = vd_eG;
        for (i = sx + 1; i < ex - 1; i++) {
            gradient = (i - x1) / w;
            z = z1 + iz * gradient;
            u = u1 + iu * gradient;
            v = v1 + iv * gradient;
            tw = w1 + iw * gradient;
            if (tw != 0.0) {
                u /= tw;
                v /= tw;
            }
            vd_cC(i, y1);
            vd_U.vd_bV(z, true, u, v);
        }
        if (i < ex) {
            gradient = (i - x1) / w;
            z = z1 + iz * gradient;
            u = u1 + iu * gradient;
            v = v1 + iv * gradient;
            tw = w1 + iw * gradient;
            if (tw != 0.0) {
                u /= tw;
                v /= tw;
            }
            vd_cC(i, y1);
            vd_U.Alpha = ex_a;
            vd_U.vd_bV(z, true, u, v);
            vd_U.Alpha = vd_eG;
        }
    };
    this.vd_EP = function(x1, y1, w, z1, z2) {
        var iz = 0;
        var sx = 0,
        ex = 0,
        i = 0,
        gradient = 0,
        z = 0;
        var _sx = 0,
        _ex = 0,
        vd_eO = 0,
        vd_ea, dx = 0,
        dy = 0;
        var vd_eG = 0,
        sx_a = 0,
        ex_a = 0;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        _sx = vdgeo.vd_o(sx);
        _ex = vdgeo.vd_o(ex);
        if (_sx >= _ex) return;
        vd_eO = 1.0;
        vd_ea = 1.0;
        dx = (_sx - sx);
        if (dx <= 0) dx = 1.0 + dx;
        dy = ex - _ex;
        if (dy <= 0) dy = 1.0 + dy;
        vd_eO = Math.max(0.3, dx);
        vd_ea = Math.max(0.3, dy);
        sx = _sx;
        ex = _ex;
        y1 = vdgeo.vd_o(y1);
        iz = (z2 - z1);
        vd_eG = vd_U.Alpha;
        sx_a = vdgeo.vd_o(vd_eO * vd_U.Alpha);
        ex_a = vdgeo.vd_o(vd_ea * vd_U.Alpha);
        gradient = (sx - x1) / w;
        z = z1 + iz * gradient;
        vd_cC(sx, y1);
        vd_U.Alpha = sx_a;
        vd_U.vd_bV(z);
        vd_U.Alpha = vd_eG;
        for (i = sx + 1; i < ex - 1; i++) {
            gradient = (i - x1) / w;
            z = z1 + iz * gradient;
            vd_cC(i, y1);
            vd_U.vd_bV(z);
        }
        if (i < ex) {
            gradient = (i - x1) / w;
            z = z1 + iz * gradient;
            vd_cC(i, y1);
            vd_U.Alpha = ex_a;
            vd_U.vd_bV(z);
            vd_U.Alpha = vd_eG;
        }
    };
    this.vd_FO = function(x1, y1, w) {
        var sx = 0,
        ex = 0,
        i = 0;
        var _sx = 0,
        _ex = 0,
        vd_eO = 0,
        vd_ea, dx = 0,
        dy = 0;
        var vd_eG = 0,
        sx_a = 0,
        ex_a = 0;
        sx = Math.max(vd_U.vd_h.clip[0], x1);
        ex = Math.min(vd_U.vd_h.clip[2], x1 + w);
        _sx = vdgeo.vd_o(sx);
        _ex = vdgeo.vd_o(ex);
        if (_sx >= _ex) return;
        vd_eO = 1.0;
        vd_ea = 1.0;
        dx = (_sx - sx);
        if (dx <= 0) dx = 1.0 + dx;
        dy = ex - _ex;
        if (dy <= 0) dy = 1.0 + dy;
        vd_eO = Math.max(0.3, dx);
        vd_ea = Math.max(0.3, dy);
        sx = _sx;
        ex = _ex;
        y1 = vdgeo.vd_o(y1);
        vd_eG = vd_U.Alpha;
        sx_a = vdgeo.vd_o(vd_eO * vd_U.Alpha);
        ex_a = vdgeo.vd_o(vd_ea * vd_U.Alpha);
        vd_cC(sx, y1);
        vd_U.Alpha = sx_a;
        vd_U.vd_bV(1);
        vd_U.Alpha = vd_eG;
        for (i = sx + 1; i < ex - 1; i++) {
            vd_cC(i, y1);
            vd_U.vd_bV(1);
        }
        if (i < ex) {
            vd_cC(i, y1);
            vd_U.Alpha = ex_a;
            vd_U.vd_bV(1);
            vd_U.Alpha = vd_eG;
        }
    };
    this.vd_lu = function(vd_bc) {
        var gradient = 0,
        x = 0,
        a = 0,
        i = 0;
        vd_W = vd_e = minx = maxx = 0;
        var vd_fh = [];
        for (a = 0; a < vd_bc.length; a++) {
            for (i = 0; i < vd_bc[a].length; i++) {
                p1 = vd_bc[a][i];
                if (i === 0 && a === 0) {
                    vd_W = p1[Y];
                    vd_e = p1[Y];
                    minx = p1[X];
                    maxx = p1[X];
                    continue;
                }
                if (p1[Y] < vd_W) vd_W = p1[Y];
                else if (p1[Y] > vd_e) vd_e = p1[Y];
                if (p1[X] < minx) minx = p1[X];
                else if (p1[X] > maxx) maxx = p1[X];
            }
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        var y;
        var k = 0;
        for (y = vd_W; y <= vd_e; y++) {
            vd_fh.push(y);
        }
        ints = 0;
        for (k = 0; k < vd_fh.length; k++) {
            y = vd_fh[k];
            var vd_bw = [];
            ints = 0;
            for (a = 0; a < vd_bc.length; a++) {
                for (i = 0; i < vd_bc[a].length - 1; i++) {
                    ind1 = i;
                    ind2 = i + 1;
                    p1 = vd_bc[a][ind1];
                    p2 = vd_bc[a][ind2];
                    y1 = p1[Y];
                    y2 = p2[Y];
                    if (y1 == y2) continue;
                    if (y1 > y2) {
                        p2 = vd_bc[a][ind1];
                        p1 = vd_bc[a][ind2];
                    }
                    y1 = p1[Y];
                    y2 = p2[Y];
                    x1 = p1[X];
                    x2 = p2[X];
                    if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                        gradient = (y - y1) / (y2 - y1);
                        x = vdgeo.vd_aj(x1, x2, gradient);
                        vd_bw.push([x]);
                        ints++;
                    }
                }
            }
            if (ints === 0) continue;
            vd_bw.sort(function(a, b) {
                return a[0] - b[0]
            });
            for (var ii = 0; ii < ints - 1; ii += 2) {
                l1 = vd_bw[ii];
                l2 = vd_bw[ii + 1];
                vd_U.vd_FO(l1[0], y, l2[0] - l1[0] + 1);
            }
        }
    };
    this.vd_sx = function(vd_bc) {
        var gradient = 0,
        x = 0,
        z = 0,
        a = 0,
        i = 0;
        vd_W = vd_e = minx = maxx = 0;
        var vd_fh = [];
        for (a = 0; a < vd_bc.length; a++) {
            for (i = 0; i < vd_bc[a].length; i++) {
                p1 = vd_bc[a][i];
                if (i === 0 && a === 0) {
                    vd_W = p1[Y];
                    vd_e = p1[Y];
                    minx = p1[X];
                    maxx = p1[X];
                    continue;
                }
                if (p1[Y] < vd_W) vd_W = p1[Y];
                else if (p1[Y] > vd_e) vd_e = p1[Y];
                if (p1[X] < minx) minx = p1[X];
                else if (p1[X] > maxx) maxx = p1[X];
            }
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        var y;
        var k = 0;
        for (y = vd_W; y <= vd_e; y++) {
            vd_fh[k++] = y;
        }
        ints = 0;
        for (k = 0; k < vd_fh.length; k++) {
            y = vd_fh[k];
            var vd_bw = [];
            ints = 0;
            for (a = 0; a < vd_bc.length; a++) {
                for (i = 0; i < vd_bc[a].length - 1; i++) {
                    ind1 = i;
                    ind2 = i + 1;
                    p1 = vd_bc[a][ind1];
                    p2 = vd_bc[a][ind2];
                    y1 = p1[Y];
                    y2 = p2[Y];
                    if (y1 == y2) continue;
                    if (y1 > y2) {
                        p2 = vd_bc[a][ind1];
                        p1 = vd_bc[a][ind2];
                    }
                    y1 = p1[Y];
                    y2 = p2[Y];
                    x1 = p1[X];
                    x2 = p2[X];
                    z1 = p1[Z];
                    z2 = p2[Z];
                    if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                        gradient = (y - y1) / (y2 - y1);
                        z = vdgeo.vd_aj(z1, z2, gradient);
                        x = vdgeo.vd_aj(x1, x2, gradient);
                        vd_bw.push([x, z]);
                        ints++;
                    }
                }
            }
            if (ints === 0) continue;
            vd_bw.sort(function(a, b) {
                return a[0] - b[0]
            });
            for (var ii = 0; ii < ints - 1; ii += 2) {
                l1 = vd_bw[ii];
                l2 = vd_bw[ii + 1];
                vd_U.vd_EP(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1]);
            }
        }
    };
    this.vd_Dg = function(vd_bc, uvs, vd_qS) {
        if (!uvs || !vd_U.vd_h.vd_dR) {
            vd_U.vd_sx(vd_bc);
            return;
        }
        var gradient = 0,
        x = 0,
        z = 0,
        a = 0,
        i = 0,
        u = 0,
        v = 0,
        w = 0;
        vd_W = vd_e = minx = maxx = 0;
        var vd_fh = [];
        for (a = 0; a < vd_bc.length; a++) {
            for (i = 0; i < vd_bc[a].length; i++) {
                p1 = vd_bc[a][i];
                if (i === 0 && a === 0) {
                    vd_W = p1[Y];
                    vd_e = p1[Y];
                    minx = p1[X];
                    maxx = p1[X];
                    continue;
                }
                if (p1[Y] < vd_W) vd_W = p1[Y];
                else if (p1[Y] > vd_e) vd_e = p1[Y];
                if (p1[X] < minx) minx = p1[X];
                else if (p1[X] > maxx) maxx = p1[X];
            }
        }
        if (minx > vd_U.vd_h.clip[2]) return;
        if (maxx < vd_U.vd_h.clip[0]) return;
        if (vd_W > vd_U.vd_h.clip[3] || vd_e < vd_U.vd_h.clip[1]) return;
        vd_W = Math.max(vd_W, vd_U.vd_h.clip[1]);
        vd_W = Math.min(vd_W, vd_U.vd_h.clip[3]);
        vd_e = Math.max(vd_e, vd_U.vd_h.clip[1]);
        vd_e = Math.min(vd_e, vd_U.vd_h.clip[3]);
        var y;
        var k = 0;
        for (y = vd_W; y <= vd_e; y++) {
            vd_fh.push(y);
        }
        ints = 0;
        for (k = 0; k < vd_fh.length; k++) {
            y = vd_fh[k];
            var vd_bw = [];
            ints = 0;
            for (a = 0; a < vd_bc.length; a++) {
                for (i = 0; i < vd_bc[a].length - 1; i++) {
                    ind1 = i;
                    ind2 = i + 1;
                    p1 = vd_bc[a][ind1];
                    p2 = vd_bc[a][ind2];
                    y1 = p1[Y];
                    y2 = p2[Y];
                    if (y1 == y2) continue;
                    uv1 = uvs[a][ind1];
                    uv2 = uvs[a][ind2];
                    if (y1 > y2) {
                        p2 = vd_bc[a][ind1];
                        p1 = vd_bc[a][ind2];
                        uv2 = uvs[a][ind1];
                        uv1 = uvs[a][ind2];
                    }
                    y1 = p1[Y];
                    y2 = p2[Y];
                    x1 = p1[X];
                    x2 = p2[X];
                    z1 = p1[Z];
                    z2 = p2[Z];
                    uvx1 = uv1[X];
                    uvx2 = uv2[X];
                    uvy1 = uv1[Y];
                    uvy2 = uv2[Y];
                    uvz1 = uv1[Z];
                    uvz2 = uv2[Z];
                    if (((y >= y1) && (y < y2)) || ((y === vd_e) && (y > y1) && (y <= y2))) {
                        gradient = (y - y1) / (y2 - y1);
                        u = vdgeo.vd_aj(uvx1 * vd_qS, uvx2 * vd_qS, gradient);
                        v = vdgeo.vd_aj(uvy1 * vd_qS, uvy2 * vd_qS, gradient);
                        w = 1;
                        z = vdgeo.vd_aj(z1, z2, gradient);
                        x = vdgeo.vd_aj(x1, x2, gradient);
                        vd_bw.push([x, z, u, v, w]);
                        ints++;
                    }
                }
            }
            if (ints === 0) continue;
            vd_bw.sort(function(a, b) {
                return a[0] - b[0]
            });
            for (var ii = 0; ii < ints - 1; ii += 2) {
                l1 = vd_bw[ii];
                l2 = vd_bw[ii + 1];
                vd_U.vd_Gd(l1[0], y, l2[0] - l1[0] + 1, l1[1], l2[1], l1[2], l1[3], l1[4], l2[2], l2[3], l2[4]);
            }
        }
    };
    this.vd_pV = function(vd_q, vd_uk, vd_Me, vd_nc) {
        if (vd_q == null) return;
        var vd_kA = vd_q.width;
        var vd_lI = vd_q.height;
        var vd_gB = vdgeo.vd_s();
        vdgeo.vd_ay(vd_gB, vd_nc, vd_nc, 1);
        vdgeo.vd_fs(vd_gB, vd_Me);
        if (!vdgeo.vd_Ag(vd_gB)) return;
        if (vd_gB == null) return;
        var vd_GX = vdgeo.vd_bo(vd_gB);
        var m = vd_gB;
        var minv = vd_GX;
        var vd_hi = vdgeo.vd_Z(m, vdgeo.newpoint(0, 0, 0));
        var vd_sg = vdgeo.vd_Z(m, vdgeo.newpoint(vd_kA, 0, 0));
        var vd_iP = vdgeo.vd_Z(m, vdgeo.newpoint(vd_kA, vd_lI, 0));
        var vd_sc = vdgeo.vd_Z(m, vdgeo.newpoint(0, vd_lI, 0));
        var left = Math.min(vd_hi[X], vd_sg[X], vd_iP[X], vd_sc[X]);
        var right = Math.max(vd_hi[X], vd_sg[X], vd_iP[X], vd_sc[X]);
        var top = Math.min(vd_hi[Y], vd_sg[Y], vd_iP[Y], vd_sc[Y]);
        var bottom = Math.max(vd_hi[Y], vd_sg[Y], vd_iP[Y], vd_sc[Y]);
        left = vd_bk(Math.max(left, vd_U.vd_h.clip[0]));
        right = vd_bk(Math.min(right, vd_U.vd_h.clip[2]));
        top = vd_bk(Math.max(top, vd_U.vd_h.clip[1]));
        bottom = vd_bk(Math.min(bottom, vd_U.vd_h.clip[3]));
        var mA00 = minv[A00];
        var mA01 = minv[A01];
        var mA10 = minv[A10];
        var mA11 = minv[A11];
        var mA03 = minv[A03];
        var mA13 = minv[A13];
        var ptx, pty, _ptx, _pty;
        var r, g, b;
        var _px3;
        for (var iy = top; iy < bottom; iy++) {
            _ptx = mA01 * iy + mA03;
            _pty = mA11 * iy + mA13;
            for (var ix = left; ix < right; ix++) {
                ptx = mA00 * ix + _ptx;
                if (ptx < 0) continue;
                if (ptx >= vd_kA) continue;
                pty = mA10 * ix + _pty;
                if (pty < 0) continue;
                if (pty >= vd_lI) continue;
                var rgb = vd_zS(vd_q, ptx, pty);
                if (!rgb) continue;
                r = rgb[0];
                g = rgb[1];
                b = rgb[2];
                var ipos = iy * vd_U.vd_ar + ix;
                var pos = ipos * 4;
                vd_U.vd_pC(ix, iy, pos, r, g, b, vd_U.Alpha);
                vd_yD(ipos);
            }
        }
    };
    function vd_NC() {
        return vdgeo.vd_pb(px, py, vd_U.vd_h.clip[0], vd_U.vd_h.clip[1], vd_U.vd_h.clip[2], vd_U.vd_h.clip[3]);
    };
    function vd_cC(x, y) {
        px = x;
        py = y;
    };
    var vd_zv = 0;
    function vd_yQ(XDir) {
        vd_zv = XDir;
    };
    function AdvanceX() {
        px += vd_zv;
    };
    function AdvanceY() {
        py++;
    };
    function vd_uQ(vd_gf) {
        for (var i = 0; i < vd_gf; i++) {
            vd_U.vd_bV();
            AdvanceX();
        }
        AdvanceY();
    };
    function vd_tn(vd_gf) {
        for (var i = 0; i < vd_gf; i++) {
            vd_U.vd_bV();
            AdvanceY();
        }
        AdvanceX();
    };
    this.vd_fa = null;
    this.vd_so = true;
    var vd_ex = 0;
    var vd_ie = null;
    var vd_vD = null;
    this.vd_Ao = function(vd_JB, color, matrix) {
        vd_ex = vd_JB;
        vd_ie = color;
        vd_vD = matrix;
    };
    this.vd_ho = function(vd_dN) {
        if (!vd_dN || !vd_dN.bytes) vd_U.vd_fa = null;
        else vd_U.vd_fa = vd_dN;
    };
    var xor = false;
    this.vd_NJ = function(value) {
        var ret = xor;
        xor = value;
        return ret;
    };
    var vd_nA = undefined;
    function vd_CU() {
        if (vd_nA !== undefined) return vd_nA;
        return vdgeo.vd_Mw(vd_ez[0], vd_ez[1], vd_ez[2], vd_ez[3], vd_ez[4], vd_ez[5], px, py);
    };
    function vd_zS(vd_q, _x, _y) {
        var ir, ig, ib, ia;
        var tx = vd_q.width;
        var ty = vd_q.height;
        var x = vdgeo.vd_o(_x);
        var y = vdgeo.vd_o(_y);
        var bytescount = 4;
        var _px = x;
        var _py = y;
        var _px3 = _px * bytescount;
        var vd_dM = vd_q.bytes[_py];
        ir = vd_dM[_px3];
        ig = vd_dM[_px3 + 1];
        ib = vd_dM[_px3 + 2];
        ia = vd_dM[_px3 + 3];
        if (vd_U.vd_lP === vdConst.InterpolationMode_Bilinear) {
            var ir2, ig2, ib2, ia2, ir3, ig3, ib3, ia3, ir4, ig4, ib4, ia4;
            var dU, dV, m1, m2, m3, m4;
            _px = Math.min(x + 1, tx - 1);
            _px3 = _px * bytescount;
            ir2 = vd_dM[_px3];
            ig2 = vd_dM[_px3 + 1];
            ib2 = vd_dM[_px3 + 2];
            ia2 = vd_dM[_px3 + 3];
            _px = Math.min(x, tx - 1);
            _px3 = _px * bytescount;
            _py = Math.min(y + 1, ty - 1);
            vd_dM = vd_q.bytes[_py];
            ir3 = vd_dM[_px3];
            ig3 = vd_dM[_px3 + 1];
            ib3 = vd_dM[_px3 + 2];
            ia3 = vd_dM[_px3 + 3];
            _px = Math.min(x + 1, tx - 1);
            _px3 = _px * bytescount;
            ir4 = vd_dM[_px3];
            ig4 = vd_dM[_px3 + 1];
            ib4 = vd_dM[_px3 + 2];
            ia4 = vd_dM[_px3 + 3];
            dU = (_x - x);
            dV = (_y - y);
            m1 = (1 - dU) * (1 - dV);
            m2 = (dU) * (1 - dV);
            m3 = (1 - dU) * (dV);
            m4 = (dU) * (dV);
            ir = vdgeo.vd_o(ir * m1 + ir2 * m2 + ir3 * m3 + ir4 * m4);
            ig = vdgeo.vd_o(ig * m1 + ig2 * m2 + ig3 * m3 + ig4 * m4);
            ib = vdgeo.vd_o(ib * m1 + ib2 * m2 + ib3 * m3 + ib4 * m4);
            ia = vdgeo.vd_o(ia * m1 + ia2 * m2 + ia3 * m3 + ia4 * m4);
        }
        if (ia === 0) return null;
        return [ir, ig, ib];
    };
    this.vd_CX = function(xmin, xmax, ymin, ymax) {
        if (!vd_U.vd_h.vd_bu) return 1.0;
        var vd_cP = Math.min(xmin, xmax);
        var vd_cT = Math.max(xmin, xmax);
        vd_cP = vd_bk(Math.max(vd_cP, 0));
        vd_cT = vd_bk(Math.min(vd_cT, vd_U.vd_ar - 1));
        var vd_dF = Math.min(ymin, ymax);
        var vd_cU = Math.max(ymin, ymax);
        vd_dF = vd_bk(Math.max(vd_dF, 0));
        vd_cU = vd_bk(Math.min(vd_cU, vd_U.vd_bx - 1));
        var ret = 2.0;
        for (var y = vd_dF; y < vd_cU; y++) {
            for (var x = vd_cP; x < vd_cT; x++) {
                var ipos = y * vd_U.vd_ar + x;
                ret = Math.min(vd_cz[ipos][0], ret);
            }
        }
        if (ret > 1) ret = 0;
        return ret;
    };
    this.vd_kd = function(x, y) {
        x = vdgeo.vd_o(x);
        y = vdgeo.vd_o(y);
        if (!vd_U.vd_h.vd_bu || x < 0 || x >= vd_U.vd_ar || y < 0 || y >= vd_U.vd_bx) return 1.0;
        var ipos = y * vd_U.vd_ar + x;
        return vd_cz[ipos][0];
    };
    var vd_xH = 0.000000001;
    var vd_Gs = 0.005;
    var __PT = vdgeo.newpoint(0, 0, 0);
    var ipos = 0,
    vd_kK = 0,
    cz = 0,
    alpha = 0;
    this.vd_Lu = function(x, y, z, vd_DA, vd_vQ) {
        x = vd_bk(x);
        y = vd_bk(y);
        if (x > vd_U.vd_h.clip[2]) return false;
        if (x < vd_U.vd_h.clip[0]) return false;
        if (y > vd_U.vd_h.clip[3] || y < vd_U.vd_h.clip[1]) return false;
        if ((vd_U.vd_h.vd_bu || vd_U.vd_h.vd_cQ) && !vd_qZ(x, y, z)) return false;
        if (vd_DA) {
            if (z === undefined || !vd_U.vd_h.vd_bu || !vd_U.vd_h.vd_bu) return true;
            var ipos = y * vd_U.vd_ar + x;
            var vd_MK = vd_cz[ipos][0];
            if (!vd_vQ) vd_vQ = vd_xH;
            if (Math.abs(z - vd_cz[ipos][0]) > vd_vQ) return false;
        }
        return true;
    };
    function vd_us(zval, vd_uC, u, v) {
        ipos = py * vd_U.vd_ar + px;
        var pos = ipos * 4;
        vd_kK = undefined;
        cz = 1.0;
        alpha = vd_U.Alpha;
        if (vd_U.vd_h.vd_bu || vd_U.vd_h.vd_cQ) {
            if (zval !== undefined) cz = zval;
            else cz = vd_CU();
            if (!vd_qZ(px, py, cz)) return;
        }
        if (vd_U.vd_h.vd_bu) {
            vd_kK = vd_cz[ipos][0];
            var vd_Cz = vd_M[pos + 3];
            if (alpha != 255 && vd_Cz != 255) {
                if (vd_Cz === alpha && vdgeo.AreEqual(cz, vd_kK, vd_Gs)) return;
            }
            if (cz > (vd_kK + vd_xH)) return;
            vd_cz[ipos][0] = cz;
        }
        if (vd_U.vd_fa && vd_uC) {
            if (!vd_U.vd_so && (u < 0 || u > 1 || v < 0 || v > 1)) return;
            var tx = vd_U.vd_fa.width;
            var ty = vd_U.vd_fa.height;
            var _x = (tx * u) % tx;
            var _y = (ty * v) % ty;
            if (_x < 0) _x += tx;
            if (_y < 0) _y += ty;
            var rgb = vd_zS(vd_U.vd_fa, _x, _y);
            if (!rgb) {
                if (vd_kK) vd_cz[ipos][0] = vd_kK;
                return;
            }
            vd_U.vd_pC(px, py, pos, rgb[0], rgb[1], rgb[2], alpha);
        } else if (vd_vD != null) {
            vdgeo.vd_fj(px, py, cz, vd_vD, __PT);
            if (__PT[W] != 0) {
                __PT[X] /= __PT[W];
                __PT[Y] /= __PT[W];
            }
            var dist = 0;
            var vd_hJ = vd_U.vd_aX;
            var vd_jO = vd_ie;
            if (vd_ex === 1 || vd_ex === 3) {
                dist = __PT[X] + 0.5;
            } else {
                vd_hJ = vd_ie;
                vd_jO = vd_U.vd_aX;
                dist = Math.sqrt(__PT[X] * __PT[X] + __PT[Y] * __PT[Y]) * 1.4142;
            }
            if (vd_ex === 3 || vd_ex === 4 || vd_ex === 6) {
                var tmp = vd_hJ;
                vd_hJ = vd_jO;
                vd_jO = tmp;
            }
            dist = Math.min(Math.max(dist, 0), 1);
            var r = vdgeo.vd_o(vd_hJ[0] + (vd_jO[0] - vd_hJ[0]) * dist);
            var g = vdgeo.vd_o(vd_hJ[1] + (vd_jO[1] - vd_hJ[1]) * dist);
            var b = vdgeo.vd_o(vd_hJ[2] + (vd_jO[2] - vd_hJ[2]) * dist);
            vd_U.vd_pC(px, py, pos, r, g, b, alpha);
        } else {
            vd_U.vd_pC(px, py, pos, vd_U.vd_aX[0], vd_U.vd_aX[1], vd_U.vd_aX[2], alpha);
        }
        vd_yD(ipos);
    };
    this.vd_pC = function(x, y, pos, r, g, b, a) {
        var ir = r;
        var ig = g;
        var ib = b;
        var ia = a;
        if (vd_jf) ia = 255;
        if (vd_U.vd_h.vd_bu && vd_U.vd_h.vd_ee) {
            ir = vdgeo.vd_o(ir * vd_U.vd_gs[0]);
            ig = vdgeo.vd_o(ig * vd_U.vd_gs[1]);
            ib = vdgeo.vd_o(ib * vd_U.vd_gs[2]);
            if (ir > 255) ir = 255;
            if (ig > 255) ig = 255;
            if (ib > 255) ib = 255;
        }
        if (a != 255 && !xor) {
            var div = a / 255;
            ir = vdgeo.vd_o(ir * div + vd_M[pos] * (1 - div));
            ig = vdgeo.vd_o(ig * div + vd_M[pos + 1] * (1 - div));
            ib = vdgeo.vd_o(ib * div + vd_M[pos + 2] * (1 - div));
        }
        if (vd_U.vd_h.vd_lS) {
            ir = ig = ib = (ir + ig + ib) / 3;
        }
        if (xor) {
            vd_M[pos++] ^= ir;
            vd_M[pos++] ^= ig;
            vd_M[pos++] ^= ib;
            vd_M[pos++] = 255;
        } else {
            if (vd_U.vd_wZ && vd_yv(x, y)) {
                ir = vd_br[0];
                ig = vd_br[1];
                ib = vd_br[2];
                ia = vd_br[3];
            }
            vd_M[pos++] = ir;
            vd_M[pos++] = ig;
            vd_M[pos++] = ib;
            vd_M[pos++] = ia;
        }
    };
    this.vd_Gx = function(x, y, w, h) {
        x = vd_bk(x);
        y = vd_bk(y);
        w = vd_bk(w);
        h = vd_bk(h);
        var left = Math.max(x, this.vd_h.clip[0]);
        var right = Math.min(x + w, vd_U.vd_h.clip[2]);
        var top = Math.max(y, vd_U.vd_h.clip[1]);
        var bottom = Math.min(y + h, vd_U.vd_h.clip[3]);
        var r = vd_U.vd_aX[0];
        var g = vd_U.vd_aX[1];
        var b = vd_U.vd_aX[2];
        var a = vd_U.Alpha;
        var pos = 0,
        i = 0;
        if (top >= vd_U.vd_h.clip[1] && top <= vd_U.vd_h.clip[3]) {
            pos = (top * vd_U.vd_ar + left) * 4;
            for (i = left; i <= right; i++) {
                vd_M[pos++] = r;
                vd_M[pos++] = g;
                vd_M[pos++] = b;
                vd_M[pos++] = a
            }
        }
        if (bottom >= vd_U.vd_h.clip[1] && bottom <= vd_U.vd_h.clip[3]) {
            pos = (bottom * vd_U.vd_ar + left) * 4;
            for (i = left; i <= right; i++) {
                vd_M[pos++] = r;
                vd_M[pos++] = g;
                vd_M[pos++] = b;
                vd_M[pos++] = a
            }
        }
        if (left >= vd_U.vd_h.clip[0] && left <= vd_U.vd_h.clip[2]) {
            pos = (top * vd_U.vd_ar + left) * 4;
            for (i = top; i <= bottom; i++) {
                vd_M[pos++] = r;
                vd_M[pos++] = g;
                vd_M[pos++] = b;
                vd_M[pos++] = a;
                pos += (vd_U.vd_ar * 4) - 4;
            }
        }
        if (right >= vd_U.vd_h.clip[0] && right <= vd_U.vd_h.clip[2]) {
            pos = (top * vd_U.vd_ar + right) * 4;
            for (i = top; i <= bottom; i++) {
                vd_M[pos++] = r;
                vd_M[pos++] = g;
                vd_M[pos++] = b;
                vd_M[pos++] = a;
                pos += (vd_U.vd_ar * 4) - 4;
            }
        }
    };
    function vd_yD(vd_Hg) {
        if (!vd_U.vd_fK || !vd_U.vd_h.vd_aG) return;
        if (vd_U.vd_h.vd_cl.length === 0) return;
        var fig = vd_U.vd_h.vd_cl[0];
        var vd_wp = vd_cz[vd_Hg];
        if (vd_U.vd_h.vd_bm.IgnoreLockLayers === true || !fig.LayerRef || !fig.LayerRef.Lock) {
            var arr = vd_wp[1];
            if (!arr) {
                arr = [];
                vd_wp[1] = arr;
            }
            var len = arr.length;
            if (len === 0 || arr[len - 1] !== fig) arr[len] = fig;
        }
        if (vd_U.vd_h.vd_aO !== undefined) {
            vd_wp[2] = [vd_DI(vd_U.vd_h.vd_cl), vd_U.vd_h.vd_aO];
        }
    };
    function vd_DI(base) {
        var vd_BY = [];
        var i;
        var len = base.length;
        for (i = 0; i < len; i++) {
            vd_BY[i] = base[i];
        }
        return vd_BY;
    };
    this.vd_wZ = false;
    var vd_jT = -1;
    function vd_Kj() {
        vd_jT = 0;
    };
    function vd_EC() {
        vd_jT = -1;
    };
    function vd_yv(x, y) {
        if (vd_jT >= 0) {
            if ((vd_jT % 6) > 2) {
                vd_jT++;
                return true;
            }
            vd_jT++;
        } else if (vd_KP[vd_bk(y % 8) * 8 + vd_bk(x % 8)] == 0) return true;
        return false;
    };
    var Temp = 0,
    vd_lp = 0,
    vd_qo = 0,
    vd_iW = 0,
    vd_cc = 0,
    vd_cE = 0;
    var vd_hf = 0,
    vd_hX = 0,
    vd_qM = 0,
    vd_gf = 0;
    function vd_AS(vd_qj, vd_od, XEnd, YEnd) {
        var i = 0;
        if (vd_od > YEnd) {
            Temp = vd_od;
            vd_od = YEnd;
            YEnd = Temp;
            Temp = vd_qj;
            vd_qj = XEnd;
            XEnd = Temp;
        }
        vd_cC(vd_qj, vd_od);
        if ((vd_cc = XEnd - vd_qj) < 0) {
            vd_yQ( - 1);
            vd_cc = -vd_cc;
        } else {
            vd_yQ(1);
        }
        vd_cE = YEnd - vd_od;
        vd_Kj();
        if (vd_cc === 0) {
            for (i = 0; i <= vd_cE; i++) {
                vd_U.vd_bV();
                AdvanceY();
            }
        } else if (vd_cE === 0) {
            for (i = 0; i <= vd_cc; i++) {
                vd_U.vd_bV();
                AdvanceX();
            }
        } else if (vd_cc === vd_cE) {
            for (i = 0; i <= vd_cc; i++) {
                vd_U.vd_bV();
                AdvanceX();
                AdvanceY();
            }
        } else if (vd_cc >= vd_cE) {
            vd_hf = vdgeo.vd_o(vd_cc / vd_cE);
            vd_lp = (vd_cc % vd_cE) * 2;
            vd_qo = vd_cE * 2;
            vd_iW = (vd_cc % vd_cE) - (vd_cE * 2);
            vd_hX = vdgeo.vd_o(vd_hf / 2) + 1;
            vd_qM = vd_hX;
            if ((vd_lp === 0) && ((vd_hf & 0x01) === 0)) {
                vd_hX--;
            }
            if ((vd_hf & 0x01) !== 0) {
                vd_iW += vd_cE;
            }
            vd_uQ(vd_hX);
            for (i = 0; i < (vd_cE - 1); i++) {
                vd_gf = vd_hf;
                if ((vd_iW += vd_lp) > 0) {
                    vd_gf++;
                    vd_iW -= vd_qo;
                }
                vd_uQ(vd_gf);
            }
            vd_uQ(vd_qM);
        } else {
            vd_hf = vdgeo.vd_o(vd_cE / vd_cc);
            vd_lp = (vd_cE % vd_cc) * 2;
            vd_qo = vd_cc * 2;
            vd_iW = (vd_cE % vd_cc) - (vd_cc * 2);
            vd_hX = vdgeo.vd_o(vd_hf / 2) + 1;
            vd_qM = vd_hX;
            if ((vd_lp === 0) && ((vd_hf & 0x01) === 0)) {
                vd_hX--;
            }
            if ((vd_hf & 0x01) !== 0) {
                vd_iW += vd_cc;
            }
            vd_tn(vd_hX);
            for (i = 0; i < (vd_cc - 1); i++) {
                vd_gf = vd_hf;
                if ((vd_iW += vd_lp) > 0) {
                    vd_gf++;
                    vd_iW -= vd_qo;
                }
                vd_tn(vd_gf);
            }
            vd_tn(vd_qM);
        }
        vd_EC();
    };
    function vd_yA(cx, cy, w, h) {
        var a = w >> 1,
        b = h >> 1,
        wod = w & 1,
        hod = h & 1,
        x = 0,
        y = b,
        oy = b,
        aa2 = (a * a) << 1,
        aa4 = aa2 << 1,
        bb2 = (b * b) << 1,
        bb4 = bb2 << 1,
        st = (aa2 >> 1) * (1 - (b << 1)) + bb2,
        tt = (bb2 >> 1) - aa2 * ((b << 1) - 1),
        xl,
        dw,
        dh;
        if (w != 0) while (y > 0) {
            if (st < 0) {
                st += bb2 * ((x << 1) + 3);
                tt += bb4 * (++x);
            } else if (tt < 0) {
                st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
                xl = cx - x;
                dw = (x << 1) + wod;
                tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
                dh = oy - y;
                vd_vf(xl, cy - oy, dw, dh);
                vd_vf(xl, cy + y + hod, dw, dh);
                oy = y;
            } else {
                tt -= aa2 * ((y << 1) - 3);
                st -= aa4 * (--y);
            }
        }
        vd_vf(cx - a, cy - oy, w, (oy << 1) + hod);
    };
    var vd_kq = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0)];
    function vd_zU(x1, y1, x2, y2, z1, z2) {
        if (vd_U.penwidth < 2) {
            vd_AS(x1, y1, x2, y2);
            return;
        } else {
            var ww2 = vd_U.penwidth / 2.0;
            var a = Math.atan2(y2 - y1, x2 - x1);
            var vd_cB = Math.cos(a + vdgeo.HALF_PI);
            var sine = Math.sin(a + vdgeo.HALF_PI);
            vdgeo.vd_hS(vd_kq[0], vd_cB * ww2 + x1, sine * ww2 + y1, z1);
            vdgeo.vd_hS(vd_kq[1], vd_cB * ww2 + x2, sine * ww2 + y2, z2);
            vdgeo.vd_hS(vd_kq[2], vd_cB * -ww2 + x2, sine * -ww2 + y2, z2);
            vdgeo.vd_hS(vd_kq[3], vd_cB * -ww2 + x1, sine * -ww2 + y1, z1);
            if ((vd_U.vd_h.vd_bu) || vd_U.vd_h.vd_cQ) vd_U.vd_jo(vd_kq, true);
            else vd_U.vd_ds(vd_kq);
            vd_nA = z1;
            vd_yA(x1, y1, vd_U.penwidth, vd_U.penwidth);
            vd_nA = z2;
            vd_yA(x2, y2, vd_U.penwidth, vd_U.penwidth);
            vd_nA = undefined;
        }
    };
    function vd_vf(x, y, width, height) {
        if (y > vd_U.vd_h.clip[3]) return;
        if (x > vd_U.vd_h.clip[2]) return;
        if (y < vd_U.vd_h.clip[1]) {
            height += (y - vd_U.vd_h.clip[1]);
            y = vd_U.vd_h.clip[1];
        }
        if (x < vd_U.vd_h.clip[0]) {
            width += (x - vd_U.vd_h.clip[0]);
            x = vd_U.vd_h.clip[0];
        }
        if (height < 0) return;
        if (width < 0) return;
        if ((x + width) > vd_U.vd_h.clip[2]) width -= (x + width - vd_U.vd_h.clip[2]);
        if ((y + height) > vd_U.vd_h.clip[3]) height -= (y + height - vd_U.vd_h.clip[3]);
        for (var h = 0; h < height; h++) {
            vd_U.vd_qV(x, y + h, width);
        }
    };
    this.ctx = vd_tK;
    var vd_zT;
    var vd_mE = null;
    var vd_qh = null;
    this.vd_NZ = function() {
        return vd_jf;
    };
    var vd_jf = false;
    this.vd_Bd = function(vd_EE) {
        if (!vd_U.ctx) return;
        if (vd_EE) {
            if (vd_jf) return;
            vd_jf = true;
            vd_mE = vd_aB;
            vd_qh = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
            vd_aB = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
            vd_M = vd_aB.data;
            vd_zT = vd_U.vd_h.vd_bu;
            vd_U.vd_h.vd_bu = false;
            vd_U.vd_h.vd_ew();
        } else {
            if (!vd_jf) return;
            vd_jf = false;
            vd_U.vd_h.vd_bu = vd_zT;
            vd_aB = vd_mE;
            if (!vd_aB) vd_M = null;
            else vd_M = vd_aB.data;
            vd_mE = null;
            vd_qh = null;
            vd_U.vd_h.vd_ew();
        }
    };
    this.vd_CH = function() {
        if (!vd_U.ctx) return;
        if (!vd_jf) return;
        vd_U.ctx.putImageData(vd_qh, 0, 0);
        vd_aB = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
        vd_M = vd_aB.data;
    };
    this.vd_CR = function() {
        if (!vd_U.ctx) return;
        if (!vd_jf) return;
        vd_mE = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
        vd_qh = vd_mE;
        vd_aB = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
        vd_M = vd_aB.data;
    };
    this.ActionDrawEntities = function(entities, vd_tF) {
        if (!entities || entities.length == 0) {
            vd_U.Refresh();
        } else {
            var vd_wc = vd_U.vd_h.vd_bu;
            var vd_wU = vd_U.vd_fK;
            vd_U.vd_h.vd_bu = false;
            vd_U.vd_fK = false;
            vd_U.vd_h.vd_ew();
            var vd_wC = vd_aB;
            vd_aB = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
            vd_M = vd_aB.data;
            try {
                for (var i = 0; i < entities.length; i++) {
                    vd_U.vd_h.vd_bm.DrawEntity(entities[i], vd_U.vd_h);
                }
            } catch(ex) {}
            vd_U.ctx.putImageData(vd_aB, 0, 0);
            if (!vd_tF) {
                vd_aB = vd_wC;
                if (!vd_aB) vd_M = null;
                else vd_M = vd_aB.data;
            }
            vd_U.vd_h.vd_bu = vd_wc;
            vd_U.vd_fK = vd_wU;
            vd_U.vd_h.vd_ew();
        }
    };
    this.Refresh = function(vd_IT) {
        if (!vd_U.ctx) return;
        vd_U.ctx.putImageData(vd_aB, 0, 0);
        if (!vd_IT && vd_U.vd_h.vd_bm.vd_uO()) {
            var vd_wC = vd_aB;
            var vd_wc = vd_U.vd_h.vd_bu;
            var vd_wU = vd_U.vd_fK;
            vd_aB = vd_U.ctx.getImageData(0, 0, vd_U.vd_ar, vd_U.vd_bx);
            vd_M = vd_aB.data;
            vd_U.vd_h.vd_bu = false;
            vd_U.vd_fK = false;
            var vd_ox = vd_U.vd_h.vd_bm.vd_eW;
            vd_U.vd_h.vd_bm.vd_eW = false;
            vd_U.vd_h.vd_ew();
            vd_U.vd_h.vd_bm.vd_nz(vd_U.vd_h);
            vd_U.ctx.putImageData(vd_aB, 0, 0);
            vd_U.vd_h.vd_bu = vd_wc;
            vd_U.vd_fK = vd_wU;
            vd_U.vd_h.vd_bm.vd_eW = vd_ox;
            vd_aB = vd_wC;
            if (!vd_aB) vd_M = null;
            else vd_M = vd_aB.data;
            vd_U.vd_h.vd_ew();
        }
    };
    function vd_Jp(x1, y1, x2, y2, z1, z2) {
        vd_AS(x1, y1, x2, y2);
    };
    var vd_lO = [];
    function vd_Da(zval, vd_uC, u, v) {
        ipos = py * vd_U.vd_ar + px;
        var pos = ipos * 4;
        var ir, ig, ib, ia;
        ia = 255;
        if (vd_yv(px, py)) {
            ir = vd_br[0];
            ig = vd_br[1];
            ib = vd_br[2];
        } else {
            if (vd_lO.length === 0) {
                ir = vd_U.vd_aX[0];
                ig = vd_U.vd_aX[1];
                ib = vd_U.vd_aX[2];
            } else {
                ir = vd_lO[0];
                ig = vd_lO[1];
                ib = vd_lO[2];
            }
        }
        vd_M[pos++] = ir;
        vd_M[pos++] = ig;
        vd_M[pos++] = ib;
        vd_M[pos++] = ia;
    };
    function vd_CW(zval, vd_uC, u, v) {
        ipos = py * vd_U.vd_ar + px;
        var pos = ipos * 4;
        vd_M[pos++] = vd_U.vd_aX[0];
        vd_M[pos++] = vd_U.vd_aX[1];
        vd_M[pos++] = vd_U.vd_aX[2];
        vd_M[pos++] = 255;
    };
    this.vd_HI = function() {
        var ret = vd_U.vd_bV;
        vd_U.vd_bV = vd_us;
        return ret;
    };
    this.vd_GL = function(vd_FE) {
        vd_U.vd_bV = vd_FE;
    };
    this.vd_rW = vd_zU;
    this.vd_bV = vd_us;
    this.vd_AB = function(vd_Fq, vd_GK) {
        if (vd_Fq) {
            vd_lO = vd_GK;
            if (vd_lO) vd_U.vd_bV = vd_Da;
            else vd_U.vd_bV = vd_CW;
            vd_U.vd_rW = vd_Jp;
        } else {
            vd_U.vd_bV = vd_us;
            vd_U.vd_rW = vd_zU;
        }
    };
    return this;
};
function vd_Kz(vdcanvas) {
    var vd_U = this;
    var render = null;
    this.vd_Ai = function(vd_JO) {
        var ret = render;
        render = vd_JO;
        return ret;
    };
    vd_vu = 'precision mediump float;' + 'varying float vfigprops;' + 'varying vec4 vTexture;' + 'uniform sampler2D uSampler;' + 'uniform int textureprops;' + 'uniform int vd_na;' + 'uniform float section[25]; ' + 'uniform vec4 vd_br;' + 'uniform int vd_js;' + 'vec4 color;' + 'varying vec4 vColor;' + 'varying vec4 vpos;' + 'float x,y,z,s,gcol;' + 'void main(void) {' + 'if (vd_js != 3){' + 'if (vd_js == 1 && vColor.a < 0.999) discard;' + 'if (vd_js == 2 && vColor.a > 0.999) discard;' + '}' + 'color = vColor;' + 'x = vpos.x  / vpos.w;' + 'y = vpos.y / vpos.w;' + 'z = vpos.z / vpos.w;' + 'for(int i = 0 ; i < 5; i++){' + 'if(section[i*5+4] != 0.0)' + '{' + 's = section[i*5+0] * x + section[i*5+1] * y + section[i*5+2] * z + section[i*5+3];' + 'if(s < 0.0) discard;' + '}' + 'else' + '{' + 'break;' + '}' + '}' + 'if(textureprops == 1){' + 'x = vTexture[0];' + 'y = vTexture[1];' + 'z = vTexture[2] ;' + 'if (z == 0.0) z = 1.0;' + 'x = mod(x / z , 1.0);' + 'y = mod(y / z , 1.0);' + 'color =  texture2D(uSampler, vec2(x,y))* color;' + '}' + 'if(vfigprops == 1.0 ){' + 'x = mod(floor(gl_FragCoord.x), 8.0);' + 'y = mod(floor(gl_FragCoord.y), 8.0);' + 'if(x == y || x == (7.0 - y)){' + '        color  = vd_br;' + '}' + '}' + 'if(vd_na == 1){' + 'gcol = (color[0] + color[1] + color[2]) / 3.0;' + 'color = vec4(gcol,gcol,gcol,color[3]);' + '}' + 'gl_FragColor = color;' + '}';
    vd_wo = 'attribute float figprops;' + 'varying float vfigprops;' + 'attribute vec4 aVertexTexture;' + 'varying vec4 vTexture;' + 'attribute vec4 ppos;' + 'attribute vec4 aVertexColor;' + 'varying vec4 vColor;' + 'varying vec4 vpos;' + 'void main(void) {' + 'gl_PointSize = 1.0;' + 'gl_Position = ppos;' + 'vpos = ppos;' + 'vColor = aVertexColor;' + 'vTexture = aVertexTexture;' + 'vfigprops = figprops;' + '}';
    vd_EV = 'precision mediump float;' + 'varying vec4 vColor;' + 'varying vec4 vpos;' + 'uniform float section[25]; ' + 'float x,y,z,s,a,b,b1,b2,z01;' + 'void main(void) {' + 'x = vpos.x;' + 'y = vpos.y;' + 'z = vpos.z;' + 'if(vpos.w != 0.0 ){' + 'z /= vpos.w;' + 'x /= vpos.w;' + 'y /= vpos.w;' + '}' + 'for(int i = 0 ; i < 5; i++){' + 'if(section[i*5+4] != 0.0)' + '{' + 's = section[i*5+0] * x + section[i*5+1] * y + section[i*5+2] * z + section[i*5+3];' + 'if(s < 0.0) discard;' + '}' + 'else' + '{' + 'break;' + '}' + '}' + 'z01 = ((1.0 + z) * 0.5);' + 'a = floor( 65535.0 * z01  );' + 'b = mod(a,256.0);b1=b/255.0;' + 'a = (a-b) / 256.0;b = mod(a,256.0);b2=b/255.0;' + 'gl_FragColor = vec4(b1,b2,vColor[0],vColor[1]);' + '}';
    vd_Hj = 'attribute vec4 aVertexColor;' + 'varying vec4 vColor;' + 'varying vec4 vpos;' + 'attribute vec4 ppos;' + 'void main(void) {' + 'gl_PointSize = 1.0;' + 'gl_Position = ppos;' + 'vpos = ppos;' + 'vColor = aVertexColor;' + '}';
    var vd_r = {
        vd_vu: vd_EV,
        vd_wo: vd_Hj,
        gl: null,
        vd_de: null,
        vd_bL: null,
        vd_ix: null,
        vd_fM: null,
        vd_iJ: null,
        vd_ga: null,
        section: null,
        vd_gI: null,
        vd_kY: [0, 0]
    };
    this.vd_Km = function(fig, index) {
        if (index === undefined) return;
        if (!vd_gj()) return;
        vd_ne = (fig && fig.selected) ? 1 : 0;
        var a, b, v1 = 0,
        v2 = 0;
        if (index < 65535) {
            a = index + 1;
            b = a % 256.0;
            v1 = b / 255.0;
            a = (a - b) / 256.0;
            b = a % 256.0;
            v2 = b / 255.0;
        }
        vd_r.vd_kY = [v1, v2];
    };
    function vd_gj() {
        return render.vd_aG;
    };
    function vd_EK() {
        var w = render.vd_Y.vd_ar;
        var h = render.vd_Y.vd_bx;
        vd_r.vd_de = document.createElement("CANVAS");
        vd_r.vd_de.setAttribute("width", w);
        vd_r.vd_de.setAttribute("height", h);
        vd_r.vd_gI = new Uint8Array(w * h * 4);
        vd_r.gl = vd_xp(vd_r.vd_de, {
            antialias: false
        });
        var vd_wi = vd_r.gl.createShader(vd_r.gl.FRAGMENT_SHADER);
        vd_r.gl.shaderSource(vd_wi, vd_r.vd_vu);
        vd_r.gl.compileShader(vd_wi);
        var vd_wy = vd_r.gl.createShader(vd_r.gl.VERTEX_SHADER);
        vd_r.gl.shaderSource(vd_wy, vd_r.vd_wo);
        vd_r.gl.compileShader(vd_wy);
        vd_r.vd_bL = vd_r.gl.createProgram();
        vd_r.gl.attachShader(vd_r.vd_bL, vd_wi);
        vd_r.gl.attachShader(vd_r.vd_bL, vd_wy);
        vd_r.gl.linkProgram(vd_r.vd_bL);
        vd_r.gl.validateProgram(vd_r.vd_bL);
        vd_r.gl.useProgram(vd_r.vd_bL);
        if (!vd_r.gl.getProgramParameter(vd_r.vd_bL, vd_r.gl.VALIDATE_STATUS)) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during vd_bL validation:\n' + vd_r.gl.getProgramInfoLog(vd_r.vd_bL));
        }
        vd_r.vd_ix = vd_r.gl.getAttribLocation(vd_r.vd_bL, 'ppos');
        vd_r.gl.enableVertexAttribArray(vd_r.vd_ix);
        vd_r.vd_iJ = vd_r.gl.getAttribLocation(vd_r.vd_bL, 'aVertexColor');
        vd_r.gl.enableVertexAttribArray(vd_r.vd_iJ);
        vd_r.section = vd_r.gl.getUniformLocation(vd_r.vd_bL, "section");
    };
    function vd_Dd(vd_K) {
        if (!vd_gj()) return;
        var vd_l = vd_U.vd_DZ;
        if (vd_aT === 0) {
            vd_l[vd_K + 4] = vd_l[vd_K + 8] = vd_l[vd_K] = vd_r.vd_kY[0];
            vd_l[vd_K + 5] = vd_l[vd_K + 9] = vd_l[vd_K + 1] = vd_r.vd_kY[1];
            vd_l[vd_K + 6] = vd_l[vd_K + 10] = vd_l[vd_K + 2] = 1;
            vd_l[vd_K + 7] = vd_l[vd_K + 11] = vd_l[vd_K + 3] = 1;
        } else if (vd_aT === 1) {
            vd_l[vd_K + 4] = vd_l[vd_K] = vd_r.vd_kY[0];
            vd_l[vd_K + 5] = vd_l[vd_K + 1] = vd_r.vd_kY[1];
            vd_l[vd_K + 6] = vd_l[vd_K + 2] = 1;
            vd_l[vd_K + 7] = vd_l[vd_K + 3] = 1;
        } else {
            vd_l[vd_K] = vd_r.vd_kY[0];
            vd_l[vd_K + 1] = vd_r.vd_kY[1];
            vd_l[vd_K + 2] = 1;
            vd_l[vd_K + 3] = 1;
        }
    };
    function vd_Hv() {
        if (!vd_gj()) return;
        var w = render.vd_Y.vd_ar;
        var h = render.vd_Y.vd_bx;
        if (vd_r.vd_de.width < w || vd_r.vd_de.height < h) {
            vd_r.vd_gI = new Uint8Array(w * h * 4);
            vd_r.vd_de.setAttribute("width", w);
            vd_r.vd_de.setAttribute("height", h);
        }
        vd_r.gl.enable(vd_r.gl.DEPTH_TEST);
        vd_r.gl.depthFunc(vd_r.gl.LEQUAL);
        vd_r.gl.viewport(render.vd_cO, render.vd_fG, render.width, render.height);
        vd_r.gl.disable(vd_r.gl.BLEND);
    };
    function vd_IM(sec) {
        if (!vd_gj()) return;
        vd_r.gl.uniform1fv(vd_r.section, sec);
    };
    function vd_DP() {
        if (!vd_gj()) return;
        vd_r.gl.clearDepth(1.0);
        vd_r.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        vd_r.gl.clear(vd_r.gl.COLOR_BUFFER_BIT | vd_r.gl.DEPTH_BUFFER_BIT);
    };
    function vd_Eu() {
        if (!vd_gj()) return;
        vd_r.gl.flush();
        var w1 = render.vd_Y.vd_ar;
        var h1 = render.vd_Y.vd_bx;
        vd_r.gl.readPixels(0, 0, w1, h1, vd_r.gl.RGBA, vd_r.gl.UNSIGNED_BYTE, vd_r.vd_gI);
        var vd_xy = render.vd_Y.vd_nU();
        var k = 0,
        i = 0;
        var length = vd_r.vd_gI.length;
        for (i = 0; i < length; i += 4) {
            vd_xy[k++][0] = 2.0 * (((vd_r.vd_gI[i]) | (vd_r.vd_gI[i + 1] << 8)) / 65535.0) - 1.0;
        }
        var layout = vdcanvas.GetActiveLayout();
        if (layout) {
            var elen = layout.Entities.Items.length;
            k = 0;
            length = vd_r.vd_gI.length;
            for (i = 0; i < length; i += 4, k++) {
                var index = ((vd_r.vd_gI[i + 2]) | (vd_r.vd_gI[i + 3] << 8));
                if (index > 0 && index <= elen) vd_xy[k][1] = [vdcanvas.GetEntityItem(layout.Entities.Items[index - 1])];
            }
        }
    };
    var gl = null;
    var vd_de = null;
    var vd_nv = false;
    var vd_bL = null;
    var vd_um = vdgeo.vd_s();
    var vd_fR = vdgeo.vd_s();
    var vd_fi = 0;
    var vd_aT = 0;
    var vd_hI = 0;
    var vd_hB = 0;
    var vd_hb = 0;
    var vd_ix = null;
    var vd_fM = null;
    var vd_iJ = null;
    var vd_ga = null;
    var vd_ev = null;
    Object.defineProperty(vd_U, 'vd_ye', {
        get: function() {
            return vd_ev[vd_aT][0];
        }
    });
    Object.defineProperty(vd_U, 'vd_CK', {
        get: function() {
            return vd_ev[vd_aT][1];
        }
    });
    Object.defineProperty(vd_U, 'vd_Cr', {
        get: function() {
            return vd_ev[vd_aT][2];
        }
    });
    Object.defineProperty(vd_U, 'vd_CB', {
        get: function() {
            return vd_ev[vd_aT][3];
        }
    });
    Object.defineProperty(vd_U, 'vd_DZ', {
        get: function() {
            return vd_ev[vd_aT][4];
        }
    });
    function vd_xZ() {
        var size = 12 * vdcanvas.vd_Bu();
        if (vd_ev === null || vd_ev[0][0].length != size) {
            vd_ev = [];
            vd_ev.push([new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size)]);
            vd_ev.push([new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size)]);
            vd_ev.push([new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size), new Float32Array(size)]);
            if (vd_fM) gl.deleteBuffer(vd_fM);
            if (vd_ga) gl.deleteBuffer(vd_ga);
            if (vd_mW) gl.deleteBuffer(vd_mW);
            if (vd_nS) gl.deleteBuffer(vd_nS);
            if (vd_r.vd_fM) vd_r.gl.deleteBuffer(vd_r.vd_fM);
            if (vd_r.vd_ga) vd_r.gl.deleteBuffer(vd_r.vd_ga);
            vd_fM = gl.createBuffer();
            vd_ga = gl.createBuffer();
            vd_mW = gl.createBuffer();
            vd_nS = gl.createBuffer();
            vd_r.vd_fM = vd_r.gl.createBuffer();
            vd_r.vd_ga = vd_r.gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_fM);
            gl.vertexAttribPointer(vd_ix, 4, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_ga);
            gl.vertexAttribPointer(vd_iJ, 4, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_mW);
            gl.vertexAttribPointer(vd_we, 4, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_nS);
            gl.vertexAttribPointer(vd_wI, 1, gl.FLOAT, false, 0, 0);
            if (vd_gj()) {
                vd_r.gl.bindBuffer(vd_r.gl.ARRAY_BUFFER, vd_r.vd_fM);
                vd_r.gl.vertexAttribPointer(vd_r.vd_ix, 4, gl.FLOAT, false, 0, 0);
                vd_r.gl.bindBuffer(vd_r.gl.ARRAY_BUFFER, vd_r.vd_ga);
                vd_r.gl.vertexAttribPointer(vd_r.vd_iJ, 4, vd_r.gl.FLOAT, false, 0, 0);
            }
        }
        vd_Ia();
        gl.uniform1i(vd_na, render.vd_lS ? 1 : 0);
    };
    var vd_wI = null;
    var vd_nS = null;
    var vd_uR = null;
    var vd_we = null;
    var vd_mW = null;
    var vd_eL = {};
    var textureprops = null;
    var vd_na = null;
    var vd_js = 3;
    var section = null;
    var vd_ne = 0;
    var vd_br = null;
    var vd_jw = null;
    this.vd_Lg = function() {
        return gl != null;
    };
    function vd_DX() {
        var vd_ff = null;
        try {
            var w = render.vd_Y.vd_ar;
            var h = render.vd_Y.vd_bx;
            vd_ff = document.createElement("CANVAS");
            vd_ff.setAttribute("width", w);
            vd_ff.setAttribute("height", h);
            vd_jw = new Uint8Array(w * h * 4);
        } catch(e) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'vd_cv caught in setCanvas: ' + e.toString());
        }
        return vd_ff;
    };
    function vd_CS() {
        var vd_iI = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vd_iI, vd_vu);
        gl.compileShader(vd_iI);
        if (!gl.getShaderParameter(vd_iI, gl.COMPILE_STATUS)) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during fragment shader compilation:\n' + gl.getShaderInfoLog(vd_iI));
            gl = null;
            return null;
        }
        return vd_iI;
    };
    function vd_EI() {
        var vd_iF = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vd_iF, vd_wo);
        gl.compileShader(vd_iF);
        if (!gl.getShaderParameter(vd_iF, gl.COMPILE_STATUS)) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during vd_b shader compilation:\n' + gl.getShaderInfoLog(vd_iF));
            gl = null;
            return null;
        }
        return vd_iF;
    };
    function vd_Er(_gl, vd_Id, vd_Jt) {
        vd_bL = _gl.createProgram();
        _gl.attachShader(vd_bL, vd_Id);
        _gl.attachShader(vd_bL, vd_Jt);
        _gl.linkProgram(vd_bL);
        if (!_gl.getProgramParameter(vd_bL, _gl.LINK_STATUS)) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during vd_bL linking:\n' + _gl.getProgramInfoLog(vd_bL));
            _gl = null;
            return false;
        }
        _gl.validateProgram(vd_bL);
        if (!_gl.getProgramParameter(vd_bL, _gl.VALIDATE_STATUS)) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during vd_bL validation:\n' + _gl.getProgramInfoLog(vd_bL));
            _gl = null;
            return false;
        }
        _gl.useProgram(vd_bL);
        return true;
    };
    function vd_qO(vd_FR) {
        var attribute = gl.getAttribLocation(vd_bL, vd_FR);
        if (attribute == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during attribute address retrieval');
            gl = null;
            return attribute;
        }
        gl.enableVertexAttribArray(attribute);
        return attribute;
    };
    function vd_xp(vd_tx, arguments) {
        if (!vd_tx) return null;
        var _gl;
        try {
            _gl = vd_tx.getContext('webgl', arguments) || vd_tx.getContext('experimental-webgl', arguments);
        } catch(e) {
            _gl = null;
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'vd_cv caught in getContext: ' + e.toString());
            return null;
        }
        if (!_gl) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Unable to create Web GL context');
            return null;
        }
        return _gl;
    };
    this.vd_Dl = function(vd_LE) {
        render = vd_LE;
        vd_aT = 0;
        vd_hI = 0;
        vd_hB = 0;
        vd_hb = 0;
        if (vd_nv) {
            if (gl) {
                vd_xZ();
            }
            return;
        }
        vd_nv = true;
        vd_de = vd_DX();
        gl = vd_xp(vd_de);
        if (!gl) return;
        var vd_iI = vd_CS();
        if (!vd_iI) return;
        var vd_iF = vd_EI();
        if (!vd_iF) return;
        if (!vd_Er(gl, vd_iI, vd_iF)) {
            gl = null;
            return;
        }
        vd_ix = vd_qO('ppos');
        if (vd_ix == -1) {
            gl = null;
            return;
        }
        vd_iJ = vd_qO('aVertexColor');
        if (vd_iJ == -1) {
            gl = null;
            return;
        }
        vd_wI = vd_qO('figprops');
        if (vd_wI == -1) {
            gl = null;
            return;
        }
        vd_we = vd_qO('aVertexTexture');
        if (vd_we == -1) {
            gl = null;
            return;
        }
        vd_uR = gl.getUniformLocation(vd_bL, "uSampler");
        if (vd_uR == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during uniform address retrieval');
            gl = null;
            return;
        }
        textureprops = gl.getUniformLocation(vd_bL, "textureprops");
        if (textureprops == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during uniform address retrieval');
            gl = null;
            return;
        }
        vd_na = gl.getUniformLocation(vd_bL, "vd_na");
        if (vd_na == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during uniform address retrieval');
            gl = null;
            return;
        }
        vd_js = gl.getUniformLocation(vd_bL, "vd_js");
        if (vd_js == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during uniform address retrieval');
            gl = null;
            return;
        }
        section = gl.getUniformLocation(vd_bL, "section");
        if (section == -1) {
            vdcanvas.vd_co(vdConst.vd_eC, 0, 'Error during uniform address retrieval');
            gl = null;
            return;
        }
        vd_ne = 0;
        vd_br = gl.getUniformLocation(vd_bL, "vd_br");
        vd_EK();
        vd_xZ();
    };
    this.vd_rh = function() {
        if (!vd_nv) return;
        if (!gl) return;
        for (vd_v in vd_eL) {
            if (!gl.isTexture(vd_eL[vd_v])) continue;
            gl.deleteTexture(vd_eL[vd_v]);
        }
        vd_eL = {};
    };
    function vd_Ia() {
        if (!vd_nv) return;
        if (!gl) return;
        gl.activeTexture(gl.TEXTURE0 + 0);
        gl.uniform1i(vd_uR, 0);
        gl.uniform1i(textureprops, 0);
        if (!vd_eL['h_0']) {
            vd_eL['h_0'] = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, vd_eL['h_0']);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        } else {
            gl.bindTexture(gl.TEXTURE_2D, vd_eL['h_0']);
        }
    };
    this.vd_HH = function() {
        if (!vd_nv) return;
        if (!gl) return;
        var vd_Of = vdgeo.vd_s();
        var sec = [];
        sec.length = 25;
        for (var i = 0; i < 25; i++) sec[i] = 0.0;
        var seci = 0;
        if (render.vd_cQ) {
            for (var i = 0; i < render.vd_cQ.length; i++) {
                var vd_oX = render.vd_cQ[i];
                var mat = vdgeo.vd_bo(vd_fR);
                vdgeo.vd_ae(mat, -vd_oX[0][X], -vd_oX[0][Y], -vd_oX[0][Z]);
                vdgeo.vd_hN(mat, vd_oX[1]);
                sec[seci++] = mat[8];
                sec[seci++] = mat[9];
                sec[seci++] = mat[10];
                sec[seci++] = mat[11];
                sec[seci++] = 1.0;
                if (seci == sec.length) break;
            }
        }
        gl.uniform1fv(section, sec);
        vd_IM(sec);
    };
    this.vd_nm = function(mode) {
        if (mode == 2) {
            vd_U.vd_hx(0, true);
            vd_U.vd_hx(1, true);
            vd_U.vd_hx(2, true);
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }
        gl.uniform1i(vd_js, mode);
    };
    this.vd_hx = function(vd_sZ, vd_CY) {
        if (vd_sZ == undefined) vd_sZ = vd_aT;
        var vd_Jw = vd_aT;
        vd_aT = vd_sZ;
        var size = vdcanvas.vd_Bu();
        if (vd_CY) size = 1;
        if ((vd_aT === 0 && vd_hI >= size) || (vd_aT === 1 && vd_hB >= size) || (vd_aT === 2 && vd_hb >= size)) {
            var vd_ly = gl.DYNAMIC_DRAW;
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_fM);
            gl.bufferData(gl.ARRAY_BUFFER, vd_U.vd_ye, vd_ly);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_ga);
            gl.bufferData(gl.ARRAY_BUFFER, vd_U.vd_CK, vd_ly);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_mW);
            gl.bufferData(gl.ARRAY_BUFFER, vd_U.vd_Cr, vd_ly);
            gl.bindBuffer(gl.ARRAY_BUFFER, vd_nS);
            gl.bufferData(gl.ARRAY_BUFFER, vd_U.vd_CB, vd_ly);
            if (vd_gj()) {
                vd_r.gl.bindBuffer(vd_r.gl.ARRAY_BUFFER, vd_r.vd_fM);
                vd_r.gl.bufferData(vd_r.gl.ARRAY_BUFFER, vd_U.vd_ye, vd_ly);
                vd_r.gl.bindBuffer(vd_r.gl.ARRAY_BUFFER, vd_r.vd_ga);
                vd_r.gl.bufferData(vd_r.gl.ARRAY_BUFFER, vd_U.vd_DZ, vd_ly);
            }
            if (vd_aT === 0) gl.drawArrays(gl.TRIANGLES, 0, vd_hI * 3);
            else {
                gl.uniform1i(textureprops, 0);
                if (vd_aT === 2) gl.drawArrays(gl.vd_Iw, 0, vd_hb);
                else gl.drawArrays(gl.LINES, 0, vd_hB * 2);
                if (render.vd_Y.vd_fa) gl.uniform1i(textureprops, 1);
            }
            if (vd_gj()) {
                if (vd_aT === 0) vd_r.gl.drawArrays(vd_r.gl.TRIANGLES, 0, vd_hI * 3);
                else {
                    if (vd_aT === 2) vd_r.gl.drawArrays(vd_r.gl.vd_Iw, 0, vd_hb);
                    else vd_r.gl.drawArrays(vd_r.gl.LINES, 0, vd_hB * 2);
                }
            }
            if (vd_aT === 0) vd_hI = 0;
            if (vd_aT === 1) vd_hB = 0;
            if (vd_aT === 2) vd_hb = 0;
        }
        vd_aT = vd_Jw;
    };
    this.vd_Fw = function() {
        vd_fR = vdgeo.vd_ki(render.vd_KT(), vd_um);
    };
    function vd_LO(mat) {
        return new Array(mat[A00], mat[A10], mat[A20], mat[A30], mat[A01], mat[A11], mat[A21], mat[A31], mat[A02], mat[A12], mat[A22], mat[A32], mat[A03], mat[A13], mat[A23], mat[A33]);
    };
    this.vd_Di = function() {
        vdgeo.vd_fn(vd_um);
        var w = render.vd_Y.vd_ar;
        var h = render.vd_Y.vd_bx;
        if (vd_de.width < w || vd_de.height < h) {
            vd_jw = new Uint8Array(w * h * 4);
            vd_de.setAttribute("width", w);
            vd_de.setAttribute("height", h);
        }
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.viewport(render.vd_cO, render.vd_fG, render.width, render.height);
        vdgeo.vd_ay(vd_um, 1, -1, 1);
        gl.disable(gl.BLEND);
        vd_Hv();
        return true;
    };
    this.vd_Fk = function() {
        var vd_dz = render.vd_Br();
        gl.uniform4fv(vd_br, [vd_dz[0] / 255.0, vd_dz[1] / 255.0, vd_dz[2] / 255.0, 1.0]);
        gl.clearColor(vd_dz[0] / 255.0, vd_dz[1] / 255.0, vd_dz[2] / 255.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        vd_DP();
    };
    this.vd_ps = function() {
        if (vd_fi === 0) return;
        vd_U.vd_hx(0, true);
        vd_U.vd_hx(1, true);
        vd_U.vd_hx(2, true);
        gl.flush();
        var i, iy, ix;
        var vd_qI = render.vd_Y.vd_wm();
        var w1 = render.vd_Y.vd_ar;
        var h1 = render.vd_Y.vd_bx;
        gl.readPixels(0, 0, w1, h1, gl.RGBA, gl.UNSIGNED_BYTE, vd_jw);
        var left = render.clip[0];
        var top = render.clip[1];
        var right = Math.min(w1 - 1, render.clip[2]);
        var bottom = Math.min(h1 - 1, render.clip[3]);
        var w = right - left + 1;
        var h = bottom - top + 1;
        for (iy = top; iy <= bottom; iy++) {
            for (ix = left; ix <= right; ix++) {
                i = (iy * w1 + ix) * 4;
                vd_qI.data[i] = vd_jw[i];
                i++;
                vd_qI.data[i] = vd_jw[i];
                i++;
                vd_qI.data[i] = vd_jw[i];
                i++;
                vd_qI.data[i] = vd_jw[i];
                i++;
            }
        }
        vd_Eu();
        vd_hI = 0;
        vd_hB = 0;
        vd_hb = 0;
        vd_aT = 0;
        vd_fi = 0;
    };
    this.vd_Dm = function(vd_NR, vd_hL) {
        if (!vd_hL) {
            gl.bindTexture(gl.TEXTURE_2D, vd_eL['h_0']);
            gl.uniform1i(textureprops, 0);
        } else {
            var hid = 'h_' + vd_hL.HandleId.toString();
            var vd_dN = vd_eL[hid];
            if (!vd_dN) {
                vd_eL[hid] = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, vd_eL[hid]);
                var _w = vd_hL.width;
                var _h = vd_hL.height;
                var vd_EH = new Uint8Array(_w * _h * 4);
                var index = 0;
                for (var h = 0; h < vd_hL.height; h++) {
                    for (var w = 0; w < vd_hL.width * 4; w++) {
                        vd_EH[index] = vd_hL.bytes[h][w];
                        index++;
                    }
                    index = (h + 1) * _w * 4;
                }
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _w, _h, 0, gl.RGBA, gl.UNSIGNED_BYTE, vd_EH);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            } else {
                gl.bindTexture(gl.TEXTURE_2D, vd_dN);
            }
            gl.uniform1i(textureprops, 1);
        }
    };
    function vd_tw(vd_jC, vd_bj, pt) {
        vd_jC[vd_bj] = pt[X];
        vd_jC[vd_bj + 1] = pt[Y];
        vd_jC[vd_bj + 2] = pt[Z];
    };
    function vd_wt(pt, vd_jC, vd_bj) {
        vd_jC[vd_bj] = pt[X];
        vd_jC[vd_bj + 1] = pt[Y];
        vd_jC[vd_bj + 2] = pt[Z];
        vd_jC[vd_bj + 3] = pt[W];
    };
    function vd_tN(vd_bj, p1, p2, p3) {
        var vd_l = vd_U.vd_ye;
        vd_wt(p1, vd_l, vd_bj);
        if (p2) vd_wt(p2, vd_l, vd_bj + 4);
        if (p3) vd_wt(p3, vd_l, vd_bj + 8);
    };
    function vd_Dx(vd_bj, vd_bO, uv1, uv2, uv3) {
        if (render.vd_dR && render.vd_Y.vd_fa) {
            var vd_l = vd_U.vd_Cr;
            vd_tw(vd_l, vd_bj, uv1);
            vd_tw(vd_l, vd_bj + 4, uv2);
            if (uv3) vd_tw(vd_l, vd_bj + 8, uv3);
        }
    };
    function vd_tL(vd_K) {
        var vd_l = vd_U.vd_CB;
        vd_l[vd_K] = vd_ne;
        if (vd_aT < 2) vd_l[vd_K + 1] = vd_ne;
        if (vd_aT === 0) vd_l[vd_K + 2] = vd_ne;
    };
    function vd_tu(vd_K, c1, c2, c3) {
        var vd_l = vd_U.vd_CK;
        var r = 1,
        g = 1,
        b = 1,
        a = 1;
        a = render.vd_Y.Alpha / 255.0;
        if (vd_aT === 2) {
            r = render.vd_Y.vd_aX[0] / 255.0;
            g = render.vd_Y.vd_aX[1] / 255.0;
            b = render.vd_Y.vd_aX[2] / 255.0;
            vd_l[vd_K] = r;
            vd_l[vd_K + 1] = g;
            vd_l[vd_K + 2] = b;
            vd_l[vd_K + 3] = a;
        } else if (vd_aT === 1) {
            r = render.vd_Y.vd_aX[0] / 255.0;
            g = render.vd_Y.vd_aX[1] / 255.0;
            b = render.vd_Y.vd_aX[2] / 255.0;
            vd_l[vd_K + 4] = vd_l[vd_K] = r;
            vd_l[vd_K + 5] = vd_l[vd_K + 1] = g;
            vd_l[vd_K + 6] = vd_l[vd_K + 2] = b;
            vd_l[vd_K + 7] = vd_l[vd_K + 3] = a;
        } else {
            if (!render.vd_kQ) {
                if (!render.vd_Y.vd_fa || !render.vd_dR) {
                    r = render.vd_Y.vd_aX[0] / 255.0;
                    g = render.vd_Y.vd_aX[1] / 255.0;
                    b = render.vd_Y.vd_aX[2] / 255.0;
                }
                if (render.vd_ee) {
                    r *= render.vd_Y.vd_gs[0];
                    g *= render.vd_Y.vd_gs[1];
                    b *= render.vd_Y.vd_gs[2];
                }
                vd_l[vd_K + 4] = vd_l[vd_K + 8] = vd_l[vd_K] = r;
                vd_l[vd_K + 5] = vd_l[vd_K + 9] = vd_l[vd_K + 1] = g;
                vd_l[vd_K + 6] = vd_l[vd_K + 10] = vd_l[vd_K + 2] = b;
                vd_l[vd_K + 7] = vd_l[vd_K + 11] = vd_l[vd_K + 3] = a;
            } else {
                vd_l[vd_K] = c1[0] / 255.0;
                vd_l[vd_K + 1] = c1[1] / 255.0;
                vd_l[vd_K + 2] = c1[2] / 255.0;
                vd_l[vd_K + 3] = a;
                vd_l[vd_K + 4] = c2[0] / 255.0;
                vd_l[vd_K + 5] = c2[1] / 255.0;
                vd_l[vd_K + 6] = c2[2] / 255.0;
                vd_l[vd_K + 7] = a;
                vd_l[vd_K + 8] = c3[0] / 255.0;
                vd_l[vd_K + 9] = c3[1] / 255.0;
                vd_l[vd_K + 10] = c3[2] / 255.0;
                vd_l[vd_K + 11] = a;
            }
        }
        vd_Dd(vd_K);
    };
    var _p1 = [0, 0, 0, 0];
    var _p2 = [0, 0, 0, 0];
    var _p3 = [0, 0, 0, 0];
    var _p4 = [0, 0, 0, 0];
    var uv0 = [0.0, 0.0, 0.0];
    this.vd_nE = function(p1) {
        vdgeo.vd_fj(p1[X], p1[Y], p1[Z], vd_fR, _p1);
        vd_aT = 2;
        var vd_bj = vd_hb * 4;
        vd_tN(vd_bj, _p1);
        vd_tu(vd_bj);
        vd_tL(vd_hb * 1);
        vd_hb++;
        vd_U.vd_hx();
        vd_fi++;
    };
    this.vd_du = function(p1, p2) {
        vdgeo.vd_fj(p1[X], p1[Y], p1[Z], vd_fR, _p1);
        vdgeo.vd_fj(p2[X], p2[Y], p2[Z], vd_fR, _p2);
        vd_aT = 1;
        var vd_bj = vd_hB * 8;
        vd_tN(vd_bj, _p1, _p2);
        vd_tu(vd_bj);
        vd_tL(vd_hB * 2);
        vd_hB++;
        vd_U.vd_hx();
        vd_fi++;
    };
    function vd_nx(p1, p2, p3, vd_bO, uv1, uv2, uv3) {
        if (render.vd_uz(vd_bO)) {
            vd_aT = 0;
            var vd_bj = vd_hI * 12;
            vd_tN(vd_bj, p1, p2, p3);
            vd_tu(vd_bj, uv1, uv2, uv3);
            vd_tL(vd_hI * 3);
            vd_Dx(vd_bj, vd_bO, uv1, uv2, uv3);
            vd_hI++;
            vd_U.vd_hx();
            vd_fi++;
        }
    };
    this.vd_kN = function(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4) {
        vdgeo.vd_fj(p1[X], p1[Y], p1[Z], vd_fR, _p1);
        vdgeo.vd_fj(p2[X], p2[Y], p2[Z], vd_fR, _p2);
        vdgeo.vd_fj(p3[X], p3[Y], p3[Z], vd_fR, _p3);
        vd_nx(_p1, _p2, _p3, vd_bO, uv1, uv2, uv3);
        if (p4) {
            vdgeo.vd_fj(p4[X], p4[Y], p4[Z], vd_fR, _p4);
            vd_nx(_p3, _p4, _p1, vd_bO, uv3, uv4, uv1);
        }
    };
    this.vd_fB = function(pts, vd_bO, uvs, vd_eN) {
        if (pts.length > 255 || pts.length < 3) return;
        if (!vd_bO && pts.length > 2) vd_bO = vdgeo.vd_ES(pts[0], pts[1], pts[2]);
        if (!vd_bO) vd_bO = [0, 0, -1];
        var i = 0;
        var k = 0;
        if (pts.length > 3) {
            var vd_uX = gpc.vd_Ap(gpc.vd_DN([pts]));
            for (k = 0; k < vd_uX.length; k++) {
                var vd_gw = [];
                vd_gw.length = vd_uX.length;
                var vd_gX = vd_uX[k];
                for (i = 0; i < vd_gX.length; i++) {
                    var pt = vd_gX[i];
                    vd_gw[i] = uv0;
                    if (render.vd_gn && uvs) vd_gw[i] = vdgeo.vd_Z(render.vd_gn, pt);
                    vdgeo.vd_fj(pt[X], pt[Y], pt[Z], vd_fR, pt);
                }
                for (i = 0; i < vd_gX.length - 2; i++) {
                    if (i % 2 == 1) {
                        vd_nx(vd_gX[i + 2], vd_gX[i + 1], vd_gX[i], vd_bO, vd_gw[i + 2], vd_gw[i + 1], vd_gw[i]);
                    } else {
                        vd_nx(vd_gX[i], vd_gX[i + 1], vd_gX[i + 2], vd_bO, vd_gw[i], vd_gw[i + 1], vd_gw[i + 2]);
                    }
                }
            }
        } else {
            if (uvs) {
                vd_nx(pts[0], pts[1], pts[2], vd_bO, uvs[0], uvs[1], uvs[2]);
            } else {
                vd_nx(pts[0], pts[1], pts[2], vd_bO, uv0, uv0, uv0);
            }
        }
    };
    return this;
};
function vd_rF(vd_S, vd_Mh, vd_LT, vd_qp, vd_rG, vd_tK) {
    var vd_U = this;
    this.vd_bm = vd_S;
    this.vd_cF = function() {
        return vdConst.vd_nd;
    };
    this.vd_cO = vd_Mh;
    this.vd_fG = vd_LT;
    this.width = vd_qp;
    this.height = vd_rG;
    this.vd_aU = 10;
    this.vd_c = vdgeo.newpoint(0, 0, 0);
    this.vd_bD = vdgeo.vd_s();
    this.vd_cR = vdgeo.vd_s();
    this.vd_li = vdgeo.vd_s();
    this.vd_GQ = vdgeo.vd_s();
    this.vd_gu = vdgeo.vd_s();
    this.vd_qf = null;
    this.vd_bS = 1.0;
    this.GetPixelSize = function() {
        return vd_U.vd_bS;
    };
    this.vd_Y = new vd_JD(this, vd_tK);
    this.palette = null;
    this.vd_iC = 1.0;
    this.RenderMode = vdConst.vd_ta;
    this.vd_bu = true;
    this.vd_Cv = 60.0;
    this.vd_ba = false;
    this.vd_dR = true;
    this.vd_aG = true;
    this.vd_lS = false;
    this.vd_ee = true;
    this.vd_rq = true;
    this.vd_gk = vdgeo.newpoint(0, 0, -1);
    this.vd_eF = 0.25;
    this.vd_LR = 0.15;
    this.vd_lm = [1, 1, 1];
    this.vd_cQ = null;
    this.vd_nQ = function(vd_iM, vd_iX) {
        if (!vd_iM || !vd_iX) return 1.0;
        var size = vd_iM;
        if (size < 0) size /= -100.0;
        var scale = size * vd_U.vd_bS * (dpi / 25.4) / vd_iX;
        return scale;
    };
    this.vd_rQ = function(vd_iM, mat, vd_iX) {
        if (!vd_iM || !vd_iX) return;
        var scale = vd_U.vd_nQ(vd_iM, vd_iX);
        vdgeo.vd_ay(mat, scale, scale, 1.0);
    };
    this.vd_ux = function(from) {
        if (!from) return;
        vd_U.vd_ba = from.vd_ba;
        vd_U.vd_dR = from.vd_dR;
        vd_U.vd_aG = from.vd_aG;
        vd_U.vd_eF = from.vd_eF;
        vd_U.vd_lm = from.vd_lm;
        vd_U.vd_ee = from.vd_ee;
        vd_U.vd_rq = from.vd_rq;
        vdgeo.vd_cM(vd_U.vd_gk, from.vd_gk);
        vd_U.vd_cQ = from.vd_cQ;
        vd_U.RenderMode = from.RenderMode;
        vd_U.vd_bu = from.vd_bu;
        vd_U.vd_Y.vd_lP = from.vd_Y.vd_lP;
        vd_U.vd_lS = from.vd_lS;
    };
    var vd_td = vdgeo.newpoint(0, 0, -1);
    this.vd_AG = function(x, y, z, vd_KX, vd_fW, r, g, b) {
        vd_U.vd_rq = (vd_KX ? true: false);
        vd_U.vd_ee = true;
        if (vd_fW < 0) {
            vd_U.vd_ee = false;
            vd_U.vd_eF = 0;
        }
        if (vd_fW === 0) vd_U.vd_eF = 0.0;
        else if (vd_fW === 1) vd_U.vd_eF = 0.25;
        else if (vd_fW === 2) vd_U.vd_eF = 0.50;
        else if (vd_fW === 3) vd_U.vd_eF = 0.75;
        else if (vd_fW === 4) vd_U.vd_eF = 1.0;
        else vd_U.vd_eF = 0.25;
        vd_U.vd_eF += vd_U.vd_LR;
        vd_U.vd_gk[X] = x;
        vd_U.vd_gk[Y] = y;
        vd_U.vd_gk[Z] = z;
        vdgeo.vd_cq(vd_U.vd_gk);
        if (!r && r != 0) r = 255;
        if (!g && g != 0) g = 255;
        if (!b && b != 0) b = 255;
        r = Math.min(Math.max(r, 0), 255);
        g = Math.min(Math.max(g, 0), 255);
        b = Math.min(Math.max(b, 0), 255);
        vd_U.vd_lm = [r / 255, g / 255, b / 255];
    };
    function vd_IZ() {
        vd_U.vd_AG(0, 0, -1, true, 1, 255, 255, 255);
    };
    function vd_JR(vd_gF) {
        vd_IZ();
        if (!vd_gF || !vd_gF.Default) return;
        var vd_cd = null;
        if (vd_gF.Default && vd_gF.Default.Enable) vd_cd = vd_gF.Default;
        if (!vd_cd && vd_gF) {
            for (var i = 0; i < vd_gF.length; i++) {
                if (!vd_gF[i].Enable) continue;
                vd_cd = vd_cd[i];
                break;
            }
        }
        if (!vd_cd) return;
        vd_U.vd_AG(vd_cd.Direction[X], vd_cd.Direction[Y], vd_cd.Direction[Z], true, vd_cd.Intensity, vd_cd.color[0], vd_cd.color[1], vd_cd.color[2]);
        vd_U.vd_ee = vd_cd.Enable;
    };
    this.vd_cl = [];
    this.linetype = null;
    this.vd_le = 1.0;
    this.vd_aO = undefined;
    var vd_nw = null;
    var ShowHidenEdges = false;
    var vd_ak = [[vdgeo.vd_s(), vdgeo.vd_s(), vdgeo.vd_s()]];
    var vd_dz = [0, 0, 0, 255];
    var vd_fN = [255, 255, 255, 255];
    function vd_Jr(color) {
        return color == undefined || color == null || (color[0] === 0 && color[1] === 0 && color[2] === 0 && color[3] === 0);
    };
    this.vd_Br = function() {
        return vd_dz;
    };
    this.vd_kn = function() {
        return vd_fN;
    };
    this.vd_eU = function(index) {
        if (index === -1) return vd_dz;
        else if (index === 6) return vd_fN;
        else if (vd_U.palette) return vd_U.palette.Items[index].SystemColor;
    };
    this.vd_np = function(vd_hP, vd_br) {
        if (!vd_Jr(vd_br)) {
            vd_dz = vd_br;
            var vd_tJ = vdgdi.WHITE;
            if (vd_hP) vd_tJ = vd_hP.Items[6].SystemColor;
            var vd_tR = vdgdi.vd_sB(vd_dz);
            var vd_FK = vdgdi.vd_sB(vdgdi.WHITE);
            var vd_FQ = vdgdi.vd_sB(vdgdi.BLACK);
            var vd_Dj = vdgdi.vd_sB(vd_tJ);
            var vd_Gp = Math.abs(vd_tR - vd_FK);
            var vd_FZ = Math.abs(vd_tR - vd_FQ);
            var vd_EF = Math.abs(vd_tR - vd_Dj);
            if (vd_EF < vdgdi.vd_Ei) {
                vd_fN = ((vd_Gp > vd_FZ) ? vdgdi.WHITE: vdgdi.BLACK);
            } else {
                vd_fN = vd_tJ;
            }
        } else {
            if (vd_hP) {
                vd_dz = vd_hP.Background;
                vd_fN = vd_hP.Items[6].SystemColor;
            } else {
                vd_dz = vdgdi.BLACK;
                vd_fN = vdgdi.WHITE;
            }
        }
        vd_U.palette = vd_hP;
        vd_U.vd_aZ(vd_fN);
    };
    this.vd_aP = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    this.vd_tm = function() {
        return vd_U.vd_aU * vd_U.vd_uF();
    };
    this.vd_uF = function() {
        return (vd_U.width / vd_U.height);
    };
    this.vd_ot = function() {
        if (vd_U.vd_cl.length === 0) return null;
        return vd_U.vd_cl[vd_U.vd_cl.length - 1];
    };
    this.vd_ij = function(bval) {
        var ret = ShowHidenEdges;
        if (bval == undefined) bval = false;
        ShowHidenEdges = bval;
        return ret;
    };
    this.vd_mP = function(fig, index) {
        if (fig == null) {
            vd_U.vd_cl.pop();
        } else {
            vd_U.vd_cl.push(fig);
        }
        if (vd_U.vd_aG && vd_U.vd_dC()) {
            vd_U.vd_cV.vd_Km(fig, index);
        }
    };
    this.vd_wL = function(ltscale) {
        var ret = vd_U.vd_le;
        vd_U.vd_le = ltscale;
        return ret;
    };
    this.vd_wW = function(lt) {
        var ret = vd_U.linetype;
        if (lt !== undefined) {
            vd_U.linetype = lt;
        }
        return ret;
    };
    this.vd_dK = function(vd_mN) {
        var ret = vd_U.vd_Y.penwidth;
        if (vd_mN !== undefined) vd_U.vd_Y.vd_dK(vd_mN);
        return ret;
    };
    this.vd_wS = false;
    this.vd_nm = function(mode) {
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_nm(mode);
        }
        vd_pu = mode;
        vd_U.vd_wS = false;
    };
    var vd_pu = 3;
    this.vd_aZ = function(color) {
        var ret = vd_U.vd_Y.vd_aX;
        if (color !== undefined) vd_U.vd_Y.vd_aZ(color);
        return ret;
    };
    this.vd_ho = function(vd_dN) {
        if (!vd_U.vd_dR) return null;
        var ret = vd_U.vd_Y.vd_fa;
        if (ret === vd_dN) return ret;
        vd_U.vd_Y.vd_ho(vd_dN);
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_hx(0, true);
            vd_U.vd_cV.vd_Dm(ret, vd_dN);
        }
        return ret;
    };
    this.vd_gn = null;
    this.vd_eq = function(vd_mB) {
        var ret = vd_U.vd_gn;
        if (vd_mB !== 0) vd_U.vd_gn = vd_mB;
        return ret;
    };
    this.vd_wB = function(vd_ws) {
        var ret = vd_U.vd_Y.vd_wZ;
        if (vd_ws !== undefined) vd_U.vd_Y.vd_wZ = vd_ws;
        return ret;
    };
    var vd_vG = 1.0;
    var vd_FT = 1.0;
    function vd_BR() {
        vd_vG = vd_xw(1, 0, 0);
        vd_FT = vd_xw(0, 1, 0);
        if (vd_U.vd_dC()) vd_U.vd_cV.vd_Fw();
    };
    this.vd_bf = function(mat) {
        var m = vd_U.vd_aS();
        vd_ak.push([null, null, null]);
        vd_U.vd_mC(vdgeo.vd_ki(mat, m));
    };
    this.vd_bg = function() {
        vd_ak.pop();
        vd_BR();
    };
    this.vd_aS = function() {
        return vd_ak[vd_ak.length - 1][0];
    };
    this.vd_KT = function() {
        return vd_ak[vd_ak.length - 1][2];
    };
    this.vd_fp = function() {
        return vd_ak[vd_ak.length - 1][1];
    };
    function vd_Gn() {
        var fig = vd_U.vd_ot();
        if (fig == null || fig._t !== vdConst.vdText_code) return 1.0;
        return fig.Height / fig.StyleRef.FontFileVDS.Ascent;
    };
    var vd_pH = vdgeo.newpoint(0, 0, 1);
    function vd_yb() {
        vd_U.vd_Y.vd_gs = [1.0, 1.0, 1.0];
    };
    this.vd_uz = function(normal) {
        if (vd_U.vd_bu && vd_U.RenderMode === vdConst.vd_ta) {
            if (!normal) vd_pH = vdgeo.vd_ip(vd_U.vd_aS());
            else vdgeo.vd_me(vd_U.vd_aS(), normal[X], normal[Y], normal[Z], vd_pH, true);
            if (!vd_U.vd_ba && vdgeo.AreEqual(vd_pH[Z], 0.0, vdgeo.DefaultVectorEquality)) return false;
            if (vd_U.vd_ba || (vd_U.vd_ee && vd_td[Z] < 0)) {
                var vd_sr = Math.abs(vdgeo.vd_el(vd_td, vd_pH));
                vd_U.vd_Y.vd_gs[0] = vd_U.vd_lm[0] * vd_sr + vd_U.vd_eF;
                vd_U.vd_Y.vd_gs[1] = vd_U.vd_lm[1] * vd_sr + vd_U.vd_eF;
                vd_U.vd_Y.vd_gs[2] = vd_U.vd_lm[2] * vd_sr + vd_U.vd_eF;
            }
        }
        return true;
    };
    this.vd_mC = function(mat) {
        vd_ak[vd_ak.length - 1][0] = mat;
        vd_ak[vd_ak.length - 1][1] = vdgeo.vd_ki(mat, vd_U.vd_cR);
        vd_ak[vd_ak.length - 1][2] = vdgeo.vd_ki(mat, vd_U.vd_gu);
        vd_BR();
    };
    this.vd_mR = function(x, y, z) {
        if (z === undefined) z = 1.0;
        var vd_cL = vdgeo.vd_as(x, y, z, vd_U.vd_bD);
        var vd_mi = vdgeo.vd_bo(vd_U.vd_aS());
        var vd_gD = vdgeo.vd_Z(vd_mi, vd_cL);
        if (!vd_U.vd_ba && vdgeo.AreEqual(z, 1.0, vdgeo.vd_AI)) {
            var elevation = 0.0;
            var v = vdgeo.vd_ip(vd_mi);
            if (!vdgeo.AreEqual(v[Z], 0.0, vdgeo.DefaultLinearEquality)) {
                var ar1 = (elevation - vd_gD[Z]) / v[Z];
                vd_gD[X] += ar1 * v[X];
                vd_gD[Y] += ar1 * v[Y];
                vd_gD[Z] = elevation;
            }
        }
        return vd_gD;
    };
    this.clip = [vd_U.vd_cO, vd_U.vd_fG, vd_U.vd_cO + vd_U.width - 1, vd_U.vd_fG + vd_U.height - 1];
    this.vd_KQ = function() {
        vd_U.clip = [vd_U.vd_cO, vd_U.vd_fG, vd_U.vd_cO + vd_U.width - 1, vd_U.vd_fG + vd_U.height - 1];
        vd_U.vd_ry();
    };
    this.vd_Ar = function(left, top, right, bottom) {
        vd_U.clip = [Math.max(left, vd_U.vd_cO), Math.max(top, vd_U.vd_fG), Math.min(right, vd_U.vd_cO + vd_U.width - 1), Math.min(bottom, vd_U.vd_fG + vd_U.height - 1)];
        vd_U.vd_ry();
    };
    this.vd_ry = function() {
        var vd_aa = vdgeo.newpoint(0, 0, 0);
        var vd_bs = vdgeo.newpoint(0, 0, 0);
        if (vd_U.clip == null) vd_U.clip = [vd_U.vd_cO, vd_U.vd_fG, vd_U.vd_cO + vd_U.width - 1, vd_U.vd_fG + vd_U.height - 1];
        if (vd_U.vd_ba) {
            var _ul = vdgeo.vd_as(vd_U.clip[0], vd_U.clip[1], 1, vd_U.vd_bD);
            var _ur = vdgeo.vd_as(vd_U.clip[2], vd_U.clip[1], 1, vd_U.vd_bD);
            var _lr = vdgeo.vd_as(vd_U.clip[2], vd_U.clip[3], 1, vd_U.vd_bD);
            var _ll = vdgeo.vd_as(vd_U.clip[0], vd_U.clip[3], 1, vd_U.vd_bD);
            vd_U.vd_aP.left = _ll[X];
            vd_U.vd_aP.bottom = _ll[Y];
            vd_U.vd_aP.right = _ur[X];
            vd_U.vd_aP.top = _ur[Y];
        } else {
            vdgeo.vd_zH(vd_U.vd_bD, vd_U.clip[0], vd_U.clip[3], vd_aa);
            vdgeo.vd_zH(vd_U.vd_bD, vd_U.clip[2], vd_U.clip[1], vd_bs);
            vd_U.vd_aP.left = vd_aa[X];
            vd_U.vd_aP.bottom = vd_aa[Y];
            vd_U.vd_aP.right = vd_bs[X];
            vd_U.vd_aP.top = vd_bs[Y];
        }
    };
    this.vd_KF = function(x, y) {
        return vdgeo.vd_pb(x, y, vd_U.vd_aP.left, vd_U.vd_aP.bottom, vd_U.vd_aP.right, vd_U.vd_aP.top);
    };
    this.vd_Bl = function(px, py) {
        return vdgeo.vd_pb(px, py, vd_U.clip[0], vd_U.clip[1], vd_U.clip[2], vd_U.clip[3]);
    };
    var vd_bB = vdgeo.newpoint(0, 0, 0);
    var vd_dd = vdgeo.newpoint(0, 0, 0);
    var __P1 = vdgeo.newpoint(0, 0, 0);
    var __P2 = vdgeo.newpoint(0, 0, 0);
    var vd_er = vdgeo.newpoint(0, 0, 0);
    var vd_ca = vdgeo.newpoint(0, 0, 0);
    this.vd_Do = function(p1, p2, vd_A, vd_a) {
        if (vd_U.vd_ba) {
            vdgeo.vd_fj(p1[X], p1[Y], p1[Z], vd_U.vd_cR, p1);
            vdgeo.vd_fj(p2[X], p2[Y], p2[Z], vd_U.vd_cR, p2);
            var ret = vd_uS(p1, p2, vd_A, vd_a);
            return ret !== 1;
        } else {
            return vdgeo.vd_Be(vd_U.vd_aP.left, vd_U.vd_aP.bottom, vd_U.vd_aP.right, vd_U.vd_aP.top, p1, p2, vd_A, vd_a) !== 1;
        }
    };
    function vd_Ck(p1, p2, vd_A, vd_a) {
        return vdgeo.vd_Be(vd_U.clip[0], vd_U.clip[1], vd_U.clip[2], vd_U.clip[3], p1, p2, vd_A, vd_a);
    };
    function vd_BE(p1, p2, vd_A, vd_a) {
        return vdgeo.vd_Eg(vd_U.clip[0], vd_U.clip[1], vd_U.clip[2], vd_U.clip[3], p1, p2, vd_A, vd_a);
    };
    function vd_uS(p1, p2, vd_A, vd_a) {
        if (!vdgeo.vd_HG(p1, p2)) return 1;
        return vdgeo.vd_Eg(vd_U.clip[0], vd_U.clip[1], vd_U.clip[2], vd_U.clip[3], p1, p2, vd_A, vd_a);
    };
    var vd_eR = vd_BE;
    function vd_wu(pts, uvs, vd_eN) {
        vd_U.vd_Y.vd_ds(pts);
    };
    function vd_jo(pts, uvs, vd_eN) {
        vd_U.vd_Y.vd_Eo(pts, uvs, vd_eN);
    };
    function vd_Ga(pts, uvs, vd_eN) {
        var ret = vdgeo.vd_GZ(pts, uvs);
        vd_jo(ret[0], ret[1], vd_eN);
    };
    function vd_GH(pts, uvs, vd_lJ) {
        vd_U.vd_Y.vd_lu(pts);
    };
    function vd_sx(pts, uvs, vd_lJ) {
        vd_U.vd_Y.vd_Dg(pts, uvs, vd_lJ);
    };
    function vd_AP(x1, y1, x2, y2, z1, z2) {
        vd_U.vd_Y.vd_Fm(x1, y1, x2, y2);
    };
    function vd_Av(x1, y1, x2, y2, z1, z2) {
        vd_U.vd_Y.vd_Gv(x1, y1, x2, y2, z1, z2);
    };
    var vd_ib = vd_Av;
    function vd_yi() {
        if (vd_pu === 3) return true;
        else if (vd_pu === 1 && vd_U.vd_Y.Alpha === 255) return true;
        else if (vd_pu === 2 && vd_U.vd_Y.Alpha !== 255) return true;
        vd_U.vd_wS = true;
        return false;
    };
    function vd_vE() {
        return true;
    };
    var vd_fm = vd_yi;
    this.vd_rh = function() {
        vd_U.vd_cV.vd_rh();
    };
    this.destroy = function() {
        vd_U.vd_rh();
    };
    Object.defineProperty(vd_U, 'vd_cV', {
        get: function() {
            return vd_U.vd_bm.vd_cV;
        }
    });
    this.vd_dC = function() {
        return (vd_S.vd_eW && !vd_eM && vd_U.vd_bu && vd_U.vd_cV.vd_Lg());
    };
    this.vd_ps = function() {
        if (!vd_U.vd_dC()) return false;
        vd_U.vd_cV.vd_ps();
        return true;
    };
    function vd_kN(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4) {
        if (!vd_fm()) return;
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_kN(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4);
            return;
        }
        if (p4) {
            vd_U.vd_fB([p1, p2, p3, p4], vd_bO, [uv1, uv2, uv3, uv4], true);
        } else {
            vd_U.vd_fB([p1, p2, p3], vd_bO, [uv1, uv2, uv3], true);
        }
    };
    function vd_DK(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4) {
        if (!vd_fm()) return;
        if (vd_nw !== null) {
            vd_U.vd_aO = vd_nw * 5;
            if (vd_es) vd_dI(p1, p2);
            vd_U.vd_aO++;
            if (vd_en) vd_dI(p2, p3);
            vd_U.vd_aO++;
            if (vd_fI) vd_dI(p3, p4 ? p4: p1);
            vd_U.vd_aO++;
            if (vd_ed && p4) vd_dI(p4, p1);
        } else {
            if (vd_es) vd_dI(p1, p2);
            if (vd_en) vd_dI(p2, p3);
            if (vd_fI) vd_dI(p3, p4 ? p4: p1);
            if (vd_ed && p4) vd_dI(p4, p1);
        }
        vd_U.vd_aO = undefined;
    };
    var vd_hc = vd_kN;
    function vd_yR(x, y, z, vd_bQ) {
        vdgeo.vd_HC(vd_U.vd_fp(), x, y, z, vd_bQ);
    };
    function vd_xF(x, y, z, vd_bQ) {
        vdgeo.vd_sy(vd_U.vd_fp(), x, y, z, vd_bQ);
    };
    function vd_ys(x, y, z, vd_bQ) {
        vdgeo.vd_fj(x, y, z, vd_U.vd_fp(), vd_bQ);
    };
    function vd_kS(vd_b, vd_bQ) {
        vd_io(vd_b[X], vd_b[Y], vd_b[Z], vd_bQ);
    };
    function vd_HA(vd_b) {
        var vd_bQ = vdgeo.newpoint(0, 0, 0);
        vd_kS(vd_b, vd_bQ);
        return vd_bQ;
    };
    function vd_Ig(pts) {
        var ret = [];
        ret.length = pts.length;
        for (var i = 0; i < pts.length; i++) {
            ret[i] = vd_HA(pts[i]);
        }
        return ret;
    };
    var vd_ds = vd_jo;
    var vd_lu = vd_sx;
    var vd_io = vd_xF;
    this.vd_nB = function() {
        return vd_eM;
    };
    function vd_xl(pts, closed) {
        var sp = pts[0];
        var ret;
        for (var i = 1; i < pts.length; i++) {
            var ep = pts[i];
            ret = vd_eR(sp, ep, vd_bB, vd_dd);
            if (ret !== 1) vd_ib(vd_bB[X], vd_bB[Y], vd_dd[X], vd_dd[Y], vd_bB[Z], vd_dd[Z]);
            sp = ep;
        }
        if (closed) {
            ret = vd_eR(sp, pts[0], vd_bB, vd_dd);
            if (ret === 1) return;
            vd_ib(vd_bB[X], vd_bB[Y], vd_dd[X], vd_dd[Y], vd_bB[Z], vd_dd[Z]);
        }
    };
    function vd_NF(pts, uvs, vd_eN) {
        vd_xl(pts, true);
    };
    function vd_FB(pts, uvs, vd_lJ) {
        for (var i = 0; i < pts.length; i++) {
            vd_xl(pts[i], true);
        }
    };
    var vd_eM = false;
    this.vd_pr = function(vd_IA) {
        if (vd_eM) return;
        vd_eM = true;
        if (!vd_U.vd_ba) {
            vd_eR = vd_Ck;
            vd_io = vd_yR;
        }
        vd_lu = vd_FB;
        vd_ib = vd_AP;
        vd_fm = vd_vE;
        vd_hc = vd_kN;
        vd_U.vd_Y.vd_AB(true, vd_IA);
    };
    this.vd_nf = function() {
        if (!vd_eM) return;
        vd_U.vd_Y.vd_AB(false);
        vd_eM = false;
        vd_U.vd_ew();
    };
    this.vd_ew = function() {
        if (vd_U.vd_bu || vd_U.vd_cQ) {
            vd_eR = vd_BE;
            vd_io = vd_xF;
            vd_ds = vd_jo;
            vd_lu = vd_sx;
            vd_ib = vd_Av;
            vd_fm = vd_U.vd_bu ? vd_yi: vd_vE;
            if (vd_U.vd_ba) {
                vd_io = vd_ys;
                vd_eR = vd_uS;
                vd_ds = vd_Ga;
            }
        } else {
            if (vd_U.vd_ba) {
                vd_io = vd_ys;
                vd_eR = vd_uS;
            } else {
                vd_eR = vd_Ck;
                vd_io = vd_yR;
            }
            vd_ds = vd_wu;
            vd_lu = vd_GH;
            vd_ib = vd_AP;
            vd_fm = vd_vE;
        }
        if (vd_U.RenderMode === vdConst.vd_ta) vd_hc = vd_kN;
        else vd_hc = vd_DK;
        vd_U.vd_Y.vd_ew();
    };
    function vd_GV(vd_id) {
        vd_U.vd_cQ = null;
        if (!vd_id || !vd_id.Items) return;
        var k = 0;
        for (var i = 0; i < vd_id.Items.length; i++) {
            if (!vd_id.Items[i].Enable) continue;
            if (k >= vdConst.NUMSECTIONS) break;
            if (!vd_U.vd_cQ) vd_U.vd_cQ = [];
            vd_U.vd_cQ.push([vd_id.Items[i].OriginPoint, vd_id.Items[i].Direction]);
            k++;
        }
    };
    this.update = function(vd_oO, vd_gQ, vd_Hm, vd_vs, FocalLength, LensAngle, vd_Mv, vd_kt, vd_id, vd_gF) {
        if (vd_kt != -1) {
            vd_U.RenderMode = vdConst.vd_Bi;
            vd_U.vd_bu = false;
            vd_U.vd_dR = false;
            if (vd_kt && vd_kt > vdConst.RENDERMODE_WIRE_2d && vd_kt < vdConst.vd_KW) {
                vd_U.vd_bu = true;
                if (vd_kt === vdConst.RENDERMODE_RENDER) vd_U.vd_dR = true;
                if (vd_kt > vdConst.RENDERMODE_WIRE_3d) vd_U.RenderMode = vdConst.vd_ta;
            }
        }
        vd_U.vd_cV.vd_Dl(vd_U);
        if (!vd_oO) vd_oO = 10.0;
        if (!vd_gQ) vd_gQ = vdgeo.newpoint(0, 0, 0);
        if (!FocalLength) FocalLength = 0.05;
        if (!LensAngle) LensAngle = 60.0;
        vd_JR(vd_gF);
        vd_GV(vd_id);
        var vd_mu = vdgeo.vd_bY(vd_Hm);
        vd_U.vd_ba = false;
        vd_U.vd_ba = vd_Mv;
        if (vd_U.vd_ba) vd_U.vd_bu = true;
        if (vd_U.vd_ba) {
            vdgeo.vd_ae(vd_mu, -vd_gQ[X], -vd_gQ[Y], -vd_gQ[Z]);
            vdgeo.vd_ae(vd_mu, 0, 0, -FocalLength);
        }
        vd_U.vd_qf = null;
        var vd_ek = 10000.0;
        var zFar = -10000.0;
        if (vd_vs) {
            vd_U.vd_qf = vd_vs;
            var box = vdgeo.vd_qd(vd_mu, vd_vs);
            vd_ek = box[5];
            zFar = box[2];
        }
        var dz = Math.max(1.0, vd_ek - zFar) * 0.01;
        vd_ek += dz;
        zFar -= dz;
        vd_ek *= -1.0;
        zFar *= -1.0;
        vd_U.vd_Y.vd_Fb(vd_ek, zFar);
        vd_U.vd_aU = vd_oO;
        vd_U.vd_bS = vd_U.vd_aU / vd_U.height;
        vd_U.vd_bS = Math.max(vdgeo.vd_AI, (vd_U.vd_aU / vd_U.height));
        vd_U.vd_bS = Math.min(vdgeo.vd_Hf, vd_U.vd_bS);
        vd_U.vd_aU = vd_U.vd_bS * vd_U.height;
        vd_U.vd_c = vdgeo.newpoint(vd_gQ[X], vd_gQ[Y], vd_gQ[Z]);
        vdgeo.vd_fn(vd_U.vd_gu);
        vdgeo.vd_fn(vd_U.vd_cR);
        vdgeo.vd_fn(vd_U.vd_bD);
        vdgeo.vd_fn(vd_U.vd_li);
        vdgeo.vd_ay(vd_U.vd_li, vd_U.width * 0.5, vd_U.height * -0.5, 1);
        vdgeo.vd_ae(vd_U.vd_li, (vd_U.width * 0.5 + vd_U.vd_cO), (vd_U.height * 0.5 + vd_U.vd_fG), 0);
        vd_U.vd_GQ = vdgeo.vd_bo(vd_U.vd_li);
        var vd_hM = vd_U.width / vd_U.height;
        vd_U.vd_Cv = LensAngle;
        if (vd_U.vd_ba) vdgeo.vd_HK(vd_U.vd_gu, vd_hM, zFar, FocalLength, LensAngle);
        else vdgeo.vd_HJ(vd_U.vd_gu, vd_U.vd_c, vd_U.vd_aU, vd_hM, vd_ek, zFar);
        vdgeo.vd_qX(vd_U.vd_cR, vd_U.vd_gu);
        vdgeo.vd_fs(vd_U.vd_cR, vd_U.vd_li);
        vdgeo.vd_qX(vd_U.vd_bD, vd_U.vd_cR);
        vdgeo.vd_kW(vd_U.vd_bD);
        vd_U.vd_ry();
        if (vd_U.vd_ee) {
            if (!vd_U.vd_rq) {
                vdgeo.vd_me(vd_mu, vd_U.vd_gk[X], vd_U.vd_gk[Y], vd_U.vd_gk[Z], vd_td, true);
            }
        }
        if (vd_U.vd_dC()) vd_U.vd_cV.vd_Di();
        vd_U.vd_mC(vdgeo.vd_bY(vd_mu));
        if (vd_U.vd_cQ) {
            for (var i = 0; i < vd_U.vd_cQ.length; i++) {
                var section = vd_U.vd_cQ[i];
                var mat = vdgeo.vd_bo(vd_U.vd_fp());
                vdgeo.vd_ae(mat, -section[0][X], -section[0][Y], -section[0][Z]);
                vdgeo.vd_hN(mat, section[1]);
                section[2] = mat;
            }
        }
        if (vd_U.vd_dC()) vd_U.vd_cV.vd_HH();
        vd_U.vd_ew();
    };
    this.clear = function() {
        vd_U.vd_Y.clear(vd_dz);
        vd_U.vd_cl = [];
        vd_U.vd_aO = undefined;
        vd_nw = null;
        if (vd_U.vd_dC()) vd_U.vd_cV.vd_Fk();
    };
    function vd_dI(vd_hu, vd_ha) {
        if (!vd_fm()) return;
        if (!vd_AO()) {
            vd_vk(vd_hu, vd_ha, 0.0, true);
            return;
        }
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_du(vd_hu, vd_ha);
            return;
        }
        vd_kS(vd_hu, __P1);
        vd_kS(vd_ha, __P2);
        var ret = vd_eR(__P1, __P2, vd_bB, vd_dd);
        if (ret === 1) return;
        vd_ib(vd_bB[X], vd_bB[Y], vd_dd[X], vd_dd[Y], vd_bB[Z], vd_dd[Z]);
    };
    this.vd_du = function(vd_hu, vd_ha) {
        if (vd_U.vd_aO === undefined) vd_U.vd_aO = 0;
        vd_dI(vd_hu, vd_ha);
    };
    this.vd_fB = function(pts, vd_bO, uvs, vd_eN) {
        if (!vd_fm()) return;
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_fB(pts, vd_bO, uvs, vd_eN);
            return;
        }
        if (!vd_U.vd_uz(vd_bO)) return;
        var npts = vd_Ig(pts);
        vd_ds(npts, uvs, vd_eN);
        vd_yb();
    };
    this.vd_BC = function(vd_uV, direction, vd_CE) {
        if (!vd_fm()) return;
        if (vd_U.vd_bu) return;
        var v = vdgeo.newpoint(0, 0, 0);
        vdgeo.vd_me(vd_U.vd_aS(), direction[X], direction[Y], direction[Z], v, true);
        if (vdgeo.AreEqual(v[X], 0.0, vdgeo.DefaultLinearEquality) && vdgeo.AreEqual(v[Y], 0.0, vdgeo.DefaultLinearEquality)) {
            vd_U.vd_nE(vd_uV);
            return;
        } else {
            var pt1, pt2;
            var pt = vdgeo.vd_Z(vd_U.vd_aS(), vd_uV);
            var vd_fZ = (vdgeo.Distance2D(pt, vd_U.vd_c) + Math.sqrt(vd_U.vd_aU * vd_U.vd_aU + vd_U.vd_tm() * vd_U.vd_tm())) * 2.0;
            if (!vd_CE) {
                pt1 = vdgeo.newpoint(pt[X] + v[X] * -vd_fZ, pt[Y] + v[Y] * -vd_fZ, pt[Z] + v[Z] * -vd_fZ);
                pt2 = vdgeo.newpoint(pt[X] + v[X] * vd_fZ, pt[Y] + v[Y] * vd_fZ, pt[Z] + v[Z] * vd_fZ);
            } else {
                pt1 = pt;
                pt2 = vdgeo.newpoint(pt[X] + v[X] * vd_fZ, pt[Y] + v[Y] * vd_fZ, pt[Z] + v[Z] * vd_fZ);
            }
            vdgeo.vd_ei(vd_U.vd_cR, pt1, __P1);
            vdgeo.vd_ei(vd_U.vd_cR, pt2, __P2);
            var ret = vd_eR(__P1, __P2, vd_bB, vd_dd);
            if (ret === 1) return;
            vd_ib(vd_bB[X], vd_bB[Y], vd_dd[X], vd_dd[Y], vd_bB[Z], vd_dd[Z]);
        }
    };
    function vd_DW(pts, closed) {
        var sp = pts[0];
        for (var i = 1; i < pts.length; i++) {
            var ep = pts[i];
            vd_dI(sp, ep);
            sp = ep;
        }
        if (closed) vd_dI(sp, pts[0]);
    };
    this.vd_dQ = function(pts, closed) {
        if (!vd_fm()) return;
        if (pts.length < 2) return;
        if (!vd_AO()) {
            vd_JH(pts, closed, 0.0);
            return;
        }
        var sp = pts[0];
        for (var i = 1; i < pts.length; i++) {
            var ep = pts[i];
            vd_U.vd_aO = sp[INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = i - 1;
            vd_dI(sp, ep);
            sp = ep;
        }
        if (closed) {
            vd_U.vd_aO = pts[pts.length - 1][INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = pts.length - 1;
            vd_dI(pts[pts.length - 1], pts[0]);
        }
        vd_U.vd_aO = undefined;
    };
    this.vd_Gt = function(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4) {
        if (vd_U.vd_aO === undefined) vd_U.vd_aO = 0;
        vd_kN(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4);
    };
    this.vd_fl = function(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4) {
        if (vd_U.vd_aO === undefined) vd_U.vd_aO = 0;
        vd_hc(p1, p2, p3, p4, vd_es, vd_en, vd_fI, vd_ed, vd_bO, uv1, uv2, uv3, uv4);
    };
    function vd_ur(x, y, z) {
        var p1 = vdgeo.vd_rN(vd_U.vd_aS(), 0, 0, 0);
        p1 = vdgeo.vd_dU(p1, vd_U.vd_gu);
        var p2 = vdgeo.vd_rN(vd_U.vd_aS(), x, y, z);
        p2 = vdgeo.vd_dU(p2, vd_U.vd_gu);
        return vdgeo.Distance2D(p1, p2) * vd_U.vd_aU;
    };
    function vd_xw(x, y, z) {
        var v = vdgeo.newpoint(0, 0, 0);
        vdgeo.vd_me(vd_U.vd_aS(), x, y, z, v, false);
        return vdgeo.vd_ld(v);
    };
    function vd_yG(shape, offsetX, offsetY, vd_Ju, vd_dG) {
        var p1 = vdgeo.newpoint(0, 0, 0);
        var p2 = vdgeo.newpoint(0, 0, 0);
        if (shape == null) {
            if (vd_dG == null) return;
            var w = vd_dG.Ascent * 0.5;
            var lw = w * 0.25;
            vd_DW([vdgeo.newpoint(offsetX + lw, offsetY, 0), vdgeo.newpoint(offsetX + w - lw, offsetY, 0), vdgeo.newpoint(offsetX + w - lw, offsetY + vd_dG.Ascent, 0), vdgeo.newpoint(offsetX + lw, offsetY + vd_dG.Ascent, 0)], true);
        } else {
            var vd_sl = [];
            var vd_qb = null;
            var vd_lJ = vd_Gn();
            if (vd_U.vd_gn) vd_qb = [];
            if (shape.Segments !== undefined) {
                for (var k = 0; k < shape.Segments.Items.length; k++) {
                    var vd_Fl = (shape.Segments.Items[k].Flag === 1);
                    var pts = shape.Segments.Items[k].Points.Items;
                    if (vd_Fl) {
                        if (shape.Segments.Items[k].vd_zt == undefined) shape.Segments.Items[k].vd_zt = vdgeo.vd_Mn(8, pts);
                        pts = shape.Segments.Items[k].vd_zt;
                    }
                    if (vd_U.vd_dC()) {
                        p1[X] = pts[0][X] + offsetX;
                        p1[Y] = pts[0][Y] + offsetY;
                        p1[Z] = 0.0;
                        for (var jj = 1; jj < pts.length; jj++) {
                            vdgeo.vd_cM(p2, pts[jj]);
                            p2[X] = pts[jj][X] + offsetX;
                            p2[Y] = pts[jj][Y] + offsetY;
                            p2[Z] = 0.0;
                            vd_U.vd_cV.vd_du(p1, p2);
                            p1[X] = p2[X];
                            p1[Y] = p2[Y];
                            p1[Z] = p2[Z];
                        }
                    } else {
                        var _pts = [];
                        if (vd_qb) vd_qb.push(pts);
                        for (var j = 0; j < pts.length; j++) {
                            vd_io(pts[j][X] + offsetX, pts[j][Y] + offsetY, 0, __P2);
                            var npt = vdgeo.newpoint(__P2[X], __P2[Y], __P2[Z]);
                            npt[W] = __P2[W];
                            _pts.push(npt);
                        }
                        vd_sl.push(_pts);
                    }
                }
                if (vd_U.vd_dC()) return;
            }
            if (vd_Ju && !vd_U.vd_ba) {
                vd_lu(vd_sl, vd_qb, vd_lJ);
            } else {
                for (var kk = 0; kk < vd_sl.length; kk++) {
                    var pts2 = vd_sl[kk];
                    vdgeo.vd_cM(p1, pts2[0]);
                    for (var jj = 1; jj < pts2.length; jj++) {
                        vdgeo.vd_cM(p2, pts2[jj]);
                        var vd_EJ = vd_eR(p1, p2, vd_bB, vd_dd);
                        if (vd_EJ !== 1) {
                            vd_ib(vd_bB[X], vd_bB[Y], vd_dd[X], vd_dd[Y], vd_bB[Z], vd_dd[Z]);
                        }
                        vdgeo.vd_cM(p1, pts2[jj]);
                    }
                }
            }
        }
    };
    function vd_JC(vd_hg, vd_jS, vd_dG) {
        var p1 = [0, 0, 0];
        var p2 = [vd_hg, 0, 0];
        vd_kS(p1, __P1);
        vd_kS(p2, __P2);
        var ret = vd_eR(__P1, __P2, vd_bB, vd_dd);
        return ret !== 1;
    };
    this.vd_ue = function(vd_be, vd_hg, vd_jS, vd_dG) {
        if (!vd_be) return;
        if (!vd_fm()) return;
        if (!vd_U.vd_uz(null)) return;
        if (vd_eM) {
            vd_U.vd_dQ([[0, 0, 0], [vd_hg, 0, 0], [vd_hg, vd_jS, 0], [0, vd_jS, 0]], true);
            return;
        }
        vd_U.vd_aO = 0;
        if (vd_JC(vd_hg, vd_jS, vd_dG)) {
            var vd_mj = vd_ur(0, vd_jS, 0);
            var vd_qy = vd_mj / (dpi * vd_U.vd_bS);
            if (vd_qy < vd_Ja) {
                var p0 = vdgeo.newpoint(0, 0, 0);
                var p1 = vdgeo.newpoint(vd_hg, 0, 0);
                var sw = vd_U.vd_dK(vd_qy * dpi);
                vd_dI(p0, p1);
                vd_U.vd_dK(sw);
            } else {
                var offsetX = 0;
                var offsetY = 0;
                for (var c = 0; c < vd_be.length; c++) {
                    var pos = vd_be.charCodeAt(c);
                    if (pos === 10 || pos === 13) continue;
                    var vd_gJ = vd_dG.Shapes['h_' + pos.toString()];
                    var shape = null;
                    if (vd_gJ !== undefined) shape = vd_dG.Shapes.Items[vd_gJ];
                    if (pos != 32) {
                        vd_yG(shape, offsetX, offsetY, vd_dG.FontType, vd_dG);
                    }
                    if (shape != null) {
                        offsetX += shape.AdvanceX;
                        offsetY += shape.AdvanceY;
                    } else {
                        offsetX += vd_dG.Ascent * 0.5;
                    }
                }
            }
        }
        vd_yb();
        vd_U.vd_aO = undefined;
    };
    this.vd_pV = function(vd_q, vd_uk, vd_wv, vd_qa) {
        if (vd_U.vd_Y.vd_lP == vdConst.InterpolationMode_Nearest && !vd_U.vd_bu && !vd_eM && !vd_U.vd_dC()) {
            vd_U.vd_Y.vd_pV(vd_q, vd_uk, vd_U.vd_fp(), vd_qa / vd_q.height);
        } else {
            var pts = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(vd_wv, 0, 0), vdgeo.newpoint(vd_wv, vd_qa, 0), vdgeo.newpoint(0, vd_qa, 0)];
            var vd_bO = vdgeo.newpoint(0, 0, 1);
            var uvs = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(1, 0, 0), vdgeo.newpoint(1, 1, 0), vdgeo.newpoint(0, 1, 0)];
            var vd_fC = vd_U.vd_eq(vdgeo.vd_AA(0, 0, vd_wv, vd_qa));
            vd_U.vd_oL(pts, vd_bO, uvs, vd_q, true);
            vd_U.vd_eq(vd_fC);
        }
    };
    this.vd_nE = function(pt) {
        if (!vd_fm()) return;
        if (vd_U.vd_dC()) {
            vd_U.vd_cV.vd_nE(pt);
            return;
        }
        vd_kS(pt, __P1);
        if (vdgeo.vd_pb(__P1[X], __P1[Y], vd_U.clip[0], vd_U.clip[1], vd_U.clip[2], vd_U.clip[3])) vd_U.vd_Y.vd_GD(__P1[X], __P1[Y], __P1[Z]);
    };
    var vd_dg = vdgeo.newpoint(0, 0, 0);
    var vd_dl = vdgeo.newpoint(0, 0, 0);
    var _tm = vdgeo.vd_s();
    var vd_zW = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0)];
    this.vd_jB = function(pts, thickness, closed) {
        if (!vd_fm()) return;
        if (pts.length < 2) return;
        if (thickness == 0.0 || thickness == undefined) {
            vd_U.vd_dQ(pts, closed);
            return;
        }
        var offset = 0;
        var normal = vdgeo.newpoint(0, 0, 0);
        var ang, vd_Le, npts;
        npts = pts;
        var uvs = null;
        for (var i = 0; i < npts.length - 1; i++) {
            vd_dg[X] = npts[i][X];
            vd_dg[Y] = npts[i][Y];
            vd_dg[Z] = npts[i][Z] + thickness;
            vd_dl[X] = npts[i + 1][X];
            vd_dl[Y] = npts[i + 1][Y];
            vd_dl[Z] = npts[i + 1][Z] + thickness;
            ang = vdgeo.GetAngle(npts[i], npts[i + 1]) + vdgeo.HALF_PI;
            normal[X] = Math.cos(ang);
            normal[Y] = Math.sin(ang);
            normal[Z] = 0;
            var dist = vdgeo.Distance3D(npts[i], npts[i + 1]);
            if (vd_U.vd_gn) {
                uvs = vdgeo.vd_hz(vd_U.vd_gn, [vdgeo.newpoint( - offset, 0, 0), vdgeo.newpoint( - (offset + dist), 0, 0), vdgeo.newpoint( - (offset + dist), thickness, 0), vdgeo.newpoint( - offset, thickness, 0)]);
            } else {
                uvs = vd_zW;
            }
            vd_U.vd_aO = npts[i][INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = i;
            vd_hc(npts[i], npts[i + 1], vd_dl, vd_dg, true, (i === 0 || !closed && i === npts.length - 2), true, true, normal, uvs[0], uvs[1], uvs[2], uvs[3]);
            offset += dist;
        }
        if (closed) {
            var vd_fk = npts.length - 1;
            vd_dg[X] = npts[vd_fk][X];
            vd_dg[Y] = npts[vd_fk][Y];
            vd_dg[Z] = npts[vd_fk][Z] + thickness;
            vd_dl[X] = npts[0][X];
            vd_dl[Y] = npts[0][Y];
            vd_dl[Z] = npts[0][Z] + thickness;
            ang = vdgeo.GetAngle(npts[vd_fk], npts[0]) + vdgeo.HALF_PI;
            normal[X] = Math.cos(ang);
            normal[Y] = Math.sin(ang);
            normal[Z] = 0;
            if (vd_U.vd_gn) {
                uvs = vdgeo.vd_hz(vd_U.vd_gn, [vdgeo.newpoint( - offset, 0, 0), vdgeo.newpoint( - (offset + dist), 0, 0), vdgeo.newpoint( - (offset + dist), thickness, 0), vdgeo.newpoint( - offset, thickness, 0)]);
            } else {
                uvs = vd_zW;
            }
            vd_U.vd_aO = npts[vd_fk][INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = vd_fk;
            vd_hc(npts[vd_fk], npts[0], vd_dl, vd_dg, true, false, true, true, normal, uvs[0], uvs[1], uvs[2], uvs[3]);
        }
        vd_U.vd_aO = undefined;
    };
    function vd_LP(pts) {
        var vd_W = pts[0][Y];
        var vd_e = pts[0][Y];
        for (var i = 0; i < pts.length; i++) {
            var tmp = pts[i];
            if (tmp[Y] < vd_W) vd_W = tmp[Y];
            if (tmp[Y] > vd_e) vd_e = tmp[Y];
        }
        return [vd_W, vd_e];
    };
    function vd_FY(pts, dy) {
        var points = [];
        var _dy = 0.0,
        _dx = 0.0,
        _dya = 0.0;
        var p1, p2, tmp = null;
        p1 = pts[0];
        for (var i = 1; i < pts.length; i++) {
            p2 = pts[i];
            _dya = p2[Y] - p1[Y];
            if (_dya == 0.0 || (dy > p1[Y] && dy > p2[Y]) || (dy < p1[Y] && dy < p2[Y])) {
                p1 = p2;
                continue;
            }
            if (vdgeo.AreEqual(dy, p1[Y], vdgeo.DefaultPointEquality)) {
                tmp = vdgeo.newpoint(p1[X], p1[Y], p1[Z]);
                points.push(tmp);
                p1 = p2;
                continue;
            }
            _dy = dy - p1[Y];
            _dx = _dy * (p2[X] - p1[X]) / _dya;
            tmp = vdgeo.newpoint(p1[X] + _dx, p1[Y] + _dy, p1[Z]);
            points.push(tmp);
            p1 = p2;
        }
        return points;
    };
    function vd_Lf(vd_bv, _p1, _p2, vd_sv, scale) {
        if (vd_bv.Dashes == undefined || (vd_bv.Dashes.Items.length === 1 && vd_bv.Dashes.Items[0] < 0.0)) {
            vd_dI(_p1, _p2);
            return;
        }
        if (vd_bv.segmentlength == undefined) {
            vd_bv.segmentlength = 0;
            for (var i = 0; i < vd_bv.Dashes.Items.length; i++) {
                vd_bv.segmentlength += Math.abs(vd_bv.Dashes.Items[i] * scale);
            }
        }
        var vd_dn = vd_bv.segmentlength;
        var vd_bT;
        var vd_mj = vd_ur(vd_dn, 0, 0);
        if (vd_dn === 0 || vd_mj < vd_U.vd_bS * 2.0) {
            vd_dI(_p1, _p2);
            return;
        }
        vdgeo.vd_cM(vd_er, _p1);
        vd_bT = vd_sv;
        if (vd_bT < _p1[X]) vd_bT = _p1[X] - ((_p1[X] - vd_bT) % vd_dn);
        if (vd_bT > _p1[X]) vd_bT = _p1[X] + ((vd_bT - _p1[X]) % vd_dn) - vd_dn;
        while (vd_bT < _p2[X]) {
            for (var ii = 0; ii < vd_bv.Dashes.Items.length; ii++) {
                var dash = vd_bv.Dashes.Items[ii] * scale;
                vd_bT += Math.abs(dash);
                if (vd_bT < _p1[X]) continue;
                if (vd_bT > _p2[X]) vd_bT = _p2[X];
                if (dash > 0) {
                    vdgeo.vd_hS(vd_ca, vd_bT, _p1[Y], _p1[Z]);
                    vd_dI(vd_er, vd_ca);
                    vdgeo.vd_cM(vd_er, vd_ca);
                } else if (dash === 0) {
                    vdgeo.vd_hS(vd_ca, vd_bT, _p1[Y], _p1[Z]);
                    vd_U.vd_nE(vd_ca);
                } else {
                    vdgeo.vd_hS(vd_er, vd_bT, _p1[Y], _p1[Z]);
                }
                if (vd_bT >= _p2[X]) break;
            }
        }
    };
    function vd_LA(pts, vd_bv) {
        var vd_qQ = vd_C.IsDpi === false ? vd_C.scale: vd_U.vd_bS * vd_Dk * dpi * vd_U.vd_iC;
        var vd_mY = vd_xR(vd_bv, vd_qQ, vd_C.angle, vd_C.IsDpi);
        var origin = vd_mY[0];
        var vd_bP = vd_mY[1];
        var angle = vd_mY[2];
        if (vdgeo.AreEqual(vd_bP[Y], 0.0, vdgeo.DefaultLinearEquality)) return;
        var vd_oq = vdgeo.vd_s();
        var vd_BW;
        var vd_eQ = 0.0;
        var l = 0;
        var vd_cS;
        var points;
        vdgeo.vd_ae(vd_oq, -vd_C.origin[X], -vd_C.origin[Y], -vd_C.origin[Z]);
        vdgeo.vd_ae(vd_oq, -origin[X], -origin[Y], 0.0);
        vdgeo.vd_ag(vd_oq, -angle);
        vd_cS = vdgeo.vd_hz(vd_oq, pts);
        vd_cS.push(vd_cS[0]);
        var vd_ir = vd_LP(vd_cS);
        if (vd_bP[Y] > 0) {
            vd_eQ = vd_ir[X] - (vd_ir[X] % vd_bP[Y]) - vd_bP[Y];
            while (vd_eQ > vd_ir[X]) {
                vd_eQ -= vd_bP[Y];
            }
        } else {
            vd_eQ = vd_ir[Y] - (vd_ir[Y] % vd_bP[Y]) - vd_bP[Y];
            while (vd_eQ < vd_ir[Y]) {
                vd_eQ -= vd_bP[Y];
            }
        }
        var t = vd_eQ / vd_bP[Y];
        if (t < 0.0) t -= 0.5;
        else t += 0.5;
        l = vdgeo.vd_o(t);
        vd_BW = vdgeo.vd_bo(vd_oq);
        vd_U.vd_bf(vd_BW);
        while ((vd_bP[Y] > 0) ? (vd_eQ <= vd_ir[Y]) : (vd_eQ >= vd_ir[X])) {
            points = vd_FY(vd_cS, vd_eQ);
            if ((points.length % 2) === 1) points.pop();
            points.sort(function(a, b) {
                return a[X] - b[X]
            });
            for (var pos = 0; pos < points.length - 1; pos += 2) {
                vd_Lf(vd_bv, points[pos], points[pos + 1], vd_bP[X] * l, vd_qQ);
            }
            vd_eQ += vd_bP[Y];
            l++;
        }
        vd_U.vd_bg();
    };
    function vd_Mo(pts, PatternLines) {
        var vd_LG = vd_U.linetype;
        vd_U.linetype = null;
        for (var i = 0; i < PatternLines.Items.length; i++) {
            vd_LA(pts, PatternLines.Items[i]);
        }
        vd_U.linetype = vd_LG;
    };
    var vd_C = {
        vd_br: undefined,
        color: undefined,
        vd_vF: false,
        vd_tY: false,
        vd_cA: 255,
        angle: 0,
        scale: 1,
        pattern: null,
        origin: vdgeo.newpoint(0, 0, 0),
        IsDpi: false,
        vd_qU: false,
        vd_ex: 0,
        vd_ie: undefined,
        gradientAngle: 0
    };
    function vd_Ae(pts) {
        if (pts == null) {
            vd_U.vd_Y.vd_Ao(0, undefined, null);
            return;
        }
        if (vd_C == null || vd_C == undefined || vd_C.vd_ex === 0) return;
        var gcol = vd_C.vd_ie;
        if (gcol == undefined) gcol = vd_dz;
        var vd_bK = vdgeo.vd_jK(pts);
        var w = vd_bK[3] - vd_bK[0];
        var h = vd_bK[4] - vd_bK[1];
        var s = (w + h) / 2.0;
        var matrix = vdgeo.vd_bo(vd_U.vd_fp());
        if (vd_C.vd_ex === 1 || vd_C.vd_ex === 3) s = w;
        vdgeo.vd_ae(matrix, -(vd_bK[0] + vd_bK[3]) / 2, -(vd_bK[1] + vd_bK[4]) / 2, vd_bK[2]);
        vdgeo.vd_ag(matrix, -vd_C.gradientAngle);
        vdgeo.vd_ay(matrix, 1 / s, 1 / s, 1);
        vd_U.vd_Y.vd_Ao(vd_C.vd_ex, gcol, matrix);
    };
    this.vd_eD = function(vd_cH) {
        vd_C = vd_cH;
    };
    var vd_Dk = 0.0833;
    var vd_Jg = 0.0197;
    function vd_xR(vd_bv, vd_CN, vd_zf, vd_Mx) {
        var m = vdgeo.vd_s();
        vdgeo.vd_ay(m, vd_CN, vd_CN, 1);
        vdgeo.vd_ag(m, vd_zf);
        var origin = vdgeo.vd_Z(m, vd_bv.Origin);
        var vd_bP = vdgeo.newpoint(vd_bv.Offset[X], vd_bv.Offset[Y], vd_bv.Offset[Z]);
        if (vd_Mx === true) {
            vd_bP[X] = vd_bP[X] == 0.0 ? 0 : Math.abs(vd_bP[X]) / vd_bP[X];
            vd_bP[Y] = vd_bP[Y] == 0.0 ? 0 : Math.abs(vd_bP[Y]) / vd_bP[Y];
        }
        vd_bP = vdgeo.vd_Z(m, vd_bP);
        var angle = vd_bv.Angle + vd_zf;
        var vd_Ds = vdgeo.vd_s();
        vdgeo.vd_ag(vd_Ds, -angle);
        vd_bP = vdgeo.vd_Z(vd_Ds, vd_bP);
        return [origin, vd_bP, angle];
    };
    this.vd_go = function(pts, vd_bO, uvs) {
        if (vd_eM) {
            vd_U.vd_fB(pts);
            return;
        }
        var vd_nJ = undefined;
        if (vd_C != null && vd_C !== undefined && vd_C.pattern != null) {
            var vd_uL = false;
            if (vd_C.IsDpi === false) {
                if (vd_C.vd_qU === true) {
                    vd_uL = true;
                } else {
                    var vd_qQ = vd_C.scale;
                    for (var i = 0; i < vd_C.pattern.PatternLines.Items.length; i++) {
                        var vd_bv = vd_C.pattern.PatternLines.Items[i];
                        var vd_mY = vd_xR(vd_bv, vd_qQ, vd_C.angle, vd_C.IsDpi);
                        var vd_mj = vd_ur(0, vd_mY[1][Y], 0);
                        var vd_qy = vd_mj / (dpi * vd_U.vd_bS);
                        if (vd_qy < vd_Jg) {
                            vd_uL = true;
                            break;
                        }
                    }
                }
            }
            vd_nJ = vd_U.vd_aZ(vd_C.vd_tY === true ? vd_U.vd_kn() : vd_C.color);
            if (!vd_uL) {
                if (vd_C.vd_br !== undefined) {
                    var vd_Kw = vd_U.vd_aZ(vd_C.vd_vF === true ? vd_U.vd_kn() : vd_C.vd_br);
                    vd_U.vd_fB(pts);
                    vd_U.vd_aZ(vd_Kw);
                }
                vd_Mo(pts, vd_C.pattern.PatternLines);
                vd_U.vd_aZ(vd_nJ);
                return;
            }
        }
        var alpha = vd_U.vd_Y.vd_ms(Math.min(vd_C.vd_cA, vd_U.vd_Y.Alpha));
        vd_Ae(pts);
        vd_U.vd_oL(pts, vd_bO, uvs, vd_U.vd_Y.vd_fa);
        vd_Ae(null);
        vd_U.vd_Y.vd_ms(alpha);
        vd_U.vd_aZ(vd_nJ);
    };
    this.vd_oL = function(pts, vd_bO, uvs, vd_dN, vd_Lz) {
        if (!vd_fm()) return;
        if (vd_eM) {
            if (!vd_dN || !vd_dN.isNoteIcon) {
                vd_U.vd_fB(pts, vd_bO, uvs);
                return;
            }
        }
        var vd_LL = vd_U.vd_dR;
        vd_U.vd_dR = true;
        var vd_IU = vd_ds;
        var vd_JW = vd_U.vd_Y.vd_HI();
        var vd_Ep = vd_U.vd_ho(vd_dN);
        if (vd_U.vd_Y.vd_fa && vd_ds == vd_wu) vd_ds = vd_jo;
        vd_U.vd_Y.vd_so = !vd_Lz;
        vd_U.vd_fB(pts, vd_bO, uvs);
        vd_U.vd_Y.vd_so = true;
        vd_U.vd_Y.vd_GL(vd_JW);
        vd_ds = vd_IU;
        vd_U.vd_ho(vd_Ep);
        vd_U.vd_dR = vd_LL;
    };
    this.vd_kQ = false;
    this.vd_zp = function(FaceList, VertexList, vd_Hz, uvs, vd_aw) {
        var i, ii = 0,
        i0, i1, i2, i3;
        var vd_he = 0;
        var p0, p1, p2, p3;
        var col = -1,
        vd_fU = -1;
        var vd_hp, vd_cG;
        var length = FaceList.length;
        var vd_Ab = vd_U.vd_aZ(undefined);
        var vd_dN = vd_U.vd_Y.vd_fa;
        vd_U.vd_kQ = vd_aw != null;
        var vd_IO = vd_hc;
        var vd_IN = vd_ds;
        if (vd_U.vd_kQ) {
            vd_hc = vd_kN;
            if (vd_ds == vd_wu) vd_ds = vd_jo;
        }
        for (i = 0; i < length; i = i + 5) {
            vd_hp = i / 5;
            vd_cG = 4 * vd_hp;
            vd_he = 0;
            ii = FaceList[i];
            if (ii < 0) vd_he += 1;
            ii = Math.abs(ii);
            i0 = ii;
            p0 = VertexList[ii - 1];
            ii = FaceList[i + 1];
            if (ii < 0) vd_he += 2;
            ii = Math.abs(ii);
            i1 = ii;
            p1 = VertexList[ii - 1];
            ii = FaceList[i + 2];
            if (ii < 0) vd_he += 4;
            ii = Math.abs(ii);
            i2 = ii;
            p2 = VertexList[ii - 1];
            ii = FaceList[i + 3];
            if (ii < 0) vd_he += 8;
            ii = Math.abs(ii);
            i3 = ii;
            p3 = VertexList[ii - 1];
            col = FaceList[i + 4];
            if (ShowHidenEdges) vd_he = 0;
            if (vd_fU != col) {
                vd_fU = col;
                if (vd_fU === -1) {
                    vd_U.vd_aZ(vd_Ab);
                    vd_U.vd_ho(vd_dN);
                } else {
                    var pcol = vd_U.palette.Items[vd_fU];
                    vd_U.vd_aZ(pcol.SystemColor);
                    vd_U.vd_ho(pcol.MaterialImageRef);
                }
            }
            vd_nw = vd_hp;
            if ((i3 === i2 || i3 === i0)) p3 = null;
            vd_hc(p0, p1, p2, p3, ((vd_he & 1) === 0), ((vd_he & 2) === 0), ((vd_he & 4) === 0), ((vd_he & 8) === 0), vd_Hz[vd_hp], uvs[vd_cG], uvs[vd_cG + 1], uvs[vd_cG + 2], uvs[vd_cG + 3]);
        }
        vd_U.vd_kQ = false;
        vd_hc = vd_IO;
        vd_ds = vd_IN;
        vd_nw = null;
        vd_U.vd_aZ(vd_Ab);
        vd_U.vd_ho(vd_dN);
    };
    function vd_KS() {
        var vd_hK = document.createElement("div");
        vd_hK.style.height = "25.4mm";
        vd_hK.style.width = "25.4mm";
        vd_hK.style.visibility = "hidden";
        document.body.appendChild(vd_hK);
        var xres = vd_hK.offsetWidth;
        var yres = vd_hK.offsetHeight;
        vd_hK.parentNode.removeChild(vd_hK);
        return yres;
    };
    var dpi = 96.0;
    var vd_Cf = 0.2;
    var vd_Kg = 0.0625;
    var vd_Ja = 0.033;
    var vd_pm = false;
    function vd_vw(sp, ep) {
        var vd_La = vd_pm;
        vd_pm = true;
        vd_dI(sp, ep);
        vd_pm = vd_La;
    };
    function vd_AO() {
        if (vd_eM) return true;
        return (vd_U.linetype == null || vd_pm == true || vd_U.linetype.Segments == undefined || vd_U.linetype.Segments.Items.length === 0 || (vd_U.linetype.IsDPIScale !== true && vd_wO() * vd_U.vd_le < (vd_U.vd_bS * dpi * vd_Kg * vd_U.vd_iC)));
    };
    function vd_wO() {
        if (vd_U.linetype.OverAllLength !== undefined) return vd_U.linetype.OverAllLength;
        vd_U.linetype.OverAllLength = 0.0;
        for (var i = 0; i < vd_U.linetype.Segments.Items.length; i++) {
            vd_U.linetype.OverAllLength += Math.abs(vd_U.linetype.Segments.Items[i].DashLen);
        }
        return vd_U.linetype.OverAllLength;
    };
    function vd_LZ() {
        if (vd_U.linetype.vd_kh !== undefined) return vd_U.linetype.vd_kh;
        if (vd_U.linetype == null || vd_U.linetype.Segments.Items.length == 0) {
            vd_U.linetype.vd_kh = false;
            return vd_U.linetype.vd_kh;
        }
        for (var i = 0; i < vd_U.linetype.Segments.Items.length; i++) {
            var vd_aW = vd_U.linetype.Segments.Items[i];
            if (vd_aW.Flag != 0 || vd_aW.DashLen > 0.0) {
                vd_U.linetype.vd_kh = false;
                return vd_U.linetype.vd_kh;
            }
        }
        vd_U.linetype.vd_kh = true;
        return vd_U.linetype.vd_kh;
    };
    function vd_vk(p1, p2, vd_sv, vd_vS) {
        vdgeo.vd_ei(vd_U.vd_aS(), p1, __P1);
        vdgeo.vd_ei(vd_U.vd_aS(), p2, __P2);
        if (vdgeo.AreEqual(vdgeo.Distance2D(__P1, __P2), 0.0, vdgeo.DefaultLinearEquality) || !vd_U.vd_Do(__P1, __P2, vd_bB, vd_dd)) return 0.0;
        var invisible = vd_LZ();
        var vd_sJ = 0.0;
        var scale = vd_U.vd_le;
        if (vd_U.linetype.IsDPIScale === true) scale = vd_U.vd_bS * dpi * vd_Cf * vd_U.vd_iC;
        scale /= (vd_vG * vd_U.vd_iC);
        var vd_Gh = vd_U.vd_bS / vd_vG;
        var vd_dn = vd_wO() * scale;
        var length = vdgeo.Distance3D(p1, p2);
        vdgeo.vd_cM(vd_er, p1);
        vdgeo.vd_cM(vd_ca, p1);
        var vd_bT = 0.0;
        var dash = 0.0;
        vd_bT -= vd_sv;
        var angle = vdgeo.GetAngle(p1, p2);
        var vdir = vdgeo.VectorDirection(p1, p2);
        if (!invisible && vd_vS && vd_bT == 0 && vd_U.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start) {
            var vd_oN = length / vd_dn;
            var vd_uZ = (Math.abs(vd_U.linetype.Segments.Items[0].DashLen) * scale + Math.abs(vd_oN - Math.floor(vd_oN)) * vd_dn) / 2.0;
            var dx = vd_uZ - Math.abs(vd_U.linetype.Segments.Items[0].DashLen) * scale;
            vd_bT = dx;
            vd_sJ = ((length - vd_bT) % vd_dn);
        } else {
            vd_sJ = ((length + vd_sv) % vd_dn);
        }
        var vd_zX = vd_bT;
        var start = 0;
        while (vd_bT < length) {
            if (!invisible && vd_U.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start && vd_vS && (length - vd_bT) < vd_dn) {
                vd_bT = length;
                vdgeo.vd_oe(vd_ca, p1, vdir, vd_bT);
                vd_vw(vd_er, vd_ca);
                vdgeo.vd_cM(vd_er, vd_ca);
                break;
            }
            for (var i = 0; i < vd_U.linetype.Segments.Items.length; i++) {
                var vd_aW = vd_U.linetype.Segments.Items[i];
                dash = vd_aW.DashLen * scale;
                vd_bT += Math.abs(dash);
                if (vd_bT < 0.0) continue;
                if (vd_bT < start) continue;
                vd_zX = vd_bT;
                if (vd_bT > length) vd_bT = length;
                if (vd_aW.Shape != null) {
                    var vd_jx = vdgeo.vd_s();
                    var vd_rd = vd_aW.ShapeScale;
                    vd_rd *= (1.0 / (vd_aW.ShapeStyleRef.FontFileVDS.Ascent));
                    vdgeo.vd_ae(vd_jx, -vd_aW.Shape.bb[0], 0, 0);
                    vdgeo.vd_ay(vd_jx, vd_rd, vd_rd, 1.0);
                    vdgeo.vd_ag(vd_jx, vd_aW.ShapeRotation);
                    vdgeo.vd_ae(vd_jx, vd_aW.ShapeOffsetX, vd_aW.ShapeOffsetY, 0.0);
                    vdgeo.vd_HX(vd_jx, vdgeo.newpoint(0, 0, 1), vdir);
                    vdgeo.vd_ay(vd_jx, scale, scale, 1.0);
                    vdgeo.vd_oe(vd_ca, p1, vdir, vd_bT);
                    vdgeo.vd_ae(vd_jx, vd_ca[X], vd_ca[Y], vd_ca[Z]);
                    var d2 = vd_zX + vd_aW.ShapeOffsetX * scale + (vd_vS ? ((vd_aW.Shape.bb[2] - vd_aW.Shape.bb[0]) * vd_rd) : 0.0);
                    if (d2 <= length) {
                        vd_U.vd_bf(vd_jx);
                        vd_yG(vd_aW.Shape, 0, 0, vd_aW.ShapeStyleRef.FontFileVDS.FontType, vd_aW.ShapeStyleRef.FontFileVDS);
                        vd_U.vd_bg();
                    }
                }
                if (dash > 0) {
                    vdgeo.vd_oe(vd_ca, p1, vdir, vd_bT);
                    vd_vw(vd_er, vd_ca);
                    vdgeo.vd_cM(vd_er, vd_ca);
                } else if (dash == 0) {
                    vdgeo.vd_oe(vd_ca, p1, vdir, (vd_bT + vd_Gh * 2.0));
                    vd_vw(vd_er, vd_ca);
                } else {
                    vdgeo.vd_oe(vd_er, p1, vdir, vd_bT);
                }
                if (vdgeo.AreEqual(vd_bT, length, vdgeo.DefaultLinearEquality) || vd_bT > length) {
                    vd_bT = length;
                    break;
                }
            }
        }
        return vd_sJ;
    };
    function vd_JH(points, closed, vd_ts) {
        var vd_oV = 0.0;
        if (vd_U.linetype.DrawMethod != vdConst.LineTypeDrawMethod_Start) {
            var scale = vd_U.vd_le;
            if (vd_U.linetype.IsDPIScale === true) scale = vd_U.vd_bS * dpi * vd_Cf * vd_U.vd_iC;
            var vd_dn = vd_wO() * scale;
            var length = points.length;
            var vd_oN = length / vd_dn;
            var vd_uZ = (Math.abs(vd_U.linetype.Segments.Items[0].DashLen) * scale + Math.abs(vd_oN - Math.floor(vd_oN)) * vd_dn) / 2.0;
            var dx = vd_uZ - Math.abs(vd_U.linetype.Segments.Items[0].DashLen) * scale;
            vd_oV = -1.0 * dx;
        }
        var _sp = new vdgeo.newpoint(0, 0, 0);
        var _ep = new vdgeo.newpoint(0, 0, 0);
        vdgeo.vd_cM(_sp, points[0]);
        _sp[Z] += vd_ts;
        for (var i = 1; i < points.length; i++) {
            vdgeo.vd_cM(_ep, points[i]);
            _ep[Z] += vd_ts;
            vd_U.vd_aO = points[i - 1][INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = i - 1;
            vd_oV = vd_vk(_sp, _ep, vd_oV, (i === points.length - 1));
            vdgeo.vd_cM(_sp, _ep);
        }
        if (closed) {
            vdgeo.vd_cM(_ep, points[0]);
            _ep[Z] += vd_ts;
            vd_U.vd_aO = points[points.length - 1][INDEX];
            if (vd_U.vd_aO === undefined) vd_U.vd_aO = points.length - 1;
            vd_oV = vd_vk(_sp, _ep, vd_oV, (i === points.length - 1));
            vdgeo.vd_cM(_sp, _ep);
        }
        vd_U.vd_aO = undefined;
    };
    this.GetEntityFromPoint = function(x, y, vd_mU, vd_db) {
        var vd_l = vd_U.vd_Y.vd_nU();
        if (!vd_U.vd_aG) return null;
        x = vdgeo.vd_o(x);
        y = vdgeo.vd_o(y);
        if (x < 0 || x >= vd_U.width) return null;
        if (y < 0 || y >= vd_U.height) return null;
        var vd_gd = Math.max(vdgeo.vd_o(vd_mU * 0.5), 1);
        var px, py;
        for (var ix = -vd_gd; ix <= vd_gd; ix++) {
            for (var iy = -vd_gd; iy <= vd_gd; iy++) {
                px = x + ix;
                py = y + iy;
                if (px < 0 || px >= vd_U.width || py < 0 || py >= vd_U.height) continue;
                var ipos = py * vd_U.width + px;
                var ret = vd_l[ipos][1];
                if (!ret) continue;
                for (var j = ret.length - 1; j >= 0; j--) {
                    var fig = ret[j];
                    if (vd_db === false && fig.LayerRef && fig.LayerRef.Lock) continue;
                    return fig;
                }
            }
        }
        return null;
    };
    this.GetEntitiesFromBox = function(xmin, ymin, xmax, ymax, vd_db) {
        var ret = [];
        var vd_l = vd_U.vd_Y.vd_nU();
        if (!vd_U.vd_aG) return ret;
        var tmp;
        if (xmin > xmax) {
            tmp = xmin;
            xmin = xmax;
            xmax = tmp;
        }
        if (ymin > ymax) {
            tmp = ymin;
            ymin = ymax;
            ymax = tmp;
        }
        xmin = vdgeo.vd_o(Math.min(Math.max(xmin, 0), vd_U.width - 1));
        xmax = vdgeo.vd_o(Math.min(Math.max(xmax, 0), vd_U.width - 1));
        ymin = vdgeo.vd_o(Math.min(Math.max(ymin, 0), vd_U.height - 1));
        ymax = vdgeo.vd_o(Math.min(Math.max(ymax, 0), vd_U.height - 1));
        for (var ix = xmin; ix <= xmax; ix++) {
            for (var iy = ymin; iy <= ymax; iy++) {
                var ipos = iy * vd_U.width + ix;
                var ret1 = vd_l[ipos][1];
                if (!ret1) continue;
                for (var j = ret1.length - 1; j >= 0; j--) {
                    var fig = ret1[j];
                    if (vd_db === false && fig.LayerRef && fig.LayerRef.Lock) continue;
                    ret.push(fig);
                }
            }
        }
        if (ret.length === 0) return ret;
        ret.sort(function(a, b) {
            return a.HandleId - b.HandleId
        });
        var vd_pY = [ret[0]];
        for (var k = 0; k < ret.length; k++) {
            if (vd_pY[vd_pY.length - 1] === ret[k]) continue;
            vd_pY.push(ret[k]);
        }
        return vd_pY;
    };
    this.GetEntitiesInWindowBox = function(xmin, ymin, xmax, ymax, vd_db) {
        var tmp;
        if (xmin > xmax) {
            tmp = xmin;
            xmin = xmax;
            xmax = tmp;
        }
        if (ymin > ymax) {
            tmp = ymin;
            ymin = ymax;
            ymax = tmp;
        }
        xmin = vdgeo.vd_o(Math.min(Math.max(xmin, 0), vd_U.width - 1));
        xmax = vdgeo.vd_o(Math.min(Math.max(xmax, 0), vd_U.width - 1));
        ymin = vdgeo.vd_o(Math.min(Math.max(ymin, 0), vd_U.height - 1));
        ymax = vdgeo.vd_o(Math.min(Math.max(ymax, 0), vd_U.height - 1));
        var vd_kC = vd_U.GetEntitiesFromBox(xmin, ymin, xmax, ymax, vd_db);
        if (vd_kC.length === 0) return vd_kC;
        var vd_l = vd_U.vd_Y.vd_nU();
        for (var iy = 0; iy < vd_U.height; iy++) {
            for (var ix = 0; ix < vd_U.width; ix++) {
                if (vdgeo.vd_pb(ix, iy, xmin, ymin, xmax, ymax)) continue;
                var ipos = iy * vd_U.width + ix;
                var ret1 = vd_l[ipos][1];
                if (!ret1) continue;
                for (var j = 0; j < ret1.length; j++) {
                    for (var k = 0; k < vd_kC.length; k++) {
                        if (vd_kC[k] == ret1[j]) {
                            vd_kC.splice(k, 1);
                            k--;
                        }
                    }
                }
            }
        }
        return vd_kC;
    };
    return this;
};
function vd_Jk() {
    var vd_U = this;
    var document = null;
    this.SelectDocument = function(vd_i) {
        document = vd_i;
        if (!document.Groups) document.Groups = {
            IgnoreGroups: false,
            Items: []
        };
        var groups = document.Groups;
        if (groups.IgnoreGroups === undefined) groups.IgnoreGroups = false;
        if (groups.Items.length == 0) return;
        for (var i = 0; i < groups.Items.length; i++) {
            var group = groups.Items[i];
            var h = 'h_' + group.HandleId.toString();
            for (var i2 = 0; i2 < group.Items.length; i2++) {
                var vd_Dc = group.Items[i2];
                var vd_rz = document[vd_Dc];
                if (!vd_rz) continue;
                if (!vd_rz._groups) vd_rz._groups = {};
                vd_rz._groups[h] = 1;
            }
        }
    };
    this.vd_BP = function(fig, vd_bG, vd_uN) {
        if (!fig) return;
        if (fig.selected == true) return;
        if (fig.vd_AC) return;
        fig.vd_AC = true;
        vd_bG.push(fig);
        if (!vd_U.IgnoreGroups && fig._groups) {
            for (var vd_vv in fig._groups) {
                var group = document.Groups.Items[document.Groups[vd_vv]];
                if (!group || group == vd_uN) continue;
                if (group.Selectable === false) continue;
                for (var i2 = 0; i2 < group.Items.length; i2++) {
                    var fig2 = document[group.Items[i2]];
                    vd_U.vd_BP(fig2, vd_bG, group);
                }
            }
        }
    };
    this.vd_rI = function(vd_sU, vd_bG, vd_Cq, vd_uN) {
        if (!vd_sU) return;
        var index = vd_bG.indexOf(vd_sU);
        if (vd_Cq) {
            if (index < 0) return;
            vd_bG.splice(index, 1);
        } else {
            if (index >= 0) return;
            vd_bG.push(vd_sU);
        }
        var fig = document[vd_sU];
        if (!fig || vd_U.IgnoreGroups || !fig._groups) return;
        for (var vd_vv in fig._groups) {
            var group = document.Groups.Items[document.Groups[vd_vv]];
            if (!group || group == vd_uN) continue;
            if (group.Selectable === false) continue;
            for (var i2 = 0; i2 < group.Items.length; i2++) {
                vd_U.vd_rI(group.Items[i2], vd_bG, vd_Cq, group);
            }
        }
    };
    Object.defineProperty(vd_U, 'IgnoreGroups', {
        get: function() {
            return document.Groups.IgnoreGroups;
        },
        set: function(newValue) {
            document.Groups.IgnoreGroups = newValue;
        }
    });
    function Find(name) {
        name = name.toLowerCase();
        for (var i = 0; i < document.Groups.Items.length; i++) {
            var group = document.Groups.Items[i];
            var vd_gU = group.Name.toLowerCase();
            if (vd_gU == name) return group;
        }
        return null;
    };
    function vd_CZ(group, item) {
        var h = 'h_' + item.HandleId.toString();
        return group.Items.indexOf(h);
    };
    this.ClearGroup = function(vd_jk) {
        var group = Find(vd_jk);
        if (!group) return;
        var g_h = 'h_' + group.HandleId.toString();
        for (var i = 0; i < group.Items.length; i++) {
            var fig = document[group.Items[i]];
            if (!fig) continue;
            if (!fig._groups[g_h]) continue;
            delete fig._groups[g_h];
        }
        group.Items = [];
    };
    this.AddItem = function(vd_jk, item) {
        if (!item || !item.HandleId) return false;
        var group = Find(vd_jk);
        var g_h;
        if (!group) {
            group = {
                _t: vdConst.vdGroup_code,
                HandleId: vdConst.vd_zB(document),
                Name: vd_jk,
                Items: []
            };
            document.Groups.Items.push(group);
            g_h = 'h_' + group.HandleId.toString();
            document.Groups[g_h] = document.Groups.Items.length - 1;
        } else {
            g_h = 'h_' + group.HandleId.toString();
        }
        if (item._groups && item._groups[g_h]) return true;
        if (!item._groups) item._groups = {};
        item._groups[g_h] = 1;
        group.Items.push('h_' + item.HandleId.toString());
        return true;
    };
    this.RemoveItem = function(vd_jk, item) {
        if (!item || !item.HandleId) return false;
        var group = Find(vd_jk);
        if (!group) return false;
        var g_h = 'h_' + group.HandleId.toString();
        if (!item._groups || !item._groups[g_h]) return false;
        delete item._groups[g_h];
        var index = vd_CZ(group, item);
        if (index < 0) return false;
        group.Items.splice(index, 1);
        return true;
    };
    this.EnableGroup = function(vd_jk, enable) {
        var group = Find(vd_jk);
        if (!group) return;
        group.Selectable = enable;
    };
    return this;
};
vdConst.vd_vh = 1;
vdConst.vd_kf = 2;
vdConst.vd_rb = 3;
vdConst.vd_st = 4;
vdConst.vd_rk = 5;
vdConst.vd_HQ = 6;
vdConst.vd_MZ = 0;
vdConst.vd_ri = 1;
vdConst.vd_tt = 2;
vdConst.vd_ns = 4;
vdConst.vd_mn = 8;
vdConst.vd_Ip = 12;
vdConst.vd_wA = 0;
vdConst.vd_Ax = 1;
vdConst.vd_zq = 2;
vdConst.vd_Ak = 3;
vdConst.vd_AH = 4;
vdConst.vd_FV = 0;
vdConst.vd_vI = 1;
vdConst.vd_tz = 2;
vdConst.vd_Oq = 3;
vdConst.vd_FS = 1;
vdConst.vd_Fv = 0;
vdConst.vd_ti = String.fromCharCode(176);
vdConst.vd_Og = 'd';
function vd_KM(vd_nu, vd_nn, vd_oa) {
    var vd_U = this;
    if (vd_nu == undefined) this.type = vdConst.vd_kf;
    else this.type = vd_nu;
    if (vd_nn == undefined) this.precision = 4;
    else this.precision = vd_nn;
    if (vd_oa == undefined) this.vd_by = vdConst.vd_ri;
    else this.vd_by = vd_oa;
    this.vd_El = function(length) {
        var ret = "";
        var vd_pI = 1.0 / Math.pow(10, vd_U.precision);
        if (vd_U.type == vdConst.vd_rk || vd_U.type == vdConst.vd_rb) vd_pI = 1.0 / Math.pow(2, vd_U.precision);
        if (vdgeo.AreEqual(length, 0, vd_pI * 0.5)) length = 0.0;
        var vd_Lm = (length < 0);
        length = Math.abs(length);
        switch (vd_U.type) {
        case vdConst.vd_vh:
            var prec = vd_U.precision;
            if (vdgeo.AreEqual(length, vdgeo.vd_o(length), vd_pI)) prec = 0;
            ret = length.toExponential(prec);
            if ((vd_U.vd_by & vdConst.vd_ns) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_mn) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            break;
        case vdConst.vd_kf:
            ret = length.toFixed(vd_U.precision);
            if ((vd_U.vd_by & vdConst.vd_ns) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_mn) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            break;
        case vdConst.vd_rb:
            {
                var feet = vdgeo.vd_o((length / 12.0) + 0.000001);
                var vd_dc = length - (feet * 12.0);
                if (vdgeo.AreEqual(vd_dc, 0, vdgeo.DefaultLinearEquality)) vd_dc = 0.0;
                if (vdgeo.AreEqual(vd_dc, 0.0, vd_pI)) {
                    ret = feet.toString() + "'";
                } else {
                    var vd_ul = feet.toString() + "'";
                    if (feet == 0) vd_ul = "";
                    ret = vd_dc.toFixed(vd_U.precision);
                    if ((vd_U.vd_by & vdConst.vd_ns) != 0) {
                        while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
                    }
                    if ((vd_U.vd_by & vdConst.vd_mn) != 0) {
                        var vd_dj = ret.indexOf(".");
                        if (vd_dj >= 0) {
                            while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                            if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                        }
                    }
                    ret += "\"";
                    ret = (vd_ul != "" ? (vd_ul + "-") : "") + ret;
                }
            }
            break;
        case vdConst.vd_st:
            {
                var vd_ct = vdgeo.vd_o(Math.pow(2, vd_U.precision));
                var feet = vdgeo.vd_o((length / 12.0) + 0.000001);
                var vd_dc = vdgeo.vd_o(length - (feet * 12.0));
                if (vd_dc == 12) {
                    vd_dc = 0;
                    feet++;
                }
                var vd_cb = vdgeo.vd_o((length - vd_dc - (feet * 12.0)) * vd_ct + (0.5 / vd_ct) + 0.4999);
                if (vd_cb == vd_ct) {
                    vd_cb = 0;
                    vd_dc++;
                    if (vd_dc == 12) {
                        vd_dc = 0;
                        feet++;
                    }
                }
                while (vd_cb >= 2 && (vd_cb % 2.0) == 0.0 && vd_ct >= 2 && (vd_ct % 2.0) == 0.0) {
                    vd_cb /= 2;
                    vd_ct /= 2;
                }
                var vd_ui = feet.toString() + "'";
                var vd_lW = vd_dc.toString() + " ";
                var vd_oy = vd_cb.toString() + "/" + vd_ct.toString();
                if (vd_cb == 0) vd_oy = "";
                if (feet == 0) vd_ui = "";
                if ((vd_U.vd_by & vdConst.vd_tt) != 0 && vd_dc == 0) {
                    vd_lW = "";
                }
                ret = vd_ui;
                var vd_xP = vd_lW + vd_oy;
                if (vd_ui != "" && vd_xP != "") ret += "-";
                ret += vd_xP;
                if (ret == "") ret = "0";
                if (vd_lW != "") ret += "\"";
            }
            break;
        case vdConst.vd_rk:
            {
                var vd_ct = vdgeo.vd_o(Math.pow(2, vd_U.precision));
                var vd_dc = vdgeo.vd_o(length);
                var vd_cb = vdgeo.vd_o((length - vd_dc) * vd_ct + (0.5 / vd_ct) + 0.4999);
                if (vd_cb == vd_ct) {
                    vd_dc++;
                    vd_cb = 0;
                }
                while (vd_cb >= 2 && (vd_cb % 2.0) == 0.0 && vd_ct >= 2 && (vd_ct % 2.0) == 0.0) {
                    vd_cb /= 2;
                    vd_ct /= 2;
                }
                var vd_lW = vd_dc.toString() + " ";
                var vd_oy = vd_cb.toString() + "/" + vd_ct.toString();
                if (vd_cb == 0) vd_oy = "";
                if ((vd_U.vd_by & vdConst.vd_tt) != 0 && vd_dc == 0) {
                    vd_lW = "";
                }
                ret = vd_lW + vd_oy;
                if (ret == "") ret = "0";
                ret += "\"";
            }
            break;
        case vdConst.vd_HQ:
            ret = length.toString();
            if ((vd_U.vd_by & vdConst.vd_ns) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_mn) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            break;
        default:
            ret = length.toString();
            if ((vd_U.vd_by & vdConst.vd_ns) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_mn) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            break;
        }
        if (ret == "") ret = "0";
        ret = ((vd_Lm) ? "-": "") + ret;
        if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
        return ret;
    };
    return this;
};
function vd_MY(vd_nu, vd_nn, vd_oa) {
    var vd_U = this;
    this.AngleBase = 0;
    this.Direction = vdConst.vd_Fv;
    if (vd_nu == undefined) this.type = vdConst.vd_wA;
    else this.type = vd_nu;
    if (vd_nn == undefined) this.precision = 4;
    else this.precision = vd_nn;
    if (vd_oa == undefined) this.vd_by = vdConst.vd_FV;
    else this.vd_by = vd_oa;
    function vd_JX(angle) {
        var ret = angle - vd_U.AngleBase;
        if (vd_U.Direction == vdConst.vd_FS) ret = vdgeo.VD_TWOPI - ret;
        return vdgeo.FixAngle(ret);
    };
    this.vd_MM = function(value) {
        switch (vd_U.type) {
        case vdConst.vd_wA:
        case vdConst.vd_Ax:
            return vdgeo.DegreesToRadians(value);
        case vdConst.vd_Ak:
            return value;
        case vdConst.vd_zq:
        case vdConst.vd_AH:
            return value * vdgeo.PI / 200.0;
        default:
            return value;
        }
    };
    this.vd_Nu = function(vd_Jj) {
        var length = vd_JX(vd_Jj);
        var ret = "";
        length = vdgeo.RadiansToDegrees(length);
        length += vdgeo.DefaultAngularEquality;
        if (length > 360.0) length = length - 360.0;
        if (length < 0.0) length += 360.0;
        switch (vd_U.type) {
        case vdConst.vd_wA:
            ret = length.toFixed(vd_U.precision);
            if ((vd_U.vd_by & vdConst.vd_vI) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_tz) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            ret = ret + vdConst.vd_ti;
            break;
        case vdConst.vd_Ax:
            {
                var vd_jg = vdgeo.vd_o(length);
                var vd_gt = vdgeo.vd_o((length - vd_jg) * 60.0);
                var vd_of = vdgeo.vd_o(0.5 + ((length - (vd_jg * 1.0 + vd_gt / 60.0)) * 3600.0));
                if (vd_U.precision < 2) {
                    vd_gt += vdgeo.vd_o(vd_of / 31);
                    vd_of = 0;
                }
                if (precision < 1) {
                    vd_jg += vdgeo.vd_o(vd_gt / 31);
                    vd_gt = 0;
                }
                if (vd_of >= 60) {
                    vd_gt += 1;
                    vd_of = 0;
                }
                if (vd_gt >= 60) {
                    vd_jg += 1;
                    vd_gt = 0;
                }
                ret = vd_jg.toString() + vdConst.vd_ti + vd_gt.toString() + "'" + vd_of.toString() + "\"";
                if (vd_U.precision < 3) ret = vd_jg.toString() + vdConst.vd_ti + vd_gt.toString() + "'";
                if (vd_U.precision == 0) ret = vd_jg.toString() + vdConst.vd_ti;
            }
            break;
        case vdConst.vd_AH:
        case vdConst.vd_zq:
            length = length * 200.0 / 180.0;
            ret = length.toFixed(vd_U.precision);
            if ((vd_U.vd_by & vdConst.vd_vI) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_tz) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            ret = ret + "g";
            break;
        case vd_LB.vd_Ak:
            length = vdgeo.DegreesToRadians(length);
            ret = length.toFixed(vd_U.precision);
            if ((vd_U.vd_by & vdConst.vd_vI) != 0) {
                while (ret.charAt(0) == '0') ret = ret.substr(0, 1);
            }
            if ((vd_U.vd_by & vdConst.vd_tz) != 0) {
                var vd_dj = ret.indexOf(".");
                if (vd_dj >= 0) {
                    while (ret.charAt(ret.length - 1) == '0') ret = ret.substr(0, ret.length - 1);
                    if (ret.charAt(ret.length - 1) == '.') ret = ret.substr(0, ret.length - 1);
                }
            }
            ret = ret + "r";
            break;
        default:
            break;
        }
        return ret;
    };
    return this;
};
vdConst.vd_kP = 1;
vdConst.vd_lq = 2;
vdConst.vd_sS = 3;
vdConst.vd_tp = 1;
vdConst.vd_Oa = 0;
vdConst.vd_IF = 0;
vdConst.vd_Fi = 1;
function vd_Jz() {
    var vd_U = this;
    var vd_dV;
    var vd_hv;
    var vd_eg;
    var vd_qD;
    var vd_hd = vdConst.vd_kP;
    var vd_oo = 'tick';
    var vd_kZ = 0.2;
    var vd_fL = new vd_KM(vdConst.vd_kf, 4, vdConst.vd_ri);
    var vd_nD = vdConst.colorFromString('byblock');
    var vd_rS = vdConst.colorFromString('byblock');
    var vd_rp = vdConst.colorFromString('byblock');
    Object.defineProperty(vd_U, 'TYPE', {
        get: function() {
            switch (vd_hd) {
            case vdConst.vd_kP:
                return 'ALIGN';
            case vdConst.vd_lq:
                return 'VER';
            case vdConst.vd_sS:
                return 'HOR';
            default:
                return 'ALIGN';
            }
        },
        set: function(newValue) {
            newValue = newValue.toUpperCase();
            if (newValue == 'ALIGN') vd_hd = vdConst.vd_kP;
            else if (newValue == 'VER') vd_hd = vdConst.vd_lq;
            else if (newValue == 'HOR') vd_hd = vdConst.vd_sS;
            else vd_hd = vdConst.vd_kP;
        }
    });
    Object.defineProperty(vd_U, 'BLK', {
        get: function() {
            return vd_oo;
        },
        set: function(newValue) {
            vd_oo = newValue;
        }
    });
    Object.defineProperty(vd_U, 'TEXTH', {
        get: function() {
            return String(vd_kZ);
        },
        set: function(newValue) {
            vd_kZ = Number(newValue);
        }
    });
    Object.defineProperty(vd_U, 'LUNITS', {
        get: function() {
            switch (vd_fL.type) {
            case vdConst.vd_vh:
                return 'SC';
            case vdConst.vd_kf:
                return 'DEC';
            case vdConst.vd_rb:
                return 'ENG';
            case vdConst.vd_st:
                return 'ARC';
            case vdConst.vd_rk:
                return 'FRAC';
            default:
                return 'DEC';
            }
        },
        set: function(newValue) {
            newValue = newValue.toUpperCase();
            if (newValue == 'SC') vd_fL.type = vdConst.vd_vh;
            else if (newValue == 'DEC') vd_fL.type = vdConst.vd_kf;
            else if (newValue == 'ENG') vd_fL.type = vdConst.vd_rb;
            else if (newValue == 'ARC') vd_fL.type = vdConst.vd_st;
            else if (newValue == 'FRAC') vd_fL.type = vdConst.vd_rk;
            else vd_fL.type = vdConst.vd_kf;
        }
    });
    Object.defineProperty(vd_U, 'PREC', {
        get: function() {
            return String(vd_fL.precision);
        },
        set: function(newValue) {
            vd_fL.precision = Number(newValue);
        }
    });
    Object.defineProperty(vd_U, 'SZEROS', {
        get: function() {
            return vd_fL.vd_by == vdConst.vd_ri ? '0': '1';
        },
        set: function(newValue) {
            vd_fL.vd_by = Number(newValue) != 0 ? (vdConst.vd_Ip | vdConst.vd_tt) : vdConst.vd_ri;
        }
    });
    Object.defineProperty(vd_U, 'LINECOLOR', {
        get: function() {
            return vdConst.colorToString(vd_nD);
        },
        set: function(newValue) {
            vd_nD = vdConst.colorFromString(newValue);
        }
    });
    Object.defineProperty(vd_U, 'EXTCOLOR', {
        get: function() {
            return vdConst.colorToString(vd_rS);
        },
        set: function(newValue) {
            vd_rS = vdConst.colorFromString(newValue);
        }
    });
    Object.defineProperty(vd_U, 'TEXTCOLOR', {
        get: function() {
            return vdConst.colorToString(vd_rp);
        },
        set: function(newValue) {
            vd_rp = vdConst.colorFromString(newValue);
        }
    });
    var vd_DY = vdConst.vd_IF;
    var vd_xJ = vdConst.vd_tp;
    var vd_jX = 1.0;
    function vd_Kk() {
        return vd_kZ;
    };
    function vd_xh() {
        return vd_kZ;
    };
    function vd_xo() {
        return vd_kZ * 0.0625;
    };
    function vd_Ka() {
        return vd_kZ * 0.09;
    };
    var vd_Io = 1.0;
    var vd_zQ = 0.0;
    function vd_FA(vdcanvas, vd_i) {
        var entities = [];
        var blockref = vdcanvas.AddBlockSymbol(vd_oo, [0, 0, 0], 1.0, 0.0, false, {});
        if (blockref) {
            entities.push(blockref);
        } else if (vd_oo.toLowerCase() == "arrow") {
            var hp = vd_i.ActiveHatchProperties;
            vdcanvas.SetActiveHatchProperties(vdcanvas.createNewHatchProperties('solid'));
            entities.push(vdcanvas.AddPolyline([[0, 0], [ - 2.0, -0.4], [ - 2.0, 0.4], [0, 0]], false, {}));
            vdcanvas.SetActiveHatchProperties(hp);
        } else if (vd_oo.toLowerCase() == "tick") {
            entities.push(vdcanvas.AddLine([ - 1, 0, 0], [1, 0, 0], false, {}));
            entities.push(vdcanvas.AddLine([ - 1, -1, 0], [1, 1, 0], false, {}));
        } else {}
        return entities;
    };
    function vd_Gq() {
        var p1 = vdgeo.newpoint(0, 0, 0);
        var p2 = vdgeo.newpoint(0, 0, 0);
        var p3 = vdgeo.newpoint(0, 0, 0);
        var p4 = vdgeo.newpoint(0, 0, 0);
        var tmpP = vdgeo.newpoint(0, 0, 0);
        var length = 0.0;
        var rotation = 0.0;
        switch (vd_hd) {
        case vdConst.vd_kP:
            length = vdgeo.Distance3D(vd_dV, vd_hv);
            break;
        case vdConst.vd_lq:
        case vdConst.vd_sS:
            if (vd_hd == vdConst.vd_lq) rotation = vdgeo.HALF_PI;
            p4 = vdgeo.pointPolar(vd_dV, rotation + vdgeo.HALF_PI, 1.0);
            p3 = vdgeo.pointPolar(vd_eg, rotation, 1.0);
            if (vdgeo.vd_kk(vd_dV, p4, vd_eg, p3, vdgeo.DefaultVectorEquality, p3) != 1) break;
            tmpP = vdgeo.pointPolar(vd_hv, rotation + vdgeo.HALF_PI, 1.0);
            p4 = vdgeo.pointPolar(vd_eg, rotation, 1.0);
            if (vdgeo.vd_kk(vd_eg, p4, vd_hv, tmpP, vdgeo.DefaultVectorEquality, p4) == 0) {
                vdgeo.vd_cM(p4, p3);
            }
            length = vdgeo.Distance2D(p3, p4);
            break;
        default:
            break;
        }
        return length;
    };
    function vd_xW(vd_Lv) {
        var str = vd_Lv;
        if (str == "" || str == "<>") {
            var length = vd_Gq();
            length *= vd_Io;
            var vd_Au = "";
            var vd_rV = "";
            var post = vd_qD;
            var pos = post.indexOf("<>");
            if (pos == -1) {
                vd_rV = post;
            } else {
                vd_Au = post.substr(0, pos);
                vd_rV = post.substr(pos + 2);
            }
            str = vd_fL.vd_El(length);
            str = vd_Au + str + vd_rV;
        } else {
            var vd_Ay = vd_xW(vd_Ay);
            str = str.Replace("<>", vd_Ay);
        }
        return str;
    };
    function vd_LW(vdcanvas, vd_i) {
        var p11, p22, lp1, p1, p2, rotation;
        switch (vd_hd) {
        case vdConst.vd_kP:
            return vd_zu(vdcanvas, vd_i, vd_dV, vd_hv, vd_dV, vd_hv, vd_eg);
        case vdConst.vd_lq:
        case vdConst.vd_sS:
            rotation = 0.0;
            if (vd_hd == vdConst.vd_lq) rotation = vdgeo.HALF_PI;
            p11 = vdgeo.newpoint();
            p22 = vdgeo.newpoint();
            lp1 = vdgeo.pointPolar(vd_eg, rotation, 1.0);
            p1 = vdgeo.pointPolar(vd_dV, rotation + vdgeo.HALF_PI, 1.0);
            p2 = vdgeo.pointPolar(vd_hv, rotation + vdgeo.HALF_PI, 1.0);
            vdgeo.vd_cM(p11, vd_dV);
            vdgeo.vd_cM(p22, vd_hv);
            vdgeo.vd_kk(vd_eg, lp1, vd_dV, p1, vdgeo.DefaultVectorEquality, p11);
            vdgeo.vd_kk(vd_eg, lp1, vd_hv, p2, vdgeo.DefaultVectorEquality, p22);
            return vd_zu(vdcanvas, vd_i, p11, p22, vd_dV, vd_hv, vd_eg);
        default:
            return null;
        }
        return null;
    };
    function vd_zu(vdcanvas, vd_i, vd_iN, vd_rB, vd_Mq, vd_KR, vd_ss) {
        var line = null;
        var mat = vdgeo.vd_s();
        var angle = vdgeo.GetAngle(vd_iN, vd_rB);
        vdgeo.vd_ae(mat, -vd_iN[X], -vd_iN[Y], -vd_iN[Z]);
        vdgeo.vd_ag(mat, -angle);
        var p1 = vdgeo.vd_Z(mat, vd_iN);
        var p2 = vdgeo.vd_Z(mat, vd_rB);
        var lpos = vdgeo.vd_Z(mat, vd_ss);
        var vd_pU = vdgeo.vd_Z(mat, vd_Mq);
        var vd_oG = vdgeo.vd_Z(mat, vd_KR);
        var offset = lpos[Y] - p1[Y];
        var p11 = vdgeo.newpoint(p1[X], p1[Y], p1[Z]);
        p11[Y] += offset;
        var p22 = vdgeo.newpoint(p2[X], p2[Y], p2[Z]);
        p22[Y] += offset;
        var vd_sM = 1.0;
        var vd_sw = 1.0;
        if (lpos[Y] - vd_pU[Y] < 0.0) vd_sM = -1.0;
        if (lpos[Y] - vd_oG[Y] < 0.0) vd_sw = -1.0;
        var vd_uI = vdgeo.newpoint(vd_pU[X], vd_pU[Y] + vd_xo() * vd_sM * vd_jX, vd_pU[Z]);
        var vd_tP = vdgeo.newpoint(p11[X], p11[Y] + vd_xh() * vd_sM * vd_jX, p11[Z]);
        var vd_vc = vdgeo.newpoint(vd_oG[X], vd_oG[Y] + vd_xo() * vd_sw * vd_jX, vd_oG[Z]);
        var vd_tS = vdgeo.newpoint(p22[X], p22[Y] + vd_xh() * vd_sw * vd_jX, p22[Z]);
        var vd_lZ = 0.0;
        var vd_xs = vdgeo.FixAngle(angle - (2 * vdgeo.PI - vd_zQ));
        vd_lZ = (vd_xs > vdgeo.HALF_PI && vd_xs <= (3.000001 * vdgeo.HALF_PI)) ? vd_lZ = vdgeo.PI: 0.0;
        if (vd_DY == vdConst.vd_Fi) vd_lZ = -(angle + vd_zQ);
        var tp = vdgeo.MidPoint(p11, p22);
        if (vd_xJ == vdConst.vd_tp) tp = vdgeo.pointPolar(tp, vd_lZ + vdgeo.HALF_PI, vd_Ka() * vd_jX);
        vdgeo.vd_kW(mat);
        p11 = vdgeo.vd_Z(mat, p11);
        p22 = vdgeo.vd_Z(mat, p22);
        tp = vdgeo.vd_Z(mat, tp);
        vd_uI = vdgeo.vd_Z(mat, vd_uI);
        vd_tP = vdgeo.vd_Z(mat, vd_tP);
        vd_vc = vdgeo.vd_Z(mat, vd_vc);
        vd_tS = vdgeo.vd_Z(mat, vd_tS);
        var vd_mK = vdConst.VdConstVerJust_VdTextVerCen;
        if (vd_xJ == vdConst.vd_tp) vd_mK = vdConst.VdConstVerJust_VdTextVerBottom;
        var vd_lc = [];
        var vd_vb = vdcanvas.GetActivePenColor();
        if (vd_nD) vdcanvas.SetActivePenColor(vd_nD);
        var vd_Il = vdcanvas.AddLine(p11, p22, false, {});
        vd_lc.push(vd_Il);
        var block = vd_FA(vdcanvas, vd_i);
        if (block.length > 0) {
            var scale = vd_Kk() * vd_jX;
            mat = vdgeo.vd_s();
            vdgeo.vd_ay(mat, scale, scale, scale);
            vdgeo.vd_ag(mat, vdgeo.GetAngle(p22, p11));
            vdgeo.vd_ae(mat, p11[X], p11[Y], p11[Z]);
            for (var i = 0; i < block.length; i++) {
                var ent = vdConst.cloneEntity(block[i]);
                vd_k.vd_iz(mat, ent, vdcanvas);
                vd_lc.push(ent);
            }
            mat = vdgeo.vd_s();
            vdgeo.vd_ay(mat, scale, scale, scale);
            vdgeo.vd_ag(mat, vdgeo.GetAngle(p11, p22));
            vdgeo.vd_ae(mat, p22[X], p22[Y], p22[Z]);
            for (var i = 0; i < block.length; i++) {
                var ent = vdConst.cloneEntity(block[i]);
                vd_k.vd_iz(mat, ent, vdcanvas);
                vd_lc.push(ent);
            }
        }
        vdcanvas.SetActivePenColor(vd_vb);
        if (vd_rS) vdcanvas.SetActivePenColor(vd_rS);
        var vd_Ht = vdcanvas.AddLine(vd_uI, vd_tP, false, {});
        var vd_Hw = vdcanvas.AddLine(vd_vc, vd_tS, false, {});
        vd_lc.push(vd_Ht);
        vd_lc.push(vd_Hw);
        vdcanvas.SetActivePenColor(vd_vb);
        if (vd_rp) vdcanvas.SetActivePenColor(vd_rp);
        var text = vdcanvas.AddText(vd_xW(""), vd_kZ * vd_jX, tp, vdConst.VdConstHorJust_VdTextHorCenter, vd_mK, vd_lZ + angle, false, {});
        vd_lc.push(text);
        vdcanvas.SetActivePenColor(vd_vb);
        return vd_lc;
    };
    this.vd_ut = function(vdcanvas, vd_iN, vd_rB, vd_ss, vd_Lb, entities) {
        var vd_i = vdcanvas.GetDocument();
        vd_dV = vd_iN;
        vd_hv = vd_rB;
        vd_eg = vd_ss;
        if (!vd_eg) vd_eg = vd_dV;
        vd_qD = vd_Lb;
        if (!vd_qD) vd_qD = "";
        var ents = vd_LW(vdcanvas, vd_i);
        if (!ents || ents.length == 0) return null;
        var vd_E = {
            _t: vdConst.vdDimension_code,
            Explode: {
                Items: []
            }
        };
        vdcanvas.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E.Explode.Items = ents;
        if (entities) vdcanvas.vd_bl(entities, vd_E);
        else vdcanvas.vd_bl(vdcanvas.GetActiveLayout().Entities, vd_E);
        return vd_E;
    };
    return this;
};
function vd_bm() {
    var vd_U = this;
    var vd_oj = 1200;
    var vd_md = 5;
    var vd_pK = 150;
    var vd_Ek = 250;
    var vd_R = null;
    var vd_cX = new vd_Jy();
    this.vd_cV = new vd_Kz(vd_U);
    this.canvas = null;
    this.PickSize = 8;
    this.IgnoreLockLayers = false;
    this.scriptCommand = new vd_xG(this);
    var vd_AF = 0;
    Object.defineProperty(vd_U, 'ActionScaleMode', {
        get: function() {
            return vd_AF;
        },
        set: function(newValue) {
            vd_AF = newValue;
        }
    });
    var vd_Cw = 1.2;
    Object.defineProperty(vd_U, 'MouseWheelZoomScale', {
        get: function() {
            return vd_Cw;
        },
        set: function(newValue) {
            vd_Cw = newValue;
        }
    });
    Object.defineProperty(vd_U, 'GroupsManager', {
        get: function() {
            if (vd_aR == null) return null;
            return vd_aR.vd_CF;
        }
    });
    this.SetImageInterpolationMode = function(mode) {
        vd_R.vd_Y.vd_lP = mode;
    };
    this.GetImageInterpolationMode = function() {
        return vd_R.vd_Y.vd_lP;
    };
    this.SetEnableSelection = function(bval) {
        vd_R.vd_aG = bval;
    };
    this.GetEnableSelection = function() {
        return vd_R.vd_aG;
    };
    this.SetGrayScale = function(vd_FW) {
        vd_R.vd_lS = vd_FW;
    };
    this.GetGrayScale = function() {
        return vd_R.vd_lS;
    };
    this.GetDefaultTimeOutMilliseconds = function() {
        return vd_oj;
    };
    this.SetDefaultTimeOutMilliseconds = function(timeout) {
        vd_oj = timeout;
    };
    this.Fig_codeToString = function(code) {
        switch (code) {
        case vdConst.vdLine_code:
            return "vdLine";
        case vdConst.vdPolyline_code:
            return "vdPolyline";
        case vdConst.vdText_code:
            return "vdText";
        case vdConst.vdRect_code:
            return "vdRect";
        case vdConst.vdCircle_code:
            return "vdCircle";
        case vdConst.vdEllipse_code:
            return "vdEllipse";
        case vdConst.vdArc_code:
            return "vdArc";
        case vdConst.vdImage_code:
            return "vdImage";
        case vdConst.vdInsert_code:
            return "vdInsert";
        case vdConst.vd3DFace_code:
            return "vd3DFace";
        case vdConst.vdPolyface_code:
            return "vdPolyface";
        case vdConst.vdAttrib_code:
            return "vdAttrib";
        case vdConst.vdAttribDef_code:
            return "vdAttribDef";
        case vdConst.vdInfinityLine_code:
            return "vdInfinityLine";
        case vdConst.vdPoint_code:
            return "vdPoint";
        case vdConst.vdViewport_code:
            return "vdViewport";
        case vdConst.vdPolyhatch_code:
            return "vdPolyhatch";
        case vdConst.vdDimension_code:
            return "vdDimension";
        case vdConst.vdMText_code:
            return "vdMText";
        case vdConst.vdMultiline_code:
            return "vdMultiline";
        case vdConst.vdGroundSurface_code:
            return "vdGroundSurface";
        case vdConst.vdLeader_code:
            return "vdLeader";
        case vdConst.vd_NT:
            return "vd_HF";
        default:
            {
                return "vdUnknown";
            }
        }
    };
    function vd_Jn(fig, render) {
        if (fig.ps === undefined || fig.ps.vd_Aq === true) return undefined;
        if (fig.ps.pw === 0.0) return render.vd_dK(0);
        if (fig.ps.vd_nr === false) {
            var v = vdgeo.newpoint(0, 0, 0);
            vdgeo.vd_me(render.vd_aS(), 0, fig.ps.pw, 0, v, false);
            var len = vdgeo.vd_ld(v);
            return render.vd_dK(len / (render.GetPixelSize() * render.vd_iC));
        } else return render.vd_dK((fig.ps.pw / 100.0) * 96 / vdgeo.INCH_MM);
    };
    function vd_Im(fig, render) {
        if (fig.ps !== undefined) {
            if (fig.ps.vd_gg === 0) return render.vd_aZ(fig.ps.color);
            if (fig.ps.vd_gg === 2) return render.vd_aZ(render.vd_kn());
        }
        return undefined;
    };
    function vd_JE(fig, render) {
        if (!fig.ps || fig.ps.vd_gg === 1) return 0;
        else return render.vd_eq(fig.ps.MaterialMatrix);
    };
    function vd_Jf(fig, render) {
        if (!fig.ps || fig.ps.vd_gg === 1) return 0;
        else return render.vd_ho(fig.ps.MaterialImage);
    };
    function vd_HL(fig, render) {
        if (!fig.ps || fig.ps.vd_sO) return undefined;
        return render.vd_wW(fig.ps.lt);
    };
    function vd_HO(fig, render) {
        if (fig.ps) return render.vd_wL(fig.ps.ltscale);
        return 1.0;
    };
    this.UpdateLayout = function(layout, vd_GF) {
        if (!layout) layout = vd_U.GetActiveLayout();
        if (!layout) return;
        layout.BoundingBox = undefined;
        if (!layout.Entities || !vd_GF) return;
        for (var k = 0; k < layout.Entities.Items.length; k++) {
            vd_U.UpdateFig(vd_U.GetEntityItem(layout.Entities.Items[k]));
        }
    };
    this.UpdateFig = function(vd_aQ) {
        var k = 0;
        if (vd_aQ.LayerRef === undefined) return;
        vd_aQ.selected = undefined;
        vd_aQ.ps = undefined;
        vd_aQ.LayerRef = undefined;
        vd_aQ.LineTypeRef = undefined;
        vd_aQ.EcsMatrix = undefined;
        if (vd_aQ._t !== vdConst.vdViewport_code) vd_aQ.BoundingBox = undefined;
        vd_u.update(vd_aQ);
        if (vd_aQ.SamplePoints != undefined) vd_aQ.SamplePoints = undefined;
        if (vd_aQ.vd_fc != undefined) vd_aQ.vd_fc = undefined;
        if (vd_aQ.StyleRef != undefined) vd_aQ.StyleRef = undefined;
        if (vd_aQ.tb != undefined) {
            vd_aQ.tb = undefined;
            vd_aQ.DiplayString = undefined;
            vd_aQ.testlines = undefined;
            vd_aQ.uwidths = undefined;
            vd_aQ.owidths = undefined;
        }
        if (vd_aQ.pointSegments != undefined) vd_aQ.pointSegments = undefined;
        if (vd_aQ.BlockRef != undefined) vd_aQ.BlockRef = undefined;
        vd_aQ.Normals = undefined;
        vd_aQ.UVS = undefined;
        if (vd_aQ.ImageClipPts) vd_aQ.ImageClipPts = undefined;
        if (vd_aQ.ImageClipUVS) vd_aQ.ImageClipUVS = undefined;
        if (vd_aQ._t == vdConst.vdPolyhatch_code) {
            if (vd_aQ.Curves) {
                for (k = 0; k < vd_aQ.Curves.Items.length; k++) {
                    vd_aQ.Curves.Items[k].UVS = undefined;
                }
            }
        }
        if (vd_aQ.Attributes && vd_aQ.Attributes.Items) {
            for (k = 0; k < vd_aQ.Attributes.Items.length; k++) vd_U.UpdateFig(vd_aQ.Attributes.Items[k]);
        }
        if (vd_aQ.Explode && vd_aQ.Explode.Items) {
            for (k = 0; k < vd_aQ.Explode.Items.length; k++) vd_U.UpdateFig(vd_aQ.Explode.Items[k]);
        }
    };
    this.GetEntityItem = function(item) {
        if (vd_aR == null) return null;
        return vd_aR.vd_HP(item);
    };
    this.GetEntityLength = function(entity) {
        var vd_aK;
        if (entity._t == vdConst.vdPolyline_code) {
            var closed = entity.Flag === 1;
            if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD) vd_aK = entity.VertexList.Items;
            else if (entity.SamplePoints) vd_aK = entity.SamplePoints;
            else {
                if (entity.SPlineFlag == vdConst.SplineFlagFITTING) vd_aK = vdgeo.vd_sf(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1, entity.StartTangent, entity.EndTangent);
                else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS) vd_aK = vdgeo.vdgeo.vd_rX(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Weights, entity.Knots, entity.Flag === 1);
                else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC) vd_aK = vdgeo.vd_xb(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1);
            }
            return vdgeo.vd_BZ(vd_aK, closed);
        } else if (entity._t == vdConst.vdLine_code) {
            return vdgeo.Distance3D(entity.StartPoint, entity.EndPoint);
        } else if (entity._t == vdConst.vdRect_code) {
            return Math.abs(2.0 * entity.Width) + Math.abs(2.0 * entity.Height);
        } else if (entity._t == vdConst.vdCircle_code) {
            return Math.abs(vdgeo.PI * 2.0 * entity.Radius);
        } else if (entity._t == vdConst.vdArc_code) {
            return Math.abs(vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) * entity.Radius);
        } else if (entity._t == vdConst.vdEllipse_code) {
            var da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
            if (vdgeo.AreEqual(da, 0, vdgeo.DefaultAngularEquality) || vdgeo.AreEqual(da, vdgeo.VD_TWOPI, vdgeo.DefaultAngularEquality)) {
                var k = Math.Sqrt(1 - Math.pow((entity.MinorLength / entity.MajorLength), 2));
                k = Math.pow(k, 2);
                var sum = 0;
                var term = 0;
                var above = 0;
                var below = 0;
                sum = 1;
                term = 1;
                above = 1;
                below = 2;
                for (var i = 1; i <= 100; i++) {
                    term *= above / below;
                    sum -= Math.pow(k, i) * Math.pow(term, 2) / above;
                    above += 2;
                    below += 2;
                }
                sum *= 0.5 * vdgeo.PI;
                return a * sum;
            } else {
                vd_aK = entity.SamplePoints;
                if (!vd_aK) {
                    if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
                    if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
                    var da = vdgeo.FixAngle(entity.EndAngle) - vdgeo.FixAngle(entity.StartAngle);
                    var vd_fg = vdgeo.vd_sC(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.MajorLength, da);
                    vd_aK = vdgeo.vd_rO(vd_fg, entity.MajorLength, entity.MinorLength, entity.StartAngle, entity.EndAngle);
                }
                return vdgeo.vd_BZ(vd_aK, false);
            }
        } else return 0.0;
    };
    this.MeasureCurve = function(entity, length) {
        var vd_aK;
        if (entity._t == vdConst.vdPolyline_code) {
            var closed = entity.Flag === 1;
            if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD) vd_aK = entity.VertexList.Items;
            else if (entity.SamplePoints) vd_aK = entity.SamplePoints;
            else {
                if (entity.SPlineFlag == vdConst.SplineFlagFITTING) vd_aK = vdgeo.vd_sf(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1, entity.StartTangent, entity.EndTangent);
                else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS) vd_aK = vdgeo.vdgeo.vd_rX(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Weights, entity.Knots, entity.Flag === 1);
                else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC) vd_aK = vdgeo.vd_xb(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1);
            }
            return vdgeo.vd_jH(vd_aK, length, closed);
        } else if (entity._t == vdConst.vdLine_code) {
            return vdgeo.vd_jH([entity.StartPoint, entity.EndPoint], length, false);
        } else if (entity._t == vdConst.vdRect_code) {
            var vd_xA = vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation, entity.Width);
            return vdgeo.vd_jH([entity.InsertionPoint, vd_xA, vdgeo.pointPolar(vd_xA, entity.Rotation + vdgeo.HALF_PI, entity.Height), vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation + vdgeo.HALF_PI, entity.Height)], length, true);
        } else if (entity._t == vdConst.vdCircle_code) {
            var vd_hA = vdgeo.Arc2Bulge(entity.Radius, vdgeo.PI);
            return vdgeo.vd_jH([vdgeo.pointPolar(entity.Center, 0.0, entity.Radius).concat(vd_hA), vdgeo.pointPolar(entity.Center, vdgeo.PI, entity.Radius).concat(vd_hA)], length, true);
        } else if (entity._t == vdConst.vdArc_code) {
            var vd_hA = vdgeo.Arc2Bulge(entity.Radius, vdgeo.FixAngle(entity.EndAngle - entity.StartAngle));
            return vdgeo.vd_jH([vdgeo.pointPolar(entity.Center, entity.StartAngle, entity.Radius).concat(vd_hA), vdgeo.pointPolar(entity.Center, entity.EndAngle, entity.Radius).concat(vd_hA)], length, false);
        } else if (entity._t == vdConst.vdEllipse_code) {
            var da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
            vd_aK = entity.SamplePoints;
            if (!vd_aK) {
                if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
                if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
                var da = vdgeo.FixAngle(entity.EndAngle) - vdgeo.FixAngle(entity.StartAngle);
                var vd_fg = vdgeo.vd_sC(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.MajorLength, da);
                vd_aK = vdgeo.vd_rO(vd_fg, entity.MajorLength, entity.MinorLength, entity.StartAngle, entity.EndAngle);
            }
            if (!entity.EcsMatrix) {
                var vd_av = vdgeo.newpoint(0, 0, 1);
                var vd_bI = vdgeo.newpoint(0, 0, 0);
                if (entity.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(entity.ExtrusionVector[X], entity.ExtrusionVector[Y], entity.ExtrusionVector[Z]);
                if (entity.Center != undefined) vd_bI = vdgeo.newpoint(entity.Center[X], entity.Center[Y], entity.Center[Z]);
                entity.EcsMatrix = new vdgeo.vd_s();
                if (entity.MajorAngle != undefined) vdgeo.vd_ag(entity.EcsMatrix, entity.MajorAngle);
                vdgeo.vd_cx(entity.EcsMatrix, vd_av);
                vdgeo.vd_ae(entity.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
            }
            var ret = vdgeo.vd_jH(vd_aK, length, false);
            return vdgeo.vd_hz(entity.EcsMatrix, ret);
        } else return [];
    };
    this.GetEntityArea = function(entity) {
        var render = vd_R;
        var vd_aK;
        if (entity._t == vdConst.vdPolyline_code) {
            if (!entity.SPlineFlag || entity.SPlineFlag == vdConst.SplineFlagSTANDARD) return Math.abs(vdgeo.vd_Mk(entity.VertexList.Items));
            if (entity.SamplePoints) vd_aK = entity.SamplePoints;
            else {
                if (entity.SPlineFlag == vdConst.SplineFlagFITTING) vd_aK = vdgeo.vd_sf(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1, entity.StartTangent, entity.EndTangent);
                else if (entity.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS) vd_aK = vdgeo.vdgeo.vd_rX(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Weights, entity.Knots, entity.Flag === 1);
                else if (entity.SPlineFlag == vdConst.SplineFlagQUADRATIC) vd_aK = vdgeo.vd_xb(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.VertexList.Items, entity.Flag === 1);
            }
        } else if (entity._t == vdConst.vdRect_code) {
            return Math.abs(entity.Width * entity.Height);
        } else if (entity._t == vdConst.vdCircle_code) {
            return Math.abs(vdgeo.PI * entity.Radius * entity.Radius);
        } else if (entity._t == vdConst.vdEllipse_code) {
            if (entity.StartAngle == undefined) entity.StartAngle = 0.0;
            if (entity.EndAngle == undefined) entity.EndAngle = 0.0;
            var da = vdgeo.FixAngle(entity.EndAngle - entity.StartAngle);
            if (vdgeo.AreEqual(da, 0, vdgeo.DefaultAngularEquality) || vdgeo.AreEqual(da, vdgeo.VD_TWOPI, vdgeo.DefaultAngularEquality)) {
                return entity.MajorLength * entity.MinorLength * vdgeo.PI;
            } else {
                vd_aK = entity.SamplePoints;
                if (!vd_aK) {
                    var vd_fg = vdgeo.vd_sC(vdgeo.CURVERESOLUTION, render.GetPixelSize(), entity.MajorLength, da);
                    vd_aK = vdgeo.vd_rO(vd_fg, entity.MajorLength, entity.MinorLength, entity.StartAngle, entity.EndAngle);
                }
            }
        } else if (entity._t == vdConst.vdArc_code) {
            return Math.abs((vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) / 2.0) * entity.Radius * entity.Radius);
        } else return - 1;
        return Math.abs(vdgeo.GetPointsArea(vd_aK));
    };
    this.GetDictItem = function(vd_bG, vd_cN) {
        if (vd_aR == null) return null;
        return vd_aR.vd_gW(vd_bG, vd_cN);
    };
    this.ChangeOrder = function(entity, vd_CT, vd_bG) {
        if (!entity || !entity.HandleId) return false;
        if (!vd_bG) vd_bG = vd_U.GetActiveLayout().Entities;
        if (!vd_bG || !vd_bG.Items || vd_bG.Items.length == 0) return false;
        var vd_cN = 'h_' + entity.HandleId.toString();
        var pos = vd_bG.Items.indexOf(vd_cN);
        if (pos < 0) return false;
        vd_bG.Items.splice(pos, 1);
        if (vd_CT) vd_bG.Items.splice(0, 0, vd_cN);
        else vd_bG.Items.push(vd_cN);
        return true;
    };
    function vd_EG(fig, vd_i, render) {
        if (fig.ps !== undefined) return fig.ps;
        if (!fig.PenColor) fig.PenColor = {
            ColorFlag: 192
        };
        if (fig.LayerRef == undefined) {
            fig.LayerRef = vd_U.GetDictItem(vd_i.Layers, fig.Layer);
            if (!fig.LayerRef) fig.LayerRef = vd_U.FindLayer("0");
        }
        if (fig.LineTypeRef == undefined) {
            fig.LineTypeRef = vd_U.GetDictItem(vd_i.LineTypes, fig.LineType);
            if (!fig.LineTypeRef) fig.LineTypeRef = vd_U.FindLineType("BYLAYER");
        }
        if (render.vd_cF() != vdConst.vd_nd) return null;
        fig.ps = {};
        fig.ps.vd_nr = false;
        fig.ps.pw = 0;
        fig.ps.vd_Aq = false;
        fig.ps.lt = null;
        fig.ps.vd_sO = false;
        fig.ps.ltscale = 1;
        fig.ps.color = [255, 255, 255, 255];
        fig.ps.MaterialImage = null;
        fig.ps.MaterialMatrix = null;
        fig.ps.vd_gg = 0;
        fig.ps.vd_Oo = undefined;
        var afig = render.vd_ot();
        var lay = fig.LayerRef;
        var lt = fig.LineTypeRef;
        var alay = null;
        if (afig != null) {
            alay = vd_U.GetDictItem(vd_i.Layers, afig.Layer);
            if (!alay) alay = vd_U.FindLayer("0");
        }
        if (fig.LineTypeScale == undefined) fig.LineTypeScale = 1.0;
        if (fig.PenWidth > 0.0) {
            fig.ps.vd_nr = false;
            fig.ps.pw = fig.PenWidth;
        } else {
            var lw = fig.LineWeight;
            if (lw == undefined) lw = vdConst.LW_BYLAYER;
            if (vd_i.LineWeightDisplay == false || lw === 0) {
                fig.ps.vd_nr = false;
                fig.ps.pw = 0.0;
            } else {
                if (lw === vdConst.LW_BYLAYER && lay != null) {
                    if (lay.Name === '0' && afig != null && alay != null) {
                        if (!vd_i.BlockStdLayerOper || !(vd_i.BlockStdLayerOper & vdConst.vd_Ge)) lw = alay.LineWeight;
                        else lw = vdConst.LW_BYBLOCK;
                    } else {
                        lw = lay.LineWeight;
                    }
                }
                if (lw == undefined) lw = vdConst.LW_BYLAYER;
                if (lw == vdConst.LW_DOCUMENTDEFAULT) lw = vd_i.LineWeight;
                if (lw != vdConst.LW_BYBLOCK) {
                    if (lw <= 0) {
                        fig.ps.vd_nr = false;
                        fig.ps.pw = 0.0;
                    } else {
                        fig.ps.vd_nr = true;
                        fig.ps.pw = lw;
                    }
                } else {
                    fig.ps.vd_Aq = true;
                }
            }
        }
        if (lt) {
            if (lay && lt.Name == 'BYLAYER') {
                var vd_jE = null;
                if (afig != null && afig._t === vdConst.vdInsert_code && lay.Name === '0') {
                    if ((!vd_i.BlockStdLayerOper || !(vd_i.BlockStdLayerOper & vdConst.vd_Ff)) && alay) vd_jE = vd_U.GetDictItem(vd_i.LineTypes, alay.LineType);
                } else {
                    vd_jE = vd_U.GetDictItem(vd_i.LineTypes, lay.LineType);
                }
                if (vd_jE) fig.ps.lt = vd_jE;
                if (!vd_jE || vd_jE.Name == 'BYLAYER' || vd_jE.Name == 'BYBLOCK') fig.ps.vd_sO = true;
                fig.ps.ltscale = fig.LineTypeScale * vd_i.LineTypeScale;
            } else if (lt.Name != 'BYBLOCK') {
                fig.ps.lt = lt;
                fig.ps.ltscale = fig.LineTypeScale * vd_i.LineTypeScale;
            } else {
                fig.ps.vd_sO = true;
            }
        }
        if (fig.PenColor.SystemColor != undefined) {
            fig.ps.color = fig.PenColor.SystemColor;
            fig.ps.MaterialImage = vd_U.GetDictItem(vd_i.Images, fig.PenColor.MaterialImage);
            if (fig.ps.MaterialImage != null) fig.ps.MaterialMatrix = fig.PenColor.MaterialMatrix;
        } else if (fig.PenColor.ColorFlag === vdConst.COLOR_BYLAYER) {
            if (afig != null && afig._t === vdConst.vdInsert_code && lay != null && lay.Name === '0') {
                if (!vd_i.BlockStdLayerOper || !(vd_i.BlockStdLayerOper & vdConst.vd_Fc)) lay = alay;
                else {
                    fig.ps.vd_gg = 1;
                }
            }
            if (fig.ps.vd_gg != 1) {
                if (lay && lay.PenColor.ColorIndex != undefined) {
                    if (lay.PenColor.ColorIndex == 6) fig.ps.vd_gg = 2;
                    else fig.ps.color = render.vd_eU(lay.PenColor.ColorIndex);
                    fig.ps.MaterialImage = render.palette.Items[lay.PenColor.ColorIndex].MaterialImageRef;
                    if (fig.ps.MaterialImage != null) fig.ps.MaterialMatrix = render.palette.Items[lay.PenColor.ColorIndex].MaterialMatrix;
                } else if (lay && lay.PenColor.SystemColor != undefined) {
                    fig.ps.color = lay.PenColor.SystemColor;
                    fig.ps.MaterialImage = vd_U.GetDictItem(vd_i.Images, lay.PenColor.MaterialImage);
                    if (fig.ps.MaterialImage != null) fig.ps.MaterialMatrix = lay.PenColor.MaterialMatrix;
                }
            }
        } else if (fig.PenColor.ColorIndex != undefined) {
            if (fig.PenColor.ColorIndex == 6) fig.ps.vd_gg = 2;
            else fig.ps.color = render.vd_eU(fig.PenColor.ColorIndex);
            fig.ps.MaterialImage = render.palette.Items[fig.PenColor.ColorIndex].MaterialImageRef;
            if (fig.ps.MaterialImage != null) fig.ps.MaterialMatrix = render.palette.Items[fig.PenColor.ColorIndex].MaterialMatrix;
        } else {
            fig.ps.vd_gg = 1;
        }
        if (fig.TransparencyMethod === vdConst.TransparencyMethod_ByLayer && lay != null) {
            var vd_pM = undefined;
            if (lay.PenColor.ColorIndex != undefined) {
                vd_pM = render.vd_eU(lay.PenColor.ColorIndex);
            } else if (lay.PenColor.SystemColor != undefined) {
                vd_pM = lay.PenColor.SystemColor;
            }
            if (vd_pM != undefined) fig.ps.color[3] = vd_pM[3];
        } else if (fig.TransparencyMethod === vdConst.TransparencyMethod_ByBlock) fig.ps.color[3] = undefined;
        if (fig.HatchProperties != undefined) {
            fig.ps.vd_C = {
                vd_br: undefined,
                color: undefined,
                vd_vF: false,
                vd_tY: false,
                vd_cA: 255,
                angle: 0,
                scale: 1,
                pattern: null,
                origin: vdgeo.newpoint(0, 0, 0),
                IsDpi: false,
                vd_qU: false,
                vd_ex: 0,
                vd_ie: undefined,
                gradientAngle: 0
            };
            if (fig.HatchProperties.HatchPatternRef != undefined) fig.ps.vd_C.pattern = fig.HatchProperties.HatchPatternRef;
            else if (fig.HatchProperties.HatchPattern != undefined) fig.ps.vd_C.pattern = vd_U.GetDictItem(vd_i.HatchPatterns, fig.HatchProperties.HatchPattern);
            if (fig.ps.vd_C.pattern != null) {
                if (fig.ps.vd_C.pattern == null || fig.ps.vd_C.pattern.PatternLines == undefined || fig.ps.vd_C.pattern.PatternLines.Items.length == 0 || (fig.HatchProperties.IsDpi != undefined && fig.HatchProperties.IsDpi != true && fig.ps.vd_C.pattern.PatternLines.Items.length == 1 && fig.ps.vd_C.pattern.PatternLines.Items[0].Dashes != undefined && fig.ps.vd_C.pattern.PatternLines.Items[0].Dashes.Items.length == 0)) fig.ps.vd_C.pattern = null;
                if (fig.ps.vd_C.pattern != null && fig.HatchProperties.IsDpi != undefined && fig.HatchProperties.IsDpi != true && fig.ps.vd_C.pattern.PatternLines.Items[0].Dashes != undefined && fig.ps.vd_C.pattern.PatternLines.Items[0].Dashes.Items.length == 1 && fig.ps.vd_C.pattern.PatternLines.Items[0].Dashes.Items[0] < 0.0) fig.ps.vd_C.vd_qU = true;
                if (fig.HatchProperties.IsDpi != undefined) fig.ps.vd_C.IsDpi = fig.HatchProperties.IsDpi;
                if (fig.HatchProperties.HatchAngle != undefined) fig.ps.vd_C.angle = fig.HatchProperties.HatchAngle;
                if (fig.HatchProperties.HatchScale != undefined) fig.ps.vd_C.scale = fig.HatchProperties.HatchScale;
                if (fig.HatchProperties.HatchOrigin != undefined) fig.ps.vd_C.origin = fig.HatchProperties.HatchOrigin;
                fig.ps.vd_C.vd_br = undefined;
                if (fig.HatchProperties.FillBkColor != undefined) {
                    if (fig.HatchProperties.FillBkColor.SystemColor != undefined) fig.ps.vd_C.vd_br = fig.HatchProperties.FillBkColor.SystemColor;
                    else if (fig.HatchProperties.FillBkColor.ColorIndex != undefined) {
                        fig.ps.vd_C.vd_br = render.vd_eU(fig.HatchProperties.FillBkColor.ColorIndex);
                        if (fig.HatchProperties.FillBkColor.ColorIndex == 6) fig.ps.vd_C.vd_vF = true;
                    }
                }
            }
            if (fig.HatchProperties.FillColor != undefined) {
                if (fig.HatchProperties.FillColor.ColorIndex != undefined) {
                    fig.ps.vd_C.color = render.vd_eU(fig.HatchProperties.FillColor.ColorIndex);
                    if (fig.HatchProperties.FillColor.ColorIndex == 6) fig.ps.vd_C.vd_tY = true;
                } else if (fig.HatchProperties.FillColor.SystemColor != undefined) {
                    fig.ps.vd_C.color = fig.HatchProperties.FillColor.SystemColor;
                    var vd_AV = vd_U.GetDictItem(vd_i.Images, fig.HatchProperties.FillColor.MaterialImage);
                    if (vd_AV != null) {
                        fig.ps.MaterialImage = vd_AV;
                        if (fig.ps.MaterialImage != null) fig.ps.MaterialMatrix = fig.HatchProperties.FillColor.MaterialMatrix;
                    }
                }
            }
            if (fig.HatchProperties.Solid2dTransparency != undefined) fig.ps.vd_C.vd_cA = fig.HatchProperties.Solid2dTransparency;
            if (fig.HatchProperties.gradientTypeProp != undefined) fig.ps.vd_C.vd_ex = fig.HatchProperties.gradientTypeProp;
            if (fig.HatchProperties.gradientColor2 != undefined) fig.ps.vd_C.vd_ie = fig.HatchProperties.gradientColor2;
            if (fig.HatchProperties.gradientAngle != undefined) fig.ps.vd_C.gradientAngle = fig.HatchProperties.gradientAngle;
            if (fig.ps.vd_C.vd_qU) fig.ps.vd_C.vd_cA = 0;
        }
    };
    var vd_vW = vdgeo.vd_s();
    function vd_go(render, pts, thickness, vd_v, vd_i) {
        if (vd_i && vd_i.ShowHatches === false) return;
        if (pts.length > 2 && !vd_v.UVS) {
            var vd_fC = render.vd_eq(0);
            if (vd_fC != null) {
                vd_v.UVS = [];
                vd_v.UVS.length = pts.length;
                for (var i = 0; i < pts.length; i++) {
                    vd_v.UVS[i] = vdgeo.newpoint(0, 0, 0);
                    vdgeo.vd_ei(vd_fC, pts[i], vd_v.UVS[i]);
                }
            }
            render.vd_eq(vd_fC);
        }
        render.vd_go(pts, null, vd_v.UVS);
        if (thickness && thickness != 0.0) {
            vdgeo.vd_fn(vd_vW);
            vdgeo.vd_ae(vd_vW, 0, 0, thickness);
            render.vd_bf(vd_vW);
            render.vd_go(pts, null, vd_v.UVS);
            render.vd_bg();
        }
    };
    this.vd_Bm = function() {
        var vd_i = vd_g();
        if (vd_i == null) return;
        return vd_i.Model;
    };
    function vd_Fj(vd_v, render, vd_i) {
        if (vd_U.GetActiveLayout() === vd_i.Model) return;
        if (vd_v.VPBOX) vd_v.BoundingBox = vd_v.VPBOX;
        if (vd_v.BoundingBox == undefined) return;
        vd_v.VPBOX = vd_v.BoundingBox;
        if (render.vd_cF() == vdConst.vd_cp) {
            render.vd_gi.vd_ty(vd_v.BoundingBox);
            return;
        }
        var bmin = vdgeo.newpoint(vd_v.BoundingBox[0], vd_v.BoundingBox[1], vd_v.BoundingBox[2]);
        var bmax = vdgeo.newpoint(vd_v.BoundingBox[3], vd_v.BoundingBox[4], vd_v.BoundingBox[5]);
        var zdir = vdgeo.vd_ip(render.vd_aS());
        var xdir = vdgeo.vd_ll(render.vd_aS());
        if (!render.vd_ba && vdgeo.AreEqual(zdir[X], 0, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(zdir[Y], 0, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(zdir[Z], 1, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(xdir[X], 1, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(xdir[Y], 0, vdgeo.DefaultVectorEquality) && vdgeo.AreEqual(xdir[Z], 0, vdgeo.DefaultVectorEquality)) {
            bmin = vdgeo.vd_Z(render.vd_aS(), bmin);
            bmax = vdgeo.vd_Z(render.vd_aS(), bmax);
            var vd_wq = vdgeo.vd_Z(render.vd_cR, bmin);
            var vd_vt = vdgeo.vd_Z(render.vd_cR, bmax);
            var center = vdgeo.MidPoint(bmin, bmax);
            var bh = bmax[Y] - bmin[Y];
            if (bmin[X] < render.vd_aP.left) bmin[X] = render.vd_aP.left;
            if (bmax[X] > render.vd_aP.right) bmax[X] = render.vd_aP.right;
            if (bmin[Y] < render.vd_aP.bottom) bmin[Y] = render.vd_aP.bottom;
            if (bmax[Y] > render.vd_aP.top) bmax[Y] = render.vd_aP.top;
            var mpt = vdgeo.MidPoint(bmin, bmax);
            var bh2 = bmax[Y] - bmin[Y];
            var vd_aU = (vd_v.ViewSize * bh2) / bh;
            var scale = vd_aU / bh2;
            var dx = (center[X] - mpt[X]);
            var dy = (center[Y] - mpt[Y]);
            var vd_tB = vdgeo.vd_Z(render.vd_cR, vdgeo.newpoint(bmin[X], bmax[Y], 0));
            var vd_c = vdgeo.newpoint(vd_v.ViewCenter[X] - dx * scale, vd_v.ViewCenter[Y] - dy * scale);
            var width = vdgeo.vd_o((bmax[X] - bmin[X]) / render.GetPixelSize());
            var height = vdgeo.vd_o(bh2 / render.GetPixelSize());
            if (vd_v.PerspectiveMod == 1) {
                vd_c = vd_v.ViewCenter;
                vd_tB = vdgeo.newpoint(vd_wq[X], vd_vt[Y], 0);
                width = vd_vt[X] - vd_wq[X];
                height = vd_wq[Y] - vd_vt[Y];
            }
            var vd_zc = vdgeo.vd_o(width);
            var vd_zj = vdgeo.vd_o(height);
            if (vd_zc <= 1) return;
            if (vd_zj <= 1) return;
            vd_i.vd_uM = vd_v;
            var vd_cK = new vd_rF(vd_U, vdgeo.vd_o(vd_tB[X]), vdgeo.vd_o(vd_tB[Y]), vd_zc, vd_zj, null);
            if (vd_v.PerspectiveMod == 1) vd_cK.vd_Ar(Math.max(0, vd_cK.vd_cO), Math.max(0, vd_cK.vd_fG), Math.min(render.clip[2], vd_cK.vd_cO + vd_cK.width - 1), Math.min(render.clip[3], vd_cK.vd_fG + vd_cK.height - 1));
            if (render.vd_dC()) render.vd_ps();
            vd_cK.vd_Y.vd_jd(render.vd_Y.vd_wm(), render.vd_Y.vd_ar, render.vd_Y.vd_bx, true);
            vd_cK.vd_ux(render);
            vd_cK.vd_aG = false;
            vd_cK.update(vd_aU, vd_c, vd_v.World2ViewMatrix, vd_sG(vd_i.Model), vd_v.FocalLength, vd_v.LensAngle, vd_v.PerspectiveMod == 1, vd_v.RenderMode, vd_i.Model.Sections, vd_i.Lights);
            vd_cK.vd_np(render.palette, render.vd_Br());
            vd_cK.clear();
            var vd_mq = vd_cK.vd_ij(vd_v.ShowHidenEdges);
            vd_pL(vd_i.Model.Entities, true, vd_cK, vd_i);
            if (vd_cK.vd_dC()) vd_cK.vd_ps();
            vd_cK.vd_ij(vd_mq);
            vd_cK.vd_Y.vd_jd(null);
            vd_cK = null;
            vd_U.vd_cV.vd_Ai(render);
            vd_i.vd_uM = null;
        }
        var vd_tC = vd_U.GetDictItem(vd_i.Layers, vd_v.Layer);
        if (vd_tC == null || vd_tC.Frozen == undefined || vd_tC.Frozen == false) render.vd_dQ([bmin, vdgeo.newpoint(bmin[X], bmax[Y], 0), bmax, vdgeo.newpoint(bmax[X], bmin[Y], 0)], true);
    };
    function vd_EQ(vd_v, render, vd_i) {
        if ((vd_v.Thickness != undefined && vd_v.Thickness != 0.0) || (vd_v.ps && vd_v.ps.MaterialMatrix != null)) {
            if (vd_v.ExtrusionVector != undefined && vd_v.EcsMatrix == undefined) {
                var vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
                vd_v.EcsMatrix = vdgeo.vd_s();
                vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            }
            if (vd_v.ps && vd_v.ps.MaterialMatrix != null && vd_v.EcsMatrix == undefined) vd_v.EcsMatrix = vdgeo.vd_s();
            if (vd_v.SamplePoints == undefined) {
                if (vd_v.EcsMatrix != undefined) vd_v.SamplePoints = vdgeo.vd_hz(vdgeo.vd_bo(vd_v.EcsMatrix), [vd_v.StartPoint, vd_v.EndPoint]);
                else vd_v.SamplePoints = [vd_v.StartPoint, vd_v.EndPoint];
            }
        }
        if (vd_v.SamplePoints != undefined) {
            if (vd_v.EcsMatrix != undefined) render.vd_bf(vd_v.EcsMatrix);
            render.vd_jB(vd_v.SamplePoints, vd_v.Thickness, false);
            if (vd_v.EcsMatrix != undefined) render.vd_bg();
        } else {
            render.vd_du(vd_v.StartPoint, vd_v.EndPoint);
        }
    };
    function vd_GE(vd_v, render, vd_i) {
        if (vd_v.VertexList == undefined) return;
        if (vd_v.ExtrusionVector != undefined && vd_v.EcsMatrix == undefined) {
            var vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
        }
        if (vd_v.ps && vd_v.ps.MaterialMatrix != null && vd_v.EcsMatrix == undefined) vd_v.EcsMatrix = vdgeo.vd_s();
        if (vd_v.SamplePoints == undefined) {
            var vd_hR = vd_v.VertexList.Items;
            var vd_eu = vd_v.Weights;
            var vd_aV = vd_v.Knots;
            if (vd_v.Weights == undefined) vd_eu == null;
            else vd_eu = vd_v.Weights.Items;
            if (vd_v.Knots == undefined) vd_aV == null;
            else vd_aV = vd_v.Knots.Items;
            if (vd_v.EcsMatrix != undefined) vd_hR = vdgeo.vd_qE(vdgeo.vd_bo(vd_v.EcsMatrix), vd_v.VertexList.Items);
            else {
                vd_hR = [];
                for (var i = 0; i < vd_v.VertexList.Items.length; i++) vd_hR.push(vd_v.VertexList.Items[i]);
            }
            if (vd_v.SPlineFlag == vdConst.SplineFlagCONTROLPOINTS) {
                vd_v.SamplePoints = vdgeo.vd_rX(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_hR, vd_eu, vd_aV, vd_v.Flag === 1);
            } else if (vd_v.SPlineFlag == vdConst.SplineFlagQUADRATIC) {
                vd_v.SamplePoints = vdgeo.vd_KN(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_hR, vd_eu, vd_aV, vd_v.Flag === 1);
            } else if (vd_v.SPlineFlag == vdConst.SplineFlagFITTING) {
                vd_v.SamplePoints = vdgeo.vd_sf(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_hR, vd_v.Flag === 1, vd_v.StartTangent, vd_v.EndTangent);
            } else {
                vd_v.SamplePoints = vdgeo.vd_EL(vd_hR, vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_v.Flag === 1);
                var vd_or = 0.0;
                var vd_An = false;
                vd_v.vd_fc = undefined;
                if (vd_v.VertexList.Items.length > 1 && vd_v.Widths && vd_v.Widths.Items.length == vd_v.VertexList.Items.length * 2) {
                    for (var i = 0; i < vd_v.VertexList.Items.length; i++) {
                        if (vd_v.VertexList.Items[i][B] != 0.0) {
                            vd_An = true;
                            break;
                        }
                    }
                    if (!vd_An) {
                        vd_or = vd_v.Widths.Items[0];
                        for (var i = 0; i < vd_v.Widths.Items.length; i++) {
                            if (vd_v.Widths.Items[i] !== vd_or) {
                                vd_or = 0.0;
                                break;
                            }
                        }
                    }
                    if (vd_or != 0.0) {
                        vd_v.vd_fc = vdgeo.vd_Ll(vd_v.SamplePoints, vd_v.Flag === 1, vd_or);
                    }
                }
            }
        }
        if (vd_v.EcsMatrix != undefined) render.vd_bf(vd_v.EcsMatrix);
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            render.vd_eD(vd_v.ps.vd_C);
            var vd_tO = render.vd_dK(vd_v.vd_fc ? 0.0 : undefined);
            vd_go(render, vd_v.SamplePoints, vd_v.Thickness, vd_v, vd_i);
            render.vd_dK(vd_tO);
            render.vd_eD(null);
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) {
            if (vd_v.vd_fc) {
                var p, v, p1, p2, n1, n2, u_p1, u_p2, u_n1, u_n2, vd_yc, vd_yn, d;
                var vd_fv = [0, 0, 0];
                var vd_ph = [0, 0, 1];
                var vd_oW = 0,
                vd_oi = 0,
                angle, vd_qW, vd_pQ;
                var vd_tO = render.vd_dK(0.0);
                for (var i = 0; i < vd_v.SamplePoints.length - 1; i++) {
                    render.vd_aO = i;
                    p = vd_v.SamplePoints[i];
                    v = vd_v.vd_fc[i];
                    p1 = [p[X] + v[X], p[Y] + v[Y], p[Z] + v[Z]];
                    p2 = [p[X] - v[X], p[Y] - v[Y], p[Z] - v[Z]];
                    p = vd_v.SamplePoints[i + 1];
                    v = vd_v.vd_fc[i + 1];
                    n1 = [p[X] + v[X], p[Y] + v[Y], p[Z] + v[Z]];
                    n2 = [p[X] - v[X], p[Y] - v[Y], p[Z] - v[Z]];
                    render.vd_fl(p1, n1, n2, p2, true, true, true, true, vd_ph, vd_fv, vd_fv, vd_fv, vd_fv);
                    if (vd_v.Thickness && vd_v.Thickness != 0) {
                        u_p1 = [p1[X], p1[Y], p1[Z] + vd_v.Thickness];
                        u_p2 = [p2[X], p2[Y], p2[Z] + vd_v.Thickness];
                        u_n1 = [n1[X], n1[Y], n1[Z] + vd_v.Thickness];
                        u_n2 = [n2[X], n2[Y], n2[Z] + vd_v.Thickness];
                        angle = vdgeo.GetAngle(p1, n1);
                        vd_qW = vdgeo.Distance3D(p1, n1);
                        vd_pQ = vdgeo.Distance3D(p2, n2);
                        vd_yc = [vd_oW, 0, 0],
                        vd_FC = [(vd_oW + vd_qW), 0, 0],
                        vd_Fx = [vd_oW, vd_v.Thickness, 0],
                        vd_FG = [(vd_oW + vd_qW), vd_v.Thickness, 0];
                        vd_yn = [vd_oi, 0, 0],
                        vd_Gc = [(vd_oi + vd_pQ), 0, 0],
                        vd_Gy = [vd_oi, vd_v.Thickness, 0],
                        vd_Fu = [(vd_oi + vd_pQ), vd_v.Thickness, 0];
                        render.vd_fl(u_p1, u_n1, u_n2, u_p2, true, true, true, true, vd_ph, vd_fv, vd_fv, vd_fv, vd_fv);
                        render.vd_fl(u_p1, u_n1, n1, p1, false, true, false, false, vdgeo.pointPolar(vd_fv, angle + vdgeo.HALF_PI, 1.0), vd_Fx, vd_FG, vd_FC, vd_yc);
                        render.vd_fl(u_p2, u_n2, n2, p2, false, true, false, false, vdgeo.pointPolar(vd_fv, angle + vdgeo.HALF_PI, 1.0), vd_Gy, vd_Fu, vd_Gc, vd_yn);
                        if (i == 0) {
                            d = vdgeo.Distance3D(p1, p2);
                            render.vd_fl(u_p1, u_p2, p2, p1, false, true, false, true, vdgeo.pointPolar(vd_fv, angle, 1.0), [0, vd_v.Thickness, 0], [d, vd_v.Thickness, 0], [d, 0, 0], [0, 0, 0]);
                        }
                        if (i == vd_v.SamplePoints.length - 2) {
                            d = vdgeo.Distance3D(n1, n2);
                            render.vd_fl(u_n1, u_n2, n2, n1, false, false, false, false, vdgeo.pointPolar(vd_fv, angle, 1.0), [0, vd_v.Thickness, 0], [d, vd_v.Thickness, 0], [d, 0, 0], [0, 0, 0]);
                        }
                        vd_oW += vd_qW;
                        vd_oi += vd_pQ;
                    }
                }
                render.vd_aO = undefined;
                render.vd_dK(vd_tO);
            } else {
                render.vd_jB(vd_v.SamplePoints, vd_v.Thickness, false);
            }
        }
        if (vd_v.EcsMatrix != undefined) render.vd_bg();
        if (render.vd_cF() == vdConst.vd_cp) vd_v.SamplePoints = undefined;
    };
    function vd_EB(vd_v, render, vd_i) {
        var vd_aI = vd_v.TextString;
        vd_aI = vd_aI.replace(/\r\n/gi, "\n");
        vd_aI = vd_aI.replace(/\n/gi, "\n");
        vd_aI = vd_aI.replace(/\t/gi, "    ");
        vd_aI = vd_aI.replace("\\r", "");
        vd_aI = vd_aI.replace("\\n", "\n");
        vd_aI = vd_aI.replace("\\P", "\n");
        vd_aI = vd_aI.replace("\\N", "\n");
        vd_aI = vd_aI.replace("\\t", "    ");
        if (vd_v.Height === 0.0) vd_v.Height = 1.0;
        if (vd_v.WidthFactor == undefined) vd_v.WidthFactor = 1.0;
        var vd_wn = vd_v.Height / vd_v.StyleRef.FontFileVDS.Ascent;
        if (vd_v.AlignToViewSize) vd_wn *= render.vd_nQ(vd_v.AlignToViewSize, vd_v.Height);
        vd_wn *= vd_v.WidthFactor;
        if (!vd_v.BoxWidth) vd_v.BoxWidth = 0.0;
        var maxWidth = vd_v.BoxWidth / vd_wn;
        var vd_jN = '';
        vd_v.tb = [0, 0, 0, 0];
        var vd_re = [];
        var uwidths = [];
        var owidths = [];
        var vd_cu = 0;
        var vd_up = 0;
        var vd_nZ = false;
        var ulen, olen, u, o;
        var vd_vN = vd_aI.split("\n");
        for (var l = 0; l < vd_vN.length; l++) {
            var vd_dS = [];
            var vd_fd = [];
            var vd_ou;
            if (!vd_v.BoxWidth) vd_ou = [vd_vN[l]];
            else vd_ou = vd_vN[l].split(" ");
            for (var k = 0; k < vd_ou.length; k++) {
                var word = vd_ou[k];
                if (k != vd_ou.length - 1) word += " ";
                var width = 0;
                var rsb = 0;
                var vd_on = [];
                var vd_mf = [];
                for (var c = 0; c < word.length; c++) {
                    if (word.substr(c, 3).match(/%%u/i)) {
                        vd_on.push(width);
                        c += 3;
                    } else if (word.substr(c, 3).match(/%%o/i)) {
                        vd_mf.push(width);
                        c += 3;
                    }
                    var pos = word.charCodeAt(c);
                    var vd_gJ = vd_v.StyleRef.FontFileVDS.Shapes['h_' + pos.toString()];
                    var shape = null;
                    if (vd_gJ != undefined) shape = vd_v.StyleRef.FontFileVDS.Shapes.Items[vd_gJ];
                    if (shape != null) {
                        if (!vd_nZ) vd_up = shape.bb[0];
                        vd_nZ = true;
                        width += (shape.AdvanceX);
                        rsb = shape.AdvanceX - shape.bb[2];
                    } else {
                        width += vd_v.StyleRef.FontFileVDS.Ascent * 0.5;
                        rsb = 0;
                    }
                }
                width -= rsb;
                if (vd_cu == 0 || (vd_cu + width) <= maxWidth) {
                    for (u = 0; u < vd_on.length; u++) vd_dS.push(vd_on[u] + vd_cu);
                    for (o = 0; o < vd_mf.length; o++) vd_fd.push(vd_mf[o] + vd_cu);
                    vd_cu += width;
                    vd_jN = vd_jN.concat(word);
                } else {
                    ulen = vd_dS.length % 2;
                    olen = vd_fd.length % 2;
                    if (ulen == 1) vd_dS.push(vd_cu);
                    if (olen == 1) vd_fd.push(vd_cu);
                    uwidths.push(vd_dS);
                    vd_dS = [];
                    owidths.push(vd_fd);
                    vd_fd = [];
                    if (ulen == 1) vd_dS.push(0);
                    if (olen == 1) vd_fd.push(0);
                    for (u = 0; u < vd_on.length; u++) vd_dS.push(vd_on[u]);
                    for (o = 0; o < vd_mf.length; o++) vd_fd.push(vd_mf[o]);
                    vd_re.push([vd_jN, vd_cu]);
                    vd_v.tb[1] = Math.max(vd_v.tb[1], vd_cu);
                    vd_v.tb[0] = Math.min(vd_v.tb[0], vd_up);
                    vd_nZ = false;
                    vd_cu = width;
                    vd_jN = word;
                }
            }
            ulen = vd_dS.length % 2;
            olen = vd_fd.length % 2;
            if (ulen == 1) vd_dS.push(vd_cu);
            if (olen == 1) vd_fd.push(vd_cu);
            uwidths.push(vd_dS);
            vd_dS = [];
            owidths.push(vd_fd);
            vd_fd = [];
            vd_re.push([vd_jN, vd_cu]);
            vd_v.tb[1] = Math.max(vd_v.tb[1], vd_cu);
            vd_v.tb[0] = Math.min(vd_v.tb[0], vd_up);
            vd_nZ = false;
            vd_cu = 0;
            vd_jN = '';
        }
        vd_v.tb[3] = (vd_re.length - 1) * -(vd_v.StyleRef.FontFileVDS.Ascent * 5 / 3) - vd_v.StyleRef.FontFileVDS.Ascent - vd_v.StyleRef.FontFileVDS.Descent;
        return [vd_re, uwidths, owidths];
    };
    function vd_EX(vd_v, render, vd_i) {
        if (vd_v.TextString == undefined || vd_v.TextString.length == 0) return;
        if (vd_v.StyleRef == undefined) {
            vd_v.StyleRef = vd_U.GetDictItem(vd_i.TextStyles, vd_v.Style);
        }
        if (vd_v.StyleRef == null) return;
        if (vd_v.StyleRef.FontFileVDS == null) return;
        if (vd_v.StyleRef.FontFileVDS.Shapes == null || vd_v.StyleRef.FontFileVDS.Shapes == undefined) return;
        if (vd_v.tb == undefined) {
            var vd_vl = vd_EB(vd_v, render, vd_i, vd_v.BoxWidth);
            vd_v.testlines = vd_vl[0];
            vd_v.uwidths = vd_vl[1];
            vd_v.owidths = vd_vl[2];
        }
        if (vd_v.EcsMatrix == undefined) {
            if (vd_v.Height === 0.0) vd_v.Height = 1.0;
            if (vd_v.Rotation == undefined) vd_v.Rotation = 0.0;
            if (vd_v.ExtrusionVector == undefined) vd_v.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
            if (vd_v.WidthFactor == undefined) vd_v.WidthFactor = 1.0;
            if (vd_v.Flag == undefined) vd_v.Flag = vdConst.VdConstTextstyle_LEFTTORIGHT;
            if (vd_v.Thickness == undefined) vd_v.Thickness = 0.0;
            if (vd_v.Bold == undefined) vd_v.Bold = false;
            if (vd_v.ObliqueAngle == undefined) vd_v.ObliqueAngle = 0.0;
            if (vd_v.TextLine == undefined) vd_v.TextLine = vdConst.TextLineFlags_None;
            var vd_lh = vd_v.tb[0];
            var vd_lf = 0;
            var dy = 0.0;
            var dx = 0.0;
            switch (vd_v.VerJustify) {
            case vdConst.VdConstVerJust_VdTextVerBottom:
                dy = -vd_v.tb[3] - vd_v.StyleRef.FontFileVDS.Descent;
                break;
            case vdConst.VdConstVerJust_VdTextVerCen:
                dy = -((vd_v.tb[2] + vd_v.tb[3]) / 2.0) - (vd_v.StyleRef.FontFileVDS.Descent / 2.0);
                break;
            case vdConst.VdConstVerJust_VdTextVerTop:
                dy = -vd_v.tb[2];
                break;
            default:
                dy = -vd_v.tb[2];
                break;
            }
            switch (vd_v.HorJustify) {
            case vdConst.VdConstHorJust_VdTextHorCenter:
                dx = -vd_lh - vd_v.tb[1] / 2.0;
                break;
            case vdConst.VdConstHorJust_VdTextHorRight:
                dx = -vd_lh - vd_v.tb[1];
                break;
            default:
                dx = -vd_lh;
                break;
            }
            var scale = vd_v.Height / vd_v.StyleRef.FontFileVDS.Ascent;
            if (vd_v.AlignToViewSize) scale *= render.vd_nQ(vd_v.AlignToViewSize, vd_v.Height);
            var ddx = 0.0;
            if (vd_v.ObliqueAngle !== 90.0 && vd_v.ObliqueAngle !== 0.0 && vd_v.ObliqueAngle !== 180.0 && vd_v.ObliqueAngle !== 270.0) ddx = ((vd_lf + vd_v.StyleRef.FontFileVDS.Ascent) - dy) * Math.tan(vdgeo.DegreesToRadians(vd_v.ObliqueAngle));
            dx += ddx;
            var vd_rw = ((vd_v.Flag & vdConst.VdConstTextstyle_BACKWARD) == vdConst.VdConstTextstyle_BACKWARD ? -1.0 : 1.0);
            var vd_sj = ((vd_v.Flag & vdConst.VdConstTextstyle_UPSIDEDOWN) == vdConst.VdConstTextstyle_UPSIDEDOWN ? -1.0 : 1.0);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_ay(vd_v.EcsMatrix, scale, scale, 1.0);
            vdgeo.vd_ae(vd_v.EcsMatrix, dx * scale, dy * scale, 0.0);
            vdgeo.vd_AE(vd_v.EcsMatrix, vdgeo.DegreesToRadians(vd_v.ObliqueAngle), 0.0);
            vdgeo.vd_ay(vd_v.EcsMatrix, vd_rw * vd_v.WidthFactor, vd_sj, 1.0);
            vdgeo.vd_ag(vd_v.EcsMatrix, vd_v.Rotation);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_v.ExtrusionVector);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
        }
        render.vd_bf(vd_v.EcsMatrix);
        var color;
        var vd_dx;
        var vd_ah = 0;
        if (vd_v.BackGroundMask && vd_v.BackGroundMaskColor && (vd_v.BackGroundMaskColor.SystemColor || vd_v.BackGroundMaskColor.ColorIndex != undefined)) {
            color = vd_v.BackGroundMaskColor.SystemColor;
            if (!color) color = render.vd_eU(vd_v.BackGroundMaskColor.ColorIndex);
            vd_dx = render.vd_aZ(color);
            if (vd_v.BackGroundMaskOffset) vd_ah = vd_v.BackGroundMaskOffset * vd_v.StyleRef.FontFileVDS.Ascent / vd_v.Height;
            render.vd_fB([[ - vd_ah + vd_v.tb[0], vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[3] + vd_ah, 0], [ - vd_ah + vd_v.tb[0], vd_v.tb[3] + vd_ah, 0]], null, null, true);
            render.vd_aZ(vd_dx);
        }
        if (vd_v.BackgroundMaskBorder) {
            color = render.vd_aZ();
            if (vd_v.BackGroundMaskBorderColor && (vd_v.BackGroundMaskBorderColor.SystemColor || vd_v.BackGroundMaskBorderColor.ColorIndex != undefined)) {
                color = vd_v.BackGroundMaskBorderColor.SystemColor;
                if (!color) color = render.vd_eU(vd_v.BackGroundMaskBorderColor.ColorIndex);
            }
            var penwidth = render.vd_dK();
            if (vd_v.BackGroundMaskBorderPenWidth) {
                penwidth = (vd_v.BackGroundMaskBorderPenWidth / 100.0) * 96 / vdgeo.INCH_MM;
            }
            vd_dx = render.vd_aZ(color);
            var vd_ub = render.vd_dK(penwidth);
            render.vd_dQ([[ - vd_ah + vd_v.tb[0], vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[3] + vd_ah, 0], [ - vd_ah + vd_v.tb[0], vd_v.tb[3] + vd_ah, 0]], true);
            render.vd_dK(vd_ub);
            render.vd_aZ(vd_dx);
        }
        var vd_ym = -vd_v.StyleRef.FontFileVDS.Ascent;
        var upts = [null, null];
        var opts = [null, null];
        var pos = -1;
        for (var tl = 0; tl < vd_v.testlines.length; tl++) {
            var vd_aI = vd_v.testlines[tl][0];
            var vd_jm = vd_v.testlines[tl][1];
            vd_aI = vd_aI.replace(/%%u/gi, "");
            vd_aI = vd_aI.replace(/%%o/gi, "");
            var mat = vdgeo.vd_s();
            vdgeo.vd_ae(mat, 0, vd_ym, 0);
            render.vd_bf(mat);
            render.vd_ue(vd_aI, vd_jm, vd_v.StyleRef.FontFileVDS.Ascent, vd_v.StyleRef.FontFileVDS);
            if ((vd_v.TextLine & vdConst.TextLineFlags_UnderLine) != 0) {
                render.vd_du(vdgeo.newpoint(0, -vd_v.StyleRef.FontFileVDS.Descent, 0), vdgeo.newpoint(vd_jm, -vd_v.StyleRef.FontFileVDS.Descent, 0));
            } else {
                var vd_is = vd_v.uwidths[tl];
                for (var u = 0; u < vd_is.length; u++) {
                    pos = (u % 2);
                    upts[pos] = vd_is[u];
                    if (pos == 1) render.vd_du(vdgeo.newpoint(upts[0], -vd_v.StyleRef.FontFileVDS.Descent, 0), vdgeo.newpoint(upts[1], -vd_v.StyleRef.FontFileVDS.Descent, 0));
                }
            }
            if ((vd_v.TextLine & vdConst.TextLineFlags_OverLine) != 0) {
                render.vd_du(vdgeo.newpoint(0, vd_v.StyleRef.FontFileVDS.Ascent * 1.25, 0), vdgeo.newpoint(vd_jm, vd_v.StyleRef.FontFileVDS.Ascent * 1.25, 0));
            } else {
                var vd_jz = vd_v.owidths[tl];
                for (var o = 0; o < vd_jz.length; o++) {
                    pos = (o % 2);
                    upts[pos] = vd_jz[o];
                    if (pos == 1) render.vd_du(vdgeo.newpoint(upts[0], vd_v.StyleRef.FontFileVDS.Ascent * 1.25, 0), vdgeo.newpoint(upts[1], vd_v.StyleRef.FontFileVDS.Ascent * 1.25, 0));
                }
            }
            render.vd_bg();
            vd_ym -= (vd_v.StyleRef.FontFileVDS.Ascent * 5 / 3);
        }
        render.vd_bg();
        if (vd_v.AlignToViewSize) vd_v.EcsMatrix = undefined;
    };
    function vd_pv(vd_v, render, vd_i) {
        if (vd_v.TextString == undefined || vd_v.TextString.length == 0) return;
        if (vd_v.BoxWidth != undefined || vd_v.TextString.search(/\\n/i) > 0 || vd_v.TextString.search(/\n/i) > 0) {
            vd_EX(vd_v, render, vd_i);
            return;
        }
        var i = 0;
        if (vd_v.StyleRef == undefined) {
            vd_v.StyleRef = vd_U.GetDictItem(vd_i.TextStyles, vd_v.Style);
        }
        if (vd_v.StyleRef == null) return;
        if (vd_v.StyleRef.FontFileVDS == null) return;
        if (vd_v.StyleRef.FontFileVDS.Shapes == null || vd_v.StyleRef.FontFileVDS.Shapes == undefined) return;
        if (vd_v.tb == undefined) {
            var vd_aI = vd_v.TextString;
            vd_aI = vd_aI.replace(/%%u/gi, "");
            vd_aI = vd_aI.replace(/%%o/gi, "");
            vd_aI = vd_aI.replace(/\t/gi, "    ");
            vd_aI = vd_aI.replace("\\t", "    ");
            vd_v.DiplayString = vd_aI;
            var rsb = 0;
            vd_v.tb = [0, 0, 0, 0];
            var vd_tA = 0;
            var vd_gS = [];
            for (var c = 0; c < vd_v.DiplayString.length; c++) {
                var pos = vd_v.DiplayString.charCodeAt(c);
                if (pos == 10 || pos == 13) {
                    vd_tA++;
                    continue;
                }
                if (pos == 32) vd_tA++;
                var vd_gJ = vd_v.StyleRef.FontFileVDS.Shapes['h_' + pos.toString()];
                var shape = null;
                if (vd_gJ != undefined) shape = vd_v.StyleRef.FontFileVDS.Shapes.Items[vd_gJ];
                if (c == 0 && shape != null) vd_v.tb[0] = shape.bb[0];
                if (shape != null) {
                    vd_v.tb[1] += (shape.AdvanceX);
                    rsb = shape.AdvanceX - shape.bb[2];
                    vd_v.tb[2] = Math.min(vd_v.tb[2], shape.bb[1]);
                    vd_v.tb[3] = Math.max(vd_v.tb[3], shape.bb[3]);
                } else {
                    vd_v.tb[1] += vd_v.StyleRef.FontFileVDS.Ascent * 0.5;
                    rsb = 0;
                }
                vd_gS.push(vd_v.tb[1] - rsb);
            }
            vd_v.tb[1] -= rsb;
            if (vd_tA == vd_v.DiplayString.length) vd_v.DiplayString = null;
            var uwidths = null;
            var owidths = null;
            var vd_be = vd_v.TextString;
            vd_be = vd_be.replace(/%%U/g, "%%u");
            vd_be = vd_be.replace(/%%O/g, "%%o");
            if (vd_v.TextLine) {
                if ((vd_v.TextLine & vdConst.TextLineFlags_UnderLine) != 0) {
                    vd_be = vd_be.replace(/%%u/gi, "");
                    vd_be = '%%u' + vd_be;
                }
                if ((vd_v.TextLine & vdConst.TextLineFlags_OverLine) != 0) {
                    vd_be = vd_be.replace(/%%o/gi, "");
                    vd_be = '%%o' + vd_be;
                }
            }
            var str = "";
            var sl = 0;
            var vd_is = vd_be.split("%%u");
            if (vd_is.length > 1) {
                uwidths = [];
                str = vd_is[0].replace(/%%o/gi, "");
                if (str.length == 0) sl = 0;
                else sl = vd_gS[str.length - 1];
                uwidths.push(vd_v.tb[0] + sl);
                for (i = 1; i < vd_is.length; i++) {
                    str += vd_is[i].replace(/%%o/gi, "");
                    if (str.length == 0) sl = 0;
                    else sl = vd_gS[str.length - 1];
                    uwidths.push(vd_v.tb[0] + sl);
                }
                if ((uwidths.length % 2) == 0) uwidths.push(vd_v.tb[0] + vd_v.tb[1]);
            }
            var vd_jz = vd_be.split("%%o");
            if (vd_jz.length > 1) {
                owidths = [];
                str = vd_jz[0].replace(/%%u/gi, "");
                if (str.length == 0) sl = 0;
                else sl = vd_gS[str.length - 1];
                owidths.push(vd_v.tb[0] + sl);
                for (i = 1; i < vd_jz.length; i++) {
                    str += vd_jz[i].replace(/%%u/gi, "");
                    if (str.length == 0) sl = 0;
                    else sl = vd_gS[str.length - 1];
                    owidths.push(vd_v.tb[0] + sl);
                }
                if ((owidths.length % 2) == 0) owidths.push(vd_v.tb[0] + vd_v.tb[1]);
            }
            vd_v.uwidths = uwidths;
            vd_v.owidths = owidths;
        }
        if (vd_v.EcsMatrix == undefined) {
            if (vd_v.Height === 0.0) vd_v.Height = 1.0;
            if (vd_v.Rotation == undefined) vd_v.Rotation = 0.0;
            if (vd_v.ExtrusionVector == undefined) vd_v.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
            if (vd_v.WidthFactor == undefined) vd_v.WidthFactor = 1.0;
            if (vd_v.Flag == undefined) vd_v.Flag = vdConst.VdConstTextstyle_LEFTTORIGHT;
            if (vd_v.Thickness == undefined) vd_v.Thickness = 0.0;
            if (vd_v.Bold == undefined) vd_v.Bold = false;
            if (vd_v.ObliqueAngle == undefined) vd_v.ObliqueAngle = 0.0;
            if (vd_v.TextLine == undefined) vd_v.TextLine = vdConst.TextLineFlags_None;
            var vd_lh = vd_v.tb[0];
            var vd_lf = -vd_v.StyleRef.FontFileVDS.Ascent;
            var dy = 0.0;
            var dx = 0.0;
            switch (vd_v.VerJustify) {
            case vdConst.VdConstVerJust_VdTextVerBottom:
                dy = vd_lf + vd_v.StyleRef.FontFileVDS.Descent + vd_v.StyleRef.FontFileVDS.Ascent;
                break;
            case vdConst.VdConstVerJust_VdTextVerCen:
                dy = vd_lf + vd_v.StyleRef.FontFileVDS.Ascent / 2.0;
                break;
            case vdConst.VdConstVerJust_VdTextVerTop:
                dy = vd_lf;
                break;
            default:
                dy = vd_lf + vd_v.StyleRef.FontFileVDS.Ascent;
                break;
            }
            switch (vd_v.HorJustify) {
            case vdConst.VdConstHorJust_VdTextHorCenter:
                dx = -vd_lh - vd_v.tb[1] / 2.0;
                break;
            case vdConst.VdConstHorJust_VdTextHorRight:
                dx = -vd_lh - vd_v.tb[1];
                break;
            default:
                dx = -vd_lh;
                break;
            }
            var scale = vd_v.Height / vd_v.StyleRef.FontFileVDS.Ascent;
            if (vd_v.AlignToViewSize) scale *= render.vd_nQ(vd_v.AlignToViewSize, vd_v.Height);
            var ddx = 0.0;
            if (vd_v.ObliqueAngle !== 90.0 && vd_v.ObliqueAngle !== 0.0 && vd_v.ObliqueAngle !== 180.0 && vd_v.ObliqueAngle !== 270.0) ddx = ((vd_lf + vd_v.StyleRef.FontFileVDS.Ascent) - dy) * Math.tan(vdgeo.DegreesToRadians(vd_v.ObliqueAngle));
            dx += ddx;
            var vd_rw = ((vd_v.Flag & vdConst.VdConstTextstyle_BACKWARD) == vdConst.VdConstTextstyle_BACKWARD ? -1.0 : 1.0);
            var vd_sj = ((vd_v.Flag & vdConst.VdConstTextstyle_UPSIDEDOWN) == vdConst.VdConstTextstyle_UPSIDEDOWN ? -1.0 : 1.0);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_ay(vd_v.EcsMatrix, scale, scale, 1.0);
            vdgeo.vd_ae(vd_v.EcsMatrix, dx * scale, dy * scale, 0.0);
            vdgeo.vd_AE(vd_v.EcsMatrix, vdgeo.DegreesToRadians(vd_v.ObliqueAngle), 0.0);
            vdgeo.vd_ay(vd_v.EcsMatrix, vd_rw * vd_v.WidthFactor, vd_sj, 1.0);
            vdgeo.vd_ag(vd_v.EcsMatrix, vd_v.Rotation);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_v.ExtrusionVector);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
        }
        render.vd_bf(vd_v.EcsMatrix);
        var color;
        var vd_dx;
        if (vd_v.BackGroundMask && vd_v.BackGroundMaskColor && (vd_v.BackGroundMaskColor.SystemColor || vd_v.BackGroundMaskColor.ColorIndex != undefined)) {
            color = vd_v.BackGroundMaskColor.SystemColor;
            if (!color) color = render.vd_eU(vd_v.BackGroundMaskColor.ColorIndex);
            vd_dx = render.vd_aZ(color);
            var vd_ah = 0;
            if (vd_v.BackGroundMaskOffset) vd_ah = vd_v.BackGroundMaskOffset * vd_v.StyleRef.FontFileVDS.Ascent / vd_v.Height;
            render.vd_fB([[ - vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[3] + vd_ah, 0], [ - vd_ah, vd_v.tb[3] + vd_ah, 0]], null, null, true);
            render.vd_aZ(vd_dx);
        }
        if (vd_v.BackgroundMaskBorder) {
            color = render.vd_aZ();
            if (vd_v.BackGroundMaskBorderColor && (vd_v.BackGroundMaskBorderColor.SystemColor || vd_v.BackGroundMaskBorderColor.ColorIndex != undefined)) {
                color = vd_v.BackGroundMaskBorderColor.SystemColor;
                if (!color) color = render.vd_eU(vd_v.BackGroundMaskBorderColor.ColorIndex);
            }
            var penwidth = render.vd_dK();
            if (vd_v.BackGroundMaskBorderPenWidth) {
                penwidth = (vd_v.BackGroundMaskBorderPenWidth / 100.0) * 96 / vdgeo.INCH_MM;
            }
            vd_dx = render.vd_aZ(color);
            var vd_ub = render.vd_dK(penwidth);
            render.vd_dQ([[ - vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[2] - vd_ah, 0], [vd_v.tb[1] + vd_ah, vd_v.tb[3] + vd_ah, 0], [ - vd_ah, vd_v.tb[3] + vd_ah, 0]], true);
            render.vd_dK(vd_ub);
            render.vd_aZ(vd_dx);
        }
        render.vd_ue(vd_v.DiplayString, vd_v.tb[1], vd_v.StyleRef.FontFileVDS.Ascent, vd_v.StyleRef.FontFileVDS);
        var topy = vd_v.StyleRef.FontFileVDS.Ascent * 1.25;
        var vd_BJ = -vd_v.StyleRef.FontFileVDS.Descent;
        if (vd_v.uwidths) {
            for (i = 1; i < vd_v.uwidths.length; i += 2) {
                if (vdgeo.AreEqual(vd_v.uwidths[i - 1], vd_v.uwidths[i], vdgeo.DefaultLinearEquality)) continue;
                render.vd_du(vdgeo.newpoint(vd_v.uwidths[i - 1], vd_BJ, 0), vdgeo.newpoint(vd_v.uwidths[i], vd_BJ, 0));
            }
        }
        if (vd_v.owidths) {
            for (i = 1; i < vd_v.owidths.length; i += 2) {
                if (vdgeo.AreEqual(vd_v.owidths[i - 1], vd_v.owidths[i], vdgeo.DefaultLinearEquality)) continue;
                render.vd_du(vdgeo.newpoint(vd_v.owidths[i - 1], topy, 0), vdgeo.newpoint(vd_v.owidths[i], topy, 0));
            }
        }
        if ((vd_v.TextLine & vdConst.TextLineFlags_CenterLine) != 0) {
            render.vd_du(vdgeo.newpoint(0, vd_v.StyleRef.FontFileVDS.Ascent * 0.5, 0), vdgeo.newpoint(vd_v.tb[1], vd_v.StyleRef.FontFileVDS.Ascent * 0.5, 0));
        }
        render.vd_bg();
        if (vd_v.AlignToViewSize) vd_v.EcsMatrix = undefined;
    };
    function vd_Fg(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var rotation = 0.0;
            var vd_av = vdgeo.newpoint(0, 0, 1);
            var vd_bI = vdgeo.newpoint(0, 0, 0);
            if (vd_v.Rotation != undefined) rotation = vd_v.Rotation;
            if (vd_v.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            if (vd_v.InsertionPoint != undefined) vd_bI = vdgeo.newpoint(vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_ag(vd_v.EcsMatrix, rotation);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
        }
        if (vd_v.SamplePoints == undefined) {
            vd_v.SamplePoints = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(vd_v.Width, 0, 0), vdgeo.newpoint(vd_v.Width, vd_v.Height, 0), vdgeo.newpoint(0, vd_v.Height, 0)];
            vd_v.SamplePoints.reverse();
        }
        render.vd_bf(vd_v.EcsMatrix);
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            render.vd_eD(vd_v.ps.vd_C);
            vd_go(render, vd_v.SamplePoints, vd_v.Thickness, vd_v, vd_i);
            render.vd_eD(null);
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) render.vd_jB(vd_v.SamplePoints, vd_v.Thickness, true);
        render.vd_bg();
    };
    function vd_GB(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var rotation = 0.0;
            var vd_av = vdgeo.newpoint(0, 0, 1);
            var vd_bI = vdgeo.newpoint(0, 0, 0);
            if (vd_v.Rotation != undefined) rotation = vd_v.Rotation;
            if (vd_v.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            if (vd_v.InsertionPoint != undefined) vd_bI = vdgeo.newpoint(vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_ag(vd_v.EcsMatrix, rotation);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
        }
        render.vd_bf(vd_v.EcsMatrix);
        var idef = vd_U.GetDictItem(vd_i.Images, vd_v.ImageDefinition);
        if (idef != null && idef.bytes != undefined) {
            vd_v.Height = vd_v.Width * idef.OriginalHeight / idef.OriginalWidth;
            vd_v.ImageScale = vd_v.Width;
            if ((vd_v.Display & 4) != 0 && vd_v.ClipBoundary && vd_v.ClipBoundary.Items.length > 2) {
                var vd_fC = render.vd_eq(vdgeo.vd_AA(0, 0, vd_v.Width, vd_v.Height));
                if (!vd_v.ImageClipPts || !vd_v.ImageClipUVS) {
                    var vd_kO = vdgeo.vd_s();
                    var vd_nc = vd_v.Height / idef.OriginalHeight;
                    vdgeo.vd_ay(vd_kO, vd_nc, -vd_nc, 1.0);
                    vdgeo.vd_ae(vd_kO, 0.0, vd_v.Height, 0);
                    vd_v.ImageClipPts = vdgeo.vd_hz(vd_kO, vd_v.ClipBoundary.Items);
                    vd_kO = vdgeo.vd_s();
                    vdgeo.vd_ay(vd_kO, 1 / vd_v.Width, 1 / vd_v.Height, 1.0);
                    vd_v.ImageClipUVS = vdgeo.vd_hz(vd_kO, vd_v.ImageClipPts);
                }
                render.vd_oL(vd_v.ImageClipPts, vdgeo.newpoint(0, 0, 1), vd_v.ImageClipUVS, idef, true);
                render.vd_eq(vd_fC);
            } else {
                render.vd_pV(idef, (vd_v.Display & 8) == 8, vd_v.Width, vd_v.Height);
            }
        }
        if ((vd_v.Display & 16) == 0 || vd_v.Display == 0) {
            if (vd_v.ImageClipPts) render.vd_dQ(vd_v.ImageClipPts, true);
            else render.vd_dQ([vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(vd_v.Width, 0, 0), vdgeo.newpoint(vd_v.Width, vd_v.Height, 0), vdgeo.newpoint(0, vd_v.Height, 0)], true);
        }
        render.vd_bg();
    };
    function vd_FD(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var vd_av = vdgeo.newpoint(0, 0, 1);
            var vd_bI = vdgeo.newpoint(0, 0, 0);
            if (vd_v.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            if (vd_v.Center != undefined) vd_bI = vdgeo.newpoint(vd_v.Center[X], vd_v.Center[Y], vd_v.Center[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            if (vd_v.AlignToViewSize) {
                render.vd_rQ(vd_v.AlignToViewSize, vd_v.EcsMatrix, vd_v.Radius * 2.0);
            }
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
        }
        if (vd_v.SamplePoints == undefined) {
            var vd_fg = vdgeo.vd_hT(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_v.Radius, vdgeo.VD_TWOPI);
            vd_v.SamplePoints = vdgeo.vd_qL(vd_fg, vd_v.Radius, 0.0, vdgeo.VD_TWOPI, 0);
            vd_v.SamplePoints.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), 0.0, vd_v.Radius));
            vd_v.SamplePoints.reverse();
        }
        render.vd_bf(vd_v.EcsMatrix);
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            render.vd_eD(vd_v.ps.vd_C);
            vd_go(render, vd_v.SamplePoints, vd_v.Thickness, vd_v, vd_i);
            render.vd_eD(null);
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) render.vd_jB(vd_v.SamplePoints, vd_v.Thickness, false);
        render.vd_bg();
        if (vd_v.AlignToViewSize) vd_v.EcsMatrix = undefined;
        if (render.vd_cF() == vdConst.vd_cp || vd_v.AlignToViewSize) vd_v.SamplePoints = undefined;
    };
    function vd_Fo(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var vd_av = vdgeo.newpoint(0, 0, 1);
            var vd_bI = vdgeo.newpoint(0, 0, 0);
            if (vd_v.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            if (vd_v.Center != undefined) vd_bI = vdgeo.newpoint(vd_v.Center[X], vd_v.Center[Y], vd_v.Center[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
        }
        if (vd_v.SamplePoints == undefined) {
            if (vd_v.StartAngle == undefined) vd_v.StartAngle = 0.0;
            if (vd_v.EndAngle == undefined) vd_v.EndAngle = 0.0;
            var da = vdgeo.FixAngle(vd_v.EndAngle) - vdgeo.FixAngle(vd_v.StartAngle);
            var vd_fg = vdgeo.vd_hT(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_v.Radius, da);
            vd_v.SamplePoints = vdgeo.vd_qL(vd_fg, vd_v.Radius, vd_v.StartAngle, vd_v.EndAngle, 0);
            vd_v.SamplePoints.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), vd_v.EndAngle, vd_v.Radius));
            vd_v.SamplePoints.reverse();
        }
        render.vd_bf(vd_v.EcsMatrix);
        var vd_cS = vd_v.SamplePoints;
        var closed = false;
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            vd_cS = vd_cS.concat([vdgeo.newpoint(0, 0, 0)]);
            closed = true;
            render.vd_eD(vd_v.ps.vd_C);
            vd_go(render, vd_cS, vd_v.Thickness, vd_v, vd_i);
            render.vd_eD(null);
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) render.vd_jB(vd_cS, vd_v.Thickness, closed);
        render.vd_bg();
        if (render.vd_cF() == vdConst.vd_cp) vd_v.SamplePoints = undefined;
    };
    function vd_GG(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var vd_av = vdgeo.newpoint(0, 0, 1);
            var vd_bI = vdgeo.newpoint(0, 0, 0);
            if (vd_v.ExtrusionVector != undefined) vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            if (vd_v.Center != undefined) vd_bI = vdgeo.newpoint(vd_v.Center[X], vd_v.Center[Y], vd_v.Center[Z]);
            vd_v.EcsMatrix = new vdgeo.vd_s();
            if (vd_v.MajorAngle != undefined) vdgeo.vd_ag(vd_v.EcsMatrix, vd_v.MajorAngle);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_bI[X], vd_bI[Y], vd_bI[Z]);
        }
        if (vd_v.SamplePoints == undefined) {
            if (vd_v.StartAngle == undefined) vd_v.StartAngle = 0.0;
            if (vd_v.EndAngle == undefined) vd_v.EndAngle = 0.0;
            var da = vdgeo.FixAngle(vd_v.EndAngle) - vdgeo.FixAngle(vd_v.StartAngle);
            var vd_fg = vdgeo.vd_sC(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_v.MajorLength, da);
            vd_v.SamplePoints = vdgeo.vd_rO(vd_fg, vd_v.MajorLength, vd_v.MinorLength, vd_v.StartAngle, vd_v.EndAngle);
            vd_v.SamplePoints.reverse();
        }
        render.vd_bf(vd_v.EcsMatrix);
        var vd_cS = vd_v.SamplePoints;
        var closed = false;
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            if (!vdgeo.vd_AW(vd_cS)) {
                vd_cS = vd_cS.concat([vdgeo.newpoint(0, 0, 0)]);
                closed = true;
            }
            render.vd_eD(vd_v.ps.vd_C);
            vd_go(render, vd_cS, vd_v.Thickness, vd_v, vd_i);
            render.vd_eD(null);
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) render.vd_jB(vd_cS, vd_v.Thickness, closed);
        render.vd_bg();
        if (render.vd_cF() == vdConst.vd_cp) vd_v.SamplePoints = undefined;
    };
    function vd_ER(vd_v, render, vd_i) {
        var k = 0;
        if (vd_v.ExtrusionVector != undefined && vd_v.EcsMatrix == undefined) {
            var vd_av = vdgeo.newpoint(vd_v.ExtrusionVector[X], vd_v.ExtrusionVector[Y], vd_v.ExtrusionVector[Z]);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_av);
        }
        if (vd_v.ps && vd_v.ps.MaterialMatrix != null && vd_v.EcsMatrix == undefined) vd_v.EcsMatrix = vdgeo.vd_s();
        if (vd_v.EcsMatrix != undefined) render.vd_bf(vd_v.EcsMatrix);
        if (vd_v.ps && vd_v.ps.vd_C != undefined) {
            if (vd_v.Curves != undefined) {
                render.vd_eD(vd_v.ps.vd_C);
                for (k = 0; k < vd_v.Curves.Items.length; k++) {
                    vd_go(render, vd_v.Curves.Items[k].Items, vd_v.Thickness, vd_v.Curves.Items[k], vd_i);
                }
                render.vd_eD(null);
            }
        }
        if (vd_v.HatchProperties == undefined || vd_v.HatchProperties.DrawBoundary === undefined || vd_v.HatchProperties.DrawBoundary || (vd_v.Thickness && vd_v.Thickness != 0) || render.vd_cF() == vdConst.vd_cp) {
            if (vd_v.OutLines != undefined) {
                for (k = 0; k < vd_v.OutLines.Items.length; k++) {
                    render.vd_jB(vd_v.OutLines.Items[k].Items, vd_v.Thickness, true);
                }
            }
        }
        if (vd_v.EcsMatrix != undefined) render.vd_bg();
    };
    var vd_iG = vdgeo.vd_s();
    var _uv0 = vdgeo.newpoint(0, 0, 0);
    var _uv1 = vdgeo.newpoint(0, 0, 0);
    var _uv2 = vdgeo.newpoint(0, 0, 0);
    var _uv3 = vdgeo.newpoint(0, 0, 0);
    function vd_rt(vd_ov, vd_aw) {
        var k = -1;
        for (var i = 0; i < vd_aw.length; i++) {
            if (vd_ov < vd_aw[i].Key) break;
            k = i;
        }
        if (k == -1) return vd_aw[0].Value;
        if (k == vd_aw.length - 1) return vd_aw[vd_aw.length - 1].Value;
        var vd_fW = (vd_ov - vd_aw[k].Key) / (vd_aw[k + 1].Key - vd_aw[k].Key);
        var c1 = vd_aw[k].Value;
        var c2 = vd_aw[k + 1].Value;
        return [c1[0] + (c2[0] - c1[0]) * vd_fW, c1[1] + (c2[1] - c1[1]) * vd_fW, c1[2] + (c2[2] - c1[2]) * vd_fW];
    };
    function vd_Cg(p0, p1, p2, p3, tmat, normal, uv0, uv1, uv2, uv3, vd_aw) {
        var vd_Kr = vdgeo.vd_FU(p0, p1, p2, p3, normal);
        if (vd_aw) {
            var col = vd_rt(p0[Z], vd_aw);
            uv0[0] = col[0];
            uv0[1] = col[1];
            uv0[2] = col[2];
            col = vd_rt(p1[Z], vd_aw);
            uv1[0] = col[0];
            uv1[1] = col[1];
            uv1[2] = col[2];
            col = vd_rt(p2[Z], vd_aw);
            uv2[0] = col[0];
            uv2[1] = col[1];
            uv2[2] = col[2];
            col = vd_rt(p3[Z], vd_aw);
            uv3[0] = col[0];
            uv3[1] = col[1];
            uv3[2] = col[2];
        } else if (vd_Kr && tmat) {
            vdgeo.vd_fn(vd_iG);
            vdgeo.vd_cx(vd_iG, normal);
            var useZ = tmat[A22] != 1 || (tmat[A30] != 0 && tmat[A31] != 0 && tmat.A33 != 1);
            vdgeo.vd_kW(vd_iG);
            vdgeo.vd_ei(vd_iG, p0, _uv0);
            vdgeo.vd_ei(vd_iG, p1, _uv1);
            vdgeo.vd_ei(vd_iG, p2, _uv2);
            vdgeo.vd_ei(vd_iG, p3, _uv3);
            if (!useZ) {
                _uv0[Z] = _uv1[Z] = _uv2[Z] = _uv3[Z] = 0;
            }
            vdgeo.vd_ei(tmat, _uv0, uv0);
            vdgeo.vd_ei(tmat, _uv1, uv1);
            vdgeo.vd_ei(tmat, _uv2, uv2);
            vdgeo.vd_ei(tmat, _uv3, uv3);
            if (!useZ) {
                if (!vdgeo.AreEqual(uv0[Z], 0, vdgeo.DefaultVectorEquality)) {
                    uv0[X] /= uv0[Z];
                    uv0[Y] /= uv0[Z];
                }
                if (!vdgeo.AreEqual(uv1[Z], 0, vdgeo.DefaultVectorEquality)) {
                    uv1[X] /= uv1[Z];
                    uv1[Y] /= uv1[Z];
                }
                if (!vdgeo.AreEqual(uv2[Z], 0, vdgeo.DefaultVectorEquality)) {
                    uv2[X] /= uv2[Z];
                    uv2[Y] /= uv2[Z];
                }
                if (!vdgeo.AreEqual(uv3[Z], 0, vdgeo.DefaultVectorEquality)) {
                    uv3[X] /= uv3[Z];
                    uv3[Y] /= uv3[Z];
                }
            }
        }
    };
    function vd_EY(vd_v, render, vd_i) {
        if (vd_v.FaceList === undefined || vd_v.VertexList === undefined) return;
        var vd_aw = null;
        if (vd_v.GradientColors && vd_v.GradientColors.Items && vd_v.GradientColors.Items.length > 1) vd_aw = vd_v.GradientColors.Items;
        if (render.vd_cF() == vdConst.vd_nd && (!vd_v.Normals || !vd_v.UVS)) {
            var vd_Cx = vd_v.FaceList.Items.length / 5;
            vd_v.Normals = [];
            vd_v.Normals.length = vd_Cx;
            vd_v.UVS = [];
            vd_v.UVS.length = vd_Cx * 4;
            var ii = 0;
            var p0, p1, p2, p3;
            var vd_hp, vd_cG;
            var col = -1,
            vd_fU = -1;
            var vd_fC = render.vd_eq(0);
            var tmat = vd_fC;
            for (var i = 0; i < vd_v.FaceList.Items.length; i = i + 5) {
                vd_hp = i / 5;
                vd_cG = 4 * vd_hp;
                ii = Math.abs(vd_v.FaceList.Items[i]);
                p0 = vd_v.VertexList.Items[ii - 1];
                ii = Math.abs(vd_v.FaceList.Items[i + 1]);
                p1 = vd_v.VertexList.Items[ii - 1];
                ii = Math.abs(vd_v.FaceList.Items[i + 2]);
                p2 = vd_v.VertexList.Items[ii - 1];
                ii = Math.abs(vd_v.FaceList.Items[i + 3]);
                p3 = vd_v.VertexList.Items[ii - 1];
                col = vd_v.FaceList.Items[i + 4];
                if (vd_fU != col) {
                    vd_fU = col;
                    if (vd_fU == -1) {
                        tmat = vd_fC;
                    } else {
                        var pcol = vd_i.Palette.Items[vd_fU];
                        tmat = pcol.MaterialMatrix;
                    }
                }
                vd_v.UVS[vd_cG] = vdgeo.newpoint(0, 0, 0);
                vd_v.UVS[vd_cG + 1] = vdgeo.newpoint(0, 0, 0);
                vd_v.UVS[vd_cG + 2] = vdgeo.newpoint(0, 0, 0);
                vd_v.UVS[vd_cG + 3] = vdgeo.newpoint(0, 0, 0);
                vd_v.Normals[vd_hp] = vdgeo.newpoint(0, 0, 1);
                vd_Cg(p0, p1, p2, p3, tmat, vd_v.Normals[vd_hp], vd_v.UVS[vd_cG], vd_v.UVS[vd_cG + 1], vd_v.UVS[vd_cG + 2], vd_v.UVS[vd_cG + 3], vd_aw);
            }
            render.vd_eq(vd_fC);
        }
        render.vd_zp(vd_v.FaceList.Items, vd_v.VertexList.Items, vd_v.Normals, vd_v.UVS, vd_aw);
    };
    function vd_GA(vd_v, render, vd_i) {
        var vd_jI = vd_v.EdgeVisibility;
        if (vd_jI == undefined) vd_jI = 0;
        var p0 = vd_v.VertexList.Items[0],
        p1 = vd_v.VertexList.Items[1],
        p2 = vd_v.VertexList.Items[2],
        p3 = vd_v.VertexList.Items[3];
        if (render.vd_cF() == vdConst.vd_nd && (!vd_v.Normals || !vd_v.UVS)) {
            vd_v.Normals = [];
            vd_v.Normals.length = 1;
            vd_v.UVS = [];
            vd_v.UVS.length = 4;
            var vd_fC = render.vd_eq(0);
            vd_v.UVS[0] = vdgeo.newpoint(0, 0, 0);
            vd_v.UVS[1] = vdgeo.newpoint(0, 0, 0);
            vd_v.UVS[2] = vdgeo.newpoint(0, 0, 0);
            vd_v.UVS[3] = vdgeo.newpoint(0, 0, 0);
            vd_v.Normals[0] = vdgeo.newpoint(0, 0, 1);
            vd_Cg(p0, p1, p2, p3, vd_fC, vd_v.Normals[0], vd_v.UVS[0], vd_v.UVS[1], vd_v.UVS[2], vd_v.UVS[3]);
            render.vd_eq(vd_fC);
        }
        if (render.vd_cF() != vdConst.vd_nd) render.vd_fl(p0, p1, p2, p3);
        else render.vd_fl(p0, p1, p2, p3, ((vd_jI & 1) == 0), ((vd_jI & 2) == 0), ((vd_jI & 4) == 0), ((vd_jI & 8) == 0), vd_v.Normals[0], vd_v.UVS[0], vd_v.UVS[1], vd_v.UVS[2], vd_v.UVS[3]);
    };
    function vd_Fs(vd_v, render, vd_i) {
        render.vd_BC(vd_v.BasePoint, vd_v.Direction, vd_v.InfinityType == vdConst.InfinityTypes_Ray)
    };
    function vd_Fd(vd_v, render, vd_i) {
        if (vd_v.EcsMatrix == undefined) {
            var vd_nq = vd_i.PointStyleSize;
            if (vd_nq < 0.0) vd_nq = render.vd_aU * Math.abs(vd_nq) / 100.0;
            if (vd_v.ExtrusionVector == undefined) vd_v.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
            vd_v.EcsMatrix = vdgeo.vd_s();
            vdgeo.vd_ay(vd_v.EcsMatrix, vd_nq, vd_nq, 1.0);
            if (vd_v.AlignToViewSize) {
                render.vd_rQ(vd_v.AlignToViewSize, vd_v.EcsMatrix, vd_nq * 2.0);
            }
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_v.ExtrusionVector);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
        }
        if (vd_v.pointSegments == undefined) {
            vd_v.pointSegments = [];
            var pts;
            var mode = vd_i.PointStyleMode;
            if (mode !== 1) {
                if ((mode & 32) === 32) {
                    var vd_fg = vdgeo.vd_hT(vdgeo.CURVERESOLUTION, render.GetPixelSize(), vd_v.Radius, vdgeo.VD_TWOPI);
                    pts = vdgeo.vd_qL(vd_fg, 0.5, 0.0, vdgeo.VD_TWOPI, 0);
                    pts.push(vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), 0.0, 0.5));
                    vd_v.pointSegments.push(pts);
                    mode -= 32;
                }
                if ((mode & 64) === 64) {
                    pts = [vdgeo.newpoint( - 0.5, -0.5, 0.0), vdgeo.newpoint(0.5, -0.5, 0.0), vdgeo.newpoint(0.5, 0.5, 0.0), vdgeo.newpoint( - 0.5, 0.5, 0.0), vdgeo.newpoint( - 0.5, -0.5, 0.0)];
                    vd_v.pointSegments.push(pts);
                    mode -= 64;
                }
                if (mode === 0) {
                    pts = [vdgeo.newpoint(0, 0, 0), vdgeo.newpoint(0, 0, 0)];
                    vd_v.pointSegments.push(pts);
                }
                if (mode === 2) {
                    pts = [vdgeo.newpoint( - 1.0, 0.0, 0.0), vdgeo.newpoint(1.0, 0.0, 0.0)];
                    vd_v.pointSegments.push(pts);
                    pts = [vdgeo.newpoint(0.0, -1.0, 0.0), vdgeo.newpoint(0.0, 1.0, 0.0)];
                    vd_v.pointSegments.push(pts);
                }
                if (mode === 3) {
                    pts = [vdgeo.newpoint( - 1.0, -1.0, 0.0), vdgeo.newpoint(1.0, 1.0, 0.0)];
                    vd_v.pointSegments.push(pts);
                    pts = [vdgeo.newpoint( - 1.0, 1.0, 0.0), vdgeo.newpoint(1.0, -1.0, 0.0)];
                    vd_v.pointSegments.push(pts);
                }
                if (mode === 4) {
                    pts = [vdgeo.newpoint(0.0, 0.0, 0.0), vdgeo.newpoint(0.0, 1.0, 0.0)];
                    vd_v.pointSegments.push(pts);
                }
            }
        }
        render.vd_bf(vd_v.EcsMatrix);
        for (var ipl = 0; ipl < vd_v.pointSegments.length; ipl++) {
            render.vd_dQ(vd_v.pointSegments[ipl], false);
        }
        render.vd_bg();
        if (vd_v.AlignToViewSize) vd_v.EcsMatrix = undefined;
        if (render.vd_cF() == vdConst.vd_cp || vd_v.AlignToViewSize) vd_v.pointSegments = undefined;
    };
    function vd_FL(vd_v, render, vd_i) {
        if (vd_v.BlockRef && !vd_v.BlockRef.vd_mk && !vd_v.BlockRef.ExternalReferencePath && vd_v.EcsMatrix && vd_v.Columns === 1 && vd_v.Rows === 1 && (!vd_v.Attributes || !vd_v.Attributes.Items || !vd_v.Attributes.Items.length)) {
            render.vd_bf(vd_v.EcsMatrix);
            vd_v.BlockRef.vd_mk = true;
            vd_je(vd_v.BlockRef.Entities, true, render, vd_i);
            vd_v.BlockRef.vd_mk = false;
            render.vd_bg();
            return;
        }
        var idoc;
        var c, r, offset, omat;
        if (vd_v.BlockRef == undefined) {
            vd_v.BlockRef = vd_U.GetDictItem(vd_i.Blocks, vd_v.Block);
        }
        if (!vd_v.BlockRef) return;
        if (vd_v.BlockRef.vd_mk) return;
        if (vd_v.BlockRef.ExternalReferencePath && !vd_v.BlockRef.ExternalReference) {
            if (vd_aR.vd_Cu()) return;
            var vd_fw = vd_U.GetXREFS();
            for (idoc = 0; idoc < vd_fw.length; idoc++) {
                if (vd_fw[idoc].documentdata && vd_fw[idoc].documentdata.vd_Cu()) {
                    return;
                }
            }
            var vd_AN = false;
            var vd_vJ = vd_v.BlockRef.Name.toLowerCase();
            for (idoc = 0; idoc < vd_fw.length; idoc++) {
                if (vd_fw[idoc].KeyFile == vd_vJ) {
                    vd_AN = true;
                }
            }
            if (!vd_AN) vd_fw.push(new vd_BM(vd_U, vd_vJ, vd_v.BlockRef.ExternalReferencePath, vd_v.BlockRef));
            for (idoc = 0; idoc < vd_fw.length; idoc++) {
                if (vd_fw[idoc].KeyFile == vd_vJ) {
                    if (vd_fw[idoc].documentdata.vd_J) {
                        vd_v.BlockRef.ExternalReference = vd_fw[idoc].documentdata;
                        if (vd_v.BlockRef.ExternalReference.vd_J.BasePoint) vd_v.BlockRef.Origin = vd_v.BlockRef.ExternalReference.vd_J.BasePoint.concat([]);
                    }
                    break;
                }
            }
            if (!vd_v.BlockRef.ExternalReference) return;
        }
        if (vd_v.EcsMatrix == undefined) {
            if (vd_v.Columns == undefined) vd_v.Columns = 1;
            if (vd_v.Rows == undefined) vd_v.Rows = 1;
            if (vd_v.ColumnDist == undefined) vd_v.ColumnDist = 0.0;
            if (vd_v.RowDist == undefined) vd_v.RowDist = 0.0;
            vd_v.EcsMatrix = vdgeo.vd_s();
            if (vd_v.BlockRef.Origin == undefined) vd_v.BlockRef.Origin = vdgeo.newpoint(0, 0, 0);
            if (vd_v.Xscale == undefined) vd_v.Xscale = 1;
            if (vd_v.Yscale == undefined) vd_v.Yscale = 1;
            if (vd_v.Zscale == undefined) vd_v.Zscale = 1;
            if (vd_v.Rotation == undefined) vd_v.Rotation = 0;
            if (vd_v.ExtrusionVector == undefined) vd_v.ExtrusionVector = vdgeo.newpoint(0, 0, 1);
            if (vd_v.InsertionPoint == undefined) vd_v.InsertionPoint = vdgeo.newpoint(0, 0, 0);
            vdgeo.vd_ae(vd_v.EcsMatrix, -vd_v.BlockRef.Origin[X], -vd_v.BlockRef.Origin[Y], -vd_v.BlockRef.Origin[Z]);
            vdgeo.vd_ay(vd_v.EcsMatrix, vd_v.Xscale, vd_v.Yscale, vd_v.Zscale);
            if (vd_v.AlignToViewSize && vd_v.BoundingBox != undefined) {
                render.vd_rQ(vd_v.AlignToViewSize, vd_v.EcsMatrix, vd_v.BoundingBox[4] - vd_v.BoundingBox[1]);
            }
            vdgeo.vd_ag(vd_v.EcsMatrix, vd_v.Rotation);
            vdgeo.vd_cx(vd_v.EcsMatrix, vd_v.ExtrusionVector);
            vdgeo.vd_ae(vd_v.EcsMatrix, vd_v.InsertionPoint[X], vd_v.InsertionPoint[Y], vd_v.InsertionPoint[Z]);
        }
        var isArray = vd_v.Columns > 1 || vd_v.Rows > 1;
        render.vd_bf(vd_v.EcsMatrix);
        vd_v.BlockRef.vd_mk = true;
        for (c = 0; c < vd_v.Columns; c++) {
            for (r = 0; r < vd_v.Rows; r++) {
                if (isArray) {
                    offset = vdgeo.newpoint(c * vd_v.ColumnDist / vd_v.Xscale, r * vd_v.RowDist / vd_v.Yscale, 0.0);
                    omat = vdgeo.vd_s();
                    vdgeo.vd_ae(omat, offset[X], offset[Y], offset[Z]);
                    render.vd_bf(omat);
                }
                if (vd_v.BlockRef.ExternalReference) {
                    var vd_Ma = vd_aR;
                    vd_aR = vd_v.BlockRef.ExternalReference;
                    vd_je(vd_aR.vd_J.Model.Entities, true, render, vd_aR.vd_J);
                    vd_aR = vd_Ma;
                    if (vd_aR.vd_J.Palette && vd_aR.vd_J.Palette._lc && vd_aR.vd_J.Palette._lc._a1 != false && vd_v.BlockRef.ExternalReference.vd_J && vd_v.BlockRef.ExternalReference.vd_J.Palette && vd_v.BlockRef.ExternalReference.vd_J.Palette._lc && vd_v.BlockRef.ExternalReference.vd_J.Palette._lc._a1 == false) vd_aR.vd_J.Palette._lc._a1 = false;
                } else {
                    vd_je(vd_v.BlockRef.Entities, true, render, vd_i);
                }
                if (isArray) render.vd_bg();
            }
        }
        vd_v.BlockRef.vd_mk = false;
        render.vd_bg();
        if (vd_v.Attributes && vd_v.Attributes.Items && vd_v.Attributes.Items.length > 0) {
            for (c = 0; c < vd_v.Columns; c++) {
                for (r = 0; r < vd_v.Rows; r++) {
                    if (isArray) {
                        offset = vdgeo.pointPolar(vdgeo.newpoint(0, 0, 0), vd_v.Rotation, c * vd_v.ColumnDist);
                        offset = vdgeo.pointPolar(offset, vd_v.Rotation + vdgeo.HALF_PI, r * vd_v.RowDist);
                        omat = vdgeo.vd_s();
                        vdgeo.vd_ae(omat, offset[X], offset[Y], offset[Z]);
                        render.vd_bf(omat);
                    }
                    vd_je(vd_v.Attributes, false, render, vd_i);
                    if (isArray) render.vd_bg();
                }
            }
        }
        if (vd_v.AlignToViewSize) vd_v.EcsMatrix = undefined;
    };
    this.ActionDrawEntities = function(entities, vd_tF) {
        vd_R.vd_Y.ActionDrawEntities(entities, vd_tF);
    };
    this.ToolTip = new
    function() {
        this.AutoShow = true;
        var vd_aY = this;
        var vd_rR = null;
        var vdcanvas = vd_U;
        this.vd_sD = 1500;
        Object.defineProperty(vd_aY, 'TimeOut', {
            get: function() {
                return vd_aY.vd_sD;
            },
            set: function(newValue) {
                vd_aY.vd_sD = newValue;
            }
        });
        this.vd_sk = [255, 255, 255];
        Object.defineProperty(vd_aY, 'FillColor1', {
            get: function() {
                return vd_aY.vd_sk;
            },
            set: function(newValue) {
                vd_aY.vd_sk = newValue;
            }
        });
        this.vd_tk = [211, 211, 211];
        Object.defineProperty(vd_aY, 'FillColor2', {
            get: function() {
                return vd_aY.vd_tk;
            },
            set: function(newValue) {
                vd_aY.vd_tk = newValue;
            }
        });
        this.vd_ve = [72, 72, 72];
        Object.defineProperty(vd_aY, 'BoundaryColor', {
            get: function() {
                return vd_aY.vd_ve;
            },
            set: function(newValue) {
                vd_aY.vd_ve = newValue;
            }
        });
        this.vd_va = [0, 0, 0];
        Object.defineProperty(vd_aY, 'FontColor', {
            get: function() {
                return vd_aY.vd_va;
            },
            set: function(newValue) {
                vd_aY.vd_va = newValue;
            }
        });
        this.vd_sb = 'sans-serif';
        Object.defineProperty(vd_aY, 'FontName', {
            get: function() {
                return vd_aY.vd_sb;
            },
            set: function(newValue) {
                vd_aY.vd_sb = newValue;
            }
        });
        this.vd_uh = 16;
        Object.defineProperty(vd_aY, 'FontHeight', {
            get: function() {
                return vd_aY.vd_uh;
            },
            set: function(newValue) {
                vd_aY.vd_uh = newValue;
            }
        });
        this.vd_CG = [0, 0];
        Object.defineProperty(vd_aY, 'BoundaryOffset', {
            get: function() {
                return vd_aY.vd_CG;
            },
            set: function(newValue) {
                vd_aY.vd_CG = newValue;
            }
        });
        function vd_Kn(point, width, height) {
            var vd_iT = new Array(point[0], point[1]);
            var xmin = vd_iT[0];
            var xmax = vd_iT[0] + width;
            var ymin = vd_iT[1];
            var ymax = vd_iT[1] + height;
            var vd_MN = vdcanvas.canvas.height;
            var vd_Fa = vdcanvas.canvas.width;
            if (xmax > vd_Fa) vd_iT[0] = point[0] - width;
            if (ymin < 0) vd_iT[1] = 0;
            return vd_iT;
        };
        this.show = function(p, str, size, timeout) {
            var vd_eK = vdcanvas.ViewToPixel(p);
            vd_aY.vd_zP(vd_eK, str, size, timeout);
        };
        this.vd_zP = function(vd_cn, str, size, timeout) {
            if (!str || str == "") return;
            var vd_eK = [vd_cn[0], vd_cn[1], 0];
            if (size === undefined) size = vd_aY.vd_uh;
            vd_aY.hide();
            var ctxt = vdcanvas.canvas.getContext('2d');
            var lines = str.split("\\n");
            var vd_pJ = 0;
            var i;
            for (i = 0; i < lines.length; i++) {
                vd_pJ = Math.max(vd_pJ, ctxt.measureText(lines[i]).width);
            }
            var vd_yB = size + 4;
            var vd_mb = vd_yB * lines.length;
            vd_eK[1] -= vd_mb;
            vd_eK = vd_Kn(vd_eK, vd_pJ + 4, vd_mb + 4);
            var vd_vP = ctxt.createLinearGradient(vd_eK[0], vd_eK[1], vd_eK[0], vd_eK[1] + size);
            vd_vP.addColorStop(0, vdgdi.vd_hh(vd_aY.vd_sk));
            vd_vP.addColorStop(1, vdgdi.vd_hh(vd_aY.vd_tk));
            ctxt.fillStyle = vd_vP;
            var vd_gA = vd_eK.slice();
            vd_eK[0] += 3;
            vd_eK[1] += 2;
            var vd_sQ = vd_pJ + 6;
            vd_gA[0] += 1;
            vd_gA[1] += 1;
            ctxt.fillRect(vd_gA[0], vd_gA[1], vd_sQ, vd_mb);
            ctxt.strokeStyle = vdgdi.vd_hh(vd_aY.vd_ve);
            var lw = ctxt.lineWidth;
            ctxt.lineWidth = 1;
            vd_sQ += 2;
            vd_mb += 2;
            vd_gA[0] -= 1;
            vd_gA[1] -= 1;
            ctxt.strokeRect(vd_gA[0], vd_gA[1], vd_sQ, vd_mb);
            ctxt.lineWidth = lw;
            ctxt.font = size + "px " + vd_aY.vd_sb;
            ctxt.fillStyle = vdgdi.vd_hh(vd_aY.vd_va);
            ctxt.textBaseline = 'top';
            for (i = 0; i < lines.length; i++) {
                ctxt.fillText(lines[i], vd_eK[0], vd_eK[1] + i * vd_yB);
            }
            if (timeout === undefined) timeout = vd_aY.vd_sD;
            if (timeout) vd_rR = setTimeout(vd_aY.hide, timeout);
        };
        this.hide = function() {
            if (vd_rR) {
                clearTimeout(vd_rR);
                vd_rR = null;
                vd_R.vd_Y.Refresh();
                return true;
            }
            return false;
        }
    };
    this.DrawEntity = function(entity, render) {
        if (!render) render = vd_U.vd_p();
        vd_ce(entity, render, vd_g());
    };
    function vd_ce(vd_v, render, vd_i, index, vd_kr) {
        if (!vd_v) return;
        if (vd_v.Deleted === true) return;
        if (vd_v.visibility === 1) return;
        var vd_hW = render.vd_ot();
        vd_EG(vd_v, vd_i, render);
        if (vd_v._t !== vdConst.vdViewport_code) {
            if (vd_U.vd_By(vd_v.LayerRef, vd_i)) return;
        }
        if (render.vd_cF() == vdConst.vd_cp) {
            if (vd_hW == null && vd_v.BoundingBox != undefined) {
                render.vd_gi.vd_ty(vd_v.BoundingBox);
                return;
            }
        } else {
            if (vd_v._t !== vdConst.vdViewport_code && vd_v._t !== vdConst.vdInsert_code) {
                if (vd_hW && vd_hW._t == vdConst.vdInsert_code && vd_hW.LayerRef) {
                    if (vd_v.LayerRef.Name == "0") {
                        if (vd_hW.LayerRef.On === false) return;
                    } else if (vd_v.LayerRef.On === false) return;
                } else {
                    if (vd_v.LayerRef.On === false) return;
                }
            }
        }
        var pw, col, vd_dN, vd_mB, lt, ltscale, highlight;
        render.vd_mP(vd_v, vd_kr ? index: undefined);
        col = vd_Im(vd_v, render);
        if (!render.vd_nB()) {
            pw = vd_Jn(vd_v, render);
            vd_dN = vd_Jf(vd_v, render);
            vd_mB = vd_JE(vd_v, render);
            lt = vd_HL(vd_v, render);
            ltscale = vd_HO(vd_v, render);
            highlight = render.vd_wB(vd_v.HighLight);
        }
        if (vd_v.Explode !== undefined) {
            vd_je(vd_v.Explode, false, render, vd_i);
        } else if (vd_v._t === vdConst.vdLine_code) {
            vd_EQ(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdInsert_code) {
            if (vd_v.AlignToViewSize && vd_hW == null && !vd_v.BoundingBox && render.vd_cF() != vdConst.vd_cp) {
                vd_cX.clear();
                vd_ce(vd_v, vd_cX, vd_i);
                vd_v.BoundingBox = vd_cX.vd_gi.vd_iE();
            }
            vd_FL(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdPolyface_code) {
            vd_EY(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vd3DFace_code) {
            vd_GA(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdText_code) {
            vd_pv(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdAttribDef_code && vd_v.InVisibleMode !== true) {
            if (vd_hW != null) {
                if (vd_v.IsConstant == true) {
                    var str = vd_v.TextString;
                    vd_v.TextString = vd_v.ValueString;
                    vd_pv(vd_v, render, vd_i);
                    vd_v.TextString = str;
                }
            } else {
                vd_pv(vd_v, render, vd_i);
            }
        } else if (vd_v._t === vdConst.vdAttrib_code) {
            if (vd_v.IsConstant != true && vd_v.InVisibleMode !== true) vd_pv(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdPolyline_code) {
            vd_GE(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdRect_code) {
            vd_Fg(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdImage_code) {
            vd_GB(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdCircle_code) {
            vd_FD(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdArc_code) {
            vd_Fo(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdEllipse_code) {
            vd_GG(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdPolyhatch_code) {
            vd_ER(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdInfinityLine_code) {
            vd_Fs(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdPoint_code) {
            vd_Fd(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdViewport_code) {
            vd_Fj(vd_v, render, vd_i);
        } else if (vd_v._t === vdConst.vdNote_code) {
            vd_v.vd_Ha(render);
        }
        render.vd_mP(null);
        if (!render.vd_nB()) {
            render.vd_wB(highlight);
            render.vd_wW(lt);
            render.vd_wL(ltscale);
            render.vd_dK(pw);
        }
        render.vd_aZ(col);
        if (vd_v.selected && !render.vd_nB() && render.vd_cF() != vdConst.vd_cp) {
            render.vd_pr(vdConst.ActionHighLightColor);
            vd_ce(vd_v, render, vd_i);
            render.vd_nf();
        }
        if (vd_hW == null && !vd_v.BoundingBox && render.vd_cF() != vdConst.vd_cp) {
            vd_cX.clear();
            vd_ce(vd_v, vd_cX, vd_i);
            vd_v.BoundingBox = vd_cX.vd_gi.vd_iE();
        }
    };
    function vd_pL(vd_eh, vd_hC, render, vd_i) {
        if (!render.vd_bu || render.vd_cF() == vdConst.vd_cp) {
            vd_je(vd_eh, vd_hC, render, vd_i, true);
            return;
        }
        render.vd_nm(1);
        vd_je(vd_eh, vd_hC, render, vd_i, true);
        if (render.vd_wS) {
            render.vd_nm(2);
            vd_je(vd_eh, vd_hC, render, vd_i, true);
        }
        render.vd_nm(3);
    };
    function vd_je(vd_eh, vd_hC, render, vd_i, vd_kr) {
        if (vd_eh == undefined || vd_eh.Items == undefined || vd_eh.Items.length == undefined) return;
        var k = 0;
        for (k = 0; k < vd_eh.Items.length; k++) {
            vd_Ew(vd_eh, vd_hC, render, vd_i, k, vd_kr);
        }
    };
    function vd_Ew(vd_eh, vd_hC, render, vd_i, i, vd_kr) {
        vd_hC = vd_hC || (typeof vd_eh.Items[i] == 'string');
        if (vd_hC) vd_ce(vd_U.GetEntityItem(vd_eh.Items[i]), render, vd_i, i, vd_kr);
        else {
            vd_ce(vd_eh.Items[i], render, vd_i, i, vd_kr);
        }
    };
    function vd_EO(vd_L, vd_t, vd_x) {
        if (!vd_L) return;
        for (var i = vd_L[0].length - 1; i >= 0; i--) {
            var pos = i;
            var vd_v = vd_L[0][pos];
            if (!vd_v) return;
            if (vd_v._t === vdConst.vdLine_code) {
                vd_DT(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdInsert_code) {
                vd_uE(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdPolyface_code) {
                vd_Et(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vd3DFace_code) {
                vd_Dv(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdText_code) {
                vd_uE(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdAttrib_code) {
                vd_uE(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdPolyline_code) {
                vd_Ee(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdRect_code) {
                vd_yf(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdImage_code) {
                vd_yf(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdCircle_code) {
                vd_Em(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdArc_code) {
                vd_DV(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdEllipse_code) {
                vd_Dp(pos, vd_L, vd_t, vd_x);
            } else if (vd_v._t === vdConst.vdPoint_code) {
                vd_DE(pos, vd_L, vd_t, vd_x);
            }
            if (vd_x.length > vdConst.OsnapMaxItems) break;
        }
    };
    function vd_aA(pos, vd_L, pt) {
        var ret = vdgeo.newpoint(pt[X], pt[Y], pt[Z]);
        for (var i = pos; i >= 0; i--) {
            if (!vd_L[0][i].EcsMatrix) continue;
            vdgeo.vd_sy(vd_L[0][i].EcsMatrix, ret[X], ret[Y], ret[Z], ret);
        }
        vdgeo.vd_sy(vd_R.vd_aS(), ret[X], ret[Y], ret[Z], ret);
        return ret;
    };
    function vd_DT(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, vd_v.StartPoint);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, vd_v.EndPoint);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(vd_v.StartPoint, vd_v.EndPoint));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
    };
    function vd_Ee(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        if (vd_v.SPlineFlag && vd_v.SPlineFlag !== vdConst.SplineFlagSTANDARD) return;
        var pt;
        var vd_gM = vd_L[1];
        if (vd_gM !== undefined) {
            var sp = vd_v.VertexList.Items[vd_gM];
            var ep;
            if (vd_gM >= vd_v.VertexList.Items.length - 1) ep = vd_v.VertexList.Items[0];
            else ep = vd_v.VertexList.Items[vd_gM + 1];
            if ((vd_t & vdConst.OsnapMode_END)) {
                pt = vd_aA(pos, vd_L, sp);
                vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
                pt = vd_aA(pos, vd_L, ep);
                vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            }
            if ((vd_t & vdConst.OsnapMode_MID)) {
                var success = vdgeo.Bulge2Arc(sp, ep);
                if (!success) {
                    pt = vd_aA(pos, vd_L, vdgeo.MidPoint(sp, ep));
                    vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
                } else {
                    var Center = success[0];
                    var radius = success[1];
                    var vd_fb = success[2];
                    var vd_fe = success[3];
                    pt = vd_aA(pos, vd_L, vdgeo.pointPolar(Center, vd_fb + vdgeo.FixAngle(vd_fe - vd_fb) * 0.5, radius));
                    vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
                }
            }
        }
    };
    function vd_Et(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        var vd_gM = vd_L[1];
        if (vd_gM === undefined) return;
        var pos4 = vd_gM % 5;
        var sp = vd_v.VertexList.Items[Math.abs(vd_v.FaceList.Items[vd_gM]) - 1];
        var ep;
        if (pos4 == 3) ep = vd_v.VertexList.Items[Math.abs(vd_v.FaceList.Items[vd_gM - 3]) - 1];
        else ep = vd_v.VertexList.Items[Math.abs(vd_v.FaceList.Items[vd_gM + 1]) - 1];
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, sp);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, ep);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(sp, ep));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
    };
    function vd_Dv(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        var p0 = vd_v.VertexList.Items[0],
        p1 = vd_v.VertexList.Items[1],
        p2 = vd_v.VertexList.Items[2],
        p3 = vd_v.VertexList.Items[3];
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, p0);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p1);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p2);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p3);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p0, p1));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p1, p2));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p2, p3));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p3, p0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
    };
    function vd_yf(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        var p0 = vdgeo.newpoint(0, 0, 0),
        p1 = vdgeo.newpoint(vd_v.Width, 0, 0),
        p2 = vdgeo.newpoint(vd_v.Width, vd_v.Height, 0),
        p3 = vdgeo.newpoint(0, vd_v.Height, 0);
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, p0);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p1);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p2);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, p3);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p0, p1));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p1, p2));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p2, p3));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
            pt = vd_aA(pos, vd_L, vdgeo.MidPoint(p3, p0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
        if ((vd_t & vdConst.OsnapMode_INS)) {
            pt = vd_aA(pos, vd_L, p0);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_INS]);
        }
    };
    function vd_Em(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        if ((vd_t & vdConst.OsnapMode_CEN)) {
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
        }
        if ((vd_t & vdConst.OsnapMode_QUA)) {
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(vd_v.Radius, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, vd_v.Radius, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
            pt = vd_aA(pos, vd_L, vdgeo.newpoint( - vd_v.Radius, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, -vd_v.Radius, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_QUA]);
        }
    };
    function vd_DV(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        var Center = vdgeo.newpoint(0, 0, 0);
        if ((vd_t & vdConst.OsnapMode_CEN)) {
            pt = vd_aA(pos, vd_L, Center);
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
        }
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, vdgeo.pointPolar(Center, vd_v.StartAngle, vd_v.Radius));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, vdgeo.pointPolar(Center, vd_v.EndAngle, vd_v.Radius));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.pointPolar(Center, vd_v.StartAngle + vdgeo.FixAngle(vd_v.EndAngle - vd_v.StartAngle) * 0.5, vd_v.Radius));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
    };
    function vd_Dp(pos, vd_L, vd_t, vd_x) {
        var vd_v = vd_L[0][pos];
        var pt;
        if ((vd_t & vdConst.OsnapMode_CEN)) {
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_CEN]);
        }
        if ((vd_t & vdConst.OsnapMode_END)) {
            pt = vd_aA(pos, vd_L, vdgeo.vd_rT(vd_v.StartAngle, vd_v.MajorLength, vd_v.MinorLength));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
            pt = vd_aA(pos, vd_L, vdgeo.vd_rT(vd_v.EndAngle, vd_v.MajorLength, vd_v.MinorLength));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_END]);
        }
        if ((vd_t & vdConst.OsnapMode_MID)) {
            pt = vd_aA(pos, vd_L, vdgeo.vd_rT(vd_v.StartAngle + vdgeo.FixAngle(vd_v.EndAngle - vd_v.StartAngle) * 0.5, vd_v.MajorLength, vd_v.MinorLength));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_MID]);
        }
    };
    function vd_DE(pos, vd_L, vd_t, vd_x) {
        var pt;
        if ((vd_t & vdConst.OsnapMode_NODE)) {
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_NODE]);
        }
    };
    function vd_uE(pos, vd_L, vd_t, vd_x) {
        var pt;
        if ((vd_t & vdConst.OsnapMode_INS)) {
            pt = vd_aA(pos, vd_L, vdgeo.newpoint(0, 0, 0));
            vd_x.push([pt[X], pt[Y], pt[Z], vdConst.OsnapMode_INS]);
        }
    };
    this.SetOsnapMode = function(mode) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.vd_gv = mode;
    };
    this.GetOsnapMode = function() {
        var vd_i = vd_g();
        if (vd_i == null) return vdConst.OsnapMode_NONE;
        if (!vd_i.vd_gv) return vdConst.OsnapMode_NONE;
        var ret = vd_i.vd_gv;
        return ret;
    };
    this.vd_Od = function() {
        var vd_i = vd_g();
        if (vd_i == null) return true;
        return (vd_i.vd_gv && (vd_i.vd_gv & vdConst.OsnapMode_DISABLE));
    };
    this.EnableOsnapMode = function(bval) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        if (!vd_i.vd_gv) vd_i.vd_gv = vdConst.OsnapMode_NONE;
        if ((vd_i.vd_gv & vdConst.OsnapMode_DISABLE)) vd_i.vd_gv ^= vdConst.OsnapMode_DISABLE;
        if (!bval) vd_i.vd_gv |= vdConst.OsnapMode_DISABLE;
    };
    this.vd_Lo = function(x, y, vd_mU, vd_db) {
        var vd_t = vd_U.GetOsnapMode();
        if (vd_t == vdConst.OsnapMode_NONE) return null;
        if (vd_t & vdConst.OsnapMode_DISABLE) return null;
        if (!vd_R.vd_aG) return null;
        x = vdgeo.vd_o(x);
        y = vdgeo.vd_o(y);
        if (x < 0 || x >= vd_R.width) return null;
        if (y < 0 || y >= vd_R.height) return null;
        var vd_yp = vdgeo.vd_as(x, y, 0, vd_R.vd_bD);
        if (!vd_mU) vd_mU = vd_U.PickSize;
        if (!vd_db) vd_db = vd_U.IgnoreLockLayers;
        var vd_gd = Math.max(vdgeo.vd_o(vd_mU * 0.5), 1);
        var vd_hj = [];
        var vd_x = [];
        var vd_dy = null;
        if ((vd_t & vdConst.OsnapMode_NEA)) vd_dy = [0, 0, 0, 0];
        var px, py;
        for (var p = 0; p < vd_gd; p++) {
            for (var ix = -p; ix <= p; ix++) {
                px = x + ix;
                py = y - p;
                vd_px(px, py, vd_t, vd_x, vd_hj, vd_dy, vd_db);
                py = y + p;
                vd_px(px, py, vd_t, vd_x, vd_hj, vd_dy, vd_db);
            }
            for (var iy = -p + 1; iy < p; iy++) {
                px = x - p;
                py = y + iy;
                vd_px(px, py, vd_t, vd_x, vd_hj, vd_dy, vd_db);
                px = x + p;
                py = y + iy;
                vd_px(px, py, vd_t, vd_x, vd_hj, vd_dy, vd_db);
            }
        }
        vd_hj.length = 0;
        if (vd_x.length > 0) {
            vd_x.sort(function(a, b) {
                return vdgeo.Distance2D(a, vd_yp) - vdgeo.Distance2D(b, vd_yp);
            });
            if (vd_dy && vd_dy[3] === vdConst.OsnapMode_NEA) {
                var vd_cn = vdgeo.vd_as(vd_x[0][X], vd_x[0][Y], vd_x[0][Z], vd_R.vd_cR);
                if (vd_cn[X] < x - vd_gd || vd_cn[X] > x + vd_gd || vd_cn[Y] < y - vd_gd || vd_cn[Y] > y + vd_gd) {
                    return vd_dy;
                }
            }
            return vd_x[0];
        }
        if (vd_dy && vd_dy[3] === vdConst.OsnapMode_NEA) return vd_dy;
        return null;
    };
    function vd_px(px, py, vd_t, vd_x, vd_hj, vd_dy, vd_db) {
        var c = 0;
        if (px < 0 || px >= vd_R.width || py < 0 || py >= vd_R.height) return;
        var ipos = py * vd_R.width + px;
        var vd_l = vd_R.vd_Y.vd_nU();
        if (vd_dy && vd_dy[3] == 0 && vd_l[ipos][1] && vd_l[ipos][1].length > 0) {
            var z = vd_R.vd_Y.vd_kd(px, py);
            var pt = vdgeo.vd_as(px, py, z, vd_R.vd_bD);
            vd_dy[X] = pt[X];
            vd_dy[Y] = pt[Y];
            vd_dy[Z] = pt[Z];
            vd_dy[3] = vdConst.OsnapMode_NEA;
        }
        var ret = vd_l[ipos][2];
        if (!ret) return;
        if (vd_Gi(vd_hj, ret)) return;
        vd_hj.push(ret);
        vd_EO(ret, vd_t, vd_x);
    };
    function vd_Gi(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0].length === obj[0].length && arr[i][1] === obj[1] && arr[i][0][arr[i][0].length - 1] == obj[0][obj[0].length - 1]) return true;
        }
        return false;
    };
    function vd_sG(layout) {
        if (layout == null) return null;
        if (layout.BoundingBox) return layout.BoundingBox;
        vd_cX.clear();
        vd_pL(layout.Entities, true, vd_cX, vd_g());
        layout.BoundingBox = vd_cX.vd_gi.vd_iE();
        return layout.BoundingBox;
    };
    this.GetExtents = function() {
        return vd_sG(vd_U.GetActiveLayout());
    };
    var vd_si = true;
    this.EnableRedraw = function(vd_tX) {
        var ret = vd_si;
        vd_si = vd_tX;
        return ret;
    };
    Object.defineProperty(vd_U, 'Notes', {
        get: function() {
            var vd_i = vd_U.GetDocument();
            if (!vd_i) return null;
            return vd_i.vd_Cp;
        }
    });
    var vd_Iu = new vd_Ev(vd_U);
    Object.defineProperty(vd_U, 'GripManager', {
        get: function() {
            return vd_Iu;
        }
    });
    this.vd_uO = function() {
        return (vd_U.DrawOverallEntities && vd_U.DrawOverallEntities.length > 0) || vd_U.GripManager.vd_uO();
    };
    this.vd_nz = function(render) {
        try {
            vd_U.GripManager.vd_nz(render);
            if (vd_U.DrawOverallEntities && vd_U.DrawOverallEntities.length > 0) {
                for (var i = 0; i < vd_U.DrawOverallEntities.length; i++) {
                    vd_U.DrawEntity(vd_U.DrawOverallEntities[i], render);
                }
            }
        } catch(ex) {}
    };
    this.DrawOverallEntities = [];
    var vd_eY = 0;
    this.redraw = function(vd_pW, vd_GS) {
        if (!vd_si) return;
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = null;
        var t1_0, t1_1;
        t1_0 = new Date().getTime();
        var vd_i = vd_g();
        var layout = vd_U.GetActiveLayout();
        vd_gO(layout, vd_pW);
        vd_R.vd_Y.vd_fK = true;
        if (vd_i != null) {
            vd_R.vd_np(vd_i.Palette, layout.BkColorEx);
        }
        vd_R.clear();
        if (vd_i != null && !vd_GS) {
            var vd_mq = vd_R.vd_ij(layout.ShowHidenEdges);
            vd_pL(layout.Entities, true, vd_R, vd_i);
            vd_R.vd_ij(vd_mq);
        }
        vd_U.Refresh();
        vd_R.vd_Y.vd_CR();
        vd_nM = null;
        t1_1 = new Date().getTime();
        vd_eY = t1_1 - t1_0;
        vd_zC();
    };
    this.GetXREFS = function() {
        if (!vd_rn()) return [];
        if (!vd_rn().vd_kT) vd_rn().vd_kT = [];
        return vd_rn().vd_kT;
    };
    function vd_BM(vd_Bn, vd_Ca, vd_AR, blockref) {
        var vd_U = this;
        this.target = vd_Bn;
        this.Block = blockref;
        this.KeyFile = vd_Ca;
        this.OriginalSingleFileName = vd_Ca;
        this.OriginalPath = vd_AR;
        this.UrlPath = vd_AR;
        this.documentdata = new vd_vj(vd_Bn);
        this.Cancel = false;
        this.load = function() {
            if (vd_U.Block.vd_kp && vd_U.documentdata && vd_U.documentdata.vd_J && vd_U.documentdata.vd_iv !== "") {
                var vd_vn = vd_U.Block.vd_kp;
                vd_U.Block.vd_kp = undefined;
                vd_vn(vd_U);
                return true;
            }
            if (vd_U.documentdata && !vd_U.documentdata.vd_J && vd_U.documentdata.vd_iv == "") {
                if (vd_U.target.vdLoadXref) vd_U.target.vdLoadXref(vd_U);
                if (!vd_U.Cancel) {
                    setTimeout(vd_U.target.vd_tG(vd_U.documentdata, vd_U.UrlPath, false,
                    function() {
                        if (vd_U.Block.vd_kp) {
                            var vd_vn = vd_U.Block.vd_kp;
                            vd_U.Block.vd_kp = undefined;
                            vd_vn(vd_U);
                        } else {
                            vd_U.target.UpdateLayout();
                            setTimeout(vd_U.target.redraw, 0);
                            if (vd_U.target.vdXrefLoaded) vd_U.target.vdXrefLoaded(vd_U);
                        }
                    }), 0);
                    return true;
                }
            }
            return false;
        };
        return this;
    };
    function vd_zC() {
        var vd_fw = vd_U.GetXREFS();
        for (var idoc = 0; idoc < vd_fw.length; idoc++) {
            if (vd_fw[idoc].load()) return;
        }
    };
    function vd_Cb() {
        vd_U.canvas.title = "";
    };
    function vd_Gw(vd_po, vd_nV) {
        var maxx = Math.max(vd_nV[X], vd_po[X]);
        var minx = Math.min(vd_nV[X], vd_po[X]);
        var vd_e = Math.max(vd_nV[Y], vd_po[Y]);
        var vd_W = Math.min(vd_nV[Y], vd_po[Y]);
        var w = maxx - minx;
        var h = vd_e - vd_W;
        var l1 = vd_R.width / w;
        var l2 = vd_R.height / h;
        var l = Math.min(l1, l2);
        return (vd_R.height / l);
    };
    this.zoomwindow = function(np1, np2, vd_KI) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var p1 = vdgeo.newpoint(np1[X], np1[Y], np1[Z]);
        var p2 = vdgeo.newpoint(np2[X], np2[Y], np2[Z]);
        var vd_bd = vdgeo.vd_bY(layout.World2ViewMatrix);
        if (!vd_KI) {
            if (vd_R.vd_ba && vd_R.vd_bu) {
                var _p1 = vdgeo.vd_as(p1[X], p1[Y], p1[Z], vd_R.vd_cR);
                var _p2 = vdgeo.vd_as(p2[X], p2[Y], p2[Z], vd_R.vd_cR);
                if (vd_R.vd_Bl(_p1[X], _p1[Y]) && vd_R.vd_Bl(_p2[X], _p2[Y])) {
                    var z = vd_R.vd_Y.vd_CX(_p1[X], _p2[X], _p1[Y], _p2[Y]);
                    p1 = vdgeo.vd_as(_p1[X], _p1[Y], z, vd_R.vd_bD);
                    p2 = vdgeo.vd_as(_p2[X], _p2[Y], z, vd_R.vd_bD);
                    vd_bd = vdgeo.vd_bY(vd_R.vd_aS());
                }
            }
        }
        var vd_c = vdgeo.MidPoint(p1, p2);
        var vd_gh, vd_pd, vd_kH, vd_lD, vd_op;
        var vd_pj = Math.abs(p2[X] - p1[X]);
        var vd_nY = Math.abs(p2[Y] - p1[Y]);
        var vd_hV = 0;
        var vd_hM = vd_U.canvas.width / vd_U.canvas.height;
        if (!layout.FocalLength) layout.FocalLength = 0.05;
        if (!layout.LensAngle) layout.LensAngle = 60.0;
        if (vd_pj / vd_nY < vd_hM) {
            vd_gh = vdgeo.DegreesToRadians(layout.LensAngle) / 2;
            vd_pd = vd_nY / 2;
            vd_hV = vd_pd / Math.tan(vd_gh);
        } else {
            vd_kH = 2.0 * layout.FocalLength * Math.tan(vdgeo.DegreesToRadians(layout.LensAngle / 2.0));
            vd_lD = vdgeo.RadiansToDegrees(Math.atan(vd_kH * vd_hM * 0.5 / layout.FocalLength)) * 2.0;
            vd_gh = vdgeo.DegreesToRadians(vd_lD) / 2;
            vd_op = vd_pj / 2;
            vd_hV = vd_op / Math.tan(vd_gh);
        }
        vd_c[Z] = Math.max(p1[Z], p2[Z]) + vd_hV;
        var vd_aU = vd_Gw(p1, p2);
        var vd_Q = new vd_oS(vd_U, vd_c[X], vd_c[Y], vd_c[Z], vd_aU, vd_bd);
        if (vd_U.vdUpdateView != null) vd_U.vdUpdateView(vd_Q);
        if (!vd_Q.Cancel) {
            layout.ViewSize = vd_Q.ViewSize;
            layout.ViewCenter = vdgeo.newpoint(vd_Q.ViewCenterX, vd_Q.ViewCenterY, vd_Q.ViewCenterZ);
            layout.World2ViewMatrix = vd_Q.vd_qA;
            vd_gO(layout);
        }
    };
    this.zoomExtents = function() {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var vd_mo = vd_U.GetExtents();
        if (vd_mo == null) return;
        var box = vdgeo.vd_qd(layout.World2ViewMatrix, vd_mo);
        var bmin = vdgeo.newpoint(box[0], box[1], box[2]);
        var bmax = vdgeo.newpoint(box[3], box[4], box[5]);
        vd_U.zoomwindow(bmin, bmax, true);
    };
    this.SetStdView = function(vd_gR) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var vd_eE = vdgeo.newpoint(0.0, 0.0, 1.0);
        if (vd_gR === vdConst.StdView_TOP) {
            vd_eE = vdgeo.newpoint(0.0, 0.0, 1.0);
        } else if (vd_gR === vdConst.StdView_BOTTOM) {
            vd_eE = vdgeo.newpoint(0.0, 0.0, -1.0);
        } else if (vd_gR === vdConst.StdView_FRONT) {
            vd_eE = vdgeo.newpoint(0.0, -1.0, 0.0);
        } else if (vd_gR === vdConst.StdView_BACK) {
            vd_eE = vdgeo.newpoint(0.0, 1.0, 0.0);
        } else if (vd_gR === vdConst.StdView_LEFT) {
            vd_eE = vdgeo.newpoint( - 1.0, 0.0, 0.0);
        } else if (vd_gR === vdConst.StdView_RIGHT) {
            vd_eE = vdgeo.newpoint(1.0, 0.0, 0.0);
        } else if (vd_gR === vdConst.StdView_ISO_NE) {
            vd_eE = vdgeo.newpoint(1.0, 1.0, 1.0);
        } else if (vd_gR === vdConst.StdView_ISO_NW) {
            vd_eE = vdgeo.newpoint( - 1.0, 1.0, 1.0);
        } else if (vd_gR === vdConst.StdView_ISO_SE) {
            vd_eE = vdgeo.newpoint(1.0, -1.0, 1.0);
        } else if (vd_gR === vdConst.StdView_ISO_SW) {
            vd_eE = vdgeo.newpoint( - 1.0, -1.0, 1.0);
        }
        var mat = vdgeo.vd_s();
        vdgeo.vd_hN(mat, vd_eE);
        layout.World2ViewMatrix = mat;
        vd_U.zoomExtents();
    };
    this.LookAt = function(vd_sp, vd_DO, vd_Dw) {
        var mat = vdgeo.vd_s();
        vdgeo.vd_ag(mat, vd_Dw);
        var vd_eE = vdgeo.VectorDirection(vd_DO, vd_sp);
        vdgeo.vd_cx(mat, vd_eE);
        vdgeo.vd_ae(mat, vd_sp[X], vd_sp[Y], vd_sp[Z]);
        vdgeo.vd_kW(mat);
        var layout = vd_U.GetActiveLayout();
        layout.ViewCenter = vdgeo.newpoint(0, 0, 0);
        layout.World2ViewMatrix = mat;
        vd_gO(layout);
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_U.redraw, 0);
    };
    function vd_wz(v, normalize) {
        var layout = vd_U.GetActiveLayout();
        if (!layout) return null;
        var vd_bd = layout.World2ViewMatrix;
        var v2w = vdgeo.vd_bo(vd_bd);
        var newV = vdgeo.vd_iZ(v2w, v[0], v[1], v[2], normalize);
        return newV;
    };
    this.MoveView = function(dx, dy, dz) {
        if (dx === 0 && dy === 0 && dz === 0) return;
        var origin = vd_U.ViewToWorld(vdgeo.newpoint(0, 0, 0));
        var dir, vd_mA, toPt;
        dir = vd_wz(vdgeo.newpoint(0, 0, -1), true);
        v = vd_wz(vdgeo.newpoint(dx, dy, dz), false);
        if (!dir || !v) return;
        vd_mA = vdgeo.newpoint(origin[X] + v[X], origin[Y] + v[Y], origin[Z] + v[Z]);
        toPt = vdgeo.newpoint(vd_mA[X] + dir[X], vd_mA[Y] + dir[Y], vd_mA[Z] + dir[Z]);
        vd_U.LookAt(vd_mA, toPt, 0);
    };
    this.RotateView = function(vd_Jd, vd_Fh) {
        var pt = vdgeo.newpoint(0, 0, 0);
        var vd_jU = vd_wz([0, 0, -1], true);
        var vd_FM = vdgeo.GetAngle(pt, vd_jU);
        var vd_Gl = Math.sqrt(vd_jU[X] * vd_jU[X] + vd_jU[Y] * vd_jU[Y]);
        var vd_Gk = vdgeo.GetAngle(pt, [vd_Gl, vd_jU[Z], 0]);
        var dir = vdgeo.pointPolar(pt, vd_Jd + vd_FM, 1);
        var vd_iL = vd_Fh + vd_Gk;
        if (vd_iL > vdgeo.PI) vd_iL = vd_iL - vdgeo.VD_TWOPI;
        vd_iL = Math.min(vd_iL, vdgeo.HALF_PI * 0.95);
        vd_iL = Math.max(vd_iL, -vdgeo.HALF_PI * 0.95);
        dir[Z] = Math.tan(vd_iL);
        vdgeo.vd_cq(dir);
        var origin = vd_U.ViewToWorld(pt);
        var dest = vdgeo.newpoint(origin[X] + dir[X], origin[Y] + dir[Y], origin[Z] + dir[Z]);
        vd_U.LookAt(origin, dest, 0);
    };
    this.SetViewAngles = function(vd_Gf, tilt, vd_hF, origin) {
        var layout = vd_U.GetActiveLayout();
        if (!layout.ViewCenter) layout.ViewCenter = vdgeo.newpoint(0, 0, 0);
        var vd_uj = vdgeo.vd_bo(layout.World2ViewMatrix);
        if (!origin) origin = vdgeo.vd_Z(vd_uj, layout.ViewCenter);
        origin = vdgeo.vd_Z(layout.World2ViewMatrix, origin);
        var mat = vdgeo.vd_s();
        vdgeo.vd_fn(mat);
        vdgeo.vd_GT(mat, tilt);
        vdgeo.vd_ag(mat, vdgeo.PI + vd_Gf);
        vdgeo.vd_ay(mat, -1, -1, -1);
        var dir = vdgeo.vd_iZ(mat, 1, 0, 0, true);
        vdgeo.vd_fn(mat);
        vdgeo.vd_hN(mat, dir);
        vdgeo.vd_ag(mat, vdgeo.VD_TWOPI - vd_hF);
        layout.ViewCenter = origin;
        layout.World2ViewMatrix = mat;
        vd_gO(layout);
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_U.redraw, 0);
    };
    var vd_Bt = 100;
    this.SetBlockSize = function(value) {
        vd_Bt = value;
    };
    this.vd_Bu = function() {
        return Math.max(20, vd_Bt);
    };
    this.SetRenderMode = function(mode) {
        var layout = vd_U.GetActiveLayout();
        if (!layout) return;
        var vd_i = vd_g();
        if (vd_i.Model == layout) {
            vd_U.EnableWebGL(mode == vdConst.RENDERMODE_SHADE_GL || mode == vdConst.RENDERMODE_RENDER_GL);
        }
        if (mode == vdConst.RENDERMODE_SHADE_GL) layout.RenderMode = vdConst.RENDERMODE_SHADE;
        else if (mode == vdConst.RENDERMODE_RENDER_GL) layout.RenderMode = vdConst.RENDERMODE_RENDER;
        else layout.RenderMode = mode;
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_U.redraw, 0);
    };
    this.vd_eW = false;
    this.EnableWebGL = function(value) {
        vd_U.vd_eW = value;
    };
    this.WebGLisActive = function(value) {
        return vd_R.vd_dC();
    };
    this.GetViewBox = function() {
        if (vd_g() == null) return null;
        return {
            left: vd_R.vd_aP.left,
            bottom: vd_R.vd_aP.bottom,
            right: vd_R.vd_aP.right,
            top: vd_R.vd_aP.top
        };
    };
    this.GetPixelSize = function() {
        if (vd_g() == null) return 0.0;
        return vd_R.GetPixelSize();
    };
    this.vd_Aw = function(from, tox, toy, vd_eA) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var vd_mF = from[X];
        var vd_lL = from[Y];
        var vd_jQ = from[Z];
        var x = tox - vd_mF;
        var y = toy - vd_lL;
        if (x == 0 && y == 0) return;
        var vd_c = vdgeo.newpoint(layout.ViewCenter[X], layout.ViewCenter[Y], layout.ViewCenter[Z]);
        var vd_aU = layout.ViewSize;
        var vd_ow = vdgeo.vd_bY(layout.World2ViewMatrix);
        var org = vdgeo.vd_as(vd_mF, vd_lL, vd_jQ, vd_R.vd_bD);
        if (vd_R.vd_ba) {
            if (vd_jQ >= 1 && vd_R.vd_qf) {
                var box = vdgeo.vd_qd(vd_ow, vd_R.vd_qf);
                org = vdgeo.vd_Fy(box);
            } else {
                org = vdgeo.newpoint(org[X] + vd_c[X], org[Y] + vd_c[Y], org[Z] + vd_c[Z]);
            }
        }
        if (vd_dD) {
            if (!vd_dD.vd_tQ) {
                vd_dD.vd_tQ = [vd_ow, org];
            } else {
                org = vd_dD.vd_tQ[1];
                vd_ow = vd_dD.vd_tQ[0];
            }
        }
        var vd_zA = 1;
        var dz = vd_zA * vdgeo.VD_TWOPI * 0.5 * x / vd_R.width;
        var dx = vd_zA * vdgeo.PI * 0.5 * y / vd_R.height;
        var v = vdgeo.vd_iZ(vd_ow, 0, 0, 1, true);
        var vd_bd;
        vd_bd = vdgeo.vd_s();
        vdgeo.vd_fs(vd_bd, vd_ow);
        vdgeo.vd_ae(vd_bd, -org[X], -org[Y], -org[Z]);
        vdgeo.vd_IC(vd_bd, v, dz);
        vdgeo.vd_Hk(vd_bd, dx);
        vdgeo.vd_ae(vd_bd, org[X], org[Y], org[Z]);
        var vd_Q = new vd_oS(vd_U, vd_c[X], vd_c[Y], vd_c[Z], vd_aU, vd_bd);
        if (vd_U.vdUpdateView != null) vd_U.vdUpdateView(vd_Q);
        if (!vd_Q.Cancel) {
            layout.ViewSize = vd_Q.ViewSize;
            layout.ViewCenter = vdgeo.newpoint(vd_Q.ViewCenterX, vd_Q.ViewCenterY, vd_Q.ViewCenterZ);
            layout.World2ViewMatrix = vd_Q.vd_qA;
            vd_gO(layout);
            if (vd_eA != undefined && vd_eA >= 0) {
                if (vd_eA === 0) vd_U.redraw();
                else vd_tc(vd_md, vd_uW);
            }
        }
    };
    this.scroll = function(from, tox, toy, vd_eA) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var vd_mF = from[X];
        var vd_lL = from[Y];
        var vd_jQ = from[Z];
        var x = tox - vd_mF;
        var y = toy - vd_lL;
        if (x == 0 && y == 0) return;
        vd_zY(vd_jQ);
        var vd_bd = vdgeo.vd_bY(layout.World2ViewMatrix);
        var vd_aU = layout.ViewSize;
        var vd_c = vdgeo.newpoint(layout.ViewCenter[X], layout.ViewCenter[Y], layout.ViewCenter[Z]);
        if (vd_R.vd_ba && vd_R.vd_bu) {
            var z = vd_jQ;
            var fv = vdgeo.vd_as(vd_mF, vd_lL, z, vd_R.vd_bD);
            var tv = vdgeo.vd_as(tox, toy, z, vd_R.vd_bD);
            var dx = tv[X] - fv[X];
            var dy = tv[Y] - fv[Y];
            vd_c[X] -= dx;
            vd_c[Y] -= dy;
        } else {
            vd_c[X] -= vd_R.GetPixelSize() * x;
            vd_c[Y] += vd_R.GetPixelSize() * y;
        }
        var vd_Q = new vd_oS(vd_U, vd_c[X], vd_c[Y], vd_c[Z], vd_aU, vd_bd);
        if (vd_U.vdUpdateView != null) vd_U.vdUpdateView(vd_Q);
        if (!vd_Q.Cancel) {
            layout.ViewSize = vd_Q.ViewSize;
            layout.ViewCenter = vdgeo.newpoint(vd_Q.ViewCenterX, vd_Q.ViewCenterY, vd_Q.ViewCenterZ);
            layout.World2ViewMatrix = vd_Q.vd_qA;
            vd_gO(layout);
            if (vd_eA != undefined && vd_eA >= 0) {
                if (vd_eA === 0) vd_U.redraw();
                else vd_zn(vd_eA);
            }
            vd_dD = [vdgeo.vd_o(tox), vdgeo.vd_o(toy), vd_jQ];
        }
    };
    this.zoomScale = function(x, y, Delta, vd_eA) {
        if (Delta == 0 || Delta == 1) return;
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        vd_zY(vd_R.vd_Y.vd_kd(x, y));
        var vd_bd = vdgeo.vd_bY(layout.World2ViewMatrix);
        var vd_aU = vd_R.vd_aU;
        var vd_c = vdgeo.newpoint(layout.ViewCenter[X], layout.ViewCenter[Y], layout.ViewCenter[Z]);
        if (vd_R.vd_ba && vd_R.vd_bu) {
            var vd_ek = vd_R.vd_Y.vd_ek;
            var zFar = vd_R.vd_Y.zFar;
            var vd_mL = Math.abs(zFar);
            var vd_JU = Math.abs(vd_ek - zFar) * 0.05;
            var z = vd_nM[1];
            var fv = vdgeo.vd_as(x, y, z, vd_R.vd_bD);
            if (z != 1.0) {
                vd_mL = Math.abs(fv[Z]);
            }
            vd_mL = Math.max(vd_JU, vd_mL);
            vd_mL *= (1 - Delta);
            var pp = vdgeo.vd_as(fv[X], fv[Y], fv[Z] + vd_mL, vd_R.vd_cR);
            var tv = vdgeo.vd_as(pp[X], pp[Y], z, vd_R.vd_bD);
            var dx = tv[X] - fv[X];
            var dy = tv[Y] - fv[Y];
            vd_c[X] += dx;
            vd_c[Y] += dy;
            vd_c[Z] -= vd_mL;
        } else {
            vd_aU *= Delta;
            var vd_zJ = vdgeo.vd_Z(vd_R.vd_bD, vdgeo.newpoint(x, y, 0));
            var vd_bS = vd_aU / vd_R.height;
            if (x != undefined && y != undefined) vd_c = vdgeo.newpoint(vd_zJ[X] + (vd_R.width / 2.0 - x) * vd_bS, vd_zJ[Y] + (y - vd_R.height / 2.0) * vd_bS, vd_c[Z]);
        }
        var vd_Q = new vd_oS(vd_U, vd_c[X], vd_c[Y], vd_c[Z], vd_aU, vd_bd);
        if (vd_U.vdUpdateView != null) vd_U.vdUpdateView(vd_Q);
        if (!vd_Q.Cancel) {
            layout.ViewSize = vd_Q.ViewSize;
            layout.ViewCenter = vdgeo.newpoint(vd_Q.ViewCenterX, vd_Q.ViewCenterY, vd_Q.ViewCenterZ);
            layout.World2ViewMatrix = vd_Q.vd_qA;
            vd_gO(layout);
            if (vd_eA == undefined || vd_eA < 0) return;
            else if (vd_eA === 0) vd_U.redraw();
            else vd_zn(vd_eA);
        }
    };
    this.vd_Je = function(vd_gN, vd_fT, pos1, pos2, vd_uY) {
        if ((vd_uY & (vdConst.DEFAULT_ZOOMSCALE | vdConst.DEFAULT_ROTATE3D)) == 0) return;
        var vd_uu = vd_gN[X] - vd_fT[X];
        var vd_tT = vd_gN[Y] - vd_fT[Y];
        var dx = pos1[X] - pos2[X];
        var dy = pos1[Y] - pos2[Y];
        var vd_DD = (vd_gN[X] + vd_fT[X]) / 2;
        var vd_FF = (vd_gN[Y] + vd_fT[Y]) / 2;
        var vd_Hi = Math.sqrt(vd_uu * vd_uu + vd_tT * vd_tT);
        var vd_ET = Math.sqrt(dx * dx + dy * dy);
        var scale = vd_Hi / vd_ET;
        var vd_hw = vdgeo.newpoint(vd_DD, vd_FF, 0);
        var vd_Bb = vdgeo.vd_as(pos1[X], pos1[Y], 1, vd_R.vd_bD);
        var vd_BD = vdgeo.vd_as(pos2[X], pos2[Y], 1, vd_R.vd_bD);
        var vd_pl = vdgeo.vd_as(vd_gN[X], vd_gN[Y], 1, vd_R.vd_bD);
        var vd_qC = vdgeo.vd_as(vd_fT[X], vd_fT[Y], 1, vd_R.vd_bD);
        var dx1 = vd_pl[X] - vd_Bb[X];
        var dy1 = vd_pl[Y] - vd_Bb[Y];
        var dx2 = vd_qC[X] - vd_BD[X];
        var dy2 = vd_qC[Y] - vd_BD[Y];
        var vd_Fp = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        var vd_Gm = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        var vd_qN = Math.atan2(vd_tT, vd_uu);
        var vd_qP = Math.atan2(dy, dx);
        vd_hw = vdgeo.newpoint((vd_pl[X] + vd_qC[X]) / 2, (vd_pl[Y] + vd_qC[Y]) / 2, 0);
        if (vd_Fp < vd_Gm) {
            vd_qN += vdgeo.PI;
            vd_qP += vdgeo.PI;
        }
        vd_qN = vdgeo.FixAngle(vd_qN);
        vd_qP = vdgeo.FixAngle(vd_qP);
        var rot = vdgeo.FixAngle(vd_qP - vd_qN);
        var layout = vd_U.GetActiveLayout();
        var vd_bd = vdgeo.vd_bY(layout.World2ViewMatrix);
        if ((vd_uY & vdConst.DEFAULT_ROTATE3D)) {
            vdgeo.vd_ae(vd_bd, -vd_hw[X], -vd_hw[Y], -vd_hw[Z]);
            vdgeo.vd_ag(vd_bd, -rot);
            vdgeo.vd_ae(vd_bd, vd_hw[X], vd_hw[Y], vd_hw[Z]);
        }
        var vd_aU = layout.ViewSize;
        var vd_c = vdgeo.newpoint(layout.ViewCenter[X], layout.ViewCenter[Y], layout.ViewCenter[Z]);
        if ((vd_uY & vdConst.DEFAULT_ZOOMSCALE)) {
            vd_aU = layout.ViewSize * scale;
            var angle = vdgeo.GetAngle(vd_hw, layout.ViewCenter);
            var dist = vdgeo.Distance2D(vd_hw, layout.ViewCenter) * scale;
            vd_c = vdgeo.pointPolar(vd_hw, angle, dist);
        }
        var vd_Q = new vd_oS(vd_U, vd_c[X], vd_c[Y], vd_c[Z], vd_aU, vd_bd);
        if (vd_U.vdUpdateView != null) vd_U.vdUpdateView(vd_Q);
        if (!vd_Q.Cancel) {
            layout.World2ViewMatrix = vd_bd;
            layout.ViewSize = vd_aU;
            layout.ViewCenter = vd_c;
            vd_gO(layout);
            vd_tc(vd_md, vd_uW);
        }
    };
    var vd_aF = null;
    function vd_uW() {
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = null;
        var vd_i = vd_g();
        if (!vd_i) return;
        var layout = vd_U.GetActiveLayout();
        if (!layout) return;
        var vd_lv = vd_R.vd_aG;
        if (vd_R.vd_dC()) {
            if (vd_eY > vd_pK) {
                vd_R.vd_aG = false;
            }
            vd_U.redraw(true);
            var vd_pp = vd_R.vd_aG != vd_lv;
            vd_R.vd_aG = vd_lv;
            if (vd_pp) setTimeout(vd_U.redraw, Math.max(vd_oj, vd_eY));
            return;
        }
        var vd_As = vd_R.vd_dR;
        var vd_Lk = vd_R.vd_ee;
        var vd_zs = vd_R.RenderMode;
        var vd_zK = vd_R.vd_bu;
        var vd_Ku = vd_U.GetImageInterpolationMode();
        if (vd_eY > vd_pK) {
            vd_U.SetImageInterpolationMode(vdConst.InterpolationMode_Nearest);
            vd_R.vd_aG = false;
            if (!vd_R.vd_dC()) {
                if (vd_eY > vd_pK) {
                    vd_R.vd_dR = false;
                    if (vd_eY > vd_Ek) {
                        vd_R.RenderMode = vdConst.vd_Bi;
                    }
                }
            }
        }
        vd_U.redraw(true);
        var vd_pp = vd_R.vd_aG != vd_lv || vd_R.vd_dR != vd_As || vd_R.RenderMode != vd_zs || vd_R.vd_bu != vd_zK;
        vd_U.SetImageInterpolationMode(vd_Ku);
        vd_R.vd_aG = vd_lv;
        vd_R.vd_dR = vd_As;
        vd_R.vd_ee = vd_Lk;
        vd_R.RenderMode = vd_zs;
        vd_R.vd_bu = vd_zK;
        if (vd_pp) setTimeout(vd_U.redraw, Math.max(vd_oj, vd_eY));
    };
    function vd_tc(vd_mc, vd_Li) {
        if (vd_eY > 0 && vd_eY < vd_mc) vd_mc = vd_eY;
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_Li, vd_mc);
    };
    var vd_nM = null;
    function vd_zY(vd_ov) {
        if (vd_nM == null) {
            vd_JM();
            vd_nM = [vdgeo.vd_bY(vd_R.vd_bD), vd_ov];
        }
    };
    function vd_zn(vd_mc) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        vd_gO(layout);
        if (vd_R.vd_dC() || (vd_R.vd_ba && vd_R.vd_bu)) {
            vd_tc(vd_md, vd_uW);
        } else {
            var vd_FI = vdgeo.vd_ki(vd_nM[0], vd_R.vd_cR);
            vd_Ky(vd_FI);
            vd_Cb();
            var vd_Ii = vd_md;
            vd_md = 500;
            vd_tc(vd_mc, vd_HM);
            vd_md = vd_Ii;
        }
    };
    function vd_HM() {
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = null;
        var vd_lv = vd_R.vd_aG;
        if (vd_eY > vd_pK) {
            vd_R.vd_aG = false;
        }
        vd_U.redraw(true);
        var vd_pp = vd_R.vd_aG != vd_lv;
        vd_R.vd_aG = vd_lv;
        if (vd_pp) vd_aF = setTimeout(vd_U.redraw, Math.max(vd_oj, vd_eY));
    };
    this.UndoHistory = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        return vd_i.UndoHistory;
    };
    this.GetDocument = function() {
        return vd_g();
    };
    this.SetDocument = function(document) {
        if (!document || vd_aR == null) return false;
        vd_aR.vd_J = document;
        vd_vM();
        return true;
    };
    this.GetActiveLayout = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        if (!vd_i.ActiveLayOutRef) {
            if (vd_i.LayOuts == undefined || vd_i.LayOuts[vd_i.ActiveLayOut] == undefined) vd_i.ActiveLayOutRef = vd_i.Model;
            else vd_i.ActiveLayOutRef = vd_i.LayOuts.Items[vd_i.LayOuts[vd_i.ActiveLayOut]];
        }
        return vd_i.ActiveLayOutRef;
    };
    this.SetActiveLayout = function(layout) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        if (!layout) layout = vd_i.Model;
        vd_i.ActiveLayOutRef = layout;
        vd_i.ActiveLayOut = 'h_' + layout.HandleId.toString();
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_U.redraw, 0);
    };
    this.NumLayouts = function() {
        var vd_i = vd_g();
        if (vd_i == null) return 0;
        if (vd_i.LayOuts == undefined) return 0;
        return vd_i.LayOuts.Items.length;
    };
    this.GetActiveLayoutId = function() {
        var vd_i = vd_g();
        if (vd_i == null) return - 1;
        if (vd_i.LayOuts == undefined) return - 1;
        var vd_wM = vd_i.LayOuts[vd_g().ActiveLayOut];
        if (vd_wM == undefined) vd_wM = -1;
        return vd_wM;
    };
    this.SetActiveLayoutId = function(id) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        id = Math.max( - 1, id);
        if (id >= vd_U.NumLayouts()) id = -1;
        var layout = null;
        if (id == -1) layout = vd_i.Model;
        else layout = vd_i.LayOuts.Items[id];
        vd_U.SetActiveLayout(layout);
    };
    this.FindLayout = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        if (name == "model" || !vd_i.LayOuts) return - 1;
        for (var i = 0; i < vd_i.LayOuts.Items.length; i++) {
            var layout = vd_i.LayOuts.Items[i];
            var vd_gU = layout.Name.toLowerCase();
            if (vd_gU == name) return i;
        }
        return - 1;
    };
    this.GetLayouts = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [vd_i.Model];
        if (vd_i.LayOuts) {
            for (var i = 0; i < vd_i.LayOuts.Items.length; i++) {
                var layout = vd_i.LayOuts.Items[i];
                ret.push(layout);
            }
        }
        return ret;
    };
    this.GetBlocks = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.Blocks.Items.length; i++) {
            var block = vd_U.GetDictItem(vd_i.Blocks, vd_i.Blocks.Items[i]);
            ret.push(block);
        }
        return ret;
    };
    this.GetImages = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.Images.Items.length; i++) {
            var vd_q = vd_U.GetDictItem(vd_i.Images, vd_i.Images.Items[i]);
            ret.push(vd_q);
        }
        return ret;
    };
    this.GetLayers = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.Layers.Items.length; i++) {
            var layer = vd_U.GetDictItem(vd_i.Layers, vd_i.Layers.Items[i]);
            ret.push(layer);
        }
        return ret;
    };
    this.FindLayer = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.Layers.Items.length; i++) {
            var layer = vd_U.GetDictItem(vd_i.Layers, vd_i.Layers.Items[i]);
            var vd_gU = layer.Name.toLowerCase();
            if (vd_gU == name) return layer;
        }
        return null;
    };
    this.FindLineType = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.LineTypes.Items.length; i++) {
            var vd_CP = vd_U.GetDictItem(vd_i.LineTypes, vd_i.LineTypes.Items[i]);
            var vd_gU = vd_CP.Name.toLowerCase();
            if (vd_gU == name) return vd_CP;
        }
        return null;
    };
    this.GetLineTypes = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.LineTypes.Items.length; i++) {
            var linetype = vd_U.GetDictItem(vd_i.LineTypes, vd_i.LineTypes.Items[i]);
            ret.push(linetype);
        }
        return ret;
    };
    this.FindTextStyle = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.TextStyles.Items.length; i++) {
            var vd_yO = vd_U.GetDictItem(vd_i.TextStyles, vd_i.TextStyles.Items[i]);
            var vd_gU = vd_yO.Name.toLowerCase();
            if (vd_gU == name) return vd_yO;
        }
        return null;
    };
    this.GetTextStyles = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.TextStyles.Items.length; i++) {
            var textstyle = vd_U.GetDictItem(vd_i.TextStyles, vd_i.TextStyles.Items[i]);
            ret.push(textstyle);
        }
        return ret;
    };
    this.SetActiveLayer = function(layer) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        if (layer == null) layer = vd_U.GetDictItem(vd_i.Layers, vd_i.Layers.Items[0]);
        vd_i.ActiveLayer = 'h_' + layer.HandleId.toString();
    };
    this.SetActiveLineType = function(lt) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        if (lt == null) lt = vd_U.GetDictItem(vd_i.LineTypes, vd_i.LineTypes.Items[0]);
        vd_i.ActiveLineType = 'h_' + lt.HandleId.toString();
    };
    this.SetActiveTextStyle = function(style) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        if (style == null) style = vd_U.GetDictItem(vd_i.TextStyles, vd_i.TextStyles.Items[0]);
        vd_i.ActiveTextStyle = 'h_' + style.HandleId.toString();
    };
    this.SetActivePenWidth = function(pw) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.ActivePenWidth = pw;
    };
    this.SetActiveLineWeight = function(lw) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.ActiveLineWeight = lw;
    };
    this.SetActivePenColor = function(col) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.ActivePenColor = col;
    };
    this.GetActivePenColor = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        return vd_i.ActivePenColor;
    };
    this.GetActiveHatchProperties = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var vd_C = vd_i.ActiveHatchProperties;
        if (!vd_C) {
            vd_C = vd_U.createNewHatchProperties();
            vd_i.ActiveHatchProperties = vd_C;
        }
        return vd_i.ActiveHatchProperties;
    };
    this.GetActiveThickness = function() {
        var vd_i = vd_g();
        if (vd_i == null) return 0.0;
        if (!vd_i.vd_pG) return 0.0;
        return vd_i.vd_pG;
    };
    this.SetActiveThickness = function(thickness) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.vd_pG = thickness;
    };
    this.SetActiveHatchProperties = function(vd_JV) {
        var vd_i = vd_g();
        if (vd_i == null) return;
        vd_i.ActiveHatchProperties = vd_JV;
    };
    this.vd_DC = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        if (!name) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.HatchPatterns.Items.length; i++) {
            var hpat = vd_U.GetDictItem(vd_i.HatchPatterns, vd_i.HatchPatterns.Items[i]);
            var vd_Hd = hpat.Name.toLowerCase();
            if (vd_Hd == name) return hpat;
        }
        return null;
    };
    this.GetHatchPatterns = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var ret = [];
        for (var i = 0; i < vd_i.HatchPatterns.Items.length; i++) {
            var vd_IX = vd_U.GetDictItem(vd_i.HatchPatterns, vd_i.HatchPatterns.Items[i]);
            ret.push(vd_IX);
        }
        return ret;
    };
    this.createNewHatchProperties = function(vd_iR, FillBkColor, FillColor, vd_ja, vd_iK) {
        if (!vd_iR && !FillBkColor && !FillColor || vd_iR == "") return null;
        var vd_pF = vd_U.vd_DC(vd_iR);
        if (!vd_pF) return null;
        var vd_xf = 'h_0';
        var Dpi = false;
        if (vd_pF) {
            vd_xf = 'h_' + vd_pF.HandleId;
            Dpi = vd_U.vd_LJ(vd_pF.Name)
        }
        var vd_br;
        if (FillBkColor) vd_br = FillBkColor;
        else vd_br = {};
        var color;
        if (FillColor) color = FillColor;
        else color = {};
        if (!vd_iK) vd_iK = 0.0;
        if (!vd_ja) vd_ja = 1.0;
        return {
            HatchPattern: vd_xf,
            IsDpi: Dpi,
            DrawBoundary: false,
            FillBkColor: vd_br,
            FillColor: color,
            HatchAngle: vd_iK,
            HatchScale: vd_ja,
            gradientTypeProp: 0,
            gradientColor2: undefined,
            gradientAngle: 0,
            HatchOrigin: [0, 0, 0]
        };
    };
    this.vd_LJ = function(vd_jr) {
        return (vd_jr.toUpperCase().indexOf("U10") >= 0 || vd_jr.toUpperCase().indexOf("U20") >= 0 || vd_jr.toUpperCase().indexOf("U10_45") >= 0 || vd_jr.toUpperCase().indexOf("U10_135") >= 0 || vd_jr.toUpperCase().indexOf("U10_90") >= 0 || vd_jr.toUpperCase().indexOf("U10_45_135") >= 0);
    };
    this.vd_ol = function(vd_cH) {
        if (!vd_cH) return null;
        var ret = {};
        ret.HatchPattern = vd_cH.HatchPattern;
        ret.IsDpi = vd_cH.IsDpi;
        ret.DrawBoundary = vd_cH.DrawBoundary;
        ret.FillBkColor = vdConst.vd_qc(vd_cH.FillBkColor);
        ret.FillColor = vdConst.vd_qc(vd_cH.FillColor);
        ret.HatchAngle = vd_cH.HatchAngle;
        ret.HatchScale = vd_cH.HatchScale;
        ret.gradientTypeProp = vd_cH.gradientTypeProp;
        if (vd_cH.gradientColor2) ret.gradientColor2 = vd_cH.gradientColor2.concat([]);
        ret.gradientAngle = vd_cH.gradientAngle;
        if (vd_cH.HatchOrigin) ret.HatchOrigin = vd_cH.HatchOrigin.concat([]);
        if (vd_cH.Solid2dTransparency !== undefined) ret.Solid2dTransparency = vd_cH.Solid2dTransparency;
        return ret;
    };
    this.FindBlock = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.Blocks.Items.length; i++) {
            var block = vd_U.GetDictItem(vd_i.Blocks, vd_i.Blocks.Items[i]);
            var vd_gU = block.Name.toLowerCase();
            if (vd_gU == name) return block;
        }
        return null;
    };
    this.GetEntityPosition = function(entity, vd_bG) {
        if (!entity || !entity.HandleId) return - 1;
        var vd_i = vd_g();
        if (!vd_i) return - 1;
        var layout = vd_U.GetActiveLayout();
        if (!layout) return - 1;
        if (!vd_bG) vd_bG = layout.Entities;
        var hid = 'h_' + entity.HandleId.toString();
        var p = vd_bG.Items.indexOf(hid);
        return p;
    };
    this.SetEntityPosition = function(entity, pos, vd_bG) {
        if (!entity || !entity.HandleId) return - 1;
        var vd_i = vd_g();
        if (!vd_i) return - 1;
        var layout = vd_U.GetActiveLayout();
        if (!layout) return - 1;
        if (!vd_bG) vd_bG = layout.Entities;
        var hid = 'h_' + entity.HandleId.toString();
        var p = vd_bG.Items.indexOf(hid);
        if (p < 0) return - 1;
        if (!pos || pos < 0) pos = 0;
        if (pos >= vd_bG.Items.length - 1) pos = vd_bG.Items.length - 1;
        if (p == pos) return pos;
        vd_bG.Items.splice(p, 1);
        vd_bG.Items.splice(pos, 0, hid);
        return pos;
    };
    this.vd_eV = function() {
        var vd_i = vd_g();
        return vdConst.vd_zB(vd_i);
    };
    this.vd_bl = function(vd_BT, ent) {
        if (!ent.HandleId || !vd_BT.Items) return;
        var hid = 'h_' + ent.HandleId.toString();
        if (vd_g()[hid]) return;
        vd_BT.Items.push(hid);
        vd_g()[hid] = ent;
    };
    this.CopyObjects = function(entities) {
        var vd_zZ = [];
        var doc = vd_U.GetDocument();
        var layout = vd_U.GetActiveLayout();
        for (var i = 0; i < entities.length; i++) {
            var ent = entities[i];
            var obj = vdConst.cloneEntity(ent);
            obj.HandleId = vd_U.vd_eV();
            vd_U.vd_bl(layout.Entities, obj);
            vd_zZ.push(obj);
            var perc = i / entities.length * 100;
        }
        return vd_zZ;
    };
    this.vd_fo = function(vd_E, vd_i, vd_Hn) {
        if (!vd_Hn) vd_E.HandleId = vd_U.vd_eV();
        vd_E.LineType = vd_i.ActiveLineType;
        vd_E.Layer = vd_i.ActiveLayer;
        vd_E.PenColor = vdConst.vd_qc(vd_U.GetActivePenColor());
        vd_E.PenWidth = vd_i.ActivePenWidth;
        vd_E.LineWeight = vd_i.ActiveLineWeight;
        if (vd_i.vd_lV) vd_E.LineTypeScale = vd_i.vd_lV;
    };
    this.AddText = function(vd_Dh, height, vd_jJ, vd_xd, vd_mK, rotation, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdText_code;
        vd_E.InsertionPoint = vd_jJ;
        vd_E.TextString = vd_Dh;
        vd_E.Rotation = rotation;
        vd_E.Height = 1;
        vd_E.Style = vd_i.ActiveTextStyle;
        var ts = vd_U.GetDictItem(vd_i.TextStyles, vd_i.ActiveTextStyle);
        if (ts) {
            if (!height && ts.Height) vd_E.Height = ts.Height;
            if (vd_xd == undefined && ts.HorJustify != undefined) vd_E.HorJustify = ts.HorJustify;
            if (vd_mK == undefined && ts.VerJustify != undefined) vd_E.VerJustify = ts.VerJustify;
        }
        if (height) vd_E.Height = height;
        if (vd_xd != undefined) vd_E.HorJustify = vd_xd;
        if (vd_mK != undefined) vd_E.VerJustify = vd_mK;
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddCone = function(p1, BaseRadius, TopRadius, hei, num, vd_bH, entities) {
        var VertexList = [];
        var FaceList = [];
        var i = 0;
        var k = 0;
        var vd_qk;
        var p2 = [p1[X], p1[Y], p1[Z]];
        p2[Z] += hei;
        for (i = 0; i < num; i++) {
            vd_qk = vdgeo.pointPolar(p1, i * vdgeo.VD_TWOPI / num, BaseRadius);
            VertexList.push(vd_qk);
        }
        for (i = 0; i < num; i++) {
            vd_qk = vdgeo.pointPolar(p2, i * vdgeo.VD_TWOPI / num, TopRadius);
            VertexList.push(vd_qk);
        }
        for (i = 0; i < num - 2; i++) {
            k = -1;
            FaceList.push(k);
            k = -(i + 2);
            FaceList.push(k);
            k = -(i + 3);
            FaceList.push(k);
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
            k = -(1 + num);
            FaceList.push(k);
            k = -(i + 2 + num);
            FaceList.push(k);
            k = -(i + 3 + num);
            FaceList.push(k);
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
        }
        for (i = 0; i < num; i++) {
            k = i + 1;
            FaceList.push(k);
            k = (i + 1) + num;
            FaceList.push(k);
            k = (i + 2) + num;
            if (i == num - 1) k = 1 + num;
            FaceList.push(k);
            k = i + 2;
            if (i == num - 1) k = 1;
            FaceList.push(k);
            k = -1;
            FaceList.push(k);
        }
        return vd_U.AddPolyface(VertexList, FaceList, vd_bH, entities);
    };
    this.AddSphere = function(p1, rad, lon, lat, vd_bH, entities) {
        var vd_GO = vdgeo.VD_TWOPI / lon;
        var vd_FJ = vdgeo.PI / lat;
        var k = 0,
        l = 0,
        i = 0;
        var a, sa, va, dp, dh;
        var pt;
        var VertexList = [];
        var FaceList = [];
        for (k = 0; k < lon + 1; k++) {
            a = k * vd_GO;
            sa = vdgeo.PI / -2.0;
            for (l = 0; l < lat + 1; l++) {
                va = sa + l * vd_FJ;
                dp = rad * Math.cos(va);
                dh = rad * Math.sin(va);
                pt = vdgeo.pointPolar(p1, a, dp);
                pt[Z] += dh;
                VertexList.push(pt);
            }
        }
        for (k = 0; k < lon; k++) {
            for (l = 0; l < lat; l++) {
                i = l + (k * (lat + 1));
                i += 1;
                FaceList.push(i);
                i = (l + 1) + (k * (lat + 1));
                i += 1;
                FaceList.push(i);
                i = (l + 1) + (k + 1) * (lat + 1);
                i += 1;
                if (k == lon - 1) {
                    i = (l + 1);
                    i += 1;
                }
                FaceList.push(i);
                i = l + (k + 1) * (lat + 1);
                i += 1;
                if (k == lon - 1) {
                    i = l;
                    i += 1;
                }
                FaceList.push(i);
                i = -1;
                FaceList.push(i);
            }
        }
        return vd_U.AddPolyface(VertexList, FaceList, vd_bH, entities);
    };
    this.AddBox = function(p1, len, wid, hei, rot, vd_bH, entities) {
        var VertexList = [[0, 0, 0], [len, 0, 0], [len, wid, 0], [0, wid, 0], [0, 0, hei], [len, 0, hei], [len, wid, hei], [0, wid, hei]];
        var FaceList = [1, 2, 3, 4, -1, 5, 6, 7, 8, -1, 1, 2, 6, 5, -1, 2, 3, 7, 6, -1, 3, 4, 8, 7, -1, 4, 1, 5, 8, -1];
        var mat = vdgeo.vd_s();
        vdgeo.vd_ag(mat, rot);
        vdgeo.vd_ae(mat, p1[X], p1[Y], p1[Z]);
        VertexList = vdgeo.vd_hz(mat, VertexList);
        return vd_U.AddPolyface(VertexList, FaceList, vd_bH, entities);
    };
    this.TriangulatePolyface = function(vd_jR, precision) {
        if (!vd_jR || !vd_jR._t || vd_jR._t != vdConst.vdPolyface_code) return false;
        if (!precision) precision = 8;
        var ret = vd_vr.vd_yW(vd_jR.VertexList.Items, precision);
        var vd_fx = [];
        for (var i = 0; i < ret.length; i += 3) {
            vd_fx.push(ret[i] + 1);
            vd_fx.push(ret[i + 1] + 1);
            vd_fx.push(ret[i + 2] + 1);
            vd_fx.push(ret[i + 2] + 1);
            vd_fx.push( - 1);
        }
        vd_jR.FaceList.Items = vd_fx;
        vd_U.UpdateFig(vd_jR);
        return true;
    };
    this.AddHeatMap = function(points, vd_uG, precision, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        if (!precision) precision = 8;
        var ret = vd_vr.vd_yW(points, precision);
        var vd_fx = [];
        for (var i = 0; i < ret.length; i += 3) {
            vd_fx.push(ret[i] + 1);
            vd_fx.push(ret[i + 1] + 1);
            vd_fx.push(ret[i + 2] + 1);
            vd_fx.push(ret[i + 2] + 1);
            vd_fx.push( - 1);
        }
        var pf = vd_U.AddPolyface(points, vd_fx, false, entities);
        pf.GradientColors = {
            Items: []
        };
        for (var i = 0; i < vd_uG.length; i += 2) {
            pf.GradientColors.Items.push({
                Key: vd_uG[i],
                Value: vd_uG[i + 1]
            });
        }
        pf.GradientColors.Items.sort(function(a, b) {
            return a.Key - b.Key
        });
        if (vd_bH) {
            vd_ce(pf, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return pf;
    };
    this.AddPolyface = function(points, vd_DU, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdPolyface_code;
        vd_E.VertexList = {
            Items: points
        };
        vd_E.FaceList = {
            Items: vd_DU
        };
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddArc = function(center, radius, vd_wH, vd_tE, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdArc_code;
        vd_E.Center = center;
        vd_E.Radius = radius;
        vd_E.StartAngle = vd_wH;
        vd_E.EndAngle = vd_tE;
        vd_E.HatchProperties = vd_U.vd_ol(vd_U.GetActiveHatchProperties());
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddCircle = function(center, radius, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdCircle_code;
        vd_E.Center = center;
        vd_E.Radius = radius;
        vd_E.HatchProperties = vd_U.vd_ol(vd_U.GetActiveHatchProperties());
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddEllipse = function(center, vd_Ho, vd_Jc, vd_HE, vd_wH, vd_tE, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdEllipse_code;
        vd_E.Center = center;
        vd_E.MajorAngle = vd_HE;
        vd_E.MajorLength = vd_Ho;
        vd_E.MinorLength = vd_Jc;
        vd_E.StartAngle = vd_wH;
        vd_E.EndAngle = vd_tE;
        vd_E.HatchProperties = vd_U.vd_ol(vd_U.GetActiveHatchProperties());
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddLine = function(vd_hu, vd_ha, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdLine_code;
        vd_E.StartPoint = vd_hu;
        vd_E.EndPoint = vd_ha;
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddPolyline = function(vd_bC, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        var k, i;
        var vd_b;
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdPolyline_code;
        vd_E.VertexList = {};
        vd_E.VertexList.Items = [];
        for (k = 0; k < vd_bC.length; k++) {
            vd_b = vd_bC[k];
            for (i = vd_b.length; i < 4; i++) vd_b.push(0.0);
            vd_E.VertexList.Items.push(vd_b);
        }
        vd_E.SamplePoints = null;
        vd_E.HatchProperties = vd_U.vd_ol(vd_U.GetActiveHatchProperties());
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddRect2 = function(insertion, width, height, rotation, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdRect_code;
        vd_E.InsertionPoint = insertion;
        vd_E.Width = width;
        vd_E.Height = height;
        vd_E.Rotation = rotation;
        vd_E.HatchProperties = vd_U.vd_ol(vd_U.GetActiveHatchProperties());
        vd_E.Thickness = vd_U.GetActiveThickness();
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.AddRect = function(vd_sm, vd_zD, vd_bH, entities) {
        return vd_U.AddRect2(vd_sm, vd_zD[X] - vd_sm[X], vd_zD[Y] - vd_sm[Y], 0, vd_bH, entities);
    };
    this.AddAttribDef = function(block, height, rotation, tag, value, vd_jJ) {
        if (!block || !block._t || block._t != vdConst.vdBlock_code) return null;
        var vd_i = vd_g();
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i);
        vd_E.AlignmentPoint = [0, 0, 0];
        vd_E._t = vdConst.vdAttribDef_code;
        vd_E.TagString = tag;
        vd_E.PromptString = "Prompt";
        vd_E.ValueString = value;
        vd_E.TextString = tag;
        vd_E.Height = 1.0;
        vd_E.Style = vd_i.ActiveTextStyle;
        var ts = vd_U.GetDictItem(vd_i.TextStyles, vd_i.ActiveTextStyle);
        if (ts) {
            if (!height && ts.Height) vd_E.Height = ts.Height;
            if (ts.HorJustify != undefined) vd_E.HorJustify = ts.HorJustify;
            if (ts.VerJustify != undefined) vd_E.VerJustify = ts.VerJustify;
        }
        if (height) vd_E.Height = height;
        vd_E.InsertionPoint = vd_jJ;
        vd_E.Rotation = rotation;
        vd_U.vd_bl(block.Entities, vd_E);
        return vd_E;
    };
    this.GetAttribValue = function(tag, vd_dJ) {
        if (!vd_dJ || !vd_dJ._t || vd_dJ._t != vdConst.vdInsert_code) return null;
        if (!vd_dJ.Attributes) return null;
        for (var i = 0; i < vd_dJ.Attributes.Items.length; i++) {
            var vd_wJ = vd_dJ.Attributes.Items[i].TagString.toLowerCase();
            if (vd_wJ == tag.toLowerCase()) return vd_dJ.Attributes.Items[i].ValueString;
        }
        return null;
    };
    this.SetAttribValue = function(tag, value, vd_dJ) {
        if (!vd_dJ || !vd_dJ._t || vd_dJ._t != vdConst.vdInsert_code) return false;
        if (!vd_dJ.Attributes) return false;
        for (var i = 0; i < vd_dJ.Attributes.Items.length; i++) {
            var attr = vd_dJ.Attributes.Items[i];
            var vd_wJ = attr.TagString.toLowerCase();
            if (vd_wJ == tag.toLowerCase()) {
                attr.ValueString = value;
                attr.TextString = value;
                vd_U.UpdateFig(vd_dJ);
                vd_U.UpdateFig(attr);
                vd_U.UpdateLayout(vd_U.GetActiveLayout());
                return true;
            }
        }
        return false;
    };
    this.AddBlockFromFile = function(filename, vd_gH, vd_xY, vd_tV) {
        if (!filename || !vd_gH) return null;
        var vd_E = vd_U.FindBlock(vd_gH);
        if (!vd_E) {
            vd_E = vd_U.AddBlock(vd_gH);
            vd_xY = true;
        }
        if (!vd_E) return null;
        if (vd_xY) {
            vd_E.ExternalReferencePath = filename;
            vd_E.ExternalReference = null;
        }
        if (vd_E.ExternalReferencePath && vd_tV) {
            if (vd_E.ExternalReference && vd_E.ExternalReference.vd_J) {
                var args = new vd_BM(vd_U, vd_gH.toLowerCase(), vd_E.ExternalReferencePath, vd_E);
                setTimeout(vd_tV(args), 0);
            } else {
                vd_E.vd_kp = vd_tV;
                vd_U.AddBlockSymbol(vd_gH, [0, 0, 0], 1.0, 0.0, false, {});
                setTimeout(vd_zC(), 0);
            }
        }
        return vd_E;
    };
    this.AddBlock = function(vd_gH, vd_xO) {
        var vd_E = vd_U.FindBlock(vd_gH);
        if (vd_E) return vd_E;
        var vd_i = vd_g();
        vd_E = {};
        vd_E.Name = vd_gH;
        vd_E.HandleId = vd_U.vd_eV();
        vd_E.Entities = {
            Items: []
        };
        if (vd_xO) vd_E.Origin = vd_xO;
        vd_E.StretchBlock = 0;
        vd_E._t = vdConst.vdBlock_code;
        vd_U.vd_bl(vd_i.Blocks, vd_E);
        return vd_E;
    };
    function vd_Jl(vd_dJ, attribute) {
        if (!vd_dJ.Attributes) vd_dJ.Attributes = {
            Items: []
        };
        var vd_i = vd_g();
        var vd_E = {
            AlignmentPoint: (attribute.AlignmentPoint) ? attribute.AlignmentPoint: [0, 0, 0],
            Bold: (attribute.Bold) ? attribute.Bold: false,
            ExtrusionVector: (attribute.ExtrusionVector) ? attribute.ExtrusionVector: [0, 0, 1],
            Flag: (attribute.Flag) ? attribute.Flag: 0,
            HandleId: vd_U.vd_eV(),
            Height: (attribute.Height) ? attribute.Height: 1,
            InsertionPoint: (attribute.InsertionPoint) ? attribute.InsertionPoint: [0, 0, 0],
            Layer: (attribute.Layer) ? attribute.Layer: vd_i.Layers[0],
            LineType: (attribute.LineType) ? attribute.LineType: undefined,
            LineTypeScale: (attribute.LineTypeScale) ? attribute.LineTypeScale: 1,
            ObliqueAngle: (attribute.ObliqueAngle) ? attribute.ObliqueAngle: 0,
            PenColor: (attribute.PenColor) ? attribute.PenColor: {
                ColorFlag: 192
            },
            Rotation: (attribute.Rotation) ? attribute.Rotation: 0,
            Style: (attribute.Style) ? attribute.Style: undefined,
            TagString: (attribute.TagString) ? attribute.TagString: undefined,
            TextLine: (attribute.TextLine) ? attribute.TextLine: 0,
            TextString: (attribute.ValueString) ? attribute.ValueString: undefined,
            Thickness: (attribute.Thickness) ? attribute.Thickness: 0,
            ValueString: (attribute.ValueString) ? attribute.ValueString: undefined,
            WidthFactor: (attribute.WidthFactor) ? attribute.WidthFactor: 1,
            InVisibleMode: (attribute.InVisibleMode === true) ? attribute.InVisibleMode: false,
            _t: vdConst.vdAttrib_code
        };
        vd_dJ.Attributes["h_" + vd_E.HandleId] = vd_dJ.Attributes.Items.length;
        vd_dJ.Attributes.Items.push(vd_E);
        vd_k.vd_iz(vd_dJ.EcsMatrix, vd_E, vd_U);
        vd_U.UpdateFig(vd_E);
        return vd_E;
    };
    this.AddBlockSymbol = function(vd_gH, vd_jJ, scale, rotation, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var block = vd_U.FindBlock(vd_gH);
        if (block == null) return null;
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdInsert_code;
        vd_E.InsertionPoint = vd_jJ;
        vd_E.Xscale = scale;
        vd_E.Yscale = scale;
        vd_E.Rotation = rotation;
        vd_E.Block = 'h_' + block.HandleId.toString();
        vd_cX.clear();
        vd_ce(vd_E, vd_cX, vd_i);
        vd_E.BoundingBox = vd_cX.vd_gi.vd_iE();
        for (var i = 0; i < block.Entities.Items.length; i++) {
            var attribute = vd_U.GetEntityItem(block.Entities.Items[i]);
            if (attribute._t == vdConst.vdAttribDef_code) {
                vd_Jl(vd_E, attribute);
            }
        }
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        var bbox = vd_E.BoundingBox;
        vd_U.UpdateFig(vd_E);
        vd_E.BoundingBox = bbox;
        return vd_E;
    };
    this.GetEntityBBox = function(vd_E) {
        if (!vd_E.BoundingBox) {
            var vd_i = vd_g();
            vd_cX.clear();
            vd_ce(vd_E, vd_cX, vd_i);
            vd_E.BoundingBox = vd_cX.vd_gi.vd_iE();
        }
        return vd_E.BoundingBox;
    };
    this.MaxImageSize = 768 * 720;
    this.AddImage = function(vd_sA, vd_iV, vd_jJ, vd_zR, rotation, vd_bH, entities) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return null;
        var vd_i = vd_g();
        var idef = vd_U.vd_Gr(vd_sA);
        if (idef == null) return null;
        var vd_E = {};
        vd_U.vd_fo(vd_E, vd_i, entities && !entities.Items);
        vd_E._t = vdConst.vdImage_code;
        vd_E.InsertionPoint = vd_jJ;
        vd_E.ImageDefinition = 'h_' + idef.HandleId.toString();
        vd_E.Display = 5;
        vd_E.Rotation = rotation;
        vd_E.Width = vd_zR;
        vd_E.ImageScale = vd_zR;
        vd_E.Height = vd_E.Width * idef.OriginalHeight / idef.OriginalWidth;
        if (entities) vd_U.vd_bl(entities, vd_E);
        else vd_U.vd_bl(layout.Entities, vd_E);
        if (!idef.bytes && vd_iV && vd_aR) {
            var vd_iQ = document.createElement("img");
            vd_iQ.setAttribute("src", vd_iV);
            vd_iQ.onload = function(evt) {
                vd_aR.vd_Ct(evt.target, idef);
                vd_E.Height = vd_E.Width * idef.OriginalHeight / idef.OriginalWidth;
                vd_U.UpdateLayout(layout);
                if (vd_bH) {
                    vd_ce(vd_E, vd_R, vd_i);
                    vd_U.Refresh(false);
                }
            }
        } else {
            vd_U.UpdateLayout(layout);
            if (vd_bH) {
                vd_ce(vd_E, vd_R, vd_i);
                vd_U.Refresh(false);
            }
        }
        return vd_E;
    };
    this.AddLayout = function(vd_nK) {
        var vd_i = vd_g();
        if (!vd_i) return - 1;
        if (vd_nK.toLowerCase() == "model" || vd_nK.toLowerCase() == vd_i.Model.Name.toLowerCase()) return - 1;
        var vd_ng = vd_U.FindLayout(vd_nK);
        if (vd_ng >= 0) return vd_ng;
        if (!vd_i.LayOuts) vd_i.LayOuts = {
            Items: []
        };
        vd_ng = vd_i.LayOuts.Items.length;
        var vd_E = {
            _t: vdConst.vdLayout_code,
            HandleId: vd_U.vd_eV(),
            Name: vd_nK,
            FocalLength: 0.05,
            PerspectiveMod: 0,
            LensAngle: 60,
            ViewCenter: [0, 0, 0],
            RenderMode: 0,
            ViewSize: 1.0,
            World2ViewMatrix: vdgeo.vd_s(),
            BkColorEx: [0, 0, 0, 0],
            ShowHidenEdges: false,
            Printer: {
                PrintWindow: [0, 0, 0, 210, 297, 0],
                PrintScale: [1, 1],
                HandleId: vd_U.vd_eV(),
                margins: [0, 0, 0, 0],
                Resolution: 96,
                paperSize: [0, 0, 827, 1169],
                LandScape: false
            },
            Entities: {
                Items: []
            }
        };
        vd_i.LayOuts.Items.push(vd_E);
        vd_i.LayOuts['h_' + vd_E.HandleId.toString()] = vd_ng;
        return vd_ng;
    };
    this.AddViewport = function(insertion, width, height, vd_c, vd_aU, vd_bH) {
        var vd_i = vd_g();
        if (!vd_i) return null;
        var layout = vd_U.GetActiveLayout();
        if (layout == null || layout == vd_i.Model) return null;
        var vd_E = {};
        var vd_su = insertion[X];
        var vd_rg = insertion[Y];
        var vd_yr = vd_su + width;
        var vd_yU = vd_rg + height;
        if (width < 0) {
            vd_su = vd_su + width;
            vd_yr = insertion[X];
        }
        if (height < 0) {
            vd_rg = vd_rg + height;
            vd_yU = insertion[Y];
        }
        vd_U.vd_fo(vd_E, vd_i);
        vd_E._t = vdConst.vdViewport_code;
        vd_E.InsertionPoint = insertion;
        vd_E.Width = width;
        vd_E.Height = height;
        vd_E.ViewSize = 10.0;
        vd_E.ViewCenter = [0, 0, 0];
        if (vd_c) vd_E.ViewCenter = vd_c;
        if (vd_aU) vd_E.ViewSize = vd_aU;
        if (vd_i.Model.BoundingBox) {
            if (!vd_c) vd_E.ViewCenter = [(vd_i.Model.BoundingBox[0] + vd_i.Model.BoundingBox[3]) / 2.0, (vd_i.Model.BoundingBox[1] + vd_i.Model.BoundingBox[4]) / 2.0, 0];
            if (!vd_aU) {
                var vd_IS = vd_i.Model.BoundingBox[3] - vd_i.Model.BoundingBox[0];
                var vd_Kc = vd_i.Model.BoundingBox[4] - vd_i.Model.BoundingBox[1];
                var l1 = Math.abs(width) / vd_IS;
                var l2 = Math.abs(height) / vd_Kc;
                var l = Math.min(l1, l2);
                vd_E.ViewSize = Math.abs(height) / l;
            }
        }
        vd_E.BoundingBox = [vd_su, vd_rg, 0, vd_yr, vd_yU, 0];
        vd_E.LensAngle = 60;
        vd_E.FocalLength = 0.05;
        vd_E.PerspectiveMod = 0;
        vd_E.ShowHidenEdges = false;
        vd_E.RenderMode = 0;
        vd_E.World2ViewMatrix = vdgeo.vd_s();
        vd_E.BkColorEx = [0, 0, 0, 0];
        vd_U.vd_bl(layout.Entities, vd_E);
        vd_U.UpdateLayout(layout);
        if (vd_bH) {
            vd_ce(vd_E, vd_R, vd_i);
            vd_U.Refresh(false);
        }
        return vd_E;
    };
    this.vd_Eb = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.Images.Items.length; i++) {
            var idef = vd_U.GetDictItem(vd_i.Images, vd_i.Images.Items[i]);
            var vd_Jm = idef.Name.toLowerCase();
            if (vd_Jm == name) return idef;
        }
        return null;
    };
    this.vd_Gr = function(vd_sA) {
        var doc = vd_g();
        if (doc == null) return null;
        var idef = vd_U.vd_Eb(vd_sA);
        if (idef) return idef;
        idef = {};
        idef.HandleId = vd_U.vd_eV();
        idef.Name = vd_sA;
        idef._t = vdConst.vdImageDef_code;
        idef.Transparency = [0, 0, 0, 0];
        idef.OriginalWidth = 1;
        idef.OriginalHeight = 1;
        idef.width = 1;
        idef.height = 1;
        vd_U.vd_bl(doc.Images, idef);
        return idef;
    };
    this.FindView = function(name) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        if (!vd_i.Views || !vd_i.Views.Items) return null;
        name = name.toLowerCase();
        for (var i = 0; i < vd_i.Views.Items.length; i++) {
            var view = vd_i.Views.Items[i];
            var vd_EA = view.Name.toLowerCase();
            if (vd_EA == name) return view;
        }
        return null;
    };
    this.AddView = function(vd_xU) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var view = vd_U.FindView(vd_xU);
        if (view) return view;
        view = {};
        view._t = vdConst.vdView_code;
        view.HandleId = vd_U.vd_eV();
        view.Name = vd_xU;
        view.ViewLayout = 'h_' + layout.HandleId.toString();
        view.ViewSize = layout.ViewSize;
        view.ViewWorldToViewMatrix = vdgeo.vd_bY(layout.World2ViewMatrix);
        view.ViewPerspectiveMod = layout.PerspectiveMod;
        view.ViewRenderMode = layout.RenderMode;
        view.ViewCenter = vdgeo.newpoint(layout.ViewCenter[X], layout.ViewCenter[Y], layout.ViewCenter[Z]);
        view.ViewFocalLength = layout.FocalLength;
        view.ViewLensAngle = layout.LensAngle;
        if (!vd_i.Views) vd_i.Views = {};
        if (!vd_i.Views.Items) vd_i.Views.Items = [];
        vd_i.Views["h_" + view.HandleId.toString()] = vd_i.Views.Items.length;
        vd_i.Views.Items.push(view);
        return view;
    };
    this.SetActiveView = function(vd_mV) {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        var layout = vd_U.GetActiveLayout();
        var view = null;
        if (vd_mV) {
            if (typeof vd_mV === 'string') view = vd_U.FindView(vd_mV);
            else if (typeof vd_mV === 'object') view = vd_mV;
        }
        if (view) {
            vd_i.ActiveView = 'h_' + view.HandleId.toString();
            vd_i.vd_iy = view;
            if (vd_i.LayOuts && view.ViewLayout && vd_i.LayOuts[view.ViewLayout] !== undefined) layout = vd_i.LayOuts.Items[vd_i.LayOuts[view.ViewLayout]];
            else layout = vd_i.Model;
            layout.ViewSize = view.ViewSize;
            layout.World2ViewMatrix = vdgeo.vd_bY(view.ViewWorldToViewMatrix);
            layout.PerspectiveMod = view.ViewPerspectiveMod;
            layout.RenderMode = view.ViewRenderMode;
            layout.ViewCenter = vdgeo.newpoint(view.ViewCenter[X], view.ViewCenter[Y], view.ViewCenter[Z]);
            layout.FocalLength = view.ViewFocalLength;
            layout.LensAngle = view.ViewLensAngle;
        } else {
            vd_i.ActiveView = 'h_0';
            vd_i.vd_iy = null;
        }
        vd_U.SetActiveLayout(layout);
    };
    this.GetActiveView = function() {
        var vd_i = vd_g();
        if (vd_i == null) return null;
        if (!vd_i.vd_iy) {
            if (vd_i.ActiveView && vd_i.Views && vd_i.Views.Items && vd_i.Views[vd_i.ActiveView]) vd_i.vd_iy = vd_i.Views.Items[vd_i.Views[vd_i.ActiveView]];
        }
        return vd_i.vd_iy;
    };
    this.vd_By = function(layer, vd_i) {
        if (!layer) return true;
        var vd_jL = vd_i.vd_uM;
        if (!vd_jL) vd_jL = vd_i.vd_iy;
        if (vd_jL) {
            if (vd_jL.FrozenLayers && vd_jL.FrozenLayers['h_' + layer.HandleId.toString()]) return true;
            if (vd_jL.IgnoreFrozenLayers) return false;
        }
        return layer.Frozen;
    };
    this.AddLayer = function(vd_ik) {
        var doc = vd_g();
        if (doc == null) return null;
        var layer = vd_U.FindLayer(vd_ik);
        if (layer) return layer;
        layer = {};
        layer.HandleId = vd_U.vd_eV();
        layer.LineType = doc.ActiveLineType;
        layer.LineWeight = doc.ActiveLineWeight;
        layer.Name = vd_ik;
        layer.PenColor = vdConst.vd_qc(vd_U.GetActivePenColor());
        layer._t = vdConst.vdLayer_code;
        vd_U.vd_bl(doc.Layers, layer);
        return layer;
    };
    function vd_Kb(vd_kG) {
        if (vd_zb(vd_kG)) return true;
        if (vd_kG.constructor === Array) {
            for (var i = 0; i < vd_kG.length; i++) if (!vd_zb(vd_kG[i])) return false;
        } else return false;
        return true;
    };
    function vd_zb(vd_v) {
        return (typeof vd_v === "string" || typeof vd_v === "number" || typeof vd_v === "boolean");
    };
    this.AddXProperty = function(entity, name, vd_v) {
        if (!entity || !name || vd_v == null || vd_v == undefined) return null;
        if (!entity.HandleId || !entity._t || entity._t < 1 || entity._t > 100) return null;
        if (!vd_Kb(vd_v)) return null;
        if (!entity.XProperties) entity.XProperties = {
            Items: []
        };
        var vd_kG = {
            Name: name,
            PropValue: vd_v
        };
        entity.XProperties.Items.push(vd_kG);
        return vd_kG;
    };
    this.GetXProperty = function(entity, name) {
        if (!entity || !name) return null;
        if (!entity.XProperties || entity.XProperties.Items.length == 0) return null;
        for (var i = 0; i < entity.XProperties.Items.length; i++) if (entity.XProperties.Items[i].Name === name) return entity.XProperties.Items[i];
        return null;
    };
    this.GetEntitiesFromLayer = function(vd_ik) {
        var ret = [];
        var layer = vd_U.FindLayer(vd_ik);
        if (!layer) return ret;
        vd_ik = vd_ik.toLowerCase();
        var vd_Lj = vd_U.FindLayer("0");
        var vd_nN;
        var vd_rM = vd_U.GetDocument().LayOuts;
        var lNum = 0;
        if (vd_rM) lNum = vd_rM.Items.length;
        var entities;
        for (var d = 0; d <= lNum; d++) {
            var layout;
            if (d == lNum) layout = vd_U.GetDocument().Model;
            else layout = vd_rM.Items[d];
            entities = layout.Entities;
            if (!entities) continue;
            for (var i = 0; i < entities.Items.length; i++) {
                vd_pN = vd_U.GetEntityItem(entities.Items[i]);
                if (!vd_pN) continue;
                if (!vd_pN.Layer) vd_nN = vd_Lj;
                else vd_nN = vd_U.GetDocument()[vd_pN.Layer];
                if (!vd_nN) continue;
                if (vd_nN.Name.toLowerCase() == vd_ik) ret.push(vd_pN);
            }
        }
        return ret;
    };
    this.GetEntityFromPoint = function(x, y) {
        return vd_R.GetEntityFromPoint(x, y, vd_U.PickSize, vd_U.IgnoreLockLayers);
    };
    this.GetEntitiesFromBox = function(xmin, ymin, xmax, ymax) {
        return vd_R.GetEntitiesFromBox(vdgeo.vd_o(xmin), vdgeo.vd_o(ymin), vdgeo.vd_o(xmax), vdgeo.vd_o(ymax), vd_U.IgnoreLockLayers);
    };
    this.GetEntitiesInWindowBox = function(xmin, ymin, xmax, ymax) {
        return vd_R.GetEntitiesInWindowBox(vdgeo.vd_o(xmin), vdgeo.vd_o(ymin), vdgeo.vd_o(xmax), vdgeo.vd_o(ymax), vd_U.IgnoreLockLayers);
    };
    this.PixelToWorld = function(ptX, ptY) {
        var vd_Iq = vdgeo.vd_bo(vd_R.vd_fp());
        return vdgeo.vd_as(ptX, ptY, 1, vd_Iq);
    };
    this.WorldToPixel = function(vd_EN) {
        return vdgeo.vd_dU(vd_EN, vd_R.vd_fp());
    };
    this.WorldToView = function(pt) {
        return vdgeo.vd_Z(vd_R.vd_aS(), pt);
    };
    this.ViewToWorld = function(pt) {
        var vd_uj = vdgeo.vd_bo(vd_R.vd_aS());
        return vdgeo.vd_Z(vd_uj, pt);
    };
    this.ViewToPixel = function(pt) {
        return vdgeo.vd_dU(pt, vd_R.vd_cR);
    };
    this.PixelToView = function(pt) {
        return vdgeo.vd_dU(pt, vd_R.vd_bD);
    };
    this.PointAt_GPS = function(lat, lon) {
        var doc = vd_U.GetDocument();
        if (!doc || !doc.FileProperties || !doc.FileProperties.Gps_Map) return null;
        var ne = vd_dW.vd_Ld(lat, lon);
        return vdgeo.vd_as(ne[0], ne[1], 0, doc.FileProperties.Gps_Map.NorthEastToWorld);
    };
    this.GPS_AtPoint = function(pt) {
        var doc = vd_U.GetDocument();
        if (!doc || !doc.FileProperties || !doc.FileProperties.Gps_Map) return null;
        var w2ne = vdgeo.vd_bo(doc.FileProperties.Gps_Map.NorthEastToWorld);
        var npt = vdgeo.vd_dU(pt, w2ne);
        return vd_dW.vd_Ij(npt[Y], npt[X]);
    };
    var ctx = null;
    var vd_ej = null;
    var vd_gP = null;
    this.Refresh = function(blc) {
        var img = null;
        if (blc != false) {
            var vd_i = vd_g();
            if (vd_i != null) img = vd_i.Palette._lc;
        }
        vd_R.vd_Y.vd_Ah(img);
        vd_R.vd_Y.Refresh();
        vd_Cb();
    };
    function vd_JM() {
        var vd_ar = vd_U.canvas.width;
        var vd_bx = vd_U.canvas.height;
        if (vd_ej == null) {
            vd_ej = document.createElement("CANVAS");
            vd_ej.setAttribute("width", vd_ar);
            vd_ej.setAttribute("height", vd_bx);
            vd_gP = vd_ej.getContext("2d");
        }
        vd_R.vd_Y.vd_CH();
        vd_gP.putImageData(vd_R.vd_Y.vd_wm(), 0, 0, 0, 0, vd_ar, vd_bx);
    };
    function vd_Ky(vd_gB) {
        if (!ctx) return;
        var vd_ar = vd_U.canvas.width;
        var vd_bx = vd_U.canvas.height;
        ctx.fillStyle = vdgdi.vd_hh(vd_R.vd_eU( - 1));
        ctx.fillRect(0, 0, vd_ar, vd_bx);
        var vd_hi = vdgeo.vd_Z(vd_gB, vdgeo.newpoint(0, 0, 0));
        var vd_iP = vdgeo.vd_Z(vd_gB, vdgeo.newpoint(vd_ar, vd_bx, 0));
        ctx.drawImage(vd_ej, 0, 0, vd_ar, vd_bx, vdgeo.vd_o(vd_hi[X]), vdgeo.vd_o(vd_hi[Y]), vdgeo.vd_o(vd_iP[X] - vd_hi[X]), vdgeo.vd_o(vd_iP[Y] - vd_hi[Y]));
        vd_R.vd_Y.vd_CR();
    };
    this.printToImageData = function(vd_qq, vd_Kp, vd_uq, vd_nX, vd_br, vd_wf, res) {
        var layout = vd_U.GetActiveLayout();
        if (layout == null) return;
        var vd_i = vd_g();
        var vd_in = layout.Printer;
        var resolution = vd_in.Resolution;
        var margins = vd_in.margins;
        var vd_og = vd_in.PrintScale;
        var vd_dv = vd_in.PrintWindow;
        var vd_Bo = vd_in.LandScape;
        if (res) {
            resolution = res;
        }
        var vd_dX = vdgeo.vd_o(resolution * vd_in.paperSize[2] / 100);
        var vd_iu = vdgeo.vd_o(resolution * vd_in.paperSize[3] / 100);
        if (vd_uq != undefined) {
            vd_Bo = false;
            vd_dX = vdgeo.vd_o(resolution * vd_uq[0] / 100);
            vd_iu = vdgeo.vd_o(resolution * vd_uq[1] / 100);
        }
        if (vd_nX != undefined) {
            margins = [vd_nX, vd_nX, vd_nX, vd_nX];
        }
        if (vd_Bo) {
            var tmp = vd_dX;
            vd_dX = vd_iu;
            vd_iu = tmp;
        }
        if (vd_qq == vdConst.PRINT_WINDOW_FLAG_EXTENTS) {
            var vd_mo = vd_U.GetExtents();
            if (vd_mo != null) {
                var box = vdgeo.vd_qd(layout.World2ViewMatrix, vd_mo);
                vd_dv = box;
                if (vdgeo.AreEqual(box[3] - box[0], 0.0, vdgeo.DefaultLinearEquality) || vdgeo.AreEqual(box[4] - box[1], 0.0, vdgeo.DefaultLinearEquality)) vd_qq = vdConst.PRINT_WINDOW_FLAG_VIEW;
            }
        }
        if (vd_qq == vdConst.PRINT_WINDOW_FLAG_VIEW) {
            vd_dv = [vd_R.vd_aP.left, vd_R.vd_aP.bottom, 0, vd_R.vd_aP.right, vd_R.vd_aP.top, 0];
        }
        if (vd_Kp == vdConst.PRINT_SCALE_FLAG_FIT) {
            var vd_qm = 25.4 * vd_dX / resolution;
            var vd_pS = 25.4 * vd_iu / resolution;
            vd_qm -= 25.4 * margins[0] / 100;
            vd_qm -= 25.4 * margins[2] / 100;
            vd_pS -= 25.4 * margins[1] / 100;
            vd_pS -= 25.4 * margins[3] / 100;
            var w = vd_dv[3] - vd_dv[0];
            var h = vd_dv[4] - vd_dv[1];
            if (vdgeo.AreEqual(w, 0.0, vdgeo.DefaultScaleEquality) || vdgeo.AreEqual(h, 0.0, vdgeo.DefaultScaleEquality)) {
                vd_og = [1, 1];
            } else {
                if ((vd_qm / w) < (vd_pS / h)) {
                    vd_og = [1, w / vd_qm];
                } else {
                    vd_og = [1, h / vd_pS];
                }
            }
        }
        var vd_HD = vd_og[0] / vd_og[1];
        var vd_uc = resolution * vd_HD / 25.4;
        var vd_Aj = 1.0 / vd_uc;
        var vd_gK = vdgeo.vd_o(vd_uc * (vd_dv[3] - vd_dv[0]));
        var vd_hO = vdgeo.vd_o(vd_uc * (vd_dv[4] - vd_dv[1]));
        var vd_tW = vdgeo.vd_o(resolution * margins[0] / 100);
        var vd_wY = vdgeo.vd_o(resolution * margins[1] / 100);
        var vd_AK = vdgeo.vd_o(resolution * margins[2] / 100);
        var vd_Bq = vdgeo.vd_o(resolution * margins[3] / 100);
        if ((vd_tW + vd_gK) > (vd_dX - vd_AK)) vd_gK = vd_dX - vd_AK - vd_tW;
        if ((vd_wY + vd_hO) > (vd_iu - vd_Bq)) vd_hO = vd_hO - vd_Bq - vd_wY;
        var nw = vd_gK * vd_Aj;
        var nh = vd_hO * vd_Aj;
        var vc = vdgeo.newpoint(vd_dv[0] + nw * 0.5, vd_dv[1] + nh * 0.5, 0);
        var vs = nh;
        var vd_gh, vd_pd, vd_kH, vd_lD, vd_op;
        var vd_pj = Math.abs(vd_dv[3] - vd_dv[0]);
        var vd_nY = Math.abs(vd_dv[4] - vd_dv[1]);
        var vd_hV = 0;
        var vd_hM = vd_gK / vd_hO;
        if (!layout.FocalLength) layout.FocalLength = 0.05;
        if (!layout.LensAngle) layout.LensAngle = 60.0;
        if (vd_pj / vd_nY < vd_hM) {
            vd_gh = vdgeo.DegreesToRadians(layout.LensAngle) / 2;
            vd_pd = vd_nY / 2;
            vd_hV = vd_pd / Math.tan(vd_gh);
        } else {
            vd_kH = 2.0 * layout.FocalLength * Math.tan(vdgeo.DegreesToRadians(layout.LensAngle / 2.0));
            vd_lD = vdgeo.RadiansToDegrees(Math.atan(vd_kH * vd_hM * 0.5 / layout.FocalLength)) * 2.0;
            vd_gh = vdgeo.DegreesToRadians(vd_lD) / 2;
            vd_op = vd_pj / 2;
            vd_hV = vd_op / Math.tan(vd_gh);
        }
        vc[Z] = Math.max(vd_dv[5], vd_dv[2]) + vd_hV;
        if (vd_qq == vdConst.PRINT_WINDOW_FLAG_VIEW) vc = layout.ViewCenter;
        vd_dX = vdgeo.vd_vd(vd_dX);
        vd_gK = vdgeo.vd_vd(vd_gK);
        var vd_ff = null;
        var vd_hy = null;
        var vd_dp = null;
        var vd_lz = null;
        try {
            vd_ff = document.createElement("CANVAS");
            vd_ff.setAttribute("width", vd_dX);
            vd_ff.setAttribute("height", vd_iu);
            vd_hy = vd_ff.getContext("2d");
            vd_dp = new vd_rF(vd_U, 0, 0, vd_gK, vd_hO, null);
            vd_dp.vd_ux(vd_R);
            vd_dp.vd_aG = false;
            vd_lz = vd_hy.createImageData(vd_gK, vd_hO);
        } catch(ex) {
            vd_ff = null;
            vd_hy = null;
            vd_dp = null;
            vd_lz = null;
        }
        if (vd_lz == null) return null;
        vd_dp.vd_Y.vd_jd(vd_lz, vd_gK, vd_hO, true);
        if (vd_br == undefined) vd_br = [255, 255, 255, 255];
        vd_dp.update(vs, vc, layout.World2ViewMatrix, vd_sG(layout), layout.FocalLength, layout.LensAngle, layout.PerspectiveMod == 1, layout.RenderMode, layout.Sections, vd_i.Lights);
        vd_dp.vd_np(vd_i.Palette, vd_br);
        vd_dp.clear();
        var vd_mq = vd_dp.vd_ij(layout.ShowHidenEdges);
        vd_pL(layout.Entities, true, vd_dp, vd_i);
        vd_dp.vd_ij(vd_mq);
        vd_dp.vd_Y.vd_Ah(vd_i.Palette._lc);
        vd_hy.fillStyle = vdgdi.vd_hh(vd_br);
        vd_hy.fillRect(0, 0, vd_dX, vd_iu);
        vd_hy.putImageData(vd_lz, vd_tW, vd_wY);
        if (vd_wf != undefined && vd_wf > 0) {
            vd_hy.strokeStyle = vdgdi.vd_hh(vd_dp.vd_kn());
            vd_hy.lineWidth = vd_wf;
            vd_hy.strokeRect(0, 0, vd_dX, vd_iu);
        }
        vd_dp.vd_Y.vd_jd(null);
        var ret = vd_ff.toDataURL();
        vd_ff = null;
        vd_hy = null;
        vd_dp = null;
        vd_lz = null;
        vd_U.vd_cV.vd_Ai(vd_R);
        return ret;
    };
    var Action = new vd_Hb(vd_U);
    this.ActiveAction = function() {
        return Action;
    };
    this.SetActionOrthoMode = function(mode) {
        return Action.vd_vT(mode);
    };
    this.SetActionOsnapColor = function(color) {
        var ret = Action.vd_wK;
        if (color[3] === undefined) color[3] = 255;
        Action.vd_wK = color;
        return ret;
    };
    this.SetActionOsnapSize = function(size) {
        var ret = Action.vd_vR;
        Action.vd_vR = size;
        return ret;
    };
    this.SetActionLineColor = function(color) {
        var ret = Action.vd_rP;
        Action.vd_rP = color;
        return ret;
    };
    this.SetActionLineWidth = function(lw) {
        var ret = Action.vd_jm;
        Action.vd_jm = lw;
        return ret;
    };
    this.SetActionFillColor = function(vd_tv) {
        var ret = Action.vd_mM;
        Action.vd_mM = vd_tv;
        return ret;
    };
    this.SetActionCrossFillColor = function(vd_tv) {
        var ret = Action.vd_pa;
        Action.vd_pa = vd_tv;
        return ret;
    };
    this.GetUserPoint = function(vd_pn) {
        Action.cancel();
        Action.vd_lU = vd_pn;
        Action.actionType = vdConst.ACTION_POINT_WORLD;
        Action.start();
    };
    this.GetUserLine = function(vd_pn, vd_mQ) {
        Action.cancel();
        Action.vd_lU = vd_pn;
        Action.actionType = vdConst.ACTION_LINE_WORLD;
        Action.vd_zk(vd_mQ);
        Action.start(Action.actionCount);
    };
    this.GetUserRect = function(vd_pn, vd_mQ) {
        Action.cancel();
        Action.vd_lU = vd_pn;
        Action.actionType = vdConst.ACTION_RECT_VIEW;
        Action.vd_zk(vd_mQ);
        Action.start(Action.actionCount);
    };
    this.CmdMove = function(entities, from, to, vd_cI) {
        vd_lH(this, {
            vd_bZ: 1,
            entities: entities,
            vd_ai: from,
            vd_df: to
        },
        vd_cI);
    };
    this.CmdScale = function(entities, from, scale, vd_cI) {
        vd_lH(this, {
            vd_bZ: 2,
            entities: entities,
            vd_ai: from,
            vd_df: scale
        },
        vd_cI);
    };
    this.CmdRotate = function(entities, from, rotation, vd_cI) {
        vd_lH(this, {
            vd_bZ: 3,
            entities: entities,
            vd_ai: from,
            vd_df: rotation
        },
        vd_cI);
    };
    this.CmdCopy = function(entities, from, to, vd_cI) {
        vd_lH(this, {
            vd_bZ: 4,
            entities: entities,
            vd_ai: from,
            vd_df: to
        },
        vd_cI);
    };
    this.CmdSelect = function(vd_cI, entities) {
        vd_lH(this, {
            vd_bZ: 0,
            entities: entities
        },
        vd_cI);
    };
    this.vd_qv = function(action, status) {
        if (action.vd_lU != null) action.vd_lU(action, status);
        if (status === 'draw' && vd_U.vdActionDraw != null) vd_U.vdActionDraw(action);
    };
    function vd_gO(layout, vd_pW) {
        if (layout) {
            var vd_i = vd_g();
            vd_R.update(layout.ViewSize, layout.ViewCenter, layout.World2ViewMatrix, vd_sG(layout), layout.FocalLength, layout.LensAngle, layout.PerspectiveMod === 1, (vd_pW === true ? -1 : layout.RenderMode), layout.Sections, vd_i.Lights);
        } else vd_R.update(10, vdgeo.newpoint(0, 0, 0), vdgeo.vd_s(), null, 0.05, 30, false, (vd_pW === true ? -1 : undefined));
    };
    this.vd_jl = function() {
        return ctx;
    };
    this.vd_p = function() {
        return vd_R;
    };
    this.SaveDocument = function(vd_nk) {
        vd_dr.vd_oT(vd_U, vd_nk);
    };
    this.SelectDocument = function(vd_bq, vd_kX) {
        vd_U.vd_tG(vd_aR, vd_bq, vd_kX, vd_vM);
    };
    function vd_zm(vd_lA) {
        var vd_ml = vd_g();
        if (!vd_ml) return;
        var vd_i = vd_lA.vd_J;
        if (!vd_i) return;
        var vd_zr = vd_ml.Model.Entities.Items;
        var vd_BB = vd_i.Model.Entities.Items;
        for (var i = 0; i < vd_BB.length; i++) {
            var hid = vd_BB[i];
            var entity = vd_i[hid];
            if (!entity) continue;
            if (!vd_ml[hid]) {
                vd_ml[hid] = entity;
                vd_zr.push(hid);
            } else {
                if (vd_lA.vd_nW.mergeFlags & vdConst.MERGEFLAGS_REPLACE_EXISITING) {
                    vd_ml[hid] = entity;
                } else if (vd_lA.vd_nW.mergeFlags & vdConst.MERGEFLAGS_KEEP_BOTH) {
                    entity.HandleId = vd_U.vd_eV();
                    hid = 'h_' + entity.HandleId.toString();
                    vd_ml[hid] = entity;
                    vd_zr.push(hid);
                }
            }
        }
        if (vd_lA.vd_nW.vd_qg) vd_lA.vd_nW.vd_qg({
            vdcanvas: vd_U,
            mergedoc: vd_i,
            mergeFlags: vd_lA.vd_nW.mergeFlags
        });
        if (vd_aF != null) clearTimeout(vd_aF);
        vd_aF = setTimeout(vd_U.redraw, 0);
    };
    this.MergeDocument = function(filename, vd_qg, mergeFlags, vd_lb) {
        var documentdata = new vd_vj(vd_U);
        documentdata.vd_nW = {
            mergeFlags: mergeFlags,
            vd_qg: vd_qg
        };
        if (!vd_lb) vd_U.vd_tG(documentdata, filename, false, vd_zm);
        else documentdata.LoadDocument(filename, false, vd_zm, vd_lb);
    };
    this.SelectDocumentBlob = function(vd_lb, vd_bq) {
        if (!vd_aR) return;
        vd_aR.LoadDocument(vd_bq, false, vd_vM, vd_lb);
    };
    function vd_Dr() {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            return null;
        }
    };
    this.vd_tG = function(vd_uy, vd_bq, vd_kX, vd_jF) {
        if (!vd_uy) return;
        var _url = vd_bq;
        if (vd_kX) _url += "?timestamp=" + new Date().getTime();
        var vd_cm = vd_Dr();
        if (!vd_cm) return;
        if (!vd_jF) vd_jF = vd_U.redraw;
        vd_U.vd_eb.start(vd_U.MessagesDictionary.PROGRESS_DOWNLOAD, true);
        try {
            var done = false;
            vd_cm.onprogress = function(evt) {
                if (evt.lengthComputable) vd_U.vd_eb.Progress(evt.loaded, evt.total);
                else vd_U.vd_eb.Progress(evt.loaded / 100, 1);
            };
            vd_cm.onreadystatechange = function() {
                if (vd_cm.readyState == 4 && !done) {
                    done = true;
                    vd_U.vd_eb.end();
                    if (vd_cm.status == 200 || vd_cm.status == 0) {
                        vd_uy.LoadDocument(_url, false, vd_jF);
                    } else {
                        vd_U.vd_co(vdConst.Err_LoadFile, vd_cm.status, _url);
                    }
                }
            };
            vd_cm.open("GET", _url, true);
            vd_cm.send();
        } catch(ex) {
            done = true;
            vd_uy.LoadDocument(_url, false, vd_jF);
        }
    };
    var vd_aR = null;
    var vd_rj = null;
    function vd_rn() {
        if (!vd_rj) return vd_aR;
        return vd_rj;
    };
    function vd_g() {
        if (vd_aR == null) return null;
        return vd_aR.vd_J;
    };
    function vd_vM(vd_lA) {
        vd_eY = 0;
        vd_R.vd_rh();
        Action.cancel();
        var vd_i = vd_g();
        vd_U.scriptCommand = new vd_xG(vd_U);
        if (vd_i != null) {
            var layout = vd_U.GetActiveLayout();
            vd_R.vd_np(vd_i.Palette, layout.BkColorEx);
            if (vd_i.LineTypeScale == undefined) vd_i.LineTypeScale = 1.0;
            if (vd_U.vdAfterOpenDocument != null) vd_U.vdAfterOpenDocument(vd_U);
            vd_U.SetActiveLayout(layout);
        }
    };
    this.SetSize = function(width, height, vd_br) {
        if (vd_U.canvas == null) return;
        if (width) {
            width = vdgeo.vd_vd(width);
            vd_U.canvas.setAttribute("width", width);
            if (vd_U.canvas.style) vd_U.canvas.style.width = width.toString() + "px";
        }
        if (height) {
            height = vdgeo.vd_o(height);
            vd_U.canvas.setAttribute("height", height);
            if (vd_U.canvas.style) vd_U.canvas.style.height = height.toString() + "px";
        }
        width = vd_U.canvas.clientWidth ? vd_U.canvas.clientWidth: vd_U.canvas.width;
        height = vd_U.canvas.clientHeight ? vd_U.canvas.clientHeight: vd_U.canvas.height;
        if (vd_R != null && width == vd_R.width && height == vd_R.height) return;
        if (vd_R != null) {
            vd_R.vd_Y.vd_jd(null);
            vd_R.destroy();
        }
        vd_U.canvas.setAttribute("width", width);
        vd_U.canvas.setAttribute("height", height);
        vd_ej = null;
        vd_gP = null;
        ctx = vd_U.canvas.getContext("2d");
        var vd_yF = vd_R;
        vd_R = new vd_rF(vd_U, 0, 0, width, height, ctx);
        vd_cX.vd_Kh(vd_R);
        vd_R.vd_ux(vd_yF);
        vd_yF = null;
        vd_R.vd_Y.vd_jd(ctx.getImageData(0, 0, width, height), width, height);
        vd_R.vd_np(null, vd_br);
        Action.resize();
        setTimeout(vd_U.redraw);
    };
    function vd_ci(elem, vd_nj, vd_mv, vd_bz) {
        if (elem.addEventListener) elem.addEventListener(vd_nj, vd_mv, vd_bz);
        else if (elem.attachEvent) elem.attachEvent('on' + vd_nj, vd_mv);
    };
    function vd_cg(elem, vd_nj, vd_mv, vd_bz) {
        if (elem.removeEventListener) elem.removeEventListener(vd_nj, vd_mv, vd_bz);
        else if (elem.detachEvent) elem.detachEvent('on' + vd_nj, vd_mv);
    };
    var vd_bz = true;
    var vd_uJ = false;
    var vd_DH = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll": "mousewheel";
    function vd_JY() {
        vd_ci(vd_U.canvas, 'mousemove', vd_yZ, vd_bz);
        vd_ci(vd_U.canvas, 'mouseout', vd_yz, vd_bz);
        vd_ci(vd_U.canvas, 'mouseover', vd_xn, vd_bz);
        vd_ci(vd_U.canvas, 'mousedown', vd_xS, vd_bz);
        vd_ci(vd_U.canvas, 'mouseup', vd_xe, vd_bz);
        vd_ci(vd_U.canvas, vd_DH, vd_xN, vd_bz);
        vd_ci(vd_U.canvas, 'click', vd_wX, vd_bz);
        vd_ci(vd_U.canvas, 'contextmenu', vd_yN, vd_bz);
        vd_uJ = true;
    };
    function vd_zz() {
        if (!vd_uJ) return;
        vd_cg(vd_U.canvas, 'mousemove', vd_yZ, vd_bz);
        vd_cg(vd_U.canvas, 'mouseout', vd_yz, vd_bz);
        vd_cg(vd_U.canvas, 'mouseover', vd_xn, vd_bz);
        vd_cg(vd_U.canvas, 'mousedown', vd_xS, vd_bz);
        vd_cg(vd_U.canvas, 'mouseup', vd_xe, vd_bz);
        vd_cg(vd_U.canvas, vd_DH, vd_xN, vd_bz);
        vd_cg(vd_U.canvas, 'click', vd_wX, vd_bz);
        vd_cg(vd_U.canvas, 'contextmenu', vd_yN, vd_bz);
        vd_uJ = false;
    };
    function vd_BS(e) {
        vd_U.SetSize();
    };
    this.Init = function(vd_fP, width, height, vd_br) {
        vd_U.canvas = document.getElementById(vd_fP);
        vd_U.canvas.tabindex = '0';
        vd_U.canvas.style.cursor = "crosshair";
        vd_ci(window, "resize", vd_BS, vd_bz);
        vd_ci(vd_U.canvas, "touchstart", vd_xB, vd_bz);
        vd_ci(vd_U.canvas, "touchend", vd_sn, vd_bz);
        vd_ci(vd_U.canvas, "touchcancel", vd_yo, vd_bz);
        vd_ci(vd_U.canvas, "touchleave", vd_xL, vd_bz);
        vd_ci(vd_U.canvas, "touchmove", vd_xC, vd_bz);
        vd_ci(window, "keydown", vd_xK, vd_bz);
        vd_JY();
        vd_U.SetSize(width, height, vd_br);
        if (vd_aR) vd_aR.vd_zg();
        vd_aR = new vd_vj(vd_U);
        vd_rj = vd_aR;
    };
    this.vd_Gj = function() {
        vd_cg(window, "resize", vd_BS, vd_bz);
        vd_cg(vd_U.canvas, "touchstart", vd_xB, vd_bz);
        vd_cg(vd_U.canvas, "touchend", vd_sn, vd_bz);
        vd_cg(vd_U.canvas, "touchcancel", vd_yo, vd_bz);
        vd_cg(vd_U.canvas, "touchleave", vd_xL, vd_bz);
        vd_cg(vd_U.canvas, "touchmove", vd_xC, vd_bz);
        vd_cg(window, "keydown", vd_xK, vd_bz);
        vd_zz();
        vd_R.vd_Y.vd_jd(null);
        vd_R.destroy();
        vd_R = null;
        vd_U.canvas = null;
        ctx = null;
        vd_ej = null;
        vd_gP = null;
        if (vd_aR) vd_aR.vd_zg();
        vd_aR = null;
        vd_rj = null;
    };
    function vd_GM(vd_vm) {
        this.target = vd_vm;
        var vd_U = this;
        this.Info = "";
        this.percent = 1000;
        var vd_pi = 0;
        var vd_nl = 0;
        this.Cancel = false;
        var vd_uw = false;
        this.start = function(info, async, total) {
            vd_uw = async;
            vd_U.Info = info;
            vd_U.Progress( - 1000, 1);
            if (total != undefined) vd_nl = total;
            vd_pi = 0;
            return vd_U.Cancel;
        };
        this.end = function() {
            if (vd_U.percent !== 1000) vd_U.Progress(100, 100);
            vd_pi = 0;
            vd_nl = 0;
            vd_U.percent = 1000;
            vd_U.Info = "";
            vd_uw = false;
            return vd_U.Cancel;
        };
        function vd_yH(current, total) {
            if (total != undefined) vd_nl = total;
            if (current == undefined) vd_pi++;
            else vd_pi = current;
            var vd_rr = 0;
            if (vd_nl > 0) vd_rr = Number((100 * vd_pi / vd_nl).toFixed(0));
            if (vd_rr == vd_U.percent) return false;
            vd_U.percent = vd_rr;
            return true;
        };
        function vd_yI() {
            if (vd_kL != null) clearTimeout(vd_kL);
            vd_kL = null;
            vd_U.Cancel = false;
            if (vd_U.target.vdprogress != null) vd_U.target.vdprogress(vd_U);
            if (!vd_U.Cancel && vd_uw === true) {
                if (vd_U.percent < 0 || vd_U.percent >= 100) vd_U.target.Refresh();
                else {
                    var vd_Dz = 24;
                    var vd_Co = vdgeo.vd_o(vd_Dz / 2);
                    vd_U.target.vd_jl().globalAlpha = 80 / 255;
                    vd_U.target.vd_jl().lineWidth = vd_Dz;
                    vd_U.target.vd_jl().strokeStyle = vdgdi.vd_hh([0, 0, 128]);
                    vd_U.target.vd_jl().beginPath();
                    vd_U.target.vd_jl().moveTo(0, vd_Co);
                    vd_U.target.vd_jl().lineTo(vdgeo.vd_o(vd_U.target.canvas.width * vd_U.percent / 100), vd_Co);
                    vd_U.target.vd_jl().stroke();
                    vd_U.target.vd_jl().globalAlpha = 1;
                }
            }
        };
        var vd_kL = null;
        this.vd_ML = function(current, total) {
            vd_yH(current, total);
            if (vd_kL != null) clearTimeout(vd_kL);
            vd_kL = null;
            vd_kL = setTimeout(vd_yI, 5);
        };
        this.Progress = function(current, total) {
            var ret = vd_yH(current, total);
            if (ret) vd_yI();
            return ret;
        };
        return this;
    };
    this.vd_eb = new vd_GM(vd_U);
    function vd_JP(sender, vd_IR, vd_Hx, vd_If, p1, p2) {
        var vd_U = this;
        this.NumTouchs = vd_IR;
        this.PrevPos1 = vd_Hx;
        this.PrevPos2 = vd_If;
        this.Pos1 = p1;
        this.Pos2 = p2;
        this.target = sender;
        this.Cancel = false;
        this.toString = function() {
            var ret = vd_U.NumTouchs.toString();
            if (vd_U.PrevPos1 != null) ret += (' , ' + vd_U.PrevPos1[X].toString() + ' , ' + vd_U.PrevPos1[Y].toString());
            else ret += ", null";
            if (vd_U.Pos1 != null) ret += (' , ' + vd_U.Pos1[X].toString() + ' , ' + vd_U.Pos1[Y].toString());
            else ret += ", null";
            if (vd_U.PrevPos2 != null) ret += (' , ' + vd_U.PrevPos2[X].toString() + ' , ' + vd_U.PrevPos2[Y].toString());
            else ret += ", null";
            if (vd_U.Pos2 != null) ret += (' , ' + vd_U.Pos2[X].toString() + ' , ' + vd_U.Pos2[Y].toString());
            else ret += ", null";
            return ret;
        };
        return this;
    };
    function vd_fS(sender, button, vd_lR, pos, pPos, vd_kR, skey) {
        var vd_U = this;
        this.mousebutton = button;
        this.skey = skey;
        this.istouched = vd_lR;
        this.xPix = vdgeo.vd_o(pos[X]);
        this.yPix = vdgeo.vd_o(pos[Y]);
        this.prevPos = pPos;
        this.Delta = vd_kR;
        var vd_gD = vd_R.vd_mR(vd_U.xPix, vd_U.yPix);
        this.x = vd_gD[X];
        this.y = vd_gD[Y];
        this.z = vd_gD[Z];
        this.target = sender;
        this.Cancel = false;
        this.toString = function() {
            var ret = "";
            ret += (vd_U.mousebutton.toString() + ' ,' + (vd_U.istouched === true ? "true": "false") + ' ,');
            ret += (vd_U.xPix.toString() + ' ' + vd_U.yPix.toString() + ' ,');
            ret += ((vd_U.prevPos != null ? (vd_U.prevPos[X].toString() + ' ' + vd_U.prevPos[Y].toString()) : 'null') + ' ');
            return ret;
        };
        return this;
    };
    this.vdAfterOpenDocument = function(e) {};
    this.vdAfterSaveDocument = function(e) {};
    this.vdmousemoveAfter = function(e) {};
    this.vdmousemove = function(e) {};
    this.vdmousedown = function(e) {};
    this.vdmouseup = function(e) {};
    this.vdmousewheel = function(e) {};
    this.vdmouseout = function(e) {};
    this.vddblclick = function(e) {};
    this.vdclick = function(e) {};
    this.vdtouchMove = function(e) {};
    this.vdprogress = function(e) {};
    this.vdPrompt = function(e, msg) {};
    this.vdKeyDown = function(e) {};
    this.vdError = function(sender, vd_BH, vd_yE, info) {};
    this.vdLoadXref = function(e) {};
    this.vdXrefLoaded = function(e) {};
    this.vdSelectionModified = null;
    this.vdActionDraw = null;
    function vd_oS(sender, vx, vy, vz, vs, vd_bd) {
        this.target = sender;
        this.ViewCenterX = vx;
        this.ViewCenterY = vy;
        this.ViewCenterZ = vz;
        this.ViewSize = vs;
        this.vd_qA = vd_bd;
        this.Cancel = false;
    };
    this.vdUpdateView = function(e) {};
    this.vd_co = function(vd_BH, vd_yE, info) {
        if (vd_U.vdError != null) vd_U.vdError(vd_U, vd_BH, vd_yE, info);
    };
    this.MessagesDictionary = {
        SELECT_ENTITIES: 'Select entities',
        SPECIFY_REFERENCE_POINT: 'Specify reference point',
        SPECIFY_START_POINT: 'Specify start point',
        SPECIFY_SECOND_POINT: 'Specify second point',
        SPECIFY_END_POINT: 'Specify end point',
        SPECIFY_NEXT_POINT: 'Specify next point',
        SPECIFY_CENTER_POINT: 'Specify center point',
        SPECIFY_RADIUS: 'Specify radius',
        SPECIFY_FIRST_CORNER: 'Specify first corner',
        SPECIFY_OTHER_CORNER: 'Specify other corner',
        SPECIFY_INSERTION_POINT: 'Specify insertion point',
        SPECIFY_SCALE: 'Specify scale',
        SPECIFY_ROTATION: 'Specify rotation',
        PROGRESS_DOWNLOAD: 'Download drawing...',
        PROGRESS_READ_DRAWING: 'Read drawing...'
    };
    this.Prompt = function(msg) {
        if (vd_U.vdPrompt != null) vd_U.vdPrompt(this, msg);
    };
    function vd_EW(obj) {
        if (obj == undefined) obj = vd_U.canvas;
        var vd_At = 0,
        vd_Ac = 0;
        if (obj.offsetParent) {
            do {
                vd_At += obj.offsetLeft;
                vd_Ac += obj.offsetTop;
                obj = obj.offsetParent;
            } while ( obj );
            return [vd_At, vd_Ac];
        }
        return [obj.offsetLeft, obj.offsetTop];
    };
    function vd_cy(evt, target) {
        if (evt.offsetX && evt.offsetY) return [vdgeo.vd_o(evt.offsetX), vdgeo.vd_o(evt.offsetY)];
        var vd_yu = vd_EW(target);
        return [vdgeo.vd_o(evt.pageX - vd_yu[X]), vdgeo.vd_o(evt.pageY - vd_yu[Y])];
    };
    this.vd_ji = function(pos) {
        return pos[X] >= 0 && pos[X] < vd_U.canvas.width && pos[Y] >= 0 && pos[Y] < vd_U.canvas.height;
    };
    var vd_qz = false;
    var vd_sz = false;
    var vd_ru = false;
    function vd_sh() {
        vd_qz = false;
        vd_sz = false;
        vd_ru = false;
    };
    function vd_em(e) {
        var ret = 0;
        if (e.altKey) ret += 1;
        if (e.ctrlKey) ret += 2;
        if (e.shiftKey) ret += 4;
        return ret;
    };
    function vd_ii(e) {
        if (vd_qz) return 1;
        if (vd_sz) return 2;
        if (vd_ru) return 3;
        return 0;
    };
    var vd_cr = [];
    function vd_ro(vd_Jx) {
        for (var i = 0; i < vd_cr.length; i++) {
            if (vd_Jx == vd_cr[i][0]) return i;
        }
        return - 1;
    };
    function cancelBubble(e) {
        var evt = e ? e: window.event;
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.cancelBubble != null) evt.cancelBubble = true;
    };
    function vd_iD(e) {
        var evt = e ? e: window.event;
        if (evt.preventDefault) evt.preventDefault();
        evt.returnValue = false;
        return false;
    };
    var vd_fr = true;
    var vd_pP = 0;
    var vd_rE = 0;
    var vd_pk = null;
    function vd_wX(evt, vd_lR) {
        var ret = false;
        var vd_Q;
        var date = new Date();
        var vd_Dt = date.getTime();
        vd_pP = (vd_Dt <= (vd_rE + 500)) ? (vd_pP + 1) : 1;
        vd_rE = date.getTime();
        var vd_kj;
        if (vd_lR) vd_kj = vd_cy(evt.touches[0], evt.target);
        else vd_kj = vd_cy(evt, evt.target);
        if (vd_pP === 2) {
            vd_pP = 0;
            vd_rE = 0;
            if (vd_pk != null) {
                var xdif = Math.abs(vd_kj[X] - vd_pk[X]);
                var ydif = Math.abs(vd_kj[Y] - vd_pk[Y]);
                if ((xdif < 20) && (ydif < 20)) {
                    vd_Q = new vd_fS(vd_U, vd_ii(evt), vd_lR == true, vd_kj, null, 0, vd_em(evt));
                    if (vd_U.vddblclick != null) vd_U.vddblclick(vd_Q);
                    if (!vd_Q.Cancel) {
                        Action.dblclick(vd_Q);
                    }
                    ret = true;
                }
            }
        }
        if (ret == false) {
            vd_Q = new vd_fS(vd_U, vd_ii(evt), false, vd_kj, null, 0, vd_em(evt));
            if (vd_U.vdclick != null) vd_U.vdclick(vd_Q);
            if (!vd_Q.Cancel) {
                Action.click(vd_Q);
                ret = (vd_lR !== true);
            }
        }
        if (vd_lR) vd_pk = vd_cy(evt.touches[0], evt.target);
        else vd_pk = vd_cy(evt, evt.target);
        return ret;
    };
    function vd_yN(e) {
        e.preventDefault();
        return false;
    };
    function vd_xB(evt) {
        vd_oC(evt, true);
        vd_dD = null;
        vd_zz();
        Action.vd_vx();
        var touches = evt.touches;
        var pos;
        vd_cr.length = 0;
        for (var i = 0; i < touches.length; i++) {
            pos = vd_cy(touches[i], evt.target);
            if (!vd_U.vd_ji(pos)) continue;
            vd_cr.push([touches[i].identifier, pos]);
        }
        if (touches.length == 1 && vd_cr.length == 1) {
            if (vd_wX(evt, true)) return vd_iD(evt);
            pos = vd_cy(touches[0], evt.target);
            var vd_Q = new vd_fS(vd_U, 1, true, pos, null, 0, vd_em(evt));
            if (vd_U.vdmousedown != null) vd_U.vdmousedown(vd_Q);
            if (!vd_Q.Cancel) {
                Action.mousedown(vd_Q);
            }
        }
        cancelBubble(evt);
        return vd_iD(evt);
    };
    function vd_sn(evt) {
        vd_oC(evt, false);
        vd_dD = null;
        Action.vd_vx();
        var touches = evt.changedTouches;
        if (vd_cr.length == 1 && touches.length == 1 && evt.touches.length == 0 && vd_ro(touches[0].identifier) != -1) {
            pos = vd_cy(touches[0], evt.target);
            var vd_Q = new vd_fS(vd_U, 1, true, pos, null, 0, vd_em(evt));
            if (vd_U.vdmouseup != null) vd_U.vdmouseup(vd_Q);
            if (!vd_Q.Cancel) {
                if (vd_U.vdmouseout != null) vd_U.vdmouseout(vd_Q);
                if (!vd_Q.Cancel) Action.mouseup(vd_Q);
            }
        }
        vd_cr.length = 0;
        return vd_fr;
    };
    function vd_xL(evt) {
        return vd_sn(evt);
    };
    function vd_yo(evt) {
        return vd_sn(evt);
    };
    function vd_xC(evt) {
        Action.vd_vx();
        var touches = evt.changedTouches;
        if (evt.touches.length == evt.targetTouches.length) {
            if (evt.touches.length == 1 && touches.length == 1 && vd_cr.length == 1 && vd_ro(touches[0].identifier) != -1) {
                var pos = vd_cy(touches[0], evt.target);
                if (vd_dD == null) vd_dD = [pos[0], pos[1], vd_R.vd_Y.vd_kd(pos[0], pos[1])];
                var distance = vdgeo.Distance2D(pos, vd_dD);
                if (!vdgeo.AreEqual(distance, 0, 0)) {
                    var vd_Q = new vd_fS(vd_U, 1, true, pos, vd_dD, 0, vd_em(evt));
                    if (vd_U.vdmousemove != null) vd_U.vdmousemove(vd_Q);
                    if (!vd_Q.Cancel) {
                        Action.mousemove(vd_Q);
                        if (vd_U.vdmousemoveAfter != null) vd_U.vdmousemoveAfter(vd_Q);
                    }
                }
            } else if (evt.touches.length == 2 && touches.length == 2 && vd_cr.length == 2) {
                var pos1 = null;
                var pos2 = null;
                var idx1 = -1;
                var idx2 = -1;
                var vd_gN = null;
                var vd_fT = null;
                idx1 = vd_ro(touches[0].identifier);
                idx2 = vd_ro(touches[1].identifier);
                if (idx1 !== -1 && idx2 !== -1) {
                    pos1 = vd_cy(touches[0], evt.target);
                    pos2 = vd_cy(touches[1], evt.target);
                    vd_gN = vd_cr[idx1][1];
                    vd_fT = vd_cr[idx2][1];
                    vd_cr.splice(idx1, 1, [vd_cr[idx1][0], pos1]);
                    vd_cr.splice(idx2, 1, [vd_cr[idx2][0], pos2]);
                    if (vd_U.vd_ji(pos1) && vd_U.vd_ji(pos2)) {
                        vd_Q = new vd_JP(vd_U, 2, vd_gN, vd_fT, pos1, pos2);
                        if (vd_U.vdtouchMove != null) vd_U.vdtouchMove(vd_Q);
                        if (!vd_Q.Cancel) {
                            Action.vd_Ex(vd_Q);
                        }
                    }
                }
            }
            cancelBubble(evt);
            return vd_iD(evt);
        }
        return vd_fr;
    };
    var vd_dD = null;
    function vd_yZ(e) {
        var pos = vd_cy(e, e.target);
        if (!vd_U.vd_ji(pos)) return vd_fr;
        if (vd_dD == null) vd_dD = [pos[0], pos[1], vd_R.vd_Y.vd_kd(pos[0], pos[1])];
        var distance = vdgeo.Distance2D(pos, vd_dD);
        if (!vdgeo.AreEqual(distance, 0, 0)) {
            var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, vd_dD, 0, vd_em(e));
            if (vd_U.vdmousemove != null) vd_U.vdmousemove(vd_Q);
            if (!vd_Q.Cancel) {
                Action.mousemove(vd_Q);
                if (vd_U.vdmousemoveAfter != null) vd_U.vdmousemoveAfter(vd_Q);
                cancelBubble(e);
                return vd_iD(e);
            }
        }
        return vd_fr;
    };
    function vd_xN(e) {
        var pos = vd_cy(e, e.target);
        if (!vd_U.vd_ji(pos)) return vd_fr;
        var Delta = e.detail ? (e.detail * -1) : e.wheelDelta;
        Delta = (Delta < 0 ? vd_U.MouseWheelZoomScale: (1 / vd_U.MouseWheelZoomScale));
        var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, null, Delta, vd_em(e));
        if (vd_U.vdmousewheel != null) vd_U.vdmousewheel(vd_Q);
        if (!vd_Q.Cancel) {
            Action.mousewheel(vd_Q);
            cancelBubble(e);
            return vd_iD(e);
        }
        return vd_fr;
    };
    function vd_oC(e, vd_Lt) {
        e.preventDefault();
        vd_sh();
        if (('ontouchstart' in document.documentElement) || ('ontouchstart' in window)) vd_qz = true;
        else if (e.which == 1) vd_qz = true;
        else if (e.which == 2) vd_sz = true;
        else if (e.which == 3) vd_ru = true;
    };
    function vd_xS(e) {
        vd_oC(e, true);
        vd_dD = null;
        var pos = vd_cy(e, e.target);
        if (!vd_U.vd_ji(pos)) return vd_fr;
        var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, null, 0, vd_em(e));
        if (vd_U.vdmousedown != null) vd_U.vdmousedown(vd_Q);
        if (!vd_Q.Cancel) {
            Action.mousedown(vd_Q);
            cancelBubble(e);
            return vd_iD(e);
        }
        return vd_fr;
    };
    function vd_xe(e) {
        vd_dD = null;
        var pos = vd_cy(e, e.target);
        if (!vd_U.vd_ji(pos)) {
            Action.cancel();
            return vd_fr;
        }
        vd_oC(e, false);
        var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, null, 0, vd_em(e));
        if (vd_U.vdmouseup != null) vd_U.vdmouseup(vd_Q);
        if (!vd_Q.Cancel) {
            Action.mouseup(vd_Q);
            cancelBubble(e);
            vd_sh();
            return vd_iD(e);
        }
        vd_sh();
        return vd_fr;
    };
    function vd_xn(e) {
        var pos = vd_cy(e, e.target);
        var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, null, 0, vd_em(e));
        Action.mouseover(vd_Q);
        return vd_fr;
    };
    function vd_yz(e) {
        vd_sh();
        var pos = vd_cy(e, e.target);
        var vd_Q = new vd_fS(vd_U, vd_ii(e), e.istouched, pos, null, 0, vd_em(e));
        if (vd_U.vdmouseout != null) vd_U.vdmouseout(vd_Q);
        if (!vd_Q.Cancel) {
            Action.mouseout(vd_Q);
            cancelBubble(e);
            return vd_iD(e);
        }
        return vd_fr;
    };
    function vd_xK(e) {
        if (vd_U.vdKeyDown != null) vd_U.vdKeyDown(e);
        if (e.Cancel !== true) Action.keydown(e);
        return vd_fr;
    };
    return this;
};
function vd_LI(vd_vp) {
    var vd_U = this;
    var vd_dt = vd_vp;
    var vd_iw = 0;
    var vd_kw = false;
    this.Enable = true;
    var vd_bb = [];
    var vd_eI = [];
    function vd_iU(_obj, vd_jr, vd_JL) {
        this.obj = _obj;
        this.name = vd_jr;
        this.value = vd_JL;
    };
    function vd_BK(value) {
        this.undogoup = value;
    };
    Object.defineProperty(vd_U, 'UndoStack', {
        get: function() {
            return vd_bb;
        }
    });
    function vd_CL(obj) {
        if (!vdConst.vd_KJ(obj)) return;
        vd_dt.UpdateFig(obj);
        vd_kw = true;
    };
    function vd_JI() {
        if (!vd_bb || vd_bb.length == 0) return - 1;
        var vd_V = vd_bb[vd_bb.length - 1];
        vd_bb.length -= 1;
        if (!vd_eI) vd_eI = [];
        if (vd_V.name === 'special_transform') {
            vd_V.value.reverse();
            vd_eI.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.value));
            vd_k.vd_iz(vd_V.value[0], vd_V.obj);
        } else if (vd_V.name === 'special_movegrips') {
            vd_V.value[1][X] *= -1;
            vd_V.value[1][Y] *= -1;
            vd_V.value[1][Z] *= -1;
            vd_eI.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.value));
            vd_u.vd_mg(vd_V.obj, vd_V.value[0], vd_V.value[1], vd_dt);
        } else {
            vd_eI.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.obj[vd_V.name]));
            vd_V.obj[vd_V.name] = vd_V.value;
        }
        vd_CL(vd_V.obj);
        if (vd_V.obj['undogoup'] != undefined) vd_iw += (vd_V.obj['undogoup'] ? -1 : 1);
        return vd_iw;
    };
    function vd_Ki() {
        if (!vd_eI || vd_eI.length == 0) return - 1;
        var vd_V = vd_eI[vd_eI.length - 1];
        vd_eI.length -= 1;
        if (!vd_bb) vd_bb = [];
        if (vd_V.name === 'special_transform') {
            vd_V.value.reverse();
            vd_bb.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.value));
            vd_k.vd_iz(vd_V.value[0], vd_V.obj);
        } else if (vd_V.name === 'special_movegrips') {
            vd_V.value[1][X] *= -1;
            vd_V.value[1][Y] *= -1;
            vd_V.value[1][Z] *= -1;
            vd_bb.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.value));
            vd_u.vd_mg(vd_V.obj, vd_V.value[0], vd_V.value[1], vd_dt);
        } else {
            vd_bb.push(new vd_iU(vd_V.obj, vd_V.name, vd_V.obj[vd_V.name]));
            vd_V.obj[vd_V.name] = vd_V.value;
        }
        vd_CL(vd_V.obj);
        if (vd_V.obj['undogoup'] != undefined) vd_iw += (vd_V.obj['undogoup'] ? -1 : 1);
        return vd_iw;
    };
    this.Clear = function() {
        vd_bb = [];
        vd_eI = [];
        vd_iw = 0;
    };
    this.store = function(obj, name, value) {
        if (!vd_U.Enable) return;
        if (!vd_bb) vd_bb = [];
        if (value == undefined) value = obj[name];
        vd_bb.push(new vd_iU(obj, name, value));
    };
    this.group_start = function() {
        vd_U.store(new vd_BK(false), 'undogoup', true);
    };
    this.group_end = function() {
        if (vd_bb && vd_bb.length > 0 && vd_bb[vd_bb.length - 1].name === 'undogoup' && vd_bb[vd_bb.length - 1].value === true) {
            vd_bb.pop();
            return;
        }
        vd_U.store(new vd_BK(true), 'undogoup', false);
    };
    this.undo = function() {
        vd_kw = false;
        do {} while ( vd_JI () > 0);
        if (vd_kw) vd_dt.UpdateLayout();
        vd_kw = false;
    };
    this.redo = function() {
        vd_kw = false;
        do {} while ( vd_Ki () > 0);
        if (vd_kw) vd_dt.UpdateLayout();
        vd_kw = false;
    };
    return this;
};
var vd_yK = {};
vd_yK.chk = function(vd_dt, palette) {
    var s;
    var k;
    if (palette._lc) {
        var vl = [String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 100, 101, 118, 46, 118, 100, 114, 97, 119, 46, 99, 111, 109, 47), String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 118, 100, 114, 97, 119, 46, 99, 111, 109, 47), String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 119, 119, 119, 46, 118, 100, 114, 97, 119, 46, 99, 111, 109, 47), String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 119, 119, 119, 46, 118, 100, 114, 97, 119, 98, 111, 120, 46, 99, 111, 109, 47), String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 118, 100, 114, 97, 119, 98, 111, 120, 46, 99, 111, 109, 47), String.fromCharCode(102, 105, 108, 101, 58, 47, 47, 47, 67, 58, 47, 118, 100, 114, 97, 119, 55, 47, 87, 101, 98, 76, 105, 98, 114, 97, 114, 121, 47), ];
        var u = decodeURI(document.location.href.split('?')[0]);
        for (k = 0; k < vl.length; k++) {
            palette._lc._a1 = u.substring(0, vl[k].length) == vl[k];
            if (palette._lc._a1) break;
        }
        var lv = vd_dt[String.fromCharCode(108, 105, 99, 118, 97, 108)];
        if (!palette._lc._a1 && lv) {
            var suc1 = false;
            for (k = 0; k < lv.length; k++) {
                s = base64.vd_yq(base64.vd_wV(lv[k].split('').reverse().join('')));
                suc1 = document._lc.indexOf(s) >= 0;
                if (suc1) break;
            }
            if (suc1) {
                for (k = 0; k < lv.length; k++) {
                    s = base64.vd_yq(base64.vd_wV(lv[k].split('').reverse().join('')));
                    palette._lc._a1 = u.indexOf(s) >= 0;
                    if (palette._lc._a1) break;
                }
            }
        }
    }
};
function vd_vj(vd_vp) {
    var vd_U = this;
    var vd_dt = vd_vp;
    this.vd_CF = new vd_Jk();
    this.FileName = "";
    this.vd_iv = "";
    this.Loaded = false;
    this.vd_J = null;
    var vd_Op = false;
    var vd_kE = null;
    var vd_ob = false;
    var vd_ch = [];
    function vd_Lw() {
        var vd_gm = document.getElementsByTagName('head')[0];
        for (var k = 0; k < vd_ch.length; k++) {
            vd_ch[k].onreadystatechange = null;
            vd_ch[k].onload = null;
            vd_ch[k].readyState = 'none';
            vd_ch[k].innerHTML = "";
            vd_gm.removeChild(vd_ch[k]);
        }
        vd_ch = [];
    };
    function vd_yh(e) {
        var id = -1;
        for (var k = 0; k < vd_ch.length; k++) {
            if (vd_ch[k] === e.target) {
                id = k;
                break;
            }
        }
        if (id === -1) return;
        var vd_gm = document.getElementsByTagName('head')[0];
        vd_ch[id].onreadystatechange = null;
        vd_ch[id].onload = null;
        vd_ch[id].readyState = 'none';
        vd_ch[id].innerHTML = "";
        vd_gm.removeChild(vd_ch[id]);
        vd_ch.splice(id, 1);
    };
    this.vd_HP = function(item) {
        return vd_U.vd_J[item];
    };
    this.vd_Ik = function(vd_bG, vd_cN) {
        if (!vd_cN) return null;
        return vd_bG.Items[vd_bG[vd_cN]];
    };
    this.vd_AL = function(vd_bG, vd_cN) {
        if (!vd_cN) return null;
        return vd_U.vd_J[vd_cN];
    };
    this.vd_gW = vd_U.vd_AL;
    this.vd_sF = false;
    function vd_Ix() {
        if (!vd_U.vd_J.Lights) vd_U.vd_J.Lights = {};
        if (!vd_U.vd_J.Lights.Default) {
            vd_U.vd_J.Lights.Default = {};
            vd_U.vd_J.Lights.Default.Enable = true;
        }
        if (!vd_U.vd_J.Lights.Default.Name) vd_U.vd_J.Lights.Default.Name = 'default';
        if (!vd_U.vd_J.Lights.Default.SpotFallOff) vd_U.vd_J.Lights.Default.SpotFallOff = 0;
        if (!vd_U.vd_J.Lights.Default.SpotAngle) vd_U.vd_J.Lights.Default.SpotAngle = 180;
        if (!vd_U.vd_J.Lights.Default.TypeOfLight) vd_U.vd_J.Lights.Default.TypeOfLight = 1001;
        if (!vd_U.vd_J.Lights.Default.color) vd_U.vd_J.Lights.Default.color = [255, 255, 255, 255];
        if (!vd_U.vd_J.Lights.Default.Intensity) vd_U.vd_J.Lights.Default.Intensity = 1;
        if (!vd_U.vd_J.Lights.Default.Position) vd_U.vd_J.Lights.Default.Position = [0, 0, 0];
        if (!vd_U.vd_J.Lights.Default.Direction) vd_U.vd_J.Lights.Default.Direction = [0, 0, -1];
    };
    function vd_HB() {
        var vd_sY = vd_U.vd_J.LineTypes;
        if (vd_sY == undefined) return;
        for (var i = 0; i < vd_sY.Items.length; i++) {
            var linetype = vd_U.vd_gW(vd_sY, vd_sY.Items[i]);
            if (!linetype || linetype.Segments == undefined) continue;
            for (var j = 0; j < linetype.Segments.Items.length; j++) {
                var vd_aW = linetype.Segments.Items[j];
                if (vd_aW.Shape != undefined && vd_aW.Shape != null) continue;
                if (vd_aW.Flag != vdConst.LINETYPE_FLAG_TTF_TEXT && vd_aW.Flag != vdConst.LINETYPE_FLAG_SHX_TEXT) continue;
                if (vd_aW.Flag === vdConst.LINETYPE_FLAG_TTF_TEXT) {
                    if (vd_aW.ShapeText.length > 0) {
                        vd_aW.Shapenumber = vd_aW.ShapeText.charCodeAt(0);
                    } else continue;
                }
                vd_aW.ShapeStyleRef = vd_U.vd_gW(vd_U.vd_J.TextStyles, vd_aW.ShapeStyle);
                if (vd_aW.ShapeStyleRef == null || vd_aW.ShapeStyleRef.FontFileVDS == null) continue;
                if (vd_aW.ShapeStyleRef.FontFileVDS == null) continue;
                var vd_gJ = vd_aW.ShapeStyleRef.FontFileVDS.Shapes['h_' + vd_aW.Shapenumber.toString()];
                if (vd_gJ == undefined) continue;
                var shape = vd_aW.ShapeStyleRef.FontFileVDS.Shapes.Items[vd_gJ];
                if (shape == null) continue;
                vd_aW.Shape = shape;
                if (vd_aW.ShapeRotation == undefined) vd_aW.ShapeRotation = 0.0;
                if (vd_aW.ShapeOffsetX == undefined) vd_aW.ShapeOffsetX = 0.0;
                if (vd_aW.ShapeOffsetY == undefined) vd_aW.ShapeOffsetY = 0.0;
            }
        }
    };
    this.vd_Ct = function(vd_vz, vd_q) {
        var vd_sI = vd_vz.width;
        var vd_sL = vd_vz.height;
        if (vd_sI == 0 || vd_sL == 0) return undefined;
        var vd_cA = (vd_q.Transparency && vd_q.Transparency[3] === 255) ? vd_q.Transparency: null;
        var vd_rm = (parseInt(vd_dt.MaxImageSize)) || 768 * 720;
        vd_rm = (vd_rm < 300 * 300) ? 768 * 720 : vd_rm;
        var div = 1;
        var width = vd_sI;
        var height = vd_sL;
        while (((width / div) * (height / div)) > vd_rm) div++;
        width /= div;
        height /= div;
        width = vdgeo.vd_o(width);
        height = vdgeo.vd_o(height);
        var bytes = [];
        var vd_ej = document.createElement("CANVAS");
        vd_ej.setAttribute("width", width);
        vd_ej.setAttribute("height", height);
        var vd_gP = vd_ej.getContext("2d");
        vd_gP.globalCompositeOperation = "copy";
        vd_gP.drawImage(vd_vz, 0, 0, vd_sI, vd_sL, 0, 0, width, height);
        var vd_qR = vd_gP.getImageData(0, 0, width, height);
        bytes.length = height;
        var r, g, b, a;
        var wlen = width * 4;
        for (var h = height - 1; h >= 0; h--) {
            var start = h * width * 4;
            var _h = height - h - 1;
            bytes[_h] = [];
            bytes[_h].length = width * 4;
            var k = 0;
            for (var w = 0; w < wlen; w += 4) {
                r = vd_qR.data[start + w];
                g = vd_qR.data[start + w + 1];
                b = vd_qR.data[start + w + 2];
                a = vd_qR.data[start + w + 3];
                if (a !== 0 && vd_cA && r === vd_cA[0] && g === vd_cA[1] && b === vd_cA[2]) a = 0;
                bytes[_h][k] = r;
                k++;
                bytes[_h][k] = g;
                k++;
                bytes[_h][k] = b;
                k++;
                bytes[_h][k] = a;
                k++;
            }
        }
        vd_q.bytes = bytes;
        vd_q.bytescount = 4;
        vd_q.width = width;
        vd_q.height = height;
        if (vd_q.OriginalWidth == 1) vd_q.OriginalWidth = vd_sI;
        if (vd_q.OriginalHeight == 1) vd_q.OriginalHeight = vd_sL;
    };
    var vd_ku = 0;
    function vd_ze(vd_q) {
        if (!vd_q) return;
        var vd_cA = (vd_q.Transparency && vd_q.Transparency[3] === 255) ? vd_q.Transparency: null;
        var r, g, b, a;
        if (vd_q.bytes && !vd_q.bytescount) {
            var bytes = [];
            bytes.length = vd_q.height;
            for (var h = 0; h < vd_q.height; h++) {
                var vd_mT = [];
                vd_mT.length = vd_q.width * 4;
                bytes[h] = vd_mT;
                var k = 0;
                for (var w = 0; w < vd_q.width; w++) {
                    b = vd_q.bytes[h][w * 3];
                    g = vd_q.bytes[h][w * 3 + 1];
                    r = vd_q.bytes[h][w * 3 + 2];
                    a = 255;
                    if (vd_cA && r === vd_cA[0] && g === vd_cA[1] && b === vd_cA[2]) a = 0;
                    vd_mT[k] = r;
                    k++;
                    vd_mT[k] = g;
                    k++;
                    vd_mT[k] = b;
                    k++;
                    vd_mT[k] = a;
                    k++;
                }
            }
            vd_q.bytes = bytes;
            vd_q.bytescount = 4;
            return;
        }
        if (!vd_q.jpegData || vd_q.bytes) return;
        vd_ku++;
        var vd_iQ = document.createElement("img");
        var iformat = vd_q.iformat ? vd_q.iformat: "jpg";
        vd_iQ.setAttribute("src", "data:image/" + iformat + ";base64," + vd_q.jpegData);
        vd_iQ.setAttribute("width", vd_q.width);
        vd_iQ.setAttribute("height", vd_q.height);
        vd_iQ.vd_ug = vd_q;
        vd_iQ.onload = function(evt) {
            var vd_ug = evt.target.vd_ug;
            vd_U.vd_Ct(evt.target, vd_ug);
            vd_ku--;
            if (vd_ku === 0) {
                if (vd_kE) vd_kE(vd_U);
                vd_oR();
            }
        }
    };
    function vd_Jh() {
        var vd_pD = vd_U.vd_J.Images;
        if (!vd_pD) return;
        for (var i = 0; i < vd_pD.Items.length; i++) {
            var vd_q = vd_U.vd_gW(vd_pD, vd_pD.Items[i]);
            vd_ze(vd_q);
        }
    };
    function vd_ID() {
        var palette = vd_U.vd_J.Palette;
        vd_ze(palette._lc);
        for (var i = 0; i < palette.Items.length; i++) {
            if (palette.Items[i].MaterialImageRef != undefined) continue;
            palette.Items[i].MaterialImageRef = vd_U.vd_gW(vd_U.vd_J.Images, palette.Items[i].MaterialImage);
        }
        vd_yK.chk(vd_dt, palette);
    };
    function vd_HN() {
        var vd_sN = vd_U.vd_J.TextStyles;
        if (vd_sN == undefined) return;
        for (var i = 0; i < vd_sN.Items.length; i++) {
            var style;
            if (vd_U.vd_sF) {
                style = vd_sN.Items[i];
            } else {
                style = vd_U.vd_J[vd_sN.Items[i]];
            }
            if (style.FontFileVDS == null || style.FontFileVDS == undefined) {
                try {
                    style.FontFileVDS = vd_U.vd_J[style.Font];
                } catch(ex) {
                    style.FontFileVDS = null;
                }
            }
        }
    };
    function vd_Db() {
        vd_U.vd_J.vd_Cp = new vd_JA(vd_U.vd_J, vd_dt);
        vd_U.vd_J.UndoHistory = new vd_LI(vd_dt);
        vd_ku = 0;
        vd_U.vd_J.pathname = vd_U.vd_iv;
        if (vd_U.vd_J.LineTypeScale == undefined) vd_U.vd_J.LineTypeScale = 1.0;
        if (vd_U.vd_J.LayOuts == undefined || vd_U.vd_J.LayOuts[vd_U.vd_J.ActiveLayOut] == undefined) vd_U.vd_J.ActiveLayOutRef = vd_U.vd_J.Model;
        else vd_U.vd_J.ActiveLayOutRef = vd_U.vd_J.LayOuts.Items[vd_U.vd_J.LayOuts[vd_U.vd_J.ActiveLayOut]];
        if (vd_U.vd_J.ActiveView && vd_U.vd_J.Views && vd_U.vd_J.Views.Items && vd_U.vd_J.Views[vd_U.vd_J.ActiveView]) vd_U.vd_J.vd_iy = vd_U.vd_J.Views.Items[vd_U.vd_J.Views[vd_U.vd_J.ActiveView]];
        if (vd_U.vd_J.Images == undefined) vd_U.vd_J.Images = {
            Items: []
        };
        vd_U.vd_J.ActiveLineTypeRef = vd_U.vd_gW(vd_U.vd_J.LineTypes, vd_U.vd_J.ActiveLineType);
        vd_U.vd_J.ActiveTextStyleRef = vd_U.vd_gW(vd_U.vd_J.TextStyles, vd_U.vd_J.ActiveTextStyle);
        vd_U.vd_J.ActiveLayerRef = vd_U.vd_gW(vd_U.vd_J.Layers, vd_U.vd_J.ActiveLayer);
        vd_U.vd_J.vd_gv = vdConst.OsnapMode_DISABLE;
        vd_HN();
        vd_HB();
        vd_Ix();
        vd_ID();
        vd_Jh();
        vd_U.vd_CF.SelectDocument(vd_U.vd_J);
        if (vd_ku === 0) {
            if (vd_kE) vd_kE(vd_U);
            vd_oR();
        }
    };
    function vd_yM() {
        if (!vd_jM) vd_oE(null, 5000);
        else {
            try {
                eval(vd_jM);
                if (_vdDocTmp) {
                    vd_U.vd_gW = vd_U.vd_Ik;
                    vd_U.vd_sF = true;
                    vd_xX();
                }
                vd_Cn();
            } catch(ex) {
                vd_oE(ex, 6000);
            }
        }
    };
    this.Empty = function() {
        vd_oR();
        vd_Lw();
        if (vd_U.vd_kT) {
            for (var idoc = 0; idoc < vd_U.vd_kT.length; idoc++) {
                if (vd_U.vd_kT[idoc].documentdata) {
                    vd_U.vd_kT[idoc].documentdata.Empty();
                }
            }
            vd_U.vd_kT = [];
        }
        vd_U.vd_J = null;
    };
    this.vd_zg = function() {
        vd_U.Empty();
        vd_dt = null;
    };
    function vd_Cn() {
        vd_jM = null;
        if (vd_dE) vd_dE.length = 0;
        vd_dE = null;
        _vdDocTmp = null;
    };
    function vd_oE(ex, timeout) {
        vd_oR();
        vd_U.Loaded = true;
        vd_U.vd_J = null;
        vd_dt.vd_eb.end();
        vd_dt.vd_co(vdConst.Err_LoadFile, 1000 + timeout, (ex ? ex.message: ""));
        vd_ob = false;
    };
    function progress(i) {
        vd_dt.vd_eb.Progress(i, 100);
    };
    function vd_xX() {
        vd_dt.vd_eb.end();
        if (!_vdDocument) vd_dt.vd_co(vdConst.Err_LoadFile, -101, vd_U.vd_iv);
        vd_U.Loaded = true;
        vd_U.vd_J = _vdDocument;
        if (vd_U.vd_J) {
            vd_Db();
        } else {
            vd_oR();
        }
        vd_ob = false;
    };
    function vd_oR() {
        vd_Cn();
        vd_kE = null;
        _vdDocument = null;
        vd_ku = 0;
    };
    function vd_DR(vd_BF, codetype) {
        var vd_gm = document.getElementsByTagName('head')[0];
        var js1 = document.createElement('script');
        js1.setAttribute('type', 'text/javascript');
        if (codetype === 0) {
            js1.setAttribute('src', vd_BF);
            vd_U.vd_iv = decodeURI(js1.src);
            document._lc = vd_U.vd_iv;
        } else {
            js1.innerHTML = vd_BF;
        }
        vd_gm.appendChild(js1);
        vd_ch.push(js1);
        js1.onerror = function(e) {
            vd_yh(e);
            vd_oE(null, 1000);
        };
        js1.onreadystatechange = function(e) {
            if (e.readyState == "loaded" || e.readyState == 'complete' || e.target.readyState == "loaded" || e.target.readyState == 'complete') {
                e.readyState = "complete";
                vd_yh(e);
                if (_vdDocTmp) {
                    vd_Ci(_vdDocTmp);
                }
            }
        };
        js1.onload = function(e) {
            e.readyState = 'complete';
            e.target.onreadystatechange(e);
        }
    };
    this.vd_Cu = function() {
        return vd_ob;
    };
    this.LoadDocument = function(vd_bq, vd_kX, vd_jF, vd_lb) {
        if (vd_ob) return;
        vd_ob = true;
        vd_U.Empty();
        if (!vd_jF) vd_jF = vd_dt.redraw;
        vd_dt.vd_eb.start(vd_dt.MessagesDictionary.PROGRESS_READ_DRAWING, true);
        vd_kE = vd_jF;
        vd_U.vd_gW = vd_U.vd_AL;
        vd_U.vd_sF = false;
        vd_U.Loaded = false;
        vd_U.FileName = vd_bq;
        vd_U.vd_iv = vd_bq;
        document._p = progress;
        document._l = vd_xX;
        document._e = vd_oE;
        document._d = vd_Ci;
        var _url = vd_bq;
        if (vd_kX) _url += "?timestamp=" + new Date().getTime();
        if (vd_lb) {
            document._lc = vd_bq;
            eval(vd_lb);
        } else {
            vd_DR(_url, 0);
        }
    };
    function __a(vd_dm, r, w) {
        try {
            progress(vdgeo.vd_o(100 * r / vd_dm.length));
            if (r == vd_dm.length) {
                vd_yM();
                w = undefined;
                return;
            }
            for (var c = 0; c < vd_dm[r].length; c++) {
                var entry = "";
                var k = vd_dm[r][c];
                if (r === 0 && c === 0) {
                    w = String.fromCharCode(k);
                    vd_jM = w;
                    continue;
                }
                if (vd_dE[k]) {
                    entry = vd_dE[k];
                } else {
                    if (k === vd_dE.length) {
                        entry = w + w.charAt(0);
                    } else {
                        vd_jM = undefined;
                        w = undefined;
                        vd_yM();
                        return;
                    }
                }
                vd_jM += entry;
                vd_dE.push(w + entry.charAt(0));
                w = entry;
                entry = undefined;
            }
            vd_dm[r].length = 0;
            vd_dm[r] = null;
            r++;
        } catch(ex) {
            vd_oE(ex, r);
            return;
        }
        setTimeout(function() {
            __a(vd_dm, r, w)
        },
        0);
    };
    var vd_jM = undefined;
    var vd_dE = undefined;
    function vd_Ci(vd_dm) {
        var w, r = 0;
        vd_jM = undefined;
        vd_dE = [];
        for (var i = 0; i < 256; i += 1) vd_dE[i] = String.fromCharCode(i);
        r = 0;
        setTimeout(function() {
            __a(vd_dm, r, w)
        },
        0);
    };
    return this;
};
function vd_Jb() {
    var vd_U = this;
    var vd_eH = [];
    this.AttachCanvas = function(vd_fP, width, height, vd_br) {
        vd_U.DettachCanvas(vd_fP);
        var vd_xc = new vd_bm();
        vd_xc.Init(vd_fP, width, height, vd_br);
        vd_eH.push(vd_xc);
        return vd_xc;
    };
    this.DettachCanvas = function(vd_fP) {
        var id = -1;
        for (var i = 0; i < vd_eH.length; i++) {
            if (vd_eH[i].canvas.id === vd_fP) {
                vd_eH[i].vd_Gj();
                id = i;
                break;
            }
        }
        if (id === -1) return;
        vd_eH.splice(id, 1);
    };
    this.vdrawObject = function(vd_fP) {
        if (!vd_fP) {
            if (vd_eH.length > 0) return vd_eH[vd_eH.length - 1];
            return null;
        }
        for (var i = 0; i < vd_eH.length; i++) {
            if (vd_eH[i].canvas.id === vd_fP) return vd_eH[i];
        }
        return null;
    };
    return this;
};
var vdmanager = new vd_Jb();
var vd_k = {};
vd_k.vd_iz = function(mat, entity, vdcanvas) {
    if (vdgeo.vd_rv(mat)) return;
    if (entity._t === vdConst.vdLine_code) vd_k.vd_HS(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdPolyline_code) vd_k.vd_It(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdText_code) vd_k.vd_sE(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdRect_code) vd_k.vd_zd(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdCircle_code) vd_k.vd_GU(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdEllipse_code) vd_k.vd_Hc(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdArc_code) vd_k.vd_IE(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdImage_code) vd_k.vd_zd(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdInsert_code) vd_k.vd_GY(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vd3DFace_code) vd_k.vd_HY(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdPolyface_code) vd_k.vd_HZ(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdAttrib_code) vd_k.vd_sE(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdAttribDef_code) vd_k.vd_sE(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdInfinityLine_code) vd_k.vd_Iz(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdPoint_code) vd_k.vd_Hl(mat, entity, vdcanvas);
    else if (entity._t === vdConst.vdPolyhatch_code) vd_k.vd_Hq(mat, entity, vdcanvas);
    else if (entity.Explode != undefined) vd_k.vd_Hy(mat, entity, vdcanvas);
    if (vdcanvas) vdcanvas.UpdateFig(entity);
};
vd_k.vd_ju = function(mat, vd_fV, vdcanvas) {
    if (vd_fV.Thickness) {
        vd_fV.Thickness = vd_fV.Thickness * vdgeo.vd_kv(mat)[2];
    }
    if (vd_fV.ExtrusionVector) {
        vd_fV.ExtrusionVector = vdgeo.vd_iZ(mat, vd_fV.ExtrusionVector[0], vd_fV.ExtrusionVector[1], vd_fV.ExtrusionVector[2], true);
    }
};
vd_k.vd_fJ = function(mat, figure, vdcanvas) {
    if (figure.PenWidth) {
        figure.PenWidth = figure.PenWidth * vd_k.vd_pT(mat);
    }
};
vd_k.vd_nH = function(mat, entity, vdcanvas) {
    if (!entity.HatchProperties) return;
    if (!vdgeo.vd_oH(mat)) {
        var scale = vd_k.vd_pT(mat);
        var rotation = vdgeo.GetAngle(new vdgeo.newpoint(0, 0, 0), vdgeo.vd_ll(mat));
        if (!entity.HatchProperties.HatchAngle) entity.HatchProperties.HatchAngle = 0;
        entity.HatchProperties.HatchAngle = entity.HatchProperties.HatchAngle + rotation;
        if (!entity.HatchProperties.HatchScale) entity.HatchProperties.HatchScale = 1;
        entity.HatchProperties.HatchScale = entity.HatchProperties.HatchScale * scale;
    }
};
vd_k.vd_HS = function(mat, line, vdcanvas) {
    line.StartPoint = vdgeo.vd_Z(mat, line.StartPoint);
    line.EndPoint = vdgeo.vd_Z(mat, line.EndPoint);
    vd_k.vd_fJ(mat, line, vdcanvas);
};
vd_k.vd_IE = function(mat, arc, vdcanvas) {
    arc.Center = vdgeo.vd_Z(mat, arc.Center);
    arc.Radius = arc.Radius * vd_k.vd_pT(mat);
    if (vdgeo.vd_oH(mat)) {
        var tmp = arc.StartAngle;
        arc.StartAngle = vdgeo.VD_TWOPI - arc.EndAngle;
        arc.EndAngle = vdgeo.VD_TWOPI - tmp;
    }
    var vd_eS = vdgeo.vd_lt(mat);
    arc.StartAngle = arc.StartAngle + vd_eS;
    arc.EndAngle = arc.EndAngle + vd_eS;
    vd_k.vd_nH(mat, arc, vdcanvas);
    vd_k.vd_ju(mat, arc, vdcanvas);
    vd_k.vd_fJ(mat, arc, vdcanvas);
};
vd_k.vd_GU = function(mat, circle, vdcanvas) {
    circle.Center = vdgeo.vd_Z(mat, circle.Center);
    circle.Radius = circle.Radius * vd_k.vd_pT(mat);
    vd_k.vd_nH(mat, circle, vdcanvas);
    vd_k.vd_ju(mat, circle, vdcanvas);
    vd_k.vd_fJ(mat, circle, vdcanvas);
};
vd_k.vd_DF = function(ellipse, vdcanvas) {
    var tmp;
    if (ellipse.MinorLength > ellipse.MajorLength) {
        tmp = ellipse.MajorLength;
        ellipse.MajorLength = ellipse.MinorLength;
        ellipse.MinorLength = tmp;
        ellipse.MajorAngle = ellipse.MajorAngle + vdgeo.vdgeo.VD_TWOPI;
        ellipse.StartAngle = ellipse.StartAngle - vdgeo.HALF_PI;
        vd_NO.EndAngle = ellipse.EndAngle - vdgeo.HALF_PI;
        ellipse.MajorAngle = vdgeo.FixAngle(ellipse.MajorAngle);
        ellipse.StartAngle = vdgeo.FixAngle(ellipse.StartAngle);
        ellipse.EndAngle = vdgeo.FixAngle(ellipse.EndAngle);
    }
};
vd_k.vd_Hc = function(mat, ellipse, vdcanvas) {
    if (!ellipse.MajorAngle) ellipse.MajorAngle = 0.0;
    ellipse.Center = vdgeo.vd_Z(mat, ellipse.Center);
    var vd_cw = vdgeo.vd_kv(mat);
    ellipse.MajorLength *= vd_cw[X];
    ellipse.MinorLength *= vd_cw[Y];
    if (vdgeo.vd_oH(mat)) {
        var tmp = ellipse.StartAngle;
        ellipse.StartAngle = vdgeo.VD_TWOPI - ellipse.EndAngle;
        ellipse.EndAngle = vdgeo.VD_TWOPI - tmp;
    }
    var vd_eS = vdgeo.vd_lt(mat);
    ellipse.StartAngle = ellipse.StartAngle + vd_eS;
    ellipse.EndAngle = ellipse.EndAngle + vd_eS;
    ellipse.MajorAngle += vd_eS;
    vd_k.vd_DF(ellipse, vdcanvas);
    vd_k.vd_nH(mat, ellipse, vdcanvas);
    vd_k.vd_ju(mat, ellipse, vdcanvas);
    vd_k.vd_fJ(mat, ellipse, vdcanvas);
};
vd_k.vd_zd = function(mat, rect, vdcanvas) {
    rect.InsertionPoint = vdgeo.vd_Z(mat, rect.InsertionPoint);
    var vd_cw = vdgeo.vd_kv(mat);
    var vd_eS = vdgeo.vd_lt(mat);
    rect.Width = rect.Width * vd_cw[X];
    rect.Height = rect.Height * vd_cw[Y];
    rect.Rotation += vd_eS;
    vd_k.vd_nH(mat, rect, vdcanvas);
    vd_k.vd_ju(mat, rect, vdcanvas);
    vd_k.vd_fJ(mat, rect, vdcanvas);
};
vd_k.vd_Iz = function(mat, vd_hD, vdcanvas) {
    vd_hD.BasePoint = vdgeo.vd_Z(mat, vd_hD.BasePoint);
    if (vd_hD.Direction) vd_hD.Direction = vdgeo.vd_iZ(mat, vd_hD.Direction[0], vd_hD.Direction[1], vd_hD.Direction[2]);
    vd_k.vd_ju(mat, vd_hD, vdcanvas);
    vd_k.vd_fJ(mat, vd_hD, vdcanvas);
};
vd_k.vd_It = function(mat, polyline, vdcanvas) {
    polyline.VertexList.Items = vdgeo.vd_qE(mat, polyline.VertexList.Items);
    vd_k.vd_nH(mat, polyline, vdcanvas);
    vd_k.vd_ju(mat, polyline, vdcanvas);
    vd_k.vd_fJ(mat, polyline, vdcanvas);
};
vd_k.vd_sE = function(mat, text, vdcanvas) {
    var vd_cw = vdgeo.vd_kv(mat);
    var vd_eS = vdgeo.vd_lt(mat);
    text.InsertionPoint = vdgeo.vd_Z(mat, text.InsertionPoint);
    if (text.Flag == vdConst.VdConstTextstyle_BACKWARD) vd_eS -= vdgeo.PI;
    text.Rotation += vdgeo.FixAngle(vd_eS);
    if (!vdgeo.AreEqual(vd_cw[Y], 1.0, vdgeo.DefaultLinearEquality)) text.Height *= Math.abs(vd_cw[Y]);
    if (text.WidthFactor && !((vdgeo.AreEqual(vd_cw[Y], 1.0, vdgeo.DefaultLinearEquality)) && (vdgeo.AreEqual(vd_cw[X], 1.0, vdgeo.DefaultScaleEquality)))) text.WidthFactor *= Math.abs(vd_cw[X] / vd_cw[Y]);
    if (text.AlignmentPoint) text.AlignmentPoint = vdgeo.vd_Z(mat, text.AlignmentPoint);
    vd_k.vd_ju(mat, text, vdcanvas);
    vd_k.vd_fJ(mat, text, vdcanvas);
};
vd_k.vd_GY = function(mat, vd_dH, vdcanvas) {
    var i = 0;
    if (vd_dH.Attributes) {
        for (i = 0; i < vd_dH.Attributes.Items.length; i++) {
            vd_k.vd_iz(mat, vd_dH.Attributes.Items[i], vdcanvas);
        }
    }
    if (vd_dH.ExtrusionVector) vd_dH.ExtrusionVector = vdgeo.vd_iZ(mat, vd_dH.ExtrusionVector[0], vd_dH.ExtrusionVector[1], vd_dH.ExtrusionVector[2], true);
    vd_dH.InsertionPoint = vdgeo.vd_Z(mat, vd_dH.InsertionPoint);
    var vd_eS = vdgeo.vd_lt(mat);
    vd_dH.Rotation += vd_eS;
    var vd_cw = vdgeo.vd_kv(mat);
    vd_dH.Xscale *= vd_cw[X];
    vd_dH.Yscale *= vd_cw[Y];
    vd_dH.Zscale *= vd_cw[Z];
    if (!vd_dH.RowDist) vd_dH.RowDist = 0;
    if (!vd_dH.ColumnDist) vd_dH.ColumnDist = 0;
    vd_dH.RowDist *= vd_cw[Y];
    vd_dH.ColumnDist *= vd_cw[X];
    vd_k.vd_fJ(mat, vd_dH, vdcanvas);
};
vd_k.vd_HY = function(mat, vd_rL, vdcanvas) {
    vd_rL.VertexList.Items = vdgeo.vd_hz(mat, vd_rL.VertexList.Items);
    vd_k.vd_fJ(mat, vd_rL, vdcanvas);
};
vd_k.vd_HZ = function(mat, vd_tl, vdcanvas) {
    vd_tl.VertexList.Items = vdgeo.vd_hz(mat, vd_tl.VertexList.Items);
    vd_k.vd_fJ(mat, vd_tl, vdcanvas);
};
vd_k.vd_Hl = function(mat, vd_ih, vdcanvas) {
    vd_ih.InsertionPoint = vdgeo.vd_Z(mat, vd_ih.InsertionPoint);
    if (vd_ih.ExtrusionVector) vd_ih.ExtrusionVector = vdgeo.vd_iZ(mat, vd_ih.ExtrusionVector[0], vd_ih.ExtrusionVector[1], vd_ih.ExtrusionVector[2], true);
    vd_k.vd_fJ(mat, vd_ih, vdcanvas);
};
vd_k.vd_Hq = function(mat, vd_kU, vdcanvas) {
    var temp;
    var i = 0,
    j = 0;
    for (i = 0; i < vd_kU.Curves.Items.length; i++) {
        temp = vd_kU.Curves.Items[i];
        for (j = 0; j < temp.Items.length; j++) temp.Items[j] = vdgeo.vd_Z(mat, temp.Items[j]);
    }
    for (i = 0; i < vd_kU.OutLines.Items.length; i++) {
        temp = vd_kU.OutLines.Items[i];
        for (j = 0; j < temp.Items.length; j++) temp.Items[j] = vdgeo.vd_Z(mat, temp.Items[j]);
    }
    vd_k.vd_ju(mat, vd_kU, vdcanvas);
    vd_k.vd_fJ(mat, vd_kU, vdcanvas);
};
vd_k.vd_Hy = function(mat, entity, vdcanvas) {
    var i = 0;
    for (i = 0; i < entity.Explode.Items.length; i++) {
        vd_k.vd_iz(mat, entity.Explode.Items[i], vdcanvas);
    }
    vd_k.vd_fJ(mat, entity, vdcanvas);
};
vd_k.vd_pT = function(mat) {
    var vd_cw = vdgeo.vd_kv(mat);
    if (vdgeo.AreEqual(Math.abs(vd_cw[0]), Math.abs(vd_cw[1]), vdgeo.DefaultVectorEquality)) return vd_cw[0];
    return 1.0;
};
var vd_u = {};
vd_u.update = function(entity) {
    if (entity.vd_j) entity.vd_j = undefined;
};
vd_u.vd_fH = function(entity) {
    if (!entity) return null;
    if (entity._t === vdConst.vdLine_code) return vd_u.vd_Mu(entity);
    else if (entity._t === vdConst.vdPolyline_code) return vd_u.vd_KG(entity);
    else if (entity._t === vdConst.vdText_code) return vd_u.vd_wx(entity);
    else if (entity._t === vdConst.vdRect_code) return vd_u.vd_Cs(entity);
    else if (entity._t === vdConst.vdImage_code) return vd_u.vd_Cs(entity);
    else if (entity._t === vdConst.vdInsert_code) return vd_u.vd_LF(entity);
    else if (entity._t === vdConst.vdAttrib_code) return vd_u.vd_wx(entity);
    else if (entity._t === vdConst.vdAttribDef_code) return vd_u.vd_wx(entity);
    else if (entity._t === vdConst.vdPoint_code) return vd_u.vd_Lc(entity);
    else if (entity._t === vdConst.vdCircle_code) return vd_u.vd_Mr(entity);
    else if (entity._t === vdConst.vdArc_code) return vd_u.vd_Mp(entity);
    else if (entity._t === vdConst.vdEllipse_code) return vd_u.vd_LS(entity);
    else if (entity._t === vdConst.vdNote_code) return entity.vd_fH();
    return null;
};
vd_u.vd_Mr = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.Center, vdgeo.pointPolar(entity.Center, 0, entity.Radius), vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI, entity.Radius), vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI * 2, entity.Radius), vdgeo.pointPolar(entity.Center, vdgeo.HALF_PI * 3, entity.Radius)];
    }
    return entity.vd_j;
};
vd_u.vd_Mp = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.Center, vdgeo.pointPolar(entity.Center, entity.StartAngle, entity.Radius), vdgeo.pointPolar(entity.Center, entity.EndAngle, entity.Radius), vdgeo.pointPolar(entity.Center, vdgeo.FixAngle(entity.StartAngle + vdgeo.FixAngle(entity.EndAngle - entity.StartAngle) / 2), entity.Radius)];
    }
    return entity.vd_j;
};
vd_u.vd_LS = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.Center, vdgeo.pointPolar(entity.Center, entity.MajorAngle, entity.MajorLength), vdgeo.pointPolar(entity.Center, entity.MajorAngle + vdgeo.HALF_PI, entity.MinorLength), vdgeo.pointPolar(entity.Center, entity.MajorAngle + vdgeo.PI, entity.MajorLength), vdgeo.pointPolar(entity.Center, entity.MajorAngle - vdgeo.HALF_PI, entity.MinorLength)];
    }
    return entity.vd_j;
};
vd_u.vd_Mu = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.StartPoint, entity.EndPoint];
    }
    return entity.vd_j;
};
vd_u.vd_KG = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [];
        for (var i = 0; i < entity.VertexList.Items.length; i++) {
            entity.vd_j.push(entity.VertexList.Items[i]);
        }
    }
    return entity.vd_j;
};
vd_u.vd_wx = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.InsertionPoint];
    }
    return entity.vd_j;
};
vd_u.vd_Cs = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [];
        entity.vd_j.push(entity.InsertionPoint);
        var pw = vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation, entity.Width);
        var pwh = vdgeo.pointPolar(pw, entity.Rotation + vdgeo.HALF_PI, entity.Height);
        entity.vd_j.push(pwh);
    }
    return entity.vd_j;
};
vd_u.vd_LF = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.InsertionPoint];
    }
    return entity.vd_j;
};
vd_u.vd_Lc = function(entity) {
    if (entity.vd_j === undefined) {
        entity.vd_j = [entity.InsertionPoint];
    }
    return entity.vd_j;
};
vd_u.vd_mg = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    if (entity._t === vdConst.vdLine_code) ret = vd_u.vd_Kt(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdPolyline_code) ret = vd_u.vd_Kd(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdText_code) ret = vd_u.vd_wR(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdRect_code) ret = vd_u.vd_CI(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdImage_code) ret = vd_u.vd_CI(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdInsert_code) ret = vd_u.vd_JQ(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdAttrib_code) ret = vd_u.vd_wR(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdAttribDef_code) ret = vd_u.vd_wR(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdPoint_code) ret = vd_u.vd_IG(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdCircle_code) ret = vd_u.vd_IL(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdArc_code) ret = vd_u.vd_IJ(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdEllipse_code) ret = vd_u.vd_Jq(entity, indexes, offset, vdcanvas);
    else if (entity._t === vdConst.vdNote_code) ret = entity.vd_mg(indexes, offset, vdcanvas);
    return ret;
};
vd_u.vd_mx = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    var vd_j = vd_u.vd_fH(entity);
    for (var i = 0; i < indexes.length; i++) {
        vd_j[indexes[i]][X] += offset[X];
        vd_j[indexes[i]][Y] += offset[Y];
        vd_j[indexes[i]][Z] += offset[Z];
        ret = true;
    }
    if (ret) vdcanvas.UpdateFig(entity);
    return ret;
};
vd_u.vd_Kt = function(entity, indexes, offset, vdcanvas) {
    return vd_u.vd_mx(entity, indexes, offset, vdcanvas);
};
vd_u.vd_Kd = function(entity, indexes, offset, vdcanvas) {
    return vd_u.vd_mx(entity, indexes, offset, vdcanvas);
};
vd_u.vd_wR = function(entity, indexes, offset, vdcanvas) {
    return vd_u.vd_mx(entity, indexes, offset, vdcanvas);
};
vd_u.vd_CI = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    var vd_j = vd_u.vd_fH(entity);
    for (var i = 0; i < indexes.length; i++) {
        if (indexes[i] === 0) {
            entity.InsertionPoint[X] += offset[X];
            entity.InsertionPoint[Y] += offset[Y];
            entity.InsertionPoint[Z] += offset[Z];
            ret = true;
        } else if (indexes[i] === 1) {
            var p1 = vd_j[1];
            var p2 = [p1[X] + offset[X], p1[Y] + offset[Y], p1[Z] + offset[Z]];
            var ph = vdgeo.vd_rs(p2, entity.InsertionPoint, vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation + vdgeo.HALF_PI, 1.0));
            var pw = vdgeo.vd_rs(p2, entity.InsertionPoint, vdgeo.pointPolar(entity.InsertionPoint, entity.Rotation, 1.0));
            var aw = vdgeo.FixAngle(vdgeo.GetAngle(entity.InsertionPoint, pw) - entity.Rotation);
            var ah = vdgeo.FixAngle(vdgeo.GetAngle(entity.InsertionPoint, ph) - entity.Rotation);
            entity.Width = vdgeo.Distance3D(entity.InsertionPoint, pw);
            if (aw > vdgeo.HALF_PI) entity.Width *= -1.0;
            entity.Height = vdgeo.Distance3D(entity.InsertionPoint, ph);
            if (ah > vdgeo.PI) entity.Height *= -1.0;
            ret = true;
        }
    }
    if (ret) vdcanvas.UpdateFig(entity);
    return ret;
};
vd_u.vd_JQ = function(entity, indexes, offset, vdcanvas) {
    return vd_u.vd_mx(entity, indexes, offset, vdcanvas);
};
vd_u.vd_IG = function(entity, indexes, offset, vdcanvas) {
    return vd_u.vd_mx(entity, indexes, offset, vdcanvas);
};
vd_u.vd_IL = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    var vd_j = vd_u.vd_fH(entity);
    for (var i = 0; i < indexes.length; i++) {
        if (indexes[i] === 0) {
            entity.Center[X] += offset[X];
            entity.Center[Y] += offset[Y];
            entity.Center[Z] += offset[Z];
        } else {
            vd_j[indexes[i]][X] += offset[X];
            vd_j[indexes[i]][Y] += offset[Y];
            vd_j[indexes[i]][Z] += offset[Z];
            entity.Radius = vdgeo.Distance3D(vd_j[indexes[i]], entity.Center);
        }
        ret = true;
    }
    if (ret) vdcanvas.UpdateFig(entity);
    return ret;
};
vd_u.vd_Jq = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    var vd_j = vd_u.vd_fH(entity);
    for (var i = 0; i < indexes.length; i++) {
        if (indexes[i] === 0) {
            entity.Center[X] += offset[X];
            entity.Center[Y] += offset[Y];
            entity.Center[Z] += offset[Z];
        } else if (indexes[i] === 1 || indexes[i] === 3) {
            vd_j[indexes[i]][X] += offset[X];
            vd_j[indexes[i]][Y] += offset[Y];
            vd_j[indexes[i]][Z] += offset[Z];
            entity.MajorLength = vdgeo.Distance3D(vd_j[indexes[i]], entity.Center);
        } else if (indexes[i] === 2 || indexes[i] === 4) {
            vd_j[indexes[i]][X] += offset[X];
            vd_j[indexes[i]][Y] += offset[Y];
            vd_j[indexes[i]][Z] += offset[Z];
            entity.MinorLength = vdgeo.Distance3D(vd_j[indexes[i]], entity.Center);
        }
        ret = true;
    }
    if (ret) vdcanvas.UpdateFig(entity);
    return ret;
};
vd_u.vd_IJ = function(entity, indexes, offset, vdcanvas) {
    var ret = false;
    var vd_j = vd_u.vd_fH(entity);
    for (var i = 0; i < indexes.length; i++) {
        if (indexes[i] === 0) {
            entity.Center[X] += offset[X];
            entity.Center[Y] += offset[Y];
            entity.Center[Z] += offset[Z];
            ret = true;
        } else {
            vd_j[indexes[i]][X] += offset[X];
            vd_j[indexes[i]][Y] += offset[Y];
            vd_j[indexes[i]][Z] += offset[Z];
            var arc = vdgeo.vd_HU(vd_j[1], vd_j[2], vd_j[3]);
            if (arc != null) {
                ret = true;
                entity.Center = arc[0];
                entity.Radius = arc[1];
                entity.StartAngle = arc[2];
                entity.EndAngle = arc[3];
            }
        }
    }
    if (ret) vdcanvas.UpdateFig(entity);
    return ret;
};
vd_u.GetEntityItem = function(vdcanvas, hid) {
    if (hid.substr(0, 2) == 'n_') {
        if (vdcanvas.Notes) return vdcanvas.Notes[hid];
        else return null;
    } else return vdcanvas.GetEntityItem(hid);
};
vd_u.vd_FP = function(selection, vd_mw, vd_if, render, vdcanvas) {
    if (!selection) return;
    var vd_i = vdcanvas.GetDocument();
    if (!vd_i) return;
    vd_dx = render.vd_aZ(vd_mw);
    var vd_fi = 0;
    for (var i = 0; i < selection.length; i++) {
        if (vd_fi >= vdcanvas.GripManager.MaxGrips) {
            selection.length = i;
            break;
        }
        var fig = vd_u.GetEntityItem(vdcanvas, selection[i]);
        vd_fi = vd_u.draw(fig, vd_mw, vd_if, render, vd_i, vdcanvas, vd_fi);
    }
    render.vd_aZ(vd_dx);
};
vd_u.draw = function(entity, vd_mw, vd_if, render, vd_i, vdcanvas, vd_fi) {
    if (!entity) return 0;
    if (entity.Deleted === true) return 0;
    if (entity.visibility === 1) return 0;
    if (entity.LayerRef && vdcanvas.vd_By(entity.LayerRef, vd_i)) return 0;
    var vd_j = vd_u.vd_fH(entity);
    if (!vd_j || vd_j.length === 0) return 0;
    var ret = vd_fi;
    for (var i = 0; i < vd_j.length; i++) {
        if (ret >= vdcanvas.GripManager.MaxGrips) break;
        vd_u.vd_Fz(vd_j[i], vd_mw, vd_if, render, vd_i, vdcanvas);
        ret++;
    }
    return ret;
};
vd_u.vd_Fz = function(pt, vd_mw, vd_if, render, vd_i, vdcanvas) {
    var p = vdgeo.vd_dU(pt, render.vd_fp());
    render.vd_Y.vd_Gx(p[X] - vd_if * 0.5, p[Y] - vd_if * 0.5, vd_if, vd_if);
};
vd_u.vd_Ly = function(box, vd_wT, vdcanvas) {
    var ret = [];
    var items = 0;
    var left = box[0];
    var right = box[0] + box[2];
    var top = box[1];
    var bottom = box[1] + box[3];
    if (!vd_wT) return ret;
    for (var i = 0; i < vd_wT.length; i++) {
        if (items >= vdcanvas.GripManager.MaxGrips) break;
        var fig = vd_u.GetEntityItem(vdcanvas, vd_wT[i]);
        var indexes = [];
        var vd_j = vd_u.vd_fH(fig);
        if (vd_j) {
            for (var k = 0; k < vd_j.length; k++) {
                if (items >= vdcanvas.GripManager.MaxGrips) break;
                items++;
                var p = vdcanvas.WorldToPixel(vd_j[k]);
                if (p[X] >= left && p[X] <= right && p[Y] >= top && p[Y] <= bottom) {
                    indexes.push(k);
                }
            }
        }
        if (indexes.length > 0) ret.push([fig, indexes]);
    }
    return ret;
};
function vd_Ev(vd_S) {
    var vd_U = this;
    var vd_tI = [0, 0, 255, 255];
    var vd_im = 15;
    var vd_th = 100;
    var vd_qY = true;
    var vd_qr = 0;
    this.filtergripentity = null;
    this.gripselectionchanged = null;
    this.beforemovegrip = null;
    this.aftermovegrip = null;
    this.vd_He = function(entity) {
        var ret = true;
        if (vd_U.filtergripentity) {
            var e = {
                sender: vd_S,
                entity: entity,
                cancel: false
            };
            vd_U.filtergripentity(e);
            ret = !e.cancel;
        }
        return ret;
    };
    this.vd_sH = function() {
        if (vd_U.gripselectionchanged) vd_U.gripselectionchanged({
            sender: vd_S
        });
    };
    this.vd_Jo = function(entity, indexes, offset) {
        var ret = true;
        if (vd_U.beforemovegrip) {
            var e = {
                sender: vd_S,
                entity: entity,
                indexes: indexes,
                offset: offset,
                cancel: false
            };
            vd_U.beforemovegrip(e);
            ret = !e.cancel;
        }
        return ret;
    };
    this.vd_Hs = function(entity, indexes, offset) {
        if (vd_U.aftermovegrip) vd_U.aftermovegrip({
            sender: vd_S,
            entity: entity,
            indexes: indexes,
            offset: offset
        });
    };
    Object.defineProperty(vd_U, 'MaxGrips', {
        get: function() {
            return vd_th;
        },
        set: function(newValue) {
            vd_th = newValue;
        }
    });
    Object.defineProperty(vd_U, 'GripColor', {
        get: function() {
            return vd_tI;
        },
        set: function(newValue) {
            vd_tI = newValue;
        }
    });
    Object.defineProperty(vd_U, 'GripSize', {
        get: function() {
            return vd_im;
        },
        set: function(newValue) {
            vd_im = Math.max(newValue, 0);
        }
    });
    Object.defineProperty(vd_U, 'Enable', {
        get: function() {
            return vd_qY;
        },
        set: function(newValue) {
            vd_qY = newValue;
        }
    });
    Object.defineProperty(vd_U, 'SelectMode', {
        get: function() {
            return vd_qr;
        },
        set: function(newValue) {
            vd_qr = newValue;
        }
    });
    this.count = function() {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return 0;
        if (!vd_i.vd_an) return 0;
        return vd_i.vd_an.length;
    };
    this.GetItem = function(index) {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return null;
        if (!vd_i.vd_an) return null;
        if (index < 0 || index >= vd_i.vd_an.length) return null;
        return vd_u.GetEntityItem(vdcanvas, vd_i.vd_an[index]);
    };
    this.GetEntityGrips = function(entity) {
        return vd_u.vd_fH(entity);
    };
    function vd_qG(fig) {
        if (fig._t === vdConst.vdNote_code) return 'n_' + fig.HandleId.toString();
        else return 'h_' + fig.HandleId.toString();
    };
    this.AddItem = function(fig) {
        if (!vd_qY) return;
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return;
        var vd_cN = vd_qG(fig);
        if (!vd_i.vd_an) vd_i.vd_an = [];
        var index = vd_i.vd_an.indexOf(vd_cN);
        if (index == -1) vd_AT(vd_i, fig, vd_cN);
    };
    this.RemoveItem = function(fig) {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return;
        var vd_cN = vd_qG(fig);
        if (!vd_i.vd_an) return;
        var index = vd_i.vd_an.indexOf(vd_cN);
        if (index >= 0) {
            vd_i.vd_an.splice(index, 1);
            vd_U.vd_sH();
        }
    };
    this.ContainsItem = function(fig) {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return false;
        var vd_cN = vd_qG(fig);
        if (!vd_i.vd_an) return false;
        var index = vd_i.vd_an.indexOf(vd_cN);
        return index >= 0;
    };
    this.clear = function() {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return false;
        var vd_oI = vd_i.vd_an && vd_i.vd_an.length > 0;
        vd_i.vd_an = null;
        vd_i.vd_gr = null;
        if (vd_oI) vd_U.vd_sH();
        return vd_oI;
    };
    function vd_AT(vd_i, fig, handle) {
        if (!vd_U.vd_He(fig)) return false;
        if (vd_qr & vdConst.GRIPMODE_SINGLE) vd_i.vd_an = [];
        vd_i.vd_an.push(handle);
        vd_U.vd_sH();
        return true;
    };
    function vd_JN(fig, vd_i) {
        var vd_cN = vd_qG(fig);
        if (!vd_i.vd_an) vd_i.vd_an = [];
        var index = vd_i.vd_an.indexOf(vd_cN);
        if (index == -1) {
            vd_AT(vd_i, fig, vd_cN);
        } else {
            vd_i.vd_an.splice(index, 1);
            vd_U.vd_sH();
        }
    };
    this.vd_Bj = function(vd_sW) {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return false;
        if (!vd_sW) {
            var vd_oI = vd_U.clear();
            if (vd_oI) vd_S.Refresh();
            return vd_oI;
        }
        if (! (vd_qr & vdConst.GRIPMODE_AUTO)) return false;
        if (!vd_qY) return false;
        if (vd_th <= 0) return false;
        if (!vd_S.GetEnableSelection()) return false;
        if (vd_im == 0) return false;
        var action = vd_S.ActiveAction();
        if (action.IsStarted()) return false;
        var vd_yP;
        var vd_cn = [vd_sW.xPix, vd_sW.yPix];
        var box = [vd_cn[X] - vd_im / 2.0, vd_cn[Y] - vd_im / 2.0, vd_im, vd_im];
        vd_i.vd_gr = vd_u.vd_Ly(box, vd_i.vd_an, vd_S);
        if (vd_i.vd_gr.length > 0) {
            var vd_j = vd_u.vd_fH(vd_i.vd_gr[0][0]);
            var index = vd_i.vd_gr[0][1][0];
            vd_yP = vd_j[index];
            vd_S.GetUserLine(vd_KO, vd_yP);
            return true;
        } else {
            var fig = vd_S.GetEntityFromPoint(vd_cn[X], vd_cn[Y]);
            if (fig) {
                vd_JN(fig, vd_i);
                vd_S.Refresh();
                return true;
            }
        }
        return false;
    };
    function vd_KO(action, status) {
        var vd_f = action.vd_eB();
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return;
        if (status == 'end') {
            if (!action.IsCanceled()) {
                var offset = [action.ResValue[1][X] - action.ResValue[0][X], action.ResValue[1][Y] - action.ResValue[0][Y], action.ResValue[1][Z] - action.ResValue[0][Z]];
                vd_S.UndoHistory().group_start();
                for (var i = 0; i < vd_i.vd_gr.length; i++) {
                    var indexes = vd_i.vd_gr[i][1];
                    var fig = vd_i.vd_gr[i][0];
                    if (indexes.length === 0) continue;
                    vd_S.UndoHistory().store(fig, 'special_movegrips', [indexes.concat([]), offset.concat([])]);
                    if (vd_U.vd_Jo(fig, indexes, offset)) {
                        if (vd_u.vd_mg(fig, indexes, offset, vd_S)) vd_U.vd_Hs(fig, indexes, offset);
                    }
                }
                vd_S.UndoHistory().group_end();
                vd_S.UpdateLayout();
                vd_S.redraw();
            } else {
                vd_S.Refresh();
            }
        } else if (status == 'draw') {
            render = vd_f[0];
            var offset = [vd_f[1][X] - vd_f[2][X], vd_f[1][Y] - vd_f[2][Y], vd_f[1][Z] - vd_f[2][Z]];
            for (var i = 0; i < vd_i.vd_gr.length; i++) {
                var indexes = vd_i.vd_gr[i][1];
                var vd_GR = vd_i.vd_gr[i][0];
                if (indexes.length === 0) continue;
                var fig = vdConst.cloneEntity(vd_GR);
                vd_u.vd_mg(fig, indexes, offset, vd_S);
                render.vd_pr(vdConst.ActionHighLightColor);
                vd_S.DrawEntity(fig, render);
                render.vd_nf();
            }
        }
    };
    this.vd_uO = function() {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return false;
        return (vd_i.vd_an && vd_i.vd_an.length > 0);
    };
    this.vd_nz = function(render) {
        var vd_i = vd_S.GetDocument();
        if (!vd_i) return;
        try {
            vd_u.vd_FP(vd_i.vd_an, vd_tI, vd_im, render, vd_S);
        } catch(ex) {}
    };
    return this;
};
var icon_error = {
    width: 32,
    height: 32,
    bytes: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 241, 159, 159, 159, 246, 192, 192, 192, 253, 218, 218, 218, 255, 238, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 238, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 253, 159, 159, 159, 246, 121, 120, 120, 241, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 240, 189, 189, 189, 252, 235, 233, 233, 254, 233, 217, 217, 254, 221, 181, 181, 254, 205, 139, 139, 254, 183, 90, 89, 255, 168, 57, 55, 255, 164, 44, 43, 255, 177, 73, 74, 255, 193, 113, 113, 255, 215, 162, 161, 255, 232, 211, 211, 255, 235, 234, 234, 254, 191, 190, 190, 252, 137, 136, 136, 240, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 250, 239, 236, 236, 254, 223, 192, 192, 255, 196, 119, 121, 255, 160, 33, 34, 255, 155, 18, 18, 255, 164, 16, 16, 255, 168, 12, 12, 255, 172, 10, 10, 255, 180, 10, 10, 255, 185, 10, 10, 255, 190, 13, 13, 255, 177, 15, 15, 255, 166, 17, 17, 255, 184, 86, 86, 255, 220, 173, 174, 255, 239, 236, 236, 254, 184, 183, 183, 250, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 234, 211, 211, 211, 254, 232, 202, 202, 255, 176, 67, 68, 255, 153, 23, 23, 255, 156, 17, 17, 255, 152, 12, 12, 255, 155, 11, 11, 255, 160, 11, 11, 255, 166, 10, 10, 255, 172, 9, 9, 255, 178, 9, 9, 255, 186, 8, 8, 255, 191, 7, 7, 255, 200, 9, 11, 255, 206, 13, 13, 255, 204, 17, 17, 255, 175, 16, 16, 255, 178, 73, 74, 255, 235, 207, 207, 255, 211, 211, 211, 254, 136, 135, 135, 234, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 234, 225, 225, 225, 255, 218, 168, 168, 255, 160, 35, 35, 255, 156, 21, 21, 255, 146, 13, 13, 255, 149, 12, 12, 255, 153, 12, 12, 255, 158, 11, 11, 255, 160, 11, 11, 255, 166, 10, 10, 255, 172, 9, 9, 255, 178, 9, 9, 255, 184, 8, 8, 255, 188, 8, 8, 255, 195, 8, 8, 255, 201, 12, 12, 255, 208, 12, 12, 255, 214, 13, 13, 255, 207, 19, 19, 255, 169, 34, 34, 255, 222, 175, 175, 255, 225, 225, 225, 255, 136, 135, 135, 234, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 254, 217, 168, 168, 255, 164, 32, 32, 255, 155, 19, 19, 255, 146, 12, 12, 255, 149, 12, 12, 255, 151, 12, 12, 255, 153, 12, 12, 255, 158, 11, 11, 255, 160, 11, 11, 255, 164, 10, 10, 255, 169, 10, 10, 255, 176, 9, 9, 255, 180, 8, 8, 255, 187, 8, 8, 255, 192, 7, 7, 255, 198, 10, 10, 255, 204, 9, 9, 255, 211, 12, 12, 255, 216, 13, 13, 255, 211, 19, 19, 255, 168, 26, 26, 255, 222, 173, 174, 255, 212, 212, 212, 254, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 250, 232, 202, 202, 255, 163, 36, 37, 255, 159, 19, 19, 255, 151, 12, 12, 255, 149, 12, 12, 255, 149, 12, 12, 255, 145, 12, 12, 255, 149, 12, 12, 255, 158, 11, 11, 255, 160, 11, 11, 255, 164, 10, 10, 255, 168, 10, 10, 255, 173, 9, 9, 255, 178, 9, 9, 255, 184, 8, 8, 255, 188, 8, 8, 255, 192, 7, 7, 255, 188, 8, 8, 255, 197, 7, 7, 255, 211, 12, 12, 255, 215, 13, 13, 255, 209, 18, 18, 255, 167, 32, 32, 255, 235, 205, 205, 255, 185, 184, 184, 250, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 240, 239, 236, 236, 254, 177, 69, 69, 255, 164, 22, 22, 255, 155, 11, 11, 255, 153, 12, 12, 255, 150, 12, 12, 255, 162, 51, 51, 255, 208, 185, 185, 255, 155, 58, 57, 255, 149, 12, 12, 255, 161, 11, 11, 255, 164, 10, 10, 255, 167, 10, 10, 255, 171, 10, 10, 255, 176, 9, 9, 255, 180, 8, 8, 255, 183, 8, 8, 255, 194, 47, 47, 255, 226, 174, 174, 255, 191, 75, 75, 255, 190, 7, 7, 255, 209, 11, 11, 255, 211, 12, 12, 255, 204, 19, 20, 255, 177, 72, 72, 255, 239, 236, 236, 254, 137, 136, 136, 240, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 118, 117, 117, 158, 191, 191, 191, 253, 213, 155, 155, 255, 166, 28, 28, 255, 161, 12, 12, 255, 159, 11, 11, 255, 154, 11, 11, 255, 167, 53, 53, 255, 190, 181, 181, 255, 223, 230, 230, 255, 239, 237, 237, 255, 156, 60, 60, 255, 151, 12, 12, 255, 164, 10, 10, 255, 166, 10, 10, 255, 169, 10, 10, 255, 173, 9, 9, 255, 176, 9, 9, 255, 181, 38, 38, 255, 222, 206, 206, 255, 251, 255, 255, 255, 241, 238, 238, 255, 186, 72, 72, 255, 188, 8, 8, 255, 205, 10, 10, 255, 206, 11, 11, 255, 171, 17, 17, 255, 224, 192, 190, 255, 191, 192, 191, 253, 118, 117, 117, 158, 0, 0, 0, 0], [107, 106, 106, 37, 121, 120, 120, 241, 229, 227, 227, 254, 178, 70, 70, 255, 168, 20, 20, 255, 164, 10, 10, 255, 160, 11, 11, 255, 169, 33, 33, 255, 202, 189, 189, 255, 200, 208, 208, 255, 197, 197, 197, 255, 225, 227, 227, 255, 239, 237, 237, 255, 158, 62, 62, 255, 152, 12, 12, 255, 166, 10, 10, 255, 168, 10, 10, 255, 169, 10, 10, 255, 176, 43, 43, 255, 205, 192, 192, 255, 226, 234, 234, 255, 235, 235, 235, 255, 248, 254, 254, 255, 238, 237, 237, 255, 189, 40, 40, 255, 196, 7, 7, 255, 199, 9, 8, 255, 196, 15, 15, 255, 203, 136, 135, 255, 236, 235, 235, 254, 122, 121, 121, 241, 107, 106, 106, 37], [107, 106, 106, 96, 157, 158, 157, 246, 228, 215, 214, 255, 179, 58, 58, 255, 173, 18, 18, 255, 168, 10, 10, 255, 164, 10, 10, 255, 170, 19, 19, 255, 207, 171, 171, 255, 203, 214, 214, 255, 202, 202, 202, 255, 198, 198, 198, 255, 224, 228, 228, 255, 239, 238, 238, 255, 160, 63, 63, 255, 153, 12, 12, 255, 166, 10, 10, 255, 171, 40, 40, 255, 191, 178, 178, 255, 206, 216, 216, 255, 216, 214, 214, 255, 224, 224, 224, 255, 237, 245, 246, 255, 237, 209, 209, 255, 192, 28, 30, 255, 190, 7, 7, 255, 191, 7, 7, 255, 192, 7, 7, 255, 170, 32, 33, 255, 233, 213, 211, 254, 160, 160, 159, 246, 107, 106, 106, 96], [107, 106, 106, 148, 189, 189, 189, 251, 220, 187, 186, 255, 183, 57, 58, 255, 184, 47, 47, 255, 173, 9, 9, 255, 169, 10, 10, 255, 166, 10, 10, 255, 172, 21, 21, 255, 207, 173, 173, 255, 203, 214, 214, 255, 202, 203, 203, 255, 198, 198, 198, 255, 225, 228, 228, 255, 239, 238, 238, 255, 161, 56, 56, 255, 162, 34, 34, 255, 184, 171, 172, 255, 192, 200, 200, 255, 200, 199, 199, 255, 205, 205, 205, 255, 217, 225, 225, 255, 225, 202, 200, 255, 188, 36, 36, 255, 180, 8, 8, 255, 185, 8, 8, 255, 186, 8, 8, 255, 187, 8, 8, 255, 171, 14, 15, 255, 213, 162, 161, 254, 192, 192, 192, 252, 107, 106, 106, 148], [107, 106, 106, 192, 215, 216, 217, 254, 209, 153, 153, 255, 187, 56, 56, 255, 188, 54, 54, 255, 183, 44, 44, 255, 173, 9, 9, 255, 169, 10, 10, 255, 164, 10, 10, 255, 175, 28, 28, 255, 207, 177, 177, 255, 203, 214, 214, 255, 203, 204, 204, 255, 199, 199, 199, 255, 225, 228, 228, 255, 238, 236, 236, 255, 183, 172, 172, 255, 188, 194, 194, 255, 191, 190, 190, 255, 192, 192, 192, 255, 198, 207, 207, 255, 213, 193, 193, 255, 184, 39, 39, 255, 172, 9, 9, 255, 178, 9, 9, 255, 178, 9, 9, 255, 180, 9, 9, 255, 180, 8, 8, 255, 181, 14, 14, 255, 191, 110, 110, 255, 217, 217, 217, 254, 107, 106, 106, 192], [107, 106, 106, 225, 235, 234, 235, 255, 199, 124, 125, 255, 191, 56, 56, 255, 190, 52, 52, 255, 190, 54, 53, 255, 184, 42, 42, 255, 176, 9, 9, 255, 172, 9, 9, 255, 168, 10, 10, 255, 177, 28, 28, 255, 208, 178, 178, 255, 204, 215, 215, 255, 203, 203, 203, 255, 200, 199, 199, 255, 195, 200, 200, 255, 195, 198, 198, 255, 193, 191, 191, 255, 189, 189, 189, 255, 188, 197, 197, 255, 206, 184, 184, 255, 181, 41, 41, 255, 168, 10, 10, 255, 172, 9, 9, 255, 173, 9, 9, 255, 175, 9, 9, 255, 175, 9, 9, 255, 175, 9, 9, 255, 176, 12, 12, 255, 175, 71, 71, 255, 237, 236, 236, 255, 107, 106, 106, 225], [107, 106, 106, 248, 249, 249, 249, 255, 193, 102, 102, 255, 196, 56, 56, 255, 194, 53, 53, 255, 192, 52, 52, 255, 190, 53, 53, 255, 188, 48, 48, 255, 180, 19, 19, 255, 173, 9, 9, 255, 168, 10, 10, 255, 179, 30, 30, 255, 208, 170, 170, 255, 205, 211, 211, 255, 204, 204, 204, 255, 200, 200, 200, 255, 195, 195, 195, 255, 193, 194, 194, 255, 191, 196, 196, 255, 203, 178, 178, 255, 180, 43, 43, 255, 164, 10, 10, 255, 168, 10, 10, 255, 168, 10, 10, 255, 169, 10, 10, 255, 169, 10, 10, 255, 169, 10, 10, 255, 169, 10, 10, 255, 169, 11, 11, 255, 166, 49, 49, 255, 250, 250, 250, 255, 107, 106, 106, 248], [107, 106, 106, 248, 251, 251, 251, 255, 190, 89, 89, 255, 202, 59, 59, 255, 200, 58, 58, 255, 196, 55, 55, 255, 194, 53, 53, 255, 192, 54, 54, 255, 190, 54, 54, 255, 184, 35, 35, 255, 177, 9, 9, 255, 167, 10, 10, 255, 190, 73, 73, 255, 212, 214, 214, 255, 209, 211, 211, 255, 205, 205, 205, 255, 200, 200, 200, 255, 195, 196, 196, 255, 237, 237, 237, 255, 179, 95, 95, 255, 152, 12, 12, 255, 167, 10, 10, 255, 166, 10, 10, 255, 166, 10, 10, 255, 166, 10, 10, 255, 164, 10, 10, 255, 166, 10, 10, 255, 164, 10, 10, 255, 164, 11, 11, 255, 166, 45, 45, 255, 251, 251, 251, 255, 107, 106, 106, 248], [107, 106, 106, 225, 238, 237, 237, 255, 203, 128, 127, 255, 204, 65, 64, 255, 202, 60, 60, 255, 200, 58, 58, 255, 200, 58, 56, 255, 196, 56, 56, 255, 194, 54, 54, 255, 192, 57, 57, 255, 183, 35, 33, 255, 194, 74, 74, 255, 222, 203, 203, 255, 220, 224, 224, 255, 214, 214, 214, 255, 211, 210, 210, 255, 206, 205, 205, 255, 201, 201, 201, 255, 225, 226, 226, 255, 242, 241, 241, 255, 163, 66, 66, 255, 153, 12, 12, 255, 164, 10, 10, 255, 164, 10, 10, 255, 164, 10, 10, 255, 163, 11, 11, 255, 163, 11, 11, 255, 161, 11, 11, 255, 161, 14, 14, 255, 176, 67, 68, 255, 238, 237, 237, 255, 107, 106, 106, 225], [107, 106, 106, 192, 218, 218, 218, 255, 213, 155, 156, 254, 205, 73, 73, 255, 208, 61, 62, 255, 206, 61, 60, 255, 202, 60, 60, 255, 200, 58, 58, 255, 199, 57, 59, 255, 189, 40, 40, 255, 204, 92, 92, 255, 237, 229, 229, 255, 237, 244, 244, 255, 230, 229, 229, 255, 222, 222, 222, 255, 217, 220, 220, 255, 211, 217, 217, 255, 205, 205, 205, 255, 200, 200, 200, 255, 225, 229, 229, 255, 243, 241, 241, 255, 160, 63, 63, 255, 153, 12, 12, 255, 164, 10, 10, 255, 161, 11, 11, 255, 160, 11, 11, 255, 160, 11, 11, 255, 159, 11, 11, 255, 162, 19, 19, 255, 192, 107, 107, 255, 218, 218, 218, 255, 107, 106, 106, 192], [107, 106, 106, 148, 192, 192, 192, 253, 225, 186, 189, 254, 207, 85, 86, 255, 212, 65, 65, 255, 210, 63, 63, 255, 206, 63, 63, 255, 204, 61, 61, 255, 195, 42, 44, 255, 211, 94, 94, 255, 246, 235, 235, 255, 250, 255, 255, 255, 241, 241, 241, 255, 238, 237, 237, 255, 233, 240, 240, 255, 230, 210, 210, 255, 214, 189, 189, 255, 211, 218, 218, 255, 207, 207, 207, 255, 202, 201, 201, 255, 226, 229, 229, 255, 243, 241, 241, 255, 160, 58, 58, 255, 152, 12, 12, 255, 163, 11, 11, 255, 159, 11, 11, 255, 158, 11, 11, 255, 158, 11, 11, 255, 164, 28, 28, 255, 211, 156, 156, 255, 193, 193, 193, 253, 107, 106, 106, 148], [107, 106, 106, 96, 159, 159, 159, 246, 234, 217, 218, 255, 207, 107, 107, 255, 215, 68, 68, 255, 214, 67, 65, 255, 211, 66, 66, 255, 205, 52, 52, 255, 219, 100, 100, 255, 255, 239, 239, 255, 255, 255, 255, 255, 252, 252, 252, 255, 246, 246, 246, 255, 244, 252, 252, 255, 240, 225, 226, 255, 204, 80, 80, 255, 193, 64, 64, 255, 219, 195, 195, 255, 216, 225, 225, 255, 213, 212, 212, 255, 207, 207, 207, 255, 229, 232, 232, 255, 244, 242, 242, 255, 162, 64, 64, 255, 153, 12, 12, 255, 162, 15, 15, 255, 160, 15, 15, 255, 157, 15, 15, 255, 169, 47, 48, 255, 232, 209, 209, 254, 160, 160, 160, 246, 107, 106, 106, 96], [107, 106, 106, 37, 121, 120, 120, 241, 235, 233, 233, 254, 218, 167, 167, 255, 219, 96, 96, 255, 219, 71, 69, 255, 214, 60, 60, 255, 222, 87, 88, 255, 255, 242, 242, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 248, 232, 232, 255, 212, 91, 91, 255, 189, 40, 40, 255, 189, 43, 42, 255, 197, 73, 73, 255, 219, 195, 195, 255, 218, 228, 228, 255, 213, 213, 213, 255, 208, 206, 206, 255, 229, 232, 232, 255, 244, 244, 244, 255, 175, 73, 73, 255, 166, 33, 33, 255, 166, 42, 42, 255, 169, 43, 44, 255, 184, 87, 85, 255, 236, 234, 234, 254, 121, 120, 120, 241, 107, 106, 106, 37], [0, 0, 0, 0, 118, 117, 117, 158, 190, 190, 190, 253, 230, 202, 201, 255, 219, 121, 122, 255, 223, 76, 76, 255, 219, 65, 65, 255, 224, 87, 87, 255, 255, 234, 234, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 231, 232, 255, 215, 91, 91, 255, 198, 46, 46, 255, 201, 62, 62, 255, 197, 58, 58, 255, 193, 46, 44, 255, 200, 73, 74, 255, 221, 194, 194, 255, 218, 227, 227, 255, 212, 213, 213, 255, 211, 218, 218, 255, 217, 203, 202, 255, 187, 71, 71, 255, 173, 37, 37, 255, 172, 43, 44, 255, 174, 50, 51, 255, 216, 164, 165, 255, 191, 191, 191, 253, 118, 117, 117, 158, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 240, 239, 236, 236, 254, 214, 150, 150, 255, 227, 123, 123, 255, 224, 75, 77, 255, 219, 65, 65, 255, 230, 95, 95, 255, 255, 231, 231, 255, 255, 255, 255, 255, 255, 233, 233, 255, 220, 90, 90, 255, 202, 51, 51, 255, 207, 66, 66, 255, 203, 64, 64, 255, 201, 61, 61, 255, 200, 62, 61, 255, 194, 48, 48, 255, 201, 72, 72, 255, 221, 192, 192, 255, 222, 238, 236, 255, 224, 208, 208, 255, 199, 84, 85, 255, 179, 40, 40, 255, 180, 50, 50, 255, 177, 52, 52, 255, 183, 83, 84, 255, 239, 236, 236, 254, 137, 136, 136, 240, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 250, 236, 208, 208, 255, 219, 143, 143, 255, 227, 104, 104, 255, 226, 78, 78, 255, 219, 64, 62, 255, 233, 101, 101, 255, 247, 178, 178, 255, 228, 101, 101, 255, 210, 59, 57, 255, 215, 70, 70, 255, 212, 67, 67, 255, 209, 67, 67, 255, 207, 66, 66, 255, 203, 64, 64, 255, 202, 63, 63, 255, 196, 51, 51, 255, 203, 78, 78, 255, 226, 158, 158, 255, 207, 91, 92, 255, 186, 42, 41, 255, 188, 54, 54, 255, 184, 56, 57, 255, 177, 62, 63, 255, 233, 203, 203, 255, 184, 183, 183, 250, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 254, 226, 181, 181, 255, 228, 158, 158, 255, 226, 102, 103, 255, 230, 80, 78, 255, 224, 70, 70, 255, 218, 61, 61, 255, 220, 68, 68, 255, 220, 75, 75, 255, 219, 72, 72, 255, 217, 71, 72, 255, 213, 70, 70, 255, 211, 67, 68, 255, 209, 67, 67, 255, 207, 66, 66, 255, 205, 67, 65, 255, 200, 58, 58, 255, 197, 47, 49, 255, 195, 53, 53, 255, 195, 60, 60, 255, 190, 61, 61, 255, 181, 63, 64, 255, 220, 172, 172, 255, 211, 211, 211, 254, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 234, 225, 225, 225, 255, 226, 181, 181, 255, 228, 166, 167, 255, 229, 119, 120, 255, 229, 81, 81, 255, 228, 79, 79, 255, 226, 78, 78, 255, 224, 77, 77, 255, 222, 76, 76, 255, 220, 75, 75, 255, 219, 73, 73, 255, 215, 72, 72, 255, 213, 71, 71, 255, 211, 69, 69, 255, 209, 69, 69, 255, 207, 67, 67, 255, 204, 66, 66, 255, 203, 63, 63, 255, 194, 67, 67, 255, 182, 69, 70, 255, 220, 173, 173, 255, 225, 225, 225, 255, 136, 135, 135, 234, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 234, 211, 211, 211, 254, 236, 208, 208, 255, 223, 169, 170, 255, 236, 162, 162, 255, 227, 101, 101, 255, 230, 81, 81, 255, 228, 79, 79, 255, 228, 77, 79, 255, 224, 77, 77, 255, 223, 77, 77, 255, 220, 77, 77, 255, 219, 73, 76, 255, 216, 74, 74, 255, 214, 73, 71, 255, 212, 71, 71, 255, 203, 73, 73, 255, 195, 75, 75, 255, 208, 142, 142, 255, 232, 204, 205, 255, 211, 211, 211, 254, 136, 135, 135, 234, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 250, 239, 236, 236, 254, 229, 194, 195, 255, 225, 174, 173, 255, 232, 157, 158, 255, 224, 111, 111, 255, 225, 92, 92, 255, 226, 82, 84, 255, 225, 81, 80, 255, 223, 79, 79, 255, 219, 79, 79, 255, 214, 80, 81, 255, 207, 81, 81, 255, 200, 95, 95, 255, 211, 161, 161, 254, 224, 200, 199, 254, 231, 228, 228, 254, 184, 183, 183, 250, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 240, 191, 191, 191, 253, 236, 235, 235, 254, 235, 217, 216, 254, 228, 189, 189, 254, 220, 167, 168, 255, 215, 149, 150, 255, 212, 134, 136, 255, 206, 125, 127, 255, 210, 139, 140, 255, 217, 162, 161, 255, 225, 190, 192, 254, 234, 217, 217, 254, 236, 234, 234, 254, 191, 191, 191, 253, 137, 136, 136, 240, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 241, 159, 159, 159, 246, 192, 192, 192, 253, 218, 218, 218, 255, 238, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 238, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 253, 159, 159, 159, 246, 121, 120, 120, 241, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
var icon_exclamation = {
    width: 32,
    height: 32,
    bytes: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [139, 138, 139, 148, 152, 152, 153, 237, 146, 146, 148, 241, 146, 146, 150, 241, 146, 146, 150, 241, 146, 147, 150, 241, 147, 148, 151, 241, 148, 150, 151, 241, 150, 151, 153, 241, 151, 151, 156, 241, 151, 152, 156, 241, 152, 156, 157, 241, 156, 156, 158, 241, 156, 156, 158, 241, 156, 157, 159, 241, 157, 157, 159, 241, 156, 157, 159, 241, 156, 156, 158, 240, 156, 156, 158, 240, 152, 156, 157, 240, 151, 152, 156, 240, 151, 151, 155, 240, 150, 151, 152, 240, 148, 149, 151, 240, 147, 148, 151, 240, 146, 147, 150, 240, 145, 146, 149, 240, 146, 146, 149, 240, 147, 147, 148, 241, 146, 146, 146, 205, 9, 9, 10, 32, 0, 0, 0, 0], [162, 163, 164, 209, 201, 202, 204, 255, 210, 207, 201, 255, 211, 207, 202, 255, 211, 207, 203, 255, 212, 207, 205, 255, 213, 209, 206, 255, 214, 210, 207, 255, 221, 218, 214, 255, 227, 223, 221, 255, 234, 231, 230, 255, 238, 235, 234, 255, 239, 237, 234, 255, 239, 237, 235, 255, 240, 237, 235, 255, 240, 238, 235, 255, 239, 237, 235, 255, 239, 237, 235, 255, 237, 234, 231, 255, 231, 229, 227, 255, 231, 228, 227, 255, 223, 218, 216, 255, 216, 212, 209, 255, 214, 210, 207, 255, 213, 209, 206, 255, 212, 207, 205, 255, 211, 206, 203, 255, 212, 207, 205, 255, 208, 206, 207, 255, 188, 188, 192, 251, 56, 56, 57, 69, 0, 0, 0, 0], [162, 162, 163, 187, 183, 184, 192, 255, 182, 170, 115, 255, 204, 164, 32, 255, 203, 163, 38, 255, 203, 161, 38, 255, 203, 159, 38, 255, 203, 158, 36, 255, 203, 158, 36, 255, 203, 158, 36, 255, 203, 158, 35, 255, 202, 158, 34, 255, 202, 158, 34, 255, 206, 158, 34, 255, 196, 152, 34, 255, 187, 143, 31, 255, 197, 152, 32, 255, 201, 155, 35, 255, 200, 155, 38, 255, 200, 154, 38, 255, 200, 154, 38, 255, 200, 155, 38, 255, 201, 155, 38, 255, 201, 155, 38, 255, 201, 155, 38, 255, 202, 155, 38, 255, 204, 158, 34, 255, 188, 150, 55, 255, 186, 180, 176, 255, 167, 169, 174, 225, 142, 142, 143, 34, 0, 0, 0, 0], [151, 151, 150, 56, 170, 171, 176, 243, 177, 175, 160, 255, 195, 171, 69, 255, 254, 217, 35, 255, 248, 211, 41, 255, 248, 208, 40, 255, 248, 206, 39, 255, 248, 205, 38, 255, 247, 204, 36, 255, 248, 203, 35, 255, 248, 202, 34, 255, 255, 206, 32, 255, 201, 162, 30, 255, 76, 67, 36, 255, 85, 84, 74, 255, 157, 134, 62, 255, 236, 184, 33, 255, 247, 194, 40, 255, 243, 189, 41, 255, 242, 189, 42, 255, 243, 191, 42, 255, 243, 191, 41, 255, 243, 191, 41, 255, 244, 191, 41, 255, 249, 194, 39, 255, 209, 159, 25, 255, 176, 153, 100, 255, 178, 180, 191, 255, 149, 150, 151, 110, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 158, 158, 159, 174, 180, 183, 196, 255, 179, 171, 119, 255, 216, 176, 6, 255, 243, 200, 5, 255, 240, 197, 6, 255, 240, 195, 5, 255, 240, 193, 2, 255, 239, 192, 1, 255, 240, 188, 0, 255, 244, 189, 0, 255, 245, 192, 0, 255, 85, 66, 0, 255, 0, 0, 10, 255, 52, 57, 68, 255, 95, 93, 87, 255, 209, 156, 6, 255, 243, 179, 0, 255, 235, 174, 4, 255, 235, 172, 5, 255, 234, 171, 6, 255, 234, 171, 6, 255, 235, 171, 5, 255, 236, 172, 6, 255, 225, 162, 3, 255, 179, 136, 35, 255, 188, 187, 191, 255, 160, 162, 167, 196, 144, 143, 144, 15, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 150, 150, 150, 32, 167, 168, 174, 229, 183, 183, 184, 255, 187, 165, 67, 255, 235, 191, 2, 255, 238, 196, 0, 255, 238, 193, 0, 255, 238, 191, 0, 255, 238, 189, 0, 255, 237, 186, 0, 255, 239, 186, 0, 255, 244, 189, 0, 255, 118, 90, 0, 255, 0, 0, 5, 255, 22, 27, 51, 255, 100, 90, 56, 255, 219, 162, 0, 255, 238, 172, 0, 255, 234, 168, 0, 255, 232, 167, 0, 255, 231, 164, 0, 255, 231, 164, 0, 255, 231, 164, 0, 255, 235, 166, 0, 255, 197, 139, 6, 255, 177, 158, 117, 255, 181, 186, 196, 249, 149, 149, 149, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 156, 141, 185, 188, 203, 255, 181, 176, 144, 255, 213, 174, 6, 255, 240, 200, 0, 255, 238, 195, 0, 255, 238, 194, 0, 255, 238, 193, 0, 255, 237, 189, 0, 255, 237, 187, 0, 255, 242, 187, 0, 255, 205, 158, 0, 255, 144, 112, 0, 255, 128, 101, 6, 255, 182, 138, 0, 255, 244, 180, 0, 255, 235, 171, 0, 255, 234, 169, 0, 255, 234, 168, 0, 255, 231, 166, 0, 255, 231, 164, 0, 255, 231, 163, 0, 255, 220, 152, 3, 255, 177, 140, 54, 255, 194, 197, 211, 255, 159, 159, 161, 170, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 150, 150, 150, 16, 164, 165, 168, 215, 196, 197, 209, 255, 185, 165, 80, 255, 234, 193, 2, 255, 239, 200, 0, 255, 238, 197, 0, 255, 238, 196, 0, 255, 238, 194, 0, 255, 238, 193, 0, 255, 240, 192, 0, 255, 209, 161, 0, 255, 179, 136, 0, 255, 187, 145, 0, 255, 202, 155, 0, 255, 229, 171, 0, 255, 237, 177, 0, 255, 235, 174, 0, 255, 234, 172, 0, 255, 234, 169, 0, 255, 232, 167, 0, 255, 237, 168, 0, 255, 194, 139, 6, 255, 185, 171, 141, 255, 179, 183, 192, 240, 152, 152, 152, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 150, 79, 180, 181, 191, 252, 184, 184, 172, 255, 209, 174, 13, 255, 246, 205, 0, 255, 239, 201, 0, 255, 239, 198, 0, 255, 238, 196, 0, 255, 242, 197, 0, 255, 246, 201, 0, 255, 93, 74, 0, 255, 0, 0, 4, 255, 32, 36, 53, 255, 90, 85, 68, 255, 212, 168, 1, 255, 244, 184, 0, 255, 237, 176, 0, 255, 236, 175, 0, 255, 235, 172, 0, 255, 236, 172, 0, 255, 217, 153, 3, 255, 181, 150, 78, 255, 198, 203, 218, 255, 151, 151, 152, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 151, 5, 159, 159, 162, 188, 216, 217, 229, 255, 186, 171, 101, 255, 236, 201, 2, 255, 244, 205, 0, 255, 240, 202, 0, 255, 238, 198, 0, 255, 243, 200, 0, 255, 242, 198, 0, 255, 77, 61, 0, 255, 0, 0, 0, 0, 23, 25, 34, 255, 83, 79, 61, 255, 211, 169, 1, 255, 244, 186, 0, 255, 237, 178, 0, 255, 237, 177, 0, 255, 236, 176, 0, 255, 237, 174, 0, 255, 184, 139, 22, 255, 203, 197, 187, 255, 174, 176, 181, 216, 146, 146, 146, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 149, 149, 44, 177, 178, 184, 236, 216, 216, 215, 255, 195, 173, 67, 255, 255, 229, 6, 255, 248, 218, 10, 255, 244, 211, 2, 255, 247, 211, 0, 255, 239, 201, 0, 255, 69, 57, 0, 255, 0, 0, 0, 0, 6, 7, 15, 255, 58, 56, 41, 255, 205, 166, 1, 255, 245, 191, 0, 255, 237, 184, 0, 255, 237, 180, 0, 255, 240, 180, 0, 255, 206, 151, 6, 255, 194, 171, 119, 255, 203, 208, 221, 255, 152, 151, 152, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157, 157, 159, 162, 212, 213, 228, 255, 199, 195, 157, 255, 223, 196, 20, 255, 255, 235, 24, 255, 253, 228, 27, 255, 255, 228, 24, 255, 245, 215, 17, 255, 83, 74, 21, 255, 8, 9, 22, 255, 30, 31, 36, 255, 61, 59, 49, 255, 207, 173, 5, 255, 251, 203, 0, 255, 240, 195, 0, 255, 240, 193, 0, 255, 240, 185, 0, 255, 182, 145, 35, 255, 232, 234, 238, 255, 169, 170, 175, 195, 153, 153, 154, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 149, 147, 27, 173, 174, 178, 225, 232, 233, 239, 255, 191, 175, 79, 255, 255, 240, 13, 255, 255, 234, 26, 255, 255, 236, 27, 255, 248, 232, 13, 255, 101, 94, 45, 255, 41, 42, 56, 255, 52, 53, 59, 255, 70, 69, 61, 255, 210, 183, 17, 255, 255, 217, 6, 255, 245, 204, 5, 255, 247, 203, 0, 255, 206, 163, 6, 255, 200, 182, 140, 255, 201, 203, 215, 244, 146, 146, 146, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 150, 101, 194, 195, 206, 252, 201, 201, 177, 255, 221, 198, 23, 255, 255, 240, 15, 255, 255, 240, 25, 255, 248, 235, 10, 255, 108, 103, 58, 255, 55, 56, 68, 255, 55, 56, 60, 255, 62, 61, 58, 255, 203, 180, 21, 255, 255, 221, 13, 255, 247, 211, 11, 255, 228, 185, 3, 255, 191, 164, 73, 255, 237, 238, 246, 255, 161, 161, 164, 162, 150, 150, 151, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 149, 149, 7, 165, 165, 167, 202, 232, 233, 242, 255, 195, 183, 102, 255, 243, 228, 6, 255, 255, 245, 18, 255, 248, 236, 10, 255, 112, 110, 69, 255, 74, 75, 86, 255, 69, 70, 75, 255, 64, 64, 65, 255, 201, 180, 24, 255, 255, 227, 19, 255, 249, 215, 8, 255, 195, 162, 27, 255, 218, 210, 190, 255, 192, 195, 202, 233, 151, 151, 151, 46, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 149, 147, 63, 187, 188, 197, 246, 200, 201, 197, 255, 215, 194, 29, 255, 255, 253, 1, 255, 252, 244, 5, 255, 116, 113, 81, 255, 90, 91, 102, 255, 86, 87, 91, 255, 77, 78, 79, 255, 201, 183, 29, 255, 255, 234, 21, 255, 230, 198, 10, 255, 194, 171, 100, 255, 232, 234, 245, 255, 154, 154, 155, 136, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 151, 2, 161, 161, 161, 154, 213, 214, 226, 255, 199, 196, 140, 255, 224, 211, 6, 255, 249, 243, 3, 255, 118, 117, 91, 255, 103, 103, 113, 255, 101, 101, 106, 255, 93, 94, 98, 255, 198, 183, 32, 255, 255, 238, 8, 255, 192, 163, 43, 255, 231, 230, 232, 255, 175, 176, 183, 214, 151, 151, 152, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 149, 149, 40, 176, 176, 181, 234, 205, 206, 206, 255, 198, 182, 61, 255, 250, 244, 0, 255, 109, 109, 101, 255, 101, 101, 126, 255, 100, 101, 120, 255, 94, 94, 116, 255, 196, 183, 31, 255, 228, 202, 13, 255, 197, 182, 121, 255, 197, 200, 213, 254, 145, 145, 146, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 118, 185, 185, 199, 255, 193, 191, 151, 255, 219, 201, 7, 255, 152, 149, 51, 255, 116, 113, 68, 255, 117, 116, 66, 255, 127, 125, 69, 255, 220, 206, 13, 255, 196, 172, 49, 255, 198, 200, 211, 255, 166, 167, 170, 186, 154, 154, 155, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150, 150, 149, 17, 166, 166, 169, 218, 195, 195, 212, 255, 188, 172, 74, 255, 255, 255, 0, 255, 255, 247, 0, 255, 255, 247, 0, 255, 255, 253, 0, 255, 210, 188, 11, 255, 202, 195, 156, 255, 183, 184, 198, 248, 153, 152, 153, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 152, 151, 88, 178, 178, 189, 252, 182, 182, 166, 255, 221, 204, 7, 255, 255, 255, 0, 255, 255, 255, 0, 255, 255, 253, 0, 255, 187, 166, 62, 255, 195, 196, 214, 255, 153, 153, 157, 157, 157, 157, 158, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 151, 3, 163, 163, 164, 174, 180, 180, 194, 255, 182, 170, 83, 255, 255, 255, 0, 255, 255, 255, 0, 255, 209, 192, 14, 255, 189, 184, 160, 255, 171, 172, 184, 230, 142, 142, 141, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 152, 151, 54, 171, 171, 178, 244, 174, 174, 172, 255, 214, 198, 17, 255, 228, 219, 6, 255, 188, 172, 77, 255, 181, 184, 203, 255, 153, 153, 154, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157, 157, 155, 138, 173, 174, 191, 255, 184, 178, 109, 255, 199, 184, 30, 255, 187, 187, 184, 255, 161, 162, 171, 204, 155, 155, 157, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 151, 150, 28, 165, 166, 169, 225, 191, 191, 183, 255, 194, 194, 172, 255, 177, 177, 183, 249, 153, 153, 154, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 159, 159, 158, 66, 177, 177, 181, 239, 187, 186, 195, 255, 155, 155, 157, 139, 150, 150, 151, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 158, 157, 5, 175, 177, 177, 128, 173, 172, 173, 120, 155, 155, 157, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
var icon_information = {
    width: 32,
    height: 32,
    bytes: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 241, 159, 159, 159, 246, 192, 192, 192, 253, 218, 218, 218, 255, 237, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 237, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 253, 159, 159, 159, 246, 121, 120, 120, 241, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 240, 191, 191, 191, 253, 235, 235, 235, 254, 209, 209, 210, 255, 147, 150, 159, 255, 102, 108, 130, 255, 78, 88, 127, 255, 67, 79, 131, 255, 67, 79, 131, 255, 78, 88, 128, 255, 104, 110, 134, 255, 150, 152, 161, 255, 211, 212, 213, 255, 235, 235, 235, 254, 191, 191, 191, 253, 137, 136, 136, 240, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 250, 237, 237, 237, 254, 177, 178, 181, 255, 94, 102, 128, 255, 55, 75, 146, 255, 46, 70, 163, 255, 45, 71, 174, 255, 44, 71, 180, 255, 44, 71, 185, 255, 45, 71, 187, 255, 46, 72, 184, 255, 48, 73, 181, 255, 46, 70, 171, 255, 54, 73, 150, 255, 95, 102, 133, 255, 182, 184, 188, 255, 237, 237, 237, 254, 184, 183, 183, 250, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 234, 211, 211, 211, 254, 216, 216, 217, 255, 108, 113, 131, 255, 50, 73, 147, 255, 43, 71, 167, 255, 41, 71, 178, 255, 38, 69, 184, 255, 36, 68, 189, 255, 27, 59, 188, 255, 22, 53, 181, 255, 23, 53, 181, 255, 24, 55, 184, 255, 36, 66, 195, 255, 43, 72, 195, 255, 45, 72, 189, 255, 50, 74, 180, 255, 51, 71, 156, 255, 109, 114, 139, 255, 219, 220, 220, 255, 211, 211, 211, 254, 136, 135, 135, 234, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 234, 225, 225, 225, 255, 191, 191, 193, 255, 75, 88, 127, 255, 46, 73, 160, 255, 40, 72, 171, 255, 35, 68, 179, 255, 33, 67, 183, 255, 33, 66, 188, 255, 31, 64, 190, 255, 53, 70, 137, 255, 71, 82, 130, 255, 69, 81, 132, 255, 66, 78, 131, 255, 41, 66, 179, 255, 34, 64, 199, 255, 38, 68, 199, 255, 41, 69, 195, 255, 46, 72, 188, 255, 53, 76, 176, 255, 74, 85, 135, 255, 195, 195, 198, 255, 225, 225, 225, 255, 136, 135, 135, 234, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 254, 190, 190, 192, 255, 68, 85, 132, 255, 45, 74, 162, 255, 37, 70, 174, 255, 32, 67, 179, 255, 32, 66, 181, 255, 31, 66, 184, 255, 29, 63, 186, 255, 31, 64, 185, 255, 185, 192, 211, 255, 245, 245, 246, 255, 245, 245, 245, 255, 199, 204, 221, 255, 48, 67, 134, 255, 18, 49, 185, 255, 36, 67, 200, 255, 36, 66, 198, 255, 37, 67, 197, 255, 42, 70, 191, 255, 52, 76, 179, 255, 65, 79, 137, 255, 193, 194, 197, 255, 212, 212, 212, 254, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 250, 216, 216, 217, 255, 76, 89, 126, 255, 46, 75, 161, 255, 37, 72, 173, 255, 31, 67, 178, 255, 31, 66, 179, 255, 30, 66, 181, 255, 30, 65, 183, 255, 28, 63, 184, 255, 33, 67, 185, 255, 235, 235, 237, 255, 253, 253, 250, 255, 252, 252, 253, 255, 243, 243, 242, 255, 55, 75, 138, 255, 14, 48, 183, 255, 36, 67, 198, 255, 35, 66, 198, 255, 36, 66, 197, 255, 37, 66, 195, 255, 40, 69, 190, 255, 51, 75, 176, 255, 71, 84, 132, 255, 219, 219, 219, 255, 185, 184, 184, 250, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 240, 237, 237, 237, 254, 110, 116, 132, 255, 47, 75, 158, 255, 38, 72, 171, 255, 32, 70, 176, 255, 30, 66, 177, 255, 30, 66, 179, 255, 30, 66, 180, 255, 30, 65, 181, 255, 27, 63, 182, 255, 35, 70, 185, 255, 223, 223, 227, 255, 235, 233, 231, 255, 243, 243, 244, 255, 243, 243, 242, 255, 54, 73, 136, 255, 14, 47, 181, 255, 35, 66, 196, 255, 33, 65, 196, 255, 33, 65, 196, 255, 33, 65, 194, 255, 35, 66, 192, 255, 39, 69, 186, 255, 52, 76, 170, 255, 105, 112, 136, 255, 237, 237, 237, 254, 137, 136, 136, 240, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 118, 117, 117, 158, 191, 191, 191, 253, 181, 182, 184, 255, 55, 80, 146, 255, 41, 75, 167, 255, 33, 70, 174, 255, 32, 69, 176, 255, 30, 67, 177, 255, 30, 66, 177, 255, 30, 66, 177, 255, 29, 65, 179, 255, 27, 63, 180, 255, 35, 71, 185, 255, 213, 215, 216, 255, 214, 213, 208, 255, 223, 222, 223, 255, 242, 241, 239, 255, 52, 73, 136, 255, 14, 47, 180, 255, 33, 66, 193, 255, 32, 65, 193, 255, 32, 65, 192, 255, 32, 65, 192, 255, 33, 64, 191, 255, 34, 65, 189, 255, 42, 71, 180, 255, 48, 68, 147, 255, 180, 181, 185, 255, 192, 192, 192, 253, 118, 117, 117, 158, 0, 0, 0, 0], [107, 106, 106, 37, 121, 120, 120, 241, 235, 235, 235, 254, 109, 116, 137, 255, 50, 81, 166, 255, 36, 72, 172, 255, 32, 70, 175, 255, 31, 69, 176, 255, 30, 67, 176, 255, 30, 66, 177, 255, 30, 66, 177, 255, 29, 66, 177, 255, 27, 63, 179, 255, 36, 71, 185, 255, 208, 208, 207, 255, 199, 198, 194, 255, 202, 203, 203, 255, 235, 235, 233, 255, 52, 72, 135, 255, 14, 48, 177, 255, 31, 65, 191, 255, 31, 64, 190, 255, 31, 64, 190, 255, 31, 64, 189, 255, 31, 64, 189, 255, 31, 64, 187, 255, 36, 67, 182, 255, 46, 73, 168, 255, 91, 99, 128, 255, 235, 235, 235, 254, 122, 121, 121, 241, 107, 106, 106, 37], [107, 106, 106, 96, 159, 159, 159, 246, 211, 211, 212, 255, 77, 98, 155, 255, 53, 88, 179, 255, 34, 74, 176, 255, 31, 70, 176, 255, 31, 69, 176, 255, 30, 69, 176, 255, 30, 67, 176, 255, 29, 66, 176, 255, 29, 66, 177, 255, 26, 63, 177, 255, 36, 71, 183, 255, 200, 200, 201, 255, 189, 188, 183, 255, 191, 191, 192, 255, 232, 230, 229, 255, 51, 71, 134, 255, 13, 48, 175, 255, 30, 65, 188, 255, 31, 64, 186, 255, 30, 64, 186, 255, 30, 64, 186, 255, 30, 64, 185, 255, 30, 64, 184, 255, 31, 64, 182, 255, 40, 69, 173, 255, 50, 70, 139, 255, 210, 210, 211, 255, 160, 160, 160, 246, 107, 106, 106, 96], [107, 106, 106, 148, 192, 192, 192, 253, 158, 160, 166, 255, 66, 94, 170, 255, 54, 91, 186, 255, 45, 83, 185, 255, 31, 70, 175, 255, 31, 70, 175, 255, 30, 67, 175, 255, 30, 67, 175, 255, 30, 66, 175, 255, 29, 66, 176, 255, 26, 63, 175, 255, 36, 73, 182, 255, 198, 199, 201, 255, 180, 179, 175, 255, 181, 181, 182, 255, 228, 228, 225, 255, 51, 71, 134, 255, 13, 48, 173, 255, 29, 65, 184, 255, 30, 63, 183, 255, 29, 64, 183, 255, 29, 63, 183, 255, 29, 63, 183, 255, 29, 63, 182, 255, 30, 63, 179, 255, 34, 67, 174, 255, 41, 67, 152, 255, 148, 151, 159, 255, 193, 193, 193, 253, 107, 106, 106, 148], [107, 106, 106, 192, 218, 218, 218, 255, 125, 131, 143, 255, 62, 96, 179, 255, 55, 93, 190, 255, 54, 91, 193, 255, 43, 82, 186, 255, 30, 69, 174, 255, 30, 69, 175, 255, 30, 67, 175, 255, 30, 67, 175, 255, 29, 66, 175, 255, 26, 63, 174, 255, 37, 73, 181, 255, 198, 199, 199, 255, 175, 174, 169, 255, 174, 174, 174, 255, 225, 225, 222, 255, 50, 71, 133, 255, 12, 48, 169, 255, 28, 64, 181, 255, 28, 63, 180, 255, 29, 63, 180, 255, 29, 63, 180, 255, 28, 63, 179, 255, 28, 63, 179, 255, 29, 63, 176, 255, 32, 65, 173, 255, 44, 72, 160, 255, 101, 108, 128, 255, 218, 218, 218, 255, 107, 106, 106, 192], [107, 106, 106, 225, 237, 237, 237, 255, 107, 117, 142, 255, 66, 100, 185, 255, 56, 95, 194, 255, 54, 94, 197, 255, 55, 95, 198, 255, 44, 82, 188, 255, 30, 69, 174, 255, 30, 67, 174, 255, 30, 67, 174, 255, 29, 67, 174, 255, 26, 63, 174, 255, 37, 73, 181, 255, 198, 199, 201, 255, 175, 174, 169, 255, 171, 171, 171, 255, 225, 224, 222, 255, 50, 71, 132, 255, 12, 48, 167, 255, 28, 64, 177, 255, 28, 63, 177, 255, 28, 63, 176, 255, 28, 63, 176, 255, 28, 63, 176, 255, 27, 63, 175, 255, 27, 63, 174, 255, 30, 65, 172, 255, 41, 70, 161, 255, 74, 86, 120, 255, 237, 237, 237, 255, 107, 106, 106, 225], [107, 106, 106, 248, 251, 251, 251, 255, 102, 115, 149, 255, 68, 103, 191, 255, 58, 98, 197, 255, 57, 96, 199, 255, 57, 97, 199, 255, 58, 97, 200, 255, 46, 86, 190, 255, 30, 69, 174, 255, 28, 66, 172, 255, 30, 67, 174, 255, 27, 65, 173, 255, 36, 72, 179, 255, 200, 200, 201, 255, 181, 179, 175, 255, 173, 173, 172, 255, 224, 223, 222, 255, 50, 71, 132, 255, 11, 49, 166, 255, 27, 64, 175, 255, 27, 63, 174, 255, 27, 63, 174, 255, 27, 63, 174, 255, 27, 63, 174, 255, 27, 63, 174, 255, 27, 63, 173, 255, 29, 64, 171, 255, 38, 70, 162, 255, 64, 79, 123, 255, 251, 251, 251, 255, 107, 106, 106, 248], [107, 106, 106, 248, 251, 251, 251, 255, 105, 117, 151, 255, 71, 106, 193, 255, 62, 101, 199, 255, 60, 100, 201, 255, 60, 99, 202, 255, 61, 99, 202, 255, 61, 100, 203, 255, 53, 92, 197, 255, 35, 73, 179, 255, 27, 65, 171, 255, 26, 64, 171, 255, 36, 73, 177, 255, 202, 202, 201, 255, 188, 185, 183, 255, 177, 177, 177, 255, 225, 224, 222, 255, 50, 71, 132, 255, 11, 48, 165, 255, 27, 65, 174, 255, 27, 63, 173, 255, 27, 63, 173, 255, 27, 63, 173, 255, 27, 63, 173, 255, 27, 63, 172, 255, 27, 63, 172, 255, 29, 65, 170, 255, 38, 69, 161, 255, 65, 79, 123, 255, 251, 251, 251, 255, 107, 106, 106, 248], [107, 106, 106, 225, 237, 237, 237, 255, 115, 124, 149, 255, 76, 111, 195, 255, 65, 105, 203, 255, 63, 104, 205, 255, 63, 103, 205, 255, 63, 103, 205, 255, 63, 103, 205, 255, 64, 104, 207, 255, 62, 100, 205, 255, 47, 86, 190, 255, 28, 66, 173, 255, 32, 70, 175, 255, 202, 204, 204, 255, 197, 196, 192, 255, 185, 185, 185, 255, 227, 226, 225, 255, 50, 71, 132, 255, 11, 49, 164, 255, 28, 66, 173, 255, 27, 64, 172, 255, 27, 64, 172, 255, 27, 64, 172, 255, 27, 64, 172, 255, 27, 64, 171, 255, 27, 64, 171, 255, 30, 65, 169, 255, 41, 71, 159, 255, 76, 89, 121, 255, 237, 237, 237, 255, 107, 106, 106, 225], [107, 106, 106, 192, 218, 218, 218, 255, 135, 141, 154, 255, 81, 114, 195, 255, 69, 108, 205, 255, 67, 107, 207, 255, 66, 107, 208, 255, 65, 107, 208, 255, 66, 106, 208, 255, 66, 106, 208, 255, 66, 106, 208, 255, 66, 106, 209, 255, 58, 97, 203, 255, 48, 86, 190, 255, 207, 206, 206, 255, 208, 205, 202, 255, 193, 193, 193, 255, 229, 228, 227, 255, 51, 73, 132, 255, 11, 49, 163, 255, 28, 66, 173, 255, 28, 65, 171, 255, 28, 65, 171, 255, 27, 65, 172, 255, 27, 65, 171, 255, 28, 65, 171, 255, 28, 65, 171, 255, 31, 67, 168, 255, 43, 73, 156, 255, 106, 113, 132, 255, 218, 218, 218, 255, 107, 106, 106, 192], [107, 106, 106, 148, 192, 192, 192, 253, 166, 168, 173, 255, 92, 122, 195, 255, 75, 114, 205, 255, 71, 111, 210, 255, 70, 111, 210, 255, 70, 111, 211, 255, 70, 109, 211, 255, 70, 109, 211, 255, 70, 109, 210, 255, 69, 108, 210, 255, 67, 107, 211, 255, 67, 107, 210, 255, 163, 179, 221, 255, 245, 245, 240, 255, 235, 234, 231, 255, 195, 204, 230, 255, 44, 67, 131, 255, 11, 50, 162, 255, 26, 65, 169, 255, 26, 64, 168, 255, 26, 64, 169, 255, 27, 65, 169, 255, 26, 65, 168, 255, 27, 64, 168, 255, 28, 65, 169, 255, 34, 69, 165, 255, 49, 77, 153, 255, 149, 152, 160, 255, 193, 193, 193, 253, 107, 106, 106, 148], [107, 106, 106, 96, 159, 159, 159, 246, 214, 214, 215, 255, 115, 135, 188, 255, 82, 118, 207, 255, 74, 115, 213, 255, 73, 114, 214, 255, 73, 114, 215, 255, 73, 114, 215, 255, 73, 114, 214, 255, 72, 113, 214, 255, 72, 112, 213, 255, 72, 111, 213, 255, 69, 107, 211, 255, 75, 111, 213, 255, 77, 114, 214, 255, 76, 113, 214, 255, 78, 114, 213, 255, 66, 103, 205, 255, 48, 87, 191, 255, 46, 84, 188, 255, 41, 80, 184, 255, 39, 78, 181, 255, 38, 75, 180, 255, 38, 77, 179, 255, 39, 77, 181, 255, 42, 79, 180, 255, 50, 84, 173, 255, 67, 89, 149, 255, 210, 210, 211, 255, 160, 160, 160, 246, 107, 106, 106, 96], [107, 106, 106, 37, 121, 120, 120, 241, 235, 235, 235, 254, 140, 147, 165, 255, 98, 132, 213, 255, 81, 119, 214, 255, 78, 117, 217, 255, 77, 118, 218, 255, 77, 117, 217, 255, 77, 117, 217, 255, 77, 117, 217, 255, 75, 116, 216, 255, 74, 115, 216, 255, 75, 115, 216, 255, 63, 104, 211, 255, 56, 96, 201, 255, 57, 94, 191, 255, 50, 90, 197, 255, 64, 104, 210, 255, 67, 106, 208, 255, 64, 103, 206, 255, 62, 100, 203, 255, 60, 98, 200, 255, 57, 95, 198, 255, 55, 94, 196, 255, 54, 91, 192, 255, 54, 91, 187, 255, 62, 93, 172, 255, 102, 112, 137, 255, 235, 235, 235, 254, 121, 120, 120, 241, 107, 106, 106, 37], [0, 0, 0, 0, 118, 117, 117, 158, 191, 191, 191, 253, 191, 192, 193, 255, 125, 149, 210, 255, 91, 127, 216, 255, 82, 122, 220, 255, 82, 121, 221, 255, 81, 121, 220, 255, 80, 121, 220, 255, 80, 121, 220, 255, 80, 120, 220, 255, 79, 120, 219, 255, 71, 113, 217, 255, 100, 133, 218, 255, 205, 213, 234, 255, 224, 228, 237, 255, 146, 162, 203, 255, 60, 97, 193, 255, 67, 106, 210, 255, 65, 104, 206, 255, 63, 101, 203, 255, 60, 99, 201, 255, 57, 98, 199, 255, 57, 96, 196, 255, 56, 93, 192, 255, 60, 94, 183, 255, 71, 95, 159, 255, 180, 182, 185, 255, 191, 191, 191, 253, 118, 117, 117, 158, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 240, 237, 237, 237, 254, 156, 162, 174, 255, 116, 147, 224, 255, 90, 128, 221, 255, 85, 126, 224, 255, 84, 125, 225, 255, 83, 125, 225, 255, 84, 124, 224, 255, 83, 124, 224, 255, 80, 122, 223, 255, 79, 120, 220, 255, 219, 228, 251, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 123, 146, 207, 255, 60, 101, 208, 255, 69, 108, 208, 255, 65, 105, 206, 255, 63, 103, 203, 255, 61, 100, 200, 255, 61, 99, 198, 255, 62, 98, 190, 255, 70, 99, 172, 255, 117, 125, 144, 255, 237, 237, 237, 254, 137, 136, 136, 240, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 250, 221, 222, 222, 255, 159, 171, 203, 255, 109, 141, 223, 255, 94, 132, 225, 255, 89, 130, 229, 255, 89, 129, 227, 255, 87, 128, 227, 255, 87, 128, 227, 255, 82, 124, 225, 255, 92, 131, 227, 255, 252, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 167, 186, 232, 255, 57, 101, 208, 255, 71, 112, 210, 255, 67, 108, 208, 255, 66, 105, 204, 255, 64, 104, 201, 255, 66, 103, 194, 255, 73, 104, 180, 255, 94, 108, 145, 255, 217, 217, 218, 255, 184, 183, 183, 250, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 254, 202, 203, 203, 255, 162, 178, 217, 255, 110, 143, 224, 255, 98, 135, 227, 255, 93, 133, 232, 255, 91, 132, 231, 255, 90, 131, 232, 255, 89, 130, 230, 255, 82, 124, 227, 255, 184, 203, 249, 255, 255, 255, 255, 255, 255, 255, 255, 255, 244, 250, 255, 255, 101, 135, 223, 255, 70, 111, 214, 255, 73, 114, 213, 255, 71, 112, 209, 255, 69, 109, 206, 255, 71, 108, 199, 255, 78, 109, 184, 255, 94, 112, 154, 255, 193, 194, 196, 255, 211, 211, 211, 254, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 234, 225, 225, 225, 255, 202, 203, 203, 255, 175, 187, 216, 255, 124, 153, 230, 255, 104, 139, 229, 255, 99, 138, 234, 255, 97, 135, 233, 255, 92, 133, 233, 255, 91, 131, 231, 255, 87, 129, 231, 255, 145, 173, 242, 255, 165, 189, 245, 255, 104, 140, 230, 255, 74, 116, 218, 255, 79, 120, 218, 255, 77, 118, 214, 255, 77, 115, 209, 255, 79, 114, 199, 255, 84, 114, 185, 255, 102, 117, 154, 255, 193, 194, 196, 255, 225, 225, 225, 255, 136, 135, 135, 234, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 234, 211, 211, 211, 254, 221, 222, 222, 255, 186, 191, 204, 255, 154, 178, 238, 255, 116, 148, 229, 255, 105, 141, 231, 255, 102, 140, 232, 255, 98, 138, 233, 255, 93, 133, 231, 255, 82, 124, 228, 255, 77, 121, 225, 255, 82, 123, 223, 255, 87, 125, 221, 255, 86, 123, 215, 255, 87, 122, 207, 255, 88, 120, 198, 255, 94, 119, 181, 255, 128, 136, 155, 255, 218, 218, 219, 255, 211, 211, 211, 254, 136, 135, 135, 234, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 250, 237, 237, 237, 254, 199, 200, 202, 255, 184, 191, 210, 255, 156, 177, 230, 255, 124, 153, 226, 255, 113, 145, 225, 255, 108, 141, 224, 255, 103, 137, 222, 255, 100, 135, 220, 255, 98, 133, 215, 255, 99, 129, 208, 255, 97, 126, 200, 255, 104, 126, 183, 255, 127, 136, 159, 255, 185, 186, 190, 255, 237, 237, 237, 254, 184, 183, 183, 250, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 240, 191, 191, 191, 253, 235, 235, 235, 254, 218, 218, 219, 255, 189, 191, 196, 255, 169, 175, 190, 255, 153, 163, 191, 255, 141, 154, 191, 255, 136, 149, 184, 255, 134, 145, 172, 255, 143, 149, 166, 255, 168, 170, 176, 255, 213, 214, 215, 255, 235, 235, 235, 254, 191, 191, 191, 253, 137, 136, 136, 240, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 241, 159, 159, 159, 246, 192, 192, 192, 253, 218, 218, 218, 255, 237, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 237, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 253, 159, 159, 159, 246, 121, 120, 120, 241, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
var icon_question = {
    width: 32,
    height: 32,
    bytes: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 242, 159, 159, 159, 249, 192, 192, 192, 254, 218, 218, 218, 255, 237, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 237, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 254, 159, 159, 159, 249, 121, 120, 120, 242, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 242, 191, 191, 191, 254, 235, 235, 235, 255, 206, 207, 209, 255, 136, 142, 157, 255, 94, 105, 136, 255, 76, 92, 137, 255, 67, 85, 143, 255, 67, 85, 148, 255, 71, 88, 148, 255, 89, 102, 150, 255, 126, 134, 164, 255, 198, 201, 209, 255, 235, 235, 235, 255, 191, 191, 191, 254, 137, 136, 136, 242, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 252, 237, 237, 237, 255, 173, 175, 180, 255, 84, 97, 129, 255, 54, 79, 142, 255, 52, 83, 162, 255, 56, 89, 173, 255, 62, 91, 178, 255, 64, 92, 186, 255, 64, 92, 192, 255, 62, 89, 196, 255, 58, 85, 202, 255, 52, 80, 206, 255, 52, 75, 189, 255, 71, 88, 160, 255, 162, 167, 186, 255, 237, 237, 237, 255, 184, 183, 183, 252, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 236, 211, 211, 211, 255, 217, 217, 217, 255, 93, 104, 129, 255, 35, 65, 134, 255, 30, 65, 150, 255, 42, 75, 156, 255, 51, 83, 163, 255, 56, 87, 171, 255, 54, 85, 174, 255, 51, 81, 176, 255, 53, 83, 184, 255, 60, 89, 195, 255, 59, 86, 198, 255, 54, 82, 202, 255, 50, 78, 206, 255, 45, 74, 209, 255, 43, 69, 201, 255, 79, 95, 162, 255, 208, 210, 216, 255, 211, 211, 211, 255, 136, 135, 135, 236, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 236, 225, 225, 225, 255, 191, 192, 193, 255, 59, 78, 122, 255, 12, 51, 138, 255, 21, 58, 143, 255, 31, 66, 148, 255, 40, 74, 155, 255, 48, 80, 161, 255, 51, 83, 166, 255, 96, 119, 178, 255, 133, 146, 186, 255, 114, 130, 182, 255, 60, 84, 175, 255, 56, 85, 196, 255, 56, 84, 201, 255, 53, 81, 203, 255, 50, 79, 205, 255, 48, 75, 206, 255, 46, 74, 209, 255, 54, 77, 176, 255, 173, 178, 194, 255, 225, 225, 225, 255, 136, 135, 135, 236, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 255, 191, 192, 192, 255, 56, 78, 127, 255, 7, 48, 139, 255, 13, 52, 140, 255, 19, 56, 142, 255, 29, 64, 147, 255, 36, 71, 153, 255, 40, 74, 157, 255, 119, 136, 184, 255, 212, 211, 212, 255, 216, 214, 214, 255, 221, 218, 217, 255, 164, 171, 195, 255, 56, 82, 180, 255, 59, 86, 198, 255, 56, 84, 201, 255, 54, 82, 202, 255, 53, 81, 204, 255, 51, 80, 204, 255, 51, 79, 205, 255, 52, 76, 183, 255, 178, 182, 195, 255, 212, 212, 212, 255, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 252, 217, 217, 217, 255, 67, 85, 125, 255, 5, 48, 142, 255, 12, 52, 143, 255, 13, 52, 142, 255, 18, 55, 143, 255, 25, 61, 145, 255, 32, 68, 150, 255, 44, 78, 157, 255, 175, 181, 197, 255, 198, 196, 199, 255, 190, 190, 195, 255, 194, 194, 198, 255, 212, 211, 214, 255, 83, 104, 182, 255, 58, 86, 194, 255, 61, 89, 196, 255, 59, 86, 198, 255, 56, 84, 201, 255, 55, 84, 201, 255, 55, 83, 201, 255, 55, 83, 202, 255, 54, 78, 173, 255, 207, 209, 215, 255, 185, 184, 184, 252, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 242, 237, 237, 237, 255, 110, 117, 134, 255, 9, 50, 145, 255, 14, 54, 147, 255, 13, 53, 145, 255, 13, 53, 144, 255, 15, 54, 144, 255, 21, 59, 146, 255, 29, 65, 148, 255, 36, 72, 154, 255, 151, 160, 185, 255, 194, 191, 191, 255, 183, 182, 186, 255, 191, 188, 191, 255, 199, 201, 209, 255, 76, 102, 184, 255, 60, 89, 190, 255, 63, 90, 192, 255, 62, 90, 194, 255, 61, 89, 196, 255, 61, 87, 197, 255, 59, 86, 197, 255, 59, 86, 196, 255, 56, 85, 197, 255, 79, 97, 160, 255, 236, 236, 236, 255, 137, 136, 136, 242, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 118, 117, 117, 158, 191, 191, 191, 254, 184, 184, 185, 255, 40, 70, 141, 255, 15, 55, 153, 255, 17, 56, 151, 255, 15, 54, 148, 255, 14, 54, 146, 255, 15, 54, 145, 255, 19, 56, 146, 255, 27, 64, 150, 255, 30, 66, 152, 255, 65, 94, 163, 255, 152, 161, 185, 255, 180, 181, 190, 255, 178, 182, 197, 255, 111, 131, 191, 255, 58, 87, 180, 255, 63, 92, 184, 255, 63, 92, 187, 255, 63, 92, 190, 255, 63, 91, 192, 255, 62, 91, 192, 255, 62, 91, 193, 255, 62, 90, 193, 255, 61, 90, 192, 255, 51, 80, 188, 255, 159, 165, 185, 255, 192, 192, 192, 254, 118, 117, 117, 158, 0, 0, 0, 0], [107, 106, 106, 37, 121, 120, 120, 242, 235, 235, 235, 255, 115, 123, 142, 255, 22, 63, 163, 255, 18, 59, 157, 255, 18, 59, 155, 255, 17, 56, 152, 255, 15, 56, 150, 255, 15, 55, 148, 255, 18, 56, 148, 255, 23, 61, 150, 255, 31, 68, 152, 255, 31, 68, 153, 255, 33, 70, 155, 255, 50, 82, 162, 255, 49, 81, 165, 255, 50, 82, 171, 255, 61, 91, 176, 255, 63, 92, 180, 255, 63, 92, 183, 255, 63, 92, 185, 255, 63, 92, 186, 255, 63, 92, 187, 255, 63, 91, 187, 255, 62, 91, 187, 255, 61, 90, 187, 255, 59, 89, 187, 255, 71, 91, 158, 255, 233, 233, 234, 255, 122, 121, 121, 242, 107, 106, 106, 37], [107, 106, 106, 96, 159, 159, 159, 249, 212, 212, 212, 255, 74, 98, 155, 255, 40, 79, 173, 255, 24, 64, 163, 255, 19, 60, 158, 255, 19, 60, 157, 255, 17, 58, 154, 255, 17, 58, 152, 255, 18, 56, 151, 255, 20, 60, 150, 255, 24, 62, 151, 255, 45, 79, 157, 255, 94, 113, 161, 255, 97, 115, 161, 255, 101, 119, 163, 255, 61, 87, 157, 255, 55, 86, 171, 255, 60, 90, 174, 255, 61, 91, 177, 255, 63, 92, 178, 255, 63, 92, 181, 255, 63, 92, 182, 255, 63, 91, 182, 255, 62, 91, 182, 255, 61, 90, 182, 255, 60, 89, 182, 255, 51, 80, 172, 255, 190, 194, 205, 255, 160, 160, 160, 249, 107, 106, 106, 96], [107, 106, 106, 148, 192, 192, 192, 254, 160, 162, 166, 255, 55, 89, 174, 255, 44, 84, 178, 255, 40, 79, 173, 255, 23, 64, 163, 255, 20, 62, 161, 255, 20, 61, 158, 255, 18, 59, 155, 255, 18, 59, 153, 255, 19, 59, 153, 255, 14, 54, 150, 255, 76, 103, 168, 255, 209, 206, 208, 255, 211, 208, 209, 255, 215, 212, 212, 255, 90, 109, 160, 255, 43, 78, 163, 255, 55, 86, 167, 255, 58, 89, 171, 255, 59, 90, 173, 255, 60, 90, 174, 255, 61, 91, 176, 255, 61, 91, 176, 255, 60, 90, 176, 255, 59, 89, 176, 255, 58, 87, 176, 255, 53, 84, 176, 255, 115, 128, 162, 255, 193, 193, 193, 254, 107, 106, 106, 148], [107, 106, 106, 192, 218, 218, 218, 255, 130, 136, 149, 255, 44, 85, 183, 255, 48, 86, 183, 255, 48, 86, 181, 255, 40, 80, 174, 255, 23, 65, 165, 255, 20, 62, 162, 255, 20, 61, 160, 255, 19, 60, 157, 255, 19, 60, 155, 255, 14, 54, 152, 255, 63, 93, 166, 255, 206, 206, 211, 255, 204, 204, 209, 255, 213, 211, 213, 255, 122, 135, 168, 255, 30, 65, 148, 255, 50, 83, 165, 255, 52, 84, 164, 255, 54, 85, 167, 255, 55, 86, 168, 255, 55, 86, 170, 255, 56, 86, 171, 255, 56, 86, 171, 255, 55, 86, 171, 255, 53, 85, 171, 255, 53, 84, 172, 255, 68, 89, 147, 255, 218, 218, 218, 255, 107, 106, 106, 192], [107, 106, 106, 225, 237, 237, 237, 255, 107, 118, 148, 255, 51, 91, 192, 255, 51, 90, 187, 255, 50, 89, 184, 255, 50, 87, 182, 255, 41, 81, 176, 255, 25, 68, 167, 255, 21, 63, 164, 255, 21, 62, 162, 255, 20, 61, 160, 255, 19, 59, 156, 255, 31, 69, 160, 255, 177, 182, 196, 255, 196, 195, 198, 255, 191, 191, 196, 255, 190, 190, 196, 255, 84, 103, 152, 255, 29, 64, 150, 255, 44, 79, 162, 255, 48, 81, 162, 255, 49, 81, 162, 255, 50, 82, 163, 255, 50, 82, 164, 255, 50, 82, 165, 255, 49, 82, 165, 255, 49, 81, 165, 255, 48, 80, 165, 255, 53, 79, 147, 255, 237, 237, 237, 255, 107, 106, 106, 225], [107, 106, 106, 248, 251, 251, 251, 255, 97, 112, 152, 255, 54, 96, 199, 255, 53, 93, 191, 255, 52, 92, 190, 255, 51, 91, 187, 255, 52, 90, 184, 255, 46, 84, 180, 255, 31, 71, 171, 255, 22, 64, 166, 255, 20, 62, 163, 255, 21, 62, 161, 255, 14, 56, 157, 255, 95, 117, 173, 255, 192, 188, 188, 255, 180, 180, 184, 255, 182, 182, 187, 255, 193, 193, 196, 255, 101, 119, 162, 255, 28, 62, 146, 255, 39, 74, 158, 255, 42, 75, 158, 255, 42, 76, 158, 255, 42, 76, 158, 255, 42, 76, 158, 255, 42, 75, 160, 255, 41, 75, 160, 255, 41, 74, 158, 255, 47, 75, 148, 255, 251, 251, 251, 255, 107, 106, 106, 248], [107, 106, 106, 248, 251, 251, 251, 255, 99, 116, 159, 255, 59, 100, 204, 255, 55, 95, 196, 255, 54, 94, 195, 255, 53, 93, 192, 255, 52, 92, 190, 255, 52, 91, 187, 255, 51, 89, 183, 255, 42, 82, 178, 255, 32, 72, 171, 255, 23, 64, 166, 255, 20, 61, 162, 255, 20, 61, 161, 255, 94, 116, 172, 255, 177, 177, 183, 255, 178, 177, 182, 255, 186, 186, 191, 255, 214, 212, 214, 255, 133, 146, 181, 255, 24, 60, 144, 255, 32, 69, 156, 255, 34, 70, 154, 255, 34, 69, 154, 255, 34, 69, 153, 255, 35, 70, 153, 255, 34, 69, 154, 255, 35, 70, 154, 255, 43, 73, 144, 255, 251, 251, 251, 255, 107, 106, 106, 248], [107, 106, 106, 225, 237, 237, 237, 255, 118, 131, 163, 255, 62, 103, 208, 255, 59, 99, 202, 255, 59, 99, 199, 255, 56, 96, 196, 255, 55, 95, 194, 255, 54, 93, 192, 255, 53, 92, 190, 255, 53, 92, 186, 255, 51, 89, 183, 255, 43, 82, 178, 255, 33, 73, 172, 255, 22, 64, 165, 255, 12, 55, 161, 255, 78, 104, 171, 255, 181, 180, 186, 255, 192, 191, 195, 255, 209, 208, 214, 255, 237, 236, 236, 255, 92, 114, 164, 255, 18, 56, 147, 255, 30, 66, 153, 255, 30, 66, 153, 255, 30, 66, 152, 255, 31, 66, 152, 255, 32, 66, 151, 255, 33, 68, 152, 255, 44, 71, 138, 255, 237, 237, 237, 255, 107, 106, 106, 225], [107, 106, 106, 192, 218, 218, 218, 255, 142, 148, 165, 255, 71, 110, 213, 255, 59, 100, 205, 255, 61, 102, 204, 255, 60, 100, 201, 255, 59, 97, 198, 255, 56, 96, 196, 255, 54, 94, 194, 255, 54, 93, 191, 255, 53, 92, 187, 255, 52, 91, 186, 255, 51, 90, 183, 255, 46, 84, 180, 255, 36, 76, 173, 255, 19, 62, 165, 255, 117, 135, 184, 255, 211, 208, 209, 255, 216, 216, 222, 255, 239, 238, 239, 255, 187, 194, 213, 255, 23, 59, 145, 255, 25, 63, 154, 255, 28, 65, 153, 255, 29, 65, 153, 255, 29, 65, 152, 255, 29, 65, 151, 255, 28, 64, 150, 255, 68, 89, 139, 255, 218, 218, 218, 255, 107, 106, 106, 192], [107, 106, 106, 148, 192, 192, 192, 254, 168, 170, 176, 255, 94, 130, 218, 255, 62, 104, 212, 255, 61, 103, 207, 255, 62, 102, 205, 255, 61, 101, 203, 255, 59, 99, 201, 255, 58, 97, 197, 255, 56, 95, 195, 255, 48, 87, 190, 255, 43, 84, 185, 255, 51, 92, 188, 255, 52, 91, 185, 255, 52, 90, 183, 255, 39, 79, 176, 255, 91, 120, 191, 255, 233, 233, 235, 255, 237, 236, 239, 255, 242, 241, 244, 255, 235, 235, 241, 255, 49, 80, 155, 255, 25, 65, 157, 255, 29, 66, 156, 255, 30, 66, 155, 255, 30, 66, 153, 255, 32, 68, 153, 255, 23, 61, 150, 255, 127, 138, 163, 255, 193, 193, 193, 254, 107, 106, 106, 148], [107, 106, 106, 96, 159, 159, 159, 249, 214, 214, 214, 255, 132, 152, 206, 255, 78, 117, 221, 255, 61, 103, 212, 255, 63, 104, 211, 255, 62, 102, 207, 255, 61, 102, 204, 255, 60, 100, 202, 255, 54, 95, 198, 255, 121, 144, 207, 255, 112, 133, 184, 255, 45, 82, 174, 255, 39, 80, 180, 255, 38, 80, 180, 255, 31, 72, 173, 255, 132, 153, 206, 255, 253, 252, 250, 255, 248, 248, 250, 255, 249, 248, 252, 255, 245, 246, 247, 255, 72, 101, 168, 255, 40, 79, 166, 255, 44, 81, 165, 255, 44, 80, 163, 255, 43, 79, 162, 255, 43, 78, 161, 255, 36, 71, 151, 255, 203, 205, 210, 255, 160, 160, 160, 249, 107, 106, 106, 96], [107, 106, 106, 37, 121, 120, 120, 242, 235, 235, 235, 255, 157, 163, 180, 255, 107, 141, 232, 255, 62, 105, 215, 255, 65, 106, 215, 255, 64, 105, 212, 255, 63, 104, 208, 255, 61, 103, 206, 255, 52, 94, 202, 255, 183, 196, 234, 255, 255, 255, 250, 255, 194, 201, 218, 255, 139, 155, 197, 255, 119, 141, 194, 255, 153, 170, 209, 255, 242, 243, 248, 255, 254, 253, 255, 255, 250, 250, 253, 255, 250, 250, 252, 255, 232, 234, 242, 255, 56, 89, 170, 255, 42, 80, 171, 255, 44, 81, 168, 255, 44, 80, 166, 255, 42, 79, 164, 255, 36, 74, 160, 255, 80, 102, 152, 255, 235, 235, 235, 255, 121, 120, 120, 242, 107, 106, 106, 37], [0, 0, 0, 0, 118, 117, 117, 158, 191, 191, 191, 254, 195, 195, 195, 255, 146, 167, 225, 255, 83, 122, 226, 255, 64, 106, 217, 255, 68, 109, 216, 255, 66, 107, 214, 255, 63, 104, 211, 255, 54, 97, 206, 255, 182, 197, 238, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 252, 252, 254, 255, 248, 248, 250, 255, 255, 255, 253, 255, 170, 184, 217, 255, 38, 76, 172, 255, 44, 82, 174, 255, 44, 81, 172, 255, 43, 80, 168, 255, 42, 79, 166, 255, 30, 66, 156, 255, 177, 181, 191, 255, 191, 191, 191, 254, 118, 117, 117, 158, 0, 0, 0, 0], [0, 0, 0, 0, 107, 106, 106, 64, 137, 136, 136, 242, 237, 237, 237, 255, 174, 177, 186, 255, 122, 154, 237, 255, 69, 111, 223, 255, 68, 109, 219, 255, 69, 110, 217, 255, 66, 107, 215, 255, 55, 99, 209, 255, 177, 195, 241, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 253, 255, 255, 255, 252, 255, 212, 218, 237, 255, 68, 102, 186, 255, 43, 82, 178, 255, 46, 85, 176, 255, 44, 83, 175, 255, 43, 81, 173, 255, 31, 71, 165, 255, 101, 118, 161, 255, 237, 237, 237, 255, 137, 136, 136, 242, 107, 106, 106, 64, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124, 152, 184, 183, 183, 252, 222, 222, 222, 255, 183, 192, 218, 255, 110, 145, 236, 255, 66, 109, 223, 255, 69, 110, 221, 255, 69, 110, 219, 255, 63, 106, 216, 255, 86, 124, 221, 255, 174, 193, 242, 255, 235, 241, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 250, 252, 255, 255, 231, 234, 248, 255, 163, 181, 227, 255, 68, 104, 194, 255, 44, 85, 185, 255, 51, 90, 184, 255, 49, 87, 181, 255, 48, 86, 180, 255, 36, 76, 174, 255, 64, 93, 164, 255, 219, 219, 220, 255, 184, 183, 183, 252, 124, 124, 124, 152, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 131, 131, 131, 216, 211, 211, 211, 255, 206, 206, 206, 255, 186, 199, 233, 255, 112, 146, 237, 255, 70, 113, 226, 255, 66, 109, 222, 255, 70, 111, 221, 255, 63, 105, 216, 255, 56, 101, 214, 255, 72, 112, 216, 255, 95, 130, 219, 255, 114, 144, 223, 255, 114, 144, 221, 255, 94, 127, 214, 255, 68, 106, 203, 255, 48, 89, 194, 255, 51, 92, 193, 255, 54, 94, 193, 255, 52, 92, 188, 255, 52, 91, 186, 255, 41, 81, 181, 255, 62, 94, 174, 255, 197, 198, 203, 255, 211, 211, 211, 255, 131, 131, 131, 216, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 136, 135, 135, 236, 225, 225, 225, 255, 206, 206, 206, 255, 191, 200, 223, 255, 129, 158, 239, 255, 83, 124, 232, 255, 65, 109, 224, 255, 68, 110, 222, 255, 69, 110, 219, 255, 65, 106, 217, 255, 61, 103, 214, 255, 56, 100, 211, 255, 55, 97, 207, 255, 55, 99, 205, 255, 58, 99, 203, 255, 60, 100, 202, 255, 59, 99, 199, 255, 56, 96, 196, 255, 51, 93, 193, 255, 40, 82, 187, 255, 85, 112, 179, 255, 199, 200, 203, 255, 225, 225, 225, 255, 136, 135, 135, 236, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 78, 136, 135, 135, 236, 211, 211, 211, 255, 222, 222, 222, 255, 195, 198, 206, 255, 161, 181, 233, 255, 107, 143, 237, 255, 76, 119, 231, 255, 68, 111, 224, 255, 68, 110, 221, 255, 69, 110, 219, 255, 66, 109, 217, 255, 65, 107, 214, 255, 64, 105, 212, 255, 61, 103, 209, 255, 60, 101, 206, 255, 55, 97, 203, 255, 48, 90, 198, 255, 59, 96, 195, 255, 134, 148, 184, 255, 221, 221, 221, 255, 211, 211, 211, 255, 136, 135, 135, 236, 107, 106, 106, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 67, 131, 131, 131, 216, 184, 183, 183, 252, 237, 237, 237, 255, 202, 202, 202, 255, 190, 194, 207, 255, 155, 173, 223, 255, 105, 140, 232, 255, 76, 117, 227, 255, 64, 107, 224, 255, 65, 109, 224, 255, 63, 107, 221, 255, 59, 103, 216, 255, 56, 100, 212, 255, 62, 104, 209, 255, 83, 117, 204, 255, 138, 152, 191, 255, 196, 197, 202, 255, 237, 237, 237, 255, 184, 183, 183, 252, 131, 131, 131, 216, 107, 106, 106, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 34, 124, 124, 124, 152, 137, 136, 136, 242, 191, 191, 191, 254, 235, 235, 235, 255, 218, 218, 218, 255, 191, 192, 195, 255, 175, 180, 196, 255, 154, 167, 202, 255, 125, 142, 192, 255, 120, 137, 190, 255, 136, 152, 197, 255, 161, 170, 197, 255, 180, 182, 192, 255, 218, 217, 218, 255, 235, 235, 235, 255, 191, 191, 191, 254, 137, 136, 136, 242, 124, 124, 124, 152, 107, 106, 106, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 64, 118, 117, 117, 158, 121, 120, 120, 242, 159, 159, 159, 249, 192, 192, 192, 254, 218, 218, 218, 255, 237, 237, 237, 255, 251, 251, 251, 255, 251, 251, 251, 255, 237, 237, 237, 255, 218, 218, 218, 255, 192, 192, 192, 254, 159, 159, 159, 249, 121, 120, 120, 242, 118, 117, 117, 158, 107, 106, 106, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 106, 106, 37, 107, 106, 106, 96, 107, 106, 106, 148, 107, 106, 106, 192, 107, 106, 106, 225, 107, 106, 106, 248, 107, 106, 106, 248, 107, 106, 106, 225, 107, 106, 106, 192, 107, 106, 106, 148, 107, 106, 106, 96, 107, 106, 106, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
};
var vd_HW = [icon_error, icon_exclamation, icon_information, icon_question];
function vd_JA(vd_i, vd_S) {
    var arr = [];
    var vd_U = Object.create(arr);
    var vd_pf = 0;
    var vd_iB = false;
    function vd_zG(vd_bq, onfinish, vd_ig) {
        var vd_gm = document.getElementsByTagName('head')[0];
        var js1 = document.createElement('script');
        js1.setAttribute('type', 'text/javascript');
        js1.setAttribute('src', vd_bq);
        vd_gm.appendChild(js1);
        try {
            js1.onerror = function(e) {
                vd_gm.removeChild(js1);
                if (onfinish) onfinish(vd_S, 1, vd_bq);
            };
            js1.onreadystatechange = function(e) {
                if (e.readyState == "loaded" || e.readyState == 'complete' || e.target.readyState == "loaded" || e.target.readyState == 'complete') {
                    e.readyState = "complete";
                    vd_gm.removeChild(js1);
                    if (tmpnotes) {
                        vd_U.FromStreamData(tmpnotes, vd_ig);
                        if (onfinish) onfinish(vd_S, 0, vd_bq);
                    } else {
                        if (onfinish) onfinish(vd_S, 2, vd_bq);
                    }
                }
            };
            js1.onload = function(e) {
                e.readyState = 'complete';
                e.target.onreadystatechange(e);
            }
        } catch(ex) {
            vd_gm.removeChild(js1);
            if (onfinish) onfinish(vd_S, 3, vd_bq);
        }
    };
    vd_U.LoadFromFile = function(vd_bq, onfinish, vd_ig, async, vd_kX) {
        tmpnotes = null;
        var _url = vd_bq;
        if (vd_kX) _url += "?timestamp=" + new Date().getTime();
        var vd_cm;
        if (window.XMLHttpRequest) {
            vd_cm = new XMLHttpRequest();
        } else {
            vd_cm = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (!vd_cm) {
            if (onfinish) onfinish(vd_S, 4, vd_bq);
            return;
        }
        try {
            vd_cm.onreadystatechange = function() {
                if (vd_cm.readyState == 4) {
                    if (vd_cm.status === 200 || vd_cm.status == 0) {
                        var vd_jj = vd_cm.responseText;
                        if (vd_jj) {
                            try {
                                eval(vd_jj);
                                if (tmpnotes) {
                                    vd_U.FromStreamData(tmpnotes, vd_ig);
                                    if (onfinish) onfinish(vd_S, 0, vd_bq);
                                } else {
                                    if (onfinish) onfinish(vd_S, 5, vd_bq);
                                }
                            } catch(ex) {
                                if (onfinish) onfinish(vd_S, 6, vd_bq);
                            }
                        } else {
                            vd_zG(vd_bq, onfinish, vd_ig);
                        }
                    } else {
                        if (onfinish) onfinish(vd_S, 7, vd_bq);
                    }
                }
            };
            vd_cm.open("GET", _url, async ? true: false);
            vd_cm.send();
        } catch(ex) {
            vd_zG(vd_bq, onfinish, vd_ig);
        }
    };
    vd_U.FromStreamData = function(vd_jj, vd_ig) {
        var items = vd_jj.split("'");
        if (items && items.length > 1) {
            vd_jj = items[1];
        }
        vd_jj = base64.vd_wV(vd_jj);
        if (!vd_ig) {
            vd_U.clear();
        }
        items = vd_jj.split('##');
        for (var i = 0; i < items.length; i++) {
            var note = new vd_ww();
            var vd_Ko = note.vd_Ed(items[i]);
            if (vd_Ko > 0) {
                vd_U.push(note);
                vd_CD(note);
            }
        }
        tmpnotes = null;
        vd_iB = false;
    };
    vd_U.ToStreamData = function() {
        var ret = "";
        for (var i = 0; i < vd_U.length; i++) {
            var note = vd_U[i];
            ret += note.toString(8) + '##';
        }
        var str = base64.vd_Ej(ret);
        return "tmpnotes ='" + str + "';";
    };
    Object.defineProperty(vd_U, 'IsModified', {
        get: function() {
            return vd_iB;
        }
    });
    vd_U.clear = function() {
        for (var i = 0; i < vd_U.length; i++) {
            var note = vd_U[i];
            vd_U[('n_' + note.HandleId.toString())] = undefined;
        }
        vd_pf = 0;
        vd_U.length = 0;
    };
    vd_U.AddNote = function(title, description, viewtype, origin) {
        var note = new vd_ww();
        if (title !== undefined) note.title = title.substr(0, vdConst.NOTE_LIMIT_TITLE);
        if (description !== undefined) note.description = description.substr(0, vdConst.NOTE_LIMIT_DESC);
        if (viewtype !== undefined) note.viewtype = viewtype;
        note.layout = vd_i.ActiveLayOut;
        var render = vd_S.vd_p();
        var vd_hY = origin;
        if (origin === undefined) {
            origin = [render.vd_cO + render.width / 2.0, render.vd_cO + render.height / 2.0, 1.0];
            origin[Z] = render.vd_Y.vd_kd(origin[X], origin[Y]);
            vd_hY = render.vd_mR(origin[X], origin[Y], origin[Z]);
        }
        note.vd_wQ(vd_hY);
        vd_U.push(note);
        vd_CD(note);
        vd_iB = true;
        return vd_U.length - 1;
    };
    function vd_CD(note) {
        if (!vd_pf) vd_pf = 0;
        vd_pf++;
        note.HandleId = vd_pf;
        vd_U[('n_' + note.HandleId.toString())] = note;
    };
    vd_U.vd_nz = function(render) {
        if (vd_U.length == 0) return;
        var vd_ox = render.vd_bm.vd_eW;
        render.vd_bm.vd_eW = false;
        var vd_cd = render.vd_ee;
        render.vd_ee = false;
        var vd_HR = render.vd_bm.GetImageInterpolationMode();
        render.vd_bm.SetImageInterpolationMode(vdConst.InterpolationMode_Nearest);
        render.vd_Y.vd_fK = true;
        var vd_wg = render.vd_bu;
        render.vd_bu = true;
        var vd_Ke = render.vd_bm.IgnoreLockLayers;
        render.vd_bm.IgnoreLockLayers = true;
        render.vd_ew();
        var vd_mi = vdgeo.vd_bo(render.vd_aS());
        var vd_bd = vdgeo.vd_bY(render.vd_aS());
        var vd_dx = render.vd_aZ([255, 255, 255, vdConst.NOTE_TRANSPARENT]);
        render.vd_bf(vd_mi);
        try {
            for (var i = 0; i < vd_U.length; i++) {
                vd_U[i].draw(render, vd_bd);
            }
        } catch(ex) {}
        render.vd_bg();
        render.vd_aZ(vd_dx);
        render.vd_bm.SetImageInterpolationMode(vd_HR);
        render.vd_bm.IgnoreLockLayers = vd_Ke;
        render.vd_bu = vd_wg;
        render.vd_ee = vd_cd;
        render.vd_bm.vd_eW = vd_ox;
        render.vd_ew();
    };
    function vd_ww() {
        var vd_Dn = new vdConst.vd_Bf();
        var vd_U = Object.create(vd_Dn);
        vd_U.clone = function() {
            var ret = new vd_ww();
            ret.HandleId = vd_U.HandleId;
            ret.layout = vd_U.layout;
            ret.vd_hZ = vd_U.vd_hZ;
            ret.vd_hF = vd_U.vd_hF;
            ret.vd_aU = vd_U.vd_aU;
            ret.viewtype = vd_jc;
            ret.title = vd_ka;
            ret.vd_km = vd_km;
            ret.position = vd_gp;
            ret.Deleted = vd_tb;
            return ret;
        };
        vd_U.HandleId = 0;
        vd_U.layout = 'h_0';
        vd_U.vd_hZ = [0, 0, 1];
        vd_U.vd_hF = 0.0;
        vd_U.vd_aU = 0.0;
        var vd_jc = 1;
        var vd_ka = 'No title';
        var vd_km = 'No description';
        var vd_gp = [0, 0, 0];
        var vd_tb = false;
        Object.defineProperty(vd_U, 'ToolTip', {
            get: function() {
                return vd_ka;
            },
            vd_lY: true
        });
        Object.defineProperty(vd_U, '_t', {
            get: function() {
                return vdConst.vdNote_code;
            },
            vd_lY: true
        });
        Object.defineProperty(vd_U, 'Deleted', {
            get: function() {
                return vd_tb;
            },
            set: function(vd_af) {
                vd_iB = true;
                vd_tb = vd_af;
            },
            vd_lY: true,
            vd_rf: true
        });
        Object.defineProperty(vd_U, 'viewtype', {
            get: function() {
                return vd_jc;
            },
            set: function(vd_af) {
                vd_iB = true;
                vd_jc = vd_af;
            },
            vd_lY: true,
            vd_rf: true
        });
        Object.defineProperty(vd_U, 'title', {
            get: function() {
                return vd_ka;
            },
            set: function(vd_af) {
                vd_iB = true;
                vd_ka = vd_af;
            },
            vd_lY: true,
            vd_rf: true
        });
        Object.defineProperty(vd_U, 'description', {
            get: function() {
                return vd_km;
            },
            set: function(vd_af) {
                vd_iB = true;
                vd_km = vd_af;
            },
            vd_lY: true,
            vd_rf: true
        });
        Object.defineProperty(vd_U, 'position', {
            get: function() {
                return vd_gp;
            },
            set: function(vd_af) {
                vd_iB = true;
                vd_U.vd_wQ(vd_af, true);
                vd_gp = vd_af;
            },
            vd_lY: true,
            vd_rf: true
        });
        vd_U.vd_wQ = function(vd_hY, vd_Du) {
            if (vd_S) {
                var render = vd_S.vd_p();
                var vd_BL = render.vd_aS();
                var vd_AY = vdgeo.vd_bo(vd_BL);
                var vd_Bv = render.vd_gu;
                var vd_Cd = vdgeo.vd_bo(vd_Bv);
                var vd_hZ = vdgeo.vd_ip(vd_AY);
                var vd_hF = vdgeo.vd_lt(vd_AY);
                var vd_Gg = vdgeo.vd_Z(vd_BL, vd_hY);
                var vd_yj = vdgeo.vd_dU(vd_Gg, vd_Bv);
                var z = 1;
                z = vd_yj[Z];
                if (vd_Du || z == 1.0 || vd_hY[Z] == 0.0) {
                    var vd_cn = vdgeo.vd_Z(render.vd_li, vd_yj);
                    z = render.vd_Y.vd_kd(vd_cn[X], vd_cn[Y]);
                    vd_hY = render.vd_mR(vd_cn[X], vd_cn[Y], z);
                }
                var p1 = vdgeo.vd_as(0, 1, z, vd_Cd);
                var p2 = vdgeo.vd_as(0, -1, z, vd_Cd);
                var vd_aU = vdgeo.Distance2D(p1, p2);
                vd_U.vd_hZ = vd_hZ;
                vd_U.vd_hF = vd_hF;
                vd_U.vd_aU = vd_aU;
            }
            vd_gp = vd_hY;
        };
        vd_U.toString = function(precision) {
            var ret = '';
            ret += vdConst.vd_xD(vd_ka) + '^';
            ret += vdConst.vd_xD(vd_km) + '^';
            ret += vdgeo.vd_sa(vd_gp, precision) + '^';
            ret += vdgeo.vd_sa(vd_U.vd_hZ, precision) + '^';
            ret += vdgeo.vd_wl(vd_U.vd_hF, precision) + '^';
            ret += vdgeo.vd_wl(vd_U.vd_aU, precision) + '^';
            ret += vd_jc.toString() + '^';
            ret += vd_U.layout + '^';
            return ret;
        };
        vd_U.vd_Ed = function(str) {
            str = str.trim();
            if (str.length == 0) return 0;
            var items = str.split('^');
            var i = 0;
            if (items.length > i) {
                vd_ka = vdConst.vd_yt(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_km = vdConst.vd_yt(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_gp = vdgeo.vd_sK(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_U.vd_hZ = vdgeo.vd_sK(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_U.vd_hF = Number(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_U.vd_aU = Number(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_jc = Number(items[i]);
                i++;
            } else return i;
            if (items.length > i) {
                vd_U.layout = items[i];
                i++;
            } else return i;
            return i;
        };
        vd_U.setview = function() {
            var vd_bd = vdgeo.vd_s();
            vdgeo.vd_hN(vd_bd, vd_U.vd_hZ);
            vdgeo.vd_ag(vd_bd, vdgeo.VD_TWOPI - vd_U.vd_hF);
            var vd_cL = vdgeo.vd_Z(vd_bd, vd_gp);
            vd_i.ActiveLayOut = vd_U.layout;
            var vd_jt = vd_S.GetActiveLayout();
            var offset = (vd_U.vd_aU * 0.5) / Math.tan(vdgeo.DegreesToRadians(vd_jt.LensAngle / 2.0));
            vd_cL[Z] += offset;
            vd_jt.World2ViewMatrix = vd_bd;
            vd_jt.ViewCenter = vd_cL;
            vd_jt.ViewSize = vd_U.vd_aU;
            setTimeout(vd_S.redraw);
        };
        vd_U.vd_fH = function() {
            return [vd_gp];
        };
        vd_U.vd_mg = function(indexes, offset) {
            for (var i = 0; i < indexes.length; i++) {
                if (indexes[i] === 0) {
                    var pt = [0, 0, 0];
                    vdgeo.vd_cM(pt, vd_gp);
                    pt[X] += offset[X];
                    pt[Y] += offset[Y];
                    pt[Z] += offset[Z];
                    vd_U.vd_wQ(pt, true);
                    return true;
                }
            }
            return false;
        };
        vd_U.vd_Ha = function(render) {
            var vd_mi = vdgeo.vd_bo(render.vd_aS());
            var vd_bd = vdgeo.vd_bY(render.vd_aS());
            var vd_dx = render.vd_aZ([255, 255, 255, vdConst.NOTE_TRANSPARENT]);
            render.vd_bf(vd_mi);
            vd_U.draw(render, vd_bd);
            render.vd_bg();
            render.vd_aZ(vd_dx);
        };
        vd_U.draw = function(render, vd_bd) {
            if (!render.vd_bm || vd_jc <= 0 || vd_tb) return;
            if (!vd_U.layout || vd_U.layout == 'h_0') vd_U.layout = 'h_' + vd_i.Model.HandleId.toString();
            var vd_BX = 'h_0';
            var vd_jt = render.vd_bm.GetActiveLayout();
            if (vd_jt) vd_BX = 'h_' + vd_jt.HandleId.toString();
            if (vd_BX !== vd_U.layout) return;
            var vd_gD = vd_gp;
            var vd_cL = vdgeo.vd_Z(vd_bd, vd_gD);
            var vd_rY = vdgeo.vd_dU(vd_cL, render.vd_cR);
            if (render.vd_Y.vd_Lu(vd_rY[X], vd_rY[Y], vd_rY[Z], false, 0.001)) {
                var vd_wg = render.vd_bu;
                render.vd_bu = false;
                render.vd_mP(vd_U);
                var size = render.vd_bS * vdConst.NOTE_SIZE / 2.0;
                var z = vd_cL[Z];
                if (render.vd_ba) {
                    size = ((vdConst.NOTE_SIZE / 2.0) / (render.height * 0.5)) * (Math.abs(z) * Math.tan(vdgeo.DegreesToRadians(render.vd_Cv / 2.0)));
                }
                var pts = [[vd_cL[X] - size, vd_cL[Y] - size, z], [vd_cL[X] + size, vd_cL[Y] - size, z], [vd_cL[X] + size, vd_cL[Y] + size, z], [vd_cL[X] - size, vd_cL[Y] + size, z]];
                var vd_bO = [0, 0, 1];
                var uvs = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]];
                var vd_yC = vd_HW[(vd_jc - 1) % 4];
                vd_yC.isNoteIcon = true;
                render.vd_oL(pts, vd_bO, uvs, vd_yC, true);
                render.vd_mP(null);
                render.vd_bu = vd_wg;
            }
        };
        return vd_U;
    };
    return vd_U;
};
function vd_jV(vd_xI) {
    return vd_xI !== undefined && vd_xI !== null;
};
function vd_lH(vdcanvas, vd_EM, vd_cI) {
    vdcanvas.ActiveAction().cancel();
    vd_qi = vd_cI;
    vdcanvas.ActiveAction().vd_bJ = vd_EM;
    vdcanvas.ActiveAction().customData = null;
    vdcanvas.GetUserPoint(vd_kI);
};
var vd_qi;
function vd_rZ(action) {
    var vdcanvas = action.vdrawOwner();
    var customData = action.customData;
    if (!action.IsStarted()) {
        action.vd_IH();
        if (action.vd_O === 'select' && action.IsCanceled()) vd_qi = null;
        action.vd_O = null;
    }
    if (customData) {
        for (var k = 0; k < customData.length; k++) {
            var fig = customData[k];
            fig.selected = false;
        }
        vdcanvas.redraw();
        if (vd_qi) vd_qi(action);
    }
};
function vd_ya(mat, vd_bZ, action, vd_ai, vd_df, vdcanvas) {
    var ret = vdgeo.vd_bY(mat);
    if (vd_bZ == 1 || vd_bZ == 4) vdgeo.vd_ae(ret, vd_df[X] - vd_ai[X], vd_df[Y] - vd_ai[Y], vd_df[Z] - vd_ai[Z]);
    else if (vd_bZ == 2) {
        var scale;
        if (Array.isArray(vd_df)) {
            scale = vdgeo.Distance2D(vd_ai, vd_df);
            if (vdcanvas.ActionScaleMode == 1) {
                if (action.vd_bJ && action.vd_bJ.entities) {
                    if (!action.vd_bJ.vd_et) {
                        var vd_kb = new vd_ls();
                        for (var i = 0; i < action.vd_bJ.entities.length; i++) {
                            vd_kb.vd_ty(action.vd_bJ.entities[i].BoundingBox);
                        }
                        if (vd_kb.vd_aL) action.vd_bJ.vd_et = 1.0;
                        else {
                            action.vd_bJ.vd_et = 1.0 / Math.max(vd_kb.vd_bs[0] - vd_kb.vd_aa[0], vd_kb.vd_bs[1] - vd_kb.vd_aa[1]);
                        }
                    }
                    scale *= action.vd_bJ.vd_et;
                }
            }
        } else {
            scale = vd_df;
        }
        if (!vdgeo.AreEqual(scale, 0.0, vdgeo.DefaultLinearEquality)) {
            vdgeo.vd_ae(ret, -vd_ai[X], -vd_ai[Y], -vd_ai[Z]);
            vdgeo.vd_ay(ret, scale, scale, scale);
            vdgeo.vd_ae(ret, vd_ai[X], vd_ai[Y], vd_ai[Z]);
        }
    } else if (vd_bZ == 3) {
        var angle;
        if (Array.isArray(vd_df)) {
            angle = vdgeo.GetAngle(vd_ai, vd_df);
            vd_df = angle;
        } else {
            angle = vd_df;
        }
        vdgeo.vd_ae(ret, -vd_ai[X], -vd_ai[Y], -vd_ai[Z]);
        vdgeo.vd_ag(ret, angle);
        vdgeo.vd_ae(ret, vd_ai[X], vd_ai[Y], vd_ai[Z]);
    }
    return ret;
};
function vd_GW() {
    this.userselectedCount = 0;
    this.ItemIndex = -1;
    this.selectedItem = null;
    this.cancel = false;
    this.finish = false;
    this.action = null;
};
function vd_kI(action, status) {
    if (!action.vd_O) action.vd_O = 'select';
    var vdcanvas = action.vdrawOwner();
    var vd_f = action.vd_eB();
    var render = vd_f[0];
    var vd_eo, from, to, vd_to, fig, p1;
    var k, i;
    if (action.vd_O == 'select') {
        if (status == 'start') {
            if (!action.customData) action.customData = [];
            if (action.vd_bJ && action.vd_bJ.entities) {
                action.customData = action.vd_bJ.entities;
                for (i = 0; i < action.customData.length; i++) {
                    action.customData[i].selected = true;
                }
                if (!action.vd_bJ.vd_ai || !vd_jV(action.vd_bJ.vd_df)) {
                    render.vd_pr(vdConst.ActionHighLightColor);
                    vdcanvas.ActionDrawEntities(action.customData, true);
                    render.vd_nf();
                }
                action.cancel(1);
            } else vdcanvas.Prompt(vdcanvas.MessagesDictionary.SELECT_ENTITIES);
        } else if (status == 'end') {
            vdcanvas.Prompt('');
            if (!action.IsCanceled()) {
                var ret = null;
                if (action.actionType == vdConst.ACTION_POINT_WORLD) {
                    p1 = vdcanvas.WorldToPixel(action.ResValue);
                    fig = vdcanvas.GetEntityFromPoint(p1[X], p1[Y]);
                    if (!fig) {
                        vdcanvas.GetUserRect(vd_kI, action.ResValue);
                    } else {
                        ret = [fig];
                    }
                } else {
                    p1 = vdcanvas.ViewToPixel(action.ResValue[0]);
                    var p2 = vdcanvas.ViewToPixel(action.ResValue[1]);
                    var vd_vY = (p1[X] > p2[X]);
                    if (vd_vY) ret = vdcanvas.GetEntitiesFromBox(p1[X], p1[Y], p2[X], p2[Y]);
                    else ret = vdcanvas.GetEntitiesInWindowBox(p1[X], p1[Y], p2[X], p2[Y]);
                }
                var vd_hs = new vd_GW();
                if (ret && ret.length > 0) {
                    var vd_pB = [];
                    for (i = 0; i < ret.length; i++) {
                        vdcanvas.GroupsManager.vd_BP(ret[i], vd_pB);
                    }
                    if (!action.customData) action.customData = [];
                    for (i = 0; i < vd_pB.length; i++) {
                        var fig = vd_pB[i];
                        fig.vd_AC = undefined;
                        if (fig.selected) continue;
                        if (vdcanvas.vdSelectionModified) {
                            vd_hs.userselectedCount = vd_pB.length;
                            vd_hs.ItemIndex = i;
                            vd_hs.action = action;
                            vd_hs.selectedItem = fig;
                            vd_hs.cancel = false;
                            vdcanvas.vdSelectionModified(vd_hs);
                            if (vd_hs.cancel) continue;
                        }
                        fig.selected = true;
                        action.customData.push(fig);
                        if (vd_hs.finish) break;
                    }
                    render.vd_pr(vdConst.ActionHighLightColor);
                    vdcanvas.ActionDrawEntities(action.customData, true);
                    render.vd_nf();
                }
                if (vd_hs.finish) {
                    if (!action.customData || action.vd_bJ.vd_bZ == 0) {
                        vd_rZ(action);
                        return;
                    }
                    action.vd_O = 'PickReference';
                }
                if (!action.IsStarted()) vdcanvas.GetUserPoint(vd_kI);
            } else {
                if (!action.customData || action.vd_bJ.vd_bZ == 0) {
                    vd_rZ(action);
                    return;
                }
                action.vd_O = 'PickReference';
                vdcanvas.GetUserPoint(vd_kI);
            }
        }
    } else if (action.vd_O == 'PickReference') {
        if (status == 'start') {
            if (action.vd_bJ.vd_ai) {
                action.cancel();
            } else vdcanvas.Prompt(vdcanvas.MessagesDictionary.SPECIFY_REFERENCE_POINT);
        } else if (status == 'end') {
            vdcanvas.Prompt('');
            if (action.vd_bJ.vd_ai) {
                action.vd_O = 'PickPoint2';
                vdcanvas.GetUserLine(vd_kI, action.vd_bJ.vd_ai);
            } else if (!action.IsCanceled()) {
                action.vd_O = 'PickPoint2';
                vdcanvas.GetUserLine(vd_kI, action.ResValue);
            } else {
                vd_rZ(action);
            }
        }
    } else if (action.vd_O == 'PickPoint2') {
        if (status == 'start') {
            if (vd_jV(action.vd_bJ.vd_df)) action.cancel();
            else vdcanvas.Prompt(vdcanvas.MessagesDictionary.SPECIFY_SECOND_POINT);
        } else if (status == 'draw') {
            to = vd_f[1];
            from = vd_f[2];
            vd_eo = vdgeo.vd_s();
            vd_eo = vd_ya(vd_eo, action.vd_bJ.vd_bZ, action, from, to, vdcanvas);
            render.vd_bf(vd_eo);
            render.vd_pr();
            for (k = 0; k < action.customData.length; k++) {
                fig = action.customData[k];
                vdcanvas.DrawEntity(fig, render);
            }
            render.vd_nf();
            render.vd_bg();
        } else if (status == 'end') {
            vdcanvas.Prompt('');
            if (!action.IsCanceled() || vd_jV(action.vd_bJ.vd_df)) {
                if (action.vd_bJ.vd_ai) from = action.vd_bJ.vd_ai;
                else if (Array.isArray(action.ResValue[0])) from = action.ResValue[0];
                else from = action.ResValue;
                if (vd_jV(action.vd_bJ.vd_df)) to = action.vd_bJ.vd_df;
                else if (Array.isArray(action.ResValue[1])) to = action.ResValue[1];
                else to = action.ResValue;
                vd_eo = vdgeo.vd_s();
                vd_eo = vd_ya(vd_eo, action.vd_bJ.vd_bZ, action, from, to, vdcanvas);
                if (action.vd_bJ.vd_bZ == 4) {
                    var entities = vdcanvas.CopyObjects(action.customData);
                    if (action.customData) {
                        for (var k = 0; k < action.customData.length; k++) {
                            var fig = action.customData[k];
                            fig.selected = false;
                        }
                    }
                    action.customData = entities;
                } else {
                    if (action.vd_bJ.vd_bZ == 2) {
                        if (Array.isArray(to)) action.ResValue[1] = vdgeo.Distance2D(from, to);
                        else action.ResValue[1] = to;
                    } else if (action.vd_bJ.vd_bZ == 3) {
                        if (Array.isArray(to)) action.ResValue[1] = vdgeo.GetAngle(from, to);
                        else action.ResValue[1] = to;
                    }
                }
                action.vd_bJ.matrix = vd_eo;
                for (k = 0; k < action.customData.length; k++) {
                    fig = action.customData[k];
                    vd_k.vd_iz(vd_eo, fig, vdcanvas);
                    vdcanvas.UpdateFig(fig);
                }
                vdcanvas.UpdateLayout();
            }
            vd_rZ(action);
        }
    }
};
function vd_xG(vdcanvas) {
    var vd_U = this;
    var vd_S = vdcanvas;
    var vd_bn = [];
    var vd_Bg = [];
    var vd_aD = true;
    var vd_jY = [];
    var vd_jn = null;
    var vd_ac = null;
    this.enableScript = function(vd_tX) {
        var ret = vd_aD;
        vd_aD = vd_tX;
        return ret;
    };
    this.isActive = function() {
        return vd_aD;
    };
    this.getCommands = function() {
        return vd_bn;
    };
    this.clearCommands = function() {
        return vd_bn = [];
    };
    this.parseCommands = function(vd_fy) {
        if (!vd_fy) vd_fy = vd_bn;
        for (var i = 0; i < vd_fy.length; i++) {
            vd_LY(vd_fy[i], false);
        }
    };
    function vd_CO(entities, replace) {
        var k = 0,
        index = 0;
        var fig;
        var h = '';
        var command = '';
        if (replace) vd_U.clearSelection();
        if (entities && entities.length > 0) {
            if (vd_aD) command += 'select ';
            for (k = 0; k < entities.length; k++) {
                fig = entities[k];
                h = 'h_' + fig.HandleId.toString();
                index = vd_jY.indexOf(h);
                if (index == -1) {
                    if (vd_aD) command += h + ' ';
                    vd_jY.push(h);
                }
                if (vd_aD) {
                    if (((k + 1) % 10) == 0) {
                        vd_bn.push(command);
                        command = 'select ';
                    }
                }
            }
            if (vd_aD) vd_bn.push(command);
        }
    };
    this.clearSelection = function() {
        vd_jY = [];
        if (vd_aD) vd_bn.push('select -all');
    };
    this.select = function(entities, vd_aN) {
        vd_jn = vd_aN;
        vd_S.CmdSelect(vd_cI, entities);
    };
    this.erase = function() {
        var k;
        var selection = vd_U.ActiveSelection();
        if (selection.length == 0) return;
        vd_S.UndoHistory().group_start();
        for (k = 0; k < selection.length; k++) {
            fig = selection[k];
            vd_S.UndoHistory().store(fig, "Deleted");
            fig.Deleted = true;
        }
        vd_S.UndoHistory().group_end();
        vd_S.UpdateLayout();
        if (vd_aD) {
            vd_bn.push("erase");
        }
        vd_U.clearSelection();
    };
    this.move = function(from, to, vd_aN) {
        var selection = vd_U.ActiveSelection();
        if (selection.length == 0) return;
        vd_jn = vd_aN;
        vd_S.CmdMove(selection, from, to, vd_cI);
    };
    this.scale = function(from, scale, vd_aN) {
        var selection = vd_U.ActiveSelection();
        if (selection.length == 0) return;
        vd_jn = vd_aN;
        vd_S.CmdScale(selection, from, scale, vd_cI);
    };
    this.rotate = function(from, rotation, vd_aN) {
        var selection = vd_U.ActiveSelection();
        if (selection.length == 0) return;
        vd_jn = vd_aN;
        vd_S.CmdRotate(selection, from, rotation, vd_cI);
    };
    this.copy = function(from, to, vd_aN) {
        var selection = vd_U.ActiveSelection();
        if (selection.length == 0) return;
        vd_jn = vd_aN;
        vd_S.CmdCopy(selection, from, to, vd_cI);
    };
    this.ActiveSelection = function() {
        var ret = [];
        var fig;
        for (k = 0; k < vd_jY.length; k++) {
            fig = vd_S.GetEntityItem(vd_jY[k]);
            if (!fig) continue;
            ret.push(fig);
        }
        return ret;
    };
    function vd_cI(action) {
        var fig;
        var h = '';
        var k = 0;
        var index = 0;
        var command = '';
        if (action.vd_bJ.vd_bZ == 0) {
            vd_CO(action.customData, true);
        } else {
            if (!action.customData || action.customData.length == 0) return;
            if (vd_S.UndoHistory().Enable && action.vd_bJ.matrix) {
                var vd_eo = action.vd_bJ.matrix;
                var vd_to = vdgeo.vd_bo(vd_eo);
                vd_S.UndoHistory().group_start();
                for (k = 0; k < action.customData.length; k++) {
                    fig = action.customData[k];
                    if (action.vd_bJ.vd_bZ == 4) vd_S.UndoHistory().store(fig, "Deleted", true);
                    else vd_S.UndoHistory().store(fig, 'special_transform', [vd_eo, vd_to]);
                }
                vd_S.UndoHistory().group_end();
            }
            if (vd_aD) {
                var vd_oQ = null;
                var vd_nI = null;
                if (action.vd_bJ.vd_bZ === 4) {
                    var vd_i = vd_S.GetDocument();
                    vd_bn.push("chandle " + (vd_i.HandleCurrent - 1).toString());
                }
                if (!action.ResValue) {
                    if (action.vd_bJ) {
                        vd_CO(action.customData, true);
                        vd_oQ = action.vd_bJ.vd_ai;
                        vd_nI = action.vd_bJ.vd_df;
                    }
                } else {
                    vd_oQ = action.ResValue[0];
                    vd_nI = action.ResValue[1];
                }
                if (vd_jV(vd_oQ) && vd_jV(vd_nI)) {
                    command = vd_EZ(action.vd_bJ.vd_bZ, [action.customData, vd_oQ, vd_nI]);
                    vd_bn.push(command);
                }
            }
        }
        if (vd_jn) vd_jn(vd_S);
    };
    function vd_EZ(actionType, vd_y) {
        var command;
        switch (actionType) {
        case 1:
            command = "move {0} {1}";
            command = command.replace("{0}", vd_do(vd_y[1]));
            command = command.replace("{1}", vd_do(vd_y[2]));
            break;
        case 2:
            command = "scale {0} {1}";
            command = command.replace("{0}", vd_do(vd_y[1]));
            command = command.replace("{1}", vd_y[2]);
            break;
        case 3:
            command = "rotate {0} {1}";
            command = command.replace("{0}", vd_do(vd_y[1]));
            command = command.replace("{1}", vd_y[2]);
            break;
        case 4:
            command = "copy {0} {1}";
            command = command.replace("{0}", vd_do(vd_y[1]));
            command = command.replace("{1}", vd_do(vd_y[2]));
            break;
        default:
            return;
        }
        return command;
    };
    function vd_Ey(points) {
        var ret = "";
        var point;
        for (var i = 0; i < points.length; i++) {
            point = points[i];
            ret += vd_do(point);
            if (i != points.length - 1) ret += " ";
        }
        return ret;
    };
    function vd_do(point) {
        return vdgeo.vd_sa(point);
    };
    function vd_LK(vd_BQ, vd_nh, vd_ni) {
        var h, i, index;
        var vd_lE = vd_BQ[0] == '-';
        var vd_fA = vd_BQ;
        if (vd_lE) vd_fA = vd_fA.substr(1);
        if (vd_fA.search("all") == 0) {
            if (vd_lE) {
                vd_ni = [];
                return;
            }
            for (i = 0; i < vd_nh.Items.length; i++) {
                h = vd_nh.Items[i];
                index = vd_ni.indexOf(h);
                if (index >= 0) continue;
                vd_ni.push(vd_nh.Items[i]);
            }
        } else if (vd_fA.search("last") == 0) {
            if (vd_nh.Items.length > 0) {
                h = vd_nh.Items[vd_nh.Items.length - 1];
                vd_S.GroupsManager.vd_rI(h, vd_ni, vd_lE);
            }
        } else if (vd_fA.search("h_") == 0) {
            vd_S.GroupsManager.vd_rI(vd_fA, vd_ni, vd_lE);
        } else if (vd_fA.search("w_") == 0 || vd_fA.search("c_") == 0) {
            var items = vd_fA.split("_");
            var p1 = vd_S.ViewToPixel(vd_bF(items[1]));
            var p2 = vd_S.ViewToPixel(vd_bF(items[2]));
            var xmin = Math.min(p1[X], p2[X]);
            var xmax = Math.max(p1[X], p2[X]);
            var ymin = Math.min(p1[Y], p2[Y]);
            var ymax = Math.max(p1[Y], p2[Y]);
            var ents;
            if (vd_fA.search("c_") == 0) ents = vd_S.GetEntitiesFromBox(xmin, ymin, xmax, ymax);
            else ents = vd_S.GetEntitiesInWindowBox(xmin, ymin, xmax, ymax);
            for (i = 0; i < ents.length; i++) {
                h = 'h_' + ents[i].HandleId.toString();
                vd_S.GroupsManager.vd_rI(h, vd_ni, vd_lE);
            }
        }
    };
    function vd_bF(point) {
        return vdgeo.vd_sK(point);
    };
    this.layer = function(name) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var vd_tU = vd_S.FindLayer(name);
        if (vd_tU == null) return;
        var vd_ED = vd_S.GetDictItem(vd_i.Layers, vd_i.ActiveLayer);
        if (vd_tU == vd_ED) return;
        vd_S.UndoHistory().store(vd_i, "ActiveLayer");
        vd_S.SetActiveLayer(vd_tU);
        if (vd_aD) vd_bn.push("layer " + name);
    };
    this.layout = function(name) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var clid = vd_S.GetActiveLayoutId();
        var nlid = vd_S.FindLayout(name);
        if (clid == nlid) return;
        vd_S.UndoHistory().group_start();
        vd_S.UndoHistory().store(vd_i, "ActiveLayOut");
        vd_S.UndoHistory().store(vd_i, "ActiveLayOutRef");
        vd_S.UndoHistory().group_end();
        vd_S.SetActiveLayoutId(nlid);
        vd_jY = [];
        if (vd_aD) vd_bn.push("layout " + name);
    };
    this.color = function(vd_FX) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var vd_Gu = vdConst.colorToString(vd_i.ActivePenColor);
        var color = vdConst.colorFromString(vd_FX);
        var vd_Bc = vdConst.colorToString(color);
        if (vd_Gu == vd_Bc) return;
        vd_S.UndoHistory().store(vd_i, "ActivePenColor");
        vd_S.SetActivePenColor(color);
        if (vd_aD) vd_bn.push("color " + vd_Bc);
    };
    this.linetype = function(name) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var vd_ua = vd_S.FindLineType(name);
        if (vd_ua == null) return;
        var vd_Ef = vd_S.GetDictItem(vd_i.LineTypes, vd_i.ActiveLineType);
        if (vd_ua == vd_Ef) return;
        vd_S.UndoHistory().store(vd_i, "ActiveLineType");
        vd_S.SetActiveLineType(vd_ua);
        if (vd_aD) vd_bn.push("linetype " + name);
    };
    this.lineweight = function(vd_af) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_i.ActiveLineWeight == vd_af) return;
        vd_S.UndoHistory().store(vd_i, "ActiveLineWeight");
        vd_S.SetActiveLineWeight(vd_af);
        if (vd_aD) vd_bn.push("lineweight " + vd_af.toString());
    };
    this.ltscale = function(vd_af) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (!vd_i.vd_lV) vd_i.vd_lV = 1.0;
        if (vd_i.vd_lV == vd_af) return;
        vd_S.UndoHistory().store(vd_i, "vd_lV");
        vd_i.vd_lV = vd_af;
        if (vd_aD) vd_bn.push("ltscale " + vd_af.toString());
    };
    this.penwidth = function(vd_af) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_i.ActivePenWidth == vd_af) return;
        vd_S.UndoHistory().store(vd_i, "ActivePenWidth");
        vd_S.SetActivePenWidth(vd_af);
        if (vd_aD) vd_bn.push("penwidth " + vd_af.toString());
    };
    this.thickness = function(vd_af) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_i.vd_pG == vd_af) return;
        vd_S.UndoHistory().store(vd_i, "vd_pG");
        vd_S.SetActiveThickness(vd_af);
        if (vd_aD) vd_bn.push("thickness " + vd_af.toString());
    };
    var vd_ks = false;
    function vd_gG() {
        if (!vd_ks) return 0.0;
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return 0.0;
        if (vd_i.doublelinewidth === undefined) vd_i.doublelinewidth = 0.25;
        return vd_i.doublelinewidth;
    };
    this.doublelinewidth = function(vd_af) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_i.doublelinewidth == vd_af) return;
        vd_S.UndoHistory().store(vd_i, "doublelinewidth");
        vd_i.doublelinewidth = vd_af;
        if (vd_aD) vd_bn.push("doublelinewidth " + vd_af.toString());
    };
    this.hatch = function(vd_iR, FillBkColor, FillColor, vd_ja, vd_iK, vd_cA, vd_vg) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_iR == undefined) vd_iR = 'none';
        if (!FillBkColor) FillBkColor = 'byblock';
        if (!FillColor) FillColor = 'byblock';
        if (vd_iK == undefined) vd_iK = 0;
        if (vd_ja == undefined) vd_ja = 1;
        var vd_De = vdConst.colorFromString(FillBkColor);
        var vd_DG = vdConst.colorFromString(FillColor);
        var nh = vd_S.createNewHatchProperties(vd_iR, vd_De, vd_DG, vd_ja, vd_iK);
        if (nh && vd_cA !== undefined) nh.Solid2dTransparency = vd_cA;
        if (nh && vd_vg !== undefined) nh.DrawBoundary = vd_vg == 1;
        if (vd_i.ActiveHatchProperties === nh) return;
        vd_S.UndoHistory().store(vd_i, "ActiveHatchProperties");
        vd_i.ActiveHatchProperties = nh;
        if (vd_aD) vd_bn.push("hatch " + vd_iR + " " + FillBkColor + " " + FillColor + " " + vd_ja.toString() + " " + vd_iK.toString() + " " + (vd_cA !== undefined ? vd_cA.toString() : "255") + " " + (vd_vg === 1 ? "1": "0"));
    };
    this.textstyle = function(name, height, vd_zw, vd_xg) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var vd_CC = vd_S.GetDictItem(vd_i.TextStyles, vd_i.ActiveTextStyle);
        var vd_fQ = false;
        vd_S.UndoHistory().group_start();
        var ts = vd_S.FindTextStyle(name);
        if (ts && ts != vd_CC) {
            vd_S.UndoHistory().store(vd_i, "ActiveTextStyle");
            vd_S.SetActiveTextStyle(ts);
            vd_fQ = true;
        } else {
            ts = vd_CC;
        }
        if (ts.Height != height) {
            vd_S.UndoHistory().store(ts, "Height");
            ts.Height = height;
            vd_fQ = true;
        }
        switch (vd_zw) {
        case "left":
            if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorLeft) {
                vd_S.UndoHistory().store(ts, "HorJustify");
                ts.HorJustify = vdConst.VdConstHorJust_VdTextHorLeft;
                vd_fQ = true;
            }
            break;
        case "right":
            if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorRight) {
                vd_S.UndoHistory().store(ts, "HorJustify");
                ts.HorJustify = vdConst.VdConstHorJust_VdTextHorRight;
                vd_fQ = true;
            }
            break;
        case "center":
            if (ts.HorJustify != vdConst.VdConstHorJust_VdTextHorCenter) {
                vd_S.UndoHistory().store(ts, "HorJustify");
                ts.HorJustify = vdConst.VdConstHorJust_VdTextHorCenter;
                vd_fQ = true;
            }
            break;
        }
        switch (vd_xg) {
        case "bottom":
            if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerBottom) {
                vd_S.UndoHistory().store(ts, "VerJustify");
                ts.VerJustify = vdConst.VdConstVerJust_VdTextVerBottom;
                vd_fQ = true;
            }
            break;
        case "top":
            if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerTop) {
                vd_S.UndoHistory().store(ts, "VerJustify");
                ts.VerJustify = vdConst.VdConstVerJust_VdTextVerTop;
                vd_fQ = true;
            }
            break;
        case "center":
            if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerCen) {
                vd_S.UndoHistory().store(ts, "VerJustify");
                ts.VerJustify = vdConst.VdConstVerJust_VdTextVerCen;
                vd_fQ = true;
            }
            break;
        case "base":
            if (ts.VerJustify != vdConst.VdConstVerJust_VdTextVerBaseLine) {
                vd_S.UndoHistory().store(ts, "VerJustify");
                ts.VerJustify = vdConst.VdConstVerJust_VdTextVerBaseLine;
                vd_fQ = true;
            }
            break;
        }
        vd_S.UndoHistory().group_end();
        if (vd_fQ && vd_aD) vd_bn.push("textstyle " + " " + ts.Name + " " + ts.Height.toString() + " " + vd_zw + " " + vd_xg);
    };
    this.tooltip = function(name) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        if (vd_i.vd_la == undefined) vd_i.vd_la = "";
        if (vd_i.vd_la == name) return;
        vd_S.UndoHistory().store(vd_i, "vd_la");
        vd_i.vd_la = name;
        if (vd_aD) vd_bn.push("tooltip " + name);
    };
    function vd_yY(vd_In) {
        var vd_zF = vd_In.split(" ");
        var vd_F = [];
        var val, i;
        for (i = 0; i < vd_zF.length; i++) {
            val = vd_zF[i].trim();
            if (val == "") continue;
            vd_F.push(val);
        }
        return vd_F;
    };
    function vd_LY(vd_fA, vd_bH) {
        var vd_i = vd_S.GetDocument();
        if (vd_i == null) return;
        var layout = vd_S.GetActiveLayout();
        if (layout == null) return;
        var vd_bC = [];
        var vd_b;
        var from, to, mat, k, i, fig, base, vd_to;
        var vd_F = vd_yY(vd_fA);
        var command = "__" + vd_F[0].toLowerCase();
        switch (command) {
        case "__layer":
            vd_U.layer(vd_F[1]);
            break;
        case "__color":
            vd_U.color(vd_F[1]);
            break;
        case "__linetype":
            vd_U.linetype(vd_F[1]);
            break;
        case "__ltscale":
            vd_U.ltscale(Number(vd_F[1]));
            break;
        case "__lineweight":
            vd_U.lineweight(Number(vd_F[1]));
            break;
        case "__penwidth":
            vd_U.penwidth(Number(vd_F[1]));
            break;
        case "__thickness":
            vd_U.thickness(Number(vd_F[1]));
            break;
        case "__doublelinewidth":
            vd_U.doublelinewidth(Number(vd_F[1]));
            break;
        case "__tooltip":
            vd_U.tooltip(vd_F[1]);
            break;
        case "__textstyle":
            vd_U.textstyle(vd_F[1], Number(vd_F[2]), vd_F[3], vd_F[4]);
            break;
        case "_hatch":
            vd_U.hatch(vd_F[1], vd_F[2], vd_F[3], Number(vd_F[4]), vdgeo.DegreesToRadians(Number(vd_F[5])), Number(vd_F[6]), Number(vd_F[7]));
            break;
        case "__layout":
            vd_U.layout(vd_F[1]);
            break;
        case "__chandle":
            vd_i.HandleCurrent = Math.max(vd_i.HandleCurrent, Number(vd_F[1]));
            break;
        case "__line":
            vd_U.line([vd_bF(vd_F[1]), vd_bF(vd_F[2])]);
            break;
        case "__polyline":
            {
                vd_bC = [];
                for (i = 1; i < vd_F.length; i++) {
                    vd_b = vd_bF(vd_F[i]);
                    while (vd_b.length < 4) vd_b.push(0);
                    vd_bC.push(vd_b);
                }
                vd_U.polyline(vd_bC);
            }
            break;
        case "__doubleline":
            {
                vd_bC = [];
                for (i = 1; i < vd_F.length; i++) {
                    vd_b = vd_bF(vd_F[i]);
                    while (vd_b.length < 4) vd_b.push(0);
                    vd_bC.push(vd_b);
                }
                vd_U.doubleline(vd_bC);
            }
            break;
        case "__doublelinerect":
            vd_U.doublelinerect([vd_bF(vd_F[1]), Number(vd_F[2]), Number(vd_F[3]), vdgeo.DegreesToRadians(Number(vd_F[4]))]);
            break;
        case "__spline1":
            {
                vd_bC = [];
                for (i = 1; i < vd_F.length; i++) {
                    vd_b = vd_bF(vd_F[i]);
                    while (vd_b.length < 4) vd_b.push(0);
                    vd_bC.push(vd_b);
                }
                vd_U.polyline(vd_bC, 0, 1);
            }
            break;
        case "__spline2":
            {
                vd_bC = [];
                for (i = 1; i < vd_F.length; i++) {
                    vd_b = vd_bF(vd_F[i]);
                    while (vd_b.length < 4) vd_b.push(0);
                    vd_bC.push(vd_b);
                }
                vd_U.polyline(vd_bC, 0, 2);
            }
            break;
        case "__spline4":
            {
                vd_bC = [];
                for (i = 1; i < vd_F.length; i++) {
                    vd_b = vd_bF(vd_F[i]);
                    while (vd_b.length < 4) vd_b.push(0);
                    vd_bC.push(vd_b);
                }
                vd_U.polyline(vd_bC, 0, 4);
            }
            break;
        case "__rect":
            vd_U.rect([vd_bF(vd_F[1]), Number(vd_F[2]), Number(vd_F[3]), vdgeo.DegreesToRadians(Number(vd_F[4]))]);
            break;
        case "__circle":
            vd_U.circle([vd_bF(vd_F[1]), Number(vd_F[2])]);
            break;
        case "__arc":
            vd_U.arc([vd_bF(vd_F[1]), Number(vd_F[2]), vdgeo.DegreesToRadians(Number(vd_F[3])), vdgeo.DegreesToRadians(Number(vd_F[4]))]);
            break;
        case "__ellipse":
            vd_dL(vd_S.AddEllipse(vd_bF(vd_F[1]), Number(vd_F[2]), Number(vd_F[3]), vdgeo.DegreesToRadians(Number(vd_F[4])), vdgeo.DegreesToRadians(Number(vd_F[5])), vdgeo.DegreesToRadians(Number(vd_F[6]))));
            break;
        case "__text":
            vd_U.text(vd_F[1], [vd_bF(vd_F[2]), vdgeo.DegreesToRadians(Number(vd_F[3]))]);
            break;
        case "__image":
            vd_U.image(vd_F[1], vd_F[2], [vd_bF(vd_F[3]), Number(vd_F[4]), vdgeo.DegreesToRadians(Number(vd_F[5]))]);
            break;
        case "__dimvar":
            vd_U.dimvar(vd_F[1], vd_F[2]);
            break;
        case "__dim":
            vd_U.dim([vd_bF(vd_F[1]), vd_bF(vd_F[2]), vd_bF(vd_F[3]), vd_F[4]]);
            break;
        case "__blockref":
            vd_U.blockref(vd_F[1], [vd_bF(vd_F[2]), Number(vd_F[3]), vdgeo.DegreesToRadians(Number(vd_F[4]))]);
            break;
        case "__select":
            {
                var entities = layout.Entities;
                for (i = 1; i < vd_F.length; i++) {
                    vd_LK(vd_F[i].toLowerCase(), entities, vd_jY);
                }
            }
            break;
        case "__erase":
            vd_U.erase();
            break;
        case "__move":
            vd_U.move(vd_bF(vd_F[1]), vd_bF(vd_F[2]));
            break;
        case "__rotate":
            vd_U.rotate(vd_bF(vd_F[1]), vdgeo.DegreesToRadians(Number(vd_F[2])));
            break;
        case "__scale":
            vd_U.scale(vd_bF(vd_F[1]), Number(vd_F[2]));
            break;
        case "__copy":
            vd_U.copy(vd_bF(vd_F[1]), vd_bF(vd_F[2]));
            break;
        case "__undogroup":
            vd_U.undogroup(vd_F[1]);
            break;
        default:
            vd_S.Prompt("Wrong script command : " + command);
            break;
        }
    };
    this.undogroup = function(value) {
        if (value.toLowerCase() == 'begin') {
            vd_S.UndoHistory().group_start();
        } else {
            vd_S.UndoHistory().group_end();
        }
        if (vd_aD) vd_bn.push("undogroup " + value);
    };
    function vd_zI(vd_fy, vd_Dq) {
        var vd_iw = 0;
        while (vd_fy.length > 0) {
            var vd_oY = vd_fy[vd_fy.length - 1].toLowerCase();
            if (vd_oY.substr(0, 9) == 'undogroup') {
                var vd_F = vd_yY(vd_oY);
                vd_iw += vd_F[1].toLowerCase() == 'begin' ? -1 : 1;
            }
            vd_Dq.push(vd_fy.pop());
            if (vd_fy.length == 0) break;
            vd_oY = vd_fy[vd_fy.length - 1].toLowerCase();
            if (vd_iw == 0 && vd_oY.substr(0, 6) != 'select' && vd_oY.substr(0, 7) != 'chandle') break;
        }
    };
    this.undo = function() {
        vd_S.UndoHistory().undo();
        if (vd_aD) {
            vd_zI(vd_bn, vd_Bg);
        }
    };
    this.redo = function() {
        vd_S.UndoHistory().redo();
        if (vd_aD) {
            vd_zI(vd_Bg, vd_bn);
        }
    };
    this.RegisterFigure = function(Figure, vd_bH, refresh) {
        vd_dL(Figure, vd_bH, refresh);
    };
    function vd_dL(Figure, vd_bH, refresh) {
        if (!Figure) return;
        var vd_i = vd_S.GetDocument();
        if (!Figure.HandleId) {
            var layout = vd_S.GetActiveLayout();
            Figure.HandleId = vd_S.vd_eV();
            if (vd_i.vd_la) Figure.ToolTip = vd_i.vd_la;
            vd_S.vd_bl(layout.Entities, Figure);
        }
        vd_S.UpdateFig(Figure);
        vd_S.UndoHistory().store(Figure, "Deleted", true);
        if (vd_aD) {
            vd_bn.push("chandle " + (vd_i.HandleCurrent - 1).toString());
            if (Figure._t == vdConst.vdLine_code) {
                vd_bn.push("line " + vd_do(Figure.StartPoint) + " " + vd_do(Figure.EndPoint));
            } else if (Figure._t == vdConst.vdPolyline_code) {
                var vd_nO = vd_Ey(Figure.VertexList.Items);
                if (Figure.Flag === 1) vd_nO += " " + vd_do(Figure.VertexList.Items[0]);
                if (Figure.SPlineFlag === vdConst.SplineFlagSTANDARD) {
                    var vd_om = "polyline ";
                    if (vd_gG() > 0) vd_om = "doubleline ";
                    vd_bn.push(vd_om + vd_nO);
                } else if (Figure.SPlineFlag === vdConst.SplineFlagFITTING) {
                    vd_bn.push("spline1 " + vd_nO);
                } else if (Figure.SPlineFlag === vdConst.SplineFlagCONTROLPOINTS) {
                    vd_bn.push("spline2 " + vd_nO);
                } else if (Figure.SPlineFlag === vdConst.SplineFlagQUADRATIC) {
                    vd_bn.push("spline4 " + vd_nO);
                }
            } else if (Figure._t == vdConst.vdRect_code) {
                var vd_om = "rect ";
                if (vd_gG() > 0) vd_om = "doublelinerect ";
                vd_bn.push(vd_om + vd_do(Figure.InsertionPoint) + " " + Figure.Width.toString() + " " + Figure.Height.toString() + " " + Figure.Rotation.toString());
            } else if (Figure._t == vdConst.vdCircle_code) {
                vd_bn.push("circle " + vd_do(Figure.Center) + " " + Figure.Radius.toString());
            } else if (Figure._t == vdConst.vdArc_code) {
                vd_bn.push("arc " + vd_do(Figure.Center) + " " + Figure.Radius.toString() + " " + vdgeo.RadiansToDegrees(Figure.StartAngle).toString() + " " + vdgeo.RadiansToDegrees(Figure.EndAngle).toString());
            } else if (Figure._t == vdConst.vdText_code) {
                vd_bn.push("text " + Figure.TextString + " " + vd_do(Figure.InsertionPoint) + " " + vdgeo.RadiansToDegrees(Figure.Rotation).toString());
            } else if (Figure._t == vdConst.vdImage_code) {
                var idef = vd_S.GetDictItem(vd_i.Images, Figure.ImageDefinition);
                vd_bn.push("image " + idef.Name + " " + (idef.FileName ? idef.FileName: "@") + " " + vd_do(Figure.InsertionPoint) + " " + Figure.ImageScale.toString() + " " + vdgeo.RadiansToDegrees(Figure.Rotation).toString());
            } else if (Figure._t == vdConst.vdInsert_code) {
                var bdef = vd_S.GetDictItem(vd_i.Blocks, Figure.Block);
                vd_bn.push("blockref " + bdef.Name + " " + vd_do(Figure.InsertionPoint) + " " + Figure.Xscale.toString() + " " + vdgeo.RadiansToDegrees(Figure.Rotation).toString());
            } else if (Figure._t == vdConst.vdDimension_code) {
                vd_bn.push("dim " + vd_do(vd_aJ.vd_oh) + " " + vd_do(vd_aJ.vd_nL) + " " + vd_do(vd_aJ.vd_rD) + " " + vd_aJ.text);
            }
        }
        if (vd_bH) vd_S.DrawEntity(Figure);
        if (refresh) vd_S.Refresh();
    };
    function vd_dh(action) {
        vd_ks = false;
        if (action) {
            var fig = action.Figure;
            action.Figure = null;
            action.vd_O = null;
            action.vd_et = 1.0;
            if (vd_ac) vd_ac(vd_S, fig);
        }
    };
    this.doubleline = function(vd_y, closed, vd_lT, vd_aN) {
        vd_ks = true;
        vd_U.polyline(vd_y, closed, vd_lT, vd_aN);
    };
    this.polyline = function(vd_y, closed, vd_lT, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        var vd_cs = vd_gG();
        if (vd_y) {
            var Figure = vd_S.AddPolyline(vd_y, false, {});
            if (vd_cs != 0) {
                var vd_gS = [];
                for (var i = 0; i < Figure.VertexList.Items.Count; i++) {
                    vd_gS.push(vd_cs);
                    vd_gS.push(vd_cs);
                }
                Figure.Widths = {
                    Items: vd_gS
                };
            }
            if (vd_lT) Figure.SPlineFlag = vd_lT;
            if (closed) Figure.Flag = 1;
            vd_ks = false;
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        var fig = vd_S.AddPolyline([], false, {});
        if (vd_cs != 0) {
            fig.Widths = {
                Items: []
            };
        }
        fig.SPlineFlag = 0;
        if (vd_lT) fig.SPlineFlag = vd_lT;
        if (closed) fig.Flag = 1;
        vd_S.ActiveAction().Figure = fig;
        vd_S.GetUserPoint(vd_xk);
    };
    function vd_xk(action, status) {
        var vd_f = action.vd_eB();
        var pt;
        if (status == 'start') {
            if (action.Figure.VertexList.Items.length == 0) vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_START_POINT);
            else {
                action.show();
                action.draw();
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_NEXT_POINT);
            }
        } else if (status == 'end') {
            vd_S.Prompt('');
            if (!action.IsCanceled()) {
                pt = [vd_f[1][X], vd_f[1][Y], vd_f[1][Z], 0.0];
                var vd_sd = false;
                if (action.Figure.VertexList.Items.length == 0) {
                    action.Figure.VertexList.Items = [pt];
                    vd_sd = true;
                } else {
                    if (!vdgeo.vd_eX(pt, action.Figure.VertexList.Items[action.Figure.VertexList.Items.length - 1], vd_S.GetPixelSize())) {
                        action.Figure.VertexList.Items.push(pt);
                        vd_sd = true;
                    }
                }
                if (vd_sd && action.Figure.Widths) {
                    var vd_cs = vd_gG();
                    action.Figure.Widths.Items.push(vd_cs);
                    action.Figure.Widths.Items.push(vd_cs);
                }
                vd_S.GetUserLine(vd_xk, pt);
            } else {
                if (action.vd_Fn == 0) action.Figure = null;
                if (action.Figure != null && ((action.Figure.SPlineFlag == 0 && action.Figure.VertexList.Items.length > 1) || action.Figure.VertexList.Items.length > 2)) vd_dL(action.Figure, true, true);
                vd_dh(action);
            }
        } else if (status == 'draw') {
            if (action.Figure.VertexList.Items.length > 0) {
                var render = vd_f[0];
                var vd_IK = action.Figure.SPlineFlag;
                if (action.Figure.VertexList.Items.length < 2) action.Figure.SPlineFlag = 0;
                pt = [vd_f[1][X], vd_f[1][Y], vd_f[1][Z], 0.0];
                var vd_xt = !vdgeo.vd_eX(pt, action.Figure.VertexList.Items[action.Figure.VertexList.Items.length - 1], vd_S.GetPixelSize());
                if (vd_xt) {
                    action.Figure.VertexList.Items.push(pt);
                    if (action.Figure.Widths) {
                        var vd_cs = vd_gG();
                        action.Figure.Widths.Items.push(vd_cs);
                        action.Figure.Widths.Items.push(vd_cs);
                    }
                }
                vd_S.UpdateFig(action.Figure);
                vd_S.DrawEntity(action.Figure, render);
                if (vd_xt) {
                    action.Figure.VertexList.Items.pop();
                    if (action.Figure.Widths) {
                        action.Figure.Widths.Items.pop();
                        action.Figure.Widths.Items.pop();
                    }
                }
                action.Figure.SPlineFlag = vd_IK;
                vd_S.UpdateFig(action.Figure);
            }
        }
    };
    this.circle = function(vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddCircle(vd_y[0], vd_y[1], false, {});
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.GetUserPoint(vd_xT);
    };
    function vd_xT(action, status) {
        if (!action.vd_O) action.vd_O = 'PickCenter';
        var vd_f = action.vd_eB();
        if (action.vd_O == 'PickCenter') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_CENTER_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure = vd_S.AddCircle(action.ResValue, 0.0, false, {});
                    action.vd_O = 'PickRadius';
                    vd_S.GetUserLine(vd_xT, action.ResValue);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'PickRadius') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_RADIUS);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Radius = vdgeo.Distance2D(vd_f[1], vd_f[2]);
                    vd_dL(action.Figure, true, true);
                }
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    var render = vd_f[0];
                    action.Figure.Radius = vdgeo.Distance2D(vd_f[1], vd_f[2]);
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        }
    };
    this.line = function(vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddLine(vd_y[0], vd_y[1], false, {});
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.GetUserPoint(vd_uo);
    };
    function vd_uo(action, status) {
        if (!action.vd_O) action.vd_O = 'PickStart';
        var vd_f = action.vd_eB();
        if (action.vd_O == 'PickStart') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_START_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.vd_O = 'PickNext';
                    vd_S.GetUserLine(vd_uo, vd_f[1]);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'PickNext') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_NEXT_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure = vd_S.AddLine(vd_f[2], vd_f[1], false, {});
                    vd_dL(action.Figure, true, true);
                    vd_S.GetUserLine(vd_uo, vd_f[1]);
                } else {
                    vd_dh(action);
                }
            }
        }
    };
    this.arc = function(vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddArc(vd_y[0], vd_y[1], vd_y[2], vd_y[3], false, {});
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.GetUserPoint(vd_tr);
    };
    function vd_tr(action, status) {
        if (!action.vd_O) action.vd_O = 'PickCenter';
        var vd_f = action.vd_eB();
        if (action.vd_O == 'PickCenter') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_CENTER_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure = vd_S.AddArc(action.ResValue, 0.0, 0.0, 0.0, false, {});
                    action.vd_O = 'PickStartPoint';
                    vd_S.GetUserLine(vd_tr, action.ResValue);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'PickStartPoint') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_START_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Radius = vdgeo.Distance2D(vd_f[2], vd_f[1]);
                    action.Figure.StartAngle = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    action.vd_O = 'PickEndPoint';
                    vd_S.GetUserLine(vd_tr, vd_f[2]);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'PickEndPoint') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_END_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.EndAngle = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    vd_dL(action.Figure, true, true);
                }
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    var render = vd_f[0];
                    action.Figure.EndAngle = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        }
    };
    this.doublelinerect = function(vd_y, vd_aN) {
        vd_ks = true;
        vd_U.rect(vd_y, vd_aN);
    };
    function vd_uD(rect) {
        var vd_bM = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]];
        var mat = vdgeo.vd_s();
        vdgeo.vd_ay(mat, rect.Width, rect.Height, 1.0);
        vdgeo.vd_ag(mat, rect.Rotation);
        vdgeo.vd_ae(mat, rect.InsertionPoint[X], rect.InsertionPoint[Y], rect.InsertionPoint[Z]);
        vd_bM = vdgeo.vd_hz(mat, vd_bM);
        var Figure = vd_S.AddPolyline(vd_bM, false, {});
        Figure.HatchProperties = rect.HatchProperties;
        Figure.Thickness = rect.Thickness;
        Figure.LineType = rect.LineType;
        Figure.Layer = rect.Layer;
        Figure.PenColor = rect.PenColor;
        Figure.PenWidth = rect.PenWidth;
        Figure.LineWeight = rect.LineWeight;
        Figure.LineTypeScale = rect.LineTypeScale;
        var vd_cs = vd_gG();
        Figure.Widths = {
            Items: [vd_cs, vd_cs, vd_cs, vd_cs, vd_cs, vd_cs, vd_cs, vd_cs]
        };
        Figure.Flag = 1;
        return Figure;
    };
    this.rect = function(vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddRect2(vd_y[0], vd_y[1], vd_y[2], vd_y[3], false, {});
            if (vd_gG() != 0) Figure = vd_uD(Figure);
            vd_ks = false;
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.GetUserPoint(vd_yg);
    };
    function vd_yg(action, status) {
        if (!action.vd_O) action.vd_O = 'Pick1';
        var render;
        var vd_f = action.vd_eB();
        if (action.vd_O == 'Pick1') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_FIRST_CORNER);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure = vd_S.AddRect(action.ResValue, action.ResValue, false, {});
                    action.vd_O = 'Pick2';
                    vd_S.GetUserLine(vd_yg, action.ResValue);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'Pick2') {
            if (status == 'start') {
                action.vd_Mt = action.vd_vT(false);
                action.DrawActionDefault = false;
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_OTHER_CORNER);
            } else if (status == 'end') {
                action.vd_vT(action.vd_Mt);
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Width = vd_f[1][X] - vd_f[2][X];
                    action.Figure.Height = vd_f[1][Y] - vd_f[2][Y];
                    if (vd_gG() != 0) action.Figure = vd_uD(action.Figure);
                    vd_dL(action.Figure, true, true);
                }
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.Width = vd_f[1][X] - vd_f[2][X];
                    action.Figure.Height = vd_f[1][Y] - vd_f[2][Y];
                    var vd_tZ = action.Figure;
                    if (vd_gG() != 0) vd_tZ = vd_uD(action.Figure);
                    vd_S.UpdateFig(vd_tZ);
                    vd_S.DrawEntity(vd_tZ, render);
                }
            }
        }
    };
    this.blockref = function(name, vd_y, vd_aN) {
        var action = vd_S.ActiveAction();
        action.cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddBlockSymbol(name, vd_y[0], vd_y[1], vd_y[2]);
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        action.Figure = vd_S.AddBlockSymbol(name, [0, 0, 0], 1.0, 0.0, false, {});
        var bbox = vd_S.GetEntityBBox(action.Figure);
        action.vd_et = 1.0;
        if (vd_S.ActionScaleMode == 1 && bbox) action.vd_et = 1.0 / Math.max(bbox[3] - bbox[0], bbox[4] - bbox[1]);
        vd_S.GetUserPoint(vd_tM);
    };
    function vd_tM(action, status) {
        if (!action.vd_O) action.vd_O = 'PickInsertion';
        var scale;
        var render;
        var vd_f = action.vd_eB();
        if (action.vd_O == 'PickInsertion') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_INSERTION_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.InsertionPoint = action.ResValue;
                    action.vd_O = 'PickScale';
                    vd_S.GetUserLine(vd_tM, action.ResValue);
                } else {
                    vd_dh(action);
                }
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.InsertionPoint = vd_f[1];
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        } else if (action.vd_O == 'PickScale') {
            if (status == 'start') {
                action.show();
                action.draw();
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_SCALE);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    if (!action.vd_et) action.vd_et = 1.0;
                    scale = vdgeo.Distance2D(vd_f[2], vd_f[1]) * action.vd_et;
                    action.Figure.Xscale = scale;
                    action.Figure.Yscale = scale;
                    action.vd_O = 'PickRotation';
                    vd_S.GetUserLine(vd_tM, vd_f[2]);
                } else {
                    action.Figure.Xscale = 1.0;
                    action.Figure.Yscale = 1.0;
                    vd_dL(action.Figure, true, true);
                    vd_dh(action);
                }
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    if (!action.vd_et) action.vd_et = 1.0;
                    scale = vdgeo.Distance2D(vd_f[2], vd_f[1]) * action.vd_et;
                    action.Figure.Xscale = scale;
                    action.Figure.Yscale = scale;
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        } else if (action.vd_O == 'PickRotation') {
            if (status == 'start') {
                action.show();
                action.draw();
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_ROTATION);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                } else {
                    action.Figure.Rotation = 0.0;
                }
                vd_dL(action.Figure, true, true);
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        }
    };
    this.text = function(vd_be, vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        if (vd_y) {
            var Figure = vd_S.AddText(vd_be, 0, vd_y[0], undefined, undefined, vd_y[1]);
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.ActiveAction().Figure = vd_S.AddText(vd_be, 0, [0, 0, 0], undefined, undefined, 0.0, false, {});
        vd_S.GetUserPoint(vd_xj);
    };
    function vd_xj(action, status) {
        if (!action.vd_O) action.vd_O = 'PickInsertion';
        var scale;
        var render;
        var vd_f = action.vd_eB();
        if (action.vd_O == 'PickInsertion') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_INSERTION_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.InsertionPoint = action.ResValue;
                    action.vd_O = 'PickRotation';
                    vd_S.GetUserLine(vd_xj, action.ResValue);
                } else {
                    vd_dh(action);
                }
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.InsertionPoint = vd_f[1];
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        } else if (action.vd_O == 'PickRotation') {
            if (status == 'start') {
                action.show();
                action.draw();
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_ROTATION);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                } else {
                    action.Figure.Rotation = 0.0;
                }
                vd_dL(action.Figure, true, true);
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        }
    };
    this.image = function(vd_BV, vd_iV, vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        var Figure;
        if (vd_y) {
            Figure = vd_S.AddImage(vd_BV, vd_iV, vd_y[0], vd_y[1], vd_y[2], false, {});
            Figure.FileName = vd_iV;
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        Figure = vd_S.AddImage(vd_BV, vd_iV, [0, 0, 0], 1.0, 0.0, false, {});
        Figure.FileName = vd_iV;
        vd_S.ActiveAction().Figure = Figure;
        vd_S.GetUserPoint(vd_uA);
    };
    function vd_uA(action, status) {
        if (!action.vd_O) action.vd_O = 'Pick1';
        var vd_i = vd_S.GetDocument();
        var idef = null;
        var render;
        var vd_f = action.vd_eB();
        if (action.vd_O == 'Pick1') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_FIRST_CORNER);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.InsertionPoint = action.ResValue;
                    action.vd_O = 'Pick2';
                    vd_S.GetUserLine(vd_uA, action.ResValue);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'Pick2') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_OTHER_CORNER);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Width = vd_f[1][X] - vd_f[2][X];
                    action.Figure.ImageScale = action.Figure.Width;
                    if (vd_i) idef = vd_S.GetDictItem(vd_i.Images, action.Figure.ImageDefinition);
                    if (idef) action.Figure.Height = action.Figure.Width * idef.OriginalHeight / idef.OriginalWidth;
                    else action.Figure.Height = vd_f[1][Y] - vd_f[2][Y];
                    action.vd_yk = vdgeo.GetAngle(vd_f[2], vd_f[1]);
                    action.vd_O = 'Pick3';
                    vd_S.GetUserLine(vd_uA, vd_f[2]);
                } else {
                    vd_dh(action);
                }
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.Width = vd_f[1][X] - vd_f[2][X];
                    action.Figure.ImageScale = action.Figure.Width;
                    if (vd_i) idef = vd_S.GetDictItem(vd_i.Images, action.Figure.ImageDefinition);
                    if (idef) action.Figure.Height = action.Figure.Width * idef.OriginalHeight / idef.OriginalWidth;
                    else action.Figure.Height = vd_f[1][Y] - vd_f[2][Y];
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        } else if (action.vd_O == 'Pick3') {
            if (status == 'start') {
                action.show();
                action.draw();
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_ROTATION);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]) - action.vd_yk;
                } else {
                    action.Figure.Rotation = 0.0;
                }
                vd_dL(action.Figure, true, true);
                vd_dh(action);
            } else if (status == 'draw') {
                if (action.Figure) {
                    render = vd_f[0];
                    action.Figure.Rotation = vdgeo.GetAngle(vd_f[2], vd_f[1]) - action.vd_yk;
                    vd_S.UpdateFig(action.Figure);
                    vd_S.DrawEntity(action.Figure, render);
                }
            }
        }
    };
    var vd_aJ = {
        vd_oU: new vd_Jz()
    };
    this.dimvar = function(name, value) {
        name = name.toUpperCase();
        vd_S.UndoHistory().store(vd_aJ.vd_oU, name);
        vd_aJ.vd_oU[name] = value;
        if (vd_aD) vd_bn.push("dimvar " + name + " " + value);
    };
    this.dim = function(vd_y, vd_aN) {
        vd_S.ActiveAction().cancel();
        vd_ac = vd_aN;
        var Figure;
        if (vd_y && vd_y[0] && vd_y[1]) {
            vd_aJ.vd_oh = vd_y[0];
            vd_aJ.vd_nL = vd_y[1];
            vd_aJ.vd_rD = vd_y[2];
            vd_aJ.text = vd_y[3];
            if (!vd_aJ.text) vd_aJ.text = '';
            Figure = vd_aJ.vd_oU.vd_ut(vd_S, vd_aJ.vd_oh, vd_aJ.vd_nL, vd_aJ.vd_rD, vd_aJ.text, {});
            vd_dL(Figure, false, false);
            if (vd_ac) vd_ac(vd_S, Figure);
            return;
        }
        vd_S.GetUserPoint(vd_un);
    };
    function vd_un(action, status) {
        if (!action.vd_O) action.vd_O = 'Pick1';
        var vd_i = vd_S.GetDocument();
        var idef = null;
        var render;
        var vd_f = action.vd_eB();
        if (action.vd_O == 'Pick1') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_START_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    action.vd_O = 'Pick2';
                    vd_S.GetUserLine(vd_un, action.ResValue);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'Pick2') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_END_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    vd_aJ.vd_oh = vd_f[2];
                    vd_aJ.vd_nL = vd_f[1];
                    action.vd_O = 'Pick3';
                    vd_S.GetUserLine(vd_un, vd_f[1]);
                } else {
                    vd_dh(action);
                }
            }
        } else if (action.vd_O == 'Pick3') {
            if (status == 'start') {
                vd_S.Prompt(vd_S.MessagesDictionary.SPECIFY_INSERTION_POINT);
            } else if (status == 'end') {
                vd_S.Prompt('');
                if (!action.IsCanceled()) {
                    vd_aJ.vd_rD = vd_f[1];
                    vd_aJ.text = '';
                    action.Figure = vd_aJ.vd_oU.vd_ut(vd_S, vd_aJ.vd_oh, vd_aJ.vd_nL, vd_aJ.vd_rD, vd_aJ.text, {});
                } else {
                    action.Figure = null;
                }
                vd_dL(action.Figure, true, true);
                vd_dh(action);
            } else if (status == 'draw') {
                render = vd_f[0];
                var figure = vd_aJ.vd_oU.vd_ut(vd_S, vd_aJ.vd_oh, vd_aJ.vd_nL, vd_f[1], '', {});
                vd_S.DrawEntity(figure, render);
            }
        }
    };
    function vd_Oi(pl, p1, p2) {
        vd_S.UndoHistory().group_start();
        vd_S.UndoHistory().store(pl, "VertexList");
        vd_S.UndoHistory().store(pl, "Flag");
        var ins1 = vdgeo.vd_Bz(pl, p1);
        if (!ins1) return null;
        var ins2 = vdgeo.vd_Bz(pl, p2);
        if (!ins2) return null;
        if (ins1[0] >= ins2[0]) {
            ins1[0] += 1;
        }
        if (ins1[0] > ins2[0]) {
            var tmp = ins1;
            ins1 = ins2;
            ins2 = tmp;
        }
        var vd_Bk = [];
        var vd_rc = [];
        if (pl.Falg == 1) {
            for (var i = ins2[0]; i < pl.vd_oB.Items.length; i++) {
                vd_rc.push(pl.vd_oB.Items[i]);
            }
            for (var i = 0; i <= ins1[0]; i++) {
                vd_rc.push(pl.vd_oB.Items[i]);
            }
        } else {
            for (var i = 0; i <= ins1[0]; i++) {
                vd_rc.push(pl.vd_oB.Items[i]);
            }
            for (var i = ins2[0]; i < pl.vd_oB.Items.length; i++) {
                vd_Bk.push(pl.vd_oB.Items[i]);
            }
        }
        pl.VertexList.Items = vd_rc;
        pl.Flag = 0;
        vd_S.UpdateFig(pl);
        var vd_tg = vdConst.cloneEntity(pl);
        vd_tg.VertexList.Items = vd_Bk;
        vd_tg.HandleId = vd_S.vd_eV();
        vd_S.vd_bl(vd_S.GetActiveLayout().Entities, vd_tg);
        vd_S.UndoHistory().store(vd_tg, "Deleted", true);
        vd_S.UndoHistory().group_end();
    };
    return this;
}