export default function handleFormInputChange(e) {
  const el = e.target;
  const name = el.name;
  const type = el.type;
  const stateChange = {};

  if (type === 'select-multiple') {
    const selectedOptions = [];
    for (let i = 0, l = el.options.length; i < l; i++) {
      if (el.options[i].selected) {
        selectedOptions.push(el.options[i].value);
      }
    }
    stateChange[name] = selectedOptions;
  } else if (type === 'checkbox') {
    const objType = (el.form)
      ? Object.prototype.toString.call(el.form.elements[name])
      : '[object HTMLCollection]';
    if (objType === '[object RadioNodeList]'
        || objType === '[object NodeList]'
        || objType === '[object HTMLCollection]') {
      const checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
      if (el.checked) {
        checkedBoxes.push(el.value);
      } else {
        checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
      }
      stateChange[name] = checkedBoxes;
    } else {
      stateChange[name] = el.checked;
    }
  } else {
    stateChange[name] = el.value;
  }
  this.setState(stateChange);
}

