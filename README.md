# Шаблон для проєктів React.js - `cra-template-evne`.

Цей шаблон містить базову конфігурацію проєкту з усіма необхідними пакетами та стандартну структуру файлів.

---

## Інструкція по встановленню:

1. Додайте токен для доступу до корпоративних npm пакетів командою:
   ```sh
   npm config set -- //git.evne.pro/api/v4/projects/316/packages/npm/:_authToken=ACCESS_TOKEN
   ```
   _Замість ACCESS_TOKEN вставте ваш токен з GitLab._
 
   
2. Додайте @registry командою:
   ```sh
   yarn config set "@packages:registry" "https://git.evne.pro/api/v4/projects/316/packages/npm/"
   ```
3. Створіть директорію під назвою `my-project`.
4. Перейдіть у цю директорію в командному рядку та введіть команду:
   ```sh
   yarn create react-app . --template git+ssh://git@git.evne.pro:packages/templates/cra-template-evne.git
   ```
5. Після розгортання потрібно встановити пакети, та локальні сертифікати командою:
   ```sh
   yarn do-setup
   ```
6. Робіть своЇ тасочки.

---

## Вирішення проблем
* _Якщо у консолі з'явиться повідомлення про те, що такого шаблона не існує або його неможливо використовувати, просто переконайтеся, що у вас є доступ по SSH до репозиторію та ваш access key актуальний. Якщо доступу немає, зверніться до тім-лідера або девопса._
* _Якщо команда `plop` не працює, переконайтеся, що у вас встановлено [все необхідне для роботи `plop`](https://git.evne.pro/packages/node/evne-plop#%D0%B2%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F)._
* _Якщо команда `yarn do-setup` не встановлює сертифікати, переконайтеся, що у вас встановлено [mkcert](https://git.evne.pro/packages/node/evne-plop/#mkcert) та [nss](https://git.evne.pro/packages/node/evne-plop/#nss)._


---