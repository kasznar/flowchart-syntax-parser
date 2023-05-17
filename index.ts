import { flowChartConfig } from './flowchart-creator';
const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output');
import './style';

const render = () => {
  let res;

  try {
    res = flowChartConfig(input.value);
  } catch (e) {
    res = e;
  }
  output.innerHTML = JSON.stringify(res, null, 4);
};

render();

input.addEventListener('input', render);
