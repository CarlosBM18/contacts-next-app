# Contacts Next.js App

## Overview

- [Next.js](https://nextjs.org/) (React)
- [mobx](https://mobx.js.org/)
- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)
- [jest](https://jestjs.io/) for testing

## Live demo

[https://contacts-next-app.vercel.app/](https://contacts-next-app.vercel.app/)

## Install and set up

Clone the project locally and install the project dependencies from the project's root folder.

```sh
yarn install
```

Create a `.env.local` file and add a `NEXT_PUBLIC_API` variable with the path to the api server. For example:

```sh
NEXT_PUBLIC_API=http://localhost:3000/api/v1
```

Finally, run the app

```sh
yarn run dev
```

## Tests

To run the tests:

```sh
yarn test
```
