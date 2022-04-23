type FormatS =
  | {
      name: string;
      value: string;
    }
  | { value: string };

function formatObj(value: any, format: FormatS[], hasKeys: boolean, only?: string | string[]) {
  const keys = Object.keys(value);
  if (typeof only == 'undefined') {
    return keys.map((key) => {
      const aux = value[key];
      if (aux instanceof Array) {
        const f = aux.reduce((prev: string, curr: string) => prev.concat(curr, ' '), '');
        if (hasKeys) return { name: key, value: f } as FormatS;
        else return { value: f } as FormatS;
      } else {
        if (hasKeys) return { name: key, value: value[key] } as FormatS;
        else return { value: value[key] } as FormatS;
      }
    });
  } else {
    keys.forEach((key) => {
      if (only.includes(key)) {
        const aux = value[key];
        if (aux instanceof Array) {
          const f = aux.reduce((prev: string, curr: string) => prev.concat(curr, ' '), '');
          if (hasKeys) format.push({ name: key, value: f });
          else format.push({ value: f });
        } else {
          if (hasKeys) format.push({ name: 'Mensaje', value: value[key] });
          else format.push({ value: value[key] });
        }
      }
    });
    return format;
  }
}

/**
 *
 * @param value
 * @param keys return with keys
 * @param only specific keys to format it array
 * @returns
 */
export function formatResponse(value: any, keys = false, only?: string | string[]): FormatS[] {
  let format: FormatS[] = [];

  if (typeof value === 'object') {
    return formatObj(value, format, keys, only);
  } else if (value instanceof Array) {
    value.forEach((v) => {
      if (typeof v == 'object') {
        format = formatObj(value, format, keys, only);
      } else if (typeof v == 'string') {
        format.push({ name: 'Mensaje', value: v });
      }
    });
    return format;
  } else {
    if (keys) format.push({ name: 'Mensaje', value });
    else format.push({ value });
    return format;
  }
}
