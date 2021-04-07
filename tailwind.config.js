
module.exports = {
  theme: {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        backgroundColor: ['disabled'],
        cursor: ['disabled'],
        opacity: ['disabled']
      },
    },
    plugins: []
  }
}