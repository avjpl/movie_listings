
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = phase => {
  // when started in development mode `next dev` or `yarn dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `yarn build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `yarn build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  return {
    distDir: 'build',
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {},
          },
        ],
      });

      return config;
    },
    pageExtensions: ['mdx', 'jsx', 'js'],
    poweredByHeader: false,
  };
};
