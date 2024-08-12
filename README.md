# Решение содержит три проекта:
1. Default http сервер nestjs - Api-Gateway (отвечает за поступление и передачу запросов клиенту)
2. Auth microservice (user + auth) - микросервис auth (отвечает за авторизацию, выдачу токена, проверку валидации токена, регистрации и получения данных пользователя)
   ```
   Метод check user auth решил упростить и не использовать метод jwt - verify (token).
   Проверка валидности токена осуществляется через декоратор UseGuards и, соответственно, созданный guard.
   ```
3. Russian It Companies microservice - микросервис russian-it-companies (сожержит в себе один метод - получение всех компаний, которые есть в БД авторизованным клиентам)

## Помимо основных задач, было добавлено:
1. Подключил pgadmin. [Перейти](http://localhost:15432/login)
   ```
   Login: admin@microservice.com
   Password: admin

   Необходимо зарегистрировать сервер:
   Имя/адрес сервера: postgres
   user: postgres
   password: postgres

   Необходимо создать две БД:
   1) auth_db
   2) russian-it-companies_db
   (init к сожалению не сделал)
   ```
2. Добавил документацию ручек api-gateway через Swagger. [Перейти](http://localhost:3333/api/swagger-docs)
3. Добавил миграции для russian-it-companies
   ```
   Необходимо запустить shell в контейнере соответствующего контейнера и запустить скрипт: npm run migrations:run
   ```
