import { tokenize } from './lexer';
import { SyntaxParser } from './syntax-parser';
import { SemanticValidator } from './semantic-validator';
import { Node } from './model';

function flowChartConfig(string): Node[] {
  const tokens = tokenize(string);
  const syntaxParser = new SyntaxParser();
  const config = syntaxParser.parse(tokens);
  const validator = new SemanticValidator();
  validator.validate(config);

  return config;
}

export { flowChartConfig };
