<!-- Title -->
<h1 align="center">
👋 Welcome to <br><code>gradlew-clean</code>
</h1>

<p align="center">A fast, zero-dependency package for cutting down on common issues developers have when running <code>gradlew clean</code>.</p>

<p align="center">
  <img src="https://flat.badgen.net/packagephobia/install/gradlew-clean">
  
  <a href="https://www.npmjs.com/package/gradlew-clean">
    <img alt="Install gradlew-clean instantly" src="https://flat.badgen.net/npm/dw/gradlew-clean" target="_blank" />
  </a>
</p>

<!-- Body -->

## 🚀 Usage

```sh
npx gradlew-clean
```

👋 **Notice:** This package is not limited to native React projects, you can use project using Android folder (like Ionic, or Flutter).

## 🤔 Why?

All native packages (especially those installed with NPM) often need to explain the following:

- How to clean gradlew.
- `cd` into the proper directory before running `gradlew clean`.
- You may need run `gradlew clean` to clean android project.


But now you can simply instruct users to run `npx gradlew-clean`.

This package will do the following:

- Check if there is an Android project in the project
- If not then it'll try again in `android/` directories (if any exists).
- Run `gradlew clean`

## ⚙️ Options


| Flag                | Input       | Description                                   | Default                |
| ------------------- | ----------- | --------------------------------------------- | ---------------------- |
| `--cleanBuildCache`           | `[boolean]` |  Cleans the Gradle build cache                             | `false`                |

## License

The code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.