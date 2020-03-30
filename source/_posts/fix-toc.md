---
title: 【hexo】目次のリンクがundefinedになってしまうのを直した話【hexo-toc】
toc: true
permalink: fix-toc
date: 2020-03-30 19:20:00
tags:
- hexo
categories:
- [テクノロジー]
---

hexoとhexo-tocを使用して目次を作っていますが、サイドバーの目次のウィジェットがうまく動かなかったので直しました。

<!-- toc -->

# TL; DR

<div class="blogcardfu" style="width:auto;max-width:9999px;border:1px solid #E0E0E0;border-radius:3px;margin:10px 0;padding:15px;line-height:1.4;text-align:left;background:#FFFFFF;"><a href="https://github.com/yukiyalien/blog/issues/2" target="_blank" style="display:block;text-decoration:none;"><span class="blogcardfu-image" style="float:right;width:100px;padding:0 0 0 10px;margin:0 0 5px 5px;"><img src="https://images.weserv.nl/?w=100&url=ssl:avatars2.githubusercontent.com/u/36108601?s=400&amp;amp;v=4" width="100" style="width:100%;height:auto;max-height:100px;min-width:0;border:0 none;margin:0;"></span><br style="display:none"><span class="blogcardfu-title" style="font-size:112.5%;font-weight:700;color:#333333;margin:0 0 5px 0;">目次のウィジェットがうまく動作しない · Issue #2 · yukiyalien/blog</span><br><span class="blogcardfu-content" style="font-size:87.5%;font-weight:400;color:#666666;">発生している事象 目次のウィジェット上の各見出しへのリンクが #undefined になってしまっていてうまく動作していない。 再現環境 全てのデバイス、全てのブラウザ 対処 どうなれば正しいのか 例えば上記のAboutページの1つ目の見出しに飛ぶなら、URLのアンカーが #このブログについて になれば正しい…はず？ どうやって直すの？ _config.yml の設定を変えればいけるらしい…？</span><br><span style="clear:both;display:block;overflow:hidden;height:0;">&nbsp;</span></a></div>

![](https://user-images.githubusercontent.com/36108601/77887095-f216b980-72a4-11ea-9576-ac89cfe374ad.png)

このサイドバーの目次から見出しをクリックしても…

![](https://user-images.githubusercontent.com/36108601/77887145-0b1f6a80-72a5-11ea-93b4-682519487f82.png)

リンクが `/#undefined` になってしまって見出しに飛べないという症状があったのを直しました。結論から言うと、目次を生成している**hexo-toc**というプラグインをちょっといじりました。

筆者の環境

- hexo + hexo-theme-icarus + GitHub + Netlify でホスティング
- ローカルの開発環境は WSL(2ではなく1) のUbuntu 18.04.4 LTS

# どうやって直したの？

## hexo-toc の一部を書き換えたら直った

hexoのルートディレクトリから見た `node_modules/hexo-toc/lib/filter.js` の28～31行目を以下のように書き換えました。

```js
$title.attr('id', id);
// $title.children('a').remove();
// $title.html( '<span id="' + id + '">' + $title.html() + '</span>' );
// $title.removeAttr('id');
```

▼これは本来こうなっていたものです。

```javascript
// $title.attr('id', id);
$title.children('a').remove();
$title.html( '<span id="' + id + '">' + $title.html() + '</span>' );
$title.removeAttr('id');
```

`hexo clean` で既に生成されてしまっているファイルをふっ飛ばしてから `hexo g` をして、それから `hexo s` して `localhost:4000` で確認。適当な記事を開いて目次が動作することを確認しました。

## どうやるの？

私はhexo + GitHub + Netlifyという形でホスティングしているので、以下の通りに修正しました。本番サーバー上で直接hexoを運用している人なんかは、以下は無視していいと思います。

### hexo-toc側でやること

まず本家のhexo-tocのリポジトリをForkしてきます。本家のリポジトリはここにあります。

[<i class="fab fa-github" style="font-size:1em;"></i> bubkoo/hexo-toc](https://github.com/bubkoo/hexo-toc)

これをForkしてから `git clone` して、`lib/filter.js` を先述したように書き換えます。そして

```
git add .
git commit
git push
```

してフォークした自分のhexo-tocのリモートリポジトリに反映させます。

### hexo本体側でやること

npmを使っているので、以下の方法でもともとあったhexo-tocを削除した上で、自分でいじったhexo-tocをインストールしました。

```shell
npm uninstall --save hexo-toc && npm install --save 自分のhexo-tocのリポジトリ
```

そして、変更を `git push` で反映させます。

そしてNetlifyの自動デプロイを待ってから自分の本番サイトを確認すると…

{% asset_img naotta.png 直った！ %}

**直った！！！**

# 総括

hexoは人によって環境がかなり違うと思うので、適宜ご自身の環境に読み替えて参考にしてください。それではまたいつか。

## 参考資料

- [TOC 锚点 undefined - dddfaker]([https://dddfaker.top/2019/06/04/TOC-%E9%94%9A%E7%82%B9-undefined/](https://dddfaker.top/2019/06/04/TOC-锚点-undefined/))

