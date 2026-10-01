# ほしぞらたんけんたい！

小学1年生向けに、太陽系の8惑星を紹介するデジタル絵本です。ページ送り、ブラウザの音声合成を使った読み上げ、惑星一覧からのページ移動に対応しています。

## ローカルで見る

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

## GitHub Pages

`main` ブランチへ変更が入ると、`.github/workflows/pages.yml` が静的サイトを GitHub Pages に公開します。

### 1. Pull Requestを作る

Pull Request（プルリクエスト）とは、作業用ブランチの変更を `main` に取り込んでもらうための申請画面です。

1. PowerShellを開き、このリポジトリのフォルダーへ移動します。現在の作業用ブランチ名を確認して、そのブランチをGitHubへ送ります。

   ```powershell
   git branch --show-current
   $branch = git branch --show-current
   git push -u origin $branch
   ```

2. GitHubでこのリポジトリのトップページを開きます。
3. 画面上部に表示される **Compare & pull request** を選びます。表示されない場合は、上部の **Pull requests** → **New pull request** の順に選びます。
4. **base** は `main`、**compare** は手順1で表示された作業用ブランチ（この環境では `work`）を選びます。`base: main ← compare: main` では変更が表示されないため、右側の **compare** を必ず作業用ブランチへ変更してください。
5. 変更内容が表示されたことを確認し、**Create pull request** を選びます。
6. タイトルと説明を確認して、もう一度 **Create pull request** を選びます。
7. 作成したPull Requestで **Merge pull request** → **Confirm merge** の順に選びます。

> **ブランチが一覧にない場合**
> 手順1の `git push` がまだ完了していません。先に作業用ブランチをGitHubへ送ってから、ページを再読み込みしてください。

画面の **compare** を開いても `main` と `codex/add-agents-japanese-guidance` しか表示されない場合も同じです。作業用ブランチは手元のパソコンにはありますが、GitHub側にはまだありません。GitHubの画面だけでは追加できないため、PowerShellで次を実行してください。

```powershell
$branch = git branch --show-current
git push -u origin $branch
```

`git push` が成功すると、最後に `branch 'ブランチ名' set up to track ...` に近いメッセージが表示されます。その後、GitHubの比較画面を再読み込みすると **compare** の一覧から選べるようになります。

### 2. GitHub Pagesを有効にする

1. GitHubでリポジトリを開き、上部の **Settings** を選びます。画面幅が狭い場合は **…** の中にあります。
2. 左側メニューの **Code and automation** にある **Pages** を選びます。
3. **Build and deployment** の **Source** で **GitHub Actions** を選びます。
4. 上部の **Actions** を開き、左側の **Deploy to GitHub Pages** が緑色のチェックになるまで待ちます。
5. **Settings → Pages** に戻り、上部に表示される **Visit site** を選ぶと絵本を開けます。

次に行うことは、PowerShellで `$branch = git branch --show-current` と `git push -u origin $branch` を実行して、GitHubの **compare** を表示された作業用ブランチへ変更することです。
