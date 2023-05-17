import { NEW_LINE } from './constants';
import { ConditionNode, StateNode, Node } from './model';

enum ParserState {
  Start = 'Start',
  BeginNode = 'BeginNode',
  State = 'State',
  StateNext = 'StateNext',
  Condition = 'Condition',
  ConditionTrue = 'ConditionTrue',
  ConditionFalseBegin = 'ConditionFalseBegin',
  ConditionFalse = 'ConditionFalse',
}

export class SyntaxParser {
  state = ParserState.Start;

  config = {
    [ParserState.Start]: {
      identifier: ParserState.BeginNode,
    },
    [ParserState.BeginNode]: {
      ':': ParserState.State,
      '?': ParserState.Condition,
      [NEW_LINE]: ParserState.Start,
    },
    [ParserState.State]: {
      identifier: ParserState.StateNext,
    },
    [ParserState.StateNext]: {
      [NEW_LINE]: ParserState.Start,
    },
    [ParserState.Condition]: {
      identifier: ParserState.ConditionTrue,
    },
    [ParserState.ConditionTrue]: {
      ':': ParserState.ConditionFalseBegin,
    },
    [ParserState.ConditionFalseBegin]: {
      identifier: ParserState.ConditionFalse,
    },
    [ParserState.ConditionFalse]: {
      [NEW_LINE]: ParserState.Start,
    },
  };

  isIdentifier(token: string) {
    return ![':', '?', NEW_LINE].includes(token);
  }

  syntaxError() {
    throw 'Syntax Error';
  }

  parse(tokens: string[]): Node[] {
    const nodes = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const transition = this.isIdentifier(token) ? 'identifier' : token;
      this.state = this.config[this.state]?.[transition];

      if (this.state === undefined) {
        this.syntaxError();
      }

      if (this.state === ParserState.Start) {
        if (tokens[i - 2] === ':') {
          if (tokens[i - 4] === '?') {
            const name = tokens[i - 5];
            const trueName = tokens[i - 3];
            const falseName = tokens[i - 1];

            nodes.push(new ConditionNode(name, trueName, falseName));
          } else {
            const name = tokens[i - 3];
            const nextName = tokens[i - 1];
            nodes.push(new StateNode(name, nextName));
          }
        } else {
          const name = tokens[i - 1];
          nodes.push(new StateNode(name, undefined));
        }
      }
    }

    if (this.state !== ParserState.Start) {
      this.syntaxError();
    }

    return nodes;
  }
}
