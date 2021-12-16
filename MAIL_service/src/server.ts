import express from "express";
import { Consumer } from "./kafkaServices/Consumer";
import { MailTrapProvider } from "./providers/implementaions/MailTrapProvider";
const app = express();
const mailProvider = new MailTrapProvider()

const consumer = new Consumer('mail_service_1')
consumer.consume()
app.get('/', async () =>{
  await mailProvider.send({
    to: "albertojcvs@gmail.com",
    from: "system@system.com",
    subject: "Welcome " + 'alberto',
    body:`<h1>Hey, albeto</h1>
          <p>Welcome!</p>`
  });
}
)
app.listen(3335, () => {
  console.log("Mail service is running");
});
