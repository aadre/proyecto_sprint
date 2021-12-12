import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  EnviarNotificacionesSMS(body:string):void {
    const accountSid = 'AC9502072ac4b0454ab713e89778b32028'; // Your Account SID from www.twilio.com/console
    const authToken = '43d55b62394a7ed8aa2c834a58df57dc'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: body,
        to: '+573116499539', // Text this number
        from: '+13344878130', // From a valid Twilio number
      })
      .then((message: any) => console.log(message.sid));

  }
}
