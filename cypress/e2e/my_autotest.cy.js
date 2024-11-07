describe('Авторизация и смена аватара в покемонах', function () {

    it('позитивный кейс авторизации', function () {
         cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
         cy.get('#mail').type('german@dolnikov.ru'); // вели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // вели верный пароль
         cy.get('#loginButton').click(); // нажал кнопку войти
         cy.wait (1111);
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get('#message').should('be.visible'); // тектс виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
    })
    it('Проверка востановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
        cy.get('#forgotEmailButton').click(); // нажал кнопку забыли пароль?
        cy.get('#mailForgot').type('german@dolnikov.ru'); // вел почту для восстановления 
        cy.get('#restoreEmailButton').click() // нажал отправить код
        cy.get('#message').contains('Успешно отправили пароль на e-mail'); // проверяю, на совп.текст
        cy.get('#message').should('be.visible'); // тектс виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
     
    })

         it('негативный кейс авторизации неправильный пароль', function () {
            cy.visit('https://login.qa.studio/'); // зашли на сайт
            cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
            cy.get('#mail').type('german@dolnikov.ru'); // вели верный логин
            cy.get('#pass').type('iLoveqastudi72'); // вели неверный пароль
            cy.get('#loginButton').click(); // нажал кнопку войти
            cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
            cy.get('#message').should('be.visible'); // тектс виден пользователю
            cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
         
     })
     it('негативный кейс авторизации неправильный логин', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
        cy.get('#mail').type('german@dolnikov.com'); // вели неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // вели верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get('#message').should('be.visible'); // тектс виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
     
 })
     it('(негативный кейс валидации)Проверка что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
        cy.get('#mail').type('germandolnikov.ru'); // вел логин без @
        cy.get('#pass').type('iLoveqastudi72'); // вели верный пароль
        cy.get('#loginButton').click(); // нажал кнопку войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
        cy.get('#message').should('be.visible'); // тектс виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
 })
 it('проверка на приведение к строчным буквам в логине', function () {
    cy.visit('https://login.qa.studio/'); // зашли на сайт
    cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
    cy.get('#mail').type('GerMan@Dolnikov.ru'); // вели верный логин разным регистром
    cy.get('#pass').type('iLoveqastudio1'); // вели верный пароль
    cy.get('#loginButton').click(); // нажал кнопку войти
    cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
    cy.get('#message').should('be.visible'); // тектс виден пользователю
    cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден пользователем 
   
})
describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
 
 }) 