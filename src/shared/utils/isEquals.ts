function isEquals(a1: any, a2: any) {
  if (a1 === a2) return true;
  if (a1 === null && a2 === null) return true;
  if (a1 === null || a2 === null) return false;

  const type = typeof a1;
  if (typeof a2 !== type) return false;
  if (type !== 'function' && type !== 'object' && a1 !== a2) return false;

  let length, keys1, keys2;
  if (Array.isArray(a1)) {
    length = a1.length;
    if (a2.length !== length) return false;
  } else {
    keys1 = Object.keys(a1);
    keys2 = Object.keys(a2);
    length = keys1.length;
    if (keys2.length !== length) return false;

    if (!isEquals(keys1, keys2)) return false;
  }

  for (let i = 0; i < length; i++) {
    let v1, v2;
    if (!keys1) {
      v1 = a1[i];
      v2 = a2[i];
    } else {
      v1 = a1[keys1[i]];
      v2 = a2[keys1[i]];
    }

    const type = typeof v1;
    if (typeof v2 !== type) return false;
    if (type !== 'function' && type !== 'object' && v1 !== v2) return false;

    if (!isEquals(v1, v2)) return false;
  }

  return true;
}

export default isEquals;
