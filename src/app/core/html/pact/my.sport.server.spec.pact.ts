import {UserService} from "../../../shared/user.service";
import {TestBed} from "@angular/core/testing";
import {CREATED} from 'http-status-codes';
import {User} from "../../auth/user";
import {HttpClientModule} from "@angular/common/http";
import {Matchers} from '@pact-foundation/pact';
import {PactWrapper} from "./pact-wrapper";
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../../../shared/shared.module";

describe('my-sport-server PACT', () => {

	const provider = new PactWrapper('my-sport-api');
	const user = createUser();

	beforeAll(async () => {
		await provider.init();
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, RouterTestingModule, SharedModule],
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
			phoneNumber: user.phoneNumber,
			password: user.password,
			email: user.email
		}

	}

	function createUser() {
		const creatingUser = new User();
		creatingUser.firstName = 'xuan chuong';
		creatingUser.lastName = 'nguyen';
		creatingUser.email = 'xuanchuongdp@gmail.com';
		creatingUser.password = '123456';
		creatingUser.phoneNumber = '0986123123';
		return creatingUser;
	}

	// function createMatch() {
	// 	const creatingMatch = new Match();
	// 	creatingMatch.title = 'title';
	// 	creatingMatch.description = 'nguyen';
	// 	creatingMatch.location = 'xuanchuongdp@gmail.com';
	// 	creatingMatch.numberOfPlayers = 10;
	// 	creatingMatch.startDate = '13-12-2020';
	// 	return creatingMatch;
	// }

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
						email: Matchers.email(user.email),
						phoneNumber: Matchers.string(user.phoneNumber)
					},
				},
			});
		});

		it('should create user successfully', async () => {
			const userService = TestBed.inject(UserService);
			await userService.create(user);
		});
	});

});
