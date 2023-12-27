const cn = (...args: (string | false | undefined)[]) => [...args].filter(Boolean).join(' ');

export default cn;
