---
title: How Dropbox Knows When You’re Sharing Copyrighted Stuff?
date: "2017-06-30"
tags:
  - technical
layout: post
author: zeyadetman
comments: true
---

<div dir="ltr"><strong>Hashing.</strong>
Before i dive in:

‘A’ is a criminal, he wants to rob a bank so he asked his friends ‘B’ and ‘C’ for help. They robbed the bank successfully but unfortunately ‘B’ had forgotten his gloves at home before the crime. The police officer got his fingerprint and after a few days from fingerprint matching, the police catch’em all.
Same thing for files, every tiny file has its unique fingerprint from characters and numbers like “ah4213jn234bmn53b” and even if you change the location or name or things like that the fingerprint not change at all - if you wanna see install this <a href="https://support.microsoft.com/en-us/help/841290/availability-and-description-of-the-file-checksum-integrity-verifier-utility" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-us/help/841290/availability-and-description-of-the-file-checksum-integrity-verifier-utility</a> and have little fun - The dropbox has a big table with the fingerprints of the origin files and when you upload a file, a hash is generated and if its fingerprint exist the site blocked the uploaded one.

<img class="alignnone size-full wp-image-1763 img-fluid" src="https://zeyadetman.files.wordpress.com/2017/05/702px-fingerprint-svg.png" alt="702px-fingerprint-svg" width="702" height="600" /> <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Fingerprint.svg/702px-Fingerprint.svg.png" target="_blank" rel="noopener noreferrer">source</a><br>

It’s the same idea to store your password and username.
<a href="https://www.quora.com/profile/Zeyad-Etman" target="_blank" rel="noopener noreferrer">Follow me on quora</a>

</div>
