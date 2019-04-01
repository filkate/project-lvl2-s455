import flatten from 'lodash/flatten';

const stringify = (data, parentName = '') => {
  if (data instanceof Object) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${parentName}${data}'`;
  }
  return data;
};

const renderAst = (ast, parentName) => {
  const actionByTypeNode = {
    added: node => `Property '${parentName}${node.key}' was added with value: ${stringify(node.newValue)}`,
    deleted: node => `Property '${parentName}${node.key}' was deleted`,
    changed: node => `Property '${parentName}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    nested: node => renderAst(node.children, `${parentName}${node.key}.`),
  };

  const astChanged = ast.filter(node => node.type !== 'unchanged');
  const result = flatten(astChanged.map(node => actionByTypeNode[node.type](node))).join('\n');
  return result;
};

const renderPlain = ast => renderAst(ast, '');

export default renderPlain;
