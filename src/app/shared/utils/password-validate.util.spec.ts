import { PasswordValidateUtil } from './password-validate.util';
import { MIN_CHARACTERS_PASSWORD } from '@shared/constants/number.constant';

describe('PasswordValidateUtil', () => {
  const validPassword = 'Abcdef1!';

  describe('validatePasswordNotHaveSevenCharacters', () => {
    it('deve retornar true se a senha tiver 8 ou mais caracteres', done => {
      PasswordValidateUtil.validatePasswordNotHaveSevenCharacters(validPassword).subscribe({
        next: result => {
          expect(result).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para senha com 8+ caracteres');
          done();
        },
      });
    });

    it('deve lançar erro se a senha tiver menos que o mínimo', done => {
      const shortPassword = 'Ab1!';
      PasswordValidateUtil.validatePasswordNotHaveSevenCharacters(shortPassword).subscribe({
        next: () => {
          fail('Deveria lançar erro para senha curta');
          done();
        },
        error: err => {
          expect(err).toBe(
            `As recomendações básicas indicam que sua senha deve conter pelo menos ${MIN_CHARACTERS_PASSWORD} caracteres`
          );
          done();
        },
      });
    });
  });

  describe('validatePasswordIfExistOneLetter', () => {
    it('deve passar se houver pelo menos uma letra', done => {
      PasswordValidateUtil.validatePasswordIfExistOneLetter('123abc').subscribe({
        next: r => {
          expect(r).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para senha com letra');
          done();
        },
      });
    });

    it('deve falhar se não houver letras', done => {
      PasswordValidateUtil.validatePasswordIfExistOneLetter('123456').subscribe({
        next: () => {
          fail('Deveria falhar sem letras');
          done();
        },
        error: err => {
          expect(err).toBe('Sua senha deve conter pelo menos uma letras');
          done();
        },
      });
    });
  });

  describe('validatePasswordIfExistUppercaseLetter', () => {
    it('deve passar se houver uma letra maiúscula', done => {
      PasswordValidateUtil.validatePasswordIfExistUppercaseLetter('abcD123').subscribe({
        next: r => {
          expect(r).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para maiúscula');
          done();
        },
      });
    });

    it('deve falhar se não houver letra maiúscula', done => {
      PasswordValidateUtil.validatePasswordIfExistUppercaseLetter('abcdef1').subscribe({
        next: () => {
          fail('Deveria falhar sem letra maiúscula');
          done();
        },
        error: err => {
          expect(err).toBe('Sua senha deve conter pelo menos uma letras maiúscula');
          done();
        },
      });
    });
  });

  describe('validatePasswordIfExistLowercaseLetter', () => {
    it('deve passar se houver uma letra minúscula', done => {
      PasswordValidateUtil.validatePasswordIfExistLowercaseLetter('ABCd123').subscribe({
        next: r => {
          expect(r).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para minúscula');
          done();
        },
      });
    });

    it('deve falhar se não houver letra minúscula', done => {
      PasswordValidateUtil.validatePasswordIfExistLowercaseLetter('ABC123').subscribe({
        next: () => {
          fail('Deveria falhar sem minúscula');
          done();
        },
        error: err => {
          expect(err).toBe('Sua senha deve conter pelo menos uma letras minúscula');
          done();
        },
      });
    });
  });

  describe('validatePasswordIfExistOneNumber', () => {
    it('deve passar se houver um número', done => {
      PasswordValidateUtil.validatePasswordIfExistOneNumber('abc1D!').subscribe({
        next: r => {
          expect(r).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para número');
          done();
        },
      });
    });

    it('deve falhar se não houver número', done => {
      PasswordValidateUtil.validatePasswordIfExistOneNumber('AbcDef!').subscribe({
        next: () => {
          fail('Deveria falhar sem número');
          done();
        },
        error: err => {
          expect(err).toBe('Sua senha deve conter pelo menos um numero');
          done();
        },
      });
    });
  });

  describe('validatePasswordIfExistOneSpecialCharacter', () => {
    it('deve passar se houver caractere especial', done => {
      PasswordValidateUtil.validatePasswordIfExistOneSpecialCharacter('abcD1!').subscribe({
        next: r => {
          expect(r).toBe(true);
          done();
        },
        error: () => {
          fail('Não deveria falhar para caractere especial');
          done();
        },
      });
    });

    it('deve falhar se não houver caractere especial', done => {
      PasswordValidateUtil.validatePasswordIfExistOneSpecialCharacter('abcD123').subscribe({
        next: () => {
          fail('Deveria falhar sem caractere especial');
          done();
        },
        error: err => {
          expect(err).toBe('Sua senha deve conter pelo menos um catacter');
          done();
        },
      });
    });
  });
});
