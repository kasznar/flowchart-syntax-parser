import { Node } from './model';

export class SemanticValidator {
  nodes = new Map<string, Node>();

  constructor() {}

  validate(nodes: Node[]) {
    for (const node of nodes) {
      if (this.nodes.has(node.name)) {
        throw `Node with name: ${node.name} is already defined`;
      }
      this.nodes.set(node.name, node);
    }

    for (const node of nodes) {
      node.validate(this.nodes);
    }

    for (const node of nodes) {
      this.traverse(node.name, []);
    }
  }

  traverse(name: string, visited: string[]) {
    if (visited.includes(name)) {
      throw 'Loop in conditions';
    }

    const node = this.nodes.get(name) as any;

    const newVisited = [...visited, node.name];
    if (node.ifTrue && node.ifFalse) {
      this.traverse(node.ifTrue, newVisited);
      this.traverse(node.ifFalse, newVisited);
    }
  }
}
