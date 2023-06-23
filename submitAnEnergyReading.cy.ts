const startUrl = 'https://www.goodenergy.co.uk/meter-reading/'

// I have condensed this to a function as it operates multiple times in the file.
function getNextButton() {
    cy.get('button').contains('Next').click()
}

describe('Testing the reading submission process', () => {
    describe('Happy Path', () => {
        beforeEach('Define test URL', () => {
            cy.visit(startUrl)
        })
        /* For simplicity, I have decided not to split these into a separate file.
        Sometimes this may be appropriate but for this exercise I have decided to 
        leave it in its raw format within the test file
        Also, tests should be independent, hence the size of them.
         */
            
        it('Can submit an energy reading', () => {
            cy.get('[for="electricity"]').click()
            cy.get('[for="IsThisFirstMeterReading"]').click()
            getNextButton()
                // Second Page
            cy.get('[id="Name"]').type('Happy Path')
            cy.get('[id="Email"]').type('happypath2314@bestEmail.com')
            cy.get('[id="Postcode"]').type('PO57 4UU')
            getNextButton()
                // Third Page
            cy.get('[id="ElecAccountNumber"]').type('13123313')
            cy.get('[id="ElecMeterSerialNumber"]').type('123444')
            cy.get('[id="ElecDateOfReading_Value_Day"]').select('1')
            cy.get('[id="ElecDateOfReading_Value_Month"]').select('April')
            cy.get('[id="ElecDateOfReading_Value_Year"]').select('2023')
            cy.get('[id="ElecMeterReadingValue"]').type('8987')
            cy.get('[id="StandardEveOrWeekendMeterReading"]').type('99')

            cy.get('button').contains('Submit').click()

            cy.url().should('contain', 'Results')
         })
         it('Can validate against some errors on the form', () => {
            cy.get('[for="electricity"]').click()
            cy.get('[for="IsThisFirstMeterReading"]').click()
            getNextButton()
            // Second Page, validate empty fields
            getNextButton()
            cy.get('[id="Name-error"]').should('exist')
            cy.get('[id="Email-error"]').should('exist')
            cy.get('[id="Postcode-error"]').should('exist')
            // Lets move onto the next page but validate that the error messages disappear
            cy.get('[id="Name"]').type('Testy McTesterson')
            cy.get('[id="Email"]').type('TestEmail@bestEmail.com')
            cy.get('[id="Postcode"]').type('PO57 4UU')

            cy.get('[id="Name-error"]').should('not.exist')
            cy.get('[id="Email-error"]').should('not.exist')
            cy.get('[id="Postcode-error"]').should('not.exist')

            getNextButton()

            cy.get('[id="ElecAccountNumber"]').type('Not A Number')
            cy.get('[id="ElecMeterSerialNumber"]').type('!@$£^&%$')

            cy.get('button').contains('Submit').click()

            cy.get('[id="ElecAccountNumber-error"]').should('exist')
            cy.get('[id="ElecMeterSerialNumber-error"]').should('exist')
            cy.get('[id="ElecDateOfReading-error"]').should('exist')
            cy.get('[id="ElecMeterReadingValue-error"]').should('exist')

            cy.url().should('equal', startUrl)
            // ^ This was to ensure it did not progress with bad data
         })

        // This is a very simple test file, I hope this meets expectations :)
    })
})