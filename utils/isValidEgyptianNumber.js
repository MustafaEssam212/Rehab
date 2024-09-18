export default function isValidEgyptianPhoneNumber(phoneNumber) {

    const egyptianMobileRegex = /^(010|011|012|015)\d{8}$/;

    return egyptianMobileRegex.test(phoneNumber);
  }