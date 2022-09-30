import { expect } from 'chai';
import { describe, it } from 'mocha';
import UserService from '../src/services/user/index';

function generateFakeUser() {
  return {
		name: `test${Math.random().toString(36).substring(2, 15)}`,
		email: `test${Math.random().toString(36).substring(2, 15)}@test.com`
	};
}

describe('User controller', () => {
	it('should create a new user', async () => {
		let fakeUserPayload = generateFakeUser();
		const user = await UserService.create(fakeUserPayload);
		expect(user).to.be.an('object');
		expect(user).to.have.property('name');
    expect(user).to.have.property('email');
    expect(user).to.have.property('id');
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('updatedAt');
		expect(user.name).to.equal(fakeUserPayload.name);
		expect(user.email).to.equal(fakeUserPayload.email);
  });
  it('should get all users', async () => {
    const users = await UserService.getAll();
    expect(users).to.be.an('array');
    // Expect the array to have at least one user
    expect(users.length).to.be.greaterThan(0);
  });
});

// Create New User
//   ✔ should create a new user
//   ✔ should get all users

// 2 passing (24ms)
