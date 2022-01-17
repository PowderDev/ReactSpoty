/** @type {import("snowpack").SnowpackUserConfig } */
import proxy from 'http2-proxy';


export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-sass',
    [
      '@snowpack/plugin-typescript',
      {
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {})
      }
    ]
  ],
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    target: 'es2019'
  },
  buildOptions: {
    clean: true
  },
  devOptions: {
    port: 3000
  },
  routes: [
    {
      src: '/uploads/.*',
      dest: (req, res) => {
        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 4000,
        });
      },
    },
  ],
}
