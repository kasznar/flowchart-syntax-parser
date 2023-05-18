# Flowchart Config Syntaxt Parser And Validator

You can define state and condition nodes in the following format:

```
state1 : cond1
state2
cond1 ? state2 : cond2
cond2 ? state2 : state1
```

The parser validates the syntax of the input string and also checks for semantic correctness:

- nodes only defined once
- nodes only can point to defined nodes
- nodes can't point to themselves
- condition true and false branches can't be equal
- can't be a loop in condition statements that doesn't lead to a state node

[StackBlitz](https://stackblitz.com/edit/typescript-vfdy93)
