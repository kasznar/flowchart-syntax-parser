export enum NodeTypes {
  state = 'state',
  condition = 'condition',
}

export abstract class Node {
  name: string;
  type: NodeTypes;

  constructor(name) {
    this.name = name;
  }

  abstract validate(nodes: Map<string, Node>);
}

export class StateNode extends Node {
  type = NodeTypes.state;
  next?: string;

  constructor(name: string, next?: string) {
    super(name);
    this.next = next;
  }

  validate(nodes) {
    if (this.next !== undefined && !nodes.has(this.next)) {
      throw `Next node: ${this.next} is not defined`;
    }

    if (this.next === this.name) {
      throw `State can't point to itself`;
    }
  }
}

export class ConditionNode extends Node {
  type = NodeTypes.condition;
  ifTrue: string;
  ifFalse: string;

  constructor(name: string, ifTrue: string, ifFalse: string) {
    super(name);

    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
  }

  validate(nodes) {
    if (!nodes.has(this.ifTrue)) {
      throw `True node: ${this.ifTrue} is not defined`;
    }

    if (!nodes.has(this.ifFalse)) {
      throw `False node: ${this.ifFalse} is not defined`;
    }

    if (this.ifTrue === this.ifFalse) {
      throw `True and False node can't be equal`;
    }
  }
}

export type NodeType = StateNode | ConditionNode;
