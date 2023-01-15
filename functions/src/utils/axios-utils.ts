type Params = {
  [key: string]: string | number | undefined;
};

function getParams(params: Params): string {
  const output = Object.keys(params).map((key) => `${key}=${params[key]}`);

  return output.join("&");
}

export default {
  getParams,
}
