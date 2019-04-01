import defaultRender from './renderDefault';
import plainRender from './renderPlain';

const renders = {
  default: defaultRender,
  plain: plainRender,
};

export default format => renders[format];
