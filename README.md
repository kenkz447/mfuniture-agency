# react-ts-app

#### Install dependencies:

```shell
npm install
```

#### Run development server:

```shell
npm start
```

#### Build production:

Using `getBuildConfig` to generates webpack config for each environment:

Options:

***definitions***(*Optional*): Object passed to `DefinePlugin`.

***sourceMap***(*Optional*): Enable source map.

***compression***(*Optional*): Enable gzip compression.

***analyzer***(*Optional*): Enable `BundleAnalyzerPlugin`.

Default build command:

```shell
./build.sh
```

Build using staging:

```shell
./build.sh staging
```

Config files:

```shell
./webpack/webpack.config.*.js
```

Output dir: `./dist`

#### Analyzing dependencies:

```shell
npm run analyzer
```