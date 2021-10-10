module.exports = {
  transpileDependencies: ['vuetify'],
  devServ: {
    proxy: {
      '^/api': {
        target: 'https://covid-api.com/',
        changeOrigin: true,
      },
    },
  },
};
