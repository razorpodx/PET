import { expect } from 'chai';
import { describe, it } from 'mocha';
import UserService from '../src/services/user/index';

function generateFakeUser() {
  return {
		name: `test${Math.random().toString(36).substring(2, 15)}`,
		email: `test${Math.random().toString(36).substring(2, 15)}@test.com`
	};
}

let fakeUser = generateFakeUser();

describe('User controller', () => {
	it('should create a new user', async () => {
		const user = await UserService.create(fakeUser);
		expect(user).to.be.an('object');
		expect(user).to.have.property('name');
    expect(user).to.have.property('email');
    expect(user).to.have.property('id');
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('updatedAt');
		expect(user.name).to.equal(fakeUser.name);
		expect(user.email).to.equal(fakeUser.email);
  });
  it('should get all users', async () => {
    const users = await UserService.getAll({});
    expect(users).to.be.an('array');
    // Expect the array to have at least one user
    expect(users.length).to.be.greaterThan(0);
  });
  it('should get all users with a name filter', async () => {
    const users = await UserService.getAll({ name: fakeUser.name });
    expect(users).to.be.an('array');
    // Expect the array to have at least one user
    expect(users.length).to.be.greaterThan(0);
    expect(users[0].name).to.equal(fakeUser.name);
  });
  it('should get all users with an email filter', async () => {
    const users = await UserService.getAll({ email: fakeUser.email });
    expect(users).to.be.an('array');
    // Expect the array to have at least one user
    expect(users.length).to.be.greaterThan(0);
    expect(users[0].email).to.equal(fakeUser.email);
  });
});

// Create New User
//   ✔ should create a new user
//   ✔ should get all users

// 2 passing (24ms)
