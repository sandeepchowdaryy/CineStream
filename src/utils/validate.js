export const checkvalidation  = (email,password) => {


  //rejex validation
  const isemailvalidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const ispasswordvalidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if(!isemailvalidation) return "Email ID is not valid";
  if(!ispasswordvalidation) return "Password is not valid";

    return null;
}