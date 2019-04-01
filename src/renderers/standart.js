import flatten from 'lodash/flatten';

const indent = count => `${' '.repeat(count)}`;

const renderAst = (ast, depth) => {
  const stringify = (data) => {
    if (!(data instanceof Object)) {
      return data;
    }
    const keys = Object.keys(data);
    const result = keys.map(key => `${indent(depth + 6)} ${key}: ${stringify(data[key])}`).join('\n');
    return `{\n${result}\n${indent(depth + 3)}}`;
  };

  const makePair = (key, value) => `${key}: ${stringify(value)}`;
  const actionByTypeNode = {
    added: node => `${indent(depth)} + ${makePair(node.key, node.newValue)}`,
    deleted: node => `${indent(depth)} - ${makePair(node.key, node.oldValue)}`,
    changed: node => [`${indent(depth)} + ${makePair(node.key, node.newValue)}`,
      `${indent(depth)} - ${makePair(node.key, node.oldValue)}`],
    unchanged: node => `${indent(depth + 2)} ${makePair(node.key, node.oldValue)}`,
    nested: node => `${indent(depth + 2)} ${node.key}: ${renderAst(node.children, depth + 4)}${indent(depth + 3)}}`,
  };

  const result = flatten(ast.map(node => actionByTypeNode[node.type](node))).join('\n');
  return `{\n${result}\n`;
};

const render = ast => `${renderAst(ast, 1)}}\n`;

export default render;
