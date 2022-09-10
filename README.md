# Проект Table (фронтенд). 

[Ссылка на проект на Vercel](https://table-jbzlezyvk-dariy-iva.vercel.app/#/)  

![Promo video](./public/promo.gif)


## О проекте

Проект представляет из себя страницу с реестром рабочих задач - реестр оформлен в виде таблицы.  

Требования заказчика:  
✔ приложение корректно работает на десктопных экранах с разрешением 1280px и выше;  
✔ создание новых задач через форму, открывающуюся по клику на кнопку "Новая запись";  
✔ редактирование существующих задач через форму, открывающуюся по клику на кнопку "Редактировать" (расположена в последнем столбце таблицы для каждой записи) - после сохранения формы обновленные данные отображаются в таблице;  
✔ удаление задач с дополнительным модальным окном для подтверждения (кнопка расположена в первой графе таблицы для каждой записи), после удаления запись больше не появляется в таблице до обновления страницы;  
✔ по ряду колонок таблицы доступна фильтрация - по колонке отображается список всех значений для данной колонки, есть фозможность выбрать все значения;  
✔ поиск по таблице путем ввода данных в поисковую строку;  
✔ выбор количества отображаемых в таблице записей (5, 10 - установлено по умолчанию, 20 строк);  
✔ список записей для таблицы, списки филиалов и регионов, сотрудников, кодов и названий функционалов для формы создания/редактирования записей хранятся и загружаются из глобального хранилища (стейта).   

Требования к форме создания/редактирования записей:  
- подсветка обязательных для заполнения полей;  
- поля код и название функционала меняются с выбора из списка на поле для ручного ввода и обратно в зависимости от выбора "Наличие в системе";  
- поля код и название функционала при выборе "Наличие в системе" связаны между собой - при выборе значения в одном из полей второе поле заполняется автоматически (списки значений загружаются из стейта);  
- значения для выбора "Ответственного" загружаются из стейта;  
- поле "Дата заведения" заполняется автоматически текущей, доступно для редактирования только при создании новой задачи (значение не позже текущей даты);  
- поле "Дата завершения" недоступно для редактирования - заполняется автоматически текущей датой при выборе в поле "Статус" значения "Завершено";  
- при выборе филиалов/регионов для активации можно выбрать филиал целиком или его отдельные регионы, дата активации здесь выбирается одна для всех;   
- изменить дату активации по отдельному региону можно в таблице выбранных филиалов/регионов для активации внизу формы создания/редактирования записи (редактирование даты/удаление активации возможно для только что выбранных активаций и недоступно для уже существующих активаций по задаче).  


### Стек:

* JS
* Vue, Vuex
* Bootstrap, Bootstrap-Vue
* CSS

## Директории

`/components` — папка с компонентами приложения  
`/router` - папка с роутингом приложения  
`/store` - папка с файлами глобального хранилища (стейта) приложения  
`/utils` - папка с файлами констант и настроек конфигурации  
`/assets` - папка с кодом и файлами сторонних разработчиков, изображениями 

## Установка зависимостей и запуск проекта

##### `npm i` – установить зависимости

##### `npm serve` – запуск devServer на http://localhost:3000/

##### `npm predeploy` – production сборка проекта
