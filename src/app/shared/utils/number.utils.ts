export class NumberUtils {

  static getVerificationDigit(nit: string | number): number | null {
    if (!nit) return null;

    const weights = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    const nitStr = nit.toString().replace(/\D/g, '');

    let addition = 0;
    const startIndex = weights.length - nitStr.length;

    for (let i = 0; i < nitStr.length; i++) {
      const digit = parseInt(nitStr[i], 10);
      const weight = weights[startIndex + i];
      addition += digit * weight;
    }

    const residue = addition % 11;

    return residue < 2 ? residue : 11 - residue;
  }
}
