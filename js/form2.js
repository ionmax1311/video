$(document).ready(function() {

  $(document).on("input", "#phone", function() {
    this.value = this.value.replace(/\D/g, '');

  });

  jQuery.validator.addMethod("email",function(value,element,param)
  {
    if(this.optional(element))
    {//This is not a 'required' element and the input is empty
return true;
}

if(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value))
{
  return true;
}

return false;

},"Некорректный email");


  $(".form").validate({

    rules: {

      name: {
        required: true,
        minlength: 2

      },
      phone: {
        required: true,
        minlength: 8
      },          
      email: {
        required: true,
        email: true,


      },


    },
    messages: {
      name: "Введите мин. 2 символа",
      phone: "Некорректный телефон",
      email: "Некорректный email"
    }

  });


  var affiliateusertoken;
  var affiliateid;
  var ip;
  var country;
  var city;
  var utmmedium;
  var utmcontent;
  var utmcampaign;
  var utmsource;
  var utmterm;
  var linkId;

  var firstname;
  var lastname;
  var email;
  var phoneCountry;
  var phoneNumber;
  var phoneOperator;
  var params;

  var res;
  var codePhone;
  var baseurl = 'https://api.c-crypto.com/Registration/Lead';

  var url_;
  var url;

  var email;
  var fullName;
  var _fullName;
  var firstName;
  var lastName;
  var phoneConfirm;

  var Data  = new Date();
  var Hour = Data.getHours();
  var Minutes = Data.getMinutes();
  var Seconds = Data.getSeconds();

  function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

init();

// function yaCounter() {

//   yaCounter51717959.reachGoal('form');
//   return true;

// }



$('.form-button').click(function() {


  debugger;
  
  fullName = $('#name').val();
  _fullName = fullName.split(' ');
  firstName = _fullName[0];
  lastName = _fullName[1] || _fullName[0];
  email = $('#email').val();
  console.log(email,fullName);


  phoneCountry = $('.selected-dial-code').html().replace("+", "");

  var _phoneNumber = $('#phone').val();
  phoneOperator = _phoneNumber[0] + _phoneNumber[1];
  phoneNumber = _phoneNumber.replace(phoneOperator,'');

  var phoneSms = phoneCountry + _phoneNumber;

  console.log(phoneSms);


  params = {

    Email: email,

    PhoneCountry: phoneCountry,

    PhoneOperator: phoneOperator,

    PhoneNumber: phoneNumber,

    FirstName: firstName,

    LastName: lastName,

    AffiliateId: affiliateid,

    Country: country,

    AdData: city,

    AffiliateUserToken: affiliateusertoken,

    UtmCampaign: utmcampaign,

    LinkId: '33',

    ipAddress: ip,

    UtmMedium: utmmedium,

    UtmContent: utmcontent,

    UtmTerm: utmterm,

    UtmSource: utmsource

  }

  res = randomInteger(1000,9999);
  console.log(res);

  $('#currPhone').text(phoneSms);


  url_ = getQueryString(baseurl, params);

 

  var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;





if ($(".form ").valid()) {

  $.ajax({
    url: 'temps.php',
    type: 'POST',
    data: jQuery.param({ field0 : curDate, field1: firstName, field2 : email, field3: phoneSms, field4 : country}) ,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (response) {
      console.log(response.status);
    },
    error: function () {
      console.log("error");
    }
  });
  console.log(url);

    $.ajax({
      url: 'send.php',
      type: 'POST',
      data: jQuery.param({ field0 : phoneSms, field1: res}) ,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (response) {
        console.log(response.status);
      },
      error: function () {
        console.log("error");
      }
     });

  // $.ajax({
  //   url: 'request.php',
  //   type: 'POST',
  //   data: jQuery.param({ phone : phoneSms, email: email, name : firstName, city: city, country: country, ip: ip}) ,
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  //   success: function (response) {
  //     console.log('ok');
  //   },
  //   error: function () {
  //     console.log("error");
  //   }
  // });

  $.getJSON(url_, function(response) {
  
   
$(".form-popup").fadeOut("slow");
$(".popup-ver").fadeIn("slow");


});


}

});

$("#res").click(function() { 
  var codeSms = $('#sms-code').val();
  if(codeSms == res) {
    console.log('ok');
    window.location = 'success.html ';
  }
  else {
    console.log('fail');
    $('#codeError').css('display', 'block');
  }





});

$("#change-number").click(function() { 
  $('.popup-form-title, #sms-code, #codeError, #res, #change-number').css('display', 'none');
  $('.phoneConfirmWrap').css('display', 'block');
});

$("#submit-number").click(function() { 

    debugger;
    
    phoneConfirm = $('.phoneConfirm').val();
     phoneCountry = $('.popup-ver  .selected-dial-code').text().replace("+", "");

    var _phoneNumber = phoneConfirm;
    if(_phoneNumber) {
      phoneOperator = _phoneNumber[0] + _phoneNumber[1];
      phoneNumber = _phoneNumber.replace(phoneOperator,'');
    }
    
    

    params = {

      Email: email,

      PhoneCountry: phoneCountry,

      PhoneOperator: phoneOperator,

      PhoneNumber: phoneNumber,

      FirstName: firstName,

      LastName: lastName,

      AffiliateId: affiliateid,

      Country: country,

      AdData: city,

      AffiliateUserToken: affiliateusertoken,

      UtmCampaign: utmcampaign,

      LinkId: '33',

      ipAddress: ip,

      UtmMedium: utmmedium,

      UtmContent: utmcontent,

      UtmTerm: utmterm,

      UtmSource: utmsource

    }

    console.log(_phoneNumber);
    url_ = getQueryString(baseurl, params);

    $.getJSON(url_, function(response) {

    });
    res = randomInteger(1000,9999);

    var phoneSms = phoneCountry + phoneConfirm;
    var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;
    
     $.ajax({
      url: 'temps.php',
      type: 'POST',
      data: jQuery.param({ field0 : curDate, field1: firstName, field2 : email, field3: phoneSms, field4 : country}) ,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (response) {
        console.log(response.status);
      },
      error: function () {
        console.log("error");
      }
     });

     // $.ajax({
     //  url: 'request.php',
     //  type: 'POST',
     //  data: jQuery.param({ phone : phoneSms, email: email, name : firstName, city: city, country: country, ip: ip}) ,
     //  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     //  success: function (response) {
     //    console.log('ok');
     //  },
     //  error: function () {
     //    console.log("error");
     //  }
     // });

     $.ajax({
      url: 'send.php',
      type: 'POST',
      data: jQuery.param({ field0 : phoneSms, field1: res}) ,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (response) {
        console.log(response.status);
      },
      error: function () {
        console.log("error");
      }
     });



     $('#currPhone').text(phoneSms);
     $('.popup-form-title, #sms-code, #res, #change-number').css('display', 'block');
     $('.phoneConfirmWrap').css('display', 'none');
    
    
     
     
 });


function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function getQueryString(baseurl, params) {
  var url = baseurl;
  var isFirst = true;

  $.each(params, function(key, value) {
    url += isFirst ? '?' : '&';

    isFirst = false;
    url += (key.toString() + '=' + value);
  });

  return url;
}


function getphoneOperator(phoneNumber) {

  var parts = phoneNumber.split(' ', 2);
  if (parts && parts.length > 1) {

    return parts[0].replace('(', '').replace(')', '');
  }
  return '';
}


function getphoneNumber(phoneNumber) {
  var parts = phoneNumber.split(' ', 2);

  if (parts && parts.length > 1) {
    return parts[1].replace('-', '').replace('-', '');
  }

  return '';
}




var ip;


function init() {



  $.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
    .exec(window.location.href);

    if (results) {
      return results[1] || 0;
    }


  }




  affiliateusertoken = $.urlParam('usertoken');
  affiliateid = $.urlParam('affiliateId');
  utmmedium = $.urlParam('utm_medium');
  utmcontent = $.urlParam('utm_content');
  utmterm = $.urlParam('utm_term');
  utmcampaign = $.urlParam('utm_campaign');
  utmsource = $.urlParam('utm_source');

  console.log(affiliateusertoken);
  console.log(utmmedium);



  $.get("https://ipapi.co/json", function(response) {

    country = response.country;
    city = response.city;
    console.log(response.country_calling_code);
    console.log(response.city);
    ip = response.ip;

   

    $('#codePhone').addClass('valid');

  });

}



});
