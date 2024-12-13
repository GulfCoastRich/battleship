/// <reference types="Cypress" />

describe("Contact form page", () => {

  beforeEach(function () {
    cy.visit("/");
    cy.get('[data-test="nav-contact"]').click();
    cy.url().should("be.equal", "https://practicesoftwaretesting.com/contact");
  });

  it("Fill out entire form and submit successfully", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Contact").should("be.visible");
    cy.contains("Thanks for your message! We will contact you shortly.").should(
      "be.visible"
    );
  });

  it("Form and submit successfully without file upload", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Contact").should("be.visible");
    cy.contains("Thanks for your message! We will contact you shortly.").should(
      "be.visible"
    );
  });

  //Negative text cases
  it("Forget first name", () => {
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("First name is required").should("be.visible");
  });

  it("Forget last name", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Last name is required").should("be.visible");
  });

  it("Forget email", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Email is required").should("be.visible");
  });

  it("Forget subject", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Subject is required").should("be.visible");
  });

  it("Forget message", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Message is required").should("be.visible");
  });

  it("Message is not minimum 50 characters", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type("Less than fifty chars");
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactUploadEmpty.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Message must be minimal 50 characters").should("be.visible");
    
  });

  it("Uploaded file should be empty", () => {
    cy.get('[data-test="first-name"]').clear();
    cy.get('[data-test="first-name"]').type("Billy");
    cy.get('[data-test="last-name"]').clear();
    cy.get('[data-test="last-name"]').type("Bones");
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type("billybones@test.com");
    cy.get('[data-test="subject"]').select("Warranty");
    cy.get('[data-test="message"]').clear();
    cy.get('[data-test="message"]').type(
      "The goal of this message is to have over fifty characters in order to satisfy the requirement."
    );
    cy.get('[data-test="attachment"]').selectFile(
      "cypress/fixtures/contactFileUpload.txt"
    );
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("File should be empty").should("be.visible");
  });

});
