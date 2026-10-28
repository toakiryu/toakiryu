/** @type {(() => void) | undefined} */
let dispose;

/** @param {string} base */
export function bootDevframe(base) {
  dispose?.();
  const script = document.createElement('script');
  script.type = 'module';
  script.src = `${base}embedded.js`;
  document.body.appendChild(script);

  dispose = () => {
    script.remove();
  };
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => dispose?.());
}
