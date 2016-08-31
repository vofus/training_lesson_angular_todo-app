###Задание по AngularJS.
--------------------
Написание приложения ToDo App на AngularJS
--------------------

1. Данные хранятся в Firebase или любом другом сервисе
2. Каждая таска в TODO-листе — объект, который может иметь:
  - Статус (todo, in progress, partitialy done(в этом случае обязательно добавить коммент почему не до конца сделано) done)
  - Assigned to (выбор из списка пользователей, список приходит из сервиса)
  - Deadline date
3. Добавить форму добавления с валидацией. Реализовать в виде отдельной директивы
4. При удалении нужно подтверждение, что пользователь действительно хочет удалить запись
5. Записи можно редактировать
6. Добавить фильтры (показывать все, показывать только undone, показывать только in progress)
7. Добавить скроллер с подгрузкой данных (реализовать в виде кнопки "Показать еще"). Сделать его отдельной директивой.
8. Добавить сортировку по клику на заголовок. Также отдельной директивой