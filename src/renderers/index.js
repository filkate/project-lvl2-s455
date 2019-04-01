import defaultRender from './standart';
import plainRender from './plain';
import jsonRender from './json';

const renders = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default format => renders[format];
