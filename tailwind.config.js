module.exports = {
  theme: {
    extend: {
      animation: {
        "my-scale": "my-scale-animation 0.5s ease-in-out infinite",
      },
      keyframes: {
        "my-scale-animation": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
};
