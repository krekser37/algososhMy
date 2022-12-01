describe('корректная работа роутинга',()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/')
    })

    it('открытие стартовой страницы', ()=>{
        cy.contains('МБОУ АЛГОСОШ');
    })

    it('открытие страницы с рекурсией(строка)',()=>{
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
    })

    it('открытие страницы Последовательность Фибоначчи',()=>{
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    })

    it('открытие страницы Сортировка массива',()=>{
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива');
    })

    it('открытие страницы Стек',()=>{
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек');
    })

    it('открытие страницы Очередь',()=>{
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь');
    })

    it('открытие страницы Связный список',()=>{
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    })
})