module.exports = {
    root: true,
    env: {
        node: true,
        jquery: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-cond-assign": 0,
        "no-constant-condition": 0,
        "no-undef": 0,
        "vue/no-deprecated-destroyed-lifecycle": 0,
        "no-unused-vars": 0,
        "no-prototype-builtins": 0
    },
};
