

describe('Сервис загружен', ()=>{
    it('доступен по localhost:3000', ()=>{
        cy.visit('http://localhost:3000/')
    })
})