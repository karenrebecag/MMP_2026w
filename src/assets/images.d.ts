// esbuild inlina estas imágenes como data-URL (loader 'dataurl'); el import default es el string.
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
