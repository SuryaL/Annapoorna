const faker = require('faker');

function getUser() {
    user = {
        id: faker.random.uuid(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        active: faker.random.boolean(),
        password: faker.internet.password(),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        modified_by: faker.random.uuid(),
        type: ['user'],
        super: faker.random.boolean(),
        phone: faker.phone.phoneNumber(),
        image: faker.random.image(),
        accessed_portal: (faker.date.recent()).toISOString(),
        accessed_mobile: (faker.date.recent()).toISOString(),
        deleted: faker.random.boolean()
    }
    return user;
}

function getMenu() {
    menu = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        modified_by: faker.random.uuid(),
        vegetarian: faker.random.boolean(),
        price: faker.random.number({
            min: 5,
            max: 10
        }),
        image: faker.random.image(),
        deleted: faker.random.boolean()
    }
    return menu;
}


function getVotings() {
    voting = {
        week: (faker.date.recent()).toISOString(),
        user: faker.random.uuid(),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        dishes: [faker.random.uuid(), faker.random.uuid(), faker.random.uuid()]
    }
    return voting;
}

function getOrder() {
    orders = {
        week: (faker.date.recent()).toISOString(),
        user: faker.random.uuid(),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        dish: faker.random.uuid(),
        quantity: faker.random.number({
            min: 0,
            max: 3
        }),
        price: faker.random.number({
            min: 5,
            max: 10
        }),
        dish_name: faker.name.findName(),
        feedback: faker.lorem.sentence(),
        ratings: faker.random.number({
            min: 0,
            max: 5
        }),
    }
    return orders;
}

function generateUser(numofUsers) {
    let usersList =[];
    for (let i = 1; i <= numofUsers; i++) {
        usersList.push(getuser());
    }
    return usersList;
}


module.exports = {
    getUser,
    getOrder,
    generateUser,
    getVotings,
    getMenu
}