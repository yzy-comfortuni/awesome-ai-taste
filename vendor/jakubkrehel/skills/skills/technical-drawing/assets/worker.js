self.onmessage = ({data}) => {
  const {request, id, parameters, explosion, fitExplosion, isolated, fill} = data;
  try {
    const model = self.DrawingModels[id];
    if (!model) throw Error('Unknown drawing model');
    self.postMessage({request, result: model(parameters, {explosion, fitExplosion, isolated, fill})});
  } catch (error) {
    self.postMessage({request, error: error.message});
  }
};
