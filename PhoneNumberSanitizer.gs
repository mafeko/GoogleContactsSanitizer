var searchPattern = '^01.*'

function sanitizePhoneNumberWithGermanCode(phoneField) {
  if(phoneField.getPhoneNumber().match(searchPattern)){
    var numberOnly = phoneField.getPhoneNumber().match(/\d/g).join('');
    //Logger.log(numberField.getPhoneNumber());
    var sanitized = numberOnly.replace(/01/,'+491');
    Logger.log(numberOnly + ' TO ' + sanitized);
    phoneField.setPhoneNumber(sanitized);
  }
};


function replacePhoneLabel(phoneField,fromLabel,toLabel){
  if(phoneField.getLabel() === fromLabel){
    phoneField.setLabel(toLabel);
  }
};


function start(){
  var contactsArr = ContactsApp.getContacts();
  // Just load the data from the test contact:
  // var contactsArr = ContactsApp.getContactsByEmailAddress('tester123@gmail.com');
  
  contactsArr.forEach(function(contact){
    contact.getPhones().forEach(function(field){
      //sanitize numbers with leading '01' to '+491'
      sanitizePhoneNumberWithGermanCode(field);
      
      //first set all numbers with label 'mobile' to 'home'      
      replacePhoneLabel(field,ContactsApp.Field.MOBILE_PHONE, ContactsApp.Field.HOME_PHONE);
      
      //then set all numbers with leading '+491' and Label 'home' to Label 'mobile'.
      if (field.getPhoneNumber().match(/^\+491.*/)!= null){
        replacePhoneLabel(field,ContactsApp.Field.HOME_PHONE, ContactsApp.Field.MOBILE_PHONE);
      };
    });
  });  
};


function resetTestUsers(){
  var contactsArr = ContactsApp.getContactsByEmailAddress('tester123@gmail.com');
  contactsArr[0].getPhones().forEach(function(v){
    Logger.log(v.getLabel());
    v.setLabel(ContactsApp.Field.MOBILE_PHONE);
    Logger.log(v.getLabel());
  });
};