---
title: 自分の好きなサービスに共有できるシェアボタン「AddToAny」がスゴい！【Mastodon・Misskeyユーザー必見】
toc: true
permalink: addtoany-is-god
date: 2020-05-23 19:50:00
tags:
- [日記]
- [AddToAny]
- [Mastodon]
- [Misskey]
categories:
- [日記]
---

{% asset_img addtoanytop.jpg %}

こんにちは。日々インターネットをしておられる皆さんは、日常の中で何度も「シェアボタン」(あるいは「ソーシャルボタン」？)を目にされていると思います。

シェアボタンとは、押すことでTwitterやFacebookなどの様々なサービスに簡単にページを共有できるボタンのことです。

<!-- more -->

{% asset_img wired.jpg %}

今回は、

- たくさんのサービスにシェアできる
- **Mastodonに対応している**
- カスタマイズ性が高い
- 好きなサービスへのシェアボタンを好きに選んで設置できる
- Chrome拡張機能がある

といった、ブロガー・サイト管理者側から、記事を読むユーザー側にとっても嬉しい特徴を持つ、**AddToAny**というシェアボタンサービスがスゴいので紹介します！

こちらが公式サイトです。

{% hatenablogcard https://www.addtoany.com/ %}

---

# 好きなサイトにシェアしよう …そう、マストドンにも

実はこのブログでもAddToAnyを使っています。

{% asset_img onthispage.jpg %}

私は**生粋のMastonauts**[^1]なので、どんなサイトにもMastodonへのシェアボタンがあると大変嬉しいのですが、**AddToAnyはMastodonにも対応**しています。

[^1]: Mastodon 住民のこと

AddToAnyは好きなサービスへのシェアボタンを自由に選んで並び替えて設置することができます。**いい感じに**JavaScriptとかのなんかコードを吐き出してくれます。

{% asset_img customize.jpg %}

私の場合、まずTwitterは当然として、Mastodonはすごく大事なので入れてあります。以下、LINE、Facebook、はてブ…と入っています。一番右のやつはリンクコピーボタンです。

Mastodonへのシェアボタンを押すとサーバーのドメインを入力する画面が出てきて、自分の所属するサーバーのドメインを入力するとそのサーバーでのトゥート画面が出てきます。

なお、Mastodonといいつつも、Mastodonと同じURIスキームでシェアのページが開くサービスなら何でも転用できちゃいます。どういうことかというと、**Misskeyでも使える**ということです。

MastodonもMisskeyも、

 `サーバーのドメイン/share?text=○○○○(シェアしたい文字列)`

というURLにアクセスするとシェアページが開くようになっているので、サーバーの入力欄に `misskey.io` とか入れても動いちゃうんです！これはMisskeyユーザーにとっても大変便利です。

---

# 好きなサイトへのボタンが無かったんだけど

一番右にある <span style="color: #0166FF;"><i class="fas fa-plus-square"></i></span> ボタンを押すと、手前には表示されていなくても、AddToAnyで対応しているサービスの一覧がズラッと出てきます。

{% asset_img menu.jpg %}

手前に出てきてないサイトでも、AddToAnyに対応しているサイトならこのメニューからどこへでもシェアできちゃいます。

非常に興味深いのは、AddToAnyが対応するサービスの多さです。

{% asset_img services.jpg %}

~~正直、それいる…？？というマイナーサービスまで~~非常に多くのサービスをカバーしています。

~~田舎におけるドコモの電波のようなカバー率の高さです。(は？)~~

---

# Chrome拡張機能もすごい

今までの話だと、ブログやサイトの管理者がAddToAnyをサイトに追加してないと意味がないです。しかしどんなサイトでもAddToAnyを使えるようにする最強のChrome拡張機能があります。

{% hatenablogcard https://chrome.google.com/webstore/detail/addtoany-share-anywhere/ffpgijchhhkhnokafdeklpllijgnbche %}

これをインストールすると、Chromeの*上の部分*に <span style="color: #0166FF;"><i class="fas fa-plus-square"></i></span> ボタンが出現します。これを押すと、ウェブサイト設置型のAddToAnyと同じように、事前に好きにカスタマイズしたAddToAnyのメニューが出てきます。

{% asset_img chromemenu.jpg %}

Chrome版のAddToAnyのいいところは、先述したように好きなサイトに共有できることですが、もう一つ素晴らしい特徴があります。

**メニューに無い任意のサービスを追加できる**ことです。何かをシェアするURIスキームのあるサービスなら何でも追加できます。

Chrome版AddToAnyの設定画面から、`Add custom service...`というボタンを押すと、以下のような入力欄が出現します。

{% asset_img addservice.jpg %}

今回は、僕が使っているMastodonサーバーである「Best Friends」への直通シェアボタンを追加したいと思います。AddToAnyでは `${link}` でシェアしたいページのリンクを、 `${title}` でページのタイトルを挿入できるようです。

先述したようにMastodonのURIスキームは

 `サーバーのドメイン/share?text=○○○○(シェアしたい文字列)`

というようになっているので、空白の `%20` なんかも含めて

`https://best-friends.chat/share?text=${title}%20${link}`

というURIスキームを作りました。

アイコンも自由な画像(50KB以下)を使うことができます。今回はTeam Best Friendsのアカウントのアイコンを使いました。(怒られるかな…)

アイコンとタイトルとスキームを入力したら ~~`西武`~~ `Save` ボタンを押します。

するとなんと、Best Friendsがサイト一覧の中に出現します！！

{% asset_img congrats1.jpg %}

これをクリックしてメニューに追加して、設定画面を閉じると完成です。

さて、適当なサイトでAddToAny拡張機能のボタンを押してみると…

{% asset_img congrats2.jpg %}

なんとなんと！Best Friendsへの直通シェアボタンが出現しているではありませんか！！

実際に使ってみると、

{% asset_img bfshare.jpg %}

_**Congrats!**_  Best Friendsのトゥート画面が出てきました。ベスフレ直通シェアボタンの完成です。

---

# さいごに

このように、AddToAnyを使うと素晴らしく快適な~~Mastodonライフ~~インターネットライフを送ることができます。

特に、MastodonやRedditのようなボタンが設置されている確率が低いサービスによく記事をシェアする人は、Chrome拡張機能はすごく便利だと思います。いくつものChrome拡張機能を入れている人も、これでひとつにまとめてスッキリさせられますね！

AddToAnyの公式サイトはこちらです。

{% hatenablogcard https://www.addtoany.com/ %}

冒頭で言った通り、このブログでもAddToAnyシェアボタンを導入しています。もしよければお好きなサービスにシェアして、AddToAnyを試してみてください。Mastodonへのボタンもありますので、MastodonやMisskeyをお使いの方は是非！

ではまた！