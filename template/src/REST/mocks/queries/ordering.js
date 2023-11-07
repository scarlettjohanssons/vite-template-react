module.exports = (data, key) => {
  return data.sort((a, b) => {
    if (key.charAt(0) === '-') {
      const keyA = a[key.substring(1)];
      const keyB = b[key.substring(1)];
      if (keyB > keyA) {
        return 1;
      } else {
        return -1;
      }
    } else {
      const keyA = a[key];
      const keyB = b[key];
      if (keyA > keyB) {
        return 1;
      } else {
        return -1;
      }
    }
  });
};
