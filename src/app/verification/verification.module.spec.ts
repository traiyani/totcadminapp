import { VerificationModule } from './verification.module';

describe('VerificationModule', () => {
  let signupModule: VerificationModule;

  beforeEach(() => {
    signupModule = new VerificationModule();
  });

  it('should create an instance', () => {
    expect(signupModule).toBeTruthy();
  });
});
