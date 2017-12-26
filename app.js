'use strict';


const clientKey = 'nxJ4T31JaYmshZujaPeoLhL0g2lop1H7pi9jsn51LSvRMryZte';



unirest.get("https://trailapi-trailapi.p.mashape.com/?lat=34.1&limit=25&lon=-105.2&q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver&q[country_cont]=Australia&q[state_cont]=California&radius=25")
.header("X-Mashape-Key", "jvHLN2ffP4mshDADMnyUd0OkSXaXp16hQKqjsnIpARwMYTtPWp")
.header("Accept", "text/plain")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});

$unirest();



