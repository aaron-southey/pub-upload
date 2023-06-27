// Usually this URL would be stored in the cypress.env/config
export const startUrl = 'https://www.goodenergy.co.uk/meter-reading/'

export function getButton(buttonText: string){
    cy.get('button').contains(buttonText).click()
  }

export function firstPageHappyPath(){
    cy.get('[for="electricity"]').click()
    cy.get('[for="IsThisFirstMeterReading"]').click()
}

export function secondPageHappyPath(){
    cy.get('[id="Name"]').type('Happy Path')
    cy.get('[id="Email"]').type('happypath2314@bestEmail.com')
    cy.get('[id="Postcode"]').type('PO57 4UU')
}

const accountNumber = '13123313'
const meterReading = '8987'
const weekendReading = '99'

export function thirdPageHappyPath(){
    cy.get('[id="ElecAccountNumber"]').type(accountNumber)
    cy.get('[id="ElecMeterSerialNumber"]').type('123444')
    cy.get('[id="ElecDateOfReading_Value_Day"]').select('1')
    cy.get('[id="ElecDateOfReading_Value_Month"]').select('April')
    cy.get('[id="ElecDateOfReading_Value_Year"]').select('2023')
    cy.get('[id="ElecMeterReadingValue"]').type(meterReading)
    cy.get('[id="StandardEveOrWeekendMeterReading"]').type(weekendReading)
}

export function validateResultsPage(){
    cy.get('[id="main"]').should('contain', accountNumber)
}

export function secondPageValidation(){
    cy.get('[id="Name-error"]').should('exist')
    cy.get('[id="Email-error"]').should('exist')
    cy.get('[id="Postcode-error"]').should('exist')
}

export function secondPageValidationRecovery(){
    cy.get('[id="Name-error"]').should('not.exist')
    cy.get('[id="Email-error"]').should('not.exist')
    cy.get('[id="Postcode-error"]').should('not.exist')
}

export function thirdPageInputs(){
    cy.get('[id="ElecAccountNumber"]').type('Not A Number')
    cy.get('[id="ElecMeterSerialNumber"]').type('!@$£^&%$')
}

export function thirdPageValidation(){
    cy.get('[id="ElecAccountNumber-error"]').should('exist')
    cy.get('[id="ElecMeterSerialNumber-error"]').should('exist')
    cy.get('[id="ElecDateOfReading-error"]').should('exist')
    cy.get('[id="ElecMeterReadingValue-error"]').should('exist')
}