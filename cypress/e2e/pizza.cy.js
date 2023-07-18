describe ('Testing',()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/pizza")
    })
    const client=()=>cy.get("input[name=name]")
    const pizza = () => cy.get("select[name=pizza]")
    const size = () => cy.get("select[name=size]")
    const topping1 = () => cy.get("input[name='sausage']")
    const topping2 = () => cy.get("input[name='bacon']")
    const topping3 = () => cy.get("input[name='meatball']")
    const topping4 = () => cy.get("input[name='mushrooms']")
    const instructions = () => cy.get("input[name=instructions]")
    const btn = () => cy.get(`button[id="order-button" ]`)

    it("Add text to Input box",()=>{
        client().type("hello")
        client().should("have.value","hello")
        
    })
    it(" select multiple toppings",()=>{
        topping1().click().should("be.checked")
        topping2().click().should("be.checked")
        topping3().click().should("be.checked")
        topping4().should("not.be.checked")
    })
    it(" before submit the form",()=>{
        client().should("have.value","")
        size().should("have.value", "")
        pizza().should("have.value", "")
        btn().should("be.disabled")



    })
    it(" submit the form", () => {
        pizza().type("cheese")
        client().type("cancui")
        size().type("8-inch")
        client().should("have.value", "cancui")
        pizza().select("Cheese Pizza")
        size().select("8-inch")
        btn().should("not.be.disabled")
        btn().click()
    })
   
    
} )