declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hello-wc": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
      };
    }
  }
}