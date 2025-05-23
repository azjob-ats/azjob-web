import { EmailValidateUtil } from './email-validate.util';

describe('EmailValidateUtil', () => {
  it('deve retornar true para um e-mail válido', done => {
    const email = 'teste@exemplo.com';

    EmailValidateUtil.isValidEmail(email).subscribe({
      next: result => {
        expect(result).toBe(true);
        done();
      },
      error: () => {
        fail('Não deveria disparar erro para e-mail válido');
        done();
      },
    });
  });

  it('deve disparar erro para um e-mail inválido', done => {
    const email = 'invalido-email';

    EmailValidateUtil.isValidEmail(email).subscribe({
      next: () => {
        fail('Deveria disparar erro para e-mail inválido');
        done();
      },
      error: err => {
        expect(err).toBe('Este e-mail não é valido');
        done();
      },
    });
  });
});
