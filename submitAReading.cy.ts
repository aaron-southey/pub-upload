import {
    startUrl,
    secondPageHappyPath, 
    firstPageHappyPath, 
    thirdPageHappyPath, 
    secondPageValidation, 
    secondPageValidationRecovery, 
    thirdPageValidation, 
    thirdPageInputs, 
    getButton,
    validateResultsPage
} from "./submitReadingHelpers"

describe('Testing the reading submission process', () => {
    describe('Happy Path', () => {
        beforeEach('Define test URL', () => {
            cy.visit(startUrl)
        })
        /* This is the more complex design I have gone for, still simple
        as this form should not require any over-complication. I have create a 
        variable button selector to be used with whichever buttons are required.
         */
            
        it('Can submit an energy reading', () => {
            firstPageHappyPath()
            getButton('Next')

            secondPageHappyPath()
            getButton('Next')

            thirdPageHappyPath()

            getButton('Submit')

            // I was getting errors on the results page, so I kept it simple.
            cy.url().should('contain', 'Results')
            validateResultsPage()
         })
         it('Can validate against some errors on the form', () => {
            firstPageHappyPath()
            getButton('Next')

            getButton('Next')

            secondPageValidation()
            
            secondPageHappyPath()

            secondPageValidationRecovery()
            getButton('Next')

            thirdPageInputs()

            getButton('Submit')

            thirdPageValidation()

            cy.url().should('equal', startUrl)
            // ^ This was to ensure it did not progress with bad data
         })

        // This is a very simple test file, I hope this meets expectations :)
    })
})