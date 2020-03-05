// Assumes a valid matrix and returns its dimension array.
// Won't work for irregular matrices, but is cheap.
function dim(mat) {
  if (mat instanceof Array) {
    return [mat.length].concat(dim(mat[0]));
  } else {
    return [];
  }
}

// Makes a validator function for a given matrix structure d.
function validator(d) {
  return function (mat) {
    if (mat instanceof Array) {
      return d.length > 0
        && d[0] === mat.length
        && every(mat, validator(d.slice(1)));
    } else {
      return d.length === 0;
    }
  };
}

// Combines dim and validator to get the required function.
export function getdim(mat) {
  var d = dim(mat);
  return validator(d)(mat) ? d : false;
}

// Checks whether predicate applies to every element of array arr.
// This ought to be built into JS some day!
function every(arr, predicate) {
  var i, N;
  for (i = 0, N = arr.length; i < N; ++i) {
    if (!predicate(arr[i])) {
      return false;
    }
  }

  return true;
}