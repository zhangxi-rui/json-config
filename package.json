{
  "name": "json-config",
  "version": "1.1.0",
  "title": "json-config",
  "scripts": {
    "dev": "vue-cli-service serve --mode development",
    "build": "vue-cli-service build --mode production",
    "test": "vue-cli-service build --mode test",
    "lint": "vue-cli-service lint --ext .js,.vue,.ts,.md src --fix",
    "commit": "npx git-cz"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && git add .",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "dependencies": {
    "@types/js-cookie": "^2.2.2",
    "@types/nprogress": "^0.0.29",
    "axios": "^0.18.0",
    "core-js": "^2.6.5",
    "husky": "^2.1.0",
    "js-cookie": "^2.2.0",
    "nprogress": "^0.2.0",
    "vue": "^2.6.6",
    "vue-class": "^2.0.1",
    "vue-class-component": "^6.0.0",
    "vue-property-decorator": "^8.0.0",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1",
    "vuex-class": "^0.3.2",
    "zyb-pc-ui": "^1.0.30"
  },
  "devDependencies": {
    "@commitlint/cli": "^7.6.1",
    "@commitlint/config-conventional": "^7.6.0",
    "@vue/cli-plugin-babel": "^3.5.0",
    "@vue/cli-plugin-eslint": "^3.5.0",
    "@vue/cli-plugin-typescript": "^3.5.0",
    "@vue/cli-service": "^3.5.0",
    "@vue/eslint-config-standard": "^4.0.0",
    "@vue/eslint-config-typescript": "^4.0.0",
    "babel-eslint": "^10.0.1",
    "commitizen": "^3.1.1",
    "cz-conventional-changelog": "^2.1.0",
    "eslint": "^5.8.0",
    "eslint-plugin-markdown": "^1.0.0",
    "eslint-plugin-vue": "^5.0.0",
    "fs-extra": "^8.1.0",
    "mocker-api": "^1.7.4",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.1.0",
    "typescript": "^3.2.1",
    "vue-template-compiler": "^2.5.21"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "plugins": [
      "markdown"
    ],
    "extends": [
      "plugin:vue/essential",
      "@vue/standard",
      "@vue/typescript"
    ],
    "rules": {
      "vue/max-attributes-per-line": [
        2,
        {
          "singleline": 10,
          "multiline": {
            "max": 1,
            "allowFirstLine": false
          }
        }
      ],
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/name-property-casing": [
        "error",
        "PascalCase"
      ],
      "vue/no-v-html": "off",
      "vue/html-self-closing": "off",
      "semi": [
        2,
        "never"
      ],
      "quotes": [
        2,
        "single"
      ]
    },
    "parserOptions": {
      "parser": "@typescript-eslint/parser"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
