Metamaps
=======

[![Build Status](https://travis-ci.org/metamaps/metamaps.svg?branch=develop)](https://travis-ci.org/metamaps/metamaps)
[![Code Climate](https://codeclimate.com/github/metamaps/metamaps/badges/gpa.svg)](https://codeclimate.com/github/metamaps/metamaps)

## What is Metamaps?

Metamaps is a free and open-source technology for changemakers, innovators, educators and students. It enables individuals and communities to build and visualize their shared knowledge and unlock their collective intelligence.

You can find a version of this software running at [metamaps.cc][site-beta], where the technology is being tested in an open beta.

Metamaps is developed and maintained by a distributed, nomadic community comprised of technologists, artists and storytellers. You can get in touch by using whichever of these channels you prefer:

## How do I learn more?
     
- Contact: [team@metamaps.cc](mailto:team@metamaps.cc) or [@metamapps](https://twitter.com/metamapps) on Twitter
- User Documentation: [docs.metamaps.cc](https://docs.metamaps.cc)
- User Community: [hylo.com/c/metamaps](https://www.hylo.com/c/metamaps)
- To see what we're developing, or to weigh in on what you'd like to see developed, see our [Metamaps Feedback and Features](https://trello.com/b/uFOA6a2x/metamaps-feedback-feature-ideas-requests) board on trello
- To follow along with, or contribute,to our design process, see our [Metamaps Design](https://trello.com/b/8HlCikOX/metamaps-design) board on trello
- To follow along with, or contribute to, our development process, see our [Github Issues and Pull Requests](https://github.com/metamaps/metamaps/issues)
- Request an invite to the open beta [here](https://metamaps.cc/request)

<!-- markdown hack to split two lists -->

- To send us a personal message get in touch with us via email, Twitter, or Hylo
- If you would like to report a bug, please check the [issues][contributing-issues] section in our [contributing instructions][contributing].
- If you would like to get set up as a developer, that's great! Read on for help getting your development environment set up.

## Installation

If you are on Mac or Ubuntu you can use the following instructions to quickly get a local copy of metamaps up and running using a Vagrant virtualbox. Don't be intimidated, it's easy!
```
There are two options for cloning the repository - the simplest way is the first one since you don't need to set up SSH keys:
git clone https://github.com/metamaps/metamaps

OR

git clone git@github.com:metamaps/metamaps.git
```
Now ensure you have VirtualBox and Vagrant installed on your computer
```
cd metamaps
./bin/configure.sh
```
This will do all the setup steps to make Metamaps work with a bit of behind the scenes ninja magick.

To start servers which will run metamaps you can then run:
```
./bin/start
```
To stop them:
```
./bin/stop
```
With your webservers running, open a web browser and go to `http://localhost:3000`

You can sign in with the default account
email: `user@user.com`
password: `toolsplusconsciousness`
OR create a new account at `/join`, and use access code `qwertyui`

Start mapping and programming!

We haven't set up instructions for using Vagrant on Windows, but there are instructions for a manual setup here:

- [For Windows][windows-installation]

## Licensing information

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

The license can be read [here][license].

Copyright (c) 2017 Connor Turland

[site-beta]: http://metamaps.cc
[license]: https://github.com/metamaps/metamaps/blob/develop/LICENSE
[contributing]: https://github.com/metamaps/metamaps/blob/develop/doc/CONTRIBUTING.md
[contributing-issues]: https://github.com/metamaps/metamaps/blob/develop/doc/CONTRIBUTING.md#reporting-bugs-and-other-issues
[windows-installation]: https://github.com/metamaps/metamaps/blob/develop/doc/WindowsInstallation.md
