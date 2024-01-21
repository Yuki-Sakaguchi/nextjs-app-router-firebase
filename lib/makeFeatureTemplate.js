// 参考
// https://note.kiriukun.com/entry/20200313-interactive-cli-example-with-nodejs
const readline = require("readline");
const fs = require("fs");
const path = require("path");

/**
 * メイン処理
 */
const main = async () => {
  while (true) {
    console.log("Please enter the name of the function to be developed.");
    const answer = await question("> ");
    if (answer.trim() === "") {
      console.log("Retry!");
      console.log("");
    } else {
      const paths = [
        "",
        "data/",
        "data/api/",
        "data/datasource/",
        "domain/",
        "domain/model/",
        "domain/usecase/",
        "view/",
        "view/components/",
        "view/hooks/",
        // 'view/providers/',
      ];

      for (const dirName of paths) {
        fs.mkdirSync(
          path.join(__dirname, `../src/features/${answer}/${dirName}`),
        );
      }

      console.log("");

      console.log("🎉Directory creation successfully🎉");
      console.log("");
      for (const dirName of paths) {
        console.log(`　/src/features/${answer}/${dirName}`);
      }
      console.log("");
      break;
    }
  }
};

/**
 * ユーザーにYes/Noで答えられる質問をする
 */
const confirm = async (msg) => {
  const answer = await question(`${msg}(y/n): `);
  return answer.trim().toLowerCase() === "y";
};

/**
 * 標準入力を取得する
 */
const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

// 起動
(async () => {
  await main();
})();
