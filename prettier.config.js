module.exports = {
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "security.workspace.trust.untrustedFiles": "open",
  "editor.fontLigatures": true,
  "editor.renderWhitespace": "boundary",
  "editor.renderControlCharacters": false,
  "editor.rulers": [80, 100],
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": false,
  "editor.wordWrap": "on",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.associations": {
    ".gitignore": "shellscript",
  },
  "emmet.syntaxProfiles": { javascript: "jsx" },
  // eslint-disable-next-line no-template-curly-in-string
  "window.title": "${activeEditorMedium}${separator}${rootName}",
  "workbench.colorCustomizations": {
    "editorWarning.foreground": "#ec0",
  },

  "editor.guides.indentation": true,
  "editor.formatOnSave": true,
  "editor.detectIndentation": false,

  "window.zoomLevel": 1,
};
