# Astro Starter Kit: Basics

## Временный адрес

- Сайт опубликован на https://pash-tet.github.io/aa-taganrog/ из ветки `main`.
- До подключения домена в настройках GitHub Pages поле Custom domain должно оставаться пустым.
- При переходе на `aataganrog.ru` измените `site` и `base` в `astro.config.mjs`, путь `media.output` в `.pages.yml` и ожидаемые адреса в `scripts/check-seo.mjs`. Внутренние ссылки используют общий путь из настроек Astro.

## SEO

- Адрес публикации задаётся в `astro.config.mjs`; сейчас используется временный адрес GitHub Pages.
- При сборке автоматически создаются `dist/sitemap.xml` и `dist/robots.txt`, включая страницы новостей. Не редактируйте их вручную.
- Общий шаблон задаёт канонические адреса, метаданные для социальных сетей и разметку названия сайта. Заголовки и описания новостей берутся из CMS.
- Проверка: `npm run check:seo`. Проверяются готовые HTML-страницы, уникальность заголовков и описаний, карта сайта, канонические адреса и изображения для ссылок.
- После публикации подтвердите владение доменом в Яндекс Вебмастере и Google Search Console и отправьте `https://aataganrog.ru/sitemap.xml`. Коды подтверждения зависят от учётной записи владельца и в проект не добавлены.
- При переносе со старого сайта настройте постоянные перенаправления старых адресов на соответствующие новые страницы на уровне хостинга. GitHub Pages не поддерживает произвольные серверные перенаправления.
- До публикации подтвердите расписание и контакты. Блок «Сегодня» на главной вычисляется при сборке и устаревает без повторной сборки; его нужно заменить статичным расписанием или обновлять отдельно.
- Публикуйте содержимое `dist/` целиком на любом статическом хостинге. Резервная копия — копия репозитория вместе с контентом и изображениями.

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
