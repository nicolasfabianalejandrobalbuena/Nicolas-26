export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        court: '#0D1117',
        gold: '#FFD700',
        cyber: '#00D2FF',
        slate: '#161b22',
        ink: '#0a0f16'
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 210, 255, 0.22)'
      }
    }
  },
  plugins: []
};
