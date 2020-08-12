import {UserService} from "../../../services/user.service";
import {TestBed} from "@angular/core/testing";
import {CREATED} from 'http-status-codes';
import {User} from "../../auth/user";
import {HttpClientModule} from "@angular/common/http";
import {Matchers} from '@pact-foundation/pact';
import {PactWrapper} from "./pact-wrapper";

describe('my-sport-server PACT', () => {

	const provider = new PactWrapper('my-sport-api');
	const user = createUser();

	beforeAll(async () => {
		await provider.init();
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [UserService],
		});
	});

	afterEach(async () => {
		await provider.verify();
	});

	afterAll(async () => {
		await provider.finalize();
	});

	function generateUserReqBody() {
		return {
			firstName: user.firstName,
			lastName: user.lastName,
			password: user.password,
			matchingPassword: user.matchingPassword,
			email: user.email
		}

	}

	function createUser() {
		const user = new User();
		user.firstName = 'xuan chuong';
		user.lastName = 'nguyen';
		user.email = 'xuanchuongdp@gmail.com';
		user.password = '123456';
		user.matchingPassword = '123456';
		return user;
	}

	describe('user api', () => {
		beforeAll(async () => {
			await provider.addInteraction({
				state: `create new user`,
				uponReceiving: 'create a new user successfully',
				withRequest: {
					method: 'POST',
					path: '/rest/api/v1/user/create',
					body: generateUserReqBody(),
				},
				willRespondWith: {
					status: CREATED,
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					},
					body: {
						id: Matchers.term({ generate: '123', matcher: '\\d+' }),
						firstName: Matchers.string(user.firstName),
						lastName: Matchers.string(user.lastName),
						email: Matchers.email(user.email)
					},
				},
			});
		});

		it('should create user successfully', async () => {
			const userService = TestBed.inject(UserService);
			await userService.signin(user);
		});
	});
});