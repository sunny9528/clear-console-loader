const parser = require('@babel/parser');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const { getOptions } = require('loader-utils');

function loader(source) {
  const options = getOptions(this) || {};
  const { ignore } = options;
  const { ast } = parser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  });
  traverse(ast, {
    ExpressionStatement(nodePath) {
      const node = nodePath.node;
      let expression = node.expression;
      if (!expression) return;
      const { type, arguments } = node.expression;
      if (type === 'CallExpression') {
        const CallNode = expression.callee;
        const {
          type: CallType,
          object: CallObject,
          property: CallProperty,
        } = CallNode;
        const result = [];
        if (
          CallType === 'MemberExpression' &&
          CallObject.name === 'console' &&
          CallProperty.name === 'log'
        ) {
          for (let i = 0; i < arguments.length; i++) {
            const item = arguments[i];
            let val = item.value;
            if (t.isIdentifier(item)) {
              val = item.name;
            }
            if (ignore.includes(val)) {
              result.push(item);
            }
          }
          if (result.length === 0) {
            nodePath.remove();
          } else {
            const resultArguments = [];
            for (let i = 0; i < result.length; i++) {
              const node = result[i];
              if (t.isIdentifier(node)) {
                resultArguments.push(t[node.type](node.name));
              } else {
                resultArguments.push(t[node.type](node.value));
              }
            }
            expression = t.callExpression(
              t.memberExpression(t.identifier('console'), t.identifier('log')),
              resultArguments
            );
          }
        }
      }
    },
  });
  const targetCode = generator(ast);
  return targetCode;
}
module.exports = loader;
