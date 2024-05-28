
 EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/   ;
 PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ ;
 PHONE_REGEX =/^\d{8}$/
 STATUS_REGEX = /^(PENDING|APPROVED|REJECTED|BANNED)$/ ;
 ROLE_REGEX = /^(DEFAULT|ADMIN|TAXI)$/
 REGEXS = { EMAIL_REGEX, PASSWORD_REGEX  , PHONE_REGEX ,STATUS_REGEX , ROLE_REGEX };


 module.exports = REGEXS;

