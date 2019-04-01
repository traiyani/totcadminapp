import { ForgetpasswordModule } from './forgetpassword.module';

describe('ForgetpasswordModule', () => {
  let signupModule: ForgetpasswordModule;

  beforeEach(() => {
    signupModule = new ForgetpasswordModule();
  });

  it('should create an instance', () => {
    expect(signupModule).toBeTruthy();
  });
});
