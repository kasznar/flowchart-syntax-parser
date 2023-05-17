import { NEW_LINE } from './constants';

export function tokenize(input): string[] {
  let output = input.replace(/ /g, '');

  if (output.slice(0, 1) === NEW_LINE) {
    output = output.slice(1, output.length);
  }

  if (output.slice(-1) !== NEW_LINE) {
    output = output + NEW_LINE;
  }

  output = output.split(/([?:\r\n])/u);
  output = output.slice(0, output.length - 1);
  output = output.filter((t) => t !== '');

  return output;
}
