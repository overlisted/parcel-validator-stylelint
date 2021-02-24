import {Validator} from "@parcel/plugin";
const stylelint = require("stylelint");

const convert = {
  warning: (file, code, warning) => ({
    message: warning.text,
    origin: "parcel-validator-stylelint",
    name: warning.rule,
    filePath: file,
    codeFrame: {
      code,
      codeHighlights: [{
        start: {line: warning.line, column: warning.column + 1},
        end: {line: warning.line, column: code.split("\n")[warning.line - 1].length + 1}
      }]
    }
  }),
  deprecation: (stylelintrc, deprecation) => ({
    message: `${deprecation.text} (see ${deprecation.reference})`,
    origin: "parcel-validator-stylelint",
    filePath: stylelintrc
  }),
  invalidOptionWarning: (stylelintrc, warning) => ({
    message: warning.text,
    origin: "parcel-validator-stylelint",
    filePath: stylelintrc
  })
};

export default new Validator({
  async validate({ asset }) {
    const code = await asset.getCode();
    const report = await stylelint.lint({ code });
    if(report.errored) {
      return {
        errors: [],
        warnings: report.results
          .map(({ deprecations, invalidOptionWarnings, parseErrors, warnings }) => [].concat(
            deprecations.map(it => convert.deprecation(source, it)),
            invalidOptionWarnings.map(it => convert.invalidOptionWarning(asset.filePath, it)),
            warnings.map(it => convert.warning(asset.filePath, code, it))
          ))
          .reduce((a, b) => a.concat(b))
      }
    }
  }
});
