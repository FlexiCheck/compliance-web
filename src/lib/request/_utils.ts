// Extracts param keys from a path string like "/api/user/:id/:slug"
export type ParamParseKey<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParamParseKey<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

export function generatePath<Path extends string>(
  path: Path,
  params: Record<ParamParseKey<Path>, string>
): string {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_: string, key: string) => {
    if (params[key as ParamParseKey<Path>] === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }
    return encodeURIComponent(params[key as ParamParseKey<Path>]);
  });
}
