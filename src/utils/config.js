const devConfig = {
  baseURL: "http://localhost:3000",
};

const prodConfig = {
  baseURL: "Your production url",
};

export const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
