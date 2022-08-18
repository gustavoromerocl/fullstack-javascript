const piopio = (cb) => {
  console.log('🥚');
  cb();
  console.log('🐥');
};

piopio(() => console.log('🐣'));
