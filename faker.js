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
        modified_by: '6a836433-1456-4f01-843e-c885afbdf7a6',
        vegetarian: faker.random.boolean(),
        price: faker.random.number({
            min: 5,
            max: 10
        }).toString(),
        image: faker.random.image(),
        deleted: faker.random.boolean()
    }
    // console.log(menu);
    return menu;
}


function getVotings() {
    voting = {
        week: (faker.date.recent()).toISOString(),
        user: faker.random.arrayElement(["ebe66da1-f4c2-4a1f-8d47-3cc5fea49646","c2b8c10f-0e94-468b-b82c-ed7d7f4250b4","410d6c07-695f-4aa0-995c-18b0760e627c","36d992d9-cd57-463d-9392-2012dfc095d9","6a836433-1456-4f01-843e-c885afbdf7a6"]),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        dishes: faker.random.arrayElement(['cb56a7b1-2119-48b2-b6b5-559b02d66bf0','9978a866-0960-488b-8d04-8bb7349635e4','126c5911-41a6-4809-a276-2598839cfb26','22a0db22-5151-4bc1-8389-7c69fa9f8a3f','7717a03a-34cb-4417-87fb-35212c1ee360','8def4a6f-2914-42e4-817e-668099b79a31','41168aa0-2fcc-4d09-8d82-a96eef8b924e','aaf8649b-ae7b-4c17-adf3-f5ccbecd420c','513a6666-a412-4d00-af06-1f85e47207c3','c1ec97a5-996d-4155-9f33-fb4ca539a98f'])
    }
    return voting;
}

function getOrder() {
    orders = {
        week: (faker.date.recent()).toISOString(),
        user: faker.random.arrayElement(["ebe66da1-f4c2-4a1f-8d47-3cc5fea49646","c2b8c10f-0e94-468b-b82c-ed7d7f4250b4","410d6c07-695f-4aa0-995c-18b0760e627c","36d992d9-cd57-463d-9392-2012dfc095d9","6a836433-1456-4f01-843e-c885afbdf7a6"]),
        created: (faker.date.recent()).toISOString(),
        modified: (faker.date.recent()).toISOString(),
        dish: faker.random.arrayElement(['cb56a7b1-2119-48b2-b6b5-559b02d66bf0','9978a866-0960-488b-8d04-8bb7349635e4','126c5911-41a6-4809-a276-2598839cfb26','22a0db22-5151-4bc1-8389-7c69fa9f8a3f','7717a03a-34cb-4417-87fb-35212c1ee360','8def4a6f-2914-42e4-817e-668099b79a31','41168aa0-2fcc-4d09-8d82-a96eef8b924e','aaf8649b-ae7b-4c17-adf3-f5ccbecd420c','513a6666-a412-4d00-af06-1f85e47207c3','c1ec97a5-996d-4155-9f33-fb4ca539a98f']),
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

function getStatus() {
    status = {
        week: (faker.date.recent()).toISOString(),
        voting_count: faker.random.number({
            min: 0,
            max: 5
        }),

        order_count: faker.random.number({
            min: 0,
            max: 5
        }),
        voting_email_sent: faker.random.boolean(),
        order_email_sent: faker.random.boolean(),
        active: faker.random.boolean(),
        voting_status: faker.random.boolean(),
        order_status: faker.random.boolean(),

    }
    return status;
}

function getPayment() {
    payment = {
        week: (faker.date.recent()).toISOString(),
        user: faker.random.arrayElement(["ebe66da1-f4c2-4a1f-8d47-3cc5fea49646","c2b8c10f-0e94-468b-b82c-ed7d7f4250b4","410d6c07-695f-4aa0-995c-18b0760e627c","36d992d9-cd57-463d-9392-2012dfc095d9","6a836433-1456-4f01-843e-c885afbdf7a6"]),
        amount_paid: faker.random.number({
            min: 20,
            max: 35
        }),
        created: (faker.date.recent()).toISOString(),
        status: faker.random.arrayElement(['paid', 'approved'])
    }
    return payment;
}

function generateUser(numofUsers) {
    let usersList = [];
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
    getMenu,
    getPayment,
    getStatus
}